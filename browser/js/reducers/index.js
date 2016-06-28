'use strict'

import fetch from 'isomorphic-fetch'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_NOT_AUTHENTICATED,
  AUTH_SESSION_TIMEOUT,
  RECEIVED_LOGGED_IN_USER
} from '../actions'

const session_initialState = {
  id: null,
  user: null
}

function session (state = session_initialState, action) {
  switch (action.type) {
    case RECEIVED_LOGGED_IN_USER:
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        id: action.id,
        user: action.user
      })
    case AUTH_LOGIN_FAILURE:
    case AUTH_LOGOUT_SUCCESS:
    case AUTH_NOT_AUTHENTICATED:
    case AUTH_SESSION_TIMEOUT:
      return Object.assign({}, state, {
        id: null,
        user: null
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  session,
  routing: routerReducer
})

export default rootReducer
