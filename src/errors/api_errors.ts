type Errors = {
  [index: string]: ErrorMessagesType;
};

export type ErrorMessagesType = {
  message: string;
  type: string;
  description: string;
};

export const errorStatus: Errors = {
  '12001': {
    message: 'Method is unimplemented',
    type: 'UNIMPLEMENTED',
    description: 'Метод не реализован.',
  },
  '12002': {
    message: 'Deprecated method is unavailable',
    type: 'UNAVAILABLE',
    description: 'Метод устарел и недоступен.',
  },
  '30001': {
    message: "missing parameter: 'from'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *from* является обязательным.</br>Укажите корректный параметр *from*.',
  },
  '30002': {
    message: 'the required period should not exceed 7 days',
    type: 'INVALID_ARGUMENT',
    description: 'Запрошенный период не может превышать 7 дней.</br>Укажите корректный период.',
  },
  '30003': {
    message: "'from' can't be less than the current date",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *from* не может быть меньше текущей даты.</br>Укажите корректный параметр *from*.',
  },
  '30004': {
    message: "missing parameter: 'to'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *to* является обязательным.</br>Укажите корректный параметр *to*.',
  },
  '30005': {
    message: "'id_type' is invalid",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *id_type* имеет некорректное значение.</br>Список доступных значений: [*id_type*](https://russianinvestments.github.io/investAPI/instruments#instrumentidtype).',
  },
  '30006': {
    message: "missing parameter: 'id_type'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *id_type* является обязательным.</br>Укажите корректный параметр *id_type*.',
  },
  '30007': {
    message: "missing parameter: 'id'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *id* является обязательным.</br>Укажите корректный параметр *id*.',
  },
  '30008': {
    message: "missing parameter: 'figi'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *figi* является обязательным.</br>Укажите корректный параметр *figi*.',
  },
  '30009': {
    message: "'from' is invalid",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *from* имеет некорректное значение.</br>Укажите корректный параметр *from*.',
  },
  '30010': {
    message: "'to' is invalid",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *to* имеет некорректное значение.</br>Укажите корректный параметр *to*.',
  },
  '30011': {
    message: 'interval is invalid',
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *interval* имеет некорректное значение.</br>Список доступных значений: [*interval*](https://russianinvestments.github.io/investAPI/marketdata#subscriptioninterval).',
  },
  '30012': {
    message: "'to' can't be less than 'from'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *to* не может быть меньше параметра *from*.</br>Укажите корректные параметры *from* и *to*.',
  },
  '30013': {
    message: "'class_code' require for 'id_type' = 'ticker'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *class_code* не может быть пустым при поиске по тикеру.</br>Укажите корректный параметр *class_code*.</br>Подробнее: [Идентификация инструментов](https://russianinvestments.github.io/investAPI/faq_identification/).',
  },
  '30014': {
    message: 'the maximum request period for the given candle interval has been exceeded',
    type: 'INVALID_ARGUMENT',
    description:
      'Превышен максимальный период запроса для данного интервала свечи.</br>Укажите корректный интервал.</br>Подробнее: [Интервалы свечей и доступные периоды](https://russianinvestments.github.io/investAPI/load_history/).',
  },
  '30015': {
    message: "parameter 'quantity' is missing or equal to 0",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *quantity* является обязательным.</br>Укажите корректный параметр *quantity*.',
  },
  '30016': {
    message: "'quantity' is invalid",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *quantity* имеет некорректное значение.</br>Укажите корректный параметр *quantity*.',
  },
  '30017': {
    message: "missing parameter: 'price'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *price* является обязательным.</br>Укажите корректный параметр *price*.</br>Значение параметра *price* должно быть положительным.</br>units и nanos не могут иметь разные знак и модуль nanos должен быть < 999 999 999',
  },
  '30018': {
    message: 'price is invalid',
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *price* имеет некорректное значение.</br>Укажите корректный параметр *price*.',
  },
  '30019': {
    message: "missing parameter: 'direction'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *direction* является обязательным.</br>Укажите корректный параметр *direction*.',
  },
  '30020': {
    message: "'direction' is invalid",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *direction* имеет некорректное значение.',
  },
  '30021': {
    message: "missing parameter: 'account_id'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *account_id* является обязательным.</br>Укажите корректный параметр *account_id*.',
  },
  '30022': {
    message: "missing parameter: 'state'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *state* является обязательным.</br>Укажите корректный параметр *state*.</br>Список доступных значений: [*direction*](https://russianinvestments.github.io/investAPI/operations/#operationstate).',
  },
  '30023': {
    message: "invalid parameter: 'state'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *state* имеет некорректное значение.</br>Укажите корректный параметр *state*.</br>Список доступных значений: [*direction*](https://russianinvestments.github.io/investAPI/operations/#operationstate).',
  },
  '30025': {
    message: "missing parameter: 'order_type'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *order_type* является обязательным.</br>Укажите корректный параметр *order_type*. Список доступных значений: [*order_type*](https://russianinvestments.github.io/investAPI/orders/#ordertype).',
  },
  '30026': {
    message: "invalid parameter: 'order_type'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *order_type* имеет некорректное значение.</br>Укажите корректный параметр *order_type*.',
  },
  '30027': {
    message: "missing parameter: 'order_id'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *order_id* является обязательным.</br>Укажите корректный параметр *order_id*.',
  },
  '30028': {
    message: "'order id' is invalid UUID format.",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *order_id* имеет некорректное значение.</br>Укажите корректный параметр *order_id* формата UUID. Максимальная длина 36 символов.',
  },
  '30029': {
    message: "missing parameter: 'idempotency_key'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *idempotency_key* является обязательным.</br>Укажите корректный параметр *idempotency_key*.',
  },
  '30030': {
    message: "'idempotency_key' is invalid",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *idempotency_key* имеет некорректное значение.</br>Укажите корректный параметр *idempotency_key*. Максимальная длина 36 символов.',
  },
  '30031': {
    message: "missing parameter: 'depth'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *depth* является обязательным.</br>Укажите корректный параметр *depth*.',
  },
  '30032': {
    message: 'depth is invalid',
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *depth* имеет некорректное значение.</br>Укажите корректный параметр *depth*.',
  },
  '30033': {
    message: "missing parameter: 'trade_clearing_account' or 'class_code'",
    type: 'INVALID_ARGUMENT',
    description: 'Параметр *trade_clearing_account* или *class_code* не может быть пустым.',
  },
  '30034': {
    message: 'not enough balance',
    type: 'INVALID_ARGUMENT',
    description:
      'Недостаточно средств для совершения сделки (ошибка песочницы).</br>Пополните баланс нужной валюты c помощью метода [*SandboxPayIn*](https://russianinvestments.github.io/investAPI/sandbox#sandboxpayin).',
  },
  '30036': {
    message: "missing parameter: 'stop_price'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *stop_price* является обязательным.</br>Укажите корректный параметр *stop_price*.',
  },
  '30037': {
    message: "missing parameter: 'stop_order_type'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *stop_order_type* является обязательным.</br>Укажите корректный параметр *stop_order_type*.',
  },
  '30038': {
    message: "'stop_order_type' is invalid",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *stop_order_type* имеет некорректное значение.</br>Список доступных значений: [*stop_order_type*](https://russianinvestments.github.io/investAPI/stoporders/#stopordertype).',
  },
  '30040': {
    message: "'expire_date' is invalid",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *expire_date* имеет некорректное значение.</br>Укажите корректный параметр *expire_date*.',
  },
  '30041': {
    message: 'the method is available only for futures',
    type: 'INVALID_ARGUMENT',
    description:
      'Метод предназначен только для работы с фьючерсами.</br>Передайте во входные параметры метода идентификатор фьючерса.',
  },
  '30042': {
    message: 'not enough assets for a margin trade',
    type: 'INVALID_ARGUMENT',
    description:
      'Недостаточно активов для маржинальной сделки.</br>Проверьте маржинальные показатели счёта. Вы можете сделать это с помощью метода [*GetMarginAttributes*](https://russianinvestments.github.io/investAPI/users#getmarginattributes).',
  },
  '30043': {
    message: "missing parameter: 'expiration_type'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *expiration_type* является обязательным.</br>Укажите корректный параметр *expiration_type*.',
  },
  '30044': {
    message: "'expiration_type' is invalid",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *expiration_type* имеет некорректное значение.</br>Список доступных значений: [*expiration_type*](https://russianinvestments.github.io/investAPI/stoporders/#stoporderexpirationtype).',
  },
  '30045': {
    message: "missing parameter: 'ticker'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *ticker* является обязательным.</br>Укажите корректный параметр *ticker*.',
  },
  '30047': {
    message: 'price currency does not match the settlement currency',
    type: 'INVALID_ARGUMENT',
    description:
      'Валюта цены не совпадает с валютой расчётов по инструменту.</br>Укажите корректную валюту цены. Узнать валюту расчета конкретного инструмента вы можете с помощью метода [*GetInstrumentBy*](https://russianinvestments.github.io/investAPI/instruments#getinstrumentby). ',
  },
  '30048': {
    message: 'instrument type is not bond',
    type: 'INVALID_ARGUMENT',
    description:
      'Метод предназначен только для запроса информации по облигации.</br>Передайте во входные параметры метода идентификатор облигации.',
  },
  '30049': {
    message: 'post order error: %s',
    type: 'INVALID_ARGUMENT',
    description: 'Ошибка метода выставления торгового поручения.</br>Подробнее в тексте ошибки.',
  },
  '30050': {
    message: "'instrument_status' is invalid",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *instrument_status* имеет некорректное значение.</br>Список доступных значений: [*instrument_status*](https://russianinvestments.github.io/investAPI/instruments#instrumentstatus).',
  },
  '30051': {
    message: 'account margin status is disabled',
    type: 'INVALID_ARGUMENT',
    description:
      'Для данного договора недоступна маржинальная торговля.</br>Для выставления поручений на срочном рынке, необходимо включить маржинальную торговлю в приложении и терминале.',
  },
  '30052': {
    message: 'instrument forbidden for trading by API',
    type: 'INVALID_ARGUMENT',
    description:
      'Для данного инструмента недоступна торговля через API.</br>Вы можете проверить значение параметра api_trade_available_flag данного инструмента c помощью метода [*GetTradingStatus*](https://russianinvestments.github.io/investAPI/marketdata#gettradingstatus).',
  },
  '30053': {
    message: 'post stop_order error: %s',
    type: 'INVALID_ARGUMENT',
    description: 'Ошибка метода выставления стоп-заявки.</br>Подробнее в тексте ошибки.',
  },
  '30054': {
    message: 'instrument type is not a share or etf',
    type: 'INVALID_ARGUMENT',
    description: 'Тип инструмента не инвестиционный фонд или акция',
  },
  '30055': {
    message: 'order_id cannot be longer than 36 characters',
    type: 'INVALID_ARGUMENT',
    description: 'order_id не может быть длиннее 36 символов',
  },
  '30056': {
    message: 'stop order settlement currency is not supported',
    type: 'INVALID_ARGUMENT',
    description: 'Валюта выставления стоп-заявки не поддерживается',
  },
  '30057': {
    message: 'the order is a duplicate, but the order report was not found',
    type: 'INVALID_ARGUMENT',
    description:
      'Заявка является дублем, но отчет по заявке не найден.</br>Проверьте параметр order_id (идентификатор запроса выставления поручения для целей идемпотентности.) - он должен быть уникальным.',
  },
  '30058': {
    message: 'task not completed yet, please try again later',
    type: 'INVALID_ARGUMENT',
    description: 'Выполнение задачи еще не завершено, попробуйте позже.',
  },
  '30059': {
    message: 'cancel order error: %s',
    type: 'INVALID_ARGUMENT',
    description: 'Ошибка метода отмены заявки.</br>Подробнее в тексте ошибки.',
  },
  '30060': {
    message: 'cancel stop-order error: %s',
    type: 'INVALID_ARGUMENT',
    description: 'Ошибка метода отмены стоп-заявки.</br>Подробнее в тексте ошибки.',
  },
  '30061': {
    message: "'from' value out of range",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *from* имеет некорректное значение.</br>Укажите значение в пределах от 1970-01-01T00:00:00Z до 2099-12-31T23:59:59.999999999Z включительно.',
  },
  '30062': {
    message: "'to' value out of range",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *to* имеет некорректное значение.</br>Укажите значение в пределах от 1970-01-01T00:00:00Z до 2099-12-31T23:59:59.999999999Z включительно.',
  },
  '30063': {
    message: "'expire_date' value out of range",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *expire_date* имеет некорректное значение.</br>Дата должна быть не ранее текущей и не позднее 2099-12-31T23:59:59.999999999Z.',
  },
  '30064': {
    message: 'the required period should not exceed 31 days',
    type: 'INVALID_ARGUMENT',
    description: 'Запрошенный период не может превышать 31 дня.</br>Укажите корректный период.',
  },
  '30065': {
    message: "missing parameter: 'task_id'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *task_id* является обязательным.</br>Укажите корректный параметр *task_id*.',
  },
  '30066': {
    message: "missing parameter: 'payload'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *payload* является обязательным.</br>Укажите корректный параметр *payload*.',
  },
  '30067': {
    message: "'action_type' is invalid",
    type: 'INVALID_ARGUMENT',
    description: 'Некорректное значение *action_type*.</br>Выберите допустимое значение.',
  },
  '30068': {
    message: 'Only limit order is allowed',
    type: 'INVALID_ARGUMENT',
    description:
      'В настоящий момент возможно выставление только лимитного торгового поручения. Подробнее про [выставление торговых поручений](https://russianinvestments.github.io/investAPI/orders_details).',
  },
  '30069': {
    message: "Invalid parameter: 'limit'",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *limit* имеет некорректное значение.</br>Значение должно быть меньше или равно 1000.',
  },
  '30070': {
    message: "'from' can't be more than the current date",
    type: 'INVALID_ARGUMENT',
    description:
      'Входной параметр *from* имеет некорректное значение.</br>Укажите значение не превышающее текущую дату и время.',
  },
  '30077': {
    message: 'not available for OTC instruments',
    type: 'INVALID_ARGUMENT',
    description:
      'Метод недоступен для внебиржевых инструментов.</br>У таких инструментов параметр api_trade_available_flag метода [*GetTradingStatus*](https://russianinvestments.github.io/investAPI/marketdata#gettradingstatus) будет иметь значение false.',
  },
  '30078': {
    message: 'Incorrect minimum price increment',
    type: 'INVALID_ARGUMENT',
    description:
      'Некорректный шаг изменения цены.</br>Остаток от деления price на min_price_increment должен быть равен 0.',
  },
  '30079': {
    message: 'instrument is not available for trading',
    type: 'INVALID_ARGUMENT',
    description:
      'Инструмент недоступен для торгов. Подробнее о [торговых статусах](https://russianinvestments.github.io/investAPI/faq_trading_status).',
  },
  '30080': {
    message: 'quantity must be positive',
    type: 'INVALID_ARGUMENT',
    description: 'Количество лотов должно быть положительным числом.',
  },
  '30081': {
    message: 'account status is closed',
    type: 'INVALID_ARGUMENT',
    description: 'Аккаунт закрыт.',
  },
  '30082': {
    message: 'account status is blocked',
    type: 'INVALID_ARGUMENT',
    description: 'Аккаунт заблокирован.',
  },
  '30083': {
    message: 'order_type is invalid',
    type: 'INVALID_ARGUMENT',
    description: 'Некорректный тип заявки.',
  },
  '30084': {
    message: 'maximum request period has been exceeded',
    type: 'INVALID_ARGUMENT',
    description: 'Превышен лимит запрашиваемого периода.',
  },
  '30085': {
    message: 'price in points is available only for futures and bonds',
    type: 'INVALID_ARGUMENT',
    description: 'Тип цены в пунктах доступен только для фьючерсов и облигаций.',
  },
  '30086': {
    message: 'year is invalid',
    type: 'INVALID_ARGUMENT',
    description: 'Некорректный год.',
  },
  '30087': {
    message: 'missing parameter: query',
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *query* является обязательным.</br>Укажите не пустой параметр *query*.',
  },
  '30088': {
    message: "'from' and 'to' must have the same year",
    type: 'INVALID_ARGUMENT',
    description: 'Запрашиваемые даты должны быть в рамках одного года.',
  },
  '30089': {
    message: "'to' must not be later than %s",
    type: 'INVALID_ARGUMENT',
    description: 'Поле to не должно быть позднее даты, указанной в тексте ошибки.</br>Дата указана в формате ISO 8601.',
  },
  '30090': {
    message: "missing parameter: 'siebel_id'",
    type: 'INVALID_ARGUMENT',
    description: 'Входной параметр *siebel_id* является обязательным.</br>Укажите корректный параметр *siebel_id*.',
  },
  '30091': {
    message: "quantity of instruments can't be more than 100",
    type: 'INVALID_ARGUMENT',
    description: 'Количество инструментов не может превышать 100.',
  },
  '30092': {
    message: 'trading unavailable on weekends',
    type: 'INVALID_ARGUMENT',
    description:
      'Торги недоступны по нерабочим дням. Больше о [торговых сессиях](https://russianinvestments.github.io/investAPI/markets).',
  },
  '30093': {
    message: "missing parameter: 'figi' or 'instrument_id'",
    type: 'INVALID_ARGUMENT',
    description: 'Один из параметров *figi* или *instrument_id* является обязательным.',
  },
  '30094': {
    message: 'options trading is not available at the moment',
    type: 'INVALID_ARGUMENT',
    description: 'Выставление заявок по опционам недоступно.',
  },
  '30095': {
    message: 'the request was not executed by the exchange',
    type: 'INVALID_ARGUMENT',
    description:
      'Заявка не исполнена биржей.</br>Лимитная заявка может не исполняться по причине недостижения установленной цены на бирже.</br>Рыночная же может не исполняться по причине отсутствия сделок с данными инструментов (низкая ликвидность).',
  },
  '30096': {
    message: 'the order was rejected, try again later',
    type: 'INVALID_ARGUMENT',
    description: 'Заявка отклонена, попробуйте повторить позже.',
  },
  '30097': {
    message: 'inappropriate trading session',
    type: 'INVALID_ARGUMENT',
    description:
      'Сейчас эта сессия не идёт. Больше о [торговых сессиях](https://russianinvestments.github.io/investAPI/markets).',
  },
  '30098': {
    message: 'currently, there is no trading on this financial instrument',
    type: 'INVALID_ARGUMENT',
    description:
      'Торги по этому финансовому инструменту сейчас не проводятся.</br>Вы можете проверить актуальный торговый статус инструмента с помощью метода [*GetTradingStatus*](https://russianinvestments.github.io/investAPI/marketdata#gettradingstatus).',
  },
  '30099': {
    message: 'the price is outside the limits for this instrument',
    type: 'INVALID_ARGUMENT',
    description:
      'Цена вне лимитов по инструменту или цена сделки вне лимита. Подробнее про [выставление торговых поручений](https://russianinvestments.github.io/investAPI/orders_details).',
  },
  '30100': {
    message: 'the price must be positive',
    type: 'INVALID_ARGUMENT',
    description: 'Цена должна быть положительной.',
  },
  '30101': {
    message: 'to trade this financial instrument, pass the test',
    type: 'INVALID_ARGUMENT',
    description:
      'Для торговли этим инструментом пройдите тестирование. О том, как сдать тестирование и кому оно нужно читайте [тут](https://www.tinkoff.ru/blog/articles/test-invest/).',
  },
  '30102': {
    message: 'Required parameters missing',
    type: 'INVALID_ARGUMENT',
    description: 'Не правильно указаны обязательные параметры.',
  },
  '30103': {
    message: 'Only best price is allowed',
    type: 'INVALID_ARGUMENT',
    description: 'Для инструмента доступно выставление заявки только типа лучшая цена',
  },
  '30104': {
    message: 'price_type is invalid',
    type: 'INVALID_ARGUMENT',
    description:
      'Некорректное значение *price_type*. Значением *price_type* может быть только **PRICE_TYPE_POINT** ИЛИ **PRICE_TYPE_CURRENCY**.',
  },
  '30105': {
    message: 'exchange_order_type is invalid',
    type: 'INVALID_ARGUMENT',
    description:
      'Некорректное значение *exchange_order_type*. Значением *exchange_order_type* может быть только **LIMIT** ИЛИ **MARKET**.',
  },
  '30106': {
    message: 'status is invalid',
    type: 'INVALID_ARGUMENT',
    description:
      'Некорректное значение *status*. Значением *status* может быть только **ACTIVE**, **EXCECUTED**, **CANCELED** И **EXPIRED**.',
  },
  '30107': {
    message: 'negative values are not allowed',
    type: 'INVALID_ARGUMENT',
    description:
      'Некорректное значение *limit* и/или *page*. Параметры *limit* и *page* не могут принимать отицательные значения.',
  },
  '30108': {
    message: 'specify a lower limit or page value because there are fewer brands',
    type: 'INVALID_ARGUMENT',
    description: 'Количество брендов меньше запрашиваемых параметров.',
  },
  '40002': {
    message: 'insufficient privileges',
    type: 'PERMISSION_DENIED',
    description:
      'Недостаточно прав для совершения операции.</br>Токен доступа имеет уровень прав read-only, либо у токена нет доступа к указанному счету.</br>Подробнее: [Виды токенов](https://russianinvestments.github.io/investAPI/index#_2)',
  },
  '40003': {
    message: 'authentication token is missing or invalid',
    type: 'UNAUTHENTICATED',
    description:
      'Токен доступа не найден или не активен.</br>Вы можете выпустить новый токен по ссылке [Настройки](https://www.tinkoff.ru/invest/settings/)',
  },
  '40004': {
    message: 'Working with orders is not available with this account',
    type: 'PERMISSION_DENIED',
    description:
      'Выставление заявок недоступно с текущего аккаунта.</br>Брокерский счет не найден, не принадлежит пользователю или закрыт, либо на пользователе ограничения (от Tinkoff Invest API или от биржи). В этом случае нужно обратиться в техподдержку. ',
  },

  '50001': {
    message: 'exchange not found',
    type: 'NOT_FOUND',
    description: 'Биржа не найдена по переданному *exchange_id*.</br>Укажите корректный *exchange_id*.',
  },
  '50002': {
    message: 'instrument not found',
    type: 'NOT_FOUND',
    description: 'Инструмент не найден.</br>Укажите корректный идентификатор инструмента.',
  },
  '50004': {
    message: 'account not found',
    type: 'NOT_FOUND',
    description: 'Счёт не найден по переданному *account_id*.</br>Укажите корректный *account_id*.',
  },
  '50005': {
    message: 'order not found',
    type: 'NOT_FOUND',
    description: 'Торговое поручение не найдено по переданному *order_id*.</br>Укажите корректный *order_id*.',
  },
  '50006': {
    message: 'stop-order not found',
    type: 'NOT_FOUND',
    description: 'Стоп-заявка не найдена по переданному *stop_order_id*.</br>Укажите корректный *stop_order_id*.',
  },
  '50007': {
    message: 'task not found',
    type: 'NOT_FOUND',
    description: 'Задача не найдена.',
  },
  '50008': {
    message: 'no orderbook provider',
    type: 'NOT_FOUND',
    description: 'Отсутствует источник данных по стаканам.',
  },
  '50009': {
    message: 'asset not found',
    type: 'NOT_FOUND',
    description: 'Актив не найден.</br>Укажите корректный идентификатор актива.',
  },
  '50010': {
    message: 'brand not found',
    type: 'NOT_FOUND',
    description: 'Бренд не найден.</br>Укажите корректный идентификатор бренда.',
  },
  '70001': {
    message: 'internal error',
    type: 'INTERNAL',
    description: 'Внутренняя ошибка сервиса.</br>Если ошибка повторяется, обратитесь в службу технической поддержки.',
  },
  '70002': {
    message: 'internal network error',
    type: 'INTERNAL',
    description:
      'Неизвестная сетевая ошибка, попробуйте выполнить запрос позднее.</br>Если ошибка повторяется, обратитесь в службу технической поддержки.',
  },
  '70003': {
    message: 'internal error, please try again later',
    type: 'INTERNAL',
    description:
      'Внутренняя ошибка сервиса, попробуйте выполнить запрос позднее.</br>Если ошибка повторяется, обратитесь в службу технической поддержки.',
  },
  '80001': {
    message: 'limit of open streams exceeded',
    type: 'RESOURCE_EXHAUSTED',
    description:
      'Превышен лимит одновременных открытых stream-соединений. Подробнее: [Лимитная политика](https://russianinvestments.github.io/investAPI/limits/)',
  },
  '80002': {
    message: 'request limit exceeded',
    type: 'RESOURCE_EXHAUSTED',
    description:
      'Превышен лимит запросов в минуту. Подробнее: [Лимитная политика](https://russianinvestments.github.io/investAPI/limits/)',
  },
  '80003': {
    message: 'The limit on SMS sending has been exceeded, try again in a minute',
    type: 'RESOURCE_EXHAUSTED',
    description:
      'Превышен лимит на отправку СМС, попробуйте через минуту. Если вы не хотите получать СМС при выставлении заявки, отключите отправку СМС в ЛК.',
  },
  '90001': {
    message: 'need confirmation: %s',
    type: 'FAILED_PRECONDITION',
    description: 'Требуется подтверждение операции.</br>Подробнее в тексте ошибки.',
  },
  '90002': {
    message: 'only for qualified investors',
    type: 'FAILED_PRECONDITION',
    description: 'Торговля этим инструментом доступна только квалифицированным инвесторам.',
  },
  '90003': {
    message: 'The price is too high',
    type: 'FAILED_PRECONDITION',
    description:
      'Цена заявки слишком высокая. Разбейте заявку на заявки меньшего размера. Подробнее: [Ограничения на стоимость заявки](https://russianinvestments.github.io/investAPI/faq_orders/).',
  },
};
