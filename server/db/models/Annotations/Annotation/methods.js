'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** annotation methods */
module.exports = {
  class: function(db){
    return {
      addAssociations
    };
  },
  instance: function(db){
    return {};
  }
}

function addAssociations(db){
  const Annotation = db.models['annotation'];
  const Comment = db.models['comment'];
  const User = db.models['user'];
  // const Location = db.models['location'];

  Annotation.belongsTo(User, {as: 'creator'})
  Annotation.belongsTo(Comment);
}
