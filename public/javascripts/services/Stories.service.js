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
            return $http.get('/stories/all/' + userId).then(stories => {
              console.log(stories);
              return stories;
            })
            .catch(err => {
              return err;
            });
        },

        getLatestStory: function (userId) {
          return $http.get('/stories/latest/' + userId);
        },

        getWritingProgress: function(id) {
          return $http.get('/stories/calendar/' + id).then(data => {
            console.log(data);
            return data.data;
          })
          .catch(err => {
            return err;
          })
        },

        saveProgress: function (user_id, storyId, wordTotal) {
          var story = {
            user_id: user_id,
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
