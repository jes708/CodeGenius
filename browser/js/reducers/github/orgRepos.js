'use strict'

import { combineReducers } from 'redux'
import {
  FETCH_ORGREPO_SUCCESS,
  FETCH_ORGREPO_REQUEST,
  FETCH_ORGREPO_FAILURE
} from '../../actions/githubActions'

const byRepoId = (state = {}, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case FETCH_ORGREPO_SUCCESS:
      action.orgrepo.forEach(repo => {
        nextState[repo.id] = repo.full_name
      })
      return nextState
    default:
      return state
  }
}

const isFetchingOrgRepo = (state = false, action) => {
  switch (action.type) {
    case FETCH_ORGREPO_REQUEST:
      return true
    case FETCH_ORGREPO_SUCCESS:
    case FETCH_ORGREPO_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  byRepoId,
  isFetchingOrgRepo
})
