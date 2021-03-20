const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfo = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userInfo);

module.exports = User;
