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

        var obj = {};
        for (var i = 0; i < $scope.writingProgress.length; i++) {
          var x = moment($scope.writingProgress[i].date_saved).get('date');
          var y = $scope.writingProgress[i].word_total;
          obj[x] = y;
        }
        // return obj;
        var dataPointsz = [];
        var lastTotal = 0;
        debugger;
        for (var i = 1; i <= moment().get('date'); i++) {
          if (obj.hasOwnProperty(i)) {
            lastTotal = obj[i];
            dataPointsz.push(lastTotal);
          }
          else {
            dataPointsz.push(lastTotal);
          }
        }
        return dataPointsz;

      }

      $scope.chartData = createPoints($scope.writingProgress);
      $scope.labels = chartMonth;
      $scope.points = [$scope.chartData];

      var steps = 50000 / 10000;
      $scope.option = {
        scaleOverride: true,
        scaleSteps: steps,
        scaleStepWidth: Math.ceil(50000 / steps),
        scaleStartValue: 0
      }

      console.log($scope.chartData);


      $timeout(() => {
        getLatestStory();
      },0)

    }
})()
