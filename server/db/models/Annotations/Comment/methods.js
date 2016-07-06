'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** comment methods */
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
  const Comment = db.models['comment'];
  const User = db.models['user'];
  const Annotation = db.models['annotation'];
  // const Location = db.models['location'];

  Comment.belongsTo(User, {as: 'creator'})
  Comment.hasOne(Annotation);
  // Comment.belongsTo(Location)
}
