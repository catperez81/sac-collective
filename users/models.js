"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  name: { type: String, default: "" },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  }
  // items: {
  //   type: Array
  // },
  // follows: {
  //   type: Array
  // }
});

UserSchema.methods.serialize = function() {
  return {
    name: this.name || "",
    email: this.email || "",
    bio: this.bio || "",
    image: this.image || ""
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
