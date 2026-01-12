/**
 * Cloudflare Workers API
 *
 * Operations for managing Worker scripts.
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import * as Workers from "distilled-cloudflare/workers";
 * import { Auth } from "distilled-cloudflare";
 *
 * const program = Effect.gen(function* () {
 *   const scripts = yield* Workers.listScripts({
 *     account_id: "your-account-id",
 *   });
 *   return scripts;
 * });
 * ```
 */

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// =============================================================================
// Shared Types
// =============================================================================

export const WorkerBinding = Schema.Struct({
  name: Schema.String,
  type: Schema.String,
  text: Schema.optional(Schema.String),
  secret_text: Schema.optional(Schema.String),
  namespace_id: Schema.optional(Schema.String),
  bucket_name: Schema.optional(Schema.String),
  class_name: Schema.optional(Schema.String),
  script_name: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  queue_name: Schema.optional(Schema.String),
});
export type WorkerBinding = typeof WorkerBinding.Type;

export const WorkerPlacement = Schema.Struct({
  mode: Schema.optional(Schema.Literal("smart")),
});
export type WorkerPlacement = typeof WorkerPlacement.Type;

export const WorkerTailConsumer = Schema.Struct({
  service: Schema.String,
  environment: Schema.optional(Schema.String),
});
export type WorkerTailConsumer = typeof WorkerTailConsumer.Type;

export const WorkerMigration = Schema.Struct({
  tag: Schema.optional(Schema.String),
  deleted_classes: Schema.optional(Schema.Array(Schema.String)),
  new_classes: Schema.optional(Schema.Array(Schema.String)),
  renamed_classes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        from: Schema.String,
        to: Schema.String,
      }),
    ),
  ),
  transferred_classes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        from: Schema.String,
        from_script: Schema.String,
        to: Schema.String,
      }),
    ),
  ),
});
export type WorkerMigration = typeof WorkerMigration.Type;

export const WorkerNamedHandler = Schema.Struct({
  name: Schema.String,
  handlers: Schema.optional(Schema.Array(Schema.String)),
});
export type WorkerNamedHandler = typeof WorkerNamedHandler.Type;

export const WorkerObservability = Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  head_sampling_rate: Schema.optional(Schema.Number),
  logs: Schema.optional(Schema.Struct({
    enabled: Schema.optional(Schema.Boolean),
    head_sampling_rate: Schema.optional(Schema.Number),
    persist: Schema.optional(Schema.Boolean),
    invocation_logs: Schema.optional(Schema.Boolean),
  })),
  traces: Schema.optional(Schema.Struct({
    enabled: Schema.optional(Schema.Boolean),
    persist: Schema.optional(Schema.Boolean),
    head_sampling_rate: Schema.optional(Schema.Number),
    destinations: Schema.optional(Schema.Array(Schema.String)),
  })),
});
export type WorkerObservability = typeof WorkerObservability.Type;

export const WorkerRoute = Schema.Struct({
  id: Schema.optional(Schema.String),
  pattern: Schema.optional(Schema.String),
  script: Schema.optional(Schema.String),
  request_limit_fail_open: Schema.optional(Schema.Boolean),
});
export type WorkerRoute = typeof WorkerRoute.Type;

export const WorkerScript = Schema.Struct({
  id: Schema.String,
  etag: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  handlers: Schema.optional(Schema.Array(Schema.String)),
  named_handlers: Schema.optional(Schema.Array(WorkerNamedHandler)),
  logpush: Schema.optional(Schema.Boolean),
  modified_on: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.String),
  usage_model: Schema.optional(Schema.String),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  placement: Schema.optional(WorkerPlacement),
  tail_consumers: Schema.optional(Schema.NullOr(Schema.Array(WorkerTailConsumer))),
  last_deployed_from: Schema.optional(Schema.String),
  deployment_id: Schema.optional(Schema.String),
  has_assets: Schema.optional(Schema.Boolean),
  has_modules: Schema.optional(Schema.Boolean),
  observability: Schema.optional(WorkerObservability),
  routes: Schema.optional(Schema.NullOr(Schema.Array(WorkerRoute))),
  migration_tag: Schema.optional(Schema.String),
});
export type WorkerScript = typeof WorkerScript.Type;

