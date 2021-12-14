const getPrice = function (age, car, carPrice) {
  console.log(age, car, carPrice)
  if (!age || !car || !carPrice)
      throw "Invalid parameters"
  if (age < 18)
    throw "Sorry! The driver is too young"
  if (car == "PORSCHE" && age < 25)
    throw "Sorry! We can not accept this particular risk"
  if (carPrice < 5000)
    throw "Sorry! The carPrice of the car is too low"
  let basePrice;
  let variable;
  switch (car) {
    case 'AUDI':
      basePrice = 250
      variable = 0.003;
      break;
    case 'BMW':
      basePrice = 150
      variable = 0.004;
      break;
    case 'PORSCHE':
      basePrice = 500
      variable = 0.007;
      break;
    default:
      return null;
  }
  console.log(basePrice, carPrice, variable, carPrice * variable)
  const globalPrice = basePrice;
  const universalPrice = basePrice + carPrice * variable;
  const globalPriceMonthly = globalPrice / 12;
  const universalPriceMonthly = universalPrice / 12;

  return { globalPrice, universalPrice, globalPriceMonthly, universalPriceMonthly }
}

module.exports = {
  getPrice,
  testMe: function () {
    let allPassed = true;
    const testNull = function (age, car, carPrice) {
      try {
        actual = getPrice(age, car, carPrice);
      } catch (e) {
        return true;
      }
      console.log("Test failed for ", age, car, carPrice)
      console.log(null, " <> ", actual);
      return false;
    };
    const testLambda = lambda => (expected, age, car, carPrice) => {
      try {
        actual = getPrice(age, car, carPrice);
      } catch (e) {
        console.log("Test failed for ", age, car, carPrice);
        return false
      }
      if (lambda(actual) != expected) {
        console.log("Test failed for ", age, car, carPrice);
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
    allPassed &= testUP(550, 30, b, 100000);
    allPassed &= testUPM(45.835, 30, b, 100005);
    return allPassed;
  }
}
