'use strict'

import fetch from 'isomorphic-fetch'

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_SESSION_TIMEOUT = 'AUTH_SESSION_TIMEOUT'
export const AUTH_NOT_AUTHENTICATED = 'AUTH_NOT_AUTHENTICATED'
export const AUTH_NOT_AUTHORIZED = 'AUTH_NOT_AUTHORIZED'

export function login (credentials) {
  return dispatch => {
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
    .then(res => res.json())
    .then(resData => {
      dispatch(loginSuccess(resData))
    })
    .catch(err => dispatch(loginError(err)))
  }
}

export function loginSuccess (resData) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    id: resData.id,
    user: resData.user
  }
}

export function loginError (err) {
  return { type: AUTH_LOGIN_FAILURE, err }
}

export function logout () {
  return { type: AUTH_LOGOUT_SUCCESS }
}



