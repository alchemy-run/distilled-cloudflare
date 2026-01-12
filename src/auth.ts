/**
 * Authentication for Cloudflare API.
 *
 * Cloudflare supports two authentication methods:
 * 1. API Token (recommended) - scoped to specific permissions
 * 2. API Key + Email - global access to all resources
 *
 * @see https://developers.cloudflare.com/fundamentals/api/
 */

import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/**
 * Cloudflare authentication - either API Token or API Key + Email.
 */
export type CloudflareAuth =
  | { readonly type: "token"; readonly token: Redacted.Redacted<string> }
  | {
      readonly type: "key";
      readonly apiKey: Redacted.Redacted<string>;
      readonly email: string;
    };

export interface ApiToken {
  readonly auth: CloudflareAuth;
}

export const ApiToken = Context.GenericTag<ApiToken>(
  "@distilled-cloudflare/ApiToken",
);

/**
 * Cloudflare Account ID - required for account-scoped operations.
 */
export interface AccountId {
  readonly accountId: string;
}

export const AccountId = Context.GenericTag<AccountId>(
  "@distilled-cloudflare/AccountId",
);

/**
 * Cloudflare Zone ID - required for zone-scoped operations.
 */
export interface ZoneId {
  readonly zoneId: string;
}

export const ZoneId = Context.GenericTag<ZoneId>(
  "@distilled-cloudflare/ZoneId",
);

/**
 * Create an ApiToken layer from environment variables.
 * Reads from CLOUDFLARE_API_TOKEN or (CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL).
 */
export const fromEnv = (): Layer.Layer<ApiToken> =>
  Layer.effect(
    ApiToken,
    Effect.sync(() => {
      const token = process.env.CLOUDFLARE_API_TOKEN;
      if (token) {
        return { auth: { type: "token" as const, token: Redacted.make(token) } };
      }

      const apiKey = process.env.CLOUDFLARE_API_KEY;
      const email = process.env.CLOUDFLARE_EMAIL;
      if (apiKey && email) {
        return {
          auth: {
            type: "key" as const,
            apiKey: Redacted.make(apiKey),
            email,
          },
        };
      }

      throw new Error(
        "Either CLOUDFLARE_API_TOKEN or (CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL) must be set",
      );
    }),
  );

/**
 * Create an ApiToken layer from a static token value.
 * Useful for testing or when token is retrieved from a secret store.
 */
export const fromToken = (token: string): Layer.Layer<ApiToken> =>
  Layer.succeed(ApiToken, {
    auth: { type: "token" as const, token: Redacted.make(token) },
  });

/**
 * Create an ApiToken layer from API Key + Email.
 */
export const fromApiKey = (
  apiKey: string,
  email: string,
): Layer.Layer<ApiToken> =>
  Layer.succeed(ApiToken, {
    auth: { type: "key" as const, apiKey: Redacted.make(apiKey), email },
  });

/**
 * Create an AccountId layer from environment variables.
 * Reads from CLOUDFLARE_ACCOUNT_ID.
 */
export const accountIdFromEnv = (): Layer.Layer<AccountId> =>
  Layer.effect(
    AccountId,
    Effect.sync(() => {
      const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
      if (!accountId) {
        throw new Error(
          "CLOUDFLARE_ACCOUNT_ID environment variable is not set",
        );
      }
      return { accountId };
    }),
  );

/**
 * Create an AccountId layer from a static value.
 */
export const fromAccountId = (accountId: string): Layer.Layer<AccountId> =>
  Layer.succeed(AccountId, { accountId });

/**
 * Create a ZoneId layer from environment variables.
 * Reads from CLOUDFLARE_ZONE_ID.
 */
export const zoneIdFromEnv = (): Layer.Layer<ZoneId> =>
  Layer.effect(
    ZoneId,
    Effect.sync(() => {
      const zoneId = process.env.CLOUDFLARE_ZONE_ID;
      if (!zoneId) {
        throw new Error("CLOUDFLARE_ZONE_ID environment variable is not set");
      }
      return { zoneId };
    }),
  );

/**
 * Create a ZoneId layer from a static value.
 */
export const fromZoneId = (zoneId: string): Layer.Layer<ZoneId> =>
  Layer.succeed(ZoneId, { zoneId });
