'use strict';
var router = require('express').Router();
var _ = require('lodash');

const sequelizeHandlers = require( 'sequelize-handlers' );
const Promise = require( 'bluebird' );
const utils = require('../../../utils');
const {ensureAuthenticated, ensureIsAdmin, Credentials, respondWith404, _err, db} = utils;
const Assessment = db().models.assessment;
const Team = db().models.team
const StudentTest = db().models.studentTest
const Resource = Assessment;

import omit from 'lodash/object/omit'

/** see documentation at https://www.npmjs.com/package/sequelize-handlers */

router.get(   '/',  sequelizeHandlers.query(Resource));
router.get(   '/:id', ensureAuthenticated, sequelizeHandlers.get(Resource));
router.post(  '/',  ensureAuthenticated, (req, res, next) => {
  Promise.all([
    Team.findOrCreate({
      where: {
        github_team_id: req.body.teamId,
        name: req.body.teamName
      }
    }),
    Assessment.create(omit(req.body, ['teamName','teamId']))
  ])
  .spread((teams, assessment) => {
    const team = teams[0]
    return assessment.setTeam(team)
  })
  .then(assessment => res.json(assessment))
  .catch(next)
})
router.put(   '/:id', ensureAuthenticated, sequelizeHandlers.update(Resource));
router.delete('/:id',  ensureAuthenticated,     sequelizeHandlers.remove(Resource));


//studentTest Routes

router.get(   '/:id/students/:studentId', ensureAuthenticated, function(req, res, next) {
  StudentTest.findOne({
    where: {
      assessmentId: req.params.id,
      userId: req.params.studentId
    }
  }).then(test => res.json(test))
  .catch(next)
})

router.post(   '/:id/students/:studentId', ensureAuthenticated, function(req, res, next) {
  let credentials = Object.assign({}, req.body, {assessmentId: req.params.id, userId: req.params.studentId})
  StudentTest.create(credentials)
  .then(test => res.json(test))
  .catch(next)
})

router.put(   '/:id/students/:studentId', ensureAuthenticated, function(req, res, next) {
  StudentTest.update(
    req.body,
    {
      where: {
        assessmentId: req.params.id,
        userId: req.params.studentId      
      }
    }
  ).then(test => res.json(test))
  .catch(next)
})

respondWith404(router);

module.exports = router;
