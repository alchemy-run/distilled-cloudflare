/**
 * Cloudflare WORKFLOWS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service workflows
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
  AuthenticationError,
  InvalidToken,
  MissingToken,
  RateLimited,
  TokenExpired,
  TooManyRequests,
  Unauthorized,
} from "../errors/generated.ts";

export interface ListWorkflowsRequest {
  per_page?: number;
  page?: number;
  search?: string;
  account_id: string;
}

export const ListWorkflowsRequest = Schema.Struct({
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workflows" }),
).annotations({ identifier: "ListWorkflowsRequest" }) as unknown as Schema.Schema<ListWorkflowsRequest>;

export interface ListWorkflowsResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { class_name: string; created_on: string; id: string; instances: { complete?: number; errored?: number; paused?: number; queued?: number; running?: number; terminated?: number; waiting?: number; waitingForPause?: number }; modified_on: string; name: string; script_name: string; triggered_on: string }[]; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListWorkflowsResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Array(Schema.Struct({
  class_name: Schema.String,
  created_on: Schema.Date,
  id: Schema.UUID,
  instances: Schema.Struct({
  complete: Schema.optional(Schema.Number),
  errored: Schema.optional(Schema.Number),
  paused: Schema.optional(Schema.Number),
  queued: Schema.optional(Schema.Number),
  running: Schema.optional(Schema.Number),
  terminated: Schema.optional(Schema.Number),
  waiting: Schema.optional(Schema.Number),
  waitingForPause: Schema.optional(Schema.Number)
}),
  modified_on: Schema.Date,
  name: Schema.String,
  script_name: Schema.String,
  triggered_on: Schema.Date
})),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "ListWorkflowsResponse" }) as unknown as Schema.Schema<ListWorkflowsResponse>;

export const listWorkflows: (
  input: ListWorkflowsRequest
) => Effect.Effect<
  ListWorkflowsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetWorkflowDetailsRequest {
  workflow_name: string;
  account_id: string;
}

export const GetWorkflowDetailsRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}" }),
).annotations({ identifier: "GetWorkflowDetailsRequest" }) as unknown as Schema.Schema<GetWorkflowDetailsRequest>;

export interface GetWorkflowDetailsResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { class_name: string; created_on: string; id: string; instances: { complete?: number; errored?: number; paused?: number; queued?: number; running?: number; terminated?: number; waiting?: number; waitingForPause?: number }; modified_on: string; name: string; script_name: string; triggered_on: string }; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetWorkflowDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Struct({
  class_name: Schema.String,
  created_on: Schema.Date,
  id: Schema.UUID,
  instances: Schema.Struct({
  complete: Schema.optional(Schema.Number),
  errored: Schema.optional(Schema.Number),
  paused: Schema.optional(Schema.Number),
  queued: Schema.optional(Schema.Number),
  running: Schema.optional(Schema.Number),
  terminated: Schema.optional(Schema.Number),
  waiting: Schema.optional(Schema.Number),
  waitingForPause: Schema.optional(Schema.Number)
}),
  modified_on: Schema.Date,
  name: Schema.String,
  script_name: Schema.String,
  triggered_on: Schema.Date
}),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "GetWorkflowDetailsResponse" }) as unknown as Schema.Schema<GetWorkflowDetailsResponse>;

export const getWorkflowDetails: (
  input: GetWorkflowDetailsRequest
) => Effect.Effect<
  GetWorkflowDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWorkflowDetailsRequest,
  output: GetWorkflowDetailsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateOrModifyWorkflowRequest {
  workflow_name: string;
  account_id: string;
  body: { class_name: string; script_name: string };
}

export const CreateOrModifyWorkflowRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  class_name: Schema.String,
  script_name: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/workflows/{workflow_name}" }),
).annotations({ identifier: "CreateOrModifyWorkflowRequest" }) as unknown as Schema.Schema<CreateOrModifyWorkflowRequest>;

export interface CreateOrModifyWorkflowResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { class_name: string; created_on: string; id: string; is_deleted: number; modified_on: string; name: string; script_name: string; terminator_running: number; triggered_on: string; version_id: string }; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateOrModifyWorkflowResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Struct({
  class_name: Schema.String,
  created_on: Schema.Date,
  id: Schema.UUID,
  is_deleted: Schema.Number,
  modified_on: Schema.Date,
  name: Schema.String,
  script_name: Schema.String,
  terminator_running: Schema.Number,
  triggered_on: Schema.Date,
  version_id: Schema.UUID
}),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "CreateOrModifyWorkflowResponse" }) as unknown as Schema.Schema<CreateOrModifyWorkflowResponse>;

export const createOrModifyWorkflow: (
  input: CreateOrModifyWorkflowRequest
) => Effect.Effect<
  CreateOrModifyWorkflowResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateOrModifyWorkflowRequest,
  output: CreateOrModifyWorkflowResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteWorkflowRequest {
  workflow_name: string;
  account_id: string;
}

export const DeleteWorkflowRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/workflows/{workflow_name}" }),
).annotations({ identifier: "DeleteWorkflowRequest" }) as unknown as Schema.Schema<DeleteWorkflowRequest>;

export interface DeleteWorkflowResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { status: "ok"; success: boolean }; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteWorkflowResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Struct({
  status: Schema.Literal("ok"),
  success: Schema.Boolean
}),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "DeleteWorkflowResponse" }) as unknown as Schema.Schema<DeleteWorkflowResponse>;

export const deleteWorkflow: (
  input: DeleteWorkflowRequest
) => Effect.Effect<
  DeleteWorkflowResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteWorkflowRequest,
  output: DeleteWorkflowResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListWorkflowInstancesRequest {
  workflow_name: string;
  page?: number;
  per_page?: number;
  cursor?: string;
  direction?: "asc" | "desc";
  status?: "queued" | "running" | "paused" | "errored" | "terminated" | "complete" | "waitingForPause" | "waiting";
  date_start?: string;
  date_end?: string;
  account_id: string;
}

export const ListWorkflowInstancesRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
  status: Schema.optional(Schema.Literal("queued", "running", "paused", "errored", "terminated", "complete", "waitingForPause", "waiting")).pipe(T.HttpQuery("status")),
  date_start: Schema.optional(Schema.Date).pipe(T.HttpQuery("date_start")),
  date_end: Schema.optional(Schema.Date).pipe(T.HttpQuery("date_end")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/instances" }),
).annotations({ identifier: "ListWorkflowInstancesRequest" }) as unknown as Schema.Schema<ListWorkflowInstancesRequest>;

export interface ListWorkflowInstancesResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { created_on: string; ended_on: string; id: string; modified_on: string; started_on: string; status: "queued" | "running" | "paused" | "errored" | "terminated" | "complete" | "waitingForPause" | "waiting"; version_id: string; workflow_id: string }[]; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListWorkflowInstancesResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Array(Schema.Struct({
  created_on: Schema.Date,
  ended_on: Schema.Date,
  id: Schema.String,
  modified_on: Schema.Date,
  started_on: Schema.Date,
  status: Schema.Literal("queued", "running", "paused", "errored", "terminated", "complete", "waitingForPause", "waiting"),
  version_id: Schema.UUID,
  workflow_id: Schema.UUID
})),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "ListWorkflowInstancesResponse" }) as unknown as Schema.Schema<ListWorkflowInstancesResponse>;

export const listWorkflowInstances: (
  input: ListWorkflowInstancesRequest
) => Effect.Effect<
  ListWorkflowInstancesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWorkflowInstancesRequest,
  output: ListWorkflowInstancesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateNewWorkflowInstanceRequest {
  workflow_name: string;
  account_id: string;
  body: { instance_id?: string; instance_retention?: { error_retention?: unknown; success_retention?: unknown }; params?: Record<string, unknown> };
}

export const CreateNewWorkflowInstanceRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  instance_id: Schema.optional(Schema.String),
  instance_retention: Schema.optional(Schema.Struct({
  error_retention: Schema.optional(Schema.Union(Schema.Number, Schema.String)),
  success_retention: Schema.optional(Schema.Union(Schema.Number, Schema.String))
})),
  params: Schema.optional(Schema.Struct({}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workflows/{workflow_name}/instances" }),
).annotations({ identifier: "CreateNewWorkflowInstanceRequest" }) as unknown as Schema.Schema<CreateNewWorkflowInstanceRequest>;

export interface CreateNewWorkflowInstanceResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { id: string; status: "queued" | "running" | "paused" | "errored" | "terminated" | "complete" | "waitingForPause" | "waiting"; version_id: string; workflow_id: string }; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateNewWorkflowInstanceResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Struct({
  id: Schema.String,
  status: Schema.Literal("queued", "running", "paused", "errored", "terminated", "complete", "waitingForPause", "waiting"),
  version_id: Schema.UUID,
  workflow_id: Schema.UUID
}),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "CreateNewWorkflowInstanceResponse" }) as unknown as Schema.Schema<CreateNewWorkflowInstanceResponse>;

export const createNewWorkflowInstance: (
  input: CreateNewWorkflowInstanceRequest
) => Effect.Effect<
  CreateNewWorkflowInstanceResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateNewWorkflowInstanceRequest,
  output: CreateNewWorkflowInstanceResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateWorkflowInstanceRequest {
  workflow_name: string;
  account_id: string;
  body: { instance_id?: string; instance_retention?: { error_retention?: unknown; success_retention?: unknown }; params?: Record<string, unknown> }[];
}

export const CreateWorkflowInstanceRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(Schema.Struct({
  instance_id: Schema.optional(Schema.String),
  instance_retention: Schema.optional(Schema.Struct({
  error_retention: Schema.optional(Schema.Union(Schema.Number, Schema.String)),
  success_retention: Schema.optional(Schema.Union(Schema.Number, Schema.String))
})),
  params: Schema.optional(Schema.Struct({}))
})).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/batch" }),
).annotations({ identifier: "CreateWorkflowInstanceRequest" }) as unknown as Schema.Schema<CreateWorkflowInstanceRequest>;

export interface CreateWorkflowInstanceResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { id: string; status: "queued" | "running" | "paused" | "errored" | "terminated" | "complete" | "waitingForPause" | "waiting"; version_id: string; workflow_id: string }[]; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateWorkflowInstanceResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Array(Schema.Struct({
  id: Schema.String,
  status: Schema.Literal("queued", "running", "paused", "errored", "terminated", "complete", "waitingForPause", "waiting"),
  version_id: Schema.UUID,
  workflow_id: Schema.UUID
})),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "CreateWorkflowInstanceResponse" }) as unknown as Schema.Schema<CreateWorkflowInstanceResponse>;

export const createWorkflowInstance: (
  input: CreateWorkflowInstanceRequest
) => Effect.Effect<
  CreateWorkflowInstanceResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateWorkflowInstanceRequest,
  output: CreateWorkflowInstanceResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface WorBatchTerminateWorkflowInstancesRequest {
  workflow_name: string;
  account_id: string;
  body: string[];
}

export const WorBatchTerminateWorkflowInstancesRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(Schema.String).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/batch/terminate" }),
).annotations({ identifier: "WorBatchTerminateWorkflowInstancesRequest" }) as unknown as Schema.Schema<WorBatchTerminateWorkflowInstancesRequest>;

export interface WorBatchTerminateWorkflowInstancesResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { instancesTerminated: number; status: "ok" | "already_running" }; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorBatchTerminateWorkflowInstancesResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Struct({
  instancesTerminated: Schema.Number,
  status: Schema.Literal("ok", "already_running")
}),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "WorBatchTerminateWorkflowInstancesResponse" }) as unknown as Schema.Schema<WorBatchTerminateWorkflowInstancesResponse>;

export const worBatchTerminateWorkflowInstances: (
  input: WorBatchTerminateWorkflowInstancesRequest
) => Effect.Effect<
  WorBatchTerminateWorkflowInstancesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorBatchTerminateWorkflowInstancesRequest,
  output: WorBatchTerminateWorkflowInstancesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface WorStatusTerminateWorkflowInstancesRequest {
  workflow_name: string;
  account_id: string;
}

export const WorStatusTerminateWorkflowInstancesRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/terminate" }),
).annotations({ identifier: "WorStatusTerminateWorkflowInstancesRequest" }) as unknown as Schema.Schema<WorStatusTerminateWorkflowInstancesRequest>;

export interface WorStatusTerminateWorkflowInstancesResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { status: "running" | "not_running" }; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorStatusTerminateWorkflowInstancesResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Struct({
  status: Schema.Literal("running", "not_running")
}),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "WorStatusTerminateWorkflowInstancesResponse" }) as unknown as Schema.Schema<WorStatusTerminateWorkflowInstancesResponse>;

export const worStatusTerminateWorkflowInstances: (
  input: WorStatusTerminateWorkflowInstancesRequest
) => Effect.Effect<
  WorStatusTerminateWorkflowInstancesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorStatusTerminateWorkflowInstancesRequest,
  output: WorStatusTerminateWorkflowInstancesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface WorDescribeWorkflowInstanceRequest {
  workflow_name: string;
  instance_id: string;
  account_id: string;
}

export const WorDescribeWorkflowInstanceRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  instance_id: Schema.String.pipe(T.HttpPath("instance_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}" }),
).annotations({ identifier: "WorDescribeWorkflowInstanceRequest" }) as unknown as Schema.Schema<WorDescribeWorkflowInstanceRequest>;

export interface WorDescribeWorkflowInstanceResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { end: string; error: { message: string; name: string }; output: unknown; params: Record<string, unknown>; queued: string; start: string; status: "queued" | "running" | "paused" | "errored" | "terminated" | "complete" | "waitingForPause" | "waiting"; steps: unknown[]; success: boolean; trigger: { source: "unknown" | "api" | "binding" | "event" | "cron" }; versionId: string }; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorDescribeWorkflowInstanceResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Struct({
  end: Schema.Date,
  error: Schema.Struct({
  message: Schema.String,
  name: Schema.String
}),
  output: Schema.Union(Schema.String, Schema.Number),
  params: Schema.Struct({}),
  queued: Schema.Date,
  start: Schema.Date,
  status: Schema.Literal("queued", "running", "paused", "errored", "terminated", "complete", "waitingForPause", "waiting"),
  steps: Schema.Array(Schema.Union(Schema.Struct({
  attempts: Schema.Array(Schema.Struct({
  end: Schema.Date,
  error: Schema.Struct({
  message: Schema.String,
  name: Schema.String
}),
  start: Schema.Date,
  success: Schema.Boolean
})),
  config: Schema.Struct({
  retries: Schema.Struct({
  backoff: Schema.optional(Schema.Literal("constant", "linear", "exponential")),
  delay: Schema.Union(Schema.Unknown, Schema.Number),
  limit: Schema.Number
}),
  timeout: Schema.Union(Schema.Unknown, Schema.Number)
}),
  end: Schema.Date,
  name: Schema.String,
  output: Schema.Struct({}),
  start: Schema.Date,
  success: Schema.Boolean,
  type: Schema.Literal("step")
}), Schema.Struct({
  end: Schema.Date,
  error: Schema.Struct({
  message: Schema.String,
  name: Schema.String
}),
  finished: Schema.Boolean,
  name: Schema.String,
  start: Schema.Date,
  type: Schema.Literal("sleep")
}), Schema.Struct({
  trigger: Schema.Struct({
  source: Schema.String
}),
  type: Schema.Literal("termination")
}), Schema.Struct({
  end: Schema.Date,
  error: Schema.Struct({
  message: Schema.String,
  name: Schema.String
}),
  finished: Schema.Boolean,
  name: Schema.String,
  output: Schema.Union(Schema.Struct({}), Schema.String, Schema.Number, Schema.Boolean),
  start: Schema.Date,
  type: Schema.Literal("waitForEvent")
}))),
  success: Schema.Boolean,
  trigger: Schema.Struct({
  source: Schema.Literal("unknown", "api", "binding", "event", "cron")
}),
  versionId: Schema.UUID
}),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "WorDescribeWorkflowInstanceResponse" }) as unknown as Schema.Schema<WorDescribeWorkflowInstanceResponse>;

export const worDescribeWorkflowInstance: (
  input: WorDescribeWorkflowInstanceRequest
) => Effect.Effect<
  WorDescribeWorkflowInstanceResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorDescribeWorkflowInstanceRequest,
  output: WorDescribeWorkflowInstanceResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface WorSendEventWorkflowInstanceRequest {
  workflow_name: string;
  instance_id: string;
  event_type: string;
  account_id: string;
  body: Record<string, unknown>;
}

export const WorSendEventWorkflowInstanceRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  instance_id: Schema.String.pipe(T.HttpPath("instance_id")),
  event_type: Schema.String.pipe(T.HttpPath("event_type")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/events/{event_type}" }),
).annotations({ identifier: "WorSendEventWorkflowInstanceRequest" }) as unknown as Schema.Schema<WorSendEventWorkflowInstanceRequest>;

export interface WorSendEventWorkflowInstanceResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result?: Record<string, unknown>; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorSendEventWorkflowInstanceResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.optional(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "WorSendEventWorkflowInstanceResponse" }) as unknown as Schema.Schema<WorSendEventWorkflowInstanceResponse>;

export const worSendEventWorkflowInstance: (
  input: WorSendEventWorkflowInstanceRequest
) => Effect.Effect<
  WorSendEventWorkflowInstanceResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorSendEventWorkflowInstanceRequest,
  output: WorSendEventWorkflowInstanceResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface WorChangeStatusWorkflowInstanceRequest {
  workflow_name: string;
  instance_id: string;
  account_id: string;
  body: { status: "resume" | "pause" | "terminate" | "restart" };
}

export const WorChangeStatusWorkflowInstanceRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  instance_id: Schema.String.pipe(T.HttpPath("instance_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  status: Schema.Literal("resume", "pause", "terminate", "restart")
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/status" }),
).annotations({ identifier: "WorChangeStatusWorkflowInstanceRequest" }) as unknown as Schema.Schema<WorChangeStatusWorkflowInstanceRequest>;

export interface WorChangeStatusWorkflowInstanceResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { status: "queued" | "running" | "paused" | "errored" | "terminated" | "complete" | "waitingForPause" | "waiting"; timestamp: string }; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorChangeStatusWorkflowInstanceResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Struct({
  status: Schema.Literal("queued", "running", "paused", "errored", "terminated", "complete", "waitingForPause", "waiting"),
  timestamp: Schema.Date
}),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "WorChangeStatusWorkflowInstanceResponse" }) as unknown as Schema.Schema<WorChangeStatusWorkflowInstanceResponse>;

export const worChangeStatusWorkflowInstance: (
  input: WorChangeStatusWorkflowInstanceRequest
) => Effect.Effect<
  WorChangeStatusWorkflowInstanceResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorChangeStatusWorkflowInstanceRequest,
  output: WorChangeStatusWorkflowInstanceResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListWorkflowVersionsRequest {
  workflow_name: string;
  per_page?: number;
  page?: number;
  account_id: string;
}

export const ListWorkflowVersionsRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/versions" }),
).annotations({ identifier: "ListWorkflowVersionsRequest" }) as unknown as Schema.Schema<ListWorkflowVersionsRequest>;

export interface ListWorkflowVersionsResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { class_name: string; created_on: string; id: string; modified_on: string; workflow_id: string }[]; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListWorkflowVersionsResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Array(Schema.Struct({
  class_name: Schema.String,
  created_on: Schema.Date,
  id: Schema.UUID,
  modified_on: Schema.Date,
  workflow_id: Schema.UUID
})),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "ListWorkflowVersionsResponse" }) as unknown as Schema.Schema<ListWorkflowVersionsResponse>;

export const listWorkflowVersions: (
  input: ListWorkflowVersionsRequest
) => Effect.Effect<
  ListWorkflowVersionsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWorkflowVersionsRequest,
  output: ListWorkflowVersionsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface WorDescribeWorkflowVersionsRequest {
  workflow_name: string;
  version_id: string;
  account_id: string;
}

export const WorDescribeWorkflowVersionsRequest = Schema.Struct({
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  version_id: Schema.UUID.pipe(T.HttpPath("version_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}" }),
).annotations({ identifier: "WorDescribeWorkflowVersionsRequest" }) as unknown as Schema.Schema<WorDescribeWorkflowVersionsRequest>;

export interface WorDescribeWorkflowVersionsResponse {
  result: { errors: { code: number; message: string }[]; messages: { code: number; message: string }[]; result: { class_name: string; created_on: string; id: string; modified_on: string; workflow_id: string }; result_info?: { count: number; cursor?: string; page?: number; per_page: number; total_count: number }; success: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const WorDescribeWorkflowVersionsResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  messages: Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
})),
  result: Schema.Struct({
  class_name: Schema.String,
  created_on: Schema.Date,
  id: Schema.UUID,
  modified_on: Schema.Date,
  workflow_id: Schema.UUID
}),
  result_info: Schema.optional(Schema.Struct({
  count: Schema.Number,
  cursor: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.Number,
  total_count: Schema.Number
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
}).annotations({ identifier: "WorDescribeWorkflowVersionsResponse" }) as unknown as Schema.Schema<WorDescribeWorkflowVersionsResponse>;

export const worDescribeWorkflowVersions: (
  input: WorDescribeWorkflowVersionsRequest
) => Effect.Effect<
  WorDescribeWorkflowVersionsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorDescribeWorkflowVersionsRequest,
  output: WorDescribeWorkflowVersionsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
