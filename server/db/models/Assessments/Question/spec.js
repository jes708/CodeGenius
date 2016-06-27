var sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
var should = chai.should();

var Sequelize = require('sequelize');
var db = require('../../../_db');

require('./index.js')(db);
var sharedTests = require('../../sharedTests.js');

var Question = db.model('question');

describe('Question', function(){
  beforeEach('Sync DB', sharedTests.SyncDB.bind(this, db));
  it('exists', sharedTests.exists.bind(this, Question))
  it( 'can access class methods', sharedTests.classTest.bind(this, Question))
  it( 'can access instance methods', sharedTests.instanceTest.bind(this, Question))

  describe('fields', function(){
    it('url')
    it('line range')
    it('character range')
    it('filePath')
    describe('github', function(){
      it('repository')
      it('user')
      it('organization')
    })
    it('question hash')
    it('sha hash of document')
  })
  it( 'has a unique id field' )
  it( 'belongs to many annotations')
})
