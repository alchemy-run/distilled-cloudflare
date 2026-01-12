# distilled-cloudflare

A fully typed Cloudflare SDK for [Effect](https://effect.website), generated from the [Cloudflare OpenAPI specification](https://github.com/cloudflare/api-schemas).

## Features

- **Generated from OpenAPI spec** — 1:1 compatibility with Cloudflare APIs
- **Typed errors** — All errors are `TaggedError` classes for pattern matching
- **Effect-native** — All operations return `Effect<A, E, R>` with typed errors
- **Automatic pagination** — Stream pages or items with `.pages()` and `.items()`

## Installation

```bash
npm install distilled-cloudflare effect @effect/platform
# or
bun add distilled-cloudflare effect @effect/platform
```

## Quick Start

```typescript
import { Effect } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as R2 from "distilled-cloudflare/r2";
import { Auth } from "distilled-cloudflare";

const program = Effect.gen(function* () {
  // List all R2 buckets
  const buckets = yield* R2.listBuckets({
    account_id: "your-account-id",
  });

  // Create a new bucket
  yield* R2.createBucket({
    account_id: "your-account-id",
    name: "my-new-bucket",
  });

  return buckets.result.buckets;
});

// Run with required services
program.pipe(
  Effect.provide(FetchHttpClient.layer),
  Effect.provide(Auth.fromEnv()),
  Effect.runPromise,
);
```

## Importing Services

Import service modules as namespaces:

```typescript
import * as R2 from "distilled-cloudflare/r2";
import * as KV from "distilled-cloudflare/kv";
import * as Workers from "distilled-cloudflare/workers";
import * as Queues from "distilled-cloudflare/queues";
import * as Workflows from "distilled-cloudflare/workflows";
import * as DNS from "distilled-cloudflare/dns";

// Then use operations via the namespace
R2.listBuckets({ account_id: "..." });
KV.listNamespaces({ account_id: "..." });
Workers.listScripts({ account_id: "..." });
Queues.listQueues({ account_id: "..." });
```

## Configuration

All operations require two context services: `ApiToken` and `HttpClient`.

### Authentication

Cloudflare supports two authentication methods:

```typescript
import { Auth } from "distilled-cloudflare";

// API Token (recommended) - reads from CLOUDFLARE_API_TOKEN
Effect.provide(Auth.fromEnv())

// API Key + Email - reads from CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL
Effect.provide(Auth.fromEnv())

// Static API token
Effect.provide(Auth.fromToken("your-api-token"))

// Static API key + email
Effect.provide(Auth.fromApiKey("your-api-key", "your-email@example.com"))
```

### HTTP Client

Requires an HTTP client from `@effect/platform`:

```typescript
import { FetchHttpClient } from "@effect/platform";
// or for Node.js
import { NodeHttpClient } from "@effect/platform-node";

Effect.provide(FetchHttpClient.layer)
// or
Effect.provide(NodeHttpClient.layer)
```

## Complete Examples

### R2 Storage

```typescript
import { Console, Effect } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as R2 from "distilled-cloudflare/r2";
import { Auth } from "distilled-cloudflare";

const program = Effect.gen(function* () {
  const accountId = "your-account-id";

  // List all buckets
  const buckets = yield* R2.listBuckets({ account_id: accountId });
  yield* Console.log(`Found ${buckets.result.buckets.length} buckets`);

  // Create a new bucket
  const bucket = yield* R2.createBucket({
    account_id: accountId,
    name: "my-app-bucket",
    locationHint: "wnam", // Western North America
  });
  yield* Console.log(`Created bucket: ${bucket.result.name}`);

  // Get bucket details
  const details = yield* R2.getBucket({
    account_id: accountId,
    bucket_name: "my-app-bucket",
  });
  yield* Console.log(`Bucket location: ${details.result.location}`);

  // Get bucket usage
  const usage = yield* R2.getBucketUsage({
    account_id: accountId,
    bucket_name: "my-app-bucket",
  });
  yield* Console.log(`Object count: ${usage.result.objectCount}`);

  // Configure CORS
  yield* R2.putCors({
    account_id: accountId,
    bucket_name: "my-app-bucket",
    rules: [{
      allowed: {
        origins: ["https://example.com"],
        methods: ["GET", "PUT", "POST"],
        headers: ["Content-Type"],
      },
      maxAgeSeconds: 3600,
    }],
  });

  // Delete the bucket
  yield* R2.deleteBucket({
    account_id: accountId,
    bucket_name: "my-app-bucket",
  });
});

program.pipe(
  Effect.provide(FetchHttpClient.layer),
  Effect.provide(Auth.fromEnv()),
  Effect.runPromise,
);
```

### Workers KV

```typescript
import { Console, Effect } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as KV from "distilled-cloudflare/kv";
import { Auth } from "distilled-cloudflare";

const program = Effect.gen(function* () {
  const accountId = "your-account-id";

  // Create a KV namespace
  const namespace = yield* KV.createNamespace({
    account_id: accountId,
    title: "MY_KV_NAMESPACE",
  });
  yield* Console.log(`Created namespace: ${namespace.result.id}`);

  const namespaceId = namespace.result.id;

  // Write a key-value pair
  yield* KV.putValue({
    account_id: accountId,
    namespace_id: namespaceId,
    key_name: "user:123",
    value: JSON.stringify({ name: "John", email: "john@example.com" }),
    expiration_ttl: 3600, // 1 hour TTL
  });

  // Read the value
  const value = yield* KV.getValue({
    account_id: accountId,
    namespace_id: namespaceId,
    key_name: "user:123",
  });
  yield* Console.log(`Value: ${value}`);

  // Bulk write multiple keys
  yield* KV.bulkWrite({
    account_id: accountId,
    namespace_id: namespaceId,
    body: [
      { key: "config:theme", value: "dark" },
      { key: "config:lang", value: "en" },
      { key: "config:tz", value: "UTC" },
    ],
  });

  // List all keys
  const keys = yield* KV.listKeys({
    account_id: accountId,
    namespace_id: namespaceId,
    prefix: "config:",
  });
  yield* Console.log(`Found ${keys.result.length} config keys`);

  // Delete a key
  yield* KV.deleteValue({
    account_id: accountId,
    namespace_id: namespaceId,
    key_name: "user:123",
  });

  // Delete the namespace
  yield* KV.deleteNamespace({
    account_id: accountId,
    namespace_id: namespaceId,
  });
});

program.pipe(
  Effect.provide(FetchHttpClient.layer),
  Effect.provide(Auth.fromEnv()),
  Effect.runPromise,
);
```

### Queues

```typescript
import { Console, Effect } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as Queues from "distilled-cloudflare/queues";
import { Auth } from "distilled-cloudflare";

const program = Effect.gen(function* () {
  const accountId = "your-account-id";

  // Create a queue
  const queue = yield* Queues.createQueue({
    account_id: accountId,
    queue_name: "my-task-queue",
    settings: {
      delivery_delay: 0,
    },
  });
  yield* Console.log(`Created queue: ${queue.result.queue_id}`);

  const queueId = queue.result.queue_id;

  // Send messages to the queue
  yield* Queues.sendMessages({
    account_id: accountId,
    queue_id: queueId,
    messages: [
      { body: { task: "process-order", orderId: "123" }, content_type: "json" },
      { body: { task: "send-email", userId: "456" }, content_type: "json" },
    ],
  });
  yield* Console.log("Sent 2 messages to queue");

  // Pull messages (for HTTP pull consumers)
  const messages = yield* Queues.pullMessages({
    account_id: accountId,
    queue_id: queueId,
    batch_size: 10,
    visibility_timeout_ms: 30000,
  });
  yield* Console.log(`Pulled ${messages.result.messages.length} messages`);

  // Acknowledge processed messages
  if (messages.result.messages.length > 0) {
    yield* Queues.ackMessages({
      account_id: accountId,
      queue_id: queueId,
      acks: messages.result.messages.map((m) => ({ lease_id: m.lease_id! })),
    });
  }

  // List queue consumers
  const consumers = yield* Queues.listConsumers({
    account_id: accountId,
    queue_id: queueId,
  });
  yield* Console.log(`Queue has ${consumers.result.length} consumers`);

  // Delete the queue
  yield* Queues.deleteQueue({
    account_id: accountId,
    queue_id: queueId,
  });
});

program.pipe(
  Effect.provide(FetchHttpClient.layer),
  Effect.provide(Auth.fromEnv()),
  Effect.runPromise,
);
```

### Workers

```typescript
import { Console, Effect } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as Workers from "distilled-cloudflare/workers";
import { Auth } from "distilled-cloudflare";

const program = Effect.gen(function* () {
  const accountId = "your-account-id";

  // List all Worker scripts
  const scripts = yield* Workers.listScripts({
    account_id: accountId,
  });
  yield* Console.log(`Found ${scripts.result.length} Worker scripts`);

  for (const script of scripts.result) {
    yield* Console.log(`  - ${script.id} (modified: ${script.modified_on})`);
  }

  // Get a specific script
  const script = yield* Workers.getScript({
    account_id: accountId,
    script_name: "my-worker",
  });
  yield* Console.log(`Script handlers: ${script.result.handlers?.join(", ")}`);

  // Get script settings (bindings, compatibility, etc.)
  const settings = yield* Workers.getScriptSettings({
    account_id: accountId,
    script_name: "my-worker",
  });
  yield* Console.log(`Bindings: ${settings.result.bindings?.length ?? 0}`);

  // List deployments
  const deployments = yield* Workers.listDeployments({
    account_id: accountId,
    script_name: "my-worker",
  });
  yield* Console.log(`Deployments: ${deployments.result.deployments?.length ?? 0}`);

  // Get cron triggers
  const crons = yield* Workers.getCronTriggers({
    account_id: accountId,
    script_name: "my-worker",
  });
  for (const cron of crons.result.schedules) {
    yield* Console.log(`  Cron: ${cron.cron}`);
  }

  // Get workers subdomain
  const subdomain = yield* Workers.getSubdomain({
    account_id: accountId,
  });
  yield* Console.log(`Workers subdomain: ${subdomain.result.subdomain}.workers.dev`);
});

program.pipe(
  Effect.provide(FetchHttpClient.layer),
  Effect.provide(Auth.fromEnv()),
  Effect.runPromise,
);
```

## Error Handling

All operations return typed errors that can be pattern-matched:

```typescript
import { Effect } from "effect";
import * as R2 from "distilled-cloudflare/r2";

const program = R2.getBucket({
  account_id: "your-account-id",
  bucket_name: "missing-bucket",
}).pipe(
  Effect.catchTags({
    CloudflareError: (error) =>
      Effect.succeed({ found: false, code: error.code, message: error.message }),
    CloudflareNetworkError: (error) =>
      Effect.fail(new Error(`Network error: ${error.message}`)),
    CloudflareHttpError: (error) =>
      Effect.fail(new Error(`HTTP ${error.status}: ${error.statusText}`)),
  }),
);
```

### Error Types

| Error Type | Description |
|------------|-------------|
| `CloudflareError` | API error with code and message from response |
| `UnknownCloudflareError` | Uncatalogued error code (useful for error discovery) |
| `CloudflareNetworkError` | Transport-level failure |
| `CloudflareHttpError` | Non-2xx response without parseable error body |

### Error Categories

Errors are classified into categories for easier handling:

```typescript
import { Category } from "distilled-cloudflare";
```

| Category | Description |
|----------|-------------|
| `AuthError` | Authentication/authorization failures |
| `BadRequestError` | Invalid request parameters |
| `ConflictError` | Resource state conflicts (already exists, in use) |
| `NotFoundError` | Resource not found |
| `QuotaError` | Service quota exceeded |
| `ThrottlingError` | Rate limiting |
| `TimeoutError` | Request timeouts |
| `ServerError` | Cloudflare service errors |
| `NetworkError` | Network/transport failures |

#### Category Predicates

Use predicates with `Effect.retry`:

```typescript
import { Effect } from "effect";
import { Category } from "distilled-cloudflare";
import * as R2 from "distilled-cloudflare/r2";

const program = R2.createBucket({
  account_id: "your-account-id",
  name: "my-bucket",
}).pipe(
  Effect.retry({
    times: 3,
    while: Category.isThrottlingError,
  }),
);
```

Available predicates: `isAuthError`, `isNotFoundError`, `isConflictError`, `isThrottlingError`, `isServerError`.

## Pagination

Paginated operations expose `.pages()` and `.items()` methods for automatic pagination.

### Stream Full Pages with `.pages()`

```typescript
import { Effect } from "effect";
import * as R2 from "distilled-cloudflare/r2";

const program = Effect.gen(function* () {
  const allPages = yield* R2.listBuckets.pages({
    account_id: "your-account-id",
    per_page: 50,
  });

  let totalBuckets = 0;
  for (const page of allPages) {
    totalBuckets += page.result.buckets.length;
  }

  console.log(`Found ${totalBuckets} buckets across ${allPages.length} pages`);
});
```

### Stream Individual Items with `.items()`

```typescript
import { Effect } from "effect";
import * as KV from "distilled-cloudflare/kv";

const program = Effect.gen(function* () {
  const allKeys = yield* KV.listKeys.items({
    account_id: "your-account-id",
    namespace_id: "your-namespace-id",
    limit: 100,
  });

  console.log(`Found ${allKeys.length} keys`);
});
```

---

## Architecture

### Code Generation

Services are generated by [`scripts/generate-clients.ts`](./scripts/generate-clients.ts) from the [Cloudflare OpenAPI specification](https://github.com/cloudflare/api-schemas). The generator:

1. Fetches and caches the OpenAPI spec
2. Groups operations by service (R2, KV, Workers, etc.)
3. Generates Effect Schema classes with HTTP trait annotations
4. Outputs TypeScript files to [`src/services/`](./src/services/)

```bash
# Fetch latest spec and generate all services
bun generate --fetch

# Generate a single service
bun generate --service r2

# Generate all services from cached spec
bun generate
```

### HTTP Traits as Annotations

HTTP binding traits are modeled as Effect Schema annotations in [`src/traits.ts`](./src/traits.ts):

| Trait | Annotation | Purpose |
|-------|------------|---------|
| Path parameter | `T.HttpPath("name")` | Bind member to URL path parameter |
| Query parameter | `T.HttpQuery("name")` | Bind member to query string |
| Header | `T.HttpHeader("X-Custom")` | Bind member to HTTP header |
| Body | `T.HttpBody()` | Bind member to request body |
| Operation | `T.Http({ method, path })` | HTTP method and path template |

### Generated Code Example

Request schemas include HTTP binding annotations:

```typescript
export const ListBucketsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets" }));
```

Operations tie input, output, and errors together:

```typescript
export const listBuckets = API.makePaginated(() => ({
  input: ListBucketsRequest,
  output: ListBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "cursor",
    outputToken: "result_info.cursor",
    items: "result.buckets",
    pageSize: "per_page",
  },
}));
```

### Request Flow

```
Input → request-builder.ts → Extract path/query/headers/body
      → api.ts → Add authentication headers
      → HttpClient → Execute request
      → response-parser.ts → Parse JSON → Schema decode → Effect<Output, Error>
```

## Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run a specific test file
bun vitest run ./test/services/r2.test.ts
```

Tests require Cloudflare credentials. Set the following environment variables:

```bash
export CLOUDFLARE_API_TOKEN="your-api-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
```

## Development

```bash
# Type check
bun typecheck

# Format and lint
bun check
bun check:write  # Auto-fix issues
```

## License

MIT
