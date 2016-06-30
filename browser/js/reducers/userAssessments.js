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

export default function userAssessments (state = initialState, action) {
  console.log('userAssessments.js', action)
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
