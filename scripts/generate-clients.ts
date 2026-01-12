#!/usr/bin/env bun
/**
 * Generate Effect SDK clients from Cloudflare OpenAPI spec.
 *
 * Usage:
 *   bun generate                     # Generate all services
 *   bun generate --service dns       # Generate single service
 *   bun generate --fetch             # Fetch latest OpenAPI spec first
 *
 * The generator:
 * 1. Loads Cloudflare's OpenAPI spec (from cache or fetches)
 * 2. Groups operations by service (based on path prefixes and tags)
 * 3. Generates Effect Schema classes for request/response types
 * 4. Loads error patches from spec/{service}.json
 * 5. Outputs to src/services/{service}.ts
 */

import { Command, Options } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Logger, LogLevel } from "effect";
import * as OpenAPI from "./openapi-schema.ts";

const OPENAPI_URL = "https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.json";
const OPENAPI_CACHE = ".cache/openapi.json";

// CLI Options
const serviceOption = Options.text("service").pipe(
  Options.withDescription("Generate only this service (e.g., dns, workers)"),
  Options.optional,
);

const fetchOption = Options.boolean("fetch").pipe(
  Options.withDescription("Fetch the latest OpenAPI spec before generating"),
  Options.withDefault(false),
);

// Service grouping based on path prefixes
const SERVICE_PATTERNS: Record<string, RegExp> = {
  accounts: /^\/accounts(?:\/\{account_id\})?$/,
  zones: /^\/zones(?:\/\{zone_id\})?$/,
  dns: /^\/zones\/\{zone_id\}\/dns_records/,
  workers: /^\/accounts\/\{account_id\}\/workers/,
  kv: /^\/accounts\/\{account_id\}\/storage\/kv/,
  r2: /^\/accounts\/\{account_id\}\/r2/,
  queues: /^\/accounts\/\{account_id\}\/queues/,
  d1: /^\/accounts\/\{account_id\}\/d1/,
  pages: /^\/accounts\/\{account_id\}\/pages/,
  images: /^\/accounts\/\{account_id\}\/images/,
  stream: /^\/accounts\/\{account_id\}\/stream/,
  access: /^\/accounts\/\{account_id\}\/access/,
  firewall: /^\/zones\/\{zone_id\}\/firewall/,
  cache: /^\/zones\/\{zone_id\}\/cache/,
  ssl: /^\/zones\/\{zone_id\}\/ssl/,
};

// Reserved words that cannot be used as function names
const RESERVED_WORDS = new Set([
  "delete", "export", "import", "default", "class", "function", "const", "let", "var",
  "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "return",
  "try", "catch", "finally", "throw", "new", "this", "super", "extends", "implements",
  "interface", "type", "enum", "namespace", "module", "declare", "abstract", "async",
  "await", "yield", "static", "public", "private", "protected", "readonly", "get", "set",
]);

/**
 * Determine which service a path belongs to.
 */
function getServiceForPath(path: string): string {
  for (const [service, pattern] of Object.entries(SERVICE_PATTERNS)) {
    if (pattern.test(path)) {
      return service;
    }
  }

  // Fall back to first path segment after any {id} params
  const parts = path.split("/").filter(Boolean);
  for (const part of parts) {
    if (!part.startsWith("{")) {
      return part.replace(/_/g, "-");
    }
  }

  return "api";
}

/**
 * Resolve a schema reference to its actual schema.
 */
function resolveSchema(
  schema: OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
): OpenAPI.OpenApiSchemaObject {
  if (OpenAPI.isJsonReference(schema)) {
    const refName = OpenAPI.getSchemaName(schema);
    const resolved = allSchemas[refName];
    if (resolved && !OpenAPI.isJsonReference(resolved)) {
      return resolved;
    }
    // If still a reference or not found, return empty object schema
    return { type: "string" }; // Default to string for unresolved refs
  }
  return schema as OpenAPI.OpenApiSchemaObject;
}

/**
 * Convert a schema to a TypeScript type string.
 */
