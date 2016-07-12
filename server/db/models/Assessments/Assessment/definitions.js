'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Assessment definitions */
module.exports = function(db){
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
        type: Sequelize.TEXT
      },
      repoUrl: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true
        }
      },
      solutionRepoUrl: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true
        }
      },
      basePath: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      solutionPath: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      org: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      solutionFiles: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: []
      }
    }
}
