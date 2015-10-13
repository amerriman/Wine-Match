//was myApp originally
app.controller('registerController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function () {
 // console.log(AuthService.getUserStatus(), "getusrstatus on register - should be false");
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
           // console.log(AuthService.getUserStatus(), "getusrstatus on register - should be true if worked");
          $location.path('/search');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
           // console.log(AuthService.getUserStatus(), "getusrstatus on register - should be false if err");
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);


