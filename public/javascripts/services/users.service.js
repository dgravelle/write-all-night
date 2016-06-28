'use strict';

(function () {

  angular
    .module('app')
    .service('UserService', UserService)

    UserService.$inject = ['$http', '$q', '$window'];

    function UserService($http, $q, $window) {
      const self = this;

      self.login = function (user) {
        var deferred = $q.defer();

        console.log(user);
        return $http.post('/users/login', user).then(data => {
          console.log(data);

          var user = {
            id: data.data.id,
            token: data.data.token,
            user: data.data.user
          }

          user = JSON.stringify(user);

          $window.localStorage['user'] = user;

          deferred.resolve(user);

          return deferred.promise;
        })
        .catch(err => {
          deferred.reject(err);
          return deferred.promise;
        });
      }

      self.currentUser = {};

      self.setCurrentUser = function(user) {
        return this.currentUser = user;
      }

      self.getUser = function(id) {
        return $http.get('/users/' + id).then(user => {
          this.setCurrentUser(user.data);
          return this.currentUser;
        });
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
