'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Rubric methods */
module.exports = {
  class: function(db){
    return {
      addAssociations
    };
  },
  instance: function(db){
    return {
      totalScore: function() {
        db.model('criterionResponse').findAll({
          where: {
            studentTestId: this.id
          }
        }).then(function(scores) {
          return scores.reduce(function(sum, score) {
            return sum + score;
          }, 0)
        }).then(function(score) {
          this.update({score: score})
        })
        return this;
      }
    };
  },
  getter: function(db){
    // return {
    //   totalScore: function() {
    //     return db.model('criterionResponse').findAll({
    //       where: {
    //         studentTestId: this.id
    //       }
    //     }).then(function(scores) {
    //       return scores.reduce(function(sum, score) {
    //         return sum + score;
    //       }, 0)
    //     })
    //   }
    // }
  }
}

function addAssociations(db){
  const StudentTest = db.models['studentTest'];
  const Assessment = db.models['assessment'];
  const User = db.models['user'];
  const Comment = db.models['comment'];
  const ItemTag = db.models['itemTag'];
  const Tag = db.models['tag'];

  StudentTest.belongsTo(Assessment);
  StudentTest.belongsTo(User, {constraints: false});
  StudentTest.hasMany(Comment);
  StudentTest.addScope('defaultScope', {
    include: [
      { model: Assessment },
      { model: User },
      { model: Comment }
    ]
  }, { override: true })
}
