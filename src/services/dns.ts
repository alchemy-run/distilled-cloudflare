/**
 * Cloudflare DNS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service dns
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

export class InvalidRequest extends Schema.TaggedError<InvalidRequest>()("InvalidRequest", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "InvalidRequest";
}

export class InvalidToken extends Schema.TaggedError<InvalidToken>()("InvalidToken", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "InvalidToken";
}

export class InvalidZone extends Schema.TaggedError<InvalidZone>()("InvalidZone", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "InvalidZone";
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

export class RecordNotFound extends Schema.TaggedError<RecordNotFound>()("RecordNotFound", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "RecordNotFound";
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

export class ValidationError extends Schema.TaggedError<ValidationError>()("ValidationError", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "ValidationError";
}

export interface ListDnsRecordsRequest {
  zone_id: string;
  name?: string;
  "name.exact"?: string;
  "name.contains"?: string;
  "name.startswith"?: string;
  "name.endswith"?: string;
  type?:
    | "A"
    | "AAAA"
    | "CAA"
    | "CERT"
    | "CNAME"
    | "DNSKEY"
    | "DS"
    | "HTTPS"
    | "LOC"
    | "MX"
    | "NAPTR"
    | "NS"
    | "OPENPGPKEY"
    | "PTR"
    | "SMIMEA"
    | "SRV"
    | "SSHFP"
    | "SVCB"
    | "TLSA"
    | "TXT"
    | "URI";
  content?: string;
  "content.exact"?: string;
  "content.contains"?: string;
  "content.startswith"?: string;
  "content.endswith"?: string;
  proxied?: boolean;
  match?: "any" | "all";
  comment?: string;
  "comment.present"?: string;
  "comment.absent"?: string;
  "comment.exact"?: string;
  "comment.contains"?: string;
  "comment.startswith"?: string;
  "comment.endswith"?: string;
  tag?: string;
  "tag.present"?: string;
  "tag.absent"?: string;
  "tag.exact"?: string;
  "tag.contains"?: string;
  "tag.startswith"?: string;
  "tag.endswith"?: string;
  search?: string;
  tag_match?: "any" | "all";
  page?: number;
  per_page?: number;
  order?: "type" | "name" | "content" | "ttl" | "proxied";
  direction?: "asc" | "desc";
}

export const ListDnsRecordsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  "name.exact": Schema.optional(Schema.String).pipe(T.HttpQuery("name.exact")),
  "name.contains": Schema.optional(Schema.String).pipe(T.HttpQuery("name.contains")),
  "name.startswith": Schema.optional(Schema.String).pipe(T.HttpQuery("name.startswith")),
  "name.endswith": Schema.optional(Schema.String).pipe(T.HttpQuery("name.endswith")),
  type: Schema.optional(
    Schema.Literal(
      "A",
      "AAAA",
      "CAA",
      "CERT",
      "CNAME",
      "DNSKEY",
      "DS",
      "HTTPS",
      "LOC",
      "MX",
      "NAPTR",
      "NS",
      "OPENPGPKEY",
      "PTR",
      "SMIMEA",
      "SRV",
      "SSHFP",
      "SVCB",
      "TLSA",
      "TXT",
      "URI",
    ),
  ).pipe(T.HttpQuery("type")),
  content: Schema.optional(Schema.String).pipe(T.HttpQuery("content")),
  "content.exact": Schema.optional(Schema.String).pipe(T.HttpQuery("content.exact")),
  "content.contains": Schema.optional(Schema.String).pipe(T.HttpQuery("content.contains")),
  "content.startswith": Schema.optional(Schema.String).pipe(T.HttpQuery("content.startswith")),
  "content.endswith": Schema.optional(Schema.String).pipe(T.HttpQuery("content.endswith")),
  proxied: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("proxied")),
  match: Schema.optional(Schema.Literal("any", "all")).pipe(T.HttpQuery("match")),
  comment: Schema.optional(Schema.String).pipe(T.HttpQuery("comment")),
  "comment.present": Schema.optional(Schema.String).pipe(T.HttpQuery("comment.present")),
  "comment.absent": Schema.optional(Schema.String).pipe(T.HttpQuery("comment.absent")),
  "comment.exact": Schema.optional(Schema.String).pipe(T.HttpQuery("comment.exact")),
  "comment.contains": Schema.optional(Schema.String).pipe(T.HttpQuery("comment.contains")),
  "comment.startswith": Schema.optional(Schema.String).pipe(T.HttpQuery("comment.startswith")),
  "comment.endswith": Schema.optional(Schema.String).pipe(T.HttpQuery("comment.endswith")),
  tag: Schema.optional(Schema.String).pipe(T.HttpQuery("tag")),
  "tag.present": Schema.optional(Schema.String).pipe(T.HttpQuery("tag.present")),
  "tag.absent": Schema.optional(Schema.String).pipe(T.HttpQuery("tag.absent")),
  "tag.exact": Schema.optional(Schema.String).pipe(T.HttpQuery("tag.exact")),
  "tag.contains": Schema.optional(Schema.String).pipe(T.HttpQuery("tag.contains")),
  "tag.startswith": Schema.optional(Schema.String).pipe(T.HttpQuery("tag.startswith")),
  "tag.endswith": Schema.optional(Schema.String).pipe(T.HttpQuery("tag.endswith")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  tag_match: Schema.optional(Schema.Literal("any", "all")).pipe(T.HttpQuery("tag_match")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("type", "name", "content", "ttl", "proxied")).pipe(
    T.HttpQuery("order"),
  ),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
})
  .pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/dns_records" }))
  .annotations({
    identifier: "ListDnsRecordsRequest",
  }) as unknown as Schema.Schema<ListDnsRecordsRequest>;

export interface ListDnsRecordsResponse {
  result: Record<string, unknown>[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListDnsRecordsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
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
  identifier: "ListDnsRecordsResponse",
}) as unknown as Schema.Schema<ListDnsRecordsResponse>;

export const listDnsRecords: (
  input: ListDnsRecordsRequest,
) => Effect.Effect<
  ListDnsRecordsResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | InvalidZone
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDnsRecordsRequest,
  output: ListDnsRecordsResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    InvalidZone.pipe(T.HttpErrorCode(1003), T.HttpErrorStatus(404)),
  ],
}));

export interface CreateDnsRecordRequest {
  zone_id: string;
  body: Record<string, unknown>;
}

export const CreateDnsRecordRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({}).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/zones/{zone_id}/dns_records" }))
  .annotations({
    identifier: "CreateDnsRecordRequest",
  }) as unknown as Schema.Schema<CreateDnsRecordRequest>;

export interface CreateDnsRecordResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreateDnsRecordResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "CreateDnsRecordResponse",
}) as unknown as Schema.Schema<CreateDnsRecordResponse>;

export const createDnsRecord: (
  input: CreateDnsRecordRequest,
) => Effect.Effect<
  CreateDnsRecordResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | InvalidZone
  | ValidationError
  | InvalidRequest
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDnsRecordRequest,
  output: CreateDnsRecordResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    InvalidZone.pipe(T.HttpErrorCode(1003), T.HttpErrorStatus(404)),
    ValidationError.pipe(T.HttpErrorCode(10021)),
    InvalidRequest.pipe(T.HttpErrorCode(6003)),
  ],
}));

export interface DnsRecordsForAZoneBatchDnsRecordsRequest {
  zone_id: string;
  body: {
    deletes?: Record<string, unknown>[];
    patches?: { id: string }[];
    posts?: Record<string, unknown>[];
    puts?: { id: string }[];
  };
}

export const DnsRecordsForAZoneBatchDnsRecordsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
    deletes: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
    patches: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
          }),
        ),
      ),
    ),
    posts: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
    puts: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
          }),
        ),
      ),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/zones/{zone_id}/dns_records/batch" }))
  .annotations({
    identifier: "DnsRecordsForAZoneBatchDnsRecordsRequest",
  }) as unknown as Schema.Schema<DnsRecordsForAZoneBatchDnsRecordsRequest>;

export interface DnsRecordsForAZoneBatchDnsRecordsResponse {
  result: {
    deletes?: Record<string, unknown>[];
    patches?: Record<string, unknown>[];
    posts?: Record<string, unknown>[];
    puts?: Record<string, unknown>[];
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DnsRecordsForAZoneBatchDnsRecordsResponse = Schema.Struct({
  result: Schema.Struct({
    deletes: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
    patches: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
    posts: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
    puts: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
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
  identifier: "DnsRecordsForAZoneBatchDnsRecordsResponse",
}) as unknown as Schema.Schema<DnsRecordsForAZoneBatchDnsRecordsResponse>;

export const dnsRecordsForAZoneBatchDnsRecords: (
  input: DnsRecordsForAZoneBatchDnsRecordsRequest,
) => Effect.Effect<
  DnsRecordsForAZoneBatchDnsRecordsResponse,
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
  input: DnsRecordsForAZoneBatchDnsRecordsRequest,
  output: DnsRecordsForAZoneBatchDnsRecordsResponse,
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

export interface DnsRecordsForAZoneExportDnsRecordsRequest {
  zone_id: string;
}

export const DnsRecordsForAZoneExportDnsRecordsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
})
  .pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/dns_records/export" }))
  .annotations({
    identifier: "DnsRecordsForAZoneExportDnsRecordsRequest",
  }) as unknown as Schema.Schema<DnsRecordsForAZoneExportDnsRecordsRequest>;

export interface DnsRecordsForAZoneExportDnsRecordsResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DnsRecordsForAZoneExportDnsRecordsResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
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
  identifier: "DnsRecordsForAZoneExportDnsRecordsResponse",
}) as unknown as Schema.Schema<DnsRecordsForAZoneExportDnsRecordsResponse>;

export const dnsRecordsForAZoneExportDnsRecords: (
  input: DnsRecordsForAZoneExportDnsRecordsRequest,
) => Effect.Effect<
  DnsRecordsForAZoneExportDnsRecordsResponse,
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
  input: DnsRecordsForAZoneExportDnsRecordsRequest,
  output: DnsRecordsForAZoneExportDnsRecordsResponse,
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

export interface DnsRecordsForAZoneImportDnsRecordsRequest {
  zone_id: string;
  body: FormData;
}

export const DnsRecordsForAZoneImportDnsRecordsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.instanceOf(FormData).pipe(T.HttpFormData()),
})
  .pipe(T.Http({ method: "POST", path: "/zones/{zone_id}/dns_records/import" }))
  .annotations({
    identifier: "DnsRecordsForAZoneImportDnsRecordsRequest",
  }) as unknown as Schema.Schema<DnsRecordsForAZoneImportDnsRecordsRequest>;

export interface DnsRecordsForAZoneImportDnsRecordsResponse {
  result: { recs_added?: number; total_records_parsed?: number };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DnsRecordsForAZoneImportDnsRecordsResponse = Schema.Struct({
  result: Schema.Struct({
    recs_added: Schema.optional(Schema.NullOr(Schema.Number)),
    total_records_parsed: Schema.optional(Schema.NullOr(Schema.Number)),
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
  identifier: "DnsRecordsForAZoneImportDnsRecordsResponse",
}) as unknown as Schema.Schema<DnsRecordsForAZoneImportDnsRecordsResponse>;

export const dnsRecordsForAZoneImportDnsRecords: (
  input: DnsRecordsForAZoneImportDnsRecordsRequest,
) => Effect.Effect<
  DnsRecordsForAZoneImportDnsRecordsResponse,
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
  input: DnsRecordsForAZoneImportDnsRecordsRequest,
  output: DnsRecordsForAZoneImportDnsRecordsResponse,
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

export interface DnsRecordsForAZoneScanDnsRecordsRequest {
  zone_id: string;
}

export const DnsRecordsForAZoneScanDnsRecordsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
})
  .pipe(T.Http({ method: "POST", path: "/zones/{zone_id}/dns_records/scan" }))
  .annotations({
    identifier: "DnsRecordsForAZoneScanDnsRecordsRequest",
  }) as unknown as Schema.Schema<DnsRecordsForAZoneScanDnsRecordsRequest>;

export interface DnsRecordsForAZoneScanDnsRecordsResponse {
  result: { recs_added?: number; total_records_parsed?: number };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DnsRecordsForAZoneScanDnsRecordsResponse = Schema.Struct({
  result: Schema.Struct({
    recs_added: Schema.optional(Schema.NullOr(Schema.Number)),
    total_records_parsed: Schema.optional(Schema.NullOr(Schema.Number)),
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
  identifier: "DnsRecordsForAZoneScanDnsRecordsResponse",
}) as unknown as Schema.Schema<DnsRecordsForAZoneScanDnsRecordsResponse>;

export const dnsRecordsForAZoneScanDnsRecords: (
  input: DnsRecordsForAZoneScanDnsRecordsRequest,
) => Effect.Effect<
  DnsRecordsForAZoneScanDnsRecordsResponse,
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
  input: DnsRecordsForAZoneScanDnsRecordsRequest,
  output: DnsRecordsForAZoneScanDnsRecordsResponse,
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

export interface DnsRecordsForAZoneReviewDnsScanRequest {
  zone_id: string;
}

export const DnsRecordsForAZoneReviewDnsScanRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
})
  .pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/dns_records/scan/review" }))
  .annotations({
    identifier: "DnsRecordsForAZoneReviewDnsScanRequest",
  }) as unknown as Schema.Schema<DnsRecordsForAZoneReviewDnsScanRequest>;

export interface DnsRecordsForAZoneReviewDnsScanResponse {
  result: Record<string, unknown>[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DnsRecordsForAZoneReviewDnsScanResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
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
  identifier: "DnsRecordsForAZoneReviewDnsScanResponse",
}) as unknown as Schema.Schema<DnsRecordsForAZoneReviewDnsScanResponse>;

export const dnsRecordsForAZoneReviewDnsScan: (
  input: DnsRecordsForAZoneReviewDnsScanRequest,
) => Effect.Effect<
  DnsRecordsForAZoneReviewDnsScanResponse,
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
  input: DnsRecordsForAZoneReviewDnsScanRequest,
  output: DnsRecordsForAZoneReviewDnsScanResponse,
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

export interface DnsRecordsForAZoneApplyDnsScanResultsRequest {
  zone_id: string;
  body: { accepts?: Record<string, unknown>[]; rejects?: Record<string, unknown>[] };
}

export const DnsRecordsForAZoneApplyDnsScanResultsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
    accepts: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
    rejects: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/zones/{zone_id}/dns_records/scan/review" }))
  .annotations({
    identifier: "DnsRecordsForAZoneApplyDnsScanResultsRequest",
  }) as unknown as Schema.Schema<DnsRecordsForAZoneApplyDnsScanResultsRequest>;

export interface DnsRecordsForAZoneApplyDnsScanResultsResponse {
  result: { accepts?: Record<string, unknown>[]; rejects?: string[] };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DnsRecordsForAZoneApplyDnsScanResultsResponse = Schema.Struct({
  result: Schema.Struct({
    accepts: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
    rejects: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
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
  identifier: "DnsRecordsForAZoneApplyDnsScanResultsResponse",
}) as unknown as Schema.Schema<DnsRecordsForAZoneApplyDnsScanResultsResponse>;

export const dnsRecordsForAZoneApplyDnsScanResults: (
  input: DnsRecordsForAZoneApplyDnsScanResultsRequest,
) => Effect.Effect<
  DnsRecordsForAZoneApplyDnsScanResultsResponse,
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
  input: DnsRecordsForAZoneApplyDnsScanResultsRequest,
  output: DnsRecordsForAZoneApplyDnsScanResultsResponse,
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

export interface DnsRecordsForAZoneTriggerDnsScanRequest {
  zone_id: string;
}

export const DnsRecordsForAZoneTriggerDnsScanRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
})
  .pipe(T.Http({ method: "POST", path: "/zones/{zone_id}/dns_records/scan/trigger" }))
  .annotations({
    identifier: "DnsRecordsForAZoneTriggerDnsScanRequest",
  }) as unknown as Schema.Schema<DnsRecordsForAZoneTriggerDnsScanRequest>;

export interface DnsRecordsForAZoneTriggerDnsScanResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DnsRecordsForAZoneTriggerDnsScanResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
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
  identifier: "DnsRecordsForAZoneTriggerDnsScanResponse",
}) as unknown as Schema.Schema<DnsRecordsForAZoneTriggerDnsScanResponse>;

export const dnsRecordsForAZoneTriggerDnsScan: (
  input: DnsRecordsForAZoneTriggerDnsScanRequest,
) => Effect.Effect<
  DnsRecordsForAZoneTriggerDnsScanResponse,
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
  input: DnsRecordsForAZoneTriggerDnsScanRequest,
  output: DnsRecordsForAZoneTriggerDnsScanResponse,
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

export interface GetUsageRequest {
  zone_id: string;
}

export const GetUsageRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
})
  .pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/dns_records/usage" }))
  .annotations({ identifier: "GetUsageRequest" }) as unknown as Schema.Schema<GetUsageRequest>;

export interface GetUsageResponse {
  result: { record_quota?: number; record_usage?: number };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetUsageResponse = Schema.Struct({
  result: Schema.Struct({
    record_quota: Schema.optional(Schema.NullOr(Schema.Number)),
    record_usage: Schema.optional(Schema.NullOr(Schema.Number)),
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
}).annotations({ identifier: "GetUsageResponse" }) as unknown as Schema.Schema<GetUsageResponse>;

export const getUsage: (
  input: GetUsageRequest,
) => Effect.Effect<
  GetUsageResponse,
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
  input: GetUsageRequest,
  output: GetUsageResponse,
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

export interface DnsRecordsForAZoneDnsRecordDetailsRequest {
  dns_record_id: string;
  zone_id: string;
}

export const DnsRecordsForAZoneDnsRecordDetailsRequest = Schema.Struct({
  dns_record_id: Schema.String.pipe(T.HttpPath("dns_record_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
})
  .pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/dns_records/{dns_record_id}" }))
  .annotations({
    identifier: "DnsRecordsForAZoneDnsRecordDetailsRequest",
  }) as unknown as Schema.Schema<DnsRecordsForAZoneDnsRecordDetailsRequest>;

export interface DnsRecordsForAZoneDnsRecordDetailsResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DnsRecordsForAZoneDnsRecordDetailsResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "DnsRecordsForAZoneDnsRecordDetailsResponse",
}) as unknown as Schema.Schema<DnsRecordsForAZoneDnsRecordDetailsResponse>;

export const dnsRecordsForAZoneDnsRecordDetails: (
  input: DnsRecordsForAZoneDnsRecordDetailsRequest,
) => Effect.Effect<
  DnsRecordsForAZoneDnsRecordDetailsResponse,
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
  input: DnsRecordsForAZoneDnsRecordDetailsRequest,
  output: DnsRecordsForAZoneDnsRecordDetailsResponse,
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

export interface UpdateDnsRecordRequest {
  dns_record_id: string;
  zone_id: string;
  body: Record<string, unknown>;
}

export const UpdateDnsRecordRequest = Schema.Struct({
  dns_record_id: Schema.String.pipe(T.HttpPath("dns_record_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({}).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PUT", path: "/zones/{zone_id}/dns_records/{dns_record_id}" }))
  .annotations({
    identifier: "UpdateDnsRecordRequest",
  }) as unknown as Schema.Schema<UpdateDnsRecordRequest>;

export interface UpdateDnsRecordResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdateDnsRecordResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "UpdateDnsRecordResponse",
}) as unknown as Schema.Schema<UpdateDnsRecordResponse>;

export const updateDnsRecord: (
  input: UpdateDnsRecordRequest,
) => Effect.Effect<
  UpdateDnsRecordResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | InvalidZone
  | RecordNotFound
  | ValidationError
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateDnsRecordRequest,
  output: UpdateDnsRecordResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    InvalidZone.pipe(T.HttpErrorCode(1003), T.HttpErrorStatus(404)),
    RecordNotFound.pipe(T.HttpErrorCode(81044), T.HttpErrorStatus(404)),
    ValidationError.pipe(T.HttpErrorCode(10021)),
  ],
}));

export interface DeleteDnsRecordRequest {
  dns_record_id: string;
  zone_id: string;
}

export const DeleteDnsRecordRequest = Schema.Struct({
  dns_record_id: Schema.String.pipe(T.HttpPath("dns_record_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
})
  .pipe(T.Http({ method: "DELETE", path: "/zones/{zone_id}/dns_records/{dns_record_id}" }))
  .annotations({
    identifier: "DeleteDnsRecordRequest",
  }) as unknown as Schema.Schema<DeleteDnsRecordRequest>;

export interface DeleteDnsRecordResponse {
  result: { id?: string };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeleteDnsRecordResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
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
  identifier: "DeleteDnsRecordResponse",
}) as unknown as Schema.Schema<DeleteDnsRecordResponse>;

export const deleteDnsRecord: (
  input: DeleteDnsRecordRequest,
) => Effect.Effect<
  DeleteDnsRecordResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | InvalidZone
  | RecordNotFound
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDnsRecordRequest,
  output: DeleteDnsRecordResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    InvalidZone.pipe(T.HttpErrorCode(1003), T.HttpErrorStatus(404)),
    RecordNotFound.pipe(T.HttpErrorCode(81044), T.HttpErrorStatus(404)),
  ],
}));

export interface PatchDnsRecordRequest {
  dns_record_id: string;
  zone_id: string;
  body: Record<string, unknown>;
}

export const PatchDnsRecordRequest = Schema.Struct({
  dns_record_id: Schema.String.pipe(T.HttpPath("dns_record_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({}).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "PATCH", path: "/zones/{zone_id}/dns_records/{dns_record_id}" }))
  .annotations({
    identifier: "PatchDnsRecordRequest",
  }) as unknown as Schema.Schema<PatchDnsRecordRequest>;

export interface PatchDnsRecordResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const PatchDnsRecordResponse = Schema.Struct({
  result: Schema.Struct({}),
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
  identifier: "PatchDnsRecordResponse",
}) as unknown as Schema.Schema<PatchDnsRecordResponse>;

export const patchDnsRecord: (
  input: PatchDnsRecordRequest,
) => Effect.Effect<
  PatchDnsRecordResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | InvalidZone
  | RecordNotFound
  | ValidationError
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchDnsRecordRequest,
  output: PatchDnsRecordResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
    InvalidZone.pipe(T.HttpErrorCode(1003), T.HttpErrorStatus(404)),
    RecordNotFound.pipe(T.HttpErrorCode(81044), T.HttpErrorStatus(404)),
    ValidationError.pipe(T.HttpErrorCode(10021)),
  ],
}));
