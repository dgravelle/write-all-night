'use strict';

(function () {

  angular
    .module('app')
    .service('UserService', UserService)

    UserService.$inject = ['$http', '$q', '$window'];

    function UserService($http, $q, $window) {
      const self = this;

      self.currentUser = {};

      self.logOut = function() {
        localStorage.clear();
      }

      self.login = function (user) {
        var deferred = $q.defer();

        return $http.post('/users/login', user).then(data => {
          if (data.status >= 400) {
            deferred.reject(data);

            return deferred.promise;
          }
          else {
            $window.localStorage['id'] = data.data.id;
            $window.localStorage['token'] = data.data.token;
            $window.localStorage['user'] = data.data.user;

            deferred.resolve(data);

            return deferred.promise;
          }

        })
        .catch(err => {
          deferred.reject(err);
          return deferred.promise;
        });
      }



      self.setCurrentUser = function(user) {
        self.currentUser = user;
      }

      self.getUser = function(id) {
        return $http.get('/users/' + id).then(user => {
          this.setCurrentUser(user.data);
          return self.currentUser;
        });
      }

      self.createUser = function (user) {
        var deferred = $q.defer();

        return $http.post('/users/signup', user).then(data => {

          if (data.status >= 400) {
            deferred.reject(data);

            return deferred.promise;
          }
          else {
            $window.localStorage['id'] = data.data.id;
            $window.localStorage['token'] = data.data.token;
            $window.localStorage['user'] = data.data.user;
            deferred.resolve(data);

            return deferred.promise;
          }
        })
        .catch(err => {

          deferred.reject(err);

          return deferred.promise;
        });
      }
    }

})();
