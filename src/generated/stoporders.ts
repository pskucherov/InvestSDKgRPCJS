/* eslint-disable */
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { PriceType, Quotation, MoneyValue, priceTypeFromJSON, priceTypeToJSON } from './common';
import { Timestamp } from './google/protobuf/timestamp';

export const protobufPackage = 'tinkoff.public.invest.api.contract.v1';

/** Направление сделки стоп-заявки. */
export enum StopOrderDirection {
  /** STOP_ORDER_DIRECTION_UNSPECIFIED - Значение не указано */
  STOP_ORDER_DIRECTION_UNSPECIFIED = 0,
  /** STOP_ORDER_DIRECTION_BUY - Покупка */
  STOP_ORDER_DIRECTION_BUY = 1,
  /** STOP_ORDER_DIRECTION_SELL - Продажа */
  STOP_ORDER_DIRECTION_SELL = 2,
  UNRECOGNIZED = -1,
}

export function stopOrderDirectionFromJSON(object: any): StopOrderDirection {
  switch (object) {
    case 0:
    case 'STOP_ORDER_DIRECTION_UNSPECIFIED':
      return StopOrderDirection.STOP_ORDER_DIRECTION_UNSPECIFIED;
    case 1:
    case 'STOP_ORDER_DIRECTION_BUY':
      return StopOrderDirection.STOP_ORDER_DIRECTION_BUY;
    case 2:
    case 'STOP_ORDER_DIRECTION_SELL':
      return StopOrderDirection.STOP_ORDER_DIRECTION_SELL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return StopOrderDirection.UNRECOGNIZED;
  }
}

export function stopOrderDirectionToJSON(object: StopOrderDirection): string {
  switch (object) {
    case StopOrderDirection.STOP_ORDER_DIRECTION_UNSPECIFIED:
      return 'STOP_ORDER_DIRECTION_UNSPECIFIED';
    case StopOrderDirection.STOP_ORDER_DIRECTION_BUY:
      return 'STOP_ORDER_DIRECTION_BUY';
    case StopOrderDirection.STOP_ORDER_DIRECTION_SELL:
      return 'STOP_ORDER_DIRECTION_SELL';
    default:
      return 'UNKNOWN';
  }
}

/** Тип экспирации стоп-заявке. */
export enum StopOrderExpirationType {
  /** STOP_ORDER_EXPIRATION_TYPE_UNSPECIFIED - Значение не указано */
  STOP_ORDER_EXPIRATION_TYPE_UNSPECIFIED = 0,
  /** STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_CANCEL - Действительно до отмены */
  STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_CANCEL = 1,
  /** STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_DATE - Действительно до даты снятия */
  STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_DATE = 2,
  UNRECOGNIZED = -1,
}

export function stopOrderExpirationTypeFromJSON(object: any): StopOrderExpirationType {
  switch (object) {
    case 0:
    case 'STOP_ORDER_EXPIRATION_TYPE_UNSPECIFIED':
      return StopOrderExpirationType.STOP_ORDER_EXPIRATION_TYPE_UNSPECIFIED;
    case 1:
    case 'STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_CANCEL':
      return StopOrderExpirationType.STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_CANCEL;
    case 2:
    case 'STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_DATE':
      return StopOrderExpirationType.STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_DATE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return StopOrderExpirationType.UNRECOGNIZED;
  }
}

export function stopOrderExpirationTypeToJSON(object: StopOrderExpirationType): string {
  switch (object) {
    case StopOrderExpirationType.STOP_ORDER_EXPIRATION_TYPE_UNSPECIFIED:
      return 'STOP_ORDER_EXPIRATION_TYPE_UNSPECIFIED';
    case StopOrderExpirationType.STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_CANCEL:
      return 'STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_CANCEL';
    case StopOrderExpirationType.STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_DATE:
      return 'STOP_ORDER_EXPIRATION_TYPE_GOOD_TILL_DATE';
    default:
      return 'UNKNOWN';
  }
}

/** Тип стоп-заявки. */
export enum StopOrderType {
  /** STOP_ORDER_TYPE_UNSPECIFIED - Значение не указано */
  STOP_ORDER_TYPE_UNSPECIFIED = 0,
  /** STOP_ORDER_TYPE_TAKE_PROFIT - Take-profit заявка */
  STOP_ORDER_TYPE_TAKE_PROFIT = 1,
  /** STOP_ORDER_TYPE_STOP_LOSS - Stop-loss заявка */
  STOP_ORDER_TYPE_STOP_LOSS = 2,
  /** STOP_ORDER_TYPE_STOP_LIMIT - Stop-limit заявка */
  STOP_ORDER_TYPE_STOP_LIMIT = 3,
  UNRECOGNIZED = -1,
}

export function stopOrderTypeFromJSON(object: any): StopOrderType {
  switch (object) {
    case 0:
    case 'STOP_ORDER_TYPE_UNSPECIFIED':
      return StopOrderType.STOP_ORDER_TYPE_UNSPECIFIED;
    case 1:
    case 'STOP_ORDER_TYPE_TAKE_PROFIT':
      return StopOrderType.STOP_ORDER_TYPE_TAKE_PROFIT;
    case 2:
    case 'STOP_ORDER_TYPE_STOP_LOSS':
      return StopOrderType.STOP_ORDER_TYPE_STOP_LOSS;
    case 3:
    case 'STOP_ORDER_TYPE_STOP_LIMIT':
      return StopOrderType.STOP_ORDER_TYPE_STOP_LIMIT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return StopOrderType.UNRECOGNIZED;
  }
}

export function stopOrderTypeToJSON(object: StopOrderType): string {
  switch (object) {
    case StopOrderType.STOP_ORDER_TYPE_UNSPECIFIED:
      return 'STOP_ORDER_TYPE_UNSPECIFIED';
    case StopOrderType.STOP_ORDER_TYPE_TAKE_PROFIT:
      return 'STOP_ORDER_TYPE_TAKE_PROFIT';
    case StopOrderType.STOP_ORDER_TYPE_STOP_LOSS:
      return 'STOP_ORDER_TYPE_STOP_LOSS';
    case StopOrderType.STOP_ORDER_TYPE_STOP_LIMIT:
      return 'STOP_ORDER_TYPE_STOP_LIMIT';
    default:
      return 'UNKNOWN';
  }
}

