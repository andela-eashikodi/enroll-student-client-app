'use strict';

App.service('AppService', function() {
  var prof; 

  this.addProf = function(usr){

    prof = usr;
  };

  this.getProf = function(){
    return prof;
  };

  // return {
  //   addText: this.addText,
  //   getText: this.getText
  // };
});


App.factory('ApiService', ['$q','$http', function($q, $http){
  var token = angular.fromJson(localStorage.getItem('userToken'));
  // console.log(token);


  return {
    getStudents : function(endpoint){
      return $http.get('https://student-enrol.herokuapp.com/api/v1/'+endpoint+'?token='+token);
    },

    signupUser: function(params) {
      return $http.post("https://student-enrol.herokuapp.com/api/v1/users?token="+token, params);   
    },

    getUser: function(userid){
      token = angular.fromJson(localStorage.getItem('userToken'));
      return $http.get("https://student-enrol.herokuapp.com/api/v1/user/"+userid+"?token="+token);
    },

    removeUser: function(userid){
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
    },

    deleteStudent: function(studentid){
      return $http.delete("https://student-enrol.herokuapp.com/api/v1/student/"+studentid+"?token="+token);
    },

    getstudent: function(studentid){
      return $http.get("https://student-enrol.herokuapp.com/api/v1/student/"+studentid+"?token="+token);
    }
  };
}]);