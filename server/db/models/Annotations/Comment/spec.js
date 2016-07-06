var sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
var should = chai.should();

var Sequelize = require('sequelize');


var db = require('../../../_db')

require('./index.js')(db);
require('../../sharedTests.js')

var Annotation = db.model('annotation');

describe('Annotation', function(){
  beforeEach('Sync DB', function () {
     return db.sync({ force: true });
  });
  it('exists', function(){
    return Annotation.describe()
              .then( description =>
                description.should.be.an.object )
  })
  it( 'can access class methods', function(){
    return Annotation.test().should.be.true;
  })
  it( 'can access instance methods', function(){
    return Annotation.build().test().should.be.true;
  })

  it( 'belongs to user as creator')
  it( 'belongs to many locations')
})
