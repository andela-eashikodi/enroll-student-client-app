'use strict';

var App = angular.module('Enroll', ['ngRoute', 'ngMaterial']);

App.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/login',{
    templateUrl: 'app/views/home.view.html',
    controller: 'EnrollCtrl'
  }).
  when('/admin',{
    templateUrl: 'app/views/admin.view.html',
    controller : 'EnrollCtrl'
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);