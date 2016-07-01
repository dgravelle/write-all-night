(function () {

  angular
    .module('app')
    .controller('StoryEditor', StoryEditor)

    StoryEditor.$inject = ['$scope', 'textAngularManager', '$timeout'];

    function StoryEditor($scope, textAngularManager, $timeout) {

      $scope.hello = 'hello';
      $scope.editor;
      $scope.wordTotal;

      function getEditor() {
        $scope.editor = textAngularManager.retrieveEditor('myEditorName');
      }

      $scope.wordCount = function() {
        $scope.wordTotal = $scope.editor.scope.wordcount;
      }

      $timeout(getEditor, 0);

    }


})()
