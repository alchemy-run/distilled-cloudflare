/**
 * Cloudflare Workflows API
 *
 * Operations for managing Cloudflare Workflows.
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import * as Workflows from "distilled-cloudflare/workflows";
 *
 * const program = Effect.gen(function* () {
 *   const workflows = yield* Workflows.listWorkflows({
 *     account_id: "your-account-id",
 *   });
 *   return workflows;
 * });
 * ```
 */

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// =============================================================================
// Shared Types
// =============================================================================

export const WorkflowStatus = Schema.Literal(
  "active",
  "paused",
  "deleted",
);
export type WorkflowStatus = typeof WorkflowStatus.Type;

export const InstanceStatus = Schema.Literal(
  "queued",
  "running",
  "paused",
  "errored",
  "terminated",
  "complete",
  "waiting",
  "waitingForPause",
  "unknown",
);
export type InstanceStatus = typeof InstanceStatus.Type;

export const Workflow = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  script_name: Schema.optional(Schema.String),
  class_name: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.String),
});
export type Workflow = typeof Workflow.Type;

export const WorkflowVersion = Schema.Struct({
  id: Schema.String,
  workflow_id: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.String),
});
export type WorkflowVersion = typeof WorkflowVersion.Type;

export const WorkflowInstance = Schema.Struct({
  id: Schema.String,
  workflow_id: Schema.optional(Schema.String),
  version_id: Schema.optional(Schema.String),
  status: Schema.optional(InstanceStatus),
  created_on: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.String),
  queued_on: Schema.optional(Schema.String),
  started_on: Schema.optional(Schema.String),
  ended_on: Schema.optional(Schema.String),
  params: Schema.optional(Schema.Unknown),
  output: Schema.optional(Schema.Unknown),
  error: Schema.optional(Schema.Struct({
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  })),
  trigger: Schema.optional(Schema.Struct({
    source: Schema.optional(Schema.String),
  })),
});
export type WorkflowInstance = typeof WorkflowInstance.Type;

export const StepLog = Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  start: Schema.optional(Schema.String),
  end: Schema.optional(Schema.String),
  config: Schema.optional(Schema.Unknown),
  output: Schema.optional(Schema.Unknown),
  success: Schema.optional(Schema.Boolean),
});
export type StepLog = typeof StepLog.Type;

export const ResultInfo = Schema.Struct({
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  total_count: Schema.optional(Schema.Number),
  cursor: Schema.optional(Schema.String),
});
export type ResultInfo = typeof ResultInfo.Type;

// =============================================================================
// List Workflows
// =============================================================================

export const ListWorkflowsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workflows" }));
export type ListWorkflowsRequest = typeof ListWorkflowsRequest.Type;

export const ListWorkflowsResponse = Schema.Struct({
  result: Schema.Array(Workflow),
  result_info: Schema.optional(ResultInfo),
});
export type ListWorkflowsResponse = typeof ListWorkflowsResponse.Type;

export const listWorkflows = API.makePaginated(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
  errors: [],
  pagination: {
    inputToken: "page",
    outputToken: "result_info.page",
    items: "result",
    pageSize: "per_page",
  },
}));

// =============================================================================
// Get Workflow
// =============================================================================

export const GetWorkflowRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}" }));
export type GetWorkflowRequest = typeof GetWorkflowRequest.Type;

export const GetWorkflowResponse = Schema.Struct({
  result: Workflow,
});
export type GetWorkflowResponse = typeof GetWorkflowResponse.Type;

export const getWorkflow = API.make(() => ({
  input: GetWorkflowRequest,
  output: GetWorkflowResponse,
  errors: [],
}));

// =============================================================================
// Delete Workflow
// =============================================================================

export const DeleteWorkflowRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/workflows/{workflow_name}" }));
export type DeleteWorkflowRequest = typeof DeleteWorkflowRequest.Type;

export const DeleteWorkflowResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteWorkflowResponse = typeof DeleteWorkflowResponse.Type;

export const deleteWorkflow = API.make(() => ({
  input: DeleteWorkflowRequest,
  output: DeleteWorkflowResponse,
  errors: [],
}));

// =============================================================================
// List Workflow Instances
// =============================================================================

export const ListInstancesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  per_page: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  status: Schema.optional(InstanceStatus).pipe(T.HttpQuery("status")),
  date_start: Schema.optional(Schema.String).pipe(T.HttpQuery("date_start")),
  date_end: Schema.optional(Schema.String).pipe(T.HttpQuery("date_end")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/instances" }));
export type ListInstancesRequest = typeof ListInstancesRequest.Type;

export const ListInstancesResponse = Schema.Struct({
  result: Schema.Array(WorkflowInstance),
  result_info: Schema.optional(ResultInfo),
});
export type ListInstancesResponse = typeof ListInstancesResponse.Type;

export const listInstances = API.makePaginated(() => ({
  input: ListInstancesRequest,
  output: ListInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "page",
    outputToken: "result_info.page",
    items: "result",
    pageSize: "per_page",
  },
}));

// =============================================================================
// Create Workflow Instance (Run Workflow)
// =============================================================================

