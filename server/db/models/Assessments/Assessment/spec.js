var sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
var should = chai.should();

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

require('./index.js')(db);
require('../../sharedTests.js');

var Assessment = db.model('assessment');

describe('Assessment', function(){
  beforeEach('Sync DB', SyncDB.bind(this, db));
  it('exists', exists.bind(this, Assessment))
  it( 'can access class methods', classTest.bind(this, Assessment))
  it( 'can access instance methods', instanceTest.bind(this, Assessment))

  describe('fields', function(){
    it('title')
  })
  describe( 'assoctiations', function(){
    it( 'has many questions' )
    it( 'has one location as SolutionCode')
    it( 'has one User as Creator')
    it( 'has one Team')
    it( 'belongs to many location as student tests')
    it( 'has many labels' )
  })
})
