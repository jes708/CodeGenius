'use strict'

import session from './session'
import userAssessments from './userAssessments'
import annotation from '../components/Annotator/reducer'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  annotation,
  session,
  userAssessments,
  routing: routerReducer,
})

export default rootReducer
