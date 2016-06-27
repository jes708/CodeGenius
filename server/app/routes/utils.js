'use strict';

//exports
module.exports = {
  appPath,
  dbPath,
  bindRouterToUse,
  bluebirdForTests,
  createAdminUser,
  createAgent,
  createGuest,
  createLocalUser,
  Credentials,
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
  respondWith404,
  // responder,
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
global.paths = {routerUtils: joinRootPath( './server/app/routes/utils.js')}

function addUser( credentials ) {

  // console.log(credentials);
  return getModel('user').create( credentials )
  .then( result => {

  })
  .catch( err => console.log('oh no there was an error here!', err))
}

function bindRouterToUse(router){
  return function routerUse(route, path){
    return router.use( route, require(path) )
  }
}

function bluebirdForTests() {

  const Bluebird = require( 'bluebird' );
  return Bluebird;
}

function createAdminUser( userInfo ) {
  userInfo.isAdmin = true;
  return createLocalUser( userInfo )
}

function createAgent( app = getApp() ) {

  return supertest().agent( app );
}

function createGuest() {
  return createAgent();
}

function createLocalUser( userInfo ) {

  return addUser(userInfo).then( ()=> {

    return createAgent()})
}

function Credentials( username, password, email ) {
  return {
    username,
    password,
    email
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

function getApp() {

  let theDb = db();
  let app = require( appPath )(theDb)
  return app;
}

function getUserModel(){
  return require('./../../db/models/user')
}

function getModel( model ) {

  const _db = db();
  // console.dir(_db.models.user);
  return _db.models[model];
}

function getModels( models ) {
  return models.map( model => getModel( model ) )
}

function joinRootPath( targetPath ) {
  return path.join( './../../../', targetPath )
}

function logInAgent( agent, userInfo ) {
  return agent
    .post( '/login' )
    .send( userInfo );
}

function logOutAgent( agent ) {
  return agent.post( '/logout' )
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

function Sequelize() {
  return require( 'sequelize' )
}

function should() {
  return require( 'chai' )
    .should()
}

function supertest() {

  return require( 'supertest-as-promised' )( bluebirdForTests().Promise )
}

function syncDb(force = false) {
  return db().sync( {force} );
}
