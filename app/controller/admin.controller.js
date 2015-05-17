'use strict';
App.controller('AdminCtrl', ['$scope', 'ApiService', '$location', 'AppService', '$mdDialog', function ($scope, ApiService, $location, AppService, $mdDialog){

  $scope.regnumber = "";
  $scope.studentFn = "";
  $scope.studentLn = "";
  $scope.gender = "";
  $scope.phone = "";
  $scope.state = "";
  $scope.dob = "";
  var addParam = {};

  $scope.addStudent = function(){
    addParam.regnumber  = $scope.regnumber;
    addParam.firstname = $scope.studentFn;
    addParam.lastname = $scope.studentLn;
    addParam.gender = $scope.gender;
    addParam.phone = $scope.phone;
    addParam.state = $scope.state;
    addParam.dob = $scope.dob;

    ApiService.regStudent(addParam).then(function(res){
      console.log(res);
      addParam = {};
      if(res.data.regnumber===undefined){
        $scope.regtaken = true;
      }
      else {
        $location.url('/admin/list');
      }
    });
  };

  $scope.userfirst = "";
  $scope.userlast = "";
  $scope.usermail = "";
  $scope.username = "";
  $scope.userpassword = "";
  var signParam = {};

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
    var det = {};
    det.username = $scope.loginname;
    det.password = $scope.loginpassword;

    ApiService.auth(det).then(function(res){
      console.log(res.data);
      if(res.data.token!==undefined){
        $scope.signing = false;
        localStorage.setItem('usertoken', angular.toJson(res.data.token));
        var usr = $scope.loginname;
        localStorage.setItem('usrn', angular.toJson(usr));
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
  
  $scope.removeUser = function(){
    var usr = angular.fromJson(localStorage.getItem('usrn'));
    ApiService.rmv(usr).then(function(){
      $location.url('/login');
    });
  };

  $scope.editUser = function(ev){
    $mdDialog.show({
      controller: Editprof,
      templateUrl: "/app/views/edit.user.html",
      targetEvent: ev
    });
  };

  function Editprof($scope, $mdDialog){
    var editinfo = {};
    var usr = angular.fromJson(localStorage.getItem('usrn'));
    ApiService.prof(usr).then(function(res){
      editinfo = res.data[0];
      $scope.editfirst = editinfo.firstname;
      $scope.editlast = editinfo.lastname;
      $scope.editmail = editinfo.email;
      $scope.editname = editinfo.username;
    });

    $scope.edit = function(){
      var newInfo = {};
      newInfo.firstname = $scope.editfirst;
      newInfo.lastname = $scope.editlast;
      newInfo.email = $scope.editmail;
      newInfo.username = $scope.editname;

      ApiService.updateUser(usr, newInfo).then(function(res){
        $mdDialog.hide();
      });
    };
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