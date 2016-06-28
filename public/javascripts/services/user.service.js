'use strict';

(function () {

  angular
    .module('app')
    .service('UserService', UserService)

    function UserService($http, $q, $window) {
      const self = this;

      self.getUser = function(id) {
        return $http.get('/users/' + id);
      }

      self.createUser = function (user) {
        var deferred = $q.defer();

        return $http.post('/users', user).then(data => {

          var user = {
            id: data.data.id,
            token: data.data.token,
            user: data.data.email
          }

          user = JSON.stringify(user);

          $window.localStorage['user'] = user;

          deferred.resolve(user);

          return deferred.promise;
        })
        .catch(err => {
          console.log(err);
          deferred.reject(err);

          return deferred.promise;
        });
      }
    }


})()
