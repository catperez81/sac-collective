"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const { User } = require("./models");
const router = express.Router();
const jsonParser = bodyParser.json();
const passport = require("passport");
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get("/follow", jwtAuth, (req, res) => {
  var loggedUser = {};
  return User.findById(req.user.id)
    .then(_loggedUser => {
      loggedUser = _loggedUser;
      return User.find();
    })
    .then(users => {
      let filteredUsers = users
        .map(user => user.serialize())
        .filter(user => user.id != req.user.id)
        .filter(user => loggedUser.follows.indexOf(user.id) < 0);
      return res.json(filteredUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/following", jwtAuth, (req, res) => {
  return User.findById(req.user.id)
    .populate("follows")
    .then(loggedUser => {
      let following = loggedUser.follows
        .map(user => user.serialize())
        .filter(user => user.id != req.user.id);
      return res.json(following);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/follow", jwtAuth, jsonParser, (req, res) => {
  let newFollow = req.body.followId;
  User.findById(req.user.id)
    .then(user => {
      var exists = user.follows.find(item => item === newFollow);
      if (!exists && req.body.type === "follow") {
        user.follows.push(newFollow);
      } else if (exists && req.body.type === "unfollow") {
        let index = user.follows.indexOf(newFollow);
        user.follows.splice(index, 1);
      }
      return user.save();
    })
    .then(user => User.findById(newFollow))
    .then(recommendation => res.json(recommendation.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

// Post to register a new user
router.post("/", jsonParser, (req, res) => {
  const requiredFields = ["email", "password"];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: "ValidationError",
      message: "Missing field",
      location: missingField
    });
  }

  const stringFields = ["email", "password", "name", "image", "bio"];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== "string"
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: "ValidationError",
      message: "Incorrect field type: expected string",
      location: nonStringField
    });
  }

  const explicityTrimmedFields = ["email", "password"];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: "ValidationError",
      message:
        "We noticed some blank spaces. You cannot start or end with these.",
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    email: {
      min: 1
    },
    password: {
      min: 6,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      "min" in sizedFields[field] &&
      req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      "max" in sizedFields[field] &&
      req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: "ValidationError",
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
        : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }
  //change to actual fields//
  let { email, password, name = "", image = "", bio = "" } = req.body;
  name = name.trim();
  image = image.trim();
  bio = bio.trim();

  return User.find({ email })
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same email
        return Promise.reject({
          code: 422,
          reason: "ValidationError",
          message: "This email is already taken",
          location: "email"
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        email,
        password: hash,
        name,
        image,
        bio
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      if (err.reason === "ValidationError") {
        return res.status(err.code).json(err);
      }
      console.log(err);
      res.status(500).json({ code: 500, message: "Internal server error" });
    });
});

router.get("/", (req, res) => {
  console.log(req.query);
  return User.find()
    .then(users => {
      return res.json(users.map(user => user.serialize()));
    })
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

module.exports = { router };
