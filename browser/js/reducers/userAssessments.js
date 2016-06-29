'use strict'

import {
  REQUEST_ASSESSMENTS,
  RECEIVED_ASSESSMENTS,
  FETCH_ERROR
} from '../actions/assessmentActions'

const initialState = {
  isFetching: false,
  items: [],
  error: null
}

export default function userAssessments (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ASSESSMENTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVED_ASSESSMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.assessments
      })
    case FETCH_ERROR:
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state
  }
}
