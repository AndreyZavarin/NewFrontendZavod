import React, {PropTypes} from 'react'
import SliderButton from '../containers/SliderButton'
import { sendOnlineBid } from '../actions'

const renderOkBlock = () => (
  <div className="pull-right online-bid-button-result">
    <p className="pull-left send-text-show" style={{marginRight: 10}}>Обратитесь в ближайший офис продаж</p>
    <img src="../img/ok.png" alt="" className="pull-left"/>
  </div>
)

const renderErrorBlock = () => (
  <div className="pull-right online-bid-button-result">
    <p className="pull-left send-text-show" style={{marginRight: 37, color: 'red'}}>Не удалось отправить заявку</p>
    <img src="../img/error.png" alt="" className="pull-left" />
  </div>
)

const renderButton = (className, buttonText, onClick) => (
  <button className={"button_slide " + className} style={{float: 'right', marginTop: 21}} onClick={onClick} >
    {buttonText}
  </button>
)

const CreateOnlineBidButton = ({data}) => (
  <SliderButton
    name={"createOnlineBidButton"} buttonText={"Получить займ"} sliderButtonAsyncStartAction={sendOnlineBid(data)}
    renderOkBlock={renderOkBlock} renderErrorBlock={renderOkBlock} renderButton={renderButton}/>
)

CreateOnlineBidButton.propTypes = {
  data: PropTypes.object,
}

export default CreateOnlineBidButton

