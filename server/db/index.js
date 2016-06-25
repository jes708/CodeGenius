'use strict';
var db = require( './_db' );
module.exports = db;
const bluebird = require( 'bluebird' );
if(!global.dbPath) global.dbPath = __dirname;

var User = require( './models/Organizations/User' );
var Team = require( './models/Organizations/Team' );
var Organization = require( './models/Organizations/Organization' );
var UserOrganization = require( './models/Organizations/UserOrganization' );
var UserTeam = require( './models/Organizations/UserTeam' );

/**
 * Promise.all (bluebird) is used here to make sure all the
 * relations are initialized before the associations are added.
 */
bluebird.all( [ User, Team, Organization, UserOrganization, UserTeam ] )
  .spread( ( User, Team, Organization, UserOrganization, UserTeam ) => {
    User.addAssociations( db );
    Team.addAssociations( db );
    Organization.addAssociations( db );
  } )
