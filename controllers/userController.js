const { Thought, User } = require("../models");

module.exports = {
  // https://localhost:3001/api/users    get route
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/users    post route
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/users/{id}    get route
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      })
        .select("-__v")
        .populate("thoughts");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/users/{id}    post route
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
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

  // https://localhost:3001/api/users/{id}    delete route
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      await Thought.deleteMany({
        _id: { $in: user.thoughts },
      });

      res.status(200).json({ message: "User successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/   post route
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that id." });
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // https://localhost:3001/api/   delete route
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that id." });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
