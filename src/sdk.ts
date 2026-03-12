import { ChannelOptions } from '@grpc/grpc-js';
import { createMetadata, createMetadataCredentials, createSSLCredentials, createChannels, closeChannels } from './utils';
import { createClientFactory } from 'nice-grpc';
import * as stopOrders from './generated/stoporders';
import { API_URL, API_SANDBOX_URL } from './constants';
import * as common from './generated/common';
import * as instruments from './generated/instruments';

import * as marketData from './generated/marketdata';
import * as operations from './generated/operations';

import * as orders from './generated/orders';
import * as users from './generated/users';
import * as sandbox from './generated/sandbox';
import * as signals from './generated/signals';
import { getMiddleware, MiddlewareOptions, TypeLoggerCb } from './middlewares/response';

const { SandboxServiceDefinition } = sandbox;
const { UsersServiceDefinition, AccountType, AccountStatus, AccessLevel } = users;
const { OrdersServiceDefinition, OrdersStreamServiceDefinition, OrderDirection, OrderType } = orders;
const { StopOrdersServiceDefinition } = stopOrders;
const { InstrumentsServiceDefinition, InstrumentIdType } = instruments;
const { SignalServiceDefinition } = signals;
const { InstrumentStatus } = common;
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

export type CreateSdkOptions = {
  isSandbox?: boolean;
  apiUrl?: string;
  sandboxApiUrl?: string;
  grpcChannelOptions?: ChannelOptions;
  splitChannels?: boolean;
  middleware?: MiddlewareOptions;
};

export const resolveSdkUrl = (options?: CreateSdkOptions): string => {
  if (options?.isSandbox) {
    return options?.sandboxApiUrl || API_SANDBOX_URL;
  }

  return options?.apiUrl || API_URL;
};

export const createSdk = (
  token: string,
  appName?: string,
  loggerCb?: TypeLoggerCb,
  options?: CreateSdkOptions,
) => {
  const metadata = createMetadata(token, appName);
  const metadataCred = createMetadataCredentials(metadata);
  const sslCred = createSSLCredentials(metadataCred);
  const url = resolveSdkUrl(options);
  const channels = createChannels(url, sslCred, {
    splitChannels: options?.splitChannels,
    grpcChannelOptions: options?.grpcChannelOptions,
  });
  const clientFactory = createClientFactory().use(getMiddleware(loggerCb, options?.middleware));
  let disconnected = false;

  const disconnect = async () => {
    if (disconnected) {
      return;
    }

    disconnected = true;
    await closeChannels(channels);
  };

  return {
    instruments: clientFactory.create(InstrumentsServiceDefinition, channels.unaryChannel),
    marketData: clientFactory.create(MarketDataServiceDefinition, channels.unaryChannel),
    marketDataStream: clientFactory.create(MarketDataStreamServiceDefinition, channels.marketDataStreamChannel),
    operations: clientFactory.create(OperationsServiceDefinition, channels.unaryChannel),
    operationsStream: clientFactory.create(OperationsStreamServiceDefinition, channels.operationsStreamChannel),
    orders: clientFactory.create(OrdersServiceDefinition, channels.unaryChannel),
    ordersStream: clientFactory.create(OrdersStreamServiceDefinition, channels.ordersStreamChannel),
    sandbox: clientFactory.create(SandboxServiceDefinition, channels.unaryChannel),
    stopOrders: clientFactory.create(StopOrdersServiceDefinition, channels.unaryChannel),
    users: clientFactory.create(UsersServiceDefinition, channels.unaryChannel),
    signals: clientFactory.create(SignalServiceDefinition, channels.unaryChannel),

    structures: {
      users,
      stopOrders,
      instruments,
      marketData,
      operations,
      orders,
      sandbox,
      signals,
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

    disconnect,
  };
};

export { createMarketDataStreamController } from './marketDataStreamController';
export type { CreateMarketDataStreamControllerOptions, MarketDataStreamController } from './marketDataStreamController';
