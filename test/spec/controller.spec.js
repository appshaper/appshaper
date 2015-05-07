describe('controller', function () {

    var Controller,
        Pubsub;

    it('should be able to import the Controller module', function (done) {
        require([
            'appshaper/mvc/controller',
            'appshaper/pubsub'
        ], function (
            ControllerModule,
            PubsubModule
        ) {
            expect(ControllerModule).toEqual(jasmine.any(Function));
            Controller = ControllerModule;
            Pubsub = PubsubModule;
            done();
        });
    });

    it('should be able to create and use a route controller', function () {
        var homeCalled = false,
            aboutCalled = false,
            pageController = Controller('route', {
                home: function () {
                    homeCalled = true;
                },
                about: function () {
                    aboutCalled = true;
                }
            });

        Pubsub.fire('route', {page: 'home'});
        Pubsub.fire('route', {page: 'about'});

        expect(homeCalled).toEqual(true);
        expect(aboutCalled).toEqual(true);
    });

    it('should be able to create and use an action controller', function () {
        var customerData = [],
            pageController = Controller('action.customer', {
                create: function (name) {
                    customerData.push(name);
                }
            });

        Pubsub.fire('action.customer', 'create', 'Steve');

        expect(customerData).toEqual(['Steve']);
    });

});
