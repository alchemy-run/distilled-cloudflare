/**
 * Cloudflare MEMBERSHIPS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service memberships
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

export interface ListMembershipsRequest {
  "account.name"?: string;
  page?: number;
  per_page?: number;
  order?: "id" | "account.name" | "status";
  direction?: "asc" | "desc";
  name?: string;
  status?: "accepted" | "pending" | "rejected";
}

export const ListMembershipsRequest = Schema.Struct({
  "account.name": Schema.optional(Schema.String).pipe(T.HttpQuery("account.name")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("id", "account.name", "status")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  status: Schema.optional(Schema.Literal("accepted", "pending", "rejected")).pipe(
    T.HttpQuery("status"),
  ),
})
  .pipe(T.Http({ method: "GET", path: "/memberships" }))
  .annotations({
    identifier: "ListMembershipsRequest",
  }) as unknown as Schema.Schema<ListMembershipsRequest>;

export interface ListMembershipsResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListMembershipsResponse = Schema.Struct({
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
  identifier: "ListMembershipsResponse",
}) as unknown as Schema.Schema<ListMembershipsResponse>;

export const listMemberships: (
  input: ListMembershipsRequest,
) => Effect.Effect<
  ListMembershipsResponse,
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
  input: ListMembershipsRequest,
  output: ListMembershipsResponse,
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

export interface UserSAccountMembershipsMembershipDetailsRequest {
  membership_id: string;
}

export const UserSAccountMembershipsMembershipDetailsRequest = Schema.Struct({
  membership_id: Schema.String.pipe(T.HttpPath("membership_id")),
})
  .pipe(T.Http({ method: "GET", path: "/memberships/{membership_id}" }))
  .annotations({
    identifier: "UserSAccountMembershipsMembershipDetailsRequest",
  }) as unknown as Schema.Schema<UserSAccountMembershipsMembershipDetailsRequest>;

export interface UserSAccountMembershipsMembershipDetailsResponse {
  result: {
    account?: unknown;
    api_access_enabled?: boolean;
    id?: string;
    permissions?: unknown;
    policies?: unknown[];
    roles?: string[];
    status?: "accepted" | "pending" | "rejected";
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UserSAccountMembershipsMembershipDetailsResponse = Schema.Struct({
  result: Schema.Struct({
    account: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          created_on: Schema.optional(Schema.NullOr(Schema.Date)),
          id: Schema.String,
          managed_by: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                parent_org_id: Schema.optional(Schema.NullOr(Schema.String)),
                parent_org_name: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            ),
          ),
          name: Schema.String,
          settings: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                abuse_contact_email: Schema.optional(Schema.NullOr(Schema.String)),
                enforce_twofactor: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          type: Schema.Literal("standard", "enterprise"),
        }),
      ),
    ),
    api_access_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    permissions: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          analytics: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          billing: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          cache_purge: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          dns: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          dns_records: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          lb: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          logs: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          organization: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          ssl: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          waf: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          zone_settings: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          zones: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
        }),
      ),
    ),
    policies: Schema.optional(Schema.NullOr(Schema.Array(Schema.Unknown))),
    roles: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
    status: Schema.optional(Schema.NullOr(Schema.Literal("accepted", "pending", "rejected"))),
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
  identifier: "UserSAccountMembershipsMembershipDetailsResponse",
}) as unknown as Schema.Schema<UserSAccountMembershipsMembershipDetailsResponse>;

export const userSAccountMembershipsMembershipDetails: (
  input: UserSAccountMembershipsMembershipDetailsRequest,
) => Effect.Effect<
  UserSAccountMembershipsMembershipDetailsResponse,
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
  input: UserSAccountMembershipsMembershipDetailsRequest,
  output: UserSAccountMembershipsMembershipDetailsResponse,
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

export interface UpdateMembershipRequest {
  membership_id: string;
  body: unknown;
}

export const UpdateMembershipRequest = Schema.Struct({
  membership_id: Schema.String.pipe(T.HttpPath("membership_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/memberships/{membership_id}" }))
  .annotations({
    identifier: "UpdateMembershipRequest",
  }) as unknown as Schema.Schema<UpdateMembershipRequest>;

export interface UpdateMembershipResponse {
  result: {
    account?: unknown;
    api_access_enabled?: boolean;
    id?: string;
    permissions?: unknown;
    policies?: unknown[];
    roles?: string[];
    status?: "accepted" | "pending" | "rejected";
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateMembershipResponse = Schema.Struct({
  result: Schema.Struct({
    account: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          created_on: Schema.optional(Schema.NullOr(Schema.Date)),
          id: Schema.String,
          managed_by: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                parent_org_id: Schema.optional(Schema.NullOr(Schema.String)),
                parent_org_name: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            ),
          ),
          name: Schema.String,
          settings: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                abuse_contact_email: Schema.optional(Schema.NullOr(Schema.String)),
                enforce_twofactor: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          type: Schema.Literal("standard", "enterprise"),
        }),
      ),
    ),
    api_access_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    permissions: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          analytics: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          billing: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          cache_purge: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          dns: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          dns_records: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          lb: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          logs: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          organization: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          ssl: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          waf: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          zone_settings: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
          zones: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                read: Schema.optional(Schema.NullOr(Schema.Boolean)),
                write: Schema.optional(Schema.NullOr(Schema.Boolean)),
              }),
            ),
          ),
        }),
      ),
    ),
    policies: Schema.optional(Schema.NullOr(Schema.Array(Schema.Unknown))),
    roles: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
    status: Schema.optional(Schema.NullOr(Schema.Literal("accepted", "pending", "rejected"))),
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
  identifier: "UpdateMembershipResponse",
}) as unknown as Schema.Schema<UpdateMembershipResponse>;

export const updateMembership: (
  input: UpdateMembershipRequest,
) => Effect.Effect<
  UpdateMembershipResponse,
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
  input: UpdateMembershipRequest,
  output: UpdateMembershipResponse,
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

export interface DeleteMembershipRequest {
  membership_id: string;
}

export const DeleteMembershipRequest = Schema.Struct({
  membership_id: Schema.String.pipe(T.HttpPath("membership_id")),
})
  .pipe(T.Http({ method: "DELETE", path: "/memberships/{membership_id}" }))
  .annotations({
    identifier: "DeleteMembershipRequest",
  }) as unknown as Schema.Schema<DeleteMembershipRequest>;

export interface DeleteMembershipResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteMembershipResponse = Schema.Struct({
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
  identifier: "DeleteMembershipResponse",
}) as unknown as Schema.Schema<DeleteMembershipResponse>;

export const deleteMembership: (
  input: DeleteMembershipRequest,
) => Effect.Effect<
  DeleteMembershipResponse,
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
  input: DeleteMembershipRequest,
  output: DeleteMembershipResponse,
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
