'use strict';

var path = require('path');
var Sequelize = require('sequelize');

global._dbPath = path.join(__dirname, "_db.js");
var env = require(path.join(__dirname, '../env'));
var match = process.env.DATABASE_URI.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
var db = new Sequelize(env.DATABASE_URI, {
  dialect: 'postgres',
  protocol: 'postgres',
  port: match[4],
  host: match[3],
  logging: env.LOGGING
});

// global._dbPath = path.join(__dirname, "../server/db/_db.js")

module.exports = db;
