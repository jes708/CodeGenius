'use strict'

import {
  LOAD_TEAM_REQUEST,
  LOAD_TEAM_SUCCESS,
  LOAD_TEAM_FAILURE
} from '../actions/assessmentTeamActions'

const initialState = {
  teamFetching: false,
  team: [],
  error: null
}

export default function assessmentTeam (state = initialState, action) {
  console.log('assessmentTeam.js', action)
  switch (action.type) {
    case LOAD_TEAM_REQUEST:
      return Object.assign({}, state, {
        teamFetching: true
      })
    case LOAD_TEAM_SUCCESS:
      return Object.assign({}, state, {
        teamFetching: false,
        team: action.team
      })
    case LOAD_TEAM_FAILURE:
      return Object.assign({}, state, {
        teamFetching: false,
        error: action.error
      })
    default:
      return state
  }
}
