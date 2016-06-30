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


// const assessments = () => {

//   const byId = (state = {}, action) => {
//     const nextState = Object.assign({}, state)
//     switch (action.type) {
//       case 'LOAD_ASSESSMENTS_SUCCESS':
//         action.assessments.forEach(assessment => {
//           nextState[assessment.id] = assessment
//         })
//         return nextState
//       case 'CREATE_ASSESSMENT_SUCCESS':
//         nextState[action.assessment.id] = action.assessment
//         return nextState
//       default:
//         return state
//     }
//   }

//   const isFetching = (state = {}, action) => {
//     switch (action.type) {
//       case 'LOAD_ASSESSMENTS_REQUEST':
//       case 'CREATE_ASSESSMENT_REQUEST':
//         return true
//       case 'LOAD_ASSESSMENTS_SUCCESS':
//       case 'LOAD_ASSESSMENTS_FAILURE':
//       case 'CREATE_ASSESSMENT_SUCCESS':
//       case 'CREATE_ASSESSMENT_FAILURE':
//         return false
//       default:
//         state
//     }
//   }

//   return combineReducers({
//     byId,
//     isFetching
//   })
// }

// export default assessments

// export const getAssessmentsFor = (state, id) => Object.keys(state).map(id => state[id])


const initialState = {
  isFetching: false,
  items: [],
  currentAssessment: {},
  error: null
}

export default function assessments (state = initialState, action) {
  switch (action.type) {
    case CREATE_ASSESSMENT_REQUEST:
    case LOAD_ASSESSMENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case LOAD_ASSESSMENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.assessments
      })
    case CREATE_ASSESSMENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        currentAssessment: action.assessment
      })
    case CREATE_ASSESSMENT_FAILURE:
    case LOAD_ASSESSMENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}
