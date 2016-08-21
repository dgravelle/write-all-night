(function () {

  angular
    .module('app')
    .controller('SignupController', SignupController);

    function SignupController($scope, $location, UserService) {
      var vm = this;
      vm.form = {};

      $scope.showError = false;
      $scope.error;

      vm.handleRegistration = function(user) {
        console.log(user);
        UserService.createUser(user).then(data => {
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
        });
      }

      return vm;
    }

})();
