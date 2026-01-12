/**
 * Cloudflare DNS API
 *
 * Operations for managing DNS records in a zone.
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import * as DNS from "distilled-cloudflare/dns";
 *
 * const program = Effect.gen(function* () {
 *   const records = yield* DNS.listDnsRecords({
 *     zone_id: "your-zone-id",
 *   });
 *   return records;
 * });
 * ```
 */

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// =============================================================================
// Shared Types
// =============================================================================

export const DnsRecordType = Schema.Literal(
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
  "PTR",
  "SMIMEA",
  "SRV",
  "SSHFP",
  "SVCB",
  "TLSA",
  "TXT",
  "URI",
);
export type DnsRecordType = typeof DnsRecordType.Type;

export const DnsRecordMeta = Schema.Struct({
  auto_added: Schema.optional(Schema.Boolean),
  managed_by_apps: Schema.optional(Schema.Boolean),
  managed_by_argo_tunnel: Schema.optional(Schema.Boolean),
  source: Schema.optional(Schema.String),
});

export const DnsRecord = Schema.Struct({
  id: Schema.String,
  zone_id: Schema.String,
  zone_name: Schema.String,
  name: Schema.String,
  type: DnsRecordType,
  content: Schema.String,
  proxiable: Schema.Boolean,
  proxied: Schema.optional(Schema.Boolean),
  ttl: Schema.Number,
  locked: Schema.optional(Schema.Boolean),
  meta: Schema.optional(DnsRecordMeta),
  comment: Schema.optional(Schema.NullOr(Schema.String)),
  tags: Schema.optional(Schema.Array(Schema.String)),
  created_on: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
});
export type DnsRecord = typeof DnsRecord.Type;

export const ResultInfo = Schema.Struct({
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  total_count: Schema.optional(Schema.Number),
  total_pages: Schema.optional(Schema.Number),
});
export type ResultInfo = typeof ResultInfo.Type;

// =============================================================================
// List DNS Records
// =============================================================================

export const ListDnsRecordsRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  type: Schema.optional(DnsRecordType).pipe(T.HttpQuery("type")),
  content: Schema.optional(Schema.String).pipe(T.HttpQuery("content")),
  proxied: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("proxied")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("type", "name", "content", "ttl", "proxied")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
  match: Schema.optional(Schema.Literal("any", "all")).pipe(T.HttpQuery("match")),
  tag: Schema.optional(Schema.String).pipe(T.HttpQuery("tag")),
  tag_match: Schema.optional(Schema.Literal("any", "all")).pipe(T.HttpQuery("tag-match")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  comment: Schema.optional(Schema.String).pipe(T.HttpQuery("comment")),
}).pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/dns_records" }));
export type ListDnsRecordsRequest = typeof ListDnsRecordsRequest.Type;

export const ListDnsRecordsResponse = Schema.Struct({
  result: Schema.Array(DnsRecord),
  result_info: Schema.optional(ResultInfo),
});
export type ListDnsRecordsResponse = typeof ListDnsRecordsResponse.Type;

export const listDnsRecords = API.makePaginated(() => ({
  input: ListDnsRecordsRequest,
  output: ListDnsRecordsResponse,
  errors: [],
  pagination: {
    inputToken: "page",
    outputToken: "result_info.page",
    items: "result",
    pageSize: "per_page",
  },
}));

// =============================================================================
// Get DNS Record
// =============================================================================

export const GetDnsRecordRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  dns_record_id: Schema.String.pipe(T.HttpPath("dns_record_id")),
}).pipe(T.Http({ method: "GET", path: "/zones/{zone_id}/dns_records/{dns_record_id}" }));
export type GetDnsRecordRequest = typeof GetDnsRecordRequest.Type;

export const GetDnsRecordResponse = Schema.Struct({
  result: DnsRecord,
});
export type GetDnsRecordResponse = typeof GetDnsRecordResponse.Type;

export const getDnsRecord = API.make(() => ({
  input: GetDnsRecordRequest,
  output: GetDnsRecordResponse,
  errors: [],
}));

// =============================================================================
// Create DNS Record
// =============================================================================

export const CreateDnsRecordRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  type: DnsRecordType,
  name: Schema.String,
  content: Schema.String,
  ttl: Schema.optional(Schema.Number),
  proxied: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  comment: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
}).pipe(T.Http({ method: "POST", path: "/zones/{zone_id}/dns_records" }));
export type CreateDnsRecordRequest = typeof CreateDnsRecordRequest.Type;

export const CreateDnsRecordResponse = Schema.Struct({
  result: DnsRecord,
});
export type CreateDnsRecordResponse = typeof CreateDnsRecordResponse.Type;

export const createDnsRecord = API.make(() => ({
  input: CreateDnsRecordRequest,
  output: CreateDnsRecordResponse,
  errors: [],
}));

// =============================================================================
// Update DNS Record
// =============================================================================

export const UpdateDnsRecordRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  dns_record_id: Schema.String.pipe(T.HttpPath("dns_record_id")),
  type: DnsRecordType,
  name: Schema.String,
  content: Schema.String,
  ttl: Schema.optional(Schema.Number),
  proxied: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  comment: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
}).pipe(T.Http({ method: "PUT", path: "/zones/{zone_id}/dns_records/{dns_record_id}" }));
export type UpdateDnsRecordRequest = typeof UpdateDnsRecordRequest.Type;

export const UpdateDnsRecordResponse = Schema.Struct({
  result: DnsRecord,
});
export type UpdateDnsRecordResponse = typeof UpdateDnsRecordResponse.Type;

export const updateDnsRecord = API.make(() => ({
  input: UpdateDnsRecordRequest,
  output: UpdateDnsRecordResponse,
  errors: [],
}));

// =============================================================================
// Patch DNS Record
// =============================================================================

export const PatchDnsRecordRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  dns_record_id: Schema.String.pipe(T.HttpPath("dns_record_id")),
  type: Schema.optional(DnsRecordType),
  name: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.Number),
  proxied: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  comment: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
}).pipe(T.Http({ method: "PATCH", path: "/zones/{zone_id}/dns_records/{dns_record_id}" }));
export type PatchDnsRecordRequest = typeof PatchDnsRecordRequest.Type;

export const PatchDnsRecordResponse = Schema.Struct({
  result: DnsRecord,
});
export type PatchDnsRecordResponse = typeof PatchDnsRecordResponse.Type;

export const patchDnsRecord = API.make(() => ({
  input: PatchDnsRecordRequest,
  output: PatchDnsRecordResponse,
  errors: [],
}));

// =============================================================================
// Delete DNS Record
// =============================================================================

export const DeleteDnsRecordRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  dns_record_id: Schema.String.pipe(T.HttpPath("dns_record_id")),
}).pipe(T.Http({ method: "DELETE", path: "/zones/{zone_id}/dns_records/{dns_record_id}" }));
export type DeleteDnsRecordRequest = typeof DeleteDnsRecordRequest.Type;

export const DeleteDnsRecordResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.String,
  }),
});
export type DeleteDnsRecordResponse = typeof DeleteDnsRecordResponse.Type;

export const deleteDnsRecord = API.make(() => ({
  input: DeleteDnsRecordRequest,
  output: DeleteDnsRecordResponse,
  errors: [],
}));
