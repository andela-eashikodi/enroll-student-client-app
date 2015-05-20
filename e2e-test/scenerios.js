'use strict';

describe('Enroll app', function(){

  beforeEach(function(){
    browser.get('index.html');
  });
  

  it('should redirect to loin page', function(){
    expect(browser.getLocationAbsUrl()).toMatch(/login/);
  });

  it('should accept a valid login and perform admin roles', function(){
    var username = element(by.model('login.username'));
    var password = element(by.model('login.password'));
    var findStudent = element(by.model('find.lastname'));
    var newFirstname = element(by.model('student.firstname'));
    var newLastname = element(by.model('student.lastname'));
    var newGender = element(by.model('student.gender'));
    var newState = element(by.model('student.state'));
    var newNumber = element(by.model('student.phone'));
    var newDob = element(by.model('student.dob'));
    
    var noResult = element.all(by.id('noResult'));
    var loginButton = element.all(by.id('login'));
    var viewStudents = element.all(by.id('viewStudents'));
    var createStudent = element.all(by.id('createStudent'));
    var newReg = element.all(by.id('newReg'));
    var studentList = element.all(by.repeater('student in filtered = ( list | filter: find)'));

    username.sendKeys('tom');
    password.sendKeys('tom');
    loginButton.click();
    expect(browser.getLocationAbsUrl()).toMatch(/admin/);

    createStudent.click();
    newFirstname.sendKeys('Cole');
    newLastname.sendKeys('Adam');
    newGender.sendKeys('Male');
    newState.sendKeys('Adamawa');
    newNumber.sendKeys('234992992');
    newDob.sendKeys('11/11/1990');
    newReg.click();

    viewStudents.click();
    findStudent.sendKeys('unregistered student');
    expect(studentList.count()).toBe(0);
  
  });

  it('should reject invalid login', function(){
    var username = element(by.model('login.username'));
    var password = element(by.model('login.password'));
    var loginButton = element.all(by.id('login'));

    username.sendKeys('wrong-user');
    password.sendKeys('wrong-password');
    loginButton.click();
    expect(browser.getLocationAbsUrl()).not.toMatch(/admin/);
  });

});