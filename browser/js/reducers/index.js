'use strict'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import session from './session'
import assessments from './assessments'
import assessmentTeam from './assessmentTeam'
import annotationReducer from '../components/Annotator/reducer'
import {TestReducer} from '../components/test/TestComponent'

const rootReducer = combineReducers({
  session,
  assessments,
  assessmentTeam,
  annotationReducer,
  form: formReducer,
  routing: routerReducer,
  TestReducer
})

export default rootReducer
