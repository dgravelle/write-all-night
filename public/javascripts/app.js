(function () {

  angular
    .module('app', ['ngRoute'])
    .config(function($routeProvider, $httpProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/register.html',
          controller: 'RegisterController'
        })
        .when('/users/dashboard', {
          
        });
        $httpProvider.interceptors.push('AuthInterceptor');
    })

})()
