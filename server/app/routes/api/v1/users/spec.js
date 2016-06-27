'use strict';
/**
 * spec file for User API routes.
 */

//dependencies
const {forceSyncDb, Credentials, createLocalUser, createAgent, should, generateUsers} = require( './../../../utils' );
const {fakeApp, fakeServer, serverPromise} = require( './../../../testUtils.js');
const sequelizeHandlers = require( 'sequelize-handlers' );
const bluebird = require( 'bluebird' );
const http = bluebird.promisifyAll( require( 'http' ) );
const db = require('../../../../../db');

//bindings
should();

//tests
describe('sequelize handlers', function(){
  let User, app, Jason, Jansen, John, Jon, testApp, testRouter;
  beforeEach('sync the db', function(){
    User = db.models['user'];
    [John, Jason, Jansen, Jon] = generateUsers(['John', 'Jason', 'Jansen', 'Jon']);
    testApp = fakeApp();
    testRouter = require( 'express' )
      .Router();
    return [serverPromise( testApp, 2950 ), forceSyncDb()]
  })
  it('should take fetch from the sequelize model', function(){
    let testAgent = createAgent( testApp );
    testApp.get('/users/:id', sequelizeHandlers.get(User))
    return testAgent
      .get('/users/1')
      .then( response => response.body.username.should.equal( 'John' ) )
  })
})
