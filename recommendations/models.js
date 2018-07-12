"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const RecommendationSchema = mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  businessType: {
    type: String,
    required: true
  },
  recommendation: {
    type: String,
    default: ""
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  score: {
    type: Number,
    default: 0
  },
  image_url: {
    type: String,
    default: ""
  },
  yelp_url: {
    type: String,
    default: ""
  },
  yelp_id: {
    // TODO: YOU CAN USE THIS ID TO GET MORE STUFF FROM THE API
    type: String,
    default: ""
  }
});

RecommendationSchema.methods.serialize = function() {
  return {
    businessName: this.businessName || "",
    businessType: this.businessType || "",
    recommendation: this.recommendation || "",
    id: this._id || "",
    userId: this.userId || "",
    score: this.score || 0,
    image_url: this.image_url,
    yelp_url: this.yelp_url,
    yelp_id: this.yelp_id
  };
};

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);

module.exports = { Recommendation };
