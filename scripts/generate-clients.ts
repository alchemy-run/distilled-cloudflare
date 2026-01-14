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
import * as jsonc from "jsonc-parser";
import * as jsonpatch from "fast-json-patch";
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
  // Additional services with patched endpoints
  containers: /^\/accounts\/\{account_id\}\/containers/,
  hyperdrive: /^\/accounts\/\{account_id\}\/hyperdrive/,
  workflows: /^\/accounts\/\{account_id\}\/workflows/,
};

const OPENAPI_PATCH = "spec/openapi.patch.jsonc";

/**
 * Load and apply OpenAPI patches from spec/openapi.patch.jsonc
 *
 * Uses RFC 6902 JSON Patch format stored as JSONC (JSON with comments).
 * Each patch operation must have a comment explaining what it fixes and why.
 */
async function loadAndApplyPatches(spec: {
  paths: Record<string, Record<string, unknown>>;
  components?: { schemas?: Record<string, unknown> };
}): Promise<typeof spec> {
  try {
    const patchFile = Bun.file(OPENAPI_PATCH);
    const patchExists = await patchFile.exists();
    if (!patchExists) {
      return spec;
    }

    const patchContent = await patchFile.text();
    const patches = jsonc.parse(patchContent) as jsonpatch.Operation[];

    // Apply JSON Patch operations
    jsonpatch.applyPatch(spec, patches, true, true);

    return spec;
  } catch (error) {
    console.warn(`Warning: Failed to load OpenAPI patch: ${error}`);
    return spec;
  }
}

// Reserved words that cannot be used as function names
const RESERVED_WORDS = new Set([
  "delete",
  "export",
  "import",
  "default",
  "class",
  "function",
  "const",
  "let",
  "var",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "return",
  "try",
  "catch",
  "finally",
  "throw",
  "new",
  "this",
  "super",
  "extends",
  "implements",
  "interface",
  "type",
  "enum",
  "namespace",
  "module",
  "declare",
  "abstract",
  "async",
  "await",
  "yield",
  "static",
  "public",
  "private",
  "protected",
  "readonly",
  "get",
  "set",
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
  visited: Set<string> = new Set(),
): string {
  // Check for circular references
  if (OpenAPI.isJsonReference(schema)) {
    const refName = OpenAPI.getSchemaName(schema);
    if (visited.has(refName)) {
      // Cycle detected - return unknown to break the recursion
      return "unknown";
    }
    visited = new Set(visited);
    visited.add(refName);
  }

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
        const itemType = schemaToTsType(s.items, allSchemas, visited);
        // Wrap union types in parentheses for array notation
        if (itemType.includes(" | ")) {
          return `(${itemType})[]`;
        }
        return `${itemType}[]`;
      }
      return "unknown[]";
    case "object":
      if (s.properties) {
        const props = Object.entries(s.properties)
          .map(([propName, propSchema]) => {
            const propType = schemaToTsType(propSchema, allSchemas, visited);
            const isRequired = s.required?.includes(propName);
            const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(propName)
              ? propName
              : `"${propName}"`;
            return isRequired ? `${safeName}: ${propType}` : `${safeName}?: ${propType}`;
          })
          .join("; ");
        return `{ ${props} }`;
      }
      // Check for oneOf/anyOf on object types without properties (discriminated unions)
      if (s.oneOf && s.oneOf.length > 0) {
        const members = s.oneOf.map((m) => schemaToTsType(m, allSchemas, visited));
        return members.join(" | ");
      }
      if (s.anyOf && s.anyOf.length > 0) {
        const members = s.anyOf.map((m) => schemaToTsType(m, allSchemas, visited));
        return members.join(" | ");
      }
      return "Record<string, unknown>";
    default:
      return "unknown";
  }
}

/**
 * Generate TypeScript code for a schema.
 */
/**
 * Recursively merge all allOf schemas into a single flattened schema.
 * This properly handles nested refs and allOf combinations.
 */
function mergeAllOfSchemas(
  schema: OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
): OpenAPI.OpenApiSchemaObject {
  const resolved = resolveSchema(schema, allSchemas);

  // If no allOf, just return the resolved schema
  if (!resolved.allOf || resolved.allOf.length === 0) {
    return resolved;
  }

  // Merge all allOf members recursively
  const mergedProperties: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference> = {};
  const mergedRequired: string[] = [];

  for (const member of resolved.allOf) {
    // Recursively merge each member (handles nested allOf and refs)
    const memberSchema = mergeAllOfSchemas(member, allSchemas);

    // Merge properties
    if (memberSchema.properties) {
      for (const [propName, propSchema] of Object.entries(memberSchema.properties)) {
        mergedProperties[propName] = propSchema;
      }
    }

    // Merge required
    if (memberSchema.required) {
      for (const req of memberSchema.required) {
        if (!mergedRequired.includes(req)) {
          mergedRequired.push(req);
        }
      }
    }
  }

  // Also include direct properties from the schema itself
  if (resolved.properties) {
    for (const [propName, propSchema] of Object.entries(resolved.properties)) {
      mergedProperties[propName] = propSchema;
    }
  }
  if (resolved.required) {
    for (const req of resolved.required) {
      if (!mergedRequired.includes(req)) {
        mergedRequired.push(req);
      }
    }
  }

  return {
    type: "object",
    properties: mergedProperties,
    required: mergedRequired.length > 0 ? mergedRequired : undefined,
  } as OpenAPI.OpenApiSchemaObject;
}

