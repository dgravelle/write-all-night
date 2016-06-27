'use strict';

(function () {

  angular
    .module('app')
    .service('UserService', UserService)

    function UserService($http, $q, $window) {
      const self = this;

      self.createUser = function (user) {
        return $http.post('/users', user).then(data => {
          var user = {
            token: data.data.token,
            user: data.config.data.email
          }

          $window.sessionStorage['user'] = JSON.stringify(user);

          return user;
        })
        .catch(err => {
          console.log(err);
        });
      }
    }


})()
