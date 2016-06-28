'use strict'

import axios from 'axios'

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_SESSION_TIMEOUT = 'AUTH_SESSION_TIMEOUT'
export const AUTH_NOT_AUTHENTICATED = 'AUTH_NOT_AUTHENTICATED'
export const AUTH_NOT_AUTHORIZED = 'AUTH_NOT_AUTHORIZED'
export const RECEIVED_LOGGED_IN_USER = 'RECEIVED_LOGGED_IN_USER'

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
  return dispatch => {
    return axios.get('/session')
    .then(res => res.data)
    .then(resData => {
      dispatch(receivedLoggedInUser(resData.user))
    })
    .catch(err => dispatch(authError(err)))
  }
}

export function receivedLoggedInUser (user) {
  return { type: RECEIVED_LOGGED_IN_USER, user }
}


export function authError (err) {
  return { type: AUTH_LOGIN_FAILURE, err }
}

export function logout () {
  return dispatch => {
    return axios.get('/logout')
    .then(() => dispatch(logoutSucces()))
    .catch(err => dispatch(authError(err)))
  }
}

export function logoutSuccess () {
  return { type: AUTH_LOGOUT_SUCCESS }
}
