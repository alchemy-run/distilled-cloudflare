/**
 * Error categories for Cloudflare API errors.
 *
 * These categories group errors by their semantic meaning, enabling
 * pattern-based error handling (e.g., retry all throttling errors).
 */

/** Authentication/authorization failures */
export const AuthError = "AuthError" as const;
export type AuthError = typeof AuthError;

/** Invalid request parameters */
export const BadRequestError = "BadRequestError" as const;
export type BadRequestError = typeof BadRequestError;

/** Resource state conflicts (already exists, dependency violation) */
export const ConflictError = "ConflictError" as const;
export type ConflictError = typeof ConflictError;

/** Resource not found */
export const NotFoundError = "NotFoundError" as const;
export type NotFoundError = typeof NotFoundError;

/** Service quota exceeded */
export const QuotaError = "QuotaError" as const;
export type QuotaError = typeof QuotaError;

/** Rate limiting */
export const ThrottlingError = "ThrottlingError" as const;
export type ThrottlingError = typeof ThrottlingError;

/** Request timeouts */
export const TimeoutError = "TimeoutError" as const;
export type TimeoutError = typeof TimeoutError;

/** Cloudflare service errors */
export const ServerError = "ServerError" as const;
export type ServerError = typeof ServerError;

/** Network/transport failures */
export const NetworkError = "NetworkError" as const;
export type NetworkError = typeof NetworkError;

/** Unknown error type */
export const UnknownError = "UnknownError" as const;
export type UnknownError = typeof UnknownError;

export type Category =
  | AuthError
  | BadRequestError
  | ConflictError
  | NotFoundError
  | QuotaError
  | ThrottlingError
  | TimeoutError
  | ServerError
  | NetworkError
  | UnknownError;

/**
 * Check if an error is a throttling error (rate limited).
 */
export const isThrottlingError = (error: { readonly _tag?: string }): boolean =>
  error._tag === "RateLimited" || error._tag?.includes("RateLimit") === true;

/**
 * Check if an error is an authentication error.
 */
export const isAuthError = (error: { readonly _tag?: string }): boolean =>
  error._tag === "AuthenticationError" ||
  error._tag === "Unauthorized" ||
  error._tag?.includes("Auth") === true;

/**
 * Check if an error is a not found error.
 */
export const isNotFoundError = (error: { readonly _tag?: string }): boolean =>
  error._tag?.includes("NotFound") === true || error._tag?.includes("NoSuch") === true;

/**
 * Check if an error is a conflict error.
 */
export const isConflictError = (error: { readonly _tag?: string }): boolean =>
  error._tag?.includes("AlreadyExists") === true ||
  error._tag?.includes("Conflict") === true ||
  error._tag?.includes("InUse") === true;

/**
 * Check if an error is a server error.
 */
export const isServerError = (error: { readonly _tag?: string }): boolean =>
  error._tag?.includes("Internal") === true || error._tag?.includes("Server") === true;
