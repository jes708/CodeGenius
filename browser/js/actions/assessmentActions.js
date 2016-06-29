'use strict'

import axios from 'axios'

export const REQUEST_ASSESSMENTS = 'REQUEST_ASSESSMENTS'
export const RECEIVED_ASSESSMENTS = 'RECEIVED_ASSESSMENTS'
export const FETCH_ERROR = 'FETCH_ERROR'

const API_URL = '/api/v1/assessments'

export function getUserAssessments (id) {
  return dispatch => {
    return axios.get(API_URL)
    .then(res => res.data)
    .then(resData => {
      dispatch(receivedAssessments(resData))
    })
    .catch(err => dispatch(fetchingError(err)))
  }
}

function receivedAssessments (assessments) {
  return { type: RECEIVED_ASSESSMENTS, assessments }
}

function fetchingError (error ) {
  return { type: FETCH_ERROR, error }
}