/**
 * Extract the 'result' property schema from a Cloudflare API response.
 *
 * Cloudflare responses follow this pattern:
 * { success: boolean, errors: [], messages: [], result: T | null, result_info?: {} }
 *
 * This function recursively merges allOf schemas and extracts the 'result' property.
 * Returns null if no result property is found (meaning result is always null for this operation).
 */
function extractResultSchema(
  schema: OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
): OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference | null {
  // Merge all allOf schemas to get the full combined schema
  const merged = mergeAllOfSchemas(schema, allSchemas);

  // Check if the merged schema has a 'result' property
  if (merged.properties && "result" in merged.properties) {
    return merged.properties.result as OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference;
  }

  // No result property found - this operation returns result: null
  return null;
}

/**
 * Collect all schema references from a schema (recursively).
 */
function collectSchemaRefs(
  schema: OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
  refs: Set<string> = new Set(),
  visited: Set<string> = new Set(),
): Set<string> {
  if (OpenAPI.isJsonReference(schema)) {
    const refName = OpenAPI.getSchemaName(schema);
    refs.add(refName);
    if (visited.has(refName)) {
      return refs;
    }
    visited = new Set(visited);
    visited.add(refName);
    const resolved = allSchemas[refName];
    if (resolved) {
      collectSchemaRefs(resolved, allSchemas, refs, visited);
    }
    return refs;
  }

  const s = schema as OpenAPI.OpenApiSchemaObject;

  if (s.items) {
    collectSchemaRefs(s.items, allSchemas, refs, visited);
  }
  if (s.properties) {
    for (const propSchema of Object.values(s.properties)) {
      collectSchemaRefs(propSchema, allSchemas, refs, visited);
    }
  }
  if (s.additionalProperties && typeof s.additionalProperties !== "boolean") {
    collectSchemaRefs(s.additionalProperties, allSchemas, refs, visited);
  }
  if (s.allOf) {
    for (const member of s.allOf) {
      collectSchemaRefs(member, allSchemas, refs, visited);
    }
  }
  if (s.oneOf) {
    for (const member of s.oneOf) {
      collectSchemaRefs(member, allSchemas, refs, visited);
    }
  }
  if (s.anyOf) {
    for (const member of s.anyOf) {
      collectSchemaRefs(member, allSchemas, refs, visited);
    }
  }

  return refs;
}

/**
 * Build dependency graph for schemas and detect cycles.
 * Returns a map of schema name -> direct dependencies.
 */
function buildSchemaDependencyGraph(
  schemaNames: Set<string>,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();

  for (const name of schemaNames) {
    const schema = allSchemas[name];
    if (schema) {
      const deps = collectSchemaRefs(schema, allSchemas, new Set(), new Set([name]));
      deps.delete(name); // Remove self-reference from deps (handled separately)
      graph.set(name, deps);
    }
  }

  return graph;
}

/**
 * Detect which schemas are part of cycles.
 */
function findCyclicSchemas(graph: Map<string, Set<string>>): Set<string> {
  const cyclic = new Set<string>();
  const visited = new Set<string>();
  const recStack = new Set<string>();

  function dfs(node: string, path: string[]): boolean {
    if (recStack.has(node)) {
      // Found a cycle - mark all nodes in the cycle
      const cycleStart = path.indexOf(node);
      for (let i = cycleStart; i < path.length; i++) {
        cyclic.add(path[i]!);
      }
      cyclic.add(node);
      return true;
    }
    if (visited.has(node)) {
      return false;
    }

    visited.add(node);
    recStack.add(node);

    const deps = graph.get(node) ?? new Set();
    for (const dep of deps) {
      if (graph.has(dep)) {
        dfs(dep, [...path, node]);
      }
    }

    recStack.delete(node);
    return false;
  }

  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      dfs(node, []);
    }
  }

  return cyclic;
}

/**
 * Topological sort of schemas (for non-cyclic dependencies).
 * Cyclic schemas are placed first so they can reference each other via suspend.
 */
function topologicalSortSchemas(
  schemaNames: Set<string>,
  graph: Map<string, Set<string>>,
  cyclicSchemas: Set<string>,
): string[] {
  const sorted: string[] = [];
  const visited = new Set<string>();

  // First, add all cyclic schemas (order doesn't matter for these)
  for (const name of cyclicSchemas) {
    if (schemaNames.has(name)) {
      sorted.push(name);
      visited.add(name);
    }
  }

  // Then topologically sort the rest
  function visit(name: string) {
    if (visited.has(name)) return;
    visited.add(name);

    const deps = graph.get(name) ?? new Set();
    for (const dep of deps) {
      if (schemaNames.has(dep) && !cyclicSchemas.has(dep)) {
        visit(dep);
      }
    }

    sorted.push(name);
  }

  for (const name of schemaNames) {
    if (!cyclicSchemas.has(name)) {
      visit(name);
    }
  }

  return sorted;
}

/**
 * Convert schema ref name to a valid TypeScript identifier.
 */
function schemaNameToIdentifier(refName: string): string {
  // Remove common prefixes and clean up the name
  return refName
    .replace(/^(schemas|components)_/, "")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/^(\d)/, "_$1"); // Prefix with _ if starts with number
}

