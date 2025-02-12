const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    userName: {
      type: String,
      required: [true, "Name should be provided"],
    },
    userEmail: {
      type: String,
      required: [true, "Email should be provided"],
    },
    userPassword: {
      type: String,
      required: [true, "Password should be provided"],
    },
    userPhoneNumber: {
      type: Number,
      required: [true, "Phone number should be provied"],
    },
    role: {
      type: String,
      enum: ["player", "admin"],
      default: "player",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
