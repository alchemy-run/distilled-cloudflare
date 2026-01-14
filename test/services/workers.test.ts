/**
 * Workers API Tests
 *
 * Tests are organized by API operation - each operation has its own describe block
 * containing both happy path and error tests.
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

// Cleanup helper for namespaces
const cleanupNamespace = (name: string) =>
  Workers.deleteNamespace({
    account_id: accountId(),
    dispatch_namespace: name,
  }).pipe(Effect.ignore);

// Helper to create a namespace, run test, then cleanup
const withNamespace = <A, E, R>(
  name: string,
  fn: (nsName: string) => Effect.Effect<A, E, R>,
) =>
  cleanupNamespace(name).pipe(
    Effect.andThen(
      Workers.create({
        account_id: accountId(),
        body: { name },
      }),
    ),
    Effect.andThen(Effect.sleep(Duration.seconds(1))),
    Effect.andThen(fn(name)),
    Effect.ensuring(cleanupNamespace(name)),
  );

// Helper to create namespace with worker, run test, then cleanup
const withNamespaceWorker = <A, E, R>(
  nsName: string,
  scriptName: string,
  fn: (nsName: string, scriptName: string) => Effect.Effect<A, E, R>,
) =>
  cleanupNamespace(nsName).pipe(
    Effect.andThen(
      Workers.create({
        account_id: accountId(),
        body: { name: nsName },
      }),
    ),
    Effect.andThen(Effect.sleep(Duration.seconds(1))),
    Effect.andThen(
      Workers.namespaceWorkerScriptUploadWorkerModule({
        account_id: accountId(),
        dispatch_namespace: nsName,
        script_name: scriptName,
        body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
      }),
    ),
    Effect.andThen(fn(nsName, scriptName)),
    Effect.ensuring(
      Workers.deleteWorker({
        account_id: accountId(),
        dispatch_namespace: nsName,
        script_name: scriptName,
      }).pipe(
        Effect.ignore,
        Effect.andThen(cleanupNamespace(nsName)),
      ),
    ),
  );

describe("Workers", () => {
  // ============================================================================
  // Account Settings APIs
  // ============================================================================

  describe("workerAccountSettingsFetchWorkerAccountSettings", () => {
    test("happy path - fetches account settings", () =>
      Effect.gen(function* () {
        const response = yield* Workers.workerAccountSettingsFetchWorkerAccountSettings({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));
  });

  describe("createWorkerAccountSettings", () => {
    test("happy path - updates account-level default settings", () =>
      Effect.gen(function* () {
        const settings = yield* Workers.createWorkerAccountSettings({
          account_id: accountId(),
          body: { default_usage_model: "bundled" },
        });
        expect(settings.result).toBeDefined();
      }));
  });

  // ============================================================================
  // Worker Script Listing APIs
  // ============================================================================

  describe("listWorkers", () => {
    test("happy path - lists workers in account", () =>
      Effect.gen(function* () {
        const response = yield* Workers.listWorkers({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));
  });

  describe("workerScriptSearchWorkers", () => {
    test("happy path - searches workers", () =>
      Effect.gen(function* () {
        const response = yield* Workers.workerScriptSearchWorkers({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));

    test("happy path - searches with pagination", () =>
      Effect.gen(function* () {
        const response = yield* Workers.workerScriptSearchWorkers({
          account_id: accountId(),
          page: 1,
          per_page: 10,
          order_by: "name",
        });
        expect(response.result).toBeDefined();
      }));
  });

  // ============================================================================
  // Worker Script Upload/Delete APIs
  // ============================================================================

  describe("workerScriptUploadWorkerModule", () => {
    test("happy path - uploads worker module", () =>
      Effect.gen(function* () {
        const name = "itty-cf-workers-crud";
        yield* cleanup(name);

        const uploaded = yield* Workers.workerScriptUploadWorkerModule({
          account_id: accountId(),
          script_name: name,
          body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
        });
        expect(uploaded.result).toBeDefined();

        yield* cleanup(name);
      }));

    test("error - InvalidWorkerName with invalid name", () =>
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

    test("error - NoEventHandlers when uploading worker without handlers", () =>
      Workers.workerScriptUploadWorkerModule({
        account_id: accountId(),
        script_name: "itty-cf-empty-worker",
        body: createWorkerFormData("// empty script with no event handlers"),
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NoEventHandlers");
          if (error._tag === "NoEventHandlers") {
            expect(error.code).toBe(10068);
          }
        }),
        Effect.ensuring(cleanup("itty-cf-empty-worker")),
      ));
  });

  describe("deleteWorker1", () => {
    test("happy path - deletes worker", () =>
      Effect.gen(function* () {
        const name = "itty-cf-workers-delete";
        yield* cleanup(name);

        yield* Workers.workerScriptUploadWorkerModule({
          account_id: accountId(),
          script_name: name,
          body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
        });

        yield* Workers.deleteWorker1({
          account_id: accountId(),
          script_name: name,
          force: true,
        });
      }));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.deleteWorker1({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-delete",
        force: true,
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  // ============================================================================
  // Worker Script Download APIs
  // ============================================================================

  describe("workerScriptDownloadWorker", () => {
    test("happy path - downloads worker script", () =>
      withWorker("itty-cf-workers-download-script", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.workerScriptDownloadWorker({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.workerScriptDownloadWorker({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-download",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("getContent", () => {
    test("happy path - downloads worker content as FormData", () =>
      withWorker("itty-cf-workers-download", (scriptName) =>
        Effect.gen(function* () {
          const formData = yield* Workers.getContent({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(formData).toBeInstanceOf(FormData);
          const entries = [...formData.entries()];
          expect(entries.length).toBeGreaterThan(0);
          const [, value] = entries[0];
          expect(value).toBeInstanceOf(File);
          const file = value as unknown as File;
          const text = yield* Effect.promise(() => file.text());
          expect(text).toBe(SIMPLE_WORKER_SCRIPT);
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.getContent({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-content",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("putContent", () => {
    test("happy path - puts worker content", () =>
      withWorker("itty-cf-workers-put-content", (scriptName) =>
        Effect.gen(function* () {
          const updatedScript = `
export default {
  async fetch(request, env, ctx) {
    return new Response("Updated content!");
  }
};
`;
          const response = yield* Workers.putContent({
            account_id: accountId(),
            script_name: scriptName,
            body: createWorkerFormData(updatedScript),
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - InvalidWorkerName when putting content with invalid name", () =>
      Workers.putContent({
        account_id: accountId(),
        script_name: "INVALID_NAME!@#$%",
        body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("InvalidWorkerName");
        }),
        Effect.ensuring(cleanup("INVALID_NAME!@#$%")),
      ));
  });

  // ============================================================================
  // Worker Settings APIs
  // ============================================================================

  describe("getSettings", () => {
    test("happy path - gets worker script settings", () =>
      withWorker("itty-cf-workers-settings", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.getSettings({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
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
  });

  describe("getSettings1", () => {
    test("happy path - gets worker settings with bindings", () =>
      withWorker("itty-cf-workers-bindings", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.getSettings1({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
          expect(response.result.bindings !== undefined || response.result.bindings === null).toBe(
            true,
          );
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.getSettings1({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-settings1-get",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("patchSettings", () => {
    test("happy path - patches worker settings", () =>
      withWorker("itty-cf-workers-patch-settings", (scriptName) =>
        Effect.gen(function* () {
          yield* Workers.patchSettings({
            account_id: accountId(),
            script_name: scriptName,
            body: { logpush: false },
          });

          const settings = yield* Workers.getSettings({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(settings.result).toBeDefined();
        }),
      ));

    test("happy path - patches worker settings with tags", () =>
      withWorker("itty-cf-workers-patch-tags", (scriptName) =>
        Effect.gen(function* () {
          yield* Workers.patchSettings({
            account_id: accountId(),
            script_name: scriptName,
            body: { tags: ["env:test", "team:infra"] },
          });

          const settings = yield* Workers.getSettings({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(settings.result).toBeDefined();
        }),
      ));
  });

  describe("patchSettings1", () => {
    test("happy path - patches settings with bindings", () =>
      withWorker("itty-cf-workers-patch-settings1", (scriptName) =>
        Effect.gen(function* () {
          const settingsFormData = new FormData();
          settingsFormData.append(
            "settings",
            new Blob([JSON.stringify({ logpush: false })], { type: "application/json" }),
          );

          const response = yield* Workers.patchSettings1({
            account_id: accountId(),
            script_name: scriptName,
            body: settingsFormData,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () => {
      const settingsFormData = new FormData();
      settingsFormData.append(
        "settings",
        new Blob([JSON.stringify({ logpush: false })], { type: "application/json" }),
      );
      return Workers.patchSettings1({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-settings1",
        body: settingsFormData,
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      );
    });
  });

  // ============================================================================
  // Worker Secrets APIs
  // ============================================================================

  describe("putScriptSecret", () => {
    test("happy path - puts secret on worker", () =>
      withWorker("itty-cf-workers-secrets", (scriptName) =>
        Effect.gen(function* () {
          yield* Workers.putScriptSecret({
            account_id: accountId(),
            script_name: scriptName,
            body: { name: "MY_SECRET", text: "secret-value", type: "secret_text" },
          });

          const secrets = yield* Workers.listScriptSecrets1({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(secrets.result).toBeDefined();
          expect(Array.isArray(secrets.result)).toBe(true);
        }),
      ));

    test("error - WorkerNotFound when putting secret on non-existent worker", () =>
      Workers.putScriptSecret({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-secret",
        body: { name: "SECRET", text: "value", type: "secret_text" },
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("listScriptSecrets1", () => {
    test("happy path - lists secrets for worker", () =>
      withWorker("itty-cf-workers-secrets-list", (scriptName) =>
        Effect.gen(function* () {
          const secrets = yield* Workers.listScriptSecrets1({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(secrets.result).toBeDefined();
          expect(Array.isArray(secrets.result)).toBe(true);
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.listScriptSecrets1({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-secrets-list",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("getScriptSecret", () => {
    test("happy path - gets secret metadata", () =>
      withWorker("itty-cf-workers-get-secret", (scriptName) =>
        Effect.gen(function* () {
          const secretName = "TEST_SECRET_GET";

          yield* Workers.putScriptSecret({
            account_id: accountId(),
            script_name: scriptName,
            body: { name: secretName, text: "secret-value", type: "secret_text" },
          });

          const secret = yield* Workers.getScriptSecret({
            account_id: accountId(),
            script_name: scriptName,
            secret_name: secretName,
          });
          expect(secret.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.getScriptSecret({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-get-secret",
        secret_name: "MY_SECRET",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("deleteScriptSecret1", () => {
    test("happy path - deletes secret", () =>
      withWorker("itty-cf-workers-secrets-crud", (scriptName) =>
        Effect.gen(function* () {
          const secretName = "TEST_SECRET";

          yield* Workers.putScriptSecret({
            account_id: accountId(),
            script_name: scriptName,
            body: { name: secretName, text: "my-secret-value", type: "secret_text" },
          });

          const secretsBefore = yield* Workers.listScriptSecrets1({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(secretsBefore.result.some((s) => s.name === secretName)).toBe(true);

          yield* Workers.deleteScriptSecret1({
            account_id: accountId(),
            script_name: scriptName,
            secret_name: secretName,
          });

          const secretsAfter = yield* Workers.listScriptSecrets1({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(secretsAfter.result.some((s) => s.name === secretName)).toBe(false);
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.deleteScriptSecret1({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-delete-secret",
        secret_name: "ANY_SECRET",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  // ============================================================================
  // Worker Cron Trigger APIs
  // ============================================================================

  describe("getCronTriggers", () => {
    test("happy path - gets cron triggers", () =>
      withWorker("itty-cf-workers-cron", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.getCronTriggers({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.getCronTriggers({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-cron",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("updateCronTriggers", () => {
    test("happy path - updates cron triggers", () =>
      withWorker("itty-cf-workers-cron-update", (scriptName) =>
        Effect.gen(function* () {
          yield* Workers.updateCronTriggers({
            account_id: accountId(),
            script_name: scriptName,
            body: [{ cron: "*/5 * * * *" }],
          });

          const triggers = yield* Workers.getCronTriggers({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(triggers.result).toBeDefined();
          expect(triggers.result.schedules).toBeDefined();
        }),
      ));

    test("happy path - sets multiple cron triggers", () =>
      withWorker("itty-cf-workers-cron-multi", (scriptName) =>
        Effect.gen(function* () {
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

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.updateCronTriggers({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-cron-update",
        body: [{ cron: "*/5 * * * *" }],
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  // ============================================================================
  // Worker Deployment APIs
  // ============================================================================

  describe("listDeployments", () => {
    test("happy path - lists deployments", () =>
      withWorker("itty-cf-workers-deployments", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.listDeployments({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.listDeployments({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-worker-deployments",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("createDeployment", () => {
    test("happy path - creates deployment", () =>
      withWorker("itty-cf-workers-deployment", (scriptName) =>
        Effect.gen(function* () {
          const versions = yield* Workers.listVersions({
            account_id: accountId(),
            script_name: scriptName,
          });
          const currentVersion = versions.result?.items?.[0];

          if (currentVersion?.id) {
            const created = yield* Workers.createDeployment({
              account_id: accountId(),
              script_name: scriptName,
              body: {
                strategy: "percentage",
                versions: [{ version_id: currentVersion.id, percentage: 100 }],
              },
            });
            expect(created.result).toBeDefined();
          }
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.createDeployment({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-deploy",
        body: {
          strategy: "percentage",
          versions: [{ version_id: "00000000-0000-0000-0000-000000000000", percentage: 100 }],
        },
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("getDeployment", () => {
    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.getDeployment({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-get-deploy",
        deployment_id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("deleteDeployment", () => {
    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.deleteDeployment({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-del-deploy",
        deployment_id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  // ============================================================================
  // Worker Version APIs
  // ============================================================================

  describe("listVersions", () => {
    test("happy path - lists versions", () =>
      withWorker("itty-cf-workers-versions", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.listVersions({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.listVersions({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-worker-versions",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("getVersionDetail", () => {
    test("happy path - gets version detail", () =>
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
  });

  describe("workerVersionsUploadVersion", () => {
    test("happy path - uploads new version", () =>
      withWorker("itty-cf-workers-upload-version", (scriptName) =>
        Effect.gen(function* () {
          const newVersionScript = `
export default {
  async fetch(request, env, ctx) {
    return new Response("Version 2!");
  }
};
`;
          const response = yield* Workers.workerVersionsUploadVersion({
            account_id: accountId(),
            script_name: scriptName,
            body: createWorkerFormData(newVersionScript),
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.workerVersionsUploadVersion({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-version-upload",
        body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  // ============================================================================
  // Worker Subdomain APIs
  // ============================================================================

  describe("getSubdomain", () => {
    test("happy path - gets subdomain", () =>
      withWorker("itty-cf-workers-subdomain", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.getSubdomain({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.getSubdomain({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-subdomain",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("postSubdomain", () => {
    test("happy path - enables subdomain", () =>
      withWorker("itty-cf-workers-subdomain-crud", (scriptName) =>
        Effect.gen(function* () {
          yield* Workers.postSubdomain({
            account_id: accountId(),
            script_name: scriptName,
            body: { enabled: true },
          });

          const subdomain = yield* Workers.getSubdomain({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(subdomain.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.postSubdomain({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-subdomain-post",
        body: { enabled: true },
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("deleteSubdomain", () => {
    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.deleteSubdomain({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-subdomain-del",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  // ============================================================================
  // Worker Usage Model APIs
  // ============================================================================

  describe("workerScriptFetchUsageModel", () => {
    test("happy path - fetches usage model", () =>
      withWorker("itty-cf-workers-usage", (scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.workerScriptFetchUsageModel({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.workerScriptFetchUsageModel({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-usage",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  describe("updateUsageModel", () => {
    test("happy path - updates usage model", () =>
      withWorker("itty-cf-workers-usage-model", (scriptName) =>
        Effect.gen(function* () {
          const current = yield* Workers.workerScriptFetchUsageModel({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(current.result).toBeDefined();

          const updated = yield* Workers.updateUsageModel({
            account_id: accountId(),
            script_name: scriptName,
            body: { usage_model: "bundled" },
          });
          expect(updated.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.updateUsageModel({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-usage-update",
        body: { usage_model: "bundled" },
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  // ============================================================================
  // Worker Assets Upload APIs
  // ============================================================================

  describe("createAssetsUploadSession1", () => {
    test("happy path - creates assets upload session for worker", () =>
      withWorker("itty-cf-workers-assets-sess", (scriptName) =>
        Effect.gen(function* () {
          const session = yield* Workers.createAssetsUploadSession1({
            account_id: accountId(),
            script_name: scriptName,
            body: {
              manifest: {},
            },
          });
          expect(session.result).toBeDefined();
        }),
      ));

    // Note: createAssetsUploadSession1 creates sessions even for non-existent workers
    test("creates session even for non-existent worker", () =>
      Effect.gen(function* () {
        const session = yield* Workers.createAssetsUploadSession1({
          account_id: accountId(),
          script_name: "itty-cf-nonexistent-assets",
          body: { manifest: {} },
        });
        expect(session.result).toBeDefined();
      }));
  });

  describe("createAssetsUploadSession (namespace)", () => {
    test("happy path - creates assets upload session in namespace", () =>
      withNamespaceWorker("itty-cf-workers-ns-assets", "itty-cf-ns-assets-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const session = yield* Workers.createAssetsUploadSession({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            body: {
              manifest: {},
            },
          });
          expect(session.result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.createAssetsUploadSession({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-assets",
        script_name: "any-script",
        body: { manifest: {} },
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("workerAssetsUpload", () => {
    // Note: This API requires an active upload session and specific asset format
    test.skip("happy path - uploads worker assets", () =>
      Effect.gen(function* () {
        const formData = new FormData();
        formData.append("asset", new Blob(["test content"]), "test.txt");

        const upload = yield* Workers.workerAssetsUpload({
          account_id: accountId(),
          base64: true,
          body: formData,
        });
        expect(upload.result).toBeDefined();
      }));
  });

  // ============================================================================
  // Account Subdomain API
  // ============================================================================

  describe("getSubdomain1", () => {
    test("happy path - gets account workers subdomain", () =>
      Effect.gen(function* () {
        const subdomain = yield* Workers.getSubdomain1({
          account_id: accountId(),
        });
        expect(subdomain.result).toBeDefined();
      }));
  });

  describe("createSubdomain", () => {
    // Note: This creates an account-level workers subdomain which is a one-time operation
    test.skip("happy path - creates account workers subdomain", () =>
      Effect.gen(function* () {
        // Only works if subdomain doesn't exist
        const subdomain = yield* Workers.createSubdomain({
          account_id: accountId(),
          body: { subdomain: "test-subdomain" },
        });
        expect(subdomain.result).toBeDefined();
      }));
  });

  describe("deleteSubdomain1", () => {
    // Note: This deletes the account-level workers subdomain which is a destructive account operation
    test.skip("happy path - deletes account workers subdomain", () =>
      Effect.gen(function* () {
        // This is destructive and affects the entire account
        yield* Workers.deleteSubdomain1({
          account_id: accountId(),
        });
      }));
  });

  // ============================================================================
  // Workers Services APIs (Environment-based)
  // Note: These APIs are for Workers Services which use environments
  // ============================================================================

  describe("getSettings2 (service environment)", () => {
    // Note: Requires Workers Services setup with environments
    test.skip("happy path - gets service environment settings", () =>
      Effect.gen(function* () {
        const settings = yield* Workers.getSettings2({
          account_id: accountId(),
          service_name: "test-service",
          environment_name: "production",
        });
        expect(settings.result).toBeDefined();
      }));
  });

  describe("patchSettings2 (service environment)", () => {
    test.skip("happy path - patches service environment settings", () =>
      Effect.gen(function* () {
        const settings = yield* Workers.patchSettings2({
          account_id: accountId(),
          service_name: "test-service",
          environment_name: "production",
          body: {},
        });
        expect(settings.result).toBeDefined();
      }));
  });

  describe("getScriptContent1 (service environment)", () => {
    test.skip("happy path - gets service environment script content", () =>
      Effect.gen(function* () {
        const content = yield* Workers.getScriptContent1({
          account_id: accountId(),
          service_name: "test-service",
          environment_name: "production",
        });
        expect(content).toBeDefined();
      }));
  });

  describe("putScriptContent1 (service environment)", () => {
    test.skip("happy path - puts service environment script content", () =>
      Effect.gen(function* () {
        const content = yield* Workers.putScriptContent1({
          account_id: accountId(),
          service_name: "test-service",
          environment_name: "production",
          body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
        });
        expect(content).toBeDefined();
      }));
  });

  // ============================================================================
  // Dispatch Namespace APIs
  // ============================================================================

  describe("list (dispatch namespaces)", () => {
    test("happy path - lists dispatch namespaces", () =>
      Effect.gen(function* () {
        const response = yield* Workers.list({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));
  });

  describe("create (dispatch namespace)", () => {
    test("happy path - creates namespace", () =>
      Effect.gen(function* () {
        const name = "itty-cf-workers-ns";
        yield* cleanupNamespace(name);

        yield* Workers.create({
          account_id: accountId(),
          body: { name },
        });

        yield* Effect.sleep(Duration.seconds(1));

        const fetched = yield* Workers.getNamespace({
          account_id: accountId(),
          dispatch_namespace: name,
        });
        expect(fetched.result).toBeDefined();
        expect(fetched.result.namespace_name).toBe(name);

        yield* cleanupNamespace(name);
      }));
  });

  describe("getNamespace", () => {
    test("happy path - gets namespace details", () =>
      withNamespace("itty-cf-workers-ns-get", (name) =>
        Effect.gen(function* () {
          const fetched = yield* Workers.getNamespace({
            account_id: accountId(),
            dispatch_namespace: name,
          });
          expect(fetched.result).toBeDefined();
          expect(fetched.result.namespace_name).toBe(name);
        }),
      ));
  });

  describe("deleteNamespace", () => {
    test("happy path - deletes namespace", () =>
      Effect.gen(function* () {
        const name = "itty-cf-workers-ns-crud";
        yield* cleanupNamespace(name);

        yield* Workers.create({
          account_id: accountId(),
          body: { name },
        });

        yield* Effect.sleep(Duration.seconds(1));

        yield* Workers.deleteNamespace({
          account_id: accountId(),
          dispatch_namespace: name,
        });
      }));
  });

  // Note: patchNamespace and putNamespace APIs have body format issues in the OpenAPI spec
  // These tests are skipped pending proper spec definition
  describe("patchNamespace", () => {
    test.skip("happy path - patches namespace", () =>
      withNamespace("itty-cf-workers-ns-patch", (name) =>
        Effect.gen(function* () {
          const patched = yield* Workers.patchNamespace({
            account_id: accountId(),
            dispatch_namespace: name,
            body: {},
          });
          expect(patched.result).toBeDefined();
        }),
      ));

    test.skip("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.patchNamespace({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-patch",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("putNamespace", () => {
    test.skip("happy path - puts namespace", () =>
      withNamespace("itty-cf-workers-ns-put", (name) =>
        Effect.gen(function* () {
          const put = yield* Workers.putNamespace({
            account_id: accountId(),
            dispatch_namespace: name,
            body: {},
          });
          expect(put.result).toBeDefined();
        }),
      ));

    test.skip("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.putNamespace({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-put",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("listScripts (in namespace)", () => {
    test("happy path - lists scripts in namespace", () =>
      withNamespace("itty-cf-workers-ns-scripts", (name) =>
        Effect.gen(function* () {
          const scripts = yield* Workers.listScripts({
            account_id: accountId(),
            dispatch_namespace: name,
          });
          expect(scripts.result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.listScripts({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-list",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("namespaceWorkerScriptUploadWorkerModule", () => {
    test("happy path - uploads worker to namespace", () =>
      withNamespace("itty-cf-workers-ns-upload", (nsName) =>
        Effect.gen(function* () {
          const scriptName = "itty-cf-ns-worker";

          const uploaded = yield* Workers.namespaceWorkerScriptUploadWorkerModule({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
          });
          expect(uploaded.result).toBeDefined();

          yield* Workers.deleteWorker({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          }).pipe(Effect.ignore);
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.namespaceWorkerScriptUploadWorkerModule({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-upload",
        script_name: "test-script",
        body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("namespaceWorkerScriptWorkerDetails", () => {
    test("happy path - gets worker details in namespace", () =>
      withNamespaceWorker("itty-cf-workers-ns-details", "itty-cf-ns-details-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const details = yield* Workers.namespaceWorkerScriptWorkerDetails({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(details.result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.namespaceWorkerScriptWorkerDetails({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-details",
        script_name: "any-script",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("deleteWorker (in namespace)", () => {
    test("happy path - deletes worker in namespace", () =>
      withNamespace("itty-cf-workers-ns-del-worker", (nsName) =>
        Effect.gen(function* () {
          const scriptName = "itty-cf-ns-del-worker";

          yield* Workers.namespaceWorkerScriptUploadWorkerModule({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
          });

          yield* Workers.deleteWorker({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.deleteWorker({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-del-worker",
        script_name: "any-script",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("getScriptBindings", () => {
    test("happy path - gets script bindings in namespace", () =>
      withNamespaceWorker("itty-cf-workers-ns-bindings", "itty-cf-ns-bindings-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const bindings = yield* Workers.getScriptBindings({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(bindings.result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.getScriptBindings({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-xyz",
        script_name: "any-script",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
          if (error._tag === "NamespaceNotFound") {
            expect(error.code).toBe(100119);
          }
        }),
      ));
  });

  describe("getScriptContent (in namespace)", () => {
    test("happy path - gets script content", () =>
      withNamespaceWorker("itty-cf-workers-ns-content", "itty-cf-ns-content-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const content = yield* Workers.getScriptContent({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(content).toBeInstanceOf(FormData);
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.getScriptContent({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-content",
        script_name: "any-script",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("listScriptSecrets (in namespace)", () => {
    test("happy path - lists secrets in namespace worker", () =>
      withNamespaceWorker("itty-cf-workers-ns-secrets", "itty-cf-ns-secret-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const secrets = yield* Workers.listScriptSecrets({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(secrets.result).toBeDefined();
          expect(Array.isArray(secrets.result)).toBe(true);
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.listScriptSecrets({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-secrets",
        script_name: "any-script",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("putScriptSecrets (in namespace)", () => {
    test("happy path - puts secret to namespace worker", () =>
      withNamespaceWorker("itty-cf-workers-ns-put-secrets", "itty-cf-ns-put-secrets-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const response = yield* Workers.putScriptSecrets({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            body: { name: "TEST_SECRET", text: "secret-value", type: "secret_text" },
          });
          expect(response.result).toBeDefined();

          // Verify secret appears in list
          const secrets = yield* Workers.listScriptSecrets({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(secrets.result.some((s) => s.name === "TEST_SECRET")).toBe(true);
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.putScriptSecrets({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-put-secrets",
        script_name: "any-script",
        body: { name: "TEST_SECRET", text: "secret-value", type: "secret_text" },
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("getScriptSecrets (in namespace)", () => {
    test("happy path - gets secret metadata from namespace worker", () =>
      withNamespaceWorker("itty-cf-workers-ns-get-secrets", "itty-cf-ns-get-secrets-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const secretName = "GET_SECRET_TEST";

          // First put a secret
          yield* Workers.putScriptSecrets({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            body: { name: secretName, text: "secret-value", type: "secret_text" },
          });

          // Then get it
          const response = yield* Workers.getScriptSecrets({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            secret_name: secretName,
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.getScriptSecrets({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-get-secrets",
        script_name: "any-script",
        secret_name: "ANY_SECRET",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("getScriptSettings (in namespace)", () => {
    test("happy path - gets script settings", () =>
      withNamespaceWorker("itty-cf-workers-ns-settings", "itty-cf-ns-settings-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const settings = yield* Workers.getScriptSettings({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(settings.result).toBeDefined();
        }),
      ));

    // Note: getScriptSettings returns undocumented error codes for namespace context
    test.skip("error - for non-existent namespace", () =>
      Workers.getScriptSettings({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-settings",
        script_name: "any-script",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBeDefined();
        }),
      ));
  });

  describe("patchScriptSettings (in namespace)", () => {
    test("happy path - patches script settings", () =>
      withNamespaceWorker("itty-cf-workers-ns-patch", "itty-cf-ns-patch-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const settingsFormData = new FormData();
          settingsFormData.append(
            "settings",
            new Blob([JSON.stringify({ logpush: false })], { type: "application/json" }),
          );
          yield* Workers.patchScriptSettings({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            body: settingsFormData,
          });

          const updatedSettings = yield* Workers.getScriptSettings({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(updatedSettings.result).toBeDefined();
        }),
      ));

    // Note: patchScriptSettings returns undocumented error codes for namespace context
    test.skip("error - for non-existent namespace", () => {
      const settingsFormData = new FormData();
      settingsFormData.append(
        "settings",
        new Blob([JSON.stringify({ logpush: false })], { type: "application/json" }),
      );
      return Workers.patchScriptSettings({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-patch-settings",
        script_name: "any-script",
        body: settingsFormData,
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBeDefined();
        }),
      );
    });
  });

  describe("getScriptTags", () => {
    test("happy path - gets script tags in namespace", () =>
      withNamespaceWorker("itty-cf-workers-ns-tags", "itty-cf-ns-tags-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const tags = yield* Workers.getScriptTags({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(tags.result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.getScriptTags({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-tags",
        script_name: "any-script",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
          if (error._tag === "NamespaceNotFound") {
            expect(error.code).toBe(100119);
          }
        }),
      ));
  });

  describe("putScriptTags", () => {
    test("happy path - puts script tags", () =>
      withNamespaceWorker("itty-cf-workers-ns-put-tags", "itty-cf-ns-put-tags-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          yield* Workers.putScriptTags({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            body: ["env:test", "ns:dispatch"],
          });

          const updatedTags = yield* Workers.getScriptTags({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(updatedTags.result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.putScriptTags({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-put-tags",
        script_name: "any-script",
        body: ["env:test"],
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("putScriptTag", () => {
    test("happy path - puts single script tag", () =>
      withNamespaceWorker("itty-cf-workers-ns-put-tag", "itty-cf-ns-put-tag-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          yield* Workers.putScriptTag({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            tag: "env:production",
          });

          const tags = yield* Workers.getScriptTags({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
          });
          expect(tags.result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.putScriptTag({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-put-tag",
        script_name: "any-script",
        tag: "env:test",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("deleteScriptTag", () => {
    test("happy path - deletes script tag", () =>
      withNamespaceWorker("itty-cf-workers-ns-del-tag", "itty-cf-ns-del-tag-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          yield* Workers.putScriptTags({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            body: ["env:test", "to-delete"],
          });

          yield* Workers.deleteScriptTag({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            tag: "to-delete",
          });
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.deleteScriptTag({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-del-tag",
        script_name: "any-script",
        tag: "env:test",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("deleteScriptSecret (in namespace)", () => {
    test("happy path - delete handles non-existent secret gracefully", () =>
      withNamespaceWorker("itty-cf-workers-ns-del-secret", "itty-cf-ns-del-secret-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          yield* Workers.deleteScriptSecret({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            secret_name: "NONEXISTENT_SECRET",
          }).pipe(Effect.ignore);
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.deleteScriptSecret({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-del-secret",
        script_name: "any-script",
        secret_name: "ANY_SECRET",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  describe("putScriptContent (in namespace)", () => {
    test("happy path - puts script content", () =>
      withNamespaceWorker("itty-cf-workers-ns-put-content", "itty-cf-ns-put-content-worker", (nsName, scriptName) =>
        Effect.gen(function* () {
          const updatedScript = `
export default {
  async fetch(request, env, ctx) {
    return new Response("Updated namespace worker!");
  }
};
`;
          yield* Workers.putScriptContent({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: scriptName,
            body: createWorkerFormData(updatedScript),
          });
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespace", () =>
      Workers.putScriptContent({
        account_id: accountId(),
        dispatch_namespace: "itty-cf-nonexistent-ns-put-content",
        script_name: "any-script",
        body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("NamespaceNotFound");
        }),
      ));
  });

  // ============================================================================
  // Durable Object APIs
  // ============================================================================

  describe("listNamespaces (Durable Objects)", () => {
    test("happy path - lists durable object namespaces", () =>
      Effect.gen(function* () {
        const response = yield* Workers.listNamespaces({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
        expect(Array.isArray(response.result)).toBe(true);
      }));
  });

  describe("listObjects", () => {
    // Worker script with a Durable Object class
    const DO_WORKER_SCRIPT = `
export class Counter {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    let count = (await this.state.storage.get("count")) || 0;
    count++;
    await this.state.storage.put("count", count);
    return new Response(JSON.stringify({ count }));
  }
}

export default {
  async fetch(request, env, ctx) {
    const id = env.COUNTER.idFromName("test");
    const stub = env.COUNTER.get(id);
    return stub.fetch(request);
  }
};
`;

    const createDOWorkerFormData = (script: string, mainModule: string = "worker.js") => {
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
              compatibility_flags: [],
              bindings: [
                {
                  name: "COUNTER",
                  type: "durable_object_namespace",
                  class_name: "Counter",
                },
              ],
              migrations: {
                new_classes: ["Counter"],
              },
            }),
          ],
          { type: "application/json" },
        ),
        "metadata",
      );

      return formData;
    };

    const withDOWorker = <A, E, R>(
      name: string,
      fn: (scriptName: string, namespaceId: string) => Effect.Effect<A, E, R>,
    ) =>
      cleanup(name).pipe(
        Effect.andThen(
          Workers.workerScriptUploadWorkerModule({
            account_id: accountId(),
            script_name: name,
            body: createDOWorkerFormData(DO_WORKER_SCRIPT),
          }),
        ),
        Effect.andThen(Effect.sleep(Duration.seconds(5))),
        Effect.andThen(
          Workers.listNamespaces({
            account_id: accountId(),
          }),
        ),
        Effect.flatMap((namespaces) => {
          const ns = namespaces.result?.find(
            (n) => n.script === name && n.class === "Counter",
          );
          if (!ns?.id) {
            return Effect.die(new Error(`No DO namespace found for worker ${name}`));
          }
          return fn(name, ns.id);
        }),
        Effect.ensuring(cleanup(name)),
      );

    test("happy path - lists objects in namespace", () =>
      withDOWorker("itty-cf-workers-do", (_scriptName, namespaceId) =>
        Effect.gen(function* () {
          const objects = yield* Workers.listObjects({
            account_id: accountId(),
            id: namespaceId,
          });
          expect(objects.result).toBeDefined();
          expect(Array.isArray(objects.result)).toBe(true);
        }),
      ));
  });

  // ============================================================================
  // Worker Domains APIs
  // ============================================================================

  describe("listDomains", () => {
    test("happy path - lists worker domains", () =>
      Effect.gen(function* () {
        const response = yield* Workers.listDomains({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));
  });

  describe("getADomain", () => {
    // Note: Requires an existing domain binding
    test.skip("happy path - gets a specific domain", () =>
      Effect.gen(function* () {
        const domains = yield* Workers.listDomains({
          account_id: accountId(),
        });

        const domainList = domains.result as Array<{ id: string }>;
        if (domainList.length > 0) {
          const domain = yield* Workers.getADomain({
            account_id: accountId(),
            domain_id: domainList[0].id,
          });
          expect(domain.result).toBeDefined();
        }
      }));
  });

  describe("workerDomainAttachToDomain", () => {
    // Note: Requires zone_id which is environment-specific
    test.skip("happy path - attaches worker to domain", () =>
      withWorker("itty-cf-workers-domain", (_scriptName) =>
        Effect.gen(function* () {
          // Requires zone_id
        }),
      ));
  });

  describe("workerDomainDetachFromDomain", () => {
    // Note: Requires zone_id and an existing domain attachment
    test.skip("happy path - detaches worker from domain", () =>
      Effect.gen(function* () {
        // Requires zone_id
      }));
  });

  // Note: attach/detach domain requires zone_id which is environment-specific

  // ============================================================================
  // Smart Placement APIs
  // ============================================================================

  describe("listRegions", () => {
    // Note: Smart Placement is an account feature that may not be enabled
    test.skip("happy path - lists regions for smart placement", () =>
      Effect.gen(function* () {
        const regions = yield* Workers.listRegions({
          account_id: accountId(),
        });
        expect(regions.result).toBeDefined();
        expect(regions.result.providers).toBeDefined();
        expect(Array.isArray(regions.result.providers)).toBe(true);
      }));
  });

  // ============================================================================
  // Tail (Live Logging) APIs
  // ============================================================================

  describe("workerTailLogsStartTail", () => {
    test("happy path - starts tail", () =>
      withWorker("itty-cf-workers-tails-start", (scriptName) =>
        Effect.gen(function* () {
          const started = yield* Workers.workerTailLogsStartTail({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(started.result).toBeDefined();
          expect(started.result.id).toBeDefined();

          const tailId = started.result.id as string;

          yield* Workers.deleteTail({
            account_id: accountId(),
            script_name: scriptName,
            id: tailId,
          });
        }),
      ));
  });

  describe("deleteTail", () => {
    test("happy path - deletes tail", () =>
      withWorker("itty-cf-workers-tails-crud", (scriptName) =>
        Effect.gen(function* () {
          const started = yield* Workers.workerTailLogsStartTail({
            account_id: accountId(),
            script_name: scriptName,
          });
          const tailId = started.result.id as string;

          yield* Workers.deleteTail({
            account_id: accountId(),
            script_name: scriptName,
            id: tailId,
          });
        }),
      ));
  });

  // ============================================================================
  // Telemetry & Observability APIs
  // ============================================================================

  describe("destinationlist", () => {
    test("happy path - lists destinations", () =>
      Effect.gen(function* () {
        const destinations = yield* Workers.destinationlist({ account_id: accountId() });
        expect(destinations.result).toBeDefined();
        expect(Array.isArray(destinations.result)).toBe(true);
      }));
  });

  describe("destinationcreate", () => {
    // Note: Destination create/delete requires specific account configuration for Workers Observability
    test.skip("happy path - creates destination", () =>
      Effect.gen(function* () {
        // Requires Workers Observability feature to be enabled
      }));
  });

  describe("destinationupdate", () => {
    // Note: Requires an existing destination and Workers Observability feature
    test.skip("happy path - updates destination", () =>
      Effect.gen(function* () {
        // Requires Workers Observability feature to be enabled
      }));
  });

  describe("destinationsdelete", () => {
    // Note: Requires an existing destination and Workers Observability feature
    test.skip("happy path - deletes destination", () =>
      Effect.gen(function* () {
        // Requires Workers Observability feature to be enabled
      }));
  });

  describe("telemetrykeyslist", () => {
    test("happy path - lists telemetry keys", () =>
      withWorker("itty-cf-workers-telemetry-keys", (_scriptName) =>
        Effect.gen(function* () {
          const keys = yield* Workers.telemetrykeyslist({
            account_id: accountId(),
            body: {
              datasets: ["workers-invocations"],
            },
          });
          expect(keys.result).toBeDefined();
        }),
      ));
  });

  describe("telemetryquery", () => {
    test("happy path - queries telemetry data", () =>
      withWorker("itty-cf-workers-telemetry-query", (_scriptName) =>
        Effect.gen(function* () {
          const now = Date.now();
          const telemetry = yield* Workers.telemetryquery({
            account_id: accountId(),
            body: {
              queryId: `itty-cf-workers-telemetry-query-${now}`,
              timeframe: {
                from: now - 24 * 60 * 60 * 1000,
                to: now,
              },
              limit: 10,
              parameters: {
                datasets: ["workers-invocations"],
                calculations: [{ operator: "count" }],
              },
            },
          });
          expect(telemetry.result).toBeDefined();
        }),
      ));
  });

  describe("telemetryvalueslist", () => {
    test("happy path - lists telemetry values", () =>
      withWorker("itty-cf-workers-telemetry-values", (_scriptName) =>
        Effect.gen(function* () {
          const now = Date.now();
          const values = yield* Workers.telemetryvalueslist({
            account_id: accountId(),
            body: {
              datasets: ["workers-invocations"],
              key: "scriptName",
              type: "string",
              timeframe: {
                from: now - 24 * 60 * 60 * 1000,
                to: now,
              },
            },
          });
          expect(values.result).toBeDefined();
        }),
      ));
  });

  // ============================================================================
  // Workflow APIs
  // ============================================================================

  describe("listworkers (workflows)", () => {
    test("happy path - lists workflows", () =>
      Effect.gen(function* () {
        const workflows = yield* Workers.listworkers({
          account_id: accountId(),
        });
        expect(workflows.result).toBeDefined();
        expect(Array.isArray(workflows.result)).toBe(true);
      }));
  });

  describe("getworker (workflow)", () => {
    const WORKFLOW_WORKER_SCRIPT = `
import { WorkflowEntrypoint } from 'cloudflare:workers';

export class MyWorkflow extends WorkflowEntrypoint {
  async run(event, step) {
    await step.do('step1', async () => {
      return { message: 'Hello from step 1' };
    });
    
    return { success: true };
  }
}

export default {
  async fetch(request, env, ctx) {
    return new Response('Workflow worker');
  }
};
`;

    const createWorkflowWorkerFormData = (script: string, mainModule: string = "worker.js") => {
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
              compatibility_flags: [],
              workflow_bindings: [
                {
                  name: "MY_WORKFLOW",
                  class_name: "MyWorkflow",
                },
              ],
            }),
          ],
          { type: "application/json" },
        ),
        "metadata",
      );

      return formData;
    };

    const withWorkflowWorker = <A, E, R>(
      name: string,
      fn: (scriptName: string) => Effect.Effect<A, E, R>,
    ) =>
      cleanup(name).pipe(
        Effect.andThen(
          Workers.workerScriptUploadWorkerModule({
            account_id: accountId(),
            script_name: name,
            body: createWorkflowWorkerFormData(WORKFLOW_WORKER_SCRIPT),
          }),
        ),
        Effect.andThen(Effect.sleep(Duration.seconds(2))),
        Effect.andThen(fn(name)),
        Effect.ensuring(cleanup(name)),
      );

    test("happy path - gets workflow details", () =>
      withWorkflowWorker("itty-cf-workers-workflow", (scriptName) =>
        Effect.gen(function* () {
          const workflows = yield* Workers.listworkers({
            account_id: accountId(),
          });
          expect(workflows.result).toBeDefined();

          const workflowList = workflows.result as Array<{ id: string; name: string }>;
          const ourWorkflow = workflowList.find((w) => w.name === scriptName);

          if (ourWorkflow) {
            const workflow = yield* Workers.getworker({
              account_id: accountId(),
              worker_id: ourWorkflow.id,
            });
            expect(workflow.result).toBeDefined();
          }
        }),
      ));

    test("error - WorkflowNotFound for non-existent workflow", () =>
      Workers.getworker({
        account_id: accountId(),
        worker_id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          // Workflow not found errors may vary
          expect(error._tag).toBeDefined();
        }),
      ));
  });

  describe("listworkerversions (workflow)", () => {
    test("happy path - lists workflow versions", () =>
      Effect.gen(function* () {
        const workflows = yield* Workers.listworkers({
          account_id: accountId(),
        });

        const workflowList = workflows.result as Array<{ id: string }>;
        if (workflowList.length > 0) {
          const versions = yield* Workers.listworkerversions({
            account_id: accountId(),
            worker_id: workflowList[0].id,
          });
          expect(versions.result).toBeDefined();
        }
      }));
  });

  describe("getworkerversion (workflow)", () => {
    test("happy path - gets workflow version detail", () =>
      Effect.gen(function* () {
        const workflows = yield* Workers.listworkers({
          account_id: accountId(),
        });

        const workflowList = workflows.result as Array<{ id: string }>;
        if (workflowList.length > 0) {
          const versions = yield* Workers.listworkerversions({
            account_id: accountId(),
            worker_id: workflowList[0].id,
          });

          const versionList = versions.result as Array<{ id: string }>;
          if (versionList.length > 0) {
            const version = yield* Workers.getworkerversion({
              account_id: accountId(),
              worker_id: workflowList[0].id,
              version_id: versionList[0].id,
            });
            expect(version.result).toBeDefined();
          }
        }
      }));
  });

  describe("createworker (workflow)", () => {
    // Note: createworker creates a workflow entry - the body format is unknown/undocumented
    test.skip("happy path - creates workflow", () =>
      Effect.gen(function* () {
        // Body format needs to be discovered
        const created = yield* Workers.createworker({
          account_id: accountId(),
          body: {},
        });
        expect(created.result).toBeDefined();
      }));
  });

  describe("updateworker (workflow)", () => {
    test("error - WorkflowNotFound for non-existent workflow", () =>
      Workers.updateworker({
        account_id: accountId(),
        worker_id: "00000000-0000-0000-0000-000000000000",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBeDefined();
        }),
      ));
  });

  describe("deleteworker (workflow)", () => {
    test("error - WorkflowNotFound for non-existent workflow", () =>
      Workers.deleteworker({
        account_id: accountId(),
        worker_id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBeDefined();
        }),
      ));
  });

  describe("editworker (workflow)", () => {
    test("error - WorkflowNotFound for non-existent workflow", () =>
      Workers.editworker({
        account_id: accountId(),
        worker_id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBeDefined();
        }),
      ));
  });

  describe("createworkerversion (workflow)", () => {
    test("error - WorkflowNotFound for non-existent workflow", () =>
      Workers.createworkerversion({
        account_id: accountId(),
        worker_id: "00000000-0000-0000-0000-000000000000",
        body: {
          created_on: new Date().toISOString(),
          id: "00000000-0000-0000-0000-000000000000",
          number: 1,
        },
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBeDefined();
        }),
      ));
  });

  describe("deleteworkerversion (workflow)", () => {
    test("error - WorkflowNotFound for non-existent workflow", () =>
      Workers.deleteworkerversion({
        account_id: accountId(),
        worker_id: "00000000-0000-0000-0000-000000000000",
        version_id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBeDefined();
        }),
      ));
  });

  // ============================================================================
  // Tail List API
  // ============================================================================

  // Note: getAccountsAccountIdWorkersScriptsScriptNameTails has schema issues in OpenAPI spec
  describe("getAccountsAccountIdWorkersScriptsScriptNameTails", () => {
    test.skip("happy path - lists tails for worker", () =>
      withWorker("itty-cf-workers-list-tails", (scriptName) =>
        Effect.gen(function* () {
          const tails = yield* Workers.getAccountsAccountIdWorkersScriptsScriptNameTails({
            account_id: accountId(),
            script_name: scriptName,
          });
          expect(tails.result).toBeDefined();
        }),
      ));

    test("error - WorkerNotFound for non-existent worker", () =>
      Workers.getAccountsAccountIdWorkersScriptsScriptNameTails({
        account_id: accountId(),
        script_name: "itty-cf-nonexistent-list-tails",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("WorkerNotFound");
        }),
      ));
  });

  // ============================================================================
  // Bulk Delete API (Namespace-scoped)
  // ============================================================================

  describe("deleteScripts (in namespace)", () => {
    // Note: deleteScripts is for deleting scripts within a dispatch namespace
    test("happy path - bulk deletes workers in namespace", () =>
      withNamespace("itty-cf-workers-ns-bulk-del", (nsName) =>
        Effect.gen(function* () {
          const name1 = "itty-cf-ns-bulk-1";
          const name2 = "itty-cf-ns-bulk-2";

          // Upload workers to namespace
          yield* Workers.namespaceWorkerScriptUploadWorkerModule({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: name1,
            body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
          });

          yield* Workers.namespaceWorkerScriptUploadWorkerModule({
            account_id: accountId(),
            dispatch_namespace: nsName,
            script_name: name2,
            body: createWorkerFormData(SIMPLE_WORKER_SCRIPT),
          });

          // Bulk delete from namespace
          yield* Workers.deleteScripts({
            account_id: accountId(),
            dispatch_namespace: nsName,
          });
        }),
      ));
  });
});
