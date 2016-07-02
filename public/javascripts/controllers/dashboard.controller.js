(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', 'UserService', 'getUser', 'allStories'];

    function DashboardController($scope, UserService, getUser, allStories) {
      $scope.currentUser = getUser;

      $scope.allStories = allStories.data;
      console.log(allStories);
    }
})()
