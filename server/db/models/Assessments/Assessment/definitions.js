'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Assessment definitions */
module.exports = function(db){
    return {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      repoUrl: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true
        }
      }
    }
}
