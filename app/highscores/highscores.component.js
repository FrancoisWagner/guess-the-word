'use strict';

// Register `highscores` component, along with its associated controller and
// template
angular.module('highscores').component('highscores', {
	templateUrl : 'highscores/highscores.template.html',
	controller : ['User', 'Score', '$q', '$http', function HighscoresController(User, Score, $q, $http) { 
		var self = this;
	    self.scores = [];
	    
		Score.query().$promise.then(function(scores) {
			angular.forEach(scores, function(value, key) {
				if(angular.isDefined(value.user_id)){
			        User.get({id:value.user_id}).$promise.then(function(data) {
			        	var score = {
			        		user_name: data.name,
			        		score: value.score
			        	};
			        	self.scores.push(score)
					});
				}
			});
		});
	}]
});
