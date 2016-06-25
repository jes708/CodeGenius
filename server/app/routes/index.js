'use strict';
var router = require('express').Router();
const utils = require(global.paths.routerUtils);
// const respond = util.responder(router);
const {respondWith404, bindRouterToUse} = utils
const routerUse = bindRouterToUse(router);

module.exports = router;


routerUse('/api', './api')

// Make sure this is after all of
// the registered routes!
respondWith404(router);
