import moment from 'moment'
import {get, post} from '../api'
import {formatMoney2} from '../scripts/utils'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    token: data.token
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  }
}


// export const UPDATE_CLIENT_LIST = 'UPDATE_CLIENT_LIST'
// export const updateClientList = (data) => {
//   return {
//     type: UPDATE_CLIENT_LIST,
//     clientList: data.content
//   }
// }
export const REQUEST_CLIENT_LIST = 'REQUEST_CLIENT_LIST'
function requestClientList() {
    return {
        type: REQUEST_CLIENT_LIST,
    }
}

export const RECEIVE_CLIENT_LIST = 'RECEIVE_CLIENT_LIST'
function receiveClientList(json) {
    return {
        type: RECEIVE_CLIENT_LIST,
        clientList: json.content
    }
}

export const getClientList = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        dispatch(requestClientList())
        return get('client/all', token)
            .then((json) => {
          console.log(json)
               const newJson =  dispatch(generationInfoClient(json))


                dispatch(receiveClientList(newJson))
            })
    }
}

export const generationInfoClient = (json) => {
  const clientList = json.content
  let newJson = json.content
  for(let i = 0; i < clientList.length; i++){
      if(!clientList[i].phoneNumber){
          let phoneNumber = '89'
          for(let j=0; j<10; j++){
              let number = parseInt(Math.random() * (9 - 1) + 1)
              phoneNumber += number
          }
          newJson[i].phoneNumber = phoneNumber
      }
      if(!clientList[i].email){
          newJson[i].email = 'user' + i + '@mail.ru'
      }
      if(!clientList[i].visitStatus){
          newJson[i].visitStatus = Math.random()?'Присутствует':'Отсутствует'
      }
      if(clientList[i].subscriptions){
          const sub = clientList[i].subscriptions
          const subId = []
          for(let s=0; s<sub.length; s++){
            subId.push(sub[s].id)
          }
          newJson[i].numberSubscription = subId
      }
      if(!clientList[i].subState){
          const sub = clientList[i].subscriptions
          const subState = []
          for(let s=0; s<sub.length; s++){
              subState.push(sub[s].subState)
          }
          newJson[i].subState = subState
      }
  }

  return newJson
}





export const CHANGE_PAYMENT_PARAMS = 'CHANGE_PAYMENT_PARAMS'
export const changePaymentParams = (amount, loan, client) => {
  const params = {
    amount,
    loanId: loan.id,
    description: `Платеж в счет займа #${loan.number}, на сумму ${formatMoney2(amount)} рублей`,
    fio: `${client.lastName} ${client.firstName} ${client.secondName}`,
    phoneNumber: client.phones.find(phone => phone.isDefault).number,
  }
  return {
    type: CHANGE_PAYMENT_PARAMS,
    params,
  }
}
export const erasePaymentParams = () => {
  return {
    type: CHANGE_PAYMENT_PARAMS,
    params: {},
  }
}

export const REQUEST_PAYMENT = 'REQUEST_PAYMENT'
export const requestPayment = (amount, msg) => {
  return {
    type: REQUEST_PAYMENT, amount, msg,
  }
}

export const REQUEST_INFO = 'REQUEST_INFO'
function requestInfo() {
  return {
    type: REQUEST_INFO,
  }
}

export const RECEIVE_INFO = 'RECEIVE_INFO'
function receiveInfo(json) {
  return {
    type: RECEIVE_INFO,
    info: json,
  }
}

function fetchInfo() {
  return (dispatch) => {
    dispatch(requestInfo())
    return get('api/client/full')
      .then(json => dispatch(receiveInfo(json)))
  }
}

export const fetchInfoIfNeeded = () => {
  return (dispatch, getState) => {
    const shouldFetch = !getState().info.has
    if (shouldFetch) {
      return dispatch(fetchInfo())
    }
  }
}

export const REQUEST_FIN_STATE = 'REQUEST_FIN_STATE'
export const requestFinState = () => {
  return {
    type: REQUEST_FIN_STATE,
  }
}

export const RECEIVE_FIN_STATE = 'RECEIVE_FIN_STATE'
export const receiveFinState = (loanId, date, finState) => {
  return {
    type: RECEIVE_FIN_STATE,
    loanId,
    date,
    finState,

  }
}

export const CALCULATOR = 'CALCULATOR'
export const bidCalculatorChange = (data) => {
  return {
    type: CALCULATOR,
    calculator: data,
  }
}

export const calcFinStateActiveLoan = (date) => {
  return (dispatch, getState) => {
    const state = getState()
    const loanId = state.info.activeLoan.id

    if (moment(date).isBefore(moment(), 'day')) {
      dispatch(receiveFinState(loanId, date, {error: 'Нельзя рассчитать на указанную дату'}))
      return
    }

    const finState = state.finStates[date]
    if (finState) {
      dispatch(receiveFinState(loanId, date, finState))
      return
    }

    dispatch(requestFinState())
    return get(`api/calc/finance-state?date=${date}&loanId=${loanId}`)
      .then(json => dispatch(receiveFinState(loanId, date, json)))
  }
}

export const SLIDER_BUTTON_START = 'SLIDER_BUTTON_START'
export const sliderButtonStart = (name) => {
  return {
    type: SLIDER_BUTTON_START,
    name,
  }
}

export const SLIDER_BUTTON_END = 'SLIDER_BUTTON_END'
export const sliderButtonEndAction = (name, apiResult, apiStatus) => {
  return {
    type: SLIDER_BUTTON_END,
    name,
    apiResult,
    apiStatus,
  }
}

export const sliderButtonEnd = (name) => {
  return (dispatch, getState) => {
    const buttonState = getState().sliderButtons[name]
    const {apiResult, apiStatus} = buttonState
    return dispatch(sliderButtonEndAction(name, apiResult, apiStatus))
  }
}

export const SLIDER_BUTTON_INITIAL = 'SLIDER_BUTTON_INITIAL'
export const sliderButtonInitial = (name, props) => {
  return {
    type: SLIDER_BUTTON_INITIAL,
    name,
    props,
  }
}

export const SLIDER_BUTTON_ASYNC_ACTION_END = 'SLIDER_BUTTON_ASYNC_ACTION_END'
export const sliderButtonAsyncActionEnd = (name, apiResult, apiStatus) => {
  return {
    type: SLIDER_BUTTON_ASYNC_ACTION_END,
    apiResult,
    apiStatus,
    name,
  }
}

const simpleApiResultToStatus = (json) => {
  return json.error ? 'error' : 'ok'
}

export const getLoanCallAsyncActionStart = (name) => {
  return (dispatch) => {
    return get('api/loanbid/take')
      .then(json => dispatch(sliderButtonAsyncActionEnd(name, json, simpleApiResultToStatus(json))))
  }
}

export const prolongLoanCallAsyncActionStart = (name) => {
  return (dispatch) => {
    return get('api/loan/prolong')
      .then(json => dispatch(sliderButtonAsyncActionEnd(name, json, simpleApiResultToStatus(json))))
  }
}

/* global yaCounter40266419 */

export const sendOnlineBid = (data) => {
  return (dispatch) => {
    yaCounter40266419.reachGoal('get_money')
    return post('api/bid/create', data)
      .then((json) => {
        dispatch(sliderButtonAsyncActionEnd("createOnlineBidButton", json, 'ok'))
      })
  }
}