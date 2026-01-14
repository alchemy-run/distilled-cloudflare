/**
 * Cloudflare USER API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service user
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

export class AuthenticationError extends Schema.TaggedError<AuthenticationError>()("AuthenticationError", {
  code: Schema.Number,
  message: Schema.String,
}).pipe(C.withAuthError) {
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


export interface UserUserDetailsRequest {
}

export const UserUserDetailsRequest = Schema.Struct({

}).pipe(
  T.Http({ method: "GET", path: "/user" }),
).annotations({ identifier: "UserUserDetailsRequest" }) as unknown as Schema.Schema<UserUserDetailsRequest>;

export interface UserUserDetailsResponse {
  result: { betas?: string[]; country?: string; first_name?: string; has_business_zones?: boolean; has_enterprise_zones?: boolean; has_pro_zones?: boolean; id?: string; last_name?: string; organizations?: ({ id?: string; name?: string; permissions?: string[]; roles?: string[]; status?: "member" | "invited" })[]; suspended?: boolean; telephone?: string; two_factor_authentication_enabled?: boolean; two_factor_authentication_locked?: boolean; zipcode?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserUserDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  betas: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  country: Schema.optional(Schema.NullOr(Schema.String)),
  first_name: Schema.optional(Schema.NullOr(Schema.String)),
  has_business_zones: Schema.optional(Schema.NullOr(Schema.Boolean)),
  has_enterprise_zones: Schema.optional(Schema.NullOr(Schema.Boolean)),
  has_pro_zones: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  last_name: Schema.optional(Schema.NullOr(Schema.String)),
  organizations: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  id: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  permissions: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  roles: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  status: Schema.optional(Schema.NullOr(Schema.Literal("member", "invited")))
})))),
  suspended: Schema.optional(Schema.NullOr(Schema.Boolean)),
  telephone: Schema.optional(Schema.NullOr(Schema.String)),
  two_factor_authentication_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  two_factor_authentication_locked: Schema.optional(Schema.NullOr(Schema.Boolean)),
  zipcode: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserUserDetailsResponse" }) as unknown as Schema.Schema<UserUserDetailsResponse>;

export const userUserDetails: (
  input: UserUserDetailsRequest
) => Effect.Effect<
  UserUserDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserUserDetailsRequest,
  output: UserUserDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserEditUserRequest {
  body: unknown;
}

export const UserEditUserRequest = Schema.Struct({
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/user" }),
).annotations({ identifier: "UserEditUserRequest" }) as unknown as Schema.Schema<UserEditUserRequest>;

export interface UserEditUserResponse {
  result: { betas?: string[]; country?: string; first_name?: string; has_business_zones?: boolean; has_enterprise_zones?: boolean; has_pro_zones?: boolean; id?: string; last_name?: string; organizations?: ({ id?: string; name?: string; permissions?: string[]; roles?: string[]; status?: "member" | "invited" })[]; suspended?: boolean; telephone?: string; two_factor_authentication_enabled?: boolean; two_factor_authentication_locked?: boolean; zipcode?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserEditUserResponse = Schema.Struct({
  result: Schema.Struct({
  betas: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  country: Schema.optional(Schema.NullOr(Schema.String)),
  first_name: Schema.optional(Schema.NullOr(Schema.String)),
  has_business_zones: Schema.optional(Schema.NullOr(Schema.Boolean)),
  has_enterprise_zones: Schema.optional(Schema.NullOr(Schema.Boolean)),
  has_pro_zones: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  last_name: Schema.optional(Schema.NullOr(Schema.String)),
  organizations: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  id: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  permissions: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  roles: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  status: Schema.optional(Schema.NullOr(Schema.Literal("member", "invited")))
})))),
  suspended: Schema.optional(Schema.NullOr(Schema.Boolean)),
  telephone: Schema.optional(Schema.NullOr(Schema.String)),
  two_factor_authentication_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  two_factor_authentication_locked: Schema.optional(Schema.NullOr(Schema.Boolean)),
  zipcode: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserEditUserResponse" }) as unknown as Schema.Schema<UserEditUserResponse>;

export const userEditUser: (
  input: UserEditUserRequest
) => Effect.Effect<
  UserEditUserResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserEditUserRequest,
  output: UserEditUserResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface GetUserAuditLogsRequest {
  id?: string;
  export?: boolean;
  "action.type"?: string;
  "actor.ip"?: string;
  "actor.email"?: string;
  since?: unknown;
  before?: unknown;
  "zone.name"?: string;
  direction?: "desc" | "asc";
  per_page?: number;
  page?: number;
  hide_user_logs?: boolean;
}

export const GetUserAuditLogsRequest = Schema.Struct({
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  export: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("export")),
  "action.type": Schema.optional(Schema.String).pipe(T.HttpQuery("action.type")),
  "actor.ip": Schema.optional(Schema.String).pipe(T.HttpQuery("actor.ip")),
  "actor.email": Schema.optional(Schema.String).pipe(T.HttpQuery("actor.email")),
  since: Schema.optional(Schema.Union(Schema.Date, Schema.Date)).pipe(T.HttpQuery("since")),
  before: Schema.optional(Schema.Union(Schema.Date, Schema.Date)).pipe(T.HttpQuery("before")),
  "zone.name": Schema.optional(Schema.String).pipe(T.HttpQuery("zone.name")),
  direction: Schema.optional(Schema.Literal("desc", "asc")).pipe(T.HttpQuery("direction")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  hide_user_logs: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("hide_user_logs"))
}).pipe(
  T.Http({ method: "GET", path: "/user/audit_logs" }),
).annotations({ identifier: "GetUserAuditLogsRequest" }) as unknown as Schema.Schema<GetUserAuditLogsRequest>;

export interface GetUserAuditLogsResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetUserAuditLogsResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetUserAuditLogsResponse" }) as unknown as Schema.Schema<GetUserAuditLogsResponse>;

export const getUserAuditLogs: (
  input: GetUserAuditLogsRequest
) => Effect.Effect<
  GetUserAuditLogsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetUserAuditLogsRequest,
  output: GetUserAuditLogsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserBillingHistoryDeprecatedBillingHistoryDetailsRequest {
  page?: number;
  per_page?: number;
  order?: "type" | "occurred_at" | "action";
  occurred_at?: string;
  type?: string;
  action?: string;
}

export const UserBillingHistoryDeprecatedBillingHistoryDetailsRequest = Schema.Struct({
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("type", "occurred_at", "action")).pipe(T.HttpQuery("order")),
  occurred_at: Schema.optional(Schema.Date).pipe(T.HttpQuery("occurred_at")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  action: Schema.optional(Schema.String).pipe(T.HttpQuery("action"))
}).pipe(
  T.Http({ method: "GET", path: "/user/billing/history" }),
).annotations({ identifier: "UserBillingHistoryDeprecatedBillingHistoryDetailsRequest" }) as unknown as Schema.Schema<UserBillingHistoryDeprecatedBillingHistoryDetailsRequest>;

export interface UserBillingHistoryDeprecatedBillingHistoryDetailsResponse {
  result: { action: string; amount: number; currency: string; description: string; id: string; occurred_at: string; type: string; zone: { name?: string } }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserBillingHistoryDeprecatedBillingHistoryDetailsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  action: Schema.String,
  amount: Schema.Number,
  currency: Schema.String,
  description: Schema.String,
  id: Schema.String,
  occurred_at: Schema.Date,
  type: Schema.String,
  zone: Schema.Struct({
  name: Schema.optional(Schema.NullOr(Schema.String))
})
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserBillingHistoryDeprecatedBillingHistoryDetailsResponse" }) as unknown as Schema.Schema<UserBillingHistoryDeprecatedBillingHistoryDetailsResponse>;

export const userBillingHistoryDeprecatedBillingHistoryDetails: (
  input: UserBillingHistoryDeprecatedBillingHistoryDetailsRequest
) => Effect.Effect<
  UserBillingHistoryDeprecatedBillingHistoryDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserBillingHistoryDeprecatedBillingHistoryDetailsRequest,
  output: UserBillingHistoryDeprecatedBillingHistoryDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserBillingProfileDeprecatedBillingProfileDetailsRequest {
}

export const UserBillingProfileDeprecatedBillingProfileDetailsRequest = Schema.Struct({

}).pipe(
  T.Http({ method: "GET", path: "/user/billing/profile" }),
).annotations({ identifier: "UserBillingProfileDeprecatedBillingProfileDetailsRequest" }) as unknown as Schema.Schema<UserBillingProfileDeprecatedBillingProfileDetailsRequest>;

export interface UserBillingProfileDeprecatedBillingProfileDetailsResponse {
  result: { account_type?: string; address?: string; address2?: string; balance?: string; card_expiry_month?: number; card_expiry_year?: number; card_number?: string; city?: string; company?: string; country?: string; created_on?: string; device_data?: string; edited_on?: string; enterprise_billing_email?: string; enterprise_primary_email?: string; first_name?: string; id?: string; is_partner?: boolean; last_name?: string; next_bill_date?: string; payment_address?: string; payment_address2?: string; payment_city?: string; payment_country?: string; payment_email?: string; payment_first_name?: string; payment_gateway?: string; payment_last_name?: string; payment_nonce?: string; payment_state?: string; payment_zipcode?: string; primary_email?: string; state?: string; tax_id_type?: string; telephone?: string; use_legacy?: boolean; validation_code?: string; vat?: string; zipcode?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserBillingProfileDeprecatedBillingProfileDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  account_type: Schema.optional(Schema.NullOr(Schema.String)),
  address: Schema.optional(Schema.NullOr(Schema.String)),
  address2: Schema.optional(Schema.NullOr(Schema.String)),
  balance: Schema.optional(Schema.NullOr(Schema.String)),
  card_expiry_month: Schema.optional(Schema.NullOr(Schema.Number)),
  card_expiry_year: Schema.optional(Schema.NullOr(Schema.Number)),
  card_number: Schema.optional(Schema.NullOr(Schema.String)),
  city: Schema.optional(Schema.NullOr(Schema.String)),
  company: Schema.optional(Schema.NullOr(Schema.String)),
  country: Schema.optional(Schema.NullOr(Schema.String)),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  device_data: Schema.optional(Schema.NullOr(Schema.String)),
  edited_on: Schema.optional(Schema.NullOr(Schema.Date)),
  enterprise_billing_email: Schema.optional(Schema.NullOr(Schema.String)),
  enterprise_primary_email: Schema.optional(Schema.NullOr(Schema.String)),
  first_name: Schema.optional(Schema.NullOr(Schema.String)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  is_partner: Schema.optional(Schema.NullOr(Schema.Boolean)),
  last_name: Schema.optional(Schema.NullOr(Schema.String)),
  next_bill_date: Schema.optional(Schema.NullOr(Schema.Date)),
  payment_address: Schema.optional(Schema.NullOr(Schema.String)),
  payment_address2: Schema.optional(Schema.NullOr(Schema.String)),
  payment_city: Schema.optional(Schema.NullOr(Schema.String)),
  payment_country: Schema.optional(Schema.NullOr(Schema.String)),
  payment_email: Schema.optional(Schema.NullOr(Schema.String)),
  payment_first_name: Schema.optional(Schema.NullOr(Schema.String)),
  payment_gateway: Schema.optional(Schema.NullOr(Schema.String)),
  payment_last_name: Schema.optional(Schema.NullOr(Schema.String)),
  payment_nonce: Schema.optional(Schema.NullOr(Schema.String)),
  payment_state: Schema.optional(Schema.NullOr(Schema.String)),
  payment_zipcode: Schema.optional(Schema.NullOr(Schema.String)),
  primary_email: Schema.optional(Schema.NullOr(Schema.String)),
  state: Schema.optional(Schema.NullOr(Schema.String)),
  tax_id_type: Schema.optional(Schema.NullOr(Schema.String)),
  telephone: Schema.optional(Schema.NullOr(Schema.String)),
  use_legacy: Schema.optional(Schema.NullOr(Schema.Boolean)),
  validation_code: Schema.optional(Schema.NullOr(Schema.String)),
  vat: Schema.optional(Schema.NullOr(Schema.String)),
  zipcode: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserBillingProfileDeprecatedBillingProfileDetailsResponse" }) as unknown as Schema.Schema<UserBillingProfileDeprecatedBillingProfileDetailsResponse>;

export const userBillingProfileDeprecatedBillingProfileDetails: (
  input: UserBillingProfileDeprecatedBillingProfileDetailsRequest
) => Effect.Effect<
  UserBillingProfileDeprecatedBillingProfileDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserBillingProfileDeprecatedBillingProfileDetailsRequest,
  output: UserBillingProfileDeprecatedBillingProfileDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListIpAccessRulesRequest {
  mode?: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge";
  "configuration.target"?: "ip" | "ip_range" | "asn" | "country";
  "configuration.value"?: string;
  notes?: string;
  match?: "any" | "all";
  page?: number;
  per_page?: number;
  order?: "configuration.target" | "configuration.value" | "mode";
  direction?: "asc" | "desc";
}

export const ListIpAccessRulesRequest = Schema.Struct({
  mode: Schema.optional(Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge")).pipe(T.HttpQuery("mode")),
  "configuration.target": Schema.optional(Schema.Literal("ip", "ip_range", "asn", "country")).pipe(T.HttpQuery("configuration.target")),
  "configuration.value": Schema.optional(Schema.String).pipe(T.HttpQuery("configuration.value")),
  notes: Schema.optional(Schema.String).pipe(T.HttpQuery("notes")),
  match: Schema.optional(Schema.Literal("any", "all")).pipe(T.HttpQuery("match")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("configuration.target", "configuration.value", "mode")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction"))
}).pipe(
  T.Http({ method: "GET", path: "/user/firewall/access_rules/rules" }),
).annotations({ identifier: "ListIpAccessRulesRequest" }) as unknown as Schema.Schema<ListIpAccessRulesRequest>;

export interface ListIpAccessRulesResponse {
  result: ({ allowed_modes: ("block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge")[]; configuration: { target?: "ip"; value?: string } | { target?: "ip6"; value?: string } | { target?: "ip_range"; value?: string } | { target?: "asn"; value?: string } | { target?: "country"; value?: string }; created_on?: string; id: string; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; modified_on?: string; notes?: string })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListIpAccessRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  allowed_modes: Schema.Array(Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge")),
  configuration: Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip6"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip_range"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("asn"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("country"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
})),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.String,
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  notes: Schema.optional(Schema.NullOr(Schema.String))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListIpAccessRulesResponse" }) as unknown as Schema.Schema<ListIpAccessRulesResponse>;

export const listIpAccessRules: (
  input: ListIpAccessRulesRequest
) => Effect.Effect<
  ListIpAccessRulesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListIpAccessRulesRequest,
  output: ListIpAccessRulesResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface CreateAnIpAccessRuleRequest {
  body: { configuration: { target?: "ip"; value?: string } | { target?: "ip6"; value?: string } | { target?: "ip_range"; value?: string } | { target?: "asn"; value?: string } | { target?: "country"; value?: string }; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; notes?: unknown };
}

export const CreateAnIpAccessRuleRequest = Schema.Struct({
  body: Schema.Struct({
  configuration: Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip6"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip_range"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("asn"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("country"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
})),
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  notes: Schema.optional(Schema.NullOr(Schema.Unknown))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/user/firewall/access_rules/rules" }),
).annotations({ identifier: "CreateAnIpAccessRuleRequest" }) as unknown as Schema.Schema<CreateAnIpAccessRuleRequest>;

export interface CreateAnIpAccessRuleResponse {
  result: { allowed_modes: ("block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge")[]; configuration: { target?: "ip"; value?: string } | { target?: "ip6"; value?: string } | { target?: "ip_range"; value?: string } | { target?: "asn"; value?: string } | { target?: "country"; value?: string }; created_on?: string; id: string; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; modified_on?: string; notes?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateAnIpAccessRuleResponse = Schema.Struct({
  result: Schema.Struct({
  allowed_modes: Schema.Array(Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge")),
  configuration: Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip6"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip_range"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("asn"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("country"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
})),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.String,
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  notes: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateAnIpAccessRuleResponse" }) as unknown as Schema.Schema<CreateAnIpAccessRuleResponse>;

export const createAnIpAccessRule: (
  input: CreateAnIpAccessRuleRequest
) => Effect.Effect<
  CreateAnIpAccessRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAnIpAccessRuleRequest,
  output: CreateAnIpAccessRuleResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface DeleteAnIpAccessRuleRequest {
  rule_id: string;
}

export const DeleteAnIpAccessRuleRequest = Schema.Struct({
  rule_id: Schema.String.pipe(T.HttpPath("rule_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/user/firewall/access_rules/rules/{rule_id}" }),
).annotations({ identifier: "DeleteAnIpAccessRuleRequest" }) as unknown as Schema.Schema<DeleteAnIpAccessRuleRequest>;

export interface DeleteAnIpAccessRuleResponse {
  result: { id?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAnIpAccessRuleResponse = Schema.Struct({
  result: Schema.Struct({
  id: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteAnIpAccessRuleResponse" }) as unknown as Schema.Schema<DeleteAnIpAccessRuleResponse>;

export const deleteAnIpAccessRule: (
  input: DeleteAnIpAccessRuleRequest
) => Effect.Effect<
  DeleteAnIpAccessRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAnIpAccessRuleRequest,
  output: DeleteAnIpAccessRuleResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UpdateAnIpAccessRuleRequest {
  rule_id: string;
  body: { mode?: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; notes?: string };
}

export const UpdateAnIpAccessRuleRequest = Schema.Struct({
  rule_id: Schema.String.pipe(T.HttpPath("rule_id")),
  body: Schema.Struct({
  mode: Schema.optional(Schema.NullOr(Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"))),
  notes: Schema.optional(Schema.NullOr(Schema.String))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/user/firewall/access_rules/rules/{rule_id}" }),
).annotations({ identifier: "UpdateAnIpAccessRuleRequest" }) as unknown as Schema.Schema<UpdateAnIpAccessRuleRequest>;

export interface UpdateAnIpAccessRuleResponse {
  result: { allowed_modes: ("block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge")[]; configuration: { target?: "ip"; value?: string } | { target?: "ip6"; value?: string } | { target?: "ip_range"; value?: string } | { target?: "asn"; value?: string } | { target?: "country"; value?: string }; created_on?: string; id: string; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; modified_on?: string; notes?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAnIpAccessRuleResponse = Schema.Struct({
  result: Schema.Struct({
  allowed_modes: Schema.Array(Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge")),
  configuration: Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip6"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("ip_range"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("asn"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
}), Schema.Struct({
  target: Schema.optional(Schema.NullOr(Schema.Literal("country"))),
  value: Schema.optional(Schema.NullOr(Schema.String))
})),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.String,
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  notes: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateAnIpAccessRuleResponse" }) as unknown as Schema.Schema<UpdateAnIpAccessRuleResponse>;

export const updateAnIpAccessRule: (
  input: UpdateAnIpAccessRuleRequest
) => Effect.Effect<
  UpdateAnIpAccessRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAnIpAccessRuleRequest,
  output: UpdateAnIpAccessRuleResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListInvitationsRequest {
}

export const ListInvitationsRequest = Schema.Struct({

}).pipe(
  T.Http({ method: "GET", path: "/user/invites" }),
).annotations({ identifier: "ListInvitationsRequest" }) as unknown as Schema.Schema<ListInvitationsRequest>;

export interface ListInvitationsResponse {
  result: ({ expires_on?: string; id?: string; invited_by?: string; invited_member_email?: string; invited_member_id: string; invited_on?: string; organization_id: string; organization_is_enforcing_twofactor?: boolean; organization_name?: string; roles?: string[]; status?: "pending" | "accepted" | "rejected" | "expired" })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListInvitationsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  invited_by: Schema.optional(Schema.NullOr(Schema.String)),
  invited_member_email: Schema.optional(Schema.NullOr(Schema.String)),
  invited_member_id: Schema.NullOr(Schema.String),
  invited_on: Schema.optional(Schema.NullOr(Schema.Date)),
  organization_id: Schema.String,
  organization_is_enforcing_twofactor: Schema.optional(Schema.NullOr(Schema.Boolean)),
  organization_name: Schema.optional(Schema.NullOr(Schema.String)),
  roles: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  status: Schema.optional(Schema.NullOr(Schema.Literal("pending", "accepted", "rejected", "expired")))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListInvitationsResponse" }) as unknown as Schema.Schema<ListInvitationsResponse>;

export const listInvitations: (
  input: ListInvitationsRequest
) => Effect.Effect<
  ListInvitationsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListInvitationsRequest,
  output: ListInvitationsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserSInvitesInvitationDetailsRequest {
  invite_id: string;
}

export const UserSInvitesInvitationDetailsRequest = Schema.Struct({
  invite_id: Schema.String.pipe(T.HttpPath("invite_id"))
}).pipe(
  T.Http({ method: "GET", path: "/user/invites/{invite_id}" }),
).annotations({ identifier: "UserSInvitesInvitationDetailsRequest" }) as unknown as Schema.Schema<UserSInvitesInvitationDetailsRequest>;

export interface UserSInvitesInvitationDetailsResponse {
  result: { expires_on?: string; id?: string; invited_by?: string; invited_member_email?: string; invited_member_id: string; invited_on?: string; organization_id: string; organization_is_enforcing_twofactor?: boolean; organization_name?: string; roles?: string[]; status?: "pending" | "accepted" | "rejected" | "expired" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserSInvitesInvitationDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  invited_by: Schema.optional(Schema.NullOr(Schema.String)),
  invited_member_email: Schema.optional(Schema.NullOr(Schema.String)),
  invited_member_id: Schema.NullOr(Schema.String),
  invited_on: Schema.optional(Schema.NullOr(Schema.Date)),
  organization_id: Schema.String,
  organization_is_enforcing_twofactor: Schema.optional(Schema.NullOr(Schema.Boolean)),
  organization_name: Schema.optional(Schema.NullOr(Schema.String)),
  roles: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  status: Schema.optional(Schema.NullOr(Schema.Literal("pending", "accepted", "rejected", "expired")))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserSInvitesInvitationDetailsResponse" }) as unknown as Schema.Schema<UserSInvitesInvitationDetailsResponse>;

export const userSInvitesInvitationDetails: (
  input: UserSInvitesInvitationDetailsRequest
) => Effect.Effect<
  UserSInvitesInvitationDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserSInvitesInvitationDetailsRequest,
  output: UserSInvitesInvitationDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserSInvitesRespondToInvitationRequest {
  invite_id: string;
  body: { status: "accepted" | "rejected" };
}

export const UserSInvitesRespondToInvitationRequest = Schema.Struct({
  invite_id: Schema.String.pipe(T.HttpPath("invite_id")),
  body: Schema.Struct({
  status: Schema.Literal("accepted", "rejected")
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/user/invites/{invite_id}" }),
).annotations({ identifier: "UserSInvitesRespondToInvitationRequest" }) as unknown as Schema.Schema<UserSInvitesRespondToInvitationRequest>;

export interface UserSInvitesRespondToInvitationResponse {
  result: { expires_on?: string; id?: string; invited_by?: string; invited_member_email?: string; invited_member_id: string; invited_on?: string; organization_id: string; organization_is_enforcing_twofactor?: boolean; organization_name?: string; roles?: string[]; status?: "pending" | "accepted" | "rejected" | "expired" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserSInvitesRespondToInvitationResponse = Schema.Struct({
  result: Schema.Struct({
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  invited_by: Schema.optional(Schema.NullOr(Schema.String)),
  invited_member_email: Schema.optional(Schema.NullOr(Schema.String)),
  invited_member_id: Schema.NullOr(Schema.String),
  invited_on: Schema.optional(Schema.NullOr(Schema.Date)),
  organization_id: Schema.String,
  organization_is_enforcing_twofactor: Schema.optional(Schema.NullOr(Schema.Boolean)),
  organization_name: Schema.optional(Schema.NullOr(Schema.String)),
  roles: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  status: Schema.optional(Schema.NullOr(Schema.Literal("pending", "accepted", "rejected", "expired")))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserSInvitesRespondToInvitationResponse" }) as unknown as Schema.Schema<UserSInvitesRespondToInvitationResponse>;

export const userSInvitesRespondToInvitation: (
  input: UserSInvitesRespondToInvitationRequest
) => Effect.Effect<
  UserSInvitesRespondToInvitationResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserSInvitesRespondToInvitationRequest,
  output: UserSInvitesRespondToInvitationResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListMonitorsRequest {
}

export const ListMonitorsRequest = Schema.Struct({

}).pipe(
  T.Http({ method: "GET", path: "/user/load_balancers/monitors" }),
).annotations({ identifier: "ListMonitorsRequest" }) as unknown as Schema.Schema<ListMonitorsRequest>;

export interface ListMonitorsResponse {
  result: unknown[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListMonitorsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListMonitorsResponse" }) as unknown as Schema.Schema<ListMonitorsResponse>;

export const listMonitors: (
  input: ListMonitorsRequest
) => Effect.Effect<
  ListMonitorsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListMonitorsRequest,
  output: ListMonitorsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface CreateMonitorRequest {
  body: unknown;
}

export const CreateMonitorRequest = Schema.Struct({
  body: Schema.Struct({
  allow_insecure: Schema.optional(Schema.NullOr(Schema.Boolean)),
  consecutive_down: Schema.optional(Schema.NullOr(Schema.Number)),
  consecutive_up: Schema.optional(Schema.NullOr(Schema.Number)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  expected_body: Schema.optional(Schema.NullOr(Schema.String)),
  expected_codes: Schema.optional(Schema.NullOr(Schema.String)),
  follow_redirects: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Array(Schema.String) }))),
  interval: Schema.optional(Schema.NullOr(Schema.Number)),
  method: Schema.optional(Schema.NullOr(Schema.String)),
  path: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  probe_zone: Schema.optional(Schema.NullOr(Schema.String)),
  retries: Schema.optional(Schema.NullOr(Schema.Number)),
  timeout: Schema.optional(Schema.NullOr(Schema.Number)),
  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp")))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/user/load_balancers/monitors" }),
).annotations({ identifier: "CreateMonitorRequest" }) as unknown as Schema.Schema<CreateMonitorRequest>;

export interface CreateMonitorResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateMonitorResponse = Schema.Struct({
  result: Schema.Struct({
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateMonitorResponse" }) as unknown as Schema.Schema<CreateMonitorResponse>;

export const createMonitor: (
  input: CreateMonitorRequest
) => Effect.Effect<
  CreateMonitorResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateMonitorRequest,
  output: CreateMonitorResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface LoadBalancerMonitorsMonitorDetailsRequest {
  monitor_id: string;
}

export const LoadBalancerMonitorsMonitorDetailsRequest = Schema.Struct({
  monitor_id: Schema.String.pipe(T.HttpPath("monitor_id"))
}).pipe(
  T.Http({ method: "GET", path: "/user/load_balancers/monitors/{monitor_id}" }),
).annotations({ identifier: "LoadBalancerMonitorsMonitorDetailsRequest" }) as unknown as Schema.Schema<LoadBalancerMonitorsMonitorDetailsRequest>;

export interface LoadBalancerMonitorsMonitorDetailsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const LoadBalancerMonitorsMonitorDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "LoadBalancerMonitorsMonitorDetailsResponse" }) as unknown as Schema.Schema<LoadBalancerMonitorsMonitorDetailsResponse>;

export const loadBalancerMonitorsMonitorDetails: (
  input: LoadBalancerMonitorsMonitorDetailsRequest
) => Effect.Effect<
  LoadBalancerMonitorsMonitorDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: LoadBalancerMonitorsMonitorDetailsRequest,
  output: LoadBalancerMonitorsMonitorDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UpdateMonitorRequest {
  monitor_id: string;
  body: unknown;
}

export const UpdateMonitorRequest = Schema.Struct({
  monitor_id: Schema.String.pipe(T.HttpPath("monitor_id")),
  body: Schema.Struct({
  allow_insecure: Schema.optional(Schema.NullOr(Schema.Boolean)),
  consecutive_down: Schema.optional(Schema.NullOr(Schema.Number)),
  consecutive_up: Schema.optional(Schema.NullOr(Schema.Number)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  expected_body: Schema.optional(Schema.NullOr(Schema.String)),
  expected_codes: Schema.optional(Schema.NullOr(Schema.String)),
  follow_redirects: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Array(Schema.String) }))),
  interval: Schema.optional(Schema.NullOr(Schema.Number)),
  method: Schema.optional(Schema.NullOr(Schema.String)),
  path: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  probe_zone: Schema.optional(Schema.NullOr(Schema.String)),
  retries: Schema.optional(Schema.NullOr(Schema.Number)),
  timeout: Schema.optional(Schema.NullOr(Schema.Number)),
  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp")))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/user/load_balancers/monitors/{monitor_id}" }),
).annotations({ identifier: "UpdateMonitorRequest" }) as unknown as Schema.Schema<UpdateMonitorRequest>;

export interface UpdateMonitorResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateMonitorResponse = Schema.Struct({
  result: Schema.Struct({
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateMonitorResponse" }) as unknown as Schema.Schema<UpdateMonitorResponse>;

export const updateMonitor: (
  input: UpdateMonitorRequest
) => Effect.Effect<
  UpdateMonitorResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateMonitorRequest,
  output: UpdateMonitorResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface DeleteMonitorRequest {
  monitor_id: string;
}

export const DeleteMonitorRequest = Schema.Struct({
  monitor_id: Schema.String.pipe(T.HttpPath("monitor_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/user/load_balancers/monitors/{monitor_id}" }),
).annotations({ identifier: "DeleteMonitorRequest" }) as unknown as Schema.Schema<DeleteMonitorRequest>;

export interface DeleteMonitorResponse {
  result: { id?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteMonitorResponse = Schema.Struct({
  result: Schema.Struct({
  id: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteMonitorResponse" }) as unknown as Schema.Schema<DeleteMonitorResponse>;

export const deleteMonitor: (
  input: DeleteMonitorRequest
) => Effect.Effect<
  DeleteMonitorResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteMonitorRequest,
  output: DeleteMonitorResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface PatchMonitorRequest {
  monitor_id: string;
  body: unknown;
}

export const PatchMonitorRequest = Schema.Struct({
  monitor_id: Schema.String.pipe(T.HttpPath("monitor_id")),
  body: Schema.Struct({
  allow_insecure: Schema.optional(Schema.NullOr(Schema.Boolean)),
  consecutive_down: Schema.optional(Schema.NullOr(Schema.Number)),
  consecutive_up: Schema.optional(Schema.NullOr(Schema.Number)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  expected_body: Schema.optional(Schema.NullOr(Schema.String)),
  expected_codes: Schema.optional(Schema.NullOr(Schema.String)),
  follow_redirects: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Array(Schema.String) }))),
  interval: Schema.optional(Schema.NullOr(Schema.Number)),
  method: Schema.optional(Schema.NullOr(Schema.String)),
  path: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  probe_zone: Schema.optional(Schema.NullOr(Schema.String)),
  retries: Schema.optional(Schema.NullOr(Schema.Number)),
  timeout: Schema.optional(Schema.NullOr(Schema.Number)),
  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp")))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/user/load_balancers/monitors/{monitor_id}" }),
).annotations({ identifier: "PatchMonitorRequest" }) as unknown as Schema.Schema<PatchMonitorRequest>;

export interface PatchMonitorResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchMonitorResponse = Schema.Struct({
  result: Schema.Struct({
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchMonitorResponse" }) as unknown as Schema.Schema<PatchMonitorResponse>;

export const patchMonitor: (
  input: PatchMonitorRequest
) => Effect.Effect<
  PatchMonitorResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchMonitorRequest,
  output: PatchMonitorResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface LoadBalancerMonitorsPreviewMonitorRequest {
  monitor_id: string;
  body: unknown;
}

export const LoadBalancerMonitorsPreviewMonitorRequest = Schema.Struct({
  monitor_id: Schema.String.pipe(T.HttpPath("monitor_id")),
  body: Schema.Struct({
  allow_insecure: Schema.optional(Schema.NullOr(Schema.Boolean)),
  consecutive_down: Schema.optional(Schema.NullOr(Schema.Number)),
  consecutive_up: Schema.optional(Schema.NullOr(Schema.Number)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  expected_body: Schema.optional(Schema.NullOr(Schema.String)),
  expected_codes: Schema.optional(Schema.NullOr(Schema.String)),
  follow_redirects: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Array(Schema.String) }))),
  interval: Schema.optional(Schema.NullOr(Schema.Number)),
  method: Schema.optional(Schema.NullOr(Schema.String)),
  path: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  probe_zone: Schema.optional(Schema.NullOr(Schema.String)),
  retries: Schema.optional(Schema.NullOr(Schema.Number)),
  timeout: Schema.optional(Schema.NullOr(Schema.Number)),
  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp")))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/user/load_balancers/monitors/{monitor_id}/preview" }),
).annotations({ identifier: "LoadBalancerMonitorsPreviewMonitorRequest" }) as unknown as Schema.Schema<LoadBalancerMonitorsPreviewMonitorRequest>;

export interface LoadBalancerMonitorsPreviewMonitorResponse {
  result: { pools?: Record<string, unknown>; preview_id?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const LoadBalancerMonitorsPreviewMonitorResponse = Schema.Struct({
  result: Schema.Struct({
  pools: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.String }))),
  preview_id: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "LoadBalancerMonitorsPreviewMonitorResponse" }) as unknown as Schema.Schema<LoadBalancerMonitorsPreviewMonitorResponse>;

export const loadBalancerMonitorsPreviewMonitor: (
  input: LoadBalancerMonitorsPreviewMonitorRequest
) => Effect.Effect<
  LoadBalancerMonitorsPreviewMonitorResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: LoadBalancerMonitorsPreviewMonitorRequest,
  output: LoadBalancerMonitorsPreviewMonitorResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListMonitorReferencesRequest {
  monitor_id: string;
}

export const ListMonitorReferencesRequest = Schema.Struct({
  monitor_id: Schema.String.pipe(T.HttpPath("monitor_id"))
}).pipe(
  T.Http({ method: "GET", path: "/user/load_balancers/monitors/{monitor_id}/references" }),
).annotations({ identifier: "ListMonitorReferencesRequest" }) as unknown as Schema.Schema<ListMonitorReferencesRequest>;

export interface ListMonitorReferencesResponse {
  result: ({ reference_type?: "*" | "referral" | "referrer"; resource_id?: string; resource_name?: string; resource_type?: string })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListMonitorReferencesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  reference_type: Schema.optional(Schema.NullOr(Schema.Literal("*", "referral", "referrer"))),
  resource_id: Schema.optional(Schema.NullOr(Schema.String)),
  resource_name: Schema.optional(Schema.NullOr(Schema.String)),
  resource_type: Schema.optional(Schema.NullOr(Schema.String))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListMonitorReferencesResponse" }) as unknown as Schema.Schema<ListMonitorReferencesResponse>;

export const listMonitorReferences: (
  input: ListMonitorReferencesRequest
) => Effect.Effect<
  ListMonitorReferencesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListMonitorReferencesRequest,
  output: ListMonitorReferencesResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListPoolsRequest {
  monitor?: string;
}

export const ListPoolsRequest = Schema.Struct({
  monitor: Schema.optional(Schema.String).pipe(T.HttpQuery("monitor"))
}).pipe(
  T.Http({ method: "GET", path: "/user/load_balancers/pools" }),
).annotations({ identifier: "ListPoolsRequest" }) as unknown as Schema.Schema<ListPoolsRequest>;

export interface ListPoolsResponse {
  result: ({ check_regions?: ("WNAM" | "ENAM" | "WEU" | "EEU" | "NSAM" | "SSAM" | "OC" | "ME" | "NAF" | "SAF" | "SAS" | "SEAS" | "NEAS" | "ALL_REGIONS")[]; created_on?: string; description?: string; disabled_at?: string; enabled?: boolean; id?: string; latitude?: number; load_shedding?: { default_percent?: number; default_policy?: "random" | "hash"; session_percent?: number; session_policy?: "hash" }; longitude?: number; minimum_origins?: number; modified_on?: string; monitor?: string; monitor_group?: string; name?: string; networks?: string[]; notification_email?: string; notification_filter?: { origin?: { disable?: boolean; healthy?: boolean }; pool?: { disable?: boolean; healthy?: boolean } }; origin_steering?: { policy?: "random" | "hash" | "least_outstanding_requests" | "least_connections" }; origins?: { address?: string; disabled_at?: string; enabled?: boolean; header?: { Host?: string[] }; name?: string; port?: number; virtual_network_id?: string; weight?: number }[] })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListPoolsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  check_regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("WNAM", "ENAM", "WEU", "EEU", "NSAM", "SSAM", "OC", "ME", "NAF", "SAF", "SAS", "SEAS", "NEAS", "ALL_REGIONS")))),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  latitude: Schema.optional(Schema.NullOr(Schema.Number)),
  load_shedding: Schema.optional(Schema.NullOr(Schema.Struct({
  default_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  default_policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash"))),
  session_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  session_policy: Schema.optional(Schema.NullOr(Schema.Literal("hash")))
}))),
  longitude: Schema.optional(Schema.NullOr(Schema.Number)),
  minimum_origins: Schema.optional(Schema.NullOr(Schema.Number)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  monitor: Schema.optional(Schema.NullOr(Schema.String)),
  monitor_group: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  networks: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  notification_email: Schema.optional(Schema.NullOr(Schema.String)),
  notification_filter: Schema.optional(Schema.NullOr(Schema.Struct({
  origin: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
}))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
})))
}))),
  origin_steering: Schema.optional(Schema.NullOr(Schema.Struct({
  policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash", "least_outstanding_requests", "least_connections")))
}))),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Struct({
  Host: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  virtual_network_id: Schema.optional(Schema.NullOr(Schema.String)),
  weight: Schema.optional(Schema.NullOr(Schema.Number))
}))))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListPoolsResponse" }) as unknown as Schema.Schema<ListPoolsResponse>;

export const listPools: (
  input: ListPoolsRequest
) => Effect.Effect<
  ListPoolsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPoolsRequest,
  output: ListPoolsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface CreatePoolRequest {
  body: { check_regions?: ("WNAM" | "ENAM" | "WEU" | "EEU" | "NSAM" | "SSAM" | "OC" | "ME" | "NAF" | "SAF" | "SAS" | "SEAS" | "NEAS" | "ALL_REGIONS")[]; description?: string; enabled?: boolean; latitude?: number; load_shedding?: { default_percent?: number; default_policy?: "random" | "hash"; session_percent?: number; session_policy?: "hash" }; longitude?: number; minimum_origins?: number; monitor?: string; monitor_group?: string; name: string; networks?: string[]; notification_email?: string; notification_filter?: { origin?: { disable?: boolean; healthy?: boolean }; pool?: { disable?: boolean; healthy?: boolean } }; origin_steering?: { policy?: "random" | "hash" | "least_outstanding_requests" | "least_connections" }; origins: { address?: string; disabled_at?: string; enabled?: boolean; header?: { Host?: string[] }; name?: string; port?: number; virtual_network_id?: string; weight?: number }[] };
}

export const CreatePoolRequest = Schema.Struct({
  body: Schema.Struct({
  check_regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("WNAM", "ENAM", "WEU", "EEU", "NSAM", "SSAM", "OC", "ME", "NAF", "SAF", "SAS", "SEAS", "NEAS", "ALL_REGIONS")))),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  latitude: Schema.optional(Schema.NullOr(Schema.Number)),
  load_shedding: Schema.optional(Schema.NullOr(Schema.Struct({
  default_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  default_policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash"))),
  session_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  session_policy: Schema.optional(Schema.NullOr(Schema.Literal("hash")))
}))),
  longitude: Schema.optional(Schema.NullOr(Schema.Number)),
  minimum_origins: Schema.optional(Schema.NullOr(Schema.Number)),
  monitor: Schema.optional(Schema.NullOr(Schema.String)),
  monitor_group: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String,
  networks: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  notification_email: Schema.optional(Schema.NullOr(Schema.String)),
  notification_filter: Schema.optional(Schema.NullOr(Schema.Struct({
  origin: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
}))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
})))
}))),
  origin_steering: Schema.optional(Schema.NullOr(Schema.Struct({
  policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash", "least_outstanding_requests", "least_connections")))
}))),
  origins: Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Struct({
  Host: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  virtual_network_id: Schema.optional(Schema.NullOr(Schema.String)),
  weight: Schema.optional(Schema.NullOr(Schema.Number))
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/user/load_balancers/pools" }),
).annotations({ identifier: "CreatePoolRequest" }) as unknown as Schema.Schema<CreatePoolRequest>;

export interface CreatePoolResponse {
  result: { check_regions?: ("WNAM" | "ENAM" | "WEU" | "EEU" | "NSAM" | "SSAM" | "OC" | "ME" | "NAF" | "SAF" | "SAS" | "SEAS" | "NEAS" | "ALL_REGIONS")[]; created_on?: string; description?: string; disabled_at?: string; enabled?: boolean; id?: string; latitude?: number; load_shedding?: { default_percent?: number; default_policy?: "random" | "hash"; session_percent?: number; session_policy?: "hash" }; longitude?: number; minimum_origins?: number; modified_on?: string; monitor?: string; monitor_group?: string; name?: string; networks?: string[]; notification_email?: string; notification_filter?: { origin?: { disable?: boolean; healthy?: boolean }; pool?: { disable?: boolean; healthy?: boolean } }; origin_steering?: { policy?: "random" | "hash" | "least_outstanding_requests" | "least_connections" }; origins?: { address?: string; disabled_at?: string; enabled?: boolean; header?: { Host?: string[] }; name?: string; port?: number; virtual_network_id?: string; weight?: number }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreatePoolResponse = Schema.Struct({
  result: Schema.Struct({
  check_regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("WNAM", "ENAM", "WEU", "EEU", "NSAM", "SSAM", "OC", "ME", "NAF", "SAF", "SAS", "SEAS", "NEAS", "ALL_REGIONS")))),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  latitude: Schema.optional(Schema.NullOr(Schema.Number)),
  load_shedding: Schema.optional(Schema.NullOr(Schema.Struct({
  default_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  default_policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash"))),
  session_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  session_policy: Schema.optional(Schema.NullOr(Schema.Literal("hash")))
}))),
  longitude: Schema.optional(Schema.NullOr(Schema.Number)),
  minimum_origins: Schema.optional(Schema.NullOr(Schema.Number)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  monitor: Schema.optional(Schema.NullOr(Schema.String)),
  monitor_group: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  networks: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  notification_email: Schema.optional(Schema.NullOr(Schema.String)),
  notification_filter: Schema.optional(Schema.NullOr(Schema.Struct({
  origin: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
}))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
})))
}))),
  origin_steering: Schema.optional(Schema.NullOr(Schema.Struct({
  policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash", "least_outstanding_requests", "least_connections")))
}))),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Struct({
  Host: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  virtual_network_id: Schema.optional(Schema.NullOr(Schema.String)),
  weight: Schema.optional(Schema.NullOr(Schema.Number))
}))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreatePoolResponse" }) as unknown as Schema.Schema<CreatePoolResponse>;

export const createPool: (
  input: CreatePoolRequest
) => Effect.Effect<
  CreatePoolResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePoolRequest,
  output: CreatePoolResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface PatchPoolsRequest {
  body: string;
}

export const PatchPoolsRequest = Schema.Struct({
  body: Schema.String.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/user/load_balancers/pools" }),
).annotations({ identifier: "PatchPoolsRequest" }) as unknown as Schema.Schema<PatchPoolsRequest>;

export interface PatchPoolsResponse {
  result: ({ check_regions?: ("WNAM" | "ENAM" | "WEU" | "EEU" | "NSAM" | "SSAM" | "OC" | "ME" | "NAF" | "SAF" | "SAS" | "SEAS" | "NEAS" | "ALL_REGIONS")[]; created_on?: string; description?: string; disabled_at?: string; enabled?: boolean; id?: string; latitude?: number; load_shedding?: { default_percent?: number; default_policy?: "random" | "hash"; session_percent?: number; session_policy?: "hash" }; longitude?: number; minimum_origins?: number; modified_on?: string; monitor?: string; monitor_group?: string; name?: string; networks?: string[]; notification_email?: string; notification_filter?: { origin?: { disable?: boolean; healthy?: boolean }; pool?: { disable?: boolean; healthy?: boolean } }; origin_steering?: { policy?: "random" | "hash" | "least_outstanding_requests" | "least_connections" }; origins?: { address?: string; disabled_at?: string; enabled?: boolean; header?: { Host?: string[] }; name?: string; port?: number; virtual_network_id?: string; weight?: number }[] })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchPoolsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  check_regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("WNAM", "ENAM", "WEU", "EEU", "NSAM", "SSAM", "OC", "ME", "NAF", "SAF", "SAS", "SEAS", "NEAS", "ALL_REGIONS")))),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  latitude: Schema.optional(Schema.NullOr(Schema.Number)),
  load_shedding: Schema.optional(Schema.NullOr(Schema.Struct({
  default_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  default_policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash"))),
  session_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  session_policy: Schema.optional(Schema.NullOr(Schema.Literal("hash")))
}))),
  longitude: Schema.optional(Schema.NullOr(Schema.Number)),
  minimum_origins: Schema.optional(Schema.NullOr(Schema.Number)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  monitor: Schema.optional(Schema.NullOr(Schema.String)),
  monitor_group: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  networks: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  notification_email: Schema.optional(Schema.NullOr(Schema.String)),
  notification_filter: Schema.optional(Schema.NullOr(Schema.Struct({
  origin: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
}))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
})))
}))),
  origin_steering: Schema.optional(Schema.NullOr(Schema.Struct({
  policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash", "least_outstanding_requests", "least_connections")))
}))),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Struct({
  Host: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  virtual_network_id: Schema.optional(Schema.NullOr(Schema.String)),
  weight: Schema.optional(Schema.NullOr(Schema.Number))
}))))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchPoolsResponse" }) as unknown as Schema.Schema<PatchPoolsResponse>;

export const patchPools: (
  input: PatchPoolsRequest
) => Effect.Effect<
  PatchPoolsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPoolsRequest,
  output: PatchPoolsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface LoadBalancerPoolsPoolDetailsRequest {
  pool_id: string;
}

export const LoadBalancerPoolsPoolDetailsRequest = Schema.Struct({
  pool_id: Schema.String.pipe(T.HttpPath("pool_id"))
}).pipe(
  T.Http({ method: "GET", path: "/user/load_balancers/pools/{pool_id}" }),
).annotations({ identifier: "LoadBalancerPoolsPoolDetailsRequest" }) as unknown as Schema.Schema<LoadBalancerPoolsPoolDetailsRequest>;

export interface LoadBalancerPoolsPoolDetailsResponse {
  result: { check_regions?: ("WNAM" | "ENAM" | "WEU" | "EEU" | "NSAM" | "SSAM" | "OC" | "ME" | "NAF" | "SAF" | "SAS" | "SEAS" | "NEAS" | "ALL_REGIONS")[]; created_on?: string; description?: string; disabled_at?: string; enabled?: boolean; id?: string; latitude?: number; load_shedding?: { default_percent?: number; default_policy?: "random" | "hash"; session_percent?: number; session_policy?: "hash" }; longitude?: number; minimum_origins?: number; modified_on?: string; monitor?: string; monitor_group?: string; name?: string; networks?: string[]; notification_email?: string; notification_filter?: { origin?: { disable?: boolean; healthy?: boolean }; pool?: { disable?: boolean; healthy?: boolean } }; origin_steering?: { policy?: "random" | "hash" | "least_outstanding_requests" | "least_connections" }; origins?: { address?: string; disabled_at?: string; enabled?: boolean; header?: { Host?: string[] }; name?: string; port?: number; virtual_network_id?: string; weight?: number }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const LoadBalancerPoolsPoolDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  check_regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("WNAM", "ENAM", "WEU", "EEU", "NSAM", "SSAM", "OC", "ME", "NAF", "SAF", "SAS", "SEAS", "NEAS", "ALL_REGIONS")))),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  latitude: Schema.optional(Schema.NullOr(Schema.Number)),
  load_shedding: Schema.optional(Schema.NullOr(Schema.Struct({
  default_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  default_policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash"))),
  session_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  session_policy: Schema.optional(Schema.NullOr(Schema.Literal("hash")))
}))),
  longitude: Schema.optional(Schema.NullOr(Schema.Number)),
  minimum_origins: Schema.optional(Schema.NullOr(Schema.Number)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  monitor: Schema.optional(Schema.NullOr(Schema.String)),
  monitor_group: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  networks: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  notification_email: Schema.optional(Schema.NullOr(Schema.String)),
  notification_filter: Schema.optional(Schema.NullOr(Schema.Struct({
  origin: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
}))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
})))
}))),
  origin_steering: Schema.optional(Schema.NullOr(Schema.Struct({
  policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash", "least_outstanding_requests", "least_connections")))
}))),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Struct({
  Host: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  virtual_network_id: Schema.optional(Schema.NullOr(Schema.String)),
  weight: Schema.optional(Schema.NullOr(Schema.Number))
}))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "LoadBalancerPoolsPoolDetailsResponse" }) as unknown as Schema.Schema<LoadBalancerPoolsPoolDetailsResponse>;

export const loadBalancerPoolsPoolDetails: (
  input: LoadBalancerPoolsPoolDetailsRequest
) => Effect.Effect<
  LoadBalancerPoolsPoolDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: LoadBalancerPoolsPoolDetailsRequest,
  output: LoadBalancerPoolsPoolDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UpdatePoolRequest {
  pool_id: string;
  body: { check_regions?: ("WNAM" | "ENAM" | "WEU" | "EEU" | "NSAM" | "SSAM" | "OC" | "ME" | "NAF" | "SAF" | "SAS" | "SEAS" | "NEAS" | "ALL_REGIONS")[]; description?: string; disabled_at?: string; enabled?: boolean; latitude?: number; load_shedding?: { default_percent?: number; default_policy?: "random" | "hash"; session_percent?: number; session_policy?: "hash" }; longitude?: number; minimum_origins?: number; monitor?: string; monitor_group?: string; name: string; networks?: string[]; notification_email?: string; notification_filter?: { origin?: { disable?: boolean; healthy?: boolean }; pool?: { disable?: boolean; healthy?: boolean } }; origin_steering?: { policy?: "random" | "hash" | "least_outstanding_requests" | "least_connections" }; origins: { address?: string; disabled_at?: string; enabled?: boolean; header?: { Host?: string[] }; name?: string; port?: number; virtual_network_id?: string; weight?: number }[] };
}

export const UpdatePoolRequest = Schema.Struct({
  pool_id: Schema.String.pipe(T.HttpPath("pool_id")),
  body: Schema.Struct({
  check_regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("WNAM", "ENAM", "WEU", "EEU", "NSAM", "SSAM", "OC", "ME", "NAF", "SAF", "SAS", "SEAS", "NEAS", "ALL_REGIONS")))),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  latitude: Schema.optional(Schema.NullOr(Schema.Number)),
  load_shedding: Schema.optional(Schema.NullOr(Schema.Struct({
  default_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  default_policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash"))),
  session_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  session_policy: Schema.optional(Schema.NullOr(Schema.Literal("hash")))
}))),
  longitude: Schema.optional(Schema.NullOr(Schema.Number)),
  minimum_origins: Schema.optional(Schema.NullOr(Schema.Number)),
  monitor: Schema.optional(Schema.NullOr(Schema.String)),
  monitor_group: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String,
  networks: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  notification_email: Schema.optional(Schema.NullOr(Schema.String)),
  notification_filter: Schema.optional(Schema.NullOr(Schema.Struct({
  origin: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
}))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
})))
}))),
  origin_steering: Schema.optional(Schema.NullOr(Schema.Struct({
  policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash", "least_outstanding_requests", "least_connections")))
}))),
  origins: Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Struct({
  Host: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  virtual_network_id: Schema.optional(Schema.NullOr(Schema.String)),
  weight: Schema.optional(Schema.NullOr(Schema.Number))
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/user/load_balancers/pools/{pool_id}" }),
).annotations({ identifier: "UpdatePoolRequest" }) as unknown as Schema.Schema<UpdatePoolRequest>;

export interface UpdatePoolResponse {
  result: { check_regions?: ("WNAM" | "ENAM" | "WEU" | "EEU" | "NSAM" | "SSAM" | "OC" | "ME" | "NAF" | "SAF" | "SAS" | "SEAS" | "NEAS" | "ALL_REGIONS")[]; created_on?: string; description?: string; disabled_at?: string; enabled?: boolean; id?: string; latitude?: number; load_shedding?: { default_percent?: number; default_policy?: "random" | "hash"; session_percent?: number; session_policy?: "hash" }; longitude?: number; minimum_origins?: number; modified_on?: string; monitor?: string; monitor_group?: string; name?: string; networks?: string[]; notification_email?: string; notification_filter?: { origin?: { disable?: boolean; healthy?: boolean }; pool?: { disable?: boolean; healthy?: boolean } }; origin_steering?: { policy?: "random" | "hash" | "least_outstanding_requests" | "least_connections" }; origins?: { address?: string; disabled_at?: string; enabled?: boolean; header?: { Host?: string[] }; name?: string; port?: number; virtual_network_id?: string; weight?: number }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdatePoolResponse = Schema.Struct({
  result: Schema.Struct({
  check_regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("WNAM", "ENAM", "WEU", "EEU", "NSAM", "SSAM", "OC", "ME", "NAF", "SAF", "SAS", "SEAS", "NEAS", "ALL_REGIONS")))),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  latitude: Schema.optional(Schema.NullOr(Schema.Number)),
  load_shedding: Schema.optional(Schema.NullOr(Schema.Struct({
  default_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  default_policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash"))),
  session_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  session_policy: Schema.optional(Schema.NullOr(Schema.Literal("hash")))
}))),
  longitude: Schema.optional(Schema.NullOr(Schema.Number)),
  minimum_origins: Schema.optional(Schema.NullOr(Schema.Number)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  monitor: Schema.optional(Schema.NullOr(Schema.String)),
  monitor_group: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  networks: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  notification_email: Schema.optional(Schema.NullOr(Schema.String)),
  notification_filter: Schema.optional(Schema.NullOr(Schema.Struct({
  origin: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
}))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
})))
}))),
  origin_steering: Schema.optional(Schema.NullOr(Schema.Struct({
  policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash", "least_outstanding_requests", "least_connections")))
}))),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Struct({
  Host: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  virtual_network_id: Schema.optional(Schema.NullOr(Schema.String)),
  weight: Schema.optional(Schema.NullOr(Schema.Number))
}))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdatePoolResponse" }) as unknown as Schema.Schema<UpdatePoolResponse>;

export const updatePool: (
  input: UpdatePoolRequest
) => Effect.Effect<
  UpdatePoolResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePoolRequest,
  output: UpdatePoolResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface DeletePoolRequest {
  pool_id: string;
}

export const DeletePoolRequest = Schema.Struct({
  pool_id: Schema.String.pipe(T.HttpPath("pool_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/user/load_balancers/pools/{pool_id}" }),
).annotations({ identifier: "DeletePoolRequest" }) as unknown as Schema.Schema<DeletePoolRequest>;

export interface DeletePoolResponse {
  result: { id?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeletePoolResponse = Schema.Struct({
  result: Schema.Struct({
  id: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeletePoolResponse" }) as unknown as Schema.Schema<DeletePoolResponse>;

export const deletePool: (
  input: DeletePoolRequest
) => Effect.Effect<
  DeletePoolResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePoolRequest,
  output: DeletePoolResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface PatchPoolRequest {
  pool_id: string;
  body: { check_regions?: ("WNAM" | "ENAM" | "WEU" | "EEU" | "NSAM" | "SSAM" | "OC" | "ME" | "NAF" | "SAF" | "SAS" | "SEAS" | "NEAS" | "ALL_REGIONS")[]; description?: string; disabled_at?: string; enabled?: boolean; latitude?: number; load_shedding?: { default_percent?: number; default_policy?: "random" | "hash"; session_percent?: number; session_policy?: "hash" }; longitude?: number; minimum_origins?: number; monitor?: string; monitor_group?: string; name?: string; notification_email?: string; notification_filter?: { origin?: { disable?: boolean; healthy?: boolean }; pool?: { disable?: boolean; healthy?: boolean } }; origin_steering?: { policy?: "random" | "hash" | "least_outstanding_requests" | "least_connections" }; origins?: { address?: string; disabled_at?: string; enabled?: boolean; header?: { Host?: string[] }; name?: string; port?: number; virtual_network_id?: string; weight?: number }[] };
}

export const PatchPoolRequest = Schema.Struct({
  pool_id: Schema.String.pipe(T.HttpPath("pool_id")),
  body: Schema.Struct({
  check_regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("WNAM", "ENAM", "WEU", "EEU", "NSAM", "SSAM", "OC", "ME", "NAF", "SAF", "SAS", "SEAS", "NEAS", "ALL_REGIONS")))),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  latitude: Schema.optional(Schema.NullOr(Schema.Number)),
  load_shedding: Schema.optional(Schema.NullOr(Schema.Struct({
  default_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  default_policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash"))),
  session_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  session_policy: Schema.optional(Schema.NullOr(Schema.Literal("hash")))
}))),
  longitude: Schema.optional(Schema.NullOr(Schema.Number)),
  minimum_origins: Schema.optional(Schema.NullOr(Schema.Number)),
  monitor: Schema.optional(Schema.NullOr(Schema.String)),
  monitor_group: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  notification_email: Schema.optional(Schema.NullOr(Schema.String)),
  notification_filter: Schema.optional(Schema.NullOr(Schema.Struct({
  origin: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
}))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
})))
}))),
  origin_steering: Schema.optional(Schema.NullOr(Schema.Struct({
  policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash", "least_outstanding_requests", "least_connections")))
}))),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Struct({
  Host: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  virtual_network_id: Schema.optional(Schema.NullOr(Schema.String)),
  weight: Schema.optional(Schema.NullOr(Schema.Number))
}))))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/user/load_balancers/pools/{pool_id}" }),
).annotations({ identifier: "PatchPoolRequest" }) as unknown as Schema.Schema<PatchPoolRequest>;

export interface PatchPoolResponse {
  result: { check_regions?: ("WNAM" | "ENAM" | "WEU" | "EEU" | "NSAM" | "SSAM" | "OC" | "ME" | "NAF" | "SAF" | "SAS" | "SEAS" | "NEAS" | "ALL_REGIONS")[]; created_on?: string; description?: string; disabled_at?: string; enabled?: boolean; id?: string; latitude?: number; load_shedding?: { default_percent?: number; default_policy?: "random" | "hash"; session_percent?: number; session_policy?: "hash" }; longitude?: number; minimum_origins?: number; modified_on?: string; monitor?: string; monitor_group?: string; name?: string; networks?: string[]; notification_email?: string; notification_filter?: { origin?: { disable?: boolean; healthy?: boolean }; pool?: { disable?: boolean; healthy?: boolean } }; origin_steering?: { policy?: "random" | "hash" | "least_outstanding_requests" | "least_connections" }; origins?: { address?: string; disabled_at?: string; enabled?: boolean; header?: { Host?: string[] }; name?: string; port?: number; virtual_network_id?: string; weight?: number }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchPoolResponse = Schema.Struct({
  result: Schema.Struct({
  check_regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("WNAM", "ENAM", "WEU", "EEU", "NSAM", "SSAM", "OC", "ME", "NAF", "SAF", "SAS", "SEAS", "NEAS", "ALL_REGIONS")))),
  created_on: Schema.optional(Schema.NullOr(Schema.Date)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  latitude: Schema.optional(Schema.NullOr(Schema.Number)),
  load_shedding: Schema.optional(Schema.NullOr(Schema.Struct({
  default_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  default_policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash"))),
  session_percent: Schema.optional(Schema.NullOr(Schema.Number)),
  session_policy: Schema.optional(Schema.NullOr(Schema.Literal("hash")))
}))),
  longitude: Schema.optional(Schema.NullOr(Schema.Number)),
  minimum_origins: Schema.optional(Schema.NullOr(Schema.Number)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  monitor: Schema.optional(Schema.NullOr(Schema.String)),
  monitor_group: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  networks: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  notification_email: Schema.optional(Schema.NullOr(Schema.String)),
  notification_filter: Schema.optional(Schema.NullOr(Schema.Struct({
  origin: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
}))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({
  disable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean))
})))
}))),
  origin_steering: Schema.optional(Schema.NullOr(Schema.Struct({
  policy: Schema.optional(Schema.NullOr(Schema.Literal("random", "hash", "least_outstanding_requests", "least_connections")))
}))),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  disabled_at: Schema.optional(Schema.NullOr(Schema.Date)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Struct({
  Host: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  virtual_network_id: Schema.optional(Schema.NullOr(Schema.String)),
  weight: Schema.optional(Schema.NullOr(Schema.Number))
}))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchPoolResponse" }) as unknown as Schema.Schema<PatchPoolResponse>;

export const patchPool: (
  input: PatchPoolRequest
) => Effect.Effect<
  PatchPoolResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPoolRequest,
  output: PatchPoolResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface LoadBalancerPoolsPoolHealthDetailsRequest {
  pool_id: string;
}

export const LoadBalancerPoolsPoolHealthDetailsRequest = Schema.Struct({
  pool_id: Schema.String.pipe(T.HttpPath("pool_id"))
}).pipe(
  T.Http({ method: "GET", path: "/user/load_balancers/pools/{pool_id}/health" }),
).annotations({ identifier: "LoadBalancerPoolsPoolHealthDetailsRequest" }) as unknown as Schema.Schema<LoadBalancerPoolsPoolHealthDetailsRequest>;

export interface LoadBalancerPoolsPoolHealthDetailsResponse {
  result: { pool_id?: string; pop_health?: { healthy?: boolean; origins?: { ip?: { failure_reason?: string; healthy?: boolean; response_code?: number; rtt?: string } }[] } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const LoadBalancerPoolsPoolHealthDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  pool_id: Schema.optional(Schema.NullOr(Schema.String)),
  pop_health: Schema.optional(Schema.NullOr(Schema.Struct({
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean)),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  ip: Schema.optional(Schema.NullOr(Schema.Struct({
  failure_reason: Schema.optional(Schema.NullOr(Schema.String)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean)),
  response_code: Schema.optional(Schema.NullOr(Schema.Number)),
  rtt: Schema.optional(Schema.NullOr(Schema.String))
})))
}))))
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "LoadBalancerPoolsPoolHealthDetailsResponse" }) as unknown as Schema.Schema<LoadBalancerPoolsPoolHealthDetailsResponse>;

export const loadBalancerPoolsPoolHealthDetails: (
  input: LoadBalancerPoolsPoolHealthDetailsRequest
) => Effect.Effect<
  LoadBalancerPoolsPoolHealthDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: LoadBalancerPoolsPoolHealthDetailsRequest,
  output: LoadBalancerPoolsPoolHealthDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface LoadBalancerPoolsPreviewPoolRequest {
  pool_id: string;
  body: unknown;
}

export const LoadBalancerPoolsPreviewPoolRequest = Schema.Struct({
  pool_id: Schema.String.pipe(T.HttpPath("pool_id")),
  body: Schema.Struct({
  allow_insecure: Schema.optional(Schema.NullOr(Schema.Boolean)),
  consecutive_down: Schema.optional(Schema.NullOr(Schema.Number)),
  consecutive_up: Schema.optional(Schema.NullOr(Schema.Number)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  expected_body: Schema.optional(Schema.NullOr(Schema.String)),
  expected_codes: Schema.optional(Schema.NullOr(Schema.String)),
  follow_redirects: Schema.optional(Schema.NullOr(Schema.Boolean)),
  header: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Array(Schema.String) }))),
  interval: Schema.optional(Schema.NullOr(Schema.Number)),
  method: Schema.optional(Schema.NullOr(Schema.String)),
  path: Schema.optional(Schema.NullOr(Schema.String)),
  port: Schema.optional(Schema.NullOr(Schema.Number)),
  probe_zone: Schema.optional(Schema.NullOr(Schema.String)),
  retries: Schema.optional(Schema.NullOr(Schema.Number)),
  timeout: Schema.optional(Schema.NullOr(Schema.Number)),
  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp")))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/user/load_balancers/pools/{pool_id}/preview" }),
).annotations({ identifier: "LoadBalancerPoolsPreviewPoolRequest" }) as unknown as Schema.Schema<LoadBalancerPoolsPreviewPoolRequest>;

export interface LoadBalancerPoolsPreviewPoolResponse {
  result: { pools?: Record<string, unknown>; preview_id?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const LoadBalancerPoolsPreviewPoolResponse = Schema.Struct({
  result: Schema.Struct({
  pools: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.String }))),
  preview_id: Schema.optional(Schema.NullOr(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "LoadBalancerPoolsPreviewPoolResponse" }) as unknown as Schema.Schema<LoadBalancerPoolsPreviewPoolResponse>;

export const loadBalancerPoolsPreviewPool: (
  input: LoadBalancerPoolsPreviewPoolRequest
) => Effect.Effect<
  LoadBalancerPoolsPreviewPoolResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: LoadBalancerPoolsPreviewPoolRequest,
  output: LoadBalancerPoolsPreviewPoolResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListPoolReferencesRequest {
  pool_id: string;
}

export const ListPoolReferencesRequest = Schema.Struct({
  pool_id: Schema.String.pipe(T.HttpPath("pool_id"))
}).pipe(
  T.Http({ method: "GET", path: "/user/load_balancers/pools/{pool_id}/references" }),
).annotations({ identifier: "ListPoolReferencesRequest" }) as unknown as Schema.Schema<ListPoolReferencesRequest>;

export interface ListPoolReferencesResponse {
  result: ({ reference_type?: "*" | "referral" | "referrer"; resource_id?: string; resource_name?: string; resource_type?: string })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListPoolReferencesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  reference_type: Schema.optional(Schema.NullOr(Schema.Literal("*", "referral", "referrer"))),
  resource_id: Schema.optional(Schema.NullOr(Schema.String)),
  resource_name: Schema.optional(Schema.NullOr(Schema.String)),
  resource_type: Schema.optional(Schema.NullOr(Schema.String))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListPoolReferencesResponse" }) as unknown as Schema.Schema<ListPoolReferencesResponse>;

export const listPoolReferences: (
  input: ListPoolReferencesRequest
) => Effect.Effect<
  ListPoolReferencesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPoolReferencesRequest,
  output: ListPoolReferencesResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface LoadBalancerMonitorsPreviewResultRequest {
  preview_id: unknown;
}

export const LoadBalancerMonitorsPreviewResultRequest = Schema.Struct({
  preview_id: Schema.Unknown.pipe(T.HttpPath("preview_id"))
}).pipe(
  T.Http({ method: "GET", path: "/user/load_balancers/preview/{preview_id}" }),
).annotations({ identifier: "LoadBalancerMonitorsPreviewResultRequest" }) as unknown as Schema.Schema<LoadBalancerMonitorsPreviewResultRequest>;

export interface LoadBalancerMonitorsPreviewResultResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const LoadBalancerMonitorsPreviewResultResponse = Schema.Struct({
  result: Schema.Record({ key: Schema.String, value: Schema.Struct({
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean)),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Record({ key: Schema.String, value: Schema.Struct({
  failure_reason: Schema.optional(Schema.NullOr(Schema.String)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean)),
  response_code: Schema.optional(Schema.NullOr(Schema.Number)),
  rtt: Schema.optional(Schema.NullOr(Schema.String))
}) }))))
}) }),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "LoadBalancerMonitorsPreviewResultResponse" }) as unknown as Schema.Schema<LoadBalancerMonitorsPreviewResultResponse>;

export const loadBalancerMonitorsPreviewResult: (
  input: LoadBalancerMonitorsPreviewResultRequest
) => Effect.Effect<
  LoadBalancerMonitorsPreviewResultResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: LoadBalancerMonitorsPreviewResultRequest,
  output: LoadBalancerMonitorsPreviewResultResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListHealthcheckEventsRequest {
  until?: string;
  pool_name?: string;
  origin_healthy?: boolean;
  pool_id?: string;
  since?: string;
  origin_name?: string;
  pool_healthy?: boolean;
}

export const ListHealthcheckEventsRequest = Schema.Struct({
  until: Schema.optional(Schema.Date).pipe(T.HttpQuery("until")),
  pool_name: Schema.optional(Schema.String).pipe(T.HttpQuery("pool_name")),
  origin_healthy: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("origin_healthy")),
  pool_id: Schema.optional(Schema.String).pipe(T.HttpQuery("pool_id")),
  since: Schema.optional(Schema.Date).pipe(T.HttpQuery("since")),
  origin_name: Schema.optional(Schema.String).pipe(T.HttpQuery("origin_name")),
  pool_healthy: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("pool_healthy"))
}).pipe(
  T.Http({ method: "GET", path: "/user/load_balancing_analytics/events" }),
).annotations({ identifier: "ListHealthcheckEventsRequest" }) as unknown as Schema.Schema<ListHealthcheckEventsRequest>;

export interface ListHealthcheckEventsResponse {
  result: { id?: number; origins?: { address?: string; changed?: boolean; enabled?: boolean; failure_reason?: string; healthy?: boolean; ip?: string; name?: string }[]; pool?: Record<string, unknown>; timestamp?: string }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListHealthcheckEventsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  id: Schema.optional(Schema.NullOr(Schema.Number)),
  origins: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  address: Schema.optional(Schema.NullOr(Schema.String)),
  changed: Schema.optional(Schema.NullOr(Schema.Boolean)),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  failure_reason: Schema.optional(Schema.NullOr(Schema.String)),
  healthy: Schema.optional(Schema.NullOr(Schema.Boolean)),
  ip: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String))
})))),
  pool: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  timestamp: Schema.optional(Schema.NullOr(Schema.Date))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListHealthcheckEventsResponse" }) as unknown as Schema.Schema<ListHealthcheckEventsResponse>;

export const listHealthcheckEvents: (
  input: ListHealthcheckEventsRequest
) => Effect.Effect<
  ListHealthcheckEventsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListHealthcheckEventsRequest,
  output: ListHealthcheckEventsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListOrganizationsRequest {
  name?: string;
  page?: number;
  per_page?: number;
  order?: "id" | "name" | "status";
  direction?: "asc" | "desc";
  match?: "any" | "all";
  status?: "member" | "invited";
}

export const ListOrganizationsRequest = Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("id", "name", "status")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
  match: Schema.optional(Schema.Literal("any", "all")).pipe(T.HttpQuery("match")),
  status: Schema.optional(Schema.Literal("member", "invited")).pipe(T.HttpQuery("status"))
}).pipe(
  T.Http({ method: "GET", path: "/user/organizations" }),
).annotations({ identifier: "ListOrganizationsRequest" }) as unknown as Schema.Schema<ListOrganizationsRequest>;

export interface ListOrganizationsResponse {
  result: ({ id?: string; name?: string; permissions?: string[]; roles?: string[]; status?: "member" | "invited" })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListOrganizationsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  id: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  permissions: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  roles: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  status: Schema.optional(Schema.NullOr(Schema.Literal("member", "invited")))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListOrganizationsResponse" }) as unknown as Schema.Schema<ListOrganizationsResponse>;

export const listOrganizations: (
  input: ListOrganizationsRequest
) => Effect.Effect<
  ListOrganizationsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOrganizationsRequest,
  output: ListOrganizationsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserSOrganizationsOrganizationDetailsRequest {
  organization_id: string;
}

export const UserSOrganizationsOrganizationDetailsRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id"))
}).pipe(
  T.Http({ method: "GET", path: "/user/organizations/{organization_id}" }),
).annotations({ identifier: "UserSOrganizationsOrganizationDetailsRequest" }) as unknown as Schema.Schema<UserSOrganizationsOrganizationDetailsRequest>;

export interface UserSOrganizationsOrganizationDetailsResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserSOrganizationsOrganizationDetailsResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserSOrganizationsOrganizationDetailsResponse" }) as unknown as Schema.Schema<UserSOrganizationsOrganizationDetailsResponse>;

export const userSOrganizationsOrganizationDetails: (
  input: UserSOrganizationsOrganizationDetailsRequest
) => Effect.Effect<
  UserSOrganizationsOrganizationDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserSOrganizationsOrganizationDetailsRequest,
  output: UserSOrganizationsOrganizationDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserSOrganizationsLeaveOrganizationRequest {
  organization_id: string;
}

export const UserSOrganizationsLeaveOrganizationRequest = Schema.Struct({
  organization_id: Schema.String.pipe(T.HttpPath("organization_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/user/organizations/{organization_id}" }),
).annotations({ identifier: "UserSOrganizationsLeaveOrganizationRequest" }) as unknown as Schema.Schema<UserSOrganizationsLeaveOrganizationRequest>;

export interface UserSOrganizationsLeaveOrganizationResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserSOrganizationsLeaveOrganizationResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserSOrganizationsLeaveOrganizationResponse" }) as unknown as Schema.Schema<UserSOrganizationsLeaveOrganizationResponse>;

export const userSOrganizationsLeaveOrganization: (
  input: UserSOrganizationsLeaveOrganizationRequest
) => Effect.Effect<
  UserSOrganizationsLeaveOrganizationResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserSOrganizationsLeaveOrganizationRequest,
  output: UserSOrganizationsLeaveOrganizationResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface GetUserSubscriptionsRequest {
}

export const GetUserSubscriptionsRequest = Schema.Struct({

}).pipe(
  T.Http({ method: "GET", path: "/user/subscriptions" }),
).annotations({ identifier: "GetUserSubscriptionsRequest" }) as unknown as Schema.Schema<GetUserSubscriptionsRequest>;

export interface GetUserSubscriptionsResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetUserSubscriptionsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetUserSubscriptionsResponse" }) as unknown as Schema.Schema<GetUserSubscriptionsResponse>;

export const getUserSubscriptions: (
  input: GetUserSubscriptionsRequest
) => Effect.Effect<
  GetUserSubscriptionsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetUserSubscriptionsRequest,
  output: GetUserSubscriptionsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UpdateUserSubscriptionRequest {
  identifier: string;
  body: { app?: unknown; component_values?: { default?: number; name?: string; price?: number; value?: number }[]; currency?: string; current_period_end?: string; current_period_start?: string; frequency?: "weekly" | "monthly" | "quarterly" | "yearly"; id?: string; price?: number; rate_plan?: { currency?: string; externally_managed?: boolean; id?: string; is_contract?: boolean; public_name?: string; scope?: string; sets?: string[] }; state?: "Trial" | "Provisioned" | "Paid" | "AwaitingPayment" | "Cancelled" | "Failed" | "Expired"; zone?: { id?: string; name?: string } };
}

export const UpdateUserSubscriptionRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  body: Schema.Struct({
  app: Schema.optional(Schema.NullOr(Schema.Unknown)),
  component_values: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  default: Schema.optional(Schema.NullOr(Schema.Number)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  price: Schema.optional(Schema.NullOr(Schema.Number)),
  value: Schema.optional(Schema.NullOr(Schema.Number))
})))),
  currency: Schema.optional(Schema.NullOr(Schema.String)),
  current_period_end: Schema.optional(Schema.NullOr(Schema.Date)),
  current_period_start: Schema.optional(Schema.NullOr(Schema.Date)),
  frequency: Schema.optional(Schema.NullOr(Schema.Literal("weekly", "monthly", "quarterly", "yearly"))),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  price: Schema.optional(Schema.NullOr(Schema.Number)),
  rate_plan: Schema.optional(Schema.NullOr(Schema.Struct({
  currency: Schema.optional(Schema.NullOr(Schema.String)),
  externally_managed: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  is_contract: Schema.optional(Schema.NullOr(Schema.Boolean)),
  public_name: Schema.optional(Schema.NullOr(Schema.String)),
  scope: Schema.optional(Schema.NullOr(Schema.String)),
  sets: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
}))),
  state: Schema.optional(Schema.NullOr(Schema.Literal("Trial", "Provisioned", "Paid", "AwaitingPayment", "Cancelled", "Failed", "Expired"))),
  zone: Schema.optional(Schema.NullOr(Schema.Struct({
  id: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String))
})))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/user/subscriptions/{identifier}" }),
).annotations({ identifier: "UpdateUserSubscriptionRequest" }) as unknown as Schema.Schema<UpdateUserSubscriptionRequest>;

export interface UpdateUserSubscriptionResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateUserSubscriptionResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateUserSubscriptionResponse" }) as unknown as Schema.Schema<UpdateUserSubscriptionResponse>;

export const updateUserSubscription: (
  input: UpdateUserSubscriptionRequest
) => Effect.Effect<
  UpdateUserSubscriptionResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateUserSubscriptionRequest,
  output: UpdateUserSubscriptionResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface DeleteUserSubscriptionRequest {
  identifier: string;
}

export const DeleteUserSubscriptionRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier"))
}).pipe(
  T.Http({ method: "DELETE", path: "/user/subscriptions/{identifier}" }),
).annotations({ identifier: "DeleteUserSubscriptionRequest" }) as unknown as Schema.Schema<DeleteUserSubscriptionRequest>;

export interface DeleteUserSubscriptionResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteUserSubscriptionResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteUserSubscriptionResponse" }) as unknown as Schema.Schema<DeleteUserSubscriptionResponse>;

export const deleteUserSubscription: (
  input: DeleteUserSubscriptionRequest
) => Effect.Effect<
  DeleteUserSubscriptionResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteUserSubscriptionRequest,
  output: DeleteUserSubscriptionResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListTokensRequest {
  page?: number;
  per_page?: number;
  direction?: "asc" | "desc";
}

export const ListTokensRequest = Schema.Struct({
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction"))
}).pipe(
  T.Http({ method: "GET", path: "/user/tokens" }),
).annotations({ identifier: "ListTokensRequest" }) as unknown as Schema.Schema<ListTokensRequest>;

export interface ListTokensResponse {
  result: ({ condition?: { request_ip?: { in?: string[]; not_in?: string[] } }; expires_on?: string; id?: string; issued_on?: string; last_used_on?: string; modified_on?: string; name?: string; not_before?: string; policies?: ({ effect: "allow" | "deny"; id: string; permission_groups: { id: string; meta?: { key?: string; value?: string }; name?: string }[]; resources: unknown })[]; status?: "active" | "disabled" | "expired" })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListTokensResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  condition: Schema.optional(Schema.NullOr(Schema.Struct({
  request_ip: Schema.optional(Schema.NullOr(Schema.Struct({
  in: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  not_in: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
})))
}))),
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  issued_on: Schema.optional(Schema.NullOr(Schema.Date)),
  last_used_on: Schema.optional(Schema.NullOr(Schema.Date)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  not_before: Schema.optional(Schema.NullOr(Schema.Date)),
  policies: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  effect: Schema.Literal("allow", "deny"),
  id: Schema.String,
  permission_groups: Schema.Array(Schema.Struct({
  id: Schema.String,
  meta: Schema.optional(Schema.NullOr(Schema.Struct({
  key: Schema.optional(Schema.NullOr(Schema.String)),
  value: Schema.optional(Schema.NullOr(Schema.String))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String))
})),
  resources: Schema.Union(Schema.Record({ key: Schema.String, value: Schema.String }), Schema.Record({ key: Schema.String, value: Schema.Record({ key: Schema.String, value: Schema.String }) }))
})))),
  status: Schema.optional(Schema.NullOr(Schema.Literal("active", "disabled", "expired")))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListTokensResponse" }) as unknown as Schema.Schema<ListTokensResponse>;

export const listTokens: (
  input: ListTokensRequest
) => Effect.Effect<
  ListTokensResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTokensRequest,
  output: ListTokensResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface CreateTokenRequest {
  body: { condition?: { request_ip?: { in?: string[]; not_in?: string[] } }; expires_on?: string; name: string; not_before?: string; policies: ({ effect: "allow" | "deny"; id: string; permission_groups: { id: string; meta?: { key?: string; value?: string }; name?: string }[]; resources: unknown })[] };
}

export const CreateTokenRequest = Schema.Struct({
  body: Schema.Struct({
  condition: Schema.optional(Schema.NullOr(Schema.Struct({
  request_ip: Schema.optional(Schema.NullOr(Schema.Struct({
  in: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  not_in: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
})))
}))),
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  name: Schema.String,
  not_before: Schema.optional(Schema.NullOr(Schema.Date)),
  policies: Schema.Array(Schema.Struct({
  effect: Schema.Literal("allow", "deny"),
  id: Schema.String,
  permission_groups: Schema.Array(Schema.Struct({
  id: Schema.String,
  meta: Schema.optional(Schema.NullOr(Schema.Struct({
  key: Schema.optional(Schema.NullOr(Schema.String)),
  value: Schema.optional(Schema.NullOr(Schema.String))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String))
})),
  resources: Schema.Union(Schema.Record({ key: Schema.String, value: Schema.String }), Schema.Record({ key: Schema.String, value: Schema.Record({ key: Schema.String, value: Schema.String }) }))
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/user/tokens" }),
).annotations({ identifier: "CreateTokenRequest" }) as unknown as Schema.Schema<CreateTokenRequest>;

export interface CreateTokenResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateTokenResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateTokenResponse" }) as unknown as Schema.Schema<CreateTokenResponse>;

export const createToken: (
  input: CreateTokenRequest
) => Effect.Effect<
  CreateTokenResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTokenRequest,
  output: CreateTokenResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListPermissionGroupsRequest {
  name?: string;
  scope?: string;
}

export const ListPermissionGroupsRequest = Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope"))
}).pipe(
  T.Http({ method: "GET", path: "/user/tokens/permission_groups" }),
).annotations({ identifier: "ListPermissionGroupsRequest" }) as unknown as Schema.Schema<ListPermissionGroupsRequest>;

export interface ListPermissionGroupsResponse {
  result: ({ id?: string; name?: string; scopes?: ("com.cloudflare.api.account" | "com.cloudflare.api.account.zone" | "com.cloudflare.api.user" | "com.cloudflare.edge.r2.bucket")[] })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListPermissionGroupsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  id: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  scopes: Schema.optional(Schema.NullOr(Schema.Array(Schema.Literal("com.cloudflare.api.account", "com.cloudflare.api.account.zone", "com.cloudflare.api.user", "com.cloudflare.edge.r2.bucket"))))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListPermissionGroupsResponse" }) as unknown as Schema.Schema<ListPermissionGroupsResponse>;

export const listPermissionGroups: (
  input: ListPermissionGroupsRequest
) => Effect.Effect<
  ListPermissionGroupsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPermissionGroupsRequest,
  output: ListPermissionGroupsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserApiTokensVerifyTokenRequest {
}

export const UserApiTokensVerifyTokenRequest = Schema.Struct({

}).pipe(
  T.Http({ method: "GET", path: "/user/tokens/verify" }),
).annotations({ identifier: "UserApiTokensVerifyTokenRequest" }) as unknown as Schema.Schema<UserApiTokensVerifyTokenRequest>;

export interface UserApiTokensVerifyTokenResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserApiTokensVerifyTokenResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserApiTokensVerifyTokenResponse" }) as unknown as Schema.Schema<UserApiTokensVerifyTokenResponse>;

export const userApiTokensVerifyToken: (
  input: UserApiTokensVerifyTokenRequest
) => Effect.Effect<
  UserApiTokensVerifyTokenResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserApiTokensVerifyTokenRequest,
  output: UserApiTokensVerifyTokenResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserApiTokensTokenDetailsRequest {
  token_id: string;
}

export const UserApiTokensTokenDetailsRequest = Schema.Struct({
  token_id: Schema.String.pipe(T.HttpPath("token_id"))
}).pipe(
  T.Http({ method: "GET", path: "/user/tokens/{token_id}" }),
).annotations({ identifier: "UserApiTokensTokenDetailsRequest" }) as unknown as Schema.Schema<UserApiTokensTokenDetailsRequest>;

export interface UserApiTokensTokenDetailsResponse {
  result: { condition?: { request_ip?: { in?: string[]; not_in?: string[] } }; expires_on?: string; id?: string; issued_on?: string; last_used_on?: string; modified_on?: string; name?: string; not_before?: string; policies?: ({ effect: "allow" | "deny"; id: string; permission_groups: { id: string; meta?: { key?: string; value?: string }; name?: string }[]; resources: unknown })[]; status?: "active" | "disabled" | "expired" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserApiTokensTokenDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  condition: Schema.optional(Schema.NullOr(Schema.Struct({
  request_ip: Schema.optional(Schema.NullOr(Schema.Struct({
  in: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  not_in: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
})))
}))),
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  issued_on: Schema.optional(Schema.NullOr(Schema.Date)),
  last_used_on: Schema.optional(Schema.NullOr(Schema.Date)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  not_before: Schema.optional(Schema.NullOr(Schema.Date)),
  policies: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  effect: Schema.Literal("allow", "deny"),
  id: Schema.String,
  permission_groups: Schema.Array(Schema.Struct({
  id: Schema.String,
  meta: Schema.optional(Schema.NullOr(Schema.Struct({
  key: Schema.optional(Schema.NullOr(Schema.String)),
  value: Schema.optional(Schema.NullOr(Schema.String))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String))
})),
  resources: Schema.Union(Schema.Record({ key: Schema.String, value: Schema.String }), Schema.Record({ key: Schema.String, value: Schema.Record({ key: Schema.String, value: Schema.String }) }))
})))),
  status: Schema.optional(Schema.NullOr(Schema.Literal("active", "disabled", "expired")))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserApiTokensTokenDetailsResponse" }) as unknown as Schema.Schema<UserApiTokensTokenDetailsResponse>;

export const userApiTokensTokenDetails: (
  input: UserApiTokensTokenDetailsRequest
) => Effect.Effect<
  UserApiTokensTokenDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserApiTokensTokenDetailsRequest,
  output: UserApiTokensTokenDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UpdateTokenRequest {
  token_id: string;
  body: unknown;
}

export const UpdateTokenRequest = Schema.Struct({
  token_id: Schema.String.pipe(T.HttpPath("token_id")),
  body: Schema.Struct({}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/user/tokens/{token_id}" }),
).annotations({ identifier: "UpdateTokenRequest" }) as unknown as Schema.Schema<UpdateTokenRequest>;

export interface UpdateTokenResponse {
  result: { condition?: { request_ip?: { in?: string[]; not_in?: string[] } }; expires_on?: string; id?: string; issued_on?: string; last_used_on?: string; modified_on?: string; name?: string; not_before?: string; policies?: ({ effect: "allow" | "deny"; id: string; permission_groups: { id: string; meta?: { key?: string; value?: string }; name?: string }[]; resources: unknown })[]; status?: "active" | "disabled" | "expired" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateTokenResponse = Schema.Struct({
  result: Schema.Struct({
  condition: Schema.optional(Schema.NullOr(Schema.Struct({
  request_ip: Schema.optional(Schema.NullOr(Schema.Struct({
  in: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  not_in: Schema.optional(Schema.NullOr(Schema.Array(Schema.String)))
})))
}))),
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  issued_on: Schema.optional(Schema.NullOr(Schema.Date)),
  last_used_on: Schema.optional(Schema.NullOr(Schema.Date)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  not_before: Schema.optional(Schema.NullOr(Schema.Date)),
  policies: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  effect: Schema.Literal("allow", "deny"),
  id: Schema.String,
  permission_groups: Schema.Array(Schema.Struct({
  id: Schema.String,
  meta: Schema.optional(Schema.NullOr(Schema.Struct({
  key: Schema.optional(Schema.NullOr(Schema.String)),
  value: Schema.optional(Schema.NullOr(Schema.String))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String))
})),
  resources: Schema.Union(Schema.Record({ key: Schema.String, value: Schema.String }), Schema.Record({ key: Schema.String, value: Schema.Record({ key: Schema.String, value: Schema.String }) }))
})))),
  status: Schema.optional(Schema.NullOr(Schema.Literal("active", "disabled", "expired")))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateTokenResponse" }) as unknown as Schema.Schema<UpdateTokenResponse>;

export const updateToken: (
  input: UpdateTokenRequest
) => Effect.Effect<
  UpdateTokenResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateTokenRequest,
  output: UpdateTokenResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface DeleteTokenRequest {
  token_id: string;
}

export const DeleteTokenRequest = Schema.Struct({
  token_id: Schema.String.pipe(T.HttpPath("token_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/user/tokens/{token_id}" }),
).annotations({ identifier: "DeleteTokenRequest" }) as unknown as Schema.Schema<DeleteTokenRequest>;

export interface DeleteTokenResponse {
  result: { id: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteTokenResponse = Schema.Struct({
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
}).annotations({ identifier: "DeleteTokenResponse" }) as unknown as Schema.Schema<DeleteTokenResponse>;

export const deleteToken: (
  input: DeleteTokenRequest
) => Effect.Effect<
  DeleteTokenResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteTokenRequest,
  output: DeleteTokenResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UserApiTokensRollTokenRequest {
  token_id: string;
  body: Record<string, unknown>;
}

export const UserApiTokensRollTokenRequest = Schema.Struct({
  token_id: Schema.String.pipe(T.HttpPath("token_id")),
  body: Schema.Struct({}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/user/tokens/{token_id}/value" }),
).annotations({ identifier: "UserApiTokensRollTokenRequest" }) as unknown as Schema.Schema<UserApiTokensRollTokenRequest>;

export interface UserApiTokensRollTokenResponse {
  result: string;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UserApiTokensRollTokenResponse = Schema.Struct({
  result: Schema.String,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UserApiTokensRollTokenResponse" }) as unknown as Schema.Schema<UserApiTokensRollTokenResponse>;

export const userApiTokensRollToken: (
  input: UserApiTokensRollTokenRequest
) => Effect.Effect<
  UserApiTokensRollTokenResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UserApiTokensRollTokenRequest,
  output: UserApiTokensRollTokenResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));
