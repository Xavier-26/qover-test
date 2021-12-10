const express = require('express');
const app = express();
const passport = require('passport');


app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err)
      return
    }
    if (!user) {
      res.send(info)
      return
    }

    req.logIn(user, err => {
      if (err) next(err)
      else res.send({ message: null, token: "123" })
    })
  })(req, res, next)
})

app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Now logged out');
  res.redirect('/users/login');
})

module.exports = app;
