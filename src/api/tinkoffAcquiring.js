/* global doPay */
/* global TINKOFF_TERMINAL_KEY */

export function makePayment(amount, orderId, description, name, phone) {
  const params = {
    // Код магазина (обязательный параметр), выдается банком.
    TerminalKey: TINKOFF_TERMINAL_KEY,
    // Сумма заказа в копейках (обязательный параметр)
    Amount: amount,
    // Номер заказа (если не передан, принудительно устанавливается timestamp)
    OrderId: `${orderId}-${Date.now()}`,
    // Описание заказа (не обязательный параметр)
    Description: description,
    // Дополнительные параметры платежа
    DATA: `Phone=${phone}|Name=${name}`,
    // Флаг открытия платежной формы во фрейме: false - в отдельном окне, true - в текущем окне.
    Frame: false,
    // Язык формы оплаты: ru - русский язык, en - английский язык
    Language: "ru",
  }
  doPay(params)

}