'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
    .filter('inspectionClass', [function() {
        return function(score) {
            if (score > 90) {
                return 'green';
            }
            if (score > 75) {
                return 'yellow';
            }

            return 'red'
        }
    }]);
