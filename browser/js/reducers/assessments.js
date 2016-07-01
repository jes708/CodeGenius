'use strict'

import { combineReducers } from 'redux'
import {
  LOAD_ASSESSMENTS_REQUEST,
  LOAD_ASSESSMENTS_SUCCESS,
  LOAD_ASSESSMENTS_FAILURE,
  CREATE_ASSESSMENT_REQUEST,
  CREATE_ASSESSMENT_SUCCESS,
  CREATE_ASSESSMENT_FAILURE,
} from '../actions/assessmentActions'


export const byId = (state = {}, action) => {
  const nextState = Object.assign({}, state)
  switch (action.type) {
    case 'LOAD_ASSESSMENTS_SUCCESS':
      action.assessments.forEach(assessment => {
        nextState[assessment.id] = assessment
      })
      return nextState
    case 'CREATE_ASSESSMENT_SUCCESS':
      nextState[action.assessment.id] = action.assessment
      return nextState
    default:
      return state
  }
}

export const byUser = (state = {}, action) => {

}

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'LOAD_ASSESSMENTS_REQUEST':
    case 'CREATE_ASSESSMENT_REQUEST':
      return true
    case 'LOAD_ASSESSMENTS_SUCCESS':
    case 'LOAD_ASSESSMENTS_FAILURE':
    case 'CREATE_ASSESSMENT_SUCCESS':
    case 'CREATE_ASSESSMENT_FAILURE':
      return false
    default:
      return state
  }
}

export default combineReducers({
  byId,
  isFetching
})

export const getAllAssessments = (state) => Object.keys(state).map(id => state[id])
export const getAssessmentsFor = (state, userId) => Object.keys(state).map(userId => state[userId])

// const initialState = {
//   isFetching: false,
//   items: [],
//   currentAssessment: {},
//   error: null
// }

// export default function assessments (state = initialState, action) {
//   switch (action.type) {
//     case CREATE_ASSESSMENT_REQUEST:
//     case LOAD_ASSESSMENTS_REQUEST:
//       return Object.assign({}, state, {
//         isFetching: true,
//         error: null
//       })
//     case LOAD_ASSESSMENTS_SUCCESS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         items: action.assessments,
//         error: null
//       })
//     case CREATE_ASSESSMENT_SUCCESS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         currentAssessment: action.assessment,
//         error: null
//       })
//     case CREATE_ASSESSMENT_FAILURE:
//     case LOAD_ASSESSMENTS_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false,
//         error: action.error
//       })
//     default:
//       return state
//   }
// }
