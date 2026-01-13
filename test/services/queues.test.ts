/**
 * Queues API Tests
 *
 * Tests for Cloudflare Queues operations including queue CRUD,
 * consumer management, message operations, and typed error handling.
 */

import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import { test, getAccountId } from "../test.ts";
import * as Queues from "../../src/services/queues.ts";
import { QueueNotFound, QueueAlreadyExists, InvalidQueueName } from "../../src/errors/generated.ts";

const accountId = () => getAccountId();

// Helper to find queue by name
const findQueueByName = (name: string) =>
  Effect.gen(function* () {
    const response = yield* Queues.list({
      account_id: accountId(),
    });
    // The result is directly an array of queues
    const queues = response.result as Array<{ queue_id: string; queue_name: string }>;
    return queues.find((q) => q.queue_name === name);
  });

// Cleanup helper - deletes queue by ID if it exists
const cleanupById = (queueId: string) =>
  Queues.delete_({
    account_id: accountId(),
    queue_id: queueId,
  }).pipe(Effect.ignore);

// Cleanup by name - finds and deletes queue by name
const cleanupByName = (name: string) =>
  Effect.gen(function* () {
    const queue = yield* findQueueByName(name);
    if (queue) {
      yield* cleanupById(queue.queue_id);
    }
  }).pipe(Effect.ignore);

// Helper to create a queue and run a test, then cleanup
const withQueue = <A, E, R>(name: string, fn: (queueId: string) => Effect.Effect<A, E, R>) =>
  Effect.gen(function* () {
    yield* cleanupByName(name);

    const created = yield* Queues.create({
      account_id: accountId(),
      body: { queue_name: name },
    });

    // Extract queue_id from response
    const result = created.result as { queue_id?: string };
    let queueId = result.queue_id;

    if (!queueId) {
      // Try to find it by name
      const queue = yield* findQueueByName(name);
      if (!queue) {
        return yield* Effect.die(new Error("Failed to create queue or find queue ID"));
      }
      queueId = queue.queue_id;
    }

    return yield* fn(queueId).pipe(Effect.ensuring(cleanupById(queueId)));
  });

