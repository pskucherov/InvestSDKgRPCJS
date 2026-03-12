# AGENTS: InvestSDKgRPCJS Runbook

## Scope

Этот документ описывает правила работы с `tinkoffbot/InvestSDKgRPCJS`.

## Source of truth по контрактам

- Основной внешний источник: `https://opensource.tbank.ru/invest/invest-contracts.git`.
- В монорепо можно использовать локальный источник:
  `tinkoffbot/invest-contracts`.

## Генерация proto

```bash
npm run generate:proto
```

### Режимы

- Remote ref:

```bash
INVEST_CONTRACTS_REPO_URL=https://opensource.tbank.ru/invest/invest-contracts.git \
INVEST_CONTRACTS_REF=master \
npm run generate:proto
```

- Local contracts:

```bash
INVEST_CONTRACTS_LOCAL_DIR=../invest-contracts \
npm run generate:proto
```

Скрипт пишет manifest: `src/generated/contracts-manifest.json`.

## Проверки после изменений

```bash
npm run build
npm run test
# либо
npm run check
```

## Что нельзя ломать

1. Подпись `createSdk(token, appName?, loggerCb?, options?)`.
2. Совместимость текущих полей возвращаемого SDK.
3. Default поведение middleware: ошибки должны пробрасываться (если явно не включен `swallowErrors`).
4. `disconnect()` должен быть idempotent.
5. Примеры должны использовать `instrumentId` (а не deprecated `figi`) там, где это поддерживается.

## Диагностика stream-проблем

1. Проверить, что вызывается `unsubscribe*` перед `close()`.
2. Проверить `x-tracking-id` и rate-limit headers через `TypeLoggerCb`.
3. Для долгоживущих workload использовать `splitChannels: true`.
4. При завершении процесса вызывать `await sdk.disconnect()`.

## Политика тестов

- Только unit/mock тесты, без реальных токенов и live gRPC в CI.
- Критичные сценарии:
  - propagation ошибок middleware,
  - trailer chaining,
  - topology каналов + disconnect,
  - корректность subscribe/unsubscribe в `createMarketDataStreamController`.
