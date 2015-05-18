'use strict';
App.controller('AdminCtrl', ['$scope', 'ApiService', '$location', 'AppService', '$mdDialog', function ($scope, ApiService, $location, AppService, $mdDialog){

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
        localStorage.setItem('usrn', angular.toJson(usr));
        ApiService.auth(chk).then(function(res){
          localStorage.setItem('usertoken', angular.toJson(res.data.token));
          $scope.loadProfile(usr);
        });
      }
    });  
  };

  $scope.registerStudent = function(){
    $scope.regnumber = Math.floor(Math.random()*10000);
    $location.url('admin/create');
  };

  $scope.studentFn = "";
  $scope.studentLn = "";
  $scope.gender = "";
  $scope.phone = "";
  $scope.state = "";
  $scope.dob = "";
  var addParam = {};

  $scope.addStudent = function(){
    if(localStorage.getItem('usertoken')){
      $scope.registration = true;
      addParam.regnumber  = $scope.regnumber;
      addParam.firstname = $scope.studentFn;
      addParam.lastname = $scope.studentLn;
      addParam.gender = $scope.gender;
      addParam.phone = $scope.phone;
      addParam.state = $scope.state;
      addParam.dob = $scope.dob;

      ApiService.regStudent(addParam).then(function(res){
        addParam = {};
        if(res.data.regnumber===undefined){
          $scope.registration = false;
          $scope.regtaken = true;
        }
        else {
          $scope.registration = false;
          $location.url('/admin/list');
        }
      });
    }
    else {
      $location.url('/login');
    }
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
          console.log($scope.prev_img);
        });
    };
    reader.readAsDataURL(photofile);
  };
  
  $scope.removeUser = function(ev){
    var confirm = $mdDialog.confirm()
      .title('Delete Account')
      .content('Are you sure you want to delete account?')
      .ariaLabel('del user')
      .ok('Please do it!')
      .cancel('Not sure anymore')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      var usr = angular.fromJson(localStorage.getItem('usrn'));
      ApiService.rmv(usr).then(function(res){
        localStorage.removeItem('usertoken');
        $location.url('/login');
      });
    }, function(){});
  };

  $scope.deleteStudent = function(ev, student){
    var conf = $mdDialog.confirm()
      .title("Delete "+student.lastname+"'s Profile")
      .content('Are you sure?')
      .ariaLabel('del user')
      .ok('Please do it!')
      .cancel('Not sure anymore')
      .targetEvent(ev);
    $mdDialog.show(conf).then(function() {
      ApiService.del(student.regnumber).then(function(res){
        $scope.loadData('students');
      });
    }, function(){});
    
  };

  $scope.editUser = function(ev){
    $mdDialog.show({
      controller: Editprof,
      templateUrl: "/app/views/edit.user.html",
      targetEvent: ev
    });
  };

  function Editprof($scope, $mdDialog, AppService){
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
        // AppService.addProf(res.data[0]);

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

  $scope.signOut = function(){
    localStorage.removeItem('usertoken');
    $location.url('/login');
  };

  $scope.loadProfile = function(){
    if(localStorage.getItem('usertoken')){
      var usr = angular.fromJson(localStorage.getItem('usrn'));
      ApiService.prof(usr).then(function(resp){
        $scope.infos = resp.data;
        // console.log(AppService.getProf());
        $location.url('/admin/home');
      });
    }
    else {
      $location.url('/login');
    }
  };

}]);