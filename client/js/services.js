app.factory('httpFactory', ['$http', function($http){
  var obj = {};

//ties the foodSelect across views
  // this.foodSelect = "";

//get request
  obj.getAllWine = function(url){
    return $http.get(url);
  };

  obj.getOneWine = function(code){
    return $http.get('http://api.snooth.com/wine//?akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7&food=1&id='+ code);
  };

  obj.post = function(url, payload){
    return $http.post(url, payload);
  };

  return obj;
}]);
