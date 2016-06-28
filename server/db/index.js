'use strict';
var db = require( './_db' );
module.exports = db;
const bluebird = require( 'bluebird' );
if ( !global.dbPath ) global.dbPath = __dirname;

var User = require( './models/Organizations/User' );
var Team = require( './models/Organizations/Team' );
var Organization = require( './models/Organizations/Organization' );
var UserOrganization = require( './models/Organizations/UserOrganization' );
var UserTeam = require( './models/Organizations/UserTeam' );
var Annotation = require( './models/Annotations/Annotation' );
var Location = require( './models/Annotations/Location' );
var Template = require( './models/Annotations/Template' );
var Assessment = require( './models/Assessments/Assessment' );
var CriterionResponse = require( './models/Assessments/CriterionResponse' );
var Question = require( './models/Assessments/Question' );
var QuestionResponse = require( './models/Assessments/QuestionResponse' );
var Rubric = require( './models/Assessments/Rubric' );
var StudentTest = require( './models/Assessments/StudentTest' );

bluebird.all( [ User, Team, Organization, Annotation, CriterionResponse, Question, QuestionResponse, Rubric, StudentTest, Assessment ] )
  .spread( ( User, Team, Organization, Annotation, CriterionResponse, Question, QuestionResponse, Rubric, StudentTest, Assessment ) => {
    User.addAssociations( db );
    Team.addAssociations( db );
    Organization.addAssociations( db );
    Annotation.addAssociations( db );
    CriterionResponse.addAssociations( db );
    Question.addAssociations( db );
    QuestionResponse.addAssociations( db );
    Rubric.addAssociations( db );
    StudentTest.addAssociations( db );
    Assessment.addAssociations( db );
  } )
