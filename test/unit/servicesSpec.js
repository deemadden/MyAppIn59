'use strict';

/* jasmine specs for services go here */

describe('service', function () {
    beforeEach(module('myApp.services'));

    describe('version', function () {
        it('should return current version', inject(function (version) {
            expect(version).toEqual('0.1');
        }));
    });

    describe('myResourceService', function() {
        it('should have a getResource method',inject(function(myResourceService, $resource) {
            var resource = myResourceService.getResource();

            expect(resource).toBe($resource);
        }));
    });
});
