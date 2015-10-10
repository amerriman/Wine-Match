var express = require('express');
var router = express.Router();

var passportGithub = require('../auth/github');


router.get('/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });



module.exports = router;

