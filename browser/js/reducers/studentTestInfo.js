'use strict'

import {
  LOAD_STUDENTTEST_REQUEST,
  LOAD_STUDENTTEST_SUCCESS,
  LOAD_STUDENTTEST_FAILURE,
  UPDATE_STUDENTTEST_SUCCESS,
  UPDATE_STUDENTTEST_FAILURE
} from '../actions/studentTestInfoActions'
import styles from '../components/graderStyles'

let style, status; 
const initialState = {
  isFetching: false,
  toggled: true,
  style: styles.infoCard,
  status: null,
  error: null
}

export default function studentTestInfo (state = initialState, action) {
  switch (action.type) {
    case LOAD_STUDENTTEST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case LOAD_STUDENTTEST_SUCCESS:
      style = action.studentTest.isStudent ? styles.infoCard : styles.inactiveCard;
      if (action.studentTest.isGraded) status = 'done';
      else if (action.studentTest.isGraded) status = 'no-repo'
      else status = action.studentTest.score;
      return Object.assign({}, state, {
        isFetching: false,
        toggled: action.studentTest.isStudent,
        style: style,
        status: status
      })
    case LOAD_STUDENTTEST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case UPDATE_STUDENTTEST_SUCCESS:
      style = action.isStudent ? styles.infoCard : styles.inactiveCard;
      return Object.assign({}, state, {
        toggled: action.isStudent,
        style: style
      })
    case UPDATE_STUDENTTEST_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state
  }
}
