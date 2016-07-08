var app = angular.module('loginApp', ['ngResource']);

app.controller('loginController',
    function($scope, $http, $location, $window) {
        $scope.login = function () {
            var email = $scope.data.inputEmail;
            var password = $scope.data.inputPassword;
            $http.post('/api/login/' + email + '/' + password).success(function(response, err) {
                console.log("Response from server: "+response.message);
                $scope.message = response.message;
                if(response.status) {
                    console.log(response.token);
                    $window.localStorage.token = response.token;
                    $window.localStorage.id = response.id;
                    //$window.location.href = '/';
                    //$state.go('/');
                }
            });
        };

        $scope.logout = function () {
            console.log('Logging out');
            var id = $window.localStorage.id;
            console.log(id);
            $http.post('/api/delete/' + id).success(function(response) {
            });
        }
});