'use strict'

import session from './session'
import userAssessments from './userAssessments'
import annotationReducer from '../components/Annotator/reducer'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  session,
  userAssessments,
  annotationReducer,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
