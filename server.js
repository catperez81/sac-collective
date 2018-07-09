"use strict";
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const { router: usersRouter } = require("./users");
const { router: recommendationsRouter } = require("./recommendations");
const { router: authRouter, localStrategy, jwtStrategy } = require("./auth");
const { PORT, DATABASE_URL } = require("./config");
const yelp = require("yelp-fusion");
const yelp_api = yelp.client(
  "My4Qn7b3BQGwqQaY5XL7eS2eMvBgik7So0fyleJUTeNJ24YRoeCTs0e8vSF7scVrPUSkQ7dnrvfUnsP_Gt3nL_qOENlTGUVPwG4t4qCVM48DuPOSp05iDuRouv3MWnYx"
);

mongoose.Promise = global.Promise;
const app = express();
app.use(morgan("common")); // Logging

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});

app.use(express.static("public"));

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api/users/", usersRouter);
app.use("/api/recommendations/", recommendationsRouter);
app.use("/api/auth/", authRouter);

const jwtAuth = passport.authenticate("jwt", { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get("/api/protected", jwtAuth, (req, res) => {
  return res.json({
    data: "rosebud"
  });
});

// A protected endpoint which needs a valid JWT to access it
app.get("/api/yelp", (req, res) => {
  console.log(req.query);
  console.log(req.params);

  yelp_api
    .search({
      term: req.query.term,
      location: "Sacramento, CA"
    })
    .then(response => {
      res.json(response.jsonBody.businesses);
    })
    .catch(e => {
      res.send("error");
      console.log(e);
    });

  // return res.json({
  //   data: "rosebud"
  // });
});

app.use("*", (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
