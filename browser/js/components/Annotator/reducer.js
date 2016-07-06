'use strict';

const annotator_initialState = {
  selection: {},
  annotation: {},
  selectionString: '',
  mouseDownEvent: {},
  mouseUpEvent: {}
}

export default function annotationReducer(state = annotator_initialState, action){
  switch(action.type){
    case 'SELECTION':
      return Object.assign({}, state, {
        selection: action.selection,
        selectionString: action.selectionString
      })
    case 'ANNOTATION':
      return Object.assign({}, state, action.payload, {
        annotation: action.payload.annotation,
        selection: action.payload.selection,
        selectionString: action.payload.selectionString,
        added: action.payload.added
      })
    case 'ANNOTATION_CLEAR':
      return Object.assign({}, state, action.payload)
    case 'ANNOTATION_ADDED':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
