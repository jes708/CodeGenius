'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Question definitions */
module.exports = function(db){
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }
}
