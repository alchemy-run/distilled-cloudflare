/**
 * Error catalog management for error discovery.
 *
 * Loads, updates, and saves the error catalog.
 */

import { FileSystem } from "@effect/platform";
import * as Effect from "effect/Effect";
import type { ErrorCatalogData, ErrorCatalogEntry } from "../../src/error-catalog.ts";

const CATALOG_PATH = "spec/error-catalog.json";

/**
 * Load the error catalog from disk.
 */
export const loadCatalog = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;

  const exists = yield* fs.exists(CATALOG_PATH);
  if (!exists) {
    return {
      codes: {},
      patterns: [],
      codeRanges: [],
    } as ErrorCatalogData;
  }

  const content = yield* fs.readFileString(CATALOG_PATH);
  return JSON.parse(content) as ErrorCatalogData;
});

/**
 * Save the error catalog to disk.
 */
export const saveCatalog = (catalog: ErrorCatalogData) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;

    // Sort codes numerically
    const sortedCodes: Record<string, ErrorCatalogEntry> = {};
    const codeNumbers = Object.keys(catalog.codes)
      .map(Number)
      .sort((a, b) => a - b);

    for (const code of codeNumbers) {
      sortedCodes[String(code)] = catalog.codes[String(code)]!;
    }

    const sortedCatalog: ErrorCatalogData = {
      ...catalog,
      codes: sortedCodes,
    };

    const content = JSON.stringify(sortedCatalog, null, 2) + "\n";
    yield* fs.writeFileString(CATALOG_PATH, content);
  });

/**
 * Add a discovered error to the catalog.
 * Returns true if the error was new.
 */
export const addDiscoveredError = (
  catalog: ErrorCatalogData,
  code: number,
  message: string,
): { catalog: ErrorCatalogData; isNew: boolean; suggestedName: string } => {
  const codeStr = String(code);

  // Check if already in catalog
  if (catalog.codes[codeStr]) {
    return {
      catalog,
      isNew: false,
      suggestedName: catalog.codes[codeStr]!.name,
    };
  }

  // Generate a suggested name based on patterns
  const suggestedName = generateErrorName(code, message);
  const category = suggestCategory(code, message, catalog);

  const updatedCatalog: ErrorCatalogData = {
    ...catalog,
    codes: {
      ...catalog.codes,
      [codeStr]: { name: suggestedName, category },
    },
  };

  return {
    catalog: updatedCatalog,
    isNew: true,
    suggestedName,
  };
};

/**
 * Generate a suggested error name from the message.
 */
function generateErrorName(code: number, message: string): string {
  // Extract key phrases from the message
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("not found")) {
    return `NotFound_${code}`;
  }
  if (lowerMessage.includes("already exists")) {
    return `AlreadyExists_${code}`;
  }
  if (lowerMessage.includes("rate limit")) {
    return `RateLimited_${code}`;
  }
  if (lowerMessage.includes("unauthorized") || lowerMessage.includes("authentication")) {
    return `Unauthorized_${code}`;
  }
  if (lowerMessage.includes("forbidden")) {
    return `Forbidden_${code}`;
  }
  if (lowerMessage.includes("invalid")) {
    return `Invalid_${code}`;
  }
  if (lowerMessage.includes("required")) {
    return `MissingRequired_${code}`;
  }
  if (lowerMessage.includes("conflict") || lowerMessage.includes("in use")) {
    return `Conflict_${code}`;
  }

  return `Error_${code}`;
}

/**
 * Suggest a category based on code ranges and message.
 */
function suggestCategory(code: number, message: string, catalog: ErrorCatalogData): string {
  const lowerMessage = message.toLowerCase();

  // Check message patterns first
  for (const pattern of catalog.patterns) {
    if (new RegExp(pattern.regex, "i").test(lowerMessage)) {
      return pattern.category;
    }
  }

  // Fall back to code ranges
  for (const range of catalog.codeRanges) {
    if (code >= range.min && code <= range.max) {
      return range.defaultCategory;
    }
  }

  return "UnknownError";
}
