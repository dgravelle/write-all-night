(function () {

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

    function RegisterController($scope) {
      $scope.hello = 'hello';

      $scope.form = {};

      $scope.handleRegistration = function(data) {
        console.log($scope.form);
      }
    }

})()
