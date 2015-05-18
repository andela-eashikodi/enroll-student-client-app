'use strict';

describe('Enroll app', function(){
  browser.get('index.html');

  it('should display text', function(){
    expect(browser.getLocationAbsUrl()).toMatch('localhost:8080/#/login');
  });
});