describe("Queues", () => {
  describe("Queue CRUD", () => {
    test("list queues", () =>
      Effect.gen(function* () {
        const response = yield* Queues.list({
          account_id: accountId(),
        });
        expect(response.result).toBeDefined();
      }));

    test("create, get, and delete queue", () =>
      Effect.gen(function* () {
        const name = "itty-cf-queues-crud";
        yield* cleanupByName(name);

        // Create queue
        const created = yield* Queues.create({
          account_id: accountId(),
          body: { queue_name: name },
        });
        expect(created.result).toBeDefined();

        // Find the queue
        const queue = yield* findQueueByName(name);
        expect(queue).toBeDefined();

        if (queue) {
          // Get queue
          const fetched = yield* Queues.get_({
            account_id: accountId(),
            queue_id: queue.queue_id,
          });
          expect(fetched.result).toBeDefined();

          // Delete queue
          yield* Queues.delete_({
            account_id: accountId(),
            queue_id: queue.queue_id,
          });
        }
      }));

    test("update queue settings", () =>
      withQueue("itty-cf-queues-update", (queueId) =>
        Effect.gen(function* () {
          yield* Queues.update({
            account_id: accountId(),
            queue_id: queueId,
            body: {
              queue_name: "itty-cf-queues-update",
              settings: {
                delivery_delay: 10,
              },
            },
          });

          const fetched = yield* Queues.get_({
            account_id: accountId(),
            queue_id: queueId,
          });
          expect(fetched.result).toBeDefined();
        }),
      ));

    test("partial update queue", () =>
      withQueue("itty-cf-queues-patch", (queueId) =>
        Effect.gen(function* () {
          yield* Queues.updatePartial({
            account_id: accountId(),
            queue_id: queueId,
            body: {
              settings: {
                message_retention_period: 86400,
              },
            },
          });

          const fetched = yield* Queues.get_({
            account_id: accountId(),
            queue_id: queueId,
          });
          expect(fetched.result).toBeDefined();
        }),
      ));
  });

  describe("Consumer Management", () => {
    test("list consumers", () =>
      withQueue("itty-cf-queues-consumers", (queueId) =>
        Effect.gen(function* () {
          const response = yield* Queues.listConsumers({
            account_id: accountId(),
            queue_id: queueId,
          });
          expect(response.result).toBeDefined();
        }),
      ));
  });

  describe("Message Operations", () => {
    test("push and pull messages", () =>
      withQueue("itty-cf-queues-messages", (queueId) =>
        Effect.gen(function* () {
          // First create an http_pull consumer to enable pulling
          yield* Queues.createConsumer({
            account_id: accountId(),
            queue_id: queueId,
            body: {
              type: "http_pull",
              settings: {
                batch_size: 10,
                visibility_timeout_ms: 30000,
              },
            },
          });

          // Push a batch of messages
          const pushResponse = yield* Queues.queuesPushMessages({
            account_id: accountId(),
            queue_id: queueId,
            body: {
              messages: [
                { body: "message 1", content_type: "text" },
                { body: "message 2", content_type: "text" },
              ],
            },
          });
          expect(pushResponse.result).toBeDefined();

          // Pull messages
          const pullResponse = yield* Queues.queuesPullMessages({
            account_id: accountId(),
            queue_id: queueId,
            body: {
              batch_size: 10,
              visibility_timeout_ms: 30000,
            },
          });
          expect(pullResponse.result).toBeDefined();
        }),
      ));

    test("push single message", () =>
      withQueue("itty-cf-queues-single", (queueId) =>
        Effect.gen(function* () {
          const response = yield* Queues.queuesPushMessage({
            account_id: accountId(),
            queue_id: queueId,
            body: {
              body: "test message",
              content_type: "text",
            },
          });
          expect(response.result).toBeDefined();
        }),
      ));
  });

  describe("Purge Operations", () => {
    test("get purge status", () =>
      withQueue("itty-cf-queues-purge-status", (queueId) =>
        Effect.gen(function* () {
          // First push a message and trigger a purge
          yield* Queues.queuesPushMessage({
            account_id: accountId(),
            queue_id: queueId,
            body: { body: "message to purge", content_type: "text" },
          });

          yield* Queues.queuesPurge({
            account_id: accountId(),
            queue_id: queueId,
            body: { delete_messages_permanently: true },
          });

          // Now get purge status - get_1 is the generated name for queues-purge-get
          const response = yield* Queues.get_1({
            account_id: accountId(),
            queue_id: queueId,
          });
          expect(response.result).toBeDefined();
          expect(response.result.started_at).toBeDefined();
        }),
      ));

    test("purge queue", () =>
      withQueue("itty-cf-queues-purge", (queueId) =>
        Effect.gen(function* () {
          // First push some messages
          yield* Queues.queuesPushMessages({
            account_id: accountId(),
            queue_id: queueId,
            body: {
              messages: [{ body: "message to purge", content_type: "text" }],
            },
          });

          // Purge the queue
          const response = yield* Queues.queuesPurge({
            account_id: accountId(),
            queue_id: queueId,
            body: {
              delete_messages_permanently: true,
            },
          });
          expect(response.result).toBeDefined();
        }),
      ));
  });

  describe("Error Handling", () => {
    test("QueueNotFound error when listing consumers for non-existent queue", () =>
      Effect.gen(function* () {
        yield* Queues.listConsumers({
          account_id: accountId(),
          queue_id: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.matchEffect({
            onSuccess: () => Effect.die("Expected QueueNotFound error"),
            onFailure: (error) =>
              Effect.gen(function* () {
                expect(error).toBeInstanceOf(QueueNotFound);
                expect((error as QueueNotFound).code).toBe(11000);
              }),
          }),
        );
      }));

    test("QueueNotFound error when deleting consumer from non-existent queue", () =>
      Effect.gen(function* () {
        yield* Queues.deleteConsumer({
          account_id: accountId(),
          queue_id: "00000000-0000-0000-0000-000000000000",
          consumer_id: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.matchEffect({
            onSuccess: () => Effect.die("Expected QueueNotFound error"),
            onFailure: (error) =>
              Effect.gen(function* () {
                expect(error).toBeInstanceOf(QueueNotFound);
                expect((error as QueueNotFound).code).toBe(11000);
              }),
          }),
        );
      }));

    test("QueueNotFound error when getting non-existent queue", () =>
      Effect.gen(function* () {
        yield* Queues.get_({
          account_id: accountId(),
          queue_id: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.matchEffect({
            onSuccess: () => Effect.die("Expected QueueNotFound error"),
            onFailure: (error) =>
              Effect.gen(function* () {
                expect(error).toBeInstanceOf(QueueNotFound);
                expect((error as QueueNotFound).code).toBe(11000);
              }),
          }),
        );
      }));

    test("QueueAlreadyExists error when creating duplicate queue", () =>
      withQueue("itty-cf-queues-duplicate", () =>
        Effect.gen(function* () {
          // Try to create the same queue again
          yield* Queues.create({
            account_id: accountId(),
            body: { queue_name: "itty-cf-queues-duplicate" },
          }).pipe(
            Effect.matchEffect({
              onSuccess: () => Effect.die("Expected QueueAlreadyExists error"),
              onFailure: (error) =>
                Effect.gen(function* () {
                  expect(error).toBeInstanceOf(QueueAlreadyExists);
                  expect((error as QueueAlreadyExists).code).toBe(11009);
                }),
            }),
          );
        }),
      ));

    test("InvalidQueueName error when creating queue with invalid name", () =>
      Effect.gen(function* () {
        yield* Queues.create({
          account_id: accountId(),
          body: { queue_name: "" },
        }).pipe(
          Effect.matchEffect({
            onSuccess: () => Effect.die("Expected InvalidQueueName error"),
            onFailure: (error) =>
              Effect.gen(function* () {
                expect(error).toBeInstanceOf(InvalidQueueName);
                expect((error as InvalidQueueName).code).toBe(11003);
              }),
          }),
        );
      }));

    test("InvalidQueueName error when creating queue with special characters", () =>
      Effect.gen(function* () {
        yield* Queues.create({
          account_id: accountId(),
          body: { queue_name: "invalid!queue@name" },
        }).pipe(
          Effect.matchEffect({
            onSuccess: () => Effect.die("Expected InvalidQueueName error"),
            onFailure: (error) =>
              Effect.gen(function* () {
                expect(error).toBeInstanceOf(InvalidQueueName);
                expect((error as InvalidQueueName).code).toBe(11003);
              }),
          }),
        );
      }));
  });
});
