/**
 * Workers API Tests
 *
 * Tests for Cloudflare Workers operations including account settings,
 * script listing, upload, and worker management.
 *
 * Workers are created and cleaned up for each test using the withWorker helper.
 */

import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "../test.ts";
import * as Workers from "../../src/services/workers.ts";

const accountId = () => getAccountId();

// Simple ES module worker script
const SIMPLE_WORKER_SCRIPT = `
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello from test worker!");
  }
};
`;

/**
 * Create a FormData body for uploading a worker script.
 * This matches the format expected by Cloudflare's API.
 */
const createWorkerFormData = (script: string, mainModule: string = "worker.js") => {
  const formData = new FormData();

  // Add the main module as a blob with the correct content type
  formData.append(
    mainModule,
    new Blob([script], { type: "application/javascript+module" }),
    mainModule,
  );

  // Add metadata
  formData.append(
    "metadata",
    new Blob(
      [
        JSON.stringify({
          main_module: mainModule,
          compatibility_date: "2024-01-01",
          compatibility_flags: [],
        }),
      ],
      { type: "application/json" },
    ),
    "metadata",
  );

  return formData;
};

// Cleanup helper - deletes worker if it exists, ignores errors
const cleanup = (name: string) =>
  Workers.deleteWorker1({
    account_id: accountId(),
    script_name: name,
    force: true,
  }).pipe(Effect.ignore);

// Helper to create a worker and run a test, then cleanup
const withWorker = <A, E, R>(name: string, fn: (scriptName: string) => Effect.Effect<A, E, R>) =>
  cleanup(name).pipe(
    Effect.andThen(
      Workers.workerScriptUploadWorkerModule({
        account_id: accountId(),
        script_name: name,
        body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
      }),
    ),
    Effect.andThen(fn(name)),
    Effect.ensuring(cleanup(name)),
  );

describe("Workers", () => {
  describe("Account Settings", () => {
    test("get worker account settings", () =>
      Effect.gen(function* () {
        const response = yield* Workers.workerAccountSettingsFetchWorkerAccountSettings({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));
  });

  describe("Script Listing", () => {
    test("list workers", () =>
      Effect.gen(function* () {
        const response = yield* Workers.listWorkers({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));

    test("search workers", () =>
      Effect.gen(function* () {
        const response = yield* Workers.workerScriptSearchWorkers({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));

    test("search workers with pagination", () =>
      Effect.gen(function* () {
        const response = yield* Workers.workerScriptSearchWorkers({
          account_id: accountId(),
          page: 1,
          per_page: 10,
          order_by: "name",
        });
        expect(response.result).toBeDefined();
        // result_info may not be returned by the API in all cases
      }));
  });

  describe("Dispatch Namespaces", () => {
    test("list dispatch namespaces", () =>
      Effect.gen(function* () {
        const response = yield* Workers.list({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));
  });

  // Note: Regions (Smart Placement) endpoint requires special account features
  // and is not available on all accounts

  describe("Worker CRUD", () => {
    test("upload and delete worker", () =>
      Effect.gen(function* () {
        const name = "itty-cf-workers-crud";
        yield* cleanup(name);

        // Upload worker
        const uploaded = yield* Workers.workerScriptUploadWorkerModule({
          account_id: accountId(),
          script_name: name,
          body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
        });
        expect(uploaded.result).toBeDefined();

        // Delete worker
        yield* Workers.deleteWorker1({
          account_id: accountId(),
          script_name: name,
          force: true,
        });
      }));

    test("get worker script settings", () =>
      withWorker("itty-cf-workers-settings", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.getSettings({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("list worker deployments", () =>
      withWorker("itty-cf-workers-deployments", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.listDeployments({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("get worker cron triggers", () =>
      withWorker("itty-cf-workers-cron", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.getCronTriggers({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("list worker versions", () =>
      withWorker("itty-cf-workers-versions", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.listVersions({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("get worker subdomain", () =>
      withWorker("itty-cf-workers-subdomain", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.getSubdomain({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));
  });
});
