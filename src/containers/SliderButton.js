import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { sliderButtonStart, sliderButtonEnd, sliderButtonInitial } from '../actions'

class SliderButton extends Component {

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, name, className, buttonText, status } = this.props
    dispatch(sliderButtonInitial(name, {className, buttonText, status}))
  }

  onClick() {
    const { dispatch, name, sliderButtonAsyncStartAction } = this.props
    dispatch(sliderButtonStart(name))
    dispatch(sliderButtonAsyncStartAction)
    setTimeout(() => {
      dispatch(sliderButtonEnd(name))
    }, 600)
  }

  render() {
    const {className, buttonText, status, renderOkBlock, renderErrorBlock, renderButton} = this.props

    if (status === 'ok') {
      return renderOkBlock()
    }
    if (status === 'error') {
      return renderErrorBlock()
    }
    return renderButton(className, buttonText, this.onClick)
  }
}

SliderButton.propTypes = {
  dispatch: PropTypes.func,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  renderOkBlock: PropTypes.func.isRequired,
  renderErrorBlock: PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
  sliderButtonAsyncStartAction: PropTypes.func.isRequired,
}

SliderButton.defaultProps = {
  className: '',
  buttonText: 'Получить',
  status: 'start',
}

const mapStateToProps = (state, ownProps) => {
  return state.sliderButtons[ownProps.name] || {}
}

export default connect(
  mapStateToProps
)(SliderButton)

