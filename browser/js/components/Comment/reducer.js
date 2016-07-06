'use strict';

const comment_initialState = {
  commentKey: null
}

function mapCommentsToIndex(comments){
  return comments.map( comment => {
    return Object.assign({}, {
      commentIndex: comment.id,
    }, comment )
  })
}

export default function commentReducer(state = comment_initialState, action){
  let nextState = Object.assign({}, state);
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
      if( !nextState.collection ) nextState.collection = [];
      action.payload.commentIndex = action.payload.id;
      nextState.collection.unshift(action.payload);
      return nextState;
    case 'CREATE_ANNOTATION_SUCCESS':
      let commentToUpdate = nextState.collection.find( comment => comment.commentIndex === action.payload.commentId)
      commentToUpdate.annotation = action.payload;
      return nextState;
    case 'LOAD_STUDENTTEST_SUCCESS':
      nextState.collection = mapCommentsToIndex(action.studentTest.comments);
      return nextState;
    default:
      return state
  }
}
