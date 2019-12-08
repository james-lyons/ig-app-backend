const bcrypt = require("bcryptjs");
const validate = require("../validation/register");
const db = require("../models");

// POST Register Route
const register = (req, res) => {
  const { errors, notvalid } = validate(req.body);

  if (notValid) {
    return res.status(400).json({ status: 400, errors });
  }

  db.User.findOne({ email: req.body.email }, (err, foundUser) => {});
};
