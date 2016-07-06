'use strict';

import axios from 'axios';
import APIROUTES from '../../utils/apiRoutes'
import {cloneDeep as _cloneDeep} from 'lodash';
import {getXPath} from 'xpath-dom';
import {finishAnnotation} from './actions'

export const LOAD_ANNOTATIONS_REQUEST = 'LOAD_ANNOTATIONS_REQUEST'
export const LOAD_ANNOTATIONS_SUCCESS = 'LOAD_ANNOTATIONS_SUCCESS'
export const LOAD_ANNOTATIONS_FAILURE = 'LOAD_ANNOTATIONS_FAILURE'
export const CREATE_ANNOTATION_REQUEST = 'CREATE_ANNOTATION_REQUEST'
export const CREATE_ANNOTATION_SUCCESS = 'CREATE_ANNOTATION_SUCCESS'
export const CREATE_ANNOTATION_FAILURE = 'CREATE_ANNOTATION_FAILURE'
export const LOAD_ANNOTATION_REQUEST = 'LOAD_ANNOTATION_REQUEST'
export const LOAD_ANNOTATION_SUCCESS = 'LOAD_ANNOTATION_SUCCESS'
export const LOAD_ANNOTATION_FAILURE = 'LOAD_ANNOTATION_FAILURE'
export const UPDATE_ANNOTATION_REQUEST = 'UPDATE_ANNOTATION_REQUEST'
export const UPDATE_ANNOTATION_SUCCESS = 'UPDATE_ANNOTATION_SUCCESS'
export const UPDATE_ANNOTATION_FAILURE = 'UPDATE_ANNOTATION_FAILURE'


export const getUserAnnotations =
  userId =>
    dispatch => {
      dispatch(LOAD_ANNOTATIONS_REQUEST)
      return axios.get(APIROUTES.annotationsByUserId(userId))
      .then( res => res.data  )
      .then( resData => dispatch({
        type: LOAD_ANNOTATIONS_SUCCESS,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_ANNOTATIONS_FAILURE,
        payload: err
      })) }

export const getAnnotationById =
  annotationId =>
    dispatch => {
      dispatch(LOAD_ANNOTATION_REQUEST)
      return axios.get(APIROUTES.annotationById(annotationId))
    .then( res => res.data )
      .then( resData => dispatch({
        type: LOAD_ANNOTATION_REQUEST,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_ANNOTATION_FAILURE,
        payload: err
      }))}

export const getAnnotationsByUserTest =
  userTestId =>
    dispatch => {
      dispatch(LOAD_ANNOTATIONS_REQUEST)
      return axios.get(APIROUTES.annotationsByUserTest(userTestId))
    .then( res => res.data )
      .then( resData => dispatch({
        type: LOAD_ANNOTATIONS_REQUEST,
        payload: resData
      }))
      .catch( err => dispatch({
        type: LOAD_ANNOTATIONS_FAILURE,
        payload: err
      }))}

export const postAnnotation =
  (annotation, commentId) =>
    (dispatch, getState) => {
      let selection = annotation.selection;
      let payload = {
        route: APIROUTES.annotation,
        anchorNode: getXPath(selection.anchorNode),
        anchorOffset: selection.anchorOffset,
        focusNode: getXPath(selection.focusNode),
        focusOffset: selection.focusOffset,
        rangeCount: selection.rangeCount,
        selectionString: selection.toString(),
        color: annotation.color,
        location: annotation.location
      }
      dispatch({
        type: CREATE_ANNOTATION_REQUEST,
        payload
      })
      return axios.post(APIROUTES.annotationByCommentId(commentId), payload)
        .then(res => res.data)
          .then(resData => {
            dispatch({
            type: CREATE_ANNOTATION_SUCCESS,
            payload: resData
          })
          payload.selection = annotation.selection;
          payload.resData = resData;
          return dispatch(finishAnnotation(payload))
        }
        )
          .catch( err => dispatch({
            type: CREATE_ANNOTATION_FAILURE,
            payload: err
          }))}


export const postAnnotationByUserTest =
  (annotation, userTestId) =>
    (dispath, getState) =>{
      dispatch(CREATE_ANNOTATION_REQUEST)
      return axios.post(APIROUTES.annotationsByUserTest(userTestId), annotation)
        .then( res => res.data)
          .then(resData => dispatch({
            type: CREATE_ANNOTATION_SUCCESS,
            payload: resData
          }))
          .catch( err => dispatch({
            type: CREATE_ANNOTATION_FAILURE,
            payloard: err
          }))}

export const updateAnnotation =
  (annotation, annotationId) =>
    (dispatch, getState) =>{
      dispatch(UPDATE_ANNOTATION_REQUEST)
      return axios.put(APIROUTES.annotationById(annotationId), annotation)
        .then(res => res.data)
          .then(resData => dispatch({
            type: UPDATE_ANNOTATION_SUCCESS,
            payload: resData
          }))
          .catch( err => dispatch({
            type: UPDATE_ANNOTATION_FAILURE,
            payload: err
          }))}

export const deleteAnnotation =
  annotationId =>
    (dispatch, getState) =>{
      dispatch(DELETE_ANNOTATION_REQUEST)
      return axios.delete(APIROUTES.annotationById(annotationId), annotation)
        .then(res => res.data)
          .then(resData => dispatch({
            type: DELETE_ANNOTATION_SUCCESS,
            payload: resData
          }))
          .catch( err => dispatch({
            type: DELETE_ANNOTATION_FAILURE,
            payload: err
          }))}
