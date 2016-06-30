(function () {

  angular
    .module('app')
    .controller('StoriesController', StoriesController);

    StoriesController.$inject = ['$scope', 'StoriesService'];

    function StoriesController($scope, StoriesService) {
      console.log('hello');
      $scope.addNewStory = function(newStory) {
        console.log(newStory);
      }
    }
})()
