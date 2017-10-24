var db = require('../models');
var User = db.User;

function index(req, res) {
  User.find({}, function(err, users) {
    if (err) res.send(err);
    else res.json(users);
  });
}

function show(req, res) {
  User.findById(req.params.id, function(err, user){
    if (err) res.send(err);
    else res.json(user);
  });
}

function create(req, res) {
  User.create(req.body, function(err, user){
    if (err) res.end(err);
    else res.json(user);
  });
}

function update(req, res) {
  User.findByIdAndUpdate(req.params.id,
    {$set: req.body}, function(err, user){
    if (err) res.send(err);
    else res.json(user);
  });
}

function destroy(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user){
    if (err) res.send(err);
    else res.send("user deleted");
  });
}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
