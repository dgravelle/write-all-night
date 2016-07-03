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
      var save;

      $scope.editor;
      $scope.wordTotal;
      $scope.focused = false;
      $scope.onFocus = function() {
        $scope.focused = true;
        saveProgress();
      }

      $scope.loseFocus = function() {
        $scope.focused = false;
        $timeout.cancel(save);
      }

      var story = getStory.data;

      function getEditor() {
        $scope.editor = textAngularManager.retrieveEditor('myEditorName');
        console.log($scope.editor);
      }

      function saveProgress() {
        StoriesService.saveProgress(user_id, story.id, $scope.wordTotal);
        console.log('saving');
        save = $timeout(saveProgress, 60000);;
      }

      function saveStoryContent() {

      }

      $scope.wordCount = function() {
        $scope.wordTotal = $scope.editor.scope.wordcount;
      }

      $timeout(getEditor, 0);


    }


})()
