import React, {PropTypes} from 'react'
import SliderButton from '../containers/SliderButton'
import { getLoanCallAsyncActionStart } from '../actions'

const renderOkBlock = () => (
  <div className="pull-right get-loan-call-button">
    <p className="pull-left send-text-show" style={{marginTop: 3}}>
      Обратитесь в ближайший офис продаж
    </p>
    <img src="../img/ok.png" alt="" className="pull-left" />
  </div>
)

const renderErrorBlock = () => (
  <div className="pull-right get-loan-call-button">
    <p className="pull-left send-text-show" style={{marginTop: 0}}>
      Не удалось отправить заявку
    </p>
    <img src="../img/error.png" alt="" className="pull-left" />
  </div>
)

const renderButton = (className, buttonText, onClick) => (
  <button className={"get-button " + className} style={{float: 'right', marginTop: 9, marginRight: 100}} onClick={onClick}>
    {buttonText}
  </button>
)

const GetLoanCall = ({buttonText = "Получить"}) => {
  return (
    <div className="col-xs-4 col-md-12 pay-button-cont">
      <span className="visible-md visible-lg"><br /></span>
      <SliderButton
        name={"getLoanCall"} buttonText={buttonText} sliderButtonAsyncStartAction={getLoanCallAsyncActionStart("getLoanCall")}
        renderOkBlock={renderOkBlock} renderErrorBlock={renderErrorBlock} renderButton={renderButton} />
    </div>
  )
}

GetLoanCall.propTypes = {
  buttonText: PropTypes.string,
}

export default GetLoanCall

