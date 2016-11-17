'use strict';

angular.module('guessTheWordApp', [
  'core',
  'registerForm',
  'game',
  'highscores'
]).controller('ApplicationController', function ($scope) {
	$scope.currentUser = null;
	
	$scope.setCurrentUser = function (user) {
		$scope.currentUser = user;
	}
});