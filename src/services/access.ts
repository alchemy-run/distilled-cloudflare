/**
 * Cloudflare ACCESS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service access
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type { HttpClient } from "@effect/platform";
import * as API from "../client/api.ts";
import * as C from "../category.ts";
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
).pipe(C.withAuthError) {
  static readonly _tag = "AuthenticationError";
}

export class InvalidToken extends Schema.TaggedError<InvalidToken>()("InvalidToken", {
  code: Schema.Number,
  message: Schema.String,
}).pipe(C.withAuthError, C.withBadRequestError) {
  static readonly _tag = "InvalidToken";
}

export class MissingToken extends Schema.TaggedError<MissingToken>()("MissingToken", {
  code: Schema.Number,
  message: Schema.String,
}).pipe(C.withAuthError) {
  static readonly _tag = "MissingToken";
}

export class RateLimited extends Schema.TaggedError<RateLimited>()("RateLimited", {
  code: Schema.Number,
  message: Schema.String,
}).pipe(C.withThrottlingError, C.withRetryableError) {
  static readonly _tag = "RateLimited";
}

export class TokenExpired extends Schema.TaggedError<TokenExpired>()("TokenExpired", {
  code: Schema.Number,
  message: Schema.String,
}).pipe(C.withAuthError) {
  static readonly _tag = "TokenExpired";
}

export class TooManyRequests extends Schema.TaggedError<TooManyRequests>()("TooManyRequests", {
  code: Schema.Number,
  message: Schema.String,
}).pipe(C.withThrottlingError, C.withRetryableError, C.withQuotaError) {
  static readonly _tag = "TooManyRequests";
}

export class Unauthorized extends Schema.TaggedError<Unauthorized>()("Unauthorized", {
  code: Schema.Number,
  message: Schema.String,
}).pipe(C.withAuthError) {
  static readonly _tag = "Unauthorized";
}

export interface ListPortalsRequest {
  account_id: string;
  page?: number;
  per_page?: number;
  search?: string;
}

export const ListPortalsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/ai-controls/mcp/portals" }))
  .annotations({
    identifier: "ListPortalsRequest",
  }) as unknown as Schema.Schema<ListPortalsRequest>;

export interface ListPortalsResponse {
  result: {
    created_at?: string;
    created_by?: string;
    description?: string;
    hostname: string;
    id: string;
    modified_at?: string;
    modified_by?: string;
    name: string;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListPortalsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      created_at: Schema.optional(Schema.NullOr(Schema.Date)),
      created_by: Schema.optional(Schema.NullOr(Schema.String)),
      description: Schema.optional(Schema.NullOr(Schema.String)),
      hostname: Schema.String,
      id: Schema.String,
      modified_at: Schema.optional(Schema.NullOr(Schema.Date)),
      modified_by: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "ListPortalsResponse",
}) as unknown as Schema.Schema<ListPortalsResponse>;

export const listPortals: (
  input: ListPortalsRequest,
) => Effect.Effect<
  ListPortalsResponse,
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
  input: ListPortalsRequest,
  output: ListPortalsResponse,
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

export interface CreatePortalsRequest {
  account_id: string;
  body: {
    description?: string;
    hostname: string;
    id: string;
    name: string;
    servers?: {
      default_disabled?: boolean;
      on_behalf?: boolean;
      server_id: string;
      updated_prompts?: { description?: string; enabled?: boolean; name: string }[];
      updated_tools?: { description?: string; enabled?: boolean; name: string }[];
    }[];
  };
}

export const CreatePortalsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    description: Schema.optional(Schema.NullOr(Schema.String)),
    hostname: Schema.String,
    id: Schema.String,
    name: Schema.String,
    servers: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            default_disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
            on_behalf: Schema.optional(Schema.NullOr(Schema.Boolean)),
            server_id: Schema.String,
            updated_prompts: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    description: Schema.optional(Schema.NullOr(Schema.String)),
                    enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    name: Schema.String,
                  }),
                ),
              ),
            ),
            updated_tools: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    description: Schema.optional(Schema.NullOr(Schema.String)),
                    enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    name: Schema.String,
                  }),
                ),
              ),
            ),
          }),
        ),
      ),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/ai-controls/mcp/portals" }))
  .annotations({
    identifier: "CreatePortalsRequest",
  }) as unknown as Schema.Schema<CreatePortalsRequest>;

export interface CreatePortalsResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreatePortalsResponse = Schema.Struct({
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
  identifier: "CreatePortalsResponse",
}) as unknown as Schema.Schema<CreatePortalsResponse>;

export const createPortals: (
  input: CreatePortalsRequest,
) => Effect.Effect<
  CreatePortalsResponse,
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
  input: CreatePortalsRequest,
  output: CreatePortalsResponse,
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

export interface McpPortalsApiFetchGatewaysRequest {
  id: string;
  account_id: string;
}

export const McpPortalsApiFetchGatewaysRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/access/ai-controls/mcp/portals/{id}" }),
  )
  .annotations({
    identifier: "McpPortalsApiFetchGatewaysRequest",
  }) as unknown as Schema.Schema<McpPortalsApiFetchGatewaysRequest>;

export interface McpPortalsApiFetchGatewaysResponse {
  result: {
    created_at?: string;
    created_by?: string;
    description?: string;
    hostname: string;
    id: string;
    modified_at?: string;
    modified_by?: string;
    name: string;
    servers: {
      auth_type: "oauth" | "bearer" | "unauthenticated";
      created_at?: string;
      created_by?: string;
      default_disabled?: boolean;
      description?: string;
      error?: string;
      hostname: string;
      id: string;
      last_synced?: string;
      modified_at?: string;
      modified_by?: string;
      name: string;
      on_behalf?: boolean;
      prompts: Record<string, unknown>[];
      status?: string;
      tools: Record<string, unknown>[];
      updated_prompts: Record<string, unknown>[];
      updated_tools: Record<string, unknown>[];
    }[];
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const McpPortalsApiFetchGatewaysResponse = Schema.Struct({
  result: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    created_by: Schema.optional(Schema.NullOr(Schema.String)),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    hostname: Schema.String,
    id: Schema.String,
    modified_at: Schema.optional(Schema.NullOr(Schema.Date)),
    modified_by: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.String,
    servers: Schema.Array(
      Schema.Struct({
        auth_type: Schema.Literal("oauth", "bearer", "unauthenticated"),
        created_at: Schema.optional(Schema.NullOr(Schema.Date)),
        created_by: Schema.optional(Schema.NullOr(Schema.String)),
        default_disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
        description: Schema.optional(Schema.NullOr(Schema.String)),
        error: Schema.optional(Schema.NullOr(Schema.String)),
        hostname: Schema.String,
        id: Schema.String,
        last_synced: Schema.optional(Schema.NullOr(Schema.Date)),
        modified_at: Schema.optional(Schema.NullOr(Schema.Date)),
        modified_by: Schema.optional(Schema.NullOr(Schema.String)),
        name: Schema.String,
        on_behalf: Schema.optional(Schema.NullOr(Schema.Boolean)),
        prompts: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
        status: Schema.optional(Schema.NullOr(Schema.String)),
        tools: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
        updated_prompts: Schema.Array(
          Schema.Record({ key: Schema.String, value: Schema.Union(Schema.Number, Schema.String) }),
        ),
        updated_tools: Schema.Array(
          Schema.Record({ key: Schema.String, value: Schema.Union(Schema.Number, Schema.String) }),
        ),
      }),
    ),
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
  identifier: "McpPortalsApiFetchGatewaysResponse",
}) as unknown as Schema.Schema<McpPortalsApiFetchGatewaysResponse>;

export const mcpPortalsApiFetchGateways: (
  input: McpPortalsApiFetchGatewaysRequest,
) => Effect.Effect<
  McpPortalsApiFetchGatewaysResponse,
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
  input: McpPortalsApiFetchGatewaysRequest,
  output: McpPortalsApiFetchGatewaysResponse,
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

export interface UpdatePortalsRequest {
  id: string;
  account_id: string;
  body: {
    description?: string;
    hostname?: string;
    name?: string;
    servers?: {
      default_disabled?: boolean;
      on_behalf?: boolean;
      server_id: string;
      updated_prompts?: { description?: string; enabled?: boolean; name: string }[];
      updated_tools?: { description?: string; enabled?: boolean; name: string }[];
    }[];
  };
}

export const UpdatePortalsRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    description: Schema.optional(Schema.NullOr(Schema.String)),
    hostname: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    servers: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            default_disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
            on_behalf: Schema.optional(Schema.NullOr(Schema.Boolean)),
            server_id: Schema.String,
            updated_prompts: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    description: Schema.optional(Schema.NullOr(Schema.String)),
                    enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    name: Schema.String,
                  }),
                ),
              ),
            ),
            updated_tools: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    description: Schema.optional(Schema.NullOr(Schema.String)),
                    enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    name: Schema.String,
                  }),
                ),
              ),
            ),
          }),
        ),
      ),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({ method: "PUT", path: "/accounts/{account_id}/access/ai-controls/mcp/portals/{id}" }),
  )
  .annotations({
    identifier: "UpdatePortalsRequest",
  }) as unknown as Schema.Schema<UpdatePortalsRequest>;

export interface UpdatePortalsResponse {
  result: {
    created_at?: string;
    created_by?: string;
    description?: string;
    hostname: string;
    id: string;
    modified_at?: string;
    modified_by?: string;
    name: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdatePortalsResponse = Schema.Struct({
  result: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    created_by: Schema.optional(Schema.NullOr(Schema.String)),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    hostname: Schema.String,
    id: Schema.String,
    modified_at: Schema.optional(Schema.NullOr(Schema.Date)),
    modified_by: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.String,
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
  identifier: "UpdatePortalsResponse",
}) as unknown as Schema.Schema<UpdatePortalsResponse>;

export const updatePortals: (
  input: UpdatePortalsRequest,
) => Effect.Effect<
  UpdatePortalsResponse,
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
  input: UpdatePortalsRequest,
  output: UpdatePortalsResponse,
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

export interface DeletePortalsRequest {
  account_id: string;
  id: string;
}

export const DeletePortalsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.String.pipe(T.HttpPath("id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/access/ai-controls/mcp/portals/{id}",
    }),
  )
  .annotations({
    identifier: "DeletePortalsRequest",
  }) as unknown as Schema.Schema<DeletePortalsRequest>;

export interface DeletePortalsResponse {
  result: {
    created_at?: string;
    created_by?: string;
    description?: string;
    hostname: string;
    id: string;
    modified_at?: string;
    modified_by?: string;
    name: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeletePortalsResponse = Schema.Struct({
  result: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    created_by: Schema.optional(Schema.NullOr(Schema.String)),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    hostname: Schema.String,
    id: Schema.String,
    modified_at: Schema.optional(Schema.NullOr(Schema.Date)),
    modified_by: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.String,
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
  identifier: "DeletePortalsResponse",
}) as unknown as Schema.Schema<DeletePortalsResponse>;

export const deletePortals: (
  input: DeletePortalsRequest,
) => Effect.Effect<
  DeletePortalsResponse,
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
  input: DeletePortalsRequest,
  output: DeletePortalsResponse,
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

export interface ListServersRequest {
  account_id: string;
  page?: number;
  per_page?: number;
  search?: string;
}

export const ListServersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/ai-controls/mcp/servers" }))
  .annotations({
    identifier: "ListServersRequest",
  }) as unknown as Schema.Schema<ListServersRequest>;

export interface ListServersResponse {
  result: {
    auth_type: "oauth" | "bearer" | "unauthenticated";
    created_at?: string;
    created_by?: string;
    description?: string;
    error?: string;
    hostname: string;
    id: string;
    last_synced?: string;
    modified_at?: string;
    modified_by?: string;
    name: string;
    prompts: Record<string, unknown>[];
    status?: string;
    tools: Record<string, unknown>[];
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListServersResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      auth_type: Schema.Literal("oauth", "bearer", "unauthenticated"),
      created_at: Schema.optional(Schema.NullOr(Schema.Date)),
      created_by: Schema.optional(Schema.NullOr(Schema.String)),
      description: Schema.optional(Schema.NullOr(Schema.String)),
      error: Schema.optional(Schema.NullOr(Schema.String)),
      hostname: Schema.String,
      id: Schema.String,
      last_synced: Schema.optional(Schema.NullOr(Schema.Date)),
      modified_at: Schema.optional(Schema.NullOr(Schema.Date)),
      modified_by: Schema.optional(Schema.NullOr(Schema.String)),
      name: Schema.String,
      prompts: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
      status: Schema.optional(Schema.NullOr(Schema.String)),
      tools: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
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
  identifier: "ListServersResponse",
}) as unknown as Schema.Schema<ListServersResponse>;

export const listServers: (
  input: ListServersRequest,
) => Effect.Effect<
  ListServersResponse,
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
  input: ListServersRequest,
  output: ListServersResponse,
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

export interface CreateServersRequest {
  account_id: string;
  body: {
    auth_credentials?: string;
    auth_type: "oauth" | "bearer" | "unauthenticated";
    description?: string;
    hostname: string;
    id: string;
    name: string;
  };
}

export const CreateServersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    auth_credentials: Schema.optional(Schema.NullOr(Schema.String)),
    auth_type: Schema.Literal("oauth", "bearer", "unauthenticated"),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    hostname: Schema.String,
    id: Schema.String,
    name: Schema.String,
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/ai-controls/mcp/servers" }))
  .annotations({
    identifier: "CreateServersRequest",
  }) as unknown as Schema.Schema<CreateServersRequest>;

export interface CreateServersResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateServersResponse = Schema.Struct({
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
  identifier: "CreateServersResponse",
}) as unknown as Schema.Schema<CreateServersResponse>;

export const createServers: (
  input: CreateServersRequest,
) => Effect.Effect<
  CreateServersResponse,
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
  input: CreateServersRequest,
  output: CreateServersResponse,
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

export interface McpPortalsApiFetchServersRequest {
  account_id: string;
  id: string;
}

export const McpPortalsApiFetchServersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.String.pipe(T.HttpPath("id")),
})
  .pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/access/ai-controls/mcp/servers/{id}" }),
  )
  .annotations({
    identifier: "McpPortalsApiFetchServersRequest",
  }) as unknown as Schema.Schema<McpPortalsApiFetchServersRequest>;

export interface McpPortalsApiFetchServersResponse {
  result: {
    auth_type: "oauth" | "bearer" | "unauthenticated";
    created_at?: string;
    created_by?: string;
    description?: string;
    error?: string;
    hostname: string;
    id: string;
    last_synced?: string;
    modified_at?: string;
    modified_by?: string;
    name: string;
    prompts: Record<string, unknown>[];
    status?: string;
    tools: Record<string, unknown>[];
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const McpPortalsApiFetchServersResponse = Schema.Struct({
  result: Schema.Struct({
    auth_type: Schema.Literal("oauth", "bearer", "unauthenticated"),
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    created_by: Schema.optional(Schema.NullOr(Schema.String)),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    error: Schema.optional(Schema.NullOr(Schema.String)),
    hostname: Schema.String,
    id: Schema.String,
    last_synced: Schema.optional(Schema.NullOr(Schema.Date)),
    modified_at: Schema.optional(Schema.NullOr(Schema.Date)),
    modified_by: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.String,
    prompts: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
    status: Schema.optional(Schema.NullOr(Schema.String)),
    tools: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
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
  identifier: "McpPortalsApiFetchServersResponse",
}) as unknown as Schema.Schema<McpPortalsApiFetchServersResponse>;

export const mcpPortalsApiFetchServers: (
  input: McpPortalsApiFetchServersRequest,
) => Effect.Effect<
  McpPortalsApiFetchServersResponse,
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
  input: McpPortalsApiFetchServersRequest,
  output: McpPortalsApiFetchServersResponse,
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

export interface UpdateServersRequest {
  id: string;
  account_id: string;
  body: { auth_credentials?: string; description?: string; name?: string };
}

export const UpdateServersRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    auth_credentials: Schema.optional(Schema.NullOr(Schema.String)),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
  }).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({ method: "PUT", path: "/accounts/{account_id}/access/ai-controls/mcp/servers/{id}" }),
  )
  .annotations({
    identifier: "UpdateServersRequest",
  }) as unknown as Schema.Schema<UpdateServersRequest>;

export interface UpdateServersResponse {
  result: {
    auth_type: "oauth" | "bearer" | "unauthenticated";
    created_at?: string;
    created_by?: string;
    description?: string;
    error?: string;
    hostname: string;
    id: string;
    last_synced?: string;
    modified_at?: string;
    modified_by?: string;
    name: string;
    prompts: Record<string, unknown>[];
    status?: string;
    tools: Record<string, unknown>[];
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateServersResponse = Schema.Struct({
  result: Schema.Struct({
    auth_type: Schema.Literal("oauth", "bearer", "unauthenticated"),
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    created_by: Schema.optional(Schema.NullOr(Schema.String)),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    error: Schema.optional(Schema.NullOr(Schema.String)),
    hostname: Schema.String,
    id: Schema.String,
    last_synced: Schema.optional(Schema.NullOr(Schema.Date)),
    modified_at: Schema.optional(Schema.NullOr(Schema.Date)),
    modified_by: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.String,
    prompts: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
    status: Schema.optional(Schema.NullOr(Schema.String)),
    tools: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
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
  identifier: "UpdateServersResponse",
}) as unknown as Schema.Schema<UpdateServersResponse>;

export const updateServers: (
  input: UpdateServersRequest,
) => Effect.Effect<
  UpdateServersResponse,
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
  input: UpdateServersRequest,
  output: UpdateServersResponse,
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

export interface DeleteServersRequest {
  account_id: string;
  id: string;
}

export const DeleteServersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.String.pipe(T.HttpPath("id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/access/ai-controls/mcp/servers/{id}",
    }),
  )
  .annotations({
    identifier: "DeleteServersRequest",
  }) as unknown as Schema.Schema<DeleteServersRequest>;

export interface DeleteServersResponse {
  result: {
    auth_type: "oauth" | "bearer" | "unauthenticated";
    created_at?: string;
    created_by?: string;
    description?: string;
    error?: string;
    hostname: string;
    id: string;
    last_synced?: string;
    modified_at?: string;
    modified_by?: string;
    name: string;
    prompts: Record<string, unknown>[];
    status?: string;
    tools: Record<string, unknown>[];
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteServersResponse = Schema.Struct({
  result: Schema.Struct({
    auth_type: Schema.Literal("oauth", "bearer", "unauthenticated"),
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    created_by: Schema.optional(Schema.NullOr(Schema.String)),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    error: Schema.optional(Schema.NullOr(Schema.String)),
    hostname: Schema.String,
    id: Schema.String,
    last_synced: Schema.optional(Schema.NullOr(Schema.Date)),
    modified_at: Schema.optional(Schema.NullOr(Schema.Date)),
    modified_by: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.String,
    prompts: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
    status: Schema.optional(Schema.NullOr(Schema.String)),
    tools: Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
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
  identifier: "DeleteServersResponse",
}) as unknown as Schema.Schema<DeleteServersResponse>;

export const deleteServers: (
  input: DeleteServersRequest,
) => Effect.Effect<
  DeleteServersResponse,
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
  input: DeleteServersRequest,
  output: DeleteServersResponse,
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

export interface McpPortalsApiSyncServerRequest {
  id: string;
  account_id: string;
}

export const McpPortalsApiSyncServerRequest = Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/access/ai-controls/mcp/servers/{id}/sync",
    }),
  )
  .annotations({
    identifier: "McpPortalsApiSyncServerRequest",
  }) as unknown as Schema.Schema<McpPortalsApiSyncServerRequest>;

export interface McpPortalsApiSyncServerResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const McpPortalsApiSyncServerResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "McpPortalsApiSyncServerResponse",
}) as unknown as Schema.Schema<McpPortalsApiSyncServerResponse>;

export const mcpPortalsApiSyncServer: (
  input: McpPortalsApiSyncServerRequest,
) => Effect.Effect<
  McpPortalsApiSyncServerResponse,
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
  input: McpPortalsApiSyncServerRequest,
  output: McpPortalsApiSyncServerResponse,
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

export interface ListAccessApplicationsRequest {
  account_id: string;
  name?: string;
  domain?: string;
  aud?: string;
  target_attributes?: string;
  exact?: boolean;
  search?: string;
}

export const ListAccessApplicationsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
  aud: Schema.optional(Schema.String).pipe(T.HttpQuery("aud")),
  target_attributes: Schema.optional(Schema.String).pipe(T.HttpQuery("target_attributes")),
  exact: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("exact")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/apps" }))
  .annotations({
    identifier: "ListAccessApplicationsRequest",
  }) as unknown as Schema.Schema<ListAccessApplicationsRequest>;

export interface ListAccessApplicationsResponse {
  result: unknown[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListAccessApplicationsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Union(
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
    ),
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
  identifier: "ListAccessApplicationsResponse",
}) as unknown as Schema.Schema<ListAccessApplicationsResponse>;

export const listAccessApplications: (
  input: ListAccessApplicationsRequest,
) => Effect.Effect<
  ListAccessApplicationsResponse,
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
  input: ListAccessApplicationsRequest,
  output: ListAccessApplicationsResponse,
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

export interface AccessApplicationsAddAnApplicationRequest {
  account_id: string;
  body: unknown;
}

export const AccessApplicationsAddAnApplicationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Union(
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
  ).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/apps" }))
  .annotations({
    identifier: "AccessApplicationsAddAnApplicationRequest",
  }) as unknown as Schema.Schema<AccessApplicationsAddAnApplicationRequest>;

export interface AccessApplicationsAddAnApplicationResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessApplicationsAddAnApplicationResponse = Schema.Struct({
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
  identifier: "AccessApplicationsAddAnApplicationResponse",
}) as unknown as Schema.Schema<AccessApplicationsAddAnApplicationResponse>;

export const accessApplicationsAddAnApplication: (
  input: AccessApplicationsAddAnApplicationRequest,
) => Effect.Effect<
  AccessApplicationsAddAnApplicationResponse,
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
  input: AccessApplicationsAddAnApplicationRequest,
  output: AccessApplicationsAddAnApplicationResponse,
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

export interface ListShortLivedCertificateCAsRequest {
  account_id: string;
  per_page?: number;
}

export const ListShortLivedCertificateCAsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/apps/ca" }))
  .annotations({
    identifier: "ListShortLivedCertificateCAsRequest",
  }) as unknown as Schema.Schema<ListShortLivedCertificateCAsRequest>;

export interface ListShortLivedCertificateCAsResponse {
  result: { aud?: string; id?: string; public_key?: string }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListShortLivedCertificateCAsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      aud: Schema.optional(Schema.NullOr(Schema.String)),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      public_key: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "ListShortLivedCertificateCAsResponse",
}) as unknown as Schema.Schema<ListShortLivedCertificateCAsResponse>;

export const listShortLivedCertificateCAs: (
  input: ListShortLivedCertificateCAsRequest,
) => Effect.Effect<
  ListShortLivedCertificateCAsResponse,
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
  input: ListShortLivedCertificateCAsRequest,
  output: ListShortLivedCertificateCAsResponse,
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

export interface GetAnAccessApplicationRequest {
  app_id: unknown;
  account_id: string;
}

export const GetAnAccessApplicationRequest = Schema.Struct({
  app_id: Schema.Union(Schema.String, Schema.String).pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/apps/{app_id}" }))
  .annotations({
    identifier: "GetAnAccessApplicationRequest",
  }) as unknown as Schema.Schema<GetAnAccessApplicationRequest>;

export interface GetAnAccessApplicationResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAnAccessApplicationResponse = Schema.Struct({
  result: Schema.Union(
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
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
  identifier: "GetAnAccessApplicationResponse",
}) as unknown as Schema.Schema<GetAnAccessApplicationResponse>;

export const getAnAccessApplication: (
  input: GetAnAccessApplicationRequest,
) => Effect.Effect<
  GetAnAccessApplicationResponse,
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
  input: GetAnAccessApplicationRequest,
  output: GetAnAccessApplicationResponse,
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

export interface UpdateAnAccessApplicationRequest {
  app_id: unknown;
  account_id: string;
  body: unknown;
}

export const UpdateAnAccessApplicationRequest = Schema.Struct({
  app_id: Schema.Union(Schema.String, Schema.String).pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Union(
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
  ).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/apps/{app_id}" }))
  .annotations({
    identifier: "UpdateAnAccessApplicationRequest",
  }) as unknown as Schema.Schema<UpdateAnAccessApplicationRequest>;

export interface UpdateAnAccessApplicationResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAnAccessApplicationResponse = Schema.Struct({
  result: Schema.Union(
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
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
  identifier: "UpdateAnAccessApplicationResponse",
}) as unknown as Schema.Schema<UpdateAnAccessApplicationResponse>;

export const updateAnAccessApplication: (
  input: UpdateAnAccessApplicationRequest,
) => Effect.Effect<
  UpdateAnAccessApplicationResponse,
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
  input: UpdateAnAccessApplicationRequest,
  output: UpdateAnAccessApplicationResponse,
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

export interface DeleteAnAccessApplicationRequest {
  app_id: unknown;
  account_id: string;
}

export const DeleteAnAccessApplicationRequest = Schema.Struct({
  app_id: Schema.Union(Schema.String, Schema.String).pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/access/apps/{app_id}" }))
  .annotations({
    identifier: "DeleteAnAccessApplicationRequest",
  }) as unknown as Schema.Schema<DeleteAnAccessApplicationRequest>;

export interface DeleteAnAccessApplicationResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteAnAccessApplicationResponse = Schema.Struct({
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
  identifier: "DeleteAnAccessApplicationResponse",
}) as unknown as Schema.Schema<DeleteAnAccessApplicationResponse>;

export const deleteAnAccessApplication: (
  input: DeleteAnAccessApplicationRequest,
) => Effect.Effect<
  DeleteAnAccessApplicationResponse,
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
  input: DeleteAnAccessApplicationRequest,
  output: DeleteAnAccessApplicationResponse,
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

export interface GetAShortLivedCertificateCaRequest {
  app_id: string;
  account_id: string;
}

export const GetAShortLivedCertificateCaRequest = Schema.Struct({
  app_id: Schema.String.pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/apps/{app_id}/ca" }))
  .annotations({
    identifier: "GetAShortLivedCertificateCaRequest",
  }) as unknown as Schema.Schema<GetAShortLivedCertificateCaRequest>;

export interface GetAShortLivedCertificateCaResponse {
  result: { aud?: string; id?: string; public_key?: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAShortLivedCertificateCaResponse = Schema.Struct({
  result: Schema.Struct({
    aud: Schema.optional(Schema.NullOr(Schema.String)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    public_key: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "GetAShortLivedCertificateCaResponse",
}) as unknown as Schema.Schema<GetAShortLivedCertificateCaResponse>;

export const getAShortLivedCertificateCa: (
  input: GetAShortLivedCertificateCaRequest,
) => Effect.Effect<
  GetAShortLivedCertificateCaResponse,
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
  input: GetAShortLivedCertificateCaRequest,
  output: GetAShortLivedCertificateCaResponse,
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

export interface CreateAShortLivedCertificateCaRequest {
  app_id: string;
  account_id: string;
}

export const CreateAShortLivedCertificateCaRequest = Schema.Struct({
  app_id: Schema.String.pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/apps/{app_id}/ca" }))
  .annotations({
    identifier: "CreateAShortLivedCertificateCaRequest",
  }) as unknown as Schema.Schema<CreateAShortLivedCertificateCaRequest>;

export interface CreateAShortLivedCertificateCaResponse {
  result: { aud?: string; id?: string; public_key?: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateAShortLivedCertificateCaResponse = Schema.Struct({
  result: Schema.Struct({
    aud: Schema.optional(Schema.NullOr(Schema.String)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    public_key: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "CreateAShortLivedCertificateCaResponse",
}) as unknown as Schema.Schema<CreateAShortLivedCertificateCaResponse>;

export const createAShortLivedCertificateCa: (
  input: CreateAShortLivedCertificateCaRequest,
) => Effect.Effect<
  CreateAShortLivedCertificateCaResponse,
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
  input: CreateAShortLivedCertificateCaRequest,
  output: CreateAShortLivedCertificateCaResponse,
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

export interface DeleteAShortLivedCertificateCaRequest {
  app_id: string;
  account_id: string;
}

export const DeleteAShortLivedCertificateCaRequest = Schema.Struct({
  app_id: Schema.String.pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/access/apps/{app_id}/ca" }))
  .annotations({
    identifier: "DeleteAShortLivedCertificateCaRequest",
  }) as unknown as Schema.Schema<DeleteAShortLivedCertificateCaRequest>;

export interface DeleteAShortLivedCertificateCaResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteAShortLivedCertificateCaResponse = Schema.Struct({
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
  identifier: "DeleteAShortLivedCertificateCaResponse",
}) as unknown as Schema.Schema<DeleteAShortLivedCertificateCaResponse>;

export const deleteAShortLivedCertificateCa: (
  input: DeleteAShortLivedCertificateCaRequest,
) => Effect.Effect<
  DeleteAShortLivedCertificateCaResponse,
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
  input: DeleteAShortLivedCertificateCaRequest,
  output: DeleteAShortLivedCertificateCaResponse,
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

export interface ListAccessAppPoliciesRequest {
  app_id: string;
  account_id: string;
  per_page?: number;
}

export const ListAccessAppPoliciesRequest = Schema.Struct({
  app_id: Schema.String.pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/apps/{app_id}/policies" }))
  .annotations({
    identifier: "ListAccessAppPoliciesRequest",
  }) as unknown as Schema.Schema<ListAccessAppPoliciesRequest>;

export interface ListAccessAppPoliciesResponse {
  result: Record<string, unknown>[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListAccessAppPoliciesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
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
  identifier: "ListAccessAppPoliciesResponse",
}) as unknown as Schema.Schema<ListAccessAppPoliciesResponse>;

export const listAccessAppPolicies: (
  input: ListAccessAppPoliciesRequest,
) => Effect.Effect<
  ListAccessAppPoliciesResponse,
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
  input: ListAccessAppPoliciesRequest,
  output: ListAccessAppPoliciesResponse,
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

export interface CreateAnAccessPolicyRequest {
  app_id: string;
  account_id: string;
  body: Record<string, unknown>;
}

export const CreateAnAccessPolicyRequest = Schema.Struct({
  app_id: Schema.String.pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({}).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/apps/{app_id}/policies" }))
  .annotations({
    identifier: "CreateAnAccessPolicyRequest",
  }) as unknown as Schema.Schema<CreateAnAccessPolicyRequest>;

export interface CreateAnAccessPolicyResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateAnAccessPolicyResponse = Schema.Struct({
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
  identifier: "CreateAnAccessPolicyResponse",
}) as unknown as Schema.Schema<CreateAnAccessPolicyResponse>;

export const createAnAccessPolicy: (
  input: CreateAnAccessPolicyRequest,
) => Effect.Effect<
  CreateAnAccessPolicyResponse,
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
  input: CreateAnAccessPolicyRequest,
  output: CreateAnAccessPolicyResponse,
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

export interface GetAnAccessPolicyRequest {
  app_id: string;
  policy_id: string;
  account_id: string;
}

export const GetAnAccessPolicyRequest = Schema.Struct({
  app_id: Schema.String.pipe(T.HttpPath("app_id")),
  policy_id: Schema.String.pipe(T.HttpPath("policy_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}",
    }),
  )
  .annotations({
    identifier: "GetAnAccessPolicyRequest",
  }) as unknown as Schema.Schema<GetAnAccessPolicyRequest>;

export interface GetAnAccessPolicyResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAnAccessPolicyResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "GetAnAccessPolicyResponse",
}) as unknown as Schema.Schema<GetAnAccessPolicyResponse>;

export const getAnAccessPolicy: (
  input: GetAnAccessPolicyRequest,
) => Effect.Effect<
  GetAnAccessPolicyResponse,
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
  input: GetAnAccessPolicyRequest,
  output: GetAnAccessPolicyResponse,
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

export interface UpdateAnAccessPolicyRequest {
  app_id: string;
  policy_id: string;
  account_id: string;
  body: Record<string, unknown>;
}

export const UpdateAnAccessPolicyRequest = Schema.Struct({
  app_id: Schema.String.pipe(T.HttpPath("app_id")),
  policy_id: Schema.String.pipe(T.HttpPath("policy_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({}).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}",
    }),
  )
  .annotations({
    identifier: "UpdateAnAccessPolicyRequest",
  }) as unknown as Schema.Schema<UpdateAnAccessPolicyRequest>;

export interface UpdateAnAccessPolicyResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAnAccessPolicyResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "UpdateAnAccessPolicyResponse",
}) as unknown as Schema.Schema<UpdateAnAccessPolicyResponse>;

export const updateAnAccessPolicy: (
  input: UpdateAnAccessPolicyRequest,
) => Effect.Effect<
  UpdateAnAccessPolicyResponse,
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
  input: UpdateAnAccessPolicyRequest,
  output: UpdateAnAccessPolicyResponse,
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

export interface DeleteAnAccessPolicyRequest {
  app_id: string;
  policy_id: string;
  account_id: string;
}

export const DeleteAnAccessPolicyRequest = Schema.Struct({
  app_id: Schema.String.pipe(T.HttpPath("app_id")),
  policy_id: Schema.String.pipe(T.HttpPath("policy_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}",
    }),
  )
  .annotations({
    identifier: "DeleteAnAccessPolicyRequest",
  }) as unknown as Schema.Schema<DeleteAnAccessPolicyRequest>;

export interface DeleteAnAccessPolicyResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteAnAccessPolicyResponse = Schema.Struct({
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
  identifier: "DeleteAnAccessPolicyResponse",
}) as unknown as Schema.Schema<DeleteAnAccessPolicyResponse>;

export const deleteAnAccessPolicy: (
  input: DeleteAnAccessPolicyRequest,
) => Effect.Effect<
  DeleteAnAccessPolicyResponse,
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
  input: DeleteAnAccessPolicyRequest,
  output: DeleteAnAccessPolicyResponse,
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

export interface AccessPoliciesConvertReusableRequest {
  app_id: string;
  policy_id: string;
  account_id: string;
}

export const AccessPoliciesConvertReusableRequest = Schema.Struct({
  app_id: Schema.String.pipe(T.HttpPath("app_id")),
  policy_id: Schema.String.pipe(T.HttpPath("policy_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}/make_reusable",
    }),
  )
  .annotations({
    identifier: "AccessPoliciesConvertReusableRequest",
  }) as unknown as Schema.Schema<AccessPoliciesConvertReusableRequest>;

export interface AccessPoliciesConvertReusableResponse {
  result: Record<string, unknown>[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessPoliciesConvertReusableResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
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
  identifier: "AccessPoliciesConvertReusableResponse",
}) as unknown as Schema.Schema<AccessPoliciesConvertReusableResponse>;

export const accessPoliciesConvertReusable: (
  input: AccessPoliciesConvertReusableRequest,
) => Effect.Effect<
  AccessPoliciesConvertReusableResponse,
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
  input: AccessPoliciesConvertReusableRequest,
  output: AccessPoliciesConvertReusableResponse,
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

export interface AccessApplicationsRevokeServiceTokensRequest {
  app_id: unknown;
  account_id: string;
}

export const AccessApplicationsRevokeServiceTokensRequest = Schema.Struct({
  app_id: Schema.Union(Schema.String, Schema.String).pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({ method: "POST", path: "/accounts/{account_id}/access/apps/{app_id}/revoke_tokens" }),
  )
  .annotations({
    identifier: "AccessApplicationsRevokeServiceTokensRequest",
  }) as unknown as Schema.Schema<AccessApplicationsRevokeServiceTokensRequest>;

export interface AccessApplicationsRevokeServiceTokensResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessApplicationsRevokeServiceTokensResponse = Schema.Struct({
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
  identifier: "AccessApplicationsRevokeServiceTokensResponse",
}) as unknown as Schema.Schema<AccessApplicationsRevokeServiceTokensResponse>;

export const accessApplicationsRevokeServiceTokens: (
  input: AccessApplicationsRevokeServiceTokensRequest,
) => Effect.Effect<
  AccessApplicationsRevokeServiceTokensResponse,
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
  input: AccessApplicationsRevokeServiceTokensRequest,
  output: AccessApplicationsRevokeServiceTokensResponse,
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

export interface UpdateAccessApplicationSettingsRequest {
  app_id: unknown;
  account_id: string;
  body: { allow_iframe?: boolean; skip_interstitial?: boolean };
}

export const UpdateAccessApplicationSettingsRequest = Schema.Struct({
  app_id: Schema.Union(Schema.String, Schema.String).pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    allow_iframe: Schema.optional(Schema.NullOr(Schema.Boolean)),
    skip_interstitial: Schema.optional(Schema.NullOr(Schema.Boolean)),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/apps/{app_id}/settings" }))
  .annotations({
    identifier: "UpdateAccessApplicationSettingsRequest",
  }) as unknown as Schema.Schema<UpdateAccessApplicationSettingsRequest>;

export interface UpdateAccessApplicationSettingsResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAccessApplicationSettingsResponse = Schema.Struct({
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
  identifier: "UpdateAccessApplicationSettingsResponse",
}) as unknown as Schema.Schema<UpdateAccessApplicationSettingsResponse>;

export const updateAccessApplicationSettings: (
  input: UpdateAccessApplicationSettingsRequest,
) => Effect.Effect<
  UpdateAccessApplicationSettingsResponse,
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
  input: UpdateAccessApplicationSettingsRequest,
  output: UpdateAccessApplicationSettingsResponse,
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

export interface UpdateAccessApplicationSettings1Request {
  app_id: unknown;
  account_id: string;
  body: { allow_iframe?: boolean; skip_interstitial?: boolean };
}

export const UpdateAccessApplicationSettings1Request = Schema.Struct({
  app_id: Schema.Union(Schema.String, Schema.String).pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    allow_iframe: Schema.optional(Schema.NullOr(Schema.Boolean)),
    skip_interstitial: Schema.optional(Schema.NullOr(Schema.Boolean)),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PATCH", path: "/accounts/{account_id}/access/apps/{app_id}/settings" }))
  .annotations({
    identifier: "UpdateAccessApplicationSettings1Request",
  }) as unknown as Schema.Schema<UpdateAccessApplicationSettings1Request>;

export interface UpdateAccessApplicationSettings1Response {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAccessApplicationSettings1Response = Schema.Struct({
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
  identifier: "UpdateAccessApplicationSettings1Response",
}) as unknown as Schema.Schema<UpdateAccessApplicationSettings1Response>;

export const updateAccessApplicationSettings1: (
  input: UpdateAccessApplicationSettings1Request,
) => Effect.Effect<
  UpdateAccessApplicationSettings1Response,
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
  input: UpdateAccessApplicationSettings1Request,
  output: UpdateAccessApplicationSettings1Response,
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

export interface AccessApplicationsTestAccessPoliciesRequest {
  app_id: unknown;
  account_id: string;
}

export const AccessApplicationsTestAccessPoliciesRequest = Schema.Struct({
  app_id: Schema.Union(Schema.String, Schema.String).pipe(T.HttpPath("app_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/apps/{app_id}/user_policy_checks",
    }),
  )
  .annotations({
    identifier: "AccessApplicationsTestAccessPoliciesRequest",
  }) as unknown as Schema.Schema<AccessApplicationsTestAccessPoliciesRequest>;

export interface AccessApplicationsTestAccessPoliciesResponse {
  result: {
    app_state?: {
      app_uid?: string;
      aud?: string;
      hostname?: string;
      name?: string;
      policies?: Record<string, unknown>[];
      status?: string;
    };
    user_identity?: {
      account_id?: string;
      device_sessions?: Record<string, unknown>;
      email?: string;
      geo?: { country?: string };
      iat?: number;
      id?: string;
      is_gateway?: boolean;
      is_warp?: boolean;
      name?: string;
      user_uuid?: string;
      version?: number;
    };
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessApplicationsTestAccessPoliciesResponse = Schema.Struct({
  result: Schema.Struct({
    app_state: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          app_uid: Schema.optional(Schema.NullOr(Schema.String)),
          aud: Schema.optional(Schema.NullOr(Schema.String)),
          hostname: Schema.optional(Schema.NullOr(Schema.String)),
          name: Schema.optional(Schema.NullOr(Schema.String)),
          policies: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
          status: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    user_identity: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          account_id: Schema.optional(Schema.NullOr(Schema.String)),
          device_sessions: Schema.optional(Schema.NullOr(Schema.Struct({}))),
          email: Schema.optional(Schema.NullOr(Schema.String)),
          geo: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                country: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            ),
          ),
          iat: Schema.optional(Schema.NullOr(Schema.Number)),
          id: Schema.optional(Schema.NullOr(Schema.String)),
          is_gateway: Schema.optional(Schema.NullOr(Schema.Boolean)),
          is_warp: Schema.optional(Schema.NullOr(Schema.Boolean)),
          name: Schema.optional(Schema.NullOr(Schema.String)),
          user_uuid: Schema.optional(Schema.NullOr(Schema.String)),
          version: Schema.optional(Schema.NullOr(Schema.Number)),
        }),
      ),
    ),
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
  identifier: "AccessApplicationsTestAccessPoliciesResponse",
}) as unknown as Schema.Schema<AccessApplicationsTestAccessPoliciesResponse>;

export const accessApplicationsTestAccessPolicies: (
  input: AccessApplicationsTestAccessPoliciesRequest,
) => Effect.Effect<
  AccessApplicationsTestAccessPoliciesResponse,
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
  input: AccessApplicationsTestAccessPoliciesRequest,
  output: AccessApplicationsTestAccessPoliciesResponse,
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

export interface ListBookmarkApplicationsRequest {
  account_id: string;
}

export const ListBookmarkApplicationsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/bookmarks" }))
  .annotations({
    identifier: "ListBookmarkApplicationsRequest",
  }) as unknown as Schema.Schema<ListBookmarkApplicationsRequest>;

export interface ListBookmarkApplicationsResponse {
  result: {
    app_launcher_visible?: boolean;
    created_at?: unknown;
    domain?: string;
    id?: string;
    logo_url?: string;
    name?: string;
    updated_at?: unknown;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListBookmarkApplicationsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      app_launcher_visible: Schema.optional(Schema.NullOr(Schema.Boolean)),
      created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
      domain: Schema.optional(Schema.NullOr(Schema.String)),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      logo_url: Schema.optional(Schema.NullOr(Schema.String)),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "ListBookmarkApplicationsResponse",
}) as unknown as Schema.Schema<ListBookmarkApplicationsResponse>;

export const listBookmarkApplications: (
  input: ListBookmarkApplicationsRequest,
) => Effect.Effect<
  ListBookmarkApplicationsResponse,
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
  input: ListBookmarkApplicationsRequest,
  output: ListBookmarkApplicationsResponse,
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

export interface GetABookmarkApplicationRequest {
  bookmark_id: string;
  account_id: string;
}

export const GetABookmarkApplicationRequest = Schema.Struct({
  bookmark_id: Schema.String.pipe(T.HttpPath("bookmark_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/bookmarks/{bookmark_id}" }))
  .annotations({
    identifier: "GetABookmarkApplicationRequest",
  }) as unknown as Schema.Schema<GetABookmarkApplicationRequest>;

export interface GetABookmarkApplicationResponse {
  result: {
    app_launcher_visible?: boolean;
    created_at?: unknown;
    domain?: string;
    id?: string;
    logo_url?: string;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetABookmarkApplicationResponse = Schema.Struct({
  result: Schema.Struct({
    app_launcher_visible: Schema.optional(Schema.NullOr(Schema.Boolean)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    domain: Schema.optional(Schema.NullOr(Schema.String)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    logo_url: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "GetABookmarkApplicationResponse",
}) as unknown as Schema.Schema<GetABookmarkApplicationResponse>;

export const getABookmarkApplication: (
  input: GetABookmarkApplicationRequest,
) => Effect.Effect<
  GetABookmarkApplicationResponse,
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
  input: GetABookmarkApplicationRequest,
  output: GetABookmarkApplicationResponse,
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

export interface CreateABookmarkApplicationRequest {
  bookmark_id: string;
  account_id: string;
}

export const CreateABookmarkApplicationRequest = Schema.Struct({
  bookmark_id: Schema.String.pipe(T.HttpPath("bookmark_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/bookmarks/{bookmark_id}" }))
  .annotations({
    identifier: "CreateABookmarkApplicationRequest",
  }) as unknown as Schema.Schema<CreateABookmarkApplicationRequest>;

export interface CreateABookmarkApplicationResponse {
  result: {
    app_launcher_visible?: boolean;
    created_at?: unknown;
    domain?: string;
    id?: string;
    logo_url?: string;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateABookmarkApplicationResponse = Schema.Struct({
  result: Schema.Struct({
    app_launcher_visible: Schema.optional(Schema.NullOr(Schema.Boolean)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    domain: Schema.optional(Schema.NullOr(Schema.String)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    logo_url: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "CreateABookmarkApplicationResponse",
}) as unknown as Schema.Schema<CreateABookmarkApplicationResponse>;

export const createABookmarkApplication: (
  input: CreateABookmarkApplicationRequest,
) => Effect.Effect<
  CreateABookmarkApplicationResponse,
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
  input: CreateABookmarkApplicationRequest,
  output: CreateABookmarkApplicationResponse,
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

export interface UpdateABookmarkApplicationRequest {
  bookmark_id: string;
  account_id: string;
}

export const UpdateABookmarkApplicationRequest = Schema.Struct({
  bookmark_id: Schema.String.pipe(T.HttpPath("bookmark_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/bookmarks/{bookmark_id}" }))
  .annotations({
    identifier: "UpdateABookmarkApplicationRequest",
  }) as unknown as Schema.Schema<UpdateABookmarkApplicationRequest>;

export interface UpdateABookmarkApplicationResponse {
  result: {
    app_launcher_visible?: boolean;
    created_at?: unknown;
    domain?: string;
    id?: string;
    logo_url?: string;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateABookmarkApplicationResponse = Schema.Struct({
  result: Schema.Struct({
    app_launcher_visible: Schema.optional(Schema.NullOr(Schema.Boolean)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    domain: Schema.optional(Schema.NullOr(Schema.String)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    logo_url: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "UpdateABookmarkApplicationResponse",
}) as unknown as Schema.Schema<UpdateABookmarkApplicationResponse>;

export const updateABookmarkApplication: (
  input: UpdateABookmarkApplicationRequest,
) => Effect.Effect<
  UpdateABookmarkApplicationResponse,
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
  input: UpdateABookmarkApplicationRequest,
  output: UpdateABookmarkApplicationResponse,
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

export interface DeleteABookmarkApplicationRequest {
  bookmark_id: string;
  account_id: string;
}

export const DeleteABookmarkApplicationRequest = Schema.Struct({
  bookmark_id: Schema.String.pipe(T.HttpPath("bookmark_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/access/bookmarks/{bookmark_id}" }))
  .annotations({
    identifier: "DeleteABookmarkApplicationRequest",
  }) as unknown as Schema.Schema<DeleteABookmarkApplicationRequest>;

export interface DeleteABookmarkApplicationResponse {
  result: { id?: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteABookmarkApplicationResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "DeleteABookmarkApplicationResponse",
}) as unknown as Schema.Schema<DeleteABookmarkApplicationResponse>;

export const deleteABookmarkApplication: (
  input: DeleteABookmarkApplicationRequest,
) => Effect.Effect<
  DeleteABookmarkApplicationResponse,
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
  input: DeleteABookmarkApplicationRequest,
  output: DeleteABookmarkApplicationResponse,
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

export interface ListMtlsCertificatesRequest {
  account_id: string;
  per_page?: number;
}

export const ListMtlsCertificatesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/certificates" }))
  .annotations({
    identifier: "ListMtlsCertificatesRequest",
  }) as unknown as Schema.Schema<ListMtlsCertificatesRequest>;

export interface ListMtlsCertificatesResponse {
  result: {
    associated_hostnames?: string[];
    created_at?: unknown;
    expires_on?: string;
    fingerprint?: string;
    id?: string;
    name?: string;
    updated_at?: unknown;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListMtlsCertificatesResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      associated_hostnames: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
      expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
      fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "ListMtlsCertificatesResponse",
}) as unknown as Schema.Schema<ListMtlsCertificatesResponse>;

export const listMtlsCertificates: (
  input: ListMtlsCertificatesRequest,
) => Effect.Effect<
  ListMtlsCertificatesResponse,
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
  input: ListMtlsCertificatesRequest,
  output: ListMtlsCertificatesResponse,
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

export interface AccessMtlsAuthenticationAddAnMtlsCertificateRequest {
  account_id: string;
  body: unknown;
}

export const AccessMtlsAuthenticationAddAnMtlsCertificateRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/certificates" }))
  .annotations({
    identifier: "AccessMtlsAuthenticationAddAnMtlsCertificateRequest",
  }) as unknown as Schema.Schema<AccessMtlsAuthenticationAddAnMtlsCertificateRequest>;

export interface AccessMtlsAuthenticationAddAnMtlsCertificateResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessMtlsAuthenticationAddAnMtlsCertificateResponse = Schema.Struct({
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
  identifier: "AccessMtlsAuthenticationAddAnMtlsCertificateResponse",
}) as unknown as Schema.Schema<AccessMtlsAuthenticationAddAnMtlsCertificateResponse>;

export const accessMtlsAuthenticationAddAnMtlsCertificate: (
  input: AccessMtlsAuthenticationAddAnMtlsCertificateRequest,
) => Effect.Effect<
  AccessMtlsAuthenticationAddAnMtlsCertificateResponse,
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
  input: AccessMtlsAuthenticationAddAnMtlsCertificateRequest,
  output: AccessMtlsAuthenticationAddAnMtlsCertificateResponse,
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

export interface ListMtlsCertificatesHostnameSettingsRequest {
  account_id: string;
}

export const ListMtlsCertificatesHostnameSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/certificates/settings" }))
  .annotations({
    identifier: "ListMtlsCertificatesHostnameSettingsRequest",
  }) as unknown as Schema.Schema<ListMtlsCertificatesHostnameSettingsRequest>;

export interface ListMtlsCertificatesHostnameSettingsResponse {
  result: { china_network: boolean; client_certificate_forwarding: boolean; hostname: string }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListMtlsCertificatesHostnameSettingsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      china_network: Schema.Boolean,
      client_certificate_forwarding: Schema.Boolean,
      hostname: Schema.String,
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
  identifier: "ListMtlsCertificatesHostnameSettingsResponse",
}) as unknown as Schema.Schema<ListMtlsCertificatesHostnameSettingsResponse>;

export const listMtlsCertificatesHostnameSettings: (
  input: ListMtlsCertificatesHostnameSettingsRequest,
) => Effect.Effect<
  ListMtlsCertificatesHostnameSettingsResponse,
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
  input: ListMtlsCertificatesHostnameSettingsRequest,
  output: ListMtlsCertificatesHostnameSettingsResponse,
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

export interface UpdateAnMtlsCertificateSettingsRequest {
  account_id: string;
  body: {
    settings: {
      china_network: boolean;
      client_certificate_forwarding: boolean;
      hostname: string;
    }[];
  };
}

export const UpdateAnMtlsCertificateSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    settings: Schema.Array(
      Schema.Struct({
        china_network: Schema.Boolean,
        client_certificate_forwarding: Schema.Boolean,
        hostname: Schema.String,
      }),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/certificates/settings" }))
  .annotations({
    identifier: "UpdateAnMtlsCertificateSettingsRequest",
  }) as unknown as Schema.Schema<UpdateAnMtlsCertificateSettingsRequest>;

export interface UpdateAnMtlsCertificateSettingsResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAnMtlsCertificateSettingsResponse = Schema.Struct({
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
  identifier: "UpdateAnMtlsCertificateSettingsResponse",
}) as unknown as Schema.Schema<UpdateAnMtlsCertificateSettingsResponse>;

export const updateAnMtlsCertificateSettings: (
  input: UpdateAnMtlsCertificateSettingsRequest,
) => Effect.Effect<
  UpdateAnMtlsCertificateSettingsResponse,
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
  input: UpdateAnMtlsCertificateSettingsRequest,
  output: UpdateAnMtlsCertificateSettingsResponse,
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

export interface GetAnMtlsCertificateRequest {
  certificate_id: string;
  account_id: string;
}

export const GetAnMtlsCertificateRequest = Schema.Struct({
  certificate_id: Schema.String.pipe(T.HttpPath("certificate_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/access/certificates/{certificate_id}" }),
  )
  .annotations({
    identifier: "GetAnMtlsCertificateRequest",
  }) as unknown as Schema.Schema<GetAnMtlsCertificateRequest>;

export interface GetAnMtlsCertificateResponse {
  result: {
    associated_hostnames?: string[];
    created_at?: unknown;
    expires_on?: string;
    fingerprint?: string;
    id?: string;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAnMtlsCertificateResponse = Schema.Struct({
  result: Schema.Struct({
    associated_hostnames: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
    fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "GetAnMtlsCertificateResponse",
}) as unknown as Schema.Schema<GetAnMtlsCertificateResponse>;

export const getAnMtlsCertificate: (
  input: GetAnMtlsCertificateRequest,
) => Effect.Effect<
  GetAnMtlsCertificateResponse,
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
  input: GetAnMtlsCertificateRequest,
  output: GetAnMtlsCertificateResponse,
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

export interface UpdateAnMtlsCertificateRequest {
  certificate_id: string;
  account_id: string;
  body: unknown;
}

export const UpdateAnMtlsCertificateRequest = Schema.Struct({
  certificate_id: Schema.String.pipe(T.HttpPath("certificate_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(
    T.Http({ method: "PUT", path: "/accounts/{account_id}/access/certificates/{certificate_id}" }),
  )
  .annotations({
    identifier: "UpdateAnMtlsCertificateRequest",
  }) as unknown as Schema.Schema<UpdateAnMtlsCertificateRequest>;

export interface UpdateAnMtlsCertificateResponse {
  result: {
    associated_hostnames?: string[];
    created_at?: unknown;
    expires_on?: string;
    fingerprint?: string;
    id?: string;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAnMtlsCertificateResponse = Schema.Struct({
  result: Schema.Struct({
    associated_hostnames: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
    fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "UpdateAnMtlsCertificateResponse",
}) as unknown as Schema.Schema<UpdateAnMtlsCertificateResponse>;

export const updateAnMtlsCertificate: (
  input: UpdateAnMtlsCertificateRequest,
) => Effect.Effect<
  UpdateAnMtlsCertificateResponse,
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
  input: UpdateAnMtlsCertificateRequest,
  output: UpdateAnMtlsCertificateResponse,
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

export interface DeleteAnMtlsCertificateRequest {
  certificate_id: string;
  account_id: string;
}

export const DeleteAnMtlsCertificateRequest = Schema.Struct({
  certificate_id: Schema.String.pipe(T.HttpPath("certificate_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/access/certificates/{certificate_id}",
    }),
  )
  .annotations({
    identifier: "DeleteAnMtlsCertificateRequest",
  }) as unknown as Schema.Schema<DeleteAnMtlsCertificateRequest>;

export interface DeleteAnMtlsCertificateResponse {
  result: { id?: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteAnMtlsCertificateResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "DeleteAnMtlsCertificateResponse",
}) as unknown as Schema.Schema<DeleteAnMtlsCertificateResponse>;

export const deleteAnMtlsCertificate: (
  input: DeleteAnMtlsCertificateRequest,
) => Effect.Effect<
  DeleteAnMtlsCertificateResponse,
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
  input: DeleteAnMtlsCertificateRequest,
  output: DeleteAnMtlsCertificateResponse,
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

export interface ListCustomPagesRequest {
  account_id: string;
  per_page?: number;
}

export const ListCustomPagesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/custom_pages" }))
  .annotations({
    identifier: "ListCustomPagesRequest",
  }) as unknown as Schema.Schema<ListCustomPagesRequest>;

export interface ListCustomPagesResponse {
  result: {
    app_count?: number;
    created_at?: unknown;
    name: string;
    type: "identity_denied" | "forbidden";
    uid?: string;
    updated_at?: unknown;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListCustomPagesResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      app_count: Schema.optional(Schema.NullOr(Schema.Number)),
      created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
      name: Schema.String,
      type: Schema.Literal("identity_denied", "forbidden"),
      uid: Schema.optional(Schema.NullOr(Schema.String)),
      updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "ListCustomPagesResponse",
}) as unknown as Schema.Schema<ListCustomPagesResponse>;

export const listCustomPages: (
  input: ListCustomPagesRequest,
) => Effect.Effect<
  ListCustomPagesResponse,
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
  input: ListCustomPagesRequest,
  output: ListCustomPagesResponse,
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

export interface CreateACustomPageRequest {
  account_id: string;
  body: {
    app_count?: number;
    created_at?: unknown;
    custom_html: string;
    name: string;
    type: "identity_denied" | "forbidden";
    uid?: string;
    updated_at?: unknown;
  };
}

export const CreateACustomPageRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    app_count: Schema.optional(Schema.NullOr(Schema.Number)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    custom_html: Schema.String,
    name: Schema.String,
    type: Schema.Literal("identity_denied", "forbidden"),
    uid: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/custom_pages" }))
  .annotations({
    identifier: "CreateACustomPageRequest",
  }) as unknown as Schema.Schema<CreateACustomPageRequest>;

export interface CreateACustomPageResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateACustomPageResponse = Schema.Struct({
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
  identifier: "CreateACustomPageResponse",
}) as unknown as Schema.Schema<CreateACustomPageResponse>;

export const createACustomPage: (
  input: CreateACustomPageRequest,
) => Effect.Effect<
  CreateACustomPageResponse,
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
  input: CreateACustomPageRequest,
  output: CreateACustomPageResponse,
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

export interface GetACustomPageRequest {
  custom_page_id: string;
  account_id: string;
}

export const GetACustomPageRequest = Schema.Struct({
  custom_page_id: Schema.String.pipe(T.HttpPath("custom_page_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/access/custom_pages/{custom_page_id}" }),
  )
  .annotations({
    identifier: "GetACustomPageRequest",
  }) as unknown as Schema.Schema<GetACustomPageRequest>;

export interface GetACustomPageResponse {
  result: {
    app_count?: number;
    created_at?: unknown;
    custom_html: string;
    name: string;
    type: "identity_denied" | "forbidden";
    uid?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetACustomPageResponse = Schema.Struct({
  result: Schema.Struct({
    app_count: Schema.optional(Schema.NullOr(Schema.Number)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    custom_html: Schema.String,
    name: Schema.String,
    type: Schema.Literal("identity_denied", "forbidden"),
    uid: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "GetACustomPageResponse",
}) as unknown as Schema.Schema<GetACustomPageResponse>;

export const getACustomPage: (
  input: GetACustomPageRequest,
) => Effect.Effect<
  GetACustomPageResponse,
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
  input: GetACustomPageRequest,
  output: GetACustomPageResponse,
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

export interface UpdateACustomPageRequest {
  custom_page_id: string;
  account_id: string;
  body: {
    app_count?: number;
    created_at?: unknown;
    custom_html: string;
    name: string;
    type: "identity_denied" | "forbidden";
    uid?: string;
    updated_at?: unknown;
  };
}

export const UpdateACustomPageRequest = Schema.Struct({
  custom_page_id: Schema.String.pipe(T.HttpPath("custom_page_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    app_count: Schema.optional(Schema.NullOr(Schema.Number)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    custom_html: Schema.String,
    name: Schema.String,
    type: Schema.Literal("identity_denied", "forbidden"),
    uid: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
  }).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({ method: "PUT", path: "/accounts/{account_id}/access/custom_pages/{custom_page_id}" }),
  )
  .annotations({
    identifier: "UpdateACustomPageRequest",
  }) as unknown as Schema.Schema<UpdateACustomPageRequest>;

export interface UpdateACustomPageResponse {
  result: {
    app_count?: number;
    created_at?: unknown;
    name: string;
    type: "identity_denied" | "forbidden";
    uid?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateACustomPageResponse = Schema.Struct({
  result: Schema.Struct({
    app_count: Schema.optional(Schema.NullOr(Schema.Number)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    name: Schema.String,
    type: Schema.Literal("identity_denied", "forbidden"),
    uid: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "UpdateACustomPageResponse",
}) as unknown as Schema.Schema<UpdateACustomPageResponse>;

export const updateACustomPage: (
  input: UpdateACustomPageRequest,
) => Effect.Effect<
  UpdateACustomPageResponse,
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
  input: UpdateACustomPageRequest,
  output: UpdateACustomPageResponse,
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

export interface DeleteACustomPageRequest {
  custom_page_id: string;
  account_id: string;
}

export const DeleteACustomPageRequest = Schema.Struct({
  custom_page_id: Schema.String.pipe(T.HttpPath("custom_page_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/access/custom_pages/{custom_page_id}",
    }),
  )
  .annotations({
    identifier: "DeleteACustomPageRequest",
  }) as unknown as Schema.Schema<DeleteACustomPageRequest>;

export interface DeleteACustomPageResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteACustomPageResponse = Schema.Struct({
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
  identifier: "DeleteACustomPageResponse",
}) as unknown as Schema.Schema<DeleteACustomPageResponse>;

export const deleteACustomPage: (
  input: DeleteACustomPageRequest,
) => Effect.Effect<
  DeleteACustomPageResponse,
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
  input: DeleteACustomPageRequest,
  output: DeleteACustomPageResponse,
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

export interface ListSshCaRequest {
  account_id: string;
}

export const ListSshCaRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/gateway_ca" }))
  .annotations({ identifier: "ListSshCaRequest" }) as unknown as Schema.Schema<ListSshCaRequest>;

export interface ListSshCaResponse {
  result: { id?: string; public_key?: string }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListSshCaResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.NullOr(Schema.String)),
      public_key: Schema.optional(Schema.NullOr(Schema.String)),
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
}).annotations({ identifier: "ListSshCaResponse" }) as unknown as Schema.Schema<ListSshCaResponse>;

export const listSshCa: (
  input: ListSshCaRequest,
) => Effect.Effect<
  ListSshCaResponse,
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
  input: ListSshCaRequest,
  output: ListSshCaResponse,
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

export interface AccessGatewayCaAddAnSshCaRequest {
  account_id: string;
}

export const AccessGatewayCaAddAnSshCaRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/gateway_ca" }))
  .annotations({
    identifier: "AccessGatewayCaAddAnSshCaRequest",
  }) as unknown as Schema.Schema<AccessGatewayCaAddAnSshCaRequest>;

export interface AccessGatewayCaAddAnSshCaResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessGatewayCaAddAnSshCaResponse = Schema.Struct({
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
  identifier: "AccessGatewayCaAddAnSshCaResponse",
}) as unknown as Schema.Schema<AccessGatewayCaAddAnSshCaResponse>;

export const accessGatewayCaAddAnSshCa: (
  input: AccessGatewayCaAddAnSshCaRequest,
) => Effect.Effect<
  AccessGatewayCaAddAnSshCaResponse,
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
  input: AccessGatewayCaAddAnSshCaRequest,
  output: AccessGatewayCaAddAnSshCaResponse,
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

export interface DeleteAnSshCaRequest {
  certificate_id: string;
  account_id: string;
}

export const DeleteAnSshCaRequest = Schema.Struct({
  certificate_id: Schema.String.pipe(T.HttpPath("certificate_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({ method: "DELETE", path: "/accounts/{account_id}/access/gateway_ca/{certificate_id}" }),
  )
  .annotations({
    identifier: "DeleteAnSshCaRequest",
  }) as unknown as Schema.Schema<DeleteAnSshCaRequest>;

export interface DeleteAnSshCaResponse {
  result: { id?: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteAnSshCaResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "DeleteAnSshCaResponse",
}) as unknown as Schema.Schema<DeleteAnSshCaResponse>;

export const deleteAnSshCa: (
  input: DeleteAnSshCaRequest,
) => Effect.Effect<
  DeleteAnSshCaResponse,
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
  input: DeleteAnSshCaRequest,
  output: DeleteAnSshCaResponse,
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

export interface ListAccessGroupsRequest {
  account_id: string;
  name?: string;
  search?: string;
}

export const ListAccessGroupsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/groups" }))
  .annotations({
    identifier: "ListAccessGroupsRequest",
  }) as unknown as Schema.Schema<ListAccessGroupsRequest>;

export interface ListAccessGroupsResponse {
  result: {
    created_at?: unknown;
    exclude?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    id?: string;
    include?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    is_default?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    name?: string;
    require?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    updated_at?: unknown;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListAccessGroupsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
      exclude: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Union(
              Schema.Struct({
                group: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                any_valid_service_token: Schema.Struct({}),
              }),
              Schema.Struct({
                auth_context: Schema.Struct({
                  ac_id: Schema.String,
                  id: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                auth_method: Schema.Struct({
                  auth_method: Schema.String,
                }),
              }),
              Schema.Struct({
                azureAD: Schema.Struct({
                  id: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                certificate: Schema.Struct({}),
              }),
              Schema.Struct({
                common_name: Schema.Struct({
                  common_name: Schema.String,
                }),
              }),
              Schema.Struct({
                geo: Schema.Struct({
                  country_code: Schema.String,
                }),
              }),
              Schema.Struct({
                device_posture: Schema.Struct({
                  integration_uid: Schema.String,
                }),
              }),
              Schema.Struct({
                email_domain: Schema.Struct({
                  domain: Schema.String,
                }),
              }),
              Schema.Struct({
                email_list: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                email: Schema.Struct({
                  email: Schema.String,
                }),
              }),
              Schema.Struct({
                everyone: Schema.Struct({}),
              }),
              Schema.Struct({
                external_evaluation: Schema.Struct({
                  evaluate_url: Schema.String,
                  keys_url: Schema.String,
                }),
              }),
              Schema.Struct({
                "github-organization": Schema.Struct({
                  identity_provider_id: Schema.String,
                  name: Schema.String,
                  team: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              }),
              Schema.Struct({
                gsuite: Schema.Struct({
                  email: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                login_method: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                ip_list: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                ip: Schema.Struct({
                  ip: Schema.String,
                }),
              }),
              Schema.Struct({
                okta: Schema.Struct({
                  identity_provider_id: Schema.String,
                  name: Schema.String,
                }),
              }),
              Schema.Struct({
                saml: Schema.Struct({
                  attribute_name: Schema.String,
                  attribute_value: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                oidc: Schema.Struct({
                  claim_name: Schema.String,
                  claim_value: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                service_token: Schema.Struct({
                  token_id: Schema.String,
                }),
              }),
              Schema.Struct({
                linked_app_token: Schema.Struct({
                  app_uid: Schema.String,
                }),
              }),
            ),
          ),
        ),
      ),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      include: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Union(
              Schema.Struct({
                group: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                any_valid_service_token: Schema.Struct({}),
              }),
              Schema.Struct({
                auth_context: Schema.Struct({
                  ac_id: Schema.String,
                  id: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                auth_method: Schema.Struct({
                  auth_method: Schema.String,
                }),
              }),
              Schema.Struct({
                azureAD: Schema.Struct({
                  id: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                certificate: Schema.Struct({}),
              }),
              Schema.Struct({
                common_name: Schema.Struct({
                  common_name: Schema.String,
                }),
              }),
              Schema.Struct({
                geo: Schema.Struct({
                  country_code: Schema.String,
                }),
              }),
              Schema.Struct({
                device_posture: Schema.Struct({
                  integration_uid: Schema.String,
                }),
              }),
              Schema.Struct({
                email_domain: Schema.Struct({
                  domain: Schema.String,
                }),
              }),
              Schema.Struct({
                email_list: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                email: Schema.Struct({
                  email: Schema.String,
                }),
              }),
              Schema.Struct({
                everyone: Schema.Struct({}),
              }),
              Schema.Struct({
                external_evaluation: Schema.Struct({
                  evaluate_url: Schema.String,
                  keys_url: Schema.String,
                }),
              }),
              Schema.Struct({
                "github-organization": Schema.Struct({
                  identity_provider_id: Schema.String,
                  name: Schema.String,
                  team: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              }),
              Schema.Struct({
                gsuite: Schema.Struct({
                  email: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                login_method: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                ip_list: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                ip: Schema.Struct({
                  ip: Schema.String,
                }),
              }),
              Schema.Struct({
                okta: Schema.Struct({
                  identity_provider_id: Schema.String,
                  name: Schema.String,
                }),
              }),
              Schema.Struct({
                saml: Schema.Struct({
                  attribute_name: Schema.String,
                  attribute_value: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                oidc: Schema.Struct({
                  claim_name: Schema.String,
                  claim_value: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                service_token: Schema.Struct({
                  token_id: Schema.String,
                }),
              }),
              Schema.Struct({
                linked_app_token: Schema.Struct({
                  app_uid: Schema.String,
                }),
              }),
            ),
          ),
        ),
      ),
      is_default: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Union(
              Schema.Struct({
                group: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                any_valid_service_token: Schema.Struct({}),
              }),
              Schema.Struct({
                auth_context: Schema.Struct({
                  ac_id: Schema.String,
                  id: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                auth_method: Schema.Struct({
                  auth_method: Schema.String,
                }),
              }),
              Schema.Struct({
                azureAD: Schema.Struct({
                  id: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                certificate: Schema.Struct({}),
              }),
              Schema.Struct({
                common_name: Schema.Struct({
                  common_name: Schema.String,
                }),
              }),
              Schema.Struct({
                geo: Schema.Struct({
                  country_code: Schema.String,
                }),
              }),
              Schema.Struct({
                device_posture: Schema.Struct({
                  integration_uid: Schema.String,
                }),
              }),
              Schema.Struct({
                email_domain: Schema.Struct({
                  domain: Schema.String,
                }),
              }),
              Schema.Struct({
                email_list: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                email: Schema.Struct({
                  email: Schema.String,
                }),
              }),
              Schema.Struct({
                everyone: Schema.Struct({}),
              }),
              Schema.Struct({
                external_evaluation: Schema.Struct({
                  evaluate_url: Schema.String,
                  keys_url: Schema.String,
                }),
              }),
              Schema.Struct({
                "github-organization": Schema.Struct({
                  identity_provider_id: Schema.String,
                  name: Schema.String,
                  team: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              }),
              Schema.Struct({
                gsuite: Schema.Struct({
                  email: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                login_method: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                ip_list: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                ip: Schema.Struct({
                  ip: Schema.String,
                }),
              }),
              Schema.Struct({
                okta: Schema.Struct({
                  identity_provider_id: Schema.String,
                  name: Schema.String,
                }),
              }),
              Schema.Struct({
                saml: Schema.Struct({
                  attribute_name: Schema.String,
                  attribute_value: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                oidc: Schema.Struct({
                  claim_name: Schema.String,
                  claim_value: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                service_token: Schema.Struct({
                  token_id: Schema.String,
                }),
              }),
              Schema.Struct({
                linked_app_token: Schema.Struct({
                  app_uid: Schema.String,
                }),
              }),
            ),
          ),
        ),
      ),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      require: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Union(
              Schema.Struct({
                group: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                any_valid_service_token: Schema.Struct({}),
              }),
              Schema.Struct({
                auth_context: Schema.Struct({
                  ac_id: Schema.String,
                  id: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                auth_method: Schema.Struct({
                  auth_method: Schema.String,
                }),
              }),
              Schema.Struct({
                azureAD: Schema.Struct({
                  id: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                certificate: Schema.Struct({}),
              }),
              Schema.Struct({
                common_name: Schema.Struct({
                  common_name: Schema.String,
                }),
              }),
              Schema.Struct({
                geo: Schema.Struct({
                  country_code: Schema.String,
                }),
              }),
              Schema.Struct({
                device_posture: Schema.Struct({
                  integration_uid: Schema.String,
                }),
              }),
              Schema.Struct({
                email_domain: Schema.Struct({
                  domain: Schema.String,
                }),
              }),
              Schema.Struct({
                email_list: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                email: Schema.Struct({
                  email: Schema.String,
                }),
              }),
              Schema.Struct({
                everyone: Schema.Struct({}),
              }),
              Schema.Struct({
                external_evaluation: Schema.Struct({
                  evaluate_url: Schema.String,
                  keys_url: Schema.String,
                }),
              }),
              Schema.Struct({
                "github-organization": Schema.Struct({
                  identity_provider_id: Schema.String,
                  name: Schema.String,
                  team: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              }),
              Schema.Struct({
                gsuite: Schema.Struct({
                  email: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                login_method: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                ip_list: Schema.Struct({
                  id: Schema.String,
                }),
              }),
              Schema.Struct({
                ip: Schema.Struct({
                  ip: Schema.String,
                }),
              }),
              Schema.Struct({
                okta: Schema.Struct({
                  identity_provider_id: Schema.String,
                  name: Schema.String,
                }),
              }),
              Schema.Struct({
                saml: Schema.Struct({
                  attribute_name: Schema.String,
                  attribute_value: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                oidc: Schema.Struct({
                  claim_name: Schema.String,
                  claim_value: Schema.String,
                  identity_provider_id: Schema.String,
                }),
              }),
              Schema.Struct({
                service_token: Schema.Struct({
                  token_id: Schema.String,
                }),
              }),
              Schema.Struct({
                linked_app_token: Schema.Struct({
                  app_uid: Schema.String,
                }),
              }),
            ),
          ),
        ),
      ),
      updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "ListAccessGroupsResponse",
}) as unknown as Schema.Schema<ListAccessGroupsResponse>;

export const listAccessGroups: (
  input: ListAccessGroupsRequest,
) => Effect.Effect<
  ListAccessGroupsResponse,
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
  input: ListAccessGroupsRequest,
  output: ListAccessGroupsResponse,
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

export interface CreateAnAccessGroupRequest {
  account_id: string;
  body: unknown;
}

export const CreateAnAccessGroupRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/groups" }))
  .annotations({
    identifier: "CreateAnAccessGroupRequest",
  }) as unknown as Schema.Schema<CreateAnAccessGroupRequest>;

export interface CreateAnAccessGroupResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateAnAccessGroupResponse = Schema.Struct({
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
  identifier: "CreateAnAccessGroupResponse",
}) as unknown as Schema.Schema<CreateAnAccessGroupResponse>;

export const createAnAccessGroup: (
  input: CreateAnAccessGroupRequest,
) => Effect.Effect<
  CreateAnAccessGroupResponse,
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
  input: CreateAnAccessGroupRequest,
  output: CreateAnAccessGroupResponse,
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

export interface GetAnAccessGroupRequest {
  group_id: string;
  account_id: string;
}

export const GetAnAccessGroupRequest = Schema.Struct({
  group_id: Schema.String.pipe(T.HttpPath("group_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/groups/{group_id}" }))
  .annotations({
    identifier: "GetAnAccessGroupRequest",
  }) as unknown as Schema.Schema<GetAnAccessGroupRequest>;

export interface GetAnAccessGroupResponse {
  result: {
    created_at?: unknown;
    exclude?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    id?: string;
    include?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    is_default?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    name?: string;
    require?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAnAccessGroupResponse = Schema.Struct({
  result: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    exclude: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Union(
            Schema.Struct({
              group: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              any_valid_service_token: Schema.Struct({}),
            }),
            Schema.Struct({
              auth_context: Schema.Struct({
                ac_id: Schema.String,
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              auth_method: Schema.Struct({
                auth_method: Schema.String,
              }),
            }),
            Schema.Struct({
              azureAD: Schema.Struct({
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              certificate: Schema.Struct({}),
            }),
            Schema.Struct({
              common_name: Schema.Struct({
                common_name: Schema.String,
              }),
            }),
            Schema.Struct({
              geo: Schema.Struct({
                country_code: Schema.String,
              }),
            }),
            Schema.Struct({
              device_posture: Schema.Struct({
                integration_uid: Schema.String,
              }),
            }),
            Schema.Struct({
              email_domain: Schema.Struct({
                domain: Schema.String,
              }),
            }),
            Schema.Struct({
              email_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              email: Schema.Struct({
                email: Schema.String,
              }),
            }),
            Schema.Struct({
              everyone: Schema.Struct({}),
            }),
            Schema.Struct({
              external_evaluation: Schema.Struct({
                evaluate_url: Schema.String,
                keys_url: Schema.String,
              }),
            }),
            Schema.Struct({
              "github-organization": Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
                team: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            }),
            Schema.Struct({
              gsuite: Schema.Struct({
                email: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              login_method: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip: Schema.Struct({
                ip: Schema.String,
              }),
            }),
            Schema.Struct({
              okta: Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
              }),
            }),
            Schema.Struct({
              saml: Schema.Struct({
                attribute_name: Schema.String,
                attribute_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              oidc: Schema.Struct({
                claim_name: Schema.String,
                claim_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              service_token: Schema.Struct({
                token_id: Schema.String,
              }),
            }),
            Schema.Struct({
              linked_app_token: Schema.Struct({
                app_uid: Schema.String,
              }),
            }),
          ),
        ),
      ),
    ),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    include: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Union(
            Schema.Struct({
              group: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              any_valid_service_token: Schema.Struct({}),
            }),
            Schema.Struct({
              auth_context: Schema.Struct({
                ac_id: Schema.String,
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              auth_method: Schema.Struct({
                auth_method: Schema.String,
              }),
            }),
            Schema.Struct({
              azureAD: Schema.Struct({
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              certificate: Schema.Struct({}),
            }),
            Schema.Struct({
              common_name: Schema.Struct({
                common_name: Schema.String,
              }),
            }),
            Schema.Struct({
              geo: Schema.Struct({
                country_code: Schema.String,
              }),
            }),
            Schema.Struct({
              device_posture: Schema.Struct({
                integration_uid: Schema.String,
              }),
            }),
            Schema.Struct({
              email_domain: Schema.Struct({
                domain: Schema.String,
              }),
            }),
            Schema.Struct({
              email_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              email: Schema.Struct({
                email: Schema.String,
              }),
            }),
            Schema.Struct({
              everyone: Schema.Struct({}),
            }),
            Schema.Struct({
              external_evaluation: Schema.Struct({
                evaluate_url: Schema.String,
                keys_url: Schema.String,
              }),
            }),
            Schema.Struct({
              "github-organization": Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
                team: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            }),
            Schema.Struct({
              gsuite: Schema.Struct({
                email: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              login_method: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip: Schema.Struct({
                ip: Schema.String,
              }),
            }),
            Schema.Struct({
              okta: Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
              }),
            }),
            Schema.Struct({
              saml: Schema.Struct({
                attribute_name: Schema.String,
                attribute_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              oidc: Schema.Struct({
                claim_name: Schema.String,
                claim_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              service_token: Schema.Struct({
                token_id: Schema.String,
              }),
            }),
            Schema.Struct({
              linked_app_token: Schema.Struct({
                app_uid: Schema.String,
              }),
            }),
          ),
        ),
      ),
    ),
    is_default: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Union(
            Schema.Struct({
              group: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              any_valid_service_token: Schema.Struct({}),
            }),
            Schema.Struct({
              auth_context: Schema.Struct({
                ac_id: Schema.String,
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              auth_method: Schema.Struct({
                auth_method: Schema.String,
              }),
            }),
            Schema.Struct({
              azureAD: Schema.Struct({
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              certificate: Schema.Struct({}),
            }),
            Schema.Struct({
              common_name: Schema.Struct({
                common_name: Schema.String,
              }),
            }),
            Schema.Struct({
              geo: Schema.Struct({
                country_code: Schema.String,
              }),
            }),
            Schema.Struct({
              device_posture: Schema.Struct({
                integration_uid: Schema.String,
              }),
            }),
            Schema.Struct({
              email_domain: Schema.Struct({
                domain: Schema.String,
              }),
            }),
            Schema.Struct({
              email_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              email: Schema.Struct({
                email: Schema.String,
              }),
            }),
            Schema.Struct({
              everyone: Schema.Struct({}),
            }),
            Schema.Struct({
              external_evaluation: Schema.Struct({
                evaluate_url: Schema.String,
                keys_url: Schema.String,
              }),
            }),
            Schema.Struct({
              "github-organization": Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
                team: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            }),
            Schema.Struct({
              gsuite: Schema.Struct({
                email: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              login_method: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip: Schema.Struct({
                ip: Schema.String,
              }),
            }),
            Schema.Struct({
              okta: Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
              }),
            }),
            Schema.Struct({
              saml: Schema.Struct({
                attribute_name: Schema.String,
                attribute_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              oidc: Schema.Struct({
                claim_name: Schema.String,
                claim_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              service_token: Schema.Struct({
                token_id: Schema.String,
              }),
            }),
            Schema.Struct({
              linked_app_token: Schema.Struct({
                app_uid: Schema.String,
              }),
            }),
          ),
        ),
      ),
    ),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    require: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Union(
            Schema.Struct({
              group: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              any_valid_service_token: Schema.Struct({}),
            }),
            Schema.Struct({
              auth_context: Schema.Struct({
                ac_id: Schema.String,
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              auth_method: Schema.Struct({
                auth_method: Schema.String,
              }),
            }),
            Schema.Struct({
              azureAD: Schema.Struct({
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              certificate: Schema.Struct({}),
            }),
            Schema.Struct({
              common_name: Schema.Struct({
                common_name: Schema.String,
              }),
            }),
            Schema.Struct({
              geo: Schema.Struct({
                country_code: Schema.String,
              }),
            }),
            Schema.Struct({
              device_posture: Schema.Struct({
                integration_uid: Schema.String,
              }),
            }),
            Schema.Struct({
              email_domain: Schema.Struct({
                domain: Schema.String,
              }),
            }),
            Schema.Struct({
              email_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              email: Schema.Struct({
                email: Schema.String,
              }),
            }),
            Schema.Struct({
              everyone: Schema.Struct({}),
            }),
            Schema.Struct({
              external_evaluation: Schema.Struct({
                evaluate_url: Schema.String,
                keys_url: Schema.String,
              }),
            }),
            Schema.Struct({
              "github-organization": Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
                team: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            }),
            Schema.Struct({
              gsuite: Schema.Struct({
                email: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              login_method: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip: Schema.Struct({
                ip: Schema.String,
              }),
            }),
            Schema.Struct({
              okta: Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
              }),
            }),
            Schema.Struct({
              saml: Schema.Struct({
                attribute_name: Schema.String,
                attribute_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              oidc: Schema.Struct({
                claim_name: Schema.String,
                claim_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              service_token: Schema.Struct({
                token_id: Schema.String,
              }),
            }),
            Schema.Struct({
              linked_app_token: Schema.Struct({
                app_uid: Schema.String,
              }),
            }),
          ),
        ),
      ),
    ),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "GetAnAccessGroupResponse",
}) as unknown as Schema.Schema<GetAnAccessGroupResponse>;

export const getAnAccessGroup: (
  input: GetAnAccessGroupRequest,
) => Effect.Effect<
  GetAnAccessGroupResponse,
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
  input: GetAnAccessGroupRequest,
  output: GetAnAccessGroupResponse,
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

export interface UpdateAnAccessGroupRequest {
  group_id: string;
  account_id: string;
  body: unknown;
}

export const UpdateAnAccessGroupRequest = Schema.Struct({
  group_id: Schema.String.pipe(T.HttpPath("group_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/groups/{group_id}" }))
  .annotations({
    identifier: "UpdateAnAccessGroupRequest",
  }) as unknown as Schema.Schema<UpdateAnAccessGroupRequest>;

export interface UpdateAnAccessGroupResponse {
  result: {
    created_at?: unknown;
    exclude?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    id?: string;
    include?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    is_default?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    name?: string;
    require?: (
      | { group: { id: string } }
      | { any_valid_service_token: Record<string, unknown> }
      | { auth_context: { ac_id: string; id: string; identity_provider_id: string } }
      | { auth_method: { auth_method: string } }
      | { azureAD: { id: string; identity_provider_id: string } }
      | { certificate: Record<string, unknown> }
      | { common_name: { common_name: string } }
      | { geo: { country_code: string } }
      | { device_posture: { integration_uid: string } }
      | { email_domain: { domain: string } }
      | { email_list: { id: string } }
      | { email: { email: string } }
      | { everyone: Record<string, unknown> }
      | { external_evaluation: { evaluate_url: string; keys_url: string } }
      | { "github-organization": { identity_provider_id: string; name: string; team?: string } }
      | { gsuite: { email: string; identity_provider_id: string } }
      | { login_method: { id: string } }
      | { ip_list: { id: string } }
      | { ip: { ip: string } }
      | { okta: { identity_provider_id: string; name: string } }
      | { saml: { attribute_name: string; attribute_value: string; identity_provider_id: string } }
      | { oidc: { claim_name: string; claim_value: string; identity_provider_id: string } }
      | { service_token: { token_id: string } }
      | { linked_app_token: { app_uid: string } }
    )[];
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAnAccessGroupResponse = Schema.Struct({
  result: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    exclude: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Union(
            Schema.Struct({
              group: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              any_valid_service_token: Schema.Struct({}),
            }),
            Schema.Struct({
              auth_context: Schema.Struct({
                ac_id: Schema.String,
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              auth_method: Schema.Struct({
                auth_method: Schema.String,
              }),
            }),
            Schema.Struct({
              azureAD: Schema.Struct({
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              certificate: Schema.Struct({}),
            }),
            Schema.Struct({
              common_name: Schema.Struct({
                common_name: Schema.String,
              }),
            }),
            Schema.Struct({
              geo: Schema.Struct({
                country_code: Schema.String,
              }),
            }),
            Schema.Struct({
              device_posture: Schema.Struct({
                integration_uid: Schema.String,
              }),
            }),
            Schema.Struct({
              email_domain: Schema.Struct({
                domain: Schema.String,
              }),
            }),
            Schema.Struct({
              email_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              email: Schema.Struct({
                email: Schema.String,
              }),
            }),
            Schema.Struct({
              everyone: Schema.Struct({}),
            }),
            Schema.Struct({
              external_evaluation: Schema.Struct({
                evaluate_url: Schema.String,
                keys_url: Schema.String,
              }),
            }),
            Schema.Struct({
              "github-organization": Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
                team: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            }),
            Schema.Struct({
              gsuite: Schema.Struct({
                email: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              login_method: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip: Schema.Struct({
                ip: Schema.String,
              }),
            }),
            Schema.Struct({
              okta: Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
              }),
            }),
            Schema.Struct({
              saml: Schema.Struct({
                attribute_name: Schema.String,
                attribute_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              oidc: Schema.Struct({
                claim_name: Schema.String,
                claim_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              service_token: Schema.Struct({
                token_id: Schema.String,
              }),
            }),
            Schema.Struct({
              linked_app_token: Schema.Struct({
                app_uid: Schema.String,
              }),
            }),
          ),
        ),
      ),
    ),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    include: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Union(
            Schema.Struct({
              group: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              any_valid_service_token: Schema.Struct({}),
            }),
            Schema.Struct({
              auth_context: Schema.Struct({
                ac_id: Schema.String,
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              auth_method: Schema.Struct({
                auth_method: Schema.String,
              }),
            }),
            Schema.Struct({
              azureAD: Schema.Struct({
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              certificate: Schema.Struct({}),
            }),
            Schema.Struct({
              common_name: Schema.Struct({
                common_name: Schema.String,
              }),
            }),
            Schema.Struct({
              geo: Schema.Struct({
                country_code: Schema.String,
              }),
            }),
            Schema.Struct({
              device_posture: Schema.Struct({
                integration_uid: Schema.String,
              }),
            }),
            Schema.Struct({
              email_domain: Schema.Struct({
                domain: Schema.String,
              }),
            }),
            Schema.Struct({
              email_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              email: Schema.Struct({
                email: Schema.String,
              }),
            }),
            Schema.Struct({
              everyone: Schema.Struct({}),
            }),
            Schema.Struct({
              external_evaluation: Schema.Struct({
                evaluate_url: Schema.String,
                keys_url: Schema.String,
              }),
            }),
            Schema.Struct({
              "github-organization": Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
                team: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            }),
            Schema.Struct({
              gsuite: Schema.Struct({
                email: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              login_method: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip: Schema.Struct({
                ip: Schema.String,
              }),
            }),
            Schema.Struct({
              okta: Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
              }),
            }),
            Schema.Struct({
              saml: Schema.Struct({
                attribute_name: Schema.String,
                attribute_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              oidc: Schema.Struct({
                claim_name: Schema.String,
                claim_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              service_token: Schema.Struct({
                token_id: Schema.String,
              }),
            }),
            Schema.Struct({
              linked_app_token: Schema.Struct({
                app_uid: Schema.String,
              }),
            }),
          ),
        ),
      ),
    ),
    is_default: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Union(
            Schema.Struct({
              group: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              any_valid_service_token: Schema.Struct({}),
            }),
            Schema.Struct({
              auth_context: Schema.Struct({
                ac_id: Schema.String,
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              auth_method: Schema.Struct({
                auth_method: Schema.String,
              }),
            }),
            Schema.Struct({
              azureAD: Schema.Struct({
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              certificate: Schema.Struct({}),
            }),
            Schema.Struct({
              common_name: Schema.Struct({
                common_name: Schema.String,
              }),
            }),
            Schema.Struct({
              geo: Schema.Struct({
                country_code: Schema.String,
              }),
            }),
            Schema.Struct({
              device_posture: Schema.Struct({
                integration_uid: Schema.String,
              }),
            }),
            Schema.Struct({
              email_domain: Schema.Struct({
                domain: Schema.String,
              }),
            }),
            Schema.Struct({
              email_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              email: Schema.Struct({
                email: Schema.String,
              }),
            }),
            Schema.Struct({
              everyone: Schema.Struct({}),
            }),
            Schema.Struct({
              external_evaluation: Schema.Struct({
                evaluate_url: Schema.String,
                keys_url: Schema.String,
              }),
            }),
            Schema.Struct({
              "github-organization": Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
                team: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            }),
            Schema.Struct({
              gsuite: Schema.Struct({
                email: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              login_method: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip: Schema.Struct({
                ip: Schema.String,
              }),
            }),
            Schema.Struct({
              okta: Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
              }),
            }),
            Schema.Struct({
              saml: Schema.Struct({
                attribute_name: Schema.String,
                attribute_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              oidc: Schema.Struct({
                claim_name: Schema.String,
                claim_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              service_token: Schema.Struct({
                token_id: Schema.String,
              }),
            }),
            Schema.Struct({
              linked_app_token: Schema.Struct({
                app_uid: Schema.String,
              }),
            }),
          ),
        ),
      ),
    ),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    require: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Union(
            Schema.Struct({
              group: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              any_valid_service_token: Schema.Struct({}),
            }),
            Schema.Struct({
              auth_context: Schema.Struct({
                ac_id: Schema.String,
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              auth_method: Schema.Struct({
                auth_method: Schema.String,
              }),
            }),
            Schema.Struct({
              azureAD: Schema.Struct({
                id: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              certificate: Schema.Struct({}),
            }),
            Schema.Struct({
              common_name: Schema.Struct({
                common_name: Schema.String,
              }),
            }),
            Schema.Struct({
              geo: Schema.Struct({
                country_code: Schema.String,
              }),
            }),
            Schema.Struct({
              device_posture: Schema.Struct({
                integration_uid: Schema.String,
              }),
            }),
            Schema.Struct({
              email_domain: Schema.Struct({
                domain: Schema.String,
              }),
            }),
            Schema.Struct({
              email_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              email: Schema.Struct({
                email: Schema.String,
              }),
            }),
            Schema.Struct({
              everyone: Schema.Struct({}),
            }),
            Schema.Struct({
              external_evaluation: Schema.Struct({
                evaluate_url: Schema.String,
                keys_url: Schema.String,
              }),
            }),
            Schema.Struct({
              "github-organization": Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
                team: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            }),
            Schema.Struct({
              gsuite: Schema.Struct({
                email: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              login_method: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip_list: Schema.Struct({
                id: Schema.String,
              }),
            }),
            Schema.Struct({
              ip: Schema.Struct({
                ip: Schema.String,
              }),
            }),
            Schema.Struct({
              okta: Schema.Struct({
                identity_provider_id: Schema.String,
                name: Schema.String,
              }),
            }),
            Schema.Struct({
              saml: Schema.Struct({
                attribute_name: Schema.String,
                attribute_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              oidc: Schema.Struct({
                claim_name: Schema.String,
                claim_value: Schema.String,
                identity_provider_id: Schema.String,
              }),
            }),
            Schema.Struct({
              service_token: Schema.Struct({
                token_id: Schema.String,
              }),
            }),
            Schema.Struct({
              linked_app_token: Schema.Struct({
                app_uid: Schema.String,
              }),
            }),
          ),
        ),
      ),
    ),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "UpdateAnAccessGroupResponse",
}) as unknown as Schema.Schema<UpdateAnAccessGroupResponse>;

export const updateAnAccessGroup: (
  input: UpdateAnAccessGroupRequest,
) => Effect.Effect<
  UpdateAnAccessGroupResponse,
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
  input: UpdateAnAccessGroupRequest,
  output: UpdateAnAccessGroupResponse,
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

export interface DeleteAnAccessGroupRequest {
  group_id: string;
  account_id: string;
}

export const DeleteAnAccessGroupRequest = Schema.Struct({
  group_id: Schema.String.pipe(T.HttpPath("group_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/access/groups/{group_id}" }))
  .annotations({
    identifier: "DeleteAnAccessGroupRequest",
  }) as unknown as Schema.Schema<DeleteAnAccessGroupRequest>;

export interface DeleteAnAccessGroupResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteAnAccessGroupResponse = Schema.Struct({
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
  identifier: "DeleteAnAccessGroupResponse",
}) as unknown as Schema.Schema<DeleteAnAccessGroupResponse>;

export const deleteAnAccessGroup: (
  input: DeleteAnAccessGroupRequest,
) => Effect.Effect<
  DeleteAnAccessGroupResponse,
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
  input: DeleteAnAccessGroupRequest,
  output: DeleteAnAccessGroupResponse,
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

export interface ListAccessIdentityProvidersRequest {
  account_id: string;
  scim_enabled?: string;
  per_page?: number;
}

export const ListAccessIdentityProvidersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  scim_enabled: Schema.optional(Schema.String).pipe(T.HttpQuery("scim_enabled")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/identity_providers" }))
  .annotations({
    identifier: "ListAccessIdentityProvidersRequest",
  }) as unknown as Schema.Schema<ListAccessIdentityProvidersRequest>;

export interface ListAccessIdentityProvidersResponse {
  result: unknown[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListAccessIdentityProvidersResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Union(
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
      Schema.Struct({}),
    ),
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
  identifier: "ListAccessIdentityProvidersResponse",
}) as unknown as Schema.Schema<ListAccessIdentityProvidersResponse>;

export const listAccessIdentityProviders: (
  input: ListAccessIdentityProvidersRequest,
) => Effect.Effect<
  ListAccessIdentityProvidersResponse,
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
  input: ListAccessIdentityProvidersRequest,
  output: ListAccessIdentityProvidersResponse,
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

export interface AccessIdentityProvidersAddAnAccessIdentityProviderRequest {
  account_id: string;
  body:
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>;
}

export const AccessIdentityProvidersAddAnAccessIdentityProviderRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Union(
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
  ).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/identity_providers" }))
  .annotations({
    identifier: "AccessIdentityProvidersAddAnAccessIdentityProviderRequest",
  }) as unknown as Schema.Schema<AccessIdentityProvidersAddAnAccessIdentityProviderRequest>;

export interface AccessIdentityProvidersAddAnAccessIdentityProviderResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessIdentityProvidersAddAnAccessIdentityProviderResponse = Schema.Struct({
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
  identifier: "AccessIdentityProvidersAddAnAccessIdentityProviderResponse",
}) as unknown as Schema.Schema<AccessIdentityProvidersAddAnAccessIdentityProviderResponse>;

export const accessIdentityProvidersAddAnAccessIdentityProvider: (
  input: AccessIdentityProvidersAddAnAccessIdentityProviderRequest,
) => Effect.Effect<
  AccessIdentityProvidersAddAnAccessIdentityProviderResponse,
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
  input: AccessIdentityProvidersAddAnAccessIdentityProviderRequest,
  output: AccessIdentityProvidersAddAnAccessIdentityProviderResponse,
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

export interface GetAnAccessIdentityProviderRequest {
  identity_provider_id: string;
  account_id: string;
}

export const GetAnAccessIdentityProviderRequest = Schema.Struct({
  identity_provider_id: Schema.String.pipe(T.HttpPath("identity_provider_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/identity_providers/{identity_provider_id}",
    }),
  )
  .annotations({
    identifier: "GetAnAccessIdentityProviderRequest",
  }) as unknown as Schema.Schema<GetAnAccessIdentityProviderRequest>;

export interface GetAnAccessIdentityProviderResponse {
  result:
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAnAccessIdentityProviderResponse = Schema.Struct({
  result: Schema.Union(
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
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
  identifier: "GetAnAccessIdentityProviderResponse",
}) as unknown as Schema.Schema<GetAnAccessIdentityProviderResponse>;

export const getAnAccessIdentityProvider: (
  input: GetAnAccessIdentityProviderRequest,
) => Effect.Effect<
  GetAnAccessIdentityProviderResponse,
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
  input: GetAnAccessIdentityProviderRequest,
  output: GetAnAccessIdentityProviderResponse,
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

export interface UpdateAnAccessIdentityProviderRequest {
  identity_provider_id: string;
  account_id: string;
  body:
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>;
}

export const UpdateAnAccessIdentityProviderRequest = Schema.Struct({
  identity_provider_id: Schema.String.pipe(T.HttpPath("identity_provider_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Union(
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
  ).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/access/identity_providers/{identity_provider_id}",
    }),
  )
  .annotations({
    identifier: "UpdateAnAccessIdentityProviderRequest",
  }) as unknown as Schema.Schema<UpdateAnAccessIdentityProviderRequest>;

export interface UpdateAnAccessIdentityProviderResponse {
  result:
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>
    | Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAnAccessIdentityProviderResponse = Schema.Struct({
  result: Schema.Union(
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
    Schema.Struct({}),
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
  identifier: "UpdateAnAccessIdentityProviderResponse",
}) as unknown as Schema.Schema<UpdateAnAccessIdentityProviderResponse>;

export const updateAnAccessIdentityProvider: (
  input: UpdateAnAccessIdentityProviderRequest,
) => Effect.Effect<
  UpdateAnAccessIdentityProviderResponse,
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
  input: UpdateAnAccessIdentityProviderRequest,
  output: UpdateAnAccessIdentityProviderResponse,
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

export interface DeleteAnAccessIdentityProviderRequest {
  identity_provider_id: string;
  account_id: string;
}

export const DeleteAnAccessIdentityProviderRequest = Schema.Struct({
  identity_provider_id: Schema.String.pipe(T.HttpPath("identity_provider_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/access/identity_providers/{identity_provider_id}",
    }),
  )
  .annotations({
    identifier: "DeleteAnAccessIdentityProviderRequest",
  }) as unknown as Schema.Schema<DeleteAnAccessIdentityProviderRequest>;

export interface DeleteAnAccessIdentityProviderResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteAnAccessIdentityProviderResponse = Schema.Struct({
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
  identifier: "DeleteAnAccessIdentityProviderResponse",
}) as unknown as Schema.Schema<DeleteAnAccessIdentityProviderResponse>;

export const deleteAnAccessIdentityProvider: (
  input: DeleteAnAccessIdentityProviderRequest,
) => Effect.Effect<
  DeleteAnAccessIdentityProviderResponse,
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
  input: DeleteAnAccessIdentityProviderRequest,
  output: DeleteAnAccessIdentityProviderResponse,
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

export interface ListScimGroupResourcesRequest {
  identity_provider_id: string;
  account_id: string;
  cf_resource_id?: string;
  idp_resource_id?: string;
  name?: string;
  per_page?: number;
}

export const ListScimGroupResourcesRequest = Schema.Struct({
  identity_provider_id: Schema.String.pipe(T.HttpPath("identity_provider_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  cf_resource_id: Schema.optional(Schema.String).pipe(T.HttpQuery("cf_resource_id")),
  idp_resource_id: Schema.optional(Schema.String).pipe(T.HttpQuery("idp_resource_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/groups",
    }),
  )
  .annotations({
    identifier: "ListScimGroupResourcesRequest",
  }) as unknown as Schema.Schema<ListScimGroupResourcesRequest>;

export interface ListScimGroupResourcesResponse {
  result: {
    displayName?: string;
    externalId?: string;
    id?: string;
    meta?: { created?: string; lastModified?: string };
    schemas?: string[];
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListScimGroupResourcesResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      displayName: Schema.optional(Schema.NullOr(Schema.String)),
      externalId: Schema.optional(Schema.NullOr(Schema.String)),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      meta: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            created: Schema.optional(Schema.NullOr(Schema.Date)),
            lastModified: Schema.optional(Schema.NullOr(Schema.Date)),
          }),
        ),
      ),
      schemas: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
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
  identifier: "ListScimGroupResourcesResponse",
}) as unknown as Schema.Schema<ListScimGroupResourcesResponse>;

export const listScimGroupResources: (
  input: ListScimGroupResourcesRequest,
) => Effect.Effect<
  ListScimGroupResourcesResponse,
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
  input: ListScimGroupResourcesRequest,
  output: ListScimGroupResourcesResponse,
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

export interface ListScimUserResourcesRequest {
  identity_provider_id: string;
  account_id: string;
  cf_resource_id?: string;
  idp_resource_id?: string;
  username?: string;
  email?: string;
  name?: string;
  per_page?: number;
}

export const ListScimUserResourcesRequest = Schema.Struct({
  identity_provider_id: Schema.String.pipe(T.HttpPath("identity_provider_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  cf_resource_id: Schema.optional(Schema.String).pipe(T.HttpQuery("cf_resource_id")),
  idp_resource_id: Schema.optional(Schema.String).pipe(T.HttpQuery("idp_resource_id")),
  username: Schema.optional(Schema.String).pipe(T.HttpQuery("username")),
  email: Schema.optional(Schema.String).pipe(T.HttpQuery("email")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/users",
    }),
  )
  .annotations({
    identifier: "ListScimUserResourcesRequest",
  }) as unknown as Schema.Schema<ListScimUserResourcesRequest>;

export interface ListScimUserResourcesResponse {
  result: {
    active?: boolean;
    displayName?: string;
    emails?: { primary?: boolean; type?: string; value?: string }[];
    externalId?: string;
    id?: string;
    meta?: { created?: string; lastModified?: string };
    schemas?: string[];
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListScimUserResourcesResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      active: Schema.optional(Schema.NullOr(Schema.Boolean)),
      displayName: Schema.optional(Schema.NullOr(Schema.String)),
      emails: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              primary: Schema.optional(Schema.NullOr(Schema.Boolean)),
              type: Schema.optional(Schema.NullOr(Schema.String)),
              value: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        ),
      ),
      externalId: Schema.optional(Schema.NullOr(Schema.String)),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      meta: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            created: Schema.optional(Schema.NullOr(Schema.Date)),
            lastModified: Schema.optional(Schema.NullOr(Schema.Date)),
          }),
        ),
      ),
      schemas: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
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
  identifier: "ListScimUserResourcesResponse",
}) as unknown as Schema.Schema<ListScimUserResourcesResponse>;

export const listScimUserResources: (
  input: ListScimUserResourcesRequest,
) => Effect.Effect<
  ListScimUserResourcesResponse,
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
  input: ListScimUserResourcesRequest,
  output: ListScimUserResourcesResponse,
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

export interface GetTheAccessKeyConfigurationRequest {
  account_id: string;
}

export const GetTheAccessKeyConfigurationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/keys" }))
  .annotations({
    identifier: "GetTheAccessKeyConfigurationRequest",
  }) as unknown as Schema.Schema<GetTheAccessKeyConfigurationRequest>;

export interface GetTheAccessKeyConfigurationResponse {
  result: {
    days_until_next_rotation?: number;
    key_rotation_interval_days?: number;
    last_key_rotation_at?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetTheAccessKeyConfigurationResponse = Schema.Struct({
  result: Schema.Struct({
    days_until_next_rotation: Schema.optional(Schema.NullOr(Schema.Number)),
    key_rotation_interval_days: Schema.optional(Schema.NullOr(Schema.Number)),
    last_key_rotation_at: Schema.optional(Schema.NullOr(Schema.Date)),
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
  identifier: "GetTheAccessKeyConfigurationResponse",
}) as unknown as Schema.Schema<GetTheAccessKeyConfigurationResponse>;

export const getTheAccessKeyConfiguration: (
  input: GetTheAccessKeyConfigurationRequest,
) => Effect.Effect<
  GetTheAccessKeyConfigurationResponse,
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
  input: GetTheAccessKeyConfigurationRequest,
  output: GetTheAccessKeyConfigurationResponse,
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

export interface UpdateTheAccessKeyConfigurationRequest {
  account_id: string;
  body: unknown;
}

export const UpdateTheAccessKeyConfigurationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/keys" }))
  .annotations({
    identifier: "UpdateTheAccessKeyConfigurationRequest",
  }) as unknown as Schema.Schema<UpdateTheAccessKeyConfigurationRequest>;

export interface UpdateTheAccessKeyConfigurationResponse {
  result: {
    days_until_next_rotation?: number;
    key_rotation_interval_days?: number;
    last_key_rotation_at?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateTheAccessKeyConfigurationResponse = Schema.Struct({
  result: Schema.Struct({
    days_until_next_rotation: Schema.optional(Schema.NullOr(Schema.Number)),
    key_rotation_interval_days: Schema.optional(Schema.NullOr(Schema.Number)),
    last_key_rotation_at: Schema.optional(Schema.NullOr(Schema.Date)),
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
  identifier: "UpdateTheAccessKeyConfigurationResponse",
}) as unknown as Schema.Schema<UpdateTheAccessKeyConfigurationResponse>;

export const updateTheAccessKeyConfiguration: (
  input: UpdateTheAccessKeyConfigurationRequest,
) => Effect.Effect<
  UpdateTheAccessKeyConfigurationResponse,
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
  input: UpdateTheAccessKeyConfigurationRequest,
  output: UpdateTheAccessKeyConfigurationResponse,
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

export interface AccessKeyConfigurationRotateAccessKeysRequest {
  account_id: string;
}

export const AccessKeyConfigurationRotateAccessKeysRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/keys/rotate" }))
  .annotations({
    identifier: "AccessKeyConfigurationRotateAccessKeysRequest",
  }) as unknown as Schema.Schema<AccessKeyConfigurationRotateAccessKeysRequest>;

export interface AccessKeyConfigurationRotateAccessKeysResponse {
  result: {
    days_until_next_rotation?: number;
    key_rotation_interval_days?: number;
    last_key_rotation_at?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessKeyConfigurationRotateAccessKeysResponse = Schema.Struct({
  result: Schema.Struct({
    days_until_next_rotation: Schema.optional(Schema.NullOr(Schema.Number)),
    key_rotation_interval_days: Schema.optional(Schema.NullOr(Schema.Number)),
    last_key_rotation_at: Schema.optional(Schema.NullOr(Schema.Date)),
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
  identifier: "AccessKeyConfigurationRotateAccessKeysResponse",
}) as unknown as Schema.Schema<AccessKeyConfigurationRotateAccessKeysResponse>;

export const accessKeyConfigurationRotateAccessKeys: (
  input: AccessKeyConfigurationRotateAccessKeysRequest,
) => Effect.Effect<
  AccessKeyConfigurationRotateAccessKeysResponse,
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
  input: AccessKeyConfigurationRotateAccessKeysRequest,
  output: AccessKeyConfigurationRotateAccessKeysResponse,
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

export interface GetAccessAuthenticationLogsRequest {
  account_id: string;
  limit?: number;
  direction?: "desc" | "asc";
  since?: string;
  until?: string;
  per_page?: number;
  email?: string;
  email_exact?: boolean;
  user_id?: string;
}

export const GetAccessAuthenticationLogsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  direction: Schema.optional(Schema.Literal("desc", "asc")).pipe(T.HttpQuery("direction")),
  since: Schema.optional(Schema.Date).pipe(T.HttpQuery("since")),
  until: Schema.optional(Schema.Date).pipe(T.HttpQuery("until")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  email: Schema.optional(Schema.String).pipe(T.HttpQuery("email")),
  email_exact: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("email_exact")),
  user_id: Schema.optional(Schema.UUID).pipe(T.HttpQuery("user_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/logs/access_requests" }))
  .annotations({
    identifier: "GetAccessAuthenticationLogsRequest",
  }) as unknown as Schema.Schema<GetAccessAuthenticationLogsRequest>;

export interface GetAccessAuthenticationLogsResponse {
  result: {
    action?: string;
    allowed?: boolean;
    app_domain?: string;
    app_uid?: string;
    connection?: string;
    created_at?: string;
    ip_address?: string;
    ray_id?: string;
    user_email?: string;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAccessAuthenticationLogsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      action: Schema.optional(Schema.NullOr(Schema.String)),
      allowed: Schema.optional(Schema.NullOr(Schema.Boolean)),
      app_domain: Schema.optional(Schema.NullOr(Schema.String)),
      app_uid: Schema.optional(Schema.NullOr(Schema.String)),
      connection: Schema.optional(Schema.NullOr(Schema.String)),
      created_at: Schema.optional(Schema.NullOr(Schema.Date)),
      ip_address: Schema.optional(Schema.NullOr(Schema.String)),
      ray_id: Schema.optional(Schema.NullOr(Schema.String)),
      user_email: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "GetAccessAuthenticationLogsResponse",
}) as unknown as Schema.Schema<GetAccessAuthenticationLogsResponse>;

export const getAccessAuthenticationLogs: (
  input: GetAccessAuthenticationLogsRequest,
) => Effect.Effect<
  GetAccessAuthenticationLogsResponse,
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
  input: GetAccessAuthenticationLogsRequest,
  output: GetAccessAuthenticationLogsResponse,
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

export interface UpdateLogsRequest {
  account_id: string;
  limit?: number;
  direction?: "desc" | "asc";
  since?: string;
  until?: string;
  idp_id: string[];
  status?: ("FAILURE" | "SUCCESS")[];
  resource_type?: ("USER" | "GROUP")[];
  request_method?: ("DELETE" | "PATCH" | "POST" | "PUT")[];
  resource_user_email?: string;
  resource_group_name?: string;
  cf_resource_id?: string;
  idp_resource_id?: string;
  per_page?: number;
}

export const UpdateLogsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  direction: Schema.optional(Schema.Literal("desc", "asc")).pipe(T.HttpQuery("direction")),
  since: Schema.optional(Schema.Date).pipe(T.HttpQuery("since")),
  until: Schema.optional(Schema.Date).pipe(T.HttpQuery("until")),
  idp_id: Schema.Array(Schema.String).pipe(T.HttpQuery("idp_id")),
  status: Schema.optional(Schema.Array(Schema.Literal("FAILURE", "SUCCESS"))).pipe(
    T.HttpQuery("status"),
  ),
  resource_type: Schema.optional(Schema.Array(Schema.Literal("USER", "GROUP"))).pipe(
    T.HttpQuery("resource_type"),
  ),
  request_method: Schema.optional(
    Schema.Array(Schema.Literal("DELETE", "PATCH", "POST", "PUT")),
  ).pipe(T.HttpQuery("request_method")),
  resource_user_email: Schema.optional(Schema.String).pipe(T.HttpQuery("resource_user_email")),
  resource_group_name: Schema.optional(Schema.String).pipe(T.HttpQuery("resource_group_name")),
  cf_resource_id: Schema.optional(Schema.String).pipe(T.HttpQuery("cf_resource_id")),
  idp_resource_id: Schema.optional(Schema.String).pipe(T.HttpQuery("idp_resource_id")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/logs/scim/updates" }))
  .annotations({ identifier: "UpdateLogsRequest" }) as unknown as Schema.Schema<UpdateLogsRequest>;

export interface UpdateLogsResponse {
  result: {
    cf_resource_id?: string;
    error_description?: string;
    idp_id?: string;
    idp_resource_id?: string;
    logged_at?: string;
    request_body?: string;
    request_method?: string;
    resource_group_name?: string;
    resource_type?: string;
    resource_user_email?: string;
    status?: string;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateLogsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      cf_resource_id: Schema.optional(Schema.NullOr(Schema.String)),
      error_description: Schema.optional(Schema.NullOr(Schema.String)),
      idp_id: Schema.optional(Schema.NullOr(Schema.String)),
      idp_resource_id: Schema.optional(Schema.NullOr(Schema.String)),
      logged_at: Schema.optional(Schema.NullOr(Schema.Date)),
      request_body: Schema.optional(Schema.NullOr(Schema.String)),
      request_method: Schema.optional(Schema.NullOr(Schema.String)),
      resource_group_name: Schema.optional(Schema.NullOr(Schema.String)),
      resource_type: Schema.optional(Schema.NullOr(Schema.String)),
      resource_user_email: Schema.optional(Schema.NullOr(Schema.String)),
      status: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "UpdateLogsResponse",
}) as unknown as Schema.Schema<UpdateLogsResponse>;

export const updateLogs: (
  input: UpdateLogsRequest,
) => Effect.Effect<
  UpdateLogsResponse,
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
  input: UpdateLogsRequest,
  output: UpdateLogsResponse,
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

export interface GetYourZeroTrustOrganizationRequest {
  account_id: string;
}

export const GetYourZeroTrustOrganizationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/organizations" }))
  .annotations({
    identifier: "GetYourZeroTrustOrganizationRequest",
  }) as unknown as Schema.Schema<GetYourZeroTrustOrganizationRequest>;

export interface GetYourZeroTrustOrganizationResponse {
  result: {
    allow_authenticate_via_warp?: boolean;
    auth_domain?: string;
    auto_redirect_to_identity?: boolean;
    created_at?: unknown;
    custom_pages?: { forbidden?: string; identity_denied?: string };
    is_ui_read_only?: boolean;
    login_design?: {
      background_color?: string;
      footer_text?: string;
      header_text?: string;
      logo_path?: string;
      text_color?: string;
    };
    name?: string;
    session_duration?: string;
    ui_read_only_toggle_reason?: string;
    updated_at?: unknown;
    user_seat_expiration_inactive_time?: string;
    warp_auth_session_duration?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetYourZeroTrustOrganizationResponse = Schema.Struct({
  result: Schema.Struct({
    allow_authenticate_via_warp: Schema.optional(Schema.NullOr(Schema.Boolean)),
    auth_domain: Schema.optional(Schema.NullOr(Schema.String)),
    auto_redirect_to_identity: Schema.optional(Schema.NullOr(Schema.Boolean)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    custom_pages: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          forbidden: Schema.optional(Schema.NullOr(Schema.String)),
          identity_denied: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    is_ui_read_only: Schema.optional(Schema.NullOr(Schema.Boolean)),
    login_design: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          background_color: Schema.optional(Schema.NullOr(Schema.String)),
          footer_text: Schema.optional(Schema.NullOr(Schema.String)),
          header_text: Schema.optional(Schema.NullOr(Schema.String)),
          logo_path: Schema.optional(Schema.NullOr(Schema.String)),
          text_color: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    session_duration: Schema.optional(Schema.NullOr(Schema.String)),
    ui_read_only_toggle_reason: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    user_seat_expiration_inactive_time: Schema.optional(Schema.NullOr(Schema.String)),
    warp_auth_session_duration: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "GetYourZeroTrustOrganizationResponse",
}) as unknown as Schema.Schema<GetYourZeroTrustOrganizationResponse>;

export const getYourZeroTrustOrganization: (
  input: GetYourZeroTrustOrganizationRequest,
) => Effect.Effect<
  GetYourZeroTrustOrganizationResponse,
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
  input: GetYourZeroTrustOrganizationRequest,
  output: GetYourZeroTrustOrganizationResponse,
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

export interface CreateYourZeroTrustOrganizationRequest {
  account_id: string;
  body: unknown;
}

export const CreateYourZeroTrustOrganizationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/organizations" }))
  .annotations({
    identifier: "CreateYourZeroTrustOrganizationRequest",
  }) as unknown as Schema.Schema<CreateYourZeroTrustOrganizationRequest>;

export interface CreateYourZeroTrustOrganizationResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateYourZeroTrustOrganizationResponse = Schema.Struct({
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
  identifier: "CreateYourZeroTrustOrganizationResponse",
}) as unknown as Schema.Schema<CreateYourZeroTrustOrganizationResponse>;

export const createYourZeroTrustOrganization: (
  input: CreateYourZeroTrustOrganizationRequest,
) => Effect.Effect<
  CreateYourZeroTrustOrganizationResponse,
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
  input: CreateYourZeroTrustOrganizationRequest,
  output: CreateYourZeroTrustOrganizationResponse,
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

export interface UpdateYourZeroTrustOrganizationRequest {
  account_id: string;
  body: unknown;
}

export const UpdateYourZeroTrustOrganizationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/organizations" }))
  .annotations({
    identifier: "UpdateYourZeroTrustOrganizationRequest",
  }) as unknown as Schema.Schema<UpdateYourZeroTrustOrganizationRequest>;

export interface UpdateYourZeroTrustOrganizationResponse {
  result: {
    allow_authenticate_via_warp?: boolean;
    auth_domain?: string;
    auto_redirect_to_identity?: boolean;
    created_at?: unknown;
    custom_pages?: { forbidden?: string; identity_denied?: string };
    is_ui_read_only?: boolean;
    login_design?: {
      background_color?: string;
      footer_text?: string;
      header_text?: string;
      logo_path?: string;
      text_color?: string;
    };
    name?: string;
    session_duration?: string;
    ui_read_only_toggle_reason?: string;
    updated_at?: unknown;
    user_seat_expiration_inactive_time?: string;
    warp_auth_session_duration?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateYourZeroTrustOrganizationResponse = Schema.Struct({
  result: Schema.Struct({
    allow_authenticate_via_warp: Schema.optional(Schema.NullOr(Schema.Boolean)),
    auth_domain: Schema.optional(Schema.NullOr(Schema.String)),
    auto_redirect_to_identity: Schema.optional(Schema.NullOr(Schema.Boolean)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    custom_pages: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          forbidden: Schema.optional(Schema.NullOr(Schema.String)),
          identity_denied: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    is_ui_read_only: Schema.optional(Schema.NullOr(Schema.Boolean)),
    login_design: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          background_color: Schema.optional(Schema.NullOr(Schema.String)),
          footer_text: Schema.optional(Schema.NullOr(Schema.String)),
          header_text: Schema.optional(Schema.NullOr(Schema.String)),
          logo_path: Schema.optional(Schema.NullOr(Schema.String)),
          text_color: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    session_duration: Schema.optional(Schema.NullOr(Schema.String)),
    ui_read_only_toggle_reason: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    user_seat_expiration_inactive_time: Schema.optional(Schema.NullOr(Schema.String)),
    warp_auth_session_duration: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "UpdateYourZeroTrustOrganizationResponse",
}) as unknown as Schema.Schema<UpdateYourZeroTrustOrganizationResponse>;

export const updateYourZeroTrustOrganization: (
  input: UpdateYourZeroTrustOrganizationRequest,
) => Effect.Effect<
  UpdateYourZeroTrustOrganizationResponse,
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
  input: UpdateYourZeroTrustOrganizationRequest,
  output: UpdateYourZeroTrustOrganizationResponse,
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

export interface GetYourZeroTrustOrganizationDohSettingsRequest {
  account_id: string;
}

export const GetYourZeroTrustOrganizationDohSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/organizations/doh" }))
  .annotations({
    identifier: "GetYourZeroTrustOrganizationDohSettingsRequest",
  }) as unknown as Schema.Schema<GetYourZeroTrustOrganizationDohSettingsRequest>;

export interface GetYourZeroTrustOrganizationDohSettingsResponse {
  result: { doh_jwt_duration?: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetYourZeroTrustOrganizationDohSettingsResponse = Schema.Struct({
  result: Schema.Struct({
    doh_jwt_duration: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "GetYourZeroTrustOrganizationDohSettingsResponse",
}) as unknown as Schema.Schema<GetYourZeroTrustOrganizationDohSettingsResponse>;

export const getYourZeroTrustOrganizationDohSettings: (
  input: GetYourZeroTrustOrganizationDohSettingsRequest,
) => Effect.Effect<
  GetYourZeroTrustOrganizationDohSettingsResponse,
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
  input: GetYourZeroTrustOrganizationDohSettingsRequest,
  output: GetYourZeroTrustOrganizationDohSettingsResponse,
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

export interface UpdateYourZeroTrustOrganizationDohSettingsRequest {
  account_id: string;
  body: unknown;
}

export const UpdateYourZeroTrustOrganizationDohSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/organizations/doh" }))
  .annotations({
    identifier: "UpdateYourZeroTrustOrganizationDohSettingsRequest",
  }) as unknown as Schema.Schema<UpdateYourZeroTrustOrganizationDohSettingsRequest>;

export interface UpdateYourZeroTrustOrganizationDohSettingsResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateYourZeroTrustOrganizationDohSettingsResponse = Schema.Struct({
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
  identifier: "UpdateYourZeroTrustOrganizationDohSettingsResponse",
}) as unknown as Schema.Schema<UpdateYourZeroTrustOrganizationDohSettingsResponse>;

export const updateYourZeroTrustOrganizationDohSettings: (
  input: UpdateYourZeroTrustOrganizationDohSettingsRequest,
) => Effect.Effect<
  UpdateYourZeroTrustOrganizationDohSettingsResponse,
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
  input: UpdateYourZeroTrustOrganizationDohSettingsRequest,
  output: UpdateYourZeroTrustOrganizationDohSettingsResponse,
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

export interface ZeroTrustOrganizationRevokeAllAccessTokensForAUserRequest {
  account_id: string;
  devices?: boolean;
  body: unknown;
}

export const ZeroTrustOrganizationRevokeAllAccessTokensForAUserRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  devices: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("devices")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/organizations/revoke_user" }))
  .annotations({
    identifier: "ZeroTrustOrganizationRevokeAllAccessTokensForAUserRequest",
  }) as unknown as Schema.Schema<ZeroTrustOrganizationRevokeAllAccessTokensForAUserRequest>;

export interface ZeroTrustOrganizationRevokeAllAccessTokensForAUserResponse {
  result: true | false;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ZeroTrustOrganizationRevokeAllAccessTokensForAUserResponse = Schema.Struct({
  result: Schema.Literal(true, false),
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
  identifier: "ZeroTrustOrganizationRevokeAllAccessTokensForAUserResponse",
}) as unknown as Schema.Schema<ZeroTrustOrganizationRevokeAllAccessTokensForAUserResponse>;

export const zeroTrustOrganizationRevokeAllAccessTokensForAUser: (
  input: ZeroTrustOrganizationRevokeAllAccessTokensForAUserRequest,
) => Effect.Effect<
  ZeroTrustOrganizationRevokeAllAccessTokensForAUserResponse,
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
  input: ZeroTrustOrganizationRevokeAllAccessTokensForAUserRequest,
  output: ZeroTrustOrganizationRevokeAllAccessTokensForAUserResponse,
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

export interface ListAccessReusablePoliciesRequest {
  account_id: string;
  per_page?: number;
}

export const ListAccessReusablePoliciesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/policies" }))
  .annotations({
    identifier: "ListAccessReusablePoliciesRequest",
  }) as unknown as Schema.Schema<ListAccessReusablePoliciesRequest>;

export interface ListAccessReusablePoliciesResponse {
  result: Record<string, unknown>[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListAccessReusablePoliciesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
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
  identifier: "ListAccessReusablePoliciesResponse",
}) as unknown as Schema.Schema<ListAccessReusablePoliciesResponse>;

export const listAccessReusablePolicies: (
  input: ListAccessReusablePoliciesRequest,
) => Effect.Effect<
  ListAccessReusablePoliciesResponse,
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
  input: ListAccessReusablePoliciesRequest,
  output: ListAccessReusablePoliciesResponse,
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

export interface CreateAnAccessReusablePolicyRequest {
  account_id: string;
  body: {
    approval_groups?: {
      approvals_needed: number;
      email_addresses?: string[];
      email_list_uuid?: string;
    }[];
    approval_required?: boolean;
    isolation_required?: boolean;
    purpose_justification_prompt?: string;
    purpose_justification_required?: boolean;
    session_duration?: string;
  };
}

export const CreateAnAccessReusablePolicyRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    approval_groups: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            approvals_needed: Schema.Number,
            email_addresses: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
            email_list_uuid: Schema.optional(Schema.NullOr(Schema.String)),
          }),
        ),
      ),
    ),
    approval_required: Schema.optional(Schema.NullOr(Schema.Boolean)),
    isolation_required: Schema.optional(Schema.NullOr(Schema.Boolean)),
    purpose_justification_prompt: Schema.optional(Schema.NullOr(Schema.String)),
    purpose_justification_required: Schema.optional(Schema.NullOr(Schema.Boolean)),
    session_duration: Schema.optional(Schema.NullOr(Schema.String)),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/policies" }))
  .annotations({
    identifier: "CreateAnAccessReusablePolicyRequest",
  }) as unknown as Schema.Schema<CreateAnAccessReusablePolicyRequest>;

export interface CreateAnAccessReusablePolicyResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateAnAccessReusablePolicyResponse = Schema.Struct({
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
  identifier: "CreateAnAccessReusablePolicyResponse",
}) as unknown as Schema.Schema<CreateAnAccessReusablePolicyResponse>;

export const createAnAccessReusablePolicy: (
  input: CreateAnAccessReusablePolicyRequest,
) => Effect.Effect<
  CreateAnAccessReusablePolicyResponse,
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
  input: CreateAnAccessReusablePolicyRequest,
  output: CreateAnAccessReusablePolicyResponse,
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

export interface GetAnAccessReusablePolicyRequest {
  account_id: string;
  policy_id: string;
}

export const GetAnAccessReusablePolicyRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  policy_id: Schema.String.pipe(T.HttpPath("policy_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/policies/{policy_id}" }))
  .annotations({
    identifier: "GetAnAccessReusablePolicyRequest",
  }) as unknown as Schema.Schema<GetAnAccessReusablePolicyRequest>;

export interface GetAnAccessReusablePolicyResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAnAccessReusablePolicyResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "GetAnAccessReusablePolicyResponse",
}) as unknown as Schema.Schema<GetAnAccessReusablePolicyResponse>;

export const getAnAccessReusablePolicy: (
  input: GetAnAccessReusablePolicyRequest,
) => Effect.Effect<
  GetAnAccessReusablePolicyResponse,
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
  input: GetAnAccessReusablePolicyRequest,
  output: GetAnAccessReusablePolicyResponse,
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

export interface UpdateAnAccessReusablePolicyRequest {
  account_id: string;
  policy_id: string;
  body: {
    approval_groups?: {
      approvals_needed: number;
      email_addresses?: string[];
      email_list_uuid?: string;
    }[];
    approval_required?: boolean;
    isolation_required?: boolean;
    purpose_justification_prompt?: string;
    purpose_justification_required?: boolean;
    session_duration?: string;
  };
}

export const UpdateAnAccessReusablePolicyRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  policy_id: Schema.String.pipe(T.HttpPath("policy_id")),
  body: Schema.Struct({
    approval_groups: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            approvals_needed: Schema.Number,
            email_addresses: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
            email_list_uuid: Schema.optional(Schema.NullOr(Schema.String)),
          }),
        ),
      ),
    ),
    approval_required: Schema.optional(Schema.NullOr(Schema.Boolean)),
    isolation_required: Schema.optional(Schema.NullOr(Schema.Boolean)),
    purpose_justification_prompt: Schema.optional(Schema.NullOr(Schema.String)),
    purpose_justification_required: Schema.optional(Schema.NullOr(Schema.Boolean)),
    session_duration: Schema.optional(Schema.NullOr(Schema.String)),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/policies/{policy_id}" }))
  .annotations({
    identifier: "UpdateAnAccessReusablePolicyRequest",
  }) as unknown as Schema.Schema<UpdateAnAccessReusablePolicyRequest>;

export interface UpdateAnAccessReusablePolicyResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAnAccessReusablePolicyResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "UpdateAnAccessReusablePolicyResponse",
}) as unknown as Schema.Schema<UpdateAnAccessReusablePolicyResponse>;

export const updateAnAccessReusablePolicy: (
  input: UpdateAnAccessReusablePolicyRequest,
) => Effect.Effect<
  UpdateAnAccessReusablePolicyResponse,
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
  input: UpdateAnAccessReusablePolicyRequest,
  output: UpdateAnAccessReusablePolicyResponse,
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

export interface DeleteAnAccessReusablePolicyRequest {
  account_id: string;
  policy_id: string;
}

export const DeleteAnAccessReusablePolicyRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  policy_id: Schema.String.pipe(T.HttpPath("policy_id")),
})
  .pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/access/policies/{policy_id}" }))
  .annotations({
    identifier: "DeleteAnAccessReusablePolicyRequest",
  }) as unknown as Schema.Schema<DeleteAnAccessReusablePolicyRequest>;

export interface DeleteAnAccessReusablePolicyResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteAnAccessReusablePolicyResponse = Schema.Struct({
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
  identifier: "DeleteAnAccessReusablePolicyResponse",
}) as unknown as Schema.Schema<DeleteAnAccessReusablePolicyResponse>;

export const deleteAnAccessReusablePolicy: (
  input: DeleteAnAccessReusablePolicyRequest,
) => Effect.Effect<
  DeleteAnAccessReusablePolicyResponse,
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
  input: DeleteAnAccessReusablePolicyRequest,
  output: DeleteAnAccessReusablePolicyResponse,
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

export interface AccessPolicyTestsRequest {
  account_id: string;
  body: { policies?: unknown[] };
}

export const AccessPolicyTestsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    policies: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Union(
            Schema.Struct({
              approval_groups: Schema.optional(
                Schema.NullOr(
                  Schema.Array(
                    Schema.Struct({
                      approvals_needed: Schema.Number,
                      email_addresses: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
                      email_list_uuid: Schema.optional(Schema.NullOr(Schema.String)),
                    }),
                  ),
                ),
              ),
              approval_required: Schema.optional(Schema.NullOr(Schema.Boolean)),
              isolation_required: Schema.optional(Schema.NullOr(Schema.Boolean)),
              purpose_justification_prompt: Schema.optional(Schema.NullOr(Schema.String)),
              purpose_justification_required: Schema.optional(Schema.NullOr(Schema.Boolean)),
              session_duration: Schema.optional(Schema.NullOr(Schema.String)),
            }),
            Schema.String,
          ),
        ),
      ),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/policy-tests" }))
  .annotations({
    identifier: "AccessPolicyTestsRequest",
  }) as unknown as Schema.Schema<AccessPolicyTestsRequest>;

export interface AccessPolicyTestsResponse {
  result: { id?: string; status?: "success" };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessPolicyTestsResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
    status: Schema.optional(Schema.NullOr(Schema.Literal("success"))),
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
  identifier: "AccessPolicyTestsResponse",
}) as unknown as Schema.Schema<AccessPolicyTestsResponse>;

export const accessPolicyTests: (
  input: AccessPolicyTestsRequest,
) => Effect.Effect<
  AccessPolicyTestsResponse,
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
  input: AccessPolicyTestsRequest,
  output: AccessPolicyTestsResponse,
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

export interface UpdateRequest {
  account_id: string;
  policy_test_id: string;
}

export const UpdateRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  policy_test_id: Schema.String.pipe(T.HttpPath("policy_test_id")),
})
  .pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/access/policy-tests/{policy_test_id}" }),
  )
  .annotations({ identifier: "UpdateRequest" }) as unknown as Schema.Schema<UpdateRequest>;

export interface UpdateResponse {
  result: {
    id?: string;
    percent_approved?: number;
    percent_blocked?: number;
    percent_errored?: number;
    percent_users_processed?: number;
    status?: "blocked" | "processing" | "exceeded time" | "complete";
    total_users?: number;
    users_approved?: number;
    users_blocked?: number;
    users_errored?: number;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
    percent_approved: Schema.optional(Schema.NullOr(Schema.Number)),
    percent_blocked: Schema.optional(Schema.NullOr(Schema.Number)),
    percent_errored: Schema.optional(Schema.NullOr(Schema.Number)),
    percent_users_processed: Schema.optional(Schema.NullOr(Schema.Number)),
    status: Schema.optional(
      Schema.NullOr(Schema.Literal("blocked", "processing", "exceeded time", "complete")),
    ),
    total_users: Schema.optional(Schema.NullOr(Schema.Number)),
    users_approved: Schema.optional(Schema.NullOr(Schema.Number)),
    users_blocked: Schema.optional(Schema.NullOr(Schema.Number)),
    users_errored: Schema.optional(Schema.NullOr(Schema.Number)),
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
}).annotations({ identifier: "UpdateResponse" }) as unknown as Schema.Schema<UpdateResponse>;

export const update: (
  input: UpdateRequest,
) => Effect.Effect<
  UpdateResponse,
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
  input: UpdateRequest,
  output: UpdateResponse,
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

export interface GetAUserPageRequest {
  account_id: string;
  policy_test_id: string;
  per_page?: number;
  status?: "success" | "fail" | "error";
}

export const GetAUserPageRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  policy_test_id: Schema.String.pipe(T.HttpPath("policy_test_id")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  status: Schema.optional(Schema.Literal("success", "fail", "error")).pipe(T.HttpQuery("status")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/policy-tests/{policy_test_id}/users",
    }),
  )
  .annotations({
    identifier: "GetAUserPageRequest",
  }) as unknown as Schema.Schema<GetAUserPageRequest>;

export interface GetAUserPageResponse {
  result: {
    email?: string;
    id?: string;
    name?: string;
    status?: "approved" | "blocked" | "error";
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAUserPageResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      email: Schema.optional(Schema.NullOr(Schema.String)),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      status: Schema.optional(Schema.NullOr(Schema.Literal("approved", "blocked", "error"))),
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
  identifier: "GetAUserPageResponse",
}) as unknown as Schema.Schema<GetAUserPageResponse>;

export const getAUserPage: (
  input: GetAUserPageRequest,
) => Effect.Effect<
  GetAUserPageResponse,
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
  input: GetAUserPageRequest,
  output: GetAUserPageResponse,
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

export interface UpdateAUserSeatRequest {
  account_id: unknown;
  body: { access_seat: boolean; gateway_seat: boolean; seat_uid: string }[];
}

export const UpdateAUserSeatRequest = Schema.Struct({
  account_id: Schema.Unknown.pipe(T.HttpPath("account_id")),
  body: Schema.Array(
    Schema.Struct({
      access_seat: Schema.Boolean,
      gateway_seat: Schema.Boolean,
      seat_uid: Schema.String,
    }),
  ).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PATCH", path: "/accounts/{account_id}/access/seats" }))
  .annotations({
    identifier: "UpdateAUserSeatRequest",
  }) as unknown as Schema.Schema<UpdateAUserSeatRequest>;

export interface UpdateAUserSeatResponse {
  result: {
    access_seat?: boolean;
    created_at?: string;
    gateway_seat?: boolean;
    seat_uid?: string;
    updated_at?: string;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAUserSeatResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      access_seat: Schema.optional(Schema.NullOr(Schema.Boolean)),
      created_at: Schema.optional(Schema.NullOr(Schema.Date)),
      gateway_seat: Schema.optional(Schema.NullOr(Schema.Boolean)),
      seat_uid: Schema.optional(Schema.NullOr(Schema.String)),
      updated_at: Schema.optional(Schema.NullOr(Schema.Date)),
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
  identifier: "UpdateAUserSeatResponse",
}) as unknown as Schema.Schema<UpdateAUserSeatResponse>;

export const updateAUserSeat: (
  input: UpdateAUserSeatRequest,
) => Effect.Effect<
  UpdateAUserSeatResponse,
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
  input: UpdateAUserSeatRequest,
  output: UpdateAUserSeatResponse,
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

export interface ListServiceTokensRequest {
  account_id: string;
  name?: string;
  search?: string;
}

export const ListServiceTokensRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/service_tokens" }))
  .annotations({
    identifier: "ListServiceTokensRequest",
  }) as unknown as Schema.Schema<ListServiceTokensRequest>;

export interface ListServiceTokensResponse {
  result: {
    client_id?: string;
    created_at?: unknown;
    duration?: string;
    expires_at?: string;
    id?: unknown;
    last_seen_at?: unknown;
    name?: string;
    updated_at?: unknown;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListServiceTokensResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      client_id: Schema.optional(Schema.NullOr(Schema.String)),
      created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
      duration: Schema.optional(Schema.NullOr(Schema.String)),
      expires_at: Schema.optional(Schema.NullOr(Schema.Date)),
      id: Schema.optional(Schema.NullOr(Schema.Unknown)),
      last_seen_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "ListServiceTokensResponse",
}) as unknown as Schema.Schema<ListServiceTokensResponse>;

export const listServiceTokens: (
  input: ListServiceTokensRequest,
) => Effect.Effect<
  ListServiceTokensResponse,
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
  input: ListServiceTokensRequest,
  output: ListServiceTokensResponse,
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

export interface CreateAServiceTokenRequest {
  account_id: string;
  body: unknown;
}

export const CreateAServiceTokenRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/service_tokens" }))
  .annotations({
    identifier: "CreateAServiceTokenRequest",
  }) as unknown as Schema.Schema<CreateAServiceTokenRequest>;

export interface CreateAServiceTokenResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateAServiceTokenResponse = Schema.Struct({
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
  identifier: "CreateAServiceTokenResponse",
}) as unknown as Schema.Schema<CreateAServiceTokenResponse>;

export const createAServiceToken: (
  input: CreateAServiceTokenRequest,
) => Effect.Effect<
  CreateAServiceTokenResponse,
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
  input: CreateAServiceTokenRequest,
  output: CreateAServiceTokenResponse,
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

export interface GetAServiceTokenRequest {
  service_token_id: string;
  account_id: string;
}

export const GetAServiceTokenRequest = Schema.Struct({
  service_token_id: Schema.String.pipe(T.HttpPath("service_token_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/service_tokens/{service_token_id}",
    }),
  )
  .annotations({
    identifier: "GetAServiceTokenRequest",
  }) as unknown as Schema.Schema<GetAServiceTokenRequest>;

export interface GetAServiceTokenResponse {
  result: {
    client_id?: string;
    created_at?: unknown;
    duration?: string;
    expires_at?: string;
    id?: unknown;
    last_seen_at?: unknown;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetAServiceTokenResponse = Schema.Struct({
  result: Schema.Struct({
    client_id: Schema.optional(Schema.NullOr(Schema.String)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    duration: Schema.optional(Schema.NullOr(Schema.String)),
    expires_at: Schema.optional(Schema.NullOr(Schema.Date)),
    id: Schema.optional(Schema.NullOr(Schema.Unknown)),
    last_seen_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "GetAServiceTokenResponse",
}) as unknown as Schema.Schema<GetAServiceTokenResponse>;

export const getAServiceToken: (
  input: GetAServiceTokenRequest,
) => Effect.Effect<
  GetAServiceTokenResponse,
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
  input: GetAServiceTokenRequest,
  output: GetAServiceTokenResponse,
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

export interface UpdateAServiceTokenRequest {
  service_token_id: string;
  account_id: string;
  body: unknown;
}

export const UpdateAServiceTokenRequest = Schema.Struct({
  service_token_id: Schema.String.pipe(T.HttpPath("service_token_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/access/service_tokens/{service_token_id}",
    }),
  )
  .annotations({
    identifier: "UpdateAServiceTokenRequest",
  }) as unknown as Schema.Schema<UpdateAServiceTokenRequest>;

export interface UpdateAServiceTokenResponse {
  result: {
    client_id?: string;
    created_at?: unknown;
    duration?: string;
    expires_at?: string;
    id?: unknown;
    last_seen_at?: unknown;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateAServiceTokenResponse = Schema.Struct({
  result: Schema.Struct({
    client_id: Schema.optional(Schema.NullOr(Schema.String)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    duration: Schema.optional(Schema.NullOr(Schema.String)),
    expires_at: Schema.optional(Schema.NullOr(Schema.Date)),
    id: Schema.optional(Schema.NullOr(Schema.Unknown)),
    last_seen_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "UpdateAServiceTokenResponse",
}) as unknown as Schema.Schema<UpdateAServiceTokenResponse>;

export const updateAServiceToken: (
  input: UpdateAServiceTokenRequest,
) => Effect.Effect<
  UpdateAServiceTokenResponse,
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
  input: UpdateAServiceTokenRequest,
  output: UpdateAServiceTokenResponse,
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

export interface DeleteAServiceTokenRequest {
  service_token_id: string;
  account_id: string;
}

export const DeleteAServiceTokenRequest = Schema.Struct({
  service_token_id: Schema.String.pipe(T.HttpPath("service_token_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/access/service_tokens/{service_token_id}",
    }),
  )
  .annotations({
    identifier: "DeleteAServiceTokenRequest",
  }) as unknown as Schema.Schema<DeleteAServiceTokenRequest>;

export interface DeleteAServiceTokenResponse {
  result: {
    client_id?: string;
    created_at?: unknown;
    duration?: string;
    expires_at?: string;
    id?: unknown;
    last_seen_at?: unknown;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteAServiceTokenResponse = Schema.Struct({
  result: Schema.Struct({
    client_id: Schema.optional(Schema.NullOr(Schema.String)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    duration: Schema.optional(Schema.NullOr(Schema.String)),
    expires_at: Schema.optional(Schema.NullOr(Schema.Date)),
    id: Schema.optional(Schema.NullOr(Schema.Unknown)),
    last_seen_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "DeleteAServiceTokenResponse",
}) as unknown as Schema.Schema<DeleteAServiceTokenResponse>;

export const deleteAServiceToken: (
  input: DeleteAServiceTokenRequest,
) => Effect.Effect<
  DeleteAServiceTokenResponse,
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
  input: DeleteAServiceTokenRequest,
  output: DeleteAServiceTokenResponse,
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

export interface AccessServiceTokensRefreshAServiceTokenRequest {
  service_token_id: string;
  account_id: string;
}

export const AccessServiceTokensRefreshAServiceTokenRequest = Schema.Struct({
  service_token_id: Schema.String.pipe(T.HttpPath("service_token_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/access/service_tokens/{service_token_id}/refresh",
    }),
  )
  .annotations({
    identifier: "AccessServiceTokensRefreshAServiceTokenRequest",
  }) as unknown as Schema.Schema<AccessServiceTokensRefreshAServiceTokenRequest>;

export interface AccessServiceTokensRefreshAServiceTokenResponse {
  result: {
    client_id?: string;
    created_at?: unknown;
    duration?: string;
    expires_at?: string;
    id?: unknown;
    last_seen_at?: unknown;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessServiceTokensRefreshAServiceTokenResponse = Schema.Struct({
  result: Schema.Struct({
    client_id: Schema.optional(Schema.NullOr(Schema.String)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    duration: Schema.optional(Schema.NullOr(Schema.String)),
    expires_at: Schema.optional(Schema.NullOr(Schema.Date)),
    id: Schema.optional(Schema.NullOr(Schema.Unknown)),
    last_seen_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "AccessServiceTokensRefreshAServiceTokenResponse",
}) as unknown as Schema.Schema<AccessServiceTokensRefreshAServiceTokenResponse>;

export const accessServiceTokensRefreshAServiceToken: (
  input: AccessServiceTokensRefreshAServiceTokenRequest,
) => Effect.Effect<
  AccessServiceTokensRefreshAServiceTokenResponse,
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
  input: AccessServiceTokensRefreshAServiceTokenRequest,
  output: AccessServiceTokensRefreshAServiceTokenResponse,
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

export interface AccessServiceTokensRotateAServiceTokenRequest {
  service_token_id: string;
  account_id: string;
  body: unknown;
}

export const AccessServiceTokensRotateAServiceTokenRequest = Schema.Struct({
  service_token_id: Schema.String.pipe(T.HttpPath("service_token_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/access/service_tokens/{service_token_id}/rotate",
    }),
  )
  .annotations({
    identifier: "AccessServiceTokensRotateAServiceTokenRequest",
  }) as unknown as Schema.Schema<AccessServiceTokensRotateAServiceTokenRequest>;

export interface AccessServiceTokensRotateAServiceTokenResponse {
  result: {
    client_id?: string;
    client_secret?: string;
    created_at?: unknown;
    duration?: string;
    id?: string;
    name?: string;
    updated_at?: unknown;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const AccessServiceTokensRotateAServiceTokenResponse = Schema.Struct({
  result: Schema.Struct({
    client_id: Schema.optional(Schema.NullOr(Schema.String)),
    client_secret: Schema.optional(Schema.NullOr(Schema.String)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    duration: Schema.optional(Schema.NullOr(Schema.String)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "AccessServiceTokensRotateAServiceTokenResponse",
}) as unknown as Schema.Schema<AccessServiceTokensRotateAServiceTokenResponse>;

export const accessServiceTokensRotateAServiceToken: (
  input: AccessServiceTokensRotateAServiceTokenRequest,
) => Effect.Effect<
  AccessServiceTokensRotateAServiceTokenResponse,
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
  input: AccessServiceTokensRotateAServiceTokenRequest,
  output: AccessServiceTokensRotateAServiceTokenResponse,
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

export interface ListTagsRequest {
  account_id: string;
  per_page?: number;
}

export const ListTagsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/tags" }))
  .annotations({ identifier: "ListTagsRequest" }) as unknown as Schema.Schema<ListTagsRequest>;

export interface ListTagsResponse {
  result: { app_count?: number; created_at?: unknown; name: string; updated_at?: unknown }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListTagsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      app_count: Schema.optional(Schema.NullOr(Schema.Number)),
      created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
      name: Schema.String,
      updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
}).annotations({ identifier: "ListTagsResponse" }) as unknown as Schema.Schema<ListTagsResponse>;

export const listTags: (
  input: ListTagsRequest,
) => Effect.Effect<
  ListTagsResponse,
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
  input: ListTagsRequest,
  output: ListTagsResponse,
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

export interface CreateTagRequest {
  account_id: string;
  body: unknown;
}

export const CreateTagRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/access/tags" }))
  .annotations({ identifier: "CreateTagRequest" }) as unknown as Schema.Schema<CreateTagRequest>;

export interface CreateTagResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateTagResponse = Schema.Struct({
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
}).annotations({ identifier: "CreateTagResponse" }) as unknown as Schema.Schema<CreateTagResponse>;

export const createTag: (
  input: CreateTagRequest,
) => Effect.Effect<
  CreateTagResponse,
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
  input: CreateTagRequest,
  output: CreateTagResponse,
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

export interface GetATagRequest {
  account_id: string;
  tag_name: string;
}

export const GetATagRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  tag_name: Schema.String.pipe(T.HttpPath("tag_name")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/tags/{tag_name}" }))
  .annotations({ identifier: "GetATagRequest" }) as unknown as Schema.Schema<GetATagRequest>;

export interface GetATagResponse {
  result: { app_count?: number; created_at?: unknown; name: string; updated_at?: unknown };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetATagResponse = Schema.Struct({
  result: Schema.Struct({
    app_count: Schema.optional(Schema.NullOr(Schema.Number)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    name: Schema.String,
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
}).annotations({ identifier: "GetATagResponse" }) as unknown as Schema.Schema<GetATagResponse>;

export const getATag: (
  input: GetATagRequest,
) => Effect.Effect<
  GetATagResponse,
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
  input: GetATagRequest,
  output: GetATagResponse,
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

export interface UpdateATagRequest {
  account_id: string;
  tag_name: string;
  body: { created_at?: unknown; name: string; updated_at?: unknown };
}

export const UpdateATagRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  tag_name: Schema.String.pipe(T.HttpPath("tag_name")),
  body: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    name: Schema.String,
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/access/tags/{tag_name}" }))
  .annotations({ identifier: "UpdateATagRequest" }) as unknown as Schema.Schema<UpdateATagRequest>;

export interface UpdateATagResponse {
  result: { app_count?: number; created_at?: unknown; name: string; updated_at?: unknown };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateATagResponse = Schema.Struct({
  result: Schema.Struct({
    app_count: Schema.optional(Schema.NullOr(Schema.Number)),
    created_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
    name: Schema.String,
    updated_at: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "UpdateATagResponse",
}) as unknown as Schema.Schema<UpdateATagResponse>;

export const updateATag: (
  input: UpdateATagRequest,
) => Effect.Effect<
  UpdateATagResponse,
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
  input: UpdateATagRequest,
  output: UpdateATagResponse,
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

export interface DeleteATagRequest {
  account_id: string;
  tag_name: string;
}

export const DeleteATagRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  tag_name: Schema.String.pipe(T.HttpPath("tag_name")),
})
  .pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/access/tags/{tag_name}" }))
  .annotations({ identifier: "DeleteATagRequest" }) as unknown as Schema.Schema<DeleteATagRequest>;

export interface DeleteATagResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteATagResponse = Schema.Struct({
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
  identifier: "DeleteATagResponse",
}) as unknown as Schema.Schema<DeleteATagResponse>;

export const deleteATag: (
  input: DeleteATagRequest,
) => Effect.Effect<
  DeleteATagResponse,
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
  input: DeleteATagRequest,
  output: DeleteATagResponse,
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

export interface GetUsersRequest {
  account_id: string;
  name?: string;
  email?: string;
  search?: string;
}

export const GetUsersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  email: Schema.optional(Schema.String).pipe(T.HttpQuery("email")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/access/users" }))
  .annotations({ identifier: "GetUsersRequest" }) as unknown as Schema.Schema<GetUsersRequest>;

export interface GetUsersResponse {
  result: {
    access_seat?: boolean;
    active_device_count?: number;
    created_at?: string;
    email?: string;
    gateway_seat?: boolean;
    id?: string;
    last_successful_login?: string;
    name?: string;
    seat_uid?: string;
    uid?: string;
    updated_at?: string;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetUsersResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      access_seat: Schema.optional(Schema.NullOr(Schema.Boolean)),
      active_device_count: Schema.optional(Schema.NullOr(Schema.Number)),
      created_at: Schema.optional(Schema.NullOr(Schema.Date)),
      email: Schema.optional(Schema.NullOr(Schema.String)),
      gateway_seat: Schema.optional(Schema.NullOr(Schema.Boolean)),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      last_successful_login: Schema.optional(Schema.NullOr(Schema.Date)),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      seat_uid: Schema.optional(Schema.NullOr(Schema.String)),
      uid: Schema.optional(Schema.NullOr(Schema.String)),
      updated_at: Schema.optional(Schema.NullOr(Schema.Date)),
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
}).annotations({ identifier: "GetUsersResponse" }) as unknown as Schema.Schema<GetUsersResponse>;

export const getUsers: (
  input: GetUsersRequest,
) => Effect.Effect<
  GetUsersResponse,
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
  input: GetUsersRequest,
  output: GetUsersResponse,
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

export interface GetActiveSessionsRequest {
  user_id: string;
  account_id: string;
}

export const GetActiveSessionsRequest = Schema.Struct({
  user_id: Schema.String.pipe(T.HttpPath("user_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/users/{user_id}/active_sessions",
    }),
  )
  .annotations({
    identifier: "GetActiveSessionsRequest",
  }) as unknown as Schema.Schema<GetActiveSessionsRequest>;

export interface GetActiveSessionsResponse {
  result: {
    expiration?: number;
    metadata?: {
      apps?: Record<string, unknown>;
      expires?: number;
      iat?: number;
      nonce?: string;
      ttl?: number;
    };
    name?: string;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetActiveSessionsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      expiration: Schema.optional(Schema.NullOr(Schema.Number)),
      metadata: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            apps: Schema.optional(
              Schema.NullOr(
                Schema.Record({
                  key: Schema.String,
                  value: Schema.Struct({
                    hostname: Schema.optional(Schema.NullOr(Schema.String)),
                    name: Schema.optional(Schema.NullOr(Schema.String)),
                    type: Schema.optional(Schema.NullOr(Schema.String)),
                    uid: Schema.optional(Schema.NullOr(Schema.String)),
                  }),
                }),
              ),
            ),
            expires: Schema.optional(Schema.NullOr(Schema.Number)),
            iat: Schema.optional(Schema.NullOr(Schema.Number)),
            nonce: Schema.optional(Schema.NullOr(Schema.String)),
            ttl: Schema.optional(Schema.NullOr(Schema.Number)),
          }),
        ),
      ),
      name: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "GetActiveSessionsResponse",
}) as unknown as Schema.Schema<GetActiveSessionsResponse>;

export const getActiveSessions: (
  input: GetActiveSessionsRequest,
) => Effect.Effect<
  GetActiveSessionsResponse,
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
  input: GetActiveSessionsRequest,
  output: GetActiveSessionsResponse,
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

export interface GetActiveSessionRequest {
  user_id: string;
  account_id: string;
  nonce: string;
}

export const GetActiveSessionRequest = Schema.Struct({
  user_id: Schema.String.pipe(T.HttpPath("user_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  nonce: Schema.String.pipe(T.HttpPath("nonce")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/users/{user_id}/active_sessions/{nonce}",
    }),
  )
  .annotations({
    identifier: "GetActiveSessionRequest",
  }) as unknown as Schema.Schema<GetActiveSessionRequest>;

export interface GetActiveSessionResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetActiveSessionResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "GetActiveSessionResponse",
}) as unknown as Schema.Schema<GetActiveSessionResponse>;

export const getActiveSession: (
  input: GetActiveSessionRequest,
) => Effect.Effect<
  GetActiveSessionResponse,
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
  input: GetActiveSessionRequest,
  output: GetActiveSessionResponse,
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

export interface GetFailedLoginsRequest {
  user_id: string;
  account_id: string;
}

export const GetFailedLoginsRequest = Schema.Struct({
  user_id: Schema.String.pipe(T.HttpPath("user_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({ method: "GET", path: "/accounts/{account_id}/access/users/{user_id}/failed_logins" }),
  )
  .annotations({
    identifier: "GetFailedLoginsRequest",
  }) as unknown as Schema.Schema<GetFailedLoginsRequest>;

export interface GetFailedLoginsResponse {
  result: { expiration?: number; metadata?: Record<string, unknown> }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetFailedLoginsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      expiration: Schema.optional(Schema.NullOr(Schema.Number)),
      metadata: Schema.optional(Schema.NullOr(Schema.Struct({}))),
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
  identifier: "GetFailedLoginsResponse",
}) as unknown as Schema.Schema<GetFailedLoginsResponse>;

export const getFailedLogins: (
  input: GetFailedLoginsRequest,
) => Effect.Effect<
  GetFailedLoginsResponse,
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
  input: GetFailedLoginsRequest,
  output: GetFailedLoginsResponse,
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

export interface GetLastSeenIdentityRequest {
  user_id: string;
  account_id: string;
}

export const GetLastSeenIdentityRequest = Schema.Struct({
  user_id: Schema.String.pipe(T.HttpPath("user_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/access/users/{user_id}/last_seen_identity",
    }),
  )
  .annotations({
    identifier: "GetLastSeenIdentityRequest",
  }) as unknown as Schema.Schema<GetLastSeenIdentityRequest>;

export interface GetLastSeenIdentityResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetLastSeenIdentityResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "GetLastSeenIdentityResponse",
}) as unknown as Schema.Schema<GetLastSeenIdentityResponse>;

export const getLastSeenIdentity: (
  input: GetLastSeenIdentityRequest,
) => Effect.Effect<
  GetLastSeenIdentityResponse,
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
  input: GetLastSeenIdentityRequest,
  output: GetLastSeenIdentityResponse,
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
