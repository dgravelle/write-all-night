(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', '$timeout', 'UserService', 'getUser', 'allStories', 'writingProgress'];

    function DashboardController($scope, $timeout, UserService, getUser, allStories, writingProgress) {

      $scope.currentUser = getUser;
      $scope.writingProgress = writingProgress;
      $scope.latestStory;

      $scope.allStories = allStories.data;

      function getLatestStory() {
        var latest = $scope.writingProgress[$scope.writingProgress.length - 1];

        for (var i = 0; i < $scope.allStories.length; i++) {
          if ($scope.allStories[i].id === latest.story_id) {
            $scope.latestStory = $scope.allStories[i];
            $scope.latestStory.word_total = latest.word_total;
          }
        }
      }

      var chartMonth = [];
      var chartPoints = [];

      for (var i = 1; i <= moment().daysInMonth(); i++) {
        chartMonth.push(i.toString());
      }

      function createPoints(progress) {

      }

      console.log(chartMonth);


      $scope.labels = chartMonth;
      $scope.series = ['Series A', 'Series B'];
      $scope.points = [
        [65, 59, 80, 81, 56, 55, 40]
      ];
      $timeout(() => {
        getLatestStory();
      },0)

    }
})()
