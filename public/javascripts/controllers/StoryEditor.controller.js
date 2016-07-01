(function () {

  angular
    .module('app')
    .controller('StoryEditor', StoryEditor)

    StoryEditor.$inject = ['$scope'];

    function StoryEditor($scope) {
      $scope.hello = 'hello';
    }

})()
