describe('event', function () {

    var Event;

    it('should be able to import the Event module', function (done) {
        require([
            'appshaper/utils/event'
        ], function (
            EventModule
        ) {
            expect(EventModule).toEqual(jasmine.any(Object));
            Event = EventModule;
            done();
        });
    });

    it('should be able to add and fire events on elements', function () {
        var testElement = document.createElement('div'),
            clicked = false,
            callback = function () {
                clicked = true;
            };

        Event.add(testElement, 'click', callback);

        Event.trigger(testElement, 'click');
        expect(clicked).toEqual(true);
    });

    it('should be able to remove events from elements', function () {
        var testElement = document.createElement('div'),
            clicked = false,
            callback = function () {
                clicked = true;
            };

        Event.add(testElement, 'click', callback);
        Event.remove(testElement, 'click', callback);

        Event.trigger(testElement, 'click');
        expect(clicked).toEqual(false);
    });

});
