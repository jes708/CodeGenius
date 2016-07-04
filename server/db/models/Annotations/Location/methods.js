'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** annotation methods */
module.exports = {
  class: function(db){
    return {};
  },
  instance: function(db){
    return {};
  }
}


function addAssociations(){
  const Annotation = db.models['annotation'];
  // Location.belongsTo(Annotation);
}
