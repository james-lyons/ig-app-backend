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
      foundUser.following.push(req.params.id);
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

module.exports = {
  followUser,
  unfollowUser
};
