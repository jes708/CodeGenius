'use strict'

import sessionReducer from './sessionReducer'
import annotationReducer from '../components/Annotator/reducer'
import {TestReducer} from '../components/TestComponent'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  session: sessionReducer,
  routing: routerReducer,
  annotationReducer,
  TestReducer
})

export default rootReducer
