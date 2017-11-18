var express = require('express');
var usersController = require('../controllers/users.js');
var postsController = require('../controllers/posts.js');
var commentsController = require('../controllers/comments.js');
var cors = require('cors');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'pandaexpressishorrible',
  userProperty: 'payload'
});

module.exports = function(app, passport){
  var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  }

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('http://localhost:4200/');
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

  // Don't need comments – esp. because you've set URLs up to follow common practice
  // User Routes
  app.get('/login/user', usersController.findSessionUser);
  app.get('/api/users', usersController.index);
  app.post('/api/users', usersController.create);
  app.get('/api/users/:user_id', isLoggedIn,usersController.show);
  app.put('/api/users/:user_id',isLoggedIn,usersController.update);
  app.delete('/api/users/:user_id',isLoggedIn, usersController.destroy);

  //Post Routes
  app.get('/api/posts', postsController.index);
  app.post('/api/posts',isLoggedIn, postsController.create);
  app.get('/api/posts/user/:user_id', postsController.showAllPostsFromAUser);
  app.get('/api/posts/:post_id', postsController.show);
  app.put('/api/posts/:post_id',isLoggedIn, postsController.update);
  app.delete('/api/posts/:post_id',isLoggedIn, postsController.destroy);

  //Comment Routes
  app.get('/api/posts/:post_id/comment', commentsController.show);
  app.post('/api/posts/:post_id/comment',isLoggedIn, commentsController.create);
  app.delete('/api/posts/:post_id/comment/:comment_id',isLoggedIn, commentsController.destroy);
  app.put('/api/posts/:post_id/comment/:comment_id',isLoggedIn, commentsController.update);

}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  return next();
  console.log('Status is',res.status);
  console.log('message exist?', res.message);
  res.status(403).send("Please log in to continue");
}
