var sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
var should = chai.should();

var Sequelize = require('sequelize');


var db = require('../../../_db')

require('./index.js')(db);
require('../../sharedTests.js')