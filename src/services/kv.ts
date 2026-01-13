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

// =============================================================================
// Errors
// =============================================================================

export class AuthenticationError extends Schema.TaggedError<AuthenticationError>()(
  "AuthenticationError",
  {
    code: Schema.Number,
    message: Schema.String,
  },
) {
  static readonly _tag = "AuthenticationError";
}

export class InvalidToken extends Schema.TaggedError<InvalidToken>()("InvalidToken", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "InvalidToken";
}

export class MissingToken extends Schema.TaggedError<MissingToken>()("MissingToken", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "MissingToken";
}

export class NamespaceNameRequired extends Schema.TaggedError<NamespaceNameRequired>()(
  "NamespaceNameRequired",
  {
    code: Schema.Number,
    message: Schema.String,
  },
) {
  static readonly _tag = "NamespaceNameRequired";
}

export class NamespaceNotFound extends Schema.TaggedError<NamespaceNotFound>()(
  "NamespaceNotFound",
  {
    code: Schema.Number,
    message: Schema.String,
  },
) {
  static readonly _tag = "NamespaceNotFound";
}

export class ParseError extends Schema.TaggedError<ParseError>()("ParseError", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "ParseError";
}

export class RateLimited extends Schema.TaggedError<RateLimited>()("RateLimited", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "RateLimited";
}

export class TokenExpired extends Schema.TaggedError<TokenExpired>()("TokenExpired", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "TokenExpired";
}

export class TooManyRequests extends Schema.TaggedError<TooManyRequests>()("TooManyRequests", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "TooManyRequests";
}

export class Unauthorized extends Schema.TaggedError<Unauthorized>()("Unauthorized", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "Unauthorized";
}

export class ValidationError extends Schema.TaggedError<ValidationError>()("ValidationError", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "ValidationError";
}

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
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces" }))
  .annotations({
    identifier: "ListNamespacesRequest",
  }) as unknown as Schema.Schema<ListNamespacesRequest>;

export interface ListNamespacesResponse {
  result: { id: string; supports_url_encoding?: boolean; title: string }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListNamespacesResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      supports_url_encoding: Schema.optional(Schema.NullOr(Schema.Boolean)),
      title: Schema.String,
    }),
  ),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "ListNamespacesResponse",
}) as unknown as Schema.Schema<ListNamespacesResponse>;

export const listNamespaces: (
  input: ListNamespacesRequest,
) => Effect.Effect<
  ListNamespacesResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListNamespacesRequest,
  output: ListNamespacesResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));

export interface CreateANamespaceRequest {
  account_id: string;
  body: { title: string };
}

export const CreateANamespaceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    title: Schema.String,
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/storage/kv/namespaces" }))
  .annotations({
    identifier: "CreateANamespaceRequest",
  }) as unknown as Schema.Schema<CreateANamespaceRequest>;

export interface CreateANamespaceResponse {
  result: { id: string; supports_url_encoding?: boolean; title: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateANamespaceResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.String,
    supports_url_encoding: Schema.optional(Schema.NullOr(Schema.Boolean)),
    title: Schema.String,
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "CreateANamespaceResponse",
}) as unknown as Schema.Schema<CreateANamespaceResponse>;

export const createANamespace: (
  input: CreateANamespaceRequest,
) => Effect.Effect<
  CreateANamespaceResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNameRequired
  | ParseError
  | ValidationError
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateANamespaceRequest,
  output: CreateANamespaceResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNameRequired.pipe(T.HttpErrorCode(10019)),
    ParseError.pipe(T.HttpErrorCode(6008)),
    ValidationError.pipe(T.HttpErrorCode(10021)),
  ],
}));

export interface GetANamespaceRequest {
  namespace_id: string;
  account_id: string;
}

export const GetANamespaceRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}" }),
  )
  .annotations({
    identifier: "GetANamespaceRequest",
  }) as unknown as Schema.Schema<GetANamespaceRequest>;

export interface GetANamespaceResponse {
  result: { id: string; supports_url_encoding?: boolean; title: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetANamespaceResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.String,
    supports_url_encoding: Schema.optional(Schema.NullOr(Schema.Boolean)),
    title: Schema.String,
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "GetANamespaceResponse",
}) as unknown as Schema.Schema<GetANamespaceResponse>;

export const getANamespace: (
  input: GetANamespaceRequest,
) => Effect.Effect<
  GetANamespaceResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetANamespaceRequest,
  output: GetANamespaceResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
  ],
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
    title: Schema.String,
  }).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({ method: "PUT", path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}" }),
  )
  .annotations({
    identifier: "WorkersKvNamespaceRenameANamespaceRequest",
  }) as unknown as Schema.Schema<WorkersKvNamespaceRenameANamespaceRequest>;

