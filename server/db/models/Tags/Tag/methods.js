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
  const StudentTest = db.models['studentTest'];
  const Tag = db.models[ 'tag' ];
  const ItemTag = db.models['itemTag'];

  // Assessment.hasMany(ItemTag, {as: 'tag'});

  StudentTest.belongsToMany(Tag, {
    through: {model: ItemTag, unique: false},
    otherKey: 'tagId'
  });

  Tag.belongsToMany(StudentTest, {
    through: {model: ItemTag, unique: false},
    otherKey: 'studentTestId'
  });

  // ItemTag.addScope('defaultScope', {
  //   include: [
  //     { model: Tag },
  //   ]
  // }, { override: true })

}
