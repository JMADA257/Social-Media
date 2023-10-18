const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/thoughtController");

// https://localhost:3001/api/users
router.route("/").get(getUsers).post(createUser);

// https://localhost:3001/api/users/{id}
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
