(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', '$timeout', '$mdSidenav', 'UserService', 'getUser', 'writingProgress'];

    function DashboardController($scope, $timeout, $mdSidenav, UserService, getUser, writingProgress) {
      // side nav

      console.log(writingProgress);
      // story chart
      $scope.storyData = writingProgress;
      $scope.currentUser = getUser;
      $scope.writingProgress = writingProgress;

      // writing progress
    }
})()
