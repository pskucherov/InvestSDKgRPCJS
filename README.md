# Tinkoff Invest APIv2 - Typescript NodeJS SDK

## Оригинал документации

* [SDK](https://github.com/mtvkand/invest-nodejs-grpc-sdk/blob/master/README.md)
* [TinkoffApi](https://tinkoff.github.io/investAPI/)

## Установка пакета
```
npm i tinkoff-sdk-grpc-js
```

## Генерация контрактов

Команда генерации:
```
npm run generate:proto
```

Скрипт по умолчанию скачивает контракты из:
- `https://opensource.tbank.ru/invest/invest-contracts.git`
- ref: `master`

Prerequisites:
- `git`
- доступ в интернет
- `node`/`npm`

Генерация использует пакет `protoc` (вместо `grpc-tools`), что стабильнее на Ubuntu.

Переопределения источника через env:
```
INVEST_CONTRACTS_REPO_URL=https://opensource.tbank.ru/invest/invest-contracts.git \
INVEST_CONTRACTS_REF=master \
npm run generate:proto
```

Пример генерации с зафиксированным ref:
```
INVEST_CONTRACTS_REF=<tag|branch|commit> \
npm run generate:proto
```

Debug режим (пошаговые логи + heartbeat на долгих шагах):
```
npm run generate:proto:debug
```

Дополнительно можно настроить интервал heartbeat (в секундах):
```
INVEST_PROTO_DEBUG=1 INVEST_PROTO_HEARTBEAT_SEC=10 npm run generate:proto
```

Если зависимости уже установлены и нужно пропустить `npm ci`:
```
INVEST_PROTO_SKIP_NPM_CI=1 npm run generate:proto
```

Таймаут для шага `npm ci` (по умолчанию 600 секунд):
```
INVEST_PROTO_NPM_CI_TIMEOUT_SEC=300 npm run generate:proto
```

## Пример использования
```
// https://tinkoff.github.io/investAPI/token/
const token = 'Токен TINKOFF INVEST API';

// https://tinkoff.github.io/investAPI/grpc/
const appName = 'example.InvestSDKgRPCJS'; 

const { createSdk } = require('tinkoff-sdk-grpc-js');
const sdk = createSdk(token, appName);

(async () => {
  const candles = await sdk.marketData.getCandles({
    figi: 'BBG0047315Y7',
    from: new Date('2022-04-04T11:00:00Z'),
    to: new Date('2022-04-04T11:20:59Z'),
    interval: sdk.CandleInterval.CANDLE_INTERVAL_5_MIN,
  });

  console.log('Запрос исторических свечей по инструменту: ', candles);
})();
```

## Что дальше?
Чтобы полноценно использовать методы и константы из proto — нужно их [экспортировать](src/sdk.ts). Буду делать по мере использования. Работа с proto напрямую возможна в [оригинальном sdk](https://github.com/mtvkand/invest-nodejs-grpc-sdk).

Пример торгового робота на javascript для Tinkoff Api v2 (grpc) появится здесь: https://github.com/pskucherov/TinkoffTradingBot
