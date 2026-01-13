/**
 * Cloudflare CONTAINERS API
 *
 * Generated from Cloudflare OpenAPI specification.
 * DO NOT EDIT - regenerate with: bun generate --service containers
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type { HttpClient } from "@effect/platform";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  CloudflareError,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// Errors
// =============================================================================

export class AuthenticationError extends Schema.TaggedError<AuthenticationError>()(
  "AuthenticationError",
  {
    code: Schema.Number,
    message: Schema.String,
  },
) {
  static readonly _tag = "AuthenticationError";
}

export class InvalidToken extends Schema.TaggedError<InvalidToken>()("InvalidToken", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "InvalidToken";
}

export class MissingToken extends Schema.TaggedError<MissingToken>()("MissingToken", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "MissingToken";
}

export class RateLimited extends Schema.TaggedError<RateLimited>()("RateLimited", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "RateLimited";
}

export class TokenExpired extends Schema.TaggedError<TokenExpired>()("TokenExpired", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "TokenExpired";
}

export class TooManyRequests extends Schema.TaggedError<TooManyRequests>()("TooManyRequests", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "TooManyRequests";
}

export class Unauthorized extends Schema.TaggedError<Unauthorized>()("Unauthorized", {
  code: Schema.Number,
  message: Schema.String,
}) {
  static readonly _tag = "Unauthorized";
}

export interface PubliclistapplicationsRequest {
  name?: string;
  image?: string;
}

export const PubliclistapplicationsRequest = Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  image: Schema.optional(Schema.String).pipe(T.HttpQuery("image")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/containers" }))
  .annotations({
    identifier: "PubliclistapplicationsRequest",
  }) as unknown as Schema.Schema<PubliclistapplicationsRequest>;

export interface PubliclistapplicationsResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const PubliclistapplicationsResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "PubliclistapplicationsResponse",
}) as unknown as Schema.Schema<PubliclistapplicationsResponse>;

export const publiclistapplications: (
  input: PubliclistapplicationsRequest,
) => Effect.Effect<
  PubliclistapplicationsResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PubliclistapplicationsRequest,
  output: PubliclistapplicationsResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));

export interface GenerateimageregistrycredentialsRequest {
  domain: string;
  body: { expiration_minutes: number; permissions: "pull" | "push"[] };
}

export const GenerateimageregistrycredentialsRequest = Schema.Struct({
  domain: Schema.String.pipe(T.HttpPath("domain")),
  body: Schema.Struct({
    expiration_minutes: Schema.Number,
    permissions: Schema.Array(Schema.Literal("pull", "push")),
  }).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/containers/registries/{domain}/credentials",
    }),
  )
  .annotations({
    identifier: "GenerateimageregistrycredentialsRequest",
  }) as unknown as Schema.Schema<GenerateimageregistrycredentialsRequest>;

export interface GenerateimageregistrycredentialsResponse {
  result: unknown | null;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GenerateimageregistrycredentialsResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Unknown),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "GenerateimageregistrycredentialsResponse",
}) as unknown as Schema.Schema<GenerateimageregistrycredentialsResponse>;

export const generateimageregistrycredentials: (
  input: GenerateimageregistrycredentialsRequest,
) => Effect.Effect<
  GenerateimageregistrycredentialsResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateimageregistrycredentialsRequest,
  output: GenerateimageregistrycredentialsResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));

export interface ListcontainerapplicationsRequest {
  account_id: string;
}

export const ListcontainerapplicationsRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/containers/applications" }))
  .annotations({
    identifier: "ListcontainerapplicationsRequest",
  }) as unknown as Schema.Schema<ListcontainerapplicationsRequest>;

export interface ListcontainerapplicationsResponse {
  result: {
    id?: string;
    name?: string;
    account_id?: string;
    scheduling_policy?: string;
    instances?: number;
    max_instances?: number;
    created_at?: string;
    version?: number;
    durable_object_namespace_id?: string;
    constraints?: { tier?: number };
    configuration?: {
      image: string;
      instance_type?: string;
      vcpu?: number;
      memory?: string;
      observability?: { logs?: { enabled?: boolean } };
      ssh_public_key_ids?: string[];
      secrets?: { name?: string; type?: "env"; secret?: string }[];
      disk?: { size?: string };
      environment_variables?: { name?: string; value?: string }[];
      labels?: { name?: string; value?: string }[];
      network?: {
        assign_ipv4?: "none" | "predefined" | "account";
        assign_ipv6?: "none" | "predefined" | "account";
        mode?: "public" | "private";
      };
      command?: string[];
      entrypoint?: string[];
      dns?: { servers?: string[]; searches?: string[] };
      ports?: { name?: string; port?: number }[];
      checks?: {
        name?: string;
        type?: "http" | "tcp";
        tls?: boolean;
        port?: string;
        http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> };
        interval?: string;
        timeout?: string;
        retries?: number;
        kind?: "health" | "ready";
      }[];
    };
    durable_objects?: { namespace_id?: string };
    health?: { instances?: Record<string, unknown> };
  }[];
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const ListcontainerapplicationsResponse = Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.NullOr(Schema.String)),
      name: Schema.optional(Schema.NullOr(Schema.String)),
      account_id: Schema.optional(Schema.NullOr(Schema.String)),
      scheduling_policy: Schema.optional(Schema.NullOr(Schema.String)),
      instances: Schema.optional(Schema.NullOr(Schema.Number)),
      max_instances: Schema.optional(Schema.NullOr(Schema.Number)),
      created_at: Schema.optional(Schema.NullOr(Schema.String)),
      version: Schema.optional(Schema.NullOr(Schema.Number)),
      durable_object_namespace_id: Schema.optional(Schema.NullOr(Schema.String)),
      constraints: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            tier: Schema.optional(Schema.NullOr(Schema.Number)),
          }),
        ),
      ),
      configuration: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            image: Schema.String,
            instance_type: Schema.optional(Schema.NullOr(Schema.String)),
            vcpu: Schema.optional(Schema.NullOr(Schema.Number)),
            memory: Schema.optional(Schema.NullOr(Schema.String)),
            observability: Schema.optional(
              Schema.NullOr(
                Schema.Struct({
                  logs: Schema.optional(
                    Schema.NullOr(
                      Schema.Struct({
                        enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                      }),
                    ),
                  ),
                }),
              ),
            ),
            ssh_public_key_ids: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
            secrets: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.NullOr(Schema.String)),
                    type: Schema.optional(Schema.NullOr(Schema.Literal("env"))),
                    secret: Schema.optional(Schema.NullOr(Schema.String)),
                  }),
                ),
              ),
            ),
            disk: Schema.optional(
              Schema.NullOr(
                Schema.Struct({
                  size: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
            environment_variables: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.NullOr(Schema.String)),
                    value: Schema.optional(Schema.NullOr(Schema.String)),
                  }),
                ),
              ),
            ),
            labels: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.NullOr(Schema.String)),
                    value: Schema.optional(Schema.NullOr(Schema.String)),
                  }),
                ),
              ),
            ),
            network: Schema.optional(
              Schema.NullOr(
                Schema.Struct({
                  assign_ipv4: Schema.optional(
                    Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                  ),
                  assign_ipv6: Schema.optional(
                    Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                  ),
                  mode: Schema.optional(Schema.NullOr(Schema.Literal("public", "private"))),
                }),
              ),
            ),
            command: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
            entrypoint: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
            dns: Schema.optional(
              Schema.NullOr(
                Schema.Struct({
                  servers: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
                  searches: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
                }),
              ),
            ),
            ports: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.NullOr(Schema.String)),
                    port: Schema.optional(Schema.NullOr(Schema.Number)),
                  }),
                ),
              ),
            ),
            checks: Schema.optional(
              Schema.NullOr(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.NullOr(Schema.String)),
                    type: Schema.optional(Schema.NullOr(Schema.Literal("http", "tcp"))),
                    tls: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    port: Schema.optional(Schema.NullOr(Schema.String)),
                    http: Schema.optional(
                      Schema.NullOr(
                        Schema.Struct({
                          method: Schema.optional(Schema.NullOr(Schema.String)),
                          body: Schema.optional(Schema.NullOr(Schema.String)),
                          path: Schema.optional(Schema.NullOr(Schema.String)),
                          headers: Schema.optional(Schema.NullOr(Schema.Struct({}))),
                        }),
                      ),
                    ),
                    interval: Schema.optional(Schema.NullOr(Schema.String)),
                    timeout: Schema.optional(Schema.NullOr(Schema.String)),
                    retries: Schema.optional(Schema.NullOr(Schema.Number)),
                    kind: Schema.optional(Schema.NullOr(Schema.Literal("health", "ready"))),
                  }),
                ),
              ),
            ),
          }),
        ),
      ),
      durable_objects: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            namespace_id: Schema.optional(Schema.NullOr(Schema.String)),
          }),
        ),
      ),
      health: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            instances: Schema.optional(Schema.NullOr(Schema.Struct({}))),
          }),
        ),
      ),
    }),
  ),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "ListcontainerapplicationsResponse",
}) as unknown as Schema.Schema<ListcontainerapplicationsResponse>;

export const listcontainerapplications: (
  input: ListcontainerapplicationsRequest,
) => Effect.Effect<
  ListcontainerapplicationsResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListcontainerapplicationsRequest,
  output: ListcontainerapplicationsResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));

export interface CreatecontainerapplicationRequest {
  account_id: string;
  body: {
    name: string;
    max_instances: number;
    instances?: number;
    scheduling_policy?: string;
    configuration: {
      image: string;
      instance_type?: string;
      vcpu?: number;
      memory?: string;
      observability?: { logs?: { enabled?: boolean } };
      ssh_public_key_ids?: string[];
      secrets?: { name?: string; type?: "env"; secret?: string }[];
      disk?: { size?: string };
      environment_variables?: { name?: string; value?: string }[];
      labels?: { name?: string; value?: string }[];
      network?: {
        assign_ipv4?: "none" | "predefined" | "account";
        assign_ipv6?: "none" | "predefined" | "account";
        mode?: "public" | "private";
      };
      command?: string[];
      entrypoint?: string[];
      dns?: { servers?: string[]; searches?: string[] };
      ports?: { name?: string; port?: number }[];
      checks?: {
        name?: string;
        type?: "http" | "tcp";
        tls?: boolean;
        port?: string;
        http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> };
        interval?: string;
        timeout?: string;
        retries?: number;
        kind?: "health" | "ready";
      }[];
    };
    durable_objects?: { namespace_id?: string };
    constraints?: { tier?: number };
    affinities?: { colocation?: "datacenter" };
  };
}

export const CreatecontainerapplicationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Struct({
    name: Schema.String,
    max_instances: Schema.Number,
    instances: Schema.optional(Schema.NullOr(Schema.Number)),
    scheduling_policy: Schema.optional(Schema.NullOr(Schema.String)),
    configuration: Schema.Struct({
      image: Schema.String,
      instance_type: Schema.optional(Schema.NullOr(Schema.String)),
      vcpu: Schema.optional(Schema.NullOr(Schema.Number)),
      memory: Schema.optional(Schema.NullOr(Schema.String)),
      observability: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            logs: Schema.optional(
              Schema.NullOr(
                Schema.Struct({
                  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                }),
              ),
            ),
          }),
        ),
      ),
      ssh_public_key_ids: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      secrets: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              type: Schema.optional(Schema.NullOr(Schema.Literal("env"))),
              secret: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        ),
      ),
      disk: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            size: Schema.optional(Schema.NullOr(Schema.String)),
          }),
        ),
      ),
      environment_variables: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              value: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        ),
      ),
      labels: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              value: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        ),
      ),
      network: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            assign_ipv4: Schema.optional(
              Schema.NullOr(Schema.Literal("none", "predefined", "account")),
            ),
            assign_ipv6: Schema.optional(
              Schema.NullOr(Schema.Literal("none", "predefined", "account")),
            ),
            mode: Schema.optional(Schema.NullOr(Schema.Literal("public", "private"))),
          }),
        ),
      ),
      command: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      entrypoint: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      dns: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            servers: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
            searches: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          }),
        ),
      ),
      ports: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              port: Schema.optional(Schema.NullOr(Schema.Number)),
            }),
          ),
        ),
      ),
      checks: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              type: Schema.optional(Schema.NullOr(Schema.Literal("http", "tcp"))),
              tls: Schema.optional(Schema.NullOr(Schema.Boolean)),
              port: Schema.optional(Schema.NullOr(Schema.String)),
              http: Schema.optional(
                Schema.NullOr(
                  Schema.Struct({
                    method: Schema.optional(Schema.NullOr(Schema.String)),
                    body: Schema.optional(Schema.NullOr(Schema.String)),
                    path: Schema.optional(Schema.NullOr(Schema.String)),
                    headers: Schema.optional(Schema.NullOr(Schema.Struct({}))),
                  }),
                ),
              ),
              interval: Schema.optional(Schema.NullOr(Schema.String)),
              timeout: Schema.optional(Schema.NullOr(Schema.String)),
              retries: Schema.optional(Schema.NullOr(Schema.Number)),
              kind: Schema.optional(Schema.NullOr(Schema.Literal("health", "ready"))),
            }),
          ),
        ),
      ),
    }),
    durable_objects: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          namespace_id: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    constraints: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          tier: Schema.optional(Schema.NullOr(Schema.Number)),
        }),
      ),
    ),
    affinities: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          colocation: Schema.optional(Schema.NullOr(Schema.Literal("datacenter"))),
        }),
      ),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/containers/applications" }))
  .annotations({
    identifier: "CreatecontainerapplicationRequest",
  }) as unknown as Schema.Schema<CreatecontainerapplicationRequest>;

export interface CreatecontainerapplicationResponse {
  result: {
    id?: string;
    name?: string;
    account_id?: string;
    scheduling_policy?: string;
    instances?: number;
    max_instances?: number;
    created_at?: string;
    version?: number;
    durable_object_namespace_id?: string;
    constraints?: { tier?: number };
    configuration?: {
      image: string;
      instance_type?: string;
      vcpu?: number;
      memory?: string;
      observability?: { logs?: { enabled?: boolean } };
      ssh_public_key_ids?: string[];
      secrets?: { name?: string; type?: "env"; secret?: string }[];
      disk?: { size?: string };
      environment_variables?: { name?: string; value?: string }[];
      labels?: { name?: string; value?: string }[];
      network?: {
        assign_ipv4?: "none" | "predefined" | "account";
        assign_ipv6?: "none" | "predefined" | "account";
        mode?: "public" | "private";
      };
      command?: string[];
      entrypoint?: string[];
      dns?: { servers?: string[]; searches?: string[] };
      ports?: { name?: string; port?: number }[];
      checks?: {
        name?: string;
        type?: "http" | "tcp";
        tls?: boolean;
        port?: string;
        http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> };
        interval?: string;
        timeout?: string;
        retries?: number;
        kind?: "health" | "ready";
      }[];
    };
    durable_objects?: { namespace_id?: string };
    health?: { instances?: Record<string, unknown> };
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreatecontainerapplicationResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    account_id: Schema.optional(Schema.NullOr(Schema.String)),
    scheduling_policy: Schema.optional(Schema.NullOr(Schema.String)),
    instances: Schema.optional(Schema.NullOr(Schema.Number)),
    max_instances: Schema.optional(Schema.NullOr(Schema.Number)),
    created_at: Schema.optional(Schema.NullOr(Schema.String)),
    version: Schema.optional(Schema.NullOr(Schema.Number)),
    durable_object_namespace_id: Schema.optional(Schema.NullOr(Schema.String)),
    constraints: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          tier: Schema.optional(Schema.NullOr(Schema.Number)),
        }),
      ),
    ),
    configuration: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          image: Schema.String,
          instance_type: Schema.optional(Schema.NullOr(Schema.String)),
          vcpu: Schema.optional(Schema.NullOr(Schema.Number)),
          memory: Schema.optional(Schema.NullOr(Schema.String)),
          observability: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                logs: Schema.optional(
                  Schema.NullOr(
                    Schema.Struct({
                      enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    }),
                  ),
                ),
              }),
            ),
          ),
          ssh_public_key_ids: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          secrets: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("env"))),
                  secret: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          disk: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                size: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            ),
          ),
          environment_variables: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          labels: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          network: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                assign_ipv4: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                assign_ipv6: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                mode: Schema.optional(Schema.NullOr(Schema.Literal("public", "private"))),
              }),
            ),
          ),
          command: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          entrypoint: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          dns: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                servers: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
                searches: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
              }),
            ),
          ),
          ports: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  port: Schema.optional(Schema.NullOr(Schema.Number)),
                }),
              ),
            ),
          ),
          checks: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "tcp"))),
                  tls: Schema.optional(Schema.NullOr(Schema.Boolean)),
                  port: Schema.optional(Schema.NullOr(Schema.String)),
                  http: Schema.optional(
                    Schema.NullOr(
                      Schema.Struct({
                        method: Schema.optional(Schema.NullOr(Schema.String)),
                        body: Schema.optional(Schema.NullOr(Schema.String)),
                        path: Schema.optional(Schema.NullOr(Schema.String)),
                        headers: Schema.optional(Schema.NullOr(Schema.Struct({}))),
                      }),
                    ),
                  ),
                  interval: Schema.optional(Schema.NullOr(Schema.String)),
                  timeout: Schema.optional(Schema.NullOr(Schema.String)),
                  retries: Schema.optional(Schema.NullOr(Schema.Number)),
                  kind: Schema.optional(Schema.NullOr(Schema.Literal("health", "ready"))),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    durable_objects: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          namespace_id: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    health: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          instances: Schema.optional(Schema.NullOr(Schema.Struct({}))),
        }),
      ),
    ),
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "CreatecontainerapplicationResponse",
}) as unknown as Schema.Schema<CreatecontainerapplicationResponse>;

export const createcontainerapplication: (
  input: CreatecontainerapplicationRequest,
) => Effect.Effect<
  CreatecontainerapplicationResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatecontainerapplicationRequest,
  output: CreatecontainerapplicationResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));

export interface GetcontainerapplicationRequest {
  account_id: string;
  application_id: string;
}

export const GetcontainerapplicationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  application_id: Schema.String.pipe(T.HttpPath("application_id")),
})
  .pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/containers/applications/{application_id}",
    }),
  )
  .annotations({
    identifier: "GetcontainerapplicationRequest",
  }) as unknown as Schema.Schema<GetcontainerapplicationRequest>;

export interface GetcontainerapplicationResponse {
  result: {
    id?: string;
    name?: string;
    account_id?: string;
    scheduling_policy?: string;
    instances?: number;
    max_instances?: number;
    created_at?: string;
    version?: number;
    durable_object_namespace_id?: string;
    constraints?: { tier?: number };
    configuration?: {
      image: string;
      instance_type?: string;
      vcpu?: number;
      memory?: string;
      observability?: { logs?: { enabled?: boolean } };
      ssh_public_key_ids?: string[];
      secrets?: { name?: string; type?: "env"; secret?: string }[];
      disk?: { size?: string };
      environment_variables?: { name?: string; value?: string }[];
      labels?: { name?: string; value?: string }[];
      network?: {
        assign_ipv4?: "none" | "predefined" | "account";
        assign_ipv6?: "none" | "predefined" | "account";
        mode?: "public" | "private";
      };
      command?: string[];
      entrypoint?: string[];
      dns?: { servers?: string[]; searches?: string[] };
      ports?: { name?: string; port?: number }[];
      checks?: {
        name?: string;
        type?: "http" | "tcp";
        tls?: boolean;
        port?: string;
        http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> };
        interval?: string;
        timeout?: string;
        retries?: number;
        kind?: "health" | "ready";
      }[];
    };
    durable_objects?: { namespace_id?: string };
    health?: { instances?: Record<string, unknown> };
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetcontainerapplicationResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    account_id: Schema.optional(Schema.NullOr(Schema.String)),
    scheduling_policy: Schema.optional(Schema.NullOr(Schema.String)),
    instances: Schema.optional(Schema.NullOr(Schema.Number)),
    max_instances: Schema.optional(Schema.NullOr(Schema.Number)),
    created_at: Schema.optional(Schema.NullOr(Schema.String)),
    version: Schema.optional(Schema.NullOr(Schema.Number)),
    durable_object_namespace_id: Schema.optional(Schema.NullOr(Schema.String)),
    constraints: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          tier: Schema.optional(Schema.NullOr(Schema.Number)),
        }),
      ),
    ),
    configuration: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          image: Schema.String,
          instance_type: Schema.optional(Schema.NullOr(Schema.String)),
          vcpu: Schema.optional(Schema.NullOr(Schema.Number)),
          memory: Schema.optional(Schema.NullOr(Schema.String)),
          observability: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                logs: Schema.optional(
                  Schema.NullOr(
                    Schema.Struct({
                      enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    }),
                  ),
                ),
              }),
            ),
          ),
          ssh_public_key_ids: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          secrets: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("env"))),
                  secret: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          disk: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                size: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            ),
          ),
          environment_variables: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          labels: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          network: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                assign_ipv4: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                assign_ipv6: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                mode: Schema.optional(Schema.NullOr(Schema.Literal("public", "private"))),
              }),
            ),
          ),
          command: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          entrypoint: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          dns: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                servers: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
                searches: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
              }),
            ),
          ),
          ports: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  port: Schema.optional(Schema.NullOr(Schema.Number)),
                }),
              ),
            ),
          ),
          checks: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "tcp"))),
                  tls: Schema.optional(Schema.NullOr(Schema.Boolean)),
                  port: Schema.optional(Schema.NullOr(Schema.String)),
                  http: Schema.optional(
                    Schema.NullOr(
                      Schema.Struct({
                        method: Schema.optional(Schema.NullOr(Schema.String)),
                        body: Schema.optional(Schema.NullOr(Schema.String)),
                        path: Schema.optional(Schema.NullOr(Schema.String)),
                        headers: Schema.optional(Schema.NullOr(Schema.Struct({}))),
                      }),
                    ),
                  ),
                  interval: Schema.optional(Schema.NullOr(Schema.String)),
                  timeout: Schema.optional(Schema.NullOr(Schema.String)),
                  retries: Schema.optional(Schema.NullOr(Schema.Number)),
                  kind: Schema.optional(Schema.NullOr(Schema.Literal("health", "ready"))),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    durable_objects: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          namespace_id: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    health: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          instances: Schema.optional(Schema.NullOr(Schema.Struct({}))),
        }),
      ),
    ),
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "GetcontainerapplicationResponse",
}) as unknown as Schema.Schema<GetcontainerapplicationResponse>;

export const getcontainerapplication: (
  input: GetcontainerapplicationRequest,
) => Effect.Effect<
  GetcontainerapplicationResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetcontainerapplicationRequest,
  output: GetcontainerapplicationResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));

export interface DeletecontainerapplicationRequest {
  account_id: string;
  application_id: string;
}

export const DeletecontainerapplicationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  application_id: Schema.String.pipe(T.HttpPath("application_id")),
})
  .pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/containers/applications/{application_id}",
    }),
  )
  .annotations({
    identifier: "DeletecontainerapplicationRequest",
  }) as unknown as Schema.Schema<DeletecontainerapplicationRequest>;

export interface DeletecontainerapplicationResponse {
  result: Record<string, unknown>;
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const DeletecontainerapplicationResponse = Schema.Struct({
  result: Schema.Struct({}),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "DeletecontainerapplicationResponse",
}) as unknown as Schema.Schema<DeletecontainerapplicationResponse>;

export const deletecontainerapplication: (
  input: DeletecontainerapplicationRequest,
) => Effect.Effect<
  DeletecontainerapplicationResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletecontainerapplicationRequest,
  output: DeletecontainerapplicationResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));

export interface UpdatecontainerapplicationRequest {
  account_id: string;
  application_id: string;
  body: {
    instances?: number;
    max_instances?: number;
    scheduling_policy?: string;
    configuration?: {
      image: string;
      instance_type?: string;
      vcpu?: number;
      memory?: string;
      observability?: { logs?: { enabled?: boolean } };
      ssh_public_key_ids?: string[];
      secrets?: { name?: string; type?: "env"; secret?: string }[];
      disk?: { size?: string };
      environment_variables?: { name?: string; value?: string }[];
      labels?: { name?: string; value?: string }[];
      network?: {
        assign_ipv4?: "none" | "predefined" | "account";
        assign_ipv6?: "none" | "predefined" | "account";
        mode?: "public" | "private";
      };
      command?: string[];
      entrypoint?: string[];
      dns?: { servers?: string[]; searches?: string[] };
      ports?: { name?: string; port?: number }[];
      checks?: {
        name?: string;
        type?: "http" | "tcp";
        tls?: boolean;
        port?: string;
        http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> };
        interval?: string;
        timeout?: string;
        retries?: number;
        kind?: "health" | "ready";
      }[];
    };
    constraints?: { tier?: number; region?: string; regions?: string[]; cities?: string[] };
    affinities?: { colocation?: "datacenter" };
  };
}

export const UpdatecontainerapplicationRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  application_id: Schema.String.pipe(T.HttpPath("application_id")),
  body: Schema.Struct({
    instances: Schema.optional(Schema.NullOr(Schema.Number)),
    max_instances: Schema.optional(Schema.NullOr(Schema.Number)),
    scheduling_policy: Schema.optional(Schema.NullOr(Schema.String)),
    configuration: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          image: Schema.String,
          instance_type: Schema.optional(Schema.NullOr(Schema.String)),
          vcpu: Schema.optional(Schema.NullOr(Schema.Number)),
          memory: Schema.optional(Schema.NullOr(Schema.String)),
          observability: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                logs: Schema.optional(
                  Schema.NullOr(
                    Schema.Struct({
                      enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    }),
                  ),
                ),
              }),
            ),
          ),
          ssh_public_key_ids: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          secrets: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("env"))),
                  secret: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          disk: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                size: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            ),
          ),
          environment_variables: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          labels: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          network: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                assign_ipv4: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                assign_ipv6: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                mode: Schema.optional(Schema.NullOr(Schema.Literal("public", "private"))),
              }),
            ),
          ),
          command: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          entrypoint: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          dns: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                servers: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
                searches: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
              }),
            ),
          ),
          ports: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  port: Schema.optional(Schema.NullOr(Schema.Number)),
                }),
              ),
            ),
          ),
          checks: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "tcp"))),
                  tls: Schema.optional(Schema.NullOr(Schema.Boolean)),
                  port: Schema.optional(Schema.NullOr(Schema.String)),
                  http: Schema.optional(
                    Schema.NullOr(
                      Schema.Struct({
                        method: Schema.optional(Schema.NullOr(Schema.String)),
                        body: Schema.optional(Schema.NullOr(Schema.String)),
                        path: Schema.optional(Schema.NullOr(Schema.String)),
                        headers: Schema.optional(Schema.NullOr(Schema.Struct({}))),
                      }),
                    ),
                  ),
                  interval: Schema.optional(Schema.NullOr(Schema.String)),
                  timeout: Schema.optional(Schema.NullOr(Schema.String)),
                  retries: Schema.optional(Schema.NullOr(Schema.Number)),
                  kind: Schema.optional(Schema.NullOr(Schema.Literal("health", "ready"))),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    constraints: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          tier: Schema.optional(Schema.NullOr(Schema.Number)),
          region: Schema.optional(Schema.NullOr(Schema.String)),
          regions: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          cities: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
        }),
      ),
    ),
    affinities: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          colocation: Schema.optional(Schema.NullOr(Schema.Literal("datacenter"))),
        }),
      ),
    ),
  }).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/containers/applications/{application_id}",
    }),
  )
  .annotations({
    identifier: "UpdatecontainerapplicationRequest",
  }) as unknown as Schema.Schema<UpdatecontainerapplicationRequest>;

export interface UpdatecontainerapplicationResponse {
  result: {
    id?: string;
    name?: string;
    account_id?: string;
    scheduling_policy?: string;
    instances?: number;
    max_instances?: number;
    created_at?: string;
    version?: number;
    durable_object_namespace_id?: string;
    constraints?: { tier?: number };
    configuration?: {
      image: string;
      instance_type?: string;
      vcpu?: number;
      memory?: string;
      observability?: { logs?: { enabled?: boolean } };
      ssh_public_key_ids?: string[];
      secrets?: { name?: string; type?: "env"; secret?: string }[];
      disk?: { size?: string };
      environment_variables?: { name?: string; value?: string }[];
      labels?: { name?: string; value?: string }[];
      network?: {
        assign_ipv4?: "none" | "predefined" | "account";
        assign_ipv6?: "none" | "predefined" | "account";
        mode?: "public" | "private";
      };
      command?: string[];
      entrypoint?: string[];
      dns?: { servers?: string[]; searches?: string[] };
      ports?: { name?: string; port?: number }[];
      checks?: {
        name?: string;
        type?: "http" | "tcp";
        tls?: boolean;
        port?: string;
        http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> };
        interval?: string;
        timeout?: string;
        retries?: number;
        kind?: "health" | "ready";
      }[];
    };
    durable_objects?: { namespace_id?: string };
    health?: { instances?: Record<string, unknown> };
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const UpdatecontainerapplicationResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
    name: Schema.optional(Schema.NullOr(Schema.String)),
    account_id: Schema.optional(Schema.NullOr(Schema.String)),
    scheduling_policy: Schema.optional(Schema.NullOr(Schema.String)),
    instances: Schema.optional(Schema.NullOr(Schema.Number)),
    max_instances: Schema.optional(Schema.NullOr(Schema.Number)),
    created_at: Schema.optional(Schema.NullOr(Schema.String)),
    version: Schema.optional(Schema.NullOr(Schema.Number)),
    durable_object_namespace_id: Schema.optional(Schema.NullOr(Schema.String)),
    constraints: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          tier: Schema.optional(Schema.NullOr(Schema.Number)),
        }),
      ),
    ),
    configuration: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          image: Schema.String,
          instance_type: Schema.optional(Schema.NullOr(Schema.String)),
          vcpu: Schema.optional(Schema.NullOr(Schema.Number)),
          memory: Schema.optional(Schema.NullOr(Schema.String)),
          observability: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                logs: Schema.optional(
                  Schema.NullOr(
                    Schema.Struct({
                      enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    }),
                  ),
                ),
              }),
            ),
          ),
          ssh_public_key_ids: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          secrets: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("env"))),
                  secret: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          disk: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                size: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            ),
          ),
          environment_variables: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          labels: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          network: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                assign_ipv4: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                assign_ipv6: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                mode: Schema.optional(Schema.NullOr(Schema.Literal("public", "private"))),
              }),
            ),
          ),
          command: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          entrypoint: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          dns: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                servers: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
                searches: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
              }),
            ),
          ),
          ports: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  port: Schema.optional(Schema.NullOr(Schema.Number)),
                }),
              ),
            ),
          ),
          checks: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "tcp"))),
                  tls: Schema.optional(Schema.NullOr(Schema.Boolean)),
                  port: Schema.optional(Schema.NullOr(Schema.String)),
                  http: Schema.optional(
                    Schema.NullOr(
                      Schema.Struct({
                        method: Schema.optional(Schema.NullOr(Schema.String)),
                        body: Schema.optional(Schema.NullOr(Schema.String)),
                        path: Schema.optional(Schema.NullOr(Schema.String)),
                        headers: Schema.optional(Schema.NullOr(Schema.Struct({}))),
                      }),
                    ),
                  ),
                  interval: Schema.optional(Schema.NullOr(Schema.String)),
                  timeout: Schema.optional(Schema.NullOr(Schema.String)),
                  retries: Schema.optional(Schema.NullOr(Schema.Number)),
                  kind: Schema.optional(Schema.NullOr(Schema.Literal("health", "ready"))),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    durable_objects: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          namespace_id: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    health: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          instances: Schema.optional(Schema.NullOr(Schema.Struct({}))),
        }),
      ),
    ),
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "UpdatecontainerapplicationResponse",
}) as unknown as Schema.Schema<UpdatecontainerapplicationResponse>;

export const updatecontainerapplication: (
  input: UpdatecontainerapplicationRequest,
) => Effect.Effect<
  UpdatecontainerapplicationResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatecontainerapplicationRequest,
  output: UpdatecontainerapplicationResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));

export interface CreatecontainerapplicationrolloutRequest {
  account_id: string;
  application_id: string;
  body: {
    description: string;
    strategy: "rolling";
    kind?: "full_auto";
    step_percentage: number;
    target_configuration: {
      image: string;
      instance_type?: string;
      vcpu?: number;
      memory?: string;
      observability?: { logs?: { enabled?: boolean } };
      ssh_public_key_ids?: string[];
      secrets?: { name?: string; type?: "env"; secret?: string }[];
      disk?: { size?: string };
      environment_variables?: { name?: string; value?: string }[];
      labels?: { name?: string; value?: string }[];
      network?: {
        assign_ipv4?: "none" | "predefined" | "account";
        assign_ipv6?: "none" | "predefined" | "account";
        mode?: "public" | "private";
      };
      command?: string[];
      entrypoint?: string[];
      dns?: { servers?: string[]; searches?: string[] };
      ports?: { name?: string; port?: number }[];
      checks?: {
        name?: string;
        type?: "http" | "tcp";
        tls?: boolean;
        port?: string;
        http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> };
        interval?: string;
        timeout?: string;
        retries?: number;
        kind?: "health" | "ready";
      }[];
    };
  };
}

export const CreatecontainerapplicationrolloutRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  application_id: Schema.String.pipe(T.HttpPath("application_id")),
  body: Schema.Struct({
    description: Schema.String,
    strategy: Schema.Literal("rolling"),
    kind: Schema.optional(Schema.NullOr(Schema.Literal("full_auto"))),
    step_percentage: Schema.Number,
    target_configuration: Schema.Struct({
      image: Schema.String,
      instance_type: Schema.optional(Schema.NullOr(Schema.String)),
      vcpu: Schema.optional(Schema.NullOr(Schema.Number)),
      memory: Schema.optional(Schema.NullOr(Schema.String)),
      observability: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            logs: Schema.optional(
              Schema.NullOr(
                Schema.Struct({
                  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                }),
              ),
            ),
          }),
        ),
      ),
      ssh_public_key_ids: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      secrets: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              type: Schema.optional(Schema.NullOr(Schema.Literal("env"))),
              secret: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        ),
      ),
      disk: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            size: Schema.optional(Schema.NullOr(Schema.String)),
          }),
        ),
      ),
      environment_variables: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              value: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        ),
      ),
      labels: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              value: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        ),
      ),
      network: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            assign_ipv4: Schema.optional(
              Schema.NullOr(Schema.Literal("none", "predefined", "account")),
            ),
            assign_ipv6: Schema.optional(
              Schema.NullOr(Schema.Literal("none", "predefined", "account")),
            ),
            mode: Schema.optional(Schema.NullOr(Schema.Literal("public", "private"))),
          }),
        ),
      ),
      command: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      entrypoint: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
      dns: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            servers: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
            searches: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          }),
        ),
      ),
      ports: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              port: Schema.optional(Schema.NullOr(Schema.Number)),
            }),
          ),
        ),
      ),
      checks: Schema.optional(
        Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.NullOr(Schema.String)),
              type: Schema.optional(Schema.NullOr(Schema.Literal("http", "tcp"))),
              tls: Schema.optional(Schema.NullOr(Schema.Boolean)),
              port: Schema.optional(Schema.NullOr(Schema.String)),
              http: Schema.optional(
                Schema.NullOr(
                  Schema.Struct({
                    method: Schema.optional(Schema.NullOr(Schema.String)),
                    body: Schema.optional(Schema.NullOr(Schema.String)),
                    path: Schema.optional(Schema.NullOr(Schema.String)),
                    headers: Schema.optional(Schema.NullOr(Schema.Struct({}))),
                  }),
                ),
              ),
              interval: Schema.optional(Schema.NullOr(Schema.String)),
              timeout: Schema.optional(Schema.NullOr(Schema.String)),
              retries: Schema.optional(Schema.NullOr(Schema.Number)),
              kind: Schema.optional(Schema.NullOr(Schema.Literal("health", "ready"))),
            }),
          ),
        ),
      ),
    }),
  }).pipe(T.HttpBody()),
})
  .pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/containers/applications/{application_id}/rollouts",
    }),
  )
  .annotations({
    identifier: "CreatecontainerapplicationrolloutRequest",
  }) as unknown as Schema.Schema<CreatecontainerapplicationrolloutRequest>;

export interface CreatecontainerapplicationrolloutResponse {
  result: {
    id?: string;
    created_at?: string;
    last_updated_at?: string;
    description?: string;
    status?: string;
    kind?: string;
    strategy?: string;
    current_version?: number;
    target_version?: number;
    health?: {
      instances?: { healthy?: number; failed?: number; starting?: number; scheduling?: number };
    };
    current_configuration?: { image?: string; observability?: Record<string, unknown> };
    target_configuration?: {
      image: string;
      instance_type?: string;
      vcpu?: number;
      memory?: string;
      observability?: { logs?: { enabled?: boolean } };
      ssh_public_key_ids?: string[];
      secrets?: { name?: string; type?: "env"; secret?: string }[];
      disk?: { size?: string };
      environment_variables?: { name?: string; value?: string }[];
      labels?: { name?: string; value?: string }[];
      network?: {
        assign_ipv4?: "none" | "predefined" | "account";
        assign_ipv6?: "none" | "predefined" | "account";
        mode?: "public" | "private";
      };
      command?: string[];
      entrypoint?: string[];
      dns?: { servers?: string[]; searches?: string[] };
      ports?: { name?: string; port?: number }[];
      checks?: {
        name?: string;
        type?: "http" | "tcp";
        tls?: boolean;
        port?: string;
        http?: { method?: string; body?: string; path?: string; headers?: Record<string, unknown> };
        interval?: string;
        timeout?: string;
        retries?: number;
        kind?: "health" | "ready";
      }[];
    };
    steps?: {
      id?: number;
      status?: string;
      step_size?: { percentage?: number };
      description?: string;
      started_at?: string;
    }[];
    progress?: {
      total_steps?: number;
      current_step?: number;
      updated_instances?: number;
      total_instances?: number;
    };
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const CreatecontainerapplicationrolloutResponse = Schema.Struct({
  result: Schema.Struct({
    id: Schema.optional(Schema.NullOr(Schema.String)),
    created_at: Schema.optional(Schema.NullOr(Schema.String)),
    last_updated_at: Schema.optional(Schema.NullOr(Schema.String)),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    status: Schema.optional(Schema.NullOr(Schema.String)),
    kind: Schema.optional(Schema.NullOr(Schema.String)),
    strategy: Schema.optional(Schema.NullOr(Schema.String)),
    current_version: Schema.optional(Schema.NullOr(Schema.Number)),
    target_version: Schema.optional(Schema.NullOr(Schema.Number)),
    health: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          instances: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                healthy: Schema.optional(Schema.NullOr(Schema.Number)),
                failed: Schema.optional(Schema.NullOr(Schema.Number)),
                starting: Schema.optional(Schema.NullOr(Schema.Number)),
                scheduling: Schema.optional(Schema.NullOr(Schema.Number)),
              }),
            ),
          ),
        }),
      ),
    ),
    current_configuration: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          image: Schema.optional(Schema.NullOr(Schema.String)),
          observability: Schema.optional(Schema.NullOr(Schema.Struct({}))),
        }),
      ),
    ),
    target_configuration: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          image: Schema.String,
          instance_type: Schema.optional(Schema.NullOr(Schema.String)),
          vcpu: Schema.optional(Schema.NullOr(Schema.Number)),
          memory: Schema.optional(Schema.NullOr(Schema.String)),
          observability: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                logs: Schema.optional(
                  Schema.NullOr(
                    Schema.Struct({
                      enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
                    }),
                  ),
                ),
              }),
            ),
          ),
          ssh_public_key_ids: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          secrets: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("env"))),
                  secret: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          disk: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                size: Schema.optional(Schema.NullOr(Schema.String)),
              }),
            ),
          ),
          environment_variables: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          labels: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  value: Schema.optional(Schema.NullOr(Schema.String)),
                }),
              ),
            ),
          ),
          network: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                assign_ipv4: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                assign_ipv6: Schema.optional(
                  Schema.NullOr(Schema.Literal("none", "predefined", "account")),
                ),
                mode: Schema.optional(Schema.NullOr(Schema.Literal("public", "private"))),
              }),
            ),
          ),
          command: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          entrypoint: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          dns: Schema.optional(
            Schema.NullOr(
              Schema.Struct({
                servers: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
                searches: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
              }),
            ),
          ),
          ports: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  port: Schema.optional(Schema.NullOr(Schema.Number)),
                }),
              ),
            ),
          ),
          checks: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.NullOr(Schema.String)),
                  type: Schema.optional(Schema.NullOr(Schema.Literal("http", "tcp"))),
                  tls: Schema.optional(Schema.NullOr(Schema.Boolean)),
                  port: Schema.optional(Schema.NullOr(Schema.String)),
                  http: Schema.optional(
                    Schema.NullOr(
                      Schema.Struct({
                        method: Schema.optional(Schema.NullOr(Schema.String)),
                        body: Schema.optional(Schema.NullOr(Schema.String)),
                        path: Schema.optional(Schema.NullOr(Schema.String)),
                        headers: Schema.optional(Schema.NullOr(Schema.Struct({}))),
                      }),
                    ),
                  ),
                  interval: Schema.optional(Schema.NullOr(Schema.String)),
                  timeout: Schema.optional(Schema.NullOr(Schema.String)),
                  retries: Schema.optional(Schema.NullOr(Schema.Number)),
                  kind: Schema.optional(Schema.NullOr(Schema.Literal("health", "ready"))),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    steps: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.NullOr(Schema.Number)),
            status: Schema.optional(Schema.NullOr(Schema.String)),
            step_size: Schema.optional(
              Schema.NullOr(
                Schema.Struct({
                  percentage: Schema.optional(Schema.NullOr(Schema.Number)),
                }),
              ),
            ),
            description: Schema.optional(Schema.NullOr(Schema.String)),
            started_at: Schema.optional(Schema.NullOr(Schema.String)),
          }),
        ),
      ),
    ),
    progress: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          total_steps: Schema.optional(Schema.NullOr(Schema.Number)),
          current_step: Schema.optional(Schema.NullOr(Schema.Number)),
          updated_instances: Schema.optional(Schema.NullOr(Schema.Number)),
          total_instances: Schema.optional(Schema.NullOr(Schema.Number)),
        }),
      ),
    ),
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "CreatecontainerapplicationrolloutResponse",
}) as unknown as Schema.Schema<CreatecontainerapplicationrolloutResponse>;

export const createcontainerapplicationrollout: (
  input: CreatecontainerapplicationrolloutRequest,
) => Effect.Effect<
  CreatecontainerapplicationrolloutResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatecontainerapplicationrolloutRequest,
  output: CreatecontainerapplicationrolloutResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));

export interface GetcontaineridentityRequest {
  account_id: string;
}

export const GetcontaineridentityRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
})
  .pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/containers/me" }))
  .annotations({
    identifier: "GetcontaineridentityRequest",
  }) as unknown as Schema.Schema<GetcontaineridentityRequest>;

export interface GetcontaineridentityResponse {
  result: {
    account_id?: string;
    external_account_id?: string;
    legacy_identity?: string;
    capabilities?: string[];
    limits?: {
      account_id?: string;
      vcpu_per_deployment?: number;
      memory_mib_per_deployment?: number;
      memory_per_deployment?: string;
      disk_per_deployment?: string;
      disk_mb_per_deployment?: number;
      total_vcpu?: number;
      total_memory_mib?: number;
      node_group?: string;
      ipv4s?: number;
      network_modes?: string[];
      total_disk_mb?: number;
      total_memory?: string;
    };
    locations?: Record<string, unknown>[];
    defaults?: { vcpus?: number; memory_mib?: number; memory?: string; disk_mb?: number };
  };
  result_info?: {
    page?: number;
    per_page?: number;
    count?: number;
    total_count?: number;
    cursor?: string;
  };
}

export const GetcontaineridentityResponse = Schema.Struct({
  result: Schema.Struct({
    account_id: Schema.optional(Schema.NullOr(Schema.String)),
    external_account_id: Schema.optional(Schema.NullOr(Schema.String)),
    legacy_identity: Schema.optional(Schema.NullOr(Schema.String)),
    capabilities: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
    limits: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          account_id: Schema.optional(Schema.NullOr(Schema.String)),
          vcpu_per_deployment: Schema.optional(Schema.NullOr(Schema.Number)),
          memory_mib_per_deployment: Schema.optional(Schema.NullOr(Schema.Number)),
          memory_per_deployment: Schema.optional(Schema.NullOr(Schema.String)),
          disk_per_deployment: Schema.optional(Schema.NullOr(Schema.String)),
          disk_mb_per_deployment: Schema.optional(Schema.NullOr(Schema.Number)),
          total_vcpu: Schema.optional(Schema.NullOr(Schema.Number)),
          total_memory_mib: Schema.optional(Schema.NullOr(Schema.Number)),
          node_group: Schema.optional(Schema.NullOr(Schema.String)),
          ipv4s: Schema.optional(Schema.NullOr(Schema.Number)),
          network_modes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
          total_disk_mb: Schema.optional(Schema.NullOr(Schema.Number)),
          total_memory: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    locations: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
    defaults: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          vcpus: Schema.optional(Schema.NullOr(Schema.Number)),
          memory_mib: Schema.optional(Schema.NullOr(Schema.Number)),
          memory: Schema.optional(Schema.NullOr(Schema.String)),
          disk_mb: Schema.optional(Schema.NullOr(Schema.Number)),
        }),
      ),
    ),
  }),
  result_info: Schema.optional(
    Schema.Struct({
      page: Schema.optional(Schema.Number),
      per_page: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      total_count: Schema.optional(Schema.Number),
      cursor: Schema.optional(Schema.String),
    }),
  ),
}).annotations({
  identifier: "GetcontaineridentityResponse",
}) as unknown as Schema.Schema<GetcontaineridentityResponse>;

export const getcontaineridentity: (
  input: GetcontaineridentityRequest,
) => Effect.Effect<
  GetcontaineridentityResponse,
  | RateLimited
  | TooManyRequests
  | AuthenticationError
  | InvalidToken
  | MissingToken
  | TokenExpired
  | Unauthorized
  | CloudflareError
  | UnknownCloudflareError
  | CloudflareNetworkError
  | CloudflareHttpError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetcontaineridentityRequest,
  output: GetcontaineridentityResponse,
  errors: [
    RateLimited.pipe(T.HttpErrorCode(971)),
    TooManyRequests.pipe(T.HttpErrorCode(6100)),
    AuthenticationError.pipe(T.HttpErrorCode(10000)),
    InvalidToken.pipe(T.HttpErrorCode(9103)),
    MissingToken.pipe(T.HttpErrorCode(9106)),
    TokenExpired.pipe(T.HttpErrorCode(9109)),
    Unauthorized.pipe(T.HttpErrorCode(9000)),
  ],
}));
