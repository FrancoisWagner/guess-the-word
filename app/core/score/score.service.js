'use strict';

angular.
  module('core.score').
  factory('Score', ['$resource', 'RESTAPI_CONFIG',
    function($resource, restApiConfig) {
	  var hostUrl = restApiConfig.hostUrl;
      return $resource(hostUrl + '/scores.json', {}, {
        query: {
          method: 'GET'
        }
      });
    }
  ]);
