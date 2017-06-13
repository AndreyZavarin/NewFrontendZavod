import React, {PropTypes} from 'react'
import moment from 'moment'
import {formatDay} from '../../scripts/utils'
import AccessIsNotPossibleShort from '../../components/AccessIsNotPossibleShort'
import Money from '../../components/Money'

const LoanInfo = ({loan, allPayment}) => {
  const {financeState, number, dateActivation, issueAmount} = loan
  return (
    <div className="row zaim-info" style={{marginBottom: 25}}>
      <div className="col-xs-12 col-sm-6">
        <span className="subhead font-bold">Основная информация:</span><br />
        <p>Номер договора: <span className="font-bold">{number}</span></p>
        <p>Дата договора: <span className="font-bold">{moment(dateActivation).format('DD.MM.YYYY')}</span></p>
        <p>Сумма займа: <Money amount={issueAmount} /></p>
      </div>
      <div className="col-xs-12 col-sm-6">
        <span className="subhead font-bold">Дополнительная информация:</span><br />
        <p>Дней просрочки: <span className="font-bold">{formatDay(financeState.currentDelay)}</span></p>
        {allPayment ? <p>Сумма задолженности: <Money amount={allPayment} /></p> : <AccessIsNotPossibleShort />}
      </div>
    </div>
  )
}

LoanInfo.propTypes = {
  loan: PropTypes.object.isRequired,
  allPayment: PropTypes.number,
}

export default LoanInfo