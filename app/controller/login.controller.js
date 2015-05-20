'use strict';

App.controller('LoginCtrl', ['$scope', 'ApiService', '$location', '$mdDialog', function ($scope, ApiService, $location, $mdDialog){

  $scope.signupUser = function(){
    $scope.signing = true;

    var authUser = {
      username: $scope.signup.username,
      password: $scope.signup.password
    };

    ApiService.signupUser($scope.signup).then(function(res){
      $scope.signing = false;
      if(res.data.username===undefined){
        $scope.nametaken = true;
      }
      else {
        var user = res.data.username;
        localStorage.setItem('userName', angular.toJson(user));

        console.log(authUser);
        ApiService.auth(authUser).then(function(res){
          localStorage.setItem('userToken', angular.toJson(res.data.token));
          authUser = {};
          $location.url('/admin/home');
          $scope.signup = {};
        });
      }
    });  
  };

  $scope.loginUser = function(){
    $scope.signing = true;

    ApiService.auth($scope.login).then(function(res){
      if(res.data.token!==undefined){
        $scope.signing = false;
        var user = $scope.login.username;
        localStorage.setItem('userToken', angular.toJson(res.data.token));
        localStorage.setItem('userName', angular.toJson(user));
        $scope.login = {};
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