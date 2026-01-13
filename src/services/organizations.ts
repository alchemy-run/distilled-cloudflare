/**
 * Cloudflare ORGANIZATIONS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service organizations
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

export interface OrganizationListorganizationsRequest {
}

export const OrganizationListorganizationsRequest = Schema.Struct({

}).pipe(
  T.Http({ method: "GET", path: "/organizations" }),
).annotations({ identifier: "OrganizationListorganizationsRequest" }) as unknown as Schema.Schema<OrganizationListorganizationsRequest>;

export interface OrganizationListorganizationsResponse {
  result: { create_time: string; id: unknown; meta: { flags?: unknown; managed_by?: string }; name: string; parent?: { id: string; name: string }; profile?: { business_address: string; business_email: string; business_name: string; business_phone: string; external_metadata: string } }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const OrganizationListorganizationsResponse = Schema.Struct({
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
}).annotations({ identifier: "OrganizationListorganizationsResponse" }) as unknown as Schema.Schema<OrganizationListorganizationsResponse>;

export const organizationListorganizations: (
  input: OrganizationListorganizationsRequest
) => Effect.Effect<
  OrganizationListorganizationsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: OrganizationListorganizationsRequest,
  output: OrganizationListorganizationsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface OrganizationsCreateuserorganizationRequest {
  body: { create_time: string; id: unknown; meta: { flags?: unknown; managed_by?: string }; name: string; parent?: { id: string; name: string }; profile?: { business_address: string; business_email: string; business_name: string; business_phone: string; external_metadata: string } };
}

export const OrganizationsCreateuserorganizationRequest = Schema.Struct({
  body: Schema.Struct({
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
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/organizations" }),
).annotations({ identifier: "OrganizationsCreateuserorganizationRequest" }) as unknown as Schema.Schema<OrganizationsCreateuserorganizationRequest>;

export interface OrganizationsCreateuserorganizationResponse {
  result: { create_time: string; id: unknown; meta: { flags?: unknown; managed_by?: string }; name: string; parent?: { id: string; name: string }; profile?: { business_address: string; business_email: string; business_name: string; business_phone: string; external_metadata: string } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const OrganizationsCreateuserorganizationResponse = Schema.Struct({
  result: Schema.Struct({
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
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "OrganizationsCreateuserorganizationResponse" }) as unknown as Schema.Schema<OrganizationsCreateuserorganizationResponse>;

export const organizationsCreateuserorganization: (
  input: OrganizationsCreateuserorganizationRequest
) => Effect.Effect<
  OrganizationsCreateuserorganizationResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: OrganizationsCreateuserorganizationRequest,
  output: OrganizationsCreateuserorganizationResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface OrganizationsRetrieveRequest {
  organization_id: string;
}

export const OrganizationsRetrieveRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id"))
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization_id}" }),
).annotations({ identifier: "OrganizationsRetrieveRequest" }) as unknown as Schema.Schema<OrganizationsRetrieveRequest>;

export interface OrganizationsRetrieveResponse {
  result: { create_time: string; id: unknown; meta: { flags?: unknown; managed_by?: string }; name: string; parent?: { id: string; name: string }; profile?: { business_address: string; business_email: string; business_name: string; business_phone: string; external_metadata: string } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const OrganizationsRetrieveResponse = Schema.Struct({
  result: Schema.Struct({
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
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "OrganizationsRetrieveResponse" }) as unknown as Schema.Schema<OrganizationsRetrieveResponse>;

export const organizationsRetrieve: (
  input: OrganizationsRetrieveRequest
) => Effect.Effect<
  OrganizationsRetrieveResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: OrganizationsRetrieveRequest,
  output: OrganizationsRetrieveResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface OrganizationsModifyRequest {
  organization_id: string;
  body: { create_time: string; id: unknown; meta: { flags?: unknown; managed_by?: string }; name: string; parent?: { id: string; name: string }; profile?: { business_address: string; business_email: string; business_name: string; business_phone: string; external_metadata: string } };
}

export const OrganizationsModifyRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id")),
  body: Schema.Struct({
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
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/organizations/{organization_id}" }),
).annotations({ identifier: "OrganizationsModifyRequest" }) as unknown as Schema.Schema<OrganizationsModifyRequest>;

export interface OrganizationsModifyResponse {
  result: { create_time: string; id: unknown; meta: { flags?: unknown; managed_by?: string }; name: string; parent?: { id: string; name: string }; profile?: { business_address: string; business_email: string; business_name: string; business_phone: string; external_metadata: string } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const OrganizationsModifyResponse = Schema.Struct({
  result: Schema.Struct({
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
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "OrganizationsModifyResponse" }) as unknown as Schema.Schema<OrganizationsModifyResponse>;

export const organizationsModify: (
  input: OrganizationsModifyRequest
) => Effect.Effect<
  OrganizationsModifyResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: OrganizationsModifyRequest,
  output: OrganizationsModifyResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface Delete_Request {
  organization_id: string;
}

export const Delete_Request = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/organizations/{organization_id}" }),
).annotations({ identifier: "Delete_Request" }) as unknown as Schema.Schema<Delete_Request>;

export interface Delete_Response {
  result: { id: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const Delete_Response = Schema.Struct({
  result: Schema.Struct({
  id: Schema.String
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "Delete_Response" }) as unknown as Schema.Schema<Delete_Response>;

export const delete_: (
  input: Delete_Request
) => Effect.Effect<
  Delete_Response,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: Delete_Request,
  output: Delete_Response,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface OrganizationsGetaccountsRequest {
  organization_id: string;
  account_pubname?: string;
  "account_pubname.startsWith"?: string;
  "account_pubname.endsWith"?: string;
  "account_pubname.contains"?: string;
  name?: string;
  "name.startsWith"?: string;
  "name.endsWith"?: string;
  "name.contains"?: string;
}

export const OrganizationsGetaccountsRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id")),
  account_pubname: Schema.optional(Schema.String).pipe(T.HttpQuery("account_pubname")),
  "account_pubname.startsWith": Schema.optional(Schema.String).pipe(T.HttpQuery("account_pubname.startsWith")),
  "account_pubname.endsWith": Schema.optional(Schema.String).pipe(T.HttpQuery("account_pubname.endsWith")),
  "account_pubname.contains": Schema.optional(Schema.String).pipe(T.HttpQuery("account_pubname.contains")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  "name.startsWith": Schema.optional(Schema.String).pipe(T.HttpQuery("name.startsWith")),
  "name.endsWith": Schema.optional(Schema.String).pipe(T.HttpQuery("name.endsWith")),
  "name.contains": Schema.optional(Schema.String).pipe(T.HttpQuery("name.contains"))
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization_id}/accounts" }),
).annotations({ identifier: "OrganizationsGetaccountsRequest" }) as unknown as Schema.Schema<OrganizationsGetaccountsRequest>;

export interface OrganizationsGetaccountsResponse {
  result: { created_on: string; id: string; name: string; settings: { abuse_contact_email: string; access_approval_expiry: string; api_access_enabled: boolean; default_nameservers: string; enforce_twofactor: boolean; use_account_custom_ns_by_default: boolean }; type: "standard" | "enterprise" }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const OrganizationsGetaccountsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  created_on: Schema.Date,
  id: Schema.String,
  name: Schema.String,
  settings: Schema.Struct({
  abuse_contact_email: Schema.String,
  access_approval_expiry: Schema.Date,
  api_access_enabled: Schema.Boolean,
  default_nameservers: Schema.String,
  enforce_twofactor: Schema.Boolean,
  use_account_custom_ns_by_default: Schema.Boolean
}),
  type: Schema.Literal("standard", "enterprise")
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "OrganizationsGetaccountsResponse" }) as unknown as Schema.Schema<OrganizationsGetaccountsResponse>;

export const organizationsGetaccounts: (
  input: OrganizationsGetaccountsRequest
) => Effect.Effect<
  OrganizationsGetaccountsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: OrganizationsGetaccountsRequest,
  output: OrganizationsGetaccountsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListRequest {
  organization_id: string;
  status?: "active" | "canceled"[];
  "user.email"?: string;
  "user.email.contains"?: string;
  "user.email.startsWith"?: string;
  "user.email.endsWith"?: string;
}

export const ListRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id")),
  status: Schema.optional(Schema.Array(Schema.Literal("active", "canceled"))).pipe(T.HttpQuery("status")),
  "user.email": Schema.optional(Schema.String).pipe(T.HttpQuery("user.email")),
  "user.email.contains": Schema.optional(Schema.String).pipe(T.HttpQuery("user.email.contains")),
  "user.email.startsWith": Schema.optional(Schema.String).pipe(T.HttpQuery("user.email.startsWith")),
  "user.email.endsWith": Schema.optional(Schema.String).pipe(T.HttpQuery("user.email.endsWith"))
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization_id}/members" }),
).annotations({ identifier: "ListRequest" }) as unknown as Schema.Schema<ListRequest>;

export interface ListResponse {
  result: { create_time: string; id: string; meta: Record<string, unknown>; status: "active" | "canceled"; update_time: string; user: { email: string; id: string; name: string; two_factor_authentication_enabled: boolean } }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  create_time: Schema.Date,
  id: Schema.String,
  meta: Schema.Record({ key: Schema.String, value: Schema.Struct({}) }),
  status: Schema.Literal("active", "canceled"),
  update_time: Schema.Date,
  user: Schema.Struct({
  email: Schema.String,
  id: Schema.String,
  name: Schema.String,
  two_factor_authentication_enabled: Schema.Boolean
})
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListResponse" }) as unknown as Schema.Schema<ListResponse>;

export const list: (
  input: ListRequest
) => Effect.Effect<
  ListResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRequest,
  output: ListResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateRequest {
  organization_id: string;
  body: { member: { status?: "active" | "canceled"; user: { email: string } } };
}

export const CreateRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id")),
  body: Schema.Struct({
  member: Schema.Struct({
  status: Schema.optional(Schema.Literal("active", "canceled")),
  user: Schema.Struct({
  email: Schema.String
})
})
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/organizations/{organization_id}/members" }),
).annotations({ identifier: "CreateRequest" }) as unknown as Schema.Schema<CreateRequest>;

export interface CreateResponse {
  result: { create_time: string; id: string; meta: Record<string, unknown>; status: "active" | "canceled"; update_time: string; user: { email: string; id: string; name: string; two_factor_authentication_enabled: boolean } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateResponse = Schema.Struct({
  result: Schema.Struct({
  create_time: Schema.Date,
  id: Schema.String,
  meta: Schema.Record({ key: Schema.String, value: Schema.Struct({}) }),
  status: Schema.Literal("active", "canceled"),
  update_time: Schema.Date,
  user: Schema.Struct({
  email: Schema.String,
  id: Schema.String,
  name: Schema.String,
  two_factor_authentication_enabled: Schema.Boolean
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateResponse" }) as unknown as Schema.Schema<CreateResponse>;

export const create: (
  input: CreateRequest
) => Effect.Effect<
  CreateResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateRequest,
  output: CreateResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface MembersRetrieveRequest {
  organization_id: string;
  member_id: string;
}

export const MembersRetrieveRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id")),
  member_id: Schema.String.pipe(T.HttpPath("member_id"))
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization_id}/members/{member_id}" }),
).annotations({ identifier: "MembersRetrieveRequest" }) as unknown as Schema.Schema<MembersRetrieveRequest>;

export interface MembersRetrieveResponse {
  result: { create_time: string; id: string; meta: Record<string, unknown>; status: "active" | "canceled"; update_time: string; user: { email: string; id: string; name: string; two_factor_authentication_enabled: boolean } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const MembersRetrieveResponse = Schema.Struct({
  result: Schema.Struct({
  create_time: Schema.Date,
  id: Schema.String,
  meta: Schema.Record({ key: Schema.String, value: Schema.Struct({}) }),
  status: Schema.Literal("active", "canceled"),
  update_time: Schema.Date,
  user: Schema.Struct({
  email: Schema.String,
  id: Schema.String,
  name: Schema.String,
  two_factor_authentication_enabled: Schema.Boolean
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "MembersRetrieveResponse" }) as unknown as Schema.Schema<MembersRetrieveResponse>;

export const membersRetrieve: (
  input: MembersRetrieveRequest
) => Effect.Effect<
  MembersRetrieveResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: MembersRetrieveRequest,
  output: MembersRetrieveResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface Delete_1Request {
  organization_id: string;
  member_id: string;
  body: { member_id: string };
}

export const Delete_1Request = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id")),
  member_id: Schema.String.pipe(T.HttpPath("member_id")),
  body: Schema.Struct({
  member_id: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "DELETE", path: "/organizations/{organization_id}/members/{member_id}" }),
).annotations({ identifier: "Delete_1Request" }) as unknown as Schema.Schema<Delete_1Request>;

export interface Delete_1Response {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const Delete_1Response = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "Delete_1Response" }) as unknown as Schema.Schema<Delete_1Response>;

export const delete_1: (
  input: Delete_1Request
) => Effect.Effect<
  Delete_1Response,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: Delete_1Request,
  output: Delete_1Response,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface MembersBatchcreateRequest {
  organization_id: string;
  body: { members: { status?: "active" | "canceled"; user: { email: string } }[] };
}

export const MembersBatchcreateRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id")),
  body: Schema.Struct({
  members: Schema.Array(Schema.Struct({
  status: Schema.optional(Schema.Literal("active", "canceled")),
  user: Schema.Struct({
  email: Schema.String
})
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/organizations/{organization_id}/members:batchCreate" }),
).annotations({ identifier: "MembersBatchcreateRequest" }) as unknown as Schema.Schema<MembersBatchcreateRequest>;

export interface MembersBatchcreateResponse {
  result: { create_time: string; id: string; meta: Record<string, unknown>; status: "active" | "canceled"; update_time: string; user: { email: string; id: string; name: string; two_factor_authentication_enabled: boolean } }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const MembersBatchcreateResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  create_time: Schema.Date,
  id: Schema.String,
  meta: Schema.Record({ key: Schema.String, value: Schema.Struct({}) }),
  status: Schema.Literal("active", "canceled"),
  update_time: Schema.Date,
  user: Schema.Struct({
  email: Schema.String,
  id: Schema.String,
  name: Schema.String,
  two_factor_authentication_enabled: Schema.Boolean
})
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "MembersBatchcreateResponse" }) as unknown as Schema.Schema<MembersBatchcreateResponse>;

export const membersBatchcreate: (
  input: MembersBatchcreateRequest
) => Effect.Effect<
  MembersBatchcreateResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: MembersBatchcreateRequest,
  output: MembersBatchcreateResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface OrganizationsGetprofileRequest {
  organization_id: string;
}

export const OrganizationsGetprofileRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id"))
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization_id}/profile" }),
).annotations({ identifier: "OrganizationsGetprofileRequest" }) as unknown as Schema.Schema<OrganizationsGetprofileRequest>;

export interface OrganizationsGetprofileResponse {
  result: { business_address: string; business_email: string; business_name: string; business_phone: string; external_metadata: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const OrganizationsGetprofileResponse = Schema.Struct({
  result: Schema.Struct({
  business_address: Schema.String,
  business_email: Schema.String,
  business_name: Schema.String,
  business_phone: Schema.String,
  external_metadata: Schema.String
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "OrganizationsGetprofileResponse" }) as unknown as Schema.Schema<OrganizationsGetprofileResponse>;

export const organizationsGetprofile: (
  input: OrganizationsGetprofileRequest
) => Effect.Effect<
  OrganizationsGetprofileResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: OrganizationsGetprofileRequest,
  output: OrganizationsGetprofileResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface OrganizationsModifyprofileRequest {
  organization_id: string;
  body: { business_address: string; business_email: string; business_name: string; business_phone: string; external_metadata: string };
}

export const OrganizationsModifyprofileRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id")),
  body: Schema.Struct({
  business_address: Schema.String,
  business_email: Schema.String,
  business_name: Schema.String,
  business_phone: Schema.String,
  external_metadata: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/organizations/{organization_id}/profile" }),
).annotations({ identifier: "OrganizationsModifyprofileRequest" }) as unknown as Schema.Schema<OrganizationsModifyprofileRequest>;

export interface OrganizationsModifyprofileResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const OrganizationsModifyprofileResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "OrganizationsModifyprofileResponse" }) as unknown as Schema.Schema<OrganizationsModifyprofileResponse>;

export const organizationsModifyprofile: (
  input: OrganizationsModifyprofileRequest
) => Effect.Effect<
  OrganizationsModifyprofileResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: OrganizationsModifyprofileRequest,
  output: OrganizationsModifyprofileResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface List1Request {
  organization_id: string;
}

export const List1Request = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id"))
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization_id}/shares" }),
).annotations({ identifier: "List1Request" }) as unknown as Schema.Schema<List1Request>;

export interface List1Response {
  result: unknown[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const List1Response = Schema.Struct({
  result: Schema.Array(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "List1Response" }) as unknown as Schema.Schema<List1Response>;

export const list1: (
  input: List1Request
) => Effect.Effect<
  List1Response,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: List1Request,
  output: List1Response,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
