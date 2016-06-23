'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Location methods */
module.exports = {
  class(db){
    return {
      test,
      addAssociations: addAssociations.bind(this, db)
    };
  },
  instance(db){
    return {
      test
    };
  }
}

function test(){
  return true
}

function addAssociations(db){
  const Annotation = db.models['annotation'];
  const Location = db.models['location'];
  const User = db.models['user'];


}
