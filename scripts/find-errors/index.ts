#!/usr/bin/env bun
/**
 * Find undocumented errors in Cloudflare API.
 *
 * This tool discovers errors by calling APIs with fake/minimal inputs.
 * Discovered errors are automatically recorded to spec/error-catalog.json.
 *
 * Usage:
 *   bun find dns                    # Find errors for DNS service
 *   bun find workers                # Find errors for Workers service
 *   bun find --zone-id <id> dns     # Use specific zone ID
 *   bun find --dry-run dns          # Show what would be tested
 *
 * After discovering errors:
 *   bun generate --service dns      # Regenerate SDK with typed errors
 */

import { Args, Command, Options } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Logger, LogLevel } from "effect";
import { loadCatalog } from "./catalog.ts";
import { createErrorTracker, callEndpoint, printSummary, type Auth } from "./runner.ts";

// Load .env file from repo root
const dotenv = await Bun.file("../.env")
  .text()
  .catch(() => "");
for (const line of dotenv.split("\n")) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1];
    if (key && !process.env[key]) {
      // Strip quotes from value
      let value = (match[2] ?? "").trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

// Get account ID from environment for probing
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID ?? "00000000000000000000000000000000";
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID ?? "00000000000000000000000000000000";

// Sample endpoints to probe for each service
const SERVICE_ENDPOINTS: Record<string, Array<{ method: string; path: string; body?: unknown }>> = {
  dns: [
    { method: "GET", path: "/zones/invalid-zone-id/dns_records" },
    { method: "GET", path: "/zones/00000000000000000000000000000000/dns_records" },
    { method: "POST", path: "/zones/00000000000000000000000000000000/dns_records", body: {} },
    { method: "DELETE", path: "/zones/00000000000000000000000000000000/dns_records/invalid" },
    { method: "GET", path: "/zones/00000000000000000000000000000000/dns_records/invalid" },
    // With real zone ID (if available)
    { method: "GET", path: `/zones/${ZONE_ID}/dns_records/nonexistent` },
    { method: "DELETE", path: `/zones/${ZONE_ID}/dns_records/nonexistent` },
    { method: "POST", path: `/zones/${ZONE_ID}/dns_records`, body: {} },
    {
      method: "POST",
      path: `/zones/${ZONE_ID}/dns_records`,
      body: { type: "A", name: "", content: "" },
    },
  ],
  workers: [
    { method: "GET", path: "/accounts/invalid-account/workers/scripts" },
    { method: "GET", path: "/accounts/00000000000000000000000000000000/workers/scripts" },
    {
      method: "DELETE",
      path: "/accounts/00000000000000000000000000000000/workers/scripts/nonexistent",
    },
    // With real account ID
    { method: "DELETE", path: `/accounts/${ACCOUNT_ID}/workers/scripts/nonexistent-script-12345` },
    { method: "GET", path: `/accounts/${ACCOUNT_ID}/workers/scripts/nonexistent-script-12345` },
    {
      method: "GET",
      path: `/accounts/${ACCOUNT_ID}/workers/scripts/nonexistent-script-12345/settings`,
    },
  ],
  kv: [
    { method: "GET", path: "/accounts/invalid-account/storage/kv/namespaces" },
    { method: "GET", path: "/accounts/00000000000000000000000000000000/storage/kv/namespaces" },
    {
      method: "DELETE",
      path: "/accounts/00000000000000000000000000000000/storage/kv/namespaces/invalid",
    },
    // With real account ID
    { method: "GET", path: `/accounts/${ACCOUNT_ID}/storage/kv/namespaces/nonexistent-namespace` },
    {
      method: "DELETE",
      path: `/accounts/${ACCOUNT_ID}/storage/kv/namespaces/nonexistent-namespace`,
    },
    { method: "POST", path: `/accounts/${ACCOUNT_ID}/storage/kv/namespaces`, body: {} },
    { method: "POST", path: `/accounts/${ACCOUNT_ID}/storage/kv/namespaces`, body: { title: "" } },
  ],
  r2: [
    { method: "GET", path: "/accounts/invalid-account/r2/buckets" },
    { method: "GET", path: "/accounts/00000000000000000000000000000000/r2/buckets" },
    {
      method: "DELETE",
      path: "/accounts/00000000000000000000000000000000/r2/buckets/nonexistent-bucket",
    },
    // With real account ID
    { method: "GET", path: `/accounts/${ACCOUNT_ID}/r2/buckets/nonexistent-bucket-12345` },
    { method: "DELETE", path: `/accounts/${ACCOUNT_ID}/r2/buckets/nonexistent-bucket-12345` },
    { method: "POST", path: `/accounts/${ACCOUNT_ID}/r2/buckets`, body: {} },
    { method: "POST", path: `/accounts/${ACCOUNT_ID}/r2/buckets`, body: { name: "" } },
    {
      method: "POST",
      path: `/accounts/${ACCOUNT_ID}/r2/buckets`,
      body: { name: "invalid name with spaces" },
    },
  ],
  queues: [
    { method: "GET", path: "/accounts/invalid-account/queues" },
    { method: "GET", path: "/accounts/00000000000000000000000000000000/queues" },
    { method: "DELETE", path: "/accounts/00000000000000000000000000000000/queues/invalid-queue" },
    {
      method: "POST",
      path: "/accounts/00000000000000000000000000000000/queues",
      body: { queue_name: "" },
    },
    // With real account ID
    { method: "GET", path: `/accounts/${ACCOUNT_ID}/queues/00000000000000000000000000000000` },
    { method: "DELETE", path: `/accounts/${ACCOUNT_ID}/queues/00000000000000000000000000000000` },
    { method: "POST", path: `/accounts/${ACCOUNT_ID}/queues`, body: {} },
    { method: "POST", path: `/accounts/${ACCOUNT_ID}/queues`, body: { queue_name: "" } },
    {
      method: "POST",
      path: `/accounts/${ACCOUNT_ID}/queues`,
      body: { queue_name: "invalid name with spaces" },
    },
  ],
  zones: [
    { method: "GET", path: "/zones/invalid-zone-id" },
    { method: "GET", path: "/zones/00000000000000000000000000000000" },
    { method: "DELETE", path: "/zones/00000000000000000000000000000000" },
  ],
  accounts: [
    { method: "GET", path: "/accounts/invalid-account-id" },
    { method: "GET", path: "/accounts/00000000000000000000000000000000" },
  ],
};

/**
 * Get authentication credentials from environment.
 */
function getAuth(): Auth | null {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (token) {
    return { type: "token", token };
  }

  const apiKey = process.env.CLOUDFLARE_API_KEY;
  const email = process.env.CLOUDFLARE_EMAIL;
  if (apiKey && email) {
    return { type: "key", apiKey, email };
  }

  return null;
}

// CLI Options
const serviceArg = Args.text({ name: "service" }).pipe(
  Args.withDescription("The Cloudflare service to find errors for (e.g., dns, workers, kv)"),
);

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Show what would be tested without calling APIs"),
  Options.withDefault(false),
);

