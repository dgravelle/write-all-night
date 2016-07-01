(function () {

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, UserService) {
      $scope.hello = 'hello';

      $scope.form = {};

      $scope.handleRegistration = function() {

        UserService.createUser($scope.form).then(data => {
          // data = JSON.parse(data);
          console.log('login data: ', data);
          $location.path('/users/' + data.data.id);
        })
        .catch(err => {
          console.log(err);
          $location.path('/');
        })
      }
    }

})()
