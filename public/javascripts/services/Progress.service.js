(function () {

  angular
    .module('app')
    .service('ProgressService', ProgressService);


    function ProgressService($http) {
      return {
        getStoryProgress: function(userId) {
          return $http.get('/progress/' + userId).then(report => {
            console.log(report);
            return report.data;
          })
          .catch(err => {
            console.error(err);
          })
        }
      }
    }


})()
