import React, {PropTypes} from 'react'
import OperationDetails from '../OperationDetails'

const PaymentResultPage = ({location}) => {
  const {query} = location
  const success = query.Success === "true"
  const operationDetails = <OperationDetails details={query}/>

  return (
    <div id="row zaim-info">
      {success &&
      <div className="notify successbox">
        <h1>Платеж успешен!</h1><br/>
        <span className="alerticon"><img src="../../img/ok_alt.png"/></span>
        {operationDetails}
      </div>
      }

      {!success &&
      <div className="notify errorbox">
        <h1>Платеж отклонен.</h1>
        <span className="alerticon"><img src="../../img/error_alt.png"/></span>
        {operationDetails}
      </div>
      }
    </div>
  )
}

PaymentResultPage.propTypes = {
  location: PropTypes.object,
}

export default PaymentResultPage