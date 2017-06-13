import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchInfoIfNeeded, logoutRequest } from '../actions'
import { logout } from '../api/auth'
import Welcome from '../components/Welcome'
import ProfileMessage from '../components/ProfileMessage'

import LeftNavBarMini from '../components/Navigation/NavBar/LeftNavBarMini'
import TopNabBar from '../components/Navigation/NavBar/TopNabBar'
import LeftNavBar from '../components/Navigation/NavBar/LeftNavBar'

class App extends Component {

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    // this.props.dispatch(fetchInfoIfNeeded())
  }

  logout() {
    this.props.dispatch(logoutRequest())
    logout()
  }

  render() {
    const { ok, client, children } = this.props

    // if (ok && !client) {
    //   return null
    // }

    return (
    <div >
      <LeftNavBarMini/>
      <div className="container-fluid"  style={{ height: "100vh"}}>
        <div className="row content">
          <LeftNavBar
              updateActivePage = {this.props.updateActivePage} />
          <TopNabBar
              updateActivePage = {this.props.updateActivePage}
          />
          <div className="col-sm-10" style={{padding: "0"}}>
              {children}
          </div>
        </div>
      </div>
    </div>









      // <div>
      //   <div className="container mar-t-50">
      //     <div className="top-block">
      //       <Link to="/">
      //         <img src="../img/logo.png" alt="Ваши Деньги – Экспресс-займы" className="logo-img" title="экспресс займ"/>
      //       </Link>
      //     </div>
      //     <div className="text-right">
      //       <span className="top-phone">{this.context.helpPhoneHeader}</span>
      //       <br/>
      //       <span className="red-help-desk">cлужба поддержки</span>
      //     </div>
      //   </div>
      //   <div className="container">
      //     <nav className="main_menu">
      //       <Link activeClassName="active" to="/profile/zaim">Мой займ</Link>
      //       <Link activeClassName="active" to="/profile">Мой профиль</Link>
      //       <a onClick={this.logout}>Выйти</a>
      //     </nav>
      //   </div>
      //     {children}
      //
      //
      //
      // </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  client: PropTypes.object,
  ok: PropTypes.bool.isRequired,
  children: PropTypes.any,
}

App.contextTypes = {
  helpPhoneHeader: React.PropTypes.string,
}

const mapStateToProps = (state) => {
  const info = state.info
  return {
    ok: !info.error,
    client: info.client,
  }
}

export default connect(
  mapStateToProps
)(App)
