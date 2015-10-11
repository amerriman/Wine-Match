app.factory('httpFactory', ['$http', function($http){
  var obj = {};


//get request
  obj.getAllWine = function(url){
    return $http.get(url);
  };

  obj.getOneWine = function(code){
    return $http.get('http://api.snooth.com/wine//?akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7&food=1&id='+ code);
  };

  obj.getAllUserWines = function(url){
    return $http.get(url);
  };

  obj.getAllUsers = function(url){
    return $http.get(url);
  };

  obj.post = function(url, payload){
    return $http.post(url, payload);
  };

  obj.deleteWine = function(url){
  return $http.put(url);
  };

  return obj;
}]);


// router.put('/flashcard/:name/:id', function(req, res) {
//   var query = {"name": req.params.name};
//   var id = req.params.id;
//   SetOfCards.findOneAndUpdate(query, {
//     $pull: {
//       "cards": {"_id": id}
//     }
//   }, function(err, flashcard){
//       // console.log(flashcard, "FLASHCARD DELETE??");
//       res.json(flashcard);
//     });
// });









