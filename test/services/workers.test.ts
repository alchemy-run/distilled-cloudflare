/**
 * Workers API Tests
 *
 * Tests for Cloudflare Workers operations including account settings,
 * script listing, upload, worker management, secrets, bindings,
 * cron triggers, versions, dispatch namespaces, and error handling.
 *
 * Workers are created and cleaned up for each test using the withWorker helper.
 */

import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import * as Duration from "effect/Duration";
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

    test("get worker settings with bindings", () =>
      withWorker("itty-cf-workers-bindings", (scriptName) =>
        Effect.gen(function* () {
          // getSettings1 returns full settings including bindings
          const response = yield* Workers.getSettings1({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
          // Bindings field exists (may be empty for simple worker)
          expect(response.result.bindings !== undefined || response.result.bindings === null).toBe(
            true,
          );
        }),
      ));

    test("get usage model", () =>
      withWorker("itty-cf-workers-usage", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.workerScriptFetchUsageModel({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("get version detail", () =>
      withWorker("itty-cf-workers-version-detail", (scriptName) =>
        Effect.gen(function* () {
          const versions = yield* Workers.listVersions({
            account_id: accountId(),
            script_name: scriptName,
          });
          const versionId = versions.result?.items?.[0]?.id;
          if (versionId) {
            const detail = yield* Workers.getVersionDetail({
              account_id: accountId(),
              script_name: scriptName,
              version_id: versionId,
            });
            expect(detail.result).toBeDefined();
          }
        }),
      ));

    test("download worker script content", () =>
      withWorker("itty-cf-workers-download", (scriptName) =>
        Effect.gen(function* () {
          const formData = yield* Workers.getContent({
            account_id: accountId(),
            script_name: scriptName,
          });
          // Response is FormData with worker modules
          expect(formData).toBeInstanceOf(FormData);
          // Get all entries to find the module
          const entries = [...formData.entries()];
          expect(entries.length).toBeGreaterThan(0);
          // Get the first entry (main module) - FormDataEntryValue is string | File
          const [, value] = entries[0];
          expect(value).toBeInstanceOf(File);
          const file = value as unknown as File;
          const text = yield* Effect.promise(() => file.text());
          expect(text).toBe(SIMPLE_WORKER_SCRIPT);
        }),
      ));
  });

  describe("Secrets", () => {
    test("put and list secrets", () =>
      withWorker("itty-cf-workers-secrets", (scriptName) =>
        Effect.gen(function* () {
          // Put a secret
          yield* Workers.putScriptSecret({
            account_id: accountId(),
            script_name: scriptName,
            body: { name: "MY_SECRET", text: "secret-value", type: "secret_text" },
          });

          // List secrets (should include our secret)
          const secrets = yield* Workers.listScriptSecrets1({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(secrets.result).toBeDefined();
          expect(Array.isArray(secrets.result)).toBe(true);
        }),
      ));

    test("put, list, and delete secret", () =>
      withWorker("itty-cf-workers-secrets-crud", (scriptName) =>
        Effect.gen(function* () {
          const secretName = "TEST_SECRET";

          // Put a secret
          yield* Workers.putScriptSecret({
            account_id: accountId(),
            script_name: scriptName,
            body: { name: secretName, text: "my-secret-value", type: "secret_text" },
          });

          // List secrets to verify it was created
          const secretsBefore = yield* Workers.listScriptSecrets1({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(secretsBefore.result).toBeDefined();
          expect(secretsBefore.result.some((s) => s.name === secretName)).toBe(true);

          // Delete the secret
          yield* Workers.deleteScriptSecret1({
            account_id: accountId(),
            script_name: scriptName,
            secret_name: secretName,
          });

          // Verify deletion by listing
          const secretsAfter = yield* Workers.listScriptSecrets1({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(secretsAfter.result).toBeDefined();
          expect(secretsAfter.result.some((s) => s.name === secretName)).toBe(false);
        }),
      ));
  });

  describe("Cron Triggers", () => {
    test("update cron triggers", () =>
      withWorker("itty-cf-workers-cron-update", (scriptName) =>
        Effect.gen(function* () {
          // Update cron triggers
          yield* Workers.updateCronTriggers({
            account_id: accountId(),
            script_name: scriptName,
            body: [{ cron: "*/5 * * * *" }],
          });

          // Verify the triggers were set
          const triggers = yield* Workers.getCronTriggers({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(triggers.result).toBeDefined();
          expect(triggers.result.schedules).toBeDefined();
        }),
      ));

    test("set multiple cron triggers", () =>
      withWorker("itty-cf-workers-cron-multi", (scriptName) =>
        Effect.gen(function* () {
          // Set multiple cron triggers
          yield* Workers.updateCronTriggers({
            account_id: accountId(),
            script_name: scriptName,
            body: [{ cron: "0 * * * *" }, { cron: "0 0 * * *" }],
          });

          const triggers = yield* Workers.getCronTriggers({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(triggers.result.schedules.length).toBeGreaterThanOrEqual(2);
        }),
      ));
  });

  describe("Settings", () => {
    test("patch worker settings", () =>
      withWorker("itty-cf-workers-patch-settings", (scriptName) =>
        Effect.gen(function* () {
          // Patch settings
          yield* Workers.patchSettings({
            account_id: accountId(),
            script_name: scriptName,
            body: { logpush: false },
          });

          // Verify the settings
          const settings = yield* Workers.getSettings({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(settings.result).toBeDefined();
        }),
      ));

    test("patch worker settings with tags", () =>
      withWorker("itty-cf-workers-patch-tags", (scriptName) =>
        Effect.gen(function* () {
          // Patch settings with tags
          yield* Workers.patchSettings({
            account_id: accountId(),
            script_name: scriptName,
            body: { tags: ["env:test", "team:infra"] },
          });

          // Verify the settings
          const settings = yield* Workers.getSettings({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(settings.result).toBeDefined();
        }),
      ));
  });

  describe("Dispatch Namespaces", () => {
    // Cleanup helper for namespaces
    const cleanupNamespace = (name: string) =>
      Workers.deleteNamespace({
        account_id: accountId(),
        dispatch_namespace: name,
      }).pipe(Effect.ignore);

    test("create and delete namespace", () =>
      Effect.gen(function* () {
        const name = "itty-cf-workers-ns";
        yield* cleanupNamespace(name);

        // Create namespace
        yield* Workers.create({
          account_id: accountId(),
          body: { name },
        });

        // Wait for eventual consistency
        yield* Effect.sleep(Duration.seconds(1));

        // Verify by getting the namespace
        const fetched = yield* Workers.getNamespace({
          account_id: accountId(),
          dispatch_namespace: name,
        });
        expect(fetched.result).toBeDefined();
        expect(fetched.result.namespace_name).toBe(name);

        // Delete namespace
        yield* Workers.deleteNamespace({
          account_id: accountId(),
          dispatch_namespace: name,
        });
      }));

    test("create, verify, and delete namespace", () =>
      Effect.gen(function* () {
        const name = "itty-cf-workers-ns-crud";
        yield* cleanupNamespace(name);

        // Create namespace
        yield* Workers.create({
          account_id: accountId(),
          body: { name },
        });

        // Wait for eventual consistency
        yield* Effect.sleep(Duration.seconds(1));

        // Verify by getting the namespace
        const fetched = yield* Workers.getNamespace({
          account_id: accountId(),
          dispatch_namespace: name,
        });
        expect(fetched.result).toBeDefined();
        expect(fetched.result.namespace_name).toBe(name);

        // Delete namespace
        yield* Workers.deleteNamespace({
          account_id: accountId(),
          dispatch_namespace: name,
        });
      }));

    test("list scripts in namespace", () =>
      Effect.gen(function* () {
        const name = "itty-cf-workers-ns-scripts";
        yield* cleanupNamespace(name);

        // Create namespace
        yield* Workers.create({
          account_id: accountId(),
          body: { name },
        });

        // List scripts in namespace (should be empty initially)
        const scripts = yield* Workers.listScripts({
          account_id: accountId(),
          dispatch_namespace: name,
        });
        expect(scripts.result).toBeDefined();

        // Cleanup
        yield* cleanupNamespace(name);
      }));
  });

  describe("Error Handling", () => {
    test("WorkerNotFound error when getting non-existent worker settings", () =>
      Workers.getSettings({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-worker-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
          if (error._tag === "WorkerNotFound") {
            expect(error.code).toBe(10007);
          }
        }),
      ));

    test("WorkerNotFound error when listing versions of non-existent worker", () =>
      Workers.listVersions({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-worker-versions",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));

    test("WorkerNotFound error when listing deployments of non-existent worker", () =>
      Workers.listDeployments({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-worker-deployments",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));

    test("InvalidWorkerName error with invalid name", () =>
      Workers.workerScriptUploadWorkerModule({
        account_id: accountId(),
        script_name: "INVALID_NAME!@#$%",
        body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("InvalidWorkerName");
          if (error._tag === "InvalidWorkerName") {
            expect(error.code).toBe(10016);
          }
        }),
      ));
  });
});
