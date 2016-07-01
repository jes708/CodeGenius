'use strict'

import axios from 'axios'

export const FETCH_REPO_REQUEST = 'FETCH_REPO_REQUEST'
export const FETCH_REPO_SUCCESS = 'FETCH_REPO_SUCCESS'
export const FETCH_REPO_FAILURE = 'FETCH_REPO_FAILURE'

const API_URL = '/api/v1'

export const getRepoContents = (user, repo, path) => (dispatch) => {
  dispatch({ type: FETCH_REPO_REQUEST })

  return axios.get(`${API_URL}/${user}/${repo}?path=${path}`)
  .then(res => res.data)
  .then(resData => dispatch({
    type: FETCH_REPO_SUCCESS,
    contents: resData
  }))
  .catch(error => dispatch({ type: FETCH_REPO_FAILURE, error }))
}
