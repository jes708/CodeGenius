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
  const Assessment = db.models['assessment'];
  const Tag = db.models[ 'tag' ];
  const ItemTag = db.models['itemTag'];
  Assessment.belongsToMany(Tag, {
    through: {model: ItemTag, unique: false},
    otherKey: 'tagId'
  });
  Tag.belongsToMany(Assessment, {
    through: {model: ItemTag, unique: false},
    otherKey: 'assessmentId'
  });
}
