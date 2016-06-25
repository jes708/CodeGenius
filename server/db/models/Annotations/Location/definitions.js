'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** annotation definitions */
module.exports = function(db){
    return {
      url: {
        type: Sequelize.TEXT,
        validate: {
          isUrl: true
        }
      },
      startLine: {
        type: Sequelize.INTEGER
      },
      endLine: {
        type: Sequelize.INTEGER
      },
      startChar: {
        type: Sequelize.INTEGER
      },
      endChar: {
        type: Sequelize.INTEGER
      }
    }
}
