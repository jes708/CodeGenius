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
      basePath: {
        type: Sequelize.STRING
      },
      isStudent: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isGraded: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isSent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false        
      },
      score: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      }
    }
}
