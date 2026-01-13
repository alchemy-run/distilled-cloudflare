/**
 * Cloudflare USERS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service users
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

export interface UserListusertenantsRequest {}

export const UserListusertenantsRequest = Schema.Struct({})
  .pipe(T.Http({ method: "GET", path: "/users/tenants" }))
  .annotations({
    identifier: "UserListusertenantsRequest",
  }) as unknown as Schema.Schema<UserListusertenantsRequest>;

export interface UserListusertenantsResponse {
  result: {
    create_time: string;
    id: unknown;
    meta: { flags?: unknown; managed_by?: string };
    name: string;
    parent?: { id: string; name: string };
    profile?: {
      business_address: string;
      business_email: string;
      business_name: string;
      business_phone: string;
      external_metadata: string;
    };
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UserListusertenantsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      create_time: Schema.Date,
      id: Schema.String,
      meta: Schema.Struct({
        flags: Schema.optional(
          Schema.NullOr(
            Schema.Struct({
              account_creation: Schema.String,
              account_deletion: Schema.String,
              account_migration: Schema.String,
              account_mobility: Schema.String,
              sub_org_creation: Schema.String,
            }),
          ),
        ),
        managed_by: Schema.optional(Schema.NullOr(Schema.String)),
      }),
      name: Schema.String,
      parent: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
          }),
        ),
      ),
      profile: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            business_address: Schema.String,
            business_email: Schema.String,
            business_name: Schema.String,
            business_phone: Schema.String,
            external_metadata: Schema.String,
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
  identifier: "UserListusertenantsResponse",
}) as unknown as Schema.Schema<UserListusertenantsResponse>;

export const userListusertenants: (
  input: UserListusertenantsRequest,
) => Effect.Effect<
  UserListusertenantsResponse,
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
  input: UserListusertenantsRequest,
  output: UserListusertenantsResponse,
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
