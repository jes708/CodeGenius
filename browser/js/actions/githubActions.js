'use strict'

import axios from 'axios'

export const FETCH_REPO_REQUEST = 'FETCH_REPO_REQUEST'
export const FETCH_REPO_SUCCESS = 'FETCH_REPO_SUCCESS'
export const FETCH_REPO_FAILURE = 'FETCH_REPO_FAILURE'
export const FETCH_ORGS_REQUEST = 'FETCH_ORGS_REQUEST'
export const FETCH_ORGS_SUCCESS = 'FETCH_ORGS_SUCCESS'
export const FETCH_ORGS_FAILURE = 'FETCH_ORGS_FAILURE'
export const FETCH_ORG_TEAMS_REQUEST = 'FETCH_ORG_TEAMS_REQUEST'
export const FETCH_ORG_TEAMS_SUCCESS = 'FETCH_ORG_TEAMS_SUCCESS'
export const FETCH_ORG_TEAMS_FAILURE = 'FETCH_ORG_TEAMS_FAILURE'
export const CHECK_REPO_PATH_REQUEST = 'CHECK_REPO_PATH_REQUEST'
export const CHECK_REPO_PATH_SUCCESS = 'CHECK_REPO_PATH_SUCCESS'
export const CHECK_REPO_PATH_FAILURE = 'CHECK_REPO_PATH_FAILURE'
export const FETCH_ORGREPO_REQUEST = 'FETCH_ORGREPO_REQUEST'
export const FETCH_ORGREPO_SUCCESS = 'FETCH_ORGREPO_SUCCESS'
export const FETCH_ORGREPO_FAILURE = 'FETCH_ORGREPO_FAILURE'
export const FETCH_FILE_DIFF_REQUEST = 'FETCH_FILE_DIFF_REQUEST'
export const FETCH_FILE_DIFF_SUCCESS = 'FETCH_FILE_DIFF_SUCCESS'
export const FETCH_FILE_DIFF_FAILURE = 'FETCH_FILE_DIFF_FAILURE'

const API_GITHUB_URL = '/api/v1/github'

export const getRepoContents = (user, repo, path) => (dispatch) => {
  const formattedPath = path.charAt(0) === '/' ? path.substr(1) : path

  dispatch({ type: FETCH_REPO_REQUEST })

  return axios.get(`${API_GITHUB_URL}/${user}/${repo}/contents?path=${path}`)
  .then(res => res.data)
  .then(resData => dispatch({
    type: FETCH_REPO_SUCCESS,
    repoUrl: `/${user}/${repo}`,
    path: `${user}/${repo}/${formattedPath}`,
    contents: resData
  }))
  .catch(error => dispatch({ type: FETCH_REPO_FAILURE, error }))
}

export const getSolutionFileDiff = (baseRepo, solutionRepo) => (dispatch) => {
  dispatch({ type: FETCH_FILE_DIFF_REQUEST })

  return axios.get(`${API_GITHUB_URL}/compare_repo_files?baseRepo=${baseRepo}&solutionRepo=${solutionRepo}`)
  .then(res => res.data)
  .then(resData => dispatch({ type: FETCH_FILE_DIFF_SUCCESS, files: resData }))
  .catch(error => dispatch({ type: FETCH_FILE_DIFF_FAILURE, error }))
}

export const getUserOrgs = () => (dispatch) => {
  dispatch({ type: FETCH_ORGS_REQUEST })

  return axios.get(`${API_GITHUB_URL}/adminOrgs`)
  .then(res => res.data)
  .then(resData => dispatch({
    type: FETCH_ORGS_SUCCESS,
    orgs: resData
  }))
  .catch(error => dispatch({ type: FETCH_ORGS_FAILURE, error }))
}

export const getOrgTeams = (org) => (dispatch) => {
  dispatch({ type: FETCH_ORG_TEAMS_REQUEST })

  return axios.get(`${API_GITHUB_URL}/${org}/teams`)
  .then(res => res.data)
  .then(resData => dispatch({
    type: FETCH_ORG_TEAMS_SUCCESS,
    teams: resData
  }))
  .catch(error => dispatch({ type: FETCH_ORG_TEAMS_FAILURE, error }))
}

export const getOrgRepo = (org) => (dispatch) => {
  dispatch({ type: FETCH_ORGREPO_REQUEST })

  return axios.get(`${API_GITHUB_URL}/${org}/repos`)
  .then(res => res.data)
  .then(resData => dispatch({
    type: FETCH_ORGREPO_SUCCESS,
    orgrepo: resData
  }))
  .catch(error => dispatch({ type: FETCH_ORGREPO_FAILURE, error}))
}
