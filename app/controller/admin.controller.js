'use strict';
App.controller('AdminCtrl', ['$scope', 'ApiService', '$location', 'AppService', '$mdDialog', function ($scope, ApiService, $location, AppService, $mdDialog){
  
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
      templateUrl: "/app/views/admin-edit.user.html",
      targetEvent: ev
    });
  };

  function editProfile($scope, $mdDialog, AppService, user){
    var old_user = angular.copy(user);
    $scope.user = user;
    var userId = angular.fromJson(localStorage.getItem('userName'));

    $scope.edit = function(){
      $scope.editinguser = true;
      ApiService.updateUser(user, $scope.user).then(function(res){
        $scope.editinguser = false;
        $mdDialog.hide();
        // AppService.addProf(res.data[0]);
      });
    };

    $scope.cancel = function(){
      $scope.user = old_user;
      $mdDialog.hide();
      console.log('old user: ', old_user.firstname);
    };
  } 

  $scope.loadProfile = function(){
    if(localStorage.getItem('userToken')){
      var userId = angular.fromJson(localStorage.getItem('userName'));
      ApiService.getUser(userId).then(function(resp){
        $scope.user = resp.data[0]; // because only one user and it is the first object in the data
        $location.url('/admin/home');
      });
    }
    else {
      $location.url('/login');
    }
  };

}]);