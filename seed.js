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
  tag: Tag,
  itemTag: ItemTag
} = models


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
    return User.create( instructorObj );
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
      } )
    } )
  return Promise.all( organizations );
}

const seedTeams = function ( n = 100 ) {
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
        .then( team => team.setOrganization( organization ) )
    } )
    teams[0] = models.team.create({
      name: 'jjjj',
      github_team_id: 2059661
    })
  return Promise.all( teams );
}

let seedAssessments = function () {
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
      } )
    } )
  return Promise.all( assessments );
}

let seedQuestions = function ( n = 20 ) {
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
  let students = Promise.all( Array.from( {
      length: randomN( n )
    },
    student => User.create( createRandomCredentials() ) ) ).then( students => Team.findAll().each( team => {
    for ( let i = 0; i < randomN( 6 ); i++ ) {
      let studentToAdd = faker.random.arrayElement( students );
      team.addStudent( studentToAdd, { role: 'student' } );
    }
  } ) )
  let us = Team.findOne({
    where: {
      name: 'jjjj'
    }
  }).then(function(team) {
    User.findAll( {
      where: {
        github_id: {
          $ne: null
        }
      }
    } ).then(function(studentsUs) {
      studentsUs.forEach(function(studentUs) {
        team.addStudent(studentUs, {role: 'student'})
      })
    })
    
  })

  return Promise.all( students, us );
}

let seedStudentTests = function () {
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
      return StudentTest.create( {
        repoUrl,
        isStudent,
        isGraded,
        userId,
        assessmentId
      } )
    } )
  return Promise.all( studentTests );
}

// let seedTests = function( n=2) {
//   return Assessment.findAll().map(
//     assessment => assessment.
//   )
// }

let seedTags = function ( numTags = 10, tagsPer = 10 ) {
  let numberOfTags = randomN( tagsPer + 2 )
  let tags = Promise.all( Array.from( {
      length: randomN( numTags + 2 )
    },
    tag => Tag.create( { name: faker.random.word(), color: faker.internet.color() } )
  ) ).then( tags => Assessment.findAll( { limit: numberOfTags} )
                              .map( assessment => {
                                let theseTags = _.times(Math.ceil(numberOfTags/2), ()=>faker.random.arrayElement(tags))
                                console.log(theseTags.length);
                                return assessment.addTags( theseTags ) } ) )
     .catch( error => console.log(error) )
  return Promise.all( tags );
}

//execution
db.sync( {
    force: true,
    logging: false
  } )
  .then( () => seedUsers() )
  .then( () => seedOrganizations() )
  .then( () => seedTeams() )
  .then( () => seedAssessments() )
  .then( () => seedQuestions() )
  .then( () => seedStudents() )
  // .then( () => seedRubrics() )
  .then( () => seedStudentTests() )
  // .then( () => seedTags() )
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
