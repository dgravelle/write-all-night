(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', 'UserService', 'getUser', 'allStories', 'writingProgress'];

    function DashboardController($scope, UserService, getUser, allStories,  writingProgress) {
      $scope.currentUser = getUser;
      $scope.writingProgress = writingProgress;

      $scope.allStories = allStories.data;
      $scope.latestStory = $scope.writingProgress[$scope.writingProgress.length - 1];

    }
})()
