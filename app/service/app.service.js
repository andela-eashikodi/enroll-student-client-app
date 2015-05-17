'use strict';

App.factory('ApiService', ['$q','$http', function($q, $http){
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NTRjYWVhMWQ5ZjUwYmEwMTVhZTg4MWMiLCJmaXJzdG5hbWUiOiJvbnllIiwibGFzdG5hbWUiOiJhc2hpa29kaSIsImVtYWlsIjoiZW1la2EuYXNoaWtvZGlAYW5kZWxhLmNvIiwidXNlcm5hbWUiOiJhc2hpa29kaSIsInBhc3N3b3JkIjoiYXNoaWtvZGkiLCJfX3YiOjB9.sL_rPab9RdaQX_ULMbxiI49DR8oY0e7r3aRk7utJ_yo';

  var deferred  = {};

  // if(!$localStorage.userToken) {
  //   $localStorage.userToken = {};
  // }

  return {
    apiData : function(endpoint){
      return $http.get('https://student-enrol.herokuapp.com/api/v1/'+endpoint+'?token='+token);
    },

    signupUser: function(params) {
      return $http.post("https://student-enrol.herokuapp.com/api/v1/users?token="+token, params);   
    },

    prof: function(userid){
      return $http.get("https://student-enrol.herokuapp.com/api/v1/user/"+userid+"?token="+token);
    }
  };
}]);