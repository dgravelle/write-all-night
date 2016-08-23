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
        return UserService.createUser(user).then(data => {
          if (data.status > 400) {
            $scope.showError = true;
            $scope.error = 'Sorry, that email is already in use';

            return $scope.error;
          }
          else {
            $location.path('/users/' + data.data.id + '/new-story');

            return 'success';
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
