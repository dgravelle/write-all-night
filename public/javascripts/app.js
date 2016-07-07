(function () {

  angular
    .module('app', ['ngRoute', 'ngMaterial', 'textAngular', 'materialCalendar', 'chart.js', 'angularMoment'])
    .config(function($routeProvider, $httpProvider) {
      $routeProvider
        .when('/', {
          homePage: true,
          restricted: false,
          templateUrl: 'views/home.html',
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          restricted: false,
          notForLoggedIn: true,
          controller: 'LoginController',
          controllerAs: 'loginCtrl'
        })
        .when('/signup', {
          restricted: false,
          notForLoggedIn: true,
          templateUrl: 'views/register.html',
          controller: 'RegisterController'
        })
        .when('/users/:id', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardController',
          restricted: true,
          resolve: {
            getUser: function (UserService, $route) {
              return UserService.getUser($route.current.params.id);
            },
            allStories: function(StoriesService, $route) {
              return StoriesService.getAllStories($route.current.params.id);
            },
            writingProgress: function(StoriesService, $route) {
              return StoriesService.getWritingProgress($route.current.params.id);
            }
          }
        })
        .when('/users/:id/new-story', {
          templateUrl: 'views/new-story.html',
          controller: 'StoriesController',
          restricted: true
        })
        .when('/users/:id/story/:storyId', {
          templateUrl: 'views/story-editor.html',
          controller: 'StoryEditor',
          restricted: true,
          resolve: {
            getStory: function(StoriesService, $route) {
              return StoriesService.getStory($route.current.params.storyId);
            }
          }
        });
        $httpProvider.interceptors.push('AuthInterceptor');

    })

    .run(function($rootScope, $location, $window) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.restricted && !$window.localStorage.getItem('user')) {
          $location.path('/');
        }
        else if (next.notForLoggedIn && window.localStorage.getItem('id')) {
          $location.path('/users/' + $window.localStorage.getItem('id'))
        }

      })
    });

})()
