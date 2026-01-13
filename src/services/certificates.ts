/**
 * Cloudflare CERTIFICATES API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service certificates
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

// =============================================================================
// Errors
// =============================================================================

export class AuthenticationError extends Schema.TaggedError<AuthenticationError>()(
  "AuthenticationError",
  {
    code: Schema.Number,
    message: Schema.String,
  },
) {
  static readonly _tag = "AuthenticationError";
}

export class InvalidToken extends Schema.TaggedError<InvalidToken>()("InvalidToken", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "InvalidToken";
}

export class MissingToken extends Schema.TaggedError<MissingToken>()("MissingToken", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "MissingToken";
}

export class RateLimited extends Schema.TaggedError<RateLimited>()("RateLimited", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "RateLimited";
}

export class TokenExpired extends Schema.TaggedError<TokenExpired>()("TokenExpired", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "TokenExpired";
}

export class TooManyRequests extends Schema.TaggedError<TooManyRequests>()("TooManyRequests", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "TooManyRequests";
}

export class Unauthorized extends Schema.TaggedError<Unauthorized>()("Unauthorized", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "Unauthorized";
}

export interface ListCertificatesRequest {
  zone_id: string;
  page?: number;
  per_page?: number;
  limit?: number;
  offset?: number;
}

export const ListCertificatesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpQuery("zone_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  offset: Schema.optional(Schema.Number).pipe(T.HttpQuery("offset")),
})
  .pipe(T.Http({ method: "GET", path: "/certificates" }))
  .annotations({
    identifier: "ListCertificatesRequest",
  }) as unknown as Schema.Schema<ListCertificatesRequest>;

export interface ListCertificatesResponse {
  result: {
    certificate?: string;
    csr: string;
    expires_on?: string;
    hostnames: string[];
    id?: string;
    request_type: "origin-rsa" | "origin-ecc" | "keyless-certificate";
    requested_validity: 7 | 30 | 90 | 365 | 730 | 1095 | 5475;
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListCertificatesResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      certificate: Schema.optional(Schema.NullOr(Schema.String)),
      csr: Schema.String,
      expires_on: Schema.optional(Schema.NullOr(Schema.String)),
      hostnames: Schema.Array(Schema.String),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      request_type: Schema.Literal("origin-rsa", "origin-ecc", "keyless-certificate"),
      requested_validity: Schema.Literal(7, 30, 90, 365, 730, 1095, 5475),
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
  identifier: "ListCertificatesResponse",
}) as unknown as Schema.Schema<ListCertificatesResponse>;

export const listCertificates: (
  input: ListCertificatesRequest,
) => Effect.Effect<
  ListCertificatesResponse,
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
  input: ListCertificatesRequest,
  output: ListCertificatesResponse,
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

export interface CreateCertificateRequest {
  body: {
    csr: string;
    hostnames: string[];
    request_type: "origin-rsa" | "origin-ecc" | "keyless-certificate";
    requested_validity?: 7 | 30 | 90 | 365 | 730 | 1095 | 5475;
  };
}

export const CreateCertificateRequest = Schema.Struct({
  body: Schema.Struct({
    csr: Schema.String,
    hostnames: Schema.Array(Schema.String),
    request_type: Schema.Literal("origin-rsa", "origin-ecc", "keyless-certificate"),
    requested_validity: Schema.optional(
      Schema.NullOr(Schema.Literal(7, 30, 90, 365, 730, 1095, 5475)),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/certificates" }))
  .annotations({
    identifier: "CreateCertificateRequest",
  }) as unknown as Schema.Schema<CreateCertificateRequest>;

export interface CreateCertificateResponse {
  result: {
    certificate?: string;
    csr: string;
    expires_on?: string;
    hostnames: string[];
    id?: string;
    request_type: "origin-rsa" | "origin-ecc" | "keyless-certificate";
    requested_validity: 7 | 30 | 90 | 365 | 730 | 1095 | 5475;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateCertificateResponse = Schema.Struct({
  result: Schema.Struct({
    certificate: Schema.optional(Schema.NullOr(Schema.String)),
    csr: Schema.String,
    expires_on: Schema.optional(Schema.NullOr(Schema.String)),
    hostnames: Schema.Array(Schema.String),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    request_type: Schema.Literal("origin-rsa", "origin-ecc", "keyless-certificate"),
    requested_validity: Schema.Literal(7, 30, 90, 365, 730, 1095, 5475),
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
  identifier: "CreateCertificateResponse",
}) as unknown as Schema.Schema<CreateCertificateResponse>;

export const createCertificate: (
  input: CreateCertificateRequest,
) => Effect.Effect<
  CreateCertificateResponse,
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
  input: CreateCertificateRequest,
  output: CreateCertificateResponse,
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

export interface GetCertificateRequest {
  certificate_id: string;
}

export const GetCertificateRequest = Schema.Struct({
  certificate_id: Schema.String.pipe(T.HttpPath("certificate_id")),
})
  .pipe(T.Http({ method: "GET", path: "/certificates/{certificate_id}" }))
  .annotations({
    identifier: "GetCertificateRequest",
  }) as unknown as Schema.Schema<GetCertificateRequest>;

export interface GetCertificateResponse {
  result: {
    certificate?: string;
    csr: string;
    expires_on?: string;
    hostnames: string[];
    id?: string;
    request_type: "origin-rsa" | "origin-ecc" | "keyless-certificate";
    requested_validity: 7 | 30 | 90 | 365 | 730 | 1095 | 5475;
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetCertificateResponse = Schema.Struct({
  result: Schema.Struct({
    certificate: Schema.optional(Schema.NullOr(Schema.String)),
    csr: Schema.String,
    expires_on: Schema.optional(Schema.NullOr(Schema.String)),
    hostnames: Schema.Array(Schema.String),
    id: Schema.optional(Schema.NullOr(Schema.String)),
    request_type: Schema.Literal("origin-rsa", "origin-ecc", "keyless-certificate"),
    requested_validity: Schema.Literal(7, 30, 90, 365, 730, 1095, 5475),
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
  identifier: "GetCertificateResponse",
}) as unknown as Schema.Schema<GetCertificateResponse>;

export const getCertificate: (
  input: GetCertificateRequest,
) => Effect.Effect<
  GetCertificateResponse,
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
  input: GetCertificateRequest,
  output: GetCertificateResponse,
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

export interface OriginCaRevokeCertificateRequest {
  certificate_id: string;
}

export const OriginCaRevokeCertificateRequest = Schema.Struct({
  certificate_id: Schema.String.pipe(T.HttpPath("certificate_id")),
})
  .pipe(T.Http({ method: "DELETE", path: "/certificates/{certificate_id}" }))
  .annotations({
    identifier: "OriginCaRevokeCertificateRequest",
  }) as unknown as Schema.Schema<OriginCaRevokeCertificateRequest>;

export interface OriginCaRevokeCertificateResponse {
  result: unknown;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const OriginCaRevokeCertificateResponse = Schema.Struct({
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
  identifier: "OriginCaRevokeCertificateResponse",
}) as unknown as Schema.Schema<OriginCaRevokeCertificateResponse>;

export const originCaRevokeCertificate: (
  input: OriginCaRevokeCertificateRequest,
) => Effect.Effect<
  OriginCaRevokeCertificateResponse,
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
  input: OriginCaRevokeCertificateRequest,
  output: OriginCaRevokeCertificateResponse,
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
