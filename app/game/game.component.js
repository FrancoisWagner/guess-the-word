'use strict';

// Register `game` component, along with its associated controller and
// template
angular.module('game').component('game', {
	templateUrl : 'game/game.template.html',
	controller : ['Word', '$scope', '$q', '$http', function GameController(Word, $scope, $q, $http) {
		var self = this;
		// list of all promises
	    var promises = [];
	    
		Word.query().$promise.then(function(data) {
			if(angular.equals({}, data)){
				$http.get('sports-list.json').success(function(data) {
					angular.forEach(data, function(value, key) {
						// create a $q deferred promise
				        var deferred = $q.defer();

				        Word.create(value).$promise.then(function(data) {
				        	deferred.resolve(data);
						});

				        // add to the list of promises
				        promises.push(deferred.promise);
					});
					
					// execute all the promises and do something with the results
				    $q.all(promises).then(
				        // success
				        // results: an array of data objects from each deferred.resolve(data) call
				        function(results) {
				            self.words = Word.query();
				            console.log("Words have been inserted!")
				            console.log(self.words);
				        },
				        // error
				        function(response) {
				        }
				    );
				});
			}
			else{
				self.words = data;
				console.log("Words already exist in the database!")
				console.log(self.words);
			}
		});
	}]
});
