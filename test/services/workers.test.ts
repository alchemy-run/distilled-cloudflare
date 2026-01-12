/**
 * Tests for Cloudflare Workers API
 *
 * These tests require Cloudflare credentials from Doppler:
 * From repo root: bun run download:env
 */

import { describe } from "@effect/vitest";
import { expect } from "vitest";
import * as Effect from "effect/Effect";

import * as Workers from "../../src/services/workers.ts";
import { test, getAccountId, hasCredentials } from "../test.ts";

describe.skipIf(!hasCredentials())("Workers API", () => {
  describe("listScripts", () => {
    test(
      "should list worker scripts",
      Effect.gen(function* () {
        const result = yield* Workers.listScripts({
          account_id: getAccountId(),
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} worker scripts`);
      }),
    );
  });

  describe("getSubdomain", () => {
    test(
      "should get workers subdomain",
      Effect.gen(function* () {
        const result = yield* Workers.getSubdomain({
          account_id: getAccountId(),
        });

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        console.log(`Workers subdomain: ${result.result.subdomain}`);
      }),
    );
  });

  // Script operations require an existing worker
  describe.skip("script operations", () => {
    const TEST_SCRIPT_NAME = "distilled-test-worker";

    test(
      "should get script details",
      Effect.gen(function* () {
        const result = yield* Workers.getScript({
          account_id: getAccountId(),
          script_name: TEST_SCRIPT_NAME,
        });

        expect(result).toBeDefined();
        expect(result.result.id).toBe(TEST_SCRIPT_NAME);
      }),
    );
  });
});
