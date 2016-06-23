'use strict';

/** shared tests for models */
module.exports = { SyncDB, exists, classTest, instanceTest };
function SyncDB( db ) {
  return db.sync( {
    force: true
  } );
}

function exists( Model ) {
  return Model.describe()
    .then( description =>
      description.should.be.an.object )
}

function classTest( Model ) {
  return Model.test()
    .should.be.true;
}

function instanceTest( Model ) {
  return Model.build()
    .test()
    .should.be.true;
}
