'use strict';

var App = angular.module('Enroll', ['ui.router', 'ngMaterial']);

App.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login',{
      url: '/login',
      templateUrl: 'app/views/admin-login.view.html'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/views/admin.view.html'
    })
    .state('admin.create', {
      url: '/create',
      templateUrl: 'app/views/student-create.view.html'
    })
    .state('admin.home', {
      url: '/home',
      templateUrl: 'app/views/admin-home.view.html'
    })
    .state('admin.list', {
      url: '/list',
      templateUrl: 'app/views/student-list.view.html'
    });
});