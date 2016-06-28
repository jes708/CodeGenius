'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Question methods */
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
  const Assessment = db.models['assessment'];
  const Question = db.models['question'];
  const Rubric = db.models['rubric'];

  Question.belongsTo(Assessment);
  Question.hasMany(Rubric);
}
