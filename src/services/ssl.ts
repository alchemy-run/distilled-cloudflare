/**
 * Cloudflare SSL API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service ssl
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


export interface AnalyzeCertificateAnalyzeCertificateRequest {
  zone_id: string;
  body: { bundle_method?: "ubiquitous" | "optimal" | "force"; certificate?: string };
}

export const AnalyzeCertificateAnalyzeCertificateRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  bundle_method: Schema.optional(Schema.NullOr(Schema.Literal("ubiquitous", "optimal", "force"))),
  certificate: Schema.optional(Schema.NullOr(Schema.String))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/ssl/analyze" }),
).annotations({ identifier: "AnalyzeCertificateAnalyzeCertificateRequest" }) as unknown as Schema.Schema<AnalyzeCertificateAnalyzeCertificateRequest>;

export interface AnalyzeCertificateAnalyzeCertificateResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const AnalyzeCertificateAnalyzeCertificateResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "AnalyzeCertificateAnalyzeCertificateResponse" }) as unknown as Schema.Schema<AnalyzeCertificateAnalyzeCertificateResponse>;

export const analyzeCertificateAnalyzeCertificate: (
  input: AnalyzeCertificateAnalyzeCertificateRequest
) => Effect.Effect<
  AnalyzeCertificateAnalyzeCertificateResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: AnalyzeCertificateAnalyzeCertificateRequest,
  output: AnalyzeCertificateAnalyzeCertificateResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface ListCertificatePacksRequest {
  zone_id: string;
  status?: "all";
}

export const ListCertificatePacksRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  status: Schema.optional(Schema.Literal("all")).pipe(T.HttpQuery("status"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/certificate_packs" }),
).annotations({ identifier: "ListCertificatePacksRequest" }) as unknown as Schema.Schema<ListCertificatePacksRequest>;

export interface ListCertificatePacksResponse {
  result: ({ certificate_authority?: "google" | "lets_encrypt" | "ssl_com"; certificates: ({ bundle_method?: string; expires_on?: string; geo_restrictions?: { label?: "us" | "eu" | "highest_security" }; hosts: string[]; id: string; issuer?: string; modified_on?: string; priority?: number; signature?: string; status: string; uploaded_on?: string; zone_id?: string })[]; cloudflare_branding?: boolean; hosts: string[]; id: string; primary_certificate?: string; status: "initializing" | "pending_validation" | "deleted" | "pending_issuance" | "pending_deployment" | "pending_deletion" | "pending_expiration" | "expired" | "active" | "initializing_timed_out" | "validation_timed_out" | "issuance_timed_out" | "deployment_timed_out" | "deletion_timed_out" | "pending_cleanup" | "staging_deployment" | "staging_active" | "deactivating" | "inactive" | "backup_issued" | "holding_deployment"; type: "mh_custom" | "managed_hostname" | "sni_custom" | "universal" | "advanced" | "total_tls" | "keyless" | "legacy_custom"; validation_errors?: { message?: string }[]; validation_method?: "txt" | "http" | "email"; validation_records?: { emails?: string[]; http_body?: string; http_url?: string; txt_name?: string; txt_value?: string }[]; validity_days?: 14 | 30 | 90 | 365 })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListCertificatePacksResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  certificate_authority: Schema.optional(Schema.NullOr(Schema.Literal("google", "lets_encrypt", "ssl_com"))),
  certificates: Schema.Array(Schema.Struct({
  bundle_method: Schema.optional(Schema.NullOr(Schema.String)),
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  geo_restrictions: Schema.optional(Schema.NullOr(Schema.Struct({
  label: Schema.optional(Schema.NullOr(Schema.Literal("us", "eu", "highest_security")))
}))),
  hosts: Schema.Array(Schema.String),
  id: Schema.String,
  issuer: Schema.optional(Schema.NullOr(Schema.String)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  priority: Schema.optional(Schema.NullOr(Schema.Number)),
  signature: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.String,
  uploaded_on: Schema.optional(Schema.NullOr(Schema.Date)),
  zone_id: Schema.optional(Schema.NullOr(Schema.String))
})),
  cloudflare_branding: Schema.optional(Schema.NullOr(Schema.Boolean)),
  hosts: Schema.Array(Schema.String),
  id: Schema.String,
  primary_certificate: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.Literal("initializing", "pending_validation", "deleted", "pending_issuance", "pending_deployment", "pending_deletion", "pending_expiration", "expired", "active", "initializing_timed_out", "validation_timed_out", "issuance_timed_out", "deployment_timed_out", "deletion_timed_out", "pending_cleanup", "staging_deployment", "staging_active", "deactivating", "inactive", "backup_issued", "holding_deployment"),
  type: Schema.Literal("mh_custom", "managed_hostname", "sni_custom", "universal", "advanced", "total_tls", "keyless", "legacy_custom"),
  validation_errors: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  message: Schema.optional(Schema.NullOr(Schema.String))
})))),
  validation_method: Schema.optional(Schema.NullOr(Schema.Literal("txt", "http", "email"))),
  validation_records: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  emails: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  http_body: Schema.optional(Schema.NullOr(Schema.String)),
  http_url: Schema.optional(Schema.NullOr(Schema.String)),
  txt_name: Schema.optional(Schema.NullOr(Schema.String)),
  txt_value: Schema.optional(Schema.NullOr(Schema.String))
})))),
  validity_days: Schema.optional(Schema.NullOr(Schema.Literal(14, 30, 90, 365)))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListCertificatePacksResponse" }) as unknown as Schema.Schema<ListCertificatePacksResponse>;

export const listCertificatePacks: (
  input: ListCertificatePacksRequest
) => Effect.Effect<
  ListCertificatePacksResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCertificatePacksRequest,
  output: ListCertificatePacksResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface CertificatePacksOrderAdvancedCertificateManagerCertificatePackRequest {
  zone_id: string;
  body: { certificate_authority: "google" | "lets_encrypt" | "ssl_com"; cloudflare_branding?: boolean; hosts: string[]; type: "advanced"; validation_method: "txt" | "http" | "email"; validity_days: 14 | 30 | 90 | 365 };
}

export const CertificatePacksOrderAdvancedCertificateManagerCertificatePackRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  certificate_authority: Schema.Literal("google", "lets_encrypt", "ssl_com"),
  cloudflare_branding: Schema.optional(Schema.NullOr(Schema.Boolean)),
  hosts: Schema.Array(Schema.String),
  type: Schema.Literal("advanced"),
  validation_method: Schema.Literal("txt", "http", "email"),
  validity_days: Schema.Literal(14, 30, 90, 365)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/ssl/certificate_packs/order" }),
).annotations({ identifier: "CertificatePacksOrderAdvancedCertificateManagerCertificatePackRequest" }) as unknown as Schema.Schema<CertificatePacksOrderAdvancedCertificateManagerCertificatePackRequest>;

export interface CertificatePacksOrderAdvancedCertificateManagerCertificatePackResponse {
  result: { certificate_authority?: "google" | "lets_encrypt" | "ssl_com"; certificates: ({ bundle_method?: string; expires_on?: string; geo_restrictions?: { label?: "us" | "eu" | "highest_security" }; hosts: string[]; id: string; issuer?: string; modified_on?: string; priority?: number; signature?: string; status: string; uploaded_on?: string; zone_id?: string })[]; cloudflare_branding?: boolean; hosts: string[]; id: string; primary_certificate?: string; status: "initializing" | "pending_validation" | "deleted" | "pending_issuance" | "pending_deployment" | "pending_deletion" | "pending_expiration" | "expired" | "active" | "initializing_timed_out" | "validation_timed_out" | "issuance_timed_out" | "deployment_timed_out" | "deletion_timed_out" | "pending_cleanup" | "staging_deployment" | "staging_active" | "deactivating" | "inactive" | "backup_issued" | "holding_deployment"; type: "mh_custom" | "managed_hostname" | "sni_custom" | "universal" | "advanced" | "total_tls" | "keyless" | "legacy_custom"; validation_errors?: { message?: string }[]; validation_method?: "txt" | "http" | "email"; validation_records?: { emails?: string[]; http_body?: string; http_url?: string; txt_name?: string; txt_value?: string }[]; validity_days?: 14 | 30 | 90 | 365 };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CertificatePacksOrderAdvancedCertificateManagerCertificatePackResponse = Schema.Struct({
  result: Schema.Struct({
  certificate_authority: Schema.optional(Schema.NullOr(Schema.Literal("google", "lets_encrypt", "ssl_com"))),
  certificates: Schema.Array(Schema.Struct({
  bundle_method: Schema.optional(Schema.NullOr(Schema.String)),
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  geo_restrictions: Schema.optional(Schema.NullOr(Schema.Struct({
  label: Schema.optional(Schema.NullOr(Schema.Literal("us", "eu", "highest_security")))
}))),
  hosts: Schema.Array(Schema.String),
  id: Schema.String,
  issuer: Schema.optional(Schema.NullOr(Schema.String)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  priority: Schema.optional(Schema.NullOr(Schema.Number)),
  signature: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.String,
  uploaded_on: Schema.optional(Schema.NullOr(Schema.Date)),
  zone_id: Schema.optional(Schema.NullOr(Schema.String))
})),
  cloudflare_branding: Schema.optional(Schema.NullOr(Schema.Boolean)),
  hosts: Schema.Array(Schema.String),
  id: Schema.String,
  primary_certificate: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.Literal("initializing", "pending_validation", "deleted", "pending_issuance", "pending_deployment", "pending_deletion", "pending_expiration", "expired", "active", "initializing_timed_out", "validation_timed_out", "issuance_timed_out", "deployment_timed_out", "deletion_timed_out", "pending_cleanup", "staging_deployment", "staging_active", "deactivating", "inactive", "backup_issued", "holding_deployment"),
  type: Schema.Literal("mh_custom", "managed_hostname", "sni_custom", "universal", "advanced", "total_tls", "keyless", "legacy_custom"),
  validation_errors: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  message: Schema.optional(Schema.NullOr(Schema.String))
})))),
  validation_method: Schema.optional(Schema.NullOr(Schema.Literal("txt", "http", "email"))),
  validation_records: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  emails: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  http_body: Schema.optional(Schema.NullOr(Schema.String)),
  http_url: Schema.optional(Schema.NullOr(Schema.String)),
  txt_name: Schema.optional(Schema.NullOr(Schema.String)),
  txt_value: Schema.optional(Schema.NullOr(Schema.String))
})))),
  validity_days: Schema.optional(Schema.NullOr(Schema.Literal(14, 30, 90, 365)))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CertificatePacksOrderAdvancedCertificateManagerCertificatePackResponse" }) as unknown as Schema.Schema<CertificatePacksOrderAdvancedCertificateManagerCertificatePackResponse>;

export const certificatePacksOrderAdvancedCertificateManagerCertificatePack: (
  input: CertificatePacksOrderAdvancedCertificateManagerCertificatePackRequest
) => Effect.Effect<
  CertificatePacksOrderAdvancedCertificateManagerCertificatePackResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CertificatePacksOrderAdvancedCertificateManagerCertificatePackRequest,
  output: CertificatePacksOrderAdvancedCertificateManagerCertificatePackResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface GetCertificatePackQuotasRequest {
  zone_id: string;
}

export const GetCertificatePackQuotasRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/certificate_packs/quota" }),
).annotations({ identifier: "GetCertificatePackQuotasRequest" }) as unknown as Schema.Schema<GetCertificatePackQuotasRequest>;

export interface GetCertificatePackQuotasResponse {
  result: { advanced?: { allocated?: number; used?: number } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetCertificatePackQuotasResponse = Schema.Struct({
  result: Schema.Struct({
  advanced: Schema.optional(Schema.NullOr(Schema.Struct({
  allocated: Schema.optional(Schema.NullOr(Schema.Number)),
  used: Schema.optional(Schema.NullOr(Schema.Number))
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetCertificatePackQuotasResponse" }) as unknown as Schema.Schema<GetCertificatePackQuotasResponse>;

export const getCertificatePackQuotas: (
  input: GetCertificatePackQuotasRequest
) => Effect.Effect<
  GetCertificatePackQuotasResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCertificatePackQuotasRequest,
  output: GetCertificatePackQuotasResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface GetCertificatePackRequest {
  certificate_pack_id: string;
  zone_id: string;
}

export const GetCertificatePackRequest = Schema.Struct({
  certificate_pack_id: Schema.String.pipe(T.HttpPath("certificate_pack_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}" }),
).annotations({ identifier: "GetCertificatePackRequest" }) as unknown as Schema.Schema<GetCertificatePackRequest>;

export interface GetCertificatePackResponse {
  result: { certificate_authority?: "google" | "lets_encrypt" | "ssl_com"; certificates: ({ bundle_method?: string; expires_on?: string; geo_restrictions?: { label?: "us" | "eu" | "highest_security" }; hosts: string[]; id: string; issuer?: string; modified_on?: string; priority?: number; signature?: string; status: string; uploaded_on?: string; zone_id?: string })[]; cloudflare_branding?: boolean; hosts: string[]; id: string; primary_certificate?: string; status: "initializing" | "pending_validation" | "deleted" | "pending_issuance" | "pending_deployment" | "pending_deletion" | "pending_expiration" | "expired" | "active" | "initializing_timed_out" | "validation_timed_out" | "issuance_timed_out" | "deployment_timed_out" | "deletion_timed_out" | "pending_cleanup" | "staging_deployment" | "staging_active" | "deactivating" | "inactive" | "backup_issued" | "holding_deployment"; type: "mh_custom" | "managed_hostname" | "sni_custom" | "universal" | "advanced" | "total_tls" | "keyless" | "legacy_custom"; validation_errors?: { message?: string }[]; validation_method?: "txt" | "http" | "email"; validation_records?: { emails?: string[]; http_body?: string; http_url?: string; txt_name?: string; txt_value?: string }[]; validity_days?: 14 | 30 | 90 | 365 };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetCertificatePackResponse = Schema.Struct({
  result: Schema.Struct({
  certificate_authority: Schema.optional(Schema.NullOr(Schema.Literal("google", "lets_encrypt", "ssl_com"))),
  certificates: Schema.Array(Schema.Struct({
  bundle_method: Schema.optional(Schema.NullOr(Schema.String)),
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  geo_restrictions: Schema.optional(Schema.NullOr(Schema.Struct({
  label: Schema.optional(Schema.NullOr(Schema.Literal("us", "eu", "highest_security")))
}))),
  hosts: Schema.Array(Schema.String),
  id: Schema.String,
  issuer: Schema.optional(Schema.NullOr(Schema.String)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  priority: Schema.optional(Schema.NullOr(Schema.Number)),
  signature: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.String,
  uploaded_on: Schema.optional(Schema.NullOr(Schema.Date)),
  zone_id: Schema.optional(Schema.NullOr(Schema.String))
})),
  cloudflare_branding: Schema.optional(Schema.NullOr(Schema.Boolean)),
  hosts: Schema.Array(Schema.String),
  id: Schema.String,
  primary_certificate: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.Literal("initializing", "pending_validation", "deleted", "pending_issuance", "pending_deployment", "pending_deletion", "pending_expiration", "expired", "active", "initializing_timed_out", "validation_timed_out", "issuance_timed_out", "deployment_timed_out", "deletion_timed_out", "pending_cleanup", "staging_deployment", "staging_active", "deactivating", "inactive", "backup_issued", "holding_deployment"),
  type: Schema.Literal("mh_custom", "managed_hostname", "sni_custom", "universal", "advanced", "total_tls", "keyless", "legacy_custom"),
  validation_errors: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  message: Schema.optional(Schema.NullOr(Schema.String))
})))),
  validation_method: Schema.optional(Schema.NullOr(Schema.Literal("txt", "http", "email"))),
  validation_records: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  emails: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  http_body: Schema.optional(Schema.NullOr(Schema.String)),
  http_url: Schema.optional(Schema.NullOr(Schema.String)),
  txt_name: Schema.optional(Schema.NullOr(Schema.String)),
  txt_value: Schema.optional(Schema.NullOr(Schema.String))
})))),
  validity_days: Schema.optional(Schema.NullOr(Schema.Literal(14, 30, 90, 365)))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetCertificatePackResponse" }) as unknown as Schema.Schema<GetCertificatePackResponse>;

export const getCertificatePack: (
  input: GetCertificatePackRequest
) => Effect.Effect<
  GetCertificatePackResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCertificatePackRequest,
  output: GetCertificatePackResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface DeleteAdvancedCertificateManagerCertificatePackRequest {
  certificate_pack_id: string;
  zone_id: string;
}

export const DeleteAdvancedCertificateManagerCertificatePackRequest = Schema.Struct({
  certificate_pack_id: Schema.String.pipe(T.HttpPath("certificate_pack_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}" }),
).annotations({ identifier: "DeleteAdvancedCertificateManagerCertificatePackRequest" }) as unknown as Schema.Schema<DeleteAdvancedCertificateManagerCertificatePackRequest>;

export interface DeleteAdvancedCertificateManagerCertificatePackResponse {
  result: { id?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAdvancedCertificateManagerCertificatePackResponse = Schema.Struct({
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
}).annotations({ identifier: "DeleteAdvancedCertificateManagerCertificatePackResponse" }) as unknown as Schema.Schema<DeleteAdvancedCertificateManagerCertificatePackResponse>;

export const deleteAdvancedCertificateManagerCertificatePack: (
  input: DeleteAdvancedCertificateManagerCertificatePackRequest
) => Effect.Effect<
  DeleteAdvancedCertificateManagerCertificatePackResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAdvancedCertificateManagerCertificatePackRequest,
  output: DeleteAdvancedCertificateManagerCertificatePackResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackRequest {
  certificate_pack_id: string;
  zone_id: string;
  body: { cloudflare_branding?: boolean };
}

export const CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackRequest = Schema.Struct({
  certificate_pack_id: Schema.String.pipe(T.HttpPath("certificate_pack_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  cloudflare_branding: Schema.optional(Schema.NullOr(Schema.Boolean))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}" }),
).annotations({ identifier: "CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackRequest" }) as unknown as Schema.Schema<CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackRequest>;

export interface CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackResponse {
  result: { certificate_authority?: "google" | "lets_encrypt" | "ssl_com"; certificates: ({ bundle_method?: string; expires_on?: string; geo_restrictions?: { label?: "us" | "eu" | "highest_security" }; hosts: string[]; id: string; issuer?: string; modified_on?: string; priority?: number; signature?: string; status: string; uploaded_on?: string; zone_id?: string })[]; cloudflare_branding?: boolean; hosts: string[]; id: string; primary_certificate?: string; status: "initializing" | "pending_validation" | "deleted" | "pending_issuance" | "pending_deployment" | "pending_deletion" | "pending_expiration" | "expired" | "active" | "initializing_timed_out" | "validation_timed_out" | "issuance_timed_out" | "deployment_timed_out" | "deletion_timed_out" | "pending_cleanup" | "staging_deployment" | "staging_active" | "deactivating" | "inactive" | "backup_issued" | "holding_deployment"; type: "mh_custom" | "managed_hostname" | "sni_custom" | "universal" | "advanced" | "total_tls" | "keyless" | "legacy_custom"; validation_errors?: { message?: string }[]; validation_method?: "txt" | "http" | "email"; validation_records?: { emails?: string[]; http_body?: string; http_url?: string; txt_name?: string; txt_value?: string }[]; validity_days?: 14 | 30 | 90 | 365 };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackResponse = Schema.Struct({
  result: Schema.Struct({
  certificate_authority: Schema.optional(Schema.NullOr(Schema.Literal("google", "lets_encrypt", "ssl_com"))),
  certificates: Schema.Array(Schema.Struct({
  bundle_method: Schema.optional(Schema.NullOr(Schema.String)),
  expires_on: Schema.optional(Schema.NullOr(Schema.Date)),
  geo_restrictions: Schema.optional(Schema.NullOr(Schema.Struct({
  label: Schema.optional(Schema.NullOr(Schema.Literal("us", "eu", "highest_security")))
}))),
  hosts: Schema.Array(Schema.String),
  id: Schema.String,
  issuer: Schema.optional(Schema.NullOr(Schema.String)),
  modified_on: Schema.optional(Schema.NullOr(Schema.Date)),
  priority: Schema.optional(Schema.NullOr(Schema.Number)),
  signature: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.String,
  uploaded_on: Schema.optional(Schema.NullOr(Schema.Date)),
  zone_id: Schema.optional(Schema.NullOr(Schema.String))
})),
  cloudflare_branding: Schema.optional(Schema.NullOr(Schema.Boolean)),
  hosts: Schema.Array(Schema.String),
  id: Schema.String,
  primary_certificate: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.Literal("initializing", "pending_validation", "deleted", "pending_issuance", "pending_deployment", "pending_deletion", "pending_expiration", "expired", "active", "initializing_timed_out", "validation_timed_out", "issuance_timed_out", "deployment_timed_out", "deletion_timed_out", "pending_cleanup", "staging_deployment", "staging_active", "deactivating", "inactive", "backup_issued", "holding_deployment"),
  type: Schema.Literal("mh_custom", "managed_hostname", "sni_custom", "universal", "advanced", "total_tls", "keyless", "legacy_custom"),
  validation_errors: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  message: Schema.optional(Schema.NullOr(Schema.String))
})))),
  validation_method: Schema.optional(Schema.NullOr(Schema.Literal("txt", "http", "email"))),
  validation_records: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  emails: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  http_body: Schema.optional(Schema.NullOr(Schema.String)),
  http_url: Schema.optional(Schema.NullOr(Schema.String)),
  txt_name: Schema.optional(Schema.NullOr(Schema.String)),
  txt_value: Schema.optional(Schema.NullOr(Schema.String))
})))),
  validity_days: Schema.optional(Schema.NullOr(Schema.Literal(14, 30, 90, 365)))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackResponse" }) as unknown as Schema.Schema<CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackResponse>;

export const certificatePacksRestartValidationForAdvancedCertificateManagerCertificatePack: (
  input: CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackRequest
) => Effect.Effect<
  CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackRequest,
  output: CertificatePacksRestartValidationForAdvancedCertificateManagerCertificatePackResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface SslTlsModeRecommendationSslTlsRecommendationRequest {
  zone_id: string;
}

export const SslTlsModeRecommendationSslTlsRecommendationRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/recommendation" }),
).annotations({ identifier: "SslTlsModeRecommendationSslTlsRecommendationRequest" }) as unknown as Schema.Schema<SslTlsModeRecommendationSslTlsRecommendationRequest>;

export interface SslTlsModeRecommendationSslTlsRecommendationResponse {
  result: { editable: boolean; id: string; modified_on: string; next_scheduled_scan?: string; value: "auto" | "custom" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const SslTlsModeRecommendationSslTlsRecommendationResponse = Schema.Struct({
  result: Schema.Struct({
  editable: Schema.Boolean,
  id: Schema.String,
  modified_on: Schema.Date,
  next_scheduled_scan: Schema.optional(Schema.NullOr(Schema.Date)),
  value: Schema.Literal("auto", "custom")
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "SslTlsModeRecommendationSslTlsRecommendationResponse" }) as unknown as Schema.Schema<SslTlsModeRecommendationSslTlsRecommendationResponse>;

export const sslTlsModeRecommendationSslTlsRecommendation: (
  input: SslTlsModeRecommendationSslTlsRecommendationRequest
) => Effect.Effect<
  SslTlsModeRecommendationSslTlsRecommendationResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: SslTlsModeRecommendationSslTlsRecommendationRequest,
  output: SslTlsModeRecommendationSslTlsRecommendationResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UniversalSslSettingsForAZoneUniversalSslSettingsDetailsRequest {
  zone_id: string;
}

export const UniversalSslSettingsForAZoneUniversalSslSettingsDetailsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/universal/settings" }),
).annotations({ identifier: "UniversalSslSettingsForAZoneUniversalSslSettingsDetailsRequest" }) as unknown as Schema.Schema<UniversalSslSettingsForAZoneUniversalSslSettingsDetailsRequest>;

export interface UniversalSslSettingsForAZoneUniversalSslSettingsDetailsResponse {
  result: { enabled?: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UniversalSslSettingsForAZoneUniversalSslSettingsDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UniversalSslSettingsForAZoneUniversalSslSettingsDetailsResponse" }) as unknown as Schema.Schema<UniversalSslSettingsForAZoneUniversalSslSettingsDetailsResponse>;

export const universalSslSettingsForAZoneUniversalSslSettingsDetails: (
  input: UniversalSslSettingsForAZoneUniversalSslSettingsDetailsRequest
) => Effect.Effect<
  UniversalSslSettingsForAZoneUniversalSslSettingsDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UniversalSslSettingsForAZoneUniversalSslSettingsDetailsRequest,
  output: UniversalSslSettingsForAZoneUniversalSslSettingsDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface UniversalSslSettingsForAZoneEditUniversalSslSettingsRequest {
  zone_id: string;
  body: { enabled?: boolean };
}

export const UniversalSslSettingsForAZoneEditUniversalSslSettingsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/ssl/universal/settings" }),
).annotations({ identifier: "UniversalSslSettingsForAZoneEditUniversalSslSettingsRequest" }) as unknown as Schema.Schema<UniversalSslSettingsForAZoneEditUniversalSslSettingsRequest>;

export interface UniversalSslSettingsForAZoneEditUniversalSslSettingsResponse {
  result: { enabled?: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UniversalSslSettingsForAZoneEditUniversalSslSettingsResponse = Schema.Struct({
  result: Schema.Struct({
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UniversalSslSettingsForAZoneEditUniversalSslSettingsResponse" }) as unknown as Schema.Schema<UniversalSslSettingsForAZoneEditUniversalSslSettingsResponse>;

export const universalSslSettingsForAZoneEditUniversalSslSettings: (
  input: UniversalSslSettingsForAZoneEditUniversalSslSettingsRequest
) => Effect.Effect<
  UniversalSslSettingsForAZoneEditUniversalSslSettingsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UniversalSslSettingsForAZoneEditUniversalSslSettingsRequest,
  output: UniversalSslSettingsForAZoneEditUniversalSslSettingsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface SslVerificationSslVerificationDetailsRequest {
  zone_id: string;
  retry?: true;
}

export const SslVerificationSslVerificationDetailsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  retry: Schema.optional(Schema.Literal(true)).pipe(T.HttpQuery("retry"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/ssl/verification" }),
).annotations({ identifier: "SslVerificationSslVerificationDetailsRequest" }) as unknown as Schema.Schema<SslVerificationSslVerificationDetailsRequest>;

export interface SslVerificationSslVerificationDetailsResponse {
  result: ({ brand_check?: boolean; cert_pack_uuid?: string; certificate_status: "initializing" | "authorizing" | "active" | "expired" | "issuing" | "timing_out" | "pending_deployment"; signature?: "ECDSAWithSHA256" | "SHA1WithRSA" | "SHA256WithRSA"; validation_method?: "http" | "cname" | "txt"; verification_info?: { record_name?: "record_name" | "http_url" | "cname" | "txt_name"; record_target?: "record_value" | "http_body" | "cname_target" | "txt_value" }; verification_status?: boolean; verification_type?: "cname" | "meta tag" })[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const SslVerificationSslVerificationDetailsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  brand_check: Schema.optional(Schema.NullOr(Schema.Boolean)),
  cert_pack_uuid: Schema.optional(Schema.NullOr(Schema.String)),
  certificate_status: Schema.Literal("initializing", "authorizing", "active", "expired", "issuing", "timing_out", "pending_deployment"),
  signature: Schema.optional(Schema.NullOr(Schema.Literal("ECDSAWithSHA256", "SHA1WithRSA", "SHA256WithRSA"))),
  validation_method: Schema.optional(Schema.NullOr(Schema.Literal("http", "cname", "txt"))),
  verification_info: Schema.optional(Schema.NullOr(Schema.Struct({
  record_name: Schema.optional(Schema.NullOr(Schema.Literal("record_name", "http_url", "cname", "txt_name"))),
  record_target: Schema.optional(Schema.NullOr(Schema.Literal("record_value", "http_body", "cname_target", "txt_value")))
}))),
  verification_status: Schema.optional(Schema.NullOr(Schema.Boolean)),
  verification_type: Schema.optional(Schema.NullOr(Schema.Literal("cname", "meta tag")))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "SslVerificationSslVerificationDetailsResponse" }) as unknown as Schema.Schema<SslVerificationSslVerificationDetailsResponse>;

export const sslVerificationSslVerificationDetails: (
  input: SslVerificationSslVerificationDetailsRequest
) => Effect.Effect<
  SslVerificationSslVerificationDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: SslVerificationSslVerificationDetailsRequest,
  output: SslVerificationSslVerificationDetailsResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));

export interface SslVerificationEditSslCertificatePackValidationMethodRequest {
  certificate_pack_id: string;
  zone_id: string;
  body: { validation_method: "http" | "cname" | "txt" | "email" };
}

export const SslVerificationEditSslCertificatePackValidationMethodRequest = Schema.Struct({
  certificate_pack_id: Schema.String.pipe(T.HttpPath("certificate_pack_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  validation_method: Schema.Literal("http", "cname", "txt", "email")
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/ssl/verification/{certificate_pack_id}" }),
).annotations({ identifier: "SslVerificationEditSslCertificatePackValidationMethodRequest" }) as unknown as Schema.Schema<SslVerificationEditSslCertificatePackValidationMethodRequest>;

export interface SslVerificationEditSslCertificatePackValidationMethodResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const SslVerificationEditSslCertificatePackValidationMethodResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "SslVerificationEditSslCertificatePackValidationMethodResponse" }) as unknown as Schema.Schema<SslVerificationEditSslCertificatePackValidationMethodResponse>;

export const sslVerificationEditSslCertificatePackValidationMethod: (
  input: SslVerificationEditSslCertificatePackValidationMethodRequest
) => Effect.Effect<
  SslVerificationEditSslCertificatePackValidationMethodResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: SslVerificationEditSslCertificatePackValidationMethodRequest,
  output: SslVerificationEditSslCertificatePackValidationMethodResponse,
  errors: [RateLimited.pipe(T.HttpErrorCode(971)), TooManyRequests.pipe(T.HttpErrorCode(6100)), AuthenticationError.pipe(T.HttpErrorCode(10000)), InvalidToken.pipe(T.HttpErrorCode(9103)), MissingToken.pipe(T.HttpErrorCode(9106)), TokenExpired.pipe(T.HttpErrorCode(9109)), Unauthorized.pipe(T.HttpErrorCode(9000))],
}));
