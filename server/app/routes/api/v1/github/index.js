'use strict'

import GitHub from '../../../../configure/github'
import express from 'express'
import { ensureAuthenticated } from '../../../utils'

const router = express.Router()

router.get('/:org', ensureAuthenticated, (req, res, next) => {
  GitHub.orgs.getAsync({ org: req.params.org })
  .then(org => res.json(org))
  .catch(next)
})

router.get('/:org/:team', ensureAuthenticated, (req, res, next) => {
})

module.exports = router
