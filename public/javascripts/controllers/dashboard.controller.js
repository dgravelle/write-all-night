(function () {

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

    DashboardController.$inject = ['$scope', 'UserService', 'getUser', 'allStories'];

    function DashboardController($scope, UserService, getUser, allStories) {
      $scope.currentUser = getUser;
      // $scope.stories = StoriesService.getStories()


      var vm = this;
      vm.allStories = allStories;

      console.log(vm.allStories);
    }
})()
