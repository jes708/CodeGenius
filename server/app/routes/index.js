'use strict';
var router = require('express').Router();
const util = require(global.paths.routeUtils);
const routerUse = util.routerUse(router);
const respond = util.responder(router);

module.exports = router;

routerUse('/api', './api')

// Make sure this is after all of
// the registered routes!
respond.with404();
