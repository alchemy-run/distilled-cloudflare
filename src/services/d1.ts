/**
 * Cloudflare D1 API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service d1
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

export interface ListDatabasesRequest {
  account_id: string;
  name?: string;
  page?: number;
  per_page?: number;
}

export const ListDatabasesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/d1/database" }))
  .annotations({
    identifier: "ListDatabasesRequest",
  }) as unknown as Schema.Schema<ListDatabasesRequest>;

export interface ListDatabasesResponse {
  result: { created_at?: string; name?: string; uuid?: string; version?: string }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListDatabasesResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      created_at: Schema.optional(Schema.NullOr(Schema.Date)),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      uuid: Schema.optional(Schema.NullOr(Schema.String)),
      version: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "ListDatabasesResponse",
}) as unknown as Schema.Schema<ListDatabasesResponse>;

export const listDatabases: (
  input: ListDatabasesRequest,
) => Effect.Effect<
  ListDatabasesResponse,
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
  input: ListDatabasesRequest,
  output: ListDatabasesResponse,
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

export interface CreateDatabaseRequest {
  account_id: string;
  body: {
    jurisdiction?: "eu" | "fedramp";
    name: string;
    primary_location_hint?: "wnam" | "enam" | "weur" | "eeur" | "apac" | "oc";
  };
}

export const CreateDatabaseRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    jurisdiction: Schema.optional(Schema.NullOr(Schema.Literal("eu", "fedramp"))),
    name: Schema.String,
    primary_location_hint: Schema.optional(
      Schema.NullOr(Schema.Literal("wnam", "enam", "weur", "eeur", "apac", "oc")),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/d1/database" }))
  .annotations({
    identifier: "CreateDatabaseRequest",
  }) as unknown as Schema.Schema<CreateDatabaseRequest>;

export interface CreateDatabaseResponse {
  result: {
    created_at?: string;
    file_size?: number;
    name?: string;
    num_tables?: number;
    read_replication?: { mode: "auto" | "disabled" };
    uuid?: string;
    version?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateDatabaseResponse = Schema.Struct({
  result: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    file_size: Schema.optional(Schema.NullOr(Schema.Number)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    num_tables: Schema.optional(Schema.NullOr(Schema.Number)),
    read_replication: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          mode: Schema.Literal("auto", "disabled"),
        }),
      ),
    ),
    uuid: Schema.optional(Schema.NullOr(Schema.String)),
    version: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "CreateDatabaseResponse",
}) as unknown as Schema.Schema<CreateDatabaseResponse>;

export const createDatabase: (
  input: CreateDatabaseRequest,
) => Effect.Effect<
  CreateDatabaseResponse,
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
  input: CreateDatabaseRequest,
  output: CreateDatabaseResponse,
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

export interface GetDatabaseRequest {
  account_id: string;
  database_id: unknown;
}

export const GetDatabaseRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.Union(Schema.String, Schema.String).pipe(T.HttpPath("database_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/d1/database/{database_id}" }))
  .annotations({
    identifier: "GetDatabaseRequest",
  }) as unknown as Schema.Schema<GetDatabaseRequest>;

export interface GetDatabaseResponse {
  result: {
    created_at?: string;
    file_size?: number;
    name?: string;
    num_tables?: number;
    read_replication?: { mode: "auto" | "disabled" };
    uuid?: string;
    version?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetDatabaseResponse = Schema.Struct({
  result: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    file_size: Schema.optional(Schema.NullOr(Schema.Number)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    num_tables: Schema.optional(Schema.NullOr(Schema.Number)),
    read_replication: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          mode: Schema.Literal("auto", "disabled"),
        }),
      ),
    ),
    uuid: Schema.optional(Schema.NullOr(Schema.String)),
    version: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "GetDatabaseResponse",
}) as unknown as Schema.Schema<GetDatabaseResponse>;

export const getDatabase: (
  input: GetDatabaseRequest,
) => Effect.Effect<
  GetDatabaseResponse,
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
  input: GetDatabaseRequest,
  output: GetDatabaseResponse,
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

export interface UpdateDatabaseRequest {
  account_id: string;
  database_id: string;
  body: { read_replication: { mode: "auto" | "disabled" } };
}

export const UpdateDatabaseRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.String.pipe(T.HttpPath("database_id")),
  body: Schema.Struct({
    read_replication: Schema.Struct({
      mode: Schema.Literal("auto", "disabled"),
    }),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/d1/database/{database_id}" }))
  .annotations({
    identifier: "UpdateDatabaseRequest",
  }) as unknown as Schema.Schema<UpdateDatabaseRequest>;

export interface UpdateDatabaseResponse {
  result: {
    created_at?: string;
    file_size?: number;
    name?: string;
    num_tables?: number;
    read_replication?: { mode: "auto" | "disabled" };
    uuid?: string;
    version?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateDatabaseResponse = Schema.Struct({
  result: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    file_size: Schema.optional(Schema.NullOr(Schema.Number)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    num_tables: Schema.optional(Schema.NullOr(Schema.Number)),
    read_replication: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          mode: Schema.Literal("auto", "disabled"),
        }),
      ),
    ),
    uuid: Schema.optional(Schema.NullOr(Schema.String)),
    version: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "UpdateDatabaseResponse",
}) as unknown as Schema.Schema<UpdateDatabaseResponse>;

export const updateDatabase: (
  input: UpdateDatabaseRequest,
) => Effect.Effect<
  UpdateDatabaseResponse,
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
  input: UpdateDatabaseRequest,
  output: UpdateDatabaseResponse,
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

export interface DeleteDatabaseRequest {
  account_id: string;
  database_id: string;
}

export const DeleteDatabaseRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.String.pipe(T.HttpPath("database_id")),
})
  .pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/d1/database/{database_id}" }))
  .annotations({
    identifier: "DeleteDatabaseRequest",
  }) as unknown as Schema.Schema<DeleteDatabaseRequest>;

export interface DeleteDatabaseResponse {
  result: null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteDatabaseResponse = Schema.Struct({
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
  identifier: "DeleteDatabaseResponse",
}) as unknown as Schema.Schema<DeleteDatabaseResponse>;

export const deleteDatabase: (
  input: DeleteDatabaseRequest,
) => Effect.Effect<
  DeleteDatabaseResponse,
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
  input: DeleteDatabaseRequest,
  output: DeleteDatabaseResponse,
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

export interface UpdatePartialDatabaseRequest {
  account_id: string;
  database_id: string;
  body: { read_replication?: { mode: "auto" | "disabled" } };
}

export const UpdatePartialDatabaseRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.String.pipe(T.HttpPath("database_id")),
  body: Schema.Struct({
    read_replication: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          mode: Schema.Literal("auto", "disabled"),
        }),
      ),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PATCH", path: "/accounts/{account_id}/d1/database/{database_id}" }))
  .annotations({
    identifier: "UpdatePartialDatabaseRequest",
  }) as unknown as Schema.Schema<UpdatePartialDatabaseRequest>;

export interface UpdatePartialDatabaseResponse {
  result: {
    created_at?: string;
    file_size?: number;
    name?: string;
    num_tables?: number;
    read_replication?: { mode: "auto" | "disabled" };
    uuid?: string;
    version?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdatePartialDatabaseResponse = Schema.Struct({
  result: Schema.Struct({
    created_at: Schema.optional(Schema.NullOr(Schema.Date)),
    file_size: Schema.optional(Schema.NullOr(Schema.Number)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    num_tables: Schema.optional(Schema.NullOr(Schema.Number)),
    read_replication: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          mode: Schema.Literal("auto", "disabled"),
        }),
      ),
    ),
    uuid: Schema.optional(Schema.NullOr(Schema.String)),
    version: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "UpdatePartialDatabaseResponse",
}) as unknown as Schema.Schema<UpdatePartialDatabaseResponse>;

export const updatePartialDatabase: (
  input: UpdatePartialDatabaseRequest,
) => Effect.Effect<
  UpdatePartialDatabaseResponse,
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
  input: UpdatePartialDatabaseRequest,
  output: UpdatePartialDatabaseResponse,
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

export interface CloudflareD1ExportDatabaseRequest {
  account_id: string;
  database_id: string;
  body: {
    current_bookmark?: string;
    dump_options?: { no_data?: boolean; no_schema?: boolean; tables?: string[] };
    output_format: "polling";
  };
}

export const CloudflareD1ExportDatabaseRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.String.pipe(T.HttpPath("database_id")),
  body: Schema.Struct({
    current_bookmark: Schema.optional(Schema.NullOr(Schema.String)),
    dump_options: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          no_data: Schema.optional(Schema.NullOr(Schema.Boolean)),
          no_schema: Schema.optional(Schema.NullOr(Schema.Boolean)),
          tables: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
        }),
      ),
    ),
    output_format: Schema.Literal("polling"),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/d1/database/{database_id}/export" }))
  .annotations({
    identifier: "CloudflareD1ExportDatabaseRequest",
  }) as unknown as Schema.Schema<CloudflareD1ExportDatabaseRequest>;

export interface CloudflareD1ExportDatabaseResponse {
  result: {
    at_bookmark?: string;
    error?: string;
    messages?: string[];
    result?: { filename?: string; signed_url?: string };
    status?: "complete" | "error";
    success?: boolean;
    type?: "export";
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CloudflareD1ExportDatabaseResponse = Schema.Struct({
  result: Schema.Struct({
    at_bookmark: Schema.optional(Schema.NullOr(Schema.String)),
    error: Schema.optional(Schema.NullOr(Schema.String)),
    messages: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
    result: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          filename: Schema.optional(Schema.NullOr(Schema.String)),
          signed_url: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    status: Schema.optional(Schema.NullOr(Schema.Literal("complete", "error"))),
    success: Schema.optional(Schema.NullOr(Schema.Boolean)),
    type: Schema.optional(Schema.NullOr(Schema.Literal("export"))),
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
  identifier: "CloudflareD1ExportDatabaseResponse",
}) as unknown as Schema.Schema<CloudflareD1ExportDatabaseResponse>;

export const cloudflareD1ExportDatabase: (
  input: CloudflareD1ExportDatabaseRequest,
) => Effect.Effect<
  CloudflareD1ExportDatabaseResponse,
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
  input: CloudflareD1ExportDatabaseRequest,
  output: CloudflareD1ExportDatabaseResponse,
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

export interface CloudflareD1ImportDatabaseRequest {
  account_id: string;
  database_id: string;
  body: unknown;
}

export const CloudflareD1ImportDatabaseRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.String.pipe(T.HttpPath("database_id")),
  body: Schema.Union(
    Schema.Struct({
      action: Schema.Literal("init"),
      etag: Schema.String,
    }),
    Schema.Struct({
      action: Schema.Literal("ingest"),
      etag: Schema.String,
      filename: Schema.String,
    }),
    Schema.Struct({
      action: Schema.Literal("poll"),
      current_bookmark: Schema.String,
    }),
  ).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/d1/database/{database_id}/import" }))
  .annotations({
    identifier: "CloudflareD1ImportDatabaseRequest",
  }) as unknown as Schema.Schema<CloudflareD1ImportDatabaseRequest>;

export interface CloudflareD1ImportDatabaseResponse {
  result: {
    at_bookmark?: string;
    error?: string;
    filename?: string;
    messages?: string[];
    result?: {
      final_bookmark?: string;
      meta?: {
        changed_db?: boolean;
        changes?: number;
        duration?: number;
        last_row_id?: number;
        rows_read?: number;
        rows_written?: number;
        served_by_colo?: string;
        served_by_primary?: boolean;
        served_by_region?: "WNAM" | "ENAM" | "WEUR" | "EEUR" | "APAC" | "OC";
        size_after?: number;
        timings?: { sql_duration_ms?: number };
      };
      num_queries?: number;
    };
    status?: "complete" | "error";
    success?: boolean;
    type?: "import";
    upload_url?: string;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CloudflareD1ImportDatabaseResponse = Schema.Struct({
  result: Schema.Struct({
    at_bookmark: Schema.optional(Schema.NullOr(Schema.String)),
    error: Schema.optional(Schema.NullOr(Schema.String)),
    filename: Schema.optional(Schema.NullOr(Schema.String)),
    messages: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
    result: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          final_bookmark: Schema.optional(Schema.NullOr(Schema.String)),
          meta: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                changed_db: Schema.optional(Schema.NullOr(Schema.Boolean)),
                changes: Schema.optional(Schema.NullOr(Schema.Number)),
                duration: Schema.optional(Schema.NullOr(Schema.Number)),
                last_row_id: Schema.optional(Schema.NullOr(Schema.Number)),
                rows_read: Schema.optional(Schema.NullOr(Schema.Number)),
                rows_written: Schema.optional(Schema.NullOr(Schema.Number)),
                served_by_colo: Schema.optional(Schema.NullOr(Schema.String)),
                served_by_primary: Schema.optional(Schema.NullOr(Schema.Boolean)),
                served_by_region: Schema.optional(
                  Schema.NullOr(Schema.Literal("WNAM", "ENAM", "WEUR", "EEUR", "APAC", "OC")),
                ),
                size_after: Schema.optional(Schema.NullOr(Schema.Number)),
                timings: Schema.optional(
                  Schema.NullOr(
                    Schema.Struct({
                      sql_duration_ms: Schema.optional(Schema.NullOr(Schema.Number)),
                    }),
                  ),
                ),
              }),
            ),
          ),
          num_queries: Schema.optional(Schema.NullOr(Schema.Number)),
        }),
      ),
    ),
    status: Schema.optional(Schema.NullOr(Schema.Literal("complete", "error"))),
    success: Schema.optional(Schema.NullOr(Schema.Boolean)),
    type: Schema.optional(Schema.NullOr(Schema.Literal("import"))),
    upload_url: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "CloudflareD1ImportDatabaseResponse",
}) as unknown as Schema.Schema<CloudflareD1ImportDatabaseResponse>;

export const cloudflareD1ImportDatabase: (
  input: CloudflareD1ImportDatabaseRequest,
) => Effect.Effect<
  CloudflareD1ImportDatabaseResponse,
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
  input: CloudflareD1ImportDatabaseRequest,
  output: CloudflareD1ImportDatabaseResponse,
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

export interface CloudflareD1QueryDatabaseRequest {
  account_id: string;
  database_id: string;
  body: unknown;
}

export const CloudflareD1QueryDatabaseRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.String.pipe(T.HttpPath("database_id")),
  body: Schema.Union(
    Schema.Struct({
      params: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      sql: Schema.String,
    }),
    Schema.Struct({
      batch: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              params: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
              sql: Schema.String,
            }),
          ),
        ),
      ),
    }),
  ).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/d1/database/{database_id}/query" }))
  .annotations({
    identifier: "CloudflareD1QueryDatabaseRequest",
  }) as unknown as Schema.Schema<CloudflareD1QueryDatabaseRequest>;

export interface CloudflareD1QueryDatabaseResponse {
  result: {
    meta?: {
      changed_db?: boolean;
      changes?: number;
      duration?: number;
      last_row_id?: number;
      rows_read?: number;
      rows_written?: number;
      served_by_colo?: string;
      served_by_primary?: boolean;
      served_by_region?: "WNAM" | "ENAM" | "WEUR" | "EEUR" | "APAC" | "OC";
      size_after?: number;
      timings?: { sql_duration_ms?: number };
    };
    results?: Record<string, unknown>[];
    success?: boolean;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CloudflareD1QueryDatabaseResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      meta: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            changed_db: Schema.optional(Schema.NullOr(Schema.Boolean)),
            changes: Schema.optional(Schema.NullOr(Schema.Number)),
            duration: Schema.optional(Schema.NullOr(Schema.Number)),
            last_row_id: Schema.optional(Schema.NullOr(Schema.Number)),
            rows_read: Schema.optional(Schema.NullOr(Schema.Number)),
            rows_written: Schema.optional(Schema.NullOr(Schema.Number)),
            served_by_colo: Schema.optional(Schema.NullOr(Schema.String)),
            served_by_primary: Schema.optional(Schema.NullOr(Schema.Boolean)),
            served_by_region: Schema.optional(
              Schema.NullOr(Schema.Literal("WNAM", "ENAM", "WEUR", "EEUR", "APAC", "OC")),
            ),
            size_after: Schema.optional(Schema.NullOr(Schema.Number)),
            timings: Schema.optional(
              Schema.NullOr(
                Schema.Struct({
                  sql_duration_ms: Schema.optional(Schema.NullOr(Schema.Number)),
                }),
              ),
            ),
          }),
        ),
      ),
      results: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
      success: Schema.optional(Schema.NullOr(Schema.Boolean)),
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
  identifier: "CloudflareD1QueryDatabaseResponse",
}) as unknown as Schema.Schema<CloudflareD1QueryDatabaseResponse>;

export const cloudflareD1QueryDatabase: (
  input: CloudflareD1QueryDatabaseRequest,
) => Effect.Effect<
  CloudflareD1QueryDatabaseResponse,
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
  input: CloudflareD1QueryDatabaseRequest,
  output: CloudflareD1QueryDatabaseResponse,
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

export interface CloudflareD1RawDatabaseQueryRequest {
  account_id: string;
  database_id: string;
  body: unknown;
}

export const CloudflareD1RawDatabaseQueryRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.String.pipe(T.HttpPath("database_id")),
  body: Schema.Union(
    Schema.Struct({
      params: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      sql: Schema.String,
    }),
    Schema.Struct({
      batch: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              params: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
              sql: Schema.String,
            }),
          ),
        ),
      ),
    }),
  ).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/d1/database/{database_id}/raw" }))
  .annotations({
    identifier: "CloudflareD1RawDatabaseQueryRequest",
  }) as unknown as Schema.Schema<CloudflareD1RawDatabaseQueryRequest>;

export interface CloudflareD1RawDatabaseQueryResponse {
  result: {
    meta?: {
      changed_db?: boolean;
      changes?: number;
      duration?: number;
      last_row_id?: number;
      rows_read?: number;
      rows_written?: number;
      served_by_colo?: string;
      served_by_primary?: boolean;
      served_by_region?: "WNAM" | "ENAM" | "WEUR" | "EEUR" | "APAC" | "OC";
      size_after?: number;
      timings?: { sql_duration_ms?: number };
    };
    results?: { columns?: string[]; rows?: unknown[][] };
    success?: boolean;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CloudflareD1RawDatabaseQueryResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      meta: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            changed_db: Schema.optional(Schema.NullOr(Schema.Boolean)),
            changes: Schema.optional(Schema.NullOr(Schema.Number)),
            duration: Schema.optional(Schema.NullOr(Schema.Number)),
            last_row_id: Schema.optional(Schema.NullOr(Schema.Number)),
            rows_read: Schema.optional(Schema.NullOr(Schema.Number)),
            rows_written: Schema.optional(Schema.NullOr(Schema.Number)),
            served_by_colo: Schema.optional(Schema.NullOr(Schema.String)),
            served_by_primary: Schema.optional(Schema.NullOr(Schema.Boolean)),
            served_by_region: Schema.optional(
              Schema.NullOr(Schema.Literal("WNAM", "ENAM", "WEUR", "EEUR", "APAC", "OC")),
            ),
            size_after: Schema.optional(Schema.NullOr(Schema.Number)),
            timings: Schema.optional(
              Schema.NullOr(
                Schema.Struct({
                  sql_duration_ms: Schema.optional(Schema.NullOr(Schema.Number)),
                }),
              ),
            ),
          }),
        ),
      ),
      results: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            columns: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
            rows: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Array(Schema.Union(Schema.Number, Schema.String, Schema.Struct({}))),
                ),
              ),
            ),
          }),
        ),
      ),
      success: Schema.optional(Schema.NullOr(Schema.Boolean)),
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
  identifier: "CloudflareD1RawDatabaseQueryResponse",
}) as unknown as Schema.Schema<CloudflareD1RawDatabaseQueryResponse>;

export const cloudflareD1RawDatabaseQuery: (
  input: CloudflareD1RawDatabaseQueryRequest,
) => Effect.Effect<
  CloudflareD1RawDatabaseQueryResponse,
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
  input: CloudflareD1RawDatabaseQueryRequest,
  output: CloudflareD1RawDatabaseQueryResponse,
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

export interface GetBookmarkRequest {
  account_id: string;
  database_id: string;
  timestamp?: string;
}

export const GetBookmarkRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.String.pipe(T.HttpPath("database_id")),
  timestamp: Schema.optional(Schema.Date).pipe(T.HttpQuery("timestamp")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/d1/database/{database_id}/time_travel/bookmark",
    }),
  )
  .annotations({
    identifier: "GetBookmarkRequest",
  }) as unknown as Schema.Schema<GetBookmarkRequest>;

export interface GetBookmarkResponse {
  result: { bookmark?: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetBookmarkResponse = Schema.Struct({
  result: Schema.Struct({
    bookmark: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "GetBookmarkResponse",
}) as unknown as Schema.Schema<GetBookmarkResponse>;

export const getBookmark: (
  input: GetBookmarkRequest,
) => Effect.Effect<
  GetBookmarkResponse,
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
  input: GetBookmarkRequest,
  output: GetBookmarkResponse,
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

export interface CloudflareD1TimeTravelRestoreRequest {
  account_id: string;
  database_id: string;
  bookmark?: string;
  timestamp?: string;
}

export const CloudflareD1TimeTravelRestoreRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  database_id: Schema.String.pipe(T.HttpPath("database_id")),
  bookmark: Schema.optional(Schema.String).pipe(T.HttpQuery("bookmark")),
  timestamp: Schema.optional(Schema.Date).pipe(T.HttpQuery("timestamp")),
})
  .pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/d1/database/{database_id}/time_travel/restore",
    }),
  )
  .annotations({
    identifier: "CloudflareD1TimeTravelRestoreRequest",
  }) as unknown as Schema.Schema<CloudflareD1TimeTravelRestoreRequest>;

export interface CloudflareD1TimeTravelRestoreResponse {
  result: { bookmark?: unknown; message?: string; previous_bookmark?: unknown };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CloudflareD1TimeTravelRestoreResponse = Schema.Struct({
  result: Schema.Struct({
    bookmark: Schema.optional(Schema.NullOr(Schema.Unknown)),
    message: Schema.optional(Schema.NullOr(Schema.String)),
    previous_bookmark: Schema.optional(Schema.NullOr(Schema.Unknown)),
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
  identifier: "CloudflareD1TimeTravelRestoreResponse",
}) as unknown as Schema.Schema<CloudflareD1TimeTravelRestoreResponse>;

export const cloudflareD1TimeTravelRestore: (
  input: CloudflareD1TimeTravelRestoreRequest,
) => Effect.Effect<
  CloudflareD1TimeTravelRestoreResponse,
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
  input: CloudflareD1TimeTravelRestoreRequest,
  output: CloudflareD1TimeTravelRestoreResponse,
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
