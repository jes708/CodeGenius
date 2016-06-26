'use strict';

/**
 * run with node seed.js
 */

// dependencies
var chalk = require( 'chalk' );
var db = require( './server/db' );
var Promise = require( 'sequelize' )
  .Promise;
const faker = require( 'faker' );
const utils = require( './server/app/routes/utils' );
const {
  Credentials
} = utils;
const Sequelize = require( 'sequelize' );

// binding to the models
const models = db.models;
const {user: User, organization: Organization, userOrganization: UserOrganization, userTeam: UserTeam, team: Team, annotation: Annotation, location: Location, template: Template, assessment: Assessment, criterionResponse: CriterionResponse, question: Question, questionResponse: QuestionResponse, rubric: Rubric, studentTest: StudentTest} = models


// console.log(models);
// const User = db.models[ 'user' ];
// const Organization = db.models[ 'organization' ];
// const UserOrganization = db.models[ 'userOrganization' ];

//seed methods
/** seeds a random number of users 1-100 */
const seedUsers = function ( n = Math.ceil( Math.random() * 100 ) ) {
  let users = Array
    .from( {
        length: n
      }, credentials =>{
      credentials = new Credentials(
        faker.random.word(),
        'password',
        faker.internet.exampleEmail()
      )
      credentials.username = credentials.username.replace(/\W/g, '').toLowerCase()
      credentials.photo = faker.internet.avatar();
      credentials.name = faker.name.findName();
      return credentials;
    } )
  let Omri = new Credentials(
    'omriBear',
    'password',
    'testing@fsa.com'
  );
  Omri.isAdmin = true;
  users.push( Omri );
  let creatingUsers = users.map( function ( userObj ) {
    return User.create( userObj );
  } );
  return Promise.all( creatingUsers );
};

/** seeds up to n organizations */
const seedOrganizations = function ( n = Math.ceil( Math.random() * 100 ) ) {
  let organizations = User.findAll( {
      limit: n
    } )
    .map( user => {
      let name = faker.company.companyName();
      return user.createOrganization( {
        name
      }, {
        role: 'creator'
      } )
    } )
  return organizations;
}

const seedTeams = function ( n = Math.ceil( Math.random() * 100 ) ) {
  return Organization.findAll( {
      include: [ {
        model: User
      } ]
    } )
    .map( organization => [
      organization,
      organization.users[0],
      faker.helpers.shuffle( faker.commerce.productName().split( ' ' ) ).join( '' )
    ])
    .map( result => {
      let [organization, user, name] = result;
      return user.createTeam( {
          name
        }, {
          role: 'instructor',
        } )
        .then( team => team.setOrganization( organization ) )
    } )
}

let seedAssessments = function(){
  return User.findAll( {
    include: [Team]
  }).map(instructor => {
    let name = faker.lorem.words(Math.ceil(Math.random()*20));
    let description = faker.lorem.paragraph();
    let tags = faker.random.words(Math.ceil(Math.random()*10)).toLowerCase().split(' ');
    let repoUrl = faker.internet.url();
    let instructorId = instructor.id;
    let team = instructor.teams[0].userTeam;
    let teamId = team.id;
    return Assessment.create({name, description, tags, repoUrl, instructorId, teamId})
  }  )
}

//execution
db.sync( {
    force: true
  } )
  .then( ()=>seedUsers())
  .then( ()=> seedOrganizations())
  .then( ()=> seedTeams() )
  .then( ()=> seedAssessments() )
  .then( function () {
    console.log( chalk.green( 'Seed successful!' ) );
    process.exit( 0 );
  } )
  .catch( function ( err ) {
    console.error( err );
    process.exit( 1 );
  } );
