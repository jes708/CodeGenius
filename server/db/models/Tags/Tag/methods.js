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
  const Comment = db.models['comment'];

  Comment.belongsToMany(Tag, {
    through: {model: ItemTag, unique: false},
    otherKey: 'tagId'
  });

  Tag.belongsToMany(Comment, {
    through: {model: ItemTag, unique: false},
    otherKey: 'commentId'
  });

  // ItemTag.addScope('defaultScope', {
  //   include: [
  //     { model: Tag },
  //   ]
  // }, { override: true })

}