function generateSchemaCode(
  name: string,
  schema: OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
  generatedSchemaNames: Set<string> = new Set(),
  cyclicSchemas: Set<string> = new Set(),
  visited: Set<string> = new Set(),
): string {
  // Check for references to named schemas
  if (OpenAPI.isJsonReference(schema)) {
    const refName = OpenAPI.getSchemaName(schema);

    // If this schema has been generated as a named schema, reference it
    if (generatedSchemaNames.has(refName)) {
      const identifier = schemaNameToIdentifier(refName);
      // Use suspend for cyclic schemas to break the cycle
      if (cyclicSchemas.has(refName) && visited.has(refName)) {
        return `Schema.suspend(() => ${identifier})`;
      }
      return identifier;
    }

    // Cycle detection for inline schemas
    if (visited.has(refName)) {
      return "Schema.Unknown";
    }
    visited = new Set(visited);
    visited.add(refName);
  }

  // Resolve references - inline the actual schema
  const s = resolveSchema(schema, allSchemas);

  // Handle enum
  if (s.enum) {
    // Special case: enum: [null] - Cloudflare often returns objects when spec says null
    if (s.enum.length === 1 && s.enum[0] === null) {
      return "Schema.NullOr(Schema.Unknown)";
    }
    const literals = s.enum.map((v) => (typeof v === "string" ? `"${v}"` : String(v))).join(", ");
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
        const itemType = generateSchemaCode(
          "item",
          s.items,
          allSchemas,
          generatedSchemaNames,
          cyclicSchemas,
          visited,
        );
        return `Schema.Array(${itemType})`;
      }
      return "Schema.Array(Schema.Unknown)";

    case "object":
      if (s.properties) {
        const props = Object.entries(s.properties)
          .map(([propName, propSchema]) => {
            const propType = generateSchemaCode(
              propName,
              propSchema,
              allSchemas,
              generatedSchemaNames,
              cyclicSchemas,
              visited,
            );
            const isRequired = s.required?.includes(propName);
            const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(propName)
              ? propName
              : `"${propName}"`;

            // Check if property is nullable (OpenAPI 3.0 style)
            const resolved = resolveSchema(propSchema, allSchemas);
            const isNullable = resolved.nullable === true;
            // Check if property is writeOnly (only present in requests, not responses)
            const isWriteOnly = resolved.writeOnly === true;

            // writeOnly properties should be optional in the schema (for response decoding)
            // but required in the TypeScript interface (for request type safety)
            if (isRequired && !isWriteOnly) {
              // Required but nullable: use NullOr
              if (isNullable) {
                return `  ${safeName}: Schema.NullOr(${propType})`;
              }
              return `  ${safeName}: ${propType}`;
            }
            // Optional or writeOnly: use Schema.optional to allow missing keys, and Schema.NullOr to allow null values
            // This handles Cloudflare's API which often returns null for optional fields or omits them entirely
            return `  ${safeName}: Schema.optional(Schema.NullOr(${propType}))`;
          })
          .join(",\n");
        return `Schema.Struct({\n${props}\n})`;
      }
      if (s.additionalProperties) {
        if (typeof s.additionalProperties === "boolean") {
          return "Schema.Record({ key: Schema.String, value: Schema.Unknown })";
        }
        const valueType = generateSchemaCode(
          "value",
          s.additionalProperties,
          allSchemas,
          generatedSchemaNames,
          cyclicSchemas,
          visited,
        );
        return `Schema.Record({ key: Schema.String, value: ${valueType} })`;
      }
      // Check for oneOf/anyOf on object types without properties (discriminated unions)
      if (s.oneOf && s.oneOf.length > 0) {
        const members = s.oneOf
          .map((m) =>
            generateSchemaCode(
              "member",
              m,
              allSchemas,
              generatedSchemaNames,
              cyclicSchemas,
              visited,
            ),
          )
          .join(", ");
        return `Schema.Union(${members})`;
      }
      if (s.anyOf && s.anyOf.length > 0) {
        const members = s.anyOf
          .map((m) =>
            generateSchemaCode(
              "member",
              m,
              allSchemas,
              generatedSchemaNames,
              cyclicSchemas,
              visited,
            ),
          )
          .join(", ");
        return `Schema.Union(${members})`;
      }
      return "Schema.Struct({})";

    case "null":
      // Cloudflare's spec often says null but API returns objects, so be lenient
      return "Schema.NullOr(Schema.Unknown)";

    default:
      // Handle allOf
      if (s.allOf && s.allOf.length > 0) {
        for (const member of s.allOf) {
          if (!OpenAPI.isJsonReference(member)) {
            return generateSchemaCode(
              name,
              member,
              allSchemas,
              generatedSchemaNames,
              cyclicSchemas,
              visited,
            );
          }
        }
        return generateSchemaCode(
          name,
          s.allOf[0]!,
          allSchemas,
          generatedSchemaNames,
          cyclicSchemas,
          visited,
        );
      }

      // Handle oneOf/anyOf as Union
      if (s.oneOf && s.oneOf.length > 0) {
        const members = s.oneOf
          .map((m) =>
            generateSchemaCode(
              "member",
              m,
              allSchemas,
              generatedSchemaNames,
              cyclicSchemas,
              visited,
            ),
          )
          .join(", ");
        return `Schema.Union(${members})`;
      }

      if (s.anyOf && s.anyOf.length > 0) {
        const members = s.anyOf
          .map((m) =>
            generateSchemaCode(
              "member",
              m,
              allSchemas,
              generatedSchemaNames,
              cyclicSchemas,
              visited,
            ),
          )
          .join(", ");
        return `Schema.Union(${members})`;
      }

      return "Schema.Unknown";
  }
}

/**
 * Error matcher - defines how to match an API error response to an error class.
 * Used per-operation to configure matching criteria.
 */
