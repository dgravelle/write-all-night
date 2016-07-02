(function () {

  angular
    .module('app')
    .service('StoriesService', StoriesService);

    StoriesService.$inject = ['$http'];

    function StoriesService($http) {
      return {

        newStory: function(newStory) {
          return $http.post('/stories', newStory).then(story => {
            return story;
          })
          .catch(err => {
            console.log(err);
          });
        },

        getStory: function(storyId) {
          return $http.get('/stories/' + storyId).then(story => {

            return story;
          })
          .catch(err => {
            console.log(err);
          });
        },

        getAllStories: function (userId) {
            console.log(userId);
            return $http.get('/stories/all/' + userId);
        },

        saveProgress: function (storyId, wordTotal) {
          var story = {
            story_id: storyId,
            word_count: wordTotal
          }

          return $http.post('/stories/saving-progress', story).then(story => {

          })
          .catch(err => {

          })
        }

      }
    }

})()
