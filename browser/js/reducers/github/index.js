'use strict'

import { combineReducers } from 'redux'
import orgs from './orgs'
import teams from './teams'
import { reposContent, contents, error } from './reposContent'
import orgRepos from './orgRepos'
import files from './files'

export const mapState = (state) => Object.keys(state).map(key => state[key])

export default combineReducers({
  orgs,
  teams,
  reposContent,
  orgRepos,
  files,
  contents,
  error
})
