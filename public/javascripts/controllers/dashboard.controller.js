(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', 'UserService', 'getUser'];

    function DashboardController($scope, UserService, getUser) {
      $scope.currentUser = getUser;
      // $scope.stories = StoriesService.getStories()

      $scope.addNewStory = function(story) {
        
      }
      var vm = this;
    }
})()
