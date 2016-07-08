var app = angular.module('meetupApp', ['ngResource', 'ngRoute']);

app.controller('meetupsController',
	function($scope, $resource, $http, $route, $window) {

	var Meetup = $resource('/api/meetups');

	Meetup.query(function (results) {
		$scope.meetups = results;
	});

	$scope.meetups = [];

	$scope.createMeetup = function () {
		var meetup = new Meetup();
		meetup.name = $scope.meetupName;
		meetup.$save(function (result) {
			$scope.meetups.push(result);
		});
		$scope.meetupName = '';
	};

	$scope.remove = function(id) {
		console.log(id);
		$http.post('/api/meetups/' + id).success(function(response) {
			//refresh();
		});
	};

	$scope.getOne = function(id) {
		$http.get('/api/meetups/' + id).success(function(response) {
			$scope.meetupNameEdit = response.name;
			$scope.hiddenid = response._id;
			console.log("Response from server: "+response.name);
		});
	};

	$scope.updateName = function() {
		console.log($scope);
		var name = $scope.meetupNameEdit;
		var id = $scope.hiddenid;
		$http.post('/api/meetups/update/' + name+'/'+id).success(function(response) {
		});
	};

	$scope.logout = function () {
		console.log('Logging out');
		//$window.localStorage.removeItem('token');
		for (i = 0; i < localStorage.length; i++)   {
			console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
		}
        //$window.location.href = '/login';
        $http.post('/api/delete/' +id).success(function(response) {
        });
	};

});
