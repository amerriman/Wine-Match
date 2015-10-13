
app.controller('myController', ['$rootScope', '$scope', '$location', "$routeParams", function($rootScope, $scope, $location, $routeParams) {
  console.log("HERE");
  $scope.sortWine = "Sort";
  $scope.currentUrl = $location.path;

  var user = $rootScope.user;
  $scope.userName = $routeParams.user;

}]);


//**************************//
//                          //
//  Home Search Controller  //
//                          //
//**************************//

app.controller('searchController', ['$scope', "httpFactory", function($scope, httpFactory){

  $scope.foodSelect = "Choose a food type";

  //once the wines are in an array - we can iterate over them and put the match wine in a for loop with the wineType[i]
  $scope.getOption = function(){
    chooseWine($scope.foodSelect);
  };

}]);



//**************************//
//                          //
// Wine Results Controller  //
//                          //
//**************************//

app.controller('allWineController', ['$scope', "httpFactory", "$timeout", function($scope, httpFactory, $timeout) {

  $scope.successMessage = false;
  $scope.errMessage = false;
  $scope.results = false;
  $scope.single = false;
  $scope.recipesDiv = false;
  $scope.hideRecBtn = false;
  $scope.recBtn = true;
  $scope.wines = [];
  $scope.recipes = [];
  $scope.count = 0;
  $scope.meal = "";
  $scope.selector = true;

  // $scope.singleWine

  $scope.foodSelect = "Choose a food type";
  // $scope.foodSelect = httpFactory.foodSelect;
  // console.log($scope.foodSelect, "in search controller");

  //once the wines are in an array - we can iterate over them and put the match wine in a for loop with the wineType[i]
  $scope.getOption = function(){
    $scope.wines = [];
    $scope.recipes = [];
    chooseWine($scope.foodSelect);
    $scope.meal = mealType;

    matchWine('http://api.snooth.com/wines/?q=' + wineType1 + '&xp=30&n=12&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');

  matchWine('http://api.snooth.com/wines/?q=' + wineType2 + '&xp=30&n=12&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');

  matchWine('http://api.snooth.com/wines/?q=' + wineType3 + '&xp=30&n=12&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');

  };


  matchWine = function(url){
    // chooseWine($scope.foodSelect);

    if(wineType1 && wineType2 && wineType3){
    httpFactory.getAllWine(url)
    .then(function(response){
      for (var i = 0; i < response.data.wines.length; i++) {
        $scope.wines.push(response.data.wines[i]);
      }
      // console.log(response.data.wines);
      $scope.count ++;
      if($scope.count === 3){
        $scope.results = true;
      }
    });
    }
  };


  $scope.wineDetails = function(code) {
      httpFactory.getOneWine(code)
    .then(function(response){
      $scope.singleWine = response.data.wines[0];
      for (var i = 0; i < response.data.wines[0].recipes.length; i++) {
        $scope.recipes.push(response.data.wines[0].recipes[i]);
      }
      $scope.results = false;
      $scope.single = true;
      $scope.selector = false;
      // console.log($scope.recipes, "foods");
    });
  };


  $scope.goBack = function(){
    $scope.single = false;
    $scope.results = true;
    $scope.recipesDiv = false;
    $scope.hideRecBtn = false;
    $scope.recBtn = true;
    $scope.selector = true;
  };


  $scope.showRecipes = function(){
    $scope.recBtn = false;
    $scope.hideRecBtn = true;
    $scope.recipesDiv = true;
  };


   $scope.hideRecipes = function(){
    $scope.recipesDiv = false;
    $scope.hideRecBtn = false;
    $scope.recBtn = true;
  };

  function messageTimeout(){
    $scope.successMessage = false;
    $scope.errMessage = false;
  }


//Post a wine - right now it just makes a bunch of random wines not attached to users
  $scope.postWine = function(){

    var recipes = [];
    for (var i = 0; i < $scope.recipes.length; i++) {
      recipes.push(
      {
        title: $scope.recipes[i].name,
        soureLink: $scope.recipes[i].source_link,
        foodImage: $scope.recipes[i].image
      });
    }
    console.log(recipes);
    var payload = {
      "username": $scope.currentUser,
      "name": $scope.singleWine.name,
      "image": $scope.singleWine.image,
      "varietal": $scope.singleWine.varietal,
      "vintage": $scope.singleWine.vintage,
      "code": $scope.singleWine.code,
      "price": $scope.singleWine.price,
      "notes": $scope.singleWine.wm_notes,
      "snoothrank": $scope.singleWine.snoothrank,
      "recipes": recipes
    };
    httpFactory.post('/api/users', payload)
    .then(function(response){
      $scope.successMessage = true;
      $scope.addWineMessage = "Wine added to cellar";
      $timeout(messageTimeout, 3000);

      console.log(response);
    })
    .catch(function(){
      $scope.errMessage = true;
      $scope.addWineMessage = "You must be logged in to add a wine!";
      $timeout(messageTimeout, 3000);

    });
  };

}]);




//**************************//
//                          //
//   User Wine Controller   //
//                          //
//**************************//

app.controller('userWineController', ['$rootScope', '$scope', 'httpFactory', 'AuthService', '$http', function($rootScope, $scope, httpFactory, AuthService, $http){
  $scope.results = true;
  $scope.single = false;
  $scope.recipesDiv = false;
  $scope.hideRecBtn = false;
  $scope.recBtn = true;
  $scope.wines = [];
  $scope.recipes = [];
  $scope.userWines = [];

console.log($rootScope.user, "rootScope.user in userWineController");

//   var loc = $location.path();
//   console.log(loc, "LOC")
//   $scope.checkLoc = function(){
//     if(loc === /winecellar/ + $rootScope.user){
//     $scope.isMain = true;
//     console.log($scope.isMain);
//   }
// };


  matchWine = function(url){
      httpFactory.getAllUserWines(url)
      .then(function(response){
        for (var i = 0; i < response.data.wines.length; i++) {
          $scope.userWines.push(response.data.wines[i]);
        }
        // $scope.userWines.push(response.data.wines)
        console.log($scope.userWines);
      });
    };
    matchWine("/api/user/" + $rootScope.user);


  $scope.wineDetails = function(code) {
      httpFactory.getOneWine(code)
    .then(function(response){
      $scope.singleWine = response.data.wines[0];
      for (var i = 0; i < response.data.wines[0].recipes.length; i++) {
        $scope.recipes.push(response.data.wines[0].recipes[i]);
      }
      $scope.results = false;
      $scope.single = true;
      // console.log($scope.singleWine, "infunct");
      // console.log(response.data.wines[0]);
      // console.log(response.data.wines[0].recipes, "foods");
      console.log($scope.recipes, "foods");

    });
  };

  $scope.deleteWine = function(id){
    var wineID = id;
    console.log(wineID, "wineID")
    // console.log("/api/users/" + $rootScope.user + "/" + id, "request")
    httpFactory.deleteWine("/api/users/" + $rootScope.user + "/" + wineID)
    .then(function(response){
      // console.log(response);
      $scope.userWines = [];
      matchWine("/api/user/" + $rootScope.user);
    });
  };

  $scope.goBack = function(){
    $scope.single = false;
    $scope.results = true;
    $scope.recipesDiv = false;
    $scope.hideRecBtn = false;
    $scope.recBtn = true;
  };


  $scope.showRecipes = function(){
    $scope.recBtn = false;
    $scope.hideRecBtn = true;
    $scope.recipesDiv = true;
  };


   $scope.hideRecipes = function(){
    $scope.recipesDiv = false;
    $scope.hideRecBtn = false;
    $scope.recBtn = true;
  };


}]);





