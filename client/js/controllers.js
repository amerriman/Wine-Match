
app.controller('myController', ['$scope', function($scope) {
  // $scope.greeting = "Hello World!";
  console.log('here');
}]);


//**************************//
//                          //
//  Home Search Controller  //
//                          //
//**************************//

app.controller('searchController', ['$scope', '$http', "$location", "httpFactory", function($scope, $http, $location, httpFactory){
// $scope.test = "test";
  $scope.wineA = false;

  matchWine = function(url){
    httpFactory.getWine(url)
    .then(function(response){
      $scope.winesA = response.data.wines;
      console.log($scope.winesA, "scope.wines");
      $scope.wineA = true;
    });
  };


$scope.mySelect = "Choose a food type";

//Use this function only if want to grab the value as it's chosen - before the button click.  will need to declare foodChoice as a variable
//   $scope.showSelectValue = function(mySelect) {
//     console.log(mySelect, "mySelect");
//     foodChoice = mySelect;
//     console.log(foodChoice, "foodChoice");

// };

  $scope.getOption = function(){
    // console.log($scope.mySelect, "mySelect");
    chooseWine($scope.mySelect);
    // console.log(wineType, "WineType")
    matchWine('http://api.snooth.com/wines/?q=' + wineType + '&xp=30&n=30&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');

  };



}]);



//**************************//
//                          //
// Wine Results Controller  //
//                          //
//**************************//

app.controller('allWineController', ['$scope', function($scope) {
  $scope.greeting = "Hello World!";
console.log("RESULTS");
}]);




//**************************//
//                          //
//  Single Wine Controller  //
//                          //
//**************************//

app.controller('WineController', ['$scope', '$http', function($scope, $http){
console.log("SINGLE WINE");
}]);
