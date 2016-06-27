'use strict'

import fetch from 'isomorphic-fetch'

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_SESSION_TIMEOUT = 'AUTH_SESSION_TIMEOUT'
export const AUTH_NOT_AUTHENTICATED = 'AUTH_NOT_AUTHENTICATED'
export const AUTH_NOT_AUTHORIZED = 'AUTH_NOT_AUTHORIZED'
export const AUTH_SET_SESSION = 'AUTH_SET_SESSION'
export const AUTH_DESTROY_SESSION = 'AUTH_DESTROY_SESSION'

export function login (credentials) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password
    })
  })
  .then(res => {
    console.log(res)
    dispatch(loginSuccess(res))
  })
  .catch(() => {
    let error = new Error('Invalid login credentials')
    dispatch(loginError(error))
  })
}

export function loginSuccess (res) {
  console.log(res)
  dispatch({ type: AUTH_LOGIN_SUCCESS, res })
}

export function loginError (err) {
  return { type: AUTH_LOGIN_FAILURE, err }
}


