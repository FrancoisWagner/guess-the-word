'use strict';

// Register `registerForm` component, along with its associated controller and
// template
angular.module('registerForm').component('registerForm', {
	templateUrl : 'register-form/register-form.template.html',
	controller : ['User', '$scope', '$http', function RegisterFormController(User, $scope, $http) {
		var self = this;
		self.user = {
			name : ''
		};
		self.submitEnabled = true;
		self.submit = function() {	
			self.submitEnabled = false;
			if (self.user.name) {
				var dataObj = {
					name : self.user.name,
					register_timestamp : Date.now()
				};	
				User.create(dataObj).$promise.then(function(data) {
					self.user.name = '';
					
					User.get({id:data.name}).$promise.then(function(user) {
						$scope.$parent.setCurrentUser(data.name, user.name);
						self.submitEnabled = true;
					});
	                
	                console.log(dataObj.name + " added successfully.");
	            });
			}
		};
	}]
});
