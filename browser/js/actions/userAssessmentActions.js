'use strict'

import axios from 'axios'

export const LOAD_ASSESSMENTS_REQUEST = 'LOAD_ASSESSMENTS_REQUEST'
export const LOAD_ASSESSMENTS_SUCCESS = 'LOAD_ASSESSMENTS_SUCCESS'
export const LOAD_ASSESSMENTS_FAILURE = 'LOAD_ASSESSMENTS_FAILURE'

const API_URL = '/api/v1/assessments'

export function getUserAssessments (id) {
  return dispatch => {
    dispatch({ type: LOAD_ASSESSMENTS_REQUEST })
    return axios.get(API_URL)
    .then(res => res.data)
    .then(resData => {
      console.log('resData', resData);
      dispatch({ type: LOAD_ASSESSMENTS_SUCCESS, assessments: resData });
    })
    .catch(err => dispatch({ type: LOAD_ASSESSMENTS_FAILURE, err }))
  }
}
