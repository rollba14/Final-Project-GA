var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  description: String,
  tags: Array,
  created_date: {type: Date, default: Date.now},
  updated_date: Date,
  comments: [Comment.schema],
  user_id: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
