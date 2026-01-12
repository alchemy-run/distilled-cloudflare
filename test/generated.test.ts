/**
 * Basic tests for generated service imports.
 *
 * These tests verify that the generated code can be imported and types are correct.
 */

import { describe, it, expect } from "vitest";

describe("Generated Services", () => {
  it("should import r2 service", async () => {
    const R2 = await import("../src/services/r2.ts");
    expect(R2.listBuckets).toBeDefined();
    expect(typeof R2.listBuckets).toBe("function");
  });

  it("should import kv service", async () => {
    const KV = await import("../src/services/kv.ts");
    expect(KV.listNamespaces).toBeDefined();
    expect(typeof KV.listNamespaces).toBe("function");
  });

  it("should import workers service", async () => {
    const Workers = await import("../src/services/workers.ts");
    expect(Workers.listScripts).toBeDefined();
    expect(typeof Workers.listScripts).toBe("function");
  });

  it("should import queues service", async () => {
    const Queues = await import("../src/services/queues.ts");
    expect(Queues.list).toBeDefined();
    expect(typeof Queues.list).toBe("function");
  });

  it("should import dns service", async () => {
    const DNS = await import("../src/services/dns.ts");
    expect(DNS.listDnsRecords).toBeDefined();
    expect(typeof DNS.listDnsRecords).toBe("function");
  });

  it("should import error classes", async () => {
    const Errors = await import("../src/errors/generated.ts");
    expect(Errors.NoSuchBucket).toBeDefined();
    expect(Errors.InvalidBucketName).toBeDefined();
    expect(Errors.QueueNotFound).toBeDefined();
  });
});
