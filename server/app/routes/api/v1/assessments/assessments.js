'use strict';

var router = require('express').Router();
var _ = require('lodash');

const sequelizeHandlers = require('sequelize-handlers');
const Promise = require('bluebird');
const utils = require('../../../utils');
const {
  ensureAuthenticated,
  ensureIsAdmin,
  Credentials,
  respondWith404,
  _err,
  db
} = utils;
const Assessment = db().models.assessment;
const Team = db().models.team
const User = db().models.user
const StudentTest = db().models.studentTest
const Resource = Assessment;
const GitHub = require('../../../../configure/github');
const GMAIL_ID = process.env.GMAIL_ID;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const nodemailer = Promise.promisifyAll(require("nodemailer"));
const smtpTransport = require("nodemailer-smtp-transport")
const transport = nodemailer.createTransport(smtpTransport(`smtps://${GMAIL_ID}:${GMAIL_PASSWORD}@smtp.gmail.com`));

import omit from 'lodash/object/omit'

/** see documentation at https://www.npmjs.com/package/sequelize-handlers */

router.get('/', sequelizeHandlers.query(Resource));
router.get('/:id', ensureAuthenticated, sequelizeHandlers.get(Resource));
router.post('/', ensureAuthenticated, (req, res, next) => {
  let newAssessment
  Promise.all([
    Team.findOrCreate({
      where: {
        github_team_id: req.body.teamId,
        name: req.body.teamName
      }
    }),
    Assessment.create(omit(req.body, ['teamName','teamId', 'team']))
  ])
  .spread((teams, assessment) => {
    const team = teams[0]
    let baseUrl = assessment.basePath.split('/')
    return Promise.all([
      assessment.setTeam(team),
      GitHub.repos.getForksAsync({
        user: baseUrl[0],
        repo: baseUrl[1]
      }),
      GitHub.orgs.getTeamMembersAsync({ id: team.github_team_id }),
    ])
  })
  .spread((assessment, forks, members) => {
    let forkByOwner = {}
    newAssessment = assessment
    forks.forEach(fork => {
      forkByOwner[fork.owner.login] = fork
    })
    const creatingUsersAndTests = members.map(member => {
      let basePath = assessment.basePath.split('/')
      return Promise.all([
        GitHub.users.getByIdAsync({ id: member.id })
        .then(user => {
          return User.findOrCreate({ where: {
            github_id: user.id,
            name: user.name,
            username: user.login,
            photo: user.avatar_url
          }})
        })
        .then(user => {
          let repo = null
          let userFork = forkByOwner[user[0].username]
          if (userFork) {
            repo = userFork.html_url
          }

          if (assessment.instructorId !== user[0].id && basePath[0] !== user[0].username) {
            return StudentTest.findOrCreate({
              where: {
                repoUrl: repo,
                basePath: `${member.login}/${basePath[1]}`,
                assessmentId: assessment.id,
                userId: user[0].id
              }
            })
          }
        })
      ])
    })
    return Promise.all(creatingUsersAndTests)
  })
  .then(() => {
    return Assessment.findById(newAssessment.id)
  })
  .then(assessment => res.json(assessment))
  .catch(next)
})
router.put('/:id', ensureAuthenticated, sequelizeHandlers.update(Resource));
router.delete('/:id', ensureAuthenticated, sequelizeHandlers.remove(Resource));


//studentTest Routes

router.get('/:id/students/:studentId', ensureAuthenticated, function(req, res, next) {
  StudentTest.findOne({
    where: {
      assessmentId: req.params.id,
      userId: req.params.studentId
    },
  }).then(test => res.json(test))
  .catch(next)
})

router.get('/:id/students/', ensureAuthenticated, function(req, res, next) {
  StudentTest.findAll({
    where: {
      assessmentId: req.params.id,
    },
  }).then(test => res.json(test))
  .catch(next)
})

router.post('/:id/students/:studentId', ensureAuthenticated, function(req, res, next) {
  let credentials = Object.assign({}, req.body, {
    assessmentId: req.params.id,
    userId: req.params.studentId
  })
  StudentTest.create(credentials)
    .then(test => res.json(test))
    .catch(next)
})

router.put('/:id/students/:studentId', ensureAuthenticated, function(req, res, next) {
  StudentTest.findOne({
      where: {
        assessmentId: req.params.id,
        userId: req.params.studentId
      },
      include:  [Assessment]
    }).then(test => {
      if (req.body.isSent && !test.isGraded && test.user.email && !test.user.email.includes('no-email.com')) {
        const sendEmail = transport.sendMail({
          from: '"Code Genius" <CodeGenius@codegenius.us>',
          to: test.user.email,
          subject: `${test.assessment.name} graded!`,
          text: `Visit http://codegenius.us/studenttest/${req.params.id}/${test.id}/${req.params.studentId} to check your assessment!`,
        })
        return Promise.all([sendEmail, test.update(req.body)])
      } else {
        return test.update(req.body)
      }
    })
    .then(updatedTest => {
        if (Array.isArray(updatedTest)) {
            updatedTest = updatedTest[1]
        }
        res.json(updatedTest)
    })
    .catch(next)
})

router.post('/:id/students/:studentId/comments', (req, res, next) => {
  StudentTest.findOne({
      where: {
        assessmentId: req.params.id,
        userId: req.params.studentId
      },
      include:  [Assessment]
    }).then( studentTest => {
      if(!studentTest) throw 'no student test'
      return studentTest.createComment(req.body)} )
      .then( comment => res.status(201).send(comment) )
      .catch(next);
})

router.get('/:id/students/:studentId/comments', (req, res, next) => {
  StudentTest.findOne({
      where: {
        assessmentId: req.params.id,
        userId: req.params.studentId
      },
      include:  [Assessment]
    }).then( studentTest => {
      return studentTest.getComments()} )
      .then( comments => res.status(200).send( comments ) )
      .catch(next);
})


respondWith404(router);

module.exports = router;
