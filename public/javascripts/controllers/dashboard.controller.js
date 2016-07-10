(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', '$timeout', '$mdSidenav', 'UserService', 'getUser', 'allStories', 'writingProgress'];

    function DashboardController($scope, $timeout, $mdSidenav, UserService, getUser, allStories, writingProgress) {
      // side nav

      // $scope.openLeftMenu = function() {
      //   $mdSidenav('left').toggle();
      // };

      console.log(writingProgress);
      // story chart
      $scope.storyData = writingProgress;
      $scope.currentUser = getUser;
      $scope.writingProgress = writingProgress;
      $scope.allStories = allStories;

      // writing progress

    }
})()
