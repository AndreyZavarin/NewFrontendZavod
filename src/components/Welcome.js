import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
import ProfileMessage from './ProfileMessage'

let timeout

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      className: 'animate-show',
    }
  }

  componentDidMount() {
    timeout = setTimeout(() => {
      this.setState({
        className: 'animate-hide',
      })
      setTimeout(() => {
        browserHistory.push('/profile/zaim')
      }, 300)
    }, 2200)
  }

  componentWillUnmount() {
    clearInterval(timeout)
  }

  render() {
    return (
      <ProfileMessage messageElemId="welcome">
        <span className="subhead font-bold">{this.props.personName}, добро пожаловать!</span>
        <br/>
        <br/>
        <span>
          Случиться может всё, что угодно.<br/>
          И если что, <span className="yellow">мы вас выручим</span>.
        </span>
      </ProfileMessage>
    )
  }
}

Welcome.propTypes = {
  personName: PropTypes.string.isRequired,
}

export default Welcome