"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");
const { User } = require("../users");
const { TEST_DATABASE_URL } = require("../config");

const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe("/api/user", function() {
  const email = "test1@email.com";
  const password = "testPass1";
  const name= "Test";
  const emailB = "test2@email.com";
  const passwordB = "testPassB";
  const nameB= "TestB";

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function() {});

  afterEach(function() {
    return User.remove({});
  });

  describe("/api/users", function() {
    describe("POST", function() {
      it("Should reject users with missing email", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email: "",
            password,
            name
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal("Must be at least 1 characters long");
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should reject users with missing password", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            name
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal("Missing field");
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with non-string email", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email: 1234,
            password,
            name
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Incorrect field type: expected string"
            );
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should reject users with non-string password", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password: 1234,
            name
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Incorrect field type: expected string"
            );
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with non-string name", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password,
            name: 1234,
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Incorrect field type: expected string"
            );
            expect(res.body.location).to.equal("name");
          });
      });
      it("Should reject users with non-trimmed email", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email: ` ${email} `,
            password,
            name
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal("We noticed some blank spaces. You cannot start or end with these.");
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should reject users with non-trimmed password", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password: ` ${password} `,
            name
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal("We noticed some blank spaces. You cannot start or end with these.");
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with empty email", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email: "",
            password,
            name
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Must be at least 1 characters long"
            );
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should reject users with password less than six characters", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password: "123",
            name
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Must be at least 6 characters long"
            );
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with password greater than 72 characters", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password: new Array(73).fill("a").join(""),
            name
          })
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal(
              "Must be at most 72 characters long"
            );
            expect(res.body.location).to.equal("password");
          });
      });
      it("Should reject users with duplicate email", function() {
        // Create an initial user
        return User.create({
          email,
          password,
          name
        })
          .then(() =>
            // Try to create a second user with the same email
            chai
              .request(app)
              .post("/api/users")
              .send({
                email,
                password,
                name
              })
          )
          .then(() => expect.fail(null, null, "Request should not succeed"))
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal("ValidationError");
            expect(res.body.message).to.equal("This email is already taken");
            expect(res.body.location).to.equal("email");
          });
      });
      it("Should create a new user", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password,
            name
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.keys(
              "email",
              "name",
              "bio",
              "id",
              "image"
            );
            expect(res.body.email).to.equal(email);
            expect(res.body.name).to.equal(name);
            return User.findOne({
              email
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.name).to.equal(name);
            return user.validatePassword(password);
          })
          .then(passwordIsCorrect => {
            expect(passwordIsCorrect).to.be.true;
          });
      });
      it("Should trim name", function() {
        return chai
          .request(app)
          .post("/api/users")
          .send({
            email,
            password,
            name:` ${name} `
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.keys(
              "email",
              "name",
              "bio",
              "id",
              "image"
            );
            expect(res.body.email).to.equal(email);
            expect(res.body.name).to.equal(name);
            return User.findOne({
              email
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.name).to.equal(name);
          });
      });
    });
  });
});
