var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  username: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: String,
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
