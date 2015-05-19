'use strict';

App.controller('StudentCtrl', ['$scope', 'ApiService', '$location', 'AppService', '$mdDialog', function ($scope, ApiService, $location, AppService, $mdDialog){

  $scope.loadData = function(endpoint){
    if(localStorage.getItem('userToken')){
      $location.url('/admin/list');
      $scope.loading = true;
      ApiService.getStudents(endpoint).then(function(res){
        $scope.list = res.data;
        $scope.loading = false;
      });
    }
    else {
      $location.url('/login');
    }
    
  };

  $scope.registerStudent = function(){
    if(localStorage.getItem('userToken')){
      $scope.regnumber = Math.floor(Math.random()*10000);
      $location.url('admin/create');
    }
    else {
      $location.url('/login');
    }
  };

  $scope.studentFn = "";
  $scope.studentLn = "";
  $scope.gender = "";
  $scope.phone = "";
  $scope.state = "";
  $scope.dob = "";
  var addParam = {};

  $scope.addStudent = function(){
    if(localStorage.getItem('userToken')){
      $scope.registration = true;
      addParam.regnumber  = $scope.regnumber;
      addParam.firstname = $scope.studentFn;
      addParam.lastname = $scope.studentLn;
      addParam.gender = $scope.gender;
      addParam.phone = $scope.phone;
      addParam.state = $scope.state;
      addParam.dob = $scope.dob;

      ApiService.addStudent(addParam).then(function(res){
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

  $scope.deleteStudent = function(ev, student){
    var confirm = $mdDialog.confirm()
      .title("Delete "+student.lastname+"'s Profile")
      .content('Are you sure?')
      .ariaLabel('del user')
      .ok('Please do it!')
      .cancel('Not sure anymore')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      ApiService.deleteStudent(student.regnumber).then(function(res){
        $scope.loadData('students');
      });
    });
    
  };

  $scope.editStudent = function(ev, student){
    localStorage.setItem('studentId', angular.toJson(student.regnumber));
    $mdDialog.show({
      controller: studentEdit,
      locals: {regNumber: student.regnumber},
      templateUrl: "/app/views/student-edit.view.html",
      targetEvent: ev
    });
  };

  function studentEdit($scope, $mdDialog, AppService, regNumber){
    var stdt = angular.fromJson(localStorage.getItem('studentId'));
    var studentId = regNumber;
    console.log(studentId);
    var editinfo = {};
    ApiService.getStudent(stdt).then(function(res){
      editinfo = res.data[0];
      $scope.editstdtfirst = editinfo.firstname;
      $scope.editstdtlast = editinfo.lastname;
      // $scope.editstdtmail = editinfo.email;
      $scope.editstdtgender = editinfo.gender;
      $scope.editstdtphone = editinfo.phone;
      $scope.editstdtstate = editinfo.state;
      // $scope.editstdtdob = editinfo.dob;
    });
  }

}]);