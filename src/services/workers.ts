/**
 * Cloudflare WORKERS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service workers
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
  NoSuchKey,
  ValidationError,
} from "../errors/generated.ts";

export interface WorkerAccountSettingsFetchWorkerAccountSettingsRequest {
  account_id: string;
}

export const WorkerAccountSettingsFetchWorkerAccountSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/account-settings" }),
).annotations({ identifier: "WorkerAccountSettingsFetchWorkerAccountSettingsRequest" }) as unknown as Schema.Schema<WorkerAccountSettingsFetchWorkerAccountSettingsRequest>;

export interface WorkerAccountSettingsFetchWorkerAccountSettingsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerAccountSettingsFetchWorkerAccountSettingsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  default_usage_model: Schema.optional(Schema.String),
  green_compute: Schema.optional(Schema.Boolean)
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerAccountSettingsFetchWorkerAccountSettingsResponse" }) as unknown as Schema.Schema<WorkerAccountSettingsFetchWorkerAccountSettingsResponse>;

export const workerAccountSettingsFetchWorkerAccountSettings: (
  input: WorkerAccountSettingsFetchWorkerAccountSettingsRequest
) => Effect.Effect<
  WorkerAccountSettingsFetchWorkerAccountSettingsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerAccountSettingsFetchWorkerAccountSettingsRequest,
  output: WorkerAccountSettingsFetchWorkerAccountSettingsResponse,
  errors: [],
}));

export interface CreateWorkerAccountSettingsRequest {
  account_id: string;
  body: { default_usage_model?: string; green_compute?: boolean };
}

export const CreateWorkerAccountSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  default_usage_model: Schema.optional(Schema.String),
  green_compute: Schema.optional(Schema.Boolean)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/account-settings" }),
).annotations({ identifier: "CreateWorkerAccountSettingsRequest" }) as unknown as Schema.Schema<CreateWorkerAccountSettingsRequest>;

export interface CreateWorkerAccountSettingsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateWorkerAccountSettingsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  default_usage_model: Schema.optional(Schema.String),
  green_compute: Schema.optional(Schema.Boolean)
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateWorkerAccountSettingsResponse" }) as unknown as Schema.Schema<CreateWorkerAccountSettingsResponse>;

export const createWorkerAccountSettings: (
  input: CreateWorkerAccountSettingsRequest
) => Effect.Effect<
  CreateWorkerAccountSettingsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateWorkerAccountSettingsRequest,
  output: CreateWorkerAccountSettingsResponse,
  errors: [],
}));

export interface WorkerAssetsUploadRequest {
  account_id: string;
  base64: true;
}

export const WorkerAssetsUploadRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  base64: Schema.Literal(true).pipe(T.HttpQuery("base64"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/assets/upload" }),
).annotations({ identifier: "WorkerAssetsUploadRequest" }) as unknown as Schema.Schema<WorkerAssetsUploadRequest>;

export interface WorkerAssetsUploadResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerAssetsUploadResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerAssetsUploadResponse" }) as unknown as Schema.Schema<WorkerAssetsUploadResponse>;

export const workerAssetsUpload: (
  input: WorkerAssetsUploadRequest
) => Effect.Effect<
  WorkerAssetsUploadResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerAssetsUploadRequest,
  output: WorkerAssetsUploadResponse,
  errors: [],
}));

export interface ListRequest {
  account_id: string;
}

export const ListRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces" }),
).annotations({ identifier: "ListRequest" }) as unknown as Schema.Schema<ListRequest>;

export interface ListResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.Struct({
  created_by: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.Date),
  modified_by: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.Date),
  namespace_id: Schema.optional(Schema.String),
  namespace_name: Schema.optional(Schema.String),
  script_count: Schema.optional(Schema.Number),
  trusted_workers: Schema.optional(Schema.Boolean)
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListResponse" }) as unknown as Schema.Schema<ListResponse>;

export const list: (
  input: ListRequest
) => Effect.Effect<
  ListResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRequest,
  output: ListResponse,
  errors: [],
}));

export interface CreateRequest {
  account_id: string;
  body: { name?: string };
}

export const CreateRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  name: Schema.optional(Schema.String)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/dispatch/namespaces" }),
).annotations({ identifier: "CreateRequest" }) as unknown as Schema.Schema<CreateRequest>;

export interface CreateResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  created_by: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.Date),
  modified_by: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.Date),
  namespace_id: Schema.optional(Schema.String),
  namespace_name: Schema.optional(Schema.String),
  script_count: Schema.optional(Schema.Number),
  trusted_workers: Schema.optional(Schema.Boolean)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateResponse" }) as unknown as Schema.Schema<CreateResponse>;

export const create: (
  input: CreateRequest
) => Effect.Effect<
  CreateResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateRequest,
  output: CreateResponse,
  errors: [],
}));

export interface GetNamespaceRequest {
  account_id: string;
  dispatch_namespace: string;
}

export const GetNamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}" }),
).annotations({ identifier: "GetNamespaceRequest" }) as unknown as Schema.Schema<GetNamespaceRequest>;

export interface GetNamespaceResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetNamespaceResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  created_by: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.Date),
  modified_by: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.Date),
  namespace_id: Schema.optional(Schema.String),
  namespace_name: Schema.optional(Schema.String),
  script_count: Schema.optional(Schema.Number),
  trusted_workers: Schema.optional(Schema.Boolean)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetNamespaceResponse" }) as unknown as Schema.Schema<GetNamespaceResponse>;

export const getNamespace: (
  input: GetNamespaceRequest
) => Effect.Effect<
  GetNamespaceResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetNamespaceRequest,
  output: GetNamespaceResponse,
  errors: [],
}));

export interface PutNamespaceRequest {
  account_id: string;
  dispatch_namespace: string;
  body: { name?: string; trusted_workers?: boolean };
}

export const PutNamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  body: Schema.Struct({
  name: Schema.optional(Schema.String),
  trusted_workers: Schema.optional(Schema.Boolean)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}" }),
).annotations({ identifier: "PutNamespaceRequest" }) as unknown as Schema.Schema<PutNamespaceRequest>;

export interface PutNamespaceResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutNamespaceResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  created_by: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.Date),
  modified_by: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.Date),
  namespace_id: Schema.optional(Schema.String),
  namespace_name: Schema.optional(Schema.String),
  script_count: Schema.optional(Schema.Number),
  trusted_workers: Schema.optional(Schema.Boolean)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutNamespaceResponse" }) as unknown as Schema.Schema<PutNamespaceResponse>;

export const putNamespace: (
  input: PutNamespaceRequest
) => Effect.Effect<
  PutNamespaceResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutNamespaceRequest,
  output: PutNamespaceResponse,
  errors: [],
}));

export interface DeleteNamespaceRequest {
  account_id: string;
  dispatch_namespace: string;
}

export const DeleteNamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}" }),
).annotations({ identifier: "DeleteNamespaceRequest" }) as unknown as Schema.Schema<DeleteNamespaceRequest>;

export interface DeleteNamespaceResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteNamespaceResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Literal(null))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteNamespaceResponse" }) as unknown as Schema.Schema<DeleteNamespaceResponse>;

export const deleteNamespace: (
  input: DeleteNamespaceRequest
) => Effect.Effect<
  DeleteNamespaceResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteNamespaceRequest,
  output: DeleteNamespaceResponse,
  errors: [],
}));

export interface PatchNamespaceRequest {
  account_id: string;
  dispatch_namespace: string;
  body: { name?: string; trusted_workers?: boolean };
}

export const PatchNamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  body: Schema.Struct({
  name: Schema.optional(Schema.String),
  trusted_workers: Schema.optional(Schema.Boolean)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}" }),
).annotations({ identifier: "PatchNamespaceRequest" }) as unknown as Schema.Schema<PatchNamespaceRequest>;

export interface PatchNamespaceResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchNamespaceResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  created_by: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.Date),
  modified_by: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.Date),
  namespace_id: Schema.optional(Schema.String),
  namespace_name: Schema.optional(Schema.String),
  script_count: Schema.optional(Schema.Number),
  trusted_workers: Schema.optional(Schema.Boolean)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchNamespaceResponse" }) as unknown as Schema.Schema<PatchNamespaceResponse>;

export const patchNamespace: (
  input: PatchNamespaceRequest
) => Effect.Effect<
  PatchNamespaceResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchNamespaceRequest,
  output: PatchNamespaceResponse,
  errors: [],
}));

export interface ListScriptsRequest {
  account_id: string;
  dispatch_namespace: string;
  tags?: string;
}

export const ListScriptsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  tags: Schema.optional(Schema.String).pipe(T.HttpQuery("tags"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts" }),
).annotations({ identifier: "ListScriptsRequest" }) as unknown as Schema.Schema<ListScriptsRequest>;

export interface ListScriptsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListScriptsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Array(Schema.Struct({
  created_on: Schema.optional(Schema.Date),
  dispatch_namespace: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.Date),
  script: Schema.optional(Schema.Unknown)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListScriptsResponse" }) as unknown as Schema.Schema<ListScriptsResponse>;

export const listScripts: (
  input: ListScriptsRequest
) => Effect.Effect<
  ListScriptsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListScriptsRequest,
  output: ListScriptsResponse,
  errors: [],
}));

export interface DeleteScriptsRequest {
  account_id: string;
  dispatch_namespace: string;
  tags?: string;
  limit?: number;
}

export const DeleteScriptsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  tags: Schema.optional(Schema.String).pipe(T.HttpQuery("tags")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts" }),
).annotations({ identifier: "DeleteScriptsRequest" }) as unknown as Schema.Schema<DeleteScriptsRequest>;

export interface DeleteScriptsResponse {
  result: { deleted?: { id?: string }[]; deleted_count?: number; has_more?: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteScriptsResponse = Schema.Struct({
  result: Schema.Struct({
  deleted: Schema.optional(Schema.Array(Schema.Struct({
  id: Schema.optional(Schema.String)
}))),
  deleted_count: Schema.optional(Schema.Number),
  has_more: Schema.optional(Schema.Boolean)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteScriptsResponse" }) as unknown as Schema.Schema<DeleteScriptsResponse>;

export const deleteScripts: (
  input: DeleteScriptsRequest
) => Effect.Effect<
  DeleteScriptsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteScriptsRequest,
  output: DeleteScriptsResponse,
  errors: [],
}));

export interface NamespaceWorkerScriptWorkerDetailsRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
}

export const NamespaceWorkerScriptWorkerDetailsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}" }),
).annotations({ identifier: "NamespaceWorkerScriptWorkerDetailsRequest" }) as unknown as Schema.Schema<NamespaceWorkerScriptWorkerDetailsRequest>;

export interface NamespaceWorkerScriptWorkerDetailsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const NamespaceWorkerScriptWorkerDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  created_on: Schema.optional(Schema.Date),
  dispatch_namespace: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.Date),
  script: Schema.optional(Schema.Unknown)
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "NamespaceWorkerScriptWorkerDetailsResponse" }) as unknown as Schema.Schema<NamespaceWorkerScriptWorkerDetailsResponse>;

export const namespaceWorkerScriptWorkerDetails: (
  input: NamespaceWorkerScriptWorkerDetailsRequest
) => Effect.Effect<
  NamespaceWorkerScriptWorkerDetailsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: NamespaceWorkerScriptWorkerDetailsRequest,
  output: NamespaceWorkerScriptWorkerDetailsResponse,
  errors: [],
}));

export interface NamespaceWorkerScriptUploadWorkerModuleRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
}

export const NamespaceWorkerScriptUploadWorkerModuleRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}" }),
).annotations({ identifier: "NamespaceWorkerScriptUploadWorkerModuleRequest" }) as unknown as Schema.Schema<NamespaceWorkerScriptUploadWorkerModuleRequest>;

export interface NamespaceWorkerScriptUploadWorkerModuleResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const NamespaceWorkerScriptUploadWorkerModuleResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "NamespaceWorkerScriptUploadWorkerModuleResponse" }) as unknown as Schema.Schema<NamespaceWorkerScriptUploadWorkerModuleResponse>;

export const namespaceWorkerScriptUploadWorkerModule: (
  input: NamespaceWorkerScriptUploadWorkerModuleRequest
) => Effect.Effect<
  NamespaceWorkerScriptUploadWorkerModuleResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: NamespaceWorkerScriptUploadWorkerModuleRequest,
  output: NamespaceWorkerScriptUploadWorkerModuleResponse,
  errors: [],
}));

export interface DeleteWorkerRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
  force?: boolean;
}

export const DeleteWorkerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}" }),
).annotations({ identifier: "DeleteWorkerRequest" }) as unknown as Schema.Schema<DeleteWorkerRequest>;

export interface DeleteWorkerResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteWorkerResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Literal(null))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteWorkerResponse" }) as unknown as Schema.Schema<DeleteWorkerResponse>;

export const deleteWorker: (
  input: DeleteWorkerRequest
) => Effect.Effect<
  DeleteWorkerResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteWorkerRequest,
  output: DeleteWorkerResponse,
  errors: [],
}));

export interface CreateAssetsUploadSessionRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
  body: { manifest: Record<string, unknown> };
}

export const CreateAssetsUploadSessionRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  body: Schema.Struct({
  manifest: Schema.Record({ key: Schema.String, value: Schema.Struct({
  hash: Schema.String,
  size: Schema.Number
}) })
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/assets-upload-session" }),
).annotations({ identifier: "CreateAssetsUploadSessionRequest" }) as unknown as Schema.Schema<CreateAssetsUploadSessionRequest>;

export interface CreateAssetsUploadSessionResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateAssetsUploadSessionResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  buckets: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
  jwt: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateAssetsUploadSessionResponse" }) as unknown as Schema.Schema<CreateAssetsUploadSessionResponse>;

export const createAssetsUploadSession: (
  input: CreateAssetsUploadSessionRequest
) => Effect.Effect<
  CreateAssetsUploadSessionResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAssetsUploadSessionRequest,
  output: CreateAssetsUploadSessionResponse,
  errors: [],
}));

export interface GetScriptBindingsRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
}

export const GetScriptBindingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/bindings" }),
).annotations({ identifier: "GetScriptBindingsRequest" }) as unknown as Schema.Schema<GetScriptBindingsRequest>;

export interface GetScriptBindingsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetScriptBindingsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Array(Schema.Struct({}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetScriptBindingsResponse" }) as unknown as Schema.Schema<GetScriptBindingsResponse>;

export const getScriptBindings: (
  input: GetScriptBindingsRequest
) => Effect.Effect<
  GetScriptBindingsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetScriptBindingsRequest,
  output: GetScriptBindingsResponse,
  errors: [],
}));

export interface GetScriptContentRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
}

export const GetScriptContentRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content" }),
).annotations({ identifier: "GetScriptContentRequest" }) as unknown as Schema.Schema<GetScriptContentRequest>;

export interface GetScriptContentResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetScriptContentResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetScriptContentResponse" }) as unknown as Schema.Schema<GetScriptContentResponse>;

export const getScriptContent: (
  input: GetScriptContentRequest
) => Effect.Effect<
  GetScriptContentResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetScriptContentRequest,
  output: GetScriptContentResponse,
  errors: [],
}));

export interface PutScriptContentRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
  "CF-WORKER-BODY-PART"?: string;
  "CF-WORKER-MAIN-MODULE-PART"?: string;
}

export const PutScriptContentRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  "CF-WORKER-BODY-PART": Schema.optional(Schema.String).pipe(T.HttpHeader("CF-WORKER-BODY-PART")),
  "CF-WORKER-MAIN-MODULE-PART": Schema.optional(Schema.String).pipe(T.HttpHeader("CF-WORKER-MAIN-MODULE-PART"))
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content" }),
).annotations({ identifier: "PutScriptContentRequest" }) as unknown as Schema.Schema<PutScriptContentRequest>;

export interface PutScriptContentResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutScriptContentResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Unknown
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutScriptContentResponse" }) as unknown as Schema.Schema<PutScriptContentResponse>;

export const putScriptContent: (
  input: PutScriptContentRequest
) => Effect.Effect<
  PutScriptContentResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutScriptContentRequest,
  output: PutScriptContentResponse,
  errors: [],
}));

export interface ListScriptSecretsRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
}

export const ListScriptSecretsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets" }),
).annotations({ identifier: "ListScriptSecretsRequest" }) as unknown as Schema.Schema<ListScriptSecretsRequest>;

export interface ListScriptSecretsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListScriptSecretsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Array(Schema.Struct({}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListScriptSecretsResponse" }) as unknown as Schema.Schema<ListScriptSecretsResponse>;

export const listScriptSecrets: (
  input: ListScriptSecretsRequest
) => Effect.Effect<
  ListScriptSecretsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListScriptSecretsRequest,
  output: ListScriptSecretsResponse,
  errors: [],
}));

export interface PutScriptSecretsRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
  body: Record<string, unknown>;
}

export const PutScriptSecretsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  body: Schema.Struct({}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets" }),
).annotations({ identifier: "PutScriptSecretsRequest" }) as unknown as Schema.Schema<PutScriptSecretsRequest>;

export interface PutScriptSecretsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutScriptSecretsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutScriptSecretsResponse" }) as unknown as Schema.Schema<PutScriptSecretsResponse>;

export const putScriptSecrets: (
  input: PutScriptSecretsRequest
) => Effect.Effect<
  PutScriptSecretsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutScriptSecretsRequest,
  output: PutScriptSecretsResponse,
  errors: [],
}));

export interface GetScriptSecretsRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
  secret_name: string;
  url_encoded?: boolean;
}

export const GetScriptSecretsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  secret_name: Schema.String.pipe(T.HttpPath("secret_name")),
  url_encoded: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("url_encoded"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets/{secret_name}" }),
).annotations({ identifier: "GetScriptSecretsRequest" }) as unknown as Schema.Schema<GetScriptSecretsRequest>;

export interface GetScriptSecretsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetScriptSecretsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetScriptSecretsResponse" }) as unknown as Schema.Schema<GetScriptSecretsResponse>;

export const getScriptSecrets: (
  input: GetScriptSecretsRequest
) => Effect.Effect<
  GetScriptSecretsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetScriptSecretsRequest,
  output: GetScriptSecretsResponse,
  errors: [],
}));

export interface DeleteScriptSecretRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
  secret_name: string;
  url_encoded?: boolean;
}

export const DeleteScriptSecretRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  secret_name: Schema.String.pipe(T.HttpPath("secret_name")),
  url_encoded: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("url_encoded"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets/{secret_name}" }),
).annotations({ identifier: "DeleteScriptSecretRequest" }) as unknown as Schema.Schema<DeleteScriptSecretRequest>;

export interface DeleteScriptSecretResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteScriptSecretResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Literal(null))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteScriptSecretResponse" }) as unknown as Schema.Schema<DeleteScriptSecretResponse>;

export const deleteScriptSecret: (
  input: DeleteScriptSecretRequest
) => Effect.Effect<
  DeleteScriptSecretResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteScriptSecretRequest,
  output: DeleteScriptSecretResponse,
  errors: [],
}));

export interface GetScriptSettingsRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
}

export const GetScriptSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/settings" }),
).annotations({ identifier: "GetScriptSettingsRequest" }) as unknown as Schema.Schema<GetScriptSettingsRequest>;

export interface GetScriptSettingsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetScriptSettingsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  bindings: Schema.optional(Schema.Array(Schema.Struct({}))),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.optional(Schema.Number)
})),
  logpush: Schema.optional(Schema.Boolean),
  migrations: Schema.optional(Schema.Union(Schema.Struct({
  new_tag: Schema.optional(Schema.String),
  old_tag: Schema.optional(Schema.String)
}), Schema.Struct({
  steps: Schema.optional(Schema.Array(Schema.Struct({
  deleted_classes: Schema.optional(Schema.Array(Schema.String)),
  new_classes: Schema.optional(Schema.Array(Schema.String)),
  new_sqlite_classes: Schema.optional(Schema.Array(Schema.String)),
  renamed_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
}))),
  transferred_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  from_script: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
})))
})))
}))),
  observability: Schema.optional(Schema.Struct({
  enabled: Schema.Boolean,
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
  destinations: Schema.optional(Schema.Array(Schema.String)),
  enabled: Schema.Boolean,
  head_sampling_rate: Schema.optional(Schema.Number),
  invocation_logs: Schema.Boolean,
  persist: Schema.optional(Schema.Boolean)
}))
})),
  placement: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
}))),
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound"))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetScriptSettingsResponse" }) as unknown as Schema.Schema<GetScriptSettingsResponse>;

export const getScriptSettings: (
  input: GetScriptSettingsRequest
) => Effect.Effect<
  GetScriptSettingsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetScriptSettingsRequest,
  output: GetScriptSettingsResponse,
  errors: [],
}));

export interface PatchScriptSettingsRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
}

export const PatchScriptSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/settings" }),
).annotations({ identifier: "PatchScriptSettingsRequest" }) as unknown as Schema.Schema<PatchScriptSettingsRequest>;

export interface PatchScriptSettingsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchScriptSettingsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  bindings: Schema.optional(Schema.Array(Schema.Struct({}))),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.optional(Schema.Number)
})),
  logpush: Schema.optional(Schema.Boolean),
  migrations: Schema.optional(Schema.Union(Schema.Struct({
  new_tag: Schema.optional(Schema.String),
  old_tag: Schema.optional(Schema.String)
}), Schema.Struct({
  steps: Schema.optional(Schema.Array(Schema.Struct({
  deleted_classes: Schema.optional(Schema.Array(Schema.String)),
  new_classes: Schema.optional(Schema.Array(Schema.String)),
  new_sqlite_classes: Schema.optional(Schema.Array(Schema.String)),
  renamed_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
}))),
  transferred_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  from_script: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
})))
})))
}))),
  observability: Schema.optional(Schema.Struct({
  enabled: Schema.Boolean,
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
  destinations: Schema.optional(Schema.Array(Schema.String)),
  enabled: Schema.Boolean,
  head_sampling_rate: Schema.optional(Schema.Number),
  invocation_logs: Schema.Boolean,
  persist: Schema.optional(Schema.Boolean)
}))
})),
  placement: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
}))),
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound"))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchScriptSettingsResponse" }) as unknown as Schema.Schema<PatchScriptSettingsResponse>;

export const patchScriptSettings: (
  input: PatchScriptSettingsRequest
) => Effect.Effect<
  PatchScriptSettingsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchScriptSettingsRequest,
  output: PatchScriptSettingsResponse,
  errors: [],
}));

export interface GetScriptTagsRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
}

export const GetScriptTagsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags" }),
).annotations({ identifier: "GetScriptTagsRequest" }) as unknown as Schema.Schema<GetScriptTagsRequest>;

export interface GetScriptTagsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetScriptTagsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetScriptTagsResponse" }) as unknown as Schema.Schema<GetScriptTagsResponse>;

export const getScriptTags: (
  input: GetScriptTagsRequest
) => Effect.Effect<
  GetScriptTagsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetScriptTagsRequest,
  output: GetScriptTagsResponse,
  errors: [],
}));

export interface PutScriptTagsRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
  body: string[];
}

export const PutScriptTagsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  body: Schema.Array(Schema.String).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags" }),
).annotations({ identifier: "PutScriptTagsRequest" }) as unknown as Schema.Schema<PutScriptTagsRequest>;

export interface PutScriptTagsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutScriptTagsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Array(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutScriptTagsResponse" }) as unknown as Schema.Schema<PutScriptTagsResponse>;

export const putScriptTags: (
  input: PutScriptTagsRequest
) => Effect.Effect<
  PutScriptTagsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutScriptTagsRequest,
  output: PutScriptTagsResponse,
  errors: [],
}));

export interface PutScriptTagRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
  tag: string;
}

export const PutScriptTagRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  tag: Schema.String.pipe(T.HttpPath("tag"))
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags/{tag}" }),
).annotations({ identifier: "PutScriptTagRequest" }) as unknown as Schema.Schema<PutScriptTagRequest>;

export interface PutScriptTagResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutScriptTagResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Literal(null))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutScriptTagResponse" }) as unknown as Schema.Schema<PutScriptTagResponse>;

export const putScriptTag: (
  input: PutScriptTagRequest
) => Effect.Effect<
  PutScriptTagResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutScriptTagRequest,
  output: PutScriptTagResponse,
  errors: [],
}));

export interface DeleteScriptTagRequest {
  account_id: string;
  dispatch_namespace: string;
  script_name: string;
  tag: string;
}

export const DeleteScriptTagRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  dispatch_namespace: Schema.String.pipe(T.HttpPath("dispatch_namespace")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  tag: Schema.String.pipe(T.HttpPath("tag"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags/{tag}" }),
).annotations({ identifier: "DeleteScriptTagRequest" }) as unknown as Schema.Schema<DeleteScriptTagRequest>;

export interface DeleteScriptTagResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteScriptTagResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Literal(null))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteScriptTagResponse" }) as unknown as Schema.Schema<DeleteScriptTagResponse>;

export const deleteScriptTag: (
  input: DeleteScriptTagRequest
) => Effect.Effect<
  DeleteScriptTagResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteScriptTagRequest,
  output: DeleteScriptTagResponse,
  errors: [],
}));

export interface ListDomainsRequest {
  account_id: string;
  zone_name?: string;
  service?: string;
  zone_id?: string;
  hostname?: string;
  environment?: string;
}

export const ListDomainsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  zone_name: Schema.optional(Schema.String).pipe(T.HttpQuery("zone_name")),
  service: Schema.optional(Schema.String).pipe(T.HttpQuery("service")),
  zone_id: Schema.optional(Schema.String).pipe(T.HttpQuery("zone_id")),
  hostname: Schema.optional(Schema.String).pipe(T.HttpQuery("hostname")),
  environment: Schema.optional(Schema.String).pipe(T.HttpQuery("environment"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/domains" }),
).annotations({ identifier: "ListDomainsRequest" }) as unknown as Schema.Schema<ListDomainsRequest>;

export interface ListDomainsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListDomainsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  zone_id: Schema.optional(Schema.String),
  zone_name: Schema.optional(Schema.String)
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListDomainsResponse" }) as unknown as Schema.Schema<ListDomainsResponse>;

export const listDomains: (
  input: ListDomainsRequest
) => Effect.Effect<
  ListDomainsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse,
  errors: [],
}));

export interface WorkerDomainAttachToDomainRequest {
  account_id: string;
  body: { environment?: string; hostname: string; service: string; zone_id: string };
}

export const WorkerDomainAttachToDomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  environment: Schema.optional(Schema.String),
  hostname: Schema.String,
  service: Schema.String,
  zone_id: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/domains" }),
).annotations({ identifier: "WorkerDomainAttachToDomainRequest" }) as unknown as Schema.Schema<WorkerDomainAttachToDomainRequest>;

export interface WorkerDomainAttachToDomainResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerDomainAttachToDomainResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  environment: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  zone_id: Schema.optional(Schema.String),
  zone_name: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerDomainAttachToDomainResponse" }) as unknown as Schema.Schema<WorkerDomainAttachToDomainResponse>;

export const workerDomainAttachToDomain: (
  input: WorkerDomainAttachToDomainRequest
) => Effect.Effect<
  WorkerDomainAttachToDomainResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerDomainAttachToDomainRequest,
  output: WorkerDomainAttachToDomainResponse,
  errors: [],
}));

export interface GetADomainRequest {
  account_id: string;
  domain_id: string;
}

export const GetADomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  domain_id: Schema.String.pipe(T.HttpPath("domain_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/domains/{domain_id}" }),
).annotations({ identifier: "GetADomainRequest" }) as unknown as Schema.Schema<GetADomainRequest>;

export interface GetADomainResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetADomainResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  environment: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  zone_id: Schema.optional(Schema.String),
  zone_name: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetADomainResponse" }) as unknown as Schema.Schema<GetADomainResponse>;

export const getADomain: (
  input: GetADomainRequest
) => Effect.Effect<
  GetADomainResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetADomainRequest,
  output: GetADomainResponse,
  errors: [],
}));

export interface WorkerDomainDetachFromDomainRequest {
  account_id: string;
  domain_id: string;
}

export const WorkerDomainDetachFromDomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  domain_id: Schema.String.pipe(T.HttpPath("domain_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/domains/{domain_id}" }),
).annotations({ identifier: "WorkerDomainDetachFromDomainRequest" }) as unknown as Schema.Schema<WorkerDomainDetachFromDomainRequest>;

export interface WorkerDomainDetachFromDomainResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerDomainDetachFromDomainResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerDomainDetachFromDomainResponse" }) as unknown as Schema.Schema<WorkerDomainDetachFromDomainResponse>;

export const workerDomainDetachFromDomain: (
  input: WorkerDomainDetachFromDomainRequest
) => Effect.Effect<
  WorkerDomainDetachFromDomainResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerDomainDetachFromDomainRequest,
  output: WorkerDomainDetachFromDomainResponse,
  errors: [],
}));

export interface ListNamespacesRequest {
  account_id: string;
  page?: number;
  per_page?: number;
}

export const ListNamespacesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/durable_objects/namespaces" }),
).annotations({ identifier: "ListNamespacesRequest" }) as unknown as Schema.Schema<ListNamespacesRequest>;

export interface ListNamespacesResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListNamespacesResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.Struct({
  class: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  script: Schema.optional(Schema.String),
  use_sqlite: Schema.optional(Schema.Boolean)
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

export interface ListObjectsRequest {
  account_id: string;
  id: string;
  limit?: number;
  cursor?: string;
}

export const ListObjectsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.String.pipe(T.HttpPath("id")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/durable_objects/namespaces/{id}/objects" }),
).annotations({ identifier: "ListObjectsRequest" }) as unknown as Schema.Schema<ListObjectsRequest>;

export interface ListObjectsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListObjectsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.Struct({
  hasStoredData: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String)
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
}).annotations({ identifier: "ListObjectsResponse" }) as unknown as Schema.Schema<ListObjectsResponse>;

export const listObjects: (
  input: ListObjectsRequest
) => Effect.Effect<
  ListObjectsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListObjectsRequest,
  output: ListObjectsResponse,
  errors: [],
}));

export interface DestinationlistRequest {
  page?: number;
  perPage?: number;
  order?: "asc" | "desc";
  orderBy?: "created" | "updated";
}

export const DestinationlistRequest = Schema.Struct({
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("perPage")),
  order: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("order")),
  orderBy: Schema.optional(Schema.Literal("created", "updated")).pipe(T.HttpQuery("orderBy"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/observability/destinations" }),
).annotations({ identifier: "DestinationlistRequest" }) as unknown as Schema.Schema<DestinationlistRequest>;

export interface DestinationlistResponse {
  result: { errors: { message: string }[]; messages: { message: "Successful request" }[]; result: { configuration: { destination_conf: string; headers: Record<string, unknown>; jobStatus: { error_message: string; last_complete: string; last_error: string }; logpushDataset: unknown; type: "logpush"; url: string }; enabled: boolean; name: string; scripts: string[]; slug: string }[]; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DestinationlistResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  message: Schema.Literal("Successful request")
})),
  result: Schema.Array(Schema.Struct({
  configuration: Schema.Struct({
  destination_conf: Schema.String,
  headers: Schema.Record({ key: Schema.String, value: Schema.String }),
  jobStatus: Schema.Struct({
  error_message: Schema.String,
  last_complete: Schema.String,
  last_error: Schema.String
}),
  logpushDataset: Schema.Union(Schema.Literal("opentelemetry-traces"), Schema.Literal("opentelemetry-logs")),
  type: Schema.Literal("logpush"),
  url: Schema.String
}),
  enabled: Schema.Boolean,
  name: Schema.String,
  scripts: Schema.Array(Schema.String),
  slug: Schema.String
})),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DestinationlistResponse" }) as unknown as Schema.Schema<DestinationlistResponse>;

export const destinationlist: (
  input: DestinationlistRequest
) => Effect.Effect<
  DestinationlistResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DestinationlistRequest,
  output: DestinationlistResponse,
  errors: [],
}));

export interface DestinationcreateRequest {
  body: { configuration: { headers: Record<string, unknown>; logpushDataset: unknown; type: "logpush"; url: string }; enabled: boolean; name: string };
}

export const DestinationcreateRequest = Schema.Struct({
  body: Schema.Struct({
  configuration: Schema.Struct({
  headers: Schema.Record({ key: Schema.String, value: Schema.String }),
  logpushDataset: Schema.Union(Schema.Literal("opentelemetry-traces"), Schema.Literal("opentelemetry-logs")),
  type: Schema.Literal("logpush"),
  url: Schema.String
}),
  enabled: Schema.Boolean,
  name: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/observability/destinations" }),
).annotations({ identifier: "DestinationcreateRequest" }) as unknown as Schema.Schema<DestinationcreateRequest>;

export interface DestinationcreateResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DestinationcreateResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DestinationcreateResponse" }) as unknown as Schema.Schema<DestinationcreateResponse>;

export const destinationcreate: (
  input: DestinationcreateRequest
) => Effect.Effect<
  DestinationcreateResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DestinationcreateRequest,
  output: DestinationcreateResponse,
  errors: [],
}));

export interface DestinationsdeleteRequest {
  slug: string;
}

export const DestinationsdeleteRequest = Schema.Struct({
  slug: Schema.String.pipe(T.HttpPath("slug"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/observability/destinations/{slug}" }),
).annotations({ identifier: "DestinationsdeleteRequest" }) as unknown as Schema.Schema<DestinationsdeleteRequest>;

export interface DestinationsdeleteResponse {
  result: { errors: { message: string }[]; messages: { message: "Successful request" }[]; result?: { configuration: { destination_conf: string; logpushDataset: unknown; logpushJob: number; type: "logpush"; url: string }; enabled: boolean; name: string; scripts: string[]; slug: string }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DestinationsdeleteResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  message: Schema.Literal("Successful request")
})),
  result: Schema.optional(Schema.Struct({
  configuration: Schema.Struct({
  destination_conf: Schema.String,
  logpushDataset: Schema.Union(Schema.Literal("opentelemetry-traces"), Schema.Literal("opentelemetry-logs")),
  logpushJob: Schema.Number,
  type: Schema.Literal("logpush"),
  url: Schema.String
}),
  enabled: Schema.Boolean,
  name: Schema.String,
  scripts: Schema.Array(Schema.String),
  slug: Schema.String
})),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DestinationsdeleteResponse" }) as unknown as Schema.Schema<DestinationsdeleteResponse>;

export const destinationsdelete: (
  input: DestinationsdeleteRequest
) => Effect.Effect<
  DestinationsdeleteResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DestinationsdeleteRequest,
  output: DestinationsdeleteResponse,
  errors: [],
}));

export interface DestinationupdateRequest {
  slug: string;
  body: { configuration: { headers: Record<string, unknown>; type: "logpush"; url: string }; enabled: boolean };
}

export const DestinationupdateRequest = Schema.Struct({
  slug: Schema.String.pipe(T.HttpPath("slug")),
  body: Schema.Struct({
  configuration: Schema.Struct({
  headers: Schema.Record({ key: Schema.String, value: Schema.String }),
  type: Schema.Literal("logpush"),
  url: Schema.String
}),
  enabled: Schema.Boolean
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/workers/observability/destinations/{slug}" }),
).annotations({ identifier: "DestinationupdateRequest" }) as unknown as Schema.Schema<DestinationupdateRequest>;

export interface DestinationupdateResponse {
  result: { errors: { message: string }[]; messages: { message: "Successful request" }[]; result: { configuration: { destination_conf: string; logpushDataset: unknown; logpushJob: number; type: "logpush"; url: string }; enabled: boolean; name: string; scripts: string[]; slug: string }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DestinationupdateResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  message: Schema.Literal("Successful request")
})),
  result: Schema.Struct({
  configuration: Schema.Struct({
  destination_conf: Schema.String,
  logpushDataset: Schema.Union(Schema.Literal("opentelemetry-traces"), Schema.Literal("opentelemetry-logs")),
  logpushJob: Schema.Number,
  type: Schema.Literal("logpush"),
  url: Schema.String
}),
  enabled: Schema.Boolean,
  name: Schema.String,
  scripts: Schema.Array(Schema.String),
  slug: Schema.String
}),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DestinationupdateResponse" }) as unknown as Schema.Schema<DestinationupdateResponse>;

export const destinationupdate: (
  input: DestinationupdateRequest
) => Effect.Effect<
  DestinationupdateResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DestinationupdateRequest,
  output: DestinationupdateResponse,
  errors: [],
}));

export interface TelemetrykeyslistRequest {
  body: { datasets?: string[]; filters?: { key: string; operation: "includes" | "not_includes" | "starts_with" | "regex" | "exists" | "is_null" | "in" | "not_in" | "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "=" | "!=" | ">" | ">=" | "<" | "<=" | "INCLUDES" | "DOES_NOT_INCLUDE" | "MATCH_REGEX" | "EXISTS" | "DOES_NOT_EXIST" | "IN" | "NOT_IN" | "STARTS_WITH"; type: "string" | "number" | "boolean"; value?: unknown }[]; from?: number; keyNeedle?: { isRegex?: boolean; matchCase?: boolean; value: unknown }; limit?: number; needle?: { isRegex?: boolean; matchCase?: boolean; value: unknown }; to?: number };
}

export const TelemetrykeyslistRequest = Schema.Struct({
  body: Schema.Struct({
  datasets: Schema.optional(Schema.Array(Schema.String)),
  filters: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  operation: Schema.Literal("includes", "not_includes", "starts_with", "regex", "exists", "is_null", "in", "not_in", "eq", "neq", "gt", "gte", "lt", "lte", "=", "!=", ">", ">=", "<", "<=", "INCLUDES", "DOES_NOT_INCLUDE", "MATCH_REGEX", "EXISTS", "DOES_NOT_EXIST", "IN", "NOT_IN", "STARTS_WITH"),
  type: Schema.Literal("string", "number", "boolean"),
  value: Schema.optional(Schema.Union(Schema.String, Schema.Number, Schema.Boolean))
}))),
  from: Schema.optional(Schema.Number),
  keyNeedle: Schema.optional(Schema.Struct({
  isRegex: Schema.optional(Schema.Boolean),
  matchCase: Schema.optional(Schema.Boolean),
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
})),
  limit: Schema.optional(Schema.Number),
  needle: Schema.optional(Schema.Struct({
  isRegex: Schema.optional(Schema.Boolean),
  matchCase: Schema.optional(Schema.Boolean),
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
})),
  to: Schema.optional(Schema.Number)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/observability/telemetry/keys" }),
).annotations({ identifier: "TelemetrykeyslistRequest" }) as unknown as Schema.Schema<TelemetrykeyslistRequest>;

export interface TelemetrykeyslistResponse {
  result: { errors: { message: string }[]; messages: { message: "Successful request" }[]; result: { key: string; lastSeenAt: number; type: "string" | "boolean" | "number" }[]; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const TelemetrykeyslistResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  message: Schema.Literal("Successful request")
})),
  result: Schema.Array(Schema.Struct({
  key: Schema.String,
  lastSeenAt: Schema.Number,
  type: Schema.Literal("string", "boolean", "number")
})),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "TelemetrykeyslistResponse" }) as unknown as Schema.Schema<TelemetrykeyslistResponse>;

export const telemetrykeyslist: (
  input: TelemetrykeyslistRequest
) => Effect.Effect<
  TelemetrykeyslistResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TelemetrykeyslistRequest,
  output: TelemetrykeyslistResponse,
  errors: [],
}));

export interface TelemetryqueryRequest {
  body: { chart?: boolean; compare?: boolean; dry?: boolean; granularity?: number; ignoreSeries?: boolean; limit?: number; offset?: string; offsetBy?: number; offsetDirection?: string; parameters?: { calculations?: { alias?: string; key?: string; keyType?: "string" | "number" | "boolean"; operator: "uniq" | "count" | "max" | "min" | "sum" | "avg" | "median" | "p001" | "p01" | "p05" | "p10" | "p25" | "p75" | "p90" | "p95" | "p99" | "p999" | "stddev" | "variance" | "COUNT_DISTINCT" | "COUNT" | "MAX" | "MIN" | "SUM" | "AVG" | "MEDIAN" | "P001" | "P01" | "P05" | "P10" | "P25" | "P75" | "P90" | "P95" | "P99" | "P999" | "STDDEV" | "VARIANCE" }[]; datasets?: string[]; filterCombination?: "and" | "or" | "AND" | "OR"; filters?: { key: string; operation: "includes" | "not_includes" | "starts_with" | "regex" | "exists" | "is_null" | "in" | "not_in" | "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "=" | "!=" | ">" | ">=" | "<" | "<=" | "INCLUDES" | "DOES_NOT_INCLUDE" | "MATCH_REGEX" | "EXISTS" | "DOES_NOT_EXIST" | "IN" | "NOT_IN" | "STARTS_WITH"; type: "string" | "number" | "boolean"; value?: unknown }[]; groupBys?: { type: "string" | "number" | "boolean"; value: string }[]; havings?: { key: string; operation: "eq" | "neq" | "gt" | "gte" | "lt" | "lte"; value: number }[]; limit?: number; needle?: { isRegex?: boolean; matchCase?: boolean; value: unknown }; orderBy?: { order?: "asc" | "desc"; value: string } }; patternType?: "message" | "error"; queryId: string; timeframe: { from: number; to: number }; view?: "traces" | "events" | "calculations" | "invocations" | "requests" | "patterns" };
}

export const TelemetryqueryRequest = Schema.Struct({
  body: Schema.Struct({
  chart: Schema.optional(Schema.Boolean),
  compare: Schema.optional(Schema.Boolean),
  dry: Schema.optional(Schema.Boolean),
  granularity: Schema.optional(Schema.Number),
  ignoreSeries: Schema.optional(Schema.Boolean),
  limit: Schema.optional(Schema.Number),
  offset: Schema.optional(Schema.String),
  offsetBy: Schema.optional(Schema.Number),
  offsetDirection: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Struct({
  calculations: Schema.optional(Schema.Array(Schema.Struct({
  alias: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  keyType: Schema.optional(Schema.Literal("string", "number", "boolean")),
  operator: Schema.Literal("uniq", "count", "max", "min", "sum", "avg", "median", "p001", "p01", "p05", "p10", "p25", "p75", "p90", "p95", "p99", "p999", "stddev", "variance", "COUNT_DISTINCT", "COUNT", "MAX", "MIN", "SUM", "AVG", "MEDIAN", "P001", "P01", "P05", "P10", "P25", "P75", "P90", "P95", "P99", "P999", "STDDEV", "VARIANCE")
}))),
  datasets: Schema.optional(Schema.Array(Schema.String)),
  filterCombination: Schema.optional(Schema.Literal("and", "or", "AND", "OR")),
  filters: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  operation: Schema.Literal("includes", "not_includes", "starts_with", "regex", "exists", "is_null", "in", "not_in", "eq", "neq", "gt", "gte", "lt", "lte", "=", "!=", ">", ">=", "<", "<=", "INCLUDES", "DOES_NOT_INCLUDE", "MATCH_REGEX", "EXISTS", "DOES_NOT_EXIST", "IN", "NOT_IN", "STARTS_WITH"),
  type: Schema.Literal("string", "number", "boolean"),
  value: Schema.optional(Schema.Union(Schema.String, Schema.Number, Schema.Boolean))
}))),
  groupBys: Schema.optional(Schema.Array(Schema.Struct({
  type: Schema.Literal("string", "number", "boolean"),
  value: Schema.String
}))),
  havings: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  operation: Schema.Literal("eq", "neq", "gt", "gte", "lt", "lte"),
  value: Schema.Number
}))),
  limit: Schema.optional(Schema.Number),
  needle: Schema.optional(Schema.Struct({
  isRegex: Schema.optional(Schema.Boolean),
  matchCase: Schema.optional(Schema.Boolean),
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
})),
  orderBy: Schema.optional(Schema.Struct({
  order: Schema.optional(Schema.Literal("asc", "desc")),
  value: Schema.String
}))
})),
  patternType: Schema.optional(Schema.Literal("message", "error")),
  queryId: Schema.String,
  timeframe: Schema.Struct({
  from: Schema.Number,
  to: Schema.Number
}),
  view: Schema.optional(Schema.Literal("traces", "events", "calculations", "invocations", "requests", "patterns"))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/observability/telemetry/query" }),
).annotations({ identifier: "TelemetryqueryRequest" }) as unknown as Schema.Schema<TelemetryqueryRequest>;

export interface TelemetryqueryResponse {
  result: { errors: { message: string }[]; messages: { message: "Successful request" }[]; result: { calculations?: { aggregates: { count: number; groups?: { key: string; value: unknown }[]; interval: number; sampleInterval: number; value: number }[]; alias?: string; calculation: string; series: { data: { count: number; firstSeen: string; groups?: { key: string; value: unknown }[]; interval: number; lastSeen: string; sampleInterval: number; value: number }[]; time: string }[] }[]; compare?: { aggregates: { count: number; groups?: { key: string; value: unknown }[]; interval: number; sampleInterval: number; value: number }[]; alias?: string; calculation: string; series: { data: { count: number; firstSeen: string; groups?: { key: string; value: unknown }[]; interval: number; lastSeen: string; sampleInterval: number; value: number }[]; time: string }[] }[]; events?: { count?: number; events?: { $containers?: Record<string, unknown>; $metadata: { account?: string; cloudService?: string; coldStart?: number; cost?: number; duration?: number; endTime?: number; error?: string; errorTemplate?: string; fingerprint?: string; id: string; level?: string; message?: string; messageTemplate?: string; metricName?: string; origin?: string; parentSpanId?: string; provider?: string; region?: string; requestId?: string; service?: string; spanId?: string; spanName?: string; stackId?: string; startTime?: number; statusCode?: number; traceDuration?: number; traceId?: string; transactionName?: string; trigger?: string; type?: string; url?: string }; $workers?: unknown; dataset: string; source: unknown; timestamp: number }[]; fields?: { key: string; type: string }[]; series?: { data: { aggregates: { _count: number; _firstSeen: string; _interval: number; _lastSeen: string; bin?: Record<string, unknown> }; count: number; errors?: number; groups?: Record<string, unknown>; interval: number; sampleInterval: number }[]; time: string }[] }; invocations?: Record<string, unknown>; patterns?: { count: number; pattern: string; series: { data: { count: number; groups?: { key: string; value: unknown }[]; interval: number; sampleInterval: number; value: number }; time: string }[]; service: string }[]; run: { accountId: string; created?: string; dry: boolean; environmentId: string; granularity: number; id: string; query: { created: string; description: string; environmentId: string; generated: boolean; id: string; name: string; parameters: { calculations?: { alias?: string; key?: string; keyType?: "string" | "number" | "boolean"; operator: "uniq" | "count" | "max" | "min" | "sum" | "avg" | "median" | "p001" | "p01" | "p05" | "p10" | "p25" | "p75" | "p90" | "p95" | "p99" | "p999" | "stddev" | "variance" | "COUNT_DISTINCT" | "COUNT" | "MAX" | "MIN" | "SUM" | "AVG" | "MEDIAN" | "P001" | "P01" | "P05" | "P10" | "P25" | "P75" | "P90" | "P95" | "P99" | "P999" | "STDDEV" | "VARIANCE" }[]; datasets?: string[]; filterCombination?: "and" | "or" | "AND" | "OR"; filters?: { key: string; operation: "includes" | "not_includes" | "starts_with" | "regex" | "exists" | "is_null" | "in" | "not_in" | "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "=" | "!=" | ">" | ">=" | "<" | "<=" | "INCLUDES" | "DOES_NOT_INCLUDE" | "MATCH_REGEX" | "EXISTS" | "DOES_NOT_EXIST" | "IN" | "NOT_IN" | "STARTS_WITH"; type: "string" | "number" | "boolean"; value?: unknown }[]; groupBys?: { type: "string" | "number" | "boolean"; value: string }[]; havings?: { key: string; operation: "eq" | "neq" | "gt" | "gte" | "lt" | "lte"; value: number }[]; limit?: number; needle?: { isRegex?: boolean; matchCase?: boolean; value: unknown }; orderBy?: { order?: "asc" | "desc"; value: string } }; updated: string; userId: string; workspaceId: string }; statistics?: { abr_level?: number; bytes_read: number; elapsed: number; rows_read: number }; status: "STARTED" | "COMPLETED"; timeframe: { from: number; to: number }; updated?: string; userId: string; workspaceId: string }; statistics: { abr_level?: number; bytes_read: number; elapsed: number; rows_read: number }; traces?: { errors?: string[]; rootSpanName: string; rootTransactionName: string; service: string[]; spans: number; traceDurationMs: number; traceEndMs: number; traceId: string; traceStartMs: number }[] }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const TelemetryqueryResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  message: Schema.Literal("Successful request")
})),
  result: Schema.Struct({
  calculations: Schema.optional(Schema.Array(Schema.Struct({
  aggregates: Schema.Array(Schema.Struct({
  count: Schema.Number,
  groups: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
}))),
  interval: Schema.Number,
  sampleInterval: Schema.Number,
  value: Schema.Number
})),
  alias: Schema.optional(Schema.String),
  calculation: Schema.String,
  series: Schema.Array(Schema.Struct({
  data: Schema.Array(Schema.Struct({
  count: Schema.Number,
  firstSeen: Schema.String,
  groups: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
}))),
  interval: Schema.Number,
  lastSeen: Schema.String,
  sampleInterval: Schema.Number,
  value: Schema.Number
})),
  time: Schema.String
}))
}))),
  compare: Schema.optional(Schema.Array(Schema.Struct({
  aggregates: Schema.Array(Schema.Struct({
  count: Schema.Number,
  groups: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
}))),
  interval: Schema.Number,
  sampleInterval: Schema.Number,
  value: Schema.Number
})),
  alias: Schema.optional(Schema.String),
  calculation: Schema.String,
  series: Schema.Array(Schema.Struct({
  data: Schema.Array(Schema.Struct({
  count: Schema.Number,
  firstSeen: Schema.String,
  groups: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
}))),
  interval: Schema.Number,
  lastSeen: Schema.String,
  sampleInterval: Schema.Number,
  value: Schema.Number
})),
  time: Schema.String
}))
}))),
  events: Schema.optional(Schema.Struct({
  count: Schema.optional(Schema.Number),
  events: Schema.optional(Schema.Array(Schema.Struct({
  $containers: Schema.optional(Schema.Struct({})),
  $metadata: Schema.Struct({
  account: Schema.optional(Schema.String),
  cloudService: Schema.optional(Schema.String),
  coldStart: Schema.optional(Schema.Number),
  cost: Schema.optional(Schema.Number),
  duration: Schema.optional(Schema.Number),
  endTime: Schema.optional(Schema.Number),
  error: Schema.optional(Schema.String),
  errorTemplate: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  id: Schema.String,
  level: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  messageTemplate: Schema.optional(Schema.String),
  metricName: Schema.optional(Schema.String),
  origin: Schema.optional(Schema.String),
  parentSpanId: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  spanId: Schema.optional(Schema.String),
  spanName: Schema.optional(Schema.String),
  stackId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.Number),
  statusCode: Schema.optional(Schema.Number),
  traceDuration: Schema.optional(Schema.Number),
  traceId: Schema.optional(Schema.String),
  transactionName: Schema.optional(Schema.String),
  trigger: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
}),
  $workers: Schema.optional(Schema.Union(Schema.Struct({
  durableObjectId: Schema.optional(Schema.String),
  entrypoint: Schema.optional(Schema.String),
  event: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean, Schema.Record({ key: Schema.String, value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean, Schema.Record({ key: Schema.String, value: Schema.Union(Schema.Array(Schema.Union(Schema.String, Schema.Number, Schema.Boolean)), Schema.String, Schema.Number, Schema.Boolean) })) })) })),
  eventType: Schema.Literal("fetch", "scheduled", "alarm", "cron", "queue", "email", "tail", "rpc", "websocket", "unknown"),
  executionModel: Schema.optional(Schema.Literal("durableObject", "stateless")),
  outcome: Schema.optional(Schema.String),
  requestId: Schema.String,
  scriptName: Schema.String,
  scriptVersion: Schema.optional(Schema.Struct({
  id: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String)
})),
  truncated: Schema.optional(Schema.Boolean)
}), Schema.Struct({
  cpuTimeMs: Schema.Number,
  diagnosticsChannelEvents: Schema.optional(Schema.Array(Schema.Struct({
  channel: Schema.String,
  message: Schema.String,
  timestamp: Schema.Number
}))),
  dispatchNamespace: Schema.optional(Schema.String),
  durableObjectId: Schema.optional(Schema.String),
  entrypoint: Schema.optional(Schema.String),
  event: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean) })),
  eventType: Schema.Literal("fetch", "scheduled", "alarm", "cron", "queue", "email", "tail", "rpc", "websocket", "unknown"),
  executionModel: Schema.optional(Schema.Literal("durableObject", "stateless")),
  outcome: Schema.String,
  requestId: Schema.String,
  scriptName: Schema.String,
  scriptVersion: Schema.optional(Schema.Struct({
  id: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String)
})),
  truncated: Schema.optional(Schema.Boolean),
  wallTimeMs: Schema.Number
}))),
  dataset: Schema.String,
  source: Schema.Union(Schema.String, Schema.Struct({})),
  timestamp: Schema.Number
}))),
  fields: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  type: Schema.String
}))),
  series: Schema.optional(Schema.Array(Schema.Struct({
  data: Schema.Array(Schema.Struct({
  aggregates: Schema.Struct({
  _count: Schema.Number,
  _firstSeen: Schema.String,
  _interval: Schema.Number,
  _lastSeen: Schema.String,
  bin: Schema.optional(Schema.Struct({}))
}),
  count: Schema.Number,
  errors: Schema.optional(Schema.Number),
  groups: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean) })),
  interval: Schema.Number,
  sampleInterval: Schema.Number
})),
  time: Schema.String
})))
})),
  invocations: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Array(Schema.Struct({
  $containers: Schema.optional(Schema.Struct({})),
  $metadata: Schema.Struct({
  account: Schema.optional(Schema.String),
  cloudService: Schema.optional(Schema.String),
  coldStart: Schema.optional(Schema.Number),
  cost: Schema.optional(Schema.Number),
  duration: Schema.optional(Schema.Number),
  endTime: Schema.optional(Schema.Number),
  error: Schema.optional(Schema.String),
  errorTemplate: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  id: Schema.String,
  level: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  messageTemplate: Schema.optional(Schema.String),
  metricName: Schema.optional(Schema.String),
  origin: Schema.optional(Schema.String),
  parentSpanId: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  spanId: Schema.optional(Schema.String),
  spanName: Schema.optional(Schema.String),
  stackId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.Number),
  statusCode: Schema.optional(Schema.Number),
  traceDuration: Schema.optional(Schema.Number),
  traceId: Schema.optional(Schema.String),
  transactionName: Schema.optional(Schema.String),
  trigger: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
}),
  $workers: Schema.optional(Schema.Union(Schema.Struct({
  durableObjectId: Schema.optional(Schema.String),
  entrypoint: Schema.optional(Schema.String),
  event: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean, Schema.Record({ key: Schema.String, value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean, Schema.Record({ key: Schema.String, value: Schema.Union(Schema.Array(Schema.Union(Schema.String, Schema.Number, Schema.Boolean)), Schema.String, Schema.Number, Schema.Boolean) })) })) })),
  eventType: Schema.Literal("fetch", "scheduled", "alarm", "cron", "queue", "email", "tail", "rpc", "websocket", "unknown"),
  executionModel: Schema.optional(Schema.Literal("durableObject", "stateless")),
  outcome: Schema.optional(Schema.String),
  requestId: Schema.String,
  scriptName: Schema.String,
  scriptVersion: Schema.optional(Schema.Struct({
  id: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String)
})),
  truncated: Schema.optional(Schema.Boolean)
}), Schema.Struct({
  cpuTimeMs: Schema.Number,
  diagnosticsChannelEvents: Schema.optional(Schema.Array(Schema.Struct({
  channel: Schema.String,
  message: Schema.String,
  timestamp: Schema.Number
}))),
  dispatchNamespace: Schema.optional(Schema.String),
  durableObjectId: Schema.optional(Schema.String),
  entrypoint: Schema.optional(Schema.String),
  event: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean) })),
  eventType: Schema.Literal("fetch", "scheduled", "alarm", "cron", "queue", "email", "tail", "rpc", "websocket", "unknown"),
  executionModel: Schema.optional(Schema.Literal("durableObject", "stateless")),
  outcome: Schema.String,
  requestId: Schema.String,
  scriptName: Schema.String,
  scriptVersion: Schema.optional(Schema.Struct({
  id: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String)
})),
  truncated: Schema.optional(Schema.Boolean),
  wallTimeMs: Schema.Number
}))),
  dataset: Schema.String,
  source: Schema.Union(Schema.String, Schema.Struct({})),
  timestamp: Schema.Number
})) })),
  patterns: Schema.optional(Schema.Array(Schema.Struct({
  count: Schema.Number,
  pattern: Schema.String,
  series: Schema.Array(Schema.Struct({
  data: Schema.Struct({
  count: Schema.Number,
  groups: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
}))),
  interval: Schema.Number,
  sampleInterval: Schema.Number,
  value: Schema.Number
}),
  time: Schema.String
})),
  service: Schema.String
}))),
  run: Schema.Struct({
  accountId: Schema.String,
  created: Schema.optional(Schema.String),
  dry: Schema.Boolean,
  environmentId: Schema.String,
  granularity: Schema.Number,
  id: Schema.String,
  query: Schema.Struct({
  created: Schema.String,
  description: Schema.String,
  environmentId: Schema.String,
  generated: Schema.Boolean,
  id: Schema.String,
  name: Schema.String,
  parameters: Schema.Struct({
  calculations: Schema.optional(Schema.Array(Schema.Struct({
  alias: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  keyType: Schema.optional(Schema.Literal("string", "number", "boolean")),
  operator: Schema.Literal("uniq", "count", "max", "min", "sum", "avg", "median", "p001", "p01", "p05", "p10", "p25", "p75", "p90", "p95", "p99", "p999", "stddev", "variance", "COUNT_DISTINCT", "COUNT", "MAX", "MIN", "SUM", "AVG", "MEDIAN", "P001", "P01", "P05", "P10", "P25", "P75", "P90", "P95", "P99", "P999", "STDDEV", "VARIANCE")
}))),
  datasets: Schema.optional(Schema.Array(Schema.String)),
  filterCombination: Schema.optional(Schema.Literal("and", "or", "AND", "OR")),
  filters: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  operation: Schema.Literal("includes", "not_includes", "starts_with", "regex", "exists", "is_null", "in", "not_in", "eq", "neq", "gt", "gte", "lt", "lte", "=", "!=", ">", ">=", "<", "<=", "INCLUDES", "DOES_NOT_INCLUDE", "MATCH_REGEX", "EXISTS", "DOES_NOT_EXIST", "IN", "NOT_IN", "STARTS_WITH"),
  type: Schema.Literal("string", "number", "boolean"),
  value: Schema.optional(Schema.Union(Schema.String, Schema.Number, Schema.Boolean))
}))),
  groupBys: Schema.optional(Schema.Array(Schema.Struct({
  type: Schema.Literal("string", "number", "boolean"),
  value: Schema.String
}))),
  havings: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  operation: Schema.Literal("eq", "neq", "gt", "gte", "lt", "lte"),
  value: Schema.Number
}))),
  limit: Schema.optional(Schema.Number),
  needle: Schema.optional(Schema.Struct({
  isRegex: Schema.optional(Schema.Boolean),
  matchCase: Schema.optional(Schema.Boolean),
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
})),
  orderBy: Schema.optional(Schema.Struct({
  order: Schema.optional(Schema.Literal("asc", "desc")),
  value: Schema.String
}))
}),
  updated: Schema.String,
  userId: Schema.String,
  workspaceId: Schema.String
}),
  statistics: Schema.optional(Schema.Struct({
  abr_level: Schema.optional(Schema.Number),
  bytes_read: Schema.Number,
  elapsed: Schema.Number,
  rows_read: Schema.Number
})),
  status: Schema.Literal("STARTED", "COMPLETED"),
  timeframe: Schema.Struct({
  from: Schema.Number,
  to: Schema.Number
}),
  updated: Schema.optional(Schema.String),
  userId: Schema.String,
  workspaceId: Schema.String
}),
  statistics: Schema.Struct({
  abr_level: Schema.optional(Schema.Number),
  bytes_read: Schema.Number,
  elapsed: Schema.Number,
  rows_read: Schema.Number
}),
  traces: Schema.optional(Schema.Array(Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.String)),
  rootSpanName: Schema.String,
  rootTransactionName: Schema.String,
  service: Schema.Array(Schema.String),
  spans: Schema.Number,
  traceDurationMs: Schema.Number,
  traceEndMs: Schema.Number,
  traceId: Schema.String,
  traceStartMs: Schema.Number
})))
}),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "TelemetryqueryResponse" }) as unknown as Schema.Schema<TelemetryqueryResponse>;

export const telemetryquery: (
  input: TelemetryqueryRequest
) => Effect.Effect<
  TelemetryqueryResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TelemetryqueryRequest,
  output: TelemetryqueryResponse,
  errors: [],
}));

export interface TelemetryvalueslistRequest {
  body: { datasets: string[]; filters?: { key: string; operation: "includes" | "not_includes" | "starts_with" | "regex" | "exists" | "is_null" | "in" | "not_in" | "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "=" | "!=" | ">" | ">=" | "<" | "<=" | "INCLUDES" | "DOES_NOT_INCLUDE" | "MATCH_REGEX" | "EXISTS" | "DOES_NOT_EXIST" | "IN" | "NOT_IN" | "STARTS_WITH"; type: "string" | "number" | "boolean"; value?: unknown }[]; key: string; limit?: number; needle?: { isRegex?: boolean; matchCase?: boolean; value: unknown }; timeframe: { from: number; to: number }; type: "string" | "boolean" | "number" };
}

export const TelemetryvalueslistRequest = Schema.Struct({
  body: Schema.Struct({
  datasets: Schema.Array(Schema.String),
  filters: Schema.optional(Schema.Array(Schema.Struct({
  key: Schema.String,
  operation: Schema.Literal("includes", "not_includes", "starts_with", "regex", "exists", "is_null", "in", "not_in", "eq", "neq", "gt", "gte", "lt", "lte", "=", "!=", ">", ">=", "<", "<=", "INCLUDES", "DOES_NOT_INCLUDE", "MATCH_REGEX", "EXISTS", "DOES_NOT_EXIST", "IN", "NOT_IN", "STARTS_WITH"),
  type: Schema.Literal("string", "number", "boolean"),
  value: Schema.optional(Schema.Union(Schema.String, Schema.Number, Schema.Boolean))
}))),
  key: Schema.String,
  limit: Schema.optional(Schema.Number),
  needle: Schema.optional(Schema.Struct({
  isRegex: Schema.optional(Schema.Boolean),
  matchCase: Schema.optional(Schema.Boolean),
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
})),
  timeframe: Schema.Struct({
  from: Schema.Number,
  to: Schema.Number
}),
  type: Schema.Literal("string", "boolean", "number")
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/observability/telemetry/values" }),
).annotations({ identifier: "TelemetryvalueslistRequest" }) as unknown as Schema.Schema<TelemetryvalueslistRequest>;

export interface TelemetryvalueslistResponse {
  result: { errors: { message: string }[]; messages: { message: "Successful request" }[]; result: { dataset: string; key: string; type: "string" | "boolean" | "number"; value: unknown }[]; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const TelemetryvalueslistResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  message: Schema.Literal("Successful request")
})),
  result: Schema.Array(Schema.Struct({
  dataset: Schema.String,
  key: Schema.String,
  type: Schema.Literal("string", "boolean", "number"),
  value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean)
})),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "TelemetryvalueslistResponse" }) as unknown as Schema.Schema<TelemetryvalueslistResponse>;

export const telemetryvalueslist: (
  input: TelemetryvalueslistRequest
) => Effect.Effect<
  TelemetryvalueslistResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TelemetryvalueslistRequest,
  output: TelemetryvalueslistResponse,
  errors: [],
}));

export interface ListRegionsRequest {
  account_id: string;
}

export const ListRegionsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/placement/regions" }),
).annotations({ identifier: "ListRegionsRequest" }) as unknown as Schema.Schema<ListRegionsRequest>;

export interface ListRegionsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListRegionsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  providers: Schema.Array(Schema.Struct({
  id: Schema.String,
  regions: Schema.Array(Schema.Struct({
  id: Schema.String
}))
}))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListRegionsResponse" }) as unknown as Schema.Schema<ListRegionsResponse>;

export const listRegions: (
  input: ListRegionsRequest
) => Effect.Effect<
  ListRegionsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRegionsRequest,
  output: ListRegionsResponse,
  errors: [],
}));

export interface ListWorkersRequest {
  account_id: string;
  tags?: string;
}

export const ListWorkersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  tags: Schema.optional(Schema.String).pipe(T.HttpQuery("tags"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts" }),
).annotations({ identifier: "ListWorkersRequest" }) as unknown as Schema.Schema<ListWorkersRequest>;

export interface ListWorkersResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListWorkersResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Array(Schema.Struct({
  routes: Schema.optional(Schema.Array(Schema.Struct({
  id: Schema.String,
  pattern: Schema.String,
  script: Schema.optional(Schema.String)
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
}).annotations({ identifier: "ListWorkersResponse" }) as unknown as Schema.Schema<ListWorkersResponse>;

export const listWorkers: (
  input: ListWorkersRequest
) => Effect.Effect<
  ListWorkersResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWorkersRequest,
  output: ListWorkersResponse,
  errors: [],
}));

export interface WorkerScriptSearchWorkersRequest {
  account_id: string;
  name?: string;
  id?: string;
  order_by?: "created_on" | "modified_on" | "name";
  page?: number;
  per_page?: number;
}

export const WorkerScriptSearchWorkersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  order_by: Schema.optional(Schema.Literal("created_on", "modified_on", "name")).pipe(T.HttpQuery("order_by")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts-search" }),
).annotations({ identifier: "WorkerScriptSearchWorkersRequest" }) as unknown as Schema.Schema<WorkerScriptSearchWorkersRequest>;

export interface WorkerScriptSearchWorkersResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerScriptSearchWorkersResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Array(Schema.Struct({
  created_on: Schema.Date,
  environment_is_default: Schema.optional(Schema.Boolean),
  environment_name: Schema.optional(Schema.String),
  modified_on: Schema.Date,
  script_name: Schema.String,
  script_tag: Schema.String,
  service_name: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerScriptSearchWorkersResponse" }) as unknown as Schema.Schema<WorkerScriptSearchWorkersResponse>;

export const workerScriptSearchWorkers: (
  input: WorkerScriptSearchWorkersRequest
) => Effect.Effect<
  WorkerScriptSearchWorkersResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerScriptSearchWorkersRequest,
  output: WorkerScriptSearchWorkersResponse,
  errors: [],
}));

export interface WorkerScriptDownloadWorkerRequest {
  account_id: string;
  script_name: string;
}

export const WorkerScriptDownloadWorkerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}" }),
).annotations({ identifier: "WorkerScriptDownloadWorkerRequest" }) as unknown as Schema.Schema<WorkerScriptDownloadWorkerRequest>;

export interface WorkerScriptDownloadWorkerResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerScriptDownloadWorkerResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerScriptDownloadWorkerResponse" }) as unknown as Schema.Schema<WorkerScriptDownloadWorkerResponse>;

export const workerScriptDownloadWorker: (
  input: WorkerScriptDownloadWorkerRequest
) => Effect.Effect<
  WorkerScriptDownloadWorkerResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerScriptDownloadWorkerRequest,
  output: WorkerScriptDownloadWorkerResponse,
  errors: [],
}));

export interface WorkerScriptUploadWorkerModuleRequest {
  account_id: string;
  script_name: string;
}

export const WorkerScriptUploadWorkerModuleRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/scripts/{script_name}" }),
).annotations({ identifier: "WorkerScriptUploadWorkerModuleRequest" }) as unknown as Schema.Schema<WorkerScriptUploadWorkerModuleRequest>;

export interface WorkerScriptUploadWorkerModuleResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerScriptUploadWorkerModuleResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerScriptUploadWorkerModuleResponse" }) as unknown as Schema.Schema<WorkerScriptUploadWorkerModuleResponse>;

export const workerScriptUploadWorkerModule: (
  input: WorkerScriptUploadWorkerModuleRequest
) => Effect.Effect<
  WorkerScriptUploadWorkerModuleResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerScriptUploadWorkerModuleRequest,
  output: WorkerScriptUploadWorkerModuleResponse,
  errors: [],
}));

export interface DeleteWorker1Request {
  account_id: string;
  script_name: string;
  force?: boolean;
}

export const DeleteWorker1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/scripts/{script_name}" }),
).annotations({ identifier: "DeleteWorker1Request" }) as unknown as Schema.Schema<DeleteWorker1Request>;

export interface DeleteWorker1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteWorker1Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Literal(null))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteWorker1Response" }) as unknown as Schema.Schema<DeleteWorker1Response>;

export const deleteWorker1: (
  input: DeleteWorker1Request
) => Effect.Effect<
  DeleteWorker1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteWorker1Request,
  output: DeleteWorker1Response,
  errors: [],
}));

export interface CreateAssetsUploadSession1Request {
  account_id: string;
  script_name: string;
  body: { manifest: Record<string, unknown> };
}

export const CreateAssetsUploadSession1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  body: Schema.Struct({
  manifest: Schema.Record({ key: Schema.String, value: Schema.Struct({
  hash: Schema.String,
  size: Schema.Number
}) })
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/scripts/{script_name}/assets-upload-session" }),
).annotations({ identifier: "CreateAssetsUploadSession1Request" }) as unknown as Schema.Schema<CreateAssetsUploadSession1Request>;

export interface CreateAssetsUploadSession1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateAssetsUploadSession1Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  buckets: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
  jwt: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateAssetsUploadSession1Response" }) as unknown as Schema.Schema<CreateAssetsUploadSession1Response>;

export const createAssetsUploadSession1: (
  input: CreateAssetsUploadSession1Request
) => Effect.Effect<
  CreateAssetsUploadSession1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAssetsUploadSession1Request,
  output: CreateAssetsUploadSession1Response,
  errors: [],
}));

export interface PutContentRequest {
  account_id: string;
  script_name: string;
  "CF-WORKER-BODY-PART"?: string;
  "CF-WORKER-MAIN-MODULE-PART"?: string;
}

export const PutContentRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  "CF-WORKER-BODY-PART": Schema.optional(Schema.String).pipe(T.HttpHeader("CF-WORKER-BODY-PART")),
  "CF-WORKER-MAIN-MODULE-PART": Schema.optional(Schema.String).pipe(T.HttpHeader("CF-WORKER-MAIN-MODULE-PART"))
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/scripts/{script_name}/content" }),
).annotations({ identifier: "PutContentRequest" }) as unknown as Schema.Schema<PutContentRequest>;

export interface PutContentResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutContentResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Unknown
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutContentResponse" }) as unknown as Schema.Schema<PutContentResponse>;

export const putContent: (
  input: PutContentRequest
) => Effect.Effect<
  PutContentResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutContentRequest,
  output: PutContentResponse,
  errors: [],
}));

export interface GetContentRequest {
  account_id: string;
  script_name: string;
}

export const GetContentRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/content/v2" }),
).annotations({ identifier: "GetContentRequest" }) as unknown as Schema.Schema<GetContentRequest>;

export interface GetContentResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetContentResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetContentResponse" }) as unknown as Schema.Schema<GetContentResponse>;

export const getContent: (
  input: GetContentRequest
) => Effect.Effect<
  GetContentResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetContentRequest,
  output: GetContentResponse,
  errors: [],
}));

export interface ListDeploymentsRequest {
  account_id: string;
  script_name: string;
}

export const ListDeploymentsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/deployments" }),
).annotations({ identifier: "ListDeploymentsRequest" }) as unknown as Schema.Schema<ListDeploymentsRequest>;

export interface ListDeploymentsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListDeploymentsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  deployments: Schema.Array(Schema.Struct({
  annotations: Schema.optional(Schema.Struct({
  "workers/message": Schema.optional(Schema.String),
  "workers/triggered_by": Schema.optional(Schema.String)
})),
  author_email: Schema.optional(Schema.String),
  created_on: Schema.Date,
  id: Schema.UUID,
  source: Schema.String,
  strategy: Schema.Literal("percentage"),
  versions: Schema.Array(Schema.Struct({
  percentage: Schema.Number,
  version_id: Schema.UUID
}))
}))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListDeploymentsResponse" }) as unknown as Schema.Schema<ListDeploymentsResponse>;

export const listDeployments: (
  input: ListDeploymentsRequest
) => Effect.Effect<
  ListDeploymentsResponse,
  NoSuchKey | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDeploymentsRequest,
  output: ListDeploymentsResponse,
  errors: [NoSuchKey],
}));

export interface CreateDeploymentRequest {
  account_id: string;
  script_name: string;
  force?: boolean;
  body: { annotations?: { "workers/message"?: string; "workers/triggered_by"?: string }; author_email?: string; created_on: string; id: string; source: string; strategy: "percentage"; versions: { percentage: number; version_id: string }[] };
}

export const CreateDeploymentRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  body: Schema.Struct({
  annotations: Schema.optional(Schema.Struct({
  "workers/message": Schema.optional(Schema.String),
  "workers/triggered_by": Schema.optional(Schema.String)
})),
  author_email: Schema.optional(Schema.String),
  created_on: Schema.Date,
  id: Schema.UUID,
  source: Schema.String,
  strategy: Schema.Literal("percentage"),
  versions: Schema.Array(Schema.Struct({
  percentage: Schema.Number,
  version_id: Schema.UUID
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/scripts/{script_name}/deployments" }),
).annotations({ identifier: "CreateDeploymentRequest" }) as unknown as Schema.Schema<CreateDeploymentRequest>;

export interface CreateDeploymentResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateDeploymentResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  annotations: Schema.optional(Schema.Struct({
  "workers/message": Schema.optional(Schema.String),
  "workers/triggered_by": Schema.optional(Schema.String)
})),
  author_email: Schema.optional(Schema.String),
  created_on: Schema.Date,
  id: Schema.UUID,
  source: Schema.String,
  strategy: Schema.Literal("percentage"),
  versions: Schema.Array(Schema.Struct({
  percentage: Schema.Number,
  version_id: Schema.UUID
}))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateDeploymentResponse" }) as unknown as Schema.Schema<CreateDeploymentResponse>;

export const createDeployment: (
  input: CreateDeploymentRequest
) => Effect.Effect<
  CreateDeploymentResponse,
  NoSuchKey | ValidationError | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDeploymentRequest,
  output: CreateDeploymentResponse,
  errors: [NoSuchKey, ValidationError],
}));

export interface GetDeploymentRequest {
  account_id: string;
  script_name: string;
  deployment_id: string;
}

export const GetDeploymentRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  deployment_id: Schema.UUID.pipe(T.HttpPath("deployment_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}" }),
).annotations({ identifier: "GetDeploymentRequest" }) as unknown as Schema.Schema<GetDeploymentRequest>;

export interface GetDeploymentResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetDeploymentResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  annotations: Schema.optional(Schema.Struct({
  "workers/message": Schema.optional(Schema.String),
  "workers/triggered_by": Schema.optional(Schema.String)
})),
  author_email: Schema.optional(Schema.String),
  created_on: Schema.Date,
  id: Schema.UUID,
  source: Schema.String,
  strategy: Schema.Literal("percentage"),
  versions: Schema.Array(Schema.Struct({
  percentage: Schema.Number,
  version_id: Schema.UUID
}))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetDeploymentResponse" }) as unknown as Schema.Schema<GetDeploymentResponse>;

export const getDeployment: (
  input: GetDeploymentRequest
) => Effect.Effect<
  GetDeploymentResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDeploymentRequest,
  output: GetDeploymentResponse,
  errors: [],
}));

export interface DeleteDeploymentRequest {
  account_id: string;
  script_name: string;
  deployment_id: string;
}

export const DeleteDeploymentRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  deployment_id: Schema.UUID.pipe(T.HttpPath("deployment_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}" }),
).annotations({ identifier: "DeleteDeploymentRequest" }) as unknown as Schema.Schema<DeleteDeploymentRequest>;

export interface DeleteDeploymentResponse {
  result: { errors: { code: number; documentation_url?: string; message: string; source?: { pointer?: string } }[]; messages: { code: number; documentation_url?: string; message: string; source?: { pointer?: string } }[]; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteDeploymentResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  documentation_url: Schema.optional(Schema.String),
  message: Schema.String,
  source: Schema.optional(Schema.Struct({
  pointer: Schema.optional(Schema.String)
}))
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  documentation_url: Schema.optional(Schema.String),
  message: Schema.String,
  source: Schema.optional(Schema.Struct({
  pointer: Schema.optional(Schema.String)
}))
})),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteDeploymentResponse" }) as unknown as Schema.Schema<DeleteDeploymentResponse>;

export const deleteDeployment: (
  input: DeleteDeploymentRequest
) => Effect.Effect<
  DeleteDeploymentResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDeploymentRequest,
  output: DeleteDeploymentResponse,
  errors: [],
}));

export interface GetCronTriggersRequest {
  account_id: string;
  script_name: string;
}

export const GetCronTriggersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/schedules" }),
).annotations({ identifier: "GetCronTriggersRequest" }) as unknown as Schema.Schema<GetCronTriggersRequest>;

export interface GetCronTriggersResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetCronTriggersResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  schedules: Schema.Array(Schema.Struct({
  created_on: Schema.optional(Schema.String),
  cron: Schema.String,
  modified_on: Schema.optional(Schema.String)
}))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetCronTriggersResponse" }) as unknown as Schema.Schema<GetCronTriggersResponse>;

export const getCronTriggers: (
  input: GetCronTriggersRequest
) => Effect.Effect<
  GetCronTriggersResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCronTriggersRequest,
  output: GetCronTriggersResponse,
  errors: [],
}));

export interface UpdateCronTriggersRequest {
  account_id: string;
  script_name: string;
  body: { created_on?: string; cron: string; modified_on?: string }[];
}

export const UpdateCronTriggersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  body: Schema.Array(Schema.Struct({
  created_on: Schema.optional(Schema.String),
  cron: Schema.String,
  modified_on: Schema.optional(Schema.String)
})).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/scripts/{script_name}/schedules" }),
).annotations({ identifier: "UpdateCronTriggersRequest" }) as unknown as Schema.Schema<UpdateCronTriggersRequest>;

export interface UpdateCronTriggersResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateCronTriggersResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  schedules: Schema.Array(Schema.Struct({
  created_on: Schema.optional(Schema.String),
  cron: Schema.String,
  modified_on: Schema.optional(Schema.String)
}))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateCronTriggersResponse" }) as unknown as Schema.Schema<UpdateCronTriggersResponse>;

export const updateCronTriggers: (
  input: UpdateCronTriggersRequest
) => Effect.Effect<
  UpdateCronTriggersResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateCronTriggersRequest,
  output: UpdateCronTriggersResponse,
  errors: [],
}));

export interface GetSettingsRequest {
  account_id: string;
  script_name: string;
}

export const GetSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/script-settings" }),
).annotations({ identifier: "GetSettingsRequest" }) as unknown as Schema.Schema<GetSettingsRequest>;

export interface GetSettingsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetSettingsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  logpush: Schema.optional(Schema.Boolean),
  observability: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
})))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetSettingsResponse" }) as unknown as Schema.Schema<GetSettingsResponse>;

export const getSettings: (
  input: GetSettingsRequest
) => Effect.Effect<
  GetSettingsResponse,
  NoSuchKey | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettingsRequest,
  output: GetSettingsResponse,
  errors: [NoSuchKey],
}));

export interface PatchSettingsRequest {
  account_id: string;
  script_name: string;
  body: { logpush?: boolean; observability?: unknown; tags?: unknown; tail_consumers?: { environment?: string; namespace?: string; service: string }[] };
}

export const PatchSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  body: Schema.Struct({
  logpush: Schema.optional(Schema.Boolean),
  observability: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
})))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/workers/scripts/{script_name}/script-settings" }),
).annotations({ identifier: "PatchSettingsRequest" }) as unknown as Schema.Schema<PatchSettingsRequest>;

export interface PatchSettingsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchSettingsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  logpush: Schema.optional(Schema.Boolean),
  observability: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
})))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchSettingsResponse" }) as unknown as Schema.Schema<PatchSettingsResponse>;

export const patchSettings: (
  input: PatchSettingsRequest
) => Effect.Effect<
  PatchSettingsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSettingsRequest,
  output: PatchSettingsResponse,
  errors: [],
}));

export interface ListScriptSecrets1Request {
  account_id: string;
  script_name: string;
}

export const ListScriptSecrets1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/secrets" }),
).annotations({ identifier: "ListScriptSecrets1Request" }) as unknown as Schema.Schema<ListScriptSecrets1Request>;

export interface ListScriptSecrets1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListScriptSecrets1Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.Struct({})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListScriptSecrets1Response" }) as unknown as Schema.Schema<ListScriptSecrets1Response>;

export const listScriptSecrets1: (
  input: ListScriptSecrets1Request
) => Effect.Effect<
  ListScriptSecrets1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListScriptSecrets1Request,
  output: ListScriptSecrets1Response,
  errors: [],
}));

export interface PutScriptSecretRequest {
  account_id: string;
  script_name: string;
  body: Record<string, unknown>;
}

export const PutScriptSecretRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  body: Schema.Struct({}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/scripts/{script_name}/secrets" }),
).annotations({ identifier: "PutScriptSecretRequest" }) as unknown as Schema.Schema<PutScriptSecretRequest>;

export interface PutScriptSecretResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutScriptSecretResponse = Schema.Struct({
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
}).annotations({ identifier: "PutScriptSecretResponse" }) as unknown as Schema.Schema<PutScriptSecretResponse>;

export const putScriptSecret: (
  input: PutScriptSecretRequest
) => Effect.Effect<
  PutScriptSecretResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutScriptSecretRequest,
  output: PutScriptSecretResponse,
  errors: [],
}));

export interface GetScriptSecretRequest {
  account_id: string;
  script_name: string;
  secret_name: string;
  url_encoded?: boolean;
}

export const GetScriptSecretRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  secret_name: Schema.String.pipe(T.HttpPath("secret_name")),
  url_encoded: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("url_encoded"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}" }),
).annotations({ identifier: "GetScriptSecretRequest" }) as unknown as Schema.Schema<GetScriptSecretRequest>;

export interface GetScriptSecretResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetScriptSecretResponse = Schema.Struct({
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
}).annotations({ identifier: "GetScriptSecretResponse" }) as unknown as Schema.Schema<GetScriptSecretResponse>;

export const getScriptSecret: (
  input: GetScriptSecretRequest
) => Effect.Effect<
  GetScriptSecretResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetScriptSecretRequest,
  output: GetScriptSecretResponse,
  errors: [],
}));

export interface DeleteScriptSecret1Request {
  account_id: string;
  script_name: string;
  secret_name: string;
  url_encoded?: boolean;
}

export const DeleteScriptSecret1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  secret_name: Schema.String.pipe(T.HttpPath("secret_name")),
  url_encoded: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("url_encoded"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}" }),
).annotations({ identifier: "DeleteScriptSecret1Request" }) as unknown as Schema.Schema<DeleteScriptSecret1Request>;

export interface DeleteScriptSecret1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteScriptSecret1Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Literal(null))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteScriptSecret1Response" }) as unknown as Schema.Schema<DeleteScriptSecret1Response>;

export const deleteScriptSecret1: (
  input: DeleteScriptSecret1Request
) => Effect.Effect<
  DeleteScriptSecret1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteScriptSecret1Request,
  output: DeleteScriptSecret1Response,
  errors: [],
}));

export interface GetSettings1Request {
  account_id: string;
  script_name: string;
}

export const GetSettings1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/settings" }),
).annotations({ identifier: "GetSettings1Request" }) as unknown as Schema.Schema<GetSettings1Request>;

export interface GetSettings1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetSettings1Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  bindings: Schema.optional(Schema.Array(Schema.Struct({}))),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.optional(Schema.Number)
})),
  logpush: Schema.optional(Schema.Boolean),
  migrations: Schema.optional(Schema.Union(Schema.Struct({
  new_tag: Schema.optional(Schema.String),
  old_tag: Schema.optional(Schema.String)
}), Schema.Struct({
  steps: Schema.optional(Schema.Array(Schema.Struct({
  deleted_classes: Schema.optional(Schema.Array(Schema.String)),
  new_classes: Schema.optional(Schema.Array(Schema.String)),
  new_sqlite_classes: Schema.optional(Schema.Array(Schema.String)),
  renamed_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
}))),
  transferred_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  from_script: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
})))
})))
}))),
  observability: Schema.optional(Schema.Struct({
  enabled: Schema.Boolean,
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
  destinations: Schema.optional(Schema.Array(Schema.String)),
  enabled: Schema.Boolean,
  head_sampling_rate: Schema.optional(Schema.Number),
  invocation_logs: Schema.Boolean,
  persist: Schema.optional(Schema.Boolean)
}))
})),
  placement: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
}))),
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound"))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetSettings1Response" }) as unknown as Schema.Schema<GetSettings1Response>;

export const getSettings1: (
  input: GetSettings1Request
) => Effect.Effect<
  GetSettings1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettings1Request,
  output: GetSettings1Response,
  errors: [],
}));

export interface PatchSettings1Request {
  account_id: string;
  script_name: string;
}

export const PatchSettings1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/workers/scripts/{script_name}/settings" }),
).annotations({ identifier: "PatchSettings1Request" }) as unknown as Schema.Schema<PatchSettings1Request>;

export interface PatchSettings1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchSettings1Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  bindings: Schema.optional(Schema.Array(Schema.Struct({}))),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.optional(Schema.Number)
})),
  logpush: Schema.optional(Schema.Boolean),
  migrations: Schema.optional(Schema.Union(Schema.Struct({
  new_tag: Schema.optional(Schema.String),
  old_tag: Schema.optional(Schema.String)
}), Schema.Struct({
  steps: Schema.optional(Schema.Array(Schema.Struct({
  deleted_classes: Schema.optional(Schema.Array(Schema.String)),
  new_classes: Schema.optional(Schema.Array(Schema.String)),
  new_sqlite_classes: Schema.optional(Schema.Array(Schema.String)),
  renamed_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
}))),
  transferred_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  from_script: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
})))
})))
}))),
  observability: Schema.optional(Schema.Struct({
  enabled: Schema.Boolean,
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
  destinations: Schema.optional(Schema.Array(Schema.String)),
  enabled: Schema.Boolean,
  head_sampling_rate: Schema.optional(Schema.Number),
  invocation_logs: Schema.Boolean,
  persist: Schema.optional(Schema.Boolean)
}))
})),
  placement: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
}))),
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound"))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchSettings1Response" }) as unknown as Schema.Schema<PatchSettings1Response>;

export const patchSettings1: (
  input: PatchSettings1Request
) => Effect.Effect<
  PatchSettings1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSettings1Request,
  output: PatchSettings1Response,
  errors: [],
}));

export interface GetSubdomainRequest {
  account_id: string;
  script_name: string;
}

export const GetSubdomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/subdomain" }),
).annotations({ identifier: "GetSubdomainRequest" }) as unknown as Schema.Schema<GetSubdomainRequest>;

export interface GetSubdomainResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetSubdomainResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetSubdomainResponse" }) as unknown as Schema.Schema<GetSubdomainResponse>;

export const getSubdomain: (
  input: GetSubdomainRequest
) => Effect.Effect<
  GetSubdomainResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSubdomainRequest,
  output: GetSubdomainResponse,
  errors: [],
}));

export interface PostSubdomainRequest {
  account_id: string;
  script_name: string;
  body: { enabled: boolean; previews_enabled?: boolean };
}

export const PostSubdomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  body: Schema.Struct({
  enabled: Schema.Boolean,
  previews_enabled: Schema.optional(Schema.Boolean)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/scripts/{script_name}/subdomain" }),
).annotations({ identifier: "PostSubdomainRequest" }) as unknown as Schema.Schema<PostSubdomainRequest>;

export interface PostSubdomainResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PostSubdomainResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PostSubdomainResponse" }) as unknown as Schema.Schema<PostSubdomainResponse>;

export const postSubdomain: (
  input: PostSubdomainRequest
) => Effect.Effect<
  PostSubdomainResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PostSubdomainRequest,
  output: PostSubdomainResponse,
  errors: [],
}));

export interface DeleteSubdomainRequest {
  account_id: string;
  script_name: string;
}

export const DeleteSubdomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/scripts/{script_name}/subdomain" }),
).annotations({ identifier: "DeleteSubdomainRequest" }) as unknown as Schema.Schema<DeleteSubdomainRequest>;

export interface DeleteSubdomainResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteSubdomainResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteSubdomainResponse" }) as unknown as Schema.Schema<DeleteSubdomainResponse>;

export const deleteSubdomain: (
  input: DeleteSubdomainRequest
) => Effect.Effect<
  DeleteSubdomainResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSubdomainRequest,
  output: DeleteSubdomainResponse,
  errors: [],
}));

export interface GetAccountsAccountIdWorkersScriptsScriptNameTailsRequest {
  account_id: string;
  script_name: string;
}

export const GetAccountsAccountIdWorkersScriptsScriptNameTailsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/tails" }),
).annotations({ identifier: "GetAccountsAccountIdWorkersScriptsScriptNameTailsRequest" }) as unknown as Schema.Schema<GetAccountsAccountIdWorkersScriptsScriptNameTailsRequest>;

export interface GetAccountsAccountIdWorkersScriptsScriptNameTailsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetAccountsAccountIdWorkersScriptsScriptNameTailsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  expires_at: Schema.String,
  id: Schema.String,
  url: Schema.String
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetAccountsAccountIdWorkersScriptsScriptNameTailsResponse" }) as unknown as Schema.Schema<GetAccountsAccountIdWorkersScriptsScriptNameTailsResponse>;

export const getAccountsAccountIdWorkersScriptsScriptNameTails: (
  input: GetAccountsAccountIdWorkersScriptsScriptNameTailsRequest
) => Effect.Effect<
  GetAccountsAccountIdWorkersScriptsScriptNameTailsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsAccountIdWorkersScriptsScriptNameTailsRequest,
  output: GetAccountsAccountIdWorkersScriptsScriptNameTailsResponse,
  errors: [],
}));

export interface WorkerTailLogsStartTailRequest {
  account_id: string;
  script_name: string;
}

export const WorkerTailLogsStartTailRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/scripts/{script_name}/tails" }),
).annotations({ identifier: "WorkerTailLogsStartTailRequest" }) as unknown as Schema.Schema<WorkerTailLogsStartTailRequest>;

export interface WorkerTailLogsStartTailResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerTailLogsStartTailResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  expires_at: Schema.String,
  id: Schema.String,
  url: Schema.String
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerTailLogsStartTailResponse" }) as unknown as Schema.Schema<WorkerTailLogsStartTailResponse>;

export const workerTailLogsStartTail: (
  input: WorkerTailLogsStartTailRequest
) => Effect.Effect<
  WorkerTailLogsStartTailResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerTailLogsStartTailRequest,
  output: WorkerTailLogsStartTailResponse,
  errors: [],
}));

export interface DeleteTailRequest {
  account_id: string;
  script_name: string;
  id: string;
}

export const DeleteTailRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  id: Schema.String.pipe(T.HttpPath("id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/scripts/{script_name}/tails/{id}" }),
).annotations({ identifier: "DeleteTailRequest" }) as unknown as Schema.Schema<DeleteTailRequest>;

export interface DeleteTailResponse {
  result: { errors: { code: number; documentation_url?: string; message: string; source?: { pointer?: string } }[]; messages: { code: number; documentation_url?: string; message: string; source?: { pointer?: string } }[]; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteTailResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  documentation_url: Schema.optional(Schema.String),
  message: Schema.String,
  source: Schema.optional(Schema.Struct({
  pointer: Schema.optional(Schema.String)
}))
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  documentation_url: Schema.optional(Schema.String),
  message: Schema.String,
  source: Schema.optional(Schema.Struct({
  pointer: Schema.optional(Schema.String)
}))
})),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteTailResponse" }) as unknown as Schema.Schema<DeleteTailResponse>;

export const deleteTail: (
  input: DeleteTailRequest
) => Effect.Effect<
  DeleteTailResponse,
  NoSuchKey | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteTailRequest,
  output: DeleteTailResponse,
  errors: [NoSuchKey],
}));

export interface WorkerScriptFetchUsageModelRequest {
  account_id: string;
  script_name: string;
}

export const WorkerScriptFetchUsageModelRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/usage-model" }),
).annotations({ identifier: "WorkerScriptFetchUsageModelRequest" }) as unknown as Schema.Schema<WorkerScriptFetchUsageModelRequest>;

export interface WorkerScriptFetchUsageModelResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerScriptFetchUsageModelResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound")),
  user_limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.optional(Schema.Number)
}))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerScriptFetchUsageModelResponse" }) as unknown as Schema.Schema<WorkerScriptFetchUsageModelResponse>;

export const workerScriptFetchUsageModel: (
  input: WorkerScriptFetchUsageModelRequest
) => Effect.Effect<
  WorkerScriptFetchUsageModelResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerScriptFetchUsageModelRequest,
  output: WorkerScriptFetchUsageModelResponse,
  errors: [],
}));

export interface UpdateUsageModelRequest {
  account_id: string;
  script_name: string;
  body: { usage_model?: "standard" | "bundled" | "unbound"; user_limits?: { cpu_ms?: number } };
}

export const UpdateUsageModelRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  body: Schema.Struct({
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound")),
  user_limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.optional(Schema.Number)
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/scripts/{script_name}/usage-model" }),
).annotations({ identifier: "UpdateUsageModelRequest" }) as unknown as Schema.Schema<UpdateUsageModelRequest>;

export interface UpdateUsageModelResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateUsageModelResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound")),
  user_limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.optional(Schema.Number)
}))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateUsageModelResponse" }) as unknown as Schema.Schema<UpdateUsageModelResponse>;

export const updateUsageModel: (
  input: UpdateUsageModelRequest
) => Effect.Effect<
  UpdateUsageModelResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateUsageModelRequest,
  output: UpdateUsageModelResponse,
  errors: [],
}));

export interface ListVersionsRequest {
  account_id: string;
  script_name: string;
  deployable?: boolean;
  page?: number;
  per_page?: number;
}

export const ListVersionsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  deployable: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deployable")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/versions" }),
).annotations({ identifier: "ListVersionsRequest" }) as unknown as Schema.Schema<ListVersionsRequest>;

export interface ListVersionsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListVersionsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  items: Schema.optional(Schema.Array(Schema.Struct({
  id: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Struct({
  author_email: Schema.optional(Schema.String),
  author_id: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.String),
  hasPreview: Schema.optional(Schema.Boolean),
  modified_on: Schema.optional(Schema.String),
  source: Schema.optional(Schema.Literal("unknown", "api", "wrangler", "terraform", "dash", "dash_template", "integration", "quick_editor", "playground", "workersci"))
})),
  number: Schema.optional(Schema.Number)
})))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListVersionsResponse" }) as unknown as Schema.Schema<ListVersionsResponse>;

export const listVersions: (
  input: ListVersionsRequest
) => Effect.Effect<
  ListVersionsResponse,
  NoSuchKey | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [NoSuchKey],
}));

export interface WorkerVersionsUploadVersionRequest {
  account_id: string;
  script_name: string;
}

export const WorkerVersionsUploadVersionRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/scripts/{script_name}/versions" }),
).annotations({ identifier: "WorkerVersionsUploadVersionRequest" }) as unknown as Schema.Schema<WorkerVersionsUploadVersionRequest>;

export interface WorkerVersionsUploadVersionResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorkerVersionsUploadVersionResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  startup_time_ms: Schema.optional(Schema.Number)
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "WorkerVersionsUploadVersionResponse" }) as unknown as Schema.Schema<WorkerVersionsUploadVersionResponse>;

export const workerVersionsUploadVersion: (
  input: WorkerVersionsUploadVersionRequest
) => Effect.Effect<
  WorkerVersionsUploadVersionResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkerVersionsUploadVersionRequest,
  output: WorkerVersionsUploadVersionResponse,
  errors: [],
}));

export interface GetVersionDetailRequest {
  account_id: string;
  script_name: string;
  version_id: string;
}

export const GetVersionDetailRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  version_id: Schema.String.pipe(T.HttpPath("version_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/versions/{version_id}" }),
).annotations({ identifier: "GetVersionDetailRequest" }) as unknown as Schema.Schema<GetVersionDetailRequest>;

export interface GetVersionDetailResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetVersionDetailResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  resources: Schema.Struct({
  bindings: Schema.optional(Schema.Unknown),
  script: Schema.optional(Schema.Struct({
  etag: Schema.optional(Schema.String),
  handlers: Schema.optional(Schema.Array(Schema.String)),
  last_deployed_from: Schema.optional(Schema.String),
  named_handlers: Schema.optional(Schema.Array(Schema.Struct({
  handlers: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String)
})))
})),
  script_runtime: Schema.optional(Schema.Struct({
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.optional(Schema.Number)
})),
  migration_tag: Schema.optional(Schema.String),
  usage_model: Schema.optional(Schema.Literal("bundled", "unbound", "standard"))
}))
})
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetVersionDetailResponse" }) as unknown as Schema.Schema<GetVersionDetailResponse>;

export const getVersionDetail: (
  input: GetVersionDetailRequest
) => Effect.Effect<
  GetVersionDetailResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetVersionDetailRequest,
  output: GetVersionDetailResponse,
  errors: [],
}));

export interface GetScriptContent1Request {
  account_id: string;
  service_name: string;
  environment_name: string;
}

export const GetScriptContent1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  service_name: Schema.String.pipe(T.HttpPath("service_name")),
  environment_name: Schema.String.pipe(T.HttpPath("environment_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/content" }),
).annotations({ identifier: "GetScriptContent1Request" }) as unknown as Schema.Schema<GetScriptContent1Request>;

export interface GetScriptContent1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetScriptContent1Response = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetScriptContent1Response" }) as unknown as Schema.Schema<GetScriptContent1Response>;

export const getScriptContent1: (
  input: GetScriptContent1Request
) => Effect.Effect<
  GetScriptContent1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetScriptContent1Request,
  output: GetScriptContent1Response,
  errors: [],
}));

export interface PutScriptContent1Request {
  account_id: string;
  service_name: string;
  environment_name: string;
  "CF-WORKER-BODY-PART"?: string;
  "CF-WORKER-MAIN-MODULE-PART"?: string;
}

export const PutScriptContent1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  service_name: Schema.String.pipe(T.HttpPath("service_name")),
  environment_name: Schema.String.pipe(T.HttpPath("environment_name")),
  "CF-WORKER-BODY-PART": Schema.optional(Schema.String).pipe(T.HttpHeader("CF-WORKER-BODY-PART")),
  "CF-WORKER-MAIN-MODULE-PART": Schema.optional(Schema.String).pipe(T.HttpHeader("CF-WORKER-MAIN-MODULE-PART"))
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/content" }),
).annotations({ identifier: "PutScriptContent1Request" }) as unknown as Schema.Schema<PutScriptContent1Request>;

export interface PutScriptContent1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PutScriptContent1Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Unknown
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PutScriptContent1Response" }) as unknown as Schema.Schema<PutScriptContent1Response>;

export const putScriptContent1: (
  input: PutScriptContent1Request
) => Effect.Effect<
  PutScriptContent1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutScriptContent1Request,
  output: PutScriptContent1Response,
  errors: [],
}));

export interface GetSettings2Request {
  account_id: string;
  service_name: string;
  environment_name: string;
}

export const GetSettings2Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  service_name: Schema.String.pipe(T.HttpPath("service_name")),
  environment_name: Schema.String.pipe(T.HttpPath("environment_name"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/settings" }),
).annotations({ identifier: "GetSettings2Request" }) as unknown as Schema.Schema<GetSettings2Request>;

export interface GetSettings2Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetSettings2Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  logpush: Schema.optional(Schema.Boolean),
  observability: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
})))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetSettings2Response" }) as unknown as Schema.Schema<GetSettings2Response>;

export const getSettings2: (
  input: GetSettings2Request
) => Effect.Effect<
  GetSettings2Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSettings2Request,
  output: GetSettings2Response,
  errors: [],
}));

export interface PatchSettings2Request {
  account_id: string;
  service_name: string;
  environment_name: string;
  body: unknown;
}

export const PatchSettings2Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  service_name: Schema.String.pipe(T.HttpPath("service_name")),
  environment_name: Schema.String.pipe(T.HttpPath("environment_name")),
  body: Schema.Struct({
  result: Schema.Struct({
  logpush: Schema.optional(Schema.Boolean),
  observability: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
})))
})
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/settings" }),
).annotations({ identifier: "PatchSettings2Request" }) as unknown as Schema.Schema<PatchSettings2Request>;

export interface PatchSettings2Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchSettings2Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  logpush: Schema.optional(Schema.Boolean),
  observability: Schema.optional(Schema.Struct({})),
  tags: Schema.optional(Schema.Array(Schema.String)),
  tail_consumers: Schema.optional(Schema.Array(Schema.Struct({
  environment: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  service: Schema.String
})))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchSettings2Response" }) as unknown as Schema.Schema<PatchSettings2Response>;

export const patchSettings2: (
  input: PatchSettings2Request
) => Effect.Effect<
  PatchSettings2Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSettings2Request,
  output: PatchSettings2Response,
  errors: [],
}));

export interface GetSubdomain1Request {
  account_id: string;
}

export const GetSubdomain1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/subdomain" }),
).annotations({ identifier: "GetSubdomain1Request" }) as unknown as Schema.Schema<GetSubdomain1Request>;

export interface GetSubdomain1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetSubdomain1Response = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  subdomain: Schema.String
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetSubdomain1Response" }) as unknown as Schema.Schema<GetSubdomain1Response>;

export const getSubdomain1: (
  input: GetSubdomain1Request
) => Effect.Effect<
  GetSubdomain1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSubdomain1Request,
  output: GetSubdomain1Response,
  errors: [],
}));

export interface CreateSubdomainRequest {
  account_id: string;
  body: { subdomain: string };
}

export const CreateSubdomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  subdomain: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/subdomain" }),
).annotations({ identifier: "CreateSubdomainRequest" }) as unknown as Schema.Schema<CreateSubdomainRequest>;

export interface CreateSubdomainResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateSubdomainResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  subdomain: Schema.String
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateSubdomainResponse" }) as unknown as Schema.Schema<CreateSubdomainResponse>;

export const createSubdomain: (
  input: CreateSubdomainRequest
) => Effect.Effect<
  CreateSubdomainResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSubdomainRequest,
  output: CreateSubdomainResponse,
  errors: [],
}));

export interface DeleteSubdomain1Request {
  account_id: string;
}

export const DeleteSubdomain1Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/subdomain" }),
).annotations({ identifier: "DeleteSubdomain1Request" }) as unknown as Schema.Schema<DeleteSubdomain1Request>;

export interface DeleteSubdomain1Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteSubdomain1Response = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteSubdomain1Response" }) as unknown as Schema.Schema<DeleteSubdomain1Response>;

export const deleteSubdomain1: (
  input: DeleteSubdomain1Request
) => Effect.Effect<
  DeleteSubdomain1Response,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSubdomain1Request,
  output: DeleteSubdomain1Response,
  errors: [],
}));

export interface ListworkersRequest {
  account_id: string;
  page?: number;
  per_page?: number;
}

export const ListworkersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/workers" }),
).annotations({ identifier: "ListworkersRequest" }) as unknown as Schema.Schema<ListworkersRequest>;

export interface ListworkersResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListworkersResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Array(Schema.Struct({
  created_on: Schema.Date,
  id: Schema.String,
  logpush: Schema.Boolean,
  name: Schema.String,
  observability: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  invocation_logs: Schema.optional(Schema.Boolean)
}))
}),
  references: Schema.Struct({
  dispatch_namespace_outbounds: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  domains: Schema.Array(Schema.Struct({
  certificate_id: Schema.String,
  hostname: Schema.String,
  id: Schema.String,
  zone_id: Schema.String,
  zone_name: Schema.String
})),
  durable_objects: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  queues: Schema.Array(Schema.Struct({
  queue_consumer_id: Schema.String,
  queue_id: Schema.String,
  queue_name: Schema.String
})),
  workers: Schema.Array(Schema.Struct({
  id: Schema.String,
  name: Schema.String
}))
}),
  subdomain: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  previews_enabled: Schema.optional(Schema.Boolean)
}),
  tags: Schema.Array(Schema.String),
  tail_consumers: Schema.Array(Schema.Struct({
  name: Schema.String
})),
  updated_on: Schema.Date
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListworkersResponse" }) as unknown as Schema.Schema<ListworkersResponse>;

export const listworkers: (
  input: ListworkersRequest
) => Effect.Effect<
  ListworkersResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListworkersRequest,
  output: ListworkersResponse,
  errors: [],
}));

export interface CreateworkerRequest {
  account_id: string;
  body: unknown;
}

export const CreateworkerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/workers" }),
).annotations({ identifier: "CreateworkerRequest" }) as unknown as Schema.Schema<CreateworkerRequest>;

export interface CreateworkerResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateworkerResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  created_on: Schema.Date,
  id: Schema.String,
  logpush: Schema.Boolean,
  name: Schema.String,
  observability: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  invocation_logs: Schema.optional(Schema.Boolean)
}))
}),
  references: Schema.Struct({
  dispatch_namespace_outbounds: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  domains: Schema.Array(Schema.Struct({
  certificate_id: Schema.String,
  hostname: Schema.String,
  id: Schema.String,
  zone_id: Schema.String,
  zone_name: Schema.String
})),
  durable_objects: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  queues: Schema.Array(Schema.Struct({
  queue_consumer_id: Schema.String,
  queue_id: Schema.String,
  queue_name: Schema.String
})),
  workers: Schema.Array(Schema.Struct({
  id: Schema.String,
  name: Schema.String
}))
}),
  subdomain: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  previews_enabled: Schema.optional(Schema.Boolean)
}),
  tags: Schema.Array(Schema.String),
  tail_consumers: Schema.Array(Schema.Struct({
  name: Schema.String
})),
  updated_on: Schema.Date
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateworkerResponse" }) as unknown as Schema.Schema<CreateworkerResponse>;

export const createworker: (
  input: CreateworkerRequest
) => Effect.Effect<
  CreateworkerResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateworkerRequest,
  output: CreateworkerResponse,
  errors: [],
}));

export interface GetworkerRequest {
  account_id: string;
  worker_id: string;
}

export const GetworkerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  worker_id: Schema.String.pipe(T.HttpPath("worker_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/workers/{worker_id}" }),
).annotations({ identifier: "GetworkerRequest" }) as unknown as Schema.Schema<GetworkerRequest>;

export interface GetworkerResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetworkerResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  created_on: Schema.Date,
  id: Schema.String,
  logpush: Schema.Boolean,
  name: Schema.String,
  observability: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  invocation_logs: Schema.optional(Schema.Boolean)
}))
}),
  references: Schema.Struct({
  dispatch_namespace_outbounds: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  domains: Schema.Array(Schema.Struct({
  certificate_id: Schema.String,
  hostname: Schema.String,
  id: Schema.String,
  zone_id: Schema.String,
  zone_name: Schema.String
})),
  durable_objects: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  queues: Schema.Array(Schema.Struct({
  queue_consumer_id: Schema.String,
  queue_id: Schema.String,
  queue_name: Schema.String
})),
  workers: Schema.Array(Schema.Struct({
  id: Schema.String,
  name: Schema.String
}))
}),
  subdomain: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  previews_enabled: Schema.optional(Schema.Boolean)
}),
  tags: Schema.Array(Schema.String),
  tail_consumers: Schema.Array(Schema.Struct({
  name: Schema.String
})),
  updated_on: Schema.Date
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetworkerResponse" }) as unknown as Schema.Schema<GetworkerResponse>;

export const getworker: (
  input: GetworkerRequest
) => Effect.Effect<
  GetworkerResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetworkerRequest,
  output: GetworkerResponse,
  errors: [],
}));

export interface UpdateworkerRequest {
  account_id: string;
  worker_id: string;
  body: unknown;
}

export const UpdateworkerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  worker_id: Schema.String.pipe(T.HttpPath("worker_id")),
  body: Schema.Struct({}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/workers/{worker_id}" }),
).annotations({ identifier: "UpdateworkerRequest" }) as unknown as Schema.Schema<UpdateworkerRequest>;

export interface UpdateworkerResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateworkerResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  created_on: Schema.Date,
  id: Schema.String,
  logpush: Schema.Boolean,
  name: Schema.String,
  observability: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  invocation_logs: Schema.optional(Schema.Boolean)
}))
}),
  references: Schema.Struct({
  dispatch_namespace_outbounds: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  domains: Schema.Array(Schema.Struct({
  certificate_id: Schema.String,
  hostname: Schema.String,
  id: Schema.String,
  zone_id: Schema.String,
  zone_name: Schema.String
})),
  durable_objects: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  queues: Schema.Array(Schema.Struct({
  queue_consumer_id: Schema.String,
  queue_id: Schema.String,
  queue_name: Schema.String
})),
  workers: Schema.Array(Schema.Struct({
  id: Schema.String,
  name: Schema.String
}))
}),
  subdomain: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  previews_enabled: Schema.optional(Schema.Boolean)
}),
  tags: Schema.Array(Schema.String),
  tail_consumers: Schema.Array(Schema.Struct({
  name: Schema.String
})),
  updated_on: Schema.Date
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateworkerResponse" }) as unknown as Schema.Schema<UpdateworkerResponse>;

export const updateworker: (
  input: UpdateworkerRequest
) => Effect.Effect<
  UpdateworkerResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateworkerRequest,
  output: UpdateworkerResponse,
  errors: [],
}));

export interface DeleteworkerRequest {
  account_id: string;
  worker_id: string;
}

export const DeleteworkerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  worker_id: Schema.String.pipe(T.HttpPath("worker_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/workers/{worker_id}" }),
).annotations({ identifier: "DeleteworkerRequest" }) as unknown as Schema.Schema<DeleteworkerRequest>;

export interface DeleteworkerResponse {
  result: { errors: { code: number; documentation_url?: string; message: string; source?: { pointer?: string } }[]; messages: { code: number; documentation_url?: string; message: string; source?: { pointer?: string } }[]; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteworkerResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  documentation_url: Schema.optional(Schema.String),
  message: Schema.String,
  source: Schema.optional(Schema.Struct({
  pointer: Schema.optional(Schema.String)
}))
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  documentation_url: Schema.optional(Schema.String),
  message: Schema.String,
  source: Schema.optional(Schema.Struct({
  pointer: Schema.optional(Schema.String)
}))
})),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteworkerResponse" }) as unknown as Schema.Schema<DeleteworkerResponse>;

export const deleteworker: (
  input: DeleteworkerRequest
) => Effect.Effect<
  DeleteworkerResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteworkerRequest,
  output: DeleteworkerResponse,
  errors: [],
}));

export interface EditworkerRequest {
  account_id: string;
  worker_id: string;
}

export const EditworkerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  worker_id: Schema.String.pipe(T.HttpPath("worker_id"))
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/workers/workers/{worker_id}" }),
).annotations({ identifier: "EditworkerRequest" }) as unknown as Schema.Schema<EditworkerRequest>;

export interface EditworkerResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const EditworkerResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  created_on: Schema.Date,
  id: Schema.String,
  logpush: Schema.Boolean,
  name: Schema.String,
  observability: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  invocation_logs: Schema.optional(Schema.Boolean)
}))
}),
  references: Schema.Struct({
  dispatch_namespace_outbounds: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  domains: Schema.Array(Schema.Struct({
  certificate_id: Schema.String,
  hostname: Schema.String,
  id: Schema.String,
  zone_id: Schema.String,
  zone_name: Schema.String
})),
  durable_objects: Schema.Array(Schema.Struct({
  namespace_id: Schema.String,
  namespace_name: Schema.String,
  worker_id: Schema.String,
  worker_name: Schema.String
})),
  queues: Schema.Array(Schema.Struct({
  queue_consumer_id: Schema.String,
  queue_id: Schema.String,
  queue_name: Schema.String
})),
  workers: Schema.Array(Schema.Struct({
  id: Schema.String,
  name: Schema.String
}))
}),
  subdomain: Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  previews_enabled: Schema.optional(Schema.Boolean)
}),
  tags: Schema.Array(Schema.String),
  tail_consumers: Schema.Array(Schema.Struct({
  name: Schema.String
})),
  updated_on: Schema.Date
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "EditworkerResponse" }) as unknown as Schema.Schema<EditworkerResponse>;

export const editworker: (
  input: EditworkerRequest
) => Effect.Effect<
  EditworkerResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EditworkerRequest,
  output: EditworkerResponse,
  errors: [],
}));

export interface ListworkerversionsRequest {
  account_id: string;
  worker_id: string;
  page?: number;
  per_page?: number;
}

export const ListworkerversionsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  worker_id: Schema.String.pipe(T.HttpPath("worker_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/workers/{worker_id}/versions" }),
).annotations({ identifier: "ListworkerversionsRequest" }) as unknown as Schema.Schema<ListworkerversionsRequest>;

export interface ListworkerversionsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListworkerversionsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Array(Schema.Struct({
  annotations: Schema.optional(Schema.Struct({
  "workers/message": Schema.optional(Schema.String),
  "workers/tag": Schema.optional(Schema.String),
  "workers/triggered_by": Schema.optional(Schema.String)
})),
  assets: Schema.optional(Schema.Struct({
  config: Schema.optional(Schema.Struct({
  html_handling: Schema.optional(Schema.Literal("auto-trailing-slash", "force-trailing-slash", "drop-trailing-slash", "none")),
  not_found_handling: Schema.optional(Schema.Literal("none", "404-page", "single-page-application")),
  run_worker_first: Schema.optional(Schema.Union(Schema.Array(Schema.String), Schema.Boolean))
})),
  jwt: Schema.optional(Schema.String)
})),
  bindings: Schema.optional(Schema.Array(Schema.Struct({}))),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  created_on: Schema.Date,
  id: Schema.UUID,
  limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.Number
})),
  main_module: Schema.optional(Schema.String),
  migrations: Schema.optional(Schema.Union(Schema.Struct({
  new_tag: Schema.optional(Schema.String),
  old_tag: Schema.optional(Schema.String)
}), Schema.Struct({
  steps: Schema.optional(Schema.Array(Schema.Struct({
  deleted_classes: Schema.optional(Schema.Array(Schema.String)),
  new_classes: Schema.optional(Schema.Array(Schema.String)),
  new_sqlite_classes: Schema.optional(Schema.Array(Schema.String)),
  renamed_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
}))),
  transferred_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  from_script: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
})))
})))
}))),
  modules: Schema.optional(Schema.Array(Schema.Struct({
  content_base64: Schema.String,
  content_type: Schema.String,
  name: Schema.String
}))),
  number: Schema.Number,
  placement: Schema.optional(Schema.Struct({
  mode: Schema.optional(Schema.Literal("smart"))
})),
  source: Schema.optional(Schema.String),
  startup_time_ms: Schema.optional(Schema.Number),
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound"))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListworkerversionsResponse" }) as unknown as Schema.Schema<ListworkerversionsResponse>;

export const listworkerversions: (
  input: ListworkerversionsRequest
) => Effect.Effect<
  ListworkerversionsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListworkerversionsRequest,
  output: ListworkerversionsResponse,
  errors: [],
}));

export interface CreateworkerversionRequest {
  account_id: string;
  worker_id: string;
  deploy?: boolean;
  body: { annotations?: { "workers/message"?: string; "workers/tag"?: string; "workers/triggered_by"?: string }; assets?: { config?: { html_handling?: "auto-trailing-slash" | "force-trailing-slash" | "drop-trailing-slash" | "none"; not_found_handling?: "none" | "404-page" | "single-page-application"; run_worker_first?: unknown }; jwt?: string }; bindings?: Record<string, unknown>[]; compatibility_date?: string; compatibility_flags?: string[]; created_on: string; id: string; limits?: { cpu_ms: number }; main_module?: string; migrations?: unknown; modules?: { content_base64: string; content_type: string; name: string }[]; number: number; placement?: { mode?: "smart" }; source?: string; startup_time_ms?: number; usage_model?: "standard" | "bundled" | "unbound" };
}

export const CreateworkerversionRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  worker_id: Schema.String.pipe(T.HttpPath("worker_id")),
  deploy: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deploy")),
  body: Schema.Struct({
  annotations: Schema.optional(Schema.Struct({
  "workers/message": Schema.optional(Schema.String),
  "workers/tag": Schema.optional(Schema.String),
  "workers/triggered_by": Schema.optional(Schema.String)
})),
  assets: Schema.optional(Schema.Struct({
  config: Schema.optional(Schema.Struct({
  html_handling: Schema.optional(Schema.Literal("auto-trailing-slash", "force-trailing-slash", "drop-trailing-slash", "none")),
  not_found_handling: Schema.optional(Schema.Literal("none", "404-page", "single-page-application")),
  run_worker_first: Schema.optional(Schema.Union(Schema.Array(Schema.String), Schema.Boolean))
})),
  jwt: Schema.optional(Schema.String)
})),
  bindings: Schema.optional(Schema.Array(Schema.Struct({}))),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  created_on: Schema.Date,
  id: Schema.UUID,
  limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.Number
})),
  main_module: Schema.optional(Schema.String),
  migrations: Schema.optional(Schema.Union(Schema.Struct({
  new_tag: Schema.optional(Schema.String),
  old_tag: Schema.optional(Schema.String)
}), Schema.Struct({
  steps: Schema.optional(Schema.Array(Schema.Struct({
  deleted_classes: Schema.optional(Schema.Array(Schema.String)),
  new_classes: Schema.optional(Schema.Array(Schema.String)),
  new_sqlite_classes: Schema.optional(Schema.Array(Schema.String)),
  renamed_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
}))),
  transferred_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  from_script: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
})))
})))
}))),
  modules: Schema.optional(Schema.Array(Schema.Struct({
  content_base64: Schema.String,
  content_type: Schema.String,
  name: Schema.String
}))),
  number: Schema.Number,
  placement: Schema.optional(Schema.Struct({
  mode: Schema.optional(Schema.Literal("smart"))
})),
  source: Schema.optional(Schema.String),
  startup_time_ms: Schema.optional(Schema.Number),
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound"))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workers/workers/{worker_id}/versions" }),
).annotations({ identifier: "CreateworkerversionRequest" }) as unknown as Schema.Schema<CreateworkerversionRequest>;

export interface CreateworkerversionResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateworkerversionResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  annotations: Schema.optional(Schema.Struct({
  "workers/message": Schema.optional(Schema.String),
  "workers/tag": Schema.optional(Schema.String),
  "workers/triggered_by": Schema.optional(Schema.String)
})),
  assets: Schema.optional(Schema.Struct({
  config: Schema.optional(Schema.Struct({
  html_handling: Schema.optional(Schema.Literal("auto-trailing-slash", "force-trailing-slash", "drop-trailing-slash", "none")),
  not_found_handling: Schema.optional(Schema.Literal("none", "404-page", "single-page-application")),
  run_worker_first: Schema.optional(Schema.Union(Schema.Array(Schema.String), Schema.Boolean))
})),
  jwt: Schema.optional(Schema.String)
})),
  bindings: Schema.optional(Schema.Array(Schema.Struct({}))),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  created_on: Schema.Date,
  id: Schema.UUID,
  limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.Number
})),
  main_module: Schema.optional(Schema.String),
  migrations: Schema.optional(Schema.Union(Schema.Struct({
  new_tag: Schema.optional(Schema.String),
  old_tag: Schema.optional(Schema.String)
}), Schema.Struct({
  steps: Schema.optional(Schema.Array(Schema.Struct({
  deleted_classes: Schema.optional(Schema.Array(Schema.String)),
  new_classes: Schema.optional(Schema.Array(Schema.String)),
  new_sqlite_classes: Schema.optional(Schema.Array(Schema.String)),
  renamed_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
}))),
  transferred_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  from_script: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
})))
})))
}))),
  modules: Schema.optional(Schema.Array(Schema.Struct({
  content_base64: Schema.String,
  content_type: Schema.String,
  name: Schema.String
}))),
  number: Schema.Number,
  placement: Schema.optional(Schema.Struct({
  mode: Schema.optional(Schema.Literal("smart"))
})),
  source: Schema.optional(Schema.String),
  startup_time_ms: Schema.optional(Schema.Number),
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound"))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateworkerversionResponse" }) as unknown as Schema.Schema<CreateworkerversionResponse>;

export const createworkerversion: (
  input: CreateworkerversionRequest
) => Effect.Effect<
  CreateworkerversionResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateworkerversionRequest,
  output: CreateworkerversionResponse,
  errors: [],
}));

export interface GetworkerversionRequest {
  account_id: string;
  worker_id: string;
  version_id: string;
  include?: "modules";
}

export const GetworkerversionRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  worker_id: Schema.String.pipe(T.HttpPath("worker_id")),
  version_id: Schema.String.pipe(T.HttpPath("version_id")),
  include: Schema.optional(Schema.Literal("modules")).pipe(T.HttpQuery("include"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}" }),
).annotations({ identifier: "GetworkerversionRequest" }) as unknown as Schema.Schema<GetworkerversionRequest>;

export interface GetworkerversionResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetworkerversionResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.Struct({
  annotations: Schema.optional(Schema.Struct({
  "workers/message": Schema.optional(Schema.String),
  "workers/tag": Schema.optional(Schema.String),
  "workers/triggered_by": Schema.optional(Schema.String)
})),
  assets: Schema.optional(Schema.Struct({
  config: Schema.optional(Schema.Struct({
  html_handling: Schema.optional(Schema.Literal("auto-trailing-slash", "force-trailing-slash", "drop-trailing-slash", "none")),
  not_found_handling: Schema.optional(Schema.Literal("none", "404-page", "single-page-application")),
  run_worker_first: Schema.optional(Schema.Union(Schema.Array(Schema.String), Schema.Boolean))
})),
  jwt: Schema.optional(Schema.String)
})),
  bindings: Schema.optional(Schema.Array(Schema.Struct({}))),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  created_on: Schema.Date,
  id: Schema.UUID,
  limits: Schema.optional(Schema.Struct({
  cpu_ms: Schema.Number
})),
  main_module: Schema.optional(Schema.String),
  migrations: Schema.optional(Schema.Union(Schema.Struct({
  new_tag: Schema.optional(Schema.String),
  old_tag: Schema.optional(Schema.String)
}), Schema.Struct({
  steps: Schema.optional(Schema.Array(Schema.Struct({
  deleted_classes: Schema.optional(Schema.Array(Schema.String)),
  new_classes: Schema.optional(Schema.Array(Schema.String)),
  new_sqlite_classes: Schema.optional(Schema.Array(Schema.String)),
  renamed_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
}))),
  transferred_classes: Schema.optional(Schema.Array(Schema.Struct({
  from: Schema.optional(Schema.String),
  from_script: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String)
})))
})))
}))),
  modules: Schema.optional(Schema.Array(Schema.Struct({
  content_base64: Schema.String,
  content_type: Schema.String,
  name: Schema.String
}))),
  number: Schema.Number,
  placement: Schema.optional(Schema.Struct({
  mode: Schema.optional(Schema.Literal("smart"))
})),
  source: Schema.optional(Schema.String),
  startup_time_ms: Schema.optional(Schema.Number),
  usage_model: Schema.optional(Schema.Literal("standard", "bundled", "unbound"))
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetworkerversionResponse" }) as unknown as Schema.Schema<GetworkerversionResponse>;

export const getworkerversion: (
  input: GetworkerversionRequest
) => Effect.Effect<
  GetworkerversionResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetworkerversionRequest,
  output: GetworkerversionResponse,
  errors: [],
}));

export interface DeleteworkerversionRequest {
  account_id: string;
  worker_id: string;
  version_id: string;
}

export const DeleteworkerversionRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  worker_id: Schema.String.pipe(T.HttpPath("worker_id")),
  version_id: Schema.String.pipe(T.HttpPath("version_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}" }),
).annotations({ identifier: "DeleteworkerversionRequest" }) as unknown as Schema.Schema<DeleteworkerversionRequest>;

export interface DeleteworkerversionResponse {
  result: { errors: { code: number; documentation_url?: string; message: string; source?: { pointer?: string } }[]; messages: { code: number; documentation_url?: string; message: string; source?: { pointer?: string } }[]; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteworkerversionResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  documentation_url: Schema.optional(Schema.String),
  message: Schema.String,
  source: Schema.optional(Schema.Struct({
  pointer: Schema.optional(Schema.String)
}))
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  documentation_url: Schema.optional(Schema.String),
  message: Schema.String,
  source: Schema.optional(Schema.Struct({
  pointer: Schema.optional(Schema.String)
}))
})),
  success: Schema.Literal(true)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteworkerversionResponse" }) as unknown as Schema.Schema<DeleteworkerversionResponse>;

export const deleteworkerversion: (
  input: DeleteworkerversionRequest
) => Effect.Effect<
  DeleteworkerversionResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteworkerversionRequest,
  output: DeleteworkerversionResponse,
  errors: [],
}));
