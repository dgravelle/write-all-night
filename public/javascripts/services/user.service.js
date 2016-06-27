'use strict';

(function () {

  angular
    .module('app')
    .service('UserService', UserService)

    function UserService($http) {
      const self = this;

      self.getUser = function (userEmail) {
        return $http.get('/users', { email: userEmail });
      }

      self.createUser = function (user) {
        return $http
          .post('/users', user)
          .then((data) => {
            console.log(data);
          })
      }
    }


})()
