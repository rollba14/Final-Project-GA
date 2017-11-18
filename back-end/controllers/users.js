var User = require('../models').User;

function findSessionUser(req,res){
  if(!req.isAuthenticated()){
    res.status(401).send("Please log in to continue");
  }
  else{
    User.findById(req.session.passport.user, function(err,user){
      if(err) res.send(err);
      let formatedUser = {
        _id : user._id,
        username: user.username,
        image_url: user.image_url,
      }
      res.json(formatedUser);
    })
  }
}

function index(req, res) {
  User.find({}, function(err, users) {
    if (err) res.send(err);
    else res.json(users);
  });
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
  User.findByIdAndUpdate(req.params.user_id, {$set: req.body}, function(err, user){
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

module.exports.findSessionUser = findSessionUser;
module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
