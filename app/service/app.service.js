'use strict';

App.factory('ApiService', ['$q','$http', function($q, $http){
  var token = angular.fromJson(localStorage.getItem('usertoken'));


  return {
    apiData : function(endpoint){
      return $http.get('https://student-enrol.herokuapp.com/api/v1/'+endpoint+'?token='+token);
    },

    signupUser: function(params) {
      return $http.post("https://student-enrol.herokuapp.com/api/v1/users?token="+token, params);   
    },

    prof: function(userid){
      return $http.get("https://student-enrol.herokuapp.com/api/v1/user/"+userid+"?token="+token);
    },

    rmv: function(userid){
      return $http.delete("https://student-enrol.herokuapp.com/api/v1/user/"+userid+"?token="+token);
    },

    updateUser: function(userid, params){
      return $http.put("https://student-enrol.herokuapp.com/api/v1/user/"+userid+"?token="+token, params);
    },

    auth: function(params){
      return $http.post("https://student-enrol.herokuapp.com/api/v1/authenticate", params);
    },

    regStudent: function(params){
      return $http.post("https://student-enrol.herokuapp.com/api/v1/students?token="+token, params);
    }
  };
}]);