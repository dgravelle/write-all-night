(function () {

  angular
    .module('app', ['ngRoute'])
    .config(function($routeProvider, $httpProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginController',
          controllerAs: 'loginCtrl'
        })
        .when('/signup', {
          templateUrl: 'views/register.html',
          controller: 'RegisterController'
        })
        .when('/users/:id', {
          templateUrl: 'views/dashboard.html',
          restricted: true,
          resolve: {
            getUser: function (UserService, $route) {
              return UserService.getUser($route.current.params.id);
            }
          }
        });
        $httpProvider.interceptors.push('AuthInterceptor');
    })

    .run(function($rootScope, $location, $window, UserService) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.restricted && !$window.localStorage.getItem('user')) {
          $location.path('/');
        }
      })
    });

})()
