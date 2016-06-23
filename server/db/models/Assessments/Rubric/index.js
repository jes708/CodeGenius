'use strict';

/**
 *
 * Rubric Model
 *
 */

/** dependencies */
const definitions = require('./definitions')
const methods = require('./methods')

module.exports = function ( db ) {
  db.define('rubric',
  /** defined in ./definitions */
  definitions(db),
  {
    /** class and instance methods are defined in ./methods */
    classMethods: methods.class(db),
    instanceMethods: methods.instance(db)
  })
}
