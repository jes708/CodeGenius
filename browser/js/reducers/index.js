'use strict'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import session from './session'
import assessments from './assessments'
import currentFile from './currentFile'
import github from './github'
import assessmentTeam from './assessmentTeam'
import studentTestInfo from './studentTestInfo'
import annotation from '../components/Annotator/reducer'
import {TestReducer} from '../components/test/TestComponent'
import comment from '../components/Comment/reducer'

const rootReducer = combineReducers({
  annotation,
  comment,
  session,
  github,
  assessments,
  currentFile,
  assessmentTeam,
  studentTestInfo,
  routing: routerReducer,
  TestReducer
})

export default rootReducer
