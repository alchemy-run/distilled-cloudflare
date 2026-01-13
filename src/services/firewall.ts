/**
 * Cloudflare FIREWALL API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service firewall
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

export interface ListIpAccessRulesRequest {
  zone_id: string;
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
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
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
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/access_rules/rules" }),
).annotations({ identifier: "ListIpAccessRulesRequest" }) as unknown as Schema.Schema<ListIpAccessRulesRequest>;

export interface ListIpAccessRulesResponse {
  result: { allowed_modes: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"[]; configuration: Record<string, unknown>; created_on?: string; id: string; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; modified_on?: string; notes?: string }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListIpAccessRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  allowed_modes: Schema.Array(Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge")),
  configuration: Schema.Struct({}),
  created_on: Schema.optional(Schema.Date),
  id: Schema.String,
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  modified_on: Schema.optional(Schema.Date),
  notes: Schema.optional(Schema.String)
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
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateAnIpAccessRuleRequest {
  zone_id: string;
  body: { configuration: Record<string, unknown>; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; notes?: unknown };
}

export const CreateAnIpAccessRuleRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  configuration: Schema.Struct({}),
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  notes: Schema.optional(Schema.Unknown)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/access_rules/rules" }),
).annotations({ identifier: "CreateAnIpAccessRuleRequest" }) as unknown as Schema.Schema<CreateAnIpAccessRuleRequest>;

export interface CreateAnIpAccessRuleResponse {
  result: { allowed_modes: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"[]; configuration: Record<string, unknown>; created_on?: string; id: string; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; modified_on?: string; notes?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateAnIpAccessRuleResponse = Schema.Struct({
  result: Schema.Struct({
  allowed_modes: Schema.Array(Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge")),
  configuration: Schema.Struct({}),
  created_on: Schema.optional(Schema.Date),
  id: Schema.String,
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  modified_on: Schema.optional(Schema.Date),
  notes: Schema.optional(Schema.String)
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
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteAnIpAccessRuleRequest {
  zone_id: string;
  rule_id: string;
  body: { cascade?: "none" | "basic" | "aggressive" };
}

export const DeleteAnIpAccessRuleRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  rule_id: Schema.String.pipe(T.HttpPath("rule_id")),
  body: Schema.Struct({
  cascade: Schema.optional(Schema.Literal("none", "basic", "aggressive"))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/firewall/access_rules/rules/{rule_id}" }),
).annotations({ identifier: "DeleteAnIpAccessRuleRequest" }) as unknown as Schema.Schema<DeleteAnIpAccessRuleRequest>;

export interface DeleteAnIpAccessRuleResponse {
  result: { id?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAnIpAccessRuleResponse = Schema.Struct({
  result: Schema.Struct({
  id: Schema.optional(Schema.String)
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
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateAnIpAccessRuleRequest {
  zone_id: string;
  rule_id: string;
  body: { mode?: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; notes?: string };
}

export const UpdateAnIpAccessRuleRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  rule_id: Schema.String.pipe(T.HttpPath("rule_id")),
  body: Schema.Struct({
  mode: Schema.optional(Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge")),
  notes: Schema.optional(Schema.String)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/firewall/access_rules/rules/{rule_id}" }),
).annotations({ identifier: "UpdateAnIpAccessRuleRequest" }) as unknown as Schema.Schema<UpdateAnIpAccessRuleRequest>;

export interface UpdateAnIpAccessRuleResponse {
  result: { allowed_modes: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"[]; configuration: Record<string, unknown>; created_on?: string; id: string; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; modified_on?: string; notes?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAnIpAccessRuleResponse = Schema.Struct({
  result: Schema.Struct({
  allowed_modes: Schema.Array(Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge")),
  configuration: Schema.Struct({}),
  created_on: Schema.optional(Schema.Date),
  id: Schema.String,
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  modified_on: Schema.optional(Schema.Date),
  notes: Schema.optional(Schema.String)
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
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListZoneLockdownRulesRequest {
  zone_id: string;
  page?: number;
  description?: unknown;
  modified_on?: unknown;
  ip?: unknown;
  priority?: unknown;
  uri_search?: unknown;
  ip_range_search?: unknown;
  per_page?: number;
  created_on?: string;
  description_search?: string;
  ip_search?: string;
}

export const ListZoneLockdownRulesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  modified_on: Schema.optional(Schema.Date).pipe(T.HttpQuery("modified_on")),
  ip: Schema.optional(Schema.String).pipe(T.HttpQuery("ip")),
  priority: Schema.optional(Schema.Number).pipe(T.HttpQuery("priority")),
  uri_search: Schema.optional(Schema.String).pipe(T.HttpQuery("uri_search")),
  ip_range_search: Schema.optional(Schema.String).pipe(T.HttpQuery("ip_range_search")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  created_on: Schema.optional(Schema.Date).pipe(T.HttpQuery("created_on")),
  description_search: Schema.optional(Schema.String).pipe(T.HttpQuery("description_search")),
  ip_search: Schema.optional(Schema.String).pipe(T.HttpQuery("ip_search"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/lockdowns" }),
).annotations({ identifier: "ListZoneLockdownRulesRequest" }) as unknown as Schema.Schema<ListZoneLockdownRulesRequest>;

export interface ListZoneLockdownRulesResponse {
  result: { configurations: unknown[]; created_on: string; description: string; id: string; modified_on: string; paused: boolean; urls: string[] }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListZoneLockdownRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  configurations: Schema.Array(Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.Literal("ip")),
  value: Schema.optional(Schema.String)
}), Schema.Struct({
  target: Schema.optional(Schema.Literal("ip_range")),
  value: Schema.optional(Schema.String)
}))),
  created_on: Schema.Date,
  description: Schema.String,
  id: Schema.String,
  modified_on: Schema.Date,
  paused: Schema.Boolean,
  urls: Schema.Array(Schema.String)
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListZoneLockdownRulesResponse" }) as unknown as Schema.Schema<ListZoneLockdownRulesResponse>;

export const listZoneLockdownRules: (
  input: ListZoneLockdownRulesRequest
) => Effect.Effect<
  ListZoneLockdownRulesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListZoneLockdownRulesRequest,
  output: ListZoneLockdownRulesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateAZoneLockdownRuleRequest {
  zone_id: string;
  body: { configurations: unknown[]; description?: string; paused?: boolean; priority?: number; urls: string[] };
}

export const CreateAZoneLockdownRuleRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  configurations: Schema.Array(Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.Literal("ip")),
  value: Schema.optional(Schema.String)
}), Schema.Struct({
  target: Schema.optional(Schema.Literal("ip_range")),
  value: Schema.optional(Schema.String)
}))),
  description: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  urls: Schema.Array(Schema.String)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/lockdowns" }),
).annotations({ identifier: "CreateAZoneLockdownRuleRequest" }) as unknown as Schema.Schema<CreateAZoneLockdownRuleRequest>;

export interface CreateAZoneLockdownRuleResponse {
  result: { configurations: unknown[]; created_on: string; description: string; id: string; modified_on: string; paused: boolean; urls: string[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateAZoneLockdownRuleResponse = Schema.Struct({
  result: Schema.Struct({
  configurations: Schema.Array(Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.Literal("ip")),
  value: Schema.optional(Schema.String)
}), Schema.Struct({
  target: Schema.optional(Schema.Literal("ip_range")),
  value: Schema.optional(Schema.String)
}))),
  created_on: Schema.Date,
  description: Schema.String,
  id: Schema.String,
  modified_on: Schema.Date,
  paused: Schema.Boolean,
  urls: Schema.Array(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateAZoneLockdownRuleResponse" }) as unknown as Schema.Schema<CreateAZoneLockdownRuleResponse>;

export const createAZoneLockdownRule: (
  input: CreateAZoneLockdownRuleRequest
) => Effect.Effect<
  CreateAZoneLockdownRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAZoneLockdownRuleRequest,
  output: CreateAZoneLockdownRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetAZoneLockdownRuleRequest {
  lock_downs_id: string;
  zone_id: string;
}

export const GetAZoneLockdownRuleRequest = Schema.Struct({
  lock_downs_id: Schema.String.pipe(T.HttpPath("lock_downs_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/lockdowns/{lock_downs_id}" }),
).annotations({ identifier: "GetAZoneLockdownRuleRequest" }) as unknown as Schema.Schema<GetAZoneLockdownRuleRequest>;

export interface GetAZoneLockdownRuleResponse {
  result: { configurations: unknown[]; created_on: string; description: string; id: string; modified_on: string; paused: boolean; urls: string[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetAZoneLockdownRuleResponse = Schema.Struct({
  result: Schema.Struct({
  configurations: Schema.Array(Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.Literal("ip")),
  value: Schema.optional(Schema.String)
}), Schema.Struct({
  target: Schema.optional(Schema.Literal("ip_range")),
  value: Schema.optional(Schema.String)
}))),
  created_on: Schema.Date,
  description: Schema.String,
  id: Schema.String,
  modified_on: Schema.Date,
  paused: Schema.Boolean,
  urls: Schema.Array(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetAZoneLockdownRuleResponse" }) as unknown as Schema.Schema<GetAZoneLockdownRuleResponse>;

export const getAZoneLockdownRule: (
  input: GetAZoneLockdownRuleRequest
) => Effect.Effect<
  GetAZoneLockdownRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAZoneLockdownRuleRequest,
  output: GetAZoneLockdownRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateAZoneLockdownRuleRequest {
  lock_downs_id: string;
  zone_id: string;
  body: { configurations: unknown[]; urls: string[] };
}

export const UpdateAZoneLockdownRuleRequest = Schema.Struct({
  lock_downs_id: Schema.String.pipe(T.HttpPath("lock_downs_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  configurations: Schema.Array(Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.Literal("ip")),
  value: Schema.optional(Schema.String)
}), Schema.Struct({
  target: Schema.optional(Schema.Literal("ip_range")),
  value: Schema.optional(Schema.String)
}))),
  urls: Schema.Array(Schema.String)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/firewall/lockdowns/{lock_downs_id}" }),
).annotations({ identifier: "UpdateAZoneLockdownRuleRequest" }) as unknown as Schema.Schema<UpdateAZoneLockdownRuleRequest>;

export interface UpdateAZoneLockdownRuleResponse {
  result: { configurations: unknown[]; created_on: string; description: string; id: string; modified_on: string; paused: boolean; urls: string[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAZoneLockdownRuleResponse = Schema.Struct({
  result: Schema.Struct({
  configurations: Schema.Array(Schema.Union(Schema.Struct({
  target: Schema.optional(Schema.Literal("ip")),
  value: Schema.optional(Schema.String)
}), Schema.Struct({
  target: Schema.optional(Schema.Literal("ip_range")),
  value: Schema.optional(Schema.String)
}))),
  created_on: Schema.Date,
  description: Schema.String,
  id: Schema.String,
  modified_on: Schema.Date,
  paused: Schema.Boolean,
  urls: Schema.Array(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateAZoneLockdownRuleResponse" }) as unknown as Schema.Schema<UpdateAZoneLockdownRuleResponse>;

export const updateAZoneLockdownRule: (
  input: UpdateAZoneLockdownRuleRequest
) => Effect.Effect<
  UpdateAZoneLockdownRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAZoneLockdownRuleRequest,
  output: UpdateAZoneLockdownRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteAZoneLockdownRuleRequest {
  lock_downs_id: string;
  zone_id: string;
}

export const DeleteAZoneLockdownRuleRequest = Schema.Struct({
  lock_downs_id: Schema.String.pipe(T.HttpPath("lock_downs_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/firewall/lockdowns/{lock_downs_id}" }),
).annotations({ identifier: "DeleteAZoneLockdownRuleRequest" }) as unknown as Schema.Schema<DeleteAZoneLockdownRuleRequest>;

export interface DeleteAZoneLockdownRuleResponse {
  result: { id?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAZoneLockdownRuleResponse = Schema.Struct({
  result: Schema.Struct({
  id: Schema.optional(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteAZoneLockdownRuleResponse" }) as unknown as Schema.Schema<DeleteAZoneLockdownRuleResponse>;

export const deleteAZoneLockdownRule: (
  input: DeleteAZoneLockdownRuleRequest
) => Effect.Effect<
  DeleteAZoneLockdownRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAZoneLockdownRuleRequest,
  output: DeleteAZoneLockdownRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListFirewallRulesRequest {
  zone_id: string;
  description?: string;
  action?: string;
  page?: number;
  per_page?: number;
  id?: string;
  paused?: boolean;
}

export const ListFirewallRulesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  action: Schema.optional(Schema.String).pipe(T.HttpQuery("action")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  paused: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("paused"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules" }),
).annotations({ identifier: "ListFirewallRulesRequest" }) as unknown as Schema.Schema<ListFirewallRulesRequest>;

export interface ListFirewallRulesResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListFirewallRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListFirewallRulesResponse" }) as unknown as Schema.Schema<ListFirewallRulesResponse>;

export const listFirewallRules: (
  input: ListFirewallRulesRequest
) => Effect.Effect<
  ListFirewallRulesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListFirewallRulesRequest,
  output: ListFirewallRulesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateFirewallRulesRequest {
  zone_id: string;
  body: { action: Record<string, unknown>; filter: { description?: string; expression?: string; id?: string; paused?: boolean; ref?: string } };
}

export const CreateFirewallRulesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  action: Schema.Struct({}),
  filter: Schema.Struct({
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  ref: Schema.optional(Schema.String)
})
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/rules" }),
).annotations({ identifier: "CreateFirewallRulesRequest" }) as unknown as Schema.Schema<CreateFirewallRulesRequest>;

export interface CreateFirewallRulesResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateFirewallRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateFirewallRulesResponse" }) as unknown as Schema.Schema<CreateFirewallRulesResponse>;

export const createFirewallRules: (
  input: CreateFirewallRulesRequest
) => Effect.Effect<
  CreateFirewallRulesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateFirewallRulesRequest,
  output: CreateFirewallRulesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateFirewallRulesRequest {
  zone_id: string;
  body: unknown;
}

export const UpdateFirewallRulesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/firewall/rules" }),
).annotations({ identifier: "UpdateFirewallRulesRequest" }) as unknown as Schema.Schema<UpdateFirewallRulesRequest>;

export interface UpdateFirewallRulesResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateFirewallRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateFirewallRulesResponse" }) as unknown as Schema.Schema<UpdateFirewallRulesResponse>;

export const updateFirewallRules: (
  input: UpdateFirewallRulesRequest
) => Effect.Effect<
  UpdateFirewallRulesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateFirewallRulesRequest,
  output: UpdateFirewallRulesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteFirewallRulesRequest {
  zone_id: string;
  body: { id: string };
}

export const DeleteFirewallRulesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  id: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/firewall/rules" }),
).annotations({ identifier: "DeleteFirewallRulesRequest" }) as unknown as Schema.Schema<DeleteFirewallRulesRequest>;

export interface DeleteFirewallRulesResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteFirewallRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteFirewallRulesResponse" }) as unknown as Schema.Schema<DeleteFirewallRulesResponse>;

export const deleteFirewallRules: (
  input: DeleteFirewallRulesRequest
) => Effect.Effect<
  DeleteFirewallRulesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteFirewallRulesRequest,
  output: DeleteFirewallRulesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdatePriorityOfFirewallRulesRequest {
  zone_id: string;
  body: unknown;
}

export const UpdatePriorityOfFirewallRulesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Unknown.pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/firewall/rules" }),
).annotations({ identifier: "UpdatePriorityOfFirewallRulesRequest" }) as unknown as Schema.Schema<UpdatePriorityOfFirewallRulesRequest>;

export interface UpdatePriorityOfFirewallRulesResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdatePriorityOfFirewallRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdatePriorityOfFirewallRulesResponse" }) as unknown as Schema.Schema<UpdatePriorityOfFirewallRulesResponse>;

export const updatePriorityOfFirewallRules: (
  input: UpdatePriorityOfFirewallRulesRequest
) => Effect.Effect<
  UpdatePriorityOfFirewallRulesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePriorityOfFirewallRulesRequest,
  output: UpdatePriorityOfFirewallRulesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetAFirewallRuleRequest {
  rule_id: string;
  zone_id: string;
  id?: unknown;
}

export const GetAFirewallRuleRequest = Schema.Struct({
  rule_id: Schema.String.pipe(T.HttpPath("rule_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules/{rule_id}" }),
).annotations({ identifier: "GetAFirewallRuleRequest" }) as unknown as Schema.Schema<GetAFirewallRuleRequest>;

export interface GetAFirewallRuleResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetAFirewallRuleResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetAFirewallRuleResponse" }) as unknown as Schema.Schema<GetAFirewallRuleResponse>;

export const getAFirewallRule: (
  input: GetAFirewallRuleRequest
) => Effect.Effect<
  GetAFirewallRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAFirewallRuleRequest,
  output: GetAFirewallRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateAFirewallRuleRequest {
  rule_id: string;
  zone_id: string;
  body: { action: Record<string, unknown>; filter: { description?: string; expression?: string; id?: string; paused?: boolean; ref?: string }; id: string };
}

export const UpdateAFirewallRuleRequest = Schema.Struct({
  rule_id: Schema.String.pipe(T.HttpPath("rule_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  action: Schema.Struct({}),
  filter: Schema.Struct({
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  ref: Schema.optional(Schema.String)
}),
  id: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/firewall/rules/{rule_id}" }),
).annotations({ identifier: "UpdateAFirewallRuleRequest" }) as unknown as Schema.Schema<UpdateAFirewallRuleRequest>;

export interface UpdateAFirewallRuleResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAFirewallRuleResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateAFirewallRuleResponse" }) as unknown as Schema.Schema<UpdateAFirewallRuleResponse>;

export const updateAFirewallRule: (
  input: UpdateAFirewallRuleRequest
) => Effect.Effect<
  UpdateAFirewallRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAFirewallRuleRequest,
  output: UpdateAFirewallRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteAFirewallRuleRequest {
  rule_id: string;
  zone_id: string;
  body: { delete_filter_if_unused?: boolean };
}

export const DeleteAFirewallRuleRequest = Schema.Struct({
  rule_id: Schema.String.pipe(T.HttpPath("rule_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  delete_filter_if_unused: Schema.optional(Schema.Boolean)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/firewall/rules/{rule_id}" }),
).annotations({ identifier: "DeleteAFirewallRuleRequest" }) as unknown as Schema.Schema<DeleteAFirewallRuleRequest>;

export interface DeleteAFirewallRuleResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAFirewallRuleResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteAFirewallRuleResponse" }) as unknown as Schema.Schema<DeleteAFirewallRuleResponse>;

export const deleteAFirewallRule: (
  input: DeleteAFirewallRuleRequest
) => Effect.Effect<
  DeleteAFirewallRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAFirewallRuleRequest,
  output: DeleteAFirewallRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdatePriorityOfAFirewallRuleRequest {
  rule_id: string;
  zone_id: string;
  body: { id: string };
}

export const UpdatePriorityOfAFirewallRuleRequest = Schema.Struct({
  rule_id: Schema.String.pipe(T.HttpPath("rule_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  id: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/firewall/rules/{rule_id}" }),
).annotations({ identifier: "UpdatePriorityOfAFirewallRuleRequest" }) as unknown as Schema.Schema<UpdatePriorityOfAFirewallRuleRequest>;

export interface UpdatePriorityOfAFirewallRuleResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdatePriorityOfAFirewallRuleResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdatePriorityOfAFirewallRuleResponse" }) as unknown as Schema.Schema<UpdatePriorityOfAFirewallRuleResponse>;

export const updatePriorityOfAFirewallRule: (
  input: UpdatePriorityOfAFirewallRuleRequest
) => Effect.Effect<
  UpdatePriorityOfAFirewallRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePriorityOfAFirewallRuleRequest,
  output: UpdatePriorityOfAFirewallRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListUserAgentBlockingRulesRequest {
  zone_id: string;
  page?: number;
  description?: unknown;
  per_page?: number;
  user_agent?: string;
  paused?: boolean;
}

export const ListUserAgentBlockingRulesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  user_agent: Schema.optional(Schema.String).pipe(T.HttpQuery("user_agent")),
  paused: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("paused"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/ua_rules" }),
).annotations({ identifier: "ListUserAgentBlockingRulesRequest" }) as unknown as Schema.Schema<ListUserAgentBlockingRulesRequest>;

export interface ListUserAgentBlockingRulesResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListUserAgentBlockingRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListUserAgentBlockingRulesResponse" }) as unknown as Schema.Schema<ListUserAgentBlockingRulesResponse>;

export const listUserAgentBlockingRules: (
  input: ListUserAgentBlockingRulesRequest
) => Effect.Effect<
  ListUserAgentBlockingRulesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListUserAgentBlockingRulesRequest,
  output: ListUserAgentBlockingRulesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateAUserAgentBlockingRuleRequest {
  zone_id: string;
  body: { configuration: { target?: "ua"; value?: string }; description?: string; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; paused?: boolean };
}

export const CreateAUserAgentBlockingRuleRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  configuration: Schema.Struct({
  target: Schema.optional(Schema.Literal("ua")),
  value: Schema.optional(Schema.String)
}),
  description: Schema.optional(Schema.String),
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  paused: Schema.optional(Schema.Boolean)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/ua_rules" }),
).annotations({ identifier: "CreateAUserAgentBlockingRuleRequest" }) as unknown as Schema.Schema<CreateAUserAgentBlockingRuleRequest>;

export interface CreateAUserAgentBlockingRuleResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateAUserAgentBlockingRuleResponse = Schema.Struct({
  result: Schema.Union(Schema.Struct({}), Schema.String),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateAUserAgentBlockingRuleResponse" }) as unknown as Schema.Schema<CreateAUserAgentBlockingRuleResponse>;

export const createAUserAgentBlockingRule: (
  input: CreateAUserAgentBlockingRuleRequest
) => Effect.Effect<
  CreateAUserAgentBlockingRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAUserAgentBlockingRuleRequest,
  output: CreateAUserAgentBlockingRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetAUserAgentBlockingRuleRequest {
  ua_rule_id: string;
  zone_id: string;
}

export const GetAUserAgentBlockingRuleRequest = Schema.Struct({
  ua_rule_id: Schema.String.pipe(T.HttpPath("ua_rule_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/ua_rules/{ua_rule_id}" }),
).annotations({ identifier: "GetAUserAgentBlockingRuleRequest" }) as unknown as Schema.Schema<GetAUserAgentBlockingRuleRequest>;

export interface GetAUserAgentBlockingRuleResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetAUserAgentBlockingRuleResponse = Schema.Struct({
  result: Schema.Union(Schema.Struct({}), Schema.String),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetAUserAgentBlockingRuleResponse" }) as unknown as Schema.Schema<GetAUserAgentBlockingRuleResponse>;

export const getAUserAgentBlockingRule: (
  input: GetAUserAgentBlockingRuleRequest
) => Effect.Effect<
  GetAUserAgentBlockingRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAUserAgentBlockingRuleRequest,
  output: GetAUserAgentBlockingRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateAUserAgentBlockingRuleRequest {
  ua_rule_id: string;
  zone_id: string;
  body: { configuration: Record<string, unknown>; description?: string; id: string; mode: "block" | "challenge" | "whitelist" | "js_challenge" | "managed_challenge"; paused?: boolean };
}

export const UpdateAUserAgentBlockingRuleRequest = Schema.Struct({
  ua_rule_id: Schema.String.pipe(T.HttpPath("ua_rule_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  configuration: Schema.Struct({}),
  description: Schema.optional(Schema.String),
  id: Schema.String,
  mode: Schema.Literal("block", "challenge", "whitelist", "js_challenge", "managed_challenge"),
  paused: Schema.optional(Schema.Boolean)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/firewall/ua_rules/{ua_rule_id}" }),
).annotations({ identifier: "UpdateAUserAgentBlockingRuleRequest" }) as unknown as Schema.Schema<UpdateAUserAgentBlockingRuleRequest>;

export interface UpdateAUserAgentBlockingRuleResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAUserAgentBlockingRuleResponse = Schema.Struct({
  result: Schema.Union(Schema.Struct({}), Schema.String),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateAUserAgentBlockingRuleResponse" }) as unknown as Schema.Schema<UpdateAUserAgentBlockingRuleResponse>;

export const updateAUserAgentBlockingRule: (
  input: UpdateAUserAgentBlockingRuleRequest
) => Effect.Effect<
  UpdateAUserAgentBlockingRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAUserAgentBlockingRuleRequest,
  output: UpdateAUserAgentBlockingRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteAUserAgentBlockingRuleRequest {
  ua_rule_id: string;
  zone_id: string;
}

export const DeleteAUserAgentBlockingRuleRequest = Schema.Struct({
  ua_rule_id: Schema.String.pipe(T.HttpPath("ua_rule_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/firewall/ua_rules/{ua_rule_id}" }),
).annotations({ identifier: "DeleteAUserAgentBlockingRuleRequest" }) as unknown as Schema.Schema<DeleteAUserAgentBlockingRuleRequest>;

export interface DeleteAUserAgentBlockingRuleResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAUserAgentBlockingRuleResponse = Schema.Struct({
  result: Schema.Union(Schema.Struct({}), Schema.String),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteAUserAgentBlockingRuleResponse" }) as unknown as Schema.Schema<DeleteAUserAgentBlockingRuleResponse>;

export const deleteAUserAgentBlockingRule: (
  input: DeleteAUserAgentBlockingRuleRequest
) => Effect.Effect<
  DeleteAUserAgentBlockingRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAUserAgentBlockingRuleRequest,
  output: DeleteAUserAgentBlockingRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListWafOverridesRequest {
  zone_id: string;
  page?: number;
  per_page?: number;
}

export const ListWafOverridesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/overrides" }),
).annotations({ identifier: "ListWafOverridesRequest" }) as unknown as Schema.Schema<ListWafOverridesRequest>;

export interface ListWafOverridesResponse {
  result: { description?: string; groups?: Record<string, unknown>; id?: string; paused?: boolean; priority?: number; rewrite_action?: { block?: "challenge" | "block" | "simulate" | "disable" | "default"; challenge?: "challenge" | "block" | "simulate" | "disable" | "default"; default?: "challenge" | "block" | "simulate" | "disable" | "default"; disable?: "challenge" | "block" | "simulate" | "disable" | "default"; simulate?: "challenge" | "block" | "simulate" | "disable" | "default" }; rules?: Record<string, unknown>; urls?: string[] }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListWafOverridesResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  description: Schema.optional(Schema.String),
  groups: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
  id: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  rewrite_action: Schema.optional(Schema.Struct({
  block: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  challenge: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  default: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  disable: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  simulate: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default"))
})),
  rules: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Literal("challenge", "block", "simulate", "disable", "default") })),
  urls: Schema.optional(Schema.Array(Schema.String))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListWafOverridesResponse" }) as unknown as Schema.Schema<ListWafOverridesResponse>;

export const listWafOverrides: (
  input: ListWafOverridesRequest
) => Effect.Effect<
  ListWafOverridesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWafOverridesRequest,
  output: ListWafOverridesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateAWafOverrideRequest {
  zone_id: string;
  body: { urls: string[] };
}

export const CreateAWafOverrideRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  urls: Schema.Array(Schema.String)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/waf/overrides" }),
).annotations({ identifier: "CreateAWafOverrideRequest" }) as unknown as Schema.Schema<CreateAWafOverrideRequest>;

export interface CreateAWafOverrideResponse {
  result: { description?: string; groups?: Record<string, unknown>; id?: string; paused?: boolean; priority?: number; rewrite_action?: { block?: "challenge" | "block" | "simulate" | "disable" | "default"; challenge?: "challenge" | "block" | "simulate" | "disable" | "default"; default?: "challenge" | "block" | "simulate" | "disable" | "default"; disable?: "challenge" | "block" | "simulate" | "disable" | "default"; simulate?: "challenge" | "block" | "simulate" | "disable" | "default" }; rules?: Record<string, unknown>; urls?: string[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateAWafOverrideResponse = Schema.Struct({
  result: Schema.Struct({
  description: Schema.optional(Schema.String),
  groups: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
  id: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  rewrite_action: Schema.optional(Schema.Struct({
  block: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  challenge: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  default: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  disable: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  simulate: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default"))
})),
  rules: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Literal("challenge", "block", "simulate", "disable", "default") })),
  urls: Schema.optional(Schema.Array(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateAWafOverrideResponse" }) as unknown as Schema.Schema<CreateAWafOverrideResponse>;

export const createAWafOverride: (
  input: CreateAWafOverrideRequest
) => Effect.Effect<
  CreateAWafOverrideResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAWafOverrideRequest,
  output: CreateAWafOverrideResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetAWafOverrideRequest {
  overrides_id: string;
  zone_id: string;
}

export const GetAWafOverrideRequest = Schema.Struct({
  overrides_id: Schema.String.pipe(T.HttpPath("overrides_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/overrides/{overrides_id}" }),
).annotations({ identifier: "GetAWafOverrideRequest" }) as unknown as Schema.Schema<GetAWafOverrideRequest>;

export interface GetAWafOverrideResponse {
  result: { description?: string; groups?: Record<string, unknown>; id?: string; paused?: boolean; priority?: number; rewrite_action?: { block?: "challenge" | "block" | "simulate" | "disable" | "default"; challenge?: "challenge" | "block" | "simulate" | "disable" | "default"; default?: "challenge" | "block" | "simulate" | "disable" | "default"; disable?: "challenge" | "block" | "simulate" | "disable" | "default"; simulate?: "challenge" | "block" | "simulate" | "disable" | "default" }; rules?: Record<string, unknown>; urls?: string[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetAWafOverrideResponse = Schema.Struct({
  result: Schema.Struct({
  description: Schema.optional(Schema.String),
  groups: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
  id: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  rewrite_action: Schema.optional(Schema.Struct({
  block: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  challenge: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  default: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  disable: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  simulate: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default"))
})),
  rules: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Literal("challenge", "block", "simulate", "disable", "default") })),
  urls: Schema.optional(Schema.Array(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetAWafOverrideResponse" }) as unknown as Schema.Schema<GetAWafOverrideResponse>;

export const getAWafOverride: (
  input: GetAWafOverrideRequest
) => Effect.Effect<
  GetAWafOverrideResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAWafOverrideRequest,
  output: GetAWafOverrideResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateWafOverrideRequest {
  overrides_id: string;
  zone_id: string;
  body: { id: string; rewrite_action: { block?: "challenge" | "block" | "simulate" | "disable" | "default"; challenge?: "challenge" | "block" | "simulate" | "disable" | "default"; default?: "challenge" | "block" | "simulate" | "disable" | "default"; disable?: "challenge" | "block" | "simulate" | "disable" | "default"; simulate?: "challenge" | "block" | "simulate" | "disable" | "default" }; rules: Record<string, unknown>; urls: string[] };
}

export const UpdateWafOverrideRequest = Schema.Struct({
  overrides_id: Schema.String.pipe(T.HttpPath("overrides_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  id: Schema.String,
  rewrite_action: Schema.Struct({
  block: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  challenge: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  default: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  disable: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  simulate: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default"))
}),
  rules: Schema.Record({ key: Schema.String, value: Schema.Literal("challenge", "block", "simulate", "disable", "default") }),
  urls: Schema.Array(Schema.String)
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/firewall/waf/overrides/{overrides_id}" }),
).annotations({ identifier: "UpdateWafOverrideRequest" }) as unknown as Schema.Schema<UpdateWafOverrideRequest>;

export interface UpdateWafOverrideResponse {
  result: { description?: string; groups?: Record<string, unknown>; id?: string; paused?: boolean; priority?: number; rewrite_action?: { block?: "challenge" | "block" | "simulate" | "disable" | "default"; challenge?: "challenge" | "block" | "simulate" | "disable" | "default"; default?: "challenge" | "block" | "simulate" | "disable" | "default"; disable?: "challenge" | "block" | "simulate" | "disable" | "default"; simulate?: "challenge" | "block" | "simulate" | "disable" | "default" }; rules?: Record<string, unknown>; urls?: string[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateWafOverrideResponse = Schema.Struct({
  result: Schema.Struct({
  description: Schema.optional(Schema.String),
  groups: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Unknown })),
  id: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  rewrite_action: Schema.optional(Schema.Struct({
  block: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  challenge: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  default: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  disable: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default")),
  simulate: Schema.optional(Schema.Literal("challenge", "block", "simulate", "disable", "default"))
})),
  rules: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.Literal("challenge", "block", "simulate", "disable", "default") })),
  urls: Schema.optional(Schema.Array(Schema.String))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateWafOverrideResponse" }) as unknown as Schema.Schema<UpdateWafOverrideResponse>;

export const updateWafOverride: (
  input: UpdateWafOverrideRequest
) => Effect.Effect<
  UpdateWafOverrideResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateWafOverrideRequest,
  output: UpdateWafOverrideResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteAWafOverrideRequest {
  overrides_id: string;
  zone_id: string;
}

export const DeleteAWafOverrideRequest = Schema.Struct({
  overrides_id: Schema.String.pipe(T.HttpPath("overrides_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/firewall/waf/overrides/{overrides_id}" }),
).annotations({ identifier: "DeleteAWafOverrideRequest" }) as unknown as Schema.Schema<DeleteAWafOverrideRequest>;

export interface DeleteAWafOverrideResponse {
  result: { id?: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteAWafOverrideResponse = Schema.Struct({
  result: Schema.Struct({
  id: Schema.optional(Schema.String)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteAWafOverrideResponse" }) as unknown as Schema.Schema<DeleteAWafOverrideResponse>;

export const deleteAWafOverride: (
  input: DeleteAWafOverrideRequest
) => Effect.Effect<
  DeleteAWafOverrideResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAWafOverrideRequest,
  output: DeleteAWafOverrideResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListWafPackagesRequest {
  zone_id: string;
  page?: number;
  per_page?: number;
  order?: "name";
  direction?: "asc" | "desc";
  match?: "any" | "all";
  name?: string;
}

export const ListWafPackagesRequest = Schema.Struct({
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("name")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
  match: Schema.optional(Schema.Literal("any", "all")).pipe(T.HttpQuery("match")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/packages" }),
).annotations({ identifier: "ListWafPackagesRequest" }) as unknown as Schema.Schema<ListWafPackagesRequest>;

export interface ListWafPackagesResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListWafPackagesResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListWafPackagesResponse" }) as unknown as Schema.Schema<ListWafPackagesResponse>;

export const listWafPackages: (
  input: ListWafPackagesRequest
) => Effect.Effect<
  ListWafPackagesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWafPackagesRequest,
  output: ListWafPackagesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetAWafPackageRequest {
  package_id: string;
  zone_id: string;
}

export const GetAWafPackageRequest = Schema.Struct({
  package_id: Schema.String.pipe(T.HttpPath("package_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/packages/{package_id}" }),
).annotations({ identifier: "GetAWafPackageRequest" }) as unknown as Schema.Schema<GetAWafPackageRequest>;

export interface GetAWafPackageResponse {
  result: unknown | null;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetAWafPackageResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetAWafPackageResponse" }) as unknown as Schema.Schema<GetAWafPackageResponse>;

export const getAWafPackage: (
  input: GetAWafPackageRequest
) => Effect.Effect<
  GetAWafPackageResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAWafPackageRequest,
  output: GetAWafPackageResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateAWafPackageRequest {
  package_id: string;
  zone_id: string;
  body: { action_mode?: "simulate" | "block" | "challenge"; sensitivity?: "high" | "medium" | "low" | "off" };
}

export const UpdateAWafPackageRequest = Schema.Struct({
  package_id: Schema.String.pipe(T.HttpPath("package_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  action_mode: Schema.optional(Schema.Literal("simulate", "block", "challenge")),
  sensitivity: Schema.optional(Schema.Literal("high", "medium", "low", "off"))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/firewall/waf/packages/{package_id}" }),
).annotations({ identifier: "UpdateAWafPackageRequest" }) as unknown as Schema.Schema<UpdateAWafPackageRequest>;

export interface UpdateAWafPackageResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAWafPackageResponse = Schema.Struct({
  result: Schema.Struct({
  action_mode: Schema.optional(Schema.Literal("simulate", "block", "challenge")),
  description: Schema.optional(Schema.String),
  detection_mode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  sensitivity: Schema.optional(Schema.Literal("high", "medium", "low", "off"))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateAWafPackageResponse" }) as unknown as Schema.Schema<UpdateAWafPackageResponse>;

export const updateAWafPackage: (
  input: UpdateAWafPackageRequest
) => Effect.Effect<
  UpdateAWafPackageResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAWafPackageRequest,
  output: UpdateAWafPackageResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListWafRuleGroupsRequest {
  package_id: string;
  zone_id: string;
  mode?: unknown;
  page?: number;
  per_page?: number;
  order?: "mode" | "rules_count";
  direction?: "asc" | "desc";
  match?: "any" | "all";
  name?: string;
  rules_count?: number;
}

export const ListWafRuleGroupsRequest = Schema.Struct({
  package_id: Schema.String.pipe(T.HttpPath("package_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  mode: Schema.optional(Schema.Literal("on", "off")).pipe(T.HttpQuery("mode")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("mode", "rules_count")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
  match: Schema.optional(Schema.Literal("any", "all")).pipe(T.HttpQuery("match")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  rules_count: Schema.optional(Schema.Number).pipe(T.HttpQuery("rules_count"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/packages/{package_id}/groups" }),
).annotations({ identifier: "ListWafRuleGroupsRequest" }) as unknown as Schema.Schema<ListWafRuleGroupsRequest>;

export interface ListWafRuleGroupsResponse {
  result: Record<string, unknown>[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListWafRuleGroupsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListWafRuleGroupsResponse" }) as unknown as Schema.Schema<ListWafRuleGroupsResponse>;

export const listWafRuleGroups: (
  input: ListWafRuleGroupsRequest
) => Effect.Effect<
  ListWafRuleGroupsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWafRuleGroupsRequest,
  output: ListWafRuleGroupsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetAWafRuleGroupRequest {
  group_id: string;
  package_id: string;
  zone_id: string;
}

export const GetAWafRuleGroupRequest = Schema.Struct({
  group_id: Schema.String.pipe(T.HttpPath("group_id")),
  package_id: Schema.String.pipe(T.HttpPath("package_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/packages/{package_id}/groups/{group_id}" }),
).annotations({ identifier: "GetAWafRuleGroupRequest" }) as unknown as Schema.Schema<GetAWafRuleGroupRequest>;

export interface GetAWafRuleGroupResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetAWafRuleGroupResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetAWafRuleGroupResponse" }) as unknown as Schema.Schema<GetAWafRuleGroupResponse>;

export const getAWafRuleGroup: (
  input: GetAWafRuleGroupRequest
) => Effect.Effect<
  GetAWafRuleGroupResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAWafRuleGroupRequest,
  output: GetAWafRuleGroupResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateAWafRuleGroupRequest {
  group_id: string;
  package_id: string;
  zone_id: string;
  body: { mode?: "on" | "off" };
}

export const UpdateAWafRuleGroupRequest = Schema.Struct({
  group_id: Schema.String.pipe(T.HttpPath("group_id")),
  package_id: Schema.String.pipe(T.HttpPath("package_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  mode: Schema.optional(Schema.Literal("on", "off"))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/firewall/waf/packages/{package_id}/groups/{group_id}" }),
).annotations({ identifier: "UpdateAWafRuleGroupRequest" }) as unknown as Schema.Schema<UpdateAWafRuleGroupRequest>;

export interface UpdateAWafRuleGroupResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAWafRuleGroupResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateAWafRuleGroupResponse" }) as unknown as Schema.Schema<UpdateAWafRuleGroupResponse>;

export const updateAWafRuleGroup: (
  input: UpdateAWafRuleGroupRequest
) => Effect.Effect<
  UpdateAWafRuleGroupResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAWafRuleGroupRequest,
  output: UpdateAWafRuleGroupResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface ListWafRulesRequest {
  package_id: string;
  zone_id: string;
  mode?: "DIS" | "CHL" | "BLK" | "SIM";
  group_id?: unknown;
  page?: number;
  per_page?: number;
  order?: "priority" | "group_id" | "description";
  direction?: "asc" | "desc";
  match?: "any" | "all";
  description?: string;
  priority?: string;
}

export const ListWafRulesRequest = Schema.Struct({
  package_id: Schema.String.pipe(T.HttpPath("package_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  mode: Schema.optional(Schema.Literal("DIS", "CHL", "BLK", "SIM")).pipe(T.HttpQuery("mode")),
  group_id: Schema.optional(Schema.String).pipe(T.HttpQuery("group_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  order: Schema.optional(Schema.Literal("priority", "group_id", "description")).pipe(T.HttpQuery("order")),
  direction: Schema.optional(Schema.Literal("asc", "desc")).pipe(T.HttpQuery("direction")),
  match: Schema.optional(Schema.Literal("any", "all")).pipe(T.HttpQuery("match")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  priority: Schema.optional(Schema.String).pipe(T.HttpQuery("priority"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/packages/{package_id}/rules" }),
).annotations({ identifier: "ListWafRulesRequest" }) as unknown as Schema.Schema<ListWafRulesRequest>;

export interface ListWafRulesResponse {
  result: unknown[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListWafRulesResponse = Schema.Struct({
  result: Schema.Array(Schema.Union(Schema.Struct({}), Schema.Struct({
  allowed_modes: Schema.optional(Schema.Array(Schema.Literal("default", "disable", "simulate", "block", "challenge"))),
  default_mode: Schema.optional(Schema.Literal("disable", "simulate", "block", "challenge")),
  mode: Schema.optional(Schema.Literal("default", "disable", "simulate", "block", "challenge"))
}), Schema.Struct({
  allowed_modes: Schema.optional(Schema.Array(Schema.Literal("on", "off"))),
  mode: Schema.optional(Schema.Literal("on", "off"))
}))),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListWafRulesResponse" }) as unknown as Schema.Schema<ListWafRulesResponse>;

export const listWafRules: (
  input: ListWafRulesRequest
) => Effect.Effect<
  ListWafRulesResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWafRulesRequest,
  output: ListWafRulesResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetAWafRuleRequest {
  rule_id: string;
  package_id: string;
  zone_id: string;
}

export const GetAWafRuleRequest = Schema.Struct({
  rule_id: Schema.String.pipe(T.HttpPath("rule_id")),
  package_id: Schema.String.pipe(T.HttpPath("package_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id"))
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{rule_id}" }),
).annotations({ identifier: "GetAWafRuleRequest" }) as unknown as Schema.Schema<GetAWafRuleRequest>;

export interface GetAWafRuleResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetAWafRuleResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetAWafRuleResponse" }) as unknown as Schema.Schema<GetAWafRuleResponse>;

export const getAWafRule: (
  input: GetAWafRuleRequest
) => Effect.Effect<
  GetAWafRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAWafRuleRequest,
  output: GetAWafRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateAWafRuleRequest {
  rule_id: string;
  package_id: string;
  zone_id: string;
  body: { mode?: "default" | "disable" | "simulate" | "block" | "challenge" | "on" | "off" };
}

export const UpdateAWafRuleRequest = Schema.Struct({
  rule_id: Schema.String.pipe(T.HttpPath("rule_id")),
  package_id: Schema.String.pipe(T.HttpPath("package_id")),
  zone_id: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Struct({
  mode: Schema.optional(Schema.Literal("default", "disable", "simulate", "block", "challenge", "on", "off"))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{rule_id}" }),
).annotations({ identifier: "UpdateAWafRuleRequest" }) as unknown as Schema.Schema<UpdateAWafRuleRequest>;

export interface UpdateAWafRuleResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateAWafRuleResponse = Schema.Struct({
  result: Schema.Union(Schema.Struct({}), Schema.Struct({
  allowed_modes: Schema.optional(Schema.Array(Schema.Literal("default", "disable", "simulate", "block", "challenge"))),
  default_mode: Schema.optional(Schema.Literal("disable", "simulate", "block", "challenge")),
  mode: Schema.optional(Schema.Literal("default", "disable", "simulate", "block", "challenge"))
}), Schema.Struct({
  allowed_modes: Schema.optional(Schema.Array(Schema.Literal("on", "off"))),
  mode: Schema.optional(Schema.Literal("on", "off"))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateAWafRuleResponse" }) as unknown as Schema.Schema<UpdateAWafRuleResponse>;

export const updateAWafRule: (
  input: UpdateAWafRuleRequest
) => Effect.Effect<
  UpdateAWafRuleResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAWafRuleRequest,
  output: UpdateAWafRuleResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
