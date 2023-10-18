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
      const user = await new User.Create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      populate("thoughts");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(singleUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      res.status(200).json({ message: "User successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
    } catch (error) {}
  },

  async deleteFriend(req, res) {
    try {
    } catch (error) {}
  },
};
