'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Response methods */
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
  const QuestionResponse = db.models['questionResponse'];
  const Question = db.models['question'];
  const StudentTest = db.models['studentTest'];
  const Location = db.models['location'];

  QuestionResponse.belongsTo(Question)
  QuestionResponse.belongsTo(StudentTest)
  QuestionResponse.belongsTo(Location)
}
