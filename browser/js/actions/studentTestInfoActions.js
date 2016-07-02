'use strict'

import axios from 'axios'

export const LOAD_STUDENTTEST_REQUEST = 'LOAD_STUDENTTEST_REQUEST'
export const LOAD_STUDENTTEST_SUCCESS = 'LOAD_STUDENTTEST_SUCCESS'
export const LOAD_STUDENTTEST_FAILURE = 'LOAD_STUDENTTEST_FAILURE'
// export const UPDATE_STUDENTTEST_REQUEST = 'UPDATE_STUDENTTEST_REQUEST'
export const UPDATE_STUDENTTEST_SUCCESS = 'UPDATE_STUDENTTEST_SUCCESS'
export const UPDATE_STUDENTTEST_FAILURE = 'UPDATE_STUDENTTEST_FAILURE'

export function getStudentTestInfo (assessmentId, studentId) {
  return dispatch => {
    dispatch({ type: LOAD_STUDENTTEST_REQUEST })
    return axios.get(`/api/v1/assessments/${assessmentId}/students/${studentId}`)
    .then(res => res.data)
    .then(resData => dispatch({ type: LOAD_STUDENTTEST_SUCCESS, studentTest: resData }))
    .catch(err => dispatch({ type: LOAD_STUDENTTEST_FAILURE, err }))
  }

}

export function putStudentTestInfo (assessmentId, studentId, isStudent) {
  return dispatch => {
    // dispatch({ type: UPDATE_STUDENTTEST_REQUEST })
    return axios.put(`/api/v1/assessments/${assessmentId}/students/${studentId}`, {isStudent: isStudent})
    .then(res => res.data)
    .then(resData => dispatch({ type: UPDATE_STUDENTTEST_SUCCESS, isStudent: isStudent }))
    .catch(err => dispatch({ type: UPDATE_STUDENTTEST_FAILURE, err }))
  }

}