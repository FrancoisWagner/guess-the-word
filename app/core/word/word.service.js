'use strict';

angular.
module('core.word').
factory('Word', ['$resource', 'RESTAPI_CONFIG',
  function($resource, restApiConfig) {
    return $resource(restApiConfig.DATABASE_URL + '/words.json', {}, {
      query: {
        method: 'GET'
      },
      create: {
    	  method: "POST"
      }
    });
  }
]);
