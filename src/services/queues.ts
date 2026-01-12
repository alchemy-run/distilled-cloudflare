/**
 * Cloudflare Queues API
 *
 * Operations for managing Cloudflare Queues.
 *
 * @example
 * ```typescript
 * import { Effect } from "effect";
 * import * as Queues from "distilled-cloudflare/queues";
 *
 * const program = Effect.gen(function* () {
 *   const queues = yield* Queues.listQueues({
 *     account_id: "your-account-id",
 *   });
 *   return queues;
 * });
 * ```
 */

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";

// =============================================================================
// Shared Types
// =============================================================================

export const QueueConsumerSettings = Schema.Struct({
  batch_size: Schema.optional(Schema.Number),
  max_retries: Schema.optional(Schema.Number),
  max_wait_time_ms: Schema.optional(Schema.Number),
  max_concurrency: Schema.optional(Schema.Number),
  visibility_timeout_ms: Schema.optional(Schema.Number),
  retry_delay: Schema.optional(Schema.Number),
});
export type QueueConsumerSettings = typeof QueueConsumerSettings.Type;

export const QueueConsumer = Schema.Struct({
  consumer_id: Schema.optional(Schema.String),
  script: Schema.optional(Schema.String),
  script_name: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("worker", "http_pull")),
  settings: Schema.optional(QueueConsumerSettings),
  dead_letter_queue: Schema.optional(Schema.String),
  created_on: Schema.optional(Schema.String),
});
export type QueueConsumer = typeof QueueConsumer.Type;

export const QueueProducerSettings = Schema.Struct({
  batch_size: Schema.optional(Schema.Number),
});
export type QueueProducerSettings = typeof QueueProducerSettings.Type;

export const QueueProducer = Schema.Struct({
  script: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
});
export type QueueProducer = typeof QueueProducer.Type;

export const Queue = Schema.Struct({
  queue_id: Schema.String,
  queue_name: Schema.String,
  created_on: Schema.optional(Schema.String),
  modified_on: Schema.optional(Schema.String),
  producers: Schema.optional(Schema.Array(QueueProducer)),
  consumers: Schema.optional(Schema.Array(QueueConsumer)),
  producers_total_count: Schema.optional(Schema.Number),
  consumers_total_count: Schema.optional(Schema.Number),
  settings: Schema.optional(Schema.Struct({
    delivery_delay: Schema.optional(Schema.Number),
  })),
});
export type Queue = typeof Queue.Type;

export const ResultInfo = Schema.Struct({
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  total_count: Schema.optional(Schema.Number),
  cursor: Schema.optional(Schema.String),
});
export type ResultInfo = typeof ResultInfo.Type;

// =============================================================================
// List Queues
// =============================================================================

export const ListQueuesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/queues" }));
export type ListQueuesRequest = typeof ListQueuesRequest.Type;

export const ListQueuesResponse = Schema.Struct({
  result: Schema.Array(Queue),
  result_info: Schema.optional(ResultInfo),
});
export type ListQueuesResponse = typeof ListQueuesResponse.Type;

export const listQueues = API.make(() => ({
  input: ListQueuesRequest,
  output: ListQueuesResponse,
  errors: [],
}));

// =============================================================================
// Create Queue
// =============================================================================

export const CreateQueueRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_name: Schema.String,
  settings: Schema.optional(Schema.Struct({
    delivery_delay: Schema.optional(Schema.Number),
  })),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/queues" }));
export type CreateQueueRequest = typeof CreateQueueRequest.Type;

export const CreateQueueResponse = Schema.Struct({
  result: Queue,
});
export type CreateQueueResponse = typeof CreateQueueResponse.Type;

export const createQueue = API.make(() => ({
  input: CreateQueueRequest,
  output: CreateQueueResponse,
  errors: [],
}));

// =============================================================================
// Get Queue
// =============================================================================

export const GetQueueRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/queues/{queue_id}" }));
export type GetQueueRequest = typeof GetQueueRequest.Type;

export const GetQueueResponse = Schema.Struct({
  result: Queue,
});
export type GetQueueResponse = typeof GetQueueResponse.Type;

export const getQueue = API.make(() => ({
  input: GetQueueRequest,
  output: GetQueueResponse,
  errors: [],
}));

// =============================================================================
// Update Queue
// =============================================================================

export const UpdateQueueRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  queue_name: Schema.optional(Schema.String),
  settings: Schema.optional(Schema.Struct({
    delivery_delay: Schema.optional(Schema.Number),
  })),
}).pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/queues/{queue_id}" }));
export type UpdateQueueRequest = typeof UpdateQueueRequest.Type;

export const UpdateQueueResponse = Schema.Struct({
  result: Queue,
});
export type UpdateQueueResponse = typeof UpdateQueueResponse.Type;

export const updateQueue = API.make(() => ({
  input: UpdateQueueRequest,
  output: UpdateQueueResponse,
  errors: [],
}));

// =============================================================================
// Delete Queue
// =============================================================================

export const DeleteQueueRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/queues/{queue_id}" }));
export type DeleteQueueRequest = typeof DeleteQueueRequest.Type;

export const DeleteQueueResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteQueueResponse = typeof DeleteQueueResponse.Type;

export const deleteQueue = API.make(() => ({
  input: DeleteQueueRequest,
  output: DeleteQueueResponse,
  errors: [],
}));

// =============================================================================
// List Queue Consumers
// =============================================================================

export const ListConsumersRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
}).pipe(T.Http({ method: "GET", path: "/accounts/{account_id}/queues/{queue_id}/consumers" }));
export type ListConsumersRequest = typeof ListConsumersRequest.Type;

