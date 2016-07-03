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
const Credentials = utils.Credentials;;
const Sequelize = require( 'sequelize' );
const _ = require('lodash');

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
  studentTest: StudentTest,
  tag: Tag
} = models
const ItemTag = db.models[ 'itemTag' ];
// console.log(models);
// const User = db.models[ 'user' ];
// const Organization = db.models[ 'organization' ];
// const UserOrganization = db.models[ 'userOrganization' ];

function createRandomCredentials( username, password, email ) {
  let credentials = Credentials(
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
  return Math.ceil( Math.random() * n ) + 2
}

//seed methods
/** seeds a random number of users 1-100 */
const seedUsers = function ( n = 100 ) {
  console.log('seeding users');
  n = randomN( n );
  let instructors = Array
    .from( {
      length: n
    }, credentials => createRandomCredentials() );
  let Omri = new Credentials(
    'omiBear',
    'password',
    'testing@fsa.com'
  );
  Omri.isAdmin = true;
  instructors.push( Omri );
  let creatingInstructors = instructors.map( function ( instructorObj ) {
    return User.create( instructorObj ).catch(error => console.log('seedUsers error', error));
  } );
  instructors.push(models.user.create({
    username: 'jancodes',
    name: 'Jansen Li',
    github_id: 16806234,
    photo: 'https://avatars.githubusercontent.com/u/16806234?v=3'
  }))
  instructors.push(models.user.create({
    username: 'jdhang',
    name: 'Jason Hang',
    github_id: 5394681,
    photo: "https://avatars.githubusercontent.com/u/5394681?v=3"
  }))
  instructors.push(models.user.create({
    username: 'jes708',
    name: 'Jonathan Schwarz',
    github_id: 16601510,
    photo: 'https://avatars.githubusercontent.com/u/16601510?v=3'
  }))
  instructors.push(models.user.create({
    username: 'thejohnbackes',
    name: 'John Backes',
    github_id: 13596692,
    photo: 'https://avatars.githubusercontent.com/u/13596692?v=3'
  }))
  return Promise.all( creatingInstructors );
};

/** seeds up to n organizations */
const seedOrganizations = function ( n = 100 ) {
  console.log('seeding organizations')
  n = randomN( n );
  let organizations = User.findAll( {
      limit: n
    } )
    .map( user => {
      let name = faker.company.companyName();
      return user.createOrganization( {
        name
      }, {
        role: 'creator'
      } ).catch(error => console.log('createOrganizationError', error) )
    } )
  return Promise.all( organizations );
}

const seedTeams = function ( n = 100 ) {
  console.log('seeding teams');
  n = randomN( n )
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
        .then( team => team.setOrganization( organization ).catch(error => console.log('setOrganizationError', error) ) ).catch(error => console.log('createTeamError', error)  )
    } )
    teams[0] = models.team.create({
      name: 'jjjj',
      github_team_id: 2059661
    }).catch(error => console.log('createJJJJError', error) )
  return Promise.all( teams );
}

let seedAssessments = function () {
  console.log('seeding assessments');
  let assessments = User.findAll( {
      include: [ Team ]
    } )
    .map( instructor => {
      if ( !instructor.teams[ 0 ] ) return
      let name = faker.lorem.words( randomN( 20 ) + 1 );
      let description = faker.lorem.paragraph();
      let repoUrl = faker.internet.url();
      let instructorId = instructor.id;
      let team = instructor.teams[ 0 ].userTeam;
      let teamId = team.id;
      let basePath = faker.random.words(2).split(' ').join('/') + '.js'
      let org = faker.random.word()
      let solutionFiles = faker.random.words(5).split(' ')
      return Assessment.create( {
        name,
        description,
        repoUrl,
        basePath,
        instructorId,
        teamId,
        org,
        solutionFiles
      } ).catch(error => console.log('createAssessmentError', error) )
    } )
  return Promise.all( assessments );
}

