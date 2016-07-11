'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/teams', require('./teams'));
router.use('/organizations', require('./organizations'));
router.use('/annotations', require('./annotations'));
router.use('/questions', require('./questions/questions'));
router.use('/responses', require('./questions/responses'));
router.use('/templates', require('./templates'));
router.use('/evaluations', require('./assessments/evaluations'));
router.use('/assessments', require('./assessments/assessments'));
router.use('/rubrics', require('./assessments/rubrics'));
router.use('/github', require('./github'));
router.use('/comments', require('./comments'));
router.use('/tags', require('./tags'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
