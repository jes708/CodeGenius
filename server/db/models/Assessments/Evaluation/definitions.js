'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Evaluation definitions */
module.exports = function(db){
    return {
      description: {
        type: Sequelize.STRING
      }
    }
}
