const { Thoughts, Users } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const singleThought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      });

      if (!post) {
        return res.status(404).json({ message: "No post with that ID" });
      }

      res.json(singleThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


















































  
};
