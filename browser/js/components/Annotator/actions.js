'use strict'

import axios from 'axios'
import * as api from './apiActions'

export const SELECTION = 'SELECTION'
export const ANNOTATION = 'ANNOTATION'
export const ANNOTATION_CLEAR = 'ANNOTATION_CLEAR'
export const ANNOTATION_ADDED = 'ANNOTATION_ADDED'


export function selection(_selection){
  return {
    type: SELECTION,
    selection: _selection,
    selectionString: _selection.toString()
  }
}

export function annotation(selection, annotation){
  return api.postAnnotation({selection, annotation})
    // .then((resData)=>{ return {
    //   type: ANNOTATION,
    //   added: false,
    //   response: resData,
    //   annotation: _annotation,
    //   selection: _selection,
    //   selectionString: _selection.toString(),
    // }} )
}

export function clearAnnotation( added = false, selection = null, annotation = null ){
  return {
    type: ANNOTATION_CLEAR,
    payload: {
      added,
      annotation,
      selection,
      selectionString: !selection ? null : selection.toString() }
  }
}

export function annotationAdded( added = true, clear = false ){
  if(clear) clearAnnotation( added, null, null );
    return {
      type: ANNOTATION_ADDED,
      payload: {
        added
      }
    }
}
