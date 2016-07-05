'use strict'

import { FETCH_REPO_SUCCESS } from '../actions/githubActions'

const currentFile = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPO_SUCCESS:
      const nextState = Object.assign({}, state)
      nextState.path = action.path
      return nextState
    default:
      return state
  }
}

export default currentFile