export interface WorkersKvNamespaceRenameANamespaceResponse {
  result: { id: string; supports_url_encoding?: boolean; title: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const WorkersKvNamespaceRenameANamespaceResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.String,
    supports_url_encoding: Schema.optional(Schema.NullOr(Schema.Boolean)),
    title: Schema.String,
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "WorkersKvNamespaceRenameANamespaceResponse",
}) as unknown as Schema.Schema<WorkersKvNamespaceRenameANamespaceResponse>;

export const workersKvNamespaceRenameANamespace: (
  input: WorkersKvNamespaceRenameANamespaceRequest,
) => Effect.Effect<
  WorkersKvNamespaceRenameANamespaceResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | NamespaceNameRequired
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceRenameANamespaceRequest,
  output: WorkersKvNamespaceRenameANamespaceResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
    NamespaceNameRequired.pipe(T.HttpErrorCode(10019)),
  ],
}));

export interface WorkersKvNamespaceRemoveANamespaceRequest {
  namespace_id: string;
  account_id: string;
}

export const WorkersKvNamespaceRemoveANamespaceRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}",
    }),
  )
  .annotations({
    identifier: "WorkersKvNamespaceRemoveANamespaceRequest",
  }) as unknown as Schema.Schema<WorkersKvNamespaceRemoveANamespaceRequest>;

export interface WorkersKvNamespaceRemoveANamespaceResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const WorkersKvNamespaceRemoveANamespaceResponse = Schema.Struct({
  result: Schema.Union(Schema.NullOr(Schema.Unknown), Schema.Struct({})),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "WorkersKvNamespaceRemoveANamespaceResponse",
}) as unknown as Schema.Schema<WorkersKvNamespaceRemoveANamespaceResponse>;

export const workersKvNamespaceRemoveANamespace: (
  input: WorkersKvNamespaceRemoveANamespaceRequest,
) => Effect.Effect<
  WorkersKvNamespaceRemoveANamespaceResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceRemoveANamespaceRequest,
  output: WorkersKvNamespaceRemoveANamespaceResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
  ],
}));

export interface WorkersKvNamespaceWriteMultipleKeyValuePairsRequest {
  namespace_id: string;
  account_id: string;
  body: {
    base64?: boolean;
    expiration?: number;
    expiration_ttl?: number;
    key: string;
    metadata?: unknown;
    value: string;
  }[];
}

export const WorkersKvNamespaceWriteMultipleKeyValuePairsRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(
    Schema.Struct({
      base64: Schema.optional(Schema.NullOr(Schema.Boolean)),
      expiration: Schema.optional(Schema.NullOr(Schema.Number)),
      expiration_ttl: Schema.optional(Schema.NullOr(Schema.Number)),
      key: Schema.String,
      metadata: Schema.optional(Schema.NullOr(Schema.Unknown)),
      value: Schema.String,
    }),
  ).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk",
    }),
  )
  .annotations({
    identifier: "WorkersKvNamespaceWriteMultipleKeyValuePairsRequest",
  }) as unknown as Schema.Schema<WorkersKvNamespaceWriteMultipleKeyValuePairsRequest>;

export interface WorkersKvNamespaceWriteMultipleKeyValuePairsResponse {
  result: { successful_key_count?: number; unsuccessful_keys?: string[] };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const WorkersKvNamespaceWriteMultipleKeyValuePairsResponse = Schema.Struct({
  result: Schema.Struct({
    successful_key_count: Schema.optional(Schema.NullOr(Schema.Number)),
    unsuccessful_keys: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "WorkersKvNamespaceWriteMultipleKeyValuePairsResponse",
}) as unknown as Schema.Schema<WorkersKvNamespaceWriteMultipleKeyValuePairsResponse>;

export const workersKvNamespaceWriteMultipleKeyValuePairs: (
  input: WorkersKvNamespaceWriteMultipleKeyValuePairsRequest,
) => Effect.Effect<
  WorkersKvNamespaceWriteMultipleKeyValuePairsResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | ValidationError
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceWriteMultipleKeyValuePairsRequest,
  output: WorkersKvNamespaceWriteMultipleKeyValuePairsResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
    ValidationError.pipe(T.HttpErrorCode(10021)),
  ],
}));

export interface DeleteMultipleKeyValuePairsDeprecatedRequest {
  namespace_id: string;
  account_id: string;
  body: string[];
}

export const DeleteMultipleKeyValuePairsDeprecatedRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(Schema.String).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk",
    }),
  )
  .annotations({
    identifier: "DeleteMultipleKeyValuePairsDeprecatedRequest",
  }) as unknown as Schema.Schema<DeleteMultipleKeyValuePairsDeprecatedRequest>;

