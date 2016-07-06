'use strict'

import { combineReducers } from 'redux'
import {
  FETCH_REPO_REQUEST,
  FETCH_REPO_SUCCESS,
  FETCH_REPO_FAILURE,
  FETCH_ORGS_REQUEST,
  FETCH_ORGS_SUCCESS,
  FETCH_ORGS_FAILURE,
  FETCH_ORG_TEAMS_REQUEST,
  FETCH_ORG_TEAMS_SUCCESS,
  FETCH_ORG_TEAMS_FAILURE,
  FETCH_ORGREPO_SUCCESS,
  FETCH_ORGREPO_REQUEST,
  FETCH_ORGREPO_FAILURE
} from '../actions/githubActions'

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

const contents = (state = '', action) => {
  switch (action.type) {
    case FETCH_REPO_SUCCESS:
      return action.contents
    default:
      return state
  }
}

const error = (state = {}, action) => {
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

const isFetchingOrgRepo = (state = false, action) => {
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

const byRepoId = (state = {}, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case FETCH_ORGREPO_SUCCESS:
      action.orgrepo.forEach(repo => nextState[repo.id] = repo.full_name)
      return nextState
    default:
      return state
  }
}

export const getOrgs = (state) => Object.keys(state).map(id => state[id])
export const getTeams = (state) => Object.keys(state).map(id => state[id])
export const getRepos = (state) => Object.keys(state).map(id => state[id])
export const getOrgRepos = (state) => Object.keys(state).map(id => state[id])

export default combineReducers({
  orgs: combineReducers({
    byId,
    isFetchingOrgs
  }),
  teams: combineReducers({
    byTeamId,
    isFetchingTeams
  }),
  reposContent: combineReducers({
    byRepoUrl,
    isFetchingRepoContent
  }),
  orgRepos: combineReducers({
    byRepoId,
    isFetchingOrgRepo
  }),
  contents,
  error
})
