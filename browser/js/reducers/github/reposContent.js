'use strict'

import { combineReducers } from 'redux'
import {
  FETCH_REPO_REQUEST,
  FETCH_REPO_SUCCESS,
  FETCH_REPO_FAILURE,
} from '../../actions/githubActions'

const byRepoUrl = (state = {}, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case FETCH_REPO_SUCCESS:
      nextState[action.repoUrl] = action.contents
      return nextState
    default:
      return state
  }
}

const isFetchingRepoContent = (state = false, action) => {
  switch (action.type) {
    case FETCH_REPO_REQUEST:
      return true
    case FETCH_REPO_SUCCESS:
    case FETCH_REPO_FAILURE:
      return false
    default:
      return state
  }
}

export const contents = (state = '', action) => {
  switch (action.type) {
    case FETCH_REPO_SUCCESS:
      return action.contents
    default:
      return state
  }
}

export const error = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPO_REQUEST:
    case FETCH_REPO_SUCCESS:
      return {}
    case FETCH_REPO_FAILURE:
      return action.error
    default:
      return state
  }
}

export default combineReducers({
  byRepoUrl,
  isFetchingRepoContent
})
