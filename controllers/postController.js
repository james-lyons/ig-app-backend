// SECTION Modules

const db = require("../models");

// SECTION Controllers

// Create a Post

const createPost = (req, res) => {
  db.Post.create(
    { user: req.session.currentUser.id, ...req.body },
    (err, foundPost) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong, please try again"
        });

      res.status(200).json({
        status: 200,
        messsage: "Post Created",
        data: foundPost
      });
    }
  );
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
  db.Post.findById(req.params.post_id, (err, foundPost) => {
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

const findPost = (req, res) => {
  db.Post.findById(req.params.post_id, (err, foundPost) => {
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

// Delete a Post

module.exports = {
  indexPosts,
  findPost,
  createPost,
  EditPost,
  DeletePost
};
