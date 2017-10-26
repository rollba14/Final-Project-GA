var db = require('../models');
var Post = db.Post;
var User = db.User;

function index(req, res) {
  Post.find({},function(err, posts) {
    if (err) {
      console.log('inside error');
      res.send(err);
    }
    else {
      console.log('all posts with comments: ', posts);
      res.json(posts);
    }
  });
}


function showAllPostsFromAUser(req, res) {
  Post.find({user_id: req.params.user_id}, function(err, user){
    if (err) res.send(err);
    else res.json(user);
  });
}
function show(req, res) {
  Post.findById(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else res.json(post);
  });
}

function create(req, res) {
  // User.findById({_id: req.params.user_id}, function(err, user){
  //   if (err) res.send(err);
  //   if(user.length === 0) {
  //     console.log('Cannot find this user');
  //     res.json({});
  //   }else{
  //     var body = req.body
  //     body.user_id = user._id
  //     Post.create(body, function(err, post){
  //       if (err) res.end(err);
  //       else {
  //         console.log('Created post: ', post, ' for user', user);
  //         res.json(post);
  //       }
  //     });
  //   }
  //
  // })
  Post.create(req.body, function(err, post){
    if (err) res.end(err);
    else res.json(post);
  });
}

function update(req, res) {
  Post.findByIdAndUpdate(req.params.post_id,
    {$set: req.body}, function(err, post){
    if (err) res.send(err);
    else {
      console.log('updated post is ', post);
      res.json(post);
    }
  });
}

function destroy(req, res) {
  Post.findByIdAndRemove(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else {
      Post.find({user_id: post.user_id}, function(err, posts){
        if (err) res.send(err);
        else res.json(posts);
      });
    }
  });
}

module.exports.showAllPostsFromAUser = showAllPostsFromAUser;
module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
