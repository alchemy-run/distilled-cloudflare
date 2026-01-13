/**
 * Cloudflare IMAGES API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service images
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

export interface ListImagesRequest {
  account_id: string;
  page?: number;
  per_page?: number;
  creator?: string;
}

export const ListImagesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  creator: Schema.optional(Schema.String).pipe(T.HttpQuery("creator"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1" }),
).annotations({ identifier: "ListImagesRequest" }) as unknown as Schema.Schema<ListImagesRequest>;

export interface ListImagesResponse {
  result: { images?: { creator?: string; filename?: string; id?: string; meta?: Record<string, unknown>; requireSignedURLs?: boolean; uploaded?: string; variants?: unknown[] }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListImagesResponse = Schema.Struct({
  result: Schema.Struct({
  images: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  creator: Schema.optional(Schema.NullOr(Schema.String)),
  filename: Schema.optional(Schema.NullOr(Schema.String)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  meta: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  requireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  uploaded: Schema.optional(Schema.NullOr(Schema.Date)),
  variants: Schema.optional(Schema.NullOr(Schema.Array(Schema.Union(Schema.String, Schema.String, Schema.String))))
}))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListImagesResponse" }) as unknown as Schema.Schema<ListImagesResponse>;

export const listImages: (
  input: ListImagesRequest
) => Effect.Effect<
  ListImagesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListImagesRequest,
  output: ListImagesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CloudflareImagesUploadAnImageViaUrlRequest {
  account_id: string;
  body: FormData;
}

export const CloudflareImagesUploadAnImageViaUrlRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.instanceOf(FormData).pipe(T.HttpFormData())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/images/v1" }),
).annotations({ identifier: "CloudflareImagesUploadAnImageViaUrlRequest" }) as unknown as Schema.Schema<CloudflareImagesUploadAnImageViaUrlRequest>;

export interface CloudflareImagesUploadAnImageViaUrlResponse {
  result: { creator?: string; filename?: string; id?: string; meta?: Record<string, unknown>; requireSignedURLs?: boolean; uploaded?: string; variants?: unknown[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CloudflareImagesUploadAnImageViaUrlResponse = Schema.Struct({
  result: Schema.Struct({
  creator: Schema.optional(Schema.NullOr(Schema.String)),
  filename: Schema.optional(Schema.NullOr(Schema.String)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  meta: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  requireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  uploaded: Schema.optional(Schema.NullOr(Schema.Date)),
  variants: Schema.optional(Schema.NullOr(Schema.Array(Schema.Union(Schema.String, Schema.String, Schema.String))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CloudflareImagesUploadAnImageViaUrlResponse" }) as unknown as Schema.Schema<CloudflareImagesUploadAnImageViaUrlResponse>;

export const cloudflareImagesUploadAnImageViaUrl: (
  input: CloudflareImagesUploadAnImageViaUrlRequest
) => Effect.Effect<
  CloudflareImagesUploadAnImageViaUrlResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CloudflareImagesUploadAnImageViaUrlRequest,
  output: CloudflareImagesUploadAnImageViaUrlResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListSigningKeysRequest {
  account_id: string;
}

export const ListSigningKeysRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/keys" }),
).annotations({ identifier: "ListSigningKeysRequest" }) as unknown as Schema.Schema<ListSigningKeysRequest>;

export interface ListSigningKeysResponse {
  result: { keys?: { name?: string; value?: string }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListSigningKeysResponse = Schema.Struct({
  result: Schema.Struct({
  keys: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.NullOr(Schema.String)),
  value: Schema.optional(Schema.NullOr(Schema.String))
}))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListSigningKeysResponse" }) as unknown as Schema.Schema<ListSigningKeysResponse>;

export const listSigningKeys: (
  input: ListSigningKeysRequest
) => Effect.Effect<
  ListSigningKeysResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSigningKeysRequest,
  output: ListSigningKeysResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CloudflareImagesKeysAddSigningKeyRequest {
  signing_key_name: string;
  account_id: string;
}

export const CloudflareImagesKeysAddSigningKeyRequest = Schema.Struct({
  signing_key_name: Schema.String.pipe(T.HttpPath("signing_key_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/images/v1/keys/{signing_key_name}" }),
).annotations({ identifier: "CloudflareImagesKeysAddSigningKeyRequest" }) as unknown as Schema.Schema<CloudflareImagesKeysAddSigningKeyRequest>;

export interface CloudflareImagesKeysAddSigningKeyResponse {
  result: { keys?: { name?: string; value?: string }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CloudflareImagesKeysAddSigningKeyResponse = Schema.Struct({
  result: Schema.Struct({
  keys: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.NullOr(Schema.String)),
  value: Schema.optional(Schema.NullOr(Schema.String))
}))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CloudflareImagesKeysAddSigningKeyResponse" }) as unknown as Schema.Schema<CloudflareImagesKeysAddSigningKeyResponse>;

export const cloudflareImagesKeysAddSigningKey: (
  input: CloudflareImagesKeysAddSigningKeyRequest
) => Effect.Effect<
  CloudflareImagesKeysAddSigningKeyResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CloudflareImagesKeysAddSigningKeyRequest,
  output: CloudflareImagesKeysAddSigningKeyResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteSigningKeyRequest {
  signing_key_name: string;
  account_id: string;
}

export const DeleteSigningKeyRequest = Schema.Struct({
  signing_key_name: Schema.String.pipe(T.HttpPath("signing_key_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/images/v1/keys/{signing_key_name}" }),
).annotations({ identifier: "DeleteSigningKeyRequest" }) as unknown as Schema.Schema<DeleteSigningKeyRequest>;

export interface DeleteSigningKeyResponse {
  result: { keys?: { name?: string; value?: string }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteSigningKeyResponse = Schema.Struct({
  result: Schema.Struct({
  keys: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.NullOr(Schema.String)),
  value: Schema.optional(Schema.NullOr(Schema.String))
}))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteSigningKeyResponse" }) as unknown as Schema.Schema<DeleteSigningKeyResponse>;

export const deleteSigningKey: (
  input: DeleteSigningKeyRequest
) => Effect.Effect<
  DeleteSigningKeyResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSigningKeyRequest,
  output: DeleteSigningKeyResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CloudflareImagesImagesUsageStatisticsRequest {
  account_id: string;
}

export const CloudflareImagesImagesUsageStatisticsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/stats" }),
).annotations({ identifier: "CloudflareImagesImagesUsageStatisticsRequest" }) as unknown as Schema.Schema<CloudflareImagesImagesUsageStatisticsRequest>;

export interface CloudflareImagesImagesUsageStatisticsResponse {
  result: { count?: { allowed?: number; current?: number } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CloudflareImagesImagesUsageStatisticsResponse = Schema.Struct({
  result: Schema.Struct({
  count: Schema.optional(Schema.NullOr(Schema.Struct({
  allowed: Schema.optional(Schema.NullOr(Schema.Number)),
  current: Schema.optional(Schema.NullOr(Schema.Number))
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CloudflareImagesImagesUsageStatisticsResponse" }) as unknown as Schema.Schema<CloudflareImagesImagesUsageStatisticsResponse>;

export const cloudflareImagesImagesUsageStatistics: (
  input: CloudflareImagesImagesUsageStatisticsRequest
) => Effect.Effect<
  CloudflareImagesImagesUsageStatisticsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CloudflareImagesImagesUsageStatisticsRequest,
  output: CloudflareImagesImagesUsageStatisticsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListVariantsRequest {
  account_id: string;
}

export const ListVariantsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/variants" }),
).annotations({ identifier: "ListVariantsRequest" }) as unknown as Schema.Schema<ListVariantsRequest>;

export interface ListVariantsResponse {
  result: { variants?: { hero?: { id: string; neverRequireSignedURLs?: boolean; options: { fit: "scale-down" | "contain" | "cover" | "crop" | "pad"; height: number; metadata: "keep" | "copyright" | "none"; width: number } } } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListVariantsResponse = Schema.Struct({
  result: Schema.Struct({
  variants: Schema.optional(Schema.NullOr(Schema.Struct({
  hero: Schema.optional(Schema.NullOr(Schema.Struct({
  id: Schema.String,
  neverRequireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Struct({
  fit: Schema.Literal("scale-down", "contain", "cover", "crop", "pad"),
  height: Schema.Number,
  metadata: Schema.Literal("keep", "copyright", "none"),
  width: Schema.Number
})
})))
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListVariantsResponse" }) as unknown as Schema.Schema<ListVariantsResponse>;

export const listVariants: (
  input: ListVariantsRequest
) => Effect.Effect<
  ListVariantsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListVariantsRequest,
  output: ListVariantsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateAVariantRequest {
  account_id: string;
  body: { id: string; neverRequireSignedURLs?: boolean; options: { fit: "scale-down" | "contain" | "cover" | "crop" | "pad"; height: number; metadata: "keep" | "copyright" | "none"; width: number } };
}

export const CreateAVariantRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  id: Schema.String,
  neverRequireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Struct({
  fit: Schema.Literal("scale-down", "contain", "cover", "crop", "pad"),
  height: Schema.Number,
  metadata: Schema.Literal("keep", "copyright", "none"),
  width: Schema.Number
})
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/images/v1/variants" }),
).annotations({ identifier: "CreateAVariantRequest" }) as unknown as Schema.Schema<CreateAVariantRequest>;

export interface CreateAVariantResponse {
  result: { variant?: { id: string; neverRequireSignedURLs?: boolean; options: { fit: "scale-down" | "contain" | "cover" | "crop" | "pad"; height: number; metadata: "keep" | "copyright" | "none"; width: number } } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateAVariantResponse = Schema.Struct({
  result: Schema.Struct({
  variant: Schema.optional(Schema.NullOr(Schema.Struct({
  id: Schema.String,
  neverRequireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Struct({
  fit: Schema.Literal("scale-down", "contain", "cover", "crop", "pad"),
  height: Schema.Number,
  metadata: Schema.Literal("keep", "copyright", "none"),
  width: Schema.Number
})
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateAVariantResponse" }) as unknown as Schema.Schema<CreateAVariantResponse>;

export const createAVariant: (
  input: CreateAVariantRequest
) => Effect.Effect<
  CreateAVariantResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAVariantRequest,
  output: CreateAVariantResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CloudflareImagesVariantsVariantDetailsRequest {
  variant_id: string;
  account_id: string;
}

export const CloudflareImagesVariantsVariantDetailsRequest = Schema.Struct({
  variant_id: Schema.String.pipe(T.HttpPath("variant_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/variants/{variant_id}" }),
).annotations({ identifier: "CloudflareImagesVariantsVariantDetailsRequest" }) as unknown as Schema.Schema<CloudflareImagesVariantsVariantDetailsRequest>;

export interface CloudflareImagesVariantsVariantDetailsResponse {
  result: { variant?: { id: string; neverRequireSignedURLs?: boolean; options: { fit: "scale-down" | "contain" | "cover" | "crop" | "pad"; height: number; metadata: "keep" | "copyright" | "none"; width: number } } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CloudflareImagesVariantsVariantDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  variant: Schema.optional(Schema.NullOr(Schema.Struct({
  id: Schema.String,
  neverRequireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Struct({
  fit: Schema.Literal("scale-down", "contain", "cover", "crop", "pad"),
  height: Schema.Number,
  metadata: Schema.Literal("keep", "copyright", "none"),
  width: Schema.Number
})
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CloudflareImagesVariantsVariantDetailsResponse" }) as unknown as Schema.Schema<CloudflareImagesVariantsVariantDetailsResponse>;

export const cloudflareImagesVariantsVariantDetails: (
  input: CloudflareImagesVariantsVariantDetailsRequest
) => Effect.Effect<
  CloudflareImagesVariantsVariantDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CloudflareImagesVariantsVariantDetailsRequest,
  output: CloudflareImagesVariantsVariantDetailsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteAVariantRequest {
  variant_id: string;
  account_id: string;
}

export const DeleteAVariantRequest = Schema.Struct({
  variant_id: Schema.String.pipe(T.HttpPath("variant_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/images/v1/variants/{variant_id}" }),
).annotations({ identifier: "DeleteAVariantRequest" }) as unknown as Schema.Schema<DeleteAVariantRequest>;

export interface DeleteAVariantResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAVariantResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteAVariantResponse" }) as unknown as Schema.Schema<DeleteAVariantResponse>;

export const deleteAVariant: (
  input: DeleteAVariantRequest
) => Effect.Effect<
  DeleteAVariantResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAVariantRequest,
  output: DeleteAVariantResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateAVariantRequest {
  variant_id: string;
  account_id: string;
  body: { neverRequireSignedURLs?: boolean; options: { fit: "scale-down" | "contain" | "cover" | "crop" | "pad"; height: number; metadata: "keep" | "copyright" | "none"; width: number } };
}

export const UpdateAVariantRequest = Schema.Struct({
  variant_id: Schema.String.pipe(T.HttpPath("variant_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  neverRequireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Struct({
  fit: Schema.Literal("scale-down", "contain", "cover", "crop", "pad"),
  height: Schema.Number,
  metadata: Schema.Literal("keep", "copyright", "none"),
  width: Schema.Number
})
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/images/v1/variants/{variant_id}" }),
).annotations({ identifier: "UpdateAVariantRequest" }) as unknown as Schema.Schema<UpdateAVariantRequest>;

export interface UpdateAVariantResponse {
  result: { variant?: { id: string; neverRequireSignedURLs?: boolean; options: { fit: "scale-down" | "contain" | "cover" | "crop" | "pad"; height: number; metadata: "keep" | "copyright" | "none"; width: number } } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAVariantResponse = Schema.Struct({
  result: Schema.Struct({
  variant: Schema.optional(Schema.NullOr(Schema.Struct({
  id: Schema.String,
  neverRequireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Struct({
  fit: Schema.Literal("scale-down", "contain", "cover", "crop", "pad"),
  height: Schema.Number,
  metadata: Schema.Literal("keep", "copyright", "none"),
  width: Schema.Number
})
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateAVariantResponse" }) as unknown as Schema.Schema<UpdateAVariantResponse>;

export const updateAVariant: (
  input: UpdateAVariantRequest
) => Effect.Effect<
  UpdateAVariantResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAVariantRequest,
  output: UpdateAVariantResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CloudflareImagesImageDetailsRequest {
  image_id: string;
  account_id: string;
}

export const CloudflareImagesImageDetailsRequest = Schema.Struct({
  image_id: Schema.String.pipe(T.HttpPath("image_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/{image_id}" }),
).annotations({ identifier: "CloudflareImagesImageDetailsRequest" }) as unknown as Schema.Schema<CloudflareImagesImageDetailsRequest>;

export interface CloudflareImagesImageDetailsResponse {
  result: { creator?: string; filename?: string; id?: string; meta?: Record<string, unknown>; requireSignedURLs?: boolean; uploaded?: string; variants?: unknown[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CloudflareImagesImageDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  creator: Schema.optional(Schema.NullOr(Schema.String)),
  filename: Schema.optional(Schema.NullOr(Schema.String)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  meta: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  requireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  uploaded: Schema.optional(Schema.NullOr(Schema.Date)),
  variants: Schema.optional(Schema.NullOr(Schema.Array(Schema.Union(Schema.String, Schema.String, Schema.String))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CloudflareImagesImageDetailsResponse" }) as unknown as Schema.Schema<CloudflareImagesImageDetailsResponse>;

export const cloudflareImagesImageDetails: (
  input: CloudflareImagesImageDetailsRequest
) => Effect.Effect<
  CloudflareImagesImageDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CloudflareImagesImageDetailsRequest,
  output: CloudflareImagesImageDetailsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteImageRequest {
  image_id: string;
  account_id: string;
}

export const DeleteImageRequest = Schema.Struct({
  image_id: Schema.String.pipe(T.HttpPath("image_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/images/v1/{image_id}" }),
).annotations({ identifier: "DeleteImageRequest" }) as unknown as Schema.Schema<DeleteImageRequest>;

export interface DeleteImageResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteImageResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteImageResponse" }) as unknown as Schema.Schema<DeleteImageResponse>;

export const deleteImage: (
  input: DeleteImageRequest
) => Effect.Effect<
  DeleteImageResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteImageRequest,
  output: DeleteImageResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateImageRequest {
  image_id: string;
  account_id: string;
  body: { creator?: string; metadata?: Record<string, unknown>; requireSignedURLs?: boolean };
}

export const UpdateImageRequest = Schema.Struct({
  image_id: Schema.String.pipe(T.HttpPath("image_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  creator: Schema.optional(Schema.NullOr(Schema.String)),
  metadata: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  requireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/images/v1/{image_id}" }),
).annotations({ identifier: "UpdateImageRequest" }) as unknown as Schema.Schema<UpdateImageRequest>;

export interface UpdateImageResponse {
  result: { creator?: string; filename?: string; id?: string; meta?: Record<string, unknown>; requireSignedURLs?: boolean; uploaded?: string; variants?: unknown[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateImageResponse = Schema.Struct({
  result: Schema.Struct({
  creator: Schema.optional(Schema.NullOr(Schema.String)),
  filename: Schema.optional(Schema.NullOr(Schema.String)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  meta: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  requireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  uploaded: Schema.optional(Schema.NullOr(Schema.Date)),
  variants: Schema.optional(Schema.NullOr(Schema.Array(Schema.Union(Schema.String, Schema.String, Schema.String))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateImageResponse" }) as unknown as Schema.Schema<UpdateImageResponse>;

export const updateImage: (
  input: UpdateImageRequest
) => Effect.Effect<
  UpdateImageResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateImageRequest,
  output: UpdateImageResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CloudflareImagesBaseImageRequest {
  image_id: string;
  account_id: string;
}

export const CloudflareImagesBaseImageRequest = Schema.Struct({
  image_id: Schema.String.pipe(T.HttpPath("image_id")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v1/{image_id}/blob" }),
).annotations({ identifier: "CloudflareImagesBaseImageRequest" }) as unknown as Schema.Schema<CloudflareImagesBaseImageRequest>;

export interface CloudflareImagesBaseImageResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CloudflareImagesBaseImageResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CloudflareImagesBaseImageResponse" }) as unknown as Schema.Schema<CloudflareImagesBaseImageResponse>;

export const cloudflareImagesBaseImage: (
  input: CloudflareImagesBaseImageRequest
) => Effect.Effect<
  CloudflareImagesBaseImageResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CloudflareImagesBaseImageRequest,
  output: CloudflareImagesBaseImageResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListImagesV2Request {
  account_id: string;
  continuation_token?: string;
  per_page?: number;
  sort_order?: "asc" | "desc";
  creator?: string;
}

export const ListImagesV2Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  continuation_token: Schema.optional(Schema.String).pipe(T.HttpQuery("continuation_token")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  sort_order: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("sort_order")),
  creator: Schema.optional(Schema.String).pipe(T.HttpQuery("creator"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/images/v2" }),
).annotations({ identifier: "ListImagesV2Request" }) as unknown as Schema.Schema<ListImagesV2Request>;

export interface ListImagesV2Response {
  result: { images?: { creator?: string; filename?: string; id?: string; meta?: Record<string, unknown>; requireSignedURLs?: boolean; uploaded?: string; variants?: unknown[] }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListImagesV2Response = Schema.Struct({
  result: Schema.Struct({
  images: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({
  creator: Schema.optional(Schema.NullOr(Schema.String)),
  filename: Schema.optional(Schema.NullOr(Schema.String)),
  id: Schema.optional(Schema.NullOr(Schema.String)),
  meta: Schema.optional(Schema.NullOr(Schema.Struct({}))),
  requireSignedURLs: Schema.optional(Schema.NullOr(Schema.Boolean)),
  uploaded: Schema.optional(Schema.NullOr(Schema.Date)),
  variants: Schema.optional(Schema.NullOr(Schema.Array(Schema.Union(Schema.String, Schema.String, Schema.String))))
}))))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListImagesV2Response" }) as unknown as Schema.Schema<ListImagesV2Response>;

export const listImagesV2: (
  input: ListImagesV2Request
) => Effect.Effect<
  ListImagesV2Response,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListImagesV2Request,
  output: ListImagesV2Response,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateAuthenticatedDirectUploadUrlV2Request {
  account_id: string;
  body: FormData;
}

export const CreateAuthenticatedDirectUploadUrlV2Request = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.instanceOf(FormData).pipe(T.HttpFormData())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/images/v2/direct_upload" }),
).annotations({ identifier: "CreateAuthenticatedDirectUploadUrlV2Request" }) as unknown as Schema.Schema<CreateAuthenticatedDirectUploadUrlV2Request>;

export interface CreateAuthenticatedDirectUploadUrlV2Response {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateAuthenticatedDirectUploadUrlV2Response = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateAuthenticatedDirectUploadUrlV2Response" }) as unknown as Schema.Schema<CreateAuthenticatedDirectUploadUrlV2Response>;

export const createAuthenticatedDirectUploadUrlV2: (
  input: CreateAuthenticatedDirectUploadUrlV2Request
) => Effect.Effect<
  CreateAuthenticatedDirectUploadUrlV2Response,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAuthenticatedDirectUploadUrlV2Request,
  output: CreateAuthenticatedDirectUploadUrlV2Response,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
