var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  image_url: String,
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
