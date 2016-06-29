(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', 'UserService', 'getUser'];

    function DashboardController($scope, UserService, getUser) {
      $scope.currentUser = getUser;

      var vm = this;
    }
})()
