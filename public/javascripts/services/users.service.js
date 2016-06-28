'use strict';

(function () {

  angular
    .module('app')
    .service('UserService', UserService)

    function UserService($http) {
      const self = this;

      self.login = function (user) {
        console.log(user);
        return $http.post('/users/login', user);
      }

      self.createUser = function (user) {
        return $http
          .post('/users/signup', user)
          .then((data) => {
            console.log(data);
          })
      }
    }


})()
