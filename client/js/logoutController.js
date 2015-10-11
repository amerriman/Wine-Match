//was myApp originally
app.controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      console.log(AuthService.getUserStatus(), "getusrstatus on logout - should be true right here?");

      // call logout from service
      AuthService.logout()
        .then(function () {
           console.log(AuthService.getUserStatus(), "getusrstatus on logout - should be false right here?");
          $location.path('/');
        });

    };

}]);
