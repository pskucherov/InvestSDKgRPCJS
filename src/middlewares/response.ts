import { ClientError, ClientMiddlewareCall, Status, CallOptions, Metadata } from 'nice-grpc';
import { errorStatus, ErrorMessagesType } from '../errors/apiErrors';

type ErrorTrailers = {
  trackId?: string;
  message?: string;
  rateLimit?: string;
  rateLimitRemaining?: string;
  rateLimitReset?: string;
};
export type TypeLoggerCb = (
  errorMetadata: ErrorTrailers,
  error: ClientError | unknown,
  messages?: ErrorMessagesType,
  context?: {
    path: string;
    code?: string;
    details?: string;
  },
) => void;

export type MiddlewareOptions = {
  swallowErrors?: boolean;
};

const normalizeMetadataValue = (value: string | Uint8Array | undefined): string | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  let decoded = '';

  for (let i = 0; i < value.length; i++) {
    decoded += String.fromCharCode(value[i]);
  }

  return decoded;
};

const getErrorByDetails = (details?: string): ErrorMessagesType | undefined => {
  if (!details) {
    return undefined;
  }

  if (errorStatus[details]) {
    return errorStatus[details];
  }

  const numericCode = details.match(/\b(\d{3,6})\b/)?.[1];

  if (numericCode && errorStatus[numericCode]) {
    return errorStatus[numericCode];
  }

  return undefined;
};

export function getMiddleware(loggerCb?: TypeLoggerCb, middlewareOptions?: MiddlewareOptions) {
  return async function* <Request, Response>(call: ClientMiddlewareCall<Request, Response>, options: CallOptions) {
    const { path } = call.method;

    const errorMetadata: ErrorTrailers = {};
    const userOnTrailer = options.onTrailer;

    options.onTrailer = (data: Metadata) => {
      Object.assign(errorMetadata, {
        trackId: normalizeMetadataValue(data.get('x-tracking-id')),
        message: normalizeMetadataValue(data.get('message')),
        rateLimit: normalizeMetadataValue(data.get('x-ratelimit-limit')),
        rateLimitRemaining: normalizeMetadataValue(data.get('x-ratelimit-remaining')),
        rateLimitReset: normalizeMetadataValue(data.get('x-ratelimit-reset')),
      });

      if (userOnTrailer) {
        userOnTrailer(data);
      }
    };

    try {
      if (!call.responseStream) {
        return yield* call.next(call.request, options);
      } else {
        for await (const response of call.next(call.request, options)) {
          yield response;
        }

        return;
      }
    } catch (error) {
      const isClientError = error instanceof ClientError;
      const errStatus = isClientError ? getErrorByDetails(error.details) : undefined;
      const logContext = {
        path,
        code: isClientError ? Status[error.code] : undefined,
        details: isClientError ? error.details : undefined,
      };

      if (loggerCb) {
        loggerCb(errorMetadata, error, errStatus, logContext);
      } else {
        console.log('[tinkoff-sdk-grpc-js] grpc_error', {
          ...errorMetadata,
          ...logContext,
          description: errStatus?.description,
          error: isClientError ? undefined : String(error),
        });
      }

      if (!middlewareOptions?.swallowErrors) {
        throw error;
      }
    }
  };
}
