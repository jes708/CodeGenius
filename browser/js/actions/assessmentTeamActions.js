'use strict'

import axios from 'axios'

export const LOAD_TEAM_REQUEST = 'LOAD_TEAM_REQUEST'
export const LOAD_TEAM_SUCCESS = 'LOAD_TEAM_SUCCESS'
export const LOAD_TEAM_FAILURE = 'LOAD_TEAM_FAILURE'

const API_URL = '/api/v1/teams/';

export function getAssessmentTeam (id) {
  return dispatch => {
    dispatch({ type: LOAD_TEAM_REQUEST })
    return axios.get(API_URL + id)
    .then(res => res.data)
    .then(resData => {
      console.log('resData', resData);
      dispatch({ type: LOAD_TEAM_SUCCESS, team: resData });
    })
    .catch(err => dispatch({ type: LOAD_TEAM_FAILURE, err }))
  }
}
