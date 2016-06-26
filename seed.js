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
const {
  user: User,
  organization: Organization,
  userOrganization: UserOrganization,
  userTeam: UserTeam,
  team: Team,
  annotation: Annotation,
  location: Location,
  template: Template,
  assessment: Assessment,
  criterionResponse: CriterionResponse,
  question: Question,
  questionResponse: QuestionResponse,
  rubric: Rubric,
  studentTest: StudentTest
} = models


// console.log(models);
// const User = db.models[ 'user' ];
// const Organization = db.models[ 'organization' ];
// const UserOrganization = db.models[ 'userOrganization' ];

function createRandomCredentials( username, password, email ) {
  let credentials = new Credentials(
    username || faker.random.word(),
    password || 'password',
    faker.internet.exampleEmail()
  )
  credentials.username = credentials.username.replace( /\W/g, '' )
    .toLowerCase()
  credentials.photo = faker.internet.avatar();
  credentials.name = faker.name.findName();
  return credentials;
}

function randomN( n ) {
  return Math.ceil( Math.random() * n )
}

//seed methods
/** seeds a random number of users 1-100 */
const seedUsers = function ( n = Math.ceil( Math.random() * 100 ) ) {
  let instructors = Array
    .from( {
      length: n
    }, credentials => createRandomCredentials() );
  let Omri = new Credentials(
    'omriBear',
    'password',
    'testing@fsa.com'
  );
  Omri.isAdmin = true;
  instructors.push( Omri );
  let creatingInstructors = instructors.map( function ( instructorObj ) {
    return User.create( instructorObj );
  } );
  return Promise.all( creatingInstructors );
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
  return Promise.all( organizations );
}

const seedTeams = function ( n = Math.ceil( Math.random() * 100 ) ) {
  let teams = Organization.findAll( {
      include: [ {
        model: User
      } ]
    } )
    .map( organization => [
      organization,
      organization.users[ 0 ],
      faker.helpers.shuffle( faker.commerce.productName()
        .split( ' ' ) )
      .join( '' )
    ] )
    .map( result => {
      let [ organization, user, name ] = result;
      return user.createTeam( {
          name,
          creatorId: user.id
        }, {
          role: 'instructor',
        } )
        .then( team => team.setOrganization( organization ) )
    } )
  return Promise.all( teams );
}

let seedAssessments = function () {
  let assessments = User.findAll( {
      include: [ Team ]
    } )
    .map( instructor => {
      if ( !instructor.teams[ 0 ] ) return
      let name = faker.lorem.words( Math.ceil( Math.random() * 20 ) );
      let description = faker.lorem.paragraph();
      let tags = faker.random.words( Math.ceil( Math.random() * 10 ) )
        .toLowerCase()
        .split( ' ' );
      let repoUrl = faker.internet.url();
      let instructorId = instructor.id;
      let team = instructor.teams[ 0 ].userTeam;
      let teamId = team.id;
      return Assessment.create( {
        name,
        description,
        tags,
        repoUrl,
        instructorId,
        teamId
      } )
    } )
  return Promise.all( assessments );
}

let seedQuestions = function ( n = 20 ) {
  let questions = Assessment.findAll()
    .map( assessment => {
      let N = Math.ceil( Math.random() * n );
      let questions = Array.from( {
        length: N
      }, question => {
        let prompt = faker.lorem.words( Math.ceil( Math.random() * 20 ) );
        let answer = faker.lorem.words( Math.ceil( Math.random() * 20 ) );
        let assessmentId = assessment.id;
        return {
          prompt,
          answer,
          assessmentId
        };
      } )
      return Question.bulkCreate( questions );
    } )
  return Promise.all( questions );
}

let seedRubrics = function ( n = 20 ) {
  console.log( 'seeding rubrics' );
  let rubrics = Question.findAll()
    .map( question => {
      let N = randomN( n );
      let rubrics = Array.from( {
        length: N
      }, rubric => {
        let criterion = faker.lorem.words( Math.ceil( Math.random() * 20 ) );
        let points = randomN( 10 );
        let questionId = question.id;
        return {
          criterion,
          points,
          questionId
        };
      } )
      return Rubric.bulkCreate( rubrics );
    } )
  console.log( 'here come the rubrics' );
  return Promise.all( rubrics );
}

let seedStudents = function ( n = 20 ) {
  console.log( 'seeding students' );
  let students = Promise.all(Array.from( {
            length: randomN( n )
          },
          student => User.create(createRandomCredentials()))
     ).then( students => Team.findAll().each( team => {
    for(let i = 0; i< randomN(6); i++){
      let studentToAdd = faker.random.arrayElement(students);
      team.addStudent( studentToAdd, {role: 'student'});
    }
  }))
  return Promise.all( students );
}

// let seedTests = function( n=2) {
//   return Assessment.findAll().map(
//     assessment => assessment.
//   )
// }

//execution
db.sync( {
    force: true
  } )
  .then( () => seedUsers() )
  .then( () => seedOrganizations() )
  .then( () => seedTeams() )
  .then( () => seedAssessments() )
  .then( () => seedQuestions() )
  .then( () => seedStudents() )
  .then( () => seedRubrics() )
  // .then( () => seedTests() )
  // .then( () => seedAnnotations())
  .then( function () {
    console.log( chalk.green( 'Seed successful!' ) );
    process.exit( 0 );
  } )
  .catch( function ( err ) {
    console.error( err );
    process.exit( 1 );
  } );
