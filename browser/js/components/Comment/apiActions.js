'use strict';

import axios from 'axios';
import APIROUTES from '../../utils/apiRoutes';

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
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'


export const getUserComments =
  userId =>
    dispatch => {
      dispatch({type: LOAD_COMMENTS_REQUEST});
      return axios.get(APIROUTES.commentsByUserId(userId))
    .then( res => res.data  )
      .then( resData => dispatch({
        type: LOAD_COMMENTS_SUCCESS,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_COMMENTS_FAILURE,
        payload: err
      }))
    }

export const getComments =
  () =>
    dispatch => {
      dispatch({type: LOAD_COMMENTS_REQUEST})
      return axios.get(APIROUTES.comments)
    .then( res => res.data )
      .then( resData => dispatch({
        type: LOAD_COMMENTS_SUCCESS,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_COMMENTS_FAILURE,
        payload: err
      }))}

export const getCommentById =
  commentId =>
    dispatch => {
      dispatch({type: LOAD_COMMENT_REQUEST})
      return axios.get(APIROUTES.commentById(commentId))
    .then( res => res.data )
      .then( resData => dispatch({
        type: LOAD_COMMENT_REQUEST,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_COMMENT_FAILURE,
        payload: err
      }))}

export const getCommentsByUserTest =
  userTestId =>
    dispatch => {
      dispatch({type: LOAD_COMMENTS_REQUEST})
      return axios.get(APIROUTES.commentByUserTest(userTestId))
    .then( res => res.data )
      .then( resData => dispatch({
        type: LOAD_COMMENTS_REQUEST,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_COMMENTS_FAILURE,
        payload: err
      }))}

export const getCommentsByStudentAndAssessment =
  (studentId, assessmentId) =>
    dispatch => {
      dispatch({type: LOAD_COMMENTS_REQUEST})
      return axios.get(APIROUTES.commentByAssessmentStudent(assessmentId, studentId))
    .then( res => res.data )
      .then( resData => dispatch({
        type: LOAD_COMMENTS_SUCCESS,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_COMMENTS_FAILURE,
        payload: err
      }))}

export const postComment =
  comment =>
    (dispatch, getState) =>{
      dispatch({type: CREATE_COMMENT_REQUEST})
      return axios.post(APIROUTES.comments, comment)
        .then(res => res.data)
          .then(resData => dispatch({
            type: CREATE_COMMENT_SUCCESS,
            payload: resData
          }))
          .catch( err => dispatch({
            type: CREATE_COMMENT_FAILURE,
            payload: err
          }))}

export const postCommentByStudentAndAssessment =
  (studentId, assessmentId, comment) =>
  (dispatch, getState) =>{
    dispatch({type: CREATE_COMMENT_REQUEST})
    return axios.post(APIROUTES.commentByAssessmentStudent(assessmentId, studentId), comment)
      .then(res => res.data)
        .then(resData => dispatch({
          type: CREATE_COMMENT_SUCCESS,
          payload: resData
        }))
        .catch( err => dispatch({
          type: CREATE_COMMENT_FAILURE,
          payload: err
        }))}

export const postCommentByUserTest =
  (comment, userTestId) =>
    (dispatch, getState) =>{
      dispatch({type: CREATE_COMMENT_REQUEST})
      return axios.post(APIROUTES.commentByUserTest(userTestId), comment)
        .then( res => res.data)
          .then(resData => dispatch({
            type: CREATE_COMMENT_SUCCESS,
            payload: resData
          }))
          .catch( err => dispatch({
            type: CREATE_COMMENT_FAILURE,
            payloard: err
          }))}

export const updateComment =
  (comment, commentId) =>
    (dispatch, getState) =>{
      dispatch({type: UPDATE_COMMENT_REQUEST})
      return axios.put(APIROUTES.commentById(commentId), comment)
        .then(res => res.data)
          .then(resData => dispatch({
            type: UPDATE_COMMENT_SUCCESS,
            payload: resData
          }))
          .catch( err => dispatch({
            type: UPDATE_COMMENT_FAILURE,
            payload: err
          }))}

export const deleteComment =
  (commentId, studentId, assessmentId) =>
    (dispatch, getState) =>{
      dispatch({type: DELETE_COMMENT_REQUEST})
      return axios.delete(APIROUTES.commentById(commentId))
        .then(res => res.data)
          .then(resData => dispatch({
            type: DELETE_COMMENT_SUCCESS,
            payload: resData
          }))
          .then( ()=> dispatch(getCommentsByStudentAndAssessment(studentId, assessmentId)) )
          .catch( err => dispatch({
            type: DELETE_COMMENT_FAILURE,
            payload: err
          }))}
