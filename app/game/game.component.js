'use strict';

// Register `game` component, along with its associated controller and
// template
angular.module('game').component('game', {
	templateUrl : 'game/game.template.html',
	controller : ['Word', 'CONFIG', '$scope', '$interval', '$q', '$http', function GameController(Word, config, $scope, $interval, $q, $http) {
		var self = this;
		
		self.searchWord = '';
		self.countDown = config.GAME_TIME;
		self.startGame = undefined;
		self.gameReady = false;
		
		self.stopGame = function() {
          if (angular.isDefined(self.startGame)) {
            $interval.cancel(self.startGame);
            self.startGame = undefined;
          }
        };
        
        self.update = function() {
        	if(angular.isUndefined(self.startGame)){
        		self.startGame = $interval(function(){
        			if(self.countDown > 0){
        				console.log(self.countDown--);
        			}
        			else {
        				self.stopGame();
        			}
        		},1000,0);
        	}
        }
        
        var promise = getWords();
        promise.then(function(words) {
        	self.words = words;
        	self.gameReady = true;
        	console.log(self.words);
        }, function(reason) {
        	alert('Failed: ' + reason);
        });
        
        function getWords(){
        	return $q(function(resolve, reject) {
	        	// list of all promises
	    	    var promises = [];
	    	    
	    		Word.query().$promise.then(function(words) {
	    			if(angular.equals({}, words)){
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
	    				            console.log("Words have been inserted!")
	    				            Word.query().$promise.then(function(words) {
	    				            	resolve(words);
	    				            });
	    				        },
	    				        // error
	    				        function(response) {
	    				        	reject(response);
	    				        }
	    				    );
	    				});
	    			}
	    			else{
	    				console.log("Words already exist in the database!")
	    				resolve(words);
	    			}
	    		});
        	});
        }
	}]
});
