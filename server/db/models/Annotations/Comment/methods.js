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
  const StudentTest = db.models['studentTest'];
  const Tag = db.models['tag'];
  // const Location = db.models['location'];

  Comment.belongsTo(User, {as: 'creator'});
  Comment.belongsTo(StudentTest);
  Comment.hasOne(Annotation);
  Comment.addScope('defaultScope', {
    include: [
      { model: Annotation },
      { model: Tag }
    ]
  }, { override: true })
  // Comment.belongsTo(Location)
}