interface ErrorMatcher {
  /** Single error code to match */
  code?: number;
  /** Multiple error codes that all map to this error */
  codes?: number[];
  /** HTTP status code to match */
  status?: number;
  /** Substring pattern to match in error message */
  message?: string;
}

/**
 * Service-level error definition with optional default matcher and categories.
 * If a matcher is provided, it applies to all operations that include this error
 * unless overridden at the operation level.
 */
interface ErrorDefinition extends ErrorMatcher {
  /** Error categories for retry/handling logic (e.g., ["ThrottlingError", "RetryableError"]) */
  categories?: string[];
}

interface ServiceSpec {
  /** Declares error classes with optional default matchers */
  errors?: Record<string, ErrorDefinition>;
  /** Per-operation configuration - can override service-level matchers */
  operations: Record<
    string,
    {
      /** Rename the exported function to a different name */
      rename?: string;
      /** Object mapping error name to matcher (empty {} uses service default) */
      errors?: Record<string, ErrorMatcher>;
      aliases?: Array<{ from: number; to: string }>;
    }
  >;
}

// Common errors that apply to all services (auth, rate limiting)
// These are just declared here - matching is done per-operation
const COMMON_ERRORS: Record<string, ErrorDefinition> = {
  RateLimited: { categories: ["ThrottlingError", "RetryableError"] },
  TooManyRequests: { categories: ["ThrottlingError", "RetryableError"] },
  AuthenticationError: { categories: ["AuthError"] },
  InvalidToken: { categories: ["AuthError"] },
  MissingToken: { categories: ["AuthError"] },
  TokenExpired: { categories: ["AuthError"] },
  Unauthorized: { categories: ["AuthError"] },
};

// Common error matchers - reusable across operations
const COMMON_ERROR_MATCHERS: Record<string, ErrorMatcher> = {
  RateLimited: { code: 971 },
  TooManyRequests: { code: 6100 },
  AuthenticationError: { code: 10000 },
  InvalidToken: { code: 9103 },
  MissingToken: { code: 9106 },
  TokenExpired: { code: 9109 },
  Unauthorized: { code: 9000 },
};

/**
 * Load spec file for a service.
 */
async function loadServiceSpec(serviceName: string): Promise<ServiceSpec> {
  try {
    const content = await Bun.file(`spec/${serviceName}.json`).text();
    return JSON.parse(content) as ServiceSpec;
  } catch {
    return { errors: {}, operations: {} };
  }
}

/**
 * Update spec file for a service, adding empty operation entries for any operations that don't exist.
 * Does NOT trample existing content - only adds missing operations.
 */
async function updateServiceSpec(
  serviceName: string,
  operationNames: string[],
): Promise<{ added: string[] }> {
  // Load existing spec
  const existingSpec = await loadServiceSpec(serviceName);

  // Track what we add
  const added: string[] = [];

  // Add missing operations
  for (const opName of operationNames) {
    if (!(opName in existingSpec.operations)) {
      existingSpec.operations[opName] = { errors: {} };
      added.push(opName);
    }
  }

  // Sort operations alphabetically for consistent output
  const sortedOperations: Record<string, (typeof existingSpec.operations)[string]> = {};
  const sortedKeys = Object.keys(existingSpec.operations).sort();
  for (const key of sortedKeys) {
    sortedOperations[key] = existingSpec.operations[key];
  }
  existingSpec.operations = sortedOperations;

  // Write back the spec file
  const content = JSON.stringify(existingSpec, null, 2) + "\n";
  await Bun.write(`spec/${serviceName}.json`, content);

  return { added };
}

/**
 * Infer categories from error name and status code patterns.
 * This supplements explicit categories from spec files.
 */
function inferCategories(name: string, def: ErrorDefinition): string[] {
  const categories = [...(def.categories ?? [])];
  const nameLower = name.toLowerCase();

  // Infer from HTTP status codes
  if (def.status === 429) {
    if (!categories.includes("ThrottlingError")) categories.push("ThrottlingError");
    if (!categories.includes("RetryableError")) categories.push("RetryableError");
  } else if (def.status === 401 || def.status === 403) {
    if (!categories.includes("AuthError")) categories.push("AuthError");
  } else if (def.status === 404) {
    if (!categories.includes("NotFoundError")) categories.push("NotFoundError");
  } else if (def.status === 409) {
    if (!categories.includes("ConflictError")) categories.push("ConflictError");
  } else if (def.status !== undefined && def.status >= 500 && def.status < 600) {
    if (!categories.includes("ServerError")) categories.push("ServerError");
    if (!categories.includes("RetryableError")) categories.push("RetryableError");
  }

  // Infer from error name patterns
  if (
    nameLower.includes("ratelimit") ||
    nameLower.includes("throttl") ||
    nameLower === "toomanyrequests"
  ) {
    if (!categories.includes("ThrottlingError")) categories.push("ThrottlingError");
    if (!categories.includes("RetryableError")) categories.push("RetryableError");
  }
  if (
    nameLower.includes("notfound") ||
    nameLower.includes("nosuch") ||
    (nameLower.includes("invalid") && nameLower.includes("zone"))
  ) {
    if (!categories.includes("NotFoundError")) categories.push("NotFoundError");
  }
  if (
    nameLower.includes("auth") ||
    nameLower.includes("unauthorized") ||
    nameLower.includes("token")
  ) {
    if (!categories.includes("AuthError")) categories.push("AuthError");
  }
  if (
    nameLower.includes("conflict") ||
    nameLower.includes("alreadyexists") ||
    nameLower.includes("notempty")
  ) {
    if (!categories.includes("ConflictError")) categories.push("ConflictError");
  }
  if (
    nameLower.includes("validation") ||
    nameLower.includes("invalid") ||
    nameLower.includes("parse")
  ) {
    if (!categories.includes("BadRequestError")) categories.push("BadRequestError");
  }
  if (
    nameLower.includes("quota") ||
    (nameLower.includes("limit") && nameLower.includes("exceeded")) ||
    nameLower.includes("toomany")
  ) {
    if (!categories.includes("QuotaError")) categories.push("QuotaError");
  }
  if (nameLower.includes("internal") || nameLower.includes("server")) {
    if (!categories.includes("ServerError")) categories.push("ServerError");
  }

  return categories;
}

