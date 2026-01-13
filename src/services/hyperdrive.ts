/**
 * Cloudflare HYPERDRIVE API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service hyperdrive
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

export interface ListHyperdriveRequest {
  account_id: string;
}

export const ListHyperdriveRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/hyperdrive/configs" }),
).annotations({ identifier: "ListHyperdriveRequest" }) as unknown as Schema.Schema<ListHyperdriveRequest>;

export interface ListHyperdriveResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListHyperdriveResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListHyperdriveResponse" }) as unknown as Schema.Schema<ListHyperdriveResponse>;

export const listHyperdrive: (
  input: ListHyperdriveRequest
) => Effect.Effect<
  ListHyperdriveResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListHyperdriveRequest,
  output: ListHyperdriveResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateHyperdriveRequest {
  account_id: string;
  body: { caching?: Record<string, unknown>; created_on?: string; id: string; modified_on?: string; mtls?: { ca_certificate_id?: string; mtls_certificate_id?: string; sslmode?: string }; name: string; origin: Record<string, unknown>; origin_connection_limit?: number };
}

export const CreateHyperdriveRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  caching: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.String,
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  mtls: Schema.optional(Schema.NullOr(Schema.Struct({
  ca_certificate_id: Schema.optional(Schema.NullOr(Schema.String)),
  mtls_certificate_id: Schema.optional(Schema.NullOr(Schema.String)),
  sslmode: Schema.optional(Schema.NullOr(Schema.String))
}))),
  name: Schema.String,
  origin: Schema.Struct({}),
  origin_connection_limit: Schema.optional(Schema.NullOr(Schema.Number))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/hyperdrive/configs" }),
).annotations({ identifier: "CreateHyperdriveRequest" }) as unknown as Schema.Schema<CreateHyperdriveRequest>;

export interface CreateHyperdriveResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateHyperdriveResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateHyperdriveResponse" }) as unknown as Schema.Schema<CreateHyperdriveResponse>;

export const createHyperdrive: (
  input: CreateHyperdriveRequest
) => Effect.Effect<
  CreateHyperdriveResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateHyperdriveRequest,
  output: CreateHyperdriveResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetHyperdriveRequest {
  account_id: string;
  hyperdrive_id: string;
}

export const GetHyperdriveRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  hyperdrive_id: Schema.String.pipe(T.HttpPath("hyperdrive_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}" }),
).annotations({ identifier: "GetHyperdriveRequest" }) as unknown as Schema.Schema<GetHyperdriveRequest>;

export interface GetHyperdriveResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetHyperdriveResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetHyperdriveResponse" }) as unknown as Schema.Schema<GetHyperdriveResponse>;

export const getHyperdrive: (
  input: GetHyperdriveRequest
) => Effect.Effect<
  GetHyperdriveResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetHyperdriveRequest,
  output: GetHyperdriveResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateHyperdriveRequest {
  account_id: string;
  hyperdrive_id: string;
  body: { caching?: Record<string, unknown>; created_on?: string; id: string; modified_on?: string; mtls?: { ca_certificate_id?: string; mtls_certificate_id?: string; sslmode?: string }; name: string; origin: Record<string, unknown>; origin_connection_limit?: number };
}

export const UpdateHyperdriveRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  hyperdrive_id: Schema.String.pipe(T.HttpPath("hyperdrive_id")),
  body: Schema.Struct({
  caching: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.String,
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  mtls: Schema.optional(Schema.NullOr(Schema.Struct({
  ca_certificate_id: Schema.optional(Schema.NullOr(Schema.String)),
  mtls_certificate_id: Schema.optional(Schema.NullOr(Schema.String)),
  sslmode: Schema.optional(Schema.NullOr(Schema.String))
}))),
  name: Schema.String,
  origin: Schema.Struct({}),
  origin_connection_limit: Schema.optional(Schema.NullOr(Schema.Number))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}" }),
).annotations({ identifier: "UpdateHyperdriveRequest" }) as unknown as Schema.Schema<UpdateHyperdriveRequest>;

export interface UpdateHyperdriveResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateHyperdriveResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateHyperdriveResponse" }) as unknown as Schema.Schema<UpdateHyperdriveResponse>;

export const updateHyperdrive: (
  input: UpdateHyperdriveRequest
) => Effect.Effect<
  UpdateHyperdriveResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateHyperdriveRequest,
  output: UpdateHyperdriveResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteHyperdriveRequest {
  account_id: string;
  hyperdrive_id: string;
}

export const DeleteHyperdriveRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  hyperdrive_id: Schema.String.pipe(T.HttpPath("hyperdrive_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}" }),
).annotations({ identifier: "DeleteHyperdriveRequest" }) as unknown as Schema.Schema<DeleteHyperdriveRequest>;

export interface DeleteHyperdriveResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteHyperdriveResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteHyperdriveResponse" }) as unknown as Schema.Schema<DeleteHyperdriveResponse>;

export const deleteHyperdrive: (
  input: DeleteHyperdriveRequest
) => Effect.Effect<
  DeleteHyperdriveResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteHyperdriveRequest,
  output: DeleteHyperdriveResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface PatchHyperdriveRequest {
  account_id: string;
  hyperdrive_id: string;
  body: { caching?: Record<string, unknown>; mtls?: { ca_certificate_id?: string; mtls_certificate_id?: string; sslmode?: string }; name?: string; origin?: Record<string, unknown>; origin_connection_limit?: number };
}

export const PatchHyperdriveRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  hyperdrive_id: Schema.String.pipe(T.HttpPath("hyperdrive_id")),
  body: Schema.Struct({
  caching: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  mtls: Schema.optional(Schema.NullOr(Schema.Struct({
  ca_certificate_id: Schema.optional(Schema.NullOr(Schema.String)),
  mtls_certificate_id: Schema.optional(Schema.NullOr(Schema.String)),
  sslmode: Schema.optional(Schema.NullOr(Schema.String))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  origin: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  origin_connection_limit: Schema.optional(Schema.NullOr(Schema.Number))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}" }),
).annotations({ identifier: "PatchHyperdriveRequest" }) as unknown as Schema.Schema<PatchHyperdriveRequest>;

export interface PatchHyperdriveResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchHyperdriveResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchHyperdriveResponse" }) as unknown as Schema.Schema<PatchHyperdriveResponse>;

export const patchHyperdrive: (
  input: PatchHyperdriveRequest
) => Effect.Effect<
  PatchHyperdriveResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchHyperdriveRequest,
  output: PatchHyperdriveResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
