'use strict'

import { combineReducers } from 'redux'
import {
  LOAD_STUDENTTEST_REQUEST,
  LOAD_STUDENTTESTS_REQUEST,
  LOAD_STUDENTTEST_SUCCESS,
  LOAD_STUDENTTESTS_SUCCESS,
  LOAD_STUDENTTEST_FAILURE,
  LOAD_STUDENTTESTS_FAILURE,
  UPDATE_STUDENTTEST_SUCCESS,
  UPDATE_STUDENTTEST_FAILURE,
  UPDATE_STUDENTTESTINFO_SUCCESS,
  LOAD_SINGLESTUDENTTEST_REQUEST,
  LOAD_SINGLESTUDENTTEST_SUCCESS,
  LOAD_SINGLESTUDENTTEST_FAILURE,
  LOAD_ALLSTUDENTTESTSBYSTUDENTID_REQUEST,
  LOAD_ALLSTUDENTTESTSBYSTUDENTID_SUCCESS,
  LOAD_ALLSTUDENTTESTSBYSTUDENTID_FAILURE
} from '../actions/studentTestInfoActions'
import styles from '../components/graderStyles'

let style, status, prevState;

export const byId = (state = {}, action) => {
  const nextState = Object.assign({}, state)
  switch (action.type) {
    case LOAD_STUDENTTESTS_SUCCESS:
      action.studentTests.forEach(studentTest => {
        nextState[studentTest.id] = studentTest
      })
      return nextState
    case LOAD_STUDENTTEST_SUCCESS:
    case UPDATE_STUDENTTEST_SUCCESS:
    case UPDATE_STUDENTTESTINFO_SUCCESS:
      nextState[action.studentTest.id] = action.studentTest
      return nextState
    default:
      return state
  }
}

export const studentTestsById = (state={}, action) => {
  switch(action.type) {
    case LOAD_ALLSTUDENTTESTSBYSTUDENTID_REQUEST:
      return {...state, isFetching: true}
    case LOAD_ALLSTUDENTTESTSBYSTUDENTID_SUCCESS:
      const nextState = {...state}
      action.studentTests.forEach(studentTest => {
        nextState[studentTest.id] = studentTest
      })
      return {...nextState, isFetching: false}
    case LOAD_ALLSTUDENTTESTSBYSTUDENTID_FAILURE:
      return {...state, isFetching: false}
    default:
      return state
  }
}

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case LOAD_STUDENTTESTS_REQUEST:
      return true
    case LOAD_STUDENTTESTS_SUCCESS:
    case LOAD_STUDENTTESTS_FAILURE:
      return false
    default:
      return state
  }
}

export const studentTest = (state={}, action) => {
  switch(action.type){
    case LOAD_SINGLESTUDENTTEST_SUCCESS:
      return {...state, ...action.studentTest}
    default:
      return state
  }
}

export default combineReducers({
  byId,
  isFetching,
  studentTest,
  studentTestsById
})

export const getAssessmentStudentTests = (state, assessmentId) => {
  return Object.keys(state)
    .map(id => state[id])
    .filter(studentTest => studentTest.assessmentId === assessmentId)
}
export const getAllStudentTests = (state) => Object.keys(state).map(id => state[id])
export const getStudentTestFor = (state, userId) => Object.keys(state).map(userId => state[userId])

export const getStudentTestById = (state, testId) => {
  let studentTests = Object.keys(state)
  .map(id => state[id])
  .filter(test => test.id === Number(testId))
  if(studentTests.length) return studentTests[0]
}
