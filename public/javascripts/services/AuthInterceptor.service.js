(function () {

  angular
    .module('app')
    .service('AuthInterceptor', AuthInterceptor)

    function AuthInterceptor() {
      return {
        request: function (config) {
          
          var token = localStorage.getItem('token');

          if (token)
            config.headers.Authorization = "Bearer" + token;

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
