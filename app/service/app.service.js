'use strict';

App.factory('ApiService', ['$q','$http', function($q, $http){
  var token = angular.fromJson(localStorage.getItem('userToken'));

  var baseUrl = "https://student-enrol.herokuapp.com/api/v1/";

  return {
    getStudents : function(){
      return $http.get(baseUrl+"students?token="+token);
    },

    signupUser: function(params) {
      return $http.post(baseUrl+"users?token="+token, params);   
    },

    getUser: function(userid){
      token = angular.fromJson(localStorage.getItem('userToken'));
      return $http.get(baseUrl+"user/"+userid+"?token="+token);
    },

    removeUser: function(userid){
      return $http.delete(baseUrl+"user/"+userid+"?token="+token);
    },

    updateUser: function(userid, params){
      return $http.put(baseUrl+"user/"+userid+"?token="+token, params);
    },

    auth: function(params){
      return $http.post(baseUrl+"authenticate", params);
    },

    addStudent: function(params){
      return $http.post(baseUrl+"students?token="+token, params);
    },

    deleteStudent: function(studentid){
      return $http.delete(baseUrl+"student/"+studentid+"?token="+token);
    },

    getstudent: function(studentid){
      return $http.get(baseUrl+"student/"+studentid+"?token="+token);
    },

    updateStudent: function(studentid, params){
      return $http.put(baseUrl+"user/"+studentid+"?token="+token, params);
    }
  };
}]);