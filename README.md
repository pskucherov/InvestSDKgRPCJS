# T-Invest gRPC SDK (TypeScript / Node.js)

`tinkoff-sdk-grpc-js` — легковесный SDK на `nice-grpc` + `ts-proto` для T-Invest API.

## Установка

```bash
npm i tinkoff-sdk-grpc-js
```

## Быстрый старт

```ts
const { createSdk } = require('tinkoff-sdk-grpc-js');

const sdk = createSdk(process.env.TINVEST_TOKEN, 'example.my-app');

const candles = await sdk.marketData.getCandles({
  instrumentId: 'BBG0047315Y7',
  from: new Date('2022-04-04T11:00:00Z'),
  to: new Date('2022-04-04T11:20:59Z'),
  interval: sdk.CandleInterval.CANDLE_INTERVAL_5_MIN,
});

console.log(candles);
await sdk.disconnect();
```

## Endpoint policy

По умолчанию:

- prod: `invest-public-api.tbank.ru:443`
- sandbox: `sandbox-invest-public-api.tbank.ru:443`

Можно переопределить через `createSdk` options (`apiUrl`, `sandboxApiUrl`).

## API `createSdk`

```ts
createSdk(
  token: string,
  appName?: string,
  loggerCb?: TypeLoggerCb,
  options?: CreateSdkOptions
)
```

### `CreateSdkOptions`

- `isSandbox?: boolean` — использовать sandbox endpoint.
- `apiUrl?: string` — override prod endpoint.
- `sandboxApiUrl?: string` — override sandbox endpoint.
- `grpcChannelOptions?: ChannelOptions` — merge поверх default gRPC options.
- `splitChannels?: boolean` — разнести unary и stream сервисы по разным каналам.
- `middleware?: { swallowErrors?: boolean }`
  - `false` (default): ошибки пробрасываются наверх.
  - `true`: legacy-режим, ошибки логируются и не пробрасываются.

### Возвращаемый SDK

- Unary/stream клиенты: `users`, `orders`, `ordersStream`, `marketData`, `marketDataStream`, `operations`, `operationsStream`, `instruments`, `stopOrders`, `sandbox`, `signals`.
- Экспорт enum/структур.
- `disconnect(): Promise<void>` — idempotent закрытие каналов.

## Логирование и ошибки

`TypeLoggerCb` получает:

1. metadata (`x-tracking-id`, `message`, rate-limit headers),
2. ошибку,
3. описание из `api_errors.json` (если сопоставлено),
4. context: `{ path, code, details }`.

Важно: по умолчанию ошибки не проглатываются.

## Управляемые stream-подписки

SDK экспортирует helper:

```ts
const { createMarketDataStreamController } = require('tinkoff-sdk-grpc-js');
```

Пример:

```ts
const sdk = createSdk(process.env.TINVEST_TOKEN, 'example.stream', undefined, {
  splitChannels: true,
});

const stream = createMarketDataStreamController(sdk.marketDataStream, {
  closeGraceMs: 100,
});

stream.subscribeLastPrice('BBG000N9MNX3');
stream.subscribeCandles('BBG000N9MNX3', {
  interval: sdk.SubscriptionInterval.SUBSCRIPTION_INTERVAL_ONE_MINUTE,
  waitingClose: true,
});

for await (const event of stream.response) {
  console.log(event);
  break;
}

stream.unsubscribeCandles('BBG000N9MNX3');
stream.unsubscribeLastPrice('BBG000N9MNX3');
await stream.close();
await sdk.disconnect();
```

Поддерживаются методы:

- `send`
- `subscribeLastPrice` / `unsubscribeLastPrice`
- `subscribeInfo` / `unsubscribeInfo`
- `subscribeCandles` / `unsubscribeCandles`
- `subscribeOrderBook` / `unsubscribeOrderBook`
- `subscribeTrades` / `unsubscribeTrades`
- `close`

## Генерация контрактов

```bash
npm run generate:proto
```

По умолчанию скрипт тянет `invest-contracts` из git-репозитория.

### Варианты источника

1. Remote (default):

```bash
INVEST_CONTRACTS_REPO_URL=https://opensource.tbank.ru/invest/invest-contracts.git \
INVEST_CONTRACTS_REF=master \
npm run generate:proto
```

2. Локальный source-of-truth (монорепо):

```bash
INVEST_CONTRACTS_LOCAL_DIR=../invest-contracts \
npm run generate:proto
```

`INVEST_CONTRACTS_LOCAL_DIR` должен указывать на корень `invest-contracts` (где есть `src/docs/contracts`).

### Debug/timeout

```bash
npm run generate:proto:debug
INVEST_PROTO_DEBUG=1 INVEST_PROTO_HEARTBEAT_SEC=10 npm run generate:proto
INVEST_PROTO_NPM_CI_TIMEOUT_SEC=300 npm run generate:proto
INVEST_PROTO_SKIP_NPM_CI=1 npm run generate:proto
```

### Manifest генерации

После генерации создается `src/generated/contracts-manifest.json`:

- source type (remote/local),
- repo/ref/commit,
- paths и число proto файлов,
- timestamp.

Это используется для диагностики агентами и проверки актуальности source contracts.

## Тесты и проверка

```bash
npm run test
npm run check
```

`check` = `build + test` (без live API вызовов).

## Примеры

Смотрите `src/examples/*.ts`:

- unary (`users`, `orders`, `marketData`, `operations`, `sandbox`, `stopOrders`, `instruments`)
- bidirectional stream + контроллер (`marketDataStream.ts`)
