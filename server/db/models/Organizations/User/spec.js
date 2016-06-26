var sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
var should = chai.should();

var Sequelize = require('sequelize');
var db = require('../../../_db');

const User = require('./index.js');
var sharedTests = require('../../sharedTests.js');
