/**
 * Cloudflare KV API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service kv
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type { HttpClient } from "@effect/platform";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  CloudflareError,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

export interface ListNamespacesRequest {
  account_id: string;
  page?: number;
  per_page?: number;
  order?: "id" | "title";
  direction?: "asc" | "desc";
}

export const ListNamespacesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("id", "title")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces" }),
).annotations({ identifier: "ListNamespacesRequest" }) as unknown as Schema.Schema<ListNamespacesRequest>;

export interface ListNamespacesResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListNamespacesResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.Struct({
  id: Schema.String,
  supports_url_encoding: Schema.optional(Schema.Boolean),
  title: Schema.String
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListNamespacesResponse" }) as unknown as Schema.Schema<ListNamespacesResponse>;

export const listNamespaces: (
  input: ListNamespacesRequest
) => Effect.Effect<
  ListNamespacesResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [],
}));

export interface CreateANamespaceRequest {
  account_id: string;
  body: { title: string };
}

export const CreateANamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  title: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/storage/kv/namespaces" }),
).annotations({ identifier: "CreateANamespaceRequest" }) as unknown as Schema.Schema<CreateANamespaceRequest>;

export interface CreateANamespaceResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateANamespaceResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  id: Schema.String,
  supports_url_encoding: Schema.optional(Schema.Boolean),
  title: Schema.String
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateANamespaceResponse" }) as unknown as Schema.Schema<CreateANamespaceResponse>;

export const createANamespace: (
  input: CreateANamespaceRequest
) => Effect.Effect<
  CreateANamespaceResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateANamespaceRequest,
  output: CreateANamespaceResponse,
  errors: [],
}));

export interface GetANamespaceRequest {
  namespace_id: string;
  account_id: string;
}

export const GetANamespaceRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}" }),
).annotations({ identifier: "GetANamespaceRequest" }) as unknown as Schema.Schema<GetANamespaceRequest>;

export interface GetANamespaceResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetANamespaceResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  id: Schema.String,
  supports_url_encoding: Schema.optional(Schema.Boolean),
  title: Schema.String
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetANamespaceResponse" }) as unknown as Schema.Schema<GetANamespaceResponse>;

export const getANamespace: (
  input: GetANamespaceRequest
) => Effect.Effect<
  GetANamespaceResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetANamespaceRequest,
  output: GetANamespaceResponse,
  errors: [],
}));

export interface WorkersKvNamespaceRenameANamespaceRequest {
  namespace_id: string;
  account_id: string;
  body: { title: string };
}

export const WorkersKvNamespaceRenameANamespaceRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  title: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}" }),
).annotations({ identifier: "WorkersKvNamespaceRenameANamespaceRequest" }) as unknown as Schema.Schema<WorkersKvNamespaceRenameANamespaceRequest>;

export interface WorkersKvNamespaceRenameANamespaceResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkersKvNamespaceRenameANamespaceResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  id: Schema.String,
  supports_url_encoding: Schema.optional(Schema.Boolean),
  title: Schema.String
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkersKvNamespaceRenameANamespaceResponse" }) as unknown as Schema.Schema<WorkersKvNamespaceRenameANamespaceResponse>;

export const workersKvNamespaceRenameANamespace: (
  input: WorkersKvNamespaceRenameANamespaceRequest
) => Effect.Effect<
  WorkersKvNamespaceRenameANamespaceResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceRenameANamespaceRequest,
  output: WorkersKvNamespaceRenameANamespaceResponse,
  errors: [],
}));

export interface WorkersKvNamespaceRemoveANamespaceRequest {
  namespace_id: string;
  account_id: string;
}

export const WorkersKvNamespaceRemoveANamespaceRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}" }),
).annotations({ identifier: "WorkersKvNamespaceRemoveANamespaceRequest" }) as unknown as Schema.Schema<WorkersKvNamespaceRemoveANamespaceRequest>;

export interface WorkersKvNamespaceRemoveANamespaceResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkersKvNamespaceRemoveANamespaceResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkersKvNamespaceRemoveANamespaceResponse" }) as unknown as Schema.Schema<WorkersKvNamespaceRemoveANamespaceResponse>;

export const workersKvNamespaceRemoveANamespace: (
  input: WorkersKvNamespaceRemoveANamespaceRequest
) => Effect.Effect<
  WorkersKvNamespaceRemoveANamespaceResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceRemoveANamespaceRequest,
  output: WorkersKvNamespaceRemoveANamespaceResponse,
  errors: [],
}));

export interface WorkersKvNamespaceWriteMultipleKeyValuePairsRequest {
  namespace_id: string;
  account_id: string;
  body: { base64?: boolean; expiration?: number; expiration_ttl?: number; key: string; metadata?: unknown; value: string }[];
}

export const WorkersKvNamespaceWriteMultipleKeyValuePairsRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(Schema.Struct({
  base64: Schema.optional(Schema.Boolean),
  expiration: Schema.optional(Schema.Number),
  expiration_ttl: Schema.optional(Schema.Number),
  key: Schema.String,
  metadata: Schema.optional(Schema.Unknown),
  value: Schema.String
})).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk" }),
).annotations({ identifier: "WorkersKvNamespaceWriteMultipleKeyValuePairsRequest" }) as unknown as Schema.Schema<WorkersKvNamespaceWriteMultipleKeyValuePairsRequest>;

export interface WorkersKvNamespaceWriteMultipleKeyValuePairsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkersKvNamespaceWriteMultipleKeyValuePairsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  successful_key_count: Schema.optional(Schema.Number),
  unsuccessful_keys: Schema.optional(Schema.Array(Schema.String))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkersKvNamespaceWriteMultipleKeyValuePairsResponse" }) as unknown as Schema.Schema<WorkersKvNamespaceWriteMultipleKeyValuePairsResponse>;

export const workersKvNamespaceWriteMultipleKeyValuePairs: (
  input: WorkersKvNamespaceWriteMultipleKeyValuePairsRequest
) => Effect.Effect<
  WorkersKvNamespaceWriteMultipleKeyValuePairsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceWriteMultipleKeyValuePairsRequest,
  output: WorkersKvNamespaceWriteMultipleKeyValuePairsResponse,
  errors: [],
}));

export interface DeleteMultipleKeyValuePairsDeprecatedRequest {
  namespace_id: string;
  account_id: string;
  body: string[];
}

export const DeleteMultipleKeyValuePairsDeprecatedRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(Schema.String).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk" }),
).annotations({ identifier: "DeleteMultipleKeyValuePairsDeprecatedRequest" }) as unknown as Schema.Schema<DeleteMultipleKeyValuePairsDeprecatedRequest>;

export interface DeleteMultipleKeyValuePairsDeprecatedResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteMultipleKeyValuePairsDeprecatedResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  successful_key_count: Schema.optional(Schema.Number),
  unsuccessful_keys: Schema.optional(Schema.Array(Schema.String))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteMultipleKeyValuePairsDeprecatedResponse" }) as unknown as Schema.Schema<DeleteMultipleKeyValuePairsDeprecatedResponse>;

export const deleteMultipleKeyValuePairsDeprecated: (
  input: DeleteMultipleKeyValuePairsDeprecatedRequest
) => Effect.Effect<
  DeleteMultipleKeyValuePairsDeprecatedResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteMultipleKeyValuePairsDeprecatedRequest,
  output: DeleteMultipleKeyValuePairsDeprecatedResponse,
  errors: [],
}));

export interface DeleteMultipleKeyValuePairsRequest {
  namespace_id: string;
  account_id: string;
  body: string[];
}

export const DeleteMultipleKeyValuePairsRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(Schema.String).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/delete" }),
).annotations({ identifier: "DeleteMultipleKeyValuePairsRequest" }) as unknown as Schema.Schema<DeleteMultipleKeyValuePairsRequest>;

export interface DeleteMultipleKeyValuePairsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteMultipleKeyValuePairsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  successful_key_count: Schema.optional(Schema.Number),
  unsuccessful_keys: Schema.optional(Schema.Array(Schema.String))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteMultipleKeyValuePairsResponse" }) as unknown as Schema.Schema<DeleteMultipleKeyValuePairsResponse>;

export const deleteMultipleKeyValuePairs: (
  input: DeleteMultipleKeyValuePairsRequest
) => Effect.Effect<
  DeleteMultipleKeyValuePairsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteMultipleKeyValuePairsRequest,
  output: DeleteMultipleKeyValuePairsResponse,
  errors: [],
}));

export interface GetMultipleKeyValuePairsRequest {
  namespace_id: string;
  account_id: string;
  body: { keys: string[]; type?: "text" | "json"; withMetadata?: boolean };
}

export const GetMultipleKeyValuePairsRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  keys: Schema.Array(Schema.String),
  type: Schema.optional(Schema.Literal("text", "json")),
  withMetadata: Schema.optional(Schema.Boolean)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/get" }),
).annotations({ identifier: "GetMultipleKeyValuePairsRequest" }) as unknown as Schema.Schema<GetMultipleKeyValuePairsRequest>;

export interface GetMultipleKeyValuePairsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetMultipleKeyValuePairsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Union(Schema.Struct({
  values: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean, Schema.Record({ key: Schema.String, value: Schema.Unknown })) }))
}), Schema.Struct({
  values: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Struct({
  expiration: Schema.optional(Schema.Number),
  metadata: Schema.Unknown,
  value: Schema.Unknown
}) }))
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetMultipleKeyValuePairsResponse" }) as unknown as Schema.Schema<GetMultipleKeyValuePairsResponse>;

export const getMultipleKeyValuePairs: (
  input: GetMultipleKeyValuePairsRequest
) => Effect.Effect<
  GetMultipleKeyValuePairsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMultipleKeyValuePairsRequest,
  output: GetMultipleKeyValuePairsResponse,
  errors: [],
}));

export interface ListANamespaceSKeysRequest {
  namespace_id: string;
  account_id: string;
  limit?: number;
  prefix?: string;
  cursor?: string;
}

export const ListANamespaceSKeysRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  prefix: Schema.optional(Schema.String).pipe(T.HttpQuery("prefix")),
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/keys" }),
).annotations({ identifier: "ListANamespaceSKeysRequest" }) as unknown as Schema.Schema<ListANamespaceSKeysRequest>;

export interface ListANamespaceSKeysResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListANamespaceSKeysResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.Struct({
  expiration: Schema.optional(Schema.Number),
  metadata: Schema.optional(Schema.Unknown),
  name: Schema.String
}))),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.optional(Schema.Number),
  cursor: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListANamespaceSKeysResponse" }) as unknown as Schema.Schema<ListANamespaceSKeysResponse>;

export const listANamespaceSKeys: (
  input: ListANamespaceSKeysRequest
) => Effect.Effect<
  ListANamespaceSKeysResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListANamespaceSKeysRequest,
  output: ListANamespaceSKeysResponse,
  errors: [],
}));

export interface WorkersKvNamespaceReadTheMetadataForAKeyRequest {
  key_name: string;
  namespace_id: string;
  account_id: string;
}

export const WorkersKvNamespaceReadTheMetadataForAKeyRequest = Schema.Struct({
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/metadata/{key_name}" }),
).annotations({ identifier: "WorkersKvNamespaceReadTheMetadataForAKeyRequest" }) as unknown as Schema.Schema<WorkersKvNamespaceReadTheMetadataForAKeyRequest>;

export interface WorkersKvNamespaceReadTheMetadataForAKeyResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkersKvNamespaceReadTheMetadataForAKeyResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Unknown)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkersKvNamespaceReadTheMetadataForAKeyResponse" }) as unknown as Schema.Schema<WorkersKvNamespaceReadTheMetadataForAKeyResponse>;

export const workersKvNamespaceReadTheMetadataForAKey: (
  input: WorkersKvNamespaceReadTheMetadataForAKeyRequest
) => Effect.Effect<
  WorkersKvNamespaceReadTheMetadataForAKeyResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceReadTheMetadataForAKeyRequest,
  output: WorkersKvNamespaceReadTheMetadataForAKeyResponse,
  errors: [],
}));

export interface WorkersKvNamespaceReadKeyValuePairRequest {
  key_name: string;
  namespace_id: string;
  account_id: string;
}

export const WorkersKvNamespaceReadKeyValuePairRequest = Schema.Struct({
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}" }),
).annotations({ identifier: "WorkersKvNamespaceReadKeyValuePairRequest" }) as unknown as Schema.Schema<WorkersKvNamespaceReadKeyValuePairRequest>;

export interface WorkersKvNamespaceReadKeyValuePairResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkersKvNamespaceReadKeyValuePairResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkersKvNamespaceReadKeyValuePairResponse" }) as unknown as Schema.Schema<WorkersKvNamespaceReadKeyValuePairResponse>;

export const workersKvNamespaceReadKeyValuePair: (
  input: WorkersKvNamespaceReadKeyValuePairRequest
) => Effect.Effect<
  WorkersKvNamespaceReadKeyValuePairResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceReadKeyValuePairRequest,
  output: WorkersKvNamespaceReadKeyValuePairResponse,
  errors: [],
}));

export interface WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest {
  key_name: string;
  namespace_id: string;
  account_id: string;
  expiration?: number;
  expiration_ttl?: number;
}

export const WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest = Schema.Struct({
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  expiration: Schema.optional(Schema.Number).pipe(T.HttpQuery("expiration")),
  expiration_ttl: Schema.optional(Schema.Number).pipe(T.HttpQuery("expiration_ttl"))
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}" }),
).annotations({ identifier: "WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest" }) as unknown as Schema.Schema<WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest>;

export interface WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse" }) as unknown as Schema.Schema<WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse>;

export const workersKvNamespaceWriteKeyValuePairWithMetadata: (
  input: WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest
) => Effect.Effect<
  WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest,
  output: WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse,
  errors: [],
}));

export interface DeleteKeyValuePairRequest {
  key_name: string;
  namespace_id: string;
  account_id: string;
}

export const DeleteKeyValuePairRequest = Schema.Struct({
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}" }),
).annotations({ identifier: "DeleteKeyValuePairRequest" }) as unknown as Schema.Schema<DeleteKeyValuePairRequest>;

export interface DeleteKeyValuePairResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteKeyValuePairResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteKeyValuePairResponse" }) as unknown as Schema.Schema<DeleteKeyValuePairResponse>;

export const deleteKeyValuePair: (
  input: DeleteKeyValuePairRequest
) => Effect.Effect<
  DeleteKeyValuePairResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteKeyValuePairRequest,
  output: DeleteKeyValuePairResponse,
  errors: [],
}));
