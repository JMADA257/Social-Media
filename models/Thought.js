const { Schema, models } = require("mongoose");

// Schema to create Student model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => new Date(date).toLocalString(),
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = thoughtsSchema;
