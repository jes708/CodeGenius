'use strict'

import session from './session'
import userAssessments from './userAssessments'
import annotation from '../components/Annotator/reducer'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import comment from '../components/Comment/reducer'

const rootReducer = combineReducers({
  annotation,
  comment,
  session,
  userAssessments,
  routing: routerReducer,
})

export default rootReducer
