var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');
var passportLocal = require('../auth/local');


router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      console.log(res, "RES")
      return res.status(200).json({
        status: 'Registration successful!',
        // user: user
      });
    });
  });
});


router.post('/login', function(req, res, next) {
    // console.log('HHHHHH');
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      //new
      req.session.user = user;
      res.status(200).json({
        status: 'Login successful!',
        user: user
      });
    });
  })(req, res, next);
});

//*************************************************
//will not work with Angular
// router.post('/login', function(req, res, next) {
//  if (req.body.rememberMe) {
//    req.session.cookie.maxAge = config.cookieMaxAge;
//  }
//  next();
// }, passport.authenticate('local', {failureRedirect:'/', failureFlash: 'Invalid credentials', successRedirect:'/pics'
// }));

// //logout function destroys the cookie
// router.get('/logout', function(req, res, next) {
//  req.logout();
//  req.session.destroy();
//  res.redirect('/');
// });
//*************************************************


router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});


module.exports = router;
