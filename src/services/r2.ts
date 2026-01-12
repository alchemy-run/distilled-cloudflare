/**
 * Cloudflare R2 API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service r2
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
import {
  BucketConflict,
  BucketNotEmpty,
  InvalidBucketName,
  NoSuchBucket,
  TooManyBuckets,
} from "../errors/generated.ts";

export interface ListCatalogsRequest {
  account_id: string;
}

export const ListCatalogsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2-catalog" }),
).annotations({ identifier: "ListCatalogsRequest" }) as unknown as Schema.Schema<ListCatalogsRequest>;

export interface ListCatalogsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListCatalogsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  warehouses: Schema.Array(Schema.Struct({
  bucket: Schema.String,
  credential_status: Schema.optional(Schema.String),
  id: Schema.UUID,
  maintenance_config: Schema.optional(Schema.Struct({})),
  name: Schema.String,
  status: Schema.Literal("active", "inactive")
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListCatalogsResponse" }) as unknown as Schema.Schema<ListCatalogsResponse>;

export const listCatalogs: (
  input: ListCatalogsRequest
) => Effect.Effect<
  ListCatalogsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCatalogsRequest,
  output: ListCatalogsResponse,
  errors: [],
}));

export interface GetCatalogDetailsRequest {
  account_id: string;
  bucket_name: string;
}

export const GetCatalogDetailsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2-catalog/{bucket_name}" }),
).annotations({ identifier: "GetCatalogDetailsRequest" }) as unknown as Schema.Schema<GetCatalogDetailsRequest>;

export interface GetCatalogDetailsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetCatalogDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  bucket: Schema.String,
  credential_status: Schema.optional(Schema.String),
  id: Schema.UUID,
  maintenance_config: Schema.optional(Schema.Struct({})),
  name: Schema.String,
  status: Schema.Literal("active", "inactive")
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetCatalogDetailsResponse" }) as unknown as Schema.Schema<GetCatalogDetailsResponse>;

export const getCatalogDetails: (
  input: GetCatalogDetailsRequest
) => Effect.Effect<
  GetCatalogDetailsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCatalogDetailsRequest,
  output: GetCatalogDetailsResponse,
  errors: [],
}));

export interface StoreCredentialsRequest {
  account_id: string;
  bucket_name: string;
  body: { token: string };
}

export const StoreCredentialsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  body: Schema.Struct({
  token: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/r2-catalog/{bucket_name}/credential" }),
).annotations({ identifier: "StoreCredentialsRequest" }) as unknown as Schema.Schema<StoreCredentialsRequest>;

export interface StoreCredentialsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StoreCredentialsResponse = Schema.Struct({
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
}).annotations({ identifier: "StoreCredentialsResponse" }) as unknown as Schema.Schema<StoreCredentialsResponse>;

export const storeCredentials: (
  input: StoreCredentialsRequest
) => Effect.Effect<
  StoreCredentialsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StoreCredentialsRequest,
  output: StoreCredentialsResponse,
  errors: [],
}));

export interface DisableCatalogRequest {
  account_id: string;
  bucket_name: string;
}

export const DisableCatalogRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/r2-catalog/{bucket_name}/disable" }),
).annotations({ identifier: "DisableCatalogRequest" }) as unknown as Schema.Schema<DisableCatalogRequest>;

export interface DisableCatalogResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DisableCatalogResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DisableCatalogResponse" }) as unknown as Schema.Schema<DisableCatalogResponse>;

export const disableCatalog: (
  input: DisableCatalogRequest
) => Effect.Effect<
  DisableCatalogResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableCatalogRequest,
  output: DisableCatalogResponse,
  errors: [],
}));

export interface EnableCatalogRequest {
  account_id: string;
  bucket_name: string;
}

export const EnableCatalogRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/r2-catalog/{bucket_name}/enable" }),
).annotations({ identifier: "EnableCatalogRequest" }) as unknown as Schema.Schema<EnableCatalogRequest>;

export interface EnableCatalogResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const EnableCatalogResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  id: Schema.UUID,
  name: Schema.String
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "EnableCatalogResponse" }) as unknown as Schema.Schema<EnableCatalogResponse>;

export const enableCatalog: (
  input: EnableCatalogRequest
) => Effect.Effect<
  EnableCatalogResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EnableCatalogRequest,
  output: EnableCatalogResponse,
  errors: [],
}));

export interface GetMaintenanceConfigRequest {
  account_id: string;
  bucket_name: string;
}

export const GetMaintenanceConfigRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2-catalog/{bucket_name}/maintenance-configs" }),
).annotations({ identifier: "GetMaintenanceConfigRequest" }) as unknown as Schema.Schema<GetMaintenanceConfigRequest>;

export interface GetMaintenanceConfigResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetMaintenanceConfigResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  credential_status: Schema.Literal("present", "absent"),
  maintenance_config: Schema.Struct({
  compaction: Schema.optional(Schema.Struct({
  state: Schema.Literal("enabled", "disabled"),
  target_size_mb: Schema.Literal("64", "128", "256", "512")
})),
  snapshot_expiration: Schema.optional(Schema.Struct({
  max_snapshot_age: Schema.String,
  min_snapshots_to_keep: Schema.Number,
  state: Schema.Literal("enabled", "disabled")
}))
})
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetMaintenanceConfigResponse" }) as unknown as Schema.Schema<GetMaintenanceConfigResponse>;

export const getMaintenanceConfig: (
  input: GetMaintenanceConfigRequest
) => Effect.Effect<
  GetMaintenanceConfigResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMaintenanceConfigRequest,
  output: GetMaintenanceConfigResponse,
  errors: [],
}));

export interface UpdateMaintenanceConfigRequest {
  account_id: string;
  bucket_name: string;
  body: unknown;
}

export const UpdateMaintenanceConfigRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  body: Schema.Struct({
  compaction: Schema.optional(Schema.Struct({
  state: Schema.optional(Schema.Literal("enabled", "disabled")),
  target_size_mb: Schema.optional(Schema.Literal("64", "128", "256", "512"))
})),
  snapshot_expiration: Schema.optional(Schema.Struct({
  max_snapshot_age: Schema.optional(Schema.String),
  min_snapshots_to_keep: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.Literal("enabled", "disabled"))
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/r2-catalog/{bucket_name}/maintenance-configs" }),
).annotations({ identifier: "UpdateMaintenanceConfigRequest" }) as unknown as Schema.Schema<UpdateMaintenanceConfigRequest>;

export interface UpdateMaintenanceConfigResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateMaintenanceConfigResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  compaction: Schema.optional(Schema.Struct({
  state: Schema.Literal("enabled", "disabled"),
  target_size_mb: Schema.Literal("64", "128", "256", "512")
})),
  snapshot_expiration: Schema.optional(Schema.Struct({
  max_snapshot_age: Schema.String,
  min_snapshots_to_keep: Schema.Number,
  state: Schema.Literal("enabled", "disabled")
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateMaintenanceConfigResponse" }) as unknown as Schema.Schema<UpdateMaintenanceConfigResponse>;

export const updateMaintenanceConfig: (
  input: UpdateMaintenanceConfigRequest
) => Effect.Effect<
  UpdateMaintenanceConfigResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateMaintenanceConfigRequest,
  output: UpdateMaintenanceConfigResponse,
  errors: [],
}));

export interface ListNamespacesRequest {
  account_id: string;
  bucket_name: string;
  page_token?: string;
  page_size?: number;
  parent?: string;
  return_uuids?: boolean;
  return_details?: boolean;
}

export const ListNamespacesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  page_token: Schema.optional(Schema.String).pipe(T.HttpQuery("page_token")),
  page_size: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_size")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  return_uuids: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("return_uuids")),
  return_details: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("return_details"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2-catalog/{bucket_name}/namespaces" }),
).annotations({ identifier: "ListNamespacesRequest" }) as unknown as Schema.Schema<ListNamespacesRequest>;

export interface ListNamespacesResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListNamespacesResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Struct({
  created_at: Schema.optional(Schema.Date),
  namespace: Schema.Array(Schema.String),
  namespace_uuid: Schema.UUID,
  updated_at: Schema.optional(Schema.Date)
}))),
  namespace_uuids: Schema.optional(Schema.Array(Schema.UUID)),
  namespaces: Schema.Array(Schema.Array(Schema.String)),
  next_page_token: Schema.optional(Schema.String)
}))
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

export interface ListTablesRequest {
  account_id: string;
  bucket_name: string;
  namespace: string;
  page_token?: string;
  page_size?: number;
  return_uuids?: boolean;
  return_details?: boolean;
}

export const ListTablesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  namespace: Schema.String.pipe(T.HttpPath("namespace")),
  page_token: Schema.optional(Schema.String).pipe(T.HttpQuery("page_token")),
  page_size: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_size")),
  return_uuids: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("return_uuids")),
  return_details: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("return_details"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables" }),
).annotations({ identifier: "ListTablesRequest" }) as unknown as Schema.Schema<ListTablesRequest>;

export interface ListTablesResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListTablesResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Struct({
  created_at: Schema.optional(Schema.Date),
  identifier: Schema.Struct({
  name: Schema.String,
  namespace: Schema.Array(Schema.String)
}),
  location: Schema.optional(Schema.String),
  metadata_location: Schema.optional(Schema.String),
  table_uuid: Schema.UUID,
  updated_at: Schema.optional(Schema.Date)
}))),
  identifiers: Schema.Array(Schema.Struct({
  name: Schema.String,
  namespace: Schema.Array(Schema.String)
})),
  next_page_token: Schema.optional(Schema.String),
  table_uuids: Schema.optional(Schema.Array(Schema.UUID))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListTablesResponse" }) as unknown as Schema.Schema<ListTablesResponse>;

export const listTables: (
  input: ListTablesRequest
) => Effect.Effect<
  ListTablesResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTablesRequest,
  output: ListTablesResponse,
  errors: [],
}));

export interface GetTableMaintenanceConfigRequest {
  account_id: string;
  bucket_name: string;
  namespace: string;
  table_name: string;
}

export const GetTableMaintenanceConfigRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  namespace: Schema.String.pipe(T.HttpPath("namespace")),
  table_name: Schema.String.pipe(T.HttpPath("table_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs" }),
).annotations({ identifier: "GetTableMaintenanceConfigRequest" }) as unknown as Schema.Schema<GetTableMaintenanceConfigRequest>;

export interface GetTableMaintenanceConfigResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetTableMaintenanceConfigResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  maintenance_config: Schema.Struct({
  compaction: Schema.optional(Schema.Struct({
  state: Schema.Literal("enabled", "disabled"),
  target_size_mb: Schema.Literal("64", "128", "256", "512")
})),
  snapshot_expiration: Schema.optional(Schema.Struct({
  max_snapshot_age: Schema.String,
  min_snapshots_to_keep: Schema.Number,
  state: Schema.Literal("enabled", "disabled")
}))
})
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetTableMaintenanceConfigResponse" }) as unknown as Schema.Schema<GetTableMaintenanceConfigResponse>;

export const getTableMaintenanceConfig: (
  input: GetTableMaintenanceConfigRequest
) => Effect.Effect<
  GetTableMaintenanceConfigResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTableMaintenanceConfigRequest,
  output: GetTableMaintenanceConfigResponse,
  errors: [],
}));

export interface UpdateTableMaintenanceConfigRequest {
  account_id: string;
  bucket_name: string;
  namespace: string;
  table_name: string;
  body: unknown;
}

export const UpdateTableMaintenanceConfigRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  namespace: Schema.String.pipe(T.HttpPath("namespace")),
  table_name: Schema.String.pipe(T.HttpPath("table_name")),
  body: Schema.Struct({
  compaction: Schema.optional(Schema.Struct({
  state: Schema.optional(Schema.Literal("enabled", "disabled")),
  target_size_mb: Schema.optional(Schema.Literal("64", "128", "256", "512"))
})),
  snapshot_expiration: Schema.optional(Schema.Struct({
  max_snapshot_age: Schema.optional(Schema.String),
  min_snapshots_to_keep: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.Literal("enabled", "disabled"))
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs" }),
).annotations({ identifier: "UpdateTableMaintenanceConfigRequest" }) as unknown as Schema.Schema<UpdateTableMaintenanceConfigRequest>;

export interface UpdateTableMaintenanceConfigResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateTableMaintenanceConfigResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  compaction: Schema.optional(Schema.Struct({
  state: Schema.Literal("enabled", "disabled"),
  target_size_mb: Schema.Literal("64", "128", "256", "512")
})),
  snapshot_expiration: Schema.optional(Schema.Struct({
  max_snapshot_age: Schema.String,
  min_snapshots_to_keep: Schema.Number,
  state: Schema.Literal("enabled", "disabled")
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateTableMaintenanceConfigResponse" }) as unknown as Schema.Schema<UpdateTableMaintenanceConfigResponse>;

export const updateTableMaintenanceConfig: (
  input: UpdateTableMaintenanceConfigRequest
) => Effect.Effect<
  UpdateTableMaintenanceConfigResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateTableMaintenanceConfigRequest,
  output: UpdateTableMaintenanceConfigResponse,
  errors: [],
}));

export interface ListBucketsRequest {
  account_id: string;
  name_contains?: string;
  start_after?: string;
  per_page?: number;
  order?: "name";
  direction?: "asc" | "desc";
  cursor?: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const ListBucketsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  name_contains: Schema.optional(Schema.String).pipe(T.HttpQuery("name_contains")),
  start_after: Schema.optional(Schema.String).pipe(T.HttpQuery("start_after")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("name")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets" }),
).annotations({ identifier: "ListBucketsRequest" }) as unknown as Schema.Schema<ListBucketsRequest>;

export interface ListBucketsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListBucketsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  buckets: Schema.optional(Schema.Array(Schema.Struct({
  creation_date: Schema.optional(Schema.String),
  jurisdiction: Schema.optional(Schema.Literal("default", "eu", "fedramp")),
  location: Schema.optional(Schema.Literal("apac", "eeur", "enam", "weur", "wnam", "oc")),
  name: Schema.optional(Schema.String),
  storage_class: Schema.optional(Schema.Literal("Standard", "InfrequentAccess"))
})))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListBucketsResponse" }) as unknown as Schema.Schema<ListBucketsResponse>;

export const listBuckets: (
  input: ListBucketsRequest
) => Effect.Effect<
  ListBucketsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListBucketsRequest,
  output: ListBucketsResponse,
  errors: [],
}));

export interface CreateBucketRequest {
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
  body: { locationHint?: "apac" | "eeur" | "enam" | "weur" | "wnam" | "oc"; name: string; storageClass?: "Standard" | "InfrequentAccess" };
}

export const CreateBucketRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction")),
  body: Schema.Struct({
  locationHint: Schema.optional(Schema.Literal("apac", "eeur", "enam", "weur", "wnam", "oc")),
  name: Schema.String,
  storageClass: Schema.optional(Schema.Literal("Standard", "InfrequentAccess"))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/r2/buckets" }),
).annotations({ identifier: "CreateBucketRequest" }) as unknown as Schema.Schema<CreateBucketRequest>;

export interface CreateBucketResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateBucketResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  creation_date: Schema.optional(Schema.String),
  jurisdiction: Schema.optional(Schema.Literal("default", "eu", "fedramp")),
  location: Schema.optional(Schema.Literal("apac", "eeur", "enam", "weur", "wnam", "oc")),
  name: Schema.optional(Schema.String),
  storage_class: Schema.optional(Schema.Literal("Standard", "InfrequentAccess"))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateBucketResponse" }) as unknown as Schema.Schema<CreateBucketResponse>;

export const createBucket: (
  input: CreateBucketRequest
) => Effect.Effect<
  CreateBucketResponse,
  InvalidBucketName | BucketConflict | TooManyBuckets | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateBucketRequest,
  output: CreateBucketResponse,
  errors: [InvalidBucketName, BucketConflict, TooManyBuckets],
}));

export interface GetBucketRequest {
  account_id: string;
  bucket_name: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const GetBucketRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}" }),
).annotations({ identifier: "GetBucketRequest" }) as unknown as Schema.Schema<GetBucketRequest>;

export interface GetBucketResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetBucketResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  creation_date: Schema.optional(Schema.String),
  jurisdiction: Schema.optional(Schema.Literal("default", "eu", "fedramp")),
  location: Schema.optional(Schema.Literal("apac", "eeur", "enam", "weur", "wnam", "oc")),
  name: Schema.optional(Schema.String),
  storage_class: Schema.optional(Schema.Literal("Standard", "InfrequentAccess"))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetBucketResponse" }) as unknown as Schema.Schema<GetBucketResponse>;

export const getBucket: (
  input: GetBucketRequest
) => Effect.Effect<
  GetBucketResponse,
  NoSuchBucket | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBucketRequest,
  output: GetBucketResponse,
  errors: [NoSuchBucket],
}));

export interface DeleteBucketRequest {
  bucket_name: string;
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const DeleteBucketRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/r2/buckets/{bucket_name}" }),
).annotations({ identifier: "DeleteBucketRequest" }) as unknown as Schema.Schema<DeleteBucketRequest>;

export interface DeleteBucketResponse {
  result: { errors: { code: number; message: string }[]; messages: string[]; result: Record<string, unknown>; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteBucketResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.String),
  result: Schema.Struct({}),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteBucketResponse" }) as unknown as Schema.Schema<DeleteBucketResponse>;

export const deleteBucket: (
  input: DeleteBucketRequest
) => Effect.Effect<
  DeleteBucketResponse,
  NoSuchBucket | BucketNotEmpty | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteBucketRequest,
  output: DeleteBucketResponse,
  errors: [NoSuchBucket, BucketNotEmpty],
}));

export interface PatchBucketRequest {
  account_id: string;
  bucket_name: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
  "cf-r2-storage-class": unknown;
}

export const PatchBucketRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction")),
  "cf-r2-storage-class": Schema.Literal("Standard", "InfrequentAccess").pipe(T.HttpHeader("cf-r2-storage-class"))
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/r2/buckets/{bucket_name}" }),
).annotations({ identifier: "PatchBucketRequest" }) as unknown as Schema.Schema<PatchBucketRequest>;

export interface PatchBucketResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchBucketResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  creation_date: Schema.optional(Schema.String),
  jurisdiction: Schema.optional(Schema.Literal("default", "eu", "fedramp")),
  location: Schema.optional(Schema.Literal("apac", "eeur", "enam", "weur", "wnam", "oc")),
  name: Schema.optional(Schema.String),
  storage_class: Schema.optional(Schema.Literal("Standard", "InfrequentAccess"))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchBucketResponse" }) as unknown as Schema.Schema<PatchBucketResponse>;

export const patchBucket: (
  input: PatchBucketRequest
) => Effect.Effect<
  PatchBucketResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchBucketRequest,
  output: PatchBucketResponse,
  errors: [],
}));

export interface GetBucketCorsPolicyRequest {
  bucket_name: string;
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const GetBucketCorsPolicyRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/cors" }),
).annotations({ identifier: "GetBucketCorsPolicyRequest" }) as unknown as Schema.Schema<GetBucketCorsPolicyRequest>;

export interface GetBucketCorsPolicyResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetBucketCorsPolicyResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  rules: Schema.optional(Schema.Array(Schema.Struct({
  allowed: Schema.Struct({
  headers: Schema.optional(Schema.Array(Schema.String)),
  methods: Schema.Array(Schema.Literal("GET", "PUT", "POST", "DELETE", "HEAD")),
  origins: Schema.Array(Schema.String)
}),
  exposeHeaders: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  maxAgeSeconds: Schema.optional(Schema.Number)
})))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetBucketCorsPolicyResponse" }) as unknown as Schema.Schema<GetBucketCorsPolicyResponse>;

export const getBucketCorsPolicy: (
  input: GetBucketCorsPolicyRequest
) => Effect.Effect<
  GetBucketCorsPolicyResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBucketCorsPolicyRequest,
  output: GetBucketCorsPolicyResponse,
  errors: [],
}));

export interface PutBucketCorsPolicyRequest {
  bucket_name: string;
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
  body: { rules?: { allowed: { headers?: string[]; methods: "GET" | "PUT" | "POST" | "DELETE" | "HEAD"[]; origins: string[] }; exposeHeaders?: string[]; id?: string; maxAgeSeconds?: number }[] };
}

export const PutBucketCorsPolicyRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction")),
  body: Schema.Struct({
  rules: Schema.optional(Schema.Array(Schema.Struct({
  allowed: Schema.Struct({
  headers: Schema.optional(Schema.Array(Schema.String)),
  methods: Schema.Array(Schema.Literal("GET", "PUT", "POST", "DELETE", "HEAD")),
  origins: Schema.Array(Schema.String)
}),
  exposeHeaders: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  maxAgeSeconds: Schema.optional(Schema.Number)
})))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/cors" }),
).annotations({ identifier: "PutBucketCorsPolicyRequest" }) as unknown as Schema.Schema<PutBucketCorsPolicyRequest>;

export interface PutBucketCorsPolicyResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutBucketCorsPolicyResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutBucketCorsPolicyResponse" }) as unknown as Schema.Schema<PutBucketCorsPolicyResponse>;

export const putBucketCorsPolicy: (
  input: PutBucketCorsPolicyRequest
) => Effect.Effect<
  PutBucketCorsPolicyResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutBucketCorsPolicyRequest,
  output: PutBucketCorsPolicyResponse,
  errors: [],
}));

export interface DeleteBucketCorsPolicyRequest {
  bucket_name: string;
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const DeleteBucketCorsPolicyRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/cors" }),
).annotations({ identifier: "DeleteBucketCorsPolicyRequest" }) as unknown as Schema.Schema<DeleteBucketCorsPolicyRequest>;

export interface DeleteBucketCorsPolicyResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteBucketCorsPolicyResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteBucketCorsPolicyResponse" }) as unknown as Schema.Schema<DeleteBucketCorsPolicyResponse>;

export const deleteBucketCorsPolicy: (
  input: DeleteBucketCorsPolicyRequest
) => Effect.Effect<
  DeleteBucketCorsPolicyResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteBucketCorsPolicyRequest,
  output: DeleteBucketCorsPolicyResponse,
  errors: [],
}));

export interface ListCustomDomainsRequest {
  account_id: string;
  bucket_name: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const ListCustomDomainsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom" }),
).annotations({ identifier: "ListCustomDomainsRequest" }) as unknown as Schema.Schema<ListCustomDomainsRequest>;

export interface ListCustomDomainsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListCustomDomainsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  domains: Schema.Array(Schema.Struct({
  ciphers: Schema.optional(Schema.Array(Schema.String)),
  domain: Schema.String,
  enabled: Schema.Boolean,
  minTLS: Schema.optional(Schema.Literal("1.0", "1.1", "1.2", "1.3")),
  status: Schema.Struct({
  ownership: Schema.Literal("pending", "active", "deactivated", "blocked", "error", "unknown"),
  ssl: Schema.Literal("initializing", "pending", "active", "deactivated", "error", "unknown")
}),
  zoneId: Schema.optional(Schema.String),
  zoneName: Schema.optional(Schema.String)
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListCustomDomainsResponse" }) as unknown as Schema.Schema<ListCustomDomainsResponse>;

export const listCustomDomains: (
  input: ListCustomDomainsRequest
) => Effect.Effect<
  ListCustomDomainsResponse,
  NoSuchBucket | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCustomDomainsRequest,
  output: ListCustomDomainsResponse,
  errors: [NoSuchBucket],
}));

export interface R2AddCustomDomainRequest {
  account_id: string;
  bucket_name: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
  body: { ciphers?: string[]; domain: string; enabled: boolean; minTLS?: "1.0" | "1.1" | "1.2" | "1.3"; zoneId: string };
}

export const R2AddCustomDomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction")),
  body: Schema.Struct({
  ciphers: Schema.optional(Schema.Array(Schema.String)),
  domain: Schema.String,
  enabled: Schema.Boolean,
  minTLS: Schema.optional(Schema.Literal("1.0", "1.1", "1.2", "1.3")),
  zoneId: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom" }),
).annotations({ identifier: "R2AddCustomDomainRequest" }) as unknown as Schema.Schema<R2AddCustomDomainRequest>;

export interface R2AddCustomDomainResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const R2AddCustomDomainResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  ciphers: Schema.optional(Schema.Array(Schema.String)),
  domain: Schema.String,
  enabled: Schema.Boolean,
  minTLS: Schema.optional(Schema.Literal("1.0", "1.1", "1.2", "1.3"))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "R2AddCustomDomainResponse" }) as unknown as Schema.Schema<R2AddCustomDomainResponse>;

export const r2AddCustomDomain: (
  input: R2AddCustomDomainRequest
) => Effect.Effect<
  R2AddCustomDomainResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: R2AddCustomDomainRequest,
  output: R2AddCustomDomainResponse,
  errors: [],
}));

export interface GetCustomDomainSettingsRequest {
  account_id: string;
  bucket_name: string;
  domain: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const GetCustomDomainSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  domain: Schema.String.pipe(T.HttpPath("domain")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}" }),
).annotations({ identifier: "GetCustomDomainSettingsRequest" }) as unknown as Schema.Schema<GetCustomDomainSettingsRequest>;

export interface GetCustomDomainSettingsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetCustomDomainSettingsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  ciphers: Schema.optional(Schema.Array(Schema.String)),
  domain: Schema.String,
  enabled: Schema.Boolean,
  minTLS: Schema.optional(Schema.Literal("1.0", "1.1", "1.2", "1.3")),
  status: Schema.Struct({
  ownership: Schema.Literal("pending", "active", "deactivated", "blocked", "error", "unknown"),
  ssl: Schema.Literal("initializing", "pending", "active", "deactivated", "error", "unknown")
}),
  zoneId: Schema.optional(Schema.String),
  zoneName: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetCustomDomainSettingsResponse" }) as unknown as Schema.Schema<GetCustomDomainSettingsResponse>;

export const getCustomDomainSettings: (
  input: GetCustomDomainSettingsRequest
) => Effect.Effect<
  GetCustomDomainSettingsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCustomDomainSettingsRequest,
  output: GetCustomDomainSettingsResponse,
  errors: [],
}));

export interface R2EditCustomDomainSettingsRequest {
  account_id: string;
  bucket_name: string;
  domain: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
  body: { ciphers?: string[]; enabled?: boolean; minTLS?: "1.0" | "1.1" | "1.2" | "1.3" };
}

export const R2EditCustomDomainSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  domain: Schema.String.pipe(T.HttpPath("domain")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction")),
  body: Schema.Struct({
  ciphers: Schema.optional(Schema.Array(Schema.String)),
  enabled: Schema.optional(Schema.Boolean),
  minTLS: Schema.optional(Schema.Literal("1.0", "1.1", "1.2", "1.3"))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}" }),
).annotations({ identifier: "R2EditCustomDomainSettingsRequest" }) as unknown as Schema.Schema<R2EditCustomDomainSettingsRequest>;

export interface R2EditCustomDomainSettingsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const R2EditCustomDomainSettingsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  ciphers: Schema.optional(Schema.Array(Schema.String)),
  domain: Schema.String,
  enabled: Schema.optional(Schema.Boolean),
  minTLS: Schema.optional(Schema.Literal("1.0", "1.1", "1.2", "1.3"))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "R2EditCustomDomainSettingsResponse" }) as unknown as Schema.Schema<R2EditCustomDomainSettingsResponse>;

export const r2EditCustomDomainSettings: (
  input: R2EditCustomDomainSettingsRequest
) => Effect.Effect<
  R2EditCustomDomainSettingsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: R2EditCustomDomainSettingsRequest,
  output: R2EditCustomDomainSettingsResponse,
  errors: [],
}));

export interface DeleteCustomDomainRequest {
  bucket_name: string;
  account_id: string;
  domain: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const DeleteCustomDomainRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  domain: Schema.String.pipe(T.HttpPath("domain")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}" }),
).annotations({ identifier: "DeleteCustomDomainRequest" }) as unknown as Schema.Schema<DeleteCustomDomainRequest>;

export interface DeleteCustomDomainResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteCustomDomainResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  domain: Schema.String
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteCustomDomainResponse" }) as unknown as Schema.Schema<DeleteCustomDomainResponse>;

export const deleteCustomDomain: (
  input: DeleteCustomDomainRequest
) => Effect.Effect<
  DeleteCustomDomainResponse,
  NoSuchBucket | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCustomDomainRequest,
  output: DeleteCustomDomainResponse,
  errors: [NoSuchBucket],
}));

export interface GetBucketPublicPolicyRequest {
  account_id: string;
  bucket_name: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const GetBucketPublicPolicyRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed" }),
).annotations({ identifier: "GetBucketPublicPolicyRequest" }) as unknown as Schema.Schema<GetBucketPublicPolicyRequest>;

export interface GetBucketPublicPolicyResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetBucketPublicPolicyResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  bucketId: Schema.String,
  domain: Schema.String,
  enabled: Schema.Boolean
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetBucketPublicPolicyResponse" }) as unknown as Schema.Schema<GetBucketPublicPolicyResponse>;

export const getBucketPublicPolicy: (
  input: GetBucketPublicPolicyRequest
) => Effect.Effect<
  GetBucketPublicPolicyResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBucketPublicPolicyRequest,
  output: GetBucketPublicPolicyResponse,
  errors: [],
}));

export interface PutBucketPublicPolicyRequest {
  account_id: string;
  bucket_name: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
  body: { enabled: boolean };
}

export const PutBucketPublicPolicyRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction")),
  body: Schema.Struct({
  enabled: Schema.Boolean
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed" }),
).annotations({ identifier: "PutBucketPublicPolicyRequest" }) as unknown as Schema.Schema<PutBucketPublicPolicyRequest>;

export interface PutBucketPublicPolicyResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutBucketPublicPolicyResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  bucketId: Schema.String,
  domain: Schema.String,
  enabled: Schema.Boolean
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutBucketPublicPolicyResponse" }) as unknown as Schema.Schema<PutBucketPublicPolicyResponse>;

export const putBucketPublicPolicy: (
  input: PutBucketPublicPolicyRequest
) => Effect.Effect<
  PutBucketPublicPolicyResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutBucketPublicPolicyRequest,
  output: PutBucketPublicPolicyResponse,
  errors: [],
}));

export interface GetBucketLifecycleConfigurationRequest {
  bucket_name: string;
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const GetBucketLifecycleConfigurationRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle" }),
).annotations({ identifier: "GetBucketLifecycleConfigurationRequest" }) as unknown as Schema.Schema<GetBucketLifecycleConfigurationRequest>;

export interface GetBucketLifecycleConfigurationResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetBucketLifecycleConfigurationResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  rules: Schema.optional(Schema.Array(Schema.Struct({
  abortMultipartUploadsTransition: Schema.optional(Schema.Struct({
  condition: Schema.optional(Schema.Struct({
  maxAge: Schema.Number,
  type: Schema.Literal("Age")
}))
})),
  conditions: Schema.Struct({
  prefix: Schema.String
}),
  deleteObjectsTransition: Schema.optional(Schema.Struct({
  condition: Schema.optional(Schema.Union(Schema.Struct({
  maxAge: Schema.Number,
  type: Schema.Literal("Age")
}), Schema.Struct({
  date: Schema.Date,
  type: Schema.Literal("Date")
})))
})),
  enabled: Schema.Boolean,
  id: Schema.String,
  storageClassTransitions: Schema.optional(Schema.Array(Schema.Struct({
  condition: Schema.Union(Schema.Struct({
  maxAge: Schema.Number,
  type: Schema.Literal("Age")
}), Schema.Struct({
  date: Schema.Date,
  type: Schema.Literal("Date")
})),
  storageClass: Schema.Literal("InfrequentAccess")
})))
})))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetBucketLifecycleConfigurationResponse" }) as unknown as Schema.Schema<GetBucketLifecycleConfigurationResponse>;

export const getBucketLifecycleConfiguration: (
  input: GetBucketLifecycleConfigurationRequest
) => Effect.Effect<
  GetBucketLifecycleConfigurationResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBucketLifecycleConfigurationRequest,
  output: GetBucketLifecycleConfigurationResponse,
  errors: [],
}));

export interface PutBucketLifecycleConfigurationRequest {
  bucket_name: string;
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
  body: { rules?: { abortMultipartUploadsTransition?: { condition?: unknown }; conditions: { prefix: string }; deleteObjectsTransition?: { condition?: unknown }; enabled: boolean; id: string; storageClassTransitions?: unknown[] }[] };
}

export const PutBucketLifecycleConfigurationRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction")),
  body: Schema.Struct({
  rules: Schema.optional(Schema.Array(Schema.Struct({
  abortMultipartUploadsTransition: Schema.optional(Schema.Struct({
  condition: Schema.optional(Schema.Struct({
  maxAge: Schema.Number,
  type: Schema.Literal("Age")
}))
})),
  conditions: Schema.Struct({
  prefix: Schema.String
}),
  deleteObjectsTransition: Schema.optional(Schema.Struct({
  condition: Schema.optional(Schema.Union(Schema.Struct({
  maxAge: Schema.Number,
  type: Schema.Literal("Age")
}), Schema.Struct({
  date: Schema.Date,
  type: Schema.Literal("Date")
})))
})),
  enabled: Schema.Boolean,
  id: Schema.String,
  storageClassTransitions: Schema.optional(Schema.Array(Schema.Struct({
  condition: Schema.Union(Schema.Struct({
  maxAge: Schema.Number,
  type: Schema.Literal("Age")
}), Schema.Struct({
  date: Schema.Date,
  type: Schema.Literal("Date")
})),
  storageClass: Schema.Literal("InfrequentAccess")
})))
})))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle" }),
).annotations({ identifier: "PutBucketLifecycleConfigurationRequest" }) as unknown as Schema.Schema<PutBucketLifecycleConfigurationRequest>;

export interface PutBucketLifecycleConfigurationResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutBucketLifecycleConfigurationResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutBucketLifecycleConfigurationResponse" }) as unknown as Schema.Schema<PutBucketLifecycleConfigurationResponse>;

export const putBucketLifecycleConfiguration: (
  input: PutBucketLifecycleConfigurationRequest
) => Effect.Effect<
  PutBucketLifecycleConfigurationResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutBucketLifecycleConfigurationRequest,
  output: PutBucketLifecycleConfigurationResponse,
  errors: [],
}));

export interface GetBucketLockConfigurationRequest {
  bucket_name: string;
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const GetBucketLockConfigurationRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/lock" }),
).annotations({ identifier: "GetBucketLockConfigurationRequest" }) as unknown as Schema.Schema<GetBucketLockConfigurationRequest>;

export interface GetBucketLockConfigurationResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetBucketLockConfigurationResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  rules: Schema.optional(Schema.Array(Schema.Struct({
  condition: Schema.Union(Schema.Struct({
  maxAgeSeconds: Schema.Number,
  type: Schema.Literal("Age")
}), Schema.Struct({
  date: Schema.Date,
  type: Schema.Literal("Date")
}), Schema.Struct({
  type: Schema.Literal("Indefinite")
})),
  enabled: Schema.Boolean,
  id: Schema.String,
  prefix: Schema.optional(Schema.String)
})))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetBucketLockConfigurationResponse" }) as unknown as Schema.Schema<GetBucketLockConfigurationResponse>;

export const getBucketLockConfiguration: (
  input: GetBucketLockConfigurationRequest
) => Effect.Effect<
  GetBucketLockConfigurationResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBucketLockConfigurationRequest,
  output: GetBucketLockConfigurationResponse,
  errors: [],
}));

export interface PutBucketLockConfigurationRequest {
  bucket_name: string;
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
  body: { rules?: { condition: unknown; enabled: boolean; id: string; prefix?: string }[] };
}

export const PutBucketLockConfigurationRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction")),
  body: Schema.Struct({
  rules: Schema.optional(Schema.Array(Schema.Struct({
  condition: Schema.Union(Schema.Struct({
  maxAgeSeconds: Schema.Number,
  type: Schema.Literal("Age")
}), Schema.Struct({
  date: Schema.Date,
  type: Schema.Literal("Date")
}), Schema.Struct({
  type: Schema.Literal("Indefinite")
})),
  enabled: Schema.Boolean,
  id: Schema.String,
  prefix: Schema.optional(Schema.String)
})))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/lock" }),
).annotations({ identifier: "PutBucketLockConfigurationRequest" }) as unknown as Schema.Schema<PutBucketLockConfigurationRequest>;

export interface PutBucketLockConfigurationResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutBucketLockConfigurationResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutBucketLockConfigurationResponse" }) as unknown as Schema.Schema<PutBucketLockConfigurationResponse>;

export const putBucketLockConfiguration: (
  input: PutBucketLockConfigurationRequest
) => Effect.Effect<
  PutBucketLockConfigurationResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutBucketLockConfigurationRequest,
  output: PutBucketLockConfigurationResponse,
  errors: [],
}));

export interface GetBucketSippyConfigRequest {
  account_id: string;
  bucket_name: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const GetBucketSippyConfigRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/sippy" }),
).annotations({ identifier: "GetBucketSippyConfigRequest" }) as unknown as Schema.Schema<GetBucketSippyConfigRequest>;

export interface GetBucketSippyConfigResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetBucketSippyConfigResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  destination: Schema.optional(Schema.Struct({
  accessKeyId: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
  bucket: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.Literal("r2"))
})),
  enabled: Schema.optional(Schema.Boolean),
  source: Schema.optional(Schema.Struct({
  bucket: Schema.optional(Schema.String),
  bucketUrl: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.Literal("aws", "gcs", "s3")),
  region: Schema.optional(Schema.String)
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetBucketSippyConfigResponse" }) as unknown as Schema.Schema<GetBucketSippyConfigResponse>;

export const getBucketSippyConfig: (
  input: GetBucketSippyConfigRequest
) => Effect.Effect<
  GetBucketSippyConfigResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBucketSippyConfigRequest,
  output: GetBucketSippyConfigResponse,
  errors: [],
}));

export interface PutBucketSippyConfigRequest {
  account_id: string;
  bucket_name: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
  body: unknown;
}

export const PutBucketSippyConfigRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction")),
  body: Schema.Union(Schema.Unknown, Schema.Unknown, Schema.Unknown).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/sippy" }),
).annotations({ identifier: "PutBucketSippyConfigRequest" }) as unknown as Schema.Schema<PutBucketSippyConfigRequest>;

export interface PutBucketSippyConfigResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutBucketSippyConfigResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  destination: Schema.optional(Schema.Struct({
  accessKeyId: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
  bucket: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.Literal("r2"))
})),
  enabled: Schema.optional(Schema.Boolean),
  source: Schema.optional(Schema.Struct({
  bucket: Schema.optional(Schema.String),
  bucketUrl: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.Literal("aws", "gcs", "s3")),
  region: Schema.optional(Schema.String)
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutBucketSippyConfigResponse" }) as unknown as Schema.Schema<PutBucketSippyConfigResponse>;

export const putBucketSippyConfig: (
  input: PutBucketSippyConfigRequest
) => Effect.Effect<
  PutBucketSippyConfigResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutBucketSippyConfigRequest,
  output: PutBucketSippyConfigResponse,
  errors: [],
}));

export interface DeleteBucketSippyConfigRequest {
  bucket_name: string;
  account_id: string;
  "cf-r2-jurisdiction"?: "default" | "eu" | "fedramp";
}

export const DeleteBucketSippyConfigRequest = Schema.Struct({
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "cf-r2-jurisdiction": Schema.optional(Schema.Literal("default", "eu", "fedramp")).pipe(T.HttpHeader("cf-r2-jurisdiction"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/sippy" }),
).annotations({ identifier: "DeleteBucketSippyConfigRequest" }) as unknown as Schema.Schema<DeleteBucketSippyConfigRequest>;

export interface DeleteBucketSippyConfigResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteBucketSippyConfigResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Literal(false))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteBucketSippyConfigResponse" }) as unknown as Schema.Schema<DeleteBucketSippyConfigResponse>;

export const deleteBucketSippyConfig: (
  input: DeleteBucketSippyConfigRequest
) => Effect.Effect<
  DeleteBucketSippyConfigResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteBucketSippyConfigRequest,
  output: DeleteBucketSippyConfigResponse,
  errors: [],
}));

export interface GetAccountLevelMetricsRequest {
  account_id: string;
}

export const GetAccountLevelMetricsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/r2/metrics" }),
).annotations({ identifier: "GetAccountLevelMetricsRequest" }) as unknown as Schema.Schema<GetAccountLevelMetricsRequest>;

export interface GetAccountLevelMetricsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetAccountLevelMetricsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  infrequentAccess: Schema.optional(Schema.Struct({
  published: Schema.optional(Schema.Struct({
  metadataSize: Schema.optional(Schema.Number),
  objects: Schema.optional(Schema.Number),
  payloadSize: Schema.optional(Schema.Number)
})),
  uploaded: Schema.optional(Schema.Struct({
  metadataSize: Schema.optional(Schema.Number),
  objects: Schema.optional(Schema.Number),
  payloadSize: Schema.optional(Schema.Number)
}))
})),
  standard: Schema.optional(Schema.Struct({
  published: Schema.optional(Schema.Struct({
  metadataSize: Schema.optional(Schema.Number),
  objects: Schema.optional(Schema.Number),
  payloadSize: Schema.optional(Schema.Number)
})),
  uploaded: Schema.optional(Schema.Struct({
  metadataSize: Schema.optional(Schema.Number),
  objects: Schema.optional(Schema.Number),
  payloadSize: Schema.optional(Schema.Number)
}))
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetAccountLevelMetricsResponse" }) as unknown as Schema.Schema<GetAccountLevelMetricsResponse>;

export const getAccountLevelMetrics: (
  input: GetAccountLevelMetricsRequest
) => Effect.Effect<
  GetAccountLevelMetricsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountLevelMetricsRequest,
  output: GetAccountLevelMetricsResponse,
  errors: [],
}));

export interface CreateTempAccessCredentialsRequest {
  account_id: string;
  body: { bucket: string; objects?: string[]; parentAccessKeyId: string; permission: "admin-read-write" | "admin-read-only" | "object-read-write" | "object-read-only"; prefixes?: string[]; ttlSeconds: number };
}

export const CreateTempAccessCredentialsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  bucket: Schema.String,
  objects: Schema.optional(Schema.Array(Schema.String)),
  parentAccessKeyId: Schema.String,
  permission: Schema.Literal("admin-read-write", "admin-read-only", "object-read-write", "object-read-only"),
  prefixes: Schema.optional(Schema.Array(Schema.String)),
  ttlSeconds: Schema.Number
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/r2/temp-access-credentials" }),
).annotations({ identifier: "CreateTempAccessCredentialsRequest" }) as unknown as Schema.Schema<CreateTempAccessCredentialsRequest>;

export interface CreateTempAccessCredentialsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateTempAccessCredentialsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  accessKeyId: Schema.optional(Schema.String),
  secretAccessKey: Schema.optional(Schema.String),
  sessionToken: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateTempAccessCredentialsResponse" }) as unknown as Schema.Schema<CreateTempAccessCredentialsResponse>;

export const createTempAccessCredentials: (
  input: CreateTempAccessCredentialsRequest
) => Effect.Effect<
  CreateTempAccessCredentialsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTempAccessCredentialsRequest,
  output: CreateTempAccessCredentialsResponse,
  errors: [],
}));
