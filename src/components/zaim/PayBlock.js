import React, {PropTypes} from 'react'
import moment from 'moment'
import AccessIsNotPossibleShort from '../../components/AccessIsNotPossibleShort'
import Money from '../../components/Money'

/* global yaCounter40266419 */

const PayBlock = ({activeLoan, allPayment, allPaymentOnRepaymentDate, onPayment}) => {
  const amount = moment().isAfter(activeLoan.nextPaymentDate) ? allPayment : allPaymentOnRepaymentDate

  if (!amount) {
    return <div className="row pay-block" style={{padding: '10px', height: '170px'}}><AccessIsNotPossibleShort /></div>
  }
  const dateAgreementRepayment = activeLoan.dateAgreementRepayment
  const nextPaymentDate = activeLoan.nextPaymentDate
  const amountForPayLabel = moment().diff(nextPaymentDate, 'days') > 0 ? 'Сумма погашения на сегодня' : 'Сумма к погашению'
  const finishDateLabel = moment(nextPaymentDate).isSame(moment(dateAgreementRepayment), 'day') ? 'Дата погашения по договору' : 'Дата погашения с учётом продления'
  return (
    <div className="row pay-block">
      <div className="col-xs-8 col-md-12">
        <p>{amountForPayLabel}:&nbsp; <br/><Money amount={amount}/></p>
        <p>{finishDateLabel}:&nbsp; <span className="font-bold">{moment(nextPaymentDate).format('DD.MM.YYYY')}</span></p>
        <div className="pay-button-cont">
          <span className="visible-md visible-lg"><br/></span>
          <button onClick={() => { yaCounter40266419.reachGoal('repay'); onPayment() }} className="pay-button">Оплатить</button>
        </div>
      </div>
    </div>
  )
}

PayBlock.propTypes = {
  activeLoan: PropTypes.object.isRequired,
  onPayment: PropTypes.func,
  allPayment: PropTypes.number,
  allPaymentOnRepaymentDate: PropTypes.number,
}

export default PayBlock