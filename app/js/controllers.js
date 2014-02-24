'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
	controller('MapCtrl', ['$scope', '$q', 'restaurantFinder', function($scope, $q, restaurantFinder) {
        $scope.map = {
            center: {
                latitude: -140,
                longitude: 28
            },
            zoom: 16,
            markers: [],
            init: function() {
                $scope.map.reCenter()
                    .then($scope.map.initMarkers);
            },
            reCenter: function() {
                var deferred = $q.defer();
                navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.map.center = position.coords;
                    deferred.resolve();
                });
                return deferred.promise;
            },
            initMarkers: function() {
                restaurantFinder.findNear($scope.map.center)
                    .then(function(markers) {
                        var myMarkerLocation = markers[0].location;
                        $scope.map.center.latitude = myMarkerLocation.latitude;
                        $scope.map.center.longitude = myMarkerLocation.longitude;
                        markers[0].showWindow = true;
                        $scope.map.markers = markers;
                    });
            }
        }
        $scope.map.init();
	}]);
