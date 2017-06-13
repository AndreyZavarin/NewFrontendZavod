import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Money from '../../components/Money'
import {requestPayment} from '../../actions'
import PaymentBlock from '../../components/zaim/PaymentBlock'
import WaitingForData from '../../components/WaitingForData'

import AcquiringBlock from '../../components/zaim/AcquiringBlock'

class PaymentPage extends React.Component {

  componentDidMount() {
    const {dispatch, payment, info} = this.props

    if (!payment.msg || !payment.amount) {
      const activeLoan = info.activeLoan
      const amount = activeLoan.financeState.fullDebt
      dispatch(requestPayment(amount, "Платеж в счет займа"))
    }
  }

  render() {
    const { msg, amount, params } = this.props.payment
    const actionConfirm = Object.keys(params).length !== 0

    if (!msg || !amount) {
      return <WaitingForData />
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-md-3">
          <div className="row pay-block" style={{height: '148px'}}>
            <div className="col-xs-8 col-md-12">
              <p>{msg}:<br/>
                <Money amount={amount}/>
              </p>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-9">
          {!actionConfirm && <PaymentBlock/>}
        </div>
        <div className="col-xs-12 col-md-9">
          {actionConfirm && <AcquiringBlock/>}
        </div>
      </div>
    )
  }
}

PaymentPage.propTypes = {
  dispatch: PropTypes.func,
  info: PropTypes.object,
  payment: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  const {info, payment} = state
  return {info, payment}
}

export default connect(mapStateToProps)(PaymentPage)