import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import App from './App'

const Root = ({ store }) => (
  <Provider store={store}>
    <Fragment>
      <App />
    </Fragment>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
