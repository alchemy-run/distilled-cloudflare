/**
 * Cloudflare CACHE API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service cache
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

export interface GetCacheReserveSettingRequest {
  zone_id: string;
}

export const GetCacheReserveSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/cache/cache_reserve" }),
).annotations({ identifier: "GetCacheReserveSettingRequest" }) as unknown as Schema.Schema<GetCacheReserveSettingRequest>;

export interface GetCacheReserveSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetCacheReserveSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetCacheReserveSettingResponse" }) as unknown as Schema.Schema<GetCacheReserveSettingResponse>;

export const getCacheReserveSetting: (
  input: GetCacheReserveSettingRequest
) => Effect.Effect<
  GetCacheReserveSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCacheReserveSettingRequest,
  output: GetCacheReserveSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ZoneCacheSettingsChangeCacheReserveSettingRequest {
  zone_id: string;
  body: { value: "on" | "off" };
}

export const ZoneCacheSettingsChangeCacheReserveSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  value: Schema.Literal("on", "off")
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/cache/cache_reserve" }),
).annotations({ identifier: "ZoneCacheSettingsChangeCacheReserveSettingRequest" }) as unknown as Schema.Schema<ZoneCacheSettingsChangeCacheReserveSettingRequest>;

export interface ZoneCacheSettingsChangeCacheReserveSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ZoneCacheSettingsChangeCacheReserveSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ZoneCacheSettingsChangeCacheReserveSettingResponse" }) as unknown as Schema.Schema<ZoneCacheSettingsChangeCacheReserveSettingResponse>;

export const zoneCacheSettingsChangeCacheReserveSetting: (
  input: ZoneCacheSettingsChangeCacheReserveSettingRequest
) => Effect.Effect<
  ZoneCacheSettingsChangeCacheReserveSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ZoneCacheSettingsChangeCacheReserveSettingRequest,
  output: ZoneCacheSettingsChangeCacheReserveSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetCacheReserveClearRequest {
  zone_id: string;
}

export const GetCacheReserveClearRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/cache/cache_reserve_clear" }),
).annotations({ identifier: "GetCacheReserveClearRequest" }) as unknown as Schema.Schema<GetCacheReserveClearRequest>;

export interface GetCacheReserveClearResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetCacheReserveClearResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetCacheReserveClearResponse" }) as unknown as Schema.Schema<GetCacheReserveClearResponse>;

export const getCacheReserveClear: (
  input: GetCacheReserveClearRequest
) => Effect.Effect<
  GetCacheReserveClearResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCacheReserveClearRequest,
  output: GetCacheReserveClearResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ZoneCacheSettingsStartCacheReserveClearRequest {
  zone_id: string;
}

export const ZoneCacheSettingsStartCacheReserveClearRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/cache/cache_reserve_clear" }),
).annotations({ identifier: "ZoneCacheSettingsStartCacheReserveClearRequest" }) as unknown as Schema.Schema<ZoneCacheSettingsStartCacheReserveClearRequest>;

export interface ZoneCacheSettingsStartCacheReserveClearResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ZoneCacheSettingsStartCacheReserveClearResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ZoneCacheSettingsStartCacheReserveClearResponse" }) as unknown as Schema.Schema<ZoneCacheSettingsStartCacheReserveClearResponse>;

export const zoneCacheSettingsStartCacheReserveClear: (
  input: ZoneCacheSettingsStartCacheReserveClearRequest
) => Effect.Effect<
  ZoneCacheSettingsStartCacheReserveClearResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ZoneCacheSettingsStartCacheReserveClearRequest,
  output: ZoneCacheSettingsStartCacheReserveClearResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface PostQuantumEncryptionSettingRequest {
  zone_id: string;
}

export const PostQuantumEncryptionSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/cache/origin_post_quantum_encryption" }),
).annotations({ identifier: "PostQuantumEncryptionSettingRequest" }) as unknown as Schema.Schema<PostQuantumEncryptionSettingRequest>;

export interface PostQuantumEncryptionSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PostQuantumEncryptionSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PostQuantumEncryptionSettingResponse" }) as unknown as Schema.Schema<PostQuantumEncryptionSettingResponse>;

export const postQuantumEncryptionSetting: (
  input: PostQuantumEncryptionSettingRequest
) => Effect.Effect<
  PostQuantumEncryptionSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PostQuantumEncryptionSettingRequest,
  output: PostQuantumEncryptionSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface PostQuantumEncryptionSetting1Request {
  zone_id: string;
  body: { value: "preferred" | "supported" | "off" };
}

export const PostQuantumEncryptionSetting1Request = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  value: Schema.Literal("preferred", "supported", "off")
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/cache/origin_post_quantum_encryption" }),
).annotations({ identifier: "PostQuantumEncryptionSetting1Request" }) as unknown as Schema.Schema<PostQuantumEncryptionSetting1Request>;

export interface PostQuantumEncryptionSetting1Response {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PostQuantumEncryptionSetting1Response = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PostQuantumEncryptionSetting1Response" }) as unknown as Schema.Schema<PostQuantumEncryptionSetting1Response>;

export const postQuantumEncryptionSetting1: (
  input: PostQuantumEncryptionSetting1Request
) => Effect.Effect<
  PostQuantumEncryptionSetting1Response,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PostQuantumEncryptionSetting1Request,
  output: PostQuantumEncryptionSetting1Response,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetRegionalTieredCacheSettingRequest {
  zone_id: string;
}

export const GetRegionalTieredCacheSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/cache/regional_tiered_cache" }),
).annotations({ identifier: "GetRegionalTieredCacheSettingRequest" }) as unknown as Schema.Schema<GetRegionalTieredCacheSettingRequest>;

export interface GetRegionalTieredCacheSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetRegionalTieredCacheSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetRegionalTieredCacheSettingResponse" }) as unknown as Schema.Schema<GetRegionalTieredCacheSettingResponse>;

export const getRegionalTieredCacheSetting: (
  input: GetRegionalTieredCacheSettingRequest
) => Effect.Effect<
  GetRegionalTieredCacheSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRegionalTieredCacheSettingRequest,
  output: GetRegionalTieredCacheSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ZoneCacheSettingsChangeRegionalTieredCacheSettingRequest {
  zone_id: string;
  body: { value: "on" | "off" };
}

export const ZoneCacheSettingsChangeRegionalTieredCacheSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  value: Schema.Literal("on", "off")
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/cache/regional_tiered_cache" }),
).annotations({ identifier: "ZoneCacheSettingsChangeRegionalTieredCacheSettingRequest" }) as unknown as Schema.Schema<ZoneCacheSettingsChangeRegionalTieredCacheSettingRequest>;

export interface ZoneCacheSettingsChangeRegionalTieredCacheSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ZoneCacheSettingsChangeRegionalTieredCacheSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ZoneCacheSettingsChangeRegionalTieredCacheSettingResponse" }) as unknown as Schema.Schema<ZoneCacheSettingsChangeRegionalTieredCacheSettingResponse>;

export const zoneCacheSettingsChangeRegionalTieredCacheSetting: (
  input: ZoneCacheSettingsChangeRegionalTieredCacheSettingRequest
) => Effect.Effect<
  ZoneCacheSettingsChangeRegionalTieredCacheSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ZoneCacheSettingsChangeRegionalTieredCacheSettingRequest,
  output: ZoneCacheSettingsChangeRegionalTieredCacheSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetSmartTieredCacheSettingRequest {
  zone_id: string;
}

export const GetSmartTieredCacheSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/cache/tiered_cache_smart_topology_enable" }),
).annotations({ identifier: "GetSmartTieredCacheSettingRequest" }) as unknown as Schema.Schema<GetSmartTieredCacheSettingRequest>;

export interface GetSmartTieredCacheSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetSmartTieredCacheSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetSmartTieredCacheSettingResponse" }) as unknown as Schema.Schema<GetSmartTieredCacheSettingResponse>;

export const getSmartTieredCacheSetting: (
  input: GetSmartTieredCacheSettingRequest
) => Effect.Effect<
  GetSmartTieredCacheSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSmartTieredCacheSettingRequest,
  output: GetSmartTieredCacheSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteSmartTieredCacheSettingRequest {
  zone_id: string;
}

export const DeleteSmartTieredCacheSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/cache/tiered_cache_smart_topology_enable" }),
).annotations({ identifier: "DeleteSmartTieredCacheSettingRequest" }) as unknown as Schema.Schema<DeleteSmartTieredCacheSettingRequest>;

export interface DeleteSmartTieredCacheSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteSmartTieredCacheSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteSmartTieredCacheSettingResponse" }) as unknown as Schema.Schema<DeleteSmartTieredCacheSettingResponse>;

export const deleteSmartTieredCacheSetting: (
  input: DeleteSmartTieredCacheSettingRequest
) => Effect.Effect<
  DeleteSmartTieredCacheSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSmartTieredCacheSettingRequest,
  output: DeleteSmartTieredCacheSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface PatchSmartTieredCacheSettingRequest {
  zone_id: string;
  body: { value: "on" | "off" };
}

export const PatchSmartTieredCacheSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  value: Schema.Literal("on", "off")
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/cache/tiered_cache_smart_topology_enable" }),
).annotations({ identifier: "PatchSmartTieredCacheSettingRequest" }) as unknown as Schema.Schema<PatchSmartTieredCacheSettingRequest>;

export interface PatchSmartTieredCacheSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchSmartTieredCacheSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchSmartTieredCacheSettingResponse" }) as unknown as Schema.Schema<PatchSmartTieredCacheSettingResponse>;

export const patchSmartTieredCacheSetting: (
  input: PatchSmartTieredCacheSettingRequest
) => Effect.Effect<
  PatchSmartTieredCacheSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchSmartTieredCacheSettingRequest,
  output: PatchSmartTieredCacheSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetVariantsSettingRequest {
  zone_id: string;
}

export const GetVariantsSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/cache/variants" }),
).annotations({ identifier: "GetVariantsSettingRequest" }) as unknown as Schema.Schema<GetVariantsSettingRequest>;

export interface GetVariantsSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetVariantsSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetVariantsSettingResponse" }) as unknown as Schema.Schema<GetVariantsSettingResponse>;

export const getVariantsSetting: (
  input: GetVariantsSettingRequest
) => Effect.Effect<
  GetVariantsSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetVariantsSettingRequest,
  output: GetVariantsSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteVariantsSettingRequest {
  zone_id: string;
}

export const DeleteVariantsSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/cache/variants" }),
).annotations({ identifier: "DeleteVariantsSettingRequest" }) as unknown as Schema.Schema<DeleteVariantsSettingRequest>;

export interface DeleteVariantsSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteVariantsSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteVariantsSettingResponse" }) as unknown as Schema.Schema<DeleteVariantsSettingResponse>;

export const deleteVariantsSetting: (
  input: DeleteVariantsSettingRequest
) => Effect.Effect<
  DeleteVariantsSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteVariantsSettingRequest,
  output: DeleteVariantsSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ZoneCacheSettingsChangeVariantsSettingRequest {
  zone_id: string;
  body: { value: { avif?: string[]; bmp?: string[]; gif?: string[]; jp2?: string[]; jpeg?: string[]; jpg?: string[]; jpg2?: string[]; png?: string[]; tif?: string[]; tiff?: string[]; webp?: string[] } };
}

export const ZoneCacheSettingsChangeVariantsSettingRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  value: Schema.Struct({
  avif: Schema.optional(Schema.Array(Schema.String)),
  bmp: Schema.optional(Schema.Array(Schema.String)),
  gif: Schema.optional(Schema.Array(Schema.String)),
  jp2: Schema.optional(Schema.Array(Schema.String)),
  jpeg: Schema.optional(Schema.Array(Schema.String)),
  jpg: Schema.optional(Schema.Array(Schema.String)),
  jpg2: Schema.optional(Schema.Array(Schema.String)),
  png: Schema.optional(Schema.Array(Schema.String)),
  tif: Schema.optional(Schema.Array(Schema.String)),
  tiff: Schema.optional(Schema.Array(Schema.String)),
  webp: Schema.optional(Schema.Array(Schema.String))
})
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/cache/variants" }),
).annotations({ identifier: "ZoneCacheSettingsChangeVariantsSettingRequest" }) as unknown as Schema.Schema<ZoneCacheSettingsChangeVariantsSettingRequest>;

export interface ZoneCacheSettingsChangeVariantsSettingResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ZoneCacheSettingsChangeVariantsSettingResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ZoneCacheSettingsChangeVariantsSettingResponse" }) as unknown as Schema.Schema<ZoneCacheSettingsChangeVariantsSettingResponse>;

export const zoneCacheSettingsChangeVariantsSetting: (
  input: ZoneCacheSettingsChangeVariantsSettingRequest
) => Effect.Effect<
  ZoneCacheSettingsChangeVariantsSettingResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ZoneCacheSettingsChangeVariantsSettingRequest,
  output: ZoneCacheSettingsChangeVariantsSettingResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
