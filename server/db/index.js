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
const Comment = require( './models/Annotations/Comment')

bluebird.all( [ User, Team, Organization, Annotation, CriterionResponse, Question, QuestionResponse, Rubric, StudentTest, Assessment, Tag, Comment ] )
  .then( Models =>
    Models.forEach( Model => Model.addAssociations ?
      Model.addAssociations( db ) : null )
    )
  .then( () => console.log('done with associations'))
  .catch( error => console.log('association error', error))
