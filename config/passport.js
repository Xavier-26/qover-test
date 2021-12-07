const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/user.js");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
      User.findOne({ username: username })
        .exec((err, user) => {
          if (!user) {
            return done(null, false, { message: 'username is not registered' });
          }
          if (password == user.password) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'password incorrect' });
          }
        })
    })
  )
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};