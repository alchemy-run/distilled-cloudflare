/**
 * Cloudflare R2 API
 *
 * Operations for managing R2 buckets.
 *
 * Note: Object operations (PUT/GET/DELETE objects) use S3-compatible APIs,
 * not the Cloudflare API. This module covers bucket management only.
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import * as R2 from "distilled-cloudflare/r2";
 *
 * const program = Effect.gen(function* () {
 *   const buckets = yield* R2.listBuckets({
 *     account_id: "your-account-id",
 *   });
 *   return buckets;
 * });
 * ```
 */

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// =============================================================================
// Shared Types
// =============================================================================

export const R2Bucket = Schema.Struct({
  name: Schema.String,
  creation_date: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
});
export type R2Bucket = typeof R2Bucket.Type;

export const ResultInfo = Schema.Struct({
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  total_count: Schema.optional(Schema.Number),
  cursor: Schema.optional(Schema.String),
});
export type ResultInfo = typeof ResultInfo.Type;

// =============================================================================
// List Buckets
// =============================================================================

export const ListBucketsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  name_contains: Schema.optional(Schema.String).pipe(T.HttpQuery("name_contains")),
  start_after: Schema.optional(Schema.String).pipe(T.HttpQuery("start_after")),
  order: Schema.optional(Schema.Literal("name")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets" }));
export type ListBucketsRequest = typeof ListBucketsRequest.Type;

export const ListBucketsResponse = Schema.Struct({
  result: Schema.Struct({
    buckets: Schema.Array(R2Bucket),
  }),
  result_info: Schema.optional(ResultInfo),
});
export type ListBucketsResponse = typeof ListBucketsResponse.Type;

export const listBuckets = API.makePaginated(() => ({
  input: ListBucketsRequest,
  output: ListBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "cursor",
    outputToken: "result_info.cursor",
    items: "result.buckets",
    pageSize: "per_page",
  },
}));

// =============================================================================
// Create Bucket
// =============================================================================

export const CreateBucketRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  locationHint: Schema.optional(Schema.String),
  storageClass: Schema.optional(Schema.Literal("Standard", "InfrequentAccess")),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/r2/buckets" }));
export type CreateBucketRequest = typeof CreateBucketRequest.Type;

export const CreateBucketResponse = Schema.Struct({
  result: R2Bucket,
});
export type CreateBucketResponse = typeof CreateBucketResponse.Type;

export const createBucket = API.make(() => ({
  input: CreateBucketRequest,
  output: CreateBucketResponse,
  errors: [],
}));

// =============================================================================
// Get Bucket
// =============================================================================

export const GetBucketRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}" }));
export type GetBucketRequest = typeof GetBucketRequest.Type;

export const GetBucketResponse = Schema.Struct({
  result: R2Bucket,
});
export type GetBucketResponse = typeof GetBucketResponse.Type;

export const getBucket = API.make(() => ({
  input: GetBucketRequest,
  output: GetBucketResponse,
  errors: [],
}));

// =============================================================================
// Delete Bucket
// =============================================================================

export const DeleteBucketRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/r2/buckets/{bucket_name}" }));
export type DeleteBucketRequest = typeof DeleteBucketRequest.Type;

export const DeleteBucketResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteBucketResponse = typeof DeleteBucketResponse.Type;

export const deleteBucket = API.make(() => ({
  input: DeleteBucketRequest,
  output: DeleteBucketResponse,
  errors: [],
}));

// =============================================================================
// Get Bucket Usage Summary
// =============================================================================

export const GetBucketUsageRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/usage" }));
export type GetBucketUsageRequest = typeof GetBucketUsageRequest.Type;

