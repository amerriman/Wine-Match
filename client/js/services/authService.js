//should set a global constant that can be used with multiple factories and would be injected in where you need it.  This is not happening below...

app.factory('AuthService',
  ['$rootScope', '$q', '$timeout', '$http',
  function ($rootScope, $q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions (functions are below) for use in controllers because when you call a key in an object it returns the value - and the value is a funciton in this case
    return ({
      // isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      // githubLogin: githubLogin
    });


//Maybe can return username here and call this function elsewhere in the controllers to get the current user?
// function isLoggedIn() {
//   if(user) {
//     return true;
//   } else {
//     return false;
//   }
// }



function getUserStatus() {
   if(user) {
    return true;
  } else {
    return false;
  }
  // return user;
}



function login(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/auth/login', {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        user = true;
        console.log(data, "DATA");
        $rootScope.user = data.user.username;
        console.log($rootScope, "rootScope");
        deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}


// function githubLogin(username, password) {

//   // create a new instance of deferred
//   var deferred = $q.defer();

//   // send a post request to the server
//   $http.get('/social/github')
//     // handle success
//     .success(function (data, status) {
//       if(status === 200 && data.status){
//         user = true;
//         deferred.resolve();
//       } else {
//         user = false;
//         deferred.reject();
//       }
//     })
//     // handle error
//     .error(function (data) {
//       user = false;
//       deferred.reject();
//     });

//   // return promise object
//   return deferred.promise;

// }


function logout() {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a get request to the server
  $http.get('/auth/logout')
    // handle success
    .success(function (data) {
      user = false;
      //does this work?
      $rootScope.user = null;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

function register(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/auth/register', {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        //this might not be ok
        user = true;
        console.log(data.user, "DATA IN REGISTER")
        // $rootScope.user = data.user.username;
        deferred.resolve();
      } else {
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}


}]);
