'use strict';

var path = require('path');
var Sequelize = require('sequelize');

var env = require(path.join(__dirname, '../env'));
var db = new Sequelize(env.DATABASE_URI, { logging: env.LOGGING });

global._dbPath = path.join(__dirname, "../server/db/_db.js")

module.exports = db;
