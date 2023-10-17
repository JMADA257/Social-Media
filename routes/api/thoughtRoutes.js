const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/users");

// https://localhost:3001/api/thoughts
router.route("/").get(getThoughts).post(createThought);

// https://localhost:3001/api/students
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
