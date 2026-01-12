/**
 * Cloudflare Workers KV API
 *
 * Operations for managing KV namespaces and key-value pairs.
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import * as KV from "distilled-cloudflare/kv";
 *
 * const program = Effect.gen(function* () {
 *   const namespaces = yield* KV.listNamespaces({
 *     account_id: "your-account-id",
 *   });
 *   return namespaces;
 * });
 * ```
 */

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// =============================================================================
// Shared Types
// =============================================================================

export const KvNamespace = Schema.Struct({
  id: Schema.String,
  title: Schema.String,
  supports_url_encoding: Schema.optional(Schema.Boolean),
});
export type KvNamespace = typeof KvNamespace.Type;

export const KvKey = Schema.Struct({
  name: Schema.String,
  expiration: Schema.optional(Schema.Number),
  metadata: Schema.optional(Schema.Unknown),
});
export type KvKey = typeof KvKey.Type;

export const ResultInfo = Schema.Struct({
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  total_count: Schema.optional(Schema.Number),
  cursor: Schema.optional(Schema.String),
});
export type ResultInfo = typeof ResultInfo.Type;

// =============================================================================
// List KV Namespaces
// =============================================================================

export const ListNamespacesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("id", "title")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces" }));
export type ListNamespacesRequest = typeof ListNamespacesRequest.Type;

export const ListNamespacesResponse = Schema.Struct({
  result: Schema.Array(KvNamespace),
  result_info: Schema.optional(ResultInfo),
});
export type ListNamespacesResponse = typeof ListNamespacesResponse.Type;

export const listNamespaces = API.makePaginated(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [],
  pagination: {
    inputToken: "page",
    outputToken: "result_info.page",
    items: "result",
    pageSize: "per_page",
  },
}));

// =============================================================================
// Create KV Namespace
// =============================================================================

export const CreateNamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  title: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/storage/kv/namespaces" }));
export type CreateNamespaceRequest = typeof CreateNamespaceRequest.Type;

export const CreateNamespaceResponse = Schema.Struct({
  result: KvNamespace,
});
export type CreateNamespaceResponse = typeof CreateNamespaceResponse.Type;

export const createNamespace = API.make(() => ({
  input: CreateNamespaceRequest,
  output: CreateNamespaceResponse,
  errors: [],
}));

// =============================================================================
// Get KV Namespace
// =============================================================================

export const GetNamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}" }));
export type GetNamespaceRequest = typeof GetNamespaceRequest.Type;

export const GetNamespaceResponse = Schema.Struct({
  result: KvNamespace,
});
export type GetNamespaceResponse = typeof GetNamespaceResponse.Type;

export const getNamespace = API.make(() => ({
  input: GetNamespaceRequest,
  output: GetNamespaceResponse,
  errors: [],
}));

// =============================================================================
// Rename KV Namespace
// =============================================================================

export const RenameNamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  title: Schema.String,
}).pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}" }));
export type RenameNamespaceRequest = typeof RenameNamespaceRequest.Type;

export const RenameNamespaceResponse = Schema.Struct({
  result: KvNamespace,
});
export type RenameNamespaceResponse = typeof RenameNamespaceResponse.Type;

export const renameNamespace = API.make(() => ({
  input: RenameNamespaceRequest,
  output: RenameNamespaceResponse,
  errors: [],
}));

// =============================================================================
// Delete KV Namespace
// =============================================================================

export const DeleteNamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}" }));
export type DeleteNamespaceRequest = typeof DeleteNamespaceRequest.Type;

export const DeleteNamespaceResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteNamespaceResponse = typeof DeleteNamespaceResponse.Type;

export const deleteNamespace = API.make(() => ({
  input: DeleteNamespaceRequest,
  output: DeleteNamespaceResponse,
  errors: [],
}));

// =============================================================================
// List Keys in Namespace
// =============================================================================

