(function () {

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'UserService'];

    function LoginController($scope, UserService) {


      const vm = this;

      vm.form = {}

      vm.login = function (user) {
        console.log(user);
        UserService.login(user).then(user => {

        })
      }
    }

})()