export interface DeleteMultipleKeyValuePairsDeprecatedResponse {
  result: { successful_key_count?: number; unsuccessful_keys?: string[] };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteMultipleKeyValuePairsDeprecatedResponse = Schema.Struct({
  result: Schema.Struct({
    successful_key_count: Schema.optional(Schema.NullOr(Schema.Number)),
    unsuccessful_keys: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "DeleteMultipleKeyValuePairsDeprecatedResponse",
}) as unknown as Schema.Schema<DeleteMultipleKeyValuePairsDeprecatedResponse>;

export const deleteMultipleKeyValuePairsDeprecated: (
  input: DeleteMultipleKeyValuePairsDeprecatedRequest,
) => Effect.Effect<
  DeleteMultipleKeyValuePairsDeprecatedResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteMultipleKeyValuePairsDeprecatedRequest,
  output: DeleteMultipleKeyValuePairsDeprecatedResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
  ],
}));

export interface DeleteMultipleKeyValuePairsRequest {
  namespace_id: string;
  account_id: string;
  body: string[];
}

export const DeleteMultipleKeyValuePairsRequest = Schema.Struct({
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(Schema.String).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/delete",
    }),
  )
  .annotations({
    identifier: "DeleteMultipleKeyValuePairsRequest",
  }) as unknown as Schema.Schema<DeleteMultipleKeyValuePairsRequest>;

export interface DeleteMultipleKeyValuePairsResponse {
  result: { successful_key_count?: number; unsuccessful_keys?: string[] };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteMultipleKeyValuePairsResponse = Schema.Struct({
  result: Schema.Struct({
    successful_key_count: Schema.optional(Schema.NullOr(Schema.Number)),
    unsuccessful_keys: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "DeleteMultipleKeyValuePairsResponse",
}) as unknown as Schema.Schema<DeleteMultipleKeyValuePairsResponse>;

export const deleteMultipleKeyValuePairs: (
  input: DeleteMultipleKeyValuePairsRequest,
) => Effect.Effect<
  DeleteMultipleKeyValuePairsResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteMultipleKeyValuePairsRequest,
  output: DeleteMultipleKeyValuePairsResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
  ],
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
    type: Schema.optional(Schema.NullOr(Schema.Literal("text", "json"))),
    withMetadata: Schema.optional(Schema.NullOr(Schema.Boolean)),
  }).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/get",
    }),
  )
  .annotations({
    identifier: "GetMultipleKeyValuePairsRequest",
  }) as unknown as Schema.Schema<GetMultipleKeyValuePairsRequest>;

export interface GetMultipleKeyValuePairsResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetMultipleKeyValuePairsResponse = Schema.Struct({
  result: Schema.Union(
    Schema.Struct({
      values: Schema.optional(
        Schema.NullOr(
          Schema.Record({
            key: Schema.String,
            value: Schema.Union(
              Schema.String,
              Schema.Number,
              Schema.Boolean,
              Schema.Record({ key: Schema.String, value: Schema.Unknown }),
            ),
          }),
        ),
      ),
    }),
    Schema.Struct({
      values: Schema.optional(
        Schema.NullOr(
          Schema.Record({
            key: Schema.String,
            value: Schema.Struct({
              expiration: Schema.optional(Schema.NullOr(Schema.Number)),
              metadata: Schema.Unknown,
              value: Schema.Unknown,
            }),
          }),
        ),
      ),
    }),
  ),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "GetMultipleKeyValuePairsResponse",
}) as unknown as Schema.Schema<GetMultipleKeyValuePairsResponse>;

export const getMultipleKeyValuePairs: (
  input: GetMultipleKeyValuePairsRequest,
) => Effect.Effect<
  GetMultipleKeyValuePairsResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMultipleKeyValuePairsRequest,
  output: GetMultipleKeyValuePairsResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
  ],
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
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/keys",
    }),
  )
  .annotations({
    identifier: "ListANamespaceSKeysRequest",
  }) as unknown as Schema.Schema<ListANamespaceSKeysRequest>;

export interface ListANamespaceSKeysResponse {
  result: { expiration?: number; metadata?: unknown; name: string }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListANamespaceSKeysResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      expiration: Schema.optional(Schema.NullOr(Schema.Number)),
      metadata: Schema.optional(Schema.NullOr(Schema.Unknown)),
      name: Schema.String,
    }),
  ),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "ListANamespaceSKeysResponse",
}) as unknown as Schema.Schema<ListANamespaceSKeysResponse>;

export const listANamespaceSKeys: (
  input: ListANamespaceSKeysRequest,
) => Effect.Effect<
  ListANamespaceSKeysResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListANamespaceSKeysRequest,
  output: ListANamespaceSKeysResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
  ],
}));

