'use strict';
var router = require('express').Router();
var _ = require('lodash');

const sequelizeHandlers = require( 'sequelize-handlers' );
const bluebird = require( 'bluebird' );
const utils = require('../../../utils');
const {ensureAuthenticated, ensureIsAdmin, Credentials, respondWith404, _err, db} = utils;
const User = db().models.user;

/** see documentation at https://www.npmjs.com/package/sequelize-handlers */
router.get(   '/',  sequelizeHandlers.query(User));
router.get(   '/:id', ensureAuthenticated, sequelizeHandlers.get(User));
router.post(  '/',  ensureAuthenticated,     sequelizeHandlers.create(User));
router.put(   '/:id', ensureAuthenticated, sequelizeHandlers.update(User));
router.delete('/:id',  ensureAuthenticated,     sequelizeHandlers.remove(User));


respondWith404(router);

module.exports = router;
