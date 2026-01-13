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
  status: Schema.optional(Schema.Literal("accepted", "pending", "rejected")).pipe(T.HttpQuery("status"))
}).pipe(
  T.Http({ method: "GET", path: "/memberships" }),
).annotations({ identifier: "ListMembershipsRequest" }) as unknown as Schema.Schema<ListMembershipsRequest>;

export interface ListMembershipsResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListMembershipsResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListMembershipsResponse" }) as unknown as Schema.Schema<ListMembershipsResponse>;

export const listMemberships: (
  input: ListMembershipsRequest
) => Effect.Effect<
  ListMembershipsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListMembershipsRequest,
  output: ListMembershipsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UserSAccountMembershipsMembershipDetailsRequest {
  membership_id: string;
}

export const UserSAccountMembershipsMembershipDetailsRequest = Schema.Struct({
  membership_id: Schema.String.pipe(T.HttpPath("membership_id"))
}).pipe(
  T.Http({ method: "GET", path: "/memberships/{membership_id}" }),
).annotations({ identifier: "UserSAccountMembershipsMembershipDetailsRequest" }) as unknown as Schema.Schema<UserSAccountMembershipsMembershipDetailsRequest>;

export interface UserSAccountMembershipsMembershipDetailsResponse {
  result: { account?: unknown; api_access_enabled?: boolean; id?: string; permissions?: unknown; policies?: unknown[]; roles?: string[]; status?: "accepted" | "pending" | "rejected" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserSAccountMembershipsMembershipDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  account: Schema.optional(Schema.Struct({
  created_on: Schema.optional(Schema.Date),
  id: Schema.String,
  managed_by: Schema.optional(Schema.Struct({
  parent_org_id: Schema.optional(Schema.String),
  parent_org_name: Schema.optional(Schema.String)
})),
  name: Schema.String,
  settings: Schema.optional(Schema.Struct({
  abuse_contact_email: Schema.optional(Schema.String),
  enforce_twofactor: Schema.optional(Schema.Boolean)
})),
  type: Schema.Literal("standard", "enterprise")
})),
  api_access_enabled: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Struct({
  analytics: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  billing: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  cache_purge: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  dns: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  dns_records: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  lb: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  logs: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  organization: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  ssl: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  waf: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  zone_settings: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  zones: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
}))
})),
  policies: Schema.optional(Schema.Array(Schema.Unknown)),
  roles: Schema.optional(Schema.Array(Schema.String)),
  status: Schema.optional(Schema.Literal("accepted", "pending", "rejected"))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserSAccountMembershipsMembershipDetailsResponse" }) as unknown as Schema.Schema<UserSAccountMembershipsMembershipDetailsResponse>;

export const userSAccountMembershipsMembershipDetails: (
  input: UserSAccountMembershipsMembershipDetailsRequest
) => Effect.Effect<
  UserSAccountMembershipsMembershipDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserSAccountMembershipsMembershipDetailsRequest,
  output: UserSAccountMembershipsMembershipDetailsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateMembershipRequest {
  membership_id: string;
  body: unknown;
}

export const UpdateMembershipRequest = Schema.Struct({
  membership_id: Schema.String.pipe(T.HttpPath("membership_id")),
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/memberships/{membership_id}" }),
).annotations({ identifier: "UpdateMembershipRequest" }) as unknown as Schema.Schema<UpdateMembershipRequest>;

export interface UpdateMembershipResponse {
  result: { account?: unknown; api_access_enabled?: boolean; id?: string; permissions?: unknown; policies?: unknown[]; roles?: string[]; status?: "accepted" | "pending" | "rejected" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateMembershipResponse = Schema.Struct({
  result: Schema.Struct({
  account: Schema.optional(Schema.Struct({
  created_on: Schema.optional(Schema.Date),
  id: Schema.String,
  managed_by: Schema.optional(Schema.Struct({
  parent_org_id: Schema.optional(Schema.String),
  parent_org_name: Schema.optional(Schema.String)
})),
  name: Schema.String,
  settings: Schema.optional(Schema.Struct({
  abuse_contact_email: Schema.optional(Schema.String),
  enforce_twofactor: Schema.optional(Schema.Boolean)
})),
  type: Schema.Literal("standard", "enterprise")
})),
  api_access_enabled: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Struct({
  analytics: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  billing: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  cache_purge: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  dns: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  dns_records: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  lb: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  logs: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  organization: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  ssl: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  waf: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  zone_settings: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
})),
  zones: Schema.optional(Schema.Struct({
  read: Schema.optional(Schema.Boolean),
  write: Schema.optional(Schema.Boolean)
}))
})),
  policies: Schema.optional(Schema.Array(Schema.Unknown)),
  roles: Schema.optional(Schema.Array(Schema.String)),
  status: Schema.optional(Schema.Literal("accepted", "pending", "rejected"))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateMembershipResponse" }) as unknown as Schema.Schema<UpdateMembershipResponse>;

export const updateMembership: (
  input: UpdateMembershipRequest
) => Effect.Effect<
  UpdateMembershipResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateMembershipRequest,
  output: UpdateMembershipResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteMembershipRequest {
  membership_id: string;
}

export const DeleteMembershipRequest = Schema.Struct({
  membership_id: Schema.String.pipe(T.HttpPath("membership_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/memberships/{membership_id}" }),
).annotations({ identifier: "DeleteMembershipRequest" }) as unknown as Schema.Schema<DeleteMembershipRequest>;

export interface DeleteMembershipResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteMembershipResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteMembershipResponse" }) as unknown as Schema.Schema<DeleteMembershipResponse>;

export const deleteMembership: (
  input: DeleteMembershipRequest
) => Effect.Effect<
  DeleteMembershipResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteMembershipRequest,
  output: DeleteMembershipResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
