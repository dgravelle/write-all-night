(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope'];

    function DashboardController($scope) {
      $scope.hello = 'hello'
    }
})()
