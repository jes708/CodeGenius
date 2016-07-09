'use strict'

import axios from 'axios'

export const LOAD_STUDENTTEST_REQUEST = 'LOAD_STUDENTTEST_REQUEST'
export const LOAD_STUDENTTEST_SUCCESS = 'LOAD_STUDENTTEST_SUCCESS'
export const LOAD_STUDENTTEST_FAILURE = 'LOAD_STUDENTTEST_FAILURE'
export const LOAD_STUDENTTESTS_REQUEST = 'LOAD_STUDENTTESTS_REQUEST'
export const LOAD_STUDENTTESTS_SUCCESS = 'LOAD_STUDENTTESTS_SUCCESS'
export const LOAD_STUDENTTESTS_FAILURE = 'LOAD_STUDENTTEST_FAILURE'
export const LOAD_SINGLESTUDENTTEST_REQUEST = 'LOAD_SINGLESTUDENTTEST_REQUEST'
export const LOAD_SINGLESTUDENTTEST_SUCCESS = 'LOAD_SINGLESTUDENTTEST_SUCCESS'
export const LOAD_SINGLESTUDENTTEST_FAILURE = 'LOAD_SINGLESTUDENTTEST_FAILURE'
export const UPDATE_STUDENTTEST_REQUEST = 'UPDATE_STUDENTTEST_REQUEST'
export const UPDATE_STUDENTTEST_SUCCESS = 'UPDATE_STUDENTTEST_SUCCESS'
export const UPDATE_STUDENTTEST_FAILURE = 'UPDATE_STUDENTTEST_FAILURE'
export const UPDATE_STUDENTTESTINFO_SUCCESS = 'UPDATE_STUDENTTESTINFO_SUCCESS'

import { switchAssessment } from '../actions/assessmentActions'

export function getStudentTestsInfo (assessmentId) {
  return dispatch => {
    dispatch({ type: LOAD_STUDENTTESTS_REQUEST })
    return axios.get(`/api/v1/assessments/${assessmentId}/students`)
    .then(res => res.data)
    .then(resData => dispatch({ type: LOAD_STUDENTTESTS_SUCCESS, studentTests: resData }))
    .catch(err => dispatch({ type: LOAD_STUDENTTESTS_FAILURE, err }))
  }

}

export function getStudentTestInfo (assessmentId, studentId) {
  return dispatch => {
    dispatch({ type: LOAD_STUDENTTEST_REQUEST })
    return axios.get(`/api/v1/assessments/${assessmentId}/students/${studentId}`)
    .then(res => res.data)
    .then(resData => dispatch({ type: LOAD_STUDENTTEST_SUCCESS, studentTest: resData }))
    .catch(err => dispatch({ type: LOAD_STUDENTTEST_FAILURE, err }))
  }
}

export const getOwnStudentTest = (studentTestId) => (dispatch) => {
  dispatch({ type: LOAD_SINGLESTUDENTTEST_REQUEST })
  // getOwnStudentTest(res.data.id, userId)
  return axios.get(`/api/v1/assessments/studentTest/${studentTestId}`)
  .then(res => res.data)
  .then(data => {
    dispatch({ type: LOAD_SINGLESTUDENTTEST_SUCCESS, studentTest: data })
    dispatch(switchAssessment(data.assessmentId, true))
    }
  )
  .catch(err => dispatch({ type: LOAD_SINGLESTUDENTTEST_FAILURE, err }))

}

export function putStudentTestInfo (assessmentId, studentId, data, addToCurrent = true) {
  return dispatch => {
    return axios.put(`/api/v1/assessments/${assessmentId}/students/${studentId}`, data)
    .then(res => res.data)
    .then(resData => {
      if (addToCurrent) {
        dispatch({ type: UPDATE_STUDENTTEST_SUCCESS, studentTest: resData })
      } else {
        dispatch({ type: UPDATE_STUDENTTESTINFO_SUCCESS, studentTest: resData })
      }
    })
    .catch(err => dispatch({ type: UPDATE_STUDENTTEST_FAILURE, err }))
  }

}
