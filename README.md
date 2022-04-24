# Tinkoff Invest APIv2 - Typescript NodeJS SDK

## Оригинал документации

* [SDK](https://github.com/mtvkand/invest-nodejs-grpc-sdk/blob/master/README.md)
* [TinkoffApi](https://tinkoff.github.io/investAPI/)

## Установка пакета
```
npm i tinkoff-sdk-grpc-js
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