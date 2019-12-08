const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment_text: {
        type: String,
        required: true
    },
    post_date: {
        type: Date,
        required: true,
        default: new Date
    },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;