export const WorkerScriptSettings = Schema.Struct({
  logpush: Schema.optional(Schema.Boolean),
  bindings: Schema.optional(Schema.Array(WorkerBinding)),
  compatibility_date: Schema.optional(Schema.String),
  compatibility_flags: Schema.optional(Schema.Array(Schema.String)),
  placement: Schema.optional(WorkerPlacement),
  tail_consumers: Schema.optional(Schema.Array(WorkerTailConsumer)),
  migrations: Schema.optional(WorkerMigration),
});
export type WorkerScriptSettings = typeof WorkerScriptSettings.Type;

export const ResultInfo = Schema.Struct({
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  total_count: Schema.optional(Schema.Number),
  total_pages: Schema.optional(Schema.Number),
});
export type ResultInfo = typeof ResultInfo.Type;

// =============================================================================
// List Worker Scripts
// =============================================================================

export const ListScriptsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts" }));
export type ListScriptsRequest = typeof ListScriptsRequest.Type;

export const ListScriptsResponse = Schema.Struct({
  result: Schema.Array(WorkerScript),
  result_info: Schema.optional(ResultInfo),
});
export type ListScriptsResponse = typeof ListScriptsResponse.Type;

export const listScripts = API.make(() => ({
  input: ListScriptsRequest,
  output: ListScriptsResponse,
  errors: [],
}));

// =============================================================================
// Get Worker Script
// =============================================================================

export const GetScriptRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}" }));
export type GetScriptRequest = typeof GetScriptRequest.Type;

export const GetScriptResponse = Schema.Struct({
  result: WorkerScript,
});
export type GetScriptResponse = typeof GetScriptResponse.Type;

export const getScript = API.make(() => ({
  input: GetScriptRequest,
  output: GetScriptResponse,
  errors: [],
}));

// =============================================================================
// Delete Worker Script
// =============================================================================

export const DeleteScriptRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/scripts/{script_name}" }));
export type DeleteScriptRequest = typeof DeleteScriptRequest.Type;

export const DeleteScriptResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteScriptResponse = typeof DeleteScriptResponse.Type;

export const deleteScript = API.make(() => ({
  input: DeleteScriptRequest,
  output: DeleteScriptResponse,
  errors: [],
}));

// =============================================================================
// Get Worker Script Settings
// =============================================================================

export const GetScriptSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/settings" }));
export type GetScriptSettingsRequest = typeof GetScriptSettingsRequest.Type;

export const GetScriptSettingsResponse = Schema.Struct({
  result: WorkerScriptSettings,
});
export type GetScriptSettingsResponse = typeof GetScriptSettingsResponse.Type;

export const getScriptSettings = API.make(() => ({
  input: GetScriptSettingsRequest,
  output: GetScriptSettingsResponse,
  errors: [],
}));

// =============================================================================
// Update Worker Script Settings (PATCH)
// =============================================================================

export const PatchScriptSettingsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  settings: WorkerScriptSettings,
}).pipe(T.Http({ method: "PATCH", path: "/accounts/{account_id}/workers/scripts/{script_name}/settings" }));
export type PatchScriptSettingsRequest = typeof PatchScriptSettingsRequest.Type;

export const PatchScriptSettingsResponse = Schema.Struct({
  result: WorkerScriptSettings,
});
export type PatchScriptSettingsResponse = typeof PatchScriptSettingsResponse.Type;

export const patchScriptSettings = API.make(() => ({
  input: PatchScriptSettingsRequest,
  output: PatchScriptSettingsResponse,
  errors: [],
}));

// =============================================================================
// Worker Subdomain
// =============================================================================

export const GetSubdomainRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workers/subdomain" }));
export type GetSubdomainRequest = typeof GetSubdomainRequest.Type;

export const GetSubdomainResponse = Schema.Struct({
  result: Schema.Struct({
    subdomain: Schema.String,
  }),
});
export type GetSubdomainResponse = typeof GetSubdomainResponse.Type;

export const getSubdomain = API.make(() => ({
  input: GetSubdomainRequest,
  output: GetSubdomainResponse,
  errors: [],
}));

// =============================================================================
// Worker Deployments
// =============================================================================

export const ListDeploymentsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/deployments" }));
export type ListDeploymentsRequest = typeof ListDeploymentsRequest.Type;

export const WorkerDeployment = Schema.Struct({
  id: Schema.String,
  source: Schema.optional(Schema.String),
  strategy: Schema.optional(Schema.String),
  author_email: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Unknown),
});
export type WorkerDeployment = typeof WorkerDeployment.Type;

