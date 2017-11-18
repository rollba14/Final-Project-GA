// Clean up code (name variables and functions semantically, vs using comments)

// Source code come from tutorial:
// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {
    User.findOne({ username:  username }, function(err, user) {
      if (err){
        console.log("error in finding user", err);
        return done(err);
      }

      if (user) {
        console.log("username taken")
        return done(null, false, {message: 'That username is already taken.'});
      } else {
        var newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy(function( username, password, done) {
    User.findOne({ username :  username }, function(err, user) {
      if (err) return done(err);

      if (!user){
        console.log('signing in with bad user');
        return done(null, false, { message: 'User not found' });
      }

      if (!user.validPassword(password)){
        return done(null, false, {message: 'Password is wrong'});
      }

      return done(null, user);
    });
   }
  ));
};
