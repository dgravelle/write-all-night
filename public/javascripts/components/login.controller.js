(function () {

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', 'UserService'];

    function LoginController($scope, $location, UserService) {

      const vm = this;

      vm.form = {}

      vm.login = function (user) {
        // console.log(user);
        UserService.login(user).then(user => {
          console.log(user);
          user = JSON.parse(user);
          $location.path('/users/' + user.id)
        })
        .catch(err => {
          console.log(err);
        })
      }
    }

})()
