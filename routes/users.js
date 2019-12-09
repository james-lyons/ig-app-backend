const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const authRequired = require("../middleware/authRequired");

// SECTION Post Routes
router.get("/", ctrl.users.indexUsers);
router.get("/:id", ctrl.users.showUser);
router.put("/:id", ctrl.users.updateUser);

router.put("/follow/:id", ctrl.follow.followUser);
router.put("/unfollow/:id", ctrl.follow.unfollowUser);

module.exports = router;
