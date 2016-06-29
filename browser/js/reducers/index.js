'use strict'

import sessionReducer from './sessionReducer'
import userAssessments from './userAssessments'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  session: sessionReducer,
  userAssessments,
  routing: routerReducer
})

export default rootReducer
