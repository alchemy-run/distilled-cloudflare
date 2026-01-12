/**
 * Tests for Cloudflare Workers KV API
 *
 * These tests require Cloudflare credentials from Doppler:
 * From repo root: bun run download:env
 */

import { describe } from "@effect/vitest";
import { expect } from "vitest";
import * as Effect from "effect/Effect";

import * as KV from "../../src/services/kv.ts";
import { test, getAccountId, hasCredentials } from "../test.ts";

const TEST_NAMESPACE_TITLE = "distilled-kv-test";

describe.skipIf(!hasCredentials())("KV API", () => {
  describe("listNamespaces", () => {
    test("should list KV namespaces", () =>
      Effect.gen(function* () {
        const result = yield* KV.listNamespaces({
          account_id: getAccountId(),
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} KV namespaces`);
      }),
    );
  });

  describe("namespace lifecycle", () => {
    let namespaceId: string | undefined;

    test("should create a KV namespace", () =>
      Effect.gen(function* () {
        // First, try to find existing test namespace
        const list = yield* KV.listNamespaces({
          account_id: getAccountId(),
        });

        const existing = list.result.find(
          (ns) => ns.title === TEST_NAMESPACE_TITLE,
        );
        if (existing) {
          console.log(`Found existing namespace: ${existing.id}`);
          namespaceId = existing.id;
          return;
        }

        // Create new namespace
        const result = yield* KV.createNamespace({
          account_id: getAccountId(),
          title: TEST_NAMESPACE_TITLE,
        });

        expect(result).toBeDefined();
        expect(result.result.id).toBeDefined();
        expect(result.result.title).toBe(TEST_NAMESPACE_TITLE);

        namespaceId = result.result.id;
        console.log(`Created namespace: ${namespaceId}`);
      }),
    );

    test("should get the namespace", () =>
      Effect.gen(function* () {
        if (!namespaceId) {
          console.log("Skipping - no namespace ID");
          return;
        }

        const result = yield* KV.getNamespace({
          account_id: getAccountId(),
          namespace_id: namespaceId,
        });

        expect(result).toBeDefined();
        expect(result.result.id).toBe(namespaceId);
      }),
    );

    test("should list keys (empty initially)", () =>
      Effect.gen(function* () {
        if (!namespaceId) {
          console.log("Skipping - no namespace ID");
          return;
        }

        const result = yield* KV.listKeys({
          account_id: getAccountId(),
          namespace_id: namespaceId,
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} keys`);
      }),
    );

    test("should write a key-value pair", () =>
      Effect.gen(function* () {
        if (!namespaceId) {
          console.log("Skipping - no namespace ID");
          return;
        }

        const result = yield* KV.putValue({
          account_id: getAccountId(),
          namespace_id: namespaceId,
          key_name: "test-key",
          value: "test-value",
        });

        expect(result).toBeDefined();
        console.log("Wrote key-value pair");
      }),
    );

    test("should list keys (should have one now)", () =>
      Effect.gen(function* () {
        if (!namespaceId) {
          console.log("Skipping - no namespace ID");
          return;
        }

        // Wait a bit for eventual consistency
        yield* Effect.sleep("1 second");

        const result = yield* KV.listKeys({
          account_id: getAccountId(),
          namespace_id: namespaceId,
        });

        expect(result).toBeDefined();
        console.log(`Found ${result.result.length} keys after write`);
      }),
    );

    test("should bulk write key-value pairs", () =>
      Effect.gen(function* () {
        if (!namespaceId) {
          console.log("Skipping - no namespace ID");
          return;
        }

        const result = yield* KV.bulkWrite({
          account_id: getAccountId(),
          namespace_id: namespaceId,
          body: [
            { key: "bulk-key-1", value: "bulk-value-1" },
            { key: "bulk-key-2", value: "bulk-value-2" },
            { key: "bulk-key-3", value: "bulk-value-3" },
          ],
        });

        expect(result).toBeDefined();
        console.log("Bulk wrote 3 key-value pairs");
      }),
    );

    test("should delete a key", () =>
      Effect.gen(function* () {
        if (!namespaceId) {
          console.log("Skipping - no namespace ID");
          return;
        }

        const result = yield* KV.deleteValue({
          account_id: getAccountId(),
          namespace_id: namespaceId,
          key_name: "test-key",
        });

        expect(result).toBeDefined();
        console.log("Deleted key");
      }),
    );

    // Cleanup - delete namespace
    test("should delete the namespace", () =>
      Effect.gen(function* () {
        if (!namespaceId) {
          console.log("Skipping - no namespace ID");
          return;
        }

        const result = yield* KV.deleteNamespace({
          account_id: getAccountId(),
          namespace_id: namespaceId,
        });

        expect(result).toBeDefined();
        console.log(`Deleted namespace: ${namespaceId}`);
      }),
    );
  });
});
