'use strict'

export const SELECT_COMMENT = Symbol('SELECT_COMMENT')
export const COMMENT_EDIT_START = Symbol('COMMENT_EDIT_START');
export const COMMENT_EDIT_DONE = Symbol('COMMENT_EDIT_DONE');

export function selectComment(key){
  return {
    type: SELECT_COMMENT,
    payload: {key}
  }
}

export function commentEdit(key){
  return {
    type: COMMENT_EDIT_START,
    payload: {key}
  }
}

export function commentEditDone(key = null){
  return {
    type: COMMENT_EDIT_DONE,
    payload: {key}
  }
}
