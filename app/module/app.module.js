'use strict';

var App = angular.module('Enroll', ['ui.router', 'ngMaterial']);

App.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/admin/home');

  $stateProvider
    .state('login',{
      url: '/login',
      templateUrl: 'app/views/login.view.html'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/views/admin.view.html'
    })
    .state('admin.create',{
      url: '/create',
      templateUrl: 'app/views/create.view.html'
    })
    .state('admin.home', {
      url: '/home',
      templateUrl: 'app/views/home.view.html'
    })
    .state('admin.list', {
      url: '/list',
      templateUrl: 'app/views/list.view.html'
    });
});