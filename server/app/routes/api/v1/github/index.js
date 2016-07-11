'use strict'

import GitHub from '../../../../configure/github'
import express from 'express'
import { ensureAuthenticated } from '../../../utils'
import Promise from 'bluebird'

const router = express.Router()

router.get('/compare_repo_files', ensureAuthenticated, (req, res) => {
  const baseRepoSplit = req.query.baseRepo.split('/')
  const solutionRepoSplit = req.query.solutionRepo.split('/')

  Promise.all([
    GitHub.repos.getCommitsAsync({
      user: baseRepoSplit[0],
      repo: baseRepoSplit[1]
    }),
    GitHub.repos.getCommitsAsync({
      user: solutionRepoSplit[0],
      repo: solutionRepoSplit[1]
    })
  ])
  .spread((baseCommits, solutionCommits) => {
    return GitHub.repos.compareCommitsAsync({
      user: solutionRepoSplit[0],
      repo: solutionRepoSplit[1],
      base: baseCommits[0].sha,
      head: solutionCommits[0].sha
    })
  })
  .then(diff => res.json(diff.files))
  .catch(err => res.sendStatus(err.code))
})

router.get('/rate_limit', ensureAuthenticated, (req, res) => {
  GitHub.misc.getRateLimitAsync()
  .then(limit => res.json(limit))
  .catch(err => res.sendStatus(err.code))
})

router.get('/orgs', ensureAuthenticated, (req, res) => {
  GitHub.users.getOrgsAsync({ per_page: 100 })
  .then(userOrgs => res.json(userOrgs))
  .catch(err => res.sendStatus(err.code))
})

router.get('/adminOrgs', ensureAuthenticated, (req, res) => {
  GitHub.orgs.getOrganizationMembershipsAsync({ state: 'active' })
  .then(userOrgs => {
    const adminOrgs = userOrgs.filter(userOrg => userOrg.role === 'admin')
    res.json(adminOrgs.map(adminOrg => adminOrg.organization))
  })
  .catch(err => res.sendStatus(err.code))
})

router.get('/:org', ensureAuthenticated, (req, res) => {
  GitHub.orgs.getAsync({ org: req.params.org })
  .then(org => res.json(org))
  .catch(err => res.sendStatus(err.code))
})

router.get('/:org/teams', ensureAuthenticated, (req, res) => {
  GitHub.orgs.getTeamsAsync({ org: req.params.org })
  .then(teams => res.json(teams))
  .catch(err => res.sendStatus(err.code))
})

router.get('/:org/repos', ensureAuthenticated, (req, res) => {
  GitHub.repos.getForOrgAsync({ org: req.params.org})
  .then(repos => res.json(repos))
  .catch(err => res.sendStatus(err.code))
})

router.get('/:teamId/members', ensureAuthenticated, (req, res) => {
  GitHub.orgs.getTeamMembersAsync({ id: req.params.teamId })
  .then(members => res.json(members))
  .catch(err => res.sendStatus(err.code))
})

router.get('/:user/:repo', ensureAuthenticated, (req, res) => {
  GitHub.repos.getAsync({
    user: req.params.user,
    repo: req.params.repo
  })
  .then(resData => res.json(resData))
  .catch(err => res.sendStatus(err.code))
})

router.get('/:user/:repo/compare_files/', ensureAuthenticated, (req, res, next) => {
  GitHub.repos.compareCommitsAsync({
    user: req.params.user,
    repo: req.params.repo,
    base: req.query.base || 'master',
    head: req.query.head
  })
  .then(result => res.json(result.files))
  .catch(next)
})

router.get('/:user/:repo/contents/', ensureAuthenticated, (req, res) => {
  GitHub.repos.getContentAsync({
    user: req.params.user,
    repo: req.params.repo,
    path: req.query.path || ''
  })
  .then(resData => {
    if (!resData.content) {
      res.status(404).send('There was an error')
    } else {
      res.json(Buffer.from(resData.content, 'base64').toString('utf8'))
    }
  })
  .catch(err => res.sendStatus(err.code))
})

router.get('/:user/:repo/:teamId/forks', ensureAuthenticated, (req, res, next) => {
  Promise.all([
    GitHub.repos.getForksAsync({
      user: req.params.user,
      repo: req.params.repo
    }),
    GitHub.orgs.getTeamMembersAsync({ id: req.params.teamId })
  ])
  .spread((forks, members) => {
    let memberLogins = members.map(member => member.login)
    res.json(forks.filter(fork => memberLogins.includes(fork.owner.login)))
  })
  .catch(next)
})

module.exports = router
