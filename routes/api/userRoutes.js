const router = require("express").Router();
const {

  //done
  getUsers, 

  //done
  getSingleUser,

  //done
  createUser,

  //done
  updateUser,

  //done
  deleteUser,

  //done
  addFriend,

  //done
  deleteFriend,
} = require("../../controllers/userController");

// https://localhost:3001/api/users
router.route("/").get(getUsers).post(createUser);

// https://localhost:3001/api/users/{id}
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// https://localhost:3001/api/users/:userId/friends/:friendId

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
