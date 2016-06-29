'use strict'

import sessionReducer from './sessionReducer'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  session: sessionReducer,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer
