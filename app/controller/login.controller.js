'use strict';

App.controller('LoginCtrl', ['$scope', 'ApiService', '$location', 'AppService', '$mdDialog', function ($scope, ApiService, $location, AppService, $mdDialog){

  $scope.userfirst = "";
  $scope.userlast = "";
  $scope.usermail = "";
  $scope.username = "";
  $scope.userpassword = "";
  var signParam = {};
  var chk = {};

  $scope.signupUser = function(){
    $scope.signing = true;
    signParam.firstname = $scope.userfirst;
    signParam.lastname = $scope.userlast;
    signParam.email = $scope.usermail;
    signParam.username = $scope.username;
    signParam.password = $scope.userpassword;

    chk.username = $scope.username;
    chk.password = $scope.userpassword;

    ApiService.signupUser(signParam).then(function(res){
      $scope.signing = false;
      signParam = {};
      if(res.data.username===undefined){
        $scope.nametaken = true;
      }
      else {
        var usr = res.data.username;
        localStorage.setItem('userName', angular.toJson(usr));
        ApiService.auth(chk).then(function(res){
          localStorage.setItem('userToken', angular.toJson(res.data.token));
          chk = {};
          $scope.loadProfile(usr);
        });
      }
    });  
  };

  $scope.loginname = "";
  $scope.loginpassword = "";

  $scope.loginUser = function(){
    $scope.signing = true;
    var det = {};
    det.username = $scope.loginname;
    det.password = $scope.loginpassword;

    ApiService.auth(det).then(function(res){
      if(res.data.token!==undefined){
        det = {};
        $scope.signing = false;
        localStorage.setItem('userToken', angular.toJson(res.data.token));
        var usr = $scope.loginname;
        localStorage.setItem('userName', angular.toJson(usr));
        $location.url('/admin/home');
      }
      else {
        if(res.data.message==="auth failed"){
          $scope.signing = false;
          $scope.loginvalidname = true;
          $scope.loginvalidpass = false;
        }
        else {
          $scope.signing = false;
          $scope.loginvalidpass = true;
          $scope.loginvalidname = false;
        }
      }
    });
  };

}]);