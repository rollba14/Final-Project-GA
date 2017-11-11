var express = require('express');
// var router = express.Router();
var usersController = require('../controllers/users.js');
var postsController = require('../controllers/posts.js');
var commentsController = require('../controllers/comments.js');
var cors = require('cors');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'pandaexpressishorrible',
  userProperty: 'payload'
});

////////////////////////////////////////////
// Testing of passport
module.exports = function(app, passport){
  var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  }

  app.get('/logout', function(req, res) {
    req.logout();
    res.status(200).send("Logged out succssfully");
  });

  // process the signup form
  if(!process.env.DYNO){
    app.options('*', cors(corsOptions))
  }

  app.post('/signup',passport.authenticate('local-signup'),
  function(req,res){
    console.log('signed up then proceed');
    console.log('user exist?', req.user);
    req.logIn(req.user, function(err) {
      if (err) { res.send(err) }
      res.json();
    });
  });

  app.post('/login', passport.authenticate('local-login'),
  function(req,res){
    console.log('session is', req.session);
    console.log('loggin in... user is:', req.user);
    req.login(req.user,function(err){
      res.json();
    })
  });
  //////////////////////////////////////////

  app.get('/login/user', usersController.findSessionUser);
  // User Routes
  // index
  app.get('/api/users', usersController.index);
  // create
  app.post('/api/users', usersController.create);
  // show
  app.get('/api/users/:user_id', isLoggedIn,usersController.show);
  // update
  app.put('/api/users/:user_id',isLoggedIn,usersController.update);
  // destroy
  app.delete('/api/users/:user_id',isLoggedIn, usersController.destroy);

  //Post Routes//
  // All posts from all users
  app.get('/api/posts', postsController.index);
  // create
  app.post('/api/posts',isLoggedIn, postsController.create);
  // show all posts from a user
  app.get('/api/posts/user/:user_id', postsController.showAllPostsFromAUser);
  // show a specific post
  app.get('/api/posts/:post_id', postsController.show);
  // update a specific post
  app.put('/api/posts/:post_id',isLoggedIn, postsController.update);
  // destroy a specific post
  app.delete('/api/posts/:post_id',isLoggedIn, postsController.destroy);

  //Comment Routes//
  //
  app.get('/api/posts/:post_id/comment', commentsController.show);
  // create a comment for a post
  app.post('/api/posts/:post_id/comment',isLoggedIn, commentsController.create);
  // delete a comment for a post
  app.delete('/api/posts/:post_id/comment/:comment_id',isLoggedIn, commentsController.destroy);
  app.put('/api/posts/:post_id/comment/:comment_id',isLoggedIn, commentsController.update);

}

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  return next();
  console.log('Status is',res.status);
  console.log('message exist?', res.message);
  // if they aren't redirect them to the home page
  res.status(403).send("Please log in to continue");
}


// module.exports = router;
