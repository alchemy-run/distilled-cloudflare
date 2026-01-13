# distilled-cloudflare

Effect-native Cloudflare SDK generated from the [Cloudflare OpenAPI spec](https://github.com/cloudflare/api-schemas).

## COMMANDS

```bash
bun generate                              # Generate all services
bun generate --service r2                 # Generate single service
bun generate --fetch                      # Fetch latest spec first
bun vitest run ./test/services/r2.test.ts # Run tests
```

## TDD WORKFLOW

The Cloudflare OpenAPI spec is incomplete. Tests reveal two types of issues:

| Error Type | Symptom | Fix Location |
|------------|---------|--------------|
| `UnknownCloudflareError` | Undocumented error code | `spec/{service}.json` |
| `Schema decode failed` | Response doesn't match spec | `spec/openapi.patch.jsonc` |

### The Loop

```
Write Test → Run Test → Identify Failure → Patch → Regenerate → Repeat
```

---

## STEP 1: WRITE A TEST

Create isolated tests using `withXxx` helpers:

```typescript
const withBucket = <A, E, R>(
  name: string,
  fn: (bucket: string) => Effect.Effect<A, E, R>,
) =>
  cleanup(name).pipe(
    Effect.andThen(R2.createBucket({ account_id: accountId(), name })),
    Effect.andThen(fn(name)),
    Effect.ensuring(cleanup(name)),
  );

test("get lifecycle configuration", () =>
  withBucket("itty-cf-r2-lifecycle", (bucket) =>
    Effect.gen(function* () {
      const result = yield* R2.getBucketLifecycleConfiguration({
        account_id: accountId(),
        bucket_name: bucket,
      });
      expect(result.result).toBeDefined();
    }),
  ));
```

**Naming:** Use `itty-cf-{service}-{test}` — deterministic, no random suffixes.

---

## STEP 2: RUN THE TEST

```bash
bun vitest run ./test/services/r2.test.ts -t "lifecycle"
```

Two failure modes:

### Failure A: `UnknownCloudflareError`

```
(FiberFailure) UnknownCloudflareError: The CORS configuration does not exist.
```

→ Go to [Step 3A: Catalog the Error](#step-3a-catalog-the-error)

### Failure B: `Schema decode failed`

```
(FiberFailure) CloudflareHttpError: { "status": 200, "statusText": "Schema decode failed", "body": "{...}" }
```

→ Go to [Step 3B: Patch the Schema](#step-3b-patch-the-schema)

---

## STEP 3A: ADD THE ERROR

When you see `UnknownCloudflareError`, the API returned an error code not defined in `spec/{service}.json`.

### Extract the error code

Run with DEBUG to see the full response:

```bash
DEBUG=1 bun vitest run ./test/services/r2.test.ts -t "CORS"
```

Or log it in the test:

```typescript
const result = yield* someOperation().pipe(Effect.exit);
console.log(JSON.stringify(result, null, 2));
// Shows: { "code": 10059, "message": "The CORS configuration does not exist." }
```

### Define the error in spec/{service}.json

Errors are defined per-service with matching conditions. Edit `spec/{service}.json` (e.g., `spec/r2.json`):

```json
{
  "errors": {
    "NoSuchBucket": { "code": 10006, "status": 404 },
    "NoCorsConfiguration": { "code": 10059 },
    "ValidationError": { "code": 100021 }
  },
  "operations": {
    "getBucketCorsPolicy": {
      "errors": { "NoSuchBucket": {}, "NoCorsConfiguration": {} }
    },
    "deleteBucketCorsPolicy": {
      "errors": { "NoSuchBucket": {}, "NoCorsConfiguration": {} }
    }
  }
}
```

**Error matching supports:**
- `code` - Single Cloudflare error code
- `codes` - Array of codes that map to the same error
- `status` - HTTP status code (optional, for disambiguation)
- `message` - Substring match on error message (optional)

**Service-level vs operation-level:**
- Define errors at the service level with their matching conditions
- Reference errors by name at the operation level with `{}` to use defaults
- Override matching at the operation level: `{ "NoSuchBucket": { "code": 12345 } }`

**Important:** Use the **generated function name** (check `src/services/{service}.ts`), not the OpenAPI operationId.

### Regenerate

```bash
bun generate --service r2
```

→ Go to [Step 4: Update the Test](#step-4-update-the-test)

---

## STEP 3B: PATCH THE SCHEMA

When you see `Schema decode failed`, the API response doesn't match the OpenAPI spec.

### Identify the mismatch

The error body shows the actual response. Compare with the generated schema in `src/services/{service}.ts`.

Common issues:

| Problem | Example |
|---------|---------|
| Enum case mismatch | API returns `"WNAM"`, spec has `"wnam"` |
| Required field missing | Spec requires `prefix`, API returns `{}` |
| Null not allowed | API returns `null`, spec expects object |
| Missing endpoint | API exists but not in spec |

### Add a JSON Patch

Edit `spec/openapi.patch.jsonc`. **Every patch MUST have a comment.**

**JSON Pointer escaping:** `/` → `~1`, `~` → `~0`

Example: `/accounts/{account_id}/r2` → `/paths/~1accounts~1{account_id}~1r2`

#### Fix enum values

```jsonc
// R2: Add uppercase location enum values.
//
// Problem: API returns uppercase (WNAM), spec only has lowercase (wnam).
// Discovered: Schema decode failed on createBucket response.
{
  "op": "replace",
  "path": "/components/schemas/r2_bucket_location/enum",
  "value": ["apac", "eeur", "enam", "weur", "wnam", "oc", "APAC", "EEUR", "ENAM", "WEUR", "WNAM", "OC"]
}
```

#### Remove required constraint

```jsonc
// R2: Make conditions optional in lifecycle rules.
//
// Problem: Spec requires 'conditions', but API returns rules with empty conditions.
// Discovered: Schema decode failed on getBucketLifecycleConfiguration.
{
  "op": "replace",
  "path": "/components/schemas/r2_lifecycle-rule/required",
  "value": ["id", "enabled"]
}
```

#### Remove nested required

```jsonc
// R2: Remove prefix requirement from conditions.
//
// Problem: Spec requires conditions.prefix, but API returns conditions: {}.
// Discovered: Schema decode failed on getBucketLifecycleConfiguration.
{
  "op": "remove",
  "path": "/components/schemas/r2_lifecycle-rule/properties/conditions/required"
}
```

#### Allow null values

```jsonc
// KV: Allow null result in delete responses.
//
// Problem: API returns result: null, but spec expects object.
// Discovered: Schema decode failed on deleteKeyValuePair.
{
  "op": "replace",
  "path": "/components/schemas/workers-kv_api-response-common-no-result/allOf/1/properties/result",
  "value": {
    "oneOf": [
      { "type": "null" },
      { "type": "object" }
    ]
  }
}
```

#### Add undocumented endpoint

```jsonc
// Containers: Add list applications endpoint (undocumented).
//
// Problem: Containers API not in OpenAPI spec.
// Discovered: Reverse-engineered from Cloudflare dashboard.
{
  "op": "add",
  "path": "/paths/~1accounts~1{account_id}~1containers~1applications",
  "value": {
    "get": {
      "operationId": "listContainerApplications",
      "tags": ["Containers"],
      "parameters": [
        { "name": "account_id", "in": "path", "required": true, "schema": { "type": "string" } }
      ],
      "responses": {
        "200": { "content": { "application/json": { "schema": { "type": "object" } } } }
      }
    }
  }
}
```

### Regenerate

```bash
bun generate --service r2
```

→ Go to [Step 4: Update the Test](#step-4-update-the-test)

---

## STEP 4: UPDATE THE TEST

After patching, update tests to use typed errors:

```typescript
test("NoCorsConfiguration error on fresh bucket", () =>
  withBucket("itty-cf-r2-no-cors", (bucket) =>
    R2.getBucketCorsPolicy({
      account_id: accountId(),
      bucket_name: bucket,
    }).pipe(
      Effect.matchEffect({
        onSuccess: () => Effect.die("Expected NoCorsConfiguration"),
        onFailure: (error) =>
          Effect.gen(function* () {
            expect(error._tag).toBe("NoCorsConfiguration");
          }),
      }),
    ),
  ));
```

---

## STEP 5: REPEAT

Run tests again. If new failures appear, go back to Step 2.

```bash
bun vitest run ./test/services/r2.test.ts
```

---

## KEY FILES

| File | Purpose |
|------|---------|
| `spec/{service}.json` | Error definitions and per-operation error assignments |
| `spec/openapi.patch.jsonc` | RFC 6902 JSON Patches for spec bugs |
| `src/services/{service}.ts` | Generated client (DO NOT EDIT) |
| `src/client/response-parser.ts` | Parses responses and matches errors using trait annotations |
| `src/traits.ts` | Schema annotations for HTTP bindings and error matching |
| `test/services/{service}.test.ts` | Tests that drive discovery |

---

## SERVICE SPEC FORMAT

Each service has a `spec/{service}.json` that defines errors and their matching conditions:

```json
{
  "errors": {
    "NoSuchBucket": { "code": 10006, "status": 404 },
    "NoCorsConfiguration": { "code": 10059 },
    "QueueNotFound": { "codes": [11000, 10004], "status": 404 },
    "ValidationError": { "code": 100021 }
  },
  "operations": {
    "getBucket": {
      "errors": { "NoSuchBucket": {} }
    },
    "createQueue": {
      "errors": { "ValidationError": {}, "QueueAlreadyExists": { "code": 10003 } }
    }
  }
}
```

**Error matcher fields:**
- `code` — Single Cloudflare error code
- `codes` — Array of codes (use when multiple codes map to same error)
- `status` — HTTP status code (helps disambiguate)
- `message` — Substring match on error message

**Matching priority:** code + status + message > code + status > code only

---

## JSON PATCH FORMAT

`spec/openapi.patch.jsonc` uses RFC 6902 JSON Patch in JSONC (allows comments).

| Operation | Use Case |
|-----------|----------|
| `add` | New paths, schemas, properties |
| `replace` | Fix enums, required arrays, property types |
| `remove` | Delete incorrect constraints |

**Comment requirement:** Every patch must explain what it fixes and how the issue was discovered.

---

## TEST PATTERNS

### Resource lifecycle helper

```typescript
const withBucket = <A, E, R>(
  name: string,
  fn: (bucket: string) => Effect.Effect<A, E, R>,
) =>
  cleanup(name).pipe(
    Effect.andThen(createBucket({ name })),
    Effect.andThen(fn(name)),
    Effect.ensuring(cleanup(name)),
  );

const cleanup = (name: string) =>
  deleteBucket({ bucket_name: name }).pipe(Effect.ignore);
```

### Error expectation

```typescript
test("NoSuchBucket on non-existent", () =>
  R2.getBucket({ account_id: accountId(), bucket_name: "does-not-exist" }).pipe(
    Effect.flip,
    Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
  ));
```

### Naming convention

- `itty-cf-{service}-{testname}`
- Deterministic — same on every run
- Enables cleanup of leftovers from crashed tests

---

## ADDING A NEW SERVICE

1. Generate: `bun generate --fetch --service myservice`
2. Write tests in `test/services/myservice.test.ts`
3. Run tests, discover failures
4. For `UnknownCloudflareError`: catalog in `error-catalog.json` + `myservice.json`
5. For `Schema decode failed`: patch in `openapi.patch.jsonc`
6. Regenerate: `bun generate --service myservice`
7. Repeat until all tests pass

---

## ARCHITECTURE

```
OpenAPI Spec + Patches → Generator → src/services/*.ts → Runtime
        ↓                    ↓              ↓               ↓
spec/openapi.patch.jsonc  spec/{service}.json  Schemas + Traits  Response Parser
```

**Generator:** `scripts/generate-clients.ts`
1. Loads spec from `.cache/openapi.json` (or fetches)
2. Applies patches from `spec/openapi.patch.jsonc`
3. Loads error definitions from `spec/{service}.json`
4. Groups operations by service
5. Generates Effect Schema request/response types with trait annotations
6. Outputs to `src/services/{service}.ts`

**Traits:** HTTP bindings and error matching as Schema annotations

| Trait | Purpose |
|-------|---------|
| `T.HttpPath(name)` | Path parameter |
| `T.HttpQuery(name)` | Query parameter |
| `T.HttpHeader(name)` | Header |
| `T.HttpBody()` | JSON body |
| `T.HttpFormData()` | Multipart form-data request |
| `T.HttpMultipartResponse()` | Multipart form-data response (returns `FormData`) |
| `T.HttpErrorCode(code)` | Match error by single code |
| `T.HttpErrorCodes([...])` | Match error by multiple codes |
| `T.HttpErrorStatus(status)` | Match error by HTTP status |
| `T.HttpErrorMessage(pattern)` | Match error by message substring |

**Response Parser:** `src/client/response-parser.ts`
1. Checks for multipart response (returns `FormData` directly)
2. Parses JSON response envelope `{ success, errors, result }`
3. On error, iterates error schemas and reads trait annotations
4. Matches error by code/status/message priority
5. Instantiates typed error class via `Schema.decodeUnknown`

---

## ENVIRONMENT

```bash
# Required
CLOUDFLARE_API_TOKEN=xxx
CLOUDFLARE_ACCOUNT_ID=xxx

# Optional (for zone-scoped tests)
CLOUDFLARE_ZONE_ID=xxx

# Download from Doppler
bun run download:env
```

---

## SERVICE NOTES

**Queues:**
- Create `http_pull` consumer before pulling messages
- Function names: `create`, `get_`, `delete_`, `update`

**R2:**
- Location enum has uppercase/lowercase variants
- Fresh buckets return `NoCorsConfiguration` (not 404)

**Workers:**
- Upload via FormData with metadata blob
- `getContent` returns `FormData` with worker modules as `File` entries
- Workflows require a worker that exports Workflow class

---

## MULTIPART RESPONSES

Some APIs return `multipart/form-data` instead of JSON (e.g., downloading worker scripts).

These are automatically detected and return `FormData`:

```typescript
const formData = yield* Workers.getContent({
  account_id: accountId(),
  script_name: "my-worker",
});

// Iterate all modules
for (const [name, file] of formData.entries()) {
  const content = yield* Effect.promise(() => (file as File).text());
  console.log(name, content);
}
```

The generator detects `multipart/form-data` response content type and:
1. Generates `type XxxResponse = FormData`
2. Annotates schema with `T.HttpMultipartResponse()`
3. Response parser returns `FormData` instead of decoding JSON
