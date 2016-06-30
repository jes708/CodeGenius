'use strict'

import GitHub from '../../../../configure/github'
import express from 'express'
import { ensureAuthenticated } from '../../../utils'
import Promise from 'bluebird'

const router = express.Router()

router.get('/:org', ensureAuthenticated, (req, res, next) => {
  GitHub.orgs.getAsync({ org: req.params.org })
  .then(org => res.json(org))
  .catch(next)
})

router.get('/:org/teams', ensureAuthenticated, (req, res, next) => {
  GitHub.orgs.getTeamsAsync({ org: req.params.org })
  .then(teams => res.json(teams))
  .catch(next)
})

router.get('/:teamId/members', ensureAuthenticated, (req, res, next) => {
  GitHub.orgs.getTeamMembersAsync({ id: req.params.teamId })
  .then(members => res.json(members))
  .catch(next)
})

router.get('/:user/:repo/contents/', ensureAuthenticated, (req, res, next) => {
  GitHub.repos.getContentAsync({
    user: req.params.user,
    repo: req.params.repo,
    path: req.query.path
  })
  .then(resData => {
    res.json(Buffer.from(resData.content, 'base64').toString('utf8'))
  })
  .catch(next)
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
