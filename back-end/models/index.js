var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fp_models");

module.exports.User = require('./user');
module.exports.Post = require('./post');
module.exports.Comment = require('./comment');
