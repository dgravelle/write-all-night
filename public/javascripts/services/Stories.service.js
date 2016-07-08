(function () {

  angular
    .module('app')
    .service('StoriesService', StoriesService);

    StoriesService.$inject = ['$http'];

    function StoriesService($http) {
      return {
        allStories: undefined,
        newStory: function(newStory) {
          console.log(newStory);
          return $http.post('/stories', newStory).then(story => {
            console.log('post return ', story);
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

        getWritingProgress: function(id) {
          return $http.get('/stories/calendar/' + id).then(data => {
            var storyData = {
              storyProgress: data.data
            }
            this.getStory(data.data[0].story_id).then(data => {
              storyData.storyInfo = data.data;
              console.log(data);
            })
            return storyData;
          })
          .catch(err => {
            return err;
          })
        },

        saveProgress: function(user_id, storyId, wordTotal) {
          var story = {
            user_id: user_id,
            story_id: storyId,
            word_count: wordTotal
          }

          $http.post('/stories/saving-progress', story).then(story => {
            return story;
          })
          .catch(err => {
            return err;
          })
        },

        saveContent: function(id, content) {
          // alert('saving story :)');
          // var options = { 'Content-Type': 'application/x-www-form-urlencoded' }
          $http({
            method: 'put',
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
