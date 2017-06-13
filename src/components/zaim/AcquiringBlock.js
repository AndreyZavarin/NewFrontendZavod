import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {erasePaymentParams} from '../../actions/index'
import {makePayment} from '../../api/tinkoffAcquiring'
import {formatMoney2} from '../../scripts/utils'

class AcquiringBlock extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillUnmount() {
    this.props.dispatch(erasePaymentParams())
  }

  handleSubmit() {
    const {amount, fio, loanId, phoneNumber, description} = this.props.paymentInfo

    makePayment(parseFloat(amount) * 100, loanId, description, fio, phoneNumber)
  }

  render() {
    const {amount, fio, loanId, phoneNumber, description} = this.props.paymentInfo
    return (
      <div className="row zaim-info">
        <div className="col-xs-12 col-sm-6">
          <span className="subhead font-bold">Параметры платежа:</span><br/>
          <p>Сумма заказа: <span className="font-bold">{formatMoney2(amount)} рублей</span></p>
          <p>Номер заказа: <span className="font-bold">{loanId}</span></p>
          <p>Описание заказа: <span className="font-bold">{description}</span></p>
          <p>ФИО плательщика: <span className="font-bold">{fio}</span></p>
          <p>Контактный телефон: <span className="font-bold">{phoneNumber}</span></p>
          <br/>
          <button className="btn btn-success btn-lg btn-block" onClick={this.handleSubmit}>Оплатить</button>
        </div>
      </div>
    )
  }
}

AcquiringBlock.propTypes = {
  paymentInfo: PropTypes.object,
  dispatch: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    paymentInfo: state.payment.params,
  }
}

export default connect(mapStateToProps)(AcquiringBlock)
