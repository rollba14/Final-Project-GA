var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.js');

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
// index
router.get('/api/users', usersController.index);
// create
router.post('/api/users', usersController.create);
// show
router.get('/api/users/:id', usersController.show);
// update
router.put('/api/users/:id', usersController.update);
// destroy
router.delete('/api/users/:id', usersController.destroy);
//Manager Routes

module.exports = router;
