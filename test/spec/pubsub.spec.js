describe('pubsub', function () {

    var Pubsub = null;

    it('should be able to import the Pubsub module', function (done) {
        require([
             'appshaper/pubsub'
         ], function (
             PubsubModule
         ) {
             expect(PubsubModule).toEqual(jasmine.any(Object));
             Pubsub = PubsubModule;
             done();
         });
    });

    afterEach(function () {
        Pubsub.offAll();
    });

    it('should be able to subscribe to and publish events', function (done) {
        var callback = function () {
            Pubsub.off('a.test.event', callback);
            expect(true).toEqual(true);
            done();
        };
        Pubsub.on('a.test.event', callback);
        Pubsub.fire('a.test.event');
    });

    it('should be able to subscribe to and publish events with data', function (done) {
        var testData = {
                success: true
            },
            callback = function (data) {
                Pubsub.off('a.test.event', callback);
                expect(data).toEqual(testData);
                done();
            };

        Pubsub.on('a.test.event', callback);
        Pubsub.fire('a.test.event', testData);
    });

    describe('should be able to unsubscribe from a previously subscribed event', function () {

        it('using a topic', function () {
            var testData = {
                    success: true
                },
                published = false,
                callback = function () {
                    published = true;
                };

            Pubsub.on('a.test.event', callback);
            Pubsub.off('a.test.event');
            Pubsub.fire('a.test.event', testData);
            expect(published).toBeFalsy();
        });

        it('using a function', function () {
            var testData = {
                    success: true
                },
                published = false,
                callback = function () {
                    published = true;
                },
                callback2= function () {
                    published = true;
                };

            Pubsub.on('unsub.event', callback);
            Pubsub.on('unsub.event', callback2);
            Pubsub.on('unsub.event2', callback);
            Pubsub.on('unsub.event2', callback2);
            Pubsub.off(callback);
            Pubsub.off(callback2);
            Pubsub.fire('unsub.event', testData);
            Pubsub.fire('unsub.event2', testData);
            expect(published).toBeFalsy();
        });

        it('using a token', function () {
            var testData = {
                    success: true
                },
                published = false,
                callback = function () {
                    published = true;
                };

            var token = Pubsub.on('a.test.event', callback);
            Pubsub.off(token, callback);
            Pubsub.fire('a.test.event', testData);
            expect(published).toBeFalsy();
        });
    });

    it('should be able to subscribe to and publish events from inside modules', function (done) {
        var testData = {
                success: true
            };

        require(['pubsub'], function (Event) {
            var callback = function (data) {
                Pubsub.off('a.test.event', callback);
                expect(data).toEqual(testData);
                done();
            };
            Event.on('a.test.event', callback);
        });
        require(['pubsub'], function (Event) {
            Event.fire('a.test.event', testData);
        });
    });

});
