(function () {

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

    function RegisterController($scope, UserService) {
      $scope.hello = 'hello';

      $scope.form = {};

      $scope.handleRegistration = function() {
        console.log($scope.form);

        return UserService.createUser($scope.form)
      }
    }

})()
