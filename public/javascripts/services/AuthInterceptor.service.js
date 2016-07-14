(function () {

  angular
    .module('app')
    .service('AuthInterceptor', AuthInterceptor)

    AuthInterceptor.$inject = ['$window'];

    function AuthInterceptor($window) {
      return {
        request: function (config) {
          var token = $window.localStorage.getItem('token');

          config.headers['X-Requested-With'] = 'XMLHttpRequest';

          if (token)
            config.headers.Authorization = token;

          return config
        },
        requestError: function(err){
          return err;
        },
        response: function(config){
          return config;
        },
        responseError: function(err){
          return err;
        }
      }
    }
})();
