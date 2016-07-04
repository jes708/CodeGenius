'use strict';
var router = require( 'express' )
  .Router();
var _ = require( 'lodash' );

const github = require('../../../../configure/github')
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
  organization: Organization,
  assessment: Assessment
} = models;
const Resource = User;

router.use( ( req, res, next ) => {
  req.options = {
    include: [
      Team, Organization
    ],
    attributes: {
      exclude: [
        'email', 'password', 'salt'
      ]
    }
  }
  next();
} )

/** see documentation at https://www.npmjs.com/package/sequelize-handlers */
router.get('/getRepos', (req, res, next) => {
  github.authenticate({
    type: 'oauth',
    token: req.user.github_token
  })
  github.repos.getAll({}, function(err, response) {
    if (err) return
    res.json(response)
  })
})

router.get('/assessments', ensureAuthenticated, (req, res, next) => {
  Assessment.findAll({
    where: {
      instructorId: req.user.id
    },
    include: [{ model: Team }]
  })
  .then(assessments => res.json(assessments))
  .catch(next)
})


router.get( '/', sequelizeHandlers.query( Resource ) );
router.get( '/:id', ( req, res, next ) => {
  if ( req.user && req.user.id === req.params.id ) {
    req.options.attributes.exclude = [ 'salt' ];
    next()
  }
}, sequelizeHandlers.get( Resource ) );
router.post( '/', ensureAuthenticated, sequelizeHandlers.create( Resource ) );
router.put( '/:id', ensureAuthenticated, sequelizeHandlers.update( Resource ) );
router.delete( '/:id', ensureAuthenticated, sequelizeHandlers.remove( Resource ) );


router.get('/:id/assessments', ensureAuthenticated, (req, res, next) => {
  Assessment.findAll({
    where: {
      instructorId: req.params.id
    }
  })
  .then(assessments => res.json(assessments))
  .catch(next)
})


respondWith404( router );

module.exports = router;
