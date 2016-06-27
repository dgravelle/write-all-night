(function () {

  angular
    .module('app', ['ngRoute'])
    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/register.html',
          controller: 'RegisterController'
        })
    })

})()
