import wNumb from './wNumb'

export function inflectDay(number) {
  if (number === undefined || number === null) {
    return ''
  }
  const number1 = Math.abs(number) % 100
  const number2 = number1 % 10
  if (number1 >= 11 && number1 <= 19) return 'дней'
  if (number2 >= 2 && number2 <= 4) return 'дня'
  if (number2 === 1) return 'день'
  return 'дней'
}

export function formatDay(number) {
  if (number === undefined || number === null) {
    return ''
  }
  return `${number} ${inflectDay(number)}`
}


const simpleDelimiter = wNumb({
  decimals: 0,
  thousand: ' ',
})

export function formatMoney(money) {
  return simpleDelimiter.to(money)
}

const simpleDelimiter2 = wNumb({
  decimals: 2,
  thousand: ' ',
  mark: ',',
})

export function formatMoney2(money) {
  return simpleDelimiter2.to(parseFloat(money))
}