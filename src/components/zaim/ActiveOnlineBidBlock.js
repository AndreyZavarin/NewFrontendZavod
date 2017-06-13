import React, {PropTypes} from 'react'
import moment from 'moment'
import Money from '../../components/Money'
import {formatDay} from '../../scripts/utils'

const ActiveOnlineBidBlock = ({lastOnlineBid}, {helpPhone}) => {
  if (lastOnlineBid.state === 'Created' || lastOnlineBid.state === 'Started') {
    return (
      <div className="row no-block" style={{height: '253px'}}>
        <div className="col-xs-8 col-md-12">
          <p><span className="subhead font-bold">Ваша онлайн заявка находится на стадии рассмотрения!</span></p>
          <p>Сумма:&nbsp; <Money amount={lastOnlineBid.amount} usePenny={false}/>
            {lastOnlineBid.duration ? ' Срок: ' : ''}
            {lastOnlineBid.duration ? <span className="font-bold">{formatDay(lastOnlineBid.duration)}</span> : ''}
          </p>
          <p>Служба поддержки:<br/>{helpPhone}<br/>
            <span className="grey-text">бесплатные звонки по всей России</span>
          </p>
        </div>
      </div>
    )
  }
  if (lastOnlineBid.state === 'Accepted') {
    // TODO срок действия заявки брать бекэнда
    return (
      <div className="row get-block" style={{height: '253px'}}>
        <div className="col-xs-8 col-md-12">
          <p><span className="font-bold">Ваша заявка предварительно одобрена</span></p>
          <p>Сумма:&nbsp; <Money amount={lastOnlineBid.amount} usePenny={false}/>
            {lastOnlineBid.duration ? ' Срок: ' : ''}
            {lastOnlineBid.duration ? <span className="font-bold">{formatDay(lastOnlineBid.duration)}</span> : ''}
          </p>
          <p>Получите деньги обратившись в ближайший офис "Ваши деньги"&nbsp;
            <span className="font-bold">до {moment(lastOnlineBid.dateCreated).add(5, 'day').format('DD.MM.YYYY')}</span>
          </p>
        </div>
      </div>
    )
  }
  return null // activeOnlineBid.state === 'Processed' || activeOnlineBid.state === 'Rejected'
}

ActiveOnlineBidBlock.propTypes = {
  lastOnlineBid: PropTypes.object.isRequired,
}

ActiveOnlineBidBlock.contextTypes = {
  helpPhone: React.PropTypes.string,
}

export default ActiveOnlineBidBlock
