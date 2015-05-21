'use strict';

describe('Enroll app', function(){
  browser.get('index.html');

  it('should redirect to login page', function(){
    expect(browser.getLocationAbsUrl()).toMatch(/login/);
  });

  describe('Ctrl', function(){
    it('should perform valid login', function(){
      var username = element(by.model('login.username'));
      var password = element(by.model('login.password'));
      var loginButton = element.all(by.id('login'));

      username.sendKeys('tom');
      password.sendKeys('tom');

      loginButton.click();
      expect(browser.getLocationAbsUrl()).toMatch(/admin/);

    });

    it('should successfully edit a user', function(){
      var editFirstname = element(by.model('user.firstname'));
      var editUser = element.all(by.id('editUser'));
      var editButton = element.all(by.id('edit'));

      editUser.click();
      editFirstname.sendKeys('-s');
      editButton.click();
    });

    it('should be able to register student', function(){
      browser.get('/#/admin/create');
      var newFirstname = element(by.model('student.firstname'));
      var newLastname = element(by.model('student.lastname'));
      var newGender = element(by.model('student.gender'));
      var newState = element(by.model('student.state'));
      var newNumber = element(by.model('student.phone'));
      var newDob = element(by.model('student.dob'));
      var createStudent = element.all(by.id('createStudent'));
      var newReg = element.all(by.id('newReg'));

      createStudent.click();
      newFirstname.sendKeys('Cole');
      newLastname.sendKeys('Adam');
      newGender.sendKeys('Male');
      newState.sendKeys('Adamawa');
      newNumber.sendKeys('234992992');
      newDob.sendKeys('11/11/1990');
      newReg.click();
      expect(browser.getLocationAbsUrl()).toMatch(/list/);
    });

    it('should perform search on a student', function(){
      browser.get('/#/admin/list');
      var studentList = element.all(by.repeater('student in filtered = ( list | filter: find)'));
      var findStudent = element(by.model('find.lastname'));
      findStudent.sendKeys('unregistered-student');
      expect(studentList.count()).toBe(0);
    });
  });

  it('should reject invalid login', function(){
    browser.get('index.html');
    var username = element(by.model('login.username'));
    var password = element(by.model('login.password'));
    var loginButton = element.all(by.id('login'));

    username.sendKeys('wrong-user');
    password.sendKeys('wrong-password');
    loginButton.click();
    expect(browser.getLocationAbsUrl()).not.toMatch(/admin/);
  });

});