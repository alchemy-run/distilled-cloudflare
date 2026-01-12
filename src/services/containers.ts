/**
 * Cloudflare CONTAINERS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service containers
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

export interface PubliclistapplicationsRequest {
  name?: string;
  image?: string;
}

export const PubliclistapplicationsRequest = Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  image: Schema.optional(Schema.String).pipe(T.HttpQuery("image"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/containers" }),
).annotations({ identifier: "PubliclistapplicationsRequest" }) as unknown as Schema.Schema<PubliclistapplicationsRequest>;

export interface PubliclistapplicationsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PubliclistapplicationsResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PubliclistapplicationsResponse" }) as unknown as Schema.Schema<PubliclistapplicationsResponse>;

export const publiclistapplications: (
  input: PubliclistapplicationsRequest
) => Effect.Effect<
  PubliclistapplicationsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PubliclistapplicationsRequest,
  output: PubliclistapplicationsResponse,
  errors: [],
}));

export interface GenerateimageregistrycredentialsRequest {
  domain: string;
  body: { expiration_minutes: number; permissions: "pull" | "push"[] };
}

export const GenerateimageregistrycredentialsRequest = Schema.Struct({
  domain: Schema.String.pipe(T.HttpPath("domain")),
  body: Schema.Struct({
  expiration_minutes: Schema.Number,
  permissions: Schema.Array(Schema.Literal("pull", "push"))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/containers/registries/{domain}/credentials" }),
).annotations({ identifier: "GenerateimageregistrycredentialsRequest" }) as unknown as Schema.Schema<GenerateimageregistrycredentialsRequest>;

export interface GenerateimageregistrycredentialsResponse {
  result: unknown;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GenerateimageregistrycredentialsResponse = Schema.Struct({
  result: Schema.Unknown,
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GenerateimageregistrycredentialsResponse" }) as unknown as Schema.Schema<GenerateimageregistrycredentialsResponse>;

export const generateimageregistrycredentials: (
  input: GenerateimageregistrycredentialsRequest
) => Effect.Effect<
  GenerateimageregistrycredentialsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateimageregistrycredentialsRequest,
  output: GenerateimageregistrycredentialsResponse,
  errors: [],
}));

export interface ListcontainerapplicationsRequest {
  account_id: string;
}

export const ListcontainerapplicationsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/containers/applications" }),
).annotations({ identifier: "ListcontainerapplicationsRequest" }) as unknown as Schema.Schema<ListcontainerapplicationsRequest>;

export interface ListcontainerapplicationsResponse {
  result: { result?: { id?: string; name?: string; account_id?: string; scheduling_policy?: string; instances?: number; max_instances?: number; created_at?: string; version?: number; durable_object_namespace_id?: string; constraints?: { tier?: number }; configuration?: { image: string; instance_type?: string; vcpu?: number; memory?: string; observability?: { logs?: { enabled?: boolean } }; ssh_public_key_ids?: string[]; secrets?: { name?: string; type?: "env"; secret?: string }[]; disk?: { size?: string }; environment_variables?: { name?: string; value?: string }[]; labels?: { name?: string; value?: string }[]; network?: { assign_ipv4?: "none" | "predefined" | "account"; assign_ipv6?: "none" | "predefined" | "account"; mode?: "public" | "private" }; command?: string[]; entrypoint?: string[]; dns?: { servers?: string[]; searches?: string[] }; ports?: { name?: string; port?: number }[]; checks?: { name?: string; type?: "http" | "tcp"; tls?: boolean; port?: string; http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> }; interval?: string; timeout?: string; retries?: number; kind?: "health" | "ready" }[] }; durable_objects?: { namespace_id?: string }; health?: { instances?: Record<string, unknown> } }[] };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const ListcontainerapplicationsResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Array(Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  account_id: Schema.optional(Schema.String),
  scheduling_policy: Schema.optional(Schema.String),
  instances: Schema.optional(Schema.Number),
  max_instances: Schema.optional(Schema.Number),
  created_at: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  durable_object_namespace_id: Schema.optional(Schema.String),
  constraints: Schema.optional(Schema.Struct({
  tier: Schema.optional(Schema.Number)
})),
  configuration: Schema.optional(Schema.Struct({
  image: Schema.String,
  instance_type: Schema.optional(Schema.String),
  vcpu: Schema.optional(Schema.Number),
  memory: Schema.optional(Schema.String),
  observability: Schema.optional(Schema.Struct({
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean)
}))
})),
  ssh_public_key_ids: Schema.optional(Schema.Array(Schema.String)),
  secrets: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("env")),
  secret: Schema.optional(Schema.String)
}))),
  disk: Schema.optional(Schema.Struct({
  size: Schema.optional(Schema.String)
})),
  environment_variables: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  labels: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  network: Schema.optional(Schema.Struct({
  assign_ipv4: Schema.optional(Schema.Literal("none", "predefined", "account")),
  assign_ipv6: Schema.optional(Schema.Literal("none", "predefined", "account")),
  mode: Schema.optional(Schema.Literal("public", "private"))
})),
  command: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.Array(Schema.String)),
  dns: Schema.optional(Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  searches: Schema.optional(Schema.Array(Schema.String))
})),
  ports: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number)
}))),
  checks: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("http", "tcp")),
  tls: Schema.optional(Schema.Boolean),
  port: Schema.optional(Schema.String),
  http: Schema.optional(Schema.Struct({
  method: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Struct({}))
})),
  interval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.Literal("health", "ready"))
})))
})),
  durable_objects: Schema.optional(Schema.Struct({
  namespace_id: Schema.optional(Schema.String)
})),
  health: Schema.optional(Schema.Struct({
  instances: Schema.optional(Schema.Struct({}))
}))
})))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "ListcontainerapplicationsResponse" }) as unknown as Schema.Schema<ListcontainerapplicationsResponse>;

export const listcontainerapplications: (
  input: ListcontainerapplicationsRequest
) => Effect.Effect<
  ListcontainerapplicationsResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListcontainerapplicationsRequest,
  output: ListcontainerapplicationsResponse,
  errors: [],
}));

export interface CreatecontainerapplicationRequest {
  account_id: string;
  body: { name: string; max_instances: number; instances?: number; scheduling_policy?: string; configuration: { image: string; instance_type?: string; vcpu?: number; memory?: string; observability?: { logs?: { enabled?: boolean } }; ssh_public_key_ids?: string[]; secrets?: { name?: string; type?: "env"; secret?: string }[]; disk?: { size?: string }; environment_variables?: { name?: string; value?: string }[]; labels?: { name?: string; value?: string }[]; network?: { assign_ipv4?: "none" | "predefined" | "account"; assign_ipv6?: "none" | "predefined" | "account"; mode?: "public" | "private" }; command?: string[]; entrypoint?: string[]; dns?: { servers?: string[]; searches?: string[] }; ports?: { name?: string; port?: number }[]; checks?: { name?: string; type?: "http" | "tcp"; tls?: boolean; port?: string; http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> }; interval?: string; timeout?: string; retries?: number; kind?: "health" | "ready" }[] }; durable_objects?: { namespace_id?: string }; constraints?: { tier?: number }; affinities?: { colocation?: "datacenter" } };
}

export const CreatecontainerapplicationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  name: Schema.String,
  max_instances: Schema.Number,
  instances: Schema.optional(Schema.Number),
  scheduling_policy: Schema.optional(Schema.String),
  configuration: Schema.Struct({
  image: Schema.String,
  instance_type: Schema.optional(Schema.String),
  vcpu: Schema.optional(Schema.Number),
  memory: Schema.optional(Schema.String),
  observability: Schema.optional(Schema.Struct({
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean)
}))
})),
  ssh_public_key_ids: Schema.optional(Schema.Array(Schema.String)),
  secrets: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("env")),
  secret: Schema.optional(Schema.String)
}))),
  disk: Schema.optional(Schema.Struct({
  size: Schema.optional(Schema.String)
})),
  environment_variables: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  labels: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  network: Schema.optional(Schema.Struct({
  assign_ipv4: Schema.optional(Schema.Literal("none", "predefined", "account")),
  assign_ipv6: Schema.optional(Schema.Literal("none", "predefined", "account")),
  mode: Schema.optional(Schema.Literal("public", "private"))
})),
  command: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.Array(Schema.String)),
  dns: Schema.optional(Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  searches: Schema.optional(Schema.Array(Schema.String))
})),
  ports: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number)
}))),
  checks: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("http", "tcp")),
  tls: Schema.optional(Schema.Boolean),
  port: Schema.optional(Schema.String),
  http: Schema.optional(Schema.Struct({
  method: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Struct({}))
})),
  interval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.Literal("health", "ready"))
})))
}),
  durable_objects: Schema.optional(Schema.Struct({
  namespace_id: Schema.optional(Schema.String)
})),
  constraints: Schema.optional(Schema.Struct({
  tier: Schema.optional(Schema.Number)
})),
  affinities: Schema.optional(Schema.Struct({
  colocation: Schema.optional(Schema.Literal("datacenter"))
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/containers/applications" }),
).annotations({ identifier: "CreatecontainerapplicationRequest" }) as unknown as Schema.Schema<CreatecontainerapplicationRequest>;

export interface CreatecontainerapplicationResponse {
  result: { result?: { id?: string; name?: string; account_id?: string; scheduling_policy?: string; instances?: number; max_instances?: number; created_at?: string; version?: number; durable_object_namespace_id?: string; constraints?: { tier?: number }; configuration?: { image: string; instance_type?: string; vcpu?: number; memory?: string; observability?: { logs?: { enabled?: boolean } }; ssh_public_key_ids?: string[]; secrets?: { name?: string; type?: "env"; secret?: string }[]; disk?: { size?: string }; environment_variables?: { name?: string; value?: string }[]; labels?: { name?: string; value?: string }[]; network?: { assign_ipv4?: "none" | "predefined" | "account"; assign_ipv6?: "none" | "predefined" | "account"; mode?: "public" | "private" }; command?: string[]; entrypoint?: string[]; dns?: { servers?: string[]; searches?: string[] }; ports?: { name?: string; port?: number }[]; checks?: { name?: string; type?: "http" | "tcp"; tls?: boolean; port?: string; http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> }; interval?: string; timeout?: string; retries?: number; kind?: "health" | "ready" }[] }; durable_objects?: { namespace_id?: string }; health?: { instances?: Record<string, unknown> } } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreatecontainerapplicationResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  account_id: Schema.optional(Schema.String),
  scheduling_policy: Schema.optional(Schema.String),
  instances: Schema.optional(Schema.Number),
  max_instances: Schema.optional(Schema.Number),
  created_at: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  durable_object_namespace_id: Schema.optional(Schema.String),
  constraints: Schema.optional(Schema.Struct({
  tier: Schema.optional(Schema.Number)
})),
  configuration: Schema.optional(Schema.Struct({
  image: Schema.String,
  instance_type: Schema.optional(Schema.String),
  vcpu: Schema.optional(Schema.Number),
  memory: Schema.optional(Schema.String),
  observability: Schema.optional(Schema.Struct({
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean)
}))
})),
  ssh_public_key_ids: Schema.optional(Schema.Array(Schema.String)),
  secrets: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("env")),
  secret: Schema.optional(Schema.String)
}))),
  disk: Schema.optional(Schema.Struct({
  size: Schema.optional(Schema.String)
})),
  environment_variables: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  labels: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  network: Schema.optional(Schema.Struct({
  assign_ipv4: Schema.optional(Schema.Literal("none", "predefined", "account")),
  assign_ipv6: Schema.optional(Schema.Literal("none", "predefined", "account")),
  mode: Schema.optional(Schema.Literal("public", "private"))
})),
  command: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.Array(Schema.String)),
  dns: Schema.optional(Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  searches: Schema.optional(Schema.Array(Schema.String))
})),
  ports: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number)
}))),
  checks: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("http", "tcp")),
  tls: Schema.optional(Schema.Boolean),
  port: Schema.optional(Schema.String),
  http: Schema.optional(Schema.Struct({
  method: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Struct({}))
})),
  interval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.Literal("health", "ready"))
})))
})),
  durable_objects: Schema.optional(Schema.Struct({
  namespace_id: Schema.optional(Schema.String)
})),
  health: Schema.optional(Schema.Struct({
  instances: Schema.optional(Schema.Struct({}))
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreatecontainerapplicationResponse" }) as unknown as Schema.Schema<CreatecontainerapplicationResponse>;

export const createcontainerapplication: (
  input: CreatecontainerapplicationRequest
) => Effect.Effect<
  CreatecontainerapplicationResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatecontainerapplicationRequest,
  output: CreatecontainerapplicationResponse,
  errors: [],
}));

export interface GetcontainerapplicationRequest {
  account_id: string;
  application_id: string;
}

export const GetcontainerapplicationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  application_id: Schema.String.pipe(T.HttpPath("application_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/containers/applications/{application_id}" }),
).annotations({ identifier: "GetcontainerapplicationRequest" }) as unknown as Schema.Schema<GetcontainerapplicationRequest>;

export interface GetcontainerapplicationResponse {
  result: { result?: { id?: string; name?: string; account_id?: string; scheduling_policy?: string; instances?: number; max_instances?: number; created_at?: string; version?: number; durable_object_namespace_id?: string; constraints?: { tier?: number }; configuration?: { image: string; instance_type?: string; vcpu?: number; memory?: string; observability?: { logs?: { enabled?: boolean } }; ssh_public_key_ids?: string[]; secrets?: { name?: string; type?: "env"; secret?: string }[]; disk?: { size?: string }; environment_variables?: { name?: string; value?: string }[]; labels?: { name?: string; value?: string }[]; network?: { assign_ipv4?: "none" | "predefined" | "account"; assign_ipv6?: "none" | "predefined" | "account"; mode?: "public" | "private" }; command?: string[]; entrypoint?: string[]; dns?: { servers?: string[]; searches?: string[] }; ports?: { name?: string; port?: number }[]; checks?: { name?: string; type?: "http" | "tcp"; tls?: boolean; port?: string; http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> }; interval?: string; timeout?: string; retries?: number; kind?: "health" | "ready" }[] }; durable_objects?: { namespace_id?: string }; health?: { instances?: Record<string, unknown> } } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetcontainerapplicationResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  account_id: Schema.optional(Schema.String),
  scheduling_policy: Schema.optional(Schema.String),
  instances: Schema.optional(Schema.Number),
  max_instances: Schema.optional(Schema.Number),
  created_at: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  durable_object_namespace_id: Schema.optional(Schema.String),
  constraints: Schema.optional(Schema.Struct({
  tier: Schema.optional(Schema.Number)
})),
  configuration: Schema.optional(Schema.Struct({
  image: Schema.String,
  instance_type: Schema.optional(Schema.String),
  vcpu: Schema.optional(Schema.Number),
  memory: Schema.optional(Schema.String),
  observability: Schema.optional(Schema.Struct({
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean)
}))
})),
  ssh_public_key_ids: Schema.optional(Schema.Array(Schema.String)),
  secrets: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("env")),
  secret: Schema.optional(Schema.String)
}))),
  disk: Schema.optional(Schema.Struct({
  size: Schema.optional(Schema.String)
})),
  environment_variables: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  labels: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  network: Schema.optional(Schema.Struct({
  assign_ipv4: Schema.optional(Schema.Literal("none", "predefined", "account")),
  assign_ipv6: Schema.optional(Schema.Literal("none", "predefined", "account")),
  mode: Schema.optional(Schema.Literal("public", "private"))
})),
  command: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.Array(Schema.String)),
  dns: Schema.optional(Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  searches: Schema.optional(Schema.Array(Schema.String))
})),
  ports: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number)
}))),
  checks: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("http", "tcp")),
  tls: Schema.optional(Schema.Boolean),
  port: Schema.optional(Schema.String),
  http: Schema.optional(Schema.Struct({
  method: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Struct({}))
})),
  interval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.Literal("health", "ready"))
})))
})),
  durable_objects: Schema.optional(Schema.Struct({
  namespace_id: Schema.optional(Schema.String)
})),
  health: Schema.optional(Schema.Struct({
  instances: Schema.optional(Schema.Struct({}))
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetcontainerapplicationResponse" }) as unknown as Schema.Schema<GetcontainerapplicationResponse>;

export const getcontainerapplication: (
  input: GetcontainerapplicationRequest
) => Effect.Effect<
  GetcontainerapplicationResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetcontainerapplicationRequest,
  output: GetcontainerapplicationResponse,
  errors: [],
}));

export interface DeletecontainerapplicationRequest {
  account_id: string;
  application_id: string;
}

export const DeletecontainerapplicationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  application_id: Schema.String.pipe(T.HttpPath("application_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/containers/applications/{application_id}" }),
).annotations({ identifier: "DeletecontainerapplicationRequest" }) as unknown as Schema.Schema<DeletecontainerapplicationRequest>;

export interface DeletecontainerapplicationResponse {
  result: { result?: Record<string, unknown> };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeletecontainerapplicationResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeletecontainerapplicationResponse" }) as unknown as Schema.Schema<DeletecontainerapplicationResponse>;

export const deletecontainerapplication: (
  input: DeletecontainerapplicationRequest
) => Effect.Effect<
  DeletecontainerapplicationResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletecontainerapplicationRequest,
  output: DeletecontainerapplicationResponse,
  errors: [],
}));

export interface UpdatecontainerapplicationRequest {
  account_id: string;
  application_id: string;
  body: { instances?: number; max_instances?: number; scheduling_policy?: string; configuration?: { image: string; instance_type?: string; vcpu?: number; memory?: string; observability?: { logs?: { enabled?: boolean } }; ssh_public_key_ids?: string[]; secrets?: { name?: string; type?: "env"; secret?: string }[]; disk?: { size?: string }; environment_variables?: { name?: string; value?: string }[]; labels?: { name?: string; value?: string }[]; network?: { assign_ipv4?: "none" | "predefined" | "account"; assign_ipv6?: "none" | "predefined" | "account"; mode?: "public" | "private" }; command?: string[]; entrypoint?: string[]; dns?: { servers?: string[]; searches?: string[] }; ports?: { name?: string; port?: number }[]; checks?: { name?: string; type?: "http" | "tcp"; tls?: boolean; port?: string; http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> }; interval?: string; timeout?: string; retries?: number; kind?: "health" | "ready" }[] }; constraints?: { tier?: number; region?: string; regions?: string[]; cities?: string[] }; affinities?: { colocation?: "datacenter" } };
}

export const UpdatecontainerapplicationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  application_id: Schema.String.pipe(T.HttpPath("application_id")),
  body: Schema.Struct({
  instances: Schema.optional(Schema.Number),
  max_instances: Schema.optional(Schema.Number),
  scheduling_policy: Schema.optional(Schema.String),
  configuration: Schema.optional(Schema.Struct({
  image: Schema.String,
  instance_type: Schema.optional(Schema.String),
  vcpu: Schema.optional(Schema.Number),
  memory: Schema.optional(Schema.String),
  observability: Schema.optional(Schema.Struct({
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean)
}))
})),
  ssh_public_key_ids: Schema.optional(Schema.Array(Schema.String)),
  secrets: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("env")),
  secret: Schema.optional(Schema.String)
}))),
  disk: Schema.optional(Schema.Struct({
  size: Schema.optional(Schema.String)
})),
  environment_variables: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  labels: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  network: Schema.optional(Schema.Struct({
  assign_ipv4: Schema.optional(Schema.Literal("none", "predefined", "account")),
  assign_ipv6: Schema.optional(Schema.Literal("none", "predefined", "account")),
  mode: Schema.optional(Schema.Literal("public", "private"))
})),
  command: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.Array(Schema.String)),
  dns: Schema.optional(Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  searches: Schema.optional(Schema.Array(Schema.String))
})),
  ports: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number)
}))),
  checks: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("http", "tcp")),
  tls: Schema.optional(Schema.Boolean),
  port: Schema.optional(Schema.String),
  http: Schema.optional(Schema.Struct({
  method: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Struct({}))
})),
  interval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.Literal("health", "ready"))
})))
})),
  constraints: Schema.optional(Schema.Struct({
  tier: Schema.optional(Schema.Number),
  region: Schema.optional(Schema.String),
  regions: Schema.optional(Schema.Array(Schema.String)),
  cities: Schema.optional(Schema.Array(Schema.String))
})),
  affinities: Schema.optional(Schema.Struct({
  colocation: Schema.optional(Schema.Literal("datacenter"))
}))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/containers/applications/{application_id}" }),
).annotations({ identifier: "UpdatecontainerapplicationRequest" }) as unknown as Schema.Schema<UpdatecontainerapplicationRequest>;

export interface UpdatecontainerapplicationResponse {
  result: { result?: { id?: string; name?: string; account_id?: string; scheduling_policy?: string; instances?: number; max_instances?: number; created_at?: string; version?: number; durable_object_namespace_id?: string; constraints?: { tier?: number }; configuration?: { image: string; instance_type?: string; vcpu?: number; memory?: string; observability?: { logs?: { enabled?: boolean } }; ssh_public_key_ids?: string[]; secrets?: { name?: string; type?: "env"; secret?: string }[]; disk?: { size?: string }; environment_variables?: { name?: string; value?: string }[]; labels?: { name?: string; value?: string }[]; network?: { assign_ipv4?: "none" | "predefined" | "account"; assign_ipv6?: "none" | "predefined" | "account"; mode?: "public" | "private" }; command?: string[]; entrypoint?: string[]; dns?: { servers?: string[]; searches?: string[] }; ports?: { name?: string; port?: number }[]; checks?: { name?: string; type?: "http" | "tcp"; tls?: boolean; port?: string; http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> }; interval?: string; timeout?: string; retries?: number; kind?: "health" | "ready" }[] }; durable_objects?: { namespace_id?: string }; health?: { instances?: Record<string, unknown> } } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdatecontainerapplicationResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  account_id: Schema.optional(Schema.String),
  scheduling_policy: Schema.optional(Schema.String),
  instances: Schema.optional(Schema.Number),
  max_instances: Schema.optional(Schema.Number),
  created_at: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  durable_object_namespace_id: Schema.optional(Schema.String),
  constraints: Schema.optional(Schema.Struct({
  tier: Schema.optional(Schema.Number)
})),
  configuration: Schema.optional(Schema.Struct({
  image: Schema.String,
  instance_type: Schema.optional(Schema.String),
  vcpu: Schema.optional(Schema.Number),
  memory: Schema.optional(Schema.String),
  observability: Schema.optional(Schema.Struct({
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean)
}))
})),
  ssh_public_key_ids: Schema.optional(Schema.Array(Schema.String)),
  secrets: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("env")),
  secret: Schema.optional(Schema.String)
}))),
  disk: Schema.optional(Schema.Struct({
  size: Schema.optional(Schema.String)
})),
  environment_variables: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  labels: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  network: Schema.optional(Schema.Struct({
  assign_ipv4: Schema.optional(Schema.Literal("none", "predefined", "account")),
  assign_ipv6: Schema.optional(Schema.Literal("none", "predefined", "account")),
  mode: Schema.optional(Schema.Literal("public", "private"))
})),
  command: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.Array(Schema.String)),
  dns: Schema.optional(Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  searches: Schema.optional(Schema.Array(Schema.String))
})),
  ports: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number)
}))),
  checks: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("http", "tcp")),
  tls: Schema.optional(Schema.Boolean),
  port: Schema.optional(Schema.String),
  http: Schema.optional(Schema.Struct({
  method: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Struct({}))
})),
  interval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.Literal("health", "ready"))
})))
})),
  durable_objects: Schema.optional(Schema.Struct({
  namespace_id: Schema.optional(Schema.String)
})),
  health: Schema.optional(Schema.Struct({
  instances: Schema.optional(Schema.Struct({}))
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdatecontainerapplicationResponse" }) as unknown as Schema.Schema<UpdatecontainerapplicationResponse>;

export const updatecontainerapplication: (
  input: UpdatecontainerapplicationRequest
) => Effect.Effect<
  UpdatecontainerapplicationResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatecontainerapplicationRequest,
  output: UpdatecontainerapplicationResponse,
  errors: [],
}));

export interface CreatecontainerapplicationrolloutRequest {
  account_id: string;
  application_id: string;
  body: { description: string; strategy: "rolling"; kind?: "full_auto"; step_percentage: number; target_configuration: { image: string; instance_type?: string; vcpu?: number; memory?: string; observability?: { logs?: { enabled?: boolean } }; ssh_public_key_ids?: string[]; secrets?: { name?: string; type?: "env"; secret?: string }[]; disk?: { size?: string }; environment_variables?: { name?: string; value?: string }[]; labels?: { name?: string; value?: string }[]; network?: { assign_ipv4?: "none" | "predefined" | "account"; assign_ipv6?: "none" | "predefined" | "account"; mode?: "public" | "private" }; command?: string[]; entrypoint?: string[]; dns?: { servers?: string[]; searches?: string[] }; ports?: { name?: string; port?: number }[]; checks?: { name?: string; type?: "http" | "tcp"; tls?: boolean; port?: string; http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> }; interval?: string; timeout?: string; retries?: number; kind?: "health" | "ready" }[] } };
}

export const CreatecontainerapplicationrolloutRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  application_id: Schema.String.pipe(T.HttpPath("application_id")),
  body: Schema.Struct({
  description: Schema.String,
  strategy: Schema.Literal("rolling"),
  kind: Schema.optional(Schema.Literal("full_auto")),
  step_percentage: Schema.Number,
  target_configuration: Schema.Struct({
  image: Schema.String,
  instance_type: Schema.optional(Schema.String),
  vcpu: Schema.optional(Schema.Number),
  memory: Schema.optional(Schema.String),
  observability: Schema.optional(Schema.Struct({
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean)
}))
})),
  ssh_public_key_ids: Schema.optional(Schema.Array(Schema.String)),
  secrets: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("env")),
  secret: Schema.optional(Schema.String)
}))),
  disk: Schema.optional(Schema.Struct({
  size: Schema.optional(Schema.String)
})),
  environment_variables: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  labels: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  network: Schema.optional(Schema.Struct({
  assign_ipv4: Schema.optional(Schema.Literal("none", "predefined", "account")),
  assign_ipv6: Schema.optional(Schema.Literal("none", "predefined", "account")),
  mode: Schema.optional(Schema.Literal("public", "private"))
})),
  command: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.Array(Schema.String)),
  dns: Schema.optional(Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  searches: Schema.optional(Schema.Array(Schema.String))
})),
  ports: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number)
}))),
  checks: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("http", "tcp")),
  tls: Schema.optional(Schema.Boolean),
  port: Schema.optional(Schema.String),
  http: Schema.optional(Schema.Struct({
  method: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Struct({}))
})),
  interval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.Literal("health", "ready"))
})))
})
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/containers/applications/{application_id}/rollouts" }),
).annotations({ identifier: "CreatecontainerapplicationrolloutRequest" }) as unknown as Schema.Schema<CreatecontainerapplicationrolloutRequest>;

export interface CreatecontainerapplicationrolloutResponse {
  result: { result?: { id?: string; created_at?: string; last_updated_at?: string; description?: string; status?: string; kind?: string; strategy?: string; current_version?: number; target_version?: number; health?: { instances?: { healthy?: number; failed?: number; starting?: number; scheduling?: number } }; current_configuration?: { image?: string; observability?: Record<string, unknown> }; target_configuration?: { image: string; instance_type?: string; vcpu?: number; memory?: string; observability?: { logs?: { enabled?: boolean } }; ssh_public_key_ids?: string[]; secrets?: { name?: string; type?: "env"; secret?: string }[]; disk?: { size?: string }; environment_variables?: { name?: string; value?: string }[]; labels?: { name?: string; value?: string }[]; network?: { assign_ipv4?: "none" | "predefined" | "account"; assign_ipv6?: "none" | "predefined" | "account"; mode?: "public" | "private" }; command?: string[]; entrypoint?: string[]; dns?: { servers?: string[]; searches?: string[] }; ports?: { name?: string; port?: number }[]; checks?: { name?: string; type?: "http" | "tcp"; tls?: boolean; port?: string; http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> }; interval?: string; timeout?: string; retries?: number; kind?: "health" | "ready" }[] }; steps?: { id?: number; status?: string; step_size?: { percentage?: number }; description?: string; started_at?: string }[]; progress?: { total_steps?: number; current_step?: number; updated_instances?: number; total_instances?: number } } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreatecontainerapplicationrolloutResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  id: Schema.optional(Schema.String),
  created_at: Schema.optional(Schema.String),
  last_updated_at: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  strategy: Schema.optional(Schema.String),
  current_version: Schema.optional(Schema.Number),
  target_version: Schema.optional(Schema.Number),
  health: Schema.optional(Schema.Struct({
  instances: Schema.optional(Schema.Struct({
  healthy: Schema.optional(Schema.Number),
  failed: Schema.optional(Schema.Number),
  starting: Schema.optional(Schema.Number),
  scheduling: Schema.optional(Schema.Number)
}))
})),
  current_configuration: Schema.optional(Schema.Struct({
  image: Schema.optional(Schema.String),
  observability: Schema.optional(Schema.Struct({}))
})),
  target_configuration: Schema.optional(Schema.Struct({
  image: Schema.String,
  instance_type: Schema.optional(Schema.String),
  vcpu: Schema.optional(Schema.Number),
  memory: Schema.optional(Schema.String),
  observability: Schema.optional(Schema.Struct({
  logs: Schema.optional(Schema.Struct({
  enabled: Schema.optional(Schema.Boolean)
}))
})),
  ssh_public_key_ids: Schema.optional(Schema.Array(Schema.String)),
  secrets: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("env")),
  secret: Schema.optional(Schema.String)
}))),
  disk: Schema.optional(Schema.Struct({
  size: Schema.optional(Schema.String)
})),
  environment_variables: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  labels: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String)
}))),
  network: Schema.optional(Schema.Struct({
  assign_ipv4: Schema.optional(Schema.Literal("none", "predefined", "account")),
  assign_ipv6: Schema.optional(Schema.Literal("none", "predefined", "account")),
  mode: Schema.optional(Schema.Literal("public", "private"))
})),
  command: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.Array(Schema.String)),
  dns: Schema.optional(Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  searches: Schema.optional(Schema.Array(Schema.String))
})),
  ports: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number)
}))),
  checks: Schema.optional(Schema.Array(Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("http", "tcp")),
  tls: Schema.optional(Schema.Boolean),
  port: Schema.optional(Schema.String),
  http: Schema.optional(Schema.Struct({
  method: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Struct({}))
})),
  interval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.Literal("health", "ready"))
})))
})),
  steps: Schema.optional(Schema.Array(Schema.Struct({
  id: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.String),
  step_size: Schema.optional(Schema.Struct({
  percentage: Schema.optional(Schema.Number)
})),
  description: Schema.optional(Schema.String),
  started_at: Schema.optional(Schema.String)
}))),
  progress: Schema.optional(Schema.Struct({
  total_steps: Schema.optional(Schema.Number),
  current_step: Schema.optional(Schema.Number),
  updated_instances: Schema.optional(Schema.Number),
  total_instances: Schema.optional(Schema.Number)
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreatecontainerapplicationrolloutResponse" }) as unknown as Schema.Schema<CreatecontainerapplicationrolloutResponse>;

export const createcontainerapplicationrollout: (
  input: CreatecontainerapplicationrolloutRequest
) => Effect.Effect<
  CreatecontainerapplicationrolloutResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatecontainerapplicationrolloutRequest,
  output: CreatecontainerapplicationrolloutResponse,
  errors: [],
}));

export interface GetcontaineridentityRequest {
  account_id: string;
}

export const GetcontaineridentityRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/containers/me" }),
).annotations({ identifier: "GetcontaineridentityRequest" }) as unknown as Schema.Schema<GetcontaineridentityRequest>;

export interface GetcontaineridentityResponse {
  result: { result?: { account_id?: string; external_account_id?: string; legacy_identity?: string; capabilities?: string[]; limits?: { account_id?: string; vcpu_per_deployment?: number; memory_mib_per_deployment?: number; memory_per_deployment?: string; disk_per_deployment?: string; disk_mb_per_deployment?: number; total_vcpu?: number; total_memory_mib?: number; node_group?: string; ipv4s?: number; network_modes?: string[]; total_disk_mb?: number; total_memory?: string }; locations?: Record<string, unknown>[]; defaults?: { vcpus?: number; memory_mib?: number; memory?: string; disk_mb?: number } } };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetcontaineridentityResponse = Schema.Struct({
  result: Schema.Struct({
  result: Schema.optional(Schema.Struct({
  account_id: Schema.optional(Schema.String),
  external_account_id: Schema.optional(Schema.String),
  legacy_identity: Schema.optional(Schema.String),
  capabilities: Schema.optional(Schema.Array(Schema.String)),
  limits: Schema.optional(Schema.Struct({
  account_id: Schema.optional(Schema.String),
  vcpu_per_deployment: Schema.optional(Schema.Number),
  memory_mib_per_deployment: Schema.optional(Schema.Number),
  memory_per_deployment: Schema.optional(Schema.String),
  disk_per_deployment: Schema.optional(Schema.String),
  disk_mb_per_deployment: Schema.optional(Schema.Number),
  total_vcpu: Schema.optional(Schema.Number),
  total_memory_mib: Schema.optional(Schema.Number),
  node_group: Schema.optional(Schema.String),
  ipv4s: Schema.optional(Schema.Number),
  network_modes: Schema.optional(Schema.Array(Schema.String)),
  total_disk_mb: Schema.optional(Schema.Number),
  total_memory: Schema.optional(Schema.String)
})),
  locations: Schema.optional(Schema.Array(Schema.Struct({}))),
  defaults: Schema.optional(Schema.Struct({
  vcpus: Schema.optional(Schema.Number),
  memory_mib: Schema.optional(Schema.Number),
  memory: Schema.optional(Schema.String),
  disk_mb: Schema.optional(Schema.Number)
}))
}))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetcontaineridentityResponse" }) as unknown as Schema.Schema<GetcontaineridentityResponse>;

export const getcontaineridentity: (
  input: GetcontaineridentityRequest
) => Effect.Effect<
  GetcontaineridentityResponse,
  CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetcontaineridentityRequest,
  output: GetcontaineridentityResponse,
  errors: [],
}));
