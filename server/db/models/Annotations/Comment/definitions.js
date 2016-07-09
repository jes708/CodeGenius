'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** comment definitions */
module.exports = function(db){
    return {
      description: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      selectionString: {
        type: Sequelize.TEXT
      },
      anchorNode: {
        type: Sequelize.STRING
      },
      anchorOffset: {
        type: Sequelize.STRING
      },
      focusNode: {
        type: Sequelize.STRING
      },
      focusOffset: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      rangeCount: {
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.FLOAT
      },
      attachments: {
        type: Sequelize.STRING
      },
      criteria: {
        type: Sequelize.STRING
      },
      markdown: {
        type: Sequelize.TEXT
      }
    }
}
