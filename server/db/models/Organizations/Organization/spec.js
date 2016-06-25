var sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
var should = chai.should();

var Sequelize = require('sequelize');
var db = require('../../../_db');

require('./index.js')(db);
var sharedTests = require('../../sharedTests.js');

var Organization = db.model('organization');

describe('Organization', function(){
  beforeEach('Sync DB', sharedTests.SyncDB.bind(this, db));
  it('exists', sharedTests.exists.bind(this, Organization))
  it( 'can access class methods', sharedTests.classTest.bind(this, Organization))
  it( 'can access instance methods', sharedTests.instanceTest.bind(this, Organization))
})
