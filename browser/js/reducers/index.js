'use strict'

import session from './session'
import userAssessments from './userAssessments'
import assessmentTeam from './assessmentTeam'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  session,
  userAssessments,
  assessmentTeam,
  routing: routerReducer
})

export default rootReducer
