var db = require('../models');
var User = db.User;

function findSessionUser(req,res){
  if(!req.isAuthenticated()){
    res.status(401).send("Please log in to continue");
  }
  else{
    User.findById(req.session.passport.user,function(err,user){
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
  if(authUser(req.params.user_id) == true){
    User.find({}, function(err, users) {
      if (err) res.send(err);
      else res.json(users);

    });
  }else
    res.status(401).send('You are unauthorized to view users');
}

function show(req, res) {
  if(authUser(req.params.user_id) == true){
    User.findById(req.params.user_id, function(err, user){
      if (err) res.send(err);
      else res.json(user);
    });
  }else
    res.status(401).send('You are unauthorized to view this user');
}

function update(req, res) {
  if(authUser(req.params.user_id) == true){
    User.findByIdAndUpdate(req.params.user_id,
    {$set: req.body}, function(err, user){
      if (err) res.send(err);
      else
      res.json(user);
    });
  }else
    res.status(401).send('You are unauthorized to update this user');
}

function destroy(req, res) {
  if(authUser(req.params.user_id) == true){
    User.findByIdAndRemove(req.params.user_id, function(err, user){
      if (err) res.send(err);
      else res.send("user deleted");
    });
  }
  else
    res.status(401).send('You are unauthorized to delete this user');
}

function authUser(input_user_id){
  // editing target is same as logged in user or is admin.
  if(input_user_id == req.session.passport.user ||
    '5a08d1027cc29f0012dbcbb2' == req.session.passport.user) return true;
  return false;
}


module.exports.findSessionUser = findSessionUser;
module.exports.index = index;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;
