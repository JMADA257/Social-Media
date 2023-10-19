const router = require("express").Router();
const {
  //done
  getThoughts,

  //done
  getSingleThought,

  //done
  createThought,

  //done
  updateThought,

  //done
  deleteThought,

  //done
  addReaction,

  //done
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
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
