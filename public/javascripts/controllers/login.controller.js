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
        return UserService.login(user).then(user => {
          console.log(user);
          if (typeof user.data === 'string') {
            $scope.error = user.data;
            $scope.showError = true;

            return user.data;
          }
          else {
            $location.path('users/' + user.data.id);

            return 'success';
          }
        })
        .catch(err => {
          return 'failed'
          console.log(err);
        })
      }

      return vm;
    }

})()
