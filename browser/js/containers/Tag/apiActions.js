'use strict';

import axios from 'axios';
import APIROUTES from '../../utils/apiRoutes';

export const LOAD_TAGS_REQUEST = 'LOAD_TAGS_REQUEST'
export const LOAD_TAGS_SUCCESS = 'LOAD_TAGS_SUCCESS'
export const LOAD_TAGS_FAILURE = 'LOAD_TAGS_FAILURE'
export const LOAD_TAGLIST_REQUEST = 'LOAD_TAGLIST_REQUEST'
export const LOAD_TAGLIST_SUCCESS = 'LOAD_TAGLIST_SUCCESS'
export const LOAD_TAGLIST_FAILURE = 'LOAD_TAGLIST_FAILURE'
export const CREATE_TAG_REQUEST = 'CREATE_TAG_REQUEST'
export const CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS'
export const CREATE_TAG_FAILURE = 'CREATE_TAG_FAILURE'
export const LOAD_TAG_REQUEST = 'LOAD_TAG_REQUEST'
export const LOAD_TAG_SUCCESS = 'LOAD_TAG_SUCCESS'
export const LOAD_TAG_FAILURE = 'LOAD_TAG_FAILURE'
export const REMOVE_TAG_REQUEST = 'REMOVE_TAG_REQUEST'
export const REMOVE_TAG_SUCCESS = 'REMOVE_TAG_SUCCESS'
export const REMOVE_TAG_FAILURE = 'REMOVE_TAG_FAILURE'
export const ADD_TAG_REQUEST = 'ADD_TAG_REQUEST'
export const ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS'
export const ADD_TAG_FAILURE = 'ADD_TAG_FAILURE'
export const DELETE_TAG_REQUEST = 'DELETE_TAG_REQUEST'
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS'
export const DELETE_TAG_FAILURE = 'DELETE_TAG_FAILURE'

export const getTagsByCommentId = (
  commentId
) =>
  dispatch => {
    dispatch({
      type: LOAD_TAGS_REQUEST,
      isFetching: true,
      failed: false,
      error: null,
      commentId
    })
    return axios.get(APIROUTES.tagsByCommentId(commentId))
      .then(res => dispatch(getTagSuccess(res.data)) )
      .catch( err => dispatch(getTagFailure(err, commentId)))}

   export const getTagSuccess =
     resData =>
       dispatch => {
         let tags = resData
         dispatch({
           type: LOAD_TAGS_SUCCESS,
           payload: tags,
           isFetching: false,
           error: null,
           failed: false
         })
       }

   export const getTagFailure =
     (err, tags) =>
       dispatch => {
         dispatch({
           type: LOAD_TAGS_FAILURE,
           isFetching: false,
           failed: true,
           error: err,
           commentId
         })
       }

export const createTagByCommentId = (
  tag,
  commentId
  ) =>
    dispatch => {
      dispatch({
        type: CREATE_TAG_REQUEST,
        payload: tag,
        isFetching: true,
        failed: false,
        error: null,
        commentId
      })
      return axios.post(
        APIROUTES.tagsByCommentId(commentId),
        tag
      )
      .then(res => dispatch(createTagSuccess(res.data, commentId)) )
      .catch( err => dispatch(createTagFailure(err, tag)))}


export const createTagSuccess =
  (resData, commentId) =>
    dispatch => {
      let tag = resData
      dispatch({
        type: CREATE_TAG_SUCCESS,
        payload: tag,
        commentId,
        isFetching: false,
        error: null,
        failed: false
      })
    }

export const createTagFailure =
  (err, tag) =>
    dispatch => {
      dispatch({
        type: CREATE_TAG_FAILURE,
        isFetching: false,
        failed: true,
        payload: tag,
        error: err
      })
    }

export const deleteTag =
  tagId =>
    dispatch => {
      dispatch({
        type: DELETE_TAG_REQUEST,
        isFetching: true,
        failed: false,
        tagId,
        error: null
      })
      return axios.delete(APIROUTES.tagsById)
    .then( res => dispatch(deleteTagSuccess(res.data, tagId)) )
    .catch( err => dispatch(deleteTagFailure(err, tagId)) )}

export const deleteTagSuccess =
  (resData, tagId) =>
    dispatch => {
      dispatch({
        type: DELETE_TAG_SUCCESS,
        isFetching: false,
        failed: false,
        payload: resData,
        error: null,
        tagId
      })
    }

export const deleteTagFailure =
  (err, tagId) =>
    dispatch => {
      dispatch({
        type: DELETE_TAG_FAILURE,
        isFetching: false,
        failed: true,
        error: err,
        tagId
      })
    }

    export const addTagByCommentId = (
      tagId,
      commentId
      ) =>
        dispatch => {
          dispatch({
            type: ADD_TAG_REQUEST,
            payload: tagId,
            isFetching: true,
            failed: false,
            error: null,
            commentId
          })
          return axios.post(
            APIROUTES.tagByCommentId(commentId, tagId),
            tag
          )
          .then(res => dispatch(addTagSuccess(res.data, commentId)) )
          .catch( err => dispatch(addTagFailure(err, tagId, commentId)))}


    export const addTagSuccess =
      (resData, commentId) =>
        dispatch => {
          let tag = resData
          dispatch({
            type: ADD_TAG_SUCCESS,
            payload: tag,
            commentId,
            isFetching: false,
            error: null,
            failed: false
          })
        }

    export const addTagFailure =
      (err, tag) =>
        dispatch => {
          dispatch({
            type: ADD_TAG_FAILURE,
            isFetching: false,
            failed: true,
            payload: tag,
            error: err
          })
        }

        export const removeTagFromComment = (
          tagId,
          commentId
          ) =>
            dispatch => {
              dispatch({
                type: REMOVE_TAG_REQUEST,
                payload: tagId,
                isFetching: true,
                failed: false,
                error: null,
                commentId
              })
              return axios.delete(
                APIROUTES.tagByCommentId(commentId, tagId)
              )
              .then(res => dispatch(removeTagSuccess(res.data, tagId, commentId)) )
              .catch( err => dispatch(removeTagFailure(err, tagId)))}


        export const removeTagSuccess =
          (resData, tagId, commentId) =>
            dispatch => {
              dispatch({
                type: REMOVE_TAG_SUCCESS,
                payload: resData.comment,
                commentId,
                tagId,
                isFetching: false,
                error: null,
                failed: false
              })
            }

        export const removeTagFailure =
          (err, tag) =>
            dispatch => {
              dispatch({
                type: REMOVE_TAG_FAILURE,
                isFetching: false,
                failed: true,
                payload: tag,
                error: err
              })
            }
