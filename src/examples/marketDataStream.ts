import { createMarketDataStreamController, createSdk } from '../sdk';
import { SubscriptionInterval } from '../generated/marketdata';

!(async function example() {
  const sdk = createSdk('YOUR_TOKEN', 'example.market-data-stream', undefined, {
    splitChannels: true,
  });

  const controller = createMarketDataStreamController(sdk.marketDataStream, {
    closeGraceMs: 100,
  });

  controller.subscribeLastPrice('BBG000N9MNX3');
  controller.subscribeCandles('BBG000N9MNX3', {
    interval: SubscriptionInterval.SUBSCRIPTION_INTERVAL_ONE_MINUTE,
    waitingClose: true,
  });

  let messagesRead = 0;
  for await (const message of controller.response) {
    console.log('stream event', message);
    messagesRead += 1;

    if (messagesRead >= 5) {
      break;
    }
  }

  controller.unsubscribeCandles('BBG000N9MNX3');
  controller.unsubscribeLastPrice('BBG000N9MNX3');
  await controller.close();
  await sdk.disconnect();
})();
