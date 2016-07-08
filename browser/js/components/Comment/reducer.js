'use strict';

const comment_initialState = {
  commentKey: null,
  collection: [],
  isEditing: {key: null}
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
  let commentToUpdate;
  switch(action.type){
    case 'SELECT_COMMENT':
      return Object.assign({}, state, {
        commentKey: action.payload,
      })
    case 'COMMENT_EDIT_START':
      if(action.payload.key === null) console.log('key is null!');
      return Object.assign({}, state, {
        isEditing: action.payload
      })
    case 'COMMENT_EDIT_DONE':
      if(!!nextState.isEditing.key){
        nextState
          .collection = nextState.collection.map( comment => comment.commentIndex === nextState.isEditing.key ? comment = action.payload.contents : comment)
        nextState.isEditing.key = null;
      }
      return nextState;
    case 'LOAD_COMMENTS_SUCCESS':
      return Object.assign({}, state, {
        collection: action.payload.map( comment => {
          return Object.assign({}, {
            commentIndex: comment.id,
          }, comment )
        }) })
    case 'CREATE_COMMENT_SUCCESS':
      action.payload.commentIndex = action.payload.id;
      nextState.collection.unshift(action.payload);
      return nextState;
    case 'CREATE_ANNOTATION_SUCCESS':
      commentToUpdate = nextState.collection.find( comment => comment.commentIndex === action.payload.commentId)
      commentToUpdate.annotation = action.payload;
      return nextState;
    case 'LOAD_STUDENTTEST_SUCCESS':
      nextState.collection = mapCommentsToIndex(action.studentTest.comments);
      return nextState;
    default:
      return state
  }
}
