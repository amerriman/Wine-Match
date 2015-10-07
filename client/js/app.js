var app = angular.module('myApp', ['ngRoute']);


app.config(function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'searchController'
    })
    .when('/results', {
      templateUrl: '../views/results.html',
      controller: 'allWineController'
    })
    .when('/wine', {
      templateUrl: '../views/wine.html',
      controller: 'WineController'
    })
    .otherwise( {
      redirectTo: '/'
    });



});

