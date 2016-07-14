(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', '$timeout', '$mdSidenav', 'UserService', 'getUser', 'storyReport'];

    function DashboardController($scope, $timeout, $mdSidenav, UserService, getUser, storyReport) {
      // side nav

      console.log(storyReport);
      // story chart
      $scope.currentUser = getUser;
      $scope.storyReport = storyReport;
      $scope.info = storyReport.info;
      $scope.points = storyReport.mapPoints;
      $scope.labels = storyReport.labels;

      $scope.writingStreak = storyReport.writingStreak;
      $scope.percentComplete = storyReport.percentComplete;
      $scope.wordsPerDay = storyReport.wordsPerDay;
      $scope.wordsPerDayLeft = storyReport.wordsPerDayLeft;
      $scope.daysLeft = storyReport.daysLeft;

      // writing progress
    }
})()