export interface WorkersKvNamespaceReadTheMetadataForAKeyRequest {
  key_name: string;
  namespace_id: string;
  account_id: string;
}

export const WorkersKvNamespaceReadTheMetadataForAKeyRequest = Schema.Struct({
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/metadata/{key_name}",
    }),
  )
  .annotations({
    identifier: "WorkersKvNamespaceReadTheMetadataForAKeyRequest",
  }) as unknown as Schema.Schema<WorkersKvNamespaceReadTheMetadataForAKeyRequest>;

export interface WorkersKvNamespaceReadTheMetadataForAKeyResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const WorkersKvNamespaceReadTheMetadataForAKeyResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "WorkersKvNamespaceReadTheMetadataForAKeyResponse",
}) as unknown as Schema.Schema<WorkersKvNamespaceReadTheMetadataForAKeyResponse>;

export const workersKvNamespaceReadTheMetadataForAKey: (
  input: WorkersKvNamespaceReadTheMetadataForAKeyRequest,
) => Effect.Effect<
  WorkersKvNamespaceReadTheMetadataForAKeyResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceReadTheMetadataForAKeyRequest,
  output: WorkersKvNamespaceReadTheMetadataForAKeyResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
  ],
}));

export interface WorkersKvNamespaceReadKeyValuePairRequest {
  key_name: string;
  namespace_id: string;
  account_id: string;
}

export const WorkersKvNamespaceReadKeyValuePairRequest = Schema.Struct({
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}",
    }),
  )
  .annotations({
    identifier: "WorkersKvNamespaceReadKeyValuePairRequest",
  }) as unknown as Schema.Schema<WorkersKvNamespaceReadKeyValuePairRequest>;

export interface WorkersKvNamespaceReadKeyValuePairResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const WorkersKvNamespaceReadKeyValuePairResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "WorkersKvNamespaceReadKeyValuePairResponse",
}) as unknown as Schema.Schema<WorkersKvNamespaceReadKeyValuePairResponse>;

export const workersKvNamespaceReadKeyValuePair: (
  input: WorkersKvNamespaceReadKeyValuePairRequest,
) => Effect.Effect<
  WorkersKvNamespaceReadKeyValuePairResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceReadKeyValuePairRequest,
  output: WorkersKvNamespaceReadKeyValuePairResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
  ],
}));

export interface WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest {
  key_name: string;
  namespace_id: string;
  account_id: string;
  expiration?: number;
  expiration_ttl?: number;
  body: FormData;
}

export const WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest = Schema.Struct({
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  expiration: Schema.optional(Schema.Number).pipe(T.HttpQuery("expiration")),
  expiration_ttl: Schema.optional(Schema.Number).pipe(T.HttpQuery("expiration_ttl")),
  body: Schema.instanceOf(FormData).pipe(T.HttpFormData()),
})
  .pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}",
    }),
  )
  .annotations({
    identifier: "WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest",
  }) as unknown as Schema.Schema<WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest>;

export interface WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse = Schema.Struct({
  result: Schema.Union(Schema.NullOr(Schema.Unknown), Schema.Struct({})),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse",
}) as unknown as Schema.Schema<WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse>;

export const workersKvNamespaceWriteKeyValuePairWithMetadata: (
  input: WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest,
) => Effect.Effect<
  WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | ValidationError
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: WorkersKvNamespaceWriteKeyValuePairWithMetadataRequest,
  output: WorkersKvNamespaceWriteKeyValuePairWithMetadataResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
    ValidationError.pipe(T.HttpErrorCode(10021)),
  ],
}));

export interface DeleteKeyValuePairRequest {
  key_name: string;
  namespace_id: string;
  account_id: string;
}

export const DeleteKeyValuePairRequest = Schema.Struct({
  key_name: Schema.String.pipe(T.HttpPath("key_name")),
  namespace_id: Schema.String.pipe(T.HttpPath("namespace_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}",
    }),
  )
  .annotations({
    identifier: "DeleteKeyValuePairRequest",
  }) as unknown as Schema.Schema<DeleteKeyValuePairRequest>;

export interface DeleteKeyValuePairResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteKeyValuePairResponse = Schema.Struct({
  result: Schema.Union(Schema.NullOr(Schema.Unknown), Schema.Struct({})),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "DeleteKeyValuePairResponse",
}) as unknown as Schema.Schema<DeleteKeyValuePairResponse>;

export const deleteKeyValuePair: (
  input: DeleteKeyValuePairRequest,
) => Effect.Effect<
  DeleteKeyValuePairResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | NamespaceNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteKeyValuePairRequest,
  output: DeleteKeyValuePairResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    NamespaceNotFound.pipe(T.HttpErrorCode(10013), T.HttpErrorStatus(404)),
  ],
}));
