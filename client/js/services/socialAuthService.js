app.factory('socialuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions (functions are below) for use in controllers because when you call a key in an object it returns the value - and the value is a funciton in this case
    return ({
      // isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
    });



function getUserStatus() {
   if(user) {
    return true;
  } else {
    return false;
  }
}



function login(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.get('/social/github')
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        user = true;
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



}]);