export const ListKeysRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  prefix: Schema.optional(Schema.String).pipe(T.HttpQuery("prefix")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/keys" }));
export type ListKeysRequest = typeof ListKeysRequest.Type;

export const ListKeysResponse = Schema.Struct({
  result: Schema.Array(KvKey),
  result_info: Schema.optional(ResultInfo),
});
export type ListKeysResponse = typeof ListKeysResponse.Type;

export const listKeys = API.makePaginated(() => ({
  input: ListKeysRequest,
  output: ListKeysResponse,
  errors: [],
  pagination: {
    inputToken: "cursor",
    outputToken: "result_info.cursor",
    items: "result",
    pageSize: "limit",
  },
}));

// =============================================================================
// Read Key-Value Pair (returns text value)
// =============================================================================

export const GetValueRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}" }));
export type GetValueRequest = typeof GetValueRequest.Type;

// Note: This endpoint returns raw value, not JSON wrapped
export const GetValueResponse = Schema.String;
export type GetValueResponse = typeof GetValueResponse.Type;

export const getValue = API.make(() => ({
  input: GetValueRequest,
  output: GetValueResponse,
  errors: [],
}));

// =============================================================================
// Write Key-Value Pair
// =============================================================================

export const PutValueRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
  value: Schema.String,
  expiration: Schema.optional(Schema.Number),
  expiration_ttl: Schema.optional(Schema.Number),
  metadata: Schema.optional(Schema.Unknown),
}).pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}" }));
export type PutValueRequest = typeof PutValueRequest.Type;

export const PutValueResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type PutValueResponse = typeof PutValueResponse.Type;

export const putValue = API.make(() => ({
  input: PutValueRequest,
  output: PutValueResponse,
  errors: [],
}));

// =============================================================================
// Delete Key-Value Pair
// =============================================================================

export const DeleteValueRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}" }));
export type DeleteValueRequest = typeof DeleteValueRequest.Type;

export const DeleteValueResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteValueResponse = typeof DeleteValueResponse.Type;

export const deleteValue = API.make(() => ({
  input: DeleteValueRequest,
  output: DeleteValueResponse,
  errors: [],
}));

// =============================================================================
// Bulk Write Key-Value Pairs
// =============================================================================

export const BulkWriteItem = Schema.Struct({
  key: Schema.String,
  value: Schema.String,
  expiration: Schema.optional(Schema.Number),
  expiration_ttl: Schema.optional(Schema.Number),
  metadata: Schema.optional(Schema.Unknown),
  base64: Schema.optional(Schema.Boolean),
});
export type BulkWriteItem = typeof BulkWriteItem.Type;

export const BulkWriteRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  body: Schema.Array(BulkWriteItem).pipe(T.HttpBody()),
}).pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk" }));
export type BulkWriteRequest = typeof BulkWriteRequest.Type;

export const BulkWriteResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type BulkWriteResponse = typeof BulkWriteResponse.Type;

export const bulkWrite = API.make(() => ({
  input: BulkWriteRequest,
  output: BulkWriteResponse,
  errors: [],
}));

// =============================================================================
// Bulk Delete Keys
// =============================================================================

export const BulkDeleteRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  body: Schema.Array(Schema.String).pipe(T.HttpBody()),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk" }));
export type BulkDeleteRequest = typeof BulkDeleteRequest.Type;

export const BulkDeleteResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type BulkDeleteResponse = typeof BulkDeleteResponse.Type;

export const bulkDelete = API.make(() => ({
  input: BulkDeleteRequest,
  output: BulkDeleteResponse,
  errors: [],
}));

// =============================================================================
// Get Key Metadata
// =============================================================================

export const GetMetadataRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/metadata/{key_name}" }));
export type GetMetadataRequest = typeof GetMetadataRequest.Type;

export const GetMetadataResponse = Schema.Struct({
  result: Schema.Unknown,
});
export type GetMetadataResponse = typeof GetMetadataResponse.Type;

export const getMetadata = API.make(() => ({
  input: GetMetadataRequest,
  output: GetMetadataResponse,
  errors: [],
}));
