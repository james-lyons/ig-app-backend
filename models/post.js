const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post_text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    post_date: {
        type: Date,
        required: true,
        default: new Date
    },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;