(function () {

  angular
    .module('app')
    .controller('NavBar', NavBar)

    NavBar.$inject = ['$scope','$location', '$mdSidenav', 'UserService'];

    function NavBar($scope, $location, $mdSidenav, UserService) {
      $scope.$on('$routeChangeStart', (next, current) => {
        $scope.loggedIn = localStorage.getItem('user');
        $scope.userId = localStorage.getItem('id');
      });

      $scope.currentNavItem;

      console.log($scope.currentNavItem);

      $scope.logOut = function() {
        console.log('logging out');
        UserService.logOut();
        $location.path('/#/');
      }
    }

})()
