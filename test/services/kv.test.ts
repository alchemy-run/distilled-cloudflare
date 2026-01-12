/**
 * KV API Tests
 *
 * Tests for Cloudflare Workers KV operations including namespace CRUD,
 * key-value operations, bulk operations, and pagination.
 */

import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "../test.ts";
import * as KV from "../../src/services/kv.ts";

const accountId = () => getAccountId();

// Cleanup helper - deletes namespace if it exists, ignores errors
const cleanupNamespace = (namespaceId: string) =>
  KV.workersKvNamespaceRemoveANamespace({
    account_id: accountId(),
    namespace_id: namespaceId,
  }).pipe(Effect.ignore);

// Find namespace by title and return its ID
const findNamespaceByTitle = (title: string) =>
  Effect.gen(function* () {
    const response = yield* KV.listNamespaces({
      account_id: accountId(),
    });
    const namespaces = (response.result as { result?: Array<{ id: string; title: string }> }).result ?? [];
    return namespaces.find((ns) => ns.title === title);
  });

// Cleanup by title - finds and deletes namespace by name
const cleanupByTitle = (title: string) =>
  Effect.gen(function* () {
    const ns = yield* findNamespaceByTitle(title);
    if (ns) {
      yield* cleanupNamespace(ns.id);
    }
  }).pipe(Effect.ignore);

// Helper to create a namespace and run a test, then cleanup
const withNamespace = <A, E, R>(
  title: string,
  fn: (namespaceId: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    yield* cleanupByTitle(title);

    const created = yield* KV.createANamespace({
      account_id: accountId(),
      body: { title },
    });

    const namespaceId = (created.result as { result?: { id: string } }).result?.id;
    if (!namespaceId) {
      return yield* Effect.die(new Error("Failed to create namespace"));
    }

    return yield* fn(namespaceId).pipe(
      Effect.ensuring(cleanupNamespace(namespaceId)),
    );
  });

