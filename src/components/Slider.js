import React, {PropTypes} from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider'

let timeoutID
class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
    }
  }

  sliderChange(event) {
    let value = event.target.value
    const {min, max} = this.props

    if (typeof value === 'string') {
      value = value.replace(/\s/, "")
      value = parseInt(value)
    }

    if (value < min) {
      value = min
    }
    if (value > max) {
      value = max
    }

    this.setState({value: parseInt(value)})
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      this.props.handleChange(this.props.name, value)
    }, 1)
  }

  render() {
    function dial(minValue, maxValue) {
      const points = []
      const thousands = minValue >= 1000
      const min = thousands ? minValue / 1000 : minValue
      const max = thousands ? maxValue / 1000 : maxValue

      for (let i = min; i < max + 1; i++) {
        if (i === min || i === max || i === Math.floor((max) / 2)) {
          const pointTitle = thousands ? `${i} 000` : i
          let pointClass = 'number'
          if (i === min) {
            pointClass += ' min'
          } else if (i === max) {
            pointClass += ' max'
          }

          points.push(
            <div key={i} className="point big">
              <div className={pointClass}>{pointTitle}</div>
            </div>
          )
        } else {
          points.push(
            <div key={i} className="point"></div>
          )
        }
      }
      return points
    }

    return (
      <div className="Slider">
        <div className="show-grid">
          <ReactBootstrapSlider
            value={this.state.value ? parseInt(this.state.value) : parseInt(this.props.min)}
            handleChange={this.sliderChange.bind(this)}
            step={parseInt(this.props.step)}
            max={parseInt(this.props.max)}
            min={parseInt(this.props.min)}
          />
          <div className="slider-point">{dial(this.props.min, this.props.max)}</div>
        </div>
      </div>
    )
  }
}

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default Slider