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
require('../../sharedTests.js')


var Question = db.model('question');

describe('Question', function(){
  beforeEach('Sync DB', SyncDB.bind(this, db));
  it('exists', exists.bind(this, Question))
  it( 'can access class methods', classTest.bind(this, Question))
  it( 'can access instance methods', instanceTest.bind(this, Question))

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
