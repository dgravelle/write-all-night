(function () {

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', 'UserService'];

    function LoginController($scope, $location, UserService) {

      var vm = this;

      vm.form = {}

      $scope.showError = false;
      $scope.error;

      vm.login = function (user) {
        UserService.login(user).then(user => {

          if (typeof user.data === 'string') {
            $scope.error = user.data;
            $scope.showError = true;

            return user.data;
          }
          else {
            $location.path('/users/' + user.data.id);

            return 'success';
          }
        })
        .catch(err => {
          console.log(err);
        })
      }

      return vm;
    }

})()
