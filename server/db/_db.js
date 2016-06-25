var path = require('path');
var Sequelize = require('sequelize');

global._dbPath = path.join(__dirname, "_db.js");
var env = require(path.join(__dirname, '../env'));
var db = new Sequelize(env.DATABASE_URI, { logging: env.LOGGING });

module.exports = db;
