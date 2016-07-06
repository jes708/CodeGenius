'use strict'

import { combineReducers } from 'redux'
import {
  LOAD_ASSESSMENTS_REQUEST,
  LOAD_ASSESSMENTS_SUCCESS,
  LOAD_ASSESSMENTS_FAILURE,
  CREATE_ASSESSMENT_REQUEST,
  CREATE_ASSESSMENT_SUCCESS,
  CREATE_ASSESSMENT_FAILURE,
  UPDATE_ASSESSMENT_REQUEST,
  UPDATE_ASSESSMENT_SUCCESS,
  UPDATE_ASSESSMENT_FAILURE,
} from '../../actions/assessmentActions'
import { AUTH_LOGOUT_SUCCESS } from '../../actions/AuthActions'
import current from './current'

export const byId = (state = {}, action) => {
  const nextState = Object.assign({}, state)
  switch (action.type) {
    case LOAD_ASSESSMENTS_SUCCESS:
      action.assessments.forEach(assessment => {
        nextState[assessment.id] = assessment
      })
      return nextState
    case CREATE_ASSESSMENT_SUCCESS:
    case UPDATE_ASSESSMENT_SUCCESS:
      nextState[action.assessment.id] = action.assessment
      return nextState
    case AUTH_LOGOUT_SUCCESS:
      return {}
    default:
      return state
  }
}

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case LOAD_ASSESSMENTS_REQUEST:
    case CREATE_ASSESSMENT_REQUEST:
    case UPDATE_ASSESSMENT_REQUEST:
      return true
    case LOAD_ASSESSMENTS_SUCCESS:
    case LOAD_ASSESSMENTS_FAILURE:
    case CREATE_ASSESSMENT_SUCCESS:
    case UPDATE_ASSESSMENT_FAILURE:
    case UPDATE_ASSESSMENT_SUCCESS:
    case CREATE_ASSESSMENT_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  byId,
  isFetching,
  current
})

export const getAssessment = (state, id) => state.byId[id]
export const getAllAssessments = (state) => Object.keys(state).map(id => state[id])
export const getAssessmentsFor = (state, userId) => Object.keys(state).map(userId => state[userId])
