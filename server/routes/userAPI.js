var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');
var passportLocal = require('../auth/local');


//register
router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      // console.log(err);
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      // console.log(res, "RES");
      return res.status(200).json({
        status: 'Registration successful!',
        // user: user
      });
    });
  });
});


//login
router.post('/login', function(req, res, next) {
    // console.log('HHHHHH');
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      // console.log(err);
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


//Working - shows current logged in user
router.get('/getuser', function(req, res, next){
  // if (err) {
  //   console.log(err);
  //   return next(err);
  // }
  if (!req.user) {
    // console.log("No one is logged in");
  }
  return res.status(200).json({message: req.user.username});
  // console.log(req.user.username, "REC USER USERNAME");

});


//logout
router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});


module.exports = router;
