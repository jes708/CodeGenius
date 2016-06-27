'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()

export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(
      loggerMiddleware,
      thunk
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