export const ListDeploymentsResponse = Schema.Struct({
  result: Schema.Struct({
    deployments: Schema.optional(Schema.Array(WorkerDeployment)),
  }),
});
export type ListDeploymentsResponse = typeof ListDeploymentsResponse.Type;

export const listDeployments = API.make(() => ({
  input: ListDeploymentsRequest,
  output: ListDeploymentsResponse,
  errors: [],
}));

// =============================================================================
// Worker Versions
// =============================================================================

export const ListVersionsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/versions" }));
export type ListVersionsRequest = typeof ListVersionsRequest.Type;

export const WorkerVersion = Schema.Struct({
  id: Schema.String,
  number: Schema.optional(Schema.Number),
  metadata: Schema.optional(Schema.Unknown),
});
export type WorkerVersion = typeof WorkerVersion.Type;

export const ListVersionsResponse = Schema.Struct({
  result: Schema.Array(WorkerVersion),
});
export type ListVersionsResponse = typeof ListVersionsResponse.Type;

export const listVersions = API.make(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [],
}));

// =============================================================================
// Worker Cron Triggers
// =============================================================================

export const GetCronTriggersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/schedules" }));
export type GetCronTriggersRequest = typeof GetCronTriggersRequest.Type;

export const CronTrigger = Schema.Struct({
  cron: Schema.String,
  created_on: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.String),
});
export type CronTrigger = typeof CronTrigger.Type;

export const GetCronTriggersResponse = Schema.Struct({
  result: Schema.Struct({
    schedules: Schema.Array(CronTrigger),
  }),
});
export type GetCronTriggersResponse = typeof GetCronTriggersResponse.Type;

export const getCronTriggers = API.make(() => ({
  input: GetCronTriggersRequest,
  output: GetCronTriggersResponse,
  errors: [],
}));

export const UpdateCronTriggersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  crons: Schema.Array(Schema.Struct({ cron: Schema.String })),
}).pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/workers/scripts/{script_name}/schedules" }));
export type UpdateCronTriggersRequest = typeof UpdateCronTriggersRequest.Type;

export const UpdateCronTriggersResponse = Schema.Struct({
  result: Schema.Struct({
    schedules: Schema.Array(CronTrigger),
  }),
});
export type UpdateCronTriggersResponse = typeof UpdateCronTriggersResponse.Type;

export const updateCronTriggers = API.make(() => ({
  input: UpdateCronTriggersRequest,
  output: UpdateCronTriggersResponse,
  errors: [],
}));

// =============================================================================
// Worker Tails (Realtime Logs)
// =============================================================================

export const ListTailsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workers/scripts/{script_name}/tails" }));
export type ListTailsRequest = typeof ListTailsRequest.Type;

export const WorkerTail = Schema.Struct({
  id: Schema.String,
  url: Schema.optional(Schema.String),
  expires_at: Schema.optional(Schema.String),
});
export type WorkerTail = typeof WorkerTail.Type;

export const ListTailsResponse = Schema.Struct({
  result: Schema.Array(WorkerTail),
});
export type ListTailsResponse = typeof ListTailsResponse.Type;

export const listTails = API.make(() => ({
  input: ListTailsRequest,
  output: ListTailsResponse,
  errors: [],
}));

export const CreateTailRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/workers/scripts/{script_name}/tails" }));
export type CreateTailRequest = typeof CreateTailRequest.Type;

export const CreateTailResponse = Schema.Struct({
  result: WorkerTail,
});
export type CreateTailResponse = typeof CreateTailResponse.Type;

export const createTail = API.make(() => ({
  input: CreateTailRequest,
  output: CreateTailResponse,
  errors: [],
}));

export const DeleteTailRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  script_name: Schema.String.pipe(T.HttpPath("script_name")),
  tail_id: Schema.String.pipe(T.HttpPath("tail_id")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/workers/scripts/{script_name}/tails/{tail_id}" }));
export type DeleteTailRequest = typeof DeleteTailRequest.Type;

export const DeleteTailResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteTailResponse = typeof DeleteTailResponse.Type;

export const deleteTail = API.make(() => ({
  input: DeleteTailRequest,
  output: DeleteTailResponse,
  errors: [],
}));
