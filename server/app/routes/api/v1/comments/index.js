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
const Resource = Comment;

/** see documentation at https://www.npmjs.com/package/sequelize-handlers */

router.use( (req, res, next) => {
  req.options = {
    include: [
      {model: Annotation},
      {model: Tag}
    ]
  }
  next();
})

router.get( '/', sequelizeHandlers.query( Resource ) );
router.get( '/:id', ensureAuthenticated, sequelizeHandlers.get( Resource ) );
router.post( '/', ensureAuthenticated, sequelizeHandlers.create( Resource ) );
router.put( '/:id', ensureAuthenticated, sequelizeHandlers.update( Resource ) );
router.delete( '/:id', ensureAuthenticated, sequelizeHandlers.remove( Resource ) );

router.post( '/:id/annotation', ( req, res, next ) => {
  User.findById(req.user.id).then( user => {
    return Comment.findById(req.params.id).then( comment => {
      return Annotation.findAll({where: {commentId: comment.id}}).then( annotations => {
        return annotations.forEach( annotation => annotation.setComment(null) )
      }).then( ()=> {
        return user.createAnnotation(req.body).then( annotation =>{
          return annotation.setComment( comment.id );
        })
      })
    })
  }).then( annotation => res.status(201).send(annotation) )
    .then( ()=> next()).catch(next);

} )

router.get('/:commentId/tags', (req, res, next) => {
  console.log(req.params.id, req.params.commentId);
  Comment.findById(req.params.commentId)
         .then( comment => {
      console.log(comment);
      return comment.getTags()} )
      .then( tags => res.status(200).send( tags ) )
      .catch(next);
})

router.post('/:commentId/tags', (req, res, next) => {
  console.log(req.params.id, req.params.commentId);
  Comment.findById(req.params.commentId).then( comment => {
      if(!comment) throw 'no student test'
      return comment.createTag(req.body)} )
      .then( tag => res.status(201).send( tag ) )
      .catch(next);
})


  // Comment.findById( req.params.id ).then( comment => {
  //   console.log(comment);
  //   return comment.createAnnotation( req.body ).then( annotation => res.status( 201 ).send( annotation ) )
  //   .then( () => next() )
  //   .catch( err => next( err ) )

respondWith404( router );

module.exports = router;
