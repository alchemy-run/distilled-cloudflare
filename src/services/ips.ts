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

export interface CloudflareIpsCloudflareIpDetailsRequest {
  networks?: string;
}

export const CloudflareIpsCloudflareIpDetailsRequest = Schema.Struct({
  networks: Schema.optional(Schema.String).pipe(T.HttpQuery("networks"))
}).pipe(
  T.Http({ method: "GET", path: "/ips" }),
).annotations({ identifier: "CloudflareIpsCloudflareIpDetailsRequest" }) as unknown as Schema.Schema<CloudflareIpsCloudflareIpDetailsRequest>;

export interface CloudflareIpsCloudflareIpDetailsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CloudflareIpsCloudflareIpDetailsResponse = Schema.Struct({
  result: Schema.Union(Schema.Struct({
  etag: Schema.optional(Schema.String),
  ipv4_cidrs: Schema.optional(Schema.Array(Schema.String)),
  ipv6_cidrs: Schema.optional(Schema.Array(Schema.String))
}), Schema.Struct({
  etag: Schema.optional(Schema.String),
  ipv4_cidrs: Schema.optional(Schema.Array(Schema.String)),
  ipv6_cidrs: Schema.optional(Schema.Array(Schema.String)),
  jdcloud_cidrs: Schema.optional(Schema.Array(Schema.String))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CloudflareIpsCloudflareIpDetailsResponse" }) as unknown as Schema.Schema<CloudflareIpsCloudflareIpDetailsResponse>;

export const cloudflareIpsCloudflareIpDetails: (
  input: CloudflareIpsCloudflareIpDetailsRequest
) => Effect.Effect<
  CloudflareIpsCloudflareIpDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CloudflareIpsCloudflareIpDetailsRequest,
  output: CloudflareIpsCloudflareIpDetailsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
