(function () {

  angular
    .module('app')
    .controller('StoriesController', StoriesController);

    StoriesController.$inject = ['$scope', '$window', '$location', 'StoriesService'];

    function StoriesController($scope, $window, $location, StoriesService) {

      // $scope.newStory = {}

      $scope.addNewStory = function(newStory) {
        console.log();
        if (!newStory) {
          return 'yo finish filling out the form';
        }

        newStory.user_id = parseInt($window.localStorage.getItem('id'));

        return StoriesService.newStory(newStory).then(story => {
          var userID = $window.localStorage.getItem('id');
          $location.path('/users/' + userID + '/story/' + story.data[0].id)
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
})()