/**
 * Generate an error class.
 * Error classes are simple tagged errors with code and message fields.
 * Matching is configured per-operation using annotations at the API.make call site.
 * Categories are applied via .pipe() for retry logic.
 */
function generateErrorClass(name: string, def: ErrorDefinition): string[] {
  const lines: string[] = [];
  const categories = inferCategories(name, def);

  // Build the .pipe() chain if we have categories
  const categoryPipes = categories.map((cat) => `C.with${cat}`);
  const pipeChain = categoryPipes.length > 0 ? `.pipe(${categoryPipes.join(", ")})` : "";

  lines.push(`export class ${name} extends Schema.TaggedError<${name}>()("${name}", {`);
  lines.push(`  code: Schema.Number,`);
  lines.push(`  message: Schema.String,`);
  lines.push(`})${pipeChain} {`);
  lines.push(`  static readonly _tag = "${name}";`);
  lines.push(`}`);

  return lines;
}

/**
 * Generate annotation chain for an error matcher.
 * Returns a string like ".pipe(T.HttpErrorCodes([7003, 7000]), T.HttpErrorStatus(404))"
 */
function generateErrorAnnotations(matcher: ErrorMatcher): string {
  const annotations: string[] = [];

  if (matcher.codes && matcher.codes.length > 0) {
    annotations.push(`T.HttpErrorCodes([${matcher.codes.join(", ")}])`);
  } else if (matcher.code !== undefined) {
    annotations.push(`T.HttpErrorCode(${matcher.code})`);
  }

  if (matcher.status !== undefined) {
    annotations.push(`T.HttpErrorStatus(${matcher.status})`);
  }

  if (matcher.message !== undefined) {
    annotations.push(`T.HttpErrorMessage(${JSON.stringify(matcher.message)})`);
  }

  if (annotations.length === 0) {
    return "";
  }

  return `.pipe(${annotations.join(", ")})`;
}

/**
 * Collect all schema references used by an operation.
 */
