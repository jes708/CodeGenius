'use strict'

import session from './session'
import userAssessments from './userAssessments'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  session,
  userAssessments,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer
