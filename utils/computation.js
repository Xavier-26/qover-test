const getPrice = function (age, car, price) {
  if (!age || !car || !price)
      throw "Invalid parameters"
  if (age < 18)
    throw "Sorry! The driver is too young"
  if (car == "PORSCHE" && age < 25)
    throw "Sorry! We can not accept this particular risk"
  if (price < 5000)
    throw "Sorry! The price of the car is too low"
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
  const universalPrice = basePrice + price * variable;
  const globalPriceMonthly = globalPrice / 12;
  const universalPriceMonthly = universalPrice / 12;

  return { globalPrice, universalPrice, globalPriceMonthly, universalPriceMonthly }
}

module.exports = {
  getPrice,
  testMe: function () {
    let allPassed = true;
    const testNull = function (age, car, price) {
      try {
        actual = getPrice(age, car, price);
      } catch (e) {
        return true;
      }
      console.log("Test failed for ", age, car, price)
      console.log(null, " <> ", actual);
      return false;
    };
    const testLambda = lambda => (expected, age, car, price) => {
      try {
        actual = getPrice(age, car, price);
      } catch (e) {
        console.log("Test failed for ", age, car, price);
        return false
      }
      if (lambda(actual) != expected) {
        console.log("Test failed for ", age, car, price);
        console.log(expected, " <> ", actual);
        return false;
      } else {
        return true;
      }
    };
    const getGP = e => e.globalPrice;
    const testGP = testLambda(getGP);
    const getUP = e => e.universalPrice;
    const testUP = testLambda(getUP);
    const getUPM = e => e.universalPriceMonthly;
    const testUPM = testLambda(getUPM);
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
    allPassed &= testUP(104150.0, 30, b, 100000);
    allPassed &= testUPM(8679.6, 30, b, 100005);
    return allPassed;
  }
}
