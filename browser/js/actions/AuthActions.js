'use strict'

import axios from 'axios'

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_SESSION_TIMEOUT = 'AUTH_SESSION_TIMEOUT'
export const RECEIVED_LOGGED_IN_USER = 'RECEIVED_LOGGED_IN_USER'
export const NO_USER = 'NO_USER'

export function login (credentials) {
  return dispatch => {
    return axios.post('/login', credentials)
    .then(res => res.data)
    .then(resData => {
      dispatch(loginSuccess(resData.user))
    })
    .catch(err => dispatch(authError(err)))
  }
}

export function loginSuccess (user) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    id: user.id,
    user
  }
}

export function getLoggedInUser () {
  return (dispatch, getState)  => {
    let user = getState().session.user
    if (user) {
      dispatch(receivedLoggedInUser(user))
    } else {
      return axios.get('/session')
      .then(res => res.data)
      .then(resData => {
        dispatch(receivedLoggedInUser(resData.user))
      })
      .catch(() => dispatch(noUser()))
    }
  }
}

export function receivedLoggedInUser (user) {
  return { type: RECEIVED_LOGGED_IN_USER, user }
}

export function noUser () {
  return { type: NO_USER }
}

export function authError (error) {
  return { type: AUTH_ERROR, error }
}

export function logout () {
  return dispatch => {
    return axios.get('/logout')
    .then(() => dispatch(logoutSuccess()))
    .catch(err => dispatch(authError(err)))
  }
}

export function logoutSuccess () {
  return { type: AUTH_LOGOUT_SUCCESS }
}
