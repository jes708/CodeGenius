'use strict';
var crypto = require( 'crypto' );
var _ = require( 'lodash' );
var Sequelize = require( 'sequelize' );

/** Question methods */
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

function addAssociations(db){
  const Team = db.models['team'];
  const Organization = db.models['organization'];
  const User = db.models['user'];
  const UserOrganization = db.models['userOrganization'];

  Organization.belongsToMany(User, {through: UserOrganization});
  Organization.hasMany(Team);
}
