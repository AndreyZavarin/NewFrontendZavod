import expect from 'expect'
import reducers from '../reducers'
import { sliderButtonAsyncActionEnd, sliderButtonEnd, sliderButtonEndAction } from '../actions'

const state = {
  info: {
    isFetching: false,
    has: true,
    client: {},
    activeLoan: null,
    activeLoanBid: null,
    lastOnlineBid: null,
    loanBids: [],
  },
}

const BUTTON_NAME = 'createOnlineBidButton'

describe('create online bid reducer', () => {
  it('not created lastOnlineBid', () => {
    const nextState = reducers(state, sliderButtonAsyncActionEnd(BUTTON_NAME, {}, 'ok'))
    expect(nextState.sliderButtons.createOnlineBidButton.apiStatus).toEqual('ok')

    const lastState = reducers(nextState, sliderButtonEnd(BUTTON_NAME))
    expect(lastState.lastOnlineBid).toEqual(null)
  })

  it('created lastOnlineBid', () => {
    const apiResult = {
      statusCode: 0,
      result: {
        externalId: 2165796,
        amount: 1800000,
        duration: 25,
        state: 'Created',
        unclaimed: false,
      },
      errors: null,
    }
    const apiStatus = 'ok'

    const nextState = reducers(state, sliderButtonAsyncActionEnd('createOnlineBidButton', apiResult, apiStatus))
    expect(nextState.sliderButtons.createOnlineBidButton.apiStatus).toEqual(apiStatus)
    expect(nextState.sliderButtons.createOnlineBidButton.apiResult).toEqual(apiResult)

    const lastState = reducers(nextState, sliderButtonEndAction(BUTTON_NAME, apiResult, apiStatus))
    expect(lastState.info.lastOnlineBid.amount).toEqual(apiResult.result.amount)
    expect(lastState.info.lastOnlineBid.state).toEqual(apiResult.result.state)
  })
})
