(function () {

  angular
    .module('app')
    .service('StoriesService', StoriesService);

    StoriesService.$inject = ['$http'];

    function StoriesService($http) {
      return {

        newStory: function(newStory) {
          console.log(newStory);

          return $http.post('/stories', newStory).then(story => {
            console.log(story);
            return story;
          })
          .catch(err => {
            console.log(err);
          });
        },

        getStory: function(storyId) {
          console.log(storyId);
          return $http.get('/stories/' + storyId).then(story => {
            console.log(story);
            return story;
          })
          .catch(err => {
            console.log(err);
          });
        },

        saveProgress: function (storyId, wordTotal) {
          var story = {
            story_id: storyId,
            word_count: wordTotal
          }
          console.log(story);
          return $http.post('/stories/saving-progress', story).then(story => {
            console.log(story);
          })
          .catch(err => {
            console.log(err);
          })
        }

      }
    }

})()
