import assert from 'node:assert/strict';
import test from 'node:test';
import { API_SANDBOX_URL, API_URL } from '../src/constants';
import { createSdk, resolveSdkUrl } from '../src/sdk';
import { closeChannels, createChannels, createMetadata, createMetadataCredentials, createSSLCredentials } from '../src/utils';

test('resolveSdkUrl chooses default and overridden endpoints', () => {
  assert.equal(resolveSdkUrl(), API_URL);
  assert.equal(resolveSdkUrl({ isSandbox: true }), API_SANDBOX_URL);
  assert.equal(resolveSdkUrl({ apiUrl: 'custom-prod:443' }), 'custom-prod:443');
  assert.equal(resolveSdkUrl({ isSandbox: true, sandboxApiUrl: 'custom-sandbox:443' }), 'custom-sandbox:443');
});

test('createChannels uses one channel by default and split channels when requested', async () => {
  const metadata = createMetadata('token');
  const metadataCreds = createMetadataCredentials(metadata);
  const sslCreds = createSSLCredentials(metadataCreds);

  const sharedChannels = createChannels('127.0.0.1:50051', sslCreds);
  assert.equal(sharedChannels.unaryChannel, sharedChannels.marketDataStreamChannel);
  assert.equal(sharedChannels.unaryChannel, sharedChannels.operationsStreamChannel);
  assert.equal(sharedChannels.unaryChannel, sharedChannels.ordersStreamChannel);
  await closeChannels(sharedChannels);

  const splitChannels = createChannels('127.0.0.1:50051', sslCreds, {
    splitChannels: true,
  });
  assert.notEqual(splitChannels.unaryChannel, splitChannels.marketDataStreamChannel);
  assert.notEqual(splitChannels.unaryChannel, splitChannels.operationsStreamChannel);
  assert.notEqual(splitChannels.unaryChannel, splitChannels.ordersStreamChannel);
  await closeChannels(splitChannels);
});

test('closeChannels closes each unique channel exactly once', async () => {
  let closeA = 0;
  let closeB = 0;
  const channelA = {
    close: () => {
      closeA += 1;
    },
  };
  const channelB = {
    close: () => {
      closeB += 1;
    },
  };

  await closeChannels({
    unaryChannel: channelA as any,
    marketDataStreamChannel: channelA as any,
    operationsStreamChannel: channelB as any,
    ordersStreamChannel: channelB as any,
  });

  assert.equal(closeA, 1);
  assert.equal(closeB, 1);
});

test('createSdk preserves old signature and exposes signals and disconnect', async () => {
  const sdk = createSdk(
    'token',
    'test.app',
    () => {
      // no-op
    },
    { isSandbox: true },
  );

  assert.equal(typeof sdk.signals.getSignals, 'function');
  assert.equal(typeof sdk.disconnect, 'function');

  await sdk.disconnect();
  await sdk.disconnect();
});
