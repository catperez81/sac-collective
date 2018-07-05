"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const { Recommendation } = require("./models");
const passport = require("passport");
const router = express.Router();
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get("/", jwtAuth, (req, res) => {
  Recommendation.find()
    .then(recommendations => {
      res.json(
        recommendations.map(recommendation => recommendation.serialize())
      );
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

router.get("/:id", (req, res) => {
  Recommendation.findById(req.params.id)
    .then(recommendation => res.json(recommendation.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

router.post("/", jsonParser, (req, res) => {
  //change to actual fields//
  const requiredFields = ["businessName", "businessType", "recommendation"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Recommendation.create({
    businessName: req.body.businessName,
    businessType: req.body.businessType,
    recommendation: req.body.recommendation
  })
    .then(recommendation => res.status(201).json(recommendation.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.put("/:id", jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  //change to actual fields//
  const updateableFields = ["businessName", "businessType", "recommendation"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Recommendation.findByIdAndUpdate(
    req.params.id,
    { $set: updated },
    { new: true }
  )
    .then(updatedRecommendation => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

router.delete("/:id", (req, res) => {
  Recommendation.findByIdAndDelete(req.params.id)
    .then(deletedRecommendation => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

module.exports = { router };
