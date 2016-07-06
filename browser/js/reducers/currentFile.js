'use strict'

import { FETCH_REPO_SUCCESS } from '../actions/githubActions'

const currentFile = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPO_SUCCESS:
      const nextState = Object.assign({}, state)
      let splitPath = action.path.split('/')
      nextState.path = action.path
      nextState.user = splitPath[0]
      nextState.repo = splitPath[1]
      nextState.basePath = `${splitPath[0]}/${splitPath[1]}`
      nextState.filePath = `${splitPath.slice(2).join('/')}`
      return nextState
    default:
      return state
  }
}

export default currentFile
