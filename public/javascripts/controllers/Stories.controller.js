(function () {

  angular
    .module('app')
    .controller('StoriesController', StoriesController);

    StoriesController.$inject = ['$scope', '$window', '$location', 'StoriesService'];

    function StoriesController($scope, $window, $location, StoriesService) {
      var today = new Date();
      var nextMonth = new Date();

      nextMonth.setMonth(nextMonth.getMonth() + 1);

      $scope.newStory = {}
      $scope.newStory.title = 'Your next writing challenge!';
      $scope.newStory.deadlineStarts = today;
      $scope.newStory.deadlineEnds = nextMonth;
      $scope.newStory.word_goal = 50000;

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
