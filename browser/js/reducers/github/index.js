'use strict'

import { combineReducers } from 'redux'
import orgs from './orgs'
import teams from './teams'
import { reposContent, contents, error } from './reposContent'
import orgRepos from './orgRepos'
import files from './files'

export const getOrgs = (state) => Object.keys(state).map(id => state[id])
export const getTeams = (state) => Object.keys(state).map(id => state[id])
export const getRepos = (state) => Object.keys(state).map(id => state[id])
export const getOrgRepos = (state) => Object.keys(state).map(id => state[id])

export default combineReducers({
  orgs,
  teams,
  reposContent,
  orgRepos,
  files,
  contents,
  error
})
