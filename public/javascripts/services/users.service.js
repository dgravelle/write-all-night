'use strict';

(function () {

  angular
    .module('app')
    .service('UserService', UserService)

    UserService.$inject = ['$http', '$q', '$window'];

    function UserService($http, $q, $window) {
      const self = this;

      self.logOut = function() {
        return localStorage.clear();
      }

      self.login = function (user) {
        var deferred = $q.defer();

        console.log(user);
        return $http.post('/users/login', user).then(data => {
          console.log(data);

          $window.localStorage['id'] = data.data.id;
          $window.localStorage['token'] = data.data.token;
          $window.localStorage['user'] = data.data.user;

          deferred.resolve(data);

          return deferred.promise;
        })
        .catch(err => {
          deferred.reject(err);
          return deferred.promise;
        });
      }

      self.currentUser = {};

      self.setCurrentUser = function(user) {
        this.currentUser = user;
      }

      self.getUser = function(id) {
        return $http.get('/users/' + id).then(user => {
          this.setCurrentUser(user.data);
          return this.currentUser;
        });
      }

      self.createUser = function (user) {
        var deferred = $q.defer();

        return $http.post('/users/signup', user).then(data => {

          $window.localStorage['id'] = data.data.id;
          $window.localStorage['token'] = data.data.token;
          $window.localStorage['user'] = data.data.user;
          deferred.resolve(data);

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
