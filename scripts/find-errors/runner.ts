/**
 * API runner for error discovery.
 *
 * Calls Cloudflare API operations with fake/minimal inputs to discover errors.
 */

import { FetchHttpClient, HttpClient, HttpClientRequest, HttpBody } from "@effect/platform";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type { ErrorCatalogData } from "../../src/error-catalog.ts";
import { addDiscoveredError, saveCatalog } from "./catalog.ts";

/**
 * Result of calling an operation.
 */
export interface CallResult {
  success: boolean;
  errorCode?: number;
  errorMessage?: string;
  isNew?: boolean;
  suggestedName?: string;
}

/**
 * Error tracking state.
 */
export interface ErrorTracker {
  catalog: ErrorCatalogData;
  newErrors: Array<{ code: number; message: string; name: string }>;
  allErrors: Array<{ code: number; message: string }>;
  skipped: Array<{ operation: string; reason: string }>;
}

/**
 * Create a new error tracker.
 */
export const createErrorTracker = (catalog: ErrorCatalogData): ErrorTracker => ({
  catalog,
  newErrors: [],
  allErrors: [],
  skipped: [],
});

/**
 * Authentication credentials.
 */
export type Auth =
  | { type: "token"; token: string }
  | { type: "key"; apiKey: string; email: string };

/**
 * Call a Cloudflare API endpoint and record any errors.
 */
export const callEndpoint = (
  method: string,
  path: string,
  body: unknown,
  auth: Auth,
  tracker: ErrorTracker,
) =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const url = `https://api.cloudflare.com/client/v4${path}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (auth.type === "token") {
      headers["Authorization"] = `Bearer ${auth.token}`;
    } else {
      headers["X-Auth-Key"] = auth.apiKey;
      headers["X-Auth-Email"] = auth.email;
    }

    let request = HttpClientRequest.make(method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH")(url);
    request = HttpClientRequest.setHeaders(headers)(request);

    if (body !== undefined && method !== "GET" && method !== "HEAD") {
      request = HttpClientRequest.setBody(
        HttpBody.text(JSON.stringify(body), "application/json"),
      )(request);
    }

    const response = yield* client.execute(request).pipe(
      Effect.mapError((error) => ({
        success: false,
        errorMessage: String(error),
      } as CallResult)),
    );

    const json = yield* response.json.pipe(
      Effect.catchAll(() => Effect.succeed({ success: false, errors: [], messages: [] })),
    );

    const cfResponse = json as {
      success: boolean;
      errors: Array<{ code: number; message: string }> | null;
      messages: Array<{ code: number; message: string }> | null;
      result: unknown;
    };

    const errors = cfResponse.errors ?? [];
    if (!cfResponse.success && errors.length > 0) {
      const error = errors[0]!;

      // Handle missing code
      const errorCode = typeof error.code === "number" ? error.code : 0;
      const errorMessage = error.message ?? "Unknown error";

      tracker.allErrors.push({ code: errorCode, message: errorMessage });

      // Add to catalog if new
      const { catalog: updatedCatalog, isNew, suggestedName } = addDiscoveredError(
        tracker.catalog,
        errorCode,
        errorMessage,
      );

      if (isNew) {
        tracker.catalog = updatedCatalog;
        tracker.newErrors.push({
          code: errorCode,
          message: errorMessage,
          name: suggestedName,
        });

        // Save catalog after each new error
        yield* saveCatalog(updatedCatalog);
      }

      return {
        success: false,
        errorCode,
        errorMessage,
        isNew,
        suggestedName,
      } as CallResult;
    }

    return { success: true } as CallResult;
  }).pipe(Effect.provide(FetchHttpClient.layer));

/**
 * Print summary of discovered errors.
 */
export const printSummary = (tracker: ErrorTracker) =>
  Effect.gen(function* () {
    yield* Effect.log("");

    if (tracker.newErrors.length > 0) {
      yield* Effect.log(
        `🆕 NEW errors recorded to spec/error-catalog.json (${tracker.newErrors.length}):`,
      );

      // Group by category
      const byCode = new Map<number, { message: string; name: string }>();
      for (const err of tracker.newErrors) {
        byCode.set(err.code, { message: err.message, name: err.name });
      }

      const sorted = [...byCode.entries()].sort((a, b) => a[0] - b[0]);
      for (const [code, { name }] of sorted) {
        yield* Effect.log(`   ${code}: ${name}`);
      }
    } else {
      yield* Effect.log("   No new errors discovered (all errors already known)");
    }

    // Show all unique errors encountered
    const uniqueErrors = new Map<number, number>();
    for (const err of tracker.allErrors) {
      uniqueErrors.set(err.code, (uniqueErrors.get(err.code) ?? 0) + 1);
    }

    if (uniqueErrors.size > 0) {
      yield* Effect.log("");
      yield* Effect.log(`📋 All errors encountered (${uniqueErrors.size} unique codes):`);

      const sorted = [...uniqueErrors.entries()].sort((a, b) => b[1] - a[1]);
      for (const [code, count] of sorted.slice(0, 20)) {
        const entry = tracker.catalog.codes[String(code)];
        const name = entry?.name ?? `Unknown_${code}`;
        yield* Effect.log(`   ${code} (${name}): ${count}x`);
      }

      if (sorted.length > 20) {
        yield* Effect.log(`   ... and ${sorted.length - 20} more`);
      }
    }
  });