let seedQuestions = function ( n = 20 ) {
  console.log('seeding questions');
  let questions = Assessment.findAll()
    .map( assessment => {
      let questions = Array.from( {
        length: randomN( n )
      }, question => {
        let prompt = faker.lorem.words( randomN( 20 ) );
        let answer = faker.lorem.words( randomN( 20 ) );
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
  console.log('seeding rubrics');
  let rubrics = Question.findAll()
    .map( question => {
      let N = randomN( n );
      let rubrics = Array.from( {
        length: N
      }, rubric => {
        let criterion = faker.lorem.words( randomN( 20 ) );
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
  return Promise.all( rubrics );
}

let seedStudents = function ( n = 20 ) {
  console.log('seeding students');
  return Promise.all( Array.from( {
      length: randomN( n )
    },
    student => User.create( createRandomCredentials() ).catch(error => console.log('UserCreateError in seedStudents', error) ) ) )
}

function addStudentsToTeams(students){
  return (
    Team.findAll()
        .each( team => {
          let studentsToAdd = new Set()
          for ( let i = 0; i < randomN( 6 ); i++ ) {
            studentsToAdd.add(faker.random.arrayElement( students ));
          }
          return studentsToAdd.forEach(student =>
            team.addStudent( student, { role: 'student' } )
                .catch(error => console.log('addStudentsToTeams', error)) );
        } )
  )
}

function seedUs(){
  console.log('seeding us');
  return User.findAll( {
      where: {
        github_id: {
          $ne: null
        }
      }
    } )
}

function addUsToTeams( studentsUs ){
  console.log('adding us to teams');
  return Team.findOne({
      where: {
        name: 'jjjj'
      }
    }).then( team => {
          return studentsUs
            .map(student =>
              team.addStudent( student, { role: 'student' } )
                  .catch(error => console.log('addUsToTeams', error)
                ) )
              })
            }

let seedStudentTests = function () {
  console.log('seeding student tests');
  let studentTests = User.findAll( {
      where: {
        github_id: {
          $ne: null
        }
      }
    } )
    .map( user => {
      let repoUrl = `https://github.com/${user.username}/assessment1`;
      let isStudent = Boolean(Math.round(Math.random()));
      let isGraded = Boolean(Math.round(Math.random()));
      let userId = user.id;
      let assessmentId = 1;
      return user.createStudentTest( {
        repoUrl,
        isStudent,
        isGraded,
        assessmentId
      }).catch(error=>console.log('seedStudentTests', error))
      // return StudentTest.create( {
      //   repoUrl,
      //   isStudent,
      //   isGraded,
      //   userId,
      //   assessmentId
      // } )
    } )
  return studentTests;
}

// let seedTests = function( n=2) {
//   return Assessment.findAll().map(
//     assessment => assessment.
//   )
// }

function createTags(numTags = 10){
  return Promise.all(Array.from( {
      length: randomN( numTags + 2 )
    },
    tag => Tag.create( {
         name: faker.random.word(),
         color: faker.internet.color()
       } ).catch( error => console.log('createTag error', error))
  ) )
}

function addTagsToAssessments ( tags, numTags = 10, tagsPer = 10 ) {
  console.log('seeding tags');
  let numberOfTags = Math.ceil(randomN( tagsPer + 2 ) / 2)
  return Assessment
    .findAll( { limit: numberOfTags} )
    .each( assessment => {
      let tagsToAdd = new Set();
      for ( let i = 0; i < numberOfTags; i++ ) {
        tagsToAdd.add(faker.random.arrayElement(tags));
      }
      return Promise.all([...tagsToAdd.values()].map( tag =>{
        console.log('adding tag');
        return assessment.addTag(tag)
          .catch(error => console.log(error) )}
      ) ) })  }



//execution
db.sync( {
    force: true,
    logging: false
  } )
  .then( () => console.log( chalk.white('starting')))
  .then( () => seedUsers() )
  .then( () => seedOrganizations() )
  .then( () => seedTeams() )
  .then( () => seedAssessments() )
  // .then( () => seedQuestions() )
  .then( () => seedStudents() ).then(addStudentsToTeams)
  .then( () => seedUs() ).then(addUsToTeams)
  // .then( () => seedRubrics() )
  .then( () => createTags() ).then(tags => addTagsToAssessments(tags, 10, 10) )
  .then( () => seedStudentTests() )
  // .then( () => seedTests() )
  // .then( () => seedAnnotations())
  .then( function () {
    console.log( chalk.green( 'Seed successful!' ) );
    process.exit( 0 );
  } )
  .catch( function ( err ) {
    console.error( err );
    console.log( chalk.white('done with errors'));
    // process.exit( 1 );
  } );
