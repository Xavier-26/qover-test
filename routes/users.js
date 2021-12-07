const express = require('express');
const app = express();
const passport = require('passport');

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
})

app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Now logged out');
  res.redirect('/users/login');
})

module.exports = app;
