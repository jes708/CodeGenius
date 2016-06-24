'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** annotation methods */
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