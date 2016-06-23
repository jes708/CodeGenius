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


var Response = db.model('response');

describe('Response', function(){
  beforeEach('Sync DB', SyncDB.bind(this, db));
  it('exists', exists.bind(this, Response))
  it( 'can access class methods', classTest.bind(this, Response))
  it( 'can access instance methods', instanceTest.bind(this, Response))

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
    it('response hash')
    it('sha hash of document')
  })
  it( 'has a unique id field' )
  it( 'belongs to many annotations')
})