export const ListConsumersResponse = Schema.Struct({
  result: Schema.Array(QueueConsumer),
});
export type ListConsumersResponse = typeof ListConsumersResponse.Type;

export const listConsumers = API.make(() => ({
  input: ListConsumersRequest,
  output: ListConsumersResponse,
  errors: [],
}));

// =============================================================================
// Create Queue Consumer
// =============================================================================

export const CreateConsumerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  script_name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literal("worker", "http_pull")),
  settings: Schema.optional(QueueConsumerSettings),
  dead_letter_queue: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/consumers" }));
export type CreateConsumerRequest = typeof CreateConsumerRequest.Type;

export const CreateConsumerResponse = Schema.Struct({
  result: QueueConsumer,
});
export type CreateConsumerResponse = typeof CreateConsumerResponse.Type;

export const createConsumer = API.make(() => ({
  input: CreateConsumerRequest,
  output: CreateConsumerResponse,
  errors: [],
}));

// =============================================================================
// Update Queue Consumer
// =============================================================================

export const UpdateConsumerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  consumer_id: Schema.String.pipe(T.HttpPath("consumer_id")),
  settings: Schema.optional(QueueConsumerSettings),
  dead_letter_queue: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "PUT", path: "/accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}" }));
export type UpdateConsumerRequest = typeof UpdateConsumerRequest.Type;

export const UpdateConsumerResponse = Schema.Struct({
  result: QueueConsumer,
});
export type UpdateConsumerResponse = typeof UpdateConsumerResponse.Type;

export const updateConsumer = API.make(() => ({
  input: UpdateConsumerRequest,
  output: UpdateConsumerResponse,
  errors: [],
}));

// =============================================================================
// Delete Queue Consumer
// =============================================================================

export const DeleteConsumerRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  consumer_id: Schema.String.pipe(T.HttpPath("consumer_id")),
}).pipe(T.Http({ method: "DELETE", path: "/accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}" }));
export type DeleteConsumerRequest = typeof DeleteConsumerRequest.Type;

export const DeleteConsumerResponse = Schema.Struct({
  result: Schema.optional(Schema.Unknown),
});
export type DeleteConsumerResponse = typeof DeleteConsumerResponse.Type;

export const deleteConsumer = API.make(() => ({
  input: DeleteConsumerRequest,
  output: DeleteConsumerResponse,
  errors: [],
}));

// =============================================================================
// Send Messages to Queue (via HTTP API batch endpoint)
// =============================================================================

export const QueueMessage = Schema.Struct({
  body: Schema.Unknown,
  // Content type: "text", "json", "bytes", or "v8"
  content_type: Schema.optional(Schema.Literal("text", "json", "bytes", "v8")),
  delay_seconds: Schema.optional(Schema.Number),
});
export type QueueMessage = typeof QueueMessage.Type;

export const SendMessageRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  messages: Schema.Array(QueueMessage),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/messages/batch" }));
export type SendMessageRequest = typeof SendMessageRequest.Type;

export const SendMessageResult = Schema.Struct({
  message_id: Schema.optional(Schema.String),
});
export type SendMessageResult = typeof SendMessageResult.Type;

// The API returns result: null on success for batch sends
export const SendMessageResponse = Schema.Struct({
  result: Schema.NullOr(Schema.Array(SendMessageResult)),
});
export type SendMessageResponse = typeof SendMessageResponse.Type;

export const sendMessages = API.make(() => ({
  input: SendMessageRequest,
  output: SendMessageResponse,
  errors: [],
}));

// =============================================================================
// Pull Messages from Queue (HTTP Pull Consumer)
// =============================================================================

export const PullMessagesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  batch_size: Schema.optional(Schema.Number),
  visibility_timeout_ms: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/messages/pull" }));
export type PullMessagesRequest = typeof PullMessagesRequest.Type;

export const PulledMessage = Schema.Struct({
  id: Schema.String,
  body: Schema.Unknown,
  timestamp_ms: Schema.optional(Schema.Number),
  attempts: Schema.optional(Schema.Number),
  lease_id: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Unknown),
});
export type PulledMessage = typeof PulledMessage.Type;

export const PullMessagesResponse = Schema.Struct({
  result: Schema.Struct({
    messages: Schema.Array(PulledMessage),
  }),
});
export type PullMessagesResponse = typeof PullMessagesResponse.Type;

export const pullMessages = API.make(() => ({
  input: PullMessagesRequest,
  output: PullMessagesResponse,
  errors: [],
}));

// =============================================================================
// Acknowledge Messages
// =============================================================================

export const AckMessagesRequest = Schema.Struct({
  account_id: Schema.String.pipe(T.HttpPath("account_id")),
  queue_id: Schema.String.pipe(T.HttpPath("queue_id")),
  acks: Schema.optional(Schema.Array(Schema.Struct({
    lease_id: Schema.String,
  }))),
  retries: Schema.optional(Schema.Array(Schema.Struct({
    lease_id: Schema.String,
    delay_seconds: Schema.optional(Schema.Number),
  }))),
}).pipe(T.Http({ method: "POST", path: "/accounts/{account_id}/queues/{queue_id}/messages/ack" }));
export type AckMessagesRequest = typeof AckMessagesRequest.Type;

export const AckMessagesResponse = Schema.Struct({
  result: Schema.Struct({
    ackCount: Schema.optional(Schema.Number),
    retryCount: Schema.optional(Schema.Number),
  }),
});
export type AckMessagesResponse = typeof AckMessagesResponse.Type;

export const ackMessages = API.make(() => ({
  input: AckMessagesRequest,
  output: AckMessagesResponse,
  errors: [],
}));
