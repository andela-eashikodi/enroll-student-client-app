'use strict';

App.controller('StudentCtrl', ['$scope', 'ApiService', '$location', '$mdDialog', function ($scope, ApiService, $location, $mdDialog){

  $scope.loadData = function(){
    if(localStorage.getItem('userToken')){
      $location.url('/admin/list');
      $scope.loading = true;
      ApiService.getStudents().then(function(res){
        $scope.list = res.data;
        $scope.loading = false;
      });
    }
    else {
      $location.url('/login');
    }
    
  };

  $scope.loadView = function(){
    $location.url('admin/home');
  };

  $scope.registrationForm = function(){
    if(localStorage.getItem('userToken')){
      $scope.regnumber = Math.floor(Math.random()*10000);
      $location.url('admin/create');
    }
    else {
      $location.url('/login');
    }
  };

  $scope.addStudent = function(){
    if(localStorage.getItem('userToken')){
      $scope.registration = true;

      ApiService.addStudent($scope.student).then(function(res){
        if(res.data.regnumber===undefined){
          $scope.registration = false;
          $scope.regtaken = true;
        }
        else {
          $scope.registration = false;
          $location.url('/admin/list');
          $scope.student = {};
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
    $mdDialog.show({
      clickOutsideToClose: false,
      controller: studentEdit,
      escapeToClose: false,
      locals: {student: student},
      templateUrl: "/app/views/student-edit.view.html",
      targetEvent: ev
    });
  };

  function studentEdit($scope, $mdDialog, student){
    var oldStudent = angular.copy(student);
    $scope.entry = student;

    $scope.edit = function(){
      $scope.editing = true;
      ApiService.updateStudent($scope.entry.regnumber, $scope.entry).then(function(res){
        $scope.editing = false;
        $mdDialog.hide();
      });
    };

    $scope.cancel = function(){
      $scope.entry.firstname = oldStudent.firstname;
      $scope.entry.lastname = oldStudent.lastname;
      $scope.entry.gender = oldStudent.gender;
      $scope.entry.state = oldStudent.state;
      $scope.entry.phone = oldStudent.phone;
      $mdDialog.cancel();
    };
  }

}]);