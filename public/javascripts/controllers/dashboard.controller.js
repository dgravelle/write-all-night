(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', '$timeout', 'UserService', 'getUser', 'allStories', 'writingProgress'];

    function DashboardController($scope, $timeout, UserService, getUser, allStories,  writingProgress) {

      $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
      $scope.series = ['Series A', 'Series B'];
      $scope.points = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };

      // Simulate async data update
      // $timeout(function () {
      //   $scope.data = [
      //     [28, 48, 40, 19, 86, 27, 90],
      //     [65, 59, 80, 81, 56, 55, 40]
      //   ];
      // }, 3000);

      $scope.currentUser = getUser;
      $scope.writingProgress = writingProgress;

      $scope.allStories = allStories.data;
      $scope.latestStory = $scope.writingProgress[$scope.writingProgress.length - 1];

    }
})()
