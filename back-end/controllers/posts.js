var db = require('../models');
var Post = db.Post;
var User = db.User;

function index(req, res) {
  Post.find({},function(err, posts) {
    console.log('request is ', req.url);
    if (err) {
      console.log('inside error');
      res.send(err);
    }
    else {
      console.log('all posts with comments: ', posts);
      // let ps = posts.map(p=>{
      //   return formatPost(p)
      // })
      res.json(posts);
    }
  });
}


function showAllPostsFromAUser(req, res) {
  Post.find({user_id: req.params.user_id}, function(err, posts){
    if (err) res.send(err);
    else{
      let ps = posts.map(p=>{
        return formatPost(p)
      })
      res.json(ps);
    }
  });
}
function show(req, res) {
  Post.findById(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else res.json(formatPost(post));
  });
}

function create(req, res) {
  Post.create(req.body, function(err, post){
    if (err) res.end(err);
    else {
      res.json(post);
      }
  });
}

// REQUIRE AUTH //
function update(req, res) {
  if(req.body.user_id == req.session.passport.user){
    Post.findByIdAndUpdate(req.params.post_id,
      {$set: req.body}, function(err, post){
      if (err) res.send(err);
      else {
        res.json(post);
      }
    });
  }else{
    res.status(401).send("You are unauthorized update this post.");
  }
}

// REQUIRE AUTH //
function destroy(req, res) {
  Post.findByIdAndRemove(req.params.post_id, function(err, post){
    if (err) res.send(err);
    if(post.user_id == req.session.passport.user){
      res.json(post);
    }else{
      res.status(401).send("You are unauthorized to delete this post");
    }
  });
}

function allowedUser(post_author,session_user){
  User.find({username: post_author},function(err,user){
    if (err) res.send(err);
    else {
      // check if user is same as the post they want modify.
      if(user._id != session_user){
        return false;
      }else
      return true;
    }
  });
};


module.exports.showAllPostsFromAUser = showAllPostsFromAUser;
module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
