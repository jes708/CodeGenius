'use strict';

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var githubConfig = app.getValue('env').GITHUB;

    var githubCredentials = {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        User.findOne({
                where: {
                    username: profile.username
                }
            })
            .then(function (user) {
                if (user) {
                    return user.update({
                        github_id: profile.id,
                        name: profile.displayName,
                        email: profile.emails ? profile.emails[0].value : [profile.username , 'no-email.com'].join('@'),
                        photo: profile.photos[0].value,
                        github_token: accessToken                        
                    });
                } else {
                    return User.create({
                        github_id: profile.id,
                        name: profile.displayName,
                        username: profile.username,
                        email: profile.emails ? profile.emails[0].value : [profile.username , 'no-email.com'].join('@'),
                        photo: profile.photos[0].value,
                        github_token: accessToken
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Github authentication', err);
                done(err);
            });
    };


    passport.use(new GitHubStrategy(githubCredentials, verifyCallback));

    app.get('/auth/github', passport.authenticate('github', {
      scope: 'repo gist read:org'
    }));

    app.get('/auth/github/callback',
        passport.authenticate('github', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
