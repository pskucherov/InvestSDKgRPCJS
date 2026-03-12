import assert from 'node:assert/strict';
import test from 'node:test';
import { ClientError, Status } from 'nice-grpc-common';
import { getMiddleware } from '../src/middlewares/response';

test('middleware propagates unary client errors and enriches logger context', async () => {
  const loggerCalls: Array<{
    metadata: Record<string, unknown>;
    error: unknown;
    description: { description: string } | undefined;
    context: { path: string; code?: string; details?: string } | undefined;
  }> = [];

  const middleware = getMiddleware((metadata, error, description, context) => {
    loggerCalls.push({
      metadata: metadata as Record<string, unknown>,
      error,
      description: description as { description: string } | undefined,
      context: context as { path: string; code?: string; details?: string } | undefined,
    });
  });

  const call: any = {
    method: {
      path: '/tinkoff.public.invest.api.contract.v1.UsersService/GetInfo',
    },
    responseStream: false,
    request: {},
    next: async function* (_request: unknown, options: any) {
      options.onTrailer?.({
        get: (key: string) => {
          if (key === 'x-tracking-id') {
            return 'track-1';
          }
          if (key === 'message') {
            return 'validation error';
          }
        },
      });
      throw new ClientError('/tinkoff.public.invest.api.contract.v1.UsersService/GetInfo', Status.INVALID_ARGUMENT, 'INVALID_ARGUMENT: 30021');
    },
  };

  const iterator = middleware(call, {});

  await assert.rejects(async () => {
    await iterator.next();
  }, /30021/);

  assert.equal(loggerCalls.length, 1);
  assert.equal(loggerCalls[0].description?.description.includes('account_id'), true);
  assert.equal(loggerCalls[0].context?.path, '/tinkoff.public.invest.api.contract.v1.UsersService/GetInfo');
  assert.equal(loggerCalls[0].context?.code, 'INVALID_ARGUMENT');
  assert.equal(loggerCalls[0].context?.details, 'INVALID_ARGUMENT: 30021');
  assert.equal(loggerCalls[0].metadata.trackId, 'track-1');
});

test('middleware preserves streamed responses and propagates stream errors', async () => {
  const middleware = getMiddleware(() => {
    // no-op
  });
  const call: any = {
    method: {
      path: '/service/stream',
    },
    responseStream: true,
    request: {},
    next: async function* () {
      yield { payload: 1 };
      throw new Error('stream failure');
    },
  };

  const iterator = middleware(call, {});
  const first = await iterator.next();

  assert.deepEqual(first, {
    value: { payload: 1 },
    done: false,
  });

  await assert.rejects(async () => {
    await iterator.next();
  }, /stream failure/);
});

test('middleware chains user trailer callback and can swallow errors explicitly', async () => {
  const middleware = getMiddleware(
    () => {
      // no-op
    },
    {
    swallowErrors: true,
    },
  );

  let trailerCalled = 0;
  const call: any = {
    method: {
      path: '/service/unary',
    },
    responseStream: false,
    request: {},
    next: async function* (_request: unknown, options: any) {
      options.onTrailer?.({
        get: (key: string) => {
          if (key === 'x-tracking-id') {
            return 'track-2';
          }
        },
      });

      throw new Error('should be swallowed');
    },
  };

  const iterator = middleware(call, {
    onTrailer: () => {
      trailerCalled += 1;
    },
  });

  const result = await iterator.next();

  assert.equal(trailerCalled, 1);
  assert.deepEqual(result, {
    value: undefined,
    done: true,
  });
});
