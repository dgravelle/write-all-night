(function () {

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, UserService) {
      $scope.hello = 'hello';
      $scope.showError = false;
      $scope.form = {};

      $scope.handleRegistration = function() {

        UserService.createUser($scope.form).then(data => {
          console.log('login data: ', data);

          if (typeof data.data === 'string') {
            $scope.showError = true;
            $scope.error = 'sorry that email is already in use';
          }
          else {
            $location.path('/users/' + data.data.id + '/new-story');
          }
        })
        .catch(err => {
          console.log(err);
          $location.path('/');
        })
      }
    }

})()
