'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Assessment definitions */
module.exports = function(db){
    return {
      tag_id: {
        type: DataTypes.INTEGER,
        unique: 'item_tag_taggable'
      },
      taggable: {
        type: DataTypes.STRING,
        unique: 'item_tag_taggable'
      },
      taggable_id: {
        type: DataTypes.INTEGER,
        unique: 'item_tag_taggable',
        references: null
      }
    }
}
