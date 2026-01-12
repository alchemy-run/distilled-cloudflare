# distilled-cloudflare

An Effect-native Cloudflare SDK generated from the [Cloudflare OpenAPI specification](https://github.com/cloudflare/api-schemas).

## Features

- **Generated from OpenAPI spec** — 1:1 compatibility with Cloudflare APIs
- **Typed errors** — All errors are `TaggedError` classes for pattern matching
- **Effect-native** — All operations return `Effect<A, E, R>` with typed errors
- **Automatic pagination** — Stream pages or items with `.pages()` and `.items()`

## Installation

```bash
bun add distilled-cloudflare effect @effect/platform
```

## Quick Start

```typescript
import { Effect } from "effect";
import { FetchHttpClient } from "@effect/platform";
import * as dns from "distilled-cloudflare/dns";
import { Auth } from "distilled-cloudflare";

const program = Effect.gen(function* () {
  const records = yield* dns.listDnsRecords({
    zone_id: "your-zone-id",
  });
  
  return records.result;
});

program.pipe(
  Effect.provide(FetchHttpClient.layer),
  Effect.provide(Auth.fromEnv()),
  Effect.runPromise,
);
```

## Error Handling

```typescript
import { Effect } from "effect";
import * as dns from "distilled-cloudflare/dns";

const program = dns.getDnsRecord({
  zone_id: "your-zone-id",
  dns_record_id: "record-id",
}).pipe(
  Effect.catchTags({
    RecordNotFound: () => Effect.succeed({ found: false }),
    InvalidZone: (error) => Effect.fail(new Error(`Zone error: ${error.message}`)),
  }),
);
```

## Development

```bash
# Generate SDK from OpenAPI spec
bun generate

# Discover undocumented errors
bun find dns

# Run tests
bun test
```

## Architecture

See [AGENTS.md](./AGENTS.md) for detailed architecture and error discovery documentation.
