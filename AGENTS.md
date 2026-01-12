# distilled-cloudflare

An Effect-native Cloudflare SDK generated from the [Cloudflare OpenAPI specification](https://github.com/cloudflare/api-schemas).

## ARCHITECTURE

```
OpenAPI Spec → scripts/generate-clients.ts → src/services/*.ts → Runtime
     ↓                    ↓                        ↓                ↓
  Endpoints         Code Generator            Effect Schemas    Protocol
  (paths)           (parse, group,            (T.HttpPath,      (REST JSON)
                    transform)                 T.HttpQuery)
```

**Trait System:** OpenAPI parameter bindings become Schema annotations at codegen. At runtime, the client reads annotations to serialize requests and parse responses.

**Effect-Native:** All operations return `Effect<A, E, R>` with typed errors. Error categories (throttling, not found, auth) enable pattern-based error handling.

## KEY DIFFERENCES FROM distilled-aws

| Aspect | distilled-aws | distilled-cloudflare |
|--------|---------------|---------------------|
| Model Source | Smithy JSON | OpenAPI 3.x |
| Protocol | Multiple | REST JSON only |
| Authentication | AWS SigV4 | API Token |
| Errors | Named types + HTTP status | Numeric codes in body |
| Error Location | HTTP status + body | Always JSON with `success: false` |

## CLOUDFLARE ERROR STRUCTURE

All Cloudflare API responses follow this pattern:

```typescript
interface CloudflareResponse<T> {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: Array<{ code: number; message: string }>;
  result: T | null;
}
```

Errors can arrive via:
- HTTP 4XX/5XX with `success: false`
- HTTP 200 with `success: false` (common pattern)

The OpenAPI spec only defines generic `4XX` responses with no specific error codes.

## COMMANDS

```bash
# Generate SDK from OpenAPI spec
bun generate                    # All services
bun generate --service dns      # Single service
bun generate --fetch            # Fetch latest spec first

# Discover undocumented errors
bun find dns                    # Find errors for DNS service
bun find workers                # Find errors for Workers service
bun find --dry-run dns          # Preview what would be tested

# Testing (Vitest)
bun run test                              # Run all tests
bun vitest run test/services/dns.test.ts  # Single test file

# Environment setup
bun run download:env            # Download .env from Doppler (from monorepo root)
```

## KEY FILES

| What | Where |
|------|-------|
| API client factory | `src/client/api.ts` |
| Request builder | `src/client/request-builder.ts` |
| Response parser | `src/client/response-parser.ts` |
| HTTP binding traits | `src/traits.ts` |
| Authentication | `src/auth.ts` |
| Error types | `src/errors.ts` |
| Error categories | `src/category.ts` |
| Error catalog | `spec/error-catalog.json` |
| Code generator | `scripts/generate-clients.ts` |
| OpenAPI schema | `scripts/openapi-schema.ts` |
| Error discovery | `scripts/find-errors/` |
| Service modules | `src/services/*.ts` |

## ERROR DISCOVERY WORKFLOW

Cloudflare's OpenAPI spec lacks specific error codes. We discover them iteratively:

### 1. Run Error Discovery

```bash
# Set your API token
export CLOUDFLARE_API_TOKEN="your-token"

# Discover errors for a service
bun find dns
```

The tool calls API endpoints with fake/invalid inputs to trigger errors. Each new error code is recorded to `spec/error-catalog.json`.

### 2. Review and Classify Errors

Open `spec/error-catalog.json` and review new entries:

```json
{
  "codes": {
    "1003": { "name": "InvalidZone", "category": "NotFoundError" },
    "9103": { "name": "InvalidToken", "category": "AuthError" }
  }
}
```

Assign meaningful names and categories to new error codes.

### 3. Add Per-Operation Errors

Create `spec/{service}.json` to specify which errors each operation can return:

```json
{
  "operations": {
    "listDnsRecords": {
      "errors": ["InvalidZone", "AuthenticationError"]
    },
    "deleteDnsRecord": {
      "errors": ["RecordNotFound", "InvalidZone"]
    }
  }
}
```

### 4. Regenerate SDK

```bash
bun generate --service dns
```

The generator will include typed error classes in the generated service file.

### 5. Write Tests

Tests also help discover errors:

```typescript
it.effect("handles not found", () =>
  Effect.gen(function* () {
    const exit = yield* Effect.exit(
      dns.getDnsRecord({
        zone_id: zoneId,
        dns_record_id: "nonexistent",
      }),
    );

    if (Exit.isFailure(exit)) {
      // Log for discovery
      console.log("Error:", exit.cause);
    }
  }),
);
```

## TEST-DRIVEN ERROR DISCOVERY

The most effective way to discover errors is by running tests and iterating. This workflow catches errors that the automated `bun find` tool misses.

### Step 1: Run Service Tests

```bash
bun vitest run ./test/services/r2.test.ts
```

### Step 2: Identify Unknown Errors

Look for `UnknownCloudflareError` in test output:

```
(FiberFailure) UnknownCloudflareError: The CORS configuration does not exist.
```

### Step 3: Get Error Code with DEBUG

Run tests with `DEBUG=1` to see request/response details:

```bash
DEBUG=1 bun vitest run ./test/services/r2.test.ts -t "CORS"
```

If the error code isn't visible, create a quick test script to extract it:

```typescript
const result = yield* someOperation().pipe(Effect.exit);
console.log("Result:", JSON.stringify(result, null, 2));
// Output shows: { "failure": { "code": 10059, "message": "...", "_tag": "UnknownCloudflareError" } }
```

### Step 4: Add Error to Catalog

Add the discovered error code to `spec/error-catalog.json`:

```json
{
  "codes": {
    "10059": { "name": "NoCorsConfiguration", "category": "NotFoundError" }
  }
}
```

### Step 5: Map Errors to Operations

Update `spec/{service}.json` to specify which operations return this error:

```json
{
  "operations": {
    "getBucketCorsPolicy": { "errors": ["NoSuchBucket", "NoCorsConfiguration"] },
    "deleteBucketCorsPolicy": { "errors": ["NoSuchBucket", "NoCorsConfiguration"] }
  }
}
```

### Step 6: Regenerate SDK

```bash
# Regenerate error classes from catalog
bun scripts/generate-errors.ts

# Regenerate service with error mappings
bun generate --service r2
```

### Step 7: Update Tests

Update tests to properly handle the new typed errors:

```typescript
// Test that verifies correct error tag
test("NoCorsConfiguration error on fresh bucket", () =>
  withBucket("itty-cf-r2-no-cors", (bucketName) =>
    R2.getBucketCorsPolicy({
      account_id: accountId(),
      bucket_name: bucketName,
    }).pipe(
      Effect.matchEffect({
        onSuccess: () => Effect.die("Expected NoCorsConfiguration error"),
        onFailure: (error) =>
          Effect.gen(function* () {
            expect(error).toBeInstanceOf(NoCorsConfiguration);
            expect((error as NoCorsConfiguration).code).toBe(10059);
          }),
      }),
    ),
  ));
```

### Step 8: Repeat Until All Tests Pass

Run tests again and repeat steps 2-7 for any remaining unknown errors.

### OpenAPI Schema Patches

The Cloudflare OpenAPI spec has bugs. Use `spec/openapi.patch.json` to fix them.

**Patch behavior:**
- **Path patches** (`paths`): Deep merged with existing paths
- **Schema patches** (`components.schemas`): **Fully replace** the existing schema (not merged)

This means schema patches must be complete - include all properties you want to keep.

#### Common Spec Bugs

1. **Enum case mismatch**: Spec has lowercase, API returns uppercase

```json
{
  "components": {
    "schemas": {
      "r2_bucket_location": {
        "description": "Location of the bucket. API returns uppercase but spec has lowercase.",
        "enum": ["APAC", "EEUR", "ENAM", "WEUR", "WNAM", "OC", "apac", "eeur", "enam", "weur", "wnam", "oc"],
        "type": "string"
      }
    }
  }
}
```

2. **Required fields that are optional**: Spec marks fields required but API returns empty objects

```json
{
  "components": {
    "schemas": {
      "r2_lifecycle-rule": {
        "properties": {
          "conditions": {
            "properties": { "prefix": { "type": "string" } },
            "type": "object"
          },
          "enabled": { "type": "boolean" },
          "id": { "type": "string" }
        },
        "required": ["id", "enabled"],
        "type": "object"
      }
    }
  }
}
```

3. **Missing endpoints**: Add entirely new paths for undocumented APIs

```json
{
  "paths": {
    "/accounts/{account_id}/containers/applications": {
      "get": {
        "operationId": "listContainerApplications",
        "tags": ["Containers"],
        "parameters": [
          { "name": "account_id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": { "properties": { "result": { "type": "array" } } }
              }
            }
          }
        }
      }
    }
  }
}
```

#### Debugging Schema Decode Failures

When you see `CloudflareHttpError: Schema decode failed`:

1. The error body shows the actual API response
2. Compare with the generated schema in `src/services/{service}.ts`
3. Identify the mismatch (wrong enum values, required fields, type differences)
4. Add a schema patch to `spec/openapi.patch.json`
5. Regenerate: `bun generate --service {service}`

## ERROR CATALOG FORMAT

### Global Catalog (`spec/error-catalog.json`)

```json
{
  "codes": {
    "1000": { "name": "InvalidRequest", "category": "BadRequestError" },
    "9103": { "name": "InvalidToken", "category": "AuthError" }
  },
  "patterns": [
    { "regex": "not found", "name": "NotFound", "category": "NotFoundError" },
    { "regex": "already exists", "name": "AlreadyExists", "category": "ConflictError" }
  ],
  "codeRanges": [
    { "min": 1000, "max": 1999, "defaultCategory": "BadRequestError" },
    { "min": 9000, "max": 9999, "defaultCategory": "AuthError" }
  ]
}
```

### Error Classification Priority

1. **Exact code match** - Check `codes` map
2. **Message patterns** - Match against `patterns` regexes
3. **Code ranges** - Fall back to `codeRanges` defaults
4. **Unknown** - Return `UnknownCloudflareError`

### Categories

| Category | Description |
|----------|-------------|
| `AuthError` | Authentication/authorization failures |
| `BadRequestError` | Invalid parameters |
| `NotFoundError` | Resource not found |
| `ConflictError` | Resource state conflicts |
| `ThrottlingError` | Rate limiting |
| `ServerError` | Cloudflare service errors |
| `UnknownError` | Unclassified errors |

## CODE GENERATOR

`scripts/generate-clients.ts`:

1. Loads OpenAPI spec (fetches or uses cache)
2. Applies patches from `spec/openapi.patch.json` (schema patches fully replace, path patches deep merge)
3. Groups operations by service (based on path patterns)
4. Generates Effect Schema classes for request/response types
5. Applies HTTP binding traits from parameter definitions
6. Outputs to `src/services/{service}.ts`

### Response Schema Generation

Cloudflare APIs return responses in this envelope format:

```json
{ "success": true, "errors": [], "messages": [], "result": <actual data> }
```

The OpenAPI spec often uses `allOf` to combine a common wrapper with the actual result:

```json
{
  "allOf": [
    { "$ref": "#/components/schemas/api-response-common" },
    { "properties": { "result": { "$ref": "#/components/schemas/MyData" } } }
  ]
}
```

The generator:
1. **Recursively merges all `allOf` schemas** to build the complete response structure
2. **Extracts the `result` property** to generate the response schema
3. **Defaults to `Schema.NullOr(Schema.Unknown)`** when no `result` property is found (e.g., DELETE operations)

### Operation ID to Function Name Mapping

OpenAPI operation IDs are transformed to function names via `scripts/openapi-schema.ts`:

| Operation ID | Function Name |
|--------------|---------------|
| `queues-create` | `create` |
| `queues-get` | `get_` (underscore for reserved words) |
| `queues-delete` | `delete_` |
| `queues-purge-get` | `get_1` (collision with `queues-get`) |

**Important:** When adding errors to `spec/{service}.json`, use the **generated function name**, not the operation ID:

```json
{
  "operations": {
    "create": { "errors": ["QueueAlreadyExists", "InvalidQueueName"] },
    "get_": { "errors": ["QueueNotFound"] },
    "delete_": { "errors": ["QueueNotFound"] }
  }
}
```

### Service Grouping

Operations are grouped by path prefix:

| Pattern | Service |
|---------|---------|
| `/zones/{zone_id}/dns_records` | `dns` |
| `/accounts/{account_id}/workers` | `workers` |
| `/accounts/{account_id}/storage/kv` | `kv` |
| `/accounts/{account_id}/r2` | `r2` |
| `/accounts/{account_id}/d1` | `d1` |
| `/accounts/{account_id}/queues` | `queues` |

## TRAITS SYSTEM

Simpler than distilled-aws since Cloudflare uses only REST JSON:

| Trait | Purpose |
|-------|---------|
| `T.HttpPath(name)` | Path parameter binding |
| `T.HttpQuery(name)` | Query parameter binding |
| `T.HttpHeader(name)` | Header binding |
| `T.HttpBody()` | JSON request/response body |
| `T.HttpTextBody(contentType)` | Plain text body (e.g., `application/javascript`) |
| `T.HttpFormData()` | Multipart form-data body (e.g., worker uploads) |
| `T.Http({ method, path })` | Operation metadata |

### Example

```typescript
export class ListDnsRecordsRequest extends Schema.Class<ListDnsRecordsRequest>(
  "ListDnsRecordsRequest",
)({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
}, T.all(
  T.Http({ method: "GET", path: "/zones/{zone_id}/dns_records" }),
)) {}
```

## TESTING

**Test runner:** Vitest (via `@effect/vitest`)

**File naming:** `test/services/{service}.test.ts`

**Environment variables (choose one auth method):**
- `CLOUDFLARE_API_TOKEN` - Scoped API token (preferred)
- OR `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL` - Global API key

**Required for tests:**
- `CLOUDFLARE_ACCOUNT_ID` - Account ID for account-scoped tests
- `CLOUDFLARE_ZONE_ID` - Zone ID for zone-scoped tests (optional, some tests skip)

**Getting credentials via Doppler:**

From the monorepo root:

```bash
bun run download:env
```

This downloads secrets from Doppler to `.env` in the repo root. Tests automatically load this file via `vitest.config.ts`.

**Running tests:**

```bash
bun run test                              # Run all tests
bun vitest run test/services/dns.test.ts  # Single test file
bun vitest run --watch                    # Watch mode
```

**Test Helper:**

The project includes a test helper at `test/test.ts` that provides:
- Common Effect layers (HTTP client, auth, logging)
- Helper functions (`getAccountId()`, `getZoneId()`, `hasCredentials()`)
- Consistent test timeout handling

**Test patterns:**

```typescript
import { describe } from "@effect/vitest";
import { expect } from "vitest";
import * as Effect from "effect/Effect";
import * as KV from "../../src/services/kv.ts";
import { test, getAccountId, hasCredentials } from "../test.ts";

describe.skipIf(!hasCredentials())("KV API", () => {
  test("should list KV namespaces", () =>
    Effect.gen(function* () {
      const result = yield* KV.listNamespaces({
        account_id: getAccountId(),
      });

      expect(result).toBeDefined();
      expect(result.result).toBeInstanceOf(Array);
      console.log(`Found ${result.result.length} KV namespaces`);
    }),
  );
});
```

**Resource lifecycle helpers (`withXxx` functions):**

Each test MUST create its own isolated resources. **NEVER** use `getFirstXxx()` patterns that depend on pre-existing resources in the account.

**Why `getFirstXxx` is BAD:**
- Tests become flaky - they depend on account state
- Tests can interfere with each other
- Tests can't run in parallel
- Tests pollute the account with leftover resources
- Tests break when run on a clean account

**The `withXxx` pattern:**

Every test should use a `withXxx` helper that:
1. Cleans up any leftover resources from previous runs (idempotent)
2. Creates a fresh resource with a deterministic name
3. Runs the test
4. Cleans up the resource (using `Effect.ensuring`)

```typescript
// GOOD: Isolated resource per test
const withBucket = <A, E, R>(
  name: string,
  fn: (bucketName: string) => Effect.Effect<A, E, R>,
) =>
  cleanup(name).pipe(
    Effect.andThen(createBucket({ name })),
    Effect.andThen(fn(name)),
    Effect.ensuring(cleanup(name)),
  );

test("read bucket", () =>
  withBucket("itty-cf-r2-read", (bucket) =>
    Effect.gen(function* () {
      const response = yield* getBucket({ bucket_name: bucket });
      expect(response.result).toBeDefined();
    }),
  ));

// BAD: Depends on pre-existing resources
const getFirstBucket = () =>
  Effect.gen(function* () {
    const response = yield* listBuckets({ account_id: accountId() });
    if (response.result.length === 0) {
      return yield* Effect.fail(new NoBucketsAvailable());
    }
    return response.result[0]; // What if this is someone else's bucket?
  });
```

**Naming convention:**
- Use deterministic names like `itty-cf-{service}-{testname}`
- Never use `Date.now()` or random suffixes
- Same name on every test run enables cleanup of leftovers

**Cleanup helpers:**
- Always create a `cleanup(name)` helper that deletes and ignores errors
- Call cleanup BEFORE creating (handles leftover from crashed tests)
- Call cleanup AFTER via `Effect.ensuring` (handles test failures)

```typescript
const cleanup = (name: string) =>
  deleteBucket({ bucket_name: name }).pipe(Effect.ignore);
```

**Worker and Workflow resources:**

Workers can be uploaded via the API using `FormData`. The SDK supports this via `T.HttpFormData()` trait:

```typescript
// Create FormData for worker upload
const createWorkerFormData = (script: string) => {
  const formData = new FormData();
  formData.append(
    "worker.js",
    new Blob([script], { type: "application/javascript+module" }),
    "worker.js",
  );
  formData.append(
    "metadata",
    new Blob([JSON.stringify({
      main_module: "worker.js",
      compatibility_date: "2024-01-01",
    })], { type: "application/json" }),
  );
  return formData;
};

// Upload worker
yield* Workers.workerScriptUploadWorkerModule({
  account_id: accountId(),
  script_name: "my-worker",
  body: createWorkerFormData(WORKER_SCRIPT),
});
```

Workflows require a Worker that exports a Workflow class, then a Workflow resource pointing to it.

**Queue-specific patterns:**

Queues require special setup for certain operations:

```typescript
// To pull messages via HTTP, you MUST create an http_pull consumer first
yield* Queues.createConsumer({
  account_id: accountId(),
  queue_id: queueId,
  body: {
    type: "http_pull",
    settings: {
      batch_size: 10,
      visibility_timeout_ms: 30000,
    },
  },
});

// Now you can pull messages
const messages = yield* Queues.queuesPullMessages({
  account_id: accountId(),
  queue_id: queueId,
  body: { batch_size: 10, visibility_timeout_ms: 30000 },
});

// Push messages require body and content_type
yield* Queues.queuesPushMessage({
  account_id: accountId(),
  queue_id: queueId,
  body: { body: "message content", content_type: "text" },
});
```

**Queue test helper pattern:**

```typescript
const withQueue = <A, E, R>(
  name: string,
  fn: (queueId: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    yield* cleanupByName(name);
    
    const created = yield* Queues.create({
      account_id: accountId(),
      body: { queue_name: name },
    });
    
    const queueId = (created.result as { queue_id: string }).queue_id;
    return yield* fn(queueId);
  }).pipe(Effect.ensuring(cleanupByName(name)));
```

**Use `Effect.ensuring` for cleanup, NOT `try/finally`:**

```typescript
// GOOD: Effect.ensuring guarantees cleanup
fn(name).pipe(Effect.ensuring(cleanup(name)))

// BAD: try/finally doesn't work in Effect.gen
Effect.gen(function* () {
  try {
    return yield* fn(name);
  } finally {
    yield* cleanup(name); // This doesn't work as expected!
  }
});
```

## CONVENTIONS

**Code:**
- `const` arrow functions, `Effect.gen` + `pipe`
- `Effect.retry` + `Schedule` for retries
- Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`

**Services:**
- One file per Cloudflare service
- Export operation functions as named exports
- Export request/response classes for consumers
- Include JSDoc with usage examples

**Errors:**
- Use semantic names (not just codes)
- Classify into categories for pattern matching
- Document which operations return which errors

## ADDING A NEW SERVICE

1. **Generate from OpenAPI:**
   ```bash
   bun generate --fetch --service myservice
   ```

2. **Run error discovery:**
   ```bash
   bun find myservice
   ```

3. **Review and classify errors** in `spec/error-catalog.json`

4. **Create per-operation error patches** in `spec/myservice.json`

5. **Regenerate with errors:**
   ```bash
   bun generate --service myservice
   ```

6. **Write tests** in `test/services/myservice.test.ts`

7. **Update exports** in `src/index.ts` if needed

## AVAILABLE SERVICES

| Service | File | Description |
|---------|------|-------------|
| Workers | `src/services/workers.ts` | Worker scripts, settings, deployments, versions, cron triggers |
| KV | `src/services/kv.ts` | Workers KV namespaces and key-value operations |
| R2 | `src/services/r2.ts` | R2 object storage buckets, CORS, lifecycle, public access |
| Queues | `src/services/queues.ts` | Queue CRUD, consumers (http_pull), message push/pull, purge |
| Workflows | `src/services/workflows.ts` | Workflow definitions, instances, versions |
| DNS | `src/services/dns.ts` | DNS record management (zone-scoped) |

### Service-Specific Notes

**Queues:**
- Use `create`, `get_`, `delete_`, `update` for queue CRUD
- Create `http_pull` consumer before calling `queuesPullMessages`
- Message push requires `body` and `content_type` fields
- Purge status (`get_1`) returns null until a purge is triggered

**R2:**
- Bucket location enum: API returns uppercase (`WNAM`), spec has lowercase
- Lifecycle rules: `conditions` object may be empty (no prefix)
- Fresh buckets have no CORS config (returns `NoCorsConfiguration` error)

## EXTERNAL REFERENCES

- [Cloudflare API Documentation](https://developers.cloudflare.com/api/)
- [Cloudflare OpenAPI Schema](https://github.com/cloudflare/api-schemas)
- [Effect Documentation](https://effect.website/)