function schemaToTsType(
  schema: OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
): string {
  // Resolve references first
  const s = resolveSchema(schema, allSchemas);

  // Handle enum
  if (s.enum) {
    return s.enum.map((v) => (typeof v === "string" ? `"${v}"` : String(v))).join(" | ");
  }

  // Handle type
  const type = Array.isArray(s.type) ? s.type[0] : s.type;

  switch (type) {
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    case "array":
      if (s.items) {
        return `${schemaToTsType(s.items, allSchemas)}[]`;
      }
      return "unknown[]";
    case "object":
      if (s.properties) {
        const props = Object.entries(s.properties)
          .map(([propName, propSchema]) => {
            const propType = schemaToTsType(propSchema, allSchemas);
            const isRequired = s.required?.includes(propName);
            const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(propName)
              ? propName
              : `"${propName}"`;
            return isRequired ? `${safeName}: ${propType}` : `${safeName}?: ${propType}`;
          })
          .join("; ");
        return `{ ${props} }`;
      }
      return "Record<string, unknown>";
    default:
      return "unknown";
  }
}

/**
 * Generate TypeScript code for a schema.
 */
function generateSchemaCode(
  name: string,
  schema: OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
): string {
  // Resolve references - inline the actual schema
  const s = resolveSchema(schema, allSchemas);

  // Handle enum
  if (s.enum) {
    const literals = s.enum
      .map((v) => (typeof v === "string" ? `"${v}"` : String(v)))
      .join(", ");
    return `Schema.Literal(${literals})`;
  }

  // Handle type
  const type = Array.isArray(s.type) ? s.type[0] : s.type;

  switch (type) {
    case "string":
      if (s.format === "date-time") return "Schema.Date";
      if (s.format === "date") return "Schema.Date";
      if (s.format === "uuid") return "Schema.UUID";
      return "Schema.String";

    case "number":
    case "integer":
      return "Schema.Number";

    case "boolean":
      return "Schema.Boolean";

    case "array":
      if (s.items) {
        const itemType = generateSchemaCode("item", s.items, allSchemas);
        return `Schema.Array(${itemType})`;
      }
      return "Schema.Array(Schema.Unknown)";

    case "object":
      if (s.properties) {
        const props = Object.entries(s.properties)
          .map(([propName, propSchema]) => {
            const propType = generateSchemaCode(propName, propSchema, allSchemas);
            const isRequired = s.required?.includes(propName);
            const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(propName)
              ? propName
              : `"${propName}"`;

            if (isRequired) {
              return `  ${safeName}: ${propType}`;
            }
            return `  ${safeName}: Schema.optional(${propType})`;
          })
          .join(",\n");
        return `Schema.Struct({\n${props}\n})`;
      }
      if (s.additionalProperties) {
        if (typeof s.additionalProperties === "boolean") {
          return "Schema.Record({ key: Schema.String, value: Schema.Unknown })";
        }
        const valueType = generateSchemaCode("value", s.additionalProperties, allSchemas);
        return `Schema.Record({ key: Schema.String, value: ${valueType} })`;
      }
      return "Schema.Struct({})";

    case "null":
      return "Schema.Null";

    default:
      // Handle allOf
      if (s.allOf && s.allOf.length > 0) {
        for (const member of s.allOf) {
          if (!OpenAPI.isJsonReference(member)) {
            return generateSchemaCode(name, member, allSchemas);
          }
        }
        return generateSchemaCode(name, s.allOf[0]!, allSchemas);
      }

      // Handle oneOf/anyOf as Union
      if (s.oneOf && s.oneOf.length > 0) {
        const members = s.oneOf
          .map((m) => generateSchemaCode("member", m, allSchemas))
          .join(", ");
        return `Schema.Union(${members})`;
      }

      if (s.anyOf && s.anyOf.length > 0) {
        const members = s.anyOf
          .map((m) => generateSchemaCode("member", m, allSchemas))
          .join(", ");
        return `Schema.Union(${members})`;
      }

      return "Schema.Unknown";
  }
}

interface ServiceSpec {
  operations: Record<string, { errors?: string[]; aliases?: Array<{ from: number; to: string }> }>;
}

/**
 * Load spec file for a service.
 */
