'use strict';

(function () {

  angular
    .module('app')
    .controller('StoryEditor', StoryEditor)

    StoryEditor.$inject = ['$scope',
      '$interval',
      '$timeout',
      '$window',
      'textAngularManager',
      'getStory',
      'StoriesService'];

    function StoryEditor($scope, $interval, $timeout, $window, textAngularManager, getStory, StoriesService) {
      $timeout(getEditor, 0);

      const user_id = $window.localStorage.getItem('id');
      const save = $interval(saveProgress, 60000);
      const story = getStory;

      $scope.storyContent;
      $scope.editor;
      $scope.wordTotal;
      $scope.focused = false;
      $scope.onFocus = function() {
        $scope.focused = true;
        saveProgress();
      }

      $scope.loseFocus = function() {
        $scope.focused = false;
        $interval.cancel(save);
        console.log('not saving');
      }



      console.log(story);

      function getEditor() {
        $scope.editor = textAngularManager.retrieveEditor('myEditorName');
        $scope.editor.scope.html = story.story_content;

      }

      function saveProgress() {
        StoriesService.saveProgress(user_id, story.id, $scope.wordTotal);
        $scope.storyContent = $scope.editor.scope.html;
        StoriesService.saveContent(user_id, { content: $scope.storyContent });
        console.log('saving');
        console.log($scope.storyContent);
      }

      $scope.wordCount = function() {
        $scope.wordTotal = $scope.editor.scope.wordcount;
      }


      $scope.$on('$destroy', () => {
        saveProgress();
        $interval.cancel(save);

      });

    }


})()
