module.exports = {
  forceLogin: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Log in is mandatory');
    res.redirect('/users/login');
  }
}