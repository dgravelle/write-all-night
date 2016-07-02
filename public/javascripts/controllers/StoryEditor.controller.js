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

    function StoryEditor($scope, $timeout, $window, textAngularManager, getStory, StoriesService) {
      const user_id = $window.localStorage.getItem('id');

      $scope.hello = 'hello';
      $scope.editor;
      $scope.wordTotal;

      var story = getStory.data;

      function getEditor() {
        $scope.editor = textAngularManager.retrieveEditor('myEditorName');
      }

      function saveProgress() {
        StoriesService.saveProgress(user_id, story.id, $scope.wordTotal);
        $timeout(saveProgress, 60000);
      }

      function saveStoryContent() {
        
      }

      $scope.wordCount = function() {
        $scope.wordTotal = $scope.editor.scope.wordcount;
      }

      $timeout(getEditor, 0);

      saveProgress();

    }


})()
