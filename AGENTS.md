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

### OpenAPI Patches

For response schema issues (not error codes), use `spec/openapi.patch.json` to override incorrect OpenAPI definitions:

```json
{
  "paths": {
    "/accounts/{account_id}/r2/buckets/{bucket_name}": {
      "delete": {
        "operationId": "deleteBucket",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "result": { "type": "object" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

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
2. Groups operations by service (based on path patterns)
3. Generates Effect Schema classes for request/response types
4. Applies HTTP binding traits from parameter definitions
5. Outputs to `src/services/{service}.ts`

### Service Grouping

Operations are grouped by path prefix:

| Pattern | Service |
|---------|---------|
| `/zones/{zone_id}/dns_records` | `dns` |
| `/accounts/{account_id}/workers` | `workers` |
| `/accounts/{account_id}/storage/kv` | `kv` |
| `/accounts/{account_id}/r2` | `r2` |
| `/accounts/{account_id}/d1` | `d1` |

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
| R2 | `src/services/r2.ts` | R2 object storage buckets, usage, custom domains |
| Queues | `src/services/queues.ts` | Queue management, consumers, message sending/pulling |
| Workflows | `src/services/workflows.ts` | Workflow definitions, instances, versions |
| DNS | `src/services/dns.ts` | DNS record management (zone-scoped) |

## EXTERNAL REFERENCES

- [Cloudflare API Documentation](https://developers.cloudflare.com/api/)
- [Cloudflare OpenAPI Schema](https://github.com/cloudflare/api-schemas)
- [Effect Documentation](https://effect.website/)
