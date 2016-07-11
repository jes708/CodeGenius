'use strict';
var router = require( 'express' ).Router();
var _ = require( 'lodash' );

const sequelizeHandlers = require( 'sequelize-handlers' );
const bluebird = require( 'bluebird' );
const utils = require( '../../../utils' );
const { ensureAuthenticated, ensureIsAdmin, Credentials, respondWith404, _err, db } = utils;
const Comment = db().models.comment;
const Annotation = db().models.annotation;
const Tag = db().models.tag;
const User = db().models.user;
const Resource = Tag;

/** see documentation at https://www.npmjs.com/package/sequelize-handlers */

router.use( (req, res, next) => {
  req.options = {
    include: [
      {model: Comment}
    ]
  }
  next();
})

router.get( '/', sequelizeHandlers.query( Resource ) );
router.get( '/:id', ensureAuthenticated, sequelizeHandlers.get( Resource ) );
router.post( '/', ensureAuthenticated, sequelizeHandlers.create( Resource ) );
router.put( '/:id', ensureAuthenticated, sequelizeHandlers.update( Resource ) );
router.delete( '/:id', ensureAuthenticated, sequelizeHandlers.remove( Resource ) );

respondWith404( router );

module.exports = router;
