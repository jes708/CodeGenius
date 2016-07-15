'use strict';

const chalk = require( 'chalk' );
const db = require( './server/db' );
const User = db.model('user');
const Team = db.model('team');
const Promise = require('sequelize').Promise;

const seedUsers = function() {

  const users = [{
    username: 'jancodes',
    name: 'Jansen Li',
    github_id: 16806234,
    photo: 'https://avatars.githubusercontent.com/u/16806234?v=3'
  }, {
    username: 'jdhang',
    name: 'Jason Hang',
    github_id: 5394681,
    photo: "https://avatars.githubusercontent.com/u/5394681?v=3"
  }, {
    username: 'thejohnbackes',
    name: 'thejohnbackes',
    github_id: 13596692,
    photo: 'https://avatars.githubusercontent.com/u/13596692?v=3'
  }];

  const creatingUsers = users.map(function(userObj) {
    return User.create(userObj);
  });

  return Promise.all(creatingUsers);

};

const seedTeams = function () {
    return Team.create({
      name: 'The Dev Team',
      github_team_id: 2059661
    }).catch(error => console.log('createJJJJError', error) )
}

db.sync( {
    force: true,
    logging: false
  } )
  .then( () => seedUsers() )
  .then( () => seedTeams() )
  .then( function () {
    console.log( chalk.green( 'Seed successful!' ) );
    process.exit( 0 );
  } )
  .catch( function ( err ) {
    console.error( err );
    console.log( chalk.white('done with errors'));
  } );
