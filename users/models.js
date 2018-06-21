'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''}
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
  img_url: {
    type: String,
    required: false
  }
  // recommendations: {
  //   type: Array
  // },
  // follows: {
  //   type: Array
  // }
});

UserSchema.methods.serialize = function() {
  return {
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    email: this.email || '',
    password: this.password || '',
    bio: this.bio || '',
    img_url: this.img_url || ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
