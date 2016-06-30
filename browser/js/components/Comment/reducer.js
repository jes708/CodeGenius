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
      return Object.assign({}, state, {
        annotation: action.annotation,
        selection: action.selection,
        selectionString: action.selectionString
      })
    default:
      return state
  }
}
