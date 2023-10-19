const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// https://localhost:3001/api/thoughts
router.route("/").get(getThoughts).post(createThought);

// https://localhost:3001/api/thoughts/{id}
router
  .route("/:thoughtId")

  .get(getSingleThought)

  .put(updateThought)

  .delete(deleteThought);

// https://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// https://localhost:3001/api/thoughts/:thoughtId/reactions/reactionId
router.route("/:thoughtId/reactions/reactionId").delete(deleteReaction);

module.exports = router;
