'use strict'

import React, { Component } from 'react'
import { render }  from 'react-dom'
import { Provider } from 'react-redux'
import routes from './config/routes'
import configureStore from './config/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

let store = configureStore()

render(
  <Provider store={store}>
    {routes}
  </Provider>
  , document.getElementById('app'))
