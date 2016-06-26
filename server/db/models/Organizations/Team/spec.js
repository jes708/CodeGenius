var sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
var should = chai.should();

var Sequelize = require('sequelize');
var db = require('../../../_db');

require('./index.js')(db);
var sharedTests = require('../../sharedTests.js');

var Team = db.model('team');

describe('Team', function(){
  beforeEach('Sync DB', sharedTests.SyncDB.bind(this, db));
  it('exists', sharedTests.exists.bind(this, Team))
  it( 'can access class methods', sharedTests.classTest.bind(this, Team))
  it( 'can access instance methods', sharedTests.instanceTest.bind(this, Team))
})