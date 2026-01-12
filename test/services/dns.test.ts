/**
 * Tests for Cloudflare DNS API
 *
 * These tests require Cloudflare credentials from Doppler:
 * From repo root: bun run download:env
 *
 * Note: DNS tests also require CLOUDFLARE_ZONE_ID
 */

import { describe } from "@effect/vitest";
import { expect } from "vitest";
import * as Effect from "effect/Effect";

import * as DNS from "../../src/services/dns.ts";
import { test, getZoneId, hasCredentials } from "../test.ts";

const ZONE_ID = getZoneId();
const hasZone = hasCredentials() && !!ZONE_ID;

describe.skipIf(!hasZone)("DNS API", () => {
  describe("listDnsRecords", () => {
    test("should list DNS records", () =>
      Effect.gen(function* () {
        const result = yield* DNS.listDnsRecords({
          zone_id: ZONE_ID!,
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} DNS records`);
      }),
    );

    test("should filter by type", () =>
      Effect.gen(function* () {
        const result = yield* DNS.listDnsRecords({
          zone_id: ZONE_ID!,
          type: "A",
        });

        expect(result).toBeDefined();
        expect(result.result).toBeInstanceOf(Array);
        console.log(`Found ${result.result.length} A records`);
      }),
    );
  });

  describe("DNS record lifecycle", () => {
    let recordId: string | undefined;
    const testRecordName = `distilled-test-${Date.now()}.example.com`;

    test("should create a DNS record", () =>
      Effect.gen(function* () {
        const result = yield* DNS.createDnsRecord({
          zone_id: ZONE_ID!,
          type: "A",
          name: testRecordName,
          content: "192.0.2.1",
          ttl: 300,
          proxied: false,
          comment: "Test record from distilled-cloudflare",
        });

        expect(result).toBeDefined();
        expect(result.result.name).toContain("distilled-test");
        expect(result.result.type).toBe("A");
        expect(result.result.content).toBe("192.0.2.1");

        recordId = result.result.id;
        console.log(`Created DNS record: ${recordId}`);
      }),
    );

    test("should get the DNS record", () =>
      Effect.gen(function* () {
        if (!recordId) {
          console.log("Skipping - no record ID");
          return;
        }

        const result = yield* DNS.getDnsRecord({
          zone_id: ZONE_ID!,
          dns_record_id: recordId,
        });

        expect(result).toBeDefined();
        expect(result.result.id).toBe(recordId);
        console.log(`Got DNS record: ${result.result.name}`);
      }),
    );

    test("should update the DNS record", () =>
      Effect.gen(function* () {
        if (!recordId) {
          console.log("Skipping - no record ID");
          return;
        }

        const result = yield* DNS.updateDnsRecord({
          zone_id: ZONE_ID!,
          dns_record_id: recordId,
          type: "A",
          name: testRecordName,
          content: "192.0.2.2",
          ttl: 600,
        });

        expect(result).toBeDefined();
        expect(result.result.content).toBe("192.0.2.2");
        console.log("Updated DNS record");
      }),
    );

    test("should patch the DNS record", () =>
      Effect.gen(function* () {
        if (!recordId) {
          console.log("Skipping - no record ID");
          return;
        }

        const result = yield* DNS.patchDnsRecord({
          zone_id: ZONE_ID!,
          dns_record_id: recordId,
          comment: "Updated comment",
        });

        expect(result).toBeDefined();
        console.log("Patched DNS record");
      }),
    );

    test("should delete the DNS record", () =>
      Effect.gen(function* () {
        if (!recordId) {
          console.log("Skipping - no record ID");
          return;
        }

        const result = yield* DNS.deleteDnsRecord({
          zone_id: ZONE_ID!,
          dns_record_id: recordId,
        });

        expect(result).toBeDefined();
        expect(result.result.id).toBe(recordId);
        console.log(`Deleted DNS record: ${recordId}`);
      }),
    );
  });
});
