'use strict';

angular.
module('core.word').
factory('Word', ['$resource', 'CONFIG',
  function($resource, config) {
    return $resource(config.DATABASE_URL + '/words.json', {}, {
      query: {
        method: 'GET'
      },
      create: {
    	  method: "POST"
      }
    });
  }
]);
