'use strict';

angular.
  module('core.user').
  factory('User', ['$resource', 'RESTAPI_CONFIG',
    function($resource, restApiConfig) {
      return $resource(restApiConfig.DATABASE_URL + '/users.json', {}, {
          query: { method: "GET", isArray: false },
          create: { method: "POST" }
      });
  	}
  ]);