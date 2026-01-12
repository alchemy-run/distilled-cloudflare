/**
 * Tests for Cloudflare Workflows API
 *
 * These tests require Cloudflare credentials from Doppler:
 * From repo root: bun run download:env
 */

import { describe } from "@effect/vitest";
import { expect } from "vitest";
import * as Effect from "effect/Effect";

import * as Workflows from "../../src/services/workflows.ts";
import { test, getAccountId, hasCredentials } from "../test.ts";

describe.skipIf(!hasCredentials())("Workflows API", () => {
  describe("listWorkflows", () => {
    test("should list workflows", () =>
      Effect.gen(function* () {
        const result = yield* Workflows.listWorkflows({
          account_id: getAccountId(),
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} workflows`);

        // If there are workflows, print their names
        for (const workflow of result.result) {
          console.log(`  - ${workflow.name} (${workflow.id})`);
        }
      }),
    );
  });

  // Tests that require an existing workflow
  describe.skip("workflow operations", () => {
    const TEST_WORKFLOW_NAME = "test-workflow";

    test("should get a workflow", () =>
      Effect.gen(function* () {
        const result = yield* Workflows.getWorkflow({
          account_id: getAccountId(),
          workflow_name: TEST_WORKFLOW_NAME,
        });

        expect(result).toBeDefined();
        expect(result.result.name).toBe(TEST_WORKFLOW_NAME);
        console.log(`Got workflow: ${result.result.name}`);
      }),
    );

    test("should list workflow instances", () =>
      Effect.gen(function* () {
        const result = yield* Workflows.listInstances({
          account_id: getAccountId(),
          workflow_name: TEST_WORKFLOW_NAME,
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} instances`);
      }),
    );

    test("should list workflow versions", () =>
      Effect.gen(function* () {
        const result = yield* Workflows.listVersions({
          account_id: getAccountId(),
          workflow_name: TEST_WORKFLOW_NAME,
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} versions`);
      }),
    );
  });
});
