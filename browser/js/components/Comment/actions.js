'use strict'

export const SELECTION = 'SELECTION'
export const ANNOTATION = 'ANNOTATION'


export function selection(_selection){
  return {
    type: SELECTION,
    selection: _selection,
    selectionString: _selection.toString()
  }
}

export function annotation(_selection, _annotation){
  return {
    type: ANNOTATION,
    annotation: _annotation,
    selection: _selection,
    selectionString: _selection.toString()
  }
}
