// SECTION Modules

const db = require("../models");

// SECTION Controllers

// Create a Post

const createPost = (req, res) => {
  const post = {
    user: req.session.currentUser._id,
    image: req.body.image,
    post_text: req.body.post_text
  };

  db.Post.create(post, (err, createdPost) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again."
      });

    db.User.findById(req.session.currentUser._id, (err, foundUser) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong, please try again."
        });
      foundUser.posts.push(createdPost._id);
      foundUser.save();
    });

    res.status(201).json({
      status: 201,
      message: "post successfully created.",
      data: createdPost
    });
  });
};

// Index Posts

const indexPosts = (req, res) => {
  db.Post.find({}, (err, foundPosts) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again"
      });

    res.status(200).json({
      status: 200,
      messsage: "Posts successfully found.",
      data: foundPosts
    });
  });
};

// Find a Post

const findPost = (req, res) => {
  db.Post.findById(req.params.id, (err, foundPost) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again"
      });

    res.status(200).json({
      status: 200,
      messsage: "Post successfully found.",
      data: foundPost
    });
  });
};

// Edit a Post

const editPost = (req, res) => {
  db.Post.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again"
      });

    res.status(200).json({
      status: 200,
      messsage: "Post successfully updated.",
      data: updatedPost
    });
  });
};

// Delete a Post

const deletePost = (req, res) => {
  db.Post.findByIdAndDelete(req.params.post_id, (err, deletedPost) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again"
      });

    res.status(200).json({
      status: 200,
      messsage: "Post successfully deleted.",
      data: deletedPost
    });
  });
};

module.exports = {
  indexPosts,
  findPost,
  createPost,
  editPost,
  deletePost
};
