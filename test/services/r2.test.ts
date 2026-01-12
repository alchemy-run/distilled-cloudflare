/**
 * Tests for Cloudflare R2 API
 *
 * These tests require Cloudflare credentials from Doppler:
 * From repo root: bun run download:env
 */

import { describe } from "@effect/vitest";
import { expect } from "vitest";
import * as Effect from "effect/Effect";

import * as R2 from "../../src/services/r2.ts";
import { test, getAccountId, hasCredentials } from "../test.ts";

const TEST_BUCKET_NAME = "distilled-r2-test";

describe.skipIf(!hasCredentials())("R2 API", () => {
  describe("listBuckets", () => {
    test("should list R2 buckets", () =>
      Effect.gen(function* () {
        const result = yield* R2.listBuckets({
          account_id: getAccountId(),
        });

        expect(result).toBeDefined();
        expect(result.result.buckets).toBeInstanceOf(Array);
        console.log(`Found ${result.result.buckets.length} R2 buckets`);
      }),
    );
  });

  describe("bucket lifecycle", () => {
    test("should create a bucket", () =>
      Effect.gen(function* () {
        // First, list existing buckets to check if test bucket exists
        const list = yield* R2.listBuckets({
          account_id: getAccountId(),
        });

        const existing = list.result.buckets.find(
          (b) => b.name === TEST_BUCKET_NAME,
        );
        if (existing) {
          console.log(`Test bucket already exists: ${TEST_BUCKET_NAME}`);
          return;
        }

        // Create the bucket
        const result = yield* R2.createBucket({
          account_id: getAccountId(),
          name: TEST_BUCKET_NAME,
        });

        expect(result).toBeDefined();
        expect(result.result.name).toBe(TEST_BUCKET_NAME);
        console.log(`Created bucket: ${TEST_BUCKET_NAME}`);
      }),
    );

    test("should get the bucket", () =>
      Effect.gen(function* () {
        const result = yield* R2.getBucket({
          account_id: getAccountId(),
          bucket_name: TEST_BUCKET_NAME,
        });

        expect(result).toBeDefined();
        expect(result.result.name).toBe(TEST_BUCKET_NAME);
        console.log(`Got bucket: ${result.result.name}`);
      }),
    );

    test("should get bucket usage", () =>
      Effect.gen(function* () {
        const result = yield* R2.getBucketUsage({
          account_id: getAccountId(),
          bucket_name: TEST_BUCKET_NAME,
        });

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        console.log(`Bucket usage: ${JSON.stringify(result.result)}`);
      }),
    );

    test("should list custom domains", () =>
      Effect.gen(function* () {
        const result = yield* R2.listCustomDomains({
          account_id: getAccountId(),
          bucket_name: TEST_BUCKET_NAME,
        });

        expect(result).toBeDefined();
        expect(result.result.domains).toBeInstanceOf(Array);
        console.log(`Found ${result.result.domains.length} custom domains`);
      }),
    );

    // Cleanup - delete bucket
    test("should delete the bucket", () =>
      Effect.gen(function* () {
        const result = yield* R2.deleteBucket({
          account_id: getAccountId(),
          bucket_name: TEST_BUCKET_NAME,
        });

        expect(result).toBeDefined();
        console.log(`Deleted bucket: ${TEST_BUCKET_NAME}`);
      }),
    );
  });
});
