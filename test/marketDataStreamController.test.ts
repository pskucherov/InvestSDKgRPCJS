import assert from 'node:assert/strict';
import test from 'node:test';
import {
  OrderBookType,
  SubscriptionAction,
  SubscriptionInterval,
  TradeSourceType,
} from '../src/generated/marketdata';
import { createMarketDataStreamController } from '../src/marketDataStreamController';

const wait = async (ms = 0): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, ms));
};

const createFakeMarketDataClient = () => {
  const requests: any[] = [];
  let returnCalls = 0;
  let resolveQueueClosed: (() => void) | undefined;
  const queueClosed = new Promise<void>(resolve => {
    resolveQueueClosed = resolve;
  });

  let streamClosed = false;
  const response = {
    async *[Symbol.asyncIterator]() {
      while (!streamClosed) {
        await wait(5);
      }
    },
    async return() {
      returnCalls += 1;
      streamClosed = true;
      if (resolveQueueClosed) {
        resolveQueueClosed();
      }

      return {
        value: undefined,
        done: true,
      };
    },
  };

  return {
    client: {
      marketDataStream(request: AsyncIterable<any>) {
        void (async () => {
          for await (const payload of request) {
            requests.push(payload);
          }
          streamClosed = true;
          if (resolveQueueClosed) {
            resolveQueueClosed();
          }
        })();

        return response as any;
      },
    },
    requests,
    getReturnCalls: () => returnCalls,
    queueClosed,
  };
};

test('controller sends typed subscribe/unsubscribe requests with instrumentId', async () => {
  const fake = createFakeMarketDataClient();
  const controller = createMarketDataStreamController(fake.client);

  controller.subscribeLastPrice(['instrument-1', 'instrument-2']);
  controller.subscribeCandles('instrument-1', {
    interval: SubscriptionInterval.SUBSCRIPTION_INTERVAL_FIVE_MINUTES,
    waitingClose: true,
  });
  controller.unsubscribeLastPrice('instrument-1');
  controller.subscribeTrades('instrument-1', {
    tradeSource: TradeSourceType.TRADE_SOURCE_ALL,
    withOpenInterest: true,
  });

  await wait(20);

  const subscribeLastPrice = fake.requests.find(item => {
    return item.subscribeLastPriceRequest?.subscriptionAction === SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE;
  });
  const candlesRequest = fake.requests.find(item => {
    return item.subscribeCandlesRequest?.subscriptionAction === SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE;
  });
  const unsubscribeLastPrice = fake.requests.find(item => {
    return item.subscribeLastPriceRequest?.subscriptionAction === SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE;
  });
  const tradesRequest = fake.requests.find(item => {
    return item.subscribeTradesRequest?.subscriptionAction === SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE;
  });

  assert.ok(subscribeLastPrice);
  assert.equal(subscribeLastPrice.subscribeLastPriceRequest.instruments[0].instrumentId, 'instrument-1');
  assert.equal(candlesRequest.subscribeCandlesRequest.instruments[0].instrumentId, 'instrument-1');
  assert.equal(candlesRequest.subscribeCandlesRequest.waitingClose, true);
  assert.equal(unsubscribeLastPrice.subscribeLastPriceRequest.instruments[0].instrumentId, 'instrument-1');
  assert.equal(tradesRequest.subscribeTradesRequest.withOpenInterest, true);

  await controller.close();
  await fake.queueClosed;
});

test('controller close sends graceful unsubscribe and closes stream once', async () => {
  const fake = createFakeMarketDataClient();
  const controller = createMarketDataStreamController(fake.client, {
    closeGraceMs: 0,
  });

  controller.subscribeLastPrice('instrument-2');
  controller.subscribeOrderBook('instrument-2', {
    depth: 20,
    orderBookType: OrderBookType.ORDERBOOK_TYPE_ALL,
  });

  await wait(20);

  await controller.close();
  await controller.close();
  await fake.queueClosed;

  const unsubscribeLastPrice = fake.requests.find(item => {
    return item.subscribeLastPriceRequest?.subscriptionAction === SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE;
  });
  const unsubscribeOrderBook = fake.requests.find(item => {
    return item.subscribeOrderBookRequest?.subscriptionAction === SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE;
  });

  assert.ok(unsubscribeLastPrice);
  assert.ok(unsubscribeOrderBook);
  assert.equal(fake.getReturnCalls(), 1);

  assert.throws(() => {
    controller.send({
      getMySubscriptions: {},
    });
  }, /closed/);
});

test('controller close is idempotent for concurrent calls', async () => {
  const fake = createFakeMarketDataClient();
  const controller = createMarketDataStreamController(fake.client, {
    closeGraceMs: 0,
  });

  controller.subscribeLastPrice('instrument-3');
  await wait(20);

  const results = await Promise.allSettled([controller.close(), controller.close()]);
  await fake.queueClosed;

  assert.deepEqual(
    results.map(item => item.status),
    ['fulfilled', 'fulfilled'],
  );
  assert.equal(fake.getReturnCalls(), 1);
});
