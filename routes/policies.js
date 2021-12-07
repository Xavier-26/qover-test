const express = require('express');
const app = express();
const {forceLogin} = require("../config/auth.js")
const {getPrice, testMe} = require("../utils/computation.js")


app.get('/price', forceLogin, (req, res) => {
  const {age, car, price} = req.query
  try {
    const policyPrice = getPrice(age, car, price)
    res.render('results', {policyPrice});
  } catch(e) {
    res.render('qoverme', {message: e})
  }
})

app.get('/select-global', forceLogin, (_, res) => {
  res.send('Global plan selected!');
})

app.get('/select-universal', forceLogin, (_, res) => {
  res.send('Universal plan selected!');
})

app.get('/testme', (_, res) => {
  const testPassed = testMe() ? "Tests passed, good job" : "Tests failed";
  res.render('testme', {testPassed});
})

module.exports = app;
