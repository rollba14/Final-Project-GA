var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fp_models");

module.exports.User = require('./user');