export const CreateInstanceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  params: Schema.optional(Schema.Unknown),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/workflows/{workflow_name}/instances" }));
export type CreateInstanceRequest = typeof CreateInstanceRequest.Type;

export const CreateInstanceResponse = Schema.Struct({
  result: WorkflowInstance,
});
export type CreateInstanceResponse = typeof CreateInstanceResponse.Type;

export const createInstance = API.make(() => ({
  input: CreateInstanceRequest,
  output: CreateInstanceResponse,
  errors: [],
}));

// =============================================================================
// Get Workflow Instance
// =============================================================================

export const GetInstanceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  instance_id: Schema.String.pipe(T.HttpPath("instance_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}" }));
export type GetInstanceRequest = typeof GetInstanceRequest.Type;

export const GetInstanceResponse = Schema.Struct({
  result: WorkflowInstance,
});
export type GetInstanceResponse = typeof GetInstanceResponse.Type;

export const getInstance = API.make(() => ({
  input: GetInstanceRequest,
  output: GetInstanceResponse,
  errors: [],
}));

// =============================================================================
// Pause Workflow Instance
// =============================================================================

export const PauseInstanceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  instance_id: Schema.String.pipe(T.HttpPath("instance_id")),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/pause" }));
export type PauseInstanceRequest = typeof PauseInstanceRequest.Type;

export const PauseInstanceResponse = Schema.Struct({
  result: WorkflowInstance,
});
export type PauseInstanceResponse = typeof PauseInstanceResponse.Type;

export const pauseInstance = API.make(() => ({
  input: PauseInstanceRequest,
  output: PauseInstanceResponse,
  errors: [],
}));

// =============================================================================
// Resume Workflow Instance
// =============================================================================

export const ResumeInstanceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  instance_id: Schema.String.pipe(T.HttpPath("instance_id")),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/resume" }));
export type ResumeInstanceRequest = typeof ResumeInstanceRequest.Type;

export const ResumeInstanceResponse = Schema.Struct({
  result: WorkflowInstance,
});
export type ResumeInstanceResponse = typeof ResumeInstanceResponse.Type;

export const resumeInstance = API.make(() => ({
  input: ResumeInstanceRequest,
  output: ResumeInstanceResponse,
  errors: [],
}));

// =============================================================================
// Terminate Workflow Instance
// =============================================================================

export const TerminateInstanceRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  instance_id: Schema.String.pipe(T.HttpPath("instance_id")),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/terminate" }));
export type TerminateInstanceRequest = typeof TerminateInstanceRequest.Type;

export const TerminateInstanceResponse = Schema.Struct({
  result: WorkflowInstance,
});
export type TerminateInstanceResponse = typeof TerminateInstanceResponse.Type;

export const terminateInstance = API.make(() => ({
  input: TerminateInstanceRequest,
  output: TerminateInstanceResponse,
  errors: [],
}));

// =============================================================================
// Get Workflow Instance Status
// =============================================================================

export const GetInstanceStatusRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  instance_id: Schema.String.pipe(T.HttpPath("instance_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/status" }));
export type GetInstanceStatusRequest = typeof GetInstanceStatusRequest.Type;

export const GetInstanceStatusResponse = Schema.Struct({
  result: Schema.Struct({
    status: InstanceStatus,
    output: Schema.optional(Schema.Unknown),
    error: Schema.optional(Schema.Struct({
      name: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    })),
  }),
});
export type GetInstanceStatusResponse = typeof GetInstanceStatusResponse.Type;

export const getInstanceStatus = API.make(() => ({
  input: GetInstanceStatusRequest,
  output: GetInstanceStatusResponse,
  errors: [],
}));

// =============================================================================
// Get Workflow Instance Logs (Step Logs)
// =============================================================================

export const GetInstanceLogsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  instance_id: Schema.String.pipe(T.HttpPath("instance_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/logs" }));
export type GetInstanceLogsRequest = typeof GetInstanceLogsRequest.Type;

export const GetInstanceLogsResponse = Schema.Struct({
  result: Schema.Array(StepLog),
});
export type GetInstanceLogsResponse = typeof GetInstanceLogsResponse.Type;

export const getInstanceLogs = API.make(() => ({
  input: GetInstanceLogsRequest,
  output: GetInstanceLogsResponse,
  errors: [],
}));

// =============================================================================
// List Workflow Versions
// =============================================================================

export const ListVersionsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/versions" }));
export type ListVersionsRequest = typeof ListVersionsRequest.Type;

export const ListVersionsResponse = Schema.Struct({
  result: Schema.Array(WorkflowVersion),
});
export type ListVersionsResponse = typeof ListVersionsResponse.Type;

export const listVersions = API.make(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [],
}));

// =============================================================================
// Get Workflow Version
// =============================================================================

export const GetVersionRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  workflow_name: Schema.String.pipe(T.HttpPath("workflow_name")),
  version_id: Schema.String.pipe(T.HttpPath("version_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}" }));
export type GetVersionRequest = typeof GetVersionRequest.Type;

export const GetVersionResponse = Schema.Struct({
  result: WorkflowVersion,
});
export type GetVersionResponse = typeof GetVersionResponse.Type;

export const getVersion = API.make(() => ({
  input: GetVersionRequest,
  output: GetVersionResponse,
  errors: [],
}));
