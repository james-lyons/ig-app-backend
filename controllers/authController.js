const bcrypt = require("bcryptjs");
const validate = require("../validation/register");
const db = require("../models");

// POST Register Route
const register = (req, res) => {
  const { errors, notValid } = validate(req.body);
  // Validate Form Data
  if (notValid) {
    return res.status(400).json({ status: 400, errors });
  }
  // Verify Account Does Not Already Exist
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err)
      return res
        .status(500)
        .json({
          status: 500,
          message: "Something went wrong. Please try again"
        });
    if (foundUser)
      return res
        .status(400)
        .json({
          status: 400,
          message: "Email address has already been registered. Please try again"
        });
    // Generate Salt (Asynchronous callback version)
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res
          .status(500)
          .json({
            status: 500,
            message: "Something went wrong. Please try again"
          });
      // if (err) throw err;
      // Hash User Password
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err)
          return res
            .status(500)
            .json({
              status: 500,
              message: "Something went wrong. Please try again"
            });
        const newUser = {
          username: req.body.username,
          name: req.body.name,
          email: req.body.email,
          password: hash
        };
        db.User.create(newUser, (err, savedUser) => {
          if (err) {
            if (err.code === 11000)
              return res
                .status(400)
                .json({
                  status: 400,
                  message: "Username already exists. Please try another one"
                });
            return res.status(500).json({ status: 500, message: err });
          }
          res.status(201).json({ status: 201, message: "success" });
        });
      });
    });
  });
};
// POST Login Route
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ status: 400, message: "Please enter your email and password" });
  }
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err)
      return res
        .status(500)
        .json({
          status: 500,
          message: "Something went wrong. Please try again"
        });
    if (!foundUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Username or password is incorrect" });
    }
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err)
        return res
          .status(500)
          .json({
            status: 500,
            message: "Something went wrong. Please try again"
          });
      if (isMatch) {
        req.session.loggedIn = true;
        req.session.currentUser = { id: foundUser._id };
        return res
          .status(200)
          .json({ status: 200, message: "Success", id: foundUser._id });
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "Username or password is incorrect" });
      }
    });
  });
};
// POST Logout Route
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err)
      return res.json({
        status: 400,
        message: "Something went wrong. Please try again"
      });
    res.sendStatus(200);
  });
};
// GET Verify User Route
const verify = (req, res) => {
  if (!req.session.currentUser)
    return res.status(401).json({ status: 401, message: "unauthorized" });
  res
    .status(200)
    .json({
      status: 200,
      message: `Current user verified. User ID = ${req.session.currentUser.id}`
    });
};
module.exports = {
  register,
  login,
  logout,
  verify
};