const zoneIdOption = Options.text("zone-id").pipe(
  Options.withDescription("Zone ID to use for zone-scoped operations"),
  Options.optional,
);

const accountIdOption = Options.text("account-id").pipe(
  Options.withDescription("Account ID to use for account-scoped operations"),
  Options.optional,
);

// Main command
const findCommand = Command.make(
  "find",
  {
    service: serviceArg,
    dryRun: dryRunOption,
    zoneId: zoneIdOption,
    accountId: accountIdOption,
  },
  ({ service, dryRun }) =>
    Effect.gen(function* () {
      yield* Console.log(`\n🔍 Finding errors for ${service}\n`);

      // Get API credentials from environment
      const auth = getAuth();
      if (!auth && !dryRun) {
        yield* Console.log("❌ Cloudflare credentials required");
        yield* Console.log(
          "   Set CLOUDFLARE_API_TOKEN or (CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL)",
        );
        yield* Console.log("   Run 'bun run download:env' from repo root to fetch from Doppler");
        return;
      }

      // Load error catalog
      yield* Console.log("📂 Loading error catalog...");
      const catalog = yield* loadCatalog;
      const catalogSize = Object.keys(catalog.codes).length;
      yield* Console.log(`   Found ${catalogSize} known error codes`);

      // Get endpoints for service
      const endpoints = SERVICE_ENDPOINTS[service];
      if (!endpoints) {
        yield* Console.log(`❌ Unknown service: ${service}`);
        yield* Console.log(`   Available services: ${Object.keys(SERVICE_ENDPOINTS).join(", ")}`);
        return;
      }

      yield* Console.log(`\n🔬 Testing ${endpoints.length} endpoints...\n`);

      if (dryRun) {
        yield* Console.log("📋 DRY RUN - Endpoints that would be tested:\n");
        for (const endpoint of endpoints) {
          yield* Console.log(`   ${endpoint.method} ${endpoint.path}`);
        }
        yield* Console.log("");
        return;
      }

      // Create tracker
      const tracker = createErrorTracker(catalog);

      // Call endpoints
      for (const endpoint of endpoints) {
        const result = yield* callEndpoint(
          endpoint.method,
          endpoint.path,
          endpoint.body,
          auth!,
          tracker,
        );

        if (!result.success) {
          const prefix = result.isNew ? "🆕" : "✓";
          yield* Console.log(
            `   ${prefix} ${endpoint.method} ${endpoint.path} → ${result.errorCode}: ${result.suggestedName ?? "known"}`,
          );
        } else {
          yield* Console.log(`   ✓ ${endpoint.method} ${endpoint.path} → success`);
        }
      }

      // Print summary
      yield* printSummary(tracker);

      if (tracker.newErrors.length > 0) {
        yield* Console.log(
          `\n   Run 'bun generate --service ${service}' to regenerate the SDK with these errors.`,
        );
      }

      yield* Console.log("");
    }),
);

// CLI setup
const cli = Command.run(findCommand, {
  name: "find",
  version: "1.0.0",
});

// Run
cli(process.argv).pipe(
  Effect.provide(NodeContext.layer),
  Logger.withMinimumLogLevel(process.env.DEBUG ? LogLevel.Debug : LogLevel.Info),
  NodeRuntime.runMain,
);
