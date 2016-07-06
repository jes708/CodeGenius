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

export function annotation(_annotation, commentId){
  let {selection, annotation, location} = _annotation;
  return api.postAnnotation({selection, annotation, location}, commentId)
}

export function finishAnnotation(payload){
  let finisher = payload;
  finisher.added = false;
  return {
    type: ANNOTATION,
    payload: finisher
  }
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
        added: true
      }
    }
}
