'use strict';
var router = require('express').Router();
module.exports = router;

// router.use('/users', require('./users'));
// router.use('/annotations', require('./annotations'));
// router.use('/questions', require('.assessments/questions'));
// router.use('/evaluations', require('.assessments/evaluations'));
// router.use('/assessments', require('.assessments/assessments'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
