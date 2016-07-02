'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Question definitions */
module.exports = function(db){
    return {
        username: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING,
            validate: {
                isUrl: true
            }
        },
        email: {
            unique: true,
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        github_id: {
            type: Sequelize.BIGINT
        },
        github_token: {
          type: Sequelize.STRING
        }
    }
}
