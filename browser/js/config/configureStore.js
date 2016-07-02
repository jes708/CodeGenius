'use strict';

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore (history, initialState) {

  const middlewares = [thunkMiddleware, routerMiddleware(history)]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  const enhancers = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  return createStore(rootReducer, initialState, enhancers)
}
