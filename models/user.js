const mongoose = require("mongoose");
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
  profile_picture: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      require: true
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      require: true
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true
    }
  ],
  signup_date: {
    type: Date,
    required: true,
    default: new Date()
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
