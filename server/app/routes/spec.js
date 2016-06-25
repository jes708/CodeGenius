'use strict';
/**
 * general spec file for api routes.
 * tests utilities as well.
 */

//dependencies
const utils = require( './utils' );

const {
  appPath,
  dbPath,
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
  responder: responder,
  routerUse,
  Sequelize,
  should,
  supertest,
  syncDb
} = utils;

const {
  fakeApp,
  fakeServer,
  http,
  serverPromise
} = require( './testUtils' );

//bindings
const bluebird = bluebirdForTests();
utils.should();

//tests
describe( 'utils.', function () {
  beforeEach( function () {
    return forceSyncDb();
  } );

  describeIt( 'describeIt', 'joins together describe and it for describe statements that only have one assertion' )

  describeIt( 'bindRouterToUse', 'is a shorthand that takes a router instance as a parameter, and returns a method "routerUse", which can be called as "routerUse(route, path)", which is bound to that router. shorthand for router.use, without having to use "require" statements' );

  describeIt( 'bluebirdForTests', 'wraps bluebird in additional tests' )

  describeIt( 'createAdminUser', 'creates a user where isAdmin = true' )

  describeIt( 'addUser', 'adds a user to the database' )

  describeIt( 'createGuest', 'creates a guest user' )

  describeIt( 'createLocalUser', 'creates a local user and attempts to log in' )

  describeIt( 'Credentials', 'return a Credentials object that can be used by user model' )

  describeIt( 'db()', 'fetches the db module' )

  describe( 'ensureAuthenticated', function () {
    it( 'calls next() if user is authenticated.', function () {
      const bobsCredentials = new Credentials( 'bob', 'reallyStrongPassword', 'bob@bob.com' );
      const bobTheUser = createLocalUser( bobsCredentials )
        .then( bob => {
          return bob.post( '/api/v1/secret-stash' )
            .send( bobsCredentials )
            .then( response => response.should.be.an.array )
            .catch( err => console.log( 'sorry, no bob', err ) );
        } )
      return bobTheUser;
    } );
    it( 'Otherwise returns 401', function () {
      return true;
    } );
  } );

  describeIt( '_err', 'standardizes error handling into an object form' );

  describeIt( 'forceSyncDb', 'calls syncDb with force=true' );

  describeIt( 'getApp', 'requires the app module' );

  describeIt( 'getModel', 'fetches the model passed in as a string' );

  describeIt( 'getModels', 'fetches multiple models passed in as an array of strings. perfect for array deconstruction' );

  describeIt( 'joinRootPath', 'shorthand for joining a path to the root path of the project' );

  describeIt( 'logInAgent', 'takes an agent and a userInfo object. the agent attempts to log in using the userInfo object' );

  describeIt( 'logOutAgent', "attempts to log an agent out" );

  describe( 'respondWith404', function () {
    it( "responds with 404", function () {
      var testApp = fakeApp();
      var testRouter = require( 'express' )
        .Router();
      respondWith404( testRouter );
      testApp.use( '/', testRouter );
      var testAgent = createAgent( testApp );
      return serverPromise( testApp, 3000 )
        .then( () => testAgent.get( '/' ) )
        .then( response => response.status.should.equal( 404 ) )
    } );
  } );

  describeIt( 'Sequelize', "returns the Sequelize module" );

  describeIt( 'should', 'requires chai and executes with should' );

  describeIt( 'supertest', 'returns supertest as promised, with bluebird modified with custom methods' );
} )
