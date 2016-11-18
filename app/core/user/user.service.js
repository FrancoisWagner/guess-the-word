'use strict';

angular.
  module('core.user').
  factory('User', ['$resource', 'CONFIG',
    function($resource, config) {
      return $resource(config.DATABASE_URL + '/users.json', {}, {
          query: {
        	  method: "GET",
        	  isArray: false
          },
          create: {
        	  method: "PUT",
        	  params: {id: 'id'},
        	  url: config.DATABASE_URL + "/users/:id.json"
          },
          get: {
        	  method: "GET",
        	  params: {id: 'id'},
        	  url: config.DATABASE_URL + "/users/:id.json"
          }
      });
  	}
  ]);
