'use strict';

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var GitHub = require('../github');
var Promise = require('bluebird');

module.exports = function(app, db) {

  var User = db.model('user');
  var Assessment = db.model('assessment');
  var StudentTest = db.model('studentTest');

  var githubConfig = app.getValue('env').GITHUB;

  var githubCredentials = {
    clientID: githubConfig.clientID,
    clientSecret: githubConfig.clientSecret,
    callbackURL: githubConfig.callbackURL
  };

  var verifyCallback = function(accessToken, refreshToken, profile, done) {
    GitHub.authenticate({
      type: 'oauth',
      token: accessToken
    })

    User.findOne({
        where: {
          username: profile.username
        }
      })
      .then(function(user) {
        var getEmails = GitHub.users.getEmailsAsync({ per_page: 100 })

        if (user) {
          var userUpdate = user.update({
            github_id: profile.id,
            name: profile.displayName,
            email: profile.email ? profile.email.value : [profile.username, 'no-email.com'].join('@'),
            photo: profile.photos[0].value,
            github_token: accessToken
          });
          return Promise.all([userUpdate, getEmails])
        } else {
          var userCreate = User.create({
            github_id: profile.id,
            name: profile.displayName,
            username: profile.username,
            email: profile.email ? profile.email.value : [profile.username, 'no-email.com'].join('@'),
            photo: profile.photos[0].value,
            github_token: accessToken
          })
          .then(createdUser => {
            Assessment.create({
              name: "Sample Assessment",
              repoUrl: "https://github.com/Code-Genius/express-checkpoint-1",
              solutionRepoUrl: 'https://github.com/Code-Genius/express-checkpoint-1-solution',
              basePath: 'Code-Genius/express-checkpoint-1',
              solutionPath: 'Code-Genius/express-checkpoint-1-solution',
              org: 'Code-Genius',
              solutionFiles: ['README.md', 'app.js', 'models/_db.js', 'models/author.js', 'models/book.js', 'models/chapter.js', 'models/index.js', 'package.json', 'public/static/index.html', 'seed.js', 'test.js'],
              instructorId: createdUser.dataValues.id,
              teamId: 1
            })
            .then(assessment => {
              StudentTest.bulkCreate([
                {repoUrl: 'https://github.com/jancodes/express-checkpoint-1', basePath: 'jancodes/express-checkpoint-1', userId: 1, assessmentId: assessment.id},
                {repoUrl: 'https://github.com/jdhang/express-checkpoint-1', basePath: 'jdhang/express-checkpoint-1', userId: 2, assessmentId: assessment.id},
                {repoUrl: 'https://github.com/jes708/express-checkpoint-1', basePath: 'jes708/express-checkpoint-1', userId: 3, assessmentId: assessment.id},
                {userId: 4, assessmentId: assessment.id}
              ])
            })
            return createdUser
          });
          return Promise.all([userCreate, getEmails])
        }
      })
      .spread((user, emails) => {
        if (emails) {
          let primaryEmail = emails.filter(email => {
            return email.primary === true
          })
          return user.update({
            email: primaryEmail[0].email
          })
        } else {
          return user
        }
      })
      .then(function(userToLogin) {
        done(null, userToLogin);
      })
      .catch(function(err) {
        console.error('Error creating user from Github authentication', err);
        done(err);
      });
  };


  passport.use(new GitHubStrategy(githubCredentials, verifyCallback));

  app.get('/auth/github', passport.authenticate('github', {
    scope: 'repo gist user:email read:org'
  }));

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      res.redirect('/');
    });

};
