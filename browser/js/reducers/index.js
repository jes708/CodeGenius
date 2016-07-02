'use strict'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import session from './session'
import assessments from './assessments'
import assessmentTeam from './assessmentTeam'
import annotation from '../components/Annotator/reducer'
import {TestReducer} from '../components/test/TestComponent'
import comment from '../components/Comment/reducer'

const rootReducer = combineReducers({
  annotation,
  comment,
  session,
  assessments,
  assessmentTeam,
  form: formReducer,
  routing: routerReducer,
  TestReducer
})

export default rootReducer
