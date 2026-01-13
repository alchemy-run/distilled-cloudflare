/**
 * Cloudflare STREAM API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service stream
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

export interface ListVideosRequest {
  account_id: string;
  status?: "pendingupload" | "downloading" | "queued" | "inprogress" | "ready" | "error" | "live-inprogress";
  creator?: string;
  type?: string;
  asc?: boolean;
  video_name?: string;
  search?: string;
  start?: string;
  end?: string;
  include_counts?: boolean;
}

export const ListVideosRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  status: Schema.optional(Schema.Literal("pendingupload", "downloading", "queued", "inprogress", "ready", "error", "live-inprogress")).pipe(T.HttpQuery("status")),
  creator: Schema.optional(Schema.String).pipe(T.HttpQuery("creator")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  asc: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("asc")),
  video_name: Schema.optional(Schema.String).pipe(T.HttpQuery("video_name")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  start: Schema.optional(Schema.Date).pipe(T.HttpQuery("start")),
  end: Schema.optional(Schema.Date).pipe(T.HttpQuery("end")),
  include_counts: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("include_counts"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream" }),
).annotations({ identifier: "ListVideosRequest" }) as unknown as Schema.Schema<ListVideosRequest>;

export interface ListVideosResponse {
  result: { allowedOrigins?: string[]; created?: string; creator?: string; duration?: number; input?: { height?: number; width?: number }; liveInput?: string; maxDurationSeconds?: number; meta?: Record<string, unknown>; modified?: string; playback?: { dash?: string; hls?: string }; preview?: string; readyToStream?: boolean; readyToStreamAt?: string; requireSignedURLs?: boolean; scheduledDeletion?: string; size?: number; status?: unknown; thumbnail?: string; thumbnailTimestampPct?: number; uid?: string; uploadExpiry?: string; uploaded?: string; watermark?: { created?: string; downloadedFrom?: string; height?: number; name?: string; opacity?: number; padding?: number; position?: string; scale?: number; size?: number; uid?: string; width?: number } }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListVideosResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  created: Schema.optional(Schema.Date),
  creator: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.Number),
  input: Schema.optional(Schema.Struct({
  height: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number)
})),
  liveInput: Schema.optional(Schema.String),
  maxDurationSeconds: Schema.optional(Schema.Number),
  meta: Schema.optional(Schema.Struct({})),
  modified: Schema.optional(Schema.Date),
  playback: Schema.optional(Schema.Struct({
  dash: Schema.optional(Schema.String),
  hls: Schema.optional(Schema.String)
})),
  preview: Schema.optional(Schema.String),
  readyToStream: Schema.optional(Schema.Boolean),
  readyToStreamAt: Schema.optional(Schema.Date),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  scheduledDeletion: Schema.optional(Schema.Date),
  size: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.Unknown),
  thumbnail: Schema.optional(Schema.String),
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  uploadExpiry: Schema.optional(Schema.Date),
  uploaded: Schema.optional(Schema.Date),
  watermark: Schema.optional(Schema.Struct({
  created: Schema.optional(Schema.Date),
  downloadedFrom: Schema.optional(Schema.String),
  height: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  opacity: Schema.optional(Schema.Number),
  padding: Schema.optional(Schema.Number),
  position: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.Number),
  size: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number)
}))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListVideosResponse" }) as unknown as Schema.Schema<ListVideosResponse>;

export const listVideos: (
  input: ListVideosRequest
) => Effect.Effect<
  ListVideosResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListVideosRequest,
  output: ListVideosResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamVideosInitiateVideoUploadsUsingTusRequest {
  "Tus-Resumable": "1.0.0";
  "Upload-Creator"?: string;
  "Upload-Length": number;
  "Upload-Metadata"?: string;
  account_id: string;
  direct_user?: boolean;
}

export const StreamVideosInitiateVideoUploadsUsingTusRequest = Schema.Struct({
  "Tus-Resumable": Schema.Literal("1.0.0").pipe(T.HttpHeader("Tus-Resumable")),
  "Upload-Creator": Schema.optional(Schema.String).pipe(T.HttpHeader("Upload-Creator")),
  "Upload-Length": Schema.Number.pipe(T.HttpHeader("Upload-Length")),
  "Upload-Metadata": Schema.optional(Schema.String).pipe(T.HttpHeader("Upload-Metadata")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  direct_user: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("direct_user"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream" }),
).annotations({ identifier: "StreamVideosInitiateVideoUploadsUsingTusRequest" }) as unknown as Schema.Schema<StreamVideosInitiateVideoUploadsUsingTusRequest>;

export interface StreamVideosInitiateVideoUploadsUsingTusResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamVideosInitiateVideoUploadsUsingTusResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamVideosInitiateVideoUploadsUsingTusResponse" }) as unknown as Schema.Schema<StreamVideosInitiateVideoUploadsUsingTusResponse>;

export const streamVideosInitiateVideoUploadsUsingTus: (
  input: StreamVideosInitiateVideoUploadsUsingTusRequest
) => Effect.Effect<
  StreamVideosInitiateVideoUploadsUsingTusResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamVideosInitiateVideoUploadsUsingTusRequest,
  output: StreamVideosInitiateVideoUploadsUsingTusResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamVideoClippingClipVideosGivenAStartAndEndTimeRequest {
  account_id: string;
  body: { allowedOrigins?: string[]; clippedFromVideoUID: string; creator?: string; endTimeSeconds: number; maxDurationSeconds?: number; requireSignedURLs?: boolean; startTimeSeconds: number; thumbnailTimestampPct?: number; watermark?: { uid?: string } };
}

export const StreamVideoClippingClipVideosGivenAStartAndEndTimeRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  clippedFromVideoUID: Schema.String,
  creator: Schema.optional(Schema.String),
  endTimeSeconds: Schema.Number,
  maxDurationSeconds: Schema.optional(Schema.Number),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  startTimeSeconds: Schema.Number,
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  watermark: Schema.optional(Schema.Struct({
  uid: Schema.optional(Schema.String)
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/clip" }),
).annotations({ identifier: "StreamVideoClippingClipVideosGivenAStartAndEndTimeRequest" }) as unknown as Schema.Schema<StreamVideoClippingClipVideosGivenAStartAndEndTimeRequest>;

export interface StreamVideoClippingClipVideosGivenAStartAndEndTimeResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamVideoClippingClipVideosGivenAStartAndEndTimeResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamVideoClippingClipVideosGivenAStartAndEndTimeResponse" }) as unknown as Schema.Schema<StreamVideoClippingClipVideosGivenAStartAndEndTimeResponse>;

export const streamVideoClippingClipVideosGivenAStartAndEndTime: (
  input: StreamVideoClippingClipVideosGivenAStartAndEndTimeRequest
) => Effect.Effect<
  StreamVideoClippingClipVideosGivenAStartAndEndTimeResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamVideoClippingClipVideosGivenAStartAndEndTimeRequest,
  output: StreamVideoClippingClipVideosGivenAStartAndEndTimeResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamVideosUploadVideosFromAUrlRequest {
  account_id: string;
  "Upload-Creator"?: string;
  body: unknown;
}

export const StreamVideosUploadVideosFromAUrlRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "Upload-Creator": Schema.optional(Schema.String).pipe(T.HttpHeader("Upload-Creator")),
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/copy" }),
).annotations({ identifier: "StreamVideosUploadVideosFromAUrlRequest" }) as unknown as Schema.Schema<StreamVideosUploadVideosFromAUrlRequest>;

export interface StreamVideosUploadVideosFromAUrlResponse {
  result: { allowedOrigins?: string[]; created?: string; creator?: string; duration?: number; input?: { height?: number; width?: number }; liveInput?: string; maxDurationSeconds?: number; meta?: Record<string, unknown>; modified?: string; playback?: { dash?: string; hls?: string }; preview?: string; readyToStream?: boolean; readyToStreamAt?: string; requireSignedURLs?: boolean; scheduledDeletion?: string; size?: number; status?: unknown; thumbnail?: string; thumbnailTimestampPct?: number; uid?: string; uploadExpiry?: string; uploaded?: string; watermark?: { created?: string; downloadedFrom?: string; height?: number; name?: string; opacity?: number; padding?: number; position?: string; scale?: number; size?: number; uid?: string; width?: number } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamVideosUploadVideosFromAUrlResponse = Schema.Struct({
  result: Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  created: Schema.optional(Schema.Date),
  creator: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.Number),
  input: Schema.optional(Schema.Struct({
  height: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number)
})),
  liveInput: Schema.optional(Schema.String),
  maxDurationSeconds: Schema.optional(Schema.Number),
  meta: Schema.optional(Schema.Struct({})),
  modified: Schema.optional(Schema.Date),
  playback: Schema.optional(Schema.Struct({
  dash: Schema.optional(Schema.String),
  hls: Schema.optional(Schema.String)
})),
  preview: Schema.optional(Schema.String),
  readyToStream: Schema.optional(Schema.Boolean),
  readyToStreamAt: Schema.optional(Schema.Date),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  scheduledDeletion: Schema.optional(Schema.Date),
  size: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.Unknown),
  thumbnail: Schema.optional(Schema.String),
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  uploadExpiry: Schema.optional(Schema.Date),
  uploaded: Schema.optional(Schema.Date),
  watermark: Schema.optional(Schema.Struct({
  created: Schema.optional(Schema.Date),
  downloadedFrom: Schema.optional(Schema.String),
  height: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  opacity: Schema.optional(Schema.Number),
  padding: Schema.optional(Schema.Number),
  position: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.Number),
  size: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamVideosUploadVideosFromAUrlResponse" }) as unknown as Schema.Schema<StreamVideosUploadVideosFromAUrlResponse>;

export const streamVideosUploadVideosFromAUrl: (
  input: StreamVideosUploadVideosFromAUrlRequest
) => Effect.Effect<
  StreamVideosUploadVideosFromAUrlResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamVideosUploadVideosFromAUrlRequest,
  output: StreamVideosUploadVideosFromAUrlResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamVideosUploadVideosViaDirectUploadUrLsRequest {
  account_id: string;
  "Upload-Creator"?: string;
  body: { allowedOrigins?: string[]; creator?: string; expiry?: string; maxDurationSeconds: number; meta?: Record<string, unknown>; requireSignedURLs?: boolean; scheduledDeletion?: string; thumbnailTimestampPct?: number; watermark?: { uid?: string } };
}

export const StreamVideosUploadVideosViaDirectUploadUrLsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  "Upload-Creator": Schema.optional(Schema.String).pipe(T.HttpHeader("Upload-Creator")),
  body: Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  creator: Schema.optional(Schema.String),
  expiry: Schema.optional(Schema.Date),
  maxDurationSeconds: Schema.Number,
  meta: Schema.optional(Schema.Struct({})),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  scheduledDeletion: Schema.optional(Schema.Date),
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  watermark: Schema.optional(Schema.Struct({
  uid: Schema.optional(Schema.String)
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/direct_upload" }),
).annotations({ identifier: "StreamVideosUploadVideosViaDirectUploadUrLsRequest" }) as unknown as Schema.Schema<StreamVideosUploadVideosViaDirectUploadUrLsRequest>;

export interface StreamVideosUploadVideosViaDirectUploadUrLsResponse {
  result: { scheduledDeletion?: string; uid?: string; uploadURL?: string; watermark?: { created?: string; downloadedFrom?: string; height?: number; name?: string; opacity?: number; padding?: number; position?: string; scale?: number; size?: number; uid?: string; width?: number } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamVideosUploadVideosViaDirectUploadUrLsResponse = Schema.Struct({
  result: Schema.Struct({
  scheduledDeletion: Schema.optional(Schema.Date),
  uid: Schema.optional(Schema.String),
  uploadURL: Schema.optional(Schema.String),
  watermark: Schema.optional(Schema.Struct({
  created: Schema.optional(Schema.Date),
  downloadedFrom: Schema.optional(Schema.String),
  height: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  opacity: Schema.optional(Schema.Number),
  padding: Schema.optional(Schema.Number),
  position: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.Number),
  size: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamVideosUploadVideosViaDirectUploadUrLsResponse" }) as unknown as Schema.Schema<StreamVideosUploadVideosViaDirectUploadUrLsResponse>;

export const streamVideosUploadVideosViaDirectUploadUrLs: (
  input: StreamVideosUploadVideosViaDirectUploadUrLsRequest
) => Effect.Effect<
  StreamVideosUploadVideosViaDirectUploadUrLsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamVideosUploadVideosViaDirectUploadUrLsRequest,
  output: StreamVideosUploadVideosViaDirectUploadUrLsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListSigningKeysRequest {
  account_id: string;
}

export const ListSigningKeysRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/keys" }),
).annotations({ identifier: "ListSigningKeysRequest" }) as unknown as Schema.Schema<ListSigningKeysRequest>;

export interface ListSigningKeysResponse {
  result: { created?: string; id?: string }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListSigningKeysResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  created: Schema.optional(Schema.Date),
  id: Schema.optional(Schema.String)
})),
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

export interface CreateSigningKeysRequest {
  account_id: string;
}

export const CreateSigningKeysRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/keys" }),
).annotations({ identifier: "CreateSigningKeysRequest" }) as unknown as Schema.Schema<CreateSigningKeysRequest>;

export interface CreateSigningKeysResponse {
  result: { created?: string; id?: string; jwk?: string; pem?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateSigningKeysResponse = Schema.Struct({
  result: Schema.Struct({
  created: Schema.optional(Schema.Date),
  id: Schema.optional(Schema.String),
  jwk: Schema.optional(Schema.String),
  pem: Schema.optional(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateSigningKeysResponse" }) as unknown as Schema.Schema<CreateSigningKeysResponse>;

export const createSigningKeys: (
  input: CreateSigningKeysRequest
) => Effect.Effect<
  CreateSigningKeysResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSigningKeysRequest,
  output: CreateSigningKeysResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteSigningKeysRequest {
  identifier: string;
  account_id: string;
}

export const DeleteSigningKeysRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/keys/{identifier}" }),
).annotations({ identifier: "DeleteSigningKeysRequest" }) as unknown as Schema.Schema<DeleteSigningKeysRequest>;

export interface DeleteSigningKeysResponse {
  result: string;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteSigningKeysResponse = Schema.Struct({
  result: Schema.String,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteSigningKeysResponse" }) as unknown as Schema.Schema<DeleteSigningKeysResponse>;

export const deleteSigningKeys: (
  input: DeleteSigningKeysRequest
) => Effect.Effect<
  DeleteSigningKeysResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSigningKeysRequest,
  output: DeleteSigningKeysResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListLiveInputsRequest {
  account_id: string;
  include_counts?: boolean;
}

export const ListLiveInputsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  include_counts: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("include_counts"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/live_inputs" }),
).annotations({ identifier: "ListLiveInputsRequest" }) as unknown as Schema.Schema<ListLiveInputsRequest>;

export interface ListLiveInputsResponse {
  result: { liveInputs?: unknown[]; range?: number; total?: number };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListLiveInputsResponse = Schema.Struct({
  result: Schema.Struct({
  liveInputs: Schema.optional(Schema.Array(Schema.Unknown)),
  range: Schema.optional(Schema.Number),
  total: Schema.optional(Schema.Number)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListLiveInputsResponse" }) as unknown as Schema.Schema<ListLiveInputsResponse>;

export const listLiveInputs: (
  input: ListLiveInputsRequest
) => Effect.Effect<
  ListLiveInputsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListLiveInputsRequest,
  output: ListLiveInputsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateALiveInputRequest {
  account_id: string;
  body: unknown;
}

export const CreateALiveInputRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/live_inputs" }),
).annotations({ identifier: "CreateALiveInputRequest" }) as unknown as Schema.Schema<CreateALiveInputRequest>;

export interface CreateALiveInputResponse {
  result: { created?: string; deleteRecordingAfterDays?: number; meta?: Record<string, unknown>; modified?: string; recording?: { allowedOrigins?: string[]; hideLiveViewerCount?: boolean; mode?: "off" | "automatic"; requireSignedURLs?: boolean; timeoutSeconds?: number }; rtmps?: { streamKey?: string; url?: string }; rtmpsPlayback?: { streamKey?: string; url?: string }; srt?: { passphrase?: string; streamId?: string; url?: string }; srtPlayback?: { passphrase?: string; streamId?: string; url?: string }; status?: null | "connected" | "reconnected" | "reconnecting" | "client_disconnect" | "ttl_exceeded" | "failed_to_connect" | "failed_to_reconnect" | "new_configuration_accepted"; uid?: string; webRTC?: { url?: string }; webRTCPlayback?: { url?: string } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateALiveInputResponse = Schema.Struct({
  result: Schema.Struct({
  created: Schema.optional(Schema.Date),
  deleteRecordingAfterDays: Schema.optional(Schema.Number),
  meta: Schema.optional(Schema.Struct({})),
  modified: Schema.optional(Schema.Date),
  recording: Schema.optional(Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  hideLiveViewerCount: Schema.optional(Schema.Boolean),
  mode: Schema.optional(Schema.Literal("off", "automatic")),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  timeoutSeconds: Schema.optional(Schema.Number)
})),
  rtmps: Schema.optional(Schema.Struct({
  streamKey: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  rtmpsPlayback: Schema.optional(Schema.Struct({
  streamKey: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  srt: Schema.optional(Schema.Struct({
  passphrase: Schema.optional(Schema.String),
  streamId: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  srtPlayback: Schema.optional(Schema.Struct({
  passphrase: Schema.optional(Schema.String),
  streamId: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  status: Schema.optional(Schema.Literal(null, "connected", "reconnected", "reconnecting", "client_disconnect", "ttl_exceeded", "failed_to_connect", "failed_to_reconnect", "new_configuration_accepted")),
  uid: Schema.optional(Schema.String),
  webRTC: Schema.optional(Schema.Struct({
  url: Schema.optional(Schema.String)
})),
  webRTCPlayback: Schema.optional(Schema.Struct({
  url: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateALiveInputResponse" }) as unknown as Schema.Schema<CreateALiveInputResponse>;

export const createALiveInput: (
  input: CreateALiveInputRequest
) => Effect.Effect<
  CreateALiveInputResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateALiveInputRequest,
  output: CreateALiveInputResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamLiveInputsRetrieveALiveInputRequest {
  live_input_identifier: string;
  account_id: string;
}

export const StreamLiveInputsRetrieveALiveInputRequest = Schema.Struct({
  live_input_identifier: Schema.String.pipe(T.HttpPath("live_input_identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/live_inputs/{live_input_identifier}" }),
).annotations({ identifier: "StreamLiveInputsRetrieveALiveInputRequest" }) as unknown as Schema.Schema<StreamLiveInputsRetrieveALiveInputRequest>;

export interface StreamLiveInputsRetrieveALiveInputResponse {
  result: { created?: string; deleteRecordingAfterDays?: number; meta?: Record<string, unknown>; modified?: string; recording?: { allowedOrigins?: string[]; hideLiveViewerCount?: boolean; mode?: "off" | "automatic"; requireSignedURLs?: boolean; timeoutSeconds?: number }; rtmps?: { streamKey?: string; url?: string }; rtmpsPlayback?: { streamKey?: string; url?: string }; srt?: { passphrase?: string; streamId?: string; url?: string }; srtPlayback?: { passphrase?: string; streamId?: string; url?: string }; status?: null | "connected" | "reconnected" | "reconnecting" | "client_disconnect" | "ttl_exceeded" | "failed_to_connect" | "failed_to_reconnect" | "new_configuration_accepted"; uid?: string; webRTC?: { url?: string }; webRTCPlayback?: { url?: string } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamLiveInputsRetrieveALiveInputResponse = Schema.Struct({
  result: Schema.Struct({
  created: Schema.optional(Schema.Date),
  deleteRecordingAfterDays: Schema.optional(Schema.Number),
  meta: Schema.optional(Schema.Struct({})),
  modified: Schema.optional(Schema.Date),
  recording: Schema.optional(Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  hideLiveViewerCount: Schema.optional(Schema.Boolean),
  mode: Schema.optional(Schema.Literal("off", "automatic")),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  timeoutSeconds: Schema.optional(Schema.Number)
})),
  rtmps: Schema.optional(Schema.Struct({
  streamKey: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  rtmpsPlayback: Schema.optional(Schema.Struct({
  streamKey: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  srt: Schema.optional(Schema.Struct({
  passphrase: Schema.optional(Schema.String),
  streamId: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  srtPlayback: Schema.optional(Schema.Struct({
  passphrase: Schema.optional(Schema.String),
  streamId: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  status: Schema.optional(Schema.Literal(null, "connected", "reconnected", "reconnecting", "client_disconnect", "ttl_exceeded", "failed_to_connect", "failed_to_reconnect", "new_configuration_accepted")),
  uid: Schema.optional(Schema.String),
  webRTC: Schema.optional(Schema.Struct({
  url: Schema.optional(Schema.String)
})),
  webRTCPlayback: Schema.optional(Schema.Struct({
  url: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamLiveInputsRetrieveALiveInputResponse" }) as unknown as Schema.Schema<StreamLiveInputsRetrieveALiveInputResponse>;

export const streamLiveInputsRetrieveALiveInput: (
  input: StreamLiveInputsRetrieveALiveInputRequest
) => Effect.Effect<
  StreamLiveInputsRetrieveALiveInputResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamLiveInputsRetrieveALiveInputRequest,
  output: StreamLiveInputsRetrieveALiveInputResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateALiveInputRequest {
  live_input_identifier: string;
  account_id: string;
  body: unknown;
}

export const UpdateALiveInputRequest = Schema.Struct({
  live_input_identifier: Schema.String.pipe(T.HttpPath("live_input_identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/stream/live_inputs/{live_input_identifier}" }),
).annotations({ identifier: "UpdateALiveInputRequest" }) as unknown as Schema.Schema<UpdateALiveInputRequest>;

export interface UpdateALiveInputResponse {
  result: { created?: string; deleteRecordingAfterDays?: number; meta?: Record<string, unknown>; modified?: string; recording?: { allowedOrigins?: string[]; hideLiveViewerCount?: boolean; mode?: "off" | "automatic"; requireSignedURLs?: boolean; timeoutSeconds?: number }; rtmps?: { streamKey?: string; url?: string }; rtmpsPlayback?: { streamKey?: string; url?: string }; srt?: { passphrase?: string; streamId?: string; url?: string }; srtPlayback?: { passphrase?: string; streamId?: string; url?: string }; status?: null | "connected" | "reconnected" | "reconnecting" | "client_disconnect" | "ttl_exceeded" | "failed_to_connect" | "failed_to_reconnect" | "new_configuration_accepted"; uid?: string; webRTC?: { url?: string }; webRTCPlayback?: { url?: string } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateALiveInputResponse = Schema.Struct({
  result: Schema.Struct({
  created: Schema.optional(Schema.Date),
  deleteRecordingAfterDays: Schema.optional(Schema.Number),
  meta: Schema.optional(Schema.Struct({})),
  modified: Schema.optional(Schema.Date),
  recording: Schema.optional(Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  hideLiveViewerCount: Schema.optional(Schema.Boolean),
  mode: Schema.optional(Schema.Literal("off", "automatic")),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  timeoutSeconds: Schema.optional(Schema.Number)
})),
  rtmps: Schema.optional(Schema.Struct({
  streamKey: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  rtmpsPlayback: Schema.optional(Schema.Struct({
  streamKey: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  srt: Schema.optional(Schema.Struct({
  passphrase: Schema.optional(Schema.String),
  streamId: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  srtPlayback: Schema.optional(Schema.Struct({
  passphrase: Schema.optional(Schema.String),
  streamId: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String)
})),
  status: Schema.optional(Schema.Literal(null, "connected", "reconnected", "reconnecting", "client_disconnect", "ttl_exceeded", "failed_to_connect", "failed_to_reconnect", "new_configuration_accepted")),
  uid: Schema.optional(Schema.String),
  webRTC: Schema.optional(Schema.Struct({
  url: Schema.optional(Schema.String)
})),
  webRTCPlayback: Schema.optional(Schema.Struct({
  url: Schema.optional(Schema.String)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateALiveInputResponse" }) as unknown as Schema.Schema<UpdateALiveInputResponse>;

export const updateALiveInput: (
  input: UpdateALiveInputRequest
) => Effect.Effect<
  UpdateALiveInputResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateALiveInputRequest,
  output: UpdateALiveInputResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteALiveInputRequest {
  live_input_identifier: string;
  account_id: string;
}

export const DeleteALiveInputRequest = Schema.Struct({
  live_input_identifier: Schema.String.pipe(T.HttpPath("live_input_identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/live_inputs/{live_input_identifier}" }),
).annotations({ identifier: "DeleteALiveInputRequest" }) as unknown as Schema.Schema<DeleteALiveInputRequest>;

export interface DeleteALiveInputResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteALiveInputResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteALiveInputResponse" }) as unknown as Schema.Schema<DeleteALiveInputResponse>;

export const deleteALiveInput: (
  input: DeleteALiveInputRequest
) => Effect.Effect<
  DeleteALiveInputResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteALiveInputRequest,
  output: DeleteALiveInputResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListAllOutputsAssociatedWithASpecifiedLiveInputRequest {
  live_input_identifier: string;
  account_id: string;
}

export const ListAllOutputsAssociatedWithASpecifiedLiveInputRequest = Schema.Struct({
  live_input_identifier: Schema.String.pipe(T.HttpPath("live_input_identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs" }),
).annotations({ identifier: "ListAllOutputsAssociatedWithASpecifiedLiveInputRequest" }) as unknown as Schema.Schema<ListAllOutputsAssociatedWithASpecifiedLiveInputRequest>;

export interface ListAllOutputsAssociatedWithASpecifiedLiveInputResponse {
  result: unknown[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListAllOutputsAssociatedWithASpecifiedLiveInputResponse = Schema.Struct({
  result: Schema.Array(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListAllOutputsAssociatedWithASpecifiedLiveInputResponse" }) as unknown as Schema.Schema<ListAllOutputsAssociatedWithASpecifiedLiveInputResponse>;

export const listAllOutputsAssociatedWithASpecifiedLiveInput: (
  input: ListAllOutputsAssociatedWithASpecifiedLiveInputRequest
) => Effect.Effect<
  ListAllOutputsAssociatedWithASpecifiedLiveInputResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAllOutputsAssociatedWithASpecifiedLiveInputRequest,
  output: ListAllOutputsAssociatedWithASpecifiedLiveInputResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateANewOutputConnectedToALiveInputRequest {
  live_input_identifier: string;
  account_id: string;
  body: unknown;
}

export const CreateANewOutputConnectedToALiveInputRequest = Schema.Struct({
  live_input_identifier: Schema.String.pipe(T.HttpPath("live_input_identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs" }),
).annotations({ identifier: "CreateANewOutputConnectedToALiveInputRequest" }) as unknown as Schema.Schema<CreateANewOutputConnectedToALiveInputRequest>;

export interface CreateANewOutputConnectedToALiveInputResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateANewOutputConnectedToALiveInputResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateANewOutputConnectedToALiveInputResponse" }) as unknown as Schema.Schema<CreateANewOutputConnectedToALiveInputResponse>;

export const createANewOutputConnectedToALiveInput: (
  input: CreateANewOutputConnectedToALiveInputRequest
) => Effect.Effect<
  CreateANewOutputConnectedToALiveInputResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateANewOutputConnectedToALiveInputRequest,
  output: CreateANewOutputConnectedToALiveInputResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateAnOutputRequest {
  output_identifier: string;
  live_input_identifier: string;
  account_id: string;
  body: unknown;
}

export const UpdateAnOutputRequest = Schema.Struct({
  output_identifier: Schema.String.pipe(T.HttpPath("output_identifier")),
  live_input_identifier: Schema.String.pipe(T.HttpPath("live_input_identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}" }),
).annotations({ identifier: "UpdateAnOutputRequest" }) as unknown as Schema.Schema<UpdateAnOutputRequest>;

export interface UpdateAnOutputResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAnOutputResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateAnOutputResponse" }) as unknown as Schema.Schema<UpdateAnOutputResponse>;

export const updateAnOutput: (
  input: UpdateAnOutputRequest
) => Effect.Effect<
  UpdateAnOutputResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAnOutputRequest,
  output: UpdateAnOutputResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteAnOutputRequest {
  output_identifier: string;
  live_input_identifier: string;
  account_id: string;
}

export const DeleteAnOutputRequest = Schema.Struct({
  output_identifier: Schema.String.pipe(T.HttpPath("output_identifier")),
  live_input_identifier: Schema.String.pipe(T.HttpPath("live_input_identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}" }),
).annotations({ identifier: "DeleteAnOutputRequest" }) as unknown as Schema.Schema<DeleteAnOutputRequest>;

export interface DeleteAnOutputResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAnOutputResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteAnOutputResponse" }) as unknown as Schema.Schema<DeleteAnOutputResponse>;

export const deleteAnOutput: (
  input: DeleteAnOutputRequest
) => Effect.Effect<
  DeleteAnOutputResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAnOutputRequest,
  output: DeleteAnOutputResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamVideosStorageUsageRequest {
  account_id: string;
  creator?: string;
}

export const StreamVideosStorageUsageRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  creator: Schema.optional(Schema.String).pipe(T.HttpQuery("creator"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/storage-usage" }),
).annotations({ identifier: "StreamVideosStorageUsageRequest" }) as unknown as Schema.Schema<StreamVideosStorageUsageRequest>;

export interface StreamVideosStorageUsageResponse {
  result: { creator?: string; totalStorageMinutes?: number; totalStorageMinutesLimit?: number; videoCount?: number };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamVideosStorageUsageResponse = Schema.Struct({
  result: Schema.Struct({
  creator: Schema.optional(Schema.String),
  totalStorageMinutes: Schema.optional(Schema.Number),
  totalStorageMinutesLimit: Schema.optional(Schema.Number),
  videoCount: Schema.optional(Schema.Number)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamVideosStorageUsageResponse" }) as unknown as Schema.Schema<StreamVideosStorageUsageResponse>;

export const streamVideosStorageUsage: (
  input: StreamVideosStorageUsageRequest
) => Effect.Effect<
  StreamVideosStorageUsageResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamVideosStorageUsageRequest,
  output: StreamVideosStorageUsageResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListWatermarkProfilesRequest {
  account_id: string;
}

export const ListWatermarkProfilesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/watermarks" }),
).annotations({ identifier: "ListWatermarkProfilesRequest" }) as unknown as Schema.Schema<ListWatermarkProfilesRequest>;

export interface ListWatermarkProfilesResponse {
  result: { created?: string; downloadedFrom?: string; height?: number; name?: string; opacity?: number; padding?: number; position?: string; scale?: number; size?: number; uid?: string; width?: number }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListWatermarkProfilesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  created: Schema.optional(Schema.Date),
  downloadedFrom: Schema.optional(Schema.String),
  height: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  opacity: Schema.optional(Schema.Number),
  padding: Schema.optional(Schema.Number),
  position: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.Number),
  size: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number)
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListWatermarkProfilesResponse" }) as unknown as Schema.Schema<ListWatermarkProfilesResponse>;

export const listWatermarkProfiles: (
  input: ListWatermarkProfilesRequest
) => Effect.Effect<
  ListWatermarkProfilesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWatermarkProfilesRequest,
  output: ListWatermarkProfilesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateWatermarkProfilesViaBasicUploadRequest {
  account_id: string;
  body: FormData;
}

export const CreateWatermarkProfilesViaBasicUploadRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.instanceOf(FormData).pipe(T.HttpFormData())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/watermarks" }),
).annotations({ identifier: "CreateWatermarkProfilesViaBasicUploadRequest" }) as unknown as Schema.Schema<CreateWatermarkProfilesViaBasicUploadRequest>;

export interface CreateWatermarkProfilesViaBasicUploadResponse {
  result: { created?: string; downloadedFrom?: string; height?: number; name?: string; opacity?: number; padding?: number; position?: string; scale?: number; size?: number; uid?: string; width?: number };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateWatermarkProfilesViaBasicUploadResponse = Schema.Struct({
  result: Schema.Struct({
  created: Schema.optional(Schema.Date),
  downloadedFrom: Schema.optional(Schema.String),
  height: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  opacity: Schema.optional(Schema.Number),
  padding: Schema.optional(Schema.Number),
  position: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.Number),
  size: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateWatermarkProfilesViaBasicUploadResponse" }) as unknown as Schema.Schema<CreateWatermarkProfilesViaBasicUploadResponse>;

export const createWatermarkProfilesViaBasicUpload: (
  input: CreateWatermarkProfilesViaBasicUploadRequest
) => Effect.Effect<
  CreateWatermarkProfilesViaBasicUploadResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateWatermarkProfilesViaBasicUploadRequest,
  output: CreateWatermarkProfilesViaBasicUploadResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamWatermarkProfileWatermarkProfileDetailsRequest {
  identifier: string;
  account_id: string;
}

export const StreamWatermarkProfileWatermarkProfileDetailsRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/watermarks/{identifier}" }),
).annotations({ identifier: "StreamWatermarkProfileWatermarkProfileDetailsRequest" }) as unknown as Schema.Schema<StreamWatermarkProfileWatermarkProfileDetailsRequest>;

export interface StreamWatermarkProfileWatermarkProfileDetailsResponse {
  result: { created?: string; downloadedFrom?: string; height?: number; name?: string; opacity?: number; padding?: number; position?: string; scale?: number; size?: number; uid?: string; width?: number };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamWatermarkProfileWatermarkProfileDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  created: Schema.optional(Schema.Date),
  downloadedFrom: Schema.optional(Schema.String),
  height: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  opacity: Schema.optional(Schema.Number),
  padding: Schema.optional(Schema.Number),
  position: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.Number),
  size: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamWatermarkProfileWatermarkProfileDetailsResponse" }) as unknown as Schema.Schema<StreamWatermarkProfileWatermarkProfileDetailsResponse>;

export const streamWatermarkProfileWatermarkProfileDetails: (
  input: StreamWatermarkProfileWatermarkProfileDetailsRequest
) => Effect.Effect<
  StreamWatermarkProfileWatermarkProfileDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamWatermarkProfileWatermarkProfileDetailsRequest,
  output: StreamWatermarkProfileWatermarkProfileDetailsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteWatermarkProfilesRequest {
  identifier: string;
  account_id: string;
}

export const DeleteWatermarkProfilesRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/watermarks/{identifier}" }),
).annotations({ identifier: "DeleteWatermarkProfilesRequest" }) as unknown as Schema.Schema<DeleteWatermarkProfilesRequest>;

export interface DeleteWatermarkProfilesResponse {
  result: string;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteWatermarkProfilesResponse = Schema.Struct({
  result: Schema.String,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteWatermarkProfilesResponse" }) as unknown as Schema.Schema<DeleteWatermarkProfilesResponse>;

export const deleteWatermarkProfiles: (
  input: DeleteWatermarkProfilesRequest
) => Effect.Effect<
  DeleteWatermarkProfilesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteWatermarkProfilesRequest,
  output: DeleteWatermarkProfilesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamWebhookViewWebhooksRequest {
  account_id: string;
}

export const StreamWebhookViewWebhooksRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/webhook" }),
).annotations({ identifier: "StreamWebhookViewWebhooksRequest" }) as unknown as Schema.Schema<StreamWebhookViewWebhooksRequest>;

export interface StreamWebhookViewWebhooksResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamWebhookViewWebhooksResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamWebhookViewWebhooksResponse" }) as unknown as Schema.Schema<StreamWebhookViewWebhooksResponse>;

export const streamWebhookViewWebhooks: (
  input: StreamWebhookViewWebhooksRequest
) => Effect.Effect<
  StreamWebhookViewWebhooksResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamWebhookViewWebhooksRequest,
  output: StreamWebhookViewWebhooksResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateWebhooksRequest {
  account_id: string;
  body: unknown;
}

export const CreateWebhooksRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/stream/webhook" }),
).annotations({ identifier: "CreateWebhooksRequest" }) as unknown as Schema.Schema<CreateWebhooksRequest>;

export interface CreateWebhooksResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateWebhooksResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateWebhooksResponse" }) as unknown as Schema.Schema<CreateWebhooksResponse>;

export const createWebhooks: (
  input: CreateWebhooksRequest
) => Effect.Effect<
  CreateWebhooksResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateWebhooksRequest,
  output: CreateWebhooksResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteWebhooksRequest {
  account_id: string;
}

export const DeleteWebhooksRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/webhook" }),
).annotations({ identifier: "DeleteWebhooksRequest" }) as unknown as Schema.Schema<DeleteWebhooksRequest>;

export interface DeleteWebhooksResponse {
  result: string;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteWebhooksResponse = Schema.Struct({
  result: Schema.String,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteWebhooksResponse" }) as unknown as Schema.Schema<DeleteWebhooksResponse>;

export const deleteWebhooks: (
  input: DeleteWebhooksRequest
) => Effect.Effect<
  DeleteWebhooksResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteWebhooksRequest,
  output: DeleteWebhooksResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamVideosRetrieveVideoDetailsRequest {
  identifier: string;
  account_id: string;
}

export const StreamVideosRetrieveVideoDetailsRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/{identifier}" }),
).annotations({ identifier: "StreamVideosRetrieveVideoDetailsRequest" }) as unknown as Schema.Schema<StreamVideosRetrieveVideoDetailsRequest>;

export interface StreamVideosRetrieveVideoDetailsResponse {
  result: { allowedOrigins?: string[]; created?: string; creator?: string; duration?: number; input?: { height?: number; width?: number }; liveInput?: string; maxDurationSeconds?: number; meta?: Record<string, unknown>; modified?: string; playback?: { dash?: string; hls?: string }; preview?: string; readyToStream?: boolean; readyToStreamAt?: string; requireSignedURLs?: boolean; scheduledDeletion?: string; size?: number; status?: unknown; thumbnail?: string; thumbnailTimestampPct?: number; uid?: string; uploadExpiry?: string; uploaded?: string; watermark?: { created?: string; downloadedFrom?: string; height?: number; name?: string; opacity?: number; padding?: number; position?: string; scale?: number; size?: number; uid?: string; width?: number } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamVideosRetrieveVideoDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  created: Schema.optional(Schema.Date),
  creator: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.Number),
  input: Schema.optional(Schema.Struct({
  height: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number)
})),
  liveInput: Schema.optional(Schema.String),
  maxDurationSeconds: Schema.optional(Schema.Number),
  meta: Schema.optional(Schema.Struct({})),
  modified: Schema.optional(Schema.Date),
  playback: Schema.optional(Schema.Struct({
  dash: Schema.optional(Schema.String),
  hls: Schema.optional(Schema.String)
})),
  preview: Schema.optional(Schema.String),
  readyToStream: Schema.optional(Schema.Boolean),
  readyToStreamAt: Schema.optional(Schema.Date),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  scheduledDeletion: Schema.optional(Schema.Date),
  size: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.Unknown),
  thumbnail: Schema.optional(Schema.String),
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  uploadExpiry: Schema.optional(Schema.Date),
  uploaded: Schema.optional(Schema.Date),
  watermark: Schema.optional(Schema.Struct({
  created: Schema.optional(Schema.Date),
  downloadedFrom: Schema.optional(Schema.String),
  height: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  opacity: Schema.optional(Schema.Number),
  padding: Schema.optional(Schema.Number),
  position: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.Number),
  size: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamVideosRetrieveVideoDetailsResponse" }) as unknown as Schema.Schema<StreamVideosRetrieveVideoDetailsResponse>;

export const streamVideosRetrieveVideoDetails: (
  input: StreamVideosRetrieveVideoDetailsRequest
) => Effect.Effect<
  StreamVideosRetrieveVideoDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamVideosRetrieveVideoDetailsRequest,
  output: StreamVideosRetrieveVideoDetailsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateVideoDetailsRequest {
  identifier: string;
  account_id: string;
  body: { allowedOrigins?: string[]; creator?: string; maxDurationSeconds?: number; meta?: Record<string, unknown>; requireSignedURLs?: boolean; scheduledDeletion?: string; thumbnailTimestampPct?: number; uploadExpiry?: string };
}

export const UpdateVideoDetailsRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  creator: Schema.optional(Schema.String),
  maxDurationSeconds: Schema.optional(Schema.Number),
  meta: Schema.optional(Schema.Struct({})),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  scheduledDeletion: Schema.optional(Schema.Date),
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  uploadExpiry: Schema.optional(Schema.Date)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/{identifier}" }),
).annotations({ identifier: "UpdateVideoDetailsRequest" }) as unknown as Schema.Schema<UpdateVideoDetailsRequest>;

export interface UpdateVideoDetailsResponse {
  result: { allowedOrigins?: string[]; created?: string; creator?: string; duration?: number; input?: { height?: number; width?: number }; liveInput?: string; maxDurationSeconds?: number; meta?: Record<string, unknown>; modified?: string; playback?: { dash?: string; hls?: string }; preview?: string; readyToStream?: boolean; readyToStreamAt?: string; requireSignedURLs?: boolean; scheduledDeletion?: string; size?: number; status?: unknown; thumbnail?: string; thumbnailTimestampPct?: number; uid?: string; uploadExpiry?: string; uploaded?: string; watermark?: { created?: string; downloadedFrom?: string; height?: number; name?: string; opacity?: number; padding?: number; position?: string; scale?: number; size?: number; uid?: string; width?: number } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateVideoDetailsResponse = Schema.Struct({
  result: Schema.Struct({
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  created: Schema.optional(Schema.Date),
  creator: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.Number),
  input: Schema.optional(Schema.Struct({
  height: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number)
})),
  liveInput: Schema.optional(Schema.String),
  maxDurationSeconds: Schema.optional(Schema.Number),
  meta: Schema.optional(Schema.Struct({})),
  modified: Schema.optional(Schema.Date),
  playback: Schema.optional(Schema.Struct({
  dash: Schema.optional(Schema.String),
  hls: Schema.optional(Schema.String)
})),
  preview: Schema.optional(Schema.String),
  readyToStream: Schema.optional(Schema.Boolean),
  readyToStreamAt: Schema.optional(Schema.Date),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  scheduledDeletion: Schema.optional(Schema.Date),
  size: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.Unknown),
  thumbnail: Schema.optional(Schema.String),
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  uploadExpiry: Schema.optional(Schema.Date),
  uploaded: Schema.optional(Schema.Date),
  watermark: Schema.optional(Schema.Struct({
  created: Schema.optional(Schema.Date),
  downloadedFrom: Schema.optional(Schema.String),
  height: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  opacity: Schema.optional(Schema.Number),
  padding: Schema.optional(Schema.Number),
  position: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.Number),
  size: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number)
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateVideoDetailsResponse" }) as unknown as Schema.Schema<UpdateVideoDetailsResponse>;

export const updateVideoDetails: (
  input: UpdateVideoDetailsRequest
) => Effect.Effect<
  UpdateVideoDetailsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateVideoDetailsRequest,
  output: UpdateVideoDetailsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteVideoRequest {
  identifier: string;
  account_id: string;
}

export const DeleteVideoRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/{identifier}" }),
).annotations({ identifier: "DeleteVideoRequest" }) as unknown as Schema.Schema<DeleteVideoRequest>;

export interface DeleteVideoResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteVideoResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteVideoResponse" }) as unknown as Schema.Schema<DeleteVideoResponse>;

export const deleteVideo: (
  input: DeleteVideoRequest
) => Effect.Effect<
  DeleteVideoResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteVideoRequest,
  output: DeleteVideoResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListAudioTracksRequest {
  account_id: string;
  identifier: string;
}

export const ListAudioTracksRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  identifier: Schema.String.pipe(T.HttpPath("identifier"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/{identifier}/audio" }),
).annotations({ identifier: "ListAudioTracksRequest" }) as unknown as Schema.Schema<ListAudioTracksRequest>;

export interface ListAudioTracksResponse {
  result: { default?: boolean; label?: string; status?: "queued" | "ready" | "error"; uid?: string }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListAudioTracksResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  default: Schema.optional(Schema.Boolean),
  label: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literal("queued", "ready", "error")),
  uid: Schema.optional(Schema.String)
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListAudioTracksResponse" }) as unknown as Schema.Schema<ListAudioTracksResponse>;

export const listAudioTracks: (
  input: ListAudioTracksRequest
) => Effect.Effect<
  ListAudioTracksResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAudioTracksRequest,
  output: ListAudioTracksResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface AddAudioTrackRequest {
  account_id: string;
  identifier: string;
  body: { label: string; url?: string };
}

export const AddAudioTrackRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  body: Schema.Struct({
  label: Schema.String,
  url: Schema.optional(Schema.String)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/{identifier}/audio/copy" }),
).annotations({ identifier: "AddAudioTrackRequest" }) as unknown as Schema.Schema<AddAudioTrackRequest>;

export interface AddAudioTrackResponse {
  result: { default?: boolean; label?: string; status?: "queued" | "ready" | "error"; uid?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const AddAudioTrackResponse = Schema.Struct({
  result: Schema.Struct({
  default: Schema.optional(Schema.Boolean),
  label: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literal("queued", "ready", "error")),
  uid: Schema.optional(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "AddAudioTrackResponse" }) as unknown as Schema.Schema<AddAudioTrackResponse>;

export const addAudioTrack: (
  input: AddAudioTrackRequest
) => Effect.Effect<
  AddAudioTrackResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: AddAudioTrackRequest,
  output: AddAudioTrackResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteAudioTracksRequest {
  account_id: string;
  identifier: string;
  audio_identifier: string;
}

export const DeleteAudioTracksRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  audio_identifier: Schema.String.pipe(T.HttpPath("audio_identifier"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/{identifier}/audio/{audio_identifier}" }),
).annotations({ identifier: "DeleteAudioTracksRequest" }) as unknown as Schema.Schema<DeleteAudioTracksRequest>;

export interface DeleteAudioTracksResponse {
  result: string;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAudioTracksResponse = Schema.Struct({
  result: Schema.String,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteAudioTracksResponse" }) as unknown as Schema.Schema<DeleteAudioTracksResponse>;

export const deleteAudioTracks: (
  input: DeleteAudioTracksRequest
) => Effect.Effect<
  DeleteAudioTracksResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAudioTracksRequest,
  output: DeleteAudioTracksResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface EditAudioTracksRequest {
  account_id: string;
  identifier: string;
  audio_identifier: string;
  body: { default?: boolean; label?: string };
}

export const EditAudioTracksRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  audio_identifier: Schema.String.pipe(T.HttpPath("audio_identifier")),
  body: Schema.Struct({
  default: Schema.optional(Schema.Boolean),
  label: Schema.optional(Schema.String)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/stream/{identifier}/audio/{audio_identifier}" }),
).annotations({ identifier: "EditAudioTracksRequest" }) as unknown as Schema.Schema<EditAudioTracksRequest>;

export interface EditAudioTracksResponse {
  result: { default?: boolean; label?: string; status?: "queued" | "ready" | "error"; uid?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const EditAudioTracksResponse = Schema.Struct({
  result: Schema.Struct({
  default: Schema.optional(Schema.Boolean),
  label: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literal("queued", "ready", "error")),
  uid: Schema.optional(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "EditAudioTracksResponse" }) as unknown as Schema.Schema<EditAudioTracksResponse>;

export const editAudioTracks: (
  input: EditAudioTracksRequest
) => Effect.Effect<
  EditAudioTracksResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EditAudioTracksRequest,
  output: EditAudioTracksResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListCaptionsOrSubtitlesRequest {
  identifier: string;
  account_id: string;
}

export const ListCaptionsOrSubtitlesRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/{identifier}/captions" }),
).annotations({ identifier: "ListCaptionsOrSubtitlesRequest" }) as unknown as Schema.Schema<ListCaptionsOrSubtitlesRequest>;

export interface ListCaptionsOrSubtitlesResponse {
  result: { generated?: boolean; label?: string; language?: string; status?: "ready" | "inprogress" | "error" }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListCaptionsOrSubtitlesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  generated: Schema.optional(Schema.Boolean),
  label: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literal("ready", "inprogress", "error"))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListCaptionsOrSubtitlesResponse" }) as unknown as Schema.Schema<ListCaptionsOrSubtitlesResponse>;

export const listCaptionsOrSubtitles: (
  input: ListCaptionsOrSubtitlesRequest
) => Effect.Effect<
  ListCaptionsOrSubtitlesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCaptionsOrSubtitlesRequest,
  output: ListCaptionsOrSubtitlesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetCaptionOrSubtitleForLanguageRequest {
  language: string;
  identifier: string;
  account_id: string;
}

export const GetCaptionOrSubtitleForLanguageRequest = Schema.Struct({
  language: Schema.String.pipe(T.HttpPath("language")),
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/{identifier}/captions/{language}" }),
).annotations({ identifier: "GetCaptionOrSubtitleForLanguageRequest" }) as unknown as Schema.Schema<GetCaptionOrSubtitleForLanguageRequest>;

export interface GetCaptionOrSubtitleForLanguageResponse {
  result: { generated?: boolean; label?: string; language?: string; status?: "ready" | "inprogress" | "error" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetCaptionOrSubtitleForLanguageResponse = Schema.Struct({
  result: Schema.Struct({
  generated: Schema.optional(Schema.Boolean),
  label: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literal("ready", "inprogress", "error"))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetCaptionOrSubtitleForLanguageResponse" }) as unknown as Schema.Schema<GetCaptionOrSubtitleForLanguageResponse>;

export const getCaptionOrSubtitleForLanguage: (
  input: GetCaptionOrSubtitleForLanguageRequest
) => Effect.Effect<
  GetCaptionOrSubtitleForLanguageResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCaptionOrSubtitleForLanguageRequest,
  output: GetCaptionOrSubtitleForLanguageResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesRequest {
  language: string;
  identifier: string;
  account_id: string;
  body: FormData;
}

export const StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesRequest = Schema.Struct({
  language: Schema.String.pipe(T.HttpPath("language")),
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.instanceOf(FormData).pipe(T.HttpFormData())
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/stream/{identifier}/captions/{language}" }),
).annotations({ identifier: "StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesRequest" }) as unknown as Schema.Schema<StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesRequest>;

export interface StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesResponse {
  result: { generated?: boolean; label?: string; language?: string; status?: "ready" | "inprogress" | "error" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesResponse = Schema.Struct({
  result: Schema.Struct({
  generated: Schema.optional(Schema.Boolean),
  label: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literal("ready", "inprogress", "error"))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesResponse" }) as unknown as Schema.Schema<StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesResponse>;

export const streamSubtitlesCaptionsUploadCaptionsOrSubtitles: (
  input: StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesRequest
) => Effect.Effect<
  StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesRequest,
  output: StreamSubtitlesCaptionsUploadCaptionsOrSubtitlesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteCaptionsOrSubtitlesRequest {
  language: string;
  identifier: string;
  account_id: string;
}

export const DeleteCaptionsOrSubtitlesRequest = Schema.Struct({
  language: Schema.String.pipe(T.HttpPath("language")),
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/{identifier}/captions/{language}" }),
).annotations({ identifier: "DeleteCaptionsOrSubtitlesRequest" }) as unknown as Schema.Schema<DeleteCaptionsOrSubtitlesRequest>;

export interface DeleteCaptionsOrSubtitlesResponse {
  result: string;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteCaptionsOrSubtitlesResponse = Schema.Struct({
  result: Schema.String,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteCaptionsOrSubtitlesResponse" }) as unknown as Schema.Schema<DeleteCaptionsOrSubtitlesResponse>;

export const deleteCaptionsOrSubtitles: (
  input: DeleteCaptionsOrSubtitlesRequest
) => Effect.Effect<
  DeleteCaptionsOrSubtitlesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCaptionsOrSubtitlesRequest,
  output: DeleteCaptionsOrSubtitlesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageRequest {
  language: string;
  identifier: string;
  account_id: string;
}

export const StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageRequest = Schema.Struct({
  language: Schema.String.pipe(T.HttpPath("language")),
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/{identifier}/captions/{language}/generate" }),
).annotations({ identifier: "StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageRequest" }) as unknown as Schema.Schema<StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageRequest>;

export interface StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageResponse {
  result: { generated?: boolean; label?: string; language?: string; status?: "ready" | "inprogress" | "error" };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageResponse = Schema.Struct({
  result: Schema.Struct({
  generated: Schema.optional(Schema.Boolean),
  label: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literal("ready", "inprogress", "error"))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageResponse" }) as unknown as Schema.Schema<StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageResponse>;

export const streamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguage: (
  input: StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageRequest
) => Effect.Effect<
  StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageRequest,
  output: StreamSubtitlesCaptionsGenerateCaptionOrSubtitleForLanguageResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetVttCaptionOrSubtitleRequest {
  language: string;
  identifier: string;
  account_id: string;
}

export const GetVttCaptionOrSubtitleRequest = Schema.Struct({
  language: Schema.String.pipe(T.HttpPath("language")),
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/{identifier}/captions/{language}/vtt" }),
).annotations({ identifier: "GetVttCaptionOrSubtitleRequest" }) as unknown as Schema.Schema<GetVttCaptionOrSubtitleRequest>;

export interface GetVttCaptionOrSubtitleResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetVttCaptionOrSubtitleResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetVttCaptionOrSubtitleResponse" }) as unknown as Schema.Schema<GetVttCaptionOrSubtitleResponse>;

export const getVttCaptionOrSubtitle: (
  input: GetVttCaptionOrSubtitleRequest
) => Effect.Effect<
  GetVttCaptionOrSubtitleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetVttCaptionOrSubtitleRequest,
  output: GetVttCaptionOrSubtitleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListDownloadsRequest {
  identifier: string;
  account_id: string;
}

export const ListDownloadsRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/{identifier}/downloads" }),
).annotations({ identifier: "ListDownloadsRequest" }) as unknown as Schema.Schema<ListDownloadsRequest>;

export interface ListDownloadsResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListDownloadsResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListDownloadsResponse" }) as unknown as Schema.Schema<ListDownloadsResponse>;

export const listDownloads: (
  input: ListDownloadsRequest
) => Effect.Effect<
  ListDownloadsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDownloadsRequest,
  output: ListDownloadsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateDownloadsRequest {
  identifier: string;
  account_id: string;
}

export const CreateDownloadsRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/{identifier}/downloads" }),
).annotations({ identifier: "CreateDownloadsRequest" }) as unknown as Schema.Schema<CreateDownloadsRequest>;

export interface CreateDownloadsResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateDownloadsResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateDownloadsResponse" }) as unknown as Schema.Schema<CreateDownloadsResponse>;

export const createDownloads: (
  input: CreateDownloadsRequest
) => Effect.Effect<
  CreateDownloadsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDownloadsRequest,
  output: CreateDownloadsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteDownloadsRequest {
  identifier: string;
  account_id: string;
}

export const DeleteDownloadsRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/{identifier}/downloads" }),
).annotations({ identifier: "DeleteDownloadsRequest" }) as unknown as Schema.Schema<DeleteDownloadsRequest>;

export interface DeleteDownloadsResponse {
  result: string;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteDownloadsResponse = Schema.Struct({
  result: Schema.String,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteDownloadsResponse" }) as unknown as Schema.Schema<DeleteDownloadsResponse>;

export const deleteDownloads: (
  input: DeleteDownloadsRequest
) => Effect.Effect<
  DeleteDownloadsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDownloadsRequest,
  output: DeleteDownloadsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateTypeSpecificDownloadsRequest {
  identifier: string;
  account_id: string;
  download_type: string;
}

export const CreateTypeSpecificDownloadsRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  download_type: Schema.String.pipe(T.HttpPath("download_type"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/{identifier}/downloads/{download_type}" }),
).annotations({ identifier: "CreateTypeSpecificDownloadsRequest" }) as unknown as Schema.Schema<CreateTypeSpecificDownloadsRequest>;

export interface CreateTypeSpecificDownloadsResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateTypeSpecificDownloadsResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateTypeSpecificDownloadsResponse" }) as unknown as Schema.Schema<CreateTypeSpecificDownloadsResponse>;

export const createTypeSpecificDownloads: (
  input: CreateTypeSpecificDownloadsRequest
) => Effect.Effect<
  CreateTypeSpecificDownloadsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTypeSpecificDownloadsRequest,
  output: CreateTypeSpecificDownloadsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteTypeSpecificDownloadsRequest {
  identifier: string;
  account_id: string;
  download_type: string;
}

export const DeleteTypeSpecificDownloadsRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  download_type: Schema.String.pipe(T.HttpPath("download_type"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/{identifier}/downloads/{download_type}" }),
).annotations({ identifier: "DeleteTypeSpecificDownloadsRequest" }) as unknown as Schema.Schema<DeleteTypeSpecificDownloadsRequest>;

export interface DeleteTypeSpecificDownloadsResponse {
  result: string;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteTypeSpecificDownloadsResponse = Schema.Struct({
  result: Schema.String,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteTypeSpecificDownloadsResponse" }) as unknown as Schema.Schema<DeleteTypeSpecificDownloadsResponse>;

export const deleteTypeSpecificDownloads: (
  input: DeleteTypeSpecificDownloadsRequest
) => Effect.Effect<
  DeleteTypeSpecificDownloadsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteTypeSpecificDownloadsRequest,
  output: DeleteTypeSpecificDownloadsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface StreamVideosRetreieveEmbedCodeHtmlRequest {
  identifier: string;
  account_id: string;
}

export const StreamVideosRetreieveEmbedCodeHtmlRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/{identifier}/embed" }),
).annotations({ identifier: "StreamVideosRetreieveEmbedCodeHtmlRequest" }) as unknown as Schema.Schema<StreamVideosRetreieveEmbedCodeHtmlRequest>;

export interface StreamVideosRetreieveEmbedCodeHtmlResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const StreamVideosRetreieveEmbedCodeHtmlResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "StreamVideosRetreieveEmbedCodeHtmlResponse" }) as unknown as Schema.Schema<StreamVideosRetreieveEmbedCodeHtmlResponse>;

export const streamVideosRetreieveEmbedCodeHtml: (
  input: StreamVideosRetreieveEmbedCodeHtmlRequest
) => Effect.Effect<
  StreamVideosRetreieveEmbedCodeHtmlResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StreamVideosRetreieveEmbedCodeHtmlRequest,
  output: StreamVideosRetreieveEmbedCodeHtmlResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateSignedUrlTokensForVideosRequest {
  identifier: string;
  account_id: string;
  body: { accessRules?: { action?: "allow" | "block"; country?: string[]; ip?: string[]; type?: "any" | "ip.src" | "ip.geoip.country" }[]; downloadable?: boolean; exp?: number; id?: string; nbf?: number; pem?: string };
}

export const CreateSignedUrlTokensForVideosRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  accessRules: Schema.optional(Schema.Array(Schema.Struct({
  action: Schema.optional(Schema.Literal("allow", "block")),
  country: Schema.optional(Schema.Array(Schema.String)),
  ip: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.Literal("any", "ip.src", "ip.geoip.country"))
}))),
  downloadable: Schema.optional(Schema.Boolean),
  exp: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.String),
  nbf: Schema.optional(Schema.Number),
  pem: Schema.optional(Schema.String)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/{identifier}/token" }),
).annotations({ identifier: "CreateSignedUrlTokensForVideosRequest" }) as unknown as Schema.Schema<CreateSignedUrlTokensForVideosRequest>;

export interface CreateSignedUrlTokensForVideosResponse {
  result: { token?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateSignedUrlTokensForVideosResponse = Schema.Struct({
  result: Schema.Struct({
  token: Schema.optional(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateSignedUrlTokensForVideosResponse" }) as unknown as Schema.Schema<CreateSignedUrlTokensForVideosResponse>;

export const createSignedUrlTokensForVideos: (
  input: CreateSignedUrlTokensForVideosRequest
) => Effect.Effect<
  CreateSignedUrlTokensForVideosResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSignedUrlTokensForVideosRequest,
  output: CreateSignedUrlTokensForVideosResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
