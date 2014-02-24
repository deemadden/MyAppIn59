'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
    .value('version', '0.1')
    .factory('myResourceService', ['$resource', function($resource) {
        return {
            getResource: function() {
                return $resource;
            }
        };
    }])
    .factory('proxyService', ['$resource', '$q', function($resource, $q) {
        return {
            proxyUrl: 'http://jsonp.jit.su/?url=',
            get: function(url) {
                var proxy = $resource(this.proxyUrl + url);
                var deferred = $q.defer();

                proxy.get(
                    {},
                    function (result) {
                        deferred.resolve(result);
                    },
                    function (response) {
                        deferred.reject(response);
                    }
                );

                return deferred.promise;
            }
        }
    }])
    .factory('restaurantFinder', ['proxyService', '$q', function(proxyService, $q) {
        return {
            inspectionUrl: 'http://api.civicapps.org/restaurant-inspections/near/',
            findNear: function(location) {
                var deferred = $q.defer();
                var nearUrl = this.inspectionUrl + location.longitude + ',' + location.latitude;
                nearUrl += '?since=' + moment().subtract(6, 'months').format('YYYY-MM-DD') + '&distance=.5&count=50';

                var proxyPromise = proxyService.get(encodeURIComponent(nearUrl));

                proxyPromise.then(
                    function (results) {
                        var returnArray = [];
                        angular.forEach(results.results, function (restaurant, key) {
                            returnArray.push({
                                name: restaurant.name,
                                score: restaurant.score,
                                location: {
                                    latitude: restaurant.location.Latitude,
                                    longitude: restaurant.location.Longitude
                                },
                                address: restaurant.address,
                                inspection_number: restaurant.inspection_number,
                                date: restaurant.date
                            })
                        });
                        deferred.resolve(returnArray);
                    },
                    function (response) {
                        deferred.reject(response);
                    }
                );

                return deferred.promise;
            }
        }
    }]);
