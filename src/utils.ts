import { CallCredentials, Channel, ChannelCredentials, ChannelOptions, credentials, Metadata } from '@grpc/grpc-js';
import { createChannel } from 'nice-grpc';
import { APP_NAME } from './constants';

export const createMetadata = (token: string, appName?: string): Metadata => {
  const metadata = new Metadata();
  metadata.add('Authorization', `Bearer ${token}`);
  metadata.add('x-app-name', appName || APP_NAME);

  return metadata;
};

export const createMetadataCredentials = (metadata: Metadata): CallCredentials =>
  credentials.createFromMetadataGenerator(function (args: any, callback: any) {
    callback(null, metadata);
  });

export const createSSLCredentials = (metadataCreds: CallCredentials): ChannelCredentials =>
  credentials.combineChannelCredentials(credentials.createSsl(), metadataCreds);

export const DEFAULT_GRPC_CHANNEL_OPTIONS: ChannelOptions = {
  'grpc.max_receive_message_length': 50 * 1024 * 1024,
  'grpc.max_send_message_length': 50 * 1024 * 1024,
  'grpc.initial_reconnect_backoff_ms': 1000,
  'grpc.max_reconnect_backoff_ms': 15000,
  'grpc.keepalive_time_ms': 120000,
  'grpc.keepalive_timeout_ms': 20000,
  'grpc.keepalive_permit_without_calls': 0,
};

export type SdkChannels = {
  unaryChannel: Channel;
  marketDataStreamChannel: Channel;
  operationsStreamChannel: Channel;
  ordersStreamChannel: Channel;
};

export type CreateChannelsOptions = {
  splitChannels?: boolean;
  grpcChannelOptions?: ChannelOptions;
};

export const resolveGrpcChannelOptions = (overrides?: ChannelOptions): ChannelOptions => {
  return {
    ...DEFAULT_GRPC_CHANNEL_OPTIONS,
    ...(overrides || {}),
  };
};

export const makeChannel = (url: string, sslCreds: ChannelCredentials, grpcOptions?: ChannelOptions): Channel => {
  return createChannel(url, sslCreds, resolveGrpcChannelOptions(grpcOptions));
};

export const createChannels = (
  url: string,
  sslCreds: ChannelCredentials,
  options?: CreateChannelsOptions,
): SdkChannels => {
  const channelOptions = resolveGrpcChannelOptions(options?.grpcChannelOptions);
  const unaryChannel = makeChannel(url, sslCreds, channelOptions);

  if (!options?.splitChannels) {
    return {
      unaryChannel,
      marketDataStreamChannel: unaryChannel,
      operationsStreamChannel: unaryChannel,
      ordersStreamChannel: unaryChannel,
    };
  }

  return {
    unaryChannel,
    marketDataStreamChannel: makeChannel(url, sslCreds, channelOptions),
    operationsStreamChannel: makeChannel(url, sslCreds, channelOptions),
    ordersStreamChannel: makeChannel(url, sslCreds, channelOptions),
  };
};

export const closeChannels = async (channels: SdkChannels): Promise<void> => {
  const uniqueChannels = new Set([channels.unaryChannel, channels.marketDataStreamChannel, channels.operationsStreamChannel, channels.ordersStreamChannel]);

  for (const channel of uniqueChannels) {
    channel.close();
  }
};
