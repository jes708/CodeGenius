'use strict';

const comment_initialState = {
  commentKey: null
}

export default function commentReducer(state = comment_initialState, action){
  switch(action.type){
    case 'SELECT_COMMENT':
      return Object.assign({}, state, {
        commentKey: action.payload,
      })
    default:
      return state
  }
}
