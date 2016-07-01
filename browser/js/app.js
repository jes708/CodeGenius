'use strict'

import 'babel-polyfill'

import React, { Component } from 'react'
import { render }  from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './config/routes'
import configureStore from './config/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app'))
