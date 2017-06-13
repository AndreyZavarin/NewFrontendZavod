import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import moment from 'moment'
import {
  LOGOUT_REQUEST,
    LOGIN_SUCCESS,

    // UPDATE_CLIENT_LIST,
    REQUEST_CLIENT_LIST,
    RECEIVE_CLIENT_LIST,

    REQUEST_INFO, RECEIVE_INFO,
  REQUEST_FIN_STATE, RECEIVE_FIN_STATE, CALCULATOR,
  SLIDER_BUTTON_START, SLIDER_BUTTON_END, SLIDER_BUTTON_INITIAL,
  SLIDER_BUTTON_ASYNC_ACTION_END,
  REQUEST_PAYMENT, CHANGE_PAYMENT_PARAMS,
} from '../actions'


function auth(state = {
    token: null
}, action) {
    switch (action.type){
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {token: action.token})
        default:
            return state;
    }
}

function clients(state = {
  clientsList: null,
  isFetching: false,
}, action) {
  switch (action.type){
      // case UPDATE_CLIENT_LIST:
      //     return Object.assign({}, state, {clientsList: action.clientList})
      case REQUEST_CLIENT_LIST:
          return Object.assign({}, state, {isFetching: true})
      case RECEIVE_CLIENT_LIST:
          return Object.assign({}, state, {isFetching: false, clientsList: action.clientList})
      default:
          return state;
  }
}

function info(state = {
  isFetching: false,
  has: false,
}, action) {
  switch (action.type) {
    case REQUEST_INFO:
      return Object.assign({}, state, {isFetching: true})
    case RECEIVE_INFO:
      return Object.assign({}, state, {isFetching: false, has: true}, action.info)
    case SLIDER_BUTTON_END:
      if (action.name === 'createOnlineBidButton') {
        const apiResult = action.apiResult
        if (apiResult && apiResult.result && !apiResult.result.errors) {
          return Object.assign({}, state, {lastOnlineBid: apiResult.result})
        }
      }
      return state
    default:
      return state
  }
}

function payment(state = { params: {} }, action) {
  switch (action.type) {
    case REQUEST_PAYMENT:
      return Object.assign({}, state, {amount: action.amount, msg: action.msg})
    case CHANGE_PAYMENT_PARAMS:
      return Object.assign({}, state, {params: action.params})
    default:
      return state
  }
}

function settings() {
  return {
    helpPhone: '8 (800) 700-22-29',
    helpPhoneHeader: '8 800 700 22 29',
  }
}

function dateFormat(date) {
  return moment(date).format('YYYY-MM-DD')
}

function finStates(state = {isFetching: false}, action) {
  switch (action.type) {
    case REQUEST_FIN_STATE:
      return Object.assign({}, state, {isFetching: true})
    case RECEIVE_FIN_STATE:
      return Object.assign({}, state, {isFetching: false, selectedDate: action.date, [action.date]: action.finState})

    case RECEIVE_INFO:
      const activeLoan = action.info.activeLoan
      if (!activeLoan) {
        return state
      }
      const { financeState, financeStateOnRepaymentDate } = activeLoan
      return Object.assign({}, state, {
        selectedDate: dateFormat(financeState.moment),
        [dateFormat(financeState.moment)]: financeState,
        [dateFormat(financeStateOnRepaymentDate.moment)]: financeStateOnRepaymentDate,
      })
    default:
      return state
  }
}

function calculator(state = {amount: 18000, duration: 25}, action) {
  switch (action.type) {
    case CALCULATOR:
      return Object.assign({}, state, action.calculator)
    default:
      return state
  }
}

function reduceButton(buttonsState, name, data) {
  return {[name]: Object.assign({}, buttonsState[name], data)}
}

function sliderButtons(state = {}, action) {
  switch (action.type) {
    case SLIDER_BUTTON_INITIAL:
      return Object.assign({}, state, reduceButton(state, action.name, action.props))
    case SLIDER_BUTTON_START:
      return Object.assign({}, state, reduceButton(state, action.name, {className: 'button_get_slide-hide', buttonText: ''}))
    case SLIDER_BUTTON_END:
      return Object.assign({}, state, reduceButton(state, action.name, {status: action.apiResult ? action.apiStatus : 'error'}))
    case SLIDER_BUTTON_ASYNC_ACTION_END:
      return Object.assign({}, state, reduceButton(state, action.name, {apiResult: action.apiResult, apiStatus: action.apiStatus}))
    default:
      return state
  }
}

const appReducer = combineReducers({
  auth,
  clients,

  settings,
  form,
  info,
  finStates,
  routing,
  calculator,
  sliderButtons,
  payment,
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_REQUEST) {
    return appReducer({}, action)
  }
  return appReducer(state, action)
}

export default rootReducer
