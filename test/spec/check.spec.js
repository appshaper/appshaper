describe('check', function () {

    var Check;

    it('should be able to import the Check module', function (done) {
        require([
             'appshaper/utils/check'
         ], function (
             CheckModule
         ) {
             expect(CheckModule).toEqual(jasmine.any(Object));
             Check = CheckModule;
             done();
         });
    });

    describe('.isElement', function() {
        var element = document.createElement('div'),
            noElement = 'not an element';

        it('returns true if parameter is of type Element', function() {
            expect(Check.isElement(element)).toEqual(true);
        });
        it('returns false if the parameter is not of type Element', function() {
            expect(Check.isElement(noElement)).toEqual(false);
        });
    });

    describe('.isDomList', function() {
        var domList = document.querySelectorAll('div'),
            noDomList = document.body;

        it('returns true if parameter is of type DomList', function() {
            expect(Check.isDomList(domList)).toEqual(true);
        });
        it('returns false if the parameter is not of type DomList', function() {
            expect(Check.isDomList(noDomList)).toEqual(false);
        });
    });

    describe('.isRegex', function() {
        var regEx1 = new RegExp('(bla)+\!'),
            regEx2 = /(bla)+\!/,
            noRegEx = '/(bla)+\!/';

        it('returns true if parameter is of type RegEx', function() {
            expect(Check.isRegEx(regEx1)).toEqual(true);
            expect(Check.isRegEx(regEx2)).toEqual(true);
        });
        it('returns false if the parameter is not of type RegEx', function() {
            expect(Check.isRegEx(noRegEx)).toEqual(false);
        });
    });

    describe('.isFunction', function() {
        it('returns true if the parameter is a function', function() {
            expect(Check.isFunction(function(){})).toEqual(true);
        });
        it('returns false if the parameter is not a function', function() {
            expect(Check.isFunction('asd')).toEqual(false);
        });
    });

    describe('.isObject', function() {
        it('returns true if the parameter is an object', function() {
            var obj = {};
            expect(Check.isObject(obj)).toEqual(true);
        });
        it('returns false if the parameter is not an object', function() {
            expect(Check.isObject('asd')).toEqual(false);
        });
    });

    describe('.isBoolean', function() {
        it('returns true if the parameter is of type Boolean', function() {
            expect(Check.isBoolean(true)).toEqual(true);
        });
        it('returns false if the parameter is not of type Boolean', function() {
            expect(Check.isBoolean('asd')).toEqual(false);
        });
    });

    describe('.isNumber', function() {
        it('returns true if the parameter is of type Number', function() {
            expect(Check.isNumber(123)).toEqual(true);
        });
        it('returns false if the parameter is not of type Number', function() {
            expect(Check.isNumber('asd')).toEqual(false);
        });
    });

    describe('.isUndefined', function() {
        it('returns true if the parameter is undefined', function() {
            expect(Check.isUndefined(undefined)).toEqual(true);
        });
        it('returns false if the parameter is not undefined', function() {
            expect(Check.isUndefined('asd')).toEqual(false);
        });
    });

    describe('.isDefined', function() {
        it('returns true if the parameter is defined', function() {
            expect(Check.isDefined(123)).toEqual(true);
        });
        it('returns false if the parameter is undefined', function() {
            expect(Check.isDefined(undefined)).toEqual(false);
        });
    });

    describe('.isDate', function() {
        it('returns true if the parameter is of type Date', function() {
            expect(Check.isDate(new Date())).toEqual(true);
        });
        it('returns false if the parameter is not of type Date', function() {
            expect(Check.isDate(123)).toEqual(false);
        });
    });

    describe('.isArgument', function() {
        var arg,
            value = 'some value',
            argFunction = function (test) {
                arg = arguments;
            };

        argFunction(value);

        it('returns true if parameter is of type Argument', function() {
            expect(Check.isArgument(arg)).toEqual(true);
        });
        it('returns false if parameter is not of type Argument', function() {
            expect(Check.isArgument(value)).toEqual(false);
        });
    });

    describe('.isString', function() {
        it('returns true if parameter is of type String', function() {
            expect(Check.isString('my string')).toEqual(true);
        });
        it('returns false if the parameter is not of type String', function() {
            expect(Check.isString(123)).toEqual(false);
        });
    });

    describe('.isInt', function() {
            var int = 12,
                noInt = 0.5;

        it('returns true if an object is of type Integer', function() {
            expect(Check.isInt(int)).toEqual(true);
        });
        it('returns false if an object is not of type Integer', function() {
            expect(Check.isInt(noInt)).toEqual(false);
        });
    });

    describe('.has', function() {
        it('returns true if an object has a specific property', function() {
            var ref = {asd: 123};
            expect(Check.has(ref, 'asd')).toEqual(true);
        });
        it('returns false if an object does not have a specific property', function() {
            var ref = {asd: 123};
            expect(Check.has(ref, 'qwe')).toEqual(false);
        });
    });

    describe('.isEmpty', function() {
        it('returns true for falsy (empty) parameters', function() {
            var params = [
                null,
                undefined,
                0,
                false,
            ],
            i;

            for (i = 0; i < params.length; ++i) {
                expect(Check.isEmpty(params[i])).toEqual(true);
            }
        });
        it('returns true for empty objects and arrays', function() {
            var emptyArr = [];
            var emptyObj = {};
            expect(Check.isEmpty(emptyArr)).toEqual(true);
            expect(Check.isEmpty(emptyObj)).toEqual(true);
        });
    });

    describe('.isNull', function() {
        it('returns true is the variable is null', function() {
            expect(Check.isNull(null)).toEqual(true);
        });
        it('returns false is the variable is not null', function() {
            expect(Check.isNull('test string')).toEqual(false);
            expect(Check.isNull({test: 'test object'})).toEqual(false);
            expect(Check.isNull(false)).toEqual(false);
        });
    });


});
