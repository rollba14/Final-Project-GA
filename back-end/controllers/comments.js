var db = require('../models');
var Post = db.Post;
var User = db.User;
var Comment = db.Comment;


function index(req, res) {
  Comment.find({},function(err, comments) {
    if (err) {
      console.log('inside error');
      res.send(err);
    }
    else {
      console.log('all comments ', comments);
      // let ps = posts.map(p=>{
      //   return formatPost(p)
      // })
      res.json(comments);
    }
  });
}

function show(req, res) {
  Post.findById(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else res.json(post.comments);
  });
}

// REQUIRE AUTH //
function create(req, res) {
  // find the post from the post id
  // add the comment to that post
  Post.findById(req.params.post_id,function(err,post){
    if(err)res.send(err)
    let comment = new db.Comment(req.body)
    post.comments.push(comment);
    post.save(function(err,savedPost){
      if(err){
        console.log('create comment error: ', err);
        res.send(err);
      }
      res.json(comment);
    });
  });
};

// REQUIRE AUTH //
function update(req, res) {
  Post.findByIdAndUpdate(req.params.post_id,
    {$set: req.body}, function(err, post){
    if (err) res.send(err);
    else {
      res.json(post);
    }
  });
}

// REQUIRE AUTH //
function destroy(req, res) {

  Post.findByIdAndRemove(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else {
      res.json(post);
    }
  });

}

function allowedUser(post_author){
  User.find({username: post_author},function(err,user){
    if (err) res.send(err);
    else {
      // check if user is same as the post they want modify.
      if(user._id !== req.session.passport.user){
        return false;
      }else
      return true;
    }
  });
};

function formatPost(post){
  return  {
    title: post.title,
    description: post.description,
    image_url: post.image_url,
    place: post.place,
    tags: post.tags,
    created_date: post.created_date,
    updated_date: post.updated_date,
    author: post.author,
    comments: post.comments,
  }
}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
