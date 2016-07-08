'use strict'

import { combineReducers } from 'redux'
import {
  FETCH_ORG_TEAMS_REQUEST,
  FETCH_ORG_TEAMS_SUCCESS,
  FETCH_ORG_TEAMS_FAILURE
} from '../../actions/githubActions'

const byTeamId = (state = {}, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case FETCH_ORG_TEAMS_SUCCESS:
      action.teams.forEach(team => {
        nextState[team.id] = team
      })
      return nextState
    default:
      return state
  }
}

const isFetchingTeams = (state = false, action) => {
  switch (action.type) {
    case FETCH_ORG_TEAMS_REQUEST:
      return true
    case FETCH_ORG_TEAMS_SUCCESS:
    case FETCH_ORG_TEAMS_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  byTeamId,
  isFetchingTeams
})
