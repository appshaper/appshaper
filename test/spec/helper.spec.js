describe('helper', function () {

    var Helper;

    it('should be able to import the Helper module', function (done) {
        require([
            'appshaper/utils/helper'
        ], function (
            HelperModule
        ) {
            expect(HelperModule).toEqual(jasmine.any(Object));
            Helper = HelperModule;
            done();
        });
    });

    it('should be able to get an empty function', function () {
        expect(Helper.emptyFunction).toEqual(jasmine.any(Function));
    });

    describe('.has', function() {
        it('returns true if an object has a specific property', function() {
            var ref = {asd: 123};
            expect(Helper.has(ref, 'asd')).toBeTruthy();
        });
        it('returns false if an object does not have a specific property', function() {
            var ref = {asd: 123};
            expect(Helper.has(ref, 'qwe')).toBeFalsy();
        });
    });

    describe('.contains', function() {
        it('returns true if a string contains another string', function() {
            var str = 'asdqwe';
            var search = 'dq';

            expect(Helper.contains(str, search)).toBeTruthy();
        });
        it('returns false if a string does not contain another string', function() {
            var str = 'asdqwe';
            var search = 'jh';

            expect(Helper.contains(str, search)).toBeFalsy();
        });
        it('returns true if an array contains a specific element', function() {
            var arr = [1, 2, 3];
            var search = 2;

            expect(Helper.contains(arr, search)).toBeTruthy();
        });
        it('returns false if an array does not contain a specific element', function() {
            var arr = [1, 2, 3];
            var search = 4;

            expect(Helper.contains(arr, search)).toBeFalsy();
        });
        it('returns true if an object has a property with a specific value', function() {
            var obj = {asd: 123};
            var search = 'asd';

            expect(Helper.contains(obj, search)).toBeTruthy();
        });
        it('returns false if an object does not have a property with a specific value', function() {
            var obj = {asd: 123};
            var search = 'qwe';

            expect(Helper.contains(obj, search)).toBeFalsy();
        });
    });

    describe('.combine', function() {
        it('returns an array with values from arr2 concatenated to arr1 if the parameters are arrays', function() {
            var arr1 = [1,2];
            var arr2 = [3,4];
            expect(Helper.combine(arr1, arr2)).toEqual([1,2,3,4]);
        });
        it('returns an object with properties from obj2 added to obj1 if the parameters are objects, same named properties are moved to obj2.base', function() {
            var obj1 = {asd: 123, zxc: []};
            var obj2 = {asd: 456, qwe: 'asd'};
            var expected = {asd: 456, qwe: 'asd', zxc: [], base: {asd: 123}};

            expect(Helper.combine(obj1, obj2, true)).toEqual(expected);
        });
        it('returns the first parameter if one parameter is an object and other one is an array', function() {
            var param1 = [1,2];
            var param2 = {asd: 123};

            expect(Helper.combine(param1, param2)).toEqual(param1);
        });
    });

});
