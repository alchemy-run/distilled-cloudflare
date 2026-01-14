/**
 * Cloudflare IPS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service ips
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

export interface CloudflareIpsCloudflareIpDetailsRequest {
  networks?: string;
}

export const CloudflareIpsCloudflareIpDetailsRequest = Schema.Struct({
  networks: Schema.optional(Schema.String).pipe(T.HttpQuery("networks")),
})
  .pipe(T.Http({ method: "GET", path: "/ips" }))
  .annotations({
    identifier: "CloudflareIpsCloudflareIpDetailsRequest",
  }) as unknown as Schema.Schema<CloudflareIpsCloudflareIpDetailsRequest>;

export interface CloudflareIpsCloudflareIpDetailsResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CloudflareIpsCloudflareIpDetailsResponse = Schema.Struct({
  result: Schema.Union(
    Schema.Struct({
      etag: Schema.optional(Schema.NullOr(Schema.String)),
      ipv4_cidrs: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      ipv6_cidrs: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
    }),
    Schema.Struct({
      etag: Schema.optional(Schema.NullOr(Schema.String)),
      ipv4_cidrs: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      ipv6_cidrs: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      jdcloud_cidrs: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
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
  identifier: "CloudflareIpsCloudflareIpDetailsResponse",
}) as unknown as Schema.Schema<CloudflareIpsCloudflareIpDetailsResponse>;

export const cloudflareIpsCloudflareIpDetails: (
  input: CloudflareIpsCloudflareIpDetailsRequest,
) => Effect.Effect<
  CloudflareIpsCloudflareIpDetailsResponse,
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
  input: CloudflareIpsCloudflareIpDetailsRequest,
  output: CloudflareIpsCloudflareIpDetailsResponse,
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
