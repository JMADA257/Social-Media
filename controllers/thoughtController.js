const { Thought, User } = require("../models");

module.exports = {
  // https://localhost:3001/api/thoughts    get route
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/thoughts    post route
  async createThought(req, res) {
    try {
      let savedThought;
      if (Array.isArray(req.body)) {
        savedThought = [];
        for (const { thoughtText, username } of req.body) {
          const newThought = new Thought({
            thoughtText,
            username,
          });
          const currentThought = await newThought.save();
          savedThought.push(currentThought);

          const user = await User.findOneAndUpdate(
            { username },
            { $push: { thoughts: currentThought._id } },
            { new: true }
          );
          if (!user) {
            return res.status(404).json({
              message: "Thought created but no user found with that id",
            });
          }
        }
      } else {
        const { thoughtText, username } = req.body;

        const newThought = new Thought({
          thoughtText,
          username,
        });

        savedThought = await newThought.save();

        const user = await User.findOneAndUpdate(
          { username },
          { $push: { thoughts: savedThought._id } },
          { new: true }
        );

        if (!user) {
          return res.status(404).json({
            message: "Thought created but no user found with that id",
          });
        }
      }
      res.status(200).json(savedThought);
    } catch (err) {
      console.log(err);
      res.status(404).json(err);
    }
  },

  // https://localhost:3001/api/thoughts/{id}    get route
  async getSingleThought(req, res) {
    try {
      const singleThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!singleThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(singleThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/thoughts/{id}    post route
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/thoughts/{id}    delete route
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { runValidators: true, new: true }
      );
      res.status(200).json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/    post route
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id." });
      }
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/   delete route
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id." });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
