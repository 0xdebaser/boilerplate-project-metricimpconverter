const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  test("Convert 10L via GET request to /api/convert?input=10L", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: "L",
          returnNum: 2.64172,
          returnUnit: "gal",
          string: "10 liters converts to 2.64172 gallons",
        });
      });
    done();
  });
  test("Convert 32g (invalid input) via GET request to /api/convert?input=32g", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.text, "invalid unit");
      });
    done();
  });
  test("Convert 3/7.2/4kg (invalid input) via GET request to /api/convert?input=3/7.2/4kg", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.text, "invalid number");
      });
    done();
  });
  test("Convert 3/7.2/4kilomegagram (invalid input) via GET request to /api/convert?input=3/7.2/4kilomegagram", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.text, "invalid number and unit");
      });
    done();
  });
  test("Convert kg via GET request to /api/convert?input=kg", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: "kg",
          returnNum: Number((1 / 0.453592).toFixed(5)),
          returnUnit: "lbs",
          string: "1 kilograms converts to 2.20462 pounds",
        });
      });
    done();
  });
});
