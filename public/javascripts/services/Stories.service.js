(function () {

  angular
    .module('app')
    .service('StoriesService', StoriesService);

    StoriesService.$inject = ['$http'];

    function StoriesService($http) {
      return {
        allStories: undefined,
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
              return stories.data;
            })
            .catch(err => {
              return err;
            });
        },

        saveProgress: function(user_id, storyId, wordTotal) {
          var story = {
            user_id: user_id,
            story_id: storyId,
            word_count: wordTotal
          }

          return $http.post('/stories/saving-progress', story).then(story => {
            return story;
          })
          .catch(err => {
            return err;
          })
        },

        saveContent: function(id, content) {
          return $http({
            method: 'POST',
            url: '/stories/saveContent/' + id,
            headers: { 'Content-Type': 'application/json' },
            data: content
          })
          .then(data => {
            return data;
          })
          .catch(err => {
            return err;
          })
        }

      }
    }

})()
