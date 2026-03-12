import { CallOptions } from 'nice-grpc';
import {
  DeepPartial,
  GetCandlesRequest_CandleSource,
  MarketDataRequest,
  MarketDataResponse,
  OrderBookType,
  SubscriptionAction,
  SubscriptionInterval,
  TradeSourceType,
} from './generated/marketdata';

type MaybeClosableAsyncIterable<T> = AsyncIterable<T> & {
  return?: (value?: unknown) => Promise<unknown>;
};

type MarketDataStreamClient = {
  marketDataStream(
    request: AsyncIterable<DeepPartial<MarketDataRequest>>,
    options?: CallOptions,
  ): MaybeClosableAsyncIterable<MarketDataResponse>;
};

type RequestQueue = {
  iterable: AsyncIterable<DeepPartial<MarketDataRequest>>;
  push: (request: DeepPartial<MarketDataRequest>) => void;
  close: () => void;
  isClosed: () => boolean;
};

type CandleSubscription = {
  instrumentId: string;
  interval: SubscriptionInterval;
  waitingClose: boolean;
  candleSourceType?: GetCandlesRequest_CandleSource;
};

type OrderBookSubscription = {
  instrumentId: string;
  depth: number;
  orderBookType: OrderBookType;
};

type TradesSubscription = {
  instrumentId: string;
  tradeSource: TradeSourceType;
  withOpenInterest: boolean;
};

export type CreateMarketDataStreamControllerOptions = {
  callOptions?: CallOptions;
  closeGraceMs?: number;
};

export type MarketDataStreamController = {
  response: MaybeClosableAsyncIterable<MarketDataResponse>;
  send: (request: DeepPartial<MarketDataRequest>) => void;
  subscribeLastPrice: (instrumentId: string | string[]) => void;
  unsubscribeLastPrice: (instrumentId: string | string[]) => void;
  subscribeInfo: (instrumentId: string | string[]) => void;
  unsubscribeInfo: (instrumentId: string | string[]) => void;
  subscribeCandles: (
    instrumentId: string | string[],
    options?: {
      interval?: SubscriptionInterval;
      waitingClose?: boolean;
      candleSourceType?: GetCandlesRequest_CandleSource;
    },
  ) => void;
  unsubscribeCandles: (
    instrumentId: string | string[],
    options?: {
      interval?: SubscriptionInterval;
      waitingClose?: boolean;
      candleSourceType?: GetCandlesRequest_CandleSource;
    },
  ) => void;
  subscribeOrderBook: (
    instrumentId: string | string[],
    options?: {
      depth?: number;
      orderBookType?: OrderBookType;
    },
  ) => void;
  unsubscribeOrderBook: (
    instrumentId: string | string[],
    options?: {
      depth?: number;
      orderBookType?: OrderBookType;
    },
  ) => void;
  subscribeTrades: (
    instrumentId: string | string[],
    options?: {
      tradeSource?: TradeSourceType;
      withOpenInterest?: boolean;
    },
  ) => void;
  unsubscribeTrades: (
    instrumentId: string | string[],
    options?: {
      tradeSource?: TradeSourceType;
      withOpenInterest?: boolean;
    },
  ) => void;
  close: () => Promise<void>;
};

const sleep = async (timeMs: number): Promise<void> => {
  if (timeMs <= 0) {
    return;
  }

  await new Promise(resolve => setTimeout(resolve, timeMs));
};

const normalizeInstrumentIds = (instrumentId: string | string[]): string[] => {
  const items = Array.isArray(instrumentId) ? instrumentId : [instrumentId];

  return items.map(item => item.trim()).filter(Boolean);
};

