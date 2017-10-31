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

// REQUIRE AUTH //
function create(req, res) {
  // PASSPORT VERSION
  // if(allowedUser(req.body.author)){
  //   Post.create(req.body, function(err, post){
  //     if (err) res.end(err);
  //     else {
  //       var p = formatPost(post);
  //       res.json(p);
  //       }
  //   });
  // }else{
  //   res.send({message:"You are unauthorized."})
  // }

  // Nonsecured version
  Post.create(req.body, function(err, post){
    if (err) res.end(err);
    else {
      res.json(post);
      }
  });
}

// REQUIRE AUTH //
function update(req, res) {
  // if(allowedUser(req.body.author)){
  //   Post.findByIdAndUpdate(req.params.post_id,
  //     {$set: req.body}, function(err, post){
  //     if (err) res.send(err);
  //     else {
  //       console.log('updated post is ', post);
  //       var p = formatPost(post);
  //       res.json(p);
  //     }
  //   });
  // }else{
  //   res.send({message:"You are unauthorized."})
  // }

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
  // if(allowedUser(req.body.author)){
  //   Post.findByIdAndRemove(req.params.post_id, function(err, post){
  //     if (err) res.send(err);
  //     else {
  //       var p = formatPost(post);
  //       res.json(p);
  //     }
  //   });
  // } else{
  //   res.send({message:"You are unauthorized."})
  // }
  console.log('inside post controller');
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

module.exports.showAllPostsFromAUser = showAllPostsFromAUser;
module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
