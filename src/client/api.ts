/**
 * API client factory for Cloudflare operations.
 *
 * Creates Effect-returning functions from operation definitions.
 * Handles request building, authentication, and response parsing.
 */

import { HttpClient, HttpClientRequest, HttpBody } from "@effect/platform";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";

import { ApiToken } from "../auth.ts";
import {
  CloudflareError,
  CloudflareNetworkError,
  UnknownCloudflareError,
  CloudflareHttpError,
} from "../errors.ts";
import * as T from "../traits.ts";
import { buildRequest } from "./request-builder.ts";
import {
  parseResponse,
  emptyErrorCatalog,
  type ErrorCatalog,
} from "./response-parser.ts";

const CLOUDFLARE_API_BASE = "https://api.cloudflare.com/client/v4";

/**
 * Operation definition.
 */
export interface Operation<
  I extends Schema.Schema.AnyNoContext = Schema.Schema.AnyNoContext,
  O extends Schema.Schema.AnyNoContext = Schema.Schema.AnyNoContext,
> {
  input: I;
  output: O;
  errors: Schema.Schema.AnyNoContext[];
  pagination?: T.PaginationTrait;
}

/**
 * Create an Effect-returning API function from an operation definition.
 */
export const make = <
  I extends Schema.Schema.AnyNoContext,
  O extends Schema.Schema.AnyNoContext,
>(
  initOperation: () => {
    input: I;
    output: O;
    errors: Schema.Schema.AnyNoContext[];
    pagination?: T.PaginationTrait;
  },
  catalog: ErrorCatalog = emptyErrorCatalog(),
) => {
  type Input = Schema.Schema.Type<I>;
  type Output = Schema.Schema.Type<O>;

  const op = initOperation();

  // Build error schema map for response parsing
  const errorSchemas = new Map<string, Schema.Schema.AnyNoContext>();
  for (const errorSchema of op.errors) {
    const identifier = errorSchema.ast.annotations?.identifier;
    if (typeof identifier === "string") {
      errorSchemas.set(identifier, errorSchema);
    }
  }

  const fn = (
    payload: Input,
  ): Effect.Effect<
    Output,
    CloudflareError | UnknownCloudflareError | CloudflareNetworkError | CloudflareHttpError,
    ApiToken | HttpClient.HttpClient
  > =>
    Effect.gen(function* () {
      // Build the request
      const request = buildRequest(op.input, payload);

      // Get auth token
      const auth = yield* ApiToken;

      // Build full URL
      const queryString = Object.entries(request.query)
        .filter(([_, v]) => v !== undefined)
        .flatMap(([k, v]) => {
          if (Array.isArray(v)) {
            return v.map(
              (item) =>
                `${encodeURIComponent(k)}=${encodeURIComponent(item)}`,
            );
          }
          return `${encodeURIComponent(k)}=${encodeURIComponent(v!)}`;
        })
        .join("&");

      const fullUrl = queryString
        ? `${CLOUDFLARE_API_BASE}${request.path}?${queryString}`
        : `${CLOUDFLARE_API_BASE}${request.path}`;

      // Build headers with auth
      const headers: Record<string, string> = {
        ...request.headers,
        "Content-Type": "application/json",
      };

      // Add authentication headers
      if (auth.auth.type === "token") {
        headers["Authorization"] = `Bearer ${Redacted.value(auth.auth.token)}`;
      } else if (auth.auth.type === "oauth") {
        headers["Authorization"] = `Bearer ${Redacted.value(auth.auth.accessToken)}`;
      } else {
        headers["X-Auth-Key"] = Redacted.value(auth.auth.apiKey);
        headers["X-Auth-Email"] = auth.auth.email;
      }

      // Build HTTP request
      let httpRequest = HttpClientRequest.make(
        request.method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
      )(fullUrl);
      httpRequest = HttpClientRequest.setHeaders(headers)(httpRequest);

      if (request.body !== undefined) {
        httpRequest = HttpClientRequest.setBody(
          HttpBody.text(JSON.stringify(request.body), "application/json"),
        )(httpRequest);
      }

      // Execute request
      const client = yield* HttpClient.HttpClient;
      const rawResponse = yield* client.execute(httpRequest).pipe(
        Effect.mapError(
          (error) =>
            new CloudflareNetworkError({
              message: String(error),
              cause: error,
            }),
        ),
      );

      // Convert response headers to Record
      const responseHeaders = rawResponse.headers as Record<string, string>;

      // Create response body stream
      // Convert Effect Stream to ReadableStream for the response parser
      const contentLength = responseHeaders["content-length"];
      const isEmptyBody =
        request.method === "HEAD" ||
        contentLength === "0" ||
        rawResponse.status === 204;

      const responseBody = isEmptyBody
        ? new ReadableStream<Uint8Array>({ start: (c) => c.close() })
        : yield* Stream.toReadableStreamEffect(rawResponse.stream);

      // Parse response
      const result = yield* parseResponse(
        {
          status: rawResponse.status,
          statusText: "OK",
          headers: responseHeaders,
          body: responseBody,
        },
        op.output,
        errorSchemas,
        catalog,
      );

      return result as Output;
    });

  return Object.assign(fn, {
    input: op.input,
    output: op.output,
    errors: op.errors,
    pagination: op.pagination,
  });
};

/**
 * Create a paginated API function.
 */
export const makePaginated = <
  I extends Schema.Schema.AnyNoContext,
  O extends Schema.Schema.AnyNoContext,
>(
  initOperation: () => {
    input: I;
    output: O;
    errors: Schema.Schema.AnyNoContext[];
    pagination: T.PaginationTrait;
  },
  catalog: ErrorCatalog = emptyErrorCatalog(),
) => {
  type Input = Schema.Schema.Type<I>;
  type Output = Schema.Schema.Type<O>;

  const op = initOperation();
  const baseFn = make(initOperation, catalog);
  const pagination = op.pagination;

  // Pages iterator
  const pages = (payload: Input) =>
    Effect.gen(function* () {
      const results: Output[] = [];
      let token: unknown = undefined;
      let done = false;

      while (!done) {
        const requestPayload =
          token !== undefined
            ? { ...(payload as object), [pagination.inputToken]: token }
            : payload;

        const response = yield* baseFn(requestPayload as Input);
        results.push(response);

        const nextToken = getPath(response, pagination.outputToken);
        if (nextToken === undefined || nextToken === null) {
          done = true;
        } else {
          token = nextToken;
        }
      }

      return results;
    });

  // Items iterator
  const items = (payload: Input) =>
    Effect.gen(function* () {
      if (!pagination.items) {
        return [];
      }

      const allPages = yield* pages(payload);
      const allItems: unknown[] = [];

      for (const page of allPages) {
        const pageItems = getPath(page, pagination.items) as unknown[] | undefined;
        if (pageItems) {
          allItems.push(...pageItems);
        }
      }

      return allItems;
    });

  return Object.assign(baseFn, {
    pages,
    items,
    input: op.input,
    output: op.output,
    errors: op.errors,
    pagination: op.pagination,
  });
};

/**
 * Get a nested value by dot-separated path.
 */
function getPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current == null || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}
