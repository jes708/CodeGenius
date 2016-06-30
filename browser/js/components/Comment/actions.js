'use strict'

export const SELECT_COMMENT = Symbol('SELECT_COMMENT')


export function selectComment(key){
  return {
    type: SELECT_COMMENT,
    payload: {key}
  }
}
