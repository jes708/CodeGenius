'use strict'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import session from './session'
import userAssessments from './userAssessments'
import assessmentTeam from './assessmentTeam'
import annotationReducer from '../components/Annotator/reducer'
import {TestReducer} from '../components/test/TestComponent'

const rootReducer = combineReducers({
  session,
  userAssessments,
  assessmentTeam,
  annotationReducer,
  form: formReducer,
  routing: routerReducer,
  TestReducer
})

export default rootReducer
