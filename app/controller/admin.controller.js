'use strict';
App.controller('AdminCtrl', ['$scope', 'ApiService', '$location', 'AppService', function ($scope, ApiService, $location, AppService){

  $scope.userfirst = "";
  $scope.userlast = "";
  $scope.usermail = "";
  $scope.username = "";
  $scope.userpassword = "";
  var signParam = {};
  var signData = "";

  $scope.signupUser = function(){
    $scope.signing = true;
    signParam.firstname = $scope.userfirst;
    signParam.lastname = $scope.userlast;
    signParam.email = $scope.usermail;
    signParam.username = $scope.username;
    signParam.password = $scope.userpassword;

    ApiService.signupUser(signParam).then(function(res){
      $scope.signing = false;
      signParam = {};
      if(res.data.username===undefined){
        $scope.nametaken = true;
      }
      else {
        var usr = res.data.username;
        localStorage.setItem('usrn', angular.toJson(usr));
        $scope.loadProfile(usr);
      }
    });
    
  };

  $scope.loginname = "";
  $scope.loginpassword = "";
  $scope.loginUser = function(){
    $scope.signing = true;
    var username = $scope.loginname;
    var password = $scope.loginpassword;

    ApiService.prof(username).then(function(res){
      if (res.data[0]===undefined){
        $scope.loginvalidname = true;
        $scope.signing = false;
      }
      else {
        if(res.data[0].key!==password){
          $scope.loginvalidpass = true;
          $scope.signing = false;
        }
        else {
          $scope.signing = false;
          var usr = username;
          localStorage.setItem('usrn', angular.toJson(usr));
          $location.url('/admin/home');
        }
      }
    });
  };

  $scope.onFileSelect = function(element) {
    var photofile = element.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        $scope.$apply(function() {
          $scope.prev_img = e.target.result;
          // console.log($scope.prev_img);
        });
    };
    reader.readAsDataURL(photofile);
  };
  
  $scope.removeUser = function(idd){
    console.log(idd);
  }

  $scope.loadData = function(endpoint){
    $scope.loading = true;
    ApiService.apiData(endpoint).then(function(res){
      $scope.list = res.data;
      $scope.loading = false;
    });
  };

  $scope.loadProfile = function(){
    var usr = angular.fromJson(localStorage.getItem('usrn'));
    ApiService.prof(usr).then(function(resp){
      $scope.infos = resp.data;
      $location.url('/admin/home');
    });
  };

}]);