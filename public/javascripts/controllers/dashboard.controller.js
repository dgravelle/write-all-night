(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', '$timeout', 'UserService', 'getUser', 'allStories', 'writingProgress'];

    function DashboardController($scope, $timeout, UserService, getUser, allStories, writingProgress) {

      // story chart
      $scope.storyData = writingProgress;
      $scope.currentUser = getUser;
      $scope.writingProgress = writingProgress;
      $scope.allStories = allStories;

      // writing progress
      // $scope.month = moment().month();
      // $scope.year = moment().year();

    }
})()
