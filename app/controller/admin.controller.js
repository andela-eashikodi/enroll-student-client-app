'use strict';
App.controller('AdminCtrl', ['$scope', 'ApiService', '$location', '$mdDialog', function ($scope, ApiService, $location, $mdDialog){
  
  $scope.removeUser = function(ev){
    var confirm = $mdDialog.confirm()
      .title('Delete Account')
      .content('Are you sure you want to delete account?')
      .ariaLabel('del user')
      .ok('Please do it!')
      .cancel('Not sure anymore')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      var userId = angular.fromJson(localStorage.getItem('userName'));
      ApiService.removeUser(userId).then(function(res){
        localStorage.removeItem('userToken');
        $location.url('/login');
      });
    });
  };

  $scope.signOut = function(ev){
    var confirm = $mdDialog.confirm()
      .title('Sign Out')
      .content('You are about to leave this page')
      .ariaLabel('sign out')
      .ok('Yes')
      .cancel('Cancel')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function(){
      localStorage.removeItem('userToken');
      $location.url('/login');
    });
  };

  $scope.editUser = function(ev, user){
    $mdDialog.show({
      clickOutsideToClose: false,
      controller: editProfile,
      escapeToClose: false,
      locals: {user: user},
      templateUrl: "app/views/admin-edit.view.html",
      targetEvent: ev
    });
  };

  function editProfile($scope, $mdDialog, user){
    var old_user = angular.copy(user);
    $scope.user = user;

    $scope.edit = function(){
      localStorage.setItem('userName', angular.toJson($scope.user.username));
      $scope.editingUser = true;

      ApiService.updateUser(old_user.username, $scope.user).then(function(res){
        $scope.editingUser = false;
        $mdDialog.hide();
      });
    };

    $scope.cancel = function(){
      $scope.user.lastname = old_user.lastname;
      $scope.user.firstname = old_user.firstname;
      $scope.user.username = old_user.username;
      $scope.user.email = old_user.email;
      $mdDialog.hide();
    };
  } 

  $scope.loadProfile = function(){
    if(localStorage.getItem('userToken')){
      var userId = angular.fromJson(localStorage.getItem('userName'));
      ApiService.getUser(userId).then(function(resp){
        $scope.user = resp.data[0]; // because only one user and it is the first object in the data
      });
    }
    else {
      $location.url('/login');
    }
  };

}]);