var app = angular.module('myApp', ['ngRoute']);


app.config(function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/search', {
      templateUrl: '../views/search.html',
      controller: 'allWineController',
      access: {restricted: false}
    })
    .when('/results', {
      templateUrl: '../views/results.html',
      controller: 'allWineController',
      access: {restricted: false}
    })
    .when('/winecellar', {
      templateUrl: '../views/winecellar.html',
      controller: 'userWineController',
      access: {restricted: true}
    })
    .when('/contact', {
      templateUrl: '../views/contact.html',
      controller: 'contactController',
      access: {restricted: false}
    })
    .otherwise( {
      redirectTo: '/'
    });


});

//was myApp originally
//Checks to see if the user is logged in.  Need to add logic to show which routes are protected by this.
app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && !AuthService.getUserStatus()) {
      $location.path('/login');
    }
  });
});


// app.run(function($rootScope){
//   $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
//     $rootScope.containerClass = toState.containerClass;
//   });
// });




