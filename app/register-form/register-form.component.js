'use strict';

// Register `registerForm` component, along with its associated controller and
// template
angular.module('registerForm').component('registerForm', {
	templateUrl : 'register-form/register-form.template.html',
	controller : ['User', '$base64', '$scope', '$http', function RegisterFormController(User, $base64, $scope, $http) {
		var self = this;
		self.user = {
			name : ''
		};
		self.submitEnabled = true;
		self.submit = function() {	
			self.submitEnabled = false;
			if (self.user.name) {
				self.key = $base64.encode(unescape(self.user.name));
				
				// Search in the database if user already exists
				User.get({id:self.key}).$promise.then(function(data) {
					// If it doesn't exist --> create it
					if(angular.equals({}, data)){
						var dataObj = {
							name : self.user.name,
							register_timestamp : Date.now()
						};
						User.create({id:self.key}, dataObj).$promise.then(function(data) {
							self.user.name = '';
							self.submitEnabled = true;
							
							$scope.$parent.setCurrentUser(self.key, data.name);
			                
			                console.log(dataObj.name + " added successfully.");
			            });
					}
					else {
						$scope.$parent.setCurrentUser(self.key, data.name);
					}
				});
			}
		};
	}]
});