/** Статус стоп-заяки. */
export enum StopOrderStatusOption {
  /** STOP_ORDER_STATUS_UNSPECIFIED - Значение не указано */
  STOP_ORDER_STATUS_UNSPECIFIED = 0,
  /** STOP_ORDER_STATUS_ALL - Все заявки */
  STOP_ORDER_STATUS_ALL = 1,
  /** STOP_ORDER_STATUS_ACTIVE - Активные заявки */
  STOP_ORDER_STATUS_ACTIVE = 2,
  /** STOP_ORDER_STATUS_EXECUTED - Исполненные заявки */
  STOP_ORDER_STATUS_EXECUTED = 3,
  /** STOP_ORDER_STATUS_CANCELED - Отмененные заявки */
  STOP_ORDER_STATUS_CANCELED = 4,
  /** STOP_ORDER_STATUS_EXPIRED - Истекшие заявки */
  STOP_ORDER_STATUS_EXPIRED = 5,
  UNRECOGNIZED = -1,
}

export function stopOrderStatusOptionFromJSON(object: any): StopOrderStatusOption {
  switch (object) {
    case 0:
    case 'STOP_ORDER_STATUS_UNSPECIFIED':
      return StopOrderStatusOption.STOP_ORDER_STATUS_UNSPECIFIED;
    case 1:
    case 'STOP_ORDER_STATUS_ALL':
      return StopOrderStatusOption.STOP_ORDER_STATUS_ALL;
    case 2:
    case 'STOP_ORDER_STATUS_ACTIVE':
      return StopOrderStatusOption.STOP_ORDER_STATUS_ACTIVE;
    case 3:
    case 'STOP_ORDER_STATUS_EXECUTED':
      return StopOrderStatusOption.STOP_ORDER_STATUS_EXECUTED;
    case 4:
    case 'STOP_ORDER_STATUS_CANCELED':
      return StopOrderStatusOption.STOP_ORDER_STATUS_CANCELED;
    case 5:
    case 'STOP_ORDER_STATUS_EXPIRED':
      return StopOrderStatusOption.STOP_ORDER_STATUS_EXPIRED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return StopOrderStatusOption.UNRECOGNIZED;
  }
}

export function stopOrderStatusOptionToJSON(object: StopOrderStatusOption): string {
  switch (object) {
    case StopOrderStatusOption.STOP_ORDER_STATUS_UNSPECIFIED:
      return 'STOP_ORDER_STATUS_UNSPECIFIED';
    case StopOrderStatusOption.STOP_ORDER_STATUS_ALL:
      return 'STOP_ORDER_STATUS_ALL';
    case StopOrderStatusOption.STOP_ORDER_STATUS_ACTIVE:
      return 'STOP_ORDER_STATUS_ACTIVE';
    case StopOrderStatusOption.STOP_ORDER_STATUS_EXECUTED:
      return 'STOP_ORDER_STATUS_EXECUTED';
    case StopOrderStatusOption.STOP_ORDER_STATUS_CANCELED:
      return 'STOP_ORDER_STATUS_CANCELED';
    case StopOrderStatusOption.STOP_ORDER_STATUS_EXPIRED:
      return 'STOP_ORDER_STATUS_EXPIRED';
    default:
      return 'UNKNOWN';
  }
}

/** Тип выставляемой заявки. */
export enum ExchangeOrderType {
  /** EXCHANGE_ORDER_TYPE_UNSPECIFIED - Значение не указано */
  EXCHANGE_ORDER_TYPE_UNSPECIFIED = 0,
  /** EXCHANGE_ORDER_TYPE_MARKET - Заявка по рыночной цене */
  EXCHANGE_ORDER_TYPE_MARKET = 1,
  /** EXCHANGE_ORDER_TYPE_LIMIT - Лимитная заявка */
  EXCHANGE_ORDER_TYPE_LIMIT = 2,
  UNRECOGNIZED = -1,
}

export function exchangeOrderTypeFromJSON(object: any): ExchangeOrderType {
  switch (object) {
    case 0:
    case 'EXCHANGE_ORDER_TYPE_UNSPECIFIED':
      return ExchangeOrderType.EXCHANGE_ORDER_TYPE_UNSPECIFIED;
    case 1:
    case 'EXCHANGE_ORDER_TYPE_MARKET':
      return ExchangeOrderType.EXCHANGE_ORDER_TYPE_MARKET;
    case 2:
    case 'EXCHANGE_ORDER_TYPE_LIMIT':
      return ExchangeOrderType.EXCHANGE_ORDER_TYPE_LIMIT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ExchangeOrderType.UNRECOGNIZED;
  }
}

export function exchangeOrderTypeToJSON(object: ExchangeOrderType): string {
  switch (object) {
    case ExchangeOrderType.EXCHANGE_ORDER_TYPE_UNSPECIFIED:
      return 'EXCHANGE_ORDER_TYPE_UNSPECIFIED';
    case ExchangeOrderType.EXCHANGE_ORDER_TYPE_MARKET:
      return 'EXCHANGE_ORDER_TYPE_MARKET';
    case ExchangeOrderType.EXCHANGE_ORDER_TYPE_LIMIT:
      return 'EXCHANGE_ORDER_TYPE_LIMIT';
    default:
      return 'UNKNOWN';
  }
}

/** Тип TakeProfit заявки. */
export enum TakeProfitType {
  /** TAKE_PROFIT_TYPE_UNSPECIFIED - Значение не указано */
  TAKE_PROFIT_TYPE_UNSPECIFIED = 0,
  /** TAKE_PROFIT_TYPE_REGULAR - Обычная заявка (значение по умолчанию) */
  TAKE_PROFIT_TYPE_REGULAR = 1,
  /** TAKE_PROFIT_TYPE_TRAILING - Трейлинг-стоп */
  TAKE_PROFIT_TYPE_TRAILING = 2,
  UNRECOGNIZED = -1,
}

