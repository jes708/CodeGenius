'use strict'

import sessionReducer from './sessionReducer'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  session: sessionReducer,
  routing: routerReducer
})

export default rootReducer
