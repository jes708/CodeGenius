'use strict'

import { combineReducers } from 'redux'
import {
  FETCH_ORGS_REQUEST,
  FETCH_ORGS_SUCCESS,
  FETCH_ORGS_FAILURE
} from '../../actions/githubActions'

const byId = (state = {}, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case FETCH_ORGS_SUCCESS:
      action.orgs.forEach(org => {
        nextState[org.id] = org
      })
      return nextState
    default:
      return state
  }
}

const isFetchingOrgs = (state = false, action) => {
  switch (action.type) {
    case FETCH_ORGS_REQUEST:
      return true
    case FETCH_ORGS_SUCCESS:
    case FETCH_ORGS_FAILURE:
      return false
    default:
      return state
  }

}
export default combineReducers({
  byId,
  isFetchingOrgs
})