async function loadServiceSpec(serviceName: string): Promise<ServiceSpec> {
  try {
    const content = await Bun.file(`spec/${serviceName}.json`).text();
    return JSON.parse(content) as ServiceSpec;
  } catch {
    return { operations: {} };
  }
}

/**
 * Generate a service file following the distilled-aws pattern.
 */
function generateServiceFile(
  serviceName: string,
  operations: Array<{
    operationId: string;
    method: string;
    path: string;
    operation: OpenAPI.OperationObject;
  }>,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
  serviceSpec: ServiceSpec,
): string {
  // Collect all errors used by this service
  const allErrorNames = new Set<string>();
  for (const op of operations) {
    const funcName = OpenAPI.operationIdToFunctionName(op.operationId);
    const safeFuncName = RESERVED_WORDS.has(funcName) ? `${funcName}_` : funcName;
    const errors = serviceSpec.operations[safeFuncName]?.errors ?? [];
    for (const error of errors) {
      allErrorNames.add(error);
    }
  }

  const lines: string[] = [
    "/**",
    ` * Cloudflare ${serviceName.toUpperCase()} API`,
    " *",
    " * Generated from Cloudflare OpenAPI specification.",
    " * DO NOT EDIT - regenerate with: bun generate --service " + serviceName,
    " */",
    "",
    'import * as Effect from "effect/Effect";',
    'import * as Schema from "effect/Schema";',
    'import type { HttpClient } from "@effect/platform";',
    'import * as API from "../client/api.ts";',
    'import * as T from "../traits.ts";',
    'import type { ApiToken } from "../auth.ts";',
    'import {',
    '  CloudflareError,',
    '  UnknownCloudflareError,',
    '  CloudflareNetworkError,',
    '  CloudflareHttpError,',
    '} from "../errors.ts";',
  ];

  // Import specific errors used by this service
  if (allErrorNames.size > 0) {
    const sortedErrors = [...allErrorNames].sort();
    lines.push(`import {`);
    for (const error of sortedErrors) {
      lines.push(`  ${error},`);
    }
    lines.push(`} from "../errors/generated.ts";`);
  }

  lines.push("");

  // Track generated schemas and function names to avoid duplicates
  const generatedSchemas = new Set<string>();
  const generatedFunctions = new Set<string>();

  for (const { operationId, method, path, operation } of operations) {
    let funcName = OpenAPI.operationIdToFunctionName(operationId);
    let safeFuncName = RESERVED_WORDS.has(funcName) ? `${funcName}_` : funcName;

    // Make function name unique if it already exists
    let uniqueSuffix = 1;
    let uniqueFuncName = safeFuncName;
    while (generatedFunctions.has(uniqueFuncName)) {
      uniqueFuncName = `${safeFuncName}${uniqueSuffix}`;
      uniqueSuffix++;
    }
    safeFuncName = uniqueFuncName;
    generatedFunctions.add(safeFuncName);

    const pascalName = safeFuncName.charAt(0).toUpperCase() + safeFuncName.slice(1);
    const requestClassName = `${pascalName}Request`;
    const responseClassName = `${pascalName}Response`;

    // Collect parameters
    const params = operation.parameters ?? [];
    const interfaceFields: string[] = [];
    const schemaFields: string[] = [];

    for (const param of params) {
      if (OpenAPI.isJsonReference(param)) continue;

      const p = param as OpenAPI.ParameterObject;
      const tsType = p.schema ? schemaToTsType(p.schema, allSchemas) : "string";
      const schemaType = p.schema
        ? generateSchemaCode(p.name, p.schema, allSchemas)
        : "Schema.String";

      const traitAnnotation =
        p.in === "path"
          ? `.pipe(T.HttpPath("${p.name}"))`
          : p.in === "query"
            ? `.pipe(T.HttpQuery("${p.name}"))`
            : p.in === "header"
              ? `.pipe(T.HttpHeader("${p.name}"))`
              : "";

      const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name)
        ? p.name
        : `"${p.name}"`;

      if (p.required) {
        interfaceFields.push(`${safeName}: ${tsType}`);
        schemaFields.push(`  ${safeName}: ${schemaType}${traitAnnotation}`);
      } else {
        interfaceFields.push(`${safeName}?: ${tsType}`);
        schemaFields.push(`  ${safeName}: Schema.optional(${schemaType})${traitAnnotation}`);
      }
    }

    // Add request body if present
    if (operation.requestBody && !OpenAPI.isJsonReference(operation.requestBody)) {
      const rb = operation.requestBody as OpenAPI.RequestBodyObject;
      const jsonContent = rb.content["application/json"];
      if (jsonContent?.schema) {
        const tsType = schemaToTsType(jsonContent.schema, allSchemas);
        const schemaType = generateSchemaCode("body", jsonContent.schema, allSchemas);
        interfaceFields.push(`body: ${tsType}`);
        schemaFields.push(`  body: ${schemaType}.pipe(T.HttpBody())`);
      }
    }

    // Generate request interface and schema
    if (!generatedSchemas.has(requestClassName)) {
      generatedSchemas.add(requestClassName);

      // Interface
      lines.push(`export interface ${requestClassName} {`);
      for (const field of interfaceFields) {
        lines.push(`  ${field};`);
      }
      lines.push(`}`);
      lines.push("");

      // Schema
      lines.push(`export const ${requestClassName} = Schema.Struct({`);
      lines.push(schemaFields.join(",\n"));
      lines.push(`}).pipe(`);
      lines.push(`  T.Http({ method: "${method}", path: "${path}" }),`);
      lines.push(`).annotations({ identifier: "${requestClassName}" }) as unknown as Schema.Schema<${requestClassName}>;`);
      lines.push("");
    }

    // Generate response
    if (!generatedSchemas.has(responseClassName)) {
      generatedSchemas.add(responseClassName);

      const response200 = operation.responses["200"];
      let resultSchema = "Schema.Unknown";
      let resultTsType = "unknown";

      if (response200 && !OpenAPI.isJsonReference(response200)) {
        const r = response200 as OpenAPI.ResponseObject;
        const jsonContent = r.content?.["application/json"];
        if (jsonContent?.schema) {
          resultSchema = generateSchemaCode("result", jsonContent.schema, allSchemas);
          resultTsType = schemaToTsType(jsonContent.schema, allSchemas);
        }
      }

      // Response interface
      lines.push(`export interface ${responseClassName} {`);
      lines.push(`  result: ${resultTsType};`);
      lines.push(`  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };`);
      lines.push(`}`);
      lines.push("");

      // Response schema
      lines.push(`export const ${responseClassName} = Schema.Struct({`);
      lines.push(`  result: ${resultSchema},`);
      lines.push(`  result_info: Schema.optional(Schema.Struct({`);
      lines.push(`    page: Schema.optional(Schema.Number),`);
      lines.push(`    per_page: Schema.optional(Schema.Number),`);
      lines.push(`    count: Schema.optional(Schema.Number),`);
      lines.push(`    total_count: Schema.optional(Schema.Number),`);
      lines.push(`    cursor: Schema.optional(Schema.String),`);
      lines.push(`  })),`);
      lines.push(`}).annotations({ identifier: "${responseClassName}" }) as unknown as Schema.Schema<${responseClassName}>;`);
      lines.push("");
    }

    // Get errors for this operation
    const operationErrors = serviceSpec.operations[safeFuncName]?.errors ?? [];

    // Build error union type
    const errorTypes = [
      ...operationErrors,
      "CloudflareError",
      "UnknownCloudflareError",
      "CloudflareNetworkError",
      "CloudflareHttpError",
    ];
    const errorUnion = errorTypes.join(" | ");

    // Generate typed API function
    lines.push(`export const ${safeFuncName}: (`);
    lines.push(`  input: ${requestClassName}`);
    lines.push(`) => Effect.Effect<`);
    lines.push(`  ${responseClassName},`);
    lines.push(`  ${errorUnion},`);
    lines.push(`  ApiToken | HttpClient.HttpClient`);
    lines.push(`> = API.make(() => ({`);
    lines.push(`  input: ${requestClassName},`);
    lines.push(`  output: ${responseClassName},`);
    if (operationErrors.length > 0) {
      lines.push(`  errors: [${operationErrors.join(", ")}],`);
    } else {
      lines.push(`  errors: [],`);
    }
    lines.push(`}));`);
    lines.push("");
  }

  return lines.join("\n");
}

