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
        }

      }
    }

})()
