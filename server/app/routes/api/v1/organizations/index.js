'use strict';
var router = require( 'express' )
  .Router();
var _ = require( 'lodash' );

const sequelizeHandlers = require( 'sequelize-handlers' );
const bluebird = require( 'bluebird' );
const utils = require( '../../../utils' );
const {
  ensureAuthenticated,
  ensureIsAdmin,
  Credentials,
  respondWith404,
  _err,
  db
} = utils;
const models = db()
  .models;
const {
  user: User,
  team: Team,
  organization: Organization
} = models;
const Resource = Organization;


/** see documentation at https://www.npmjs.com/package/sequelize-handlers */
router.get( '/', sequelizeHandlers.query( Resource ) );
router.get( '/:id', sequelizeHandlers.get( Resource ) );
router.post( '/', ensureAuthenticated, sequelizeHandlers.create( Resource ) );
router.put( '/:id', ensureAuthenticated, sequelizeHandlers.update( Resource ) );
router.delete( '/:id', ensureAuthenticated, sequelizeHandlers.remove( Resource ) );


respondWith404( router );

module.exports = router;