export function takeProfitTypeFromJSON(object: any): TakeProfitType {
  switch (object) {
    case 0:
    case 'TAKE_PROFIT_TYPE_UNSPECIFIED':
      return TakeProfitType.TAKE_PROFIT_TYPE_UNSPECIFIED;
    case 1:
    case 'TAKE_PROFIT_TYPE_REGULAR':
      return TakeProfitType.TAKE_PROFIT_TYPE_REGULAR;
    case 2:
    case 'TAKE_PROFIT_TYPE_TRAILING':
      return TakeProfitType.TAKE_PROFIT_TYPE_TRAILING;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return TakeProfitType.UNRECOGNIZED;
  }
}

export function takeProfitTypeToJSON(object: TakeProfitType): string {
  switch (object) {
    case TakeProfitType.TAKE_PROFIT_TYPE_UNSPECIFIED:
      return 'TAKE_PROFIT_TYPE_UNSPECIFIED';
    case TakeProfitType.TAKE_PROFIT_TYPE_REGULAR:
      return 'TAKE_PROFIT_TYPE_REGULAR';
    case TakeProfitType.TAKE_PROFIT_TYPE_TRAILING:
      return 'TAKE_PROFIT_TYPE_TRAILING';
    default:
      return 'UNKNOWN';
  }
}

/** Тип параметров значений Трейлинг-стопа */
export enum TrailingValueType {
  /** TRAILING_VALUE_UNSPECIFIED - Значение не указано */
  TRAILING_VALUE_UNSPECIFIED = 0,
  /** TRAILING_VALUE_ABSOLUTE - Абсолютное значение в единицах цены */
  TRAILING_VALUE_ABSOLUTE = 1,
  /** TRAILING_VALUE_RELATIVE - Относительное значение в процентах */
  TRAILING_VALUE_RELATIVE = 2,
  UNRECOGNIZED = -1,
}

export function trailingValueTypeFromJSON(object: any): TrailingValueType {
  switch (object) {
    case 0:
    case 'TRAILING_VALUE_UNSPECIFIED':
      return TrailingValueType.TRAILING_VALUE_UNSPECIFIED;
    case 1:
    case 'TRAILING_VALUE_ABSOLUTE':
      return TrailingValueType.TRAILING_VALUE_ABSOLUTE;
    case 2:
    case 'TRAILING_VALUE_RELATIVE':
      return TrailingValueType.TRAILING_VALUE_RELATIVE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return TrailingValueType.UNRECOGNIZED;
  }
}

export function trailingValueTypeToJSON(object: TrailingValueType): string {
  switch (object) {
    case TrailingValueType.TRAILING_VALUE_UNSPECIFIED:
      return 'TRAILING_VALUE_UNSPECIFIED';
    case TrailingValueType.TRAILING_VALUE_ABSOLUTE:
      return 'TRAILING_VALUE_ABSOLUTE';
    case TrailingValueType.TRAILING_VALUE_RELATIVE:
      return 'TRAILING_VALUE_RELATIVE';
    default:
      return 'UNKNOWN';
  }
}

/** Статус Трейлинг-стопа */
export enum TrailingStopStatus {
  /** TRAILING_STOP_UNSPECIFIED - Значение не указано */
  TRAILING_STOP_UNSPECIFIED = 0,
  /** TRAILING_STOP_ACTIVE - Активный */
  TRAILING_STOP_ACTIVE = 1,
  /** TRAILING_STOP_ACTIVATED - Активированный */
  TRAILING_STOP_ACTIVATED = 2,
  UNRECOGNIZED = -1,
}

export function trailingStopStatusFromJSON(object: any): TrailingStopStatus {
  switch (object) {
    case 0:
    case 'TRAILING_STOP_UNSPECIFIED':
      return TrailingStopStatus.TRAILING_STOP_UNSPECIFIED;
    case 1:
    case 'TRAILING_STOP_ACTIVE':
      return TrailingStopStatus.TRAILING_STOP_ACTIVE;
    case 2:
    case 'TRAILING_STOP_ACTIVATED':
      return TrailingStopStatus.TRAILING_STOP_ACTIVATED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return TrailingStopStatus.UNRECOGNIZED;
  }
}

export function trailingStopStatusToJSON(object: TrailingStopStatus): string {
  switch (object) {
    case TrailingStopStatus.TRAILING_STOP_UNSPECIFIED:
      return 'TRAILING_STOP_UNSPECIFIED';
    case TrailingStopStatus.TRAILING_STOP_ACTIVE:
      return 'TRAILING_STOP_ACTIVE';
    case TrailingStopStatus.TRAILING_STOP_ACTIVATED:
      return 'TRAILING_STOP_ACTIVATED';
    default:
      return 'UNKNOWN';
  }
}

/** Запрос выставления стоп-заявки. */
export interface PostStopOrderRequest {
  /**
   * Deprecated Figi-идентификатор инструмента. Необходимо использовать instrument_id.
   *
   * @deprecated
   */
  figi?: string | undefined;
  /** Количество лотов */
  quantity: number;
  /** Цена за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  price?: Quotation | undefined;
  /** Стоп-цена заявки за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  stopPrice?: Quotation | undefined;
  /** Направление операции */
  direction: StopOrderDirection;
  /** Номер счёта */
  accountId: string;
  /** Тип экспирации заявки */
  expirationType: StopOrderExpirationType;
  /** Тип заявки */
  stopOrderType: StopOrderType;
  /** Дата и время окончания действия стоп-заявки в часовом поясе UTC. **Для ExpirationType = GoodTillDate заполнение обязательно**. */
  expireDate?: Date | undefined;
  /** Идентификатор инструмента, принимает значения Figi или instrument_uid. */
  instrumentId: string;
  /** Тип дочерней биржевой заявки для тейкпрофита */
  exchangeOrderType: ExchangeOrderType;
  /** Подтип стоп-заявки TakeProfit */
  takeProfitType: TakeProfitType;
  /** Массив с параметрами трейлинг-стопа */
  trailingData: PostStopOrderRequest_TrailingData | undefined;
  /** Тип цены */
  priceType: PriceType;
}

