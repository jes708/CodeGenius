'use strict';

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var GitHub = require('../github');
var Promise = require('bluebird');

module.exports = function(app, db) {

  var User = db.model('user');

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
