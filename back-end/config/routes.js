var express = require('express');
// var router = express.Router();
var usersController = require('../controllers/users.js');
var postsController = require('../controllers/posts.js');

////////////////////////////////////////////
// Testing of passport
module.exports = function(app, passport){

  ///////////// Passport Paths /////////////
  // default path
  app.get('/',function(req,res){
    res.render('index.ejs');
  });

  // Login
  app.get('/login', function(req,res){
    res.render('login.ejs',{message:req.flash('loginMessage')});
  });

  // signup
  app.get('/signup', function(req,res){
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.get('/profile', isLoggedIn, function(req,res){
    res.render('profile.ejs',{
      user: req.user // get the user out of session and pass to template
    })
  })

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // process login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  //////////////////////////////////////////



  // User Routes
  //temporary login
  // app.post('/api/users/login', usersController.login);
  // index
  app.get('/api/users', usersController.index);
  // create
  // app.post('/api/users', usersController.create);
  // show
  app.get('/api/users/:user_id', usersController.show);
  // update
  // app.put('/api/users/:user_id', usersController.update);
  // destroy
  // app.delete('/api/users/:user_id', usersController.destroy);

  //Post Routes//
  // All posts from all users
  app.get('/api/posts', postsController.index);
  // create
  // app.post('/api/posts/', postsController.create);
  // show all posts from a user
  app.get('/api/posts/user/:user_id', postsController.showAllPostsFromAUser);
  // show a specific post
  app.get('/api/posts/:post_id', postsController.show);
  // update a specific post
  // app.put('/api/posts/:post_id', postsController.update);
  // destroy a specific post
  // app.delete('/api/posts/:post_id', postsController.destroy);

}

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}


// module.exports = router;
