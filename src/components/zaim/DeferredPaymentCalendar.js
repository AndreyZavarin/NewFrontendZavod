import React, {PropTypes, Component} from 'react'
import moment from 'moment'

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

class DeferredPaymentCalendar extends Component {

  constructor(props) {
    super(props)
    this.state = {selectedMoment: moment(props.selectedDate)}
  }

  render() {
    const { onClick, errorFinState } = this.props
    const selectedMoment = this.state.selectedMoment

    const days = []
    for (let i = 1; i <= selectedMoment.daysInMonth(); i++) {
      days.push(i)
    }
    return (
      <div>
        <p className="subhead">Рассчитайте продление займа в другой день</p>
        <select
          id="prolong_day" className="form-control f_day" value={selectedMoment.date()}
          onChange={(e) => { this.setState({selectedMoment: selectedMoment.set('date', e.target.value)}) }}>
          {days.map((i) => {
            return <option key={i} value={i} >{i}</option>
          })}
        </select>
        <select
          id="prolong_month" className="form-control f_month" value={selectedMoment.month()}
          onChange={(e) => { this.setState({selectedMoment: selectedMoment.set('month', e.target.value)}) }}>
          {months.map((i, index) => {
            return <option key={index} value={index}>{i}</option>
          })}
        </select>
        <select
          id="prolong_year" className="form-control f_year" value={selectedMoment.year()}
          onChange={(e) => { this.setState({selectedMoment: selectedMoment.set('year', e.target.value)}) }}>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
        </select>
        <a href="javascript:void(0)" className="recalc" onClick={() => { onClick(selectedMoment.format('YYYY-MM-DD')) }}>
          Рассчитать
        </a>
        {errorFinState ?
          <span style={{marginLeft: 15, color: 'red', fontSize: 13, width: 106, float: 'right'}}>Нельзя рассчитать на указанную дату</span> : ''}
      </div>
    )
  }
}

DeferredPaymentCalendar.propTypes = {
  errorFinState: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
}

export default DeferredPaymentCalendar