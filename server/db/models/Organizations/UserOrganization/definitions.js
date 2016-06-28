'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Question definitions */
module.exports = function(db){
    return {
      role: {
        type: Sequelize.ENUM,
        values: ['member', 'creator', 'admin', 'instructor']
      }
    }
}
