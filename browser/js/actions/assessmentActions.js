'use strict'

import axios from 'axios'

export const LOAD_ASSESSMENTS_REQUEST = 'LOAD_ASSESSMENTS_REQUEST'
export const LOAD_ASSESSMENTS_SUCCESS = 'LOAD_ASSESSMENTS_SUCCESS'
export const LOAD_ASSESSMENTS_FAILURE = 'LOAD_ASSESSMENTS_FAILURE'
export const CREATE_ASSESSMENT_REQUEST = 'CREATE_ASSESSMENT_REQUEST'
export const CREATE_ASSESSMENT_SUCCESS = 'CREATE_ASSESSMENT_SUCCESS'
export const CREATE_ASSESSMENT_FAILURE = 'CREATE_ASSESSMENT_FAILURE'
export const UPDATE_ASSESSMENT_REQUEST = 'UPDATE_ASSESSMENT_REQUEST'
export const UPDATE_ASSESSMENT_SUCCESS = 'UPDATE_ASSESSMENT_SUCCESS'
export const UPDATE_ASSESSMENT_FAILURE = 'UPDATE_ASSESSMENT_FAILURE'
export const SWITCH_ASSESSMENT_REQUEST = 'SWITCH_ASSESSMENT_REQUEST'
export const SWITCH_ASSESSMENT_SUCCESS = 'SWITCH_ASSESSMENT_SUCCESS'
export const SWITCH_ASSESSMENT_FAILURE = 'SWITCH_ASSESSMENT_FAILURE'
import { getAssessment } from '../reducers/assessments'
import { getStudentTestsInfo, getStudentTestInfo } from '../actions/studentTestInfoActions'

const API_URL = '/api/v1'
const USER_URL = `${API_URL}/users`
const ASSESSMENT_URL = `${API_URL}/assessments`

export const getUserAssessments = () => (dispatch) => {
  dispatch({ type: LOAD_ASSESSMENTS_REQUEST })

  return axios.get(`${USER_URL}/assessments`).then(res => res.data)
  .then(resData => dispatch({
    type: LOAD_ASSESSMENTS_SUCCESS,
    assessments: resData
  }))
  .catch(error => dispatch({ type: LOAD_ASSESSMENTS_FAILURE, error }))
}

export const createAssessment = (assessment) => (dispatch, getState) => {
  dispatch({ type: CREATE_ASSESSMENT_REQUEST })

  assessment.instructorId = getState().session.user.id

  return axios.post(ASSESSMENT_URL, assessment).then(res => res.data)
  .then(resData => dispatch({
    type: CREATE_ASSESSMENT_SUCCESS,
    assessment: resData
  }))
  .catch(error => dispatch({ type: CREATE_ASSESSMENT_FAILURE, error }))
}

export const updateAssessment = (assessment) => (dispatch) => {
  dispatch({ type: UPDATE_ASSESSMENT_REQUEST })

  return axios.put(`${ASSESSMENT_URL}/${assessment.id}` , assessment).then(res => res.data)
  .then(resData => dispatch({
    type: UPDATE_ASSESSMENT_SUCCESS,
    assessment: resData
  }))
  .catch(error => dispatch({ type: UPDATE_ASSESSMENT_FAILURE, error }))
}
export const switchAssessment = (id, userId, option) => (dispatch, getState) => {
  dispatch({ type: SWITCH_ASSESSMENT_REQUEST })

  const assessment = getAssessment(getState().assessments, id)

  if (assessment) {
    dispatch({ type: SWITCH_ASSESSMENT_SUCCESS, assessment })
    dispatch(getStudentTestsInfo(assessment.id))
  } else {
    return axios.get(`${ASSESSMENT_URL}/${id}`)
    .then(res => {
      dispatch({ type: SWITCH_ASSESSMENT_SUCCESS, assessment: res.data })
      if (option) {
        dispatch(getStudentTestInfo(res.data.id, userId))
      } else {
        dispatch(getStudentTestsInfo(res.data.id))
      }
    })
    .catch(error => dispatch({ type: SWITCH_ASSESSMENT_FAILURE, error }))
  }
}
