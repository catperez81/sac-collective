"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

function timeStamp(now) {
  var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
  var time = [now.getHours(), now.getMinutes()];
  var suffix = time[0] < 12 ? "AM" : "PM";
  time[0] = time[0] < 12 ? time[0] : time[0] - 12;
  time[0] = time[0] || 12;
  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }
  return date.join("/") + " " + time.join(":") + " " + suffix;
}

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
  user: {
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
    // FUTURE TODO: YOU CAN USE THIS ID TO GET MORE STUFF FROM THE API
    type: String,
    default: ""
  },
  creationDate: {
    type: Date,
    default: new Date()
  },
  votes: {
    type: Object,
    default: {}
  }
});

RecommendationSchema.virtual("vote_score").get(function(req) {
  var voters = Object.keys(this.votes);
  var res = voters.reduce(
    (accummulator, voterId) => accummulator + this.votes[voterId],
    0
  );
  return res;
});

RecommendationSchema.methods.serialize = function() {
  return {
    businessName: this.businessName || "",
    businessType: this.businessType || "",
    recommendation: this.recommendation || "",
    id: this._id || "",
    user: this.user || "",
    score: this.score || 0,
    image_url: this.image_url,
    yelp_url: this.yelp_url,
    yelp_id: this.yelp_id,
    creationDate: timeStamp(this.creationDate),
    votes: this.votes,
    vote_score: this.vote_score || 0
  };
};

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);

module.exports = { Recommendation };
