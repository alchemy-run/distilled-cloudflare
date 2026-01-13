/**
 * OpenAPI 3.x schema definitions using Effect Schema.
 *
 * Used to parse and validate Cloudflare's OpenAPI specification.
 * Only includes the subset of OpenAPI features used by Cloudflare's API.
 */

import * as Schema from "effect/Schema";

// =============================================================================
// JSON Reference
// =============================================================================

export const JsonReference = Schema.Struct({
  $ref: Schema.String,
});
export type JsonReference = typeof JsonReference.Type;

export const isJsonReference = (value: unknown): value is JsonReference =>
  typeof value === "object" &&
  value !== null &&
  "$ref" in value &&
  typeof (value as Record<string, unknown>).$ref === "string";

/**
 * Extract the schema name from a $ref like "#/components/schemas/dns-records_identifier"
 */
export const getSchemaName = (ref: JsonReference): string => {
  const parts = ref.$ref.split("/");
  return parts[parts.length - 1] ?? ref.$ref;
};

/**
 * Check if this reference points to a component schema
 */
export const isSchemaRef = (ref: JsonReference): boolean => {
  return ref.$ref.startsWith("#/components/schemas/");
};

// =============================================================================
// Schema Types
// =============================================================================

export const OpenApiType = Schema.Literal(
  "string",
  "number",
  "integer",
  "boolean",
  "array",
  "object",
  "null",
);
export type OpenApiType = typeof OpenApiType.Type;

// =============================================================================
// Schema Object (simplified for runtime use, not validation)
// =============================================================================

export interface OpenApiSchemaObject {
  readonly type?: OpenApiType | readonly OpenApiType[];
  readonly format?: string;
  readonly description?: string;
  readonly example?: unknown;
  readonly default?: unknown;
  readonly nullable?: boolean;
  readonly readOnly?: boolean;
  readonly writeOnly?: boolean;
  readonly deprecated?: boolean;
  readonly enum?: readonly unknown[];
  readonly const?: unknown;

  // String constraints
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string;

  // Numeric constraints
  readonly minimum?: number;
  readonly maximum?: number;
  readonly exclusiveMinimum?: number;
  readonly exclusiveMaximum?: number;
  readonly multipleOf?: number;

  // Array
  readonly items?: OpenApiSchemaObject | JsonReference;
  readonly minItems?: number;
  readonly maxItems?: number;
  readonly uniqueItems?: boolean;

  // Object
  readonly properties?: Record<string, OpenApiSchemaObject | JsonReference>;
  readonly additionalProperties?: boolean | OpenApiSchemaObject | JsonReference;
  readonly required?: readonly string[];
  readonly minProperties?: number;
  readonly maxProperties?: number;

  // Composition
  readonly allOf?: readonly (OpenApiSchemaObject | JsonReference)[];
  readonly oneOf?: readonly (OpenApiSchemaObject | JsonReference)[];
  readonly anyOf?: readonly (OpenApiSchemaObject | JsonReference)[];
  readonly not?: OpenApiSchemaObject | JsonReference;

  // Discriminator for polymorphism
  readonly discriminator?: {
    readonly propertyName: string;
    readonly mapping?: Record<string, string>;
  };
}

// =============================================================================
// Parameter Object
// =============================================================================

export type ParameterLocation = "query" | "header" | "path" | "cookie";

export interface ParameterObject {
  name: string;
  in: ParameterLocation;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: OpenApiSchemaObject | JsonReference;
  example?: unknown;
  examples?: Record<string, unknown>;
}

// =============================================================================
// Request Body Object
// =============================================================================

export interface MediaTypeObject {
  schema?: OpenApiSchemaObject | JsonReference;
  example?: unknown;
  examples?: Record<string, unknown>;
}

export interface RequestBodyObject {
  description?: string;
  content: Record<string, MediaTypeObject>;
  required?: boolean;
}

// =============================================================================
// Response Object
// =============================================================================

export interface HeaderObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: OpenApiSchemaObject | JsonReference;
}

