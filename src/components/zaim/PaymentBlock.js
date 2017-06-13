import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import NumberFormat from 'react-number-format'
import {changePaymentParams} from '../../actions/index'

class PaymentBlock extends React.Component {
  constructor(props) {
    super(props)
    const amount = this.props.payment.params.amount ? this.props.payment.params.amount : this.props.payment.amount
    this.state = {amount: amount / 100}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e, value) {
    const amount = value === '0.00' ? '' : value
    this.setState({amount, error: null})
  }

  handleSubmit() {
    const amount = this.state.amount;
    if (amount === '') {
      this.setState({error: 'Необходимо ввести сумму платежа'});
      return
    }
    if (parseFloat(amount) < 1.00) {
      this.setState({error: 'Минимальная сумма для оплаты 1.00 рубль'});
      return
    }
    const { client, activeLoan } = this.props.info
    this.props.dispatch(changePaymentParams(amount, activeLoan, client))
  }

  render() {
    const { amount, error } = this.state;

    return (
      <div className="row zaim-info">
        <div className="col-xs-12 col-sm-6">
          <span className="subhead font-bold">Оплатить картой онлайн:</span><br/>
          <label htmlFor="amount">Сумма, руб.</label>
          {error && <span className="error-text">&nbsp;&nbsp;{error}</span>}
          <NumberFormat
            className="form-control" value={amount} onChange={this.handleChange}
            decimalPrecision={2} thousandSeparator={' '} /><br/>
          <button className="btn btn-success btn-lg btn-block" onClick={this.handleSubmit}>Продолжить</button>
          <br/>
          <div>
            <p>
              Оплата с карты производиться мгновенно и только в адрес ООО МКК «Джет Мани Микрофинанс» в целях погашения или продления займа.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

PaymentBlock.propTypes = {
  info: PropTypes.object,
  payment: PropTypes.object,
  dispatch: PropTypes.func,
}

const mapStateToProps = (state) => {
  const {payment, info} = state
  return {
    payment, info,
  }
}

export default connect(mapStateToProps)(PaymentBlock)