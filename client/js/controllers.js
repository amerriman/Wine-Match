app.controller('myController', ['$scope', function($scope) {
  // $scope.greeting = "Hello World!";
  console.log('here');
}]);




app.controller('allWineController', ['$scope', function($scope) {
  $scope.greeting = "Hello World!";
console.log("RESULTS");
}]);





app.controller('WineController', ['$scope', '$http', function($scope, $http){
console.log("SINGLE WINE");
}]);
