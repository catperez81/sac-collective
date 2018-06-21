"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || "",
    firstName: this.firstName || "",
    lastName: this.lastName || ""
  };
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
