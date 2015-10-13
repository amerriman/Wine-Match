//was myApp originally
app.controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    // console.log(AuthService.getUserStatus());
    // $scope.errorMessage = "";
    $scope.loginDiv = false;
    $scope.choiceButtons = true;

    $scope.showLoginDiv = function(){
      $scope.loginDiv = true;
      $scope.choiceButtons = false;
    };

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

 // console.log(AuthService.getUserStatus(), "getusrstatus on login - should be false here?");
      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/search');
           // console.log(AuthService.getUserStatus(), "getusrstatus on logout - should be true here?");
          //disable the button so it doesn't get clicked twice
          $scope.disabled = false;
          $scope.loginForm = {};

        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };


    // $scope.githubLogin = function(){
    //   AuthService.githubLogin()
    //     // handle success
    //     .then(function () {
    //       $location.path('/search');
    //     })
    //     // handle error
    //     .catch(function () {
    //       $scope.error = true;
    //       $scope.errorMessage = "Something went wrong";
    //     });
    // };

}]);
