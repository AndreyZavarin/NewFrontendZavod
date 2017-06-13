import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Slider from '../components/Slider'
import CreateOnlineBidButton from '../components/CreateOnlineBidButton'
import {bidCalculatorChange} from '../actions'
import {inflectDay, formatMoney} from '../scripts/utils'


class BidCalculator extends Component {

  sliderChange(name, value) {
    const data = {
      [name]: value,
    }
    this.props.dispatch(bidCalculatorChange(data))
  }

  render() {
    const { minAmount, maxAmount, minDuration, maxDuration, stepAmount, stepDuration, calculator } = this.props
    const { amount, duration, percents, fullAmount } = calculator

    return (
      <div className="row calc-block" style={{marginBottom: 35}}>
        <div className="col-xs-12">
          <div className="row calc-block-top">
            <div className="col-xs-12 col-sm-6 runner-block">
              <span className="left-text">Сумма займа:</span>
              <span className="right-text">
                <span className="prog-value" id="slider-fill1">{formatMoney(amount)}</span>
                &nbsp;руб.
              </span>
              <Slider
                min={minAmount} max={maxAmount} step={stepAmount}
                value={amount} name="amount" handleChange={this.sliderChange.bind(this)} />
            </div>
            <div className="col-xs-12 col-sm-6 runner-block">
              <span className="left-text">
                <p>Срок займа:</p>
              </span>
              <span className="right-text">
                <span className="prog-value" id="slider-fill2">{duration}</span>
                &nbsp;{inflectDay(duration)}
              </span>
              <Slider
                min={minDuration} max={maxDuration} step={stepDuration}
                value={duration} name="duration" handleChange={this.sliderChange.bind(this)} />
            </div>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="row calc-block-bottom">
            <div className="col-xs-12 col-sm-6">
              <p className="calc-info">
                <span className="item">
                  <span className="value" id="calc_summ">{formatMoney(amount)}</span><br />
                  <span className="desc">займ</span>
                </span>
                <span className="sign">+</span>
                <span className="item">
                  <span className="value" id="calc_perc">{formatMoney(percents)}</span><br />
                  <span className="desc">проценты</span>
                </span>
                <span className="sign">=</span>
                <span className="item final-summ">
                  <span className="value" id="final_summ">{formatMoney(fullAmount)}&nbsp; руб.</span><br />
                  <span className="desc">итого к оплате</span>
                </span>
              </p>
            </div>
            <div className="col-xs-12 col-sm-6 text-right">
              <CreateOnlineBidButton data={{amount, duration}} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

BidCalculator.propTypes = {
  dispatch: PropTypes.func,
  calculator: PropTypes.object,
  interestRate: PropTypes.number.isRequired,
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  minDuration: PropTypes.number.isRequired,
  maxDuration: PropTypes.number.isRequired,
  stepAmount: PropTypes.number.isRequired,
  stepDuration: PropTypes.number.isRequired,
}

BidCalculator.defaultProps = {
  minAmount: 1000,
  maxAmount: 25000,
  minDuration: 1,
  maxDuration: 30,
  stepAmount: 500,
  stepDuration: 1,
}

const mapStateToProps = (state, ownProps) => {
  const { calculator } = state
  const { interestRate } = ownProps
  calculator.percents = calculator.amount * (interestRate / 100) * calculator.duration
  calculator.fullAmount = calculator.amount + calculator.percents

  return {
    calculator,
  }
}

export default connect(
  mapStateToProps
)(BidCalculator)
