'use strict';

var chalk = require( 'chalk' );
var db = require( './server/db' );

db.sync( {
    force: true,
    logging: false
  } )
  .then( function () {
    console.log( chalk.green( 'Seed successful!' ) );
    process.exit( 0 );
  } )
  .catch( function ( err ) {
    console.error( err );
    console.log( chalk.white('done with errors'));
  } );
