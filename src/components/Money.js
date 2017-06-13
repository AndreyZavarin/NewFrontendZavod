import React, { PropTypes } from 'react'
import wNumb from '../scripts/wNumb'

const simpleDelimiter = wNumb({
  decimals: 2, // default is 2
  mark: ', ',
  thousand: ' ', // thousand delimiter
})

const withoutPenny = wNumb({
  decimals: 0,
  thousand: ' ', // thousand delimiter
})

const Money = ({amount, usePenny = true, className = "font-bold"}) => {
  const formatter = usePenny ? simpleDelimiter : withoutPenny
  return <span className={className}>{formatter.to(Math.ceil(amount) / 100)} руб</span>
}

Money.propTypes = {
  amount: PropTypes.number.isRequired,
  usePenny: PropTypes.bool,
  className: PropTypes.string,
}

export default Money