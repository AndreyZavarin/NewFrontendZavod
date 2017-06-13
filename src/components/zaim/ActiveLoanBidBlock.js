import React, {PropTypes} from 'react'
import moment from 'moment'

import Money from '../../components/Money'
import GetLoanCall from '../../components/GetLoanCall'
import {formatDay} from '../../scripts/utils'

const ActiveLoanBidBlock = ({activeLoanBid}, {helpPhone}) => {
  if (activeLoanBid.state === 'AutoConfirm') {
    return (
      <div className="row get-block">
        <div className="col-xs-8 col-md-12">
          <p><span className="font-bold">Вам одобрен новый займ!</span></p>
          <p>Сумма:&nbsp; <Money amount={activeLoanBid.amount} usePenny={false}/> Срок:&nbsp;
            <span className="font-bold">{formatDay(activeLoanBid.duration)}</span>
          </p>
          <p>Мы гарантируем получение займа при обращении в любой офис "Ваши деньги"&nbsp;
            <span className="font-bold">до {moment().add(activeLoanBid.durationLife, 'day').format('DD.MM.YYYY')}</span>
          </p>
        </div>
        <GetLoanCall />
      </div>
    )
  }
  if (activeLoanBid.state === 'Signed' || activeLoanBid.state === 'PendingSignature' || activeLoanBid.state === 'Confirm') {
    return (
      <div className="row get-block">
        <div className="col-xs-8 col-md-12">
          <p><span className="font-bold">Ваша заявка одобрена, Вас ожидают в офисе!</span></p>
          <p>Сумма:&nbsp; <Money amount={activeLoanBid.amount} usePenny={false}/> Срок:&nbsp;
            <span className="font-bold">{formatDay(activeLoanBid.duration)}</span>
          </p>
          <p>Получите деньги обратившись в офис "Ваши деньги"&nbsp;
            <span className="font-bold">до {moment().add(activeLoanBid.durationLife, 'day').format('DD.MM.YYYY')}</span>
          </p>
        </div>
        <GetLoanCall />
      </div>
    )
  }
  if (activeLoanBid.state === 'Decline') {
    return (
      <div className="row pay-block">
        <div className="col-xs-8 col-md-12">
          <p><span className="font-bold">Ваша заявка на займ отклонена!</span></p>
          <p>Служба поддержки:<br/>{helpPhone}<br/><span className="grey-text">бесплатные звонки по всей России</span></p>
        </div>
      </div>
    )
  }
  if (activeLoanBid.state === 'GiveOut') {
    return (
      <div className="row pay-block">
        <div className="col-xs-8 col-md-12">
          <p><span className="font-bold">Займ выдан</span></p>
        </div>
      </div>
    )
  }
  if (activeLoanBid.state === 'New' || activeLoanBid.state === 'Amend') {
    return (
      <div className="row get-block">
        <div className="col-xs-8 col-md-12">
          <p><span className="font-bold">Заявка оформляется</span></p>
        </div>
        <GetLoanCall />
      </div>
    )
  }
  // PutOff, RestrictionsAreSpecified, ScoringStopFactors, Scoring, ConfirmVerification, Rejected, Amend, Inspected, Processing, Request, New
  return (
    <div className="row get-block">
      <div className="col-xs-8 col-md-12">
        <p><span className="font-bold">Заявка ожидает принятия решения</span></p>
      </div>
      <GetLoanCall />
    </div>
  )
}

ActiveLoanBidBlock.propTypes = {
  activeLoanBid: PropTypes.object.isRequired,
}

ActiveLoanBidBlock.contextTypes = {
  helpPhone: React.PropTypes.string,
}

export default ActiveLoanBidBlock
