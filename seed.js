/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require( 'chalk' );
var db = require( './server/db' );
const User = db.models[ 'user' ];
const Organization = db.models[ 'organization' ]
const UserOrganization = db.models[ 'userOrganization' ]
var Promise = require( 'sequelize' )
  .Promise;
const faker = require( 'faker' );
const utils = require( './server/app/routes/utils' );
const {
  Credentials
} = utils;
const Sequelize = require( 'sequelize' );

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

  var creatingUsers = users.map( function ( userObj ) {
    return User.create( userObj );
  } );

  return Promise.all( creatingUsers );

};



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
      // limit: n,
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



db.sync( {
    force: true
  } )
  .then( function () {
    return seedUsers();
  } )
  .then( function () {
    return seedOrganizations();
  } )
  .then( function () {
    return seedTeams();
  } )
  .then( function () {
    console.log( chalk.green( 'Seed successful!' ) );
    process.exit( 0 );
  } )
  .catch( function ( err ) {
    console.error( err );
    process.exit( 1 );
  } );
