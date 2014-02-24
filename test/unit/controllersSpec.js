'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
    var scope;
    var $controllerConstructor;

    beforeEach(module('myApp.controllers'));

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        $controllerConstructor = $controller;
    }));

    describe('MapCtrl', function(){
        var controller;

        beforeEach(function() {
//            controller = $controllerConstructor('MapCtrl', { $scope: scope });
        });

        it('should ....', function() {
            //spec body
        });
    });
});
