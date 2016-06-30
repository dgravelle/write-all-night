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
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
    }

})()
