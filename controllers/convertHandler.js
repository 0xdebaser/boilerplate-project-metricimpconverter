function ConvertHandler() {
  this.getNum = function (input) {
    const splitIndex = input.search(/[a-zA-Z]/);
    let numSplit;
    if (splitIndex === -1) numSplit = input;
    else if (splitIndex === 0)
      return 1; // handles case if only unit is specified
    else numSplit = input.slice(0, splitIndex);
    const decimals = numSplit.match(/\./g) ? numSplit.match(/\./g).length : 0;
    const slashes = numSplit.match(/\//g) ? numSplit.match(/\//g).length : 0;
    if (decimals > 1 || slashes > 1) return "invalid number";
    const result = eval(numSplit);
    return result;
  };

  this.getUnit = function (input) {
    let result;
    if (input.includes("gal")) result = "gal";
    else if (input.includes("L")) result = "L";
    else if (input.includes("lbs")) result = "lbs";
    else if (input.includes("kg")) result = "kg";
    else if (input.includes("mi")) result = "mi";
    else if (input.includes("km")) result = "km";
    else result = "invalid unit";
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }
    result = Number(result.toFixed(5));
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
