var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.js');
var postsController = require('../controllers/posts.js');

// register
router.get('/register', function(req,res){
  res.render('register');
});
// Login
router.get('/login', function(req,res){
  res.render('login');
})

// default path
router.get('/',usersController.index);

// User Routes
//temporary login
router.post('/api/users/login', usersController.login);
// index
router.get('/api/users', usersController.index);
// create
router.post('/api/users', usersController.create);
// show
router.get('/api/users/:user_id', usersController.show);
// update
router.put('/api/users/:user_id', usersController.update);
// destroy
router.delete('/api/users/:user_id', usersController.destroy);

//Post Routes//
// All posts from all users
router.get('/api/users/posts', postsController.index);
// create
router.post('/api/users/:user_id/posts', postsController.create);
// show all posts from a user
router.get('/api/users/:user_id/posts', postsController.showAllPostsFromAUser);
// show a specific post
router.get('/api/users/posts/:post_id', postsController.show);
// update a specific post
router.put('/api/users/posts/:post_id', postsController.update);
// destroy a specific post
router.delete('/api/users/posts/:post_id', postsController.destroy);


module.exports = router;
