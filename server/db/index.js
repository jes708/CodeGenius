'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Team = require('./models/Organizations/Team/index');
var Organization = require('./models/Organizations/Organization/index');
var UserTeam = require('./models/Organizations/UserTeam/index');
var UserOrganization = require('./models/Organizations/UserOrganization/index');

User.belongsToMany(Team, {through: UserTeam});
User.belongsToMany(Organization, {through: UserOrganization});