// Note: The API returns these values as strings, not numbers
export const BucketUsage = Schema.Struct({
  end: Schema.optional(Schema.String),
  payloadSize: Schema.optional(Schema.String),
  metadataSize: Schema.optional(Schema.String),
  objectCount: Schema.optional(Schema.String),
  uploadCount: Schema.optional(Schema.String),
  infrequentAccessPayloadSize: Schema.optional(Schema.String),
  infrequentAccessMetadataSize: Schema.optional(Schema.String),
  infrequentAccessObjectCount: Schema.optional(Schema.String),
  infrequentAccessUploadCount: Schema.optional(Schema.String),
});
export type BucketUsage = typeof BucketUsage.Type;

export const GetBucketUsageResponse = Schema.Struct({
  result: BucketUsage,
});
export type GetBucketUsageResponse = typeof GetBucketUsageResponse.Type;

export const getBucketUsage = API.make(() => ({
  input: GetBucketUsageRequest,
  output: GetBucketUsageResponse,
  errors: [],
}));

// =============================================================================
// Enable/Disable Event Notifications (for bucket)
// =============================================================================

export const GetEventNotificationsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration" }));
export type GetEventNotificationsRequest = typeof GetEventNotificationsRequest.Type;

export const EventNotificationRule = Schema.Struct({
  ruleId: Schema.optional(Schema.String),
  prefix: Schema.optional(Schema.String),
  suffix: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(Schema.String)),
  queueId: Schema.optional(Schema.String),
  queueName: Schema.optional(Schema.String),
});
export type EventNotificationRule = typeof EventNotificationRule.Type;

export const GetEventNotificationsResponse = Schema.Struct({
  result: Schema.Struct({
    queues: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Array(EventNotificationRule) })),
  }),
});
export type GetEventNotificationsResponse = typeof GetEventNotificationsResponse.Type;

export const getEventNotifications = API.make(() => ({
  input: GetEventNotificationsRequest,
  output: GetEventNotificationsResponse,
  errors: [],
}));

// =============================================================================
// R2 CORS Configuration
// =============================================================================

export const CorsRule = Schema.Struct({
  id: Schema.optional(Schema.String),
  allowed: Schema.Struct({
    origins: Schema.Array(Schema.String),
    methods: Schema.Array(Schema.String),
    headers: Schema.optional(Schema.Array(Schema.String)),
  }),
  exposeHeaders: Schema.optional(Schema.Array(Schema.String)),
  maxAgeSeconds: Schema.optional(Schema.Number),
});
export type CorsRule = typeof CorsRule.Type;

export const GetCorsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/cors" }));
export type GetCorsRequest = typeof GetCorsRequest.Type;

export const GetCorsResponse = Schema.Struct({
  result: Schema.Struct({
    rules: Schema.Array(CorsRule),
  }),
});
export type GetCorsResponse = typeof GetCorsResponse.Type;

export const getCors = API.make(() => ({
  input: GetCorsRequest,
  output: GetCorsResponse,
  errors: [],
}));

export const PutCorsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  rules: Schema.Array(CorsRule),
}).pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/cors" }));
export type PutCorsRequest = typeof PutCorsRequest.Type;

export const PutCorsResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type PutCorsResponse = typeof PutCorsResponse.Type;

export const putCors = API.make(() => ({
  input: PutCorsRequest,
  output: PutCorsResponse,
  errors: [],
}));

export const DeleteCorsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/cors" }));
export type DeleteCorsRequest = typeof DeleteCorsRequest.Type;

export const DeleteCorsResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteCorsResponse = typeof DeleteCorsResponse.Type;

export const deleteCors = API.make(() => ({
  input: DeleteCorsRequest,
  output: DeleteCorsResponse,
  errors: [],
}));

// =============================================================================
// R2 Lifecycle Configuration
// =============================================================================

export const LifecycleRule = Schema.Struct({
  id: Schema.String,
  enabled: Schema.Boolean,
  conditions: Schema.optional(Schema.Struct({
    prefix: Schema.optional(Schema.String),
    maxAge: Schema.optional(Schema.Number),
  })),
  action: Schema.Struct({
    type: Schema.Literal("Delete", "AbortIncompleteMultipartUpload"),
  }),
});
export type LifecycleRule = typeof LifecycleRule.Type;

