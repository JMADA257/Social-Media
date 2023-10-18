const { Thought, User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const singleUser = await User.findOne({
        _id: req.params.thoughtId,
      });

      if (!post) {
        return res.status(404).json({ message: "No post with that ID" });
      }

      res.json(singleUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
