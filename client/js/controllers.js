
app.controller('myController', ['$scope', function($scope) {
  // $scope.greeting = "Hello World!";
  console.log('here');
}]);


//**************************//
//                          //
//  Home Search Controller  //
//                          //
//**************************//

app.controller('searchController', ['$scope', "httpFactory", function($scope, httpFactory){

  $scope.foodSelect = "Choose a food type";
  // $scope.foodSelect = httpFactory.foodSelect;
  // console.log($scope.foodSelect, "in search controller");

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

app.controller('allWineController', ['$scope', "httpFactory", function($scope, httpFactory) {

  $scope.results = false;
  $scope.single = false;
  $scope.recipesDiv = false;
  $scope.hideRecBtn = false;
  $scope.recBtn = true;
  $scope.wines = [];
  $scope.recipes = [];
  $scope.count = 0;
  $scope.meal = mealType;

  // $scope.singleWine


  matchWine = function(url){
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


  matchWine('http://api.snooth.com/wines/?q=' + wineType1 + '&xp=30&n=12&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');

  matchWine('http://api.snooth.com/wines/?q=' + wineType2 + '&xp=30&n=12&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');

  matchWine('http://api.snooth.com/wines/?q=' + wineType3 + '&xp=30&n=12&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');



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


//Post a recipe - right now it just makes a bunch of random wines not attached to users
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
      "wineName": $scope.singleWine.name,
      "image": $scope.singleWine.image,
      "varietal": $scope.singleWine.varietal,
      "vintage": $scope.singleWine.vintage,
      "code": $scope.singleWine.code,
      "notes": $scope.singleWine.wm_notes,
      "score": $scope.singleWine.snoothrank,
      "recipes": recipes
    };
    httpFactory.post('/api/users', payload)
    .then(function(response){
      console.log(response);
    });
  };




}]);




//**************************//
//                          //
//   User Wine Controller   //
//                          //
//**************************//

app.controller('userWineController', ['$scope', '$http', function($scope, $http){

}]);
