'use strict';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE'
export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST'
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE'
export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST'
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS'
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE'
export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST'
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS'
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE'

export const getUserComments =
  userId =>
    dispatch => {
      dispatch(LOAD_COMMENTS_REQUEST)
      return axios.get(APIROUTES.commentsByUserId(userId))
    }.then( res => res.data  )
      .then( resData => dispatch({
        type: LOAD_COMMENTS_SUCCESS,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_COMMENTS_FAILURE,
        payload: err
      }))

export const getCommentById =
  commentId =>
    dispatch => {
      dispatch(LOAD_COMMENT_REQUEST)
      return axios.get(APIROUTES.commentById(commentId))
    }.then( res => res.data )
      .then( resData => dispatch({
        type: LOAD_COMMENT_REQUEST,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_COMMENT_FAILURE,
        payload: err
      }))

export const getCommentsByUserTest =
  userTestId =>
    dispatch => {
      dispatch(LOAD_COMMENTS_REQUEST)
      return axios.get(APIROUTES.commentByUserTest(userTestId))
    }.then( res => res.data )
      .then( resData => dispatch({
        type: LOAD_COMMENTS_REQUEST,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_COMMENTS_FAILURE,
        payload: err
      }))

export const postComment =
  comment =>
    (dispatch, getState) =>{
      dispatch(CREATE_COMMENT_REQUEST)
      return axios.post(APIROUTES.comment, comment)
        }.then(res => res.data)
          .then(resData => dispatch({
            type: CREATE_COMMENT_SUCCESS,
            payload: resData
          }))
          .catch( err => dispatch({
            type: CREATE_COMMENT_FAILURE,
            payload: err
          }))


export const postCommentByUserTest =
  (comment, userTestId) =>
    (dispath, getState) =>{
      dispatch(CREATE_COMMENT_REQUEST)
      return axios.post(APIROUTES.commentByUserTest(userTestId), comment)
        }.then( res => res.data)
          .then(resData => dispatch({
            type: CREATE_COMMENT_SUCCESS
            payload: resData
          }))
          .catch( err => dispatch({
            type: CREATE_COMMENT_FAILURE,
            payloard: err
          }))

export const updateComment =
  (comment, commentId) =>
    (dispatch, getState) =>{
      dispatch(UPDATE_COMMENT_REQUEST)
      return axios.put(APIROUTES.commentById(commentId), comment)
        }.then(res => res.data)
          .then(resData => dispatch({
            type: UPDATE_COMMENT_SUCCESS,
            payload: resData
          }))
          .catch( err => dispatch({
            type: UPDATE_COMMENT_FAILURE,
            payload: err
          }))

export const deleteComment =
  commentId =>
    (dispatch, getState) =>{
      dispatch(DELETE_COMMENT_REQUEST)
      return axios.delete(APIROUTES.commentById(commentId), comment)
        }.then(res => res.data)
          .then(resData => dispatch({
            type: DELETE_COMMENT_SUCCESS,
            payload: resData
          }))
          .catch( err => dispatch({
            type: DELETE_COMMENT_FAILURE,
            payload: err
          }))
