(function () {

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

    function RegisterController($scope, UserService) {
      $scope.hello = 'hello';

      $scope.form = {};

      $scope.handleRegistration = function(data) {
        console.log($scope.form);

        UserService.login(user).then(data => {

        });

        UserService.createUser($scope.form).then(data => {
          console.log(data);
        });
      }
    }

})()
