(function () {

  angular
    .module('app')
    .controller('StoryEditor', StoryEditor)

    StoryEditor.$inject = ['$scope',
      '$timeout',
      '$window',
      'textAngularManager',
      'getStory',
      'StoriesService'];

    function StoryEditor($scope,
      $timeout,
      $window,
      textAngularManager,
      getStory,
      StoriesService) {

      $scope.hello = 'hello';
      $scope.editor;
      $scope.wordTotal;

      var story = getStory.data;

      console.log('story: ', story);

      function getEditor() {
        $scope.editor = textAngularManager.retrieveEditor('myEditorName');
      }

      function saveProgress() {
        console.log('saving');

        StoriesService.saveProgress(story.id, $scope.wordTotal);
        $timeout(saveProgress, 60000);
      }

      $scope.wordCount = function() {
        $scope.wordTotal = $scope.editor.scope.wordcount;
      }

      $timeout(getEditor, 0);

      saveProgress();

    }


})()
