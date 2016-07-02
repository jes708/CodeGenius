'use strict';
const db = require( './_db' );
module.exports = db;
const bluebird = require( 'bluebird' );
if ( !global.dbPath ) global.dbPath = __dirname;

const User = require( './models/Organizations/User' );
const Team = require( './models/Organizations/Team' );
const Organization = require( './models/Organizations/Organization' );
const UserOrganization = require( './models/Organizations/UserOrganization' );
const UserTeam = require( './models/Organizations/UserTeam' );
const Annotation = require( './models/Annotations/Annotation' );
const Location = require( './models/Annotations/Location' );
const Template = require( './models/Annotations/Template' );
const Assessment = require( './models/Assessments/Assessment' );
const CriterionResponse = require( './models/Assessments/CriterionResponse' );
const Question = require( './models/Assessments/Question' );
const QuestionResponse = require( './models/Assessments/QuestionResponse' );
const Rubric = require( './models/Assessments/Rubric' );
const StudentTest = require( './models/Assessments/StudentTest' );
const Tag = require( './models/Tags/Tag');
const ItemTag = require( './models/Tags/ItemTag');

bluebird.all( [ User, Team, Organization, Annotation, CriterionResponse, Question, QuestionResponse, Rubric, StudentTest, Assessment, Tag, ItemTag ] )
  .then( Models => Models.forEach( Model => Model.addAssociations ? Model.addAssociations( db ) : false ))
  // .spread( ( User, Team, Organization, Annotation, CriterionResponse, Question, QuestionResponse, Rubric, StudentTest, Assessment, Tag, ItemTag ) => {
  //   User.addAssociations( db );
  //   Team.addAssociations( db );
  //   Organization.addAssociations( db );
  //   Annotation.addAssociations( db );
  //   CriterionResponse.addAssociations( db );
  //   Question.addAssociations( db );
  //   QuestionResponse.addAssociations( db );
  //   Rubric.addAssociations( db );
  //   StudentTest.addAssociations( db );
  //   Assessment.addAssociations( db );
  // } )
