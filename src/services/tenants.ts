/**
 * Cloudflare TENANTS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service tenants
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

export interface TenantsRetrievetenantRequest {
  tenant_id: string;
}

export const TenantsRetrievetenantRequest = Schema.Struct({
  tenant_id: Schema.String.pipe(T.HttpPath("tenant_id"))
}).pipe(
  T.Http({ method: "GET", path: "/tenants/{tenant_id}" }),
).annotations({ identifier: "TenantsRetrievetenantRequest" }) as unknown as Schema.Schema<TenantsRetrievetenantRequest>;

export interface TenantsRetrievetenantResponse {
  result: { cdate: string; customer_id?: string; edate: string; tenant_contacts: { email?: string; website?: string }; tenant_labels: string[]; tenant_metadata: { dns?: { ns_pool: { primary?: string; secondary?: string } } }; tenant_name: string; tenant_network: Record<string, unknown>; tenant_status: string; tenant_tag: string; tenant_type: string; tenant_units: { unit_memberships: Record<string, unknown>[]; unit_metadata: Record<string, unknown>; unit_name: string; unit_status: string; unit_tag: string }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const TenantsRetrievetenantResponse = Schema.Struct({
  result: Schema.Struct({
  cdate: Schema.Date,
  customer_id: Schema.optional(Schema.String),
  edate: Schema.Date,
  tenant_contacts: Schema.Struct({
  email: Schema.optional(Schema.String),
  website: Schema.optional(Schema.String)
}),
  tenant_labels: Schema.Array(Schema.String),
  tenant_metadata: Schema.Struct({
  dns: Schema.optional(Schema.Struct({
  ns_pool: Schema.Struct({
  primary: Schema.optional(Schema.String),
  secondary: Schema.optional(Schema.String)
})
}))
}),
  tenant_name: Schema.String,
  tenant_network: Schema.Struct({}),
  tenant_status: Schema.String,
  tenant_tag: Schema.String,
  tenant_type: Schema.String,
  tenant_units: Schema.Array(Schema.Struct({
  unit_memberships: Schema.Array(Schema.Struct({})),
  unit_metadata: Schema.Struct({}),
  unit_name: Schema.String,
  unit_status: Schema.String,
  unit_tag: Schema.String
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "TenantsRetrievetenantResponse" }) as unknown as Schema.Schema<TenantsRetrievetenantResponse>;

export const tenantsRetrievetenant: (
  input: TenantsRetrievetenantRequest
) => Effect.Effect<
  TenantsRetrievetenantResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TenantsRetrievetenantRequest,
  output: TenantsRetrievetenantResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface TenantsValidaccounttypesRequest {
  tenant_id: string;
}

export const TenantsValidaccounttypesRequest = Schema.Struct({
  tenant_id: Schema.String.pipe(T.HttpPath("tenant_id"))
}).pipe(
  T.Http({ method: "GET", path: "/tenants/{tenant_id}/account_types" }),
).annotations({ identifier: "TenantsValidaccounttypesRequest" }) as unknown as Schema.Schema<TenantsValidaccounttypesRequest>;

export interface TenantsValidaccounttypesResponse {
  result: string[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const TenantsValidaccounttypesResponse = Schema.Struct({
  result: Schema.Array(Schema.String),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "TenantsValidaccounttypesResponse" }) as unknown as Schema.Schema<TenantsValidaccounttypesResponse>;

export const tenantsValidaccounttypes: (
  input: TenantsValidaccounttypesRequest
) => Effect.Effect<
  TenantsValidaccounttypesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TenantsValidaccounttypesRequest,
  output: TenantsValidaccounttypesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface TenantsListaccountsRequest {
  tenant_id: string;
}

export const TenantsListaccountsRequest = Schema.Struct({
  tenant_id: Schema.String.pipe(T.HttpPath("tenant_id"))
}).pipe(
  T.Http({ method: "GET", path: "/tenants/{tenant_id}/accounts" }),
).annotations({ identifier: "TenantsListaccountsRequest" }) as unknown as Schema.Schema<TenantsListaccountsRequest>;

export interface TenantsListaccountsResponse {
  result: { created_on: string; id: string; name: string; settings: { abuse_contact_email: string; access_approval_expiry: string; api_access_enabled: boolean; default_nameservers: string; enforce_twofactor: boolean; use_account_custom_ns_by_default: boolean }; type: "standard" | "enterprise" }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const TenantsListaccountsResponse = Schema.Struct({
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
}).annotations({ identifier: "TenantsListaccountsResponse" }) as unknown as Schema.Schema<TenantsListaccountsResponse>;

export const tenantsListaccounts: (
  input: TenantsListaccountsRequest
) => Effect.Effect<
  TenantsListaccountsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TenantsListaccountsRequest,
  output: TenantsListaccountsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface TenantsListentitlementsRequest {
  tenant_id: string;
}

export const TenantsListentitlementsRequest = Schema.Struct({
  tenant_id: Schema.String.pipe(T.HttpPath("tenant_id"))
}).pipe(
  T.Http({ method: "GET", path: "/tenants/{tenant_id}/entitlements" }),
).annotations({ identifier: "TenantsListentitlementsRequest" }) as unknown as Schema.Schema<TenantsListentitlementsRequest>;

export interface TenantsListentitlementsResponse {
  result: { allow_add_subdomain: { type: "bool"; value: boolean }; allow_auto_accept_invites: { type: "bool"; value: boolean }; cname_setup_allowed: { type: "bool"; value: boolean }; custom_entitlements: { allocation: unknown; feature: { key: string } }[]; mhs_certificate_count: { type: "max_count"; value: number }; partial_setup_allowed: { type: "bool"; value: boolean } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const TenantsListentitlementsResponse = Schema.Struct({
  result: Schema.Struct({
  allow_add_subdomain: Schema.Struct({
  type: Schema.Literal("bool"),
  value: Schema.Boolean
}),
  allow_auto_accept_invites: Schema.Struct({
  type: Schema.Literal("bool"),
  value: Schema.Boolean
}),
  cname_setup_allowed: Schema.Struct({
  type: Schema.Literal("bool"),
  value: Schema.Boolean
}),
  custom_entitlements: Schema.Array(Schema.Struct({
  allocation: Schema.Union(Schema.Struct({
  type: Schema.Literal("max_count"),
  value: Schema.Number
}), Schema.Struct({
  type: Schema.Literal("bool"),
  value: Schema.Boolean
}), Schema.Struct({
  type: Schema.Literal(""),
  value: Schema.optional(Schema.Struct({}))
})),
  feature: Schema.Struct({
  key: Schema.String
})
})),
  mhs_certificate_count: Schema.Struct({
  type: Schema.Literal("max_count"),
  value: Schema.Number
}),
  partial_setup_allowed: Schema.Struct({
  type: Schema.Literal("bool"),
  value: Schema.Boolean
})
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "TenantsListentitlementsResponse" }) as unknown as Schema.Schema<TenantsListentitlementsResponse>;

export const tenantsListentitlements: (
  input: TenantsListentitlementsRequest
) => Effect.Effect<
  TenantsListentitlementsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TenantsListentitlementsRequest,
  output: TenantsListentitlementsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface TenantsListmembershipsRequest {
  tenant_id: string;
}

export const TenantsListmembershipsRequest = Schema.Struct({
  tenant_id: Schema.String.pipe(T.HttpPath("tenant_id"))
}).pipe(
  T.Http({ method: "GET", path: "/tenants/{tenant_id}/memberships" }),
).annotations({ identifier: "TenantsListmembershipsRequest" }) as unknown as Schema.Schema<TenantsListmembershipsRequest>;

export interface TenantsListmembershipsResponse {
  result: { user_email: string; user_name: string; user_tag: string }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const TenantsListmembershipsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  user_email: Schema.String,
  user_name: Schema.String,
  user_tag: Schema.String
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "TenantsListmembershipsResponse" }) as unknown as Schema.Schema<TenantsListmembershipsResponse>;

export const tenantsListmemberships: (
  input: TenantsListmembershipsRequest
) => Effect.Effect<
  TenantsListmembershipsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: TenantsListmembershipsRequest,
  output: TenantsListmembershipsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
