var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var Comment = require('./comment');


var PostSchema = new Schema({
  title: String,
  description: String,
  image_url: String,
  place: Object,
  tags: Array,
  created_date: {type: Date, default: Date.now},
  updated_date: Date,
  author: String,
  comments: [Comment.schema],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
