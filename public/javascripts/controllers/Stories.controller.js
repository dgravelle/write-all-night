(function () {

  angular
    .module('app')
    .controller('StoriesController', StoriesController);

    StoriesController.$inject = ['$scope', 'StoriesService'];

    function StoriesController($scope, StoriesService) {

      // $scope.newStory = {}

      $scope.addNewStory = function(newStory) {
        if (!newStory) {
          return 'yo finish filling out the form';
        }
        console.log(newStory);
        return StoriesService.newStory(newStory);
      }
    }
})()
