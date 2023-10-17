const router = require("express").Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/thoughts.js");

// /api/courses
router.route("/").get(getUser).post(createUser);

// /api/courses/:courseId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
