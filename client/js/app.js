var app = angular.module('myApp', ['ngRoute']);


app.config(function($routeProvider) {

  $routeProvider
  //this needs to be reconciled with search maybe
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'myController',
      access: {restricted: false}
    })
    .when('/login', {
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
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: true}
    })
    .when('/search', {
      templateUrl: '../views/search.html',
      controller: 'searchController',
      access: {restricted: false}
    })
    .when('/results', {
      templateUrl: '../views/results.html',
      controller: 'allWineController',
      access: {restricted: false}
    })
    .when('/wine', {
      templateUrl: '../views/wine.html',
      controller: 'WineController',
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




