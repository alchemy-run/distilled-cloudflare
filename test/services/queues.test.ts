/**
 * Tests for Cloudflare Queues API
 *
 * These tests require Cloudflare credentials from Doppler:
 * From repo root: bun run download:env
 */

import { describe } from "@effect/vitest";
import { expect } from "vitest";
import * as Effect from "effect/Effect";

import * as Queues from "../../src/services/queues.ts";
import { test, getAccountId, hasCredentials } from "../test.ts";

const TEST_QUEUE_NAME = "distilled-queue-test";

describe.skipIf(!hasCredentials())("Queues API", () => {
  describe("listQueues", () => {
    test("should list queues", () =>
      Effect.gen(function* () {
        const result = yield* Queues.listQueues({
          account_id: getAccountId(),
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} queues`);
      }),
    );
  });

  describe("queue lifecycle", () => {
    let queueId: string | undefined;

    test("should create a queue", () =>
      Effect.gen(function* () {
        // First check if test queue exists
        const list = yield* Queues.listQueues({
          account_id: getAccountId(),
        });

        const existing = list.result.find(
          (q) => q.queue_name === TEST_QUEUE_NAME,
        );
        if (existing) {
          console.log(`Test queue already exists: ${existing.queue_id}`);
          queueId = existing.queue_id;
          return;
        }

        // Create the queue
        const result = yield* Queues.createQueue({
          account_id: getAccountId(),
          queue_name: TEST_QUEUE_NAME,
        });

        expect(result).toBeDefined();
        expect(result.result.queue_name).toBe(TEST_QUEUE_NAME);
        queueId = result.result.queue_id;
        console.log(`Created queue: ${queueId}`);
      }),
    );

    test("should get the queue", () =>
      Effect.gen(function* () {
        if (!queueId) {
          console.log("Skipping - no queue ID");
          return;
        }

        const result = yield* Queues.getQueue({
          account_id: getAccountId(),
          queue_id: queueId,
        });

        expect(result).toBeDefined();
        expect(result.result.queue_id).toBe(queueId);
        console.log(`Got queue: ${result.result.queue_name}`);
      }),
    );

    test("should list consumers (empty initially)", () =>
      Effect.gen(function* () {
        if (!queueId) {
          console.log("Skipping - no queue ID");
          return;
        }

        const result = yield* Queues.listConsumers({
          account_id: getAccountId(),
          queue_id: queueId,
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} consumers`);
      }),
    );

    test("should send messages to the queue", () =>
      Effect.gen(function* () {
        if (!queueId) {
          console.log("Skipping - no queue ID");
          return;
        }

        const result = yield* Queues.sendMessages({
          account_id: getAccountId(),
          queue_id: queueId,
          messages: [
            { body: { test: "message1" }, content_type: "json" },
            { body: { test: "message2" }, content_type: "json" },
          ],
        });

        expect(result).toBeDefined();
        console.log("Sent 2 messages to queue");
      }),
    );

    test("should update the queue", () =>
      Effect.gen(function* () {
        if (!queueId) {
          console.log("Skipping - no queue ID");
          return;
        }

        const result = yield* Queues.updateQueue({
          account_id: getAccountId(),
          queue_id: queueId,
          queue_name: TEST_QUEUE_NAME,
          settings: {
            delivery_delay: 5,
          },
        });

        expect(result).toBeDefined();
        console.log("Updated queue settings");
      }),
    );

    // Cleanup - delete queue
    test("should delete the queue", () =>
      Effect.gen(function* () {
        if (!queueId) {
          console.log("Skipping - no queue ID");
          return;
        }

        const result = yield* Queues.deleteQueue({
          account_id: getAccountId(),
          queue_id: queueId,
        });

        expect(result).toBeDefined();
        console.log(`Deleted queue: ${queueId}`);
      }),
    );
  });
});
