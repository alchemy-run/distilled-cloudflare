/**
 * Cloudflare QUEUES API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service queues
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
  NoSuchKey,
  QueueNotFound,
  RateLimited,
  TokenExpired,
  TooManyRequests,
  Unauthorized,
  ValidationError,
} from "../errors/generated.ts";

export interface ListRequest {
  account_id: string;
}

export const ListRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/queues" }),
).annotations({ identifier: "ListRequest" }) as unknown as Schema.Schema<ListRequest>;

export interface ListResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRequest,
  output: ListResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateRequest {
  account_id: string;
  body: { queue_name: string };
}

export const CreateRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  queue_name: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/queues" }),
).annotations({ identifier: "CreateRequest" }) as unknown as Schema.Schema<CreateRequest>;

export interface CreateResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateRequest,
  output: CreateResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface Get_Request {
  queue_id: string;
  account_id: string;
}

export const Get_Request = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/queues/{queue_id}" }),
).annotations({ identifier: "Get_Request" }) as unknown as Schema.Schema<Get_Request>;

export interface Get_Response {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const Get_Response = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "Get_Response" }) as unknown as Schema.Schema<Get_Response>;

export const get_: (
  input: Get_Request
) => Effect.Effect<
  Get_Response,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: Get_Request,
  output: Get_Response,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateRequest {
  queue_id: string;
  account_id: string;
  body: { consumers?: Record<string, unknown>[]; consumers_total_count?: number; created_on?: string; modified_on?: string; producers?: Record<string, unknown>[]; producers_total_count?: number; queue_id?: string; queue_name?: string; settings?: { delivery_delay?: number; delivery_paused?: boolean; message_retention_period?: number } };
}

export const UpdateRequest = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  consumers: Schema.optional(Schema.Array(Schema.Struct({}))),
  consumers_total_count: Schema.optional(Schema.Number),
  created_on: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.String),
  producers: Schema.optional(Schema.Array(Schema.Struct({}))),
  producers_total_count: Schema.optional(Schema.Number),
  queue_id: Schema.optional(Schema.String),
  queue_name: Schema.optional(Schema.String),
  settings: Schema.optional(Schema.Struct({
  delivery_delay: Schema.optional(Schema.Number),
  delivery_paused: Schema.optional(Schema.Boolean),
  message_retention_period: Schema.optional(Schema.Number)
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/queues/{queue_id}" }),
).annotations({ identifier: "UpdateRequest" }) as unknown as Schema.Schema<UpdateRequest>;

export interface UpdateResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateResponse" }) as unknown as Schema.Schema<UpdateResponse>;

export const update: (
  input: UpdateRequest
) => Effect.Effect<
  UpdateResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateRequest,
  output: UpdateResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface Delete_Request {
  queue_id: string;
  account_id: string;
}

export const Delete_Request = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/queues/{queue_id}" }),
).annotations({ identifier: "Delete_Request" }) as unknown as Schema.Schema<Delete_Request>;

export interface Delete_Response {
  result: { errors?: { code: number; message: string }[]; messages?: string[]; success?: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const Delete_Response = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
}))),
  messages: Schema.optional(Schema.Array(Schema.String)),
  success: Schema.optional(Schema.Literal(true))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "Delete_Response" }) as unknown as Schema.Schema<Delete_Response>;

export const delete_: (
  input: Delete_Request
) => Effect.Effect<
  Delete_Response,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: Delete_Request,
  output: Delete_Response,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdatePartialRequest {
  queue_id: string;
  account_id: string;
  body: { consumers?: Record<string, unknown>[]; consumers_total_count?: number; created_on?: string; modified_on?: string; producers?: Record<string, unknown>[]; producers_total_count?: number; queue_id?: string; queue_name?: string; settings?: { delivery_delay?: number; delivery_paused?: boolean; message_retention_period?: number } };
}

export const UpdatePartialRequest = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  consumers: Schema.optional(Schema.Array(Schema.Struct({}))),
  consumers_total_count: Schema.optional(Schema.Number),
  created_on: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.String),
  producers: Schema.optional(Schema.Array(Schema.Struct({}))),
  producers_total_count: Schema.optional(Schema.Number),
  queue_id: Schema.optional(Schema.String),
  queue_name: Schema.optional(Schema.String),
  settings: Schema.optional(Schema.Struct({
  delivery_delay: Schema.optional(Schema.Number),
  delivery_paused: Schema.optional(Schema.Boolean),
  message_retention_period: Schema.optional(Schema.Number)
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/queues/{queue_id}" }),
).annotations({ identifier: "UpdatePartialRequest" }) as unknown as Schema.Schema<UpdatePartialRequest>;

export interface UpdatePartialResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdatePartialResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdatePartialResponse" }) as unknown as Schema.Schema<UpdatePartialResponse>;

export const updatePartial: (
  input: UpdatePartialRequest
) => Effect.Effect<
  UpdatePartialResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePartialRequest,
  output: UpdatePartialResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListConsumersRequest {
  queue_id: string;
  account_id: string;
}

export const ListConsumersRequest = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/queues/{queue_id}/consumers" }),
).annotations({ identifier: "ListConsumersRequest" }) as unknown as Schema.Schema<ListConsumersRequest>;

export interface ListConsumersResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListConsumersResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListConsumersResponse" }) as unknown as Schema.Schema<ListConsumersResponse>;

export const listConsumers: (
  input: ListConsumersRequest
) => Effect.Effect<
  ListConsumersResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | QueueNotFound | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListConsumersRequest,
  output: ListConsumersResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized, QueueNotFound],
}));

export interface CreateConsumerRequest {
  queue_id: string;
  account_id: string;
  body: Record<string, unknown>;
}

export const CreateConsumerRequest = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/consumers" }),
).annotations({ identifier: "CreateConsumerRequest" }) as unknown as Schema.Schema<CreateConsumerRequest>;

export interface CreateConsumerResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateConsumerResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateConsumerResponse" }) as unknown as Schema.Schema<CreateConsumerResponse>;

export const createConsumer: (
  input: CreateConsumerRequest
) => Effect.Effect<
  CreateConsumerResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | QueueNotFound | ValidationError | NoSuchKey | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateConsumerRequest,
  output: CreateConsumerResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized, QueueNotFound, ValidationError, NoSuchKey],
}));

export interface GetConsumerRequest {
  consumer_id: string;
  queue_id: string;
  account_id: string;
}

export const GetConsumerRequest = Schema.Struct({
  consumer_id: Schema.String.pipe(T.HttpPath("consumer_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}" }),
).annotations({ identifier: "GetConsumerRequest" }) as unknown as Schema.Schema<GetConsumerRequest>;

export interface GetConsumerResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetConsumerResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetConsumerResponse" }) as unknown as Schema.Schema<GetConsumerResponse>;

export const getConsumer: (
  input: GetConsumerRequest
) => Effect.Effect<
  GetConsumerResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetConsumerRequest,
  output: GetConsumerResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateConsumerRequest {
  consumer_id: string;
  queue_id: string;
  account_id: string;
  body: Record<string, unknown>;
}

export const UpdateConsumerRequest = Schema.Struct({
  consumer_id: Schema.String.pipe(T.HttpPath("consumer_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}" }),
).annotations({ identifier: "UpdateConsumerRequest" }) as unknown as Schema.Schema<UpdateConsumerRequest>;

export interface UpdateConsumerResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateConsumerResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateConsumerResponse" }) as unknown as Schema.Schema<UpdateConsumerResponse>;

export const updateConsumer: (
  input: UpdateConsumerRequest
) => Effect.Effect<
  UpdateConsumerResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | QueueNotFound | ValidationError | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateConsumerRequest,
  output: UpdateConsumerResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized, QueueNotFound, ValidationError],
}));

export interface DeleteConsumerRequest {
  consumer_id: string;
  queue_id: string;
  account_id: string;
}

export const DeleteConsumerRequest = Schema.Struct({
  consumer_id: Schema.String.pipe(T.HttpPath("consumer_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}" }),
).annotations({ identifier: "DeleteConsumerRequest" }) as unknown as Schema.Schema<DeleteConsumerRequest>;

export interface DeleteConsumerResponse {
  result: { errors?: { code: number; message: string }[]; messages?: string[]; success?: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteConsumerResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
}))),
  messages: Schema.optional(Schema.Array(Schema.String)),
  success: Schema.optional(Schema.Literal(true))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteConsumerResponse" }) as unknown as Schema.Schema<DeleteConsumerResponse>;

export const deleteConsumer: (
  input: DeleteConsumerRequest
) => Effect.Effect<
  DeleteConsumerResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | QueueNotFound | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteConsumerRequest,
  output: DeleteConsumerResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized, QueueNotFound],
}));

export interface QueuesPushMessageRequest {
  queue_id: string;
  account_id: string;
  body: unknown;
}

export const QueuesPushMessageRequest = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  delay_seconds: Schema.optional(Schema.Number)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/messages" }),
).annotations({ identifier: "QueuesPushMessageRequest" }) as unknown as Schema.Schema<QueuesPushMessageRequest>;

export interface QueuesPushMessageResponse {
  result: { errors?: { code: number; message: string }[]; messages?: string[]; success?: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const QueuesPushMessageResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
}))),
  messages: Schema.optional(Schema.Array(Schema.String)),
  success: Schema.optional(Schema.Literal(true))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "QueuesPushMessageResponse" }) as unknown as Schema.Schema<QueuesPushMessageResponse>;

export const queuesPushMessage: (
  input: QueuesPushMessageRequest
) => Effect.Effect<
  QueuesPushMessageResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: QueuesPushMessageRequest,
  output: QueuesPushMessageResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface QueuesAckMessagesRequest {
  queue_id: string;
  account_id: string;
  body: { acks?: { lease_id?: string }[]; retries?: { delay_seconds?: number; lease_id?: string }[] };
}

export const QueuesAckMessagesRequest = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  acks: Schema.optional(Schema.Array(Schema.Struct({
  lease_id: Schema.optional(Schema.String)
}))),
  retries: Schema.optional(Schema.Array(Schema.Struct({
  delay_seconds: Schema.optional(Schema.Number),
  lease_id: Schema.optional(Schema.String)
})))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/messages/ack" }),
).annotations({ identifier: "QueuesAckMessagesRequest" }) as unknown as Schema.Schema<QueuesAckMessagesRequest>;

export interface QueuesAckMessagesResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const QueuesAckMessagesResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "QueuesAckMessagesResponse" }) as unknown as Schema.Schema<QueuesAckMessagesResponse>;

export const queuesAckMessages: (
  input: QueuesAckMessagesRequest
) => Effect.Effect<
  QueuesAckMessagesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: QueuesAckMessagesRequest,
  output: QueuesAckMessagesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface QueuesPushMessagesRequest {
  queue_id: string;
  account_id: string;
  body: { delay_seconds?: number; messages?: unknown[] };
}

export const QueuesPushMessagesRequest = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  delay_seconds: Schema.optional(Schema.Number),
  messages: Schema.optional(Schema.Array(Schema.Struct({
  delay_seconds: Schema.optional(Schema.Number)
})))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/messages/batch" }),
).annotations({ identifier: "QueuesPushMessagesRequest" }) as unknown as Schema.Schema<QueuesPushMessagesRequest>;

export interface QueuesPushMessagesResponse {
  result: { errors?: { code: number; message: string }[]; messages?: string[]; success?: true };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const QueuesPushMessagesResponse = Schema.Struct({
  result: Schema.Struct({
  errors: Schema.optional(Schema.Array(Schema.Struct({
  code: Schema.Number,
  message: Schema.String
}))),
  messages: Schema.optional(Schema.Array(Schema.String)),
  success: Schema.optional(Schema.Literal(true))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "QueuesPushMessagesResponse" }) as unknown as Schema.Schema<QueuesPushMessagesResponse>;

export const queuesPushMessages: (
  input: QueuesPushMessagesRequest
) => Effect.Effect<
  QueuesPushMessagesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: QueuesPushMessagesRequest,
  output: QueuesPushMessagesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface QueuesPullMessagesRequest {
  queue_id: string;
  account_id: string;
  body: { batch_size?: number; visibility_timeout_ms?: number };
}

export const QueuesPullMessagesRequest = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  batch_size: Schema.optional(Schema.Number),
  visibility_timeout_ms: Schema.optional(Schema.Number)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/messages/pull" }),
).annotations({ identifier: "QueuesPullMessagesRequest" }) as unknown as Schema.Schema<QueuesPullMessagesRequest>;

export interface QueuesPullMessagesResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const QueuesPullMessagesResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "QueuesPullMessagesResponse" }) as unknown as Schema.Schema<QueuesPullMessagesResponse>;

export const queuesPullMessages: (
  input: QueuesPullMessagesRequest
) => Effect.Effect<
  QueuesPullMessagesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: QueuesPullMessagesRequest,
  output: QueuesPullMessagesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface Get_1Request {
  queue_id: string;
  account_id: string;
}

export const Get_1Request = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/queues/{queue_id}/purge" }),
).annotations({ identifier: "Get_1Request" }) as unknown as Schema.Schema<Get_1Request>;

export interface Get_1Response {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const Get_1Response = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "Get_1Response" }) as unknown as Schema.Schema<Get_1Response>;

export const get_1: (
  input: Get_1Request
) => Effect.Effect<
  Get_1Response,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: Get_1Request,
  output: Get_1Response,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface QueuesPurgeRequest {
  queue_id: string;
  account_id: string;
  body: { delete_messages_permanently?: boolean };
}

export const QueuesPurgeRequest = Schema.Struct({
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  delete_messages_permanently: Schema.optional(Schema.Boolean)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/purge" }),
).annotations({ identifier: "QueuesPurgeRequest" }) as unknown as Schema.Schema<QueuesPurgeRequest>;

export interface QueuesPurgeResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const QueuesPurgeResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "QueuesPurgeResponse" }) as unknown as Schema.Schema<QueuesPurgeResponse>;

export const queuesPurge: (
  input: QueuesPurgeRequest
) => Effect.Effect<
  QueuesPurgeResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: QueuesPurgeRequest,
  output: QueuesPurgeResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
