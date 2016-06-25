'use strict';


//dependencies
const utils = require('./utils');
const bluebird = utils.bluebirdForTests();
console.dir(bluebird);

//bindings
const serverPromise = bluebird.promisify(fakeServer);

//exports
const testUtils = {fakeApp, fakeServer, http, serverPromise};
module.exports = testUtils;

//declarations
function http(){
  return require('http');
}

function fakeApp(){
  return require( 'express' )();
}

function fakeServer(fakeApp, port = 3000, cb){
  var server = fakeApp.listen(port, function(){
    var port = server.address()
    .port;
    console.log( 'Fake test app listening intently at port %s', port );
    cb();
  })
  return server;
}
