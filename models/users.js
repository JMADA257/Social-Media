const { Schema, Types } = require("mongoose");

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not valid`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //need email verification
    },
    thoughts: {},
    friends: {},
  },
  {
    toJSON: {
      getters: true,
    },
    //dont know what to put here yet
  }
);

module.exports = userSchema;
