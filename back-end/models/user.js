var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var UserSchema = new Schema({
  local: {
    username: String,
    password: String,
    image_url: String,
  }
});

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 2);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "pandaexpressishorrible"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
