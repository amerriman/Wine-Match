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


//req.params.id
//get ONE user
router.get('/user/:id', function(req, res, next){
  query = {username: req.user.username};
  User.findOne(query, function(err, data){
    console.log(query, "Query in get one");
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

//look for user and if it exists just update the wines, otherwise make a new one
//POST one
router.post('/users', function(req, res, next){
//How to query logged in user?
  var query = {username: req.user.username};
  var options = {upsert: true, new: true};
  var update = {
      $push: { wines:{
        wineName: req.body.wineName,
        image: req.body.image,
        varietal: req.body.varietal,
        vintage: req.body.vintage,
        code: req.body.code,
        price: req.body.price,
        notes: req.body.notes,
        score: req.body.score,
        recipes: req.body.recipes
      }
    }
  };
  User.findOneAndUpdate(query, update, options, function(err, data){
   // console.log(req.user.username, "req.user.username");
   // console.log(req.user, "req.user")

    if(err){
      console.log("Something's fucked up");
      res.json({'message': err});
    } else {
      console.log("Holy shit...it WORKED!");
      res.json({"SUCCESS": data});
    }
  });
});


//update ONE user
router.put('/user/:id', function(req, res, next){
  var query = {"_id": req.params.id};
  var update = {
    name: req.body.name,
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


//removes one wine (updates the user)
router.put('/users/:name/:id', function(req, res) {
console.log(req, 'REQ');
  var query = {"username": req.params.name};
  var id = req.params.id;
  console.log(query, "Query");
  console.log(id, 'id');
  var options = {new: true};
  User.findOneAndUpdate(query,
    {$pull: {
      "wines": {"_id": id}
    }
  }, options, function(err, data){

    if(err){
      console.log(err, "ERR")
      console.log("Something's fucked up");
      res.json({'message': err});
    } else {
      console.log(data, "DATA");
      console.log("Holy shit...it WORKED!");
      res.json({"SUCCESS": data});
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
