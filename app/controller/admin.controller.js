'use strict';
App.controller('AdminCtrl', ['$scope', 'ApiService', function ($scope, Api){
  $scope.onFileSelect = function(element) {
    var photofile = element.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        $scope.$apply(function() {
          $scope.prev_img = e.target.result;
          console.log($scope.prev_img, 'scopes prev_img');
        });
    };
    reader.readAsDataURL(photofile);
  };
  
  $scope.loadData = function(e){
    Api.apiData().then(function(res){
      console.log(res);
    });
  };

  $scope.list = [
    {
      pic:'http://emeagwali.com/photos/stock/onitsha-nigerian-passport-1973/philip-emeagwali-nigerian-passport-portrait-1973.jpg',
      regnumber:43,
      firstname:'emeka',
      lastname: 'ashikodi',
      gender: 'male',
      state: 'imo',
      dob: '11-11-2000'
    },
    {
      pic:'http://img3.wikia.nocookie.net/__cb20130716065905/marvel_dc/images/0/09/Passport_picture.jpg',
      regnumber:44,
      firstname:'steven',
      lastname: 'sunday',
      gender: 'male',
      state: 'kaduna',
      dob: '11-11-1995'
    },
     {
      pic:'http://emeagwali.com/photos/stock/onitsha-nigerian-passport-1973/philip-emeagwali-nigerian-passport-portrait-1973.jpg',
      regnumber:43,
      firstname:'emeka',
      lastname: 'ashikodi',
      gender: 'male',
      state: 'imo',
      dob: '11-11-2000'
    }
  ];
}]);

App.factory('ApiService', ['$http', function($http){
  return {
    apiData : function(){
      return $http.get('https://student-enrol.herokuapp.com/api/v1/students?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NTRjYWVhMWQ5ZjUwYmEwMTVhZTg4MWMiLCJmaXJzdG5hbWUiOiJvbnllIiwibGFzdG5hbWUiOiJhc2hpa29kaSIsImVtYWlsIjoiZW1la2EuYXNoaWtvZGlAYW5kZWxhLmNvIiwidXNlcm5hbWUiOiJhc2hpa29kaSIsInBhc3N3b3JkIjoiYXNoaWtvZGkiLCJfX3YiOjB9.sL_rPab9RdaQX_ULMbxiI49DR8oY0e7r3aRk7utJ_yo');
    }
  };
}]);