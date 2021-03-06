var passport = require('passport')
var VotingUser = require('../models/votingUser')
var GitHubStrategy = require('passport-github')
var githubAuth  = require('./githubAuth')
module.exports = function(passport){
  passport.serializeUser(function(votingUser,done){
    done(null, votingUser)
  })

  passport.deserializeUser( function(userProfile, done){
    VotingUser.findById(userProfile._id, function(err, user){
      done(err, user)
    })
  })

  passport.use(
    new GitHubStrategy(githubAuth, function(accessToken, refreshToken, profile, done){
      // update the user if s/he exists or add a new user
      VotingUser.findOne({'github.username': profile.username}, function(err, user) {
        if(err) {
          return done(err);
        } else {
          if(user){
            return done(null, user, profile);
          } else {
            var newUser = new VotingUser()
            newUser.github.id = profile.id,
            newUser.github.username = profile.username,
            newUser.github.displayName = profile.displayName,
            newUser.github.repos = profile.public_repos

            newUser.save(function(err, user){
              if(err) {throw err}
              else{
                return done(null,user)
              }
            })
          }

        }
      })
    }))
}
