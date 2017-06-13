import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {fetchInfoIfNeeded, requestPayment} from '../../actions'
import WaitingForData from '../../components/WaitingForData'
import ActiveLoanBidBlock from '../../components/zaim/ActiveLoanBidBlock'
import ActiveOnlineBidBlock from '../../components/zaim/ActiveOnlineBidBlock'
import NoLoans from '../../components/zaim/NoLoans'
import Loanbids from '../../components/zaim/Loanbids'
import DeferredPayment from '../../components/zaim/DeferredPayment'
import PayBlock from '../../components/zaim/PayBlock'
import LoanInfo from '../../components/zaim/LoanInfo'
import BidCalculator from '../BidCalculator'

class ZaimPage extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchInfoIfNeeded())
  }

  showPaymentPage(amount, msg) {
    this.props.dispatch(requestPayment(amount, msg))
    browserHistory.push('/payment')
  }

  render() {
    const {isFetching, hasData, info} = this.props

    if (isFetching || !hasData) {
      return <WaitingForData />
    }

    const {client, activeLoan, activeLoanBid, lastOnlineBid, loanBids} = info
    const allPayment = activeLoan ? activeLoan.financeState.fullDebt : null
    const allPaymentOnRepaymentDate = activeLoan ? activeLoan.financeStateOnRepaymentDate.fullDebt : null
    const noLoans = !activeLoan && !activeLoanBid && (!lastOnlineBid || lastOnlineBid.state === 'Rejected' || lastOnlineBid.state === 'Processed')
    const showBidCalculator = !activeLoan && (!activeLoanBid || activeLoanBid.state === 'AutoConfirm')
    const showLoanBids = (loanBids.length > 0 || lastOnlineBid)
    return (
      <div className="row">
        <div className="col-xs-12 col-md-3">
          {activeLoan && <PayBlock
            activeLoan={activeLoan}
            allPayment={allPayment}
            allPaymentOnRepaymentDate={allPaymentOnRepaymentDate}
            onPayment={() => this.showPaymentPage(allPayment, "Необходимая сумма для полного погашения займа сегодня")}/>}
          {activeLoanBid && <ActiveLoanBidBlock activeLoanBid={activeLoanBid}/>}
          {lastOnlineBid && <ActiveOnlineBidBlock lastOnlineBid={lastOnlineBid}/>}
          {noLoans && <NoLoans/>}
        </div>
        <div className="col-xs-12 col-md-9">
          {showBidCalculator && <BidCalculator interestRate={client.isPensioner ? 1.7 : 2}/>}
          <DeferredPayment
            activeLoan={activeLoan} finStates={this.props.finStates}
            onPayment={(x) => this.showPaymentPage(x, "Необходимая сумма для продления договора")}/>
          {activeLoan && <LoanInfo loan={activeLoan} allPayment={allPayment}/>}
          {showLoanBids && <Loanbids loanBids={loanBids} lastOnlineBid={lastOnlineBid}/>}
        </div>
      </div>
    )
  }
}

ZaimPage.propTypes = {
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  hasData: PropTypes.bool.isRequired,
  info: PropTypes.object,
  finStates: PropTypes.object,
}

const mapStateToProps = (state) => {
  const info = state.info
  return {
    info,
    isFetching: info.isFetching,
    hasData: info.has,
    finStates: state.finStates,
    acquiring: info.acquiring,
  }
}

export default connect(mapStateToProps)(ZaimPage)
