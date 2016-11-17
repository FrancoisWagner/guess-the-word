'use strict';

angular.module('guessTheWordApp', [
  'core',
  'registerForm',
  'game',
  'highscores',
  'ngCookies'
]).controller('ApplicationController', ['User', '$scope', '$cookies', function (User, $scope, $cookies) {
	$scope.currentUser = null;
	
	$scope.setCurrentUser = function(id, name) {
		$scope.currentUser = name;
		
		if(!$cookies.get('user')){
			$cookies.put('user', id);
		}
	}
	
	$scope.signOut = function() {
		$scope.currentUser = null;
		$cookies.remove('user');
	}

	// Retrieving user if exists
	if($cookies.get('user')){
		User.get({id:$cookies.get('user')}).$promise.then(function(user) {
			if(user.name){
				$scope.setCurrentUser($cookies.get('user'), user.name);
			}
			else{
				$cookies.remove('user');
			}
		});
	}
}]);