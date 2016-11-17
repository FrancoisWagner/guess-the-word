'use strict';

angular.
module('core.word').
factory('Word', ['$resource', 'RESTAPI_CONFIG',
  function($resource, restApiConfig) {
	  var hostUrl = restApiConfig.hostUrl;
    return $resource(hostUrl + '/words.json', {}, {
      query: {
        method: 'GET'
      }
    });
  }
]);
