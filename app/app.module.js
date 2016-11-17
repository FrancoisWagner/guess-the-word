'use strict';

angular.module('guessTheWordApp', [
  'core',
  'registerForm',
  'game',
  'highscores',
  'ngCookies'
]).controller('ApplicationController', ['$scope', '$cookies', function ($scope, $cookies) {
	$scope.currentUser = null;
	
	$scope.setCurrentUser = function (user) {
		$scope.currentUser = user;
		
		if(!$cookies.get('user')){
			$cookies.put('user', $scope.currentUser);
		}
	}
	
	// Retrieving username if exists
	if($cookies.get('user')){
		$scope.setCurrentUser($cookies.get('user'));
	}
	  
}]);