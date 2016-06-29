(function () {

  angular
    .module('app')
    .controller('NavBar', NavBar)

    NavBar.$inject = ['$scope','$location']

    function NavBar($scope) {
        $scope.loggedIn = JSON.parse(localStorage.getItem('user'));
    }

})()
