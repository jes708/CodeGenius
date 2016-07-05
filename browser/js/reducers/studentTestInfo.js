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
  UPDATE_STUDENTTEST_FAILURE
} from '../actions/studentTestInfoActions'
import styles from '../components/graderStyles'

let style, status, prevState; 
// const initialState = {
//   // isFetching: true,
//   toggled: true,
//   style: styles.infoCard,
//   status: null,
//   error: null
// }

// export default function studentTestInfo (state = initialState, action) {
//   const nextState = Object.assign({}, state)
//   switch (action.type) {
//     // case LOAD_STUDENTTEST_REQUEST:
//     //   return Object.assign({}, state, {
//     //     isFetching: true
//     //   })
//     case LOAD_STUDENTTEST_SUCCESS:
//       prevState = nextState[action.studentTest.userId] || {};
//       style = action.studentTest.isStudent ? styles.infoCard : styles.inactiveCard;
//       if (action.studentTest.isGraded) status = 'done';
//       else if (action.studentTest.isGraded) status = 'no-repo'
//       else status = action.studentTest.score;
//       nextState[action.studentTest.userId] = Object.assign({}, prevState, {
//         toggled: action.studentTest.isStudent,
//         style: style,
//         status: status
//       })
//       return nextState;
//     // case LOAD_STUDENTTEST_FAILURE:
//     //   return Object.assign({}, state, {
//     //     // isFetching: false,
//     //     error: action.error
//     //   })
//     case UPDATE_STUDENTTEST_SUCCESS:
//       prevState = nextState[action.studentId] || {};
//       style = action.isStudent ? styles.infoCard : styles.inactiveCard;
//       nextState[action.studentId] = Object.assign({}, prevState, {
//         toggled: action.isStudent,
//         style: style
//       })
//       return nextState;
//     // case UPDATE_STUDENTTEST_FAILURE:
//     //   return Object.assign({}, state, {
//     //     error: action.error
//     //   })
//     default:
//       return state
//   }
// }

export const byId = (state = {}, action) => {
  const nextState = Object.assign({}, state)
  switch (action.type) {
    case LOAD_STUDENTTESTS_SUCCESS:
      action.studentTests.forEach(studentTest => {
        nextState[studentTest.id] = studentTest
      })
      return nextState
    case LOAD_STUDENTTEST_SUCCESS:
      nextState[action.studentTest.id] = action.studentTest
      return nextState
    case UPDATE_STUDENTTEST_SUCCESS:
      nextState[action.studentTest.id] = action.studentTest
      return nextState
    // case LOAD_STUDENTTEST_SUCCESS:
    //   nextState[action.studentTest.id] = action.studentTest
    //   return nextState
    default:
      return state
  }
}

export const byAssessmentId = (state = {}, action) => {
  const nextState = Object.assign({}, state)
  switch (action.type) {
    case LOAD_STUDENTTESTS_SUCCESS:
      action.studentTests.forEach(studentTest => {
        if (!nextState[studentTest.assessmentId]) nextState[studentTest.assessmentId] = []
        nextState[studentTest.assessmentId].push(studentTest)
      })
      return nextState
    default:
      return state
  }
}

export const isFetching = (state = false, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  byId,
  byAssessmentId,
  isFetching
})

export const getAssessmentStudentTests = (state, id) => state[id]
export const getAllStudentTests = (state) => Object.keys(state).map(id => state[id])
export const getStudentTestFor = (state, userId) => Object.keys(state).map(userId => state[userId])
