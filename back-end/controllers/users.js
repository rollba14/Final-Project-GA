var db = require('../models');
var User = db.User;

function index(req, res) {
  User.find({}, function(err, users) {
    if (err) res.send(err);
    else res.json(users);
  });
}

function login(req,res){
  User.find({username: req.body.username,
    password: req.body.password},function(err,user){
    if (err) res.send(err);
    else {
      console.log('server user is ', user);
      res.json(user);
    }
  })
}

function show(req, res) {
  User.findById(req.params.user_id, function(err, user){
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
  User.findByIdAndUpdate(req.params.user_id,
    {$set: req.body}, function(err, user){
    if (err) res.send(err);
    else res.json(user);
  });
}

function destroy(req, res) {
  User.findByIdAndRemove(req.params.user_id, function(err, user){
    if (err) res.send(err);
    else res.send("user deleted");
  });
}

module.exports.index = index;
module.exports.login = login;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
