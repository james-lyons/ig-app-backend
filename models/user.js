const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username has already been taken."]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email has already been registered"]
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            require: true,
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            require: true,
        }
    ],
    signup_date: {
        type: Date,
        required: true,
        default: new Date
    },
    profile_picture: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;