export interface PostStopOrderRequest_TrailingData {
  /** Отступ */
  indent: Quotation | undefined;
  /** Тип величины отступа */
  indentType: TrailingValueType;
  /** Размер защитного спреда */
  spread: Quotation | undefined;
  /** Тип величины защитного спреда */
  spreadType: TrailingValueType;
}

/** Результат выставления стоп-заявки. */
export interface PostStopOrderResponse {
  /** Уникальный идентификатор стоп-заявки */
  stopOrderId: string;
}

/** Запрос получения списка активных стоп-заявок. */
export interface GetStopOrdersRequest {
  /** Идентификатор счёта клиента */
  accountId: string;
  /** Статус заявок */
  status: StopOrderStatusOption;
  /** Левая граница */
  from: Date | undefined;
  /** Правая граница */
  to: Date | undefined;
}

/** Список активных стоп-заявок. */
export interface GetStopOrdersResponse {
  /** Массив стоп-заявок по счёту */
  stopOrders: StopOrder[];
}

/** Запрос отмены выставленной стоп-заявки. */
export interface CancelStopOrderRequest {
  /** Идентификатор счёта клиента */
  accountId: string;
  /** Уникальный идентификатор стоп-заявки */
  stopOrderId: string;
}

/** Результат отмены выставленной стоп-заявки. */
export interface CancelStopOrderResponse {
  /** Время отмены заявки в часовом поясе UTC */
  time: Date | undefined;
}

/** Информация о стоп-заявке. */
export interface StopOrder {
  /** Идентификатор-идентификатор стоп-заявки */
  stopOrderId: string;
  /** Запрошено лотов */
  lotsRequested: number;
  /** Figi-идентификатор инструмента */
  figi: string;
  /** Направление операции */
  direction: StopOrderDirection;
  /** Валюта стоп-заявки */
  currency: string;
  /** Тип стоп-заявки */
  orderType: StopOrderType;
  /** Дата и время выставления заявки в часовом поясе UTC */
  createDate: Date | undefined;
  /** Дата и время конвертации стоп-заявки в биржевую в часовом поясе UTC */
  activationDateTime: Date | undefined;
  /** Дата и время снятия заявки в часовом поясе UTC */
  expirationTime: Date | undefined;
  /** Цена заявки за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  price: MoneyValue | undefined;
  /** Цена активации стоп-заявки за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  stopPrice: MoneyValue | undefined;
  /** instrument_uid идентификатор инструмента */
  instrumentUid: string;
  /** Подтип стоп-заявки TakeProfit */
  takeProfitType: TakeProfitType;
  /** Параметры трейлинг-стопа */
  trailingData: StopOrder_TrailingData | undefined;
  /** Статус заявки */
  status: StopOrderStatusOption;
}

export interface StopOrder_TrailingData {
  /** Отступ */
  indent: Quotation | undefined;
  /** Тип величины отступа */
  indentType: TrailingValueType;
  /** Размер защитного спреда */
  spread: Quotation | undefined;
  /** Тип величины защитного спреда */
  spreadType: TrailingValueType;
  /** Статус трейлинг-стопа */
  status: TrailingStopStatus;
  /** Цена исполнения */
  price: Quotation | undefined;
  /** Локальный экстремум */
  extr: Quotation | undefined;
}

function createBasePostStopOrderRequest(): PostStopOrderRequest {
  return {
    figi: undefined,
    quantity: 0,
    price: undefined,
    stopPrice: undefined,
    direction: 0,
    accountId: '',
    expirationType: 0,
    stopOrderType: 0,
    expireDate: undefined,
    instrumentId: '',
    exchangeOrderType: 0,
    takeProfitType: 0,
    trailingData: undefined,
    priceType: 0,
  };
}

