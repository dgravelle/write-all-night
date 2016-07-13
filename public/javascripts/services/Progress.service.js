(function () {

  angular
    .module('app')
    .service('ProgressService', ProgressService);


    function ProgressService($http) {
      return {
        getStoryProgress: function(userId) {
          
        }
      }
    }


})()
