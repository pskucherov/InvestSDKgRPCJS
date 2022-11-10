import { createMetadata, createMetadataCredentials, createSSLCredentials, makeChannel } from './utils';
import { createClientFactory } from 'nice-grpc';
import { UsersServiceDefinition } from './generated/users';
import { StopOrdersServiceDefinition } from './generated/stoporders';
import { API_URL } from './constants';
import { InstrumentsServiceDefinition, InstrumentStatus, InstrumentIdType } from './generated/instruments';
import {
  MarketDataServiceDefinition,
  MarketDataStreamServiceDefinition,
  CandleInterval,
  MarketDataRequest,
  SubscriptionAction,
  SubscriptionInterval,
} from './generated/marketdata';
import { OperationsServiceDefinition, OperationsStreamServiceDefinition } from './generated/operations';
import { OrdersServiceDefinition, OrdersStreamServiceDefinition, OrderDirection, OrderType } from './generated/orders';
import { SandboxServiceDefinition } from './generated/sandbox';
import { getMiddleware, TypeLoggerCb } from './middlewares/response';

export const createSdk = (token: string, appName?: string, loggerCb?: TypeLoggerCb) => {
  const metadata = createMetadata(token, appName);
  const metadataCred = createMetadataCredentials(metadata);
  const sslCred = createSSLCredentials(metadataCred);
  const channel = makeChannel(API_URL, sslCred);

  const clientFactory = createClientFactory().use(getMiddleware(loggerCb));

  return {
    instruments: clientFactory.create(InstrumentsServiceDefinition, channel),
    marketData: clientFactory.create(MarketDataServiceDefinition, channel),
    marketDataStream: clientFactory.create(MarketDataStreamServiceDefinition, channel),
    operations: clientFactory.create(OperationsServiceDefinition, channel),
    operationsStream: clientFactory.create(OperationsStreamServiceDefinition, channel),
    orders: clientFactory.create(OrdersServiceDefinition, channel),
    ordersStream: clientFactory.create(OrdersStreamServiceDefinition, channel),
    sandbox: clientFactory.create(SandboxServiceDefinition, channel),
    stopOrders: clientFactory.create(StopOrdersServiceDefinition, channel),
    users: clientFactory.create(UsersServiceDefinition, channel),

    CandleInterval,

    InstrumentStatus,
    InstrumentIdType,

    MarketDataRequest,
    SubscriptionAction,
    SubscriptionInterval,

    OrderDirection,
    OrderType,
  };
};
