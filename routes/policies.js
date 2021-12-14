const express = require('express');
const app = express();
const {getPrice, testMe} = require("../utils/computation.js")

app.get('/price', (req, res) => {
    const {age, car, price} = req.query
    try {
      const policyPrice = getPrice(age, car, price)
      res.send({res: policyPrice});
    } catch(e) {
      res.send({message: e})
    }
  })

app.get('/select-global', (_, res) => {
  res.send('Global plan selected!');
})

app.get('/select-universal', (_, res) => {
  res.send('Universal plan selected!');
})

app.get('/testme', (_, res) => {
  const testPassed = testMe() ? "Tests passed, good job" : "Tests failed";
  res.send(testPassed);
})

module.exports = app;
