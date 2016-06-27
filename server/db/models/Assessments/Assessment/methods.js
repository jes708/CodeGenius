'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Assessment methods */
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
  const Team = db.models[ 'team' ];
  const Organization = db.models[ 'organization' ];
  const User = db.models[ 'user' ];
  const UserTeam = db.models[ 'userTeam' ];
  const UserOrganization = db.models[ 'userOrganization' ];
  const Assessment = db.models[ 'assessment' ];
  const Question = db.models[ 'question' ];

  Assessment.belongsTo( User, {as: 'instructor'} );
  Assessment.belongsTo( Team );
  Assessment.hasMany( Question );
}
