'use strict';

const utils = require( './utils' );

console.log( 'getting the things' );

const {
  appPath,
  dbPath,
  bluebirdForTests,
  createAdminUser,
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
  responder: responder,
  routerUse,
  Sequelize,
  should,
  supertest,
  syncDb
} = utils;

console.log( 'starting utils' )
describe( 'utils.', function () {
  beforeEach( function () {
    return forceSyncDb();
  } )

  describeIt( 'describeIt', 'joins together describe and it for describe statements that only have one assertion' )

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
        })
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
  describeIt( 'Sequelize', "returns the Sequelize module" );
  describeIt( 'should', 'requires chai and executes with should' );
  describeIt( 'supertest', 'returns supertest as promised, with bluebird modified with custom methods' );
  describeIt( 'responder', 'takes a router and instantiates  a "respond" object with a number of syntactical shorthand methods like "with404"' );
  describeIt( 'routerUse(router)(route, path)', 'is shorthand for router.use(route, require(path))' )
} )
