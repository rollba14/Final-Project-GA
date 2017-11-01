// Source code come from tutorial:
// https://scotch.io/tutorials/easy-node-authentication-setup-and-local

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    // process.nextTick(function() {

      // find a user whose username is the same as the forms username
      // we are checking to see if the user trying to login already exists
      User.findOne({ username:  username }, function(err, user) {
        // if there are any errors, return the error
        if (err){
          console.log("error in finding user", err);
          return done(err);
        }

        // check to see if theres already a user with that username
        if (user) {
          console.log("username taken")
          return done(null, false, {message: 'That username is already taken.'});
        } else {

          // if there is no user with that email
          // create the user
          var newUser            = new User();

          // set the user's local credentials
          newUser.username    = username;
          newUser.password = newUser.generateHash(password);

          // save the user
          newUser.save(function(err) {
            if (err)
            throw err;
            return done(null, newUser);
          });
        }

      });

    // }); // tags for nextTick

  }));


  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy(
  function( username, password, done) {
    User.findOne({ username :  username }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err) return done(err);
      // if no user is found, return the message
      if (!user){
        console.log('signing in with bad user');
        return done(null, false, {
          message: 'User not found'
        });
      }
      // if the user is found but the password is wrong
      if (!user.validPassword(password)){
          return done(null, false, {message: 'Password is wrong'});
      }
      // all is well, return successful user
      return done(null, user);
    });
   }
  ));



};
