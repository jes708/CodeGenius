'use strict'

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_SESSION_TIMEOUT,
  AUTH_USER_REQUEST,
  AUTH_USER_RECEIVED,
  AUTH_NO_USER
} from '../actions/AuthActions'

const initialState = {
  id: null,
  user: null,
  error: null,
  isFetching: false
}

export default function session (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_REQUEST:
    case AUTH_LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case AUTH_USER_RECEIVED:
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        id: action.id,
        user: action.user,
        isFetching: false
      })
    case AUTH_NO_USER:
      return action.pathname === '/' ? {...state, isFetching: false} : {...state, path: action.pathname, isFetching: false}
    case AUTH_LOGOUT_SUCCESS:
    case AUTH_SESSION_TIMEOUT:
      return Object.assign({}, state, {
        id: null,
        user: null,
        isFetching: false
      })
    case AUTH_LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: false
      })
    default:
      return state
  }
}
