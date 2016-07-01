'use strict';
var router = require('express').Router();
var _ = require('lodash');

const sequelizeHandlers = require( 'sequelize-handlers' );
const bluebird = require( 'bluebird' );
const utils = require('../../../utils');
const {ensureAuthenticated, ensureIsAdmin, Credentials, respondWith404, _err, db} = utils;
const Assessment = db().models.assessment;
const Team = db().models.team
const Resource = Assessment;

/** see documentation at https://www.npmjs.com/package/sequelize-handlers */

router.get(   '/',  sequelizeHandlers.query(Resource));
router.get(   '/:id', ensureAuthenticated, sequelizeHandlers.get(Resource));
router.post(  '/',  ensureAuthenticated, (req, res, next) => {
  console.log(req.body)
  next()
})
router.put(   '/:id', ensureAuthenticated, sequelizeHandlers.update(Resource));
router.delete('/:id',  ensureAuthenticated,     sequelizeHandlers.remove(Resource));


respondWith404(router);

module.exports = router;
