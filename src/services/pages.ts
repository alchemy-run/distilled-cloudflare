/**
 * Cloudflare PAGES API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service pages
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

export interface GetProjectsRequest {
  account_id: string;
  page?: number;
  per_page?: number;
}

export const GetProjectsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pages/projects" }),
).annotations({ identifier: "GetProjectsRequest" }) as unknown as Schema.Schema<GetProjectsRequest>;

export interface GetProjectsResponse {
  result: { build_config?: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag: string; web_analytics_token: string }; canonical_deployment: unknown; created_on: string; deployment_configs: { preview: unknown; production: unknown }; domains?: string[]; framework: string; framework_version: string; id: string; latest_deployment: unknown; name: string; preview_script_name: string; production_branch: string; production_script_name: string; source?: { config: { deployments_enabled: boolean; owner: string; owner_id: string; path_excludes: string[]; path_includes: string[]; pr_comments_enabled: boolean; preview_branch_excludes: string[]; preview_branch_includes: string[]; preview_deployment_setting: "all" | "none" | "custom"; production_branch: string; production_deployments_enabled: boolean; repo_id: string; repo_name: string }; type: "github" | "gitlab" }; subdomain?: string; uses_functions: boolean }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetProjectsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  build_config: Schema.optional(Schema.NullOr(Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.NullOr(Schema.String),
  web_analytics_token: Schema.NullOr(Schema.String)
}))),
  canonical_deployment: Schema.Struct({}),
  created_on: Schema.Date,
  deployment_configs: Schema.Struct({
  preview: Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.Boolean,
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.Number,
  compatibility_date: Schema.String,
  compatibility_flags: Schema.Array(Schema.String),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  fail_open: Schema.Boolean,
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.String,
  service: Schema.String
}) }))),
  usage_model: Schema.Literal("standard", "bundled", "unbound"),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
}),
  production: Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.Boolean,
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.Number,
  compatibility_date: Schema.String,
  compatibility_flags: Schema.Array(Schema.String),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  fail_open: Schema.Boolean,
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.String,
  service: Schema.String
}) }))),
  usage_model: Schema.Literal("standard", "bundled", "unbound"),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
})
}),
  domains: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  framework: Schema.String,
  framework_version: Schema.String,
  id: Schema.String,
  latest_deployment: Schema.Struct({}),
  name: Schema.String,
  preview_script_name: Schema.String,
  production_branch: Schema.String,
  production_script_name: Schema.String,
  source: Schema.optional(Schema.NullOr(Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.Boolean,
  owner: Schema.String,
  owner_id: Schema.String,
  path_excludes: Schema.Array(Schema.String),
  path_includes: Schema.Array(Schema.String),
  pr_comments_enabled: Schema.Boolean,
  preview_branch_excludes: Schema.Array(Schema.String),
  preview_branch_includes: Schema.Array(Schema.String),
  preview_deployment_setting: Schema.Literal("all", "none", "custom"),
  production_branch: Schema.String,
  production_deployments_enabled: Schema.Boolean,
  repo_id: Schema.String,
  repo_name: Schema.String
}),
  type: Schema.Literal("github", "gitlab")
}))),
  subdomain: Schema.optional(Schema.NullOr(Schema.String)),
  uses_functions: Schema.NullOr(Schema.Boolean)
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetProjectsResponse" }) as unknown as Schema.Schema<GetProjectsResponse>;

export const getProjects: (
  input: GetProjectsRequest
) => Effect.Effect<
  GetProjectsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsRequest,
  output: GetProjectsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateProjectRequest {
  account_id: string;
  body: { build_config?: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag?: string; web_analytics_token?: string }; deployment_configs?: { preview?: unknown; production?: unknown }; name: string; production_branch: string; source?: { config: { deployments_enabled?: boolean; owner?: string; owner_id?: string; path_excludes?: string[]; path_includes?: string[]; pr_comments_enabled?: boolean; preview_branch_excludes?: string[]; preview_branch_includes?: string[]; preview_deployment_setting?: "all" | "none" | "custom"; production_branch?: string; production_deployments_enabled?: boolean; repo_id?: string; repo_name?: string }; type: "github" | "gitlab" } };
}

export const CreateProjectRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  build_config: Schema.optional(Schema.NullOr(Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_token: Schema.optional(Schema.NullOr(Schema.String))
}))),
  deployment_configs: Schema.optional(Schema.NullOr(Schema.Struct({
  preview: Schema.optional(Schema.NullOr(Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.optional(Schema.NullOr(Schema.Boolean)),
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.optional(Schema.NullOr(Schema.Number)),
  compatibility_date: Schema.optional(Schema.NullOr(Schema.String)),
  compatibility_flags: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  fail_open: Schema.optional(Schema.NullOr(Schema.Boolean)),
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.optional(Schema.NullOr(Schema.String)),
  service: Schema.String
}) }))),
  usage_model: Schema.optional(Schema.NullOr(Schema.Literal("standard", "bundled", "unbound"))),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
}))),
  production: Schema.optional(Schema.NullOr(Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.optional(Schema.NullOr(Schema.Boolean)),
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.optional(Schema.NullOr(Schema.Number)),
  compatibility_date: Schema.optional(Schema.NullOr(Schema.String)),
  compatibility_flags: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  fail_open: Schema.optional(Schema.NullOr(Schema.Boolean)),
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.optional(Schema.NullOr(Schema.String)),
  service: Schema.String
}) }))),
  usage_model: Schema.optional(Schema.NullOr(Schema.Literal("standard", "bundled", "unbound"))),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
})))
}))),
  name: Schema.String,
  production_branch: Schema.String,
  source: Schema.optional(Schema.NullOr(Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  owner: Schema.optional(Schema.NullOr(Schema.String)),
  owner_id: Schema.optional(Schema.NullOr(Schema.String)),
  path_excludes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  path_includes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  pr_comments_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  preview_branch_excludes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  preview_branch_includes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  preview_deployment_setting: Schema.optional(Schema.NullOr(Schema.Literal("all", "none", "custom"))),
  production_branch: Schema.optional(Schema.NullOr(Schema.String)),
  production_deployments_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  repo_id: Schema.optional(Schema.NullOr(Schema.String)),
  repo_name: Schema.optional(Schema.NullOr(Schema.String))
}),
  type: Schema.Literal("github", "gitlab")
})))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/pages/projects" }),
).annotations({ identifier: "CreateProjectRequest" }) as unknown as Schema.Schema<CreateProjectRequest>;

export interface CreateProjectResponse {
  result: { build_config?: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag: string; web_analytics_token: string }; canonical_deployment: unknown; created_on: string; deployment_configs: { preview: unknown; production: unknown }; domains?: string[]; framework: string; framework_version: string; id: string; latest_deployment: unknown; name: string; preview_script_name: string; production_branch: string; production_script_name: string; source?: { config: { deployments_enabled: boolean; owner: string; owner_id: string; path_excludes: string[]; path_includes: string[]; pr_comments_enabled: boolean; preview_branch_excludes: string[]; preview_branch_includes: string[]; preview_deployment_setting: "all" | "none" | "custom"; production_branch: string; production_deployments_enabled: boolean; repo_id: string; repo_name: string }; type: "github" | "gitlab" }; subdomain?: string; uses_functions: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateProjectResponse = Schema.Struct({
  result: Schema.Struct({
  build_config: Schema.optional(Schema.NullOr(Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.NullOr(Schema.String),
  web_analytics_token: Schema.NullOr(Schema.String)
}))),
  canonical_deployment: Schema.Struct({}),
  created_on: Schema.Date,
  deployment_configs: Schema.Struct({
  preview: Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.Boolean,
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.Number,
  compatibility_date: Schema.String,
  compatibility_flags: Schema.Array(Schema.String),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  fail_open: Schema.Boolean,
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.String,
  service: Schema.String
}) }))),
  usage_model: Schema.Literal("standard", "bundled", "unbound"),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
}),
  production: Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.Boolean,
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.Number,
  compatibility_date: Schema.String,
  compatibility_flags: Schema.Array(Schema.String),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  fail_open: Schema.Boolean,
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.String,
  service: Schema.String
}) }))),
  usage_model: Schema.Literal("standard", "bundled", "unbound"),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
})
}),
  domains: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  framework: Schema.String,
  framework_version: Schema.String,
  id: Schema.String,
  latest_deployment: Schema.Struct({}),
  name: Schema.String,
  preview_script_name: Schema.String,
  production_branch: Schema.String,
  production_script_name: Schema.String,
  source: Schema.optional(Schema.NullOr(Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.Boolean,
  owner: Schema.String,
  owner_id: Schema.String,
  path_excludes: Schema.Array(Schema.String),
  path_includes: Schema.Array(Schema.String),
  pr_comments_enabled: Schema.Boolean,
  preview_branch_excludes: Schema.Array(Schema.String),
  preview_branch_includes: Schema.Array(Schema.String),
  preview_deployment_setting: Schema.Literal("all", "none", "custom"),
  production_branch: Schema.String,
  production_deployments_enabled: Schema.Boolean,
  repo_id: Schema.String,
  repo_name: Schema.String
}),
  type: Schema.Literal("github", "gitlab")
}))),
  subdomain: Schema.optional(Schema.NullOr(Schema.String)),
  uses_functions: Schema.NullOr(Schema.Boolean)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateProjectResponse" }) as unknown as Schema.Schema<CreateProjectResponse>;

export const createProject: (
  input: CreateProjectRequest
) => Effect.Effect<
  CreateProjectResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectRequest,
  output: CreateProjectResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetProjectRequest {
  project_name: string;
  account_id: string;
}

export const GetProjectRequest = Schema.Struct({
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pages/projects/{project_name}" }),
).annotations({ identifier: "GetProjectRequest" }) as unknown as Schema.Schema<GetProjectRequest>;

export interface GetProjectResponse {
  result: { build_config?: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag: string; web_analytics_token: string }; canonical_deployment: unknown; created_on: string; deployment_configs: { preview: unknown; production: unknown }; domains?: string[]; framework: string; framework_version: string; id: string; latest_deployment: unknown; name: string; preview_script_name: string; production_branch: string; production_script_name: string; source?: { config: { deployments_enabled: boolean; owner: string; owner_id: string; path_excludes: string[]; path_includes: string[]; pr_comments_enabled: boolean; preview_branch_excludes: string[]; preview_branch_includes: string[]; preview_deployment_setting: "all" | "none" | "custom"; production_branch: string; production_deployments_enabled: boolean; repo_id: string; repo_name: string }; type: "github" | "gitlab" }; subdomain?: string; uses_functions: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetProjectResponse = Schema.Struct({
  result: Schema.Struct({
  build_config: Schema.optional(Schema.NullOr(Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.NullOr(Schema.String),
  web_analytics_token: Schema.NullOr(Schema.String)
}))),
  canonical_deployment: Schema.Struct({}),
  created_on: Schema.Date,
  deployment_configs: Schema.Struct({
  preview: Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.Boolean,
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.Number,
  compatibility_date: Schema.String,
  compatibility_flags: Schema.Array(Schema.String),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  fail_open: Schema.Boolean,
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.String,
  service: Schema.String
}) }))),
  usage_model: Schema.Literal("standard", "bundled", "unbound"),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
}),
  production: Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.Boolean,
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.Number,
  compatibility_date: Schema.String,
  compatibility_flags: Schema.Array(Schema.String),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  fail_open: Schema.Boolean,
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.String,
  service: Schema.String
}) }))),
  usage_model: Schema.Literal("standard", "bundled", "unbound"),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
})
}),
  domains: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  framework: Schema.String,
  framework_version: Schema.String,
  id: Schema.String,
  latest_deployment: Schema.Struct({}),
  name: Schema.String,
  preview_script_name: Schema.String,
  production_branch: Schema.String,
  production_script_name: Schema.String,
  source: Schema.optional(Schema.NullOr(Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.Boolean,
  owner: Schema.String,
  owner_id: Schema.String,
  path_excludes: Schema.Array(Schema.String),
  path_includes: Schema.Array(Schema.String),
  pr_comments_enabled: Schema.Boolean,
  preview_branch_excludes: Schema.Array(Schema.String),
  preview_branch_includes: Schema.Array(Schema.String),
  preview_deployment_setting: Schema.Literal("all", "none", "custom"),
  production_branch: Schema.String,
  production_deployments_enabled: Schema.Boolean,
  repo_id: Schema.String,
  repo_name: Schema.String
}),
  type: Schema.Literal("github", "gitlab")
}))),
  subdomain: Schema.optional(Schema.NullOr(Schema.String)),
  uses_functions: Schema.NullOr(Schema.Boolean)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetProjectResponse" }) as unknown as Schema.Schema<GetProjectResponse>;

export const getProject: (
  input: GetProjectRequest
) => Effect.Effect<
  GetProjectResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectRequest,
  output: GetProjectResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteProjectRequest {
  project_name: string;
  account_id: string;
}

export const DeleteProjectRequest = Schema.Struct({
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/pages/projects/{project_name}" }),
).annotations({ identifier: "DeleteProjectRequest" }) as unknown as Schema.Schema<DeleteProjectRequest>;

export interface DeleteProjectResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteProjectResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteProjectResponse" }) as unknown as Schema.Schema<DeleteProjectResponse>;

export const deleteProject: (
  input: DeleteProjectRequest
) => Effect.Effect<
  DeleteProjectResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectRequest,
  output: DeleteProjectResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface UpdateProjectRequest {
  project_name: string;
  account_id: string;
  body: { build_config?: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag?: string; web_analytics_token?: string }; deployment_configs?: { preview?: unknown; production?: unknown }; name?: string; production_branch?: string; source?: { config: { deployments_enabled?: boolean; owner?: string; owner_id?: string; path_excludes?: string[]; path_includes?: string[]; pr_comments_enabled?: boolean; preview_branch_excludes?: string[]; preview_branch_includes?: string[]; preview_deployment_setting?: "all" | "none" | "custom"; production_branch?: string; production_deployments_enabled?: boolean; repo_id?: string; repo_name?: string }; type: "github" | "gitlab" } };
}

export const UpdateProjectRequest = Schema.Struct({
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  build_config: Schema.optional(Schema.NullOr(Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_token: Schema.optional(Schema.NullOr(Schema.String))
}))),
  deployment_configs: Schema.optional(Schema.NullOr(Schema.Struct({
  preview: Schema.optional(Schema.NullOr(Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.optional(Schema.NullOr(Schema.Boolean)),
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.optional(Schema.NullOr(Schema.Number)),
  compatibility_date: Schema.optional(Schema.NullOr(Schema.String)),
  compatibility_flags: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  fail_open: Schema.optional(Schema.NullOr(Schema.Boolean)),
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.optional(Schema.NullOr(Schema.String)),
  service: Schema.String
}) }))),
  usage_model: Schema.optional(Schema.NullOr(Schema.Literal("standard", "bundled", "unbound"))),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
}))),
  production: Schema.optional(Schema.NullOr(Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.optional(Schema.NullOr(Schema.Boolean)),
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.optional(Schema.NullOr(Schema.Number)),
  compatibility_date: Schema.optional(Schema.NullOr(Schema.String)),
  compatibility_flags: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  fail_open: Schema.optional(Schema.NullOr(Schema.Boolean)),
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.optional(Schema.NullOr(Schema.String)),
  service: Schema.String
}) }))),
  usage_model: Schema.optional(Schema.NullOr(Schema.Literal("standard", "bundled", "unbound"))),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
})))
}))),
  name: Schema.optional(Schema.NullOr(Schema.String)),
  production_branch: Schema.optional(Schema.NullOr(Schema.String)),
  source: Schema.optional(Schema.NullOr(Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  owner: Schema.optional(Schema.NullOr(Schema.String)),
  owner_id: Schema.optional(Schema.NullOr(Schema.String)),
  path_excludes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  path_includes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  pr_comments_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  preview_branch_excludes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  preview_branch_includes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  preview_deployment_setting: Schema.optional(Schema.NullOr(Schema.Literal("all", "none", "custom"))),
  production_branch: Schema.optional(Schema.NullOr(Schema.String)),
  production_deployments_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  repo_id: Schema.optional(Schema.NullOr(Schema.String)),
  repo_name: Schema.optional(Schema.NullOr(Schema.String))
}),
  type: Schema.Literal("github", "gitlab")
})))
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/pages/projects/{project_name}" }),
).annotations({ identifier: "UpdateProjectRequest" }) as unknown as Schema.Schema<UpdateProjectRequest>;

export interface UpdateProjectResponse {
  result: { build_config?: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag: string; web_analytics_token: string }; canonical_deployment: unknown; created_on: string; deployment_configs: { preview: unknown; production: unknown }; domains?: string[]; framework: string; framework_version: string; id: string; latest_deployment: unknown; name: string; preview_script_name: string; production_branch: string; production_script_name: string; source?: { config: { deployments_enabled: boolean; owner: string; owner_id: string; path_excludes: string[]; path_includes: string[]; pr_comments_enabled: boolean; preview_branch_excludes: string[]; preview_branch_includes: string[]; preview_deployment_setting: "all" | "none" | "custom"; production_branch: string; production_deployments_enabled: boolean; repo_id: string; repo_name: string }; type: "github" | "gitlab" }; subdomain?: string; uses_functions: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const UpdateProjectResponse = Schema.Struct({
  result: Schema.Struct({
  build_config: Schema.optional(Schema.NullOr(Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.NullOr(Schema.String),
  web_analytics_token: Schema.NullOr(Schema.String)
}))),
  canonical_deployment: Schema.Struct({}),
  created_on: Schema.Date,
  deployment_configs: Schema.Struct({
  preview: Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.Boolean,
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.Number,
  compatibility_date: Schema.String,
  compatibility_flags: Schema.Array(Schema.String),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  fail_open: Schema.Boolean,
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.String,
  service: Schema.String
}) }))),
  usage_model: Schema.Literal("standard", "bundled", "unbound"),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
}),
  production: Schema.Struct({
  ai_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  project_id: Schema.String
}) }))),
  always_use_latest_compatibility_date: Schema.Boolean,
  analytics_engine_datasets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  dataset: Schema.String
}) }))),
  browsers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) }))),
  build_image_major_version: Schema.Number,
  compatibility_date: Schema.String,
  compatibility_flags: Schema.Array(Schema.String),
  d1_databases: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  durable_object_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  fail_open: Schema.Boolean,
  hyperdrive_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  id: Schema.String
}) }))),
  kv_namespaces: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  namespace_id: Schema.String
}) }))),
  limits: Schema.optional(Schema.NullOr(Schema.Struct({
  cpu_ms: Schema.Number
}))),
  mtls_certificates: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  certificate_id: Schema.String
}) }))),
  placement: Schema.optional(Schema.NullOr(Schema.Struct({
  mode: Schema.String
}))),
  queue_producers: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  name: Schema.String
}) }))),
  r2_buckets: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  jurisdiction: Schema.optional(Schema.NullOr(Schema.String)),
  name: Schema.String
}) }))),
  services: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  entrypoint: Schema.optional(Schema.NullOr(Schema.String)),
  environment: Schema.String,
  service: Schema.String
}) }))),
  usage_model: Schema.Literal("standard", "bundled", "unbound"),
  vectorize_bindings: Schema.optional(Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({
  index_name: Schema.String
}) }))),
  wrangler_config_hash: Schema.optional(Schema.NullOr(Schema.String))
})
}),
  domains: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  framework: Schema.String,
  framework_version: Schema.String,
  id: Schema.String,
  latest_deployment: Schema.Struct({}),
  name: Schema.String,
  preview_script_name: Schema.String,
  production_branch: Schema.String,
  production_script_name: Schema.String,
  source: Schema.optional(Schema.NullOr(Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.Boolean,
  owner: Schema.String,
  owner_id: Schema.String,
  path_excludes: Schema.Array(Schema.String),
  path_includes: Schema.Array(Schema.String),
  pr_comments_enabled: Schema.Boolean,
  preview_branch_excludes: Schema.Array(Schema.String),
  preview_branch_includes: Schema.Array(Schema.String),
  preview_deployment_setting: Schema.Literal("all", "none", "custom"),
  production_branch: Schema.String,
  production_deployments_enabled: Schema.Boolean,
  repo_id: Schema.String,
  repo_name: Schema.String
}),
  type: Schema.Literal("github", "gitlab")
}))),
  subdomain: Schema.optional(Schema.NullOr(Schema.String)),
  uses_functions: Schema.NullOr(Schema.Boolean)
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "UpdateProjectResponse" }) as unknown as Schema.Schema<UpdateProjectResponse>;

export const updateProject: (
  input: UpdateProjectRequest
) => Effect.Effect<
  UpdateProjectResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateProjectRequest,
  output: UpdateProjectResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetDeploymentsRequest {
  project_name: string;
  account_id: string;
  env?: "production" | "preview";
  page?: number;
  per_page?: number;
}

export const GetDeploymentsRequest = Schema.Struct({
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  env: Schema.optional(Schema.Literal("production", "preview")).pipe(T.HttpQuery("env")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pages/projects/{project_name}/deployments" }),
).annotations({ identifier: "GetDeploymentsRequest" }) as unknown as Schema.Schema<GetDeploymentsRequest>;

export interface GetDeploymentsResponse {
  result: { aliases: string[]; build_config: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag: string; web_analytics_token: string }; created_on: string; deployment_trigger: { metadata: { branch: string; commit_dirty: boolean; commit_hash: string; commit_message: string }; type: "github:push" | "ad_hoc" | "deploy_hook" }; env_vars: Record<string, unknown>; environment: "preview" | "production"; id: string; is_skipped: boolean; latest_stage: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }; modified_on: string; project_id: string; project_name: string; short_id: string; source: { config: { deployments_enabled: boolean; owner: string; owner_id: string; path_excludes: string[]; path_includes: string[]; pr_comments_enabled: boolean; preview_branch_excludes: string[]; preview_branch_includes: string[]; preview_deployment_setting: "all" | "none" | "custom"; production_branch: string; production_deployments_enabled: boolean; repo_id: string; repo_name: string }; type: "github" | "gitlab" }; stages: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }[]; url: string; uses_functions?: boolean }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetDeploymentsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  aliases: Schema.NullOr(Schema.Array(Schema.String)),
  build_config: Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.NullOr(Schema.String),
  web_analytics_token: Schema.NullOr(Schema.String)
}),
  created_on: Schema.Date,
  deployment_trigger: Schema.Struct({
  metadata: Schema.Struct({
  branch: Schema.String,
  commit_dirty: Schema.Boolean,
  commit_hash: Schema.String,
  commit_message: Schema.String
}),
  type: Schema.Literal("github:push", "ad_hoc", "deploy_hook")
}),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  environment: Schema.Literal("preview", "production"),
  id: Schema.String,
  is_skipped: Schema.Boolean,
  latest_stage: Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
}),
  modified_on: Schema.Date,
  project_id: Schema.String,
  project_name: Schema.String,
  short_id: Schema.String,
  source: Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.Boolean,
  owner: Schema.String,
  owner_id: Schema.String,
  path_excludes: Schema.Array(Schema.String),
  path_includes: Schema.Array(Schema.String),
  pr_comments_enabled: Schema.Boolean,
  preview_branch_excludes: Schema.Array(Schema.String),
  preview_branch_includes: Schema.Array(Schema.String),
  preview_deployment_setting: Schema.Literal("all", "none", "custom"),
  production_branch: Schema.String,
  production_deployments_enabled: Schema.Boolean,
  repo_id: Schema.String,
  repo_name: Schema.String
}),
  type: Schema.Literal("github", "gitlab")
}),
  stages: Schema.Array(Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
})),
  url: Schema.String,
  uses_functions: Schema.optional(Schema.NullOr(Schema.Boolean))
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetDeploymentsResponse" }) as unknown as Schema.Schema<GetDeploymentsResponse>;

export const getDeployments: (
  input: GetDeploymentsRequest
) => Effect.Effect<
  GetDeploymentsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDeploymentsRequest,
  output: GetDeploymentsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface CreateDeploymentRequest {
  project_name: string;
  account_id: string;
  body: FormData;
}

export const CreateDeploymentRequest = Schema.Struct({
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.instanceOf(FormData).pipe(T.HttpFormData())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/pages/projects/{project_name}/deployments" }),
).annotations({ identifier: "CreateDeploymentRequest" }) as unknown as Schema.Schema<CreateDeploymentRequest>;

export interface CreateDeploymentResponse {
  result: { aliases: string[]; build_config: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag: string; web_analytics_token: string }; created_on: string; deployment_trigger: { metadata: { branch: string; commit_dirty: boolean; commit_hash: string; commit_message: string }; type: "github:push" | "ad_hoc" | "deploy_hook" }; env_vars: Record<string, unknown>; environment: "preview" | "production"; id: string; is_skipped: boolean; latest_stage: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }; modified_on: string; project_id: string; project_name: string; short_id: string; source: { config: { deployments_enabled: boolean; owner: string; owner_id: string; path_excludes: string[]; path_includes: string[]; pr_comments_enabled: boolean; preview_branch_excludes: string[]; preview_branch_includes: string[]; preview_deployment_setting: "all" | "none" | "custom"; production_branch: string; production_deployments_enabled: boolean; repo_id: string; repo_name: string }; type: "github" | "gitlab" }; stages: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }[]; url: string; uses_functions?: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const CreateDeploymentResponse = Schema.Struct({
  result: Schema.Struct({
  aliases: Schema.NullOr(Schema.Array(Schema.String)),
  build_config: Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.NullOr(Schema.String),
  web_analytics_token: Schema.NullOr(Schema.String)
}),
  created_on: Schema.Date,
  deployment_trigger: Schema.Struct({
  metadata: Schema.Struct({
  branch: Schema.String,
  commit_dirty: Schema.Boolean,
  commit_hash: Schema.String,
  commit_message: Schema.String
}),
  type: Schema.Literal("github:push", "ad_hoc", "deploy_hook")
}),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  environment: Schema.Literal("preview", "production"),
  id: Schema.String,
  is_skipped: Schema.Boolean,
  latest_stage: Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
}),
  modified_on: Schema.Date,
  project_id: Schema.String,
  project_name: Schema.String,
  short_id: Schema.String,
  source: Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.Boolean,
  owner: Schema.String,
  owner_id: Schema.String,
  path_excludes: Schema.Array(Schema.String),
  path_includes: Schema.Array(Schema.String),
  pr_comments_enabled: Schema.Boolean,
  preview_branch_excludes: Schema.Array(Schema.String),
  preview_branch_includes: Schema.Array(Schema.String),
  preview_deployment_setting: Schema.Literal("all", "none", "custom"),
  production_branch: Schema.String,
  production_deployments_enabled: Schema.Boolean,
  repo_id: Schema.String,
  repo_name: Schema.String
}),
  type: Schema.Literal("github", "gitlab")
}),
  stages: Schema.Array(Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
})),
  url: Schema.String,
  uses_functions: Schema.optional(Schema.NullOr(Schema.Boolean))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "CreateDeploymentResponse" }) as unknown as Schema.Schema<CreateDeploymentResponse>;

export const createDeployment: (
  input: CreateDeploymentRequest
) => Effect.Effect<
  CreateDeploymentResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDeploymentRequest,
  output: CreateDeploymentResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetDeploymentInfoRequest {
  deployment_id: string;
  project_name: string;
  account_id: string;
}

export const GetDeploymentInfoRequest = Schema.Struct({
  deployment_id: Schema.String.pipe(T.HttpPath("deployment_id")),
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}" }),
).annotations({ identifier: "GetDeploymentInfoRequest" }) as unknown as Schema.Schema<GetDeploymentInfoRequest>;

export interface GetDeploymentInfoResponse {
  result: { aliases: string[]; build_config: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag: string; web_analytics_token: string }; created_on: string; deployment_trigger: { metadata: { branch: string; commit_dirty: boolean; commit_hash: string; commit_message: string }; type: "github:push" | "ad_hoc" | "deploy_hook" }; env_vars: Record<string, unknown>; environment: "preview" | "production"; id: string; is_skipped: boolean; latest_stage: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }; modified_on: string; project_id: string; project_name: string; short_id: string; source: { config: { deployments_enabled: boolean; owner: string; owner_id: string; path_excludes: string[]; path_includes: string[]; pr_comments_enabled: boolean; preview_branch_excludes: string[]; preview_branch_includes: string[]; preview_deployment_setting: "all" | "none" | "custom"; production_branch: string; production_deployments_enabled: boolean; repo_id: string; repo_name: string }; type: "github" | "gitlab" }; stages: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }[]; url: string; uses_functions?: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetDeploymentInfoResponse = Schema.Struct({
  result: Schema.Struct({
  aliases: Schema.NullOr(Schema.Array(Schema.String)),
  build_config: Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.NullOr(Schema.String),
  web_analytics_token: Schema.NullOr(Schema.String)
}),
  created_on: Schema.Date,
  deployment_trigger: Schema.Struct({
  metadata: Schema.Struct({
  branch: Schema.String,
  commit_dirty: Schema.Boolean,
  commit_hash: Schema.String,
  commit_message: Schema.String
}),
  type: Schema.Literal("github:push", "ad_hoc", "deploy_hook")
}),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  environment: Schema.Literal("preview", "production"),
  id: Schema.String,
  is_skipped: Schema.Boolean,
  latest_stage: Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
}),
  modified_on: Schema.Date,
  project_id: Schema.String,
  project_name: Schema.String,
  short_id: Schema.String,
  source: Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.Boolean,
  owner: Schema.String,
  owner_id: Schema.String,
  path_excludes: Schema.Array(Schema.String),
  path_includes: Schema.Array(Schema.String),
  pr_comments_enabled: Schema.Boolean,
  preview_branch_excludes: Schema.Array(Schema.String),
  preview_branch_includes: Schema.Array(Schema.String),
  preview_deployment_setting: Schema.Literal("all", "none", "custom"),
  production_branch: Schema.String,
  production_deployments_enabled: Schema.Boolean,
  repo_id: Schema.String,
  repo_name: Schema.String
}),
  type: Schema.Literal("github", "gitlab")
}),
  stages: Schema.Array(Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
})),
  url: Schema.String,
  uses_functions: Schema.optional(Schema.NullOr(Schema.Boolean))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetDeploymentInfoResponse" }) as unknown as Schema.Schema<GetDeploymentInfoResponse>;

export const getDeploymentInfo: (
  input: GetDeploymentInfoRequest
) => Effect.Effect<
  GetDeploymentInfoResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDeploymentInfoRequest,
  output: GetDeploymentInfoResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteDeploymentRequest {
  deployment_id: string;
  project_name: string;
  account_id: string;
}

export const DeleteDeploymentRequest = Schema.Struct({
  deployment_id: Schema.String.pipe(T.HttpPath("deployment_id")),
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}" }),
).annotations({ identifier: "DeleteDeploymentRequest" }) as unknown as Schema.Schema<DeleteDeploymentRequest>;

export interface DeleteDeploymentResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteDeploymentResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteDeploymentResponse" }) as unknown as Schema.Schema<DeleteDeploymentResponse>;

export const deleteDeployment: (
  input: DeleteDeploymentRequest
) => Effect.Effect<
  DeleteDeploymentResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDeploymentRequest,
  output: DeleteDeploymentResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetDeploymentLogsRequest {
  deployment_id: string;
  project_name: string;
  account_id: string;
}

export const GetDeploymentLogsRequest = Schema.Struct({
  deployment_id: Schema.String.pipe(T.HttpPath("deployment_id")),
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/history/logs" }),
).annotations({ identifier: "GetDeploymentLogsRequest" }) as unknown as Schema.Schema<GetDeploymentLogsRequest>;

export interface GetDeploymentLogsResponse {
  result: { data: { line: string; ts: string }[]; includes_container_logs: boolean; total: number };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetDeploymentLogsResponse = Schema.Struct({
  result: Schema.Struct({
  data: Schema.Array(Schema.Struct({
  line: Schema.String,
  ts: Schema.String
})),
  includes_container_logs: Schema.Boolean,
  total: Schema.Number
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetDeploymentLogsResponse" }) as unknown as Schema.Schema<GetDeploymentLogsResponse>;

export const getDeploymentLogs: (
  input: GetDeploymentLogsRequest
) => Effect.Effect<
  GetDeploymentLogsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDeploymentLogsRequest,
  output: GetDeploymentLogsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface PagesDeploymentRetryDeploymentRequest {
  deployment_id: string;
  project_name: string;
  account_id: string;
}

export const PagesDeploymentRetryDeploymentRequest = Schema.Struct({
  deployment_id: Schema.String.pipe(T.HttpPath("deployment_id")),
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/retry" }),
).annotations({ identifier: "PagesDeploymentRetryDeploymentRequest" }) as unknown as Schema.Schema<PagesDeploymentRetryDeploymentRequest>;

export interface PagesDeploymentRetryDeploymentResponse {
  result: { aliases: string[]; build_config: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag: string; web_analytics_token: string }; created_on: string; deployment_trigger: { metadata: { branch: string; commit_dirty: boolean; commit_hash: string; commit_message: string }; type: "github:push" | "ad_hoc" | "deploy_hook" }; env_vars: Record<string, unknown>; environment: "preview" | "production"; id: string; is_skipped: boolean; latest_stage: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }; modified_on: string; project_id: string; project_name: string; short_id: string; source: { config: { deployments_enabled: boolean; owner: string; owner_id: string; path_excludes: string[]; path_includes: string[]; pr_comments_enabled: boolean; preview_branch_excludes: string[]; preview_branch_includes: string[]; preview_deployment_setting: "all" | "none" | "custom"; production_branch: string; production_deployments_enabled: boolean; repo_id: string; repo_name: string }; type: "github" | "gitlab" }; stages: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }[]; url: string; uses_functions?: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PagesDeploymentRetryDeploymentResponse = Schema.Struct({
  result: Schema.Struct({
  aliases: Schema.NullOr(Schema.Array(Schema.String)),
  build_config: Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.NullOr(Schema.String),
  web_analytics_token: Schema.NullOr(Schema.String)
}),
  created_on: Schema.Date,
  deployment_trigger: Schema.Struct({
  metadata: Schema.Struct({
  branch: Schema.String,
  commit_dirty: Schema.Boolean,
  commit_hash: Schema.String,
  commit_message: Schema.String
}),
  type: Schema.Literal("github:push", "ad_hoc", "deploy_hook")
}),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  environment: Schema.Literal("preview", "production"),
  id: Schema.String,
  is_skipped: Schema.Boolean,
  latest_stage: Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
}),
  modified_on: Schema.Date,
  project_id: Schema.String,
  project_name: Schema.String,
  short_id: Schema.String,
  source: Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.Boolean,
  owner: Schema.String,
  owner_id: Schema.String,
  path_excludes: Schema.Array(Schema.String),
  path_includes: Schema.Array(Schema.String),
  pr_comments_enabled: Schema.Boolean,
  preview_branch_excludes: Schema.Array(Schema.String),
  preview_branch_includes: Schema.Array(Schema.String),
  preview_deployment_setting: Schema.Literal("all", "none", "custom"),
  production_branch: Schema.String,
  production_deployments_enabled: Schema.Boolean,
  repo_id: Schema.String,
  repo_name: Schema.String
}),
  type: Schema.Literal("github", "gitlab")
}),
  stages: Schema.Array(Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
})),
  url: Schema.String,
  uses_functions: Schema.optional(Schema.NullOr(Schema.Boolean))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PagesDeploymentRetryDeploymentResponse" }) as unknown as Schema.Schema<PagesDeploymentRetryDeploymentResponse>;

export const pagesDeploymentRetryDeployment: (
  input: PagesDeploymentRetryDeploymentRequest
) => Effect.Effect<
  PagesDeploymentRetryDeploymentResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PagesDeploymentRetryDeploymentRequest,
  output: PagesDeploymentRetryDeploymentResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface PagesDeploymentRollbackDeploymentRequest {
  deployment_id: string;
  project_name: string;
  account_id: string;
}

export const PagesDeploymentRollbackDeploymentRequest = Schema.Struct({
  deployment_id: Schema.String.pipe(T.HttpPath("deployment_id")),
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/rollback" }),
).annotations({ identifier: "PagesDeploymentRollbackDeploymentRequest" }) as unknown as Schema.Schema<PagesDeploymentRollbackDeploymentRequest>;

export interface PagesDeploymentRollbackDeploymentResponse {
  result: { aliases: string[]; build_config: { build_caching?: boolean; build_command?: string; destination_dir?: string; root_dir?: string; web_analytics_tag: string; web_analytics_token: string }; created_on: string; deployment_trigger: { metadata: { branch: string; commit_dirty: boolean; commit_hash: string; commit_message: string }; type: "github:push" | "ad_hoc" | "deploy_hook" }; env_vars: Record<string, unknown>; environment: "preview" | "production"; id: string; is_skipped: boolean; latest_stage: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }; modified_on: string; project_id: string; project_name: string; short_id: string; source: { config: { deployments_enabled: boolean; owner: string; owner_id: string; path_excludes: string[]; path_includes: string[]; pr_comments_enabled: boolean; preview_branch_excludes: string[]; preview_branch_includes: string[]; preview_deployment_setting: "all" | "none" | "custom"; production_branch: string; production_deployments_enabled: boolean; repo_id: string; repo_name: string }; type: "github" | "gitlab" }; stages: { ended_on: string; name: "queued" | "initialize" | "clone_repo" | "build" | "deploy"; started_on: string; status: "success" | "idle" | "active" | "failure" | "canceled" }[]; url: string; uses_functions?: boolean };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PagesDeploymentRollbackDeploymentResponse = Schema.Struct({
  result: Schema.Struct({
  aliases: Schema.NullOr(Schema.Array(Schema.String)),
  build_config: Schema.Struct({
  build_caching: Schema.optional(Schema.NullOr(Schema.Boolean)),
  build_command: Schema.optional(Schema.NullOr(Schema.String)),
  destination_dir: Schema.optional(Schema.NullOr(Schema.String)),
  root_dir: Schema.optional(Schema.NullOr(Schema.String)),
  web_analytics_tag: Schema.NullOr(Schema.String),
  web_analytics_token: Schema.NullOr(Schema.String)
}),
  created_on: Schema.Date,
  deployment_trigger: Schema.Struct({
  metadata: Schema.Struct({
  branch: Schema.String,
  commit_dirty: Schema.Boolean,
  commit_hash: Schema.String,
  commit_message: Schema.String
}),
  type: Schema.Literal("github:push", "ad_hoc", "deploy_hook")
}),
  env_vars: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.Struct({}) })),
  environment: Schema.Literal("preview", "production"),
  id: Schema.String,
  is_skipped: Schema.Boolean,
  latest_stage: Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
}),
  modified_on: Schema.Date,
  project_id: Schema.String,
  project_name: Schema.String,
  short_id: Schema.String,
  source: Schema.Struct({
  config: Schema.Struct({
  deployments_enabled: Schema.Boolean,
  owner: Schema.String,
  owner_id: Schema.String,
  path_excludes: Schema.Array(Schema.String),
  path_includes: Schema.Array(Schema.String),
  pr_comments_enabled: Schema.Boolean,
  preview_branch_excludes: Schema.Array(Schema.String),
  preview_branch_includes: Schema.Array(Schema.String),
  preview_deployment_setting: Schema.Literal("all", "none", "custom"),
  production_branch: Schema.String,
  production_deployments_enabled: Schema.Boolean,
  repo_id: Schema.String,
  repo_name: Schema.String
}),
  type: Schema.Literal("github", "gitlab")
}),
  stages: Schema.Array(Schema.Struct({
  ended_on: Schema.NullOr(Schema.Date),
  name: Schema.Literal("queued", "initialize", "clone_repo", "build", "deploy"),
  started_on: Schema.NullOr(Schema.Date),
  status: Schema.Literal("success", "idle", "active", "failure", "canceled")
})),
  url: Schema.String,
  uses_functions: Schema.optional(Schema.NullOr(Schema.Boolean))
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PagesDeploymentRollbackDeploymentResponse" }) as unknown as Schema.Schema<PagesDeploymentRollbackDeploymentResponse>;

export const pagesDeploymentRollbackDeployment: (
  input: PagesDeploymentRollbackDeploymentRequest
) => Effect.Effect<
  PagesDeploymentRollbackDeploymentResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PagesDeploymentRollbackDeploymentRequest,
  output: PagesDeploymentRollbackDeploymentResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetDomainsRequest {
  project_name: string;
  account_id: string;
}

export const GetDomainsRequest = Schema.Struct({
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pages/projects/{project_name}/domains" }),
).annotations({ identifier: "GetDomainsRequest" }) as unknown as Schema.Schema<GetDomainsRequest>;

export interface GetDomainsResponse {
  result: { certificate_authority: "google" | "lets_encrypt"; created_on: string; domain_id: string; id: string; name: string; status: "initializing" | "pending" | "active" | "deactivated" | "blocked" | "error"; validation_data: { error_message?: string; method: "http" | "txt"; status: "initializing" | "pending" | "active" | "deactivated" | "error"; txt_name?: string; txt_value?: string }; verification_data: { error_message?: string; status: "pending" | "active" | "deactivated" | "blocked" | "error" }; zone_tag: string }[];
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetDomainsResponse = Schema.Struct({
  result: Schema.Array(Schema.Struct({
  certificate_authority: Schema.Literal("google", "lets_encrypt"),
  created_on: Schema.String,
  domain_id: Schema.String,
  id: Schema.String,
  name: Schema.String,
  status: Schema.Literal("initializing", "pending", "active", "deactivated", "blocked", "error"),
  validation_data: Schema.Struct({
  error_message: Schema.optional(Schema.NullOr(Schema.String)),
  method: Schema.Literal("http", "txt"),
  status: Schema.Literal("initializing", "pending", "active", "deactivated", "error"),
  txt_name: Schema.optional(Schema.NullOr(Schema.String)),
  txt_value: Schema.optional(Schema.NullOr(Schema.String))
}),
  verification_data: Schema.Struct({
  error_message: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.Literal("pending", "active", "deactivated", "blocked", "error")
}),
  zone_tag: Schema.String
})),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetDomainsResponse" }) as unknown as Schema.Schema<GetDomainsResponse>;

export const getDomains: (
  input: GetDomainsRequest
) => Effect.Effect<
  GetDomainsResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDomainsRequest,
  output: GetDomainsResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface PagesDomainsAddDomainRequest {
  project_name: string;
  account_id: string;
  body: { name: string };
}

export const PagesDomainsAddDomainRequest = Schema.Struct({
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
  name: Schema.String
}).pipe(T.HttpBody())
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/pages/projects/{project_name}/domains" }),
).annotations({ identifier: "PagesDomainsAddDomainRequest" }) as unknown as Schema.Schema<PagesDomainsAddDomainRequest>;

export interface PagesDomainsAddDomainResponse {
  result: { certificate_authority: "google" | "lets_encrypt"; created_on: string; domain_id: string; id: string; name: string; status: "initializing" | "pending" | "active" | "deactivated" | "blocked" | "error"; validation_data: { error_message?: string; method: "http" | "txt"; status: "initializing" | "pending" | "active" | "deactivated" | "error"; txt_name?: string; txt_value?: string }; verification_data: { error_message?: string; status: "pending" | "active" | "deactivated" | "blocked" | "error" }; zone_tag: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PagesDomainsAddDomainResponse = Schema.Struct({
  result: Schema.Struct({
  certificate_authority: Schema.Literal("google", "lets_encrypt"),
  created_on: Schema.String,
  domain_id: Schema.String,
  id: Schema.String,
  name: Schema.String,
  status: Schema.Literal("initializing", "pending", "active", "deactivated", "blocked", "error"),
  validation_data: Schema.Struct({
  error_message: Schema.optional(Schema.NullOr(Schema.String)),
  method: Schema.Literal("http", "txt"),
  status: Schema.Literal("initializing", "pending", "active", "deactivated", "error"),
  txt_name: Schema.optional(Schema.NullOr(Schema.String)),
  txt_value: Schema.optional(Schema.NullOr(Schema.String))
}),
  verification_data: Schema.Struct({
  error_message: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.Literal("pending", "active", "deactivated", "blocked", "error")
}),
  zone_tag: Schema.String
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PagesDomainsAddDomainResponse" }) as unknown as Schema.Schema<PagesDomainsAddDomainResponse>;

export const pagesDomainsAddDomain: (
  input: PagesDomainsAddDomainRequest
) => Effect.Effect<
  PagesDomainsAddDomainResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PagesDomainsAddDomainRequest,
  output: PagesDomainsAddDomainResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface GetDomainRequest {
  domain_name: string;
  project_name: string;
  account_id: string;
}

export const GetDomainRequest = Schema.Struct({
  domain_name: Schema.String.pipe(T.HttpPath("domain_name")),
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/pages/projects/{project_name}/domains/{domain_name}" }),
).annotations({ identifier: "GetDomainRequest" }) as unknown as Schema.Schema<GetDomainRequest>;

export interface GetDomainResponse {
  result: { certificate_authority: "google" | "lets_encrypt"; created_on: string; domain_id: string; id: string; name: string; status: "initializing" | "pending" | "active" | "deactivated" | "blocked" | "error"; validation_data: { error_message?: string; method: "http" | "txt"; status: "initializing" | "pending" | "active" | "deactivated" | "error"; txt_name?: string; txt_value?: string }; verification_data: { error_message?: string; status: "pending" | "active" | "deactivated" | "blocked" | "error" }; zone_tag: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const GetDomainResponse = Schema.Struct({
  result: Schema.Struct({
  certificate_authority: Schema.Literal("google", "lets_encrypt"),
  created_on: Schema.String,
  domain_id: Schema.String,
  id: Schema.String,
  name: Schema.String,
  status: Schema.Literal("initializing", "pending", "active", "deactivated", "blocked", "error"),
  validation_data: Schema.Struct({
  error_message: Schema.optional(Schema.NullOr(Schema.String)),
  method: Schema.Literal("http", "txt"),
  status: Schema.Literal("initializing", "pending", "active", "deactivated", "error"),
  txt_name: Schema.optional(Schema.NullOr(Schema.String)),
  txt_value: Schema.optional(Schema.NullOr(Schema.String))
}),
  verification_data: Schema.Struct({
  error_message: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.Literal("pending", "active", "deactivated", "blocked", "error")
}),
  zone_tag: Schema.String
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "GetDomainResponse" }) as unknown as Schema.Schema<GetDomainResponse>;

export const getDomain: (
  input: GetDomainRequest
) => Effect.Effect<
  GetDomainResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDomainRequest,
  output: GetDomainResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface DeleteDomainRequest {
  domain_name: string;
  project_name: string;
  account_id: string;
}

export const DeleteDomainRequest = Schema.Struct({
  domain_name: Schema.String.pipe(T.HttpPath("domain_name")),
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/pages/projects/{project_name}/domains/{domain_name}" }),
).annotations({ identifier: "DeleteDomainRequest" }) as unknown as Schema.Schema<DeleteDomainRequest>;

export interface DeleteDomainResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const DeleteDomainResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "DeleteDomainResponse" }) as unknown as Schema.Schema<DeleteDomainResponse>;

export const deleteDomain: (
  input: DeleteDomainRequest
) => Effect.Effect<
  DeleteDomainResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface PatchDomainRequest {
  domain_name: string;
  project_name: string;
  account_id: string;
}

export const PatchDomainRequest = Schema.Struct({
  domain_name: Schema.String.pipe(T.HttpPath("domain_name")),
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "PATCH", path: "/accounts/{account_id}/pages/projects/{project_name}/domains/{domain_name}" }),
).annotations({ identifier: "PatchDomainRequest" }) as unknown as Schema.Schema<PatchDomainRequest>;

export interface PatchDomainResponse {
  result: { certificate_authority: "google" | "lets_encrypt"; created_on: string; domain_id: string; id: string; name: string; status: "initializing" | "pending" | "active" | "deactivated" | "blocked" | "error"; validation_data: { error_message?: string; method: "http" | "txt"; status: "initializing" | "pending" | "active" | "deactivated" | "error"; txt_name?: string; txt_value?: string }; verification_data: { error_message?: string; status: "pending" | "active" | "deactivated" | "blocked" | "error" }; zone_tag: string };
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PatchDomainResponse = Schema.Struct({
  result: Schema.Struct({
  certificate_authority: Schema.Literal("google", "lets_encrypt"),
  created_on: Schema.String,
  domain_id: Schema.String,
  id: Schema.String,
  name: Schema.String,
  status: Schema.Literal("initializing", "pending", "active", "deactivated", "blocked", "error"),
  validation_data: Schema.Struct({
  error_message: Schema.optional(Schema.NullOr(Schema.String)),
  method: Schema.Literal("http", "txt"),
  status: Schema.Literal("initializing", "pending", "active", "deactivated", "error"),
  txt_name: Schema.optional(Schema.NullOr(Schema.String)),
  txt_value: Schema.optional(Schema.NullOr(Schema.String))
}),
  verification_data: Schema.Struct({
  error_message: Schema.optional(Schema.NullOr(Schema.String)),
  status: Schema.Literal("pending", "active", "deactivated", "blocked", "error")
}),
  zone_tag: Schema.String
}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PatchDomainResponse" }) as unknown as Schema.Schema<PatchDomainResponse>;

export const patchDomain: (
  input: PatchDomainRequest
) => Effect.Effect<
  PatchDomainResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchDomainRequest,
  output: PatchDomainResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));

export interface PagesPurgeBuildCacheRequest {
  project_name: string;
  account_id: string;
}

export const PagesPurgeBuildCacheRequest = Schema.Struct({
  project_name: Schema.String.pipe(T.HttpPath("project_name")),
  account_id: Schema.String.pipe(T.HttpPath("account_id"))
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/pages/projects/{project_name}/purge_build_cache" }),
).annotations({ identifier: "PagesPurgeBuildCacheRequest" }) as unknown as Schema.Schema<PagesPurgeBuildCacheRequest>;

export interface PagesPurgeBuildCacheResponse {
  result: Record<string, unknown>;
  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };
}

export const PagesPurgeBuildCacheResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(Schema.Struct({
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
    count: Schema.optional(Schema.Number),
    total_count: Schema.optional(Schema.Number),
    cursor: Schema.optional(Schema.String),
  })),
}).annotations({ identifier: "PagesPurgeBuildCacheResponse" }) as unknown as Schema.Schema<PagesPurgeBuildCacheResponse>;

export const pagesPurgeBuildCache: (
  input: PagesPurgeBuildCacheRequest
) => Effect.Effect<
  PagesPurgeBuildCacheResponse,
  RateLimited | TooManyRequests | AuthenticationError | InvalidToken | MissingToken | TokenExpired | Unauthorized | CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PagesPurgeBuildCacheRequest,
  output: PagesPurgeBuildCacheResponse,
  errors: [RateLimited, TooManyRequests, AuthenticationError, InvalidToken, MissingToken, TokenExpired, Unauthorized],
}));
