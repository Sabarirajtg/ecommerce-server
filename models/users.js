const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  purchases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Purchase",
    },
  ],
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
