'use strict';

// Register `highscores` component, along with its associated controller and
// template
angular.module('highscores').component('highscores', {
	templateUrl : 'highscores/highscores.template.html',
	controller : ['User', '$http', function HighscoresController(User, $http) { 
		var self = this;
		self.users = User.query();
		console.log(self.users);
	}]
});