export const PostStopOrderRequest = {
  encode(message: PostStopOrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.figi !== undefined) {
      writer.uint32(10).string(message.figi);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).int64(message.quantity);
    }
    if (message.price !== undefined) {
      Quotation.encode(message.price, writer.uint32(26).fork()).ldelim();
    }
    if (message.stopPrice !== undefined) {
      Quotation.encode(message.stopPrice, writer.uint32(34).fork()).ldelim();
    }
    if (message.direction !== 0) {
      writer.uint32(40).int32(message.direction);
    }
    if (message.accountId !== '') {
      writer.uint32(50).string(message.accountId);
    }
    if (message.expirationType !== 0) {
      writer.uint32(56).int32(message.expirationType);
    }
    if (message.stopOrderType !== 0) {
      writer.uint32(64).int32(message.stopOrderType);
    }
    if (message.expireDate !== undefined) {
      Timestamp.encode(toTimestamp(message.expireDate), writer.uint32(74).fork()).ldelim();
    }
    if (message.instrumentId !== '') {
      writer.uint32(82).string(message.instrumentId);
    }
    if (message.exchangeOrderType !== 0) {
      writer.uint32(88).int32(message.exchangeOrderType);
    }
    if (message.takeProfitType !== 0) {
      writer.uint32(96).int32(message.takeProfitType);
    }
    if (message.trailingData !== undefined) {
      PostStopOrderRequest_TrailingData.encode(message.trailingData, writer.uint32(106).fork()).ldelim();
    }
    if (message.priceType !== 0) {
      writer.uint32(112).int32(message.priceType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PostStopOrderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePostStopOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.figi = reader.string();
          break;
        case 2:
          message.quantity = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.price = Quotation.decode(reader, reader.uint32());
          break;
        case 4:
          message.stopPrice = Quotation.decode(reader, reader.uint32());
          break;
        case 5:
          message.direction = reader.int32() as any;
          break;
        case 6:
          message.accountId = reader.string();
          break;
        case 7:
          message.expirationType = reader.int32() as any;
          break;
        case 8:
          message.stopOrderType = reader.int32() as any;
          break;
        case 9:
          message.expireDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.instrumentId = reader.string();
          break;
        case 11:
          message.exchangeOrderType = reader.int32() as any;
          break;
        case 12:
          message.takeProfitType = reader.int32() as any;
          break;
        case 13:
          message.trailingData = PostStopOrderRequest_TrailingData.decode(reader, reader.uint32());
          break;
        case 14:
          message.priceType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PostStopOrderRequest {
    return {
      figi: isSet(object.figi) ? String(object.figi) : undefined,
      quantity: isSet(object.quantity) ? Number(object.quantity) : 0,
      price: isSet(object.price) ? Quotation.fromJSON(object.price) : undefined,
      stopPrice: isSet(object.stopPrice) ? Quotation.fromJSON(object.stopPrice) : undefined,
      direction: isSet(object.direction) ? stopOrderDirectionFromJSON(object.direction) : 0,
      accountId: isSet(object.accountId) ? String(object.accountId) : '',
      expirationType: isSet(object.expirationType) ? stopOrderExpirationTypeFromJSON(object.expirationType) : 0,
      stopOrderType: isSet(object.stopOrderType) ? stopOrderTypeFromJSON(object.stopOrderType) : 0,
      expireDate: isSet(object.expireDate) ? fromJsonTimestamp(object.expireDate) : undefined,
      instrumentId: isSet(object.instrumentId) ? String(object.instrumentId) : '',
      exchangeOrderType: isSet(object.exchangeOrderType) ? exchangeOrderTypeFromJSON(object.exchangeOrderType) : 0,
      takeProfitType: isSet(object.takeProfitType) ? takeProfitTypeFromJSON(object.takeProfitType) : 0,
      trailingData: isSet(object.trailingData)
        ? PostStopOrderRequest_TrailingData.fromJSON(object.trailingData)
        : undefined,
      priceType: isSet(object.priceType) ? priceTypeFromJSON(object.priceType) : 0,
    };
  },

  toJSON(message: PostStopOrderRequest): unknown {
    const obj: any = {};
    message.figi !== undefined && (obj.figi = message.figi);
    message.quantity !== undefined && (obj.quantity = Math.round(message.quantity));
    message.price !== undefined && (obj.price = message.price ? Quotation.toJSON(message.price) : undefined);
    message.stopPrice !== undefined &&
      (obj.stopPrice = message.stopPrice ? Quotation.toJSON(message.stopPrice) : undefined);
    message.direction !== undefined && (obj.direction = stopOrderDirectionToJSON(message.direction));
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.expirationType !== undefined &&
      (obj.expirationType = stopOrderExpirationTypeToJSON(message.expirationType));
    message.stopOrderType !== undefined && (obj.stopOrderType = stopOrderTypeToJSON(message.stopOrderType));
    message.expireDate !== undefined && (obj.expireDate = message.expireDate.toISOString());
    message.instrumentId !== undefined && (obj.instrumentId = message.instrumentId);
    message.exchangeOrderType !== undefined &&
      (obj.exchangeOrderType = exchangeOrderTypeToJSON(message.exchangeOrderType));
    message.takeProfitType !== undefined && (obj.takeProfitType = takeProfitTypeToJSON(message.takeProfitType));
    message.trailingData !== undefined &&
      (obj.trailingData = message.trailingData
        ? PostStopOrderRequest_TrailingData.toJSON(message.trailingData)
        : undefined);
    message.priceType !== undefined && (obj.priceType = priceTypeToJSON(message.priceType));
    return obj;
  },

  fromPartial(object: DeepPartial<PostStopOrderRequest>): PostStopOrderRequest {
    const message = createBasePostStopOrderRequest();
    message.figi = object.figi ?? undefined;
    message.quantity = object.quantity ?? 0;
    message.price =
      object.price !== undefined && object.price !== null ? Quotation.fromPartial(object.price) : undefined;
    message.stopPrice =
      object.stopPrice !== undefined && object.stopPrice !== null ? Quotation.fromPartial(object.stopPrice) : undefined;
    message.direction = object.direction ?? 0;
    message.accountId = object.accountId ?? '';
    message.expirationType = object.expirationType ?? 0;
    message.stopOrderType = object.stopOrderType ?? 0;
    message.expireDate = object.expireDate ?? undefined;
    message.instrumentId = object.instrumentId ?? '';
    message.exchangeOrderType = object.exchangeOrderType ?? 0;
    message.takeProfitType = object.takeProfitType ?? 0;
    message.trailingData =
      object.trailingData !== undefined && object.trailingData !== null
        ? PostStopOrderRequest_TrailingData.fromPartial(object.trailingData)
        : undefined;
    message.priceType = object.priceType ?? 0;
    return message;
  },
};

function createBasePostStopOrderRequest_TrailingData(): PostStopOrderRequest_TrailingData {
  return { indent: undefined, indentType: 0, spread: undefined, spreadType: 0 };
}

export const PostStopOrderRequest_TrailingData = {
  encode(message: PostStopOrderRequest_TrailingData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.indent !== undefined) {
      Quotation.encode(message.indent, writer.uint32(10).fork()).ldelim();
    }
    if (message.indentType !== 0) {
      writer.uint32(16).int32(message.indentType);
    }
    if (message.spread !== undefined) {
      Quotation.encode(message.spread, writer.uint32(26).fork()).ldelim();
    }
    if (message.spreadType !== 0) {
      writer.uint32(32).int32(message.spreadType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PostStopOrderRequest_TrailingData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePostStopOrderRequest_TrailingData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.indent = Quotation.decode(reader, reader.uint32());
          break;
        case 2:
          message.indentType = reader.int32() as any;
          break;
        case 3:
          message.spread = Quotation.decode(reader, reader.uint32());
          break;
        case 4:
          message.spreadType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PostStopOrderRequest_TrailingData {
    return {
      indent: isSet(object.indent) ? Quotation.fromJSON(object.indent) : undefined,
      indentType: isSet(object.indentType) ? trailingValueTypeFromJSON(object.indentType) : 0,
      spread: isSet(object.spread) ? Quotation.fromJSON(object.spread) : undefined,
      spreadType: isSet(object.spreadType) ? trailingValueTypeFromJSON(object.spreadType) : 0,
    };
  },

  toJSON(message: PostStopOrderRequest_TrailingData): unknown {
    const obj: any = {};
    message.indent !== undefined && (obj.indent = message.indent ? Quotation.toJSON(message.indent) : undefined);
    message.indentType !== undefined && (obj.indentType = trailingValueTypeToJSON(message.indentType));
    message.spread !== undefined && (obj.spread = message.spread ? Quotation.toJSON(message.spread) : undefined);
    message.spreadType !== undefined && (obj.spreadType = trailingValueTypeToJSON(message.spreadType));
    return obj;
  },

  fromPartial(object: DeepPartial<PostStopOrderRequest_TrailingData>): PostStopOrderRequest_TrailingData {
    const message = createBasePostStopOrderRequest_TrailingData();
    message.indent =
      object.indent !== undefined && object.indent !== null ? Quotation.fromPartial(object.indent) : undefined;
    message.indentType = object.indentType ?? 0;
    message.spread =
      object.spread !== undefined && object.spread !== null ? Quotation.fromPartial(object.spread) : undefined;
    message.spreadType = object.spreadType ?? 0;
    return message;
  },
};

function createBasePostStopOrderResponse(): PostStopOrderResponse {
  return { stopOrderId: '' };
}

export const PostStopOrderResponse = {
  encode(message: PostStopOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stopOrderId !== '') {
      writer.uint32(10).string(message.stopOrderId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PostStopOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePostStopOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stopOrderId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PostStopOrderResponse {
    return {
      stopOrderId: isSet(object.stopOrderId) ? String(object.stopOrderId) : '',
    };
  },

  toJSON(message: PostStopOrderResponse): unknown {
    const obj: any = {};
    message.stopOrderId !== undefined && (obj.stopOrderId = message.stopOrderId);
    return obj;
  },

  fromPartial(object: DeepPartial<PostStopOrderResponse>): PostStopOrderResponse {
    const message = createBasePostStopOrderResponse();
    message.stopOrderId = object.stopOrderId ?? '';
    return message;
  },
};

function createBaseGetStopOrdersRequest(): GetStopOrdersRequest {
  return { accountId: '', status: 0, from: undefined, to: undefined };
}

export const GetStopOrdersRequest = {
  encode(message: GetStopOrdersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountId !== '') {
      writer.uint32(10).string(message.accountId);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.from !== undefined) {
      Timestamp.encode(toTimestamp(message.from), writer.uint32(26).fork()).ldelim();
    }
    if (message.to !== undefined) {
      Timestamp.encode(toTimestamp(message.to), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStopOrdersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStopOrdersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountId = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.from = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.to = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStopOrdersRequest {
    return {
      accountId: isSet(object.accountId) ? String(object.accountId) : '',
      status: isSet(object.status) ? stopOrderStatusOptionFromJSON(object.status) : 0,
      from: isSet(object.from) ? fromJsonTimestamp(object.from) : undefined,
      to: isSet(object.to) ? fromJsonTimestamp(object.to) : undefined,
    };
  },

  toJSON(message: GetStopOrdersRequest): unknown {
    const obj: any = {};
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.status !== undefined && (obj.status = stopOrderStatusOptionToJSON(message.status));
    message.from !== undefined && (obj.from = message.from.toISOString());
    message.to !== undefined && (obj.to = message.to.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<GetStopOrdersRequest>): GetStopOrdersRequest {
    const message = createBaseGetStopOrdersRequest();
    message.accountId = object.accountId ?? '';
    message.status = object.status ?? 0;
    message.from = object.from ?? undefined;
    message.to = object.to ?? undefined;
    return message;
  },
};

function createBaseGetStopOrdersResponse(): GetStopOrdersResponse {
  return { stopOrders: [] };
}

export const GetStopOrdersResponse = {
  encode(message: GetStopOrdersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.stopOrders) {
      StopOrder.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStopOrdersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStopOrdersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stopOrders.push(StopOrder.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStopOrdersResponse {
    return {
      stopOrders: Array.isArray(object?.stopOrders) ? object.stopOrders.map((e: any) => StopOrder.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetStopOrdersResponse): unknown {
    const obj: any = {};
    if (message.stopOrders) {
      obj.stopOrders = message.stopOrders.map(e => (e ? StopOrder.toJSON(e) : undefined));
    } else {
      obj.stopOrders = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GetStopOrdersResponse>): GetStopOrdersResponse {
    const message = createBaseGetStopOrdersResponse();
    message.stopOrders = object.stopOrders?.map(e => StopOrder.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCancelStopOrderRequest(): CancelStopOrderRequest {
  return { accountId: '', stopOrderId: '' };
}

export const CancelStopOrderRequest = {
  encode(message: CancelStopOrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountId !== '') {
      writer.uint32(10).string(message.accountId);
    }
    if (message.stopOrderId !== '') {
      writer.uint32(18).string(message.stopOrderId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelStopOrderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelStopOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountId = reader.string();
          break;
        case 2:
          message.stopOrderId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CancelStopOrderRequest {
    return {
      accountId: isSet(object.accountId) ? String(object.accountId) : '',
      stopOrderId: isSet(object.stopOrderId) ? String(object.stopOrderId) : '',
    };
  },

  toJSON(message: CancelStopOrderRequest): unknown {
    const obj: any = {};
    message.accountId !== undefined && (obj.accountId = message.accountId);
    message.stopOrderId !== undefined && (obj.stopOrderId = message.stopOrderId);
    return obj;
  },

  fromPartial(object: DeepPartial<CancelStopOrderRequest>): CancelStopOrderRequest {
    const message = createBaseCancelStopOrderRequest();
    message.accountId = object.accountId ?? '';
    message.stopOrderId = object.stopOrderId ?? '';
    return message;
  },
};

function createBaseCancelStopOrderResponse(): CancelStopOrderResponse {
  return { time: undefined };
}

export const CancelStopOrderResponse = {
  encode(message: CancelStopOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelStopOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelStopOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CancelStopOrderResponse {
    return {
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
    };
  },

  toJSON(message: CancelStopOrderResponse): unknown {
    const obj: any = {};
    message.time !== undefined && (obj.time = message.time.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<CancelStopOrderResponse>): CancelStopOrderResponse {
    const message = createBaseCancelStopOrderResponse();
    message.time = object.time ?? undefined;
    return message;
  },
};

function createBaseStopOrder(): StopOrder {
  return {
    stopOrderId: '',
    lotsRequested: 0,
    figi: '',
    direction: 0,
    currency: '',
    orderType: 0,
    createDate: undefined,
    activationDateTime: undefined,
    expirationTime: undefined,
    price: undefined,
    stopPrice: undefined,
    instrumentUid: '',
    takeProfitType: 0,
    trailingData: undefined,
    status: 0,
  };
}

export const StopOrder = {
  encode(message: StopOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stopOrderId !== '') {
      writer.uint32(10).string(message.stopOrderId);
    }
    if (message.lotsRequested !== 0) {
      writer.uint32(16).int64(message.lotsRequested);
    }
    if (message.figi !== '') {
      writer.uint32(26).string(message.figi);
    }
    if (message.direction !== 0) {
      writer.uint32(32).int32(message.direction);
    }
    if (message.currency !== '') {
      writer.uint32(42).string(message.currency);
    }
    if (message.orderType !== 0) {
      writer.uint32(48).int32(message.orderType);
    }
    if (message.createDate !== undefined) {
      Timestamp.encode(toTimestamp(message.createDate), writer.uint32(58).fork()).ldelim();
    }
    if (message.activationDateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.activationDateTime), writer.uint32(66).fork()).ldelim();
    }
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(74).fork()).ldelim();
    }
    if (message.price !== undefined) {
      MoneyValue.encode(message.price, writer.uint32(82).fork()).ldelim();
    }
    if (message.stopPrice !== undefined) {
      MoneyValue.encode(message.stopPrice, writer.uint32(90).fork()).ldelim();
    }
    if (message.instrumentUid !== '') {
      writer.uint32(98).string(message.instrumentUid);
    }
    if (message.takeProfitType !== 0) {
      writer.uint32(104).int32(message.takeProfitType);
    }
    if (message.trailingData !== undefined) {
      StopOrder_TrailingData.encode(message.trailingData, writer.uint32(114).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(120).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stopOrderId = reader.string();
          break;
        case 2:
          message.lotsRequested = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.figi = reader.string();
          break;
        case 4:
          message.direction = reader.int32() as any;
          break;
        case 5:
          message.currency = reader.string();
          break;
        case 6:
          message.orderType = reader.int32() as any;
          break;
        case 7:
          message.createDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.activationDateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.price = MoneyValue.decode(reader, reader.uint32());
          break;
        case 11:
          message.stopPrice = MoneyValue.decode(reader, reader.uint32());
          break;
        case 12:
          message.instrumentUid = reader.string();
          break;
        case 13:
          message.takeProfitType = reader.int32() as any;
          break;
        case 14:
          message.trailingData = StopOrder_TrailingData.decode(reader, reader.uint32());
          break;
        case 15:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StopOrder {
    return {
      stopOrderId: isSet(object.stopOrderId) ? String(object.stopOrderId) : '',
      lotsRequested: isSet(object.lotsRequested) ? Number(object.lotsRequested) : 0,
      figi: isSet(object.figi) ? String(object.figi) : '',
      direction: isSet(object.direction) ? stopOrderDirectionFromJSON(object.direction) : 0,
      currency: isSet(object.currency) ? String(object.currency) : '',
      orderType: isSet(object.orderType) ? stopOrderTypeFromJSON(object.orderType) : 0,
      createDate: isSet(object.createDate) ? fromJsonTimestamp(object.createDate) : undefined,
      activationDateTime: isSet(object.activationDateTime) ? fromJsonTimestamp(object.activationDateTime) : undefined,
      expirationTime: isSet(object.expirationTime) ? fromJsonTimestamp(object.expirationTime) : undefined,
      price: isSet(object.price) ? MoneyValue.fromJSON(object.price) : undefined,
      stopPrice: isSet(object.stopPrice) ? MoneyValue.fromJSON(object.stopPrice) : undefined,
      instrumentUid: isSet(object.instrumentUid) ? String(object.instrumentUid) : '',
      takeProfitType: isSet(object.takeProfitType) ? takeProfitTypeFromJSON(object.takeProfitType) : 0,
      trailingData: isSet(object.trailingData) ? StopOrder_TrailingData.fromJSON(object.trailingData) : undefined,
      status: isSet(object.status) ? stopOrderStatusOptionFromJSON(object.status) : 0,
    };
  },

  toJSON(message: StopOrder): unknown {
    const obj: any = {};
    message.stopOrderId !== undefined && (obj.stopOrderId = message.stopOrderId);
    message.lotsRequested !== undefined && (obj.lotsRequested = Math.round(message.lotsRequested));
    message.figi !== undefined && (obj.figi = message.figi);
    message.direction !== undefined && (obj.direction = stopOrderDirectionToJSON(message.direction));
    message.currency !== undefined && (obj.currency = message.currency);
    message.orderType !== undefined && (obj.orderType = stopOrderTypeToJSON(message.orderType));
    message.createDate !== undefined && (obj.createDate = message.createDate.toISOString());
    message.activationDateTime !== undefined && (obj.activationDateTime = message.activationDateTime.toISOString());
    message.expirationTime !== undefined && (obj.expirationTime = message.expirationTime.toISOString());
    message.price !== undefined && (obj.price = message.price ? MoneyValue.toJSON(message.price) : undefined);
    message.stopPrice !== undefined &&
      (obj.stopPrice = message.stopPrice ? MoneyValue.toJSON(message.stopPrice) : undefined);
    message.instrumentUid !== undefined && (obj.instrumentUid = message.instrumentUid);
    message.takeProfitType !== undefined && (obj.takeProfitType = takeProfitTypeToJSON(message.takeProfitType));
    message.trailingData !== undefined &&
      (obj.trailingData = message.trailingData ? StopOrder_TrailingData.toJSON(message.trailingData) : undefined);
    message.status !== undefined && (obj.status = stopOrderStatusOptionToJSON(message.status));
    return obj;
  },

  fromPartial(object: DeepPartial<StopOrder>): StopOrder {
    const message = createBaseStopOrder();
    message.stopOrderId = object.stopOrderId ?? '';
    message.lotsRequested = object.lotsRequested ?? 0;
    message.figi = object.figi ?? '';
    message.direction = object.direction ?? 0;
    message.currency = object.currency ?? '';
    message.orderType = object.orderType ?? 0;
    message.createDate = object.createDate ?? undefined;
    message.activationDateTime = object.activationDateTime ?? undefined;
    message.expirationTime = object.expirationTime ?? undefined;
    message.price =
      object.price !== undefined && object.price !== null ? MoneyValue.fromPartial(object.price) : undefined;
    message.stopPrice =
      object.stopPrice !== undefined && object.stopPrice !== null
        ? MoneyValue.fromPartial(object.stopPrice)
        : undefined;
    message.instrumentUid = object.instrumentUid ?? '';
    message.takeProfitType = object.takeProfitType ?? 0;
    message.trailingData =
      object.trailingData !== undefined && object.trailingData !== null
        ? StopOrder_TrailingData.fromPartial(object.trailingData)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseStopOrder_TrailingData(): StopOrder_TrailingData {
  return {
    indent: undefined,
    indentType: 0,
    spread: undefined,
    spreadType: 0,
    status: 0,
    price: undefined,
    extr: undefined,
  };
}

export const StopOrder_TrailingData = {
  encode(message: StopOrder_TrailingData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.indent !== undefined) {
      Quotation.encode(message.indent, writer.uint32(10).fork()).ldelim();
    }
    if (message.indentType !== 0) {
      writer.uint32(16).int32(message.indentType);
    }
    if (message.spread !== undefined) {
      Quotation.encode(message.spread, writer.uint32(26).fork()).ldelim();
    }
    if (message.spreadType !== 0) {
      writer.uint32(32).int32(message.spreadType);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.price !== undefined) {
      Quotation.encode(message.price, writer.uint32(58).fork()).ldelim();
    }
    if (message.extr !== undefined) {
      Quotation.encode(message.extr, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopOrder_TrailingData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopOrder_TrailingData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.indent = Quotation.decode(reader, reader.uint32());
          break;
        case 2:
          message.indentType = reader.int32() as any;
          break;
        case 3:
          message.spread = Quotation.decode(reader, reader.uint32());
          break;
        case 4:
          message.spreadType = reader.int32() as any;
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        case 7:
          message.price = Quotation.decode(reader, reader.uint32());
          break;
        case 8:
          message.extr = Quotation.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StopOrder_TrailingData {
    return {
      indent: isSet(object.indent) ? Quotation.fromJSON(object.indent) : undefined,
      indentType: isSet(object.indentType) ? trailingValueTypeFromJSON(object.indentType) : 0,
      spread: isSet(object.spread) ? Quotation.fromJSON(object.spread) : undefined,
      spreadType: isSet(object.spreadType) ? trailingValueTypeFromJSON(object.spreadType) : 0,
      status: isSet(object.status) ? trailingStopStatusFromJSON(object.status) : 0,
      price: isSet(object.price) ? Quotation.fromJSON(object.price) : undefined,
      extr: isSet(object.extr) ? Quotation.fromJSON(object.extr) : undefined,
    };
  },

  toJSON(message: StopOrder_TrailingData): unknown {
    const obj: any = {};
    message.indent !== undefined && (obj.indent = message.indent ? Quotation.toJSON(message.indent) : undefined);
    message.indentType !== undefined && (obj.indentType = trailingValueTypeToJSON(message.indentType));
    message.spread !== undefined && (obj.spread = message.spread ? Quotation.toJSON(message.spread) : undefined);
    message.spreadType !== undefined && (obj.spreadType = trailingValueTypeToJSON(message.spreadType));
    message.status !== undefined && (obj.status = trailingStopStatusToJSON(message.status));
    message.price !== undefined && (obj.price = message.price ? Quotation.toJSON(message.price) : undefined);
    message.extr !== undefined && (obj.extr = message.extr ? Quotation.toJSON(message.extr) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<StopOrder_TrailingData>): StopOrder_TrailingData {
    const message = createBaseStopOrder_TrailingData();
    message.indent =
      object.indent !== undefined && object.indent !== null ? Quotation.fromPartial(object.indent) : undefined;
    message.indentType = object.indentType ?? 0;
    message.spread =
      object.spread !== undefined && object.spread !== null ? Quotation.fromPartial(object.spread) : undefined;
    message.spreadType = object.spreadType ?? 0;
    message.status = object.status ?? 0;
    message.price =
      object.price !== undefined && object.price !== null ? Quotation.fromPartial(object.price) : undefined;
    message.extr = object.extr !== undefined && object.extr !== null ? Quotation.fromPartial(object.extr) : undefined;
    return message;
  },
};

/**
 * Сервис предназначен для работы со стоп-заявками:</br> **1**.
 * выставление;</br> **2**. отмена;</br> **3**. получение списка стоп-заявок.
 */
export type StopOrdersServiceDefinition = typeof StopOrdersServiceDefinition;
export const StopOrdersServiceDefinition = {
  name: 'StopOrdersService',
  fullName: 'tinkoff.public.invest.api.contract.v1.StopOrdersService',
  methods: {
    /** Метод выставления стоп-заявки. */
    postStopOrder: {
      name: 'PostStopOrder',
      requestType: PostStopOrderRequest,
      requestStream: false,
      responseType: PostStopOrderResponse,
      responseStream: false,
      options: {},
    },
    /** Метод получения списка активных стоп заявок по счёту. */
    getStopOrders: {
      name: 'GetStopOrders',
      requestType: GetStopOrdersRequest,
      requestStream: false,
      responseType: GetStopOrdersResponse,
      responseStream: false,
      options: {},
    },
    /** Метод отмены стоп-заявки. */
    cancelStopOrder: {
      name: 'CancelStopOrder',
      requestType: CancelStopOrderRequest,
      requestStream: false,
      responseType: CancelStopOrderResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
