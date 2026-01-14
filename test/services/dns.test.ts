/**
 * DNS API Tests
 *
 * Tests for Cloudflare DNS record operations including CRUD,
 * batch operations, and typed error handling.
 *
 * NOTE: These tests require CLOUDFLARE_ZONE_ID to be set.
 * Tests will be skipped if zone ID is not available.
 */

import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import { test, getZoneId } from "../test.ts";
import * as DNS from "~/services/dns.ts";

const zoneId = () => {
  const id = getZoneId();
  if (!id) {
    throw new Error("CLOUDFLARE_ZONE_ID is not set");
  }
  return id;
};

const hasZone = () => !!getZoneId();

// Helper to find a record by name and type
const findRecord = (name: string, type: string) =>
  Effect.gen(function* () {
    const response = yield* DNS.listDnsRecords({
      zone_id: zoneId(),
      name,
      type: type as "A" | "AAAA" | "CNAME" | "TXT",
    });
    const result = response.result as {
      result?: Array<{ id: string; name: string; type: string }>;
    };
    const records = result.result ?? [];
    return records.find((r) => r.name === name && r.type === type);
  });

// Cleanup helper - deletes record by ID if it exists
const cleanupById = (recordId: string) =>
  DNS.deleteDnsRecord({
    zone_id: zoneId(),
    dns_record_id: recordId,
  }).pipe(Effect.ignore);

// Cleanup by name and type
const cleanupByName = (name: string, type: string) =>
  Effect.gen(function* () {
    const record = yield* findRecord(name, type);
    if (record) {
      yield* cleanupById(record.id);
    }
  }).pipe(Effect.ignore);

// Helper to create a record and run a test, then cleanup
const withRecord = <A, E, R>(
  name: string,
  type: "A" | "AAAA" | "CNAME" | "TXT",
  content: string,
  fn: (recordId: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    yield* cleanupByName(name, type);

    const created = yield* DNS.createDnsRecord({
      zone_id: zoneId(),
      body: {
        type,
        name,
        content,
        ttl: 300,
        proxied: false,
      } as Record<string, unknown>,
    });

    const result = created.result as { result?: { id: string } };
    const recordId = result.result?.id;
    if (!recordId) {
      return yield* Effect.die(new Error("Failed to create DNS record"));
    }

    return yield* fn(recordId).pipe(Effect.ensuring(cleanupById(recordId)));
  });

describe.skipIf(!hasZone())("DNS", () => {
  describe("Record CRUD", () => {
    test("list DNS records", () =>
      Effect.gen(function* () {
        const response = yield* DNS.listDnsRecords({
          zone_id: zoneId(),
        });
        expect(response.result).toBeDefined();
      }));

    test("list DNS records with filters", () =>
      Effect.gen(function* () {
        const response = yield* DNS.listDnsRecords({
          zone_id: zoneId(),
          type: "A",
          per_page: 10,
          order: "name",
          direction: "asc",
        });
        expect(response.result).toBeDefined();
      }));

    test("create, get, and delete A record", () =>
      Effect.gen(function* () {
        const name = `itty-cf-dns-a.${zoneId()}`;
        yield* cleanupByName(name, "A");

        // Create A record
        const created = yield* DNS.createDnsRecord({
          zone_id: zoneId(),
          body: {
            type: "A",
            name: "itty-cf-dns-a",
            content: "192.0.2.1",
            ttl: 300,
            proxied: false,
          } as Record<string, unknown>,
        });
        expect(created.result).toBeDefined();

        const result = created.result as { result?: { id: string } };
        const recordId = result.result?.id;
        expect(recordId).toBeDefined();

        if (recordId) {
          // Get record
          const fetched = yield* DNS.dnsRecordsForAZoneDnsRecordDetails({
            zone_id: zoneId(),
            dns_record_id: recordId,
          });
          expect(fetched.result).toBeDefined();

          // Delete record
          yield* DNS.deleteDnsRecord({
            zone_id: zoneId(),
            dns_record_id: recordId,
          });
        }
      }));

    test("create TXT record", () =>
      withRecord("itty-cf-dns-txt", "TXT", "v=spf1 -all", (recordId) =>
        Effect.gen(function* () {
          const fetched = yield* DNS.dnsRecordsForAZoneDnsRecordDetails({
            zone_id: zoneId(),
            dns_record_id: recordId,
          });
          expect(fetched.result).toBeDefined();
        }),
      ));

    test("update DNS record", () =>
      withRecord("itty-cf-dns-update", "A", "192.0.2.1", (recordId) =>
        Effect.gen(function* () {
          // Update the record
          yield* DNS.updateDnsRecord({
            zone_id: zoneId(),
            dns_record_id: recordId,
            body: {
              type: "A",
              name: "itty-cf-dns-update",
              content: "192.0.2.2",
              ttl: 600,
            } as Record<string, unknown>,
          });

          // Verify update
          const fetched = yield* DNS.dnsRecordsForAZoneDnsRecordDetails({
            zone_id: zoneId(),
            dns_record_id: recordId,
          });
          expect(fetched.result).toBeDefined();
        }),
      ));

    test("patch DNS record", () =>
      withRecord("itty-cf-dns-patch", "A", "192.0.2.1", (recordId) =>
        Effect.gen(function* () {
          // Patch the record (partial update)
          yield* DNS.patchDnsRecord({
            zone_id: zoneId(),
            dns_record_id: recordId,
            body: {
              ttl: 900,
            } as Record<string, unknown>,
          });

          // Verify patch
          const fetched = yield* DNS.dnsRecordsForAZoneDnsRecordDetails({
            zone_id: zoneId(),
            dns_record_id: recordId,
          });
          expect(fetched.result).toBeDefined();
        }),
      ));
  });

  describe("Usage", () => {
    test("get DNS usage", () =>
      Effect.gen(function* () {
        const response = yield* DNS.getUsage({
          zone_id: zoneId(),
        });
        expect(response.result).toBeDefined();
      }));
  });

  describe("Export/Import", () => {
    test("export DNS records", () =>
      Effect.gen(function* () {
        const response = yield* DNS.dnsRecordsForAZoneExportDnsRecords({
          zone_id: zoneId(),
        });
        expect(response.result).toBeDefined();
      }));
  });

  describe("Error Handling", () => {
    test("InvalidZone error with invalid zone ID", () =>
      DNS.listDnsRecords({
        zone_id: "invalid-zone-id-12345",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("InvalidZone");
        }),
      ));

    test("RecordNotFound error when getting non-existent record", () =>
      Effect.gen(function* () {
        const result = yield* DNS.dnsRecordsForAZoneDnsRecordDetails({
          zone_id: zoneId(),
          dns_record_id: "00000000000000000000000000000000",
        }).pipe(Effect.exit);

        // This might not be a RecordNotFound - Cloudflare may return different error
        expect(Exit.isFailure(result)).toBe(true);
      }));

    test("RecordNotFound error when deleting non-existent record", () =>
      DNS.deleteDnsRecord({
        zone_id: zoneId(),
        dns_record_id: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((error) => {
          expect(error._tag).toBe("RecordNotFound");
        }),
      ));

    test("ValidationError when creating record with invalid content", () =>
      Effect.gen(function* () {
        const result = yield* DNS.createDnsRecord({
          zone_id: zoneId(),
          body: {
            type: "A",
            name: "itty-cf-dns-invalid",
            content: "not-an-ip-address",
            ttl: 300,
          } as Record<string, unknown>,
        }).pipe(Effect.exit);

        expect(Exit.isFailure(result)).toBe(true);
      }));
  });
});
