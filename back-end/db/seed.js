let db = require('../models');

db.User.remove({}, function(err, users) {
  console.log('removed all users');
})

db.Post.remove({},function(err,posts){
  console.log('removed all posts');
  process.exit();
})
