'use strict'

import { combineReducers } from 'redux'
import {
  FETCH_FILE_DIFF_REQUEST,
  FETCH_FILE_DIFF_SUCCESS,
  FETCH_FILE_DIFF_FAILURE
} from '../../actions/githubActions'

const byName = (state = {}, action) => {
  const nextState = Object.assign({}, state)
  switch (action.type) {
    case FETCH_FILE_DIFF_SUCCESS:
      action.files.map(file => {
        nextState[file.filename] = file
      })
      return nextState
    default:
      return state
  }
}

const isFetchingFiles = (state = false, action) => {
  switch (action.typ) {
    case FETCH_FILE_DIFF_REQUEST:
      return true
    case FETCH_FILE_DIFF_SUCCESS:
    case FETCH_FILE_DIFF_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  byName,
  isFetchingFiles
})
