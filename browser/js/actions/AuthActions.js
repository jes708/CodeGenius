'use strict'

import axios from 'axios'
import { replace } from 'react-router-redux'

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_LOGOUT_FAILURE = 'AUTH_LOGOUT_FAILURE'
export const AUTH_SESSION_TIMEOUT = 'AUTH_SESSION_TIMEOUT'
export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST'
export const AUTH_USER_RECEIVED = 'AUTH_USER_RECEIVED'
export const AUTH_NO_USER = 'AUTH_NO_USER'

export function userReceived (user) {
  return { type: AUTH_USER_RECEIVED, user }
}

export const login = (credentials) => (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST })

  return axios.post('/login', credentials)
  .then(res => res.data)
  .then(resData => {
    const user = resData.user
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      id: user.id,
      user
    })
  })
  .catch(error => dispatch({ type: AUTH_LOGIN_FAILURE, error }))
}

//need to check if it works
export const signup = (credentials) => (dispatch) => {
  return axios.post('/signup', credentials)
  .then(res => {
    dispatch(loginSuccess({
      email: credentials.email,
      password: credentials.password
    }))
  })
  .catch(err => dispatch(signupError(err)))
  //signuperror not exist
}

export const getLoggedInUser = () => (dispatch, getState) => {
  dispatch({ type: AUTH_USER_REQUEST })
  let user = getState().session.user

  if (user) {
    dispatch(userReceived(user))
  } else {
    return axios.get('/session')
    .then(res => res.data)
    .then(resData => dispatch(userReceived(resData.user)))
    .catch(() => {
      dispatch({ type: AUTH_NO_USER })
      dispatch(replace('/'))
    })
  }
}

export const logout = () => (dispatch) => {
  return axios.get('/logout')
  .then(() => {
    dispatch({ type: AUTH_LOGOUT_SUCCESS })
    dispatch(replace('/'))
  })
  .catch(err => dispatch({ type: AUTH_LOGOUT_FAILURE }))
}
