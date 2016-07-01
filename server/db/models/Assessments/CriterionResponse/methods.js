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
  const CriterionResponse = db.models['criterionResponse'];
  const QuestionResponse = db.models['questionResponse'];
  const StudentTest = db.models['studentTest'];
  const Rubric = db.models['rubric'];
  const Location = db.models['location'];

  CriterionResponse.belongsTo(QuestionResponse);
  CriterionResponse.belongsTo(Rubric);
  CriterionResponse.belongsTo(Location);
  CriterionResponse.belongsTo(StudentTest);
}
