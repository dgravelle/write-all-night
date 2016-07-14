'use strict';

(function () {

  angular
    .module('app')
    .controller('StoryEditor', StoryEditor)

    StoryEditor.$inject = ['$scope',
      '$interpolate',
      '$interval',
      '$timeout',
      '$window',
      'textAngularManager',
      'getStory',
      'StoriesService'];

    function StoryEditor($scope, $interpolate, $interval, $timeout, $window, textAngularManager, getStory, StoriesService) {
      $timeout(getEditor, 0);

      const user_id = $window.localStorage.getItem('id');
      const save = $interval(saveProgress, 60000);
      const story = getStory.data;
      const story_id = story.story_id;

      $scope.title = story.title

      $scope.storyContent;
      $scope.editor;
      $scope.wordTotal;
      $scope.focused = false;
      $scope.onFocus = function() {
        $scope.focused = true;

      }

      $scope.loseFocus = function() {
        $scope.focused = false;
        saveProgress();
        $interval.cancel(save);
      }

      function getEditor() {
        $scope.editor = textAngularManager.retrieveEditor('myEditorName');
        $scope.myEditor = $interpolate(story.story_content)($scope);

      }

      function saveProgress() {
        StoriesService.saveProgress(user_id, story.id, $scope.editor.scope.wordcount);
        $scope.storyContent = $scope.editor.scope.html;
        StoriesService.saveContent(story.id, { content: $scope.storyContent });
      }

      $scope.$on('$destroy', () => {
        saveProgress();
        $interval.cancel(save);

      });

    }


})()