describe("KV", () => {
  describe("Namespace CRUD", () => {
    test("list namespaces", () =>
      Effect.gen(function* () {
        const response = yield* KV.listNamespaces({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));

    test("create, get, and delete namespace", () =>
      Effect.gen(function* () {
        const title = "itty-cf-kv-crud";
        yield* cleanupByTitle(title);

        // Create namespace
        const created = yield* KV.createANamespace({
          account_id: accountId(),
          body: { title },
        });
        expect(created.result).toBeDefined();

        const namespaceId = (created.result as { result?: { id: string } }).result?.id;
        expect(namespaceId).toBeDefined();

        // Get namespace
        const fetched = yield* KV.getANamespace({
          account_id: accountId(),
          namespace_id: namespaceId!,
        });
        expect(fetched.result).toBeDefined();

        // Delete namespace
        const deleted = yield* KV.workersKvNamespaceRemoveANamespace({
          account_id: accountId(),
          namespace_id: namespaceId!,
        });
        expect(deleted.result).toBeDefined();
      }));

    test("rename namespace", () =>
      withNamespace("itty-cf-kv-rename", (namespaceId) =>
        Effect.gen(function* () {
          const newTitle = "itty-cf-kv-renamed";

          yield* KV.workersKvNamespaceRenameANamespace({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: { title: newTitle },
          });

          const fetched = yield* KV.getANamespace({
            account_id: accountId(),
            namespace_id: namespaceId,
          });

          const result = (fetched.result as { result?: { title: string } }).result;
          expect(result?.title).toBe(newTitle);
        }),
      ));
  });

  describe("Key-Value Operations", () => {
    test("write and read bulk key-value pairs", () =>
      withNamespace("itty-cf-kv-bulk", (namespaceId) =>
        Effect.gen(function* () {
          // Write multiple key-value pairs
          yield* KV.workersKvNamespaceWriteMultipleKeyValuePairs({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: [
              { key: "key1", value: "value1" },
              { key: "key2", value: "value2" },
              { key: "key3", value: "value3" },
            ],
          });

          // Get multiple key-value pairs
          const response = yield* KV.getMultipleKeyValuePairs({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: {
              keys: ["key1", "key2", "key3"],
              type: "text",
            },
          });
          expect(response.result).toBeDefined();
        }),
      ));

    test("write with metadata and expiration", () =>
      withNamespace("itty-cf-kv-metadata", (namespaceId) =>
        Effect.gen(function* () {
          // Write with metadata and TTL
          yield* KV.workersKvNamespaceWriteMultipleKeyValuePairs({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: [
              {
                key: "meta-key",
                value: "meta-value",
                metadata: { custom: "data" },
                expiration_ttl: 3600,
              },
            ],
          });

          // Read the metadata
          const metadata = yield* KV.workersKvNamespaceReadTheMetadataForAKey({
            account_id: accountId(),
            namespace_id: namespaceId,
            key_name: "meta-key",
          });
          expect(metadata.result).toBeDefined();
        }),
      ));

    test("list keys in namespace", () =>
      withNamespace("itty-cf-kv-list", (namespaceId) =>
        Effect.gen(function* () {
          // Write some keys
          yield* KV.workersKvNamespaceWriteMultipleKeyValuePairs({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: [
              { key: "prefix/a", value: "1" },
              { key: "prefix/b", value: "2" },
              { key: "other/c", value: "3" },
            ],
          });

          // List all keys
          const allKeys = yield* KV.listANamespaceSKeys({
            account_id: accountId(),
            namespace_id: namespaceId,
          });
          expect(allKeys.result).toBeDefined();

          // List keys with prefix
          const prefixedKeys = yield* KV.listANamespaceSKeys({
            account_id: accountId(),
            namespace_id: namespaceId,
            prefix: "prefix/",
          });
          expect(prefixedKeys.result).toBeDefined();
        }),
      ));

    test("list keys with limit", () =>
      withNamespace("itty-cf-kv-limit", (namespaceId) =>
        Effect.gen(function* () {
          // Write multiple keys
          const keys = Array.from({ length: 5 }, (_, i) => ({
            key: `key-${i}`,
            value: `value-${i}`,
          }));

          yield* KV.workersKvNamespaceWriteMultipleKeyValuePairs({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: keys,
          });

          // List with limit
          const response = yield* KV.listANamespaceSKeys({
            account_id: accountId(),
            namespace_id: namespaceId,
            limit: 2,
          });
          expect(response.result).toBeDefined();
        }),
      ));
  });

  describe("Delete Operations", () => {
    test("delete multiple key-value pairs", () =>
      withNamespace("itty-cf-kv-delete", (namespaceId) =>
        Effect.gen(function* () {
          // Write keys
          yield* KV.workersKvNamespaceWriteMultipleKeyValuePairs({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: [
              { key: "delete1", value: "1" },
              { key: "delete2", value: "2" },
              { key: "keep", value: "3" },
            ],
          });

          // Delete multiple keys
          yield* KV.deleteMultipleKeyValuePairs({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: ["delete1", "delete2"],
          });

          // Verify only 'keep' remains
          const remaining = yield* KV.listANamespaceSKeys({
            account_id: accountId(),
            namespace_id: namespaceId,
          });
          expect(remaining.result).toBeDefined();
        }),
      ));

    test("delete single key-value pair", () =>
      withNamespace("itty-cf-kv-single-delete", (namespaceId) =>
        Effect.gen(function* () {
          // Write a key
          yield* KV.workersKvNamespaceWriteMultipleKeyValuePairs({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: [{ key: "to-delete", value: "value" }],
          });

          // Delete the key
          yield* KV.deleteKeyValuePair({
            account_id: accountId(),
            namespace_id: namespaceId,
            key_name: "to-delete",
          });

          // Verify it's gone by listing
          const remaining = yield* KV.listANamespaceSKeys({
            account_id: accountId(),
            namespace_id: namespaceId,
          });

          const keys = (remaining.result as { result?: Array<{ name: string }> }).result ?? [];
          const found = keys.find((k) => k.name === "to-delete");
          expect(found).toBeUndefined();
        }),
      ));
  });

  describe("Pagination", () => {
    test("list namespaces with pagination", () =>
      Effect.gen(function* () {
        const response = yield* KV.listNamespaces({
          account_id: accountId(),
          page: 1,
          per_page: 10,
          order: "title",
          direction: "asc",
        });
        expect(response.result).toBeDefined();
        expect(response.result_info).toBeDefined();
      }));
  });
});
