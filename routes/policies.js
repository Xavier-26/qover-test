const express = require('express');
const app = express();
const {forceLogin} = require("../config/auth.js")
const {getPrice, testMe} = require("../utils/computation.js")


app.get('/price', forceLogin, (req, res) => {
  const {age, car, price} = req.query
  try {
    const policyPrice = getPrice(age, car, price)
  } catch(e) {
    res.render('qoverme', {message: e})
  }
  res.render('results', {policyPrice});
})

app.get('/testme', (_, res) => {
  const testPassed = testMe() ? "Tests passed, good job" : "Tests failed";
  res.render('testme', {testPassed});
})

module.exports = app;