export const GetLifecycleRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle" }));
export type GetLifecycleRequest = typeof GetLifecycleRequest.Type;

export const GetLifecycleResponse = Schema.Struct({
  result: Schema.Struct({
    rules: Schema.Array(LifecycleRule),
  }),
});
export type GetLifecycleResponse = typeof GetLifecycleResponse.Type;

export const getLifecycle = API.make(() => ({
  input: GetLifecycleRequest,
  output: GetLifecycleResponse,
  errors: [],
}));

export const PutLifecycleRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  rules: Schema.Array(LifecycleRule),
}).pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle" }));
export type PutLifecycleRequest = typeof PutLifecycleRequest.Type;

export const PutLifecycleResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type PutLifecycleResponse = typeof PutLifecycleResponse.Type;

export const putLifecycle = API.make(() => ({
  input: PutLifecycleRequest,
  output: PutLifecycleResponse,
  errors: [],
}));

export const DeleteLifecycleRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle" }));
export type DeleteLifecycleRequest = typeof DeleteLifecycleRequest.Type;

export const DeleteLifecycleResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteLifecycleResponse = typeof DeleteLifecycleResponse.Type;

export const deleteLifecycle = API.make(() => ({
  input: DeleteLifecycleRequest,
  output: DeleteLifecycleResponse,
  errors: [],
}));

// =============================================================================
// R2 Custom Domains
// =============================================================================

export const CustomDomain = Schema.Struct({
  domain: Schema.String,
  enabled: Schema.optional(Schema.Boolean),
  status: Schema.optional(Schema.Struct({
    ownership: Schema.optional(Schema.String),
    ssl: Schema.optional(Schema.String),
  })),
  minTLS: Schema.optional(Schema.String),
  zoneId: Schema.optional(Schema.String),
  zoneName: Schema.optional(Schema.String),
});
export type CustomDomain = typeof CustomDomain.Type;

export const ListCustomDomainsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/custom_domains" }));
export type ListCustomDomainsRequest = typeof ListCustomDomainsRequest.Type;

export const ListCustomDomainsResponse = Schema.Struct({
  result: Schema.Struct({
    domains: Schema.Array(CustomDomain),
  }),
});
export type ListCustomDomainsResponse = typeof ListCustomDomainsResponse.Type;

export const listCustomDomains = API.make(() => ({
  input: ListCustomDomainsRequest,
  output: ListCustomDomainsResponse,
  errors: [],
}));

export const AddCustomDomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  domain: Schema.String,
  zoneId: Schema.optional(Schema.String),
  minTLS: Schema.optional(Schema.Literal("1.0", "1.1", "1.2", "1.3")),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/custom_domains" }));
export type AddCustomDomainRequest = typeof AddCustomDomainRequest.Type;

export const AddCustomDomainResponse = Schema.Struct({
  result: CustomDomain,
});
export type AddCustomDomainResponse = typeof AddCustomDomainResponse.Type;

export const addCustomDomain = API.make(() => ({
  input: AddCustomDomainRequest,
  output: AddCustomDomainResponse,
  errors: [],
}));

export const DeleteCustomDomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  bucket_name: Schema.String.pipe(T.HttpPath("bucket_name")),
  domain: Schema.String.pipe(T.HttpPath("domain")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/r2/buckets/{bucket_name}/custom_domains/{domain}" }));
export type DeleteCustomDomainRequest = typeof DeleteCustomDomainRequest.Type;

export const DeleteCustomDomainResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteCustomDomainResponse = typeof DeleteCustomDomainResponse.Type;

export const deleteCustomDomain = API.make(() => ({
  input: DeleteCustomDomainRequest,
  output: DeleteCustomDomainResponse,
  errors: [],
}));
