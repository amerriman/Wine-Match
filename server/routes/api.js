var express = require('express');
var router = express.Router();
var User = require('../models/user');


//get ALL users
router.get('/users', function(req, res, next){
  User.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


//get ONE user
router.get('/user/:id', function(req, res, next){
  User.findById(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

//may need to make this like the flash cards - look for it and if it exists just update the wines, otherwise make a new one
//POST one
router.post('/users', function(req, res, next){
  // console.log(req.body.wines[0].wineName, "HERE");
  // console.log(req.body.wines[0].recipes[0], "HERE");
  var newUser = new User ({
    name: req.body.name,
    password: req.body.password,
      wines:{
        wineName: req.body.wineName,
        image: req.body.image,
        varietal: req.body.varietal,
        vintage: req.body.vintage,
        code: req.body.code,
        notes: req.body.notes,
        score: req.body.score,
        recipes: req.body.recipes

      }
  });
  newUser.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({"SUCCESS": data});
    }
  });
});


//update ONE user
router.put('/user/:id', function(req, res, next){
  var query = {"_id": req.params.id};
  var update = {
    name: req.body.name,
    password: req.body.description,
    $push: {
      wines:{
        wineName: req.body.wineName,
        image: req.body.image,
        varietal: req.body.varietal,
        vintage: req.body.vintage,
        code: req.body.code,
        notes: req.body.notes,
        score: req.body.score,
        $push: {
          recipes:{
            title: req.body.title,
            sourceLink: req.body.sourceLink,
            foodImage: req.body.foodImage
          }
        }
      }
    }
  };
  var options = {new: true};
  User.findOneAndUpdate(query, update, options, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({'UPDATED' : data});
    }
  });
});


//delete ONE user
router.delete('/user/:id', function(req, res, next){
  User.findOneAndRemove(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({'REMOVED' : data});
    }
  });
});


//helper function
function createOptions(inputFields){

}


module.exports = router;
