'use strict';

var App = angular.module('Enroll', ['ui.router', 'ngMaterial']);

App.service('AppService', function() {
  var prof; 

  this.addProf = function(usr){

    prof = usr;
  };

  this.getProf = function(){
    return prof;
  };

  // return {
  //   addText: this.addText,
  //   getText: this.getText
  // };
});

App.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/login');

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