import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import RootRouter from './routing'

function Root({ store, history }) {
  return (
    <Provider store={store}>
      <RootRouter history={history} />
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Root
