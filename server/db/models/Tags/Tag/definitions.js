'use strict';

var Sequelize = require( 'sequelize' );

/** Tag definitions */
module.exports = function(db){
    return {
      name: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING,
        defaultValue: '#3F51B5'
      }
    }
}
