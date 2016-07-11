'use strict';

const comment_initialState = {
  commentKey: null,
  collection: [],
  isEditing: {key: null},
  allTags: {
    list: []
  }
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
  let commentToUpdate, isFetching, error, failed, tagId, commentId, payload;
  switch(action.type){
    case 'SELECT_COMMENT':
      return Object.assign({}, state, {
        commentKey: action.payload,
      })
      break;
    case 'COMMENT_EDIT_START':
      if(action.payload.key === null) console.log('key is null!');
      return Object.assign({}, state, {
        isEditing: action.payload
      })
      break;
    case 'COMMENT_EDIT_DONE':
      if(!!nextState.isEditing.key){
        nextState
          .collection = nextState.collection.map( comment => comment.commentIndex === nextState.isEditing.key ? comment = action.payload.contents : comment)
        nextState.isEditing.key = null;
      }
      return nextState;
      break;
    case 'LOAD_COMMENTS_REQUEST':
      nextState.isFetching = action.isFetching;
      nextState.failed = action.failed;
      return nextState;
      break;
    case 'LOAD_COMMENTS_FAILURE':
      nextState.isFetching = action.isFetching;
      nextState.failed = action.failed;
      return nextState;
      break;
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
      break;
    case 'ADD_TAG_REQUEST':
      ({isFetching, error, failed, tagId, commentId} = action )
      nextState.addTag = Object.assign({}, state.addTag, {
        isFetching, error, failed, tagId, commentId
      })
      return nextState;
      break;
    case 'ADD_TAG_SUCCESS':
      ({isFetching, error, failed, tagId, commentId, payload} = action );
      nextState.addTag = Object.assign({}, state.addTag, {
        isFetching, error, failed, tagId, commentId, payload
      })
      commentToUpdate = nextState.collection.find( comment => comment.commentIndex === commentId);
      commentToUpdate.tags = payload.tags;
      return nextState;
      break;
    case 'ADD_TAG_FAILURE':
      ({isFetching, error, failed, tagId, commentId} = action );
      nextState.addTag = Object.assign({}, state.addTag, {
        isFetching, error, failed, tagId, commentId
      } )
      return nextState;
      break;
    case 'CREATE_TAG_SUCCESS':
      commentToUpdate = nextState.collection.find( comment => comment.commentIndex === action.commentId);
      commentToUpdate.tags.push(action.payload);
      nextState.isFetching = action.isFetching;
      nextState.failed = false;
      return nextState;
      break;
    case 'REMOVE_TAG_SUCCESS':
      commentToUpdate = nextState.collection.find( comment => comment.commentIndex === action.commentId);
      commentToUpdate.tags = action.payload.tags;
      nextState.isFetching = action.isFetching;
      nextState.failed = false;
      return nextState;
      break;
    case 'CREATE_COMMENT_SUCCESS':
      action.payload.commentIndex = action.payload.id;
      nextState.collection.unshift(action.payload);
      if(!action.payload.tags) action.payload.tags = [];
      return nextState;
      break;
    case 'CREATE_ANNOTATION_SUCCESS':
      commentToUpdate = nextState.collection.find( comment => comment.commentIndex === action.payload.commentId)
      commentToUpdate.annotation = action.payload;
      return nextState;
      break;
    case 'LOAD_STUDENTTEST_SUCCESS':
      nextState.current = {
        userId: action.studentTest.userId,
        assessmentId: action.studentTest.assessmentId
      }
      nextState.collection = mapCommentsToIndex(action.studentTest.comments);
      return nextState;
      break;
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
      break;
    case 'LOAD_TAGLIST_REQUEST':
      ({isFetching, error, failed} = action);
      nextState.allTags = {
        list: state.allTags.list,
        isFetching,
        error,
        failed
      }
      return nextState;
      break;
    case 'LOAD_TAGLIST_SUCCESS':
      ({isFetching, error, failed} = action);
      nextState.allTags = {
        list: action.payload,
        isFetching,
        error,
        failed
      }
      return nextState;
      break;
    case 'LOAD_TAGLIST_FAILURE':
      ({isFetching, error, failed} = action);
      nextState.allTags = {
        list: state.allTags.list,
        isFetching,
        error,
        failed
      }
      return nextState;
    default:
      return state
  }
}
