'use strict';

/**
 *
 * Rubric Model
 *
 */

/** dependencies */
const definitions = require('./definitions')
const methods = require('./methods')
const db = require('../../../_db');

module.exports = db.define('studentTest',
  /** defined in ./definitions */
  definitions(db),
  {
    /** class and instance methods are defined in ./methods */
    classMethods: methods.class(db),
    instanceMethods: methods.instance(db),
    getterMethods: methods.getter(db)
  }
);