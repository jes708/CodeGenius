'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Rubric definitions */
module.exports = function(db){
    return {
      repoUrl: {
        type: Sequelize.TEXT
      },
      isStudent: {
        type: Sequelize.BOOLEAN
      },
      isGraded: {
        type: Sequelize.BOOLEAN
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    }
}
