let db = require('../models');

db.User.remove({}, function(err, users) {
  console.log('removed all users');
  process.exit();
})
