module.exports = {
  getPrice: function (age, car, price) {
    if (age < 18)
      return null
    if (car == "Porsche" && age < 25)
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
}
