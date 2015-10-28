//was myApp originally
app.controller('loginController',
  ['$scope', '$rootScope', '$location', 'AuthService', 'httpFactory',
  function ($scope, $rootScope, $location, AuthService, httpFactory) {


   findUser = function(url){
    httpFactory.getCurrentUser(url)
    .then(function(response){
    // console.log(response.data.message, "SUCCESS");
    $rootScope.user = response.data.message;
    // console.log($rootScope.user, "rootscope user")
    });
  };

  findUser('auth/getuser');
  // console.log(AuthService.getUserStatus(), "auth status on login page");
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
          $location.path('/');
           // console.log(AuthService.getUserStatus(), "getusrstatus on logout - should be true here?");
          //disable the button so it doesn't get clicked twice
          $scope.disabled = false;
          $scope.loginForm = {};
          $scope.activeUser = true;
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