function collectOperationSchemaRefs(
  operation: OpenAPI.OperationObject,
  allSchemas: Record<string, OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference>,
  allRequestBodies: Record<string, OpenAPI.RequestBodyObject | OpenAPI.JsonReference>,
): Set<string> {
  const refs = new Set<string>();

  // Collect from parameters
  for (const param of operation.parameters ?? []) {
    if (!OpenAPI.isJsonReference(param)) {
      const p = param as OpenAPI.ParameterObject;
      if (p.schema) {
        collectSchemaRefs(p.schema, allSchemas, refs);
      }
    }
  }

  // Collect from request body
  if (operation.requestBody) {
    let rb: OpenAPI.RequestBodyObject | undefined;
    if (OpenAPI.isJsonReference(operation.requestBody)) {
      const refName = OpenAPI.getSchemaName(operation.requestBody);
      const resolved = allRequestBodies[refName];
      if (resolved && !OpenAPI.isJsonReference(resolved)) {
        rb = resolved;
      }
    } else {
      rb = operation.requestBody as OpenAPI.RequestBodyObject;
    }

    if (rb) {
      const jsonContent = rb.content["application/json"];
      if (jsonContent?.schema) {
        collectSchemaRefs(jsonContent.schema, allSchemas, refs);
      }
    }
  }

  // Collect from response
  const response200 = operation.responses["200"];
  if (response200 && !OpenAPI.isJsonReference(response200)) {
    const r = response200 as OpenAPI.ResponseObject;
    const jsonContent = r.content?.["application/json"];
    if (jsonContent?.schema) {
      collectSchemaRefs(jsonContent.schema, allSchemas, refs);
    }
  }

  return refs;
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
  allRequestBodies: Record<string, OpenAPI.RequestBodyObject | OpenAPI.JsonReference>,
  serviceSpec: ServiceSpec,
): string {
  // First pass: collect all schema references used by this service
  const allReferencedSchemas = new Set<string>();
  for (const { operation } of operations) {
    const refs = collectOperationSchemaRefs(operation, allSchemas, allRequestBodies);
    for (const ref of refs) {
      allReferencedSchemas.add(ref);
    }
  }

  // Build dependency graph and detect cycles
  const dependencyGraph = buildSchemaDependencyGraph(allReferencedSchemas, allSchemas);
  const cyclicSchemas = findCyclicSchemas(dependencyGraph);

  // Generate named schemas for cyclic types (sorted topologically)
  const sortedCyclicSchemas = topologicalSortSchemas(cyclicSchemas, dependencyGraph, cyclicSchemas);
  const generatedSchemaNames = new Set<string>(cyclicSchemas);

  // Collect all errors used by this service
  // Track function names to properly handle unique suffixes
  const seenFuncNames = new Set<string>();
  const allErrorNames = new Set<string>();
  for (const op of operations) {
    let funcName = OpenAPI.operationIdToFunctionName(op.operationId);
    let safeFuncName = RESERVED_WORDS.has(funcName) ? `${funcName}_` : funcName;

    // Handle duplicates the same way as the main loop
    let uniqueSuffix = 1;
    let uniqueFuncName = safeFuncName;
    while (seenFuncNames.has(uniqueFuncName)) {
      uniqueFuncName = `${safeFuncName}${uniqueSuffix}`;
      uniqueSuffix++;
    }
    safeFuncName = uniqueFuncName;
    seenFuncNames.add(safeFuncName);

    const errors = serviceSpec.operations[safeFuncName]?.errors ?? {};
    for (const errorName of Object.keys(errors)) {
      allErrorNames.add(errorName);
    }
  }

  // Build combined error definitions (common + service-specific)
  const serviceErrors = serviceSpec.errors ?? {};
  const allErrorDefs: Record<string, ErrorDefinition> = { ...COMMON_ERRORS };
  for (const errorName of allErrorNames) {
    if (serviceErrors[errorName]) {
      allErrorDefs[errorName] = serviceErrors[errorName];
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
    'import * as C from "../category.ts";',
    'import * as T from "../traits.ts";',
    'import type { ApiToken } from "../auth.ts";',
    "import {",
    "  CloudflareError,",
    "  UnknownCloudflareError,",
    "  CloudflareNetworkError,",
    "  CloudflareHttpError,",
    '} from "../errors.ts";',
    "",
  ];

  // Generate error classes inline
  lines.push("// =============================================================================");
  lines.push("// Errors");
  lines.push("// =============================================================================");
  lines.push("");

  // Sort error names for consistent output
  const sortedErrorNames = Object.keys(allErrorDefs).sort();
  for (const errorName of sortedErrorNames) {
    const errorDef = allErrorDefs[errorName]!;
    const errorLines = generateErrorClass(errorName, errorDef);
    lines.push(...errorLines);
    lines.push("");
  }

  lines.push("");

  // Generate named schemas for cyclic types
  if (sortedCyclicSchemas.length > 0) {
    lines.push("// ============================================================");
    lines.push("// Named schemas (required for circular references)");
    lines.push("// ============================================================");
    lines.push("");

    for (const schemaName of sortedCyclicSchemas) {
      const schema = allSchemas[schemaName];
      if (!schema) continue;

      const identifier = schemaNameToIdentifier(schemaName);
      // Generate the schema code, marking this schema as "being generated" so recursive refs use suspend
      const schemaCode = generateSchemaCode(
        schemaName,
        schema,
        allSchemas,
        generatedSchemaNames,
        cyclicSchemas,
        new Set([schemaName]), // Mark current schema as visited to trigger suspend on self-refs
      );
      lines.push(`export const ${identifier} = ${schemaCode};`);
      lines.push("");
    }

    lines.push("// ============================================================");
    lines.push("// Operations");
    lines.push("// ============================================================");
    lines.push("");
  }

  // Track generated schemas and function names to avoid duplicates
  const generatedSchemas = new Set<string>();
  const generatedFunctions = new Set<string>();

  for (const { operationId, method, path, operation } of operations) {
    // Compute the original function name (used for spec lookup)
    let originalFuncName = OpenAPI.operationIdToFunctionName(operationId);
    let originalSafeFuncName = RESERVED_WORDS.has(originalFuncName)
      ? `${originalFuncName}_`
      : originalFuncName;

    // Make original function name unique (for spec lookup)
    let uniqueSuffix = 1;
    let uniqueOriginalFuncName = originalSafeFuncName;
    while (generatedFunctions.has(uniqueOriginalFuncName)) {
      uniqueOriginalFuncName = `${originalSafeFuncName}${uniqueSuffix}`;
      uniqueSuffix++;
    }
    originalSafeFuncName = uniqueOriginalFuncName;
    generatedFunctions.add(originalSafeFuncName);

    // Check for rename in spec (using the original function name as key)
    const operationSpec = serviceSpec.operations[originalSafeFuncName];
    const renamedFuncName = operationSpec?.rename;

    // Use renamed name for generation if provided, otherwise use original
    let safeFuncName = renamedFuncName ?? originalSafeFuncName;
    if (renamedFuncName && RESERVED_WORDS.has(renamedFuncName)) {
      safeFuncName = `${renamedFuncName}_`;
    }

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
        ? generateSchemaCode(p.name, p.schema, allSchemas, generatedSchemaNames, cyclicSchemas)
        : "Schema.String";

      const traitAnnotation =
        p.in === "path"
          ? `.pipe(T.HttpPath("${p.name}"))`
          : p.in === "query"
            ? `.pipe(T.HttpQuery("${p.name}"))`
            : p.in === "header"
              ? `.pipe(T.HttpHeader("${p.name}"))`
              : "";

      const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : `"${p.name}"`;

      if (p.required) {
        interfaceFields.push(`${safeName}: ${tsType}`);
        schemaFields.push(`  ${safeName}: ${schemaType}${traitAnnotation}`);
      } else {
        interfaceFields.push(`${safeName}?: ${tsType}`);
        schemaFields.push(`  ${safeName}: Schema.optional(${schemaType})${traitAnnotation}`);
      }
    }

    // Add request body if present
    if (operation.requestBody) {
      // Resolve reference if needed
      let rb: OpenAPI.RequestBodyObject | undefined;
      if (OpenAPI.isJsonReference(operation.requestBody)) {
        const refName = OpenAPI.getSchemaName(operation.requestBody);
        const resolved = allRequestBodies[refName];
        if (resolved && !OpenAPI.isJsonReference(resolved)) {
          rb = resolved;
        }
      } else {
        rb = operation.requestBody as OpenAPI.RequestBodyObject;
      }

      if (rb) {
        const jsonContent = rb.content["application/json"];
        const jsContent = rb.content["application/javascript"] ?? rb.content["text/javascript"];
        const formDataContent = rb.content["multipart/form-data"];

        if (jsonContent?.schema) {
          const tsType = schemaToTsType(jsonContent.schema, allSchemas);
          const schemaType = generateSchemaCode(
            "body",
            jsonContent.schema,
            allSchemas,
            generatedSchemaNames,
            cyclicSchemas,
          );
          interfaceFields.push(`body: ${tsType}`);
          schemaFields.push(`  body: ${schemaType}.pipe(T.HttpBody())`);
        } else if (formDataContent?.schema) {
          // Handle multipart/form-data (e.g., worker script uploads)
          // For FormData, we accept a FormData object directly
          interfaceFields.push(`body: FormData`);
          schemaFields.push(`  body: Schema.instanceOf(FormData).pipe(T.HttpFormData())`);
        } else if (jsContent?.schema) {
          // Handle JavaScript/text content types (e.g., simple service worker uploads)
          const tsType = schemaToTsType(jsContent.schema, allSchemas);
          const schemaType = generateSchemaCode(
            "body",
            jsContent.schema,
            allSchemas,
            generatedSchemaNames,
            cyclicSchemas,
          );
          const contentType = rb.content["application/javascript"]
            ? "application/javascript"
            : "text/javascript";
          interfaceFields.push(`body: ${tsType}`);
          schemaFields.push(`  body: ${schemaType}.pipe(T.HttpTextBody("${contentType}"))`);
        }
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
      lines.push(
        `).annotations({ identifier: "${requestClassName}" }) as unknown as Schema.Schema<${requestClassName}>;`,
      );
      lines.push("");
    }

    // Generate response
    if (!generatedSchemas.has(responseClassName)) {
      generatedSchemas.add(responseClassName);

      const response200 = operation.responses["200"];
      let resultSchema = "Schema.NullOr(Schema.Unknown)";
      let resultTsType = "unknown | null";
      let isMultipartResponse = false;

      if (response200 && !OpenAPI.isJsonReference(response200)) {
        const r = response200 as OpenAPI.ResponseObject;
        const jsonContent = r.content?.["application/json"];
        const multipartContent = r.content?.["multipart/form-data"];

        if (multipartContent) {
          // This operation returns multipart/form-data (e.g., worker script content)
          isMultipartResponse = true;
        } else if (jsonContent?.schema) {
          // Extract the 'result' property from the Cloudflare response envelope
          // This recursively merges allOf schemas and finds the result property
          const extractedResult = extractResultSchema(jsonContent.schema, allSchemas);

          if (extractedResult) {
            // Found a 'result' property - use its schema
            resultSchema = generateSchemaCode(
              "result",
              extractedResult,
              allSchemas,
              generatedSchemaNames,
              cyclicSchemas,
            );
            resultTsType = schemaToTsType(extractedResult, allSchemas);
          }
          // If no result property found, the operation returns result: null
          // (common for DELETE operations) - we already default to Schema.NullOr(Schema.Unknown)
        }
      }

      if (isMultipartResponse) {
        // Generate multipart response type - returns FormData
        lines.push(`export type ${responseClassName} = FormData;`);
        lines.push("");

        // Response schema with multipart annotation
        lines.push(`export const ${responseClassName} = Schema.instanceOf(FormData).pipe(`);
        lines.push(`  T.HttpMultipartResponse(),`);
        lines.push(
          `).annotations({ identifier: "${responseClassName}" }) as unknown as Schema.Schema<${responseClassName}>;`,
        );
        lines.push("");
      } else {
        // Response interface
        lines.push(`export interface ${responseClassName} {`);
        lines.push(`  result: ${resultTsType};`);
        lines.push(
          `  result_info?: { page?: number; per_page?: number; count?: number; total_count?: number; cursor?: string };`,
        );
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
        lines.push(
          `}).annotations({ identifier: "${responseClassName}" }) as unknown as Schema.Schema<${responseClassName}>;`,
        );
        lines.push("");
      }
    }

    // Get error matchers for this operation (use original name for spec lookup)
    const operationErrorMatchers = serviceSpec.operations[originalSafeFuncName]?.errors ?? {};
    const serviceErrorDefaults = serviceSpec.errors ?? {};

    // Build combined error matchers:
    // 1. Start with common error matchers
    // 2. For each operation error, use operation matcher or fall back to service default
    const allErrorMatchers: Record<string, ErrorMatcher> = { ...COMMON_ERROR_MATCHERS };
    for (const [errorName, operationMatcher] of Object.entries(operationErrorMatchers)) {
      // If operation matcher is empty, use service-level default
      const hasOperationMatcher =
        operationMatcher.code !== undefined ||
        operationMatcher.codes !== undefined ||
        operationMatcher.status !== undefined ||
        operationMatcher.message !== undefined;

      if (hasOperationMatcher) {
        allErrorMatchers[errorName] = operationMatcher;
      } else {
        // Fall back to service-level default
        const serviceDefault = serviceErrorDefaults[errorName];
        if (serviceDefault) {
          allErrorMatchers[errorName] = serviceDefault;
        } else {
          // No matcher - error will still be in union but won't match anything
          allErrorMatchers[errorName] = {};
        }
      }
    }

    // Get the set of all error names for the type union
    const allErrorNames = Object.keys(allErrorMatchers);

    const errorTypes = [
      ...allErrorNames,
      "CloudflareError",
      "UnknownCloudflareError",
      "CloudflareNetworkError",
      "CloudflareHttpError",
    ];
    const errorUnion = errorTypes.join(" | ");

    // Generate error entries with annotations
    const errorEntries: string[] = [];
    for (const errorName of allErrorNames) {
      const matcher = allErrorMatchers[errorName]!;
      const annotations = generateErrorAnnotations(matcher);
      errorEntries.push(`${errorName}${annotations}`);
    }

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
    lines.push(`  errors: [${errorEntries.join(", ")}],`);
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
      yield* Effect.tryPromise(() => Bun.write(".cache/.gitkeep", ""));

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
      let spec = JSON.parse(specContent) as {
        paths: Record<string, Record<string, unknown>>;
        components?: {
          schemas?: Record<string, unknown>;
          requestBodies?: Record<string, OpenAPI.RequestBodyObject | OpenAPI.JsonReference>;
        };
      };

      const originalPathCount = Object.keys(spec.paths).length;
      yield* Console.log(`   Found ${originalPathCount} paths in OpenAPI spec`);

      // Apply patches from spec/openapi.patch.json
      spec = yield* Effect.tryPromise(() => loadAndApplyPatches(spec));
      const patchedPathCount = Object.keys(spec.paths).length;
      if (patchedPathCount > originalPathCount) {
        yield* Console.log(
          `   Applied patches: ${patchedPathCount - originalPathCount} new paths added`,
        );
      }

      const allSchemas = (spec.components?.schemas ?? {}) as Record<
        string,
        OpenAPI.OpenApiSchemaObject | OpenAPI.JsonReference
      >;

      const allRequestBodies = (spec.components?.requestBodies ?? {}) as Record<
        string,
        OpenAPI.RequestBodyObject | OpenAPI.JsonReference
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

        // Get path-level parameters (applies to all operations in this path)
        const pathLevelParams = (pathItem.parameters ?? []) as OpenAPI.ParameterObject[];

        const methods = ["get", "post", "put", "delete", "patch"] as const;
        for (const method of methods) {
          const operation = pathItem[method] as OpenAPI.OperationObject | undefined;
          if (!operation) continue;

          const operationId =
            operation.operationId ?? `${method}_${path.replace(/[^a-zA-Z0-9]/g, "_")}`;

          // Merge path-level parameters with operation-level parameters
          // Operation-level parameters override path-level parameters with the same name
          const operationParams = (operation.parameters ?? []) as OpenAPI.ParameterObject[];
          const operationParamNames = new Set(
            operationParams
              .filter((p) => !OpenAPI.isJsonReference(p))
              .map((p) => (p as OpenAPI.ParameterObject).name),
          );
          const mergedParams = [
            ...pathLevelParams.filter(
              (p) => !OpenAPI.isJsonReference(p) && !operationParamNames.has(p.name),
            ),
            ...operationParams,
          ];

          // Create a new operation object with merged parameters
          const mergedOperation: OpenAPI.OperationObject = {
            ...operation,
            parameters: mergedParams,
          };

          if (!serviceOps.has(serviceName)) {
            serviceOps.set(serviceName, []);
          }

          serviceOps.get(serviceName)!.push({
            operationId,
            method: method.toUpperCase(),
            path,
            operation: mergedOperation,
          });
        }
      }

      yield* Console.log(`   Grouped into ${serviceOps.size} services`);

      // Ensure services directory exists
      yield* Effect.tryPromise(() => Bun.write("src/services/.gitkeep", ""));

      // Generate service files
      for (const [serviceName, ops] of serviceOps) {
        yield* Console.log(`\n📝 Generating ${serviceName}.ts (${ops.length} operations)...`);

        // Collect all function names for this service (before loading spec so we can update it)
        const operationNames: string[] = [];
        const seenFunctionNames = new Set<string>();
        for (const op of ops) {
          let funcName = OpenAPI.operationIdToFunctionName(op.operationId);
          let safeFuncName = RESERVED_WORDS.has(funcName) ? `${funcName}_` : funcName;

          // Handle duplicates the same way as generateServiceFile
          let uniqueSuffix = 1;
          let uniqueFuncName = safeFuncName;
          while (seenFunctionNames.has(uniqueFuncName)) {
            uniqueFuncName = `${safeFuncName}${uniqueSuffix}`;
            uniqueSuffix++;
          }
          safeFuncName = uniqueFuncName;
          seenFunctionNames.add(safeFuncName);
          operationNames.push(safeFuncName);
        }

        // Update spec file with any missing operations
        const { added } = yield* Effect.tryPromise(() =>
          updateServiceSpec(serviceName, operationNames),
        );
        if (added.length > 0) {
          yield* Console.log(`   Added ${added.length} new operations to spec/${serviceName}.json`);
        }

        // Load service spec for errors
        const serviceSpec = yield* Effect.tryPromise(() => loadServiceSpec(serviceName));

        const content = generateServiceFile(
          serviceName,
          ops,
          allSchemas,
          allRequestBodies,
          serviceSpec,
        );
        yield* Effect.tryPromise(() => Bun.write(`src/services/${serviceName}.ts`, content));
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
  Logger.withMinimumLogLevel(process.env.DEBUG ? LogLevel.Debug : LogLevel.Info),
  NodeRuntime.runMain,
);
