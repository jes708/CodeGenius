'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Response definitions */
module.exports = function(db){
    return {
      score: {
        type: Sequelize.INTEGER
      }
    }
}
