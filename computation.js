const getPrice = function (age, car, price) {
  if (age < 18)
    return null
  if (car == "PORSCHE" && age < 25)
    return null
  if (price < 5000)
    return null
  let basePrice = 250
  let variable = 1.03;
  switch (car) {
    case 'AUDI':
      basePrice = 250
      variable = 1.03;
      break;
    case 'BMW':
      basePrice = 150
      variable = 1.04;
      break;
    case 'PORSCHE':
      basePrice = 500
      variable = 1.07;
      break;
    default:
      return null;
  }

  const globalPrice = basePrice;
  const universalPrice = basePrice * variable;
  const globalPriceMonthly = globalPrice / 12;
  const universalPriceMonthly = universalPrice / 12;

  return { globalPrice, universalPrice, globalPriceMonthly, universalPriceMonthly }
}

module.exports = {
  getPrice,
  testMe: function () {
    let allPassed = true;
    const testNull = function (age, car, price) {
      actual = getPrice(age, car, price);
      if (actual != null) {
        console.log("Test failed for ", age, car, price)
        console.log(null, " <> ", actual);
      }
      return actual == null;
    };
    const testGP = function (expected, age, car, price) {
      actual = getPrice(age, car, price);
      if (actual.globalPrice != expected) {
        console.log("Test failed for ", age, car, price);
        console.log(expected, " <> ", actual);
        return false;
      } else {
        return true;
      }
    };
    const p = "PORSCHE";
    const a = "AUDI";
    const b = "BMW";
    allPassed &= testNull(15, p, 5000);
    allPassed &= testNull(12, b, 5000);
    allPassed &= testNull(23, p, 5000);
    allPassed &= testNull(25, a, 4000);
    allPassed &= testNull(25, p, 3000);
    allPassed &= testGP(250, 18, a, 5000);
    allPassed &= testGP(250, 18, a, 15000);
    allPassed &= testGP(250, 20, a, 15000);
    allPassed &= testGP(500, 30, p, 15000);
    allPassed &= testGP(150, 30, b, 150000);
    return allPassed;
  }
}
