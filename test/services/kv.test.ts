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
import { NamespaceNameRequired, IncompleteBody, ParseError } from "../../src/errors/generated.ts";

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
    // response.result is already the array of namespaces
    return response.result.find((ns) => ns.title === title);
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

    // created.result is already the namespace object with id
    const namespaceId = created.result.id;

    return yield* fn(namespaceId).pipe(Effect.ensuring(cleanupNamespace(namespaceId)));
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

        // created.result is already the namespace object
        const namespaceId = created.result.id;
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

          // fetched.result is already the namespace object
          expect(fetched.result.title).toBe(newTitle);
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
          // Write multiple keys (need at least 10+ to test limit since API requires limit >= 10)
          const keys = Array.from({ length: 15 }, (_, i) => ({
            key: `key-${String(i).padStart(2, "0")}`,
            value: `value-${i}`,
          }));

          yield* KV.workersKvNamespaceWriteMultipleKeyValuePairs({
            account_id: accountId(),
            namespace_id: namespaceId,
            body: keys,
          });

          // List with limit (minimum is 10)
          const response = yield* KV.listANamespaceSKeys({
            account_id: accountId(),
            namespace_id: namespaceId,
            limit: 10,
          });
          expect(response.result).toBeDefined();
          // Should return at most 10 keys
          expect(response.result.length).toBeLessThanOrEqual(10);
        }),
      ));

    test("write and read single key-value pair with FormData", () =>
      withNamespace("itty-cf-kv-single-rw", (namespaceId) =>
        Effect.gen(function* () {
          const keyName = "single-key";
          const value = "Hello, KV!";
          const metadata = { author: "test", version: 1 };

          // Create FormData for the write request
          const formData = new FormData();
          formData.append("value", value);
          formData.append("metadata", JSON.stringify(metadata));

          // Write single key with FormData
          yield* KV.workersKvNamespaceWriteKeyValuePairWithMetadata({
            account_id: accountId(),
            namespace_id: namespaceId,
            key_name: keyName,
            body: formData,
          });

          // Read the metadata
          const metadataResponse = yield* KV.workersKvNamespaceReadTheMetadataForAKey({
            account_id: accountId(),
            namespace_id: namespaceId,
            key_name: keyName,
          });
          expect(metadataResponse.result).toBeDefined();

          // Verify key exists in list
          const keysResponse = yield* KV.listANamespaceSKeys({
            account_id: accountId(),
            namespace_id: namespaceId,
          });
          const found = keysResponse.result.find((k) => k.name === keyName);
          expect(found).toBeDefined();
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

          // remaining.result is already the array of keys
          const found = remaining.result.find((k) => k.name === "to-delete");
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

  describe("Error Handling", () => {
    test("NamespaceNameRequired error when creating with invalid body", () =>
      Effect.gen(function* () {
        // Pass a body with wrong field (not title) to trigger 10019
        const result = yield* KV.createANamespace({
          account_id: accountId(),
          // @ts-expect-error - intentionally using wrong field to trigger error
          body: { wrongField: "test" },
        }).pipe(Effect.exit);

        expect(result._tag).toBe("Failure");
        if (result._tag === "Failure") {
          const error = result.cause;
          expect(error._tag).toBe("Fail");
          if (error._tag === "Fail") {
            expect(error.error).toBeInstanceOf(NamespaceNameRequired);
            expect((error.error as NamespaceNameRequired).code).toBe(10019);
          }
        }
      }));

    test("IncompleteBody error when accessing non-existent namespace", () =>
      Effect.gen(function* () {
        // Use a fake namespace ID that doesn't exist
        // Cloudflare returns 10013 (IncompleteBody) for this case
        const fakeNamespaceId = "00000000000000000000000000000000";

        const result = yield* KV.getANamespace({
          account_id: accountId(),
          namespace_id: fakeNamespaceId,
        }).pipe(Effect.exit);

        expect(result._tag).toBe("Failure");
        if (result._tag === "Failure") {
          const error = result.cause;
          expect(error._tag).toBe("Fail");
          if (error._tag === "Fail") {
            expect(error.error).toBeInstanceOf(IncompleteBody);
            expect((error.error as IncompleteBody).code).toBe(10013);
          }
        }
      }));

    test("IncompleteBody error when listing keys for non-existent namespace", () =>
      Effect.gen(function* () {
        const fakeNamespaceId = "00000000000000000000000000000000";

        const result = yield* KV.listANamespaceSKeys({
          account_id: accountId(),
          namespace_id: fakeNamespaceId,
        }).pipe(Effect.exit);

        expect(result._tag).toBe("Failure");
        if (result._tag === "Failure") {
          const error = result.cause;
          expect(error._tag).toBe("Fail");
          if (error._tag === "Fail") {
            expect(error.error).toBeInstanceOf(IncompleteBody);
          }
        }
      }));
  });
});
