
app.controller('myController', ['$scope', function($scope) {
  // $scope.greeting = "Hello World!";
  console.log('here');
}]);


//**************************//
//                          //
//  Home Search Controller  //
//                          //
//**************************//

app.controller('searchController', ['$scope', '$http', "httpFactory", function($scope, $http, httpFactory){

  $scope.mySelect = "Choose a food type";
  // $scope.results = false;
  $scope.wines = [];
  $scope.count = 0;


  matchWine = function(url){
    httpFactory.getWine(url)
    .then(function(response){
      $scope.wines.push(response.data.wines);
      $scope.count ++;
      if($scope.count === 3){
        // $scope.result = true;
        console.log($scope.wines);
    console.log($scope.wines[0][0].name, "scopewines[0][0].name");
      }
    });
  };


//once the wines are in an array - we can iterate over them and put the match wine in a for loop with the wineType[i]
  $scope.getOption = function(){
    // console.log($scope.mySelect, "mySelect");
    chooseWine($scope.mySelect);
    // console.log(wineType, "WineType")
    matchWine('http://api.snooth.com/wines/?q=' + wineType1 + '&xp=30&n=10&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');
       // console.log(wineType, "WineType")
    matchWine('http://api.snooth.com/wines/?q=' + wineType2 + '&xp=30&n=10&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');

       // console.log(wineType, "WineType")
    matchWine('http://api.snooth.com/wines/?q=' + wineType3 + '&xp=30&n=10&mr=4&akey=dc063bj39dxhgxxop6y9rq2cymy4nqk0p1uf6ccqdhqujus7');

  };

  $scope.wineDetails = function(){
    httpFactory.getWine(url)
    .then(function(response){

    });
  };




//Use this function only if want to grab the value as it's chosen - before the button click.  will need to declare foodChoice as a variable
//   $scope.showSelectValue = function(mySelect) {
//     console.log(mySelect, "mySelect");
//     foodChoice = mySelect;
//     console.log(foodChoice, "foodChoice");

// };

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
