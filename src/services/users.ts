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

export interface UserListusertenantsRequest {
}

export const UserListusertenantsRequest = Schema.Struct({

}).pipe(
  T.Http({ method: "GET", path: "/users/tenants" }),
).annotations({ identifier: "UserListusertenantsRequest" }) as unknown as Schema.Schema<UserListusertenantsRequest>;

export interface UserListusertenantsResponse {
  result: { create_time: string; id: unknown; meta: { flags?: unknown; managed_by?: string }; name: string; parent?: { id: string; name: string }; profile?: { business_address: string; business_email: string; business_name: string; business_phone: string; external_metadata: string } }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserListusertenantsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  create_time: Schema.Date,
  id: Schema.String,
  meta: Schema.Struct({
  flags: Schema.optional(Schema.Struct({
  account_creation: Schema.String,
  account_deletion: Schema.String,
  account_migration: Schema.String,
  account_mobility: Schema.String,
  sub_org_creation: Schema.String
})),
  managed_by: Schema.optional(Schema.String)
}),
  name: Schema.String,
  parent: Schema.optional(Schema.Struct({
  id: Schema.String,
  name: Schema.String
})),
  profile: Schema.optional(Schema.Struct({
  business_address: Schema.String,
  business_email: Schema.String,
  business_name: Schema.String,
  business_phone: Schema.String,
  external_metadata: Schema.String
}))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserListusertenantsResponse" }) as unknown as Schema.Schema<UserListusertenantsResponse>;

export const userListusertenants: (
  input: UserListusertenantsRequest
) => Effect.Effect<
  UserListusertenantsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserListusertenantsRequest,
  output: UserListusertenantsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
