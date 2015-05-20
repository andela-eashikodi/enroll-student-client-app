'use strict';

describe('Enroll App', function(){
  var AdminScope, LoginScope, StudentScope;
  var AdminCtrl, LoginCtrl, StudentCtrl;
  beforeEach(function(){
    module('Enroll');
    inject(function($controller, $rootScope){
      AdminScope = $rootScope.$new();
      LoginScope = $rootScope.$new();
      StudentScope = $rootScope.$new();
      AdminCtrl = $controller('AdminCtrl', {$scope:AdminScope});
      LoginCtrl = $controller('LoginCtrl', {$scope:AdminScope});
      StudentCtrl = $controller('StudentCtrl', {$scope:AdminScope});
    });
  });

  it('Controllers should be defined...', function(){
    expect(AdminCtrl).toBeDefined();
    expect(LoginCtrl).toBeDefined();
    expect(StudentCtrl).toBeDefined();
    expect(AdminScope.removeUser).toBeDefined();
    expect(LoginScope).toBeDefined();
    expect(StudentScope).toBeDefined();
  });
});