'use strict';

// Register `game` component, along with its associated controller and
// template
angular.module('game').component('game', {
	templateUrl : 'game/game.template.html',
	controller : ['Word', 'Score', 'CONFIG', '$cookies', '$scope', '$interval', '$q', '$http', function GameController(Word, Score, config, $cookies, $scope, $interval, $q, $http) {
		var self = this;
		
		self.searchWord = '';
		self.countDown = config.GAME_TIME;
		self.startGame = undefined;
		self.gameReady = false;
		self.words = [];
		self.currentWordScore = 0;
		self.totalScore = 0;
		self.currentWordString = '';
		self.currentWordArray = [];
		
		self.stopGame = function() {
          if (angular.isDefined(self.startGame)) {
            $interval.cancel(self.startGame);
            self.startGame = undefined;
            var score = {
            	user_id : $cookies.get('user'),
            	score : self.totalScore
            };
            Score.create(score);
          }
        }
        
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
        	
        	if(angular.equals(self.searchWord.toUpperCase(), self.currentWordString)){
        		self.totalScore += self.currentWordScore;
        		self.searchWord = '';
        		self.newWord();
        	}
        }
        
        self.newWord = function(){
        	self.currentWordString = self.words[Math.floor(Math.random() * self.words.length)];
        	self.currentWordArray = self.currentWordString.split("");
        	shuffleArray(self.currentWordArray);
        	// max_score'='floor(1.95^(n/3))
        	self.currentWordScore = Math.floor((Math.exp(1.95))*(self.currentWordArray.length/3));
        	self.gameReady = true;
        }
        
        self.detectBackspace = function (event){
        	if (event.keyCode === 8) {
        		if(self.currentWordScore > 0) {
        			self.currentWordScore--;
        		}
        	}
        }
        
        var promise = getWords();
        promise.then(function(words) {
        	angular.forEach(words, function(value, key) {
        		if(angular.isDefined(value.name)){
        			self.words.push(value.name.toUpperCase());
        		}
        	});
        	self.newWord();
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
        
        // -> Fisher–Yates shuffle algorithm
        var shuffleArray = function(array) {
        	var m = array.length, t, i;

        	// While there remain elements to shuffle
        	while (m) {
        		// Pick a remaining element…
        		i = Math.floor(Math.random() * m--);

        		// And swap it with the current element.
        		t = array[m];
        		array[m] = array[i];
        		array[i] = t;
        	}

        	return array;
        }
	}]
});