const createRequestQueue = (): RequestQueue => {
  const pending: DeepPartial<MarketDataRequest>[] = [];
  const waiters: Array<(result: IteratorResult<DeepPartial<MarketDataRequest>>) => void> = [];
  let closed = false;

  const push = (request: DeepPartial<MarketDataRequest>): void => {
    if (closed) {
      throw new Error('MarketDataStreamController request queue is already closed');
    }

    const waiter = waiters.shift();

    if (waiter) {
      waiter({ value: request, done: false });
      return;
    }

    pending.push(request);
  };

  const close = (): void => {
    if (closed) {
      return;
    }

    closed = true;
    while (waiters.length > 0) {
      const waiter = waiters.shift();

      if (waiter) {
        waiter({ value: undefined as never, done: true });
      }
    }
  };

  const iterator = {
    async next(): Promise<IteratorResult<DeepPartial<MarketDataRequest>>> {
      if (pending.length > 0) {
        const request = pending.shift();

        return { value: request as DeepPartial<MarketDataRequest>, done: false };
      }

      if (closed) {
        return { value: undefined as never, done: true };
      }

      return await new Promise(resolve => {
        waiters.push(resolve);
      });
    },
    async return(): Promise<IteratorResult<DeepPartial<MarketDataRequest>>> {
      close();

      return { value: undefined as never, done: true };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };

  return {
    iterable: iterator,
    push,
    close,
    isClosed: () => closed,
  };
};

const candleKey = (sub: CandleSubscription): string =>
  `${sub.instrumentId}|${sub.interval}|${sub.waitingClose ? 1 : 0}|${sub.candleSourceType ?? ''}`;

const orderBookKey = (sub: OrderBookSubscription): string => `${sub.instrumentId}|${sub.depth}|${sub.orderBookType}`;

const tradesKey = (sub: TradesSubscription): string =>
  `${sub.instrumentId}|${sub.tradeSource}|${sub.withOpenInterest ? 1 : 0}`;

export const createMarketDataStreamController = (
  client: MarketDataStreamClient,
  options?: CreateMarketDataStreamControllerOptions,
): MarketDataStreamController => {
  const requestQueue = createRequestQueue();
  const response = client.marketDataStream(requestQueue.iterable, options?.callOptions);

  const activeLastPrice = new Set<string>();
  const activeInfo = new Set<string>();
  const activeCandles = new Map<string, CandleSubscription>();
  const activeOrderBook = new Map<string, OrderBookSubscription>();
  const activeTrades = new Map<string, TradesSubscription>();

  let closed = false;
  let closePromise: Promise<void> | undefined;

  const send = (request: DeepPartial<MarketDataRequest>): void => {
    if (closed) {
      throw new Error('MarketDataStreamController is closed');
    }

    requestQueue.push(MarketDataRequest.fromPartial(request));
  };

  const subscribeLastPrice = (instrumentId: string | string[]): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    instrumentIds.forEach(item => activeLastPrice.add(item));
    send({
      subscribeLastPriceRequest: {
        subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE,
        instruments: instrumentIds.map(item => ({ instrumentId: item })),
      },
    });
  };

  const unsubscribeLastPrice = (instrumentId: string | string[]): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    instrumentIds.forEach(item => activeLastPrice.delete(item));
    send({
      subscribeLastPriceRequest: {
        subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
        instruments: instrumentIds.map(item => ({ instrumentId: item })),
      },
    });
  };

  const subscribeInfo = (instrumentId: string | string[]): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    instrumentIds.forEach(item => activeInfo.add(item));
    send({
      subscribeInfoRequest: {
        subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE,
        instruments: instrumentIds.map(item => ({ instrumentId: item })),
      },
    });
  };

  const unsubscribeInfo = (instrumentId: string | string[]): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    instrumentIds.forEach(item => activeInfo.delete(item));
    send({
      subscribeInfoRequest: {
        subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
        instruments: instrumentIds.map(item => ({ instrumentId: item })),
      },
    });
  };

  const subscribeCandles = (
    instrumentId: string | string[],
    candleOptions?: {
      interval?: SubscriptionInterval;
      waitingClose?: boolean;
      candleSourceType?: GetCandlesRequest_CandleSource;
    },
  ): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    const interval = candleOptions?.interval ?? SubscriptionInterval.SUBSCRIPTION_INTERVAL_ONE_MINUTE;
    const waitingClose = candleOptions?.waitingClose ?? false;
    const candleSourceType = candleOptions?.candleSourceType;

    instrumentIds.forEach(item => {
      const sub: CandleSubscription = {
        instrumentId: item,
        interval,
        waitingClose,
        candleSourceType,
      };
      activeCandles.set(candleKey(sub), sub);
    });

    send({
      subscribeCandlesRequest: {
        subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE,
        instruments: instrumentIds.map(item => ({
          instrumentId: item,
          interval,
        })),
        waitingClose,
        candleSourceType,
      },
    });
  };

  const unsubscribeCandles = (
    instrumentId: string | string[],
    candleOptions?: {
      interval?: SubscriptionInterval;
      waitingClose?: boolean;
      candleSourceType?: GetCandlesRequest_CandleSource;
    },
  ): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    const explicitInterval = candleOptions?.interval;
    const explicitWaitingClose = candleOptions?.waitingClose;
    const explicitCandleSourceType = candleOptions?.candleSourceType;
    const candidates = [...activeCandles.values()].filter(sub => {
      return (
        instrumentIds.includes(sub.instrumentId) &&
        (explicitInterval === undefined || sub.interval === explicitInterval) &&
        (explicitWaitingClose === undefined || sub.waitingClose === explicitWaitingClose) &&
        (explicitCandleSourceType === undefined || sub.candleSourceType === explicitCandleSourceType)
      );
    });

    const fallbackSubs =
      candidates.length > 0
        ? candidates
        : instrumentIds.map(item => ({
            instrumentId: item,
            interval: explicitInterval ?? SubscriptionInterval.SUBSCRIPTION_INTERVAL_ONE_MINUTE,
            waitingClose: explicitWaitingClose ?? false,
            candleSourceType: explicitCandleSourceType,
          }));

    fallbackSubs.forEach(sub => activeCandles.delete(candleKey(sub)));

    fallbackSubs.forEach(sub => {
      send({
        subscribeCandlesRequest: {
          subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
          instruments: [{ instrumentId: sub.instrumentId, interval: sub.interval }],
          waitingClose: sub.waitingClose,
          candleSourceType: sub.candleSourceType,
        },
      });
    });
  };

  const subscribeOrderBook = (
    instrumentId: string | string[],
    orderBookOptions?: {
      depth?: number;
      orderBookType?: OrderBookType;
    },
  ): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    const depth = orderBookOptions?.depth ?? 10;
    const orderBookType = orderBookOptions?.orderBookType ?? OrderBookType.ORDERBOOK_TYPE_ALL;

    instrumentIds.forEach(item => {
      const sub: OrderBookSubscription = {
        instrumentId: item,
        depth,
        orderBookType,
      };
      activeOrderBook.set(orderBookKey(sub), sub);
    });

    send({
      subscribeOrderBookRequest: {
        subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE,
        instruments: instrumentIds.map(item => ({
          instrumentId: item,
          depth,
          orderBookType,
        })),
      },
    });
  };

  const unsubscribeOrderBook = (
    instrumentId: string | string[],
    orderBookOptions?: {
      depth?: number;
      orderBookType?: OrderBookType;
    },
  ): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    const explicitDepth = orderBookOptions?.depth;
    const explicitOrderBookType = orderBookOptions?.orderBookType;
    const candidates = [...activeOrderBook.values()].filter(sub => {
      return (
        instrumentIds.includes(sub.instrumentId) &&
        (explicitDepth === undefined || sub.depth === explicitDepth) &&
        (explicitOrderBookType === undefined || sub.orderBookType === explicitOrderBookType)
      );
    });

    const fallbackSubs =
      candidates.length > 0
        ? candidates
        : instrumentIds.map(item => ({
            instrumentId: item,
            depth: explicitDepth ?? 10,
            orderBookType: explicitOrderBookType ?? OrderBookType.ORDERBOOK_TYPE_ALL,
          }));

    fallbackSubs.forEach(sub => activeOrderBook.delete(orderBookKey(sub)));
    fallbackSubs.forEach(sub => {
      send({
        subscribeOrderBookRequest: {
          subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
          instruments: [{ instrumentId: sub.instrumentId, depth: sub.depth, orderBookType: sub.orderBookType }],
        },
      });
    });
  };

  const subscribeTrades = (
    instrumentId: string | string[],
    tradeOptions?: {
      tradeSource?: TradeSourceType;
      withOpenInterest?: boolean;
    },
  ): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    const tradeSource = tradeOptions?.tradeSource ?? TradeSourceType.TRADE_SOURCE_ALL;
    const withOpenInterest = tradeOptions?.withOpenInterest ?? false;

    instrumentIds.forEach(item => {
      const sub: TradesSubscription = {
        instrumentId: item,
        tradeSource,
        withOpenInterest,
      };
      activeTrades.set(tradesKey(sub), sub);
    });

    send({
      subscribeTradesRequest: {
        subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE,
        instruments: instrumentIds.map(item => ({ instrumentId: item })),
        tradeSource,
        withOpenInterest,
      },
    });
  };

  const unsubscribeTrades = (
    instrumentId: string | string[],
    tradeOptions?: {
      tradeSource?: TradeSourceType;
      withOpenInterest?: boolean;
    },
  ): void => {
    const instrumentIds = normalizeInstrumentIds(instrumentId);

    if (!instrumentIds.length) {
      return;
    }

    const explicitTradeSource = tradeOptions?.tradeSource;
    const explicitWithOpenInterest = tradeOptions?.withOpenInterest;
    const candidates = [...activeTrades.values()].filter(sub => {
      return (
        instrumentIds.includes(sub.instrumentId) &&
        (explicitTradeSource === undefined || sub.tradeSource === explicitTradeSource) &&
        (explicitWithOpenInterest === undefined || sub.withOpenInterest === explicitWithOpenInterest)
      );
    });

    const fallbackSubs =
      candidates.length > 0
        ? candidates
        : instrumentIds.map(item => ({
            instrumentId: item,
            tradeSource: explicitTradeSource ?? TradeSourceType.TRADE_SOURCE_ALL,
            withOpenInterest: explicitWithOpenInterest ?? false,
          }));

    fallbackSubs.forEach(sub => activeTrades.delete(tradesKey(sub)));
    fallbackSubs.forEach(sub => {
      send({
        subscribeTradesRequest: {
          subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
          instruments: [{ instrumentId: sub.instrumentId }],
          tradeSource: sub.tradeSource,
          withOpenInterest: sub.withOpenInterest,
        },
      });
    });
  };

  const close = async (): Promise<void> => {
    if (closed) {
      return;
    }
    if (closePromise) {
      return closePromise;
    }

    closePromise = (async () => {
      const unsubscribeRequests: DeepPartial<MarketDataRequest>[] = [];

      if (activeLastPrice.size > 0) {
        unsubscribeRequests.push({
          subscribeLastPriceRequest: {
            subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
            instruments: [...activeLastPrice].map(item => ({ instrumentId: item })),
          },
        });
      }

      if (activeInfo.size > 0) {
        unsubscribeRequests.push({
          subscribeInfoRequest: {
            subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
            instruments: [...activeInfo].map(item => ({ instrumentId: item })),
          },
        });
      }

      [...activeCandles.values()].forEach(sub => {
        unsubscribeRequests.push({
          subscribeCandlesRequest: {
            subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
            instruments: [{ instrumentId: sub.instrumentId, interval: sub.interval }],
            waitingClose: sub.waitingClose,
            candleSourceType: sub.candleSourceType,
          },
        });
      });

      [...activeOrderBook.values()].forEach(sub => {
        unsubscribeRequests.push({
          subscribeOrderBookRequest: {
            subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
            instruments: [{ instrumentId: sub.instrumentId, depth: sub.depth, orderBookType: sub.orderBookType }],
          },
        });
      });

      [...activeTrades.values()].forEach(sub => {
        unsubscribeRequests.push({
          subscribeTradesRequest: {
            subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
            instruments: [{ instrumentId: sub.instrumentId }],
            tradeSource: sub.tradeSource,
            withOpenInterest: sub.withOpenInterest,
          },
        });
      });

      unsubscribeRequests.forEach(request => send(request));

      activeLastPrice.clear();
      activeInfo.clear();
      activeCandles.clear();
      activeOrderBook.clear();
      activeTrades.clear();

      await sleep(options?.closeGraceMs ?? 25);

      closed = true;
      if (!requestQueue.isClosed()) {
        requestQueue.close();
      }

      if (typeof response.return === 'function') {
        await response.return(undefined);
      }
    })();

    return closePromise;
  };

  return {
    response,
    send,
    subscribeLastPrice,
    unsubscribeLastPrice,
    subscribeInfo,
    unsubscribeInfo,
    subscribeCandles,
    unsubscribeCandles,
    subscribeOrderBook,
    unsubscribeOrderBook,
    subscribeTrades,
    unsubscribeTrades,
    close,
  };
};
