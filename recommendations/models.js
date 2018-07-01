"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const RecommendationSchema = mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    unique: true
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
  }
});

RecommendationSchema.methods.serialize = function() {
  return {
    businessName: this.businessName || '',
    businessType: this.businessType || '',
    recommendation: this.recommendation || '',
    id: this._id || '',
    userId: this.userId || '',
    score: this.score || 0
  };
};

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);

module.exports = { Recommendation };
