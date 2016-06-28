(function () {

  angular
    .module('app')
    .service('AuthInterceptor', AuthInterceptor)

    AuthInterceptor.$inject = ['$window'];

    function AuthInterceptor($window) {
      return {
        request: function (config) {
          // debugger;
          var token = $window.localStorage.getItem('user');

          config.headers['X-Requested-With'] = 'XMLHttpRequest';

          token = JSON.parse(token);

          if (token)
            config.headers.Authorization = token.token;

          return config
        },
        requestError: function(err){
          debugger
          return err;
        },
        response: function(config){
          // debugger
          return config;
        },
        responseError: function(err){
          debugger
          return err;
        }
      }
    }
})();
