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
    case 'COMMENT_EDIT_START':
      return Object.assign({}, state, {
        isEditing: action.payload
      })
    case 'COMMENT_EDIT_DONE':
      return Object.assign({}, state, {
        isEditing: action.payload
      })
    case 'LOAD_COMMENTS_SUCCESS':
      return Object.assign({}, state, {
        collection: action.payload.map( comment => {
          return Object.assign({}, {
            commentIndex: comment.id,
          }, comment )
        }) })

    return commentCollection
    case 'CREATE_COMMENT_SUCCESS':
      console.log('adding comment to state', state);
      let nextState = Object.assign({}, state);
      if( !nextState.collection ) nextState.collection = [];
      console.log(action.payload);
      nextState.collection.unshift(action.payload);
      console.log(nextState);
      return nextState;
    default:
      return state
  }
}
