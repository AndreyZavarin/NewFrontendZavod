import React, {PropTypes} from 'react'
import moment from 'moment'

const LoanBidState = ({loanBid}) => {
  const state = loanBid.state
  if (!state) {
    return null
  }
  if (state === 'AutoConfirm') {
    return <span className="success">Гарантированный займ - обратитесь в офис</span>
  }
  if (state === 'Confirm' || state === 'PendingSignature' || state === 'Signed') {
    return <span className="success">Заявка на займ одобрена - обратитесь в офис</span>
  }
  if (state === 'GiveOut') {
    const loan = loanBid.loan
    if (!loan) {
      return <span className="reject">Отказ</span>
    }
    if (loan.state === "PayedOff") {
      return <span>Погашен</span>
    }
    if (loan.state === "Active") {
      const { nextPaymentDate, dateAgreementRepayment } = loan
      if (moment().endOf('day').diff(nextPaymentDate, 'days') > 0) {
        return <span className="reject">Просрочен</span>
      }
      if (!moment(nextPaymentDate).isSame(moment(dateAgreementRepayment), 'day')) {
        return <span>Отсрочка</span>
      }
      return <span className="success">Выдан</span>
    }
    return null
  }
  if (state === 'Decline') {
    const { isAutoLoanBid, rmDecision } = loanBid
    if (isAutoLoanBid && rmDecision !== 'REJECTED') {
      return <span>Гарантированный займ - не востребована</span>
    }
    if (rmDecision === 'NO_DECISION' || rmDecision === 'ACCEPTED') {
      return <span>Не востребована</span>
    }
    return <span className="reject">Отказ</span>
  }
  return <span className="process">На рассмотрении</span>
}

LoanBidState.propTypes = {
  loanBid: PropTypes.object.isRequired,
}

export default LoanBidState