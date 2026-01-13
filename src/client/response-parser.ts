/**
 * Response parser for Cloudflare API.
 *
 * Parses HTTP responses and matches errors from the Cloudflare error format:
 * { success: boolean, errors: [{ code, message }], messages: [], result: T }
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { CloudflareError, CloudflareHttpError, UnknownCloudflareError } from "../errors.ts";

/**
 * Cloudflare API response envelope.
 */
export interface CloudflareResponse<T> {
  success: boolean;
  errors: Array<{ code: number; message: string }> | null;
  messages: Array<{ code: number; message: string }> | null;
  result: T | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    total_pages?: number;
    cursor?: string;
  };
}

/**
 * Error catalog entry for mapping codes to error types.
 */
export interface ErrorCatalogEntry {
  name: string;
  category: string;
}

/**
 * Error catalog for known error codes.
 */
export type ErrorCatalog = Map<number, ErrorCatalogEntry>;

/**
 * Parse a Cloudflare API response.
 *
 * @param response - The HTTP response
 * @param outputSchema - Schema to decode the result
 * @param errorSchemas - Map of error names to their schema classes
 * @param catalog - Error catalog for code -> name mapping
 */
export const parseResponse = <O>(
  response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: ReadableStream<Uint8Array>;
  },
  outputSchema: Schema.Schema<O, unknown>,
  errorSchemas: Map<string, Schema.Schema.AnyNoContext>,
  catalog: ErrorCatalog,
): Effect.Effect<O, CloudflareError | UnknownCloudflareError | CloudflareHttpError> =>
  Effect.gen(function* () {
    // Read body as text
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let done = false;

    while (!done) {
      const result = yield* Effect.promise(() => reader.read());
      if (result.done) {
        done = true;
      } else {
        chunks.push(result.value);
      }
    }

    const bodyText = new TextDecoder().decode(
      chunks.reduce((acc, chunk) => {
        const result = new Uint8Array(acc.length + chunk.length);
        result.set(acc);
        result.set(chunk, acc.length);
        return result;
      }, new Uint8Array()),
    );

    // Parse JSON
    let json: CloudflareResponse<unknown>;
    try {
      json = JSON.parse(bodyText);
    } catch {
      return yield* Effect.fail(
        new CloudflareHttpError({
          status: response.status,
          statusText: response.statusText,
          body: bodyText,
        }),
      );
    }

    // Check for success: false
    if (!json.success) {
      const errors = json.errors ?? [];
      const error = errors[0];
      if (!error) {
        return yield* Effect.fail(new CloudflareError({ code: 0, message: "Unknown error" }));
      }

      // Handle case where error code is missing
      const errorCode = typeof error.code === "number" ? error.code : 0;
      const errorMessage = error.message ?? "Unknown error";

      // Check catalog for known error
      const catalogEntry = catalog.get(errorCode);
      if (catalogEntry) {
        const ErrorClass = errorSchemas.get(catalogEntry.name);
        if (ErrorClass) {
          // Instantiate the specific error class directly
          // Error classes are TaggedError subclasses with (props) constructor
          try {
            const errorInstance = new (ErrorClass as unknown as new (props: {
              code: number;
              message: string;
            }) => CloudflareError)({
              code: errorCode,
              message: errorMessage,
            });
            return yield* Effect.fail(errorInstance);
          } catch {
            // If instantiation fails, fall back to base error
            return yield* Effect.fail(
              new CloudflareError({ code: errorCode, message: errorMessage }),
            );
          }
        }

        // Known error but no schema, use base CloudflareError
        return yield* Effect.fail(new CloudflareError({ code: errorCode, message: errorMessage }));
      }

      // Unknown error - record for discovery
      return yield* Effect.fail(
        new UnknownCloudflareError({
          code: errorCode,
          message: errorMessage,
          errorCode: String(errorCode),
        }),
      );
    }

    // Build the response object that matches the output schema structure
    // The output schema expects { result: T, result_info?: ... }
    const responseObject: Record<string, unknown> = {
      result: json.result,
    };

    // Only add result_info if it exists
    if (json.result_info) {
      responseObject.result_info = json.result_info;
    }

    // Decode the result using the output schema
    // Use onExcessProperty: "ignore" to allow unknown fields from the API
    const result = yield* Schema.decodeUnknown(outputSchema, {
      onExcessProperty: "ignore",
    })(responseObject).pipe(
      Effect.mapError(
        () =>
          new CloudflareHttpError({
            status: response.status,
            statusText: "Schema decode failed",
            body: bodyText,
          }),
      ),
    );

    return result;
  });

/**
 * Create an empty error catalog.
 */
export const emptyErrorCatalog = (): ErrorCatalog => new Map();

/**
 * Load error catalog from a JSON object.
 */
export const loadErrorCatalog = (
  data: Record<string, { name: string; category: string }>,
): ErrorCatalog => {
  const catalog = new Map<number, ErrorCatalogEntry>();
  for (const [code, entry] of Object.entries(data)) {
    catalog.set(Number(code), entry);
  }
  return catalog;
};
