'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Question definitions */
module.exports = function(db){
    return {
      prompt: {
        type: Sequelize.TEXT
      },
      answer: {
        type: Sequelize.TEXT
      }
    }
}
