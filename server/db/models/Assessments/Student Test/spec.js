var sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
var should = chai.should();

var Sequelize = require('sequelize');
var db = require(global._dbPath);

require('./index.js')(db);
var sharedTests = require('../../sharedTests.js');
