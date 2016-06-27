(function () {

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

    function RegisterController($scope, UserService) {
      $scope.hello = 'hello';

      $scope.form = {};

      $scope.handleRegistration = function() {
        console.log($scope.form);

        UserService.createUser($scope.form).then(data => {
          console.log('success ', data);
        })
        .catch(err => {
          console.log(err);
        });
      }
    }

})()
