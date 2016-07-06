'use strict'

import { combineReducers } from 'redux'
import {
  SWITCH_ASSESSMENT_REQUEST,
  SWITCH_ASSESSMENT_SUCCESS,
  SWITCH_ASSESSMENT_FAILURE,
} from '../../actions/assessmentActions'
import {
  LOAD_STUDENTTEST_SUCCESS,
  UPDATE_STUDENTTEST_SUCCESS
} from '../../actions/studentTestInfoActions'

const isSwitching = (state = false, action) => {
  switch (action.type) {
    case SWITCH_ASSESSMENT_REQUEST:
      return true
    case SWITCH_ASSESSMENT_SUCCESS:
    case SWITCH_ASSESSMENT_FAILURE:
      return false
    default:
      return state
  }
}

const base = (state = {}, action) => {
  switch (action.type) {
    case SWITCH_ASSESSMENT_SUCCESS:
      return action.assessment
    default:
      return state
  }
}

const student = (state = {}, action) => {
  switch (action.type) {
    case LOAD_STUDENTTEST_SUCCESS:
    case UPDATE_STUDENTTEST_SUCCESS:
      return action.studentTest
    default:
      return state
  }
}

const solution = (state = {}, action) => {
  switch (action.type) {
    case SWITCH_ASSESSMENT_SUCCESS:
      return action.assessment
    default:
      return state
  }
}

export default combineReducers({
  isSwitching,
  base,
  student,
  solution
})
