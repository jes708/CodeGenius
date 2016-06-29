'use strict'

import sessionReducer from './sessionReducer'
import annotationReducer from '../components/Annotator/reducer'
import {TestReducer} from '../components/test/TestComponent'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  annotationReducer,
  form: formReducer,
  routing: routerReducer,
  session: sessionReducer,
  TestReducer
})

export default rootReducer
