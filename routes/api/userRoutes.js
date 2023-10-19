const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// https://localhost:3001/api/users
router.route("/").get(getUsers).post(createUser);

// https://localhost:3001/api/users/{id}
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// https://localhost:3001/api/users/:userId/friends/:friendId

router.route(":userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
