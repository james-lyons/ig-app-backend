const db = require("../models");
const validate = require("../validation/register");
const path = require("path");
const fs = require("fs");

//GET get user
const showUser = (req, res) => {
  db.User.findById(req.params.id, { password: 0, __v: 0 }, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again"
      });

    res.status(200).json({ status: 200, data: foundUser });
  });
};

//GET search users
const indexUsers = async (req, res) => {
  db.User.find({}, (err, foundUsers) => {
    if (err) return res.status(500).json({
      status: 500,
      message: 'Something went wrong, please try again.'
    });

    res.status(200).json({
      status: 200,
      message: 'Users successfully found.',
      data: foundUsers
    });
  });
};

//POST update user
const updateUser = async (req, res) => {
  try {
    //find the user
    const user = await db.User.findById(req.session.currentUser.id);

    const { errors, notValid } = validate(req.body);

    // Validate Form Data
    if (notValid) {
      return res.status(400).json({ status: 400, errors });
    }

    //update user
    user.username = req.body.username;
    user.email = req.body.email;

    //check the updated image file
    if (req.body.avatar) {
      const fileName = path.basename(req.body.avatar);
      const fileExists = await fs.existsSync(
        `${__dirname}/../uploads/tmp/${fileName}`
      );
      if (fileExists) {
        //move image to the /uploads/posts folder
        await fs.renameSync(
          `${__dirname}/../uploads/tmp/${fileName}`,
          `${__dirname}/../uploads/users/${fileName}`
        );
        const imageDir = `uploads/users/${fileName}`;

        //delete previous avatar
        if (user.avatar !== "uploads/default/user.png") {
          fs.unlink(user.avatar, err => {
            console.log(err);
          });
        }

        user.avatar = imageDir;
      }
    }

    //save user
    try {
      const savedUser = await user.save();
      res.json({ status: 200, message: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "Interanal Server Error" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, message: "User not found" });
  }
};

module.exports = {
  // showCurrent,
  showUser,
  indexUsers,
  updateUser
};
