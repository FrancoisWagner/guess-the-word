'use strict';

angular.
  module('core.score').
  factory('Score', ['$resource', 'CONFIG',
    function($resource, config) {
      return $resource(config.DATABASE_URL + '/scores.json', {}, {
        query: {
          method: 'GET'
        },
        create: {
      	  method: 'POST'
        }
      });
    }
  ]);
