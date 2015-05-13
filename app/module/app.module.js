'use strict';

var App = angular.module('Enroll', ['ngRoute', 'ngMaterial']);

App.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/home',{
    templateUrl: 'app/view/homeview.html',
    controller: 'EnrollCtrl'
  }).
  when('/sign',{
    templateUrl: 'app/view/adminview.html',
    controller : 'EnrollCtrl'
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);