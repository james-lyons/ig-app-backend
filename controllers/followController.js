// SECTION db

const db = require("../models");

// SECTION methods

const followUser = (req, res) => {
  db.User.findByIdAndUpdate(
    req.session.currentUser._id,
    req.body,
    (err, foundUser) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong, please try again"
        });
      foundUser.following.push(req.body.followerid);
      foundUser.save();
    }
  );
  db.User.findByIdAndUpdate(req.params.id, req.body, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again"
      });
    foundUser.following.push(req.session.currentUser._id);
    foundUser.save();
  });
};

const unfollowUser = (req, res) => {
  db.User.findByIdAndUpdate(
    req.session.currentUser._id,
    req.body,
    (err, foundUser) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong, please try again"
        });
      foundUser.following.remove(req.params.id);
      foundUser.save();
    }
  );
  db.User.findByIdAndUpdate(req.params.id, req.body, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again"
      });
    foundUser.following.remove(req.session.currentUser._id);
    foundUser.save();
  });
};

const likePost = (req, res) => {
  db.Post.findById(req.params.id, (err, foundPost) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again"
      });
    const currentUserLike = req.session.currentUser.id;
    foundPost.likes.push(currentUserLike);
    foundPost.save();

    res.status(200).json({
      message: "Liked Successfully",
      likes: foundPost.likes
    });
  });
};

module.exports = {
  followUser,
  unfollowUser,
  likePost
};
