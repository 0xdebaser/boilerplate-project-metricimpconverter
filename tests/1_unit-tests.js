const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  this.timeout(5000);
  test("Correctly read a whole number input", () => {
    assert.strictEqual(convertHandler.getNum("3mi"), 3);
  });
  test("Correctly read a decimal number input", () => {
    assert.strictEqual(convertHandler.getNum("2.2gal"), 2.2);
  });
  test("Correctly read a fractional input", () => {
    assert.strictEqual(convertHandler.getNum("3/4"), 0.75);
  });
  test("Correctly read a fractional input with a decimal", () => {
    assert.strictEqual(convertHandler.getNum("3.5/4km"), 0.875);
  });
  test("Correctly return an error on a double fraction", () => {
    assert.equal(convertHandler.getNum("3/4/5"), "invalid number");
  });
  test("Correctly default to numberical input of 1 when no numerical input is provided", () => {
    assert.strictEqual(convertHandler.getNum("kg"), 1);
  });
  test("Correctly read each valid input unit", () => {
    assert.equal(convertHandler.getUnit("1gal"), "gal");
    assert.equal(convertHandler.getUnit("2L"), "L");
    assert.equal(convertHandler.getUnit("3.3lbs"), "lbs");
    assert.equal(convertHandler.getUnit("4/5kg"), "kg");
    assert.equal(convertHandler.getUnit("6.77mi"), "mi");
    assert.equal(convertHandler.getUnit("8km"), "km");
  });
  test("Correctly return an error for an invalid input unit", () => {
    assert.equal(convertHandler.getUnit("9.9gigawatts"), "invalid unit");
  });
  test("Correctly return the return unit for each valid input unit", () => {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
  });
  test("Correctly return the spelled-out string unit for each valid input unit", () => {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
  });
  test("Correctly convert gal to L", () => {
    assert.strictEqual(
      convertHandler.convert(1, "gal"),
      Number((3.78541).toFixed(5))
    );
  });
  test("Correctly convert L to gal", () => {
    assert.strictEqual(
      convertHandler.convert(1, "L"),
      Number((1 / 3.78541).toFixed(5))
    );
  });
  test("Correctly convert mi to km", () => {
    assert.strictEqual(
      convertHandler.convert(1, "mi"),
      Number((1.60934).toFixed(5))
    );
  });
  test("Correctly convert km to mi", () => {
    assert.strictEqual(
      convertHandler.convert(1, "km"),
      Number((1 / 1.60934).toFixed(5))
    );
  });
  test("Correctly convert lbs to kg", () => {
    assert.strictEqual(
      convertHandler.convert(1, "lbs"),
      Number((0.453592).toFixed(5))
    );
  });
  test("Correctly convert kg to lbs", () => {
    assert.strictEqual(
      convertHandler.convert(1, "kg"),
      Number((1 / 0.453592).toFixed(5))
    );
  });
});
