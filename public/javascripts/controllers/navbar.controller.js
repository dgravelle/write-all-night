(function () {

  angular
    .module('app')
    .controller('NavBar', NavBar)

    NavBar.$inject = ['$scope','$location', 'UserService'];

    function NavBar($scope, $location, UserService) {
      $scope.$on('$routeChangeStart', (next, current) => {
        $scope.loggedIn = localStorage.getItem('user');
        $scope.userId = localStorage.getItem('id');
      });

      $scope.logOut = function() {
        console.log('logging out');
        UserService.logOut();
        $location.path('/#/');
      }
    }

})()
