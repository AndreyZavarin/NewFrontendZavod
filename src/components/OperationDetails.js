import React, {PropTypes} from 'react'
import Money from './Money'

const OperationDetails = ({details}) => {
  const divStyle = {
    fontSize: '16px',
  }
  return (
    <div style={divStyle}>
      <p>Сумма платежа: <Money amount={parseInt(details.Amount)}/></p>
      <p>Детали платежа: <span className="font-bold">{details.Details}</span></p>
      <p>Номер заказа: <span className="font-bold"> {details.OrderId}</span></p>
      <p>Номер платежа: <span className="font-bold">{details.PaymentId}</span></p>
      <p>Телефон плательщика: <span className="font-bold">{details.PhonesReq}</span></p>
    </div>
  )
}

OperationDetails.propTypes = {
  details: PropTypes.object,
}

export default OperationDetails