// Main command
const generateCommand = Command.make(
  "generate",
  {
    service: serviceOption,
    fetch: fetchOption,
  },
  ({ service, fetch: shouldFetch }) =>
    Effect.gen(function* () {
      yield* Console.log("\n🔧 Generating Cloudflare SDK\n");

      // Ensure cache directory exists
      yield* Effect.tryPromise(() =>
        Bun.write(".cache/.gitkeep", ""),
      );

      // Fetch or load OpenAPI spec
      let specContent: string;

      if (shouldFetch || !(yield* Effect.tryPromise(() => Bun.file(OPENAPI_CACHE).exists()))) {
        yield* Console.log("📥 Fetching OpenAPI spec...");
        const response = yield* Effect.tryPromise(() => fetch(OPENAPI_URL));
        specContent = yield* Effect.tryPromise(() => response.text());
        yield* Effect.tryPromise(() => Bun.write(OPENAPI_CACHE, specContent));
        yield* Console.log("   Cached to .cache/openapi.json");
      } else {
        yield* Console.log("📂 Loading cached OpenAPI spec...");
        specContent = yield* Effect.tryPromise(() => Bun.file(OPENAPI_CACHE).text());
      }

      // Parse spec (just use JSON.parse since the spec is large)
      const spec = JSON.parse(specContent) as {
        paths: Record<string, Record<string, unknown>>;
        components?: { schemas?: Record<string, unknown> };
      };

      yield* Console.log(`   Found ${Object.keys(spec.paths).length} paths`);

      const allSchemas = (spec.components?.schemas ?? {}) as Record<
        string,
        OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference
      >;

      // Group operations by service
      const serviceOps = new Map<
        string,
        Array<{
          operationId: string;
          method: string;
          path: string;
          operation: OpenAPI.OperationObject;
        }>
      >();

      for (const [path, pathItem] of Object.entries(spec.paths)) {
        const serviceName = getServiceForPath(path);

        // Filter by service if specified
        if (service._tag === "Some" && serviceName !== service.value) {
          continue;
        }

        const methods = ["get", "post", "put", "delete", "patch"] as const;
        for (const method of methods) {
          const operation = pathItem[method] as OpenAPI.OperationObject | undefined;
          if (!operation) continue;

          const operationId =
            operation.operationId ?? `${method}_${path.replace(/[^a-zA-Z0-9]/g, "_")}`;

          if (!serviceOps.has(serviceName)) {
            serviceOps.set(serviceName, []);
          }

          serviceOps.get(serviceName)!.push({
            operationId,
            method: method.toUpperCase(),
            path,
            operation,
          });
        }
      }

      yield* Console.log(`   Grouped into ${serviceOps.size} services`);

      // Ensure services directory exists
      yield* Effect.tryPromise(() =>
        Bun.write("src/services/.gitkeep", ""),
      );

      // Generate service files
      for (const [serviceName, ops] of serviceOps) {
        yield* Console.log(`\n📝 Generating ${serviceName}.ts (${ops.length} operations)...`);

        // Load service spec for errors
        const serviceSpec = yield* Effect.tryPromise(() => loadServiceSpec(serviceName));

        const content = generateServiceFile(serviceName, ops, allSchemas, serviceSpec);
        yield* Effect.tryPromise(() =>
          Bun.write(`src/services/${serviceName}.ts`, content),
        );
      }

      yield* Console.log("\n✅ Generation complete!\n");
    }),
);

// CLI setup
const cli = Command.run(generateCommand, {
  name: "generate",
  version: "1.0.0",
});

// Run
cli(process.argv).pipe(
  Effect.provide(NodeContext.layer),
  Logger.withMinimumLogLevel(
    process.env.DEBUG ? LogLevel.Debug : LogLevel.Info,
  ),
  NodeRuntime.runMain,
);
