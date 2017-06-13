import React, {PropTypes} from 'react'
import moment from 'moment'
import {formatDay} from '../../scripts/utils'
import Money from '../../components/Money'
import LoanBidState from '../../components/zaim/LoanBidState'
import OnlineBidState from '../../components/zaim/OnlineBidState'

const Loanbids = ({loanBids, lastOnlineBid}) => (
  <div className="row zaim-info">
    <div className="col-xs-12">
      <br/>
      <span className="subhead font-bold" style={{marginTop: -15}}>Заявки на займ:</span>
      <table className="history table">
        <tbody>
          {lastOnlineBid && (loanBids.length <= 0 || moment(lastOnlineBid.dateCreated).isAfter(loanBids[0].dateCreated)) ?
            <tr>
              <td>{moment(lastOnlineBid.dateCreated).format('DD.MM.YYYY')}</td>
              <td><Money amount={lastOnlineBid.amount} usePenny={false} className=""/></td>
              <td>{formatDay(lastOnlineBid.duration)}</td>
              <td style={{width: '50%'}}><OnlineBidState bid={lastOnlineBid}/></td>
            </tr> : null }

          {loanBids.map((item, index) => (
            <tr key={index}>
              <td>{moment(item.dateCreated).format('DD.MM.YYYY')}</td>
              <td><Money amount={item.amount} usePenny={false} className=""/></td>
              <td>{formatDay(item.duration)}</td>
              <td style={{width: '50%'}}><LoanBidState loanBid={item}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

Loanbids.propTypes = {
  loanBids: PropTypes.array.isRequired,
  lastOnlineBid: PropTypes.object,
}

export default Loanbids