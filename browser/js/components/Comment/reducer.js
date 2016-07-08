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
  if(action.isFetching) nextState.isFetching = action.isFetching;
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
      console.log('comment edit done', action.payload)
      if(!!nextState.isEditing.key){
        nextState
          .collection = nextState.collection.map( comment => comment.commentIndex === nextState.isEditing.key ? comment = action.payload.contents : comment)
        nextState.isEditing.key = null;
      }
      return nextState;
    case 'LOAD_COMMENTS_REQUEST':
      nextState.isFetching = action.isFetching;
      nextState.failed = action.failed;
      return nextState;
    case 'LOAD_COMMENTS_FAILURE':
      nextState.isFetching = action.isFetching;
      nextState.failed = action.failed;
      return nextState;
    case 'LOAD_COMMENTS_SUCCESS':
      return Object.assign({}, state, {
        collection: action.payload.map( comment => {
          return Object.assign({}, {
            commentIndex: comment.id,
          }, comment )
        }),
        isFetching: action.isFetching,
        failed: action.failed
      })
    case 'CREATE_COMMENT_SUCCESS':
      action.payload.commentIndex = action.payload.id;
      nextState.collection.unshift(action.payload);
      return nextState;
    case 'CREATE_ANNOTATION_SUCCESS':
      commentToUpdate = nextState.collection.find( comment => comment.commentIndex === action.payload.commentId)
      commentToUpdate.annotation = action.payload;
      return nextState;
    case 'LOAD_STUDENTTEST_SUCCESS':
      nextState.current = {
        userId: action.studentTest.userId,
        assessmentId: action.studentTest.assessmentId
      }
      nextState.collection = mapCommentsToIndex(action.studentTest.comments);
      return nextState;
    case 'UPDATE_COMMENT_SUCCESS':
      commentToUpdate = nextState.collection.find(
        (comment) =>
          comment.commentIndex
          === action.payload.id
      )
      action.payload.commentIndex = action.payload.id;
      let finalCollection = nextState.collection
        .map( comment => (
                   comment.commentIndex === action.payload.commentIndex
                 ) ? (comment = action.payload
                 ) : (comment))
      // nextState.isEditing.key = null;
      // nextState.collection = mapCommentsToIndex( finalCollection )
      let finalState = Object.assign( {}, nextState, {collection: finalCollection})
      return finalState;
    default:
      return state
  }
}
