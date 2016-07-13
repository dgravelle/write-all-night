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

      console.log(story);

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
        // $scope.editor.scope.html = story.story_content;
        $scope.myEditor = $interpolate(story.story_content)($scope);

      }

      function saveProgress() {
        console.log('word from editor: ', $scope.editor.scope.wordcount);
        StoriesService.saveProgress(user_id, story.id, $scope.editor.scope.wordcount);
        $scope.storyContent = $scope.editor.scope.html;
        StoriesService.saveContent(user_id, { content: $scope.storyContent });
        // console.log($scope.storyContent);
        console.log('saving');
      }

      $scope.$on('$destroy', () => {
        saveProgress();
        $interval.cancel(save);

      });

    }


})()
