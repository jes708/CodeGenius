'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Rubric methods */
module.exports = {
  class: function(db){
    return {};
  },
  instance: function(db){
    return {};
  }
}

function addAssociations(db){
  const StudentTest = db.models['studentTest'];
  const Assessment = db.models['assessment'];
  const User = db.models['user'];

  StudentTest.belongsTo(Assessment);
  StudentTest.belongsTo(User);
}
