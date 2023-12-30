import { createMetadata, createMetadataCredentials, createSSLCredentials, makeChannel } from './utils';
import { createClientFactory } from 'nice-grpc';
import * as stopOrders from './generated/stoporders';
import { API_URL } from './constants';
import * as instruments from './generated/instruments';

import * as marketData from './generated/marketdata';
import * as operations from './generated/operations';

import * as orders from './generated/orders';
import * as users from './generated/users';
import * as sandbox from './generated/sandbox';
import { getMiddleware, TypeLoggerCb } from './middlewares/response';

const { SandboxServiceDefinition } = sandbox;
const { UsersServiceDefinition, AccountType, AccountStatus, AccessLevel } = users;
const { OrdersServiceDefinition, OrdersStreamServiceDefinition, OrderDirection, OrderType } = orders;
const { StopOrdersServiceDefinition } = stopOrders;
const { InstrumentsServiceDefinition, InstrumentStatus, InstrumentIdType } = instruments;
const {
  MarketDataServiceDefinition,
  MarketDataStreamServiceDefinition,
  CandleInterval,
  MarketDataRequest,
  SubscriptionAction,
  SubscriptionInterval,
} = marketData;

const {
  OperationsServiceDefinition,
  OperationsStreamServiceDefinition,
  OperationState,
  OperationType,
  PortfolioSubscriptionStatus,
  PositionsAccountSubscriptionStatus,
} = operations;

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

    structures: {
      users,
      stopOrders,
      instruments,
      marketData,
      operations,
      orders,
      sandbox,
    },

    CandleInterval,

    InstrumentStatus,
    InstrumentIdType,

    MarketDataRequest,
    SubscriptionAction,
    SubscriptionInterval,

    OrderDirection,
    OrderType,

    AccountType,
    AccountStatus,
    AccessLevel,

    OperationState,
    OperationType,
    PortfolioSubscriptionStatus,
    PositionsAccountSubscriptionStatus,
  };
};
