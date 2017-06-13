import React, {Component, PropTypes} from 'react'
import {Router, Route} from 'react-router'
import {connect} from 'react-redux'
import Login from './Login'
import App from './App'
import ProfilePage from './pages/ProfilePage'
import ZaimPage from './pages/ZaimPage'
import PaymentPage from './pages/PaymentPage'
import NotFoundPage from '../components/pages/NotFoundPage'
import PaymentResultPage from '../components/pages/PaymentResultPage'
import Clients from './pages/Clients'


const routes = [
  <Route key={1} path="/login" component={Login}/>,
  <Route key={2} path="/" component={App}>
    <Route path="/clients" component={Clients}>
      <Route path="/clients/create-client" component={Clients}/>
      <Route path="/clients/single-client" component={Clients}/>
      <Route path="/clients/update-client" component={Clients}/>
    </Route>


    <Route path="/profile/zaim" component={ZaimPage}/>

    <Route path="/payment" component={PaymentPage}/>
    <Route path="/payment/success" component={PaymentResultPage}/>
    <Route path="/payment/failure" component={PaymentResultPage}/>


  </Route>,
  <Route path="*" name="404 Not Found" component={NotFoundPage}/>
]

class RootRouter extends Component {

  getChildContext() {
    return this.props.settings
  }

  render() {
    return (
      <Router history={this.props.history} routes={routes}>
        {routes}
      </Router>
    )
  }
}

RootRouter.propTypes = {
  history: PropTypes.object.isRequired,
  settings: PropTypes.object,
}

RootRouter.childContextTypes = {
  helpPhone: PropTypes.string,
  helpPhoneHeader: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  }
}

export default connect(mapStateToProps)(RootRouter)