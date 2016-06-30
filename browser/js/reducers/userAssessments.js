'use strict'

import {
  LOAD_ASSESSMENTS_REQUEST,
  LOAD_ASSESSMENTS_SUCCESS,
  LOAD_ASSESSMENTS_FAILURE
} from '../actions/userAssessmentActions'

const initialState = {
  isFetching: false,
  items: [],
  error: null
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case LOAD_ASSESSMENTS_SUCCESS:
      return action.assessments.map(assessment => assessment.id)
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ASSESSMENTS_SUCCESS:
      let newState = {...state}
      action.assessments.forEach(assessment => {
        newState[assessment.id] = assessment(assessment, action)
      })
      return newState
    default:
      return state
  }
}

export const getAllAssessments = (state) => state.allIds.map(id => state.byId[id])

export const getById = (state, id) => state.byId[id]

export default function userAssessments (state = initialState, action) {
  switch (action.type) {
    case LOAD_ASSESSMENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case LOAD_ASSESSMENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.assessments
      })
    case LOAD_ASSESSMENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}
