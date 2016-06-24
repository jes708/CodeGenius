'use strict';

//exports
module.exports = {
  appPath,
  dbPath,
  bluebirdForTests,
  createAdminUser,
  createGuest,
  createLocalUser,
  credentials,
  db,
  describeIt,
  ensureAuthenticated,
  _err,
  forceSyncDb,
  getApp,
  getModel,
  getModels,
  joinRootPath,
  logInAgent,
  logOutAgent,
  responder: responder,
  routerUse,
  Sequelize,
  should,
  supertest,
  syncDb
}



// dependencies
const path = require( 'path' );
const bluebird = bluebirdForTests();

//declarations
const appPath = joinRootPath( "./server/app" );
const dbPath = joinRootPath( "./server/db" );
global.paths = {routeUtils: joinRootPath( './server/app/routes/utils.js')}

function addUser( userInfo ) {
  return getModel('user')
  .findOrCreate( userInfo )
}

function bluebirdForTests() {
  const Bluebird = require( 'bluebird' );
  return Bluebird;
}

function createAgent( ) {
  return supertest().agent( getApp() )
}

function createAdminUser( userInfo ) {
  userInfo.isAdmin = true;
  return createLocalUser( userInfo )
}

function createGuest() {
  return createAgent();
}

function createLocalUser( userInfo ) {
  return bluebird.all( [addUser(userInfo), createAgent()])
    .spread( (userInstance, agent) => loginAgent( agent, userInfo, userInstance ) )
}

function credentials( username, password, isAdmin, options ) {
  return {
    username,
    password,
    isAdmin
  }
}

function db() {
  return require( dbPath )
}

function describeIt( describeStmt, itStmt, callback = function(){}, callWithDone ){
  return describe( describeStmt, function() {
    it( itStmt, callback( callWithDone ? done : undefined ) )
  })
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
}

function _err( err ) {
  return {
    err
  };
}

function forceSyncDb(){
  return syncDb(true);
}

function getModel( model ) {
  return db()
    .model( model );
}

function getModels( models ) {
  return models.map( model => getModel( model ) )
}

function getApp() {
  return require( appPath )( db() );
}

function joinRootPath( targetPath ) {
  return path.join( './../../', targetPath )
}

function logInAgent( agent, userInfo ) {
  return agent
    .post( '/login' )
    .send( userInfo );
}

function logOutAgent( agent ) {
  return agent.post( '/logout' )
}

function Sequelize() {
  return require( 'sequelize' )
}

function should() {
  return require( 'chai' )
    .should()
}

function supertest() {
  return require( 'supertest-as-promised' )( bluebirdForTests()
    .Promise )
}

function respondWith404(router){
  router.use(function (req, res) {
      res.status(404).end();
  });
}

class responder {
  constructor(router){
    this.router = router;
  }
  with404(){
    respondWith404(this.router);
  }
}

function routerUse(router){
  return function use(route, path){
    return router.use( route, require(path) )
  }
}

function syncDb(force = false) {
  return db().sync( {force} );
}
