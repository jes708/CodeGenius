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
<<<<<<< HEAD
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
=======
        type: Sequelize.TEXT
>>>>>>> master
      },
      repoUrl: {
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
