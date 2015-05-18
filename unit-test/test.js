'use strict';

describe('App ctrl', function(){
  var scope, controller;
  beforeEach(function(){
    module('Enroll');
    inject(function($controller, $rootScope){
      scope = $rootScope.new();
      controller = $controller('AdminCtrl', {$scope:scope});
    });
  });

  it('testing...', function(){
    expect(1+1).toEqual(2);
  });
});