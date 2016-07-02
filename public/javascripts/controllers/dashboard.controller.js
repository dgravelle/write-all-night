(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', 'UserService', 'getUser', 'allStories', 'latestStory'];

    function DashboardController($scope, UserService, getUser, allStories, latestStory) {
      $scope.currentUser = getUser;

      $scope.allStories = allStories.data;
      $scope.latestStory = latestStory;

      console.log($scope.allStories);
      console.log($scope.latestStory);
    }
})()
