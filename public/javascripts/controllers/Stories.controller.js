(function () {

  angular
    .module('app')
    .controller('StoriesController', StoriesController);

    StoriesController.$inject = ['$scope', '$window', '$location', 'StoriesService', 'allStories'];

    function StoriesController($scope, $window, $location, StoriesService, allStories) {
      $scope.allStories = allStories;
      $scope.user_id = $window.localStorage.getItem('id');


    }
})()
