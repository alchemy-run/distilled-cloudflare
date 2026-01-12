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

# Testing
bun test                        # Run all tests
bun test test/services/dns.test.ts  # Single test file
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
| `T.HttpBody()` | Request/response body |
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
cd distilled-cloudflare && bun test
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