export interface ResponseObject {
  description: string;
  headers?: Record<string, HeaderObject | JsonReference>;
  content?: Record<string, MediaTypeObject>;
}

// =============================================================================
// Operation Object
// =============================================================================

export interface OperationObject {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  deprecated?: boolean;
  parameters?: (ParameterObject | JsonReference)[];
  requestBody?: RequestBodyObject | JsonReference;
  responses: Record<string, ResponseObject | JsonReference>;
  security?: Record<string, string[]>[];
}

// =============================================================================
// Path Item Object
// =============================================================================

export interface PathItemObject {
  summary?: string;
  description?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  parameters?: (ParameterObject | JsonReference)[];
}

// =============================================================================
// Components Object
// =============================================================================

export interface ComponentsObject {
  schemas?: Record<string, OpenApiSchemaObject | JsonReference>;
  responses?: Record<string, ResponseObject | JsonReference>;
  parameters?: Record<string, ParameterObject | JsonReference>;
  requestBodies?: Record<string, RequestBodyObject | JsonReference>;
  headers?: Record<string, HeaderObject | JsonReference>;
  securitySchemes?: Record<string, unknown>;
}

// =============================================================================
// Server Object
// =============================================================================

export interface ServerObject {
  url: string;
  description?: string;
  variables?: Record<
    string,
    {
      default: string;
      enum?: string[];
      description?: string;
    }
  >;
}

// =============================================================================
// Info Object
// =============================================================================

export interface InfoObject {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  license?: {
    name: string;
    url?: string;
  };
}

// =============================================================================
// OpenAPI Document
// =============================================================================

export interface OpenApiDocument {
  openapi: string;
  info: InfoObject;
  servers?: ServerObject[];
  paths: Record<string, PathItemObject>;
  components?: ComponentsObject;
  security?: Record<string, string[]>[];
  tags?: Array<{
    name: string;
    description?: string;
  }>;
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Convert an operationId to a valid TypeScript function name.
 * e.g., "dns-records-for-a-zone-list-dns-records" -> "listDnsRecords"
 */
export const operationIdToFunctionName = (operationId: string): string => {
  // First, remove any invalid characters (apostrophes, etc.)
  const sanitized = operationId.replace(/[^a-zA-Z0-9\-_\s]/g, "");

  // Split by common separators
  const parts = sanitized.split(/[-_\s]+/).filter(Boolean);

  // Find the last meaningful verb or use all parts
  const verbIndex = parts.findLastIndex((p) =>
    ["list", "get", "create", "update", "delete", "patch", "post", "put"].includes(p.toLowerCase()),
  );

  const relevantParts = verbIndex >= 0 ? parts.slice(verbIndex) : parts;

  // camelCase the result
  return relevantParts
    .map((part, i) =>
      i === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
    )
    .join("");
};

/**
 * Convert a schema name to a valid TypeScript class name.
 * e.g., "dns-records_identifier" -> "DnsRecordsIdentifier"
 */
export const schemaNameToClassName = (name: string): string => {
  return name
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
};

/**
 * Extract service name from a path.
 * e.g., "/zones/{zone_id}/dns_records" -> "dns"
 */
export const pathToServiceName = (path: string): string => {
  const parts = path.split("/").filter(Boolean);
  // Skip common prefixes like "accounts", "zones"
  const filtered = parts.filter(
    (p) => !p.startsWith("{") && !["accounts", "zones", "v4"].includes(p),
  );
  if (filtered.length === 0) return "api";
  return filtered[0]!.replace(/_/g, "-");
};

/**
 * Get the HTTP methods defined on a path item.
 */
export const getOperations = (
  pathItem: PathItemObject,
): Array<{ method: string; operation: OperationObject }> => {
  const methods = ["get", "put", "post", "delete", "patch", "head", "options", "trace"] as const;
  const result: Array<{ method: string; operation: OperationObject }> = [];

  for (const method of methods) {
    const operation = pathItem[method];
    if (operation) {
      result.push({ method: method.toUpperCase(), operation });
    }
  }

  return result;
};
