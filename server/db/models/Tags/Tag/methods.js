'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Tag methods */
module.exports = {
  class: function(db){
    return {
      addAssociations
    };
  },
  instance: function(db){
    return {};
  }
}


function addAssociations( db ) {
  const { comment, assessment, tag, itemTag } = db.models;
  [ comment, assessment ].forEach( Model => {
    Model.belongsToMany(Tag, {
      through: {
        model: itemTag,
        unique: false,
        scope: {
          taggable: Model.toString()
        }
      },
      foreignKey: 'taggable_id',
      constraints: false
    });
    Tag.belongsToMany(Model, {
      through: {
        model: itemTag,
        unique: false
      },
      foreignKey: 'tag_id'
    });
  })
}
