import React, {PropTypes, Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import { calcFinStateActiveLoan } from '../../actions'
import Money from '../../components/Money'
import DeferredPaymentCalendar from './DeferredPaymentCalendar'

class DeferredPayment extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
    }
  }

  render() {
    const { activeLoan, finStates, onPayment } = this.props
    if (!activeLoan || activeLoan.financeState.error || !activeLoan.financeState.amountForAutoProlongation) {
      return null
    }

    const selectedDate = finStates.selectedDate

    let fs = finStates[selectedDate]
    const errorFinState = fs.error
    if (errorFinState) {
      fs = finStates[moment().format('YYYY-MM-DD')]
    }

    const calcProlongationDate = moment(fs.moment).isSame(moment(), 'day') ? 'сегодня' : moment(fs.moment).format('DD.MM.YYYY')
    const amountForAutoProlongation = fs.amountForAutoProlongation

    const prolongDays = moment(fs.moment).diff(activeLoan.nextPaymentDate, 'days')
    const nextPaymentDateAutoDeferred = moment(activeLoan.nextPaymentDate).add(activeLoan.durationProlongation + prolongDays + (prolongDays > 0 ? 1 : 0), 'day')

    return (
      <div className="row prolong-block" style={{marginBottom: 25}}>
        <div className="col-xs-12">
          <div className="prolong-text">
            <p className="top">
              <span className="font-bold">Продлите займ {calcProlongationDate}</span>, заплатив &nbsp;
              <Money amount={amountForAutoProlongation} className="" />
            </p>
            <p>
              <span className="grey">Ваш займ будет продлен до {nextPaymentDateAutoDeferred.format('DD.MM.YYYY')}</span>
            </p>
            <DeferredPaymentCalendar errorFinState={errorFinState} selectedDate={selectedDate} onClick={(date) => this.props.dispatch(calcFinStateActiveLoan(date))}/>
          </div>
          <div className="prolong-button text-right" style={{float: 'right'}}>
            <button className={"red-button "} style={{float: 'right', marginTop: 9, height: 45}} onClick={() => onPayment(amountForAutoProlongation)}>
              Продлить
            </button>
          </div>
        </div>
        <div className="col-xs-12 desc" style={{ marginTop: 7, maxHeight: !this.state.show ? '20px' : '376px', transition: this.state.show ? 'max-height 0.25s ease-in' : 'max-height 0.15s ease-out'}}>
          <p>
            { !this.state.show && <a href="#" id="show_info" style={{fontSize: '100%'}} className="edit-link" onClick={() => this.setState({show: true})}>Узнать подробности</a> }
            <span style={{display: 'block'}}>
              <span className="subhead" style={{fontSize: '110%'}}>Отсрочка по возврату потребительского займа: </span>
              <br/><br/>
              <span>
                При внесении Заемщиком денежных средств, достаточных для погашения всей текущей задолженности по процентам,
                начисленным на дату внесения денежных средств, а также суммы, составляющей не менее 10% от первоначально предоставленной суммы потребительского займа,
                Заемщику может быть предоставлена отсрочка по исполнению обязательств по возврату потребительского займа на срок 20 (двадцать) календарных дней для Заемщиков,
                предоставивших при оформлении договора потребительского займа документ,
                подтверждающий получение пенсии; и на срок  10 (десять) календарных дней для всех остальных Заемщиков,
                в течение которых задолженность Заемщика не считается просроченной.
                Указанные сроки исчисляются с даты внесения денежных средств необходимых для применения отсрочки.
                Для предоставления отсрочки указанная в настоящих условиях сумма должна быть внесена Заемщиком одним платежом,
                либо несколькими платежами в течение 1 (одного) календарного дня.
                Условия предоставления отсрочки не распространяются на случаи,
                если допущенная Заемщиком просрочка по возврату потребительского займа превысила 119 (сто девятнадцать) дней.
                Для получения отсрочки по исполнению обязательств по возврату потребительского займа обратитесь в ближайший офис «Ваши деньги».
                Адреса офисов (гиперссылка на адреса). Подробности по номеру: {this.context.helpPhone}.
              </span>
              <br/><br/>
              <a href="#" id="hide_info" className="edit-link" onClick={() => this.setState({show: false})}>Свернуть</a>
            </span>
          </p>
        </div>
      </div>
    )
  }
}

DeferredPayment.propTypes = {
  dispatch: PropTypes.func,
  activeLoan: PropTypes.object,
  finStates: PropTypes.object,
  onPayment: PropTypes.func,
}

DeferredPayment.contextTypes = {
  helpPhone: React.PropTypes.string,
}
export default connect()(DeferredPayment)
