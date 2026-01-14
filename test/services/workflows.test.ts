/**
 * Workflows API Tests
 *
 * Tests for Cloudflare Workflows operations including creating/modifying workflows,
 * listing workflows, managing instances, and version operations.
 *
 * Workflows require a Worker script that exports a Workflow class.
 * Tests create the worker and workflow, run tests, then clean up.
 */

import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "../test.ts";
import * as Workflows from "~/services/workflows.ts";
import * as Workers from "~/services/workers.ts";

const accountId = () => getAccountId();

// Worker script that exports a simple Workflow class
const WORKFLOW_WORKER_SCRIPT = `
import { WorkflowEntrypoint } from "cloudflare:workers";

export class TestWorkflow extends WorkflowEntrypoint {
  async run(event, step) {
    const result = await step.do("step1", async () => {
      return { message: "Hello from workflow!" };
    });
    return result;
  }
}

export default {
  async fetch(request, env, ctx) {
    return new Response("Workflow worker");
  }
};
`;

const WORKFLOW_CLASS_NAME = "TestWorkflow";

/**
 * Create a FormData body for uploading a worker script.
 */
const createWorkerFormData = (script: string, mainModule: string = "worker.js") => {
  const formData = new FormData();

  formData.append(
    mainModule,
    new Blob([script], { type: "application/javascript+module" }),
    mainModule,
  );

  formData.append(
    "metadata",
    new Blob(
      [
        JSON.stringify({
          main_module: mainModule,
          compatibility_date: "2024-01-01",
          compatibility_flags: ["nodejs_compat"],
        }),
      ],
      { type: "application/json" },
    ),
    "metadata",
  );

  return formData;
};

// Cleanup helpers
const cleanupWorker = (name: string) =>
  Workers.deleteWorker1({
    account_id: accountId(),
    script_name: name,
    force: true,
  }).pipe(Effect.ignore);

const cleanupWorkflow = (name: string) =>
  Workflows.deleteWorkflow({
    account_id: accountId(),
    workflow_name: name,
  }).pipe(Effect.ignore);

/**
 * Create a worker + workflow, run a test, then clean up.
 * The worker and workflow share the same base name.
 */
const withWorkflow = <A, E, R>(
  baseName: string,
  fn: (workflowName: string, scriptName: string) => Effect.Effect<A, E, R>,
) => {
  const scriptName = `${baseName}-worker`;
  const workflowName = baseName;

  return Effect.gen(function* () {
    // Clean up any leftover resources
    yield* cleanupWorkflow(workflowName);
    yield* cleanupWorker(scriptName);

    // Create the worker script
    yield* Workers.workerScriptUploadWorkerModule({
      account_id: accountId(),
      script_name: scriptName,
      body: createWorkerFormData(WORKFLOW_WORKER_SCRIPT),
    });

    // Create the workflow pointing to the worker
    yield* Workflows.createOrModifyWorkflow({
      account_id: accountId(),
      workflow_name: workflowName,
      body: {
        script_name: scriptName,
        class_name: WORKFLOW_CLASS_NAME,
      },
    });

    // Run the test
    return yield* fn(workflowName, scriptName);
  }).pipe(
    Effect.ensuring(cleanupWorkflow(workflowName).pipe(Effect.andThen(cleanupWorker(scriptName)))),
  );
};

describe("Workflows", () => {
  describe("Workflow Listing", () => {
    test("list workflows", () =>
      Effect.gen(function* () {
        const response = yield* Workflows.listWorkflows({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));

    test("list workflows with pagination", () =>
      Effect.gen(function* () {
        const response = yield* Workflows.listWorkflows({
          account_id: accountId(),
          page: 1,
          per_page: 10,
        });
        expect(response.result).toBeDefined();
      }));
  });

  describe("Workflow CRUD", () => {
    test("create and delete workflow", () =>
      Effect.gen(function* () {
        const scriptName = "itty-cf-workflow-crud-worker";
        const workflowName = "itty-cf-workflow-crud";

        // Cleanup first
        yield* cleanupWorkflow(workflowName);
        yield* cleanupWorker(scriptName);

        // Create worker
        yield* Workers.workerScriptUploadWorkerModule({
          account_id: accountId(),
          script_name: scriptName,
          body: createWorkerFormData(WORKFLOW_WORKER_SCRIPT),
        });

        // Create workflow
        const created = yield* Workflows.createOrModifyWorkflow({
          account_id: accountId(),
          workflow_name: workflowName,
          body: {
            script_name: scriptName,
            class_name: WORKFLOW_CLASS_NAME,
          },
        });
        expect(created.result).toBeDefined();

        // Get workflow details
        const details = yield* Workflows.getWorkflowDetails({
          account_id: accountId(),
          workflow_name: workflowName,
        });
        expect(details.result).toBeDefined();

        // Delete workflow
        yield* Workflows.deleteWorkflow({
          account_id: accountId(),
          workflow_name: workflowName,
        });

        // Delete worker
        yield* Workers.deleteWorker1({
          account_id: accountId(),
          script_name: scriptName,
          force: true,
        });
      }));

    test("update workflow", () =>
      withWorkflow("itty-cf-workflow-update", (workflowName, scriptName) =>
        Effect.gen(function* () {
          // Update the workflow (idempotent - same values)
          const response = yield* Workflows.createOrModifyWorkflow({
            account_id: accountId(),
            workflow_name: workflowName,
            body: {
              script_name: scriptName,
              class_name: WORKFLOW_CLASS_NAME,
            },
          });
          expect(response.result).toBeDefined();
        }),
      ));
  });

  describe("Workflow Details", () => {
    test("get workflow details", () =>
      withWorkflow("itty-cf-workflow-details", (workflowName) =>
        Effect.gen(function* () {
          const response = yield* Workflows.getWorkflowDetails({
            account_id: accountId(),
            workflow_name: workflowName,
          });
          expect(response.result).toBeDefined();
        }),
      ));
  });

  describe("Workflow Versions", () => {
    test("list workflow versions", () =>
      withWorkflow("itty-cf-workflow-versions", (workflowName) =>
        Effect.gen(function* () {
          const response = yield* Workflows.listWorkflowVersions({
            account_id: accountId(),
            workflow_name: workflowName,
          });
          expect(response.result).toBeDefined();
        }),
      ));
  });

  describe("Workflow Instances", () => {
    test("list workflow instances", () =>
      withWorkflow("itty-cf-workflow-instances", (workflowName) =>
        Effect.gen(function* () {
          const response = yield* Workflows.listWorkflowInstances({
            account_id: accountId(),
            workflow_name: workflowName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("list workflow instances with filters", () =>
      withWorkflow("itty-cf-workflow-instances-filter", (workflowName) =>
        Effect.gen(function* () {
          const response = yield* Workflows.listWorkflowInstances({
            account_id: accountId(),
            workflow_name: workflowName,
            per_page: 10,
            status: "complete",
          });
          expect(response.result).toBeDefined();
        }),
      ));
  });
});
