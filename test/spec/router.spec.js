describe('router', function () {

    var Router;

    it('should be able to import the Router module', function (done) {
        require([
            'appshaper/router'
        ], function (
            RouterModule
        ) {
            expect(RouterModule).toEqual(jasmine.any(Function));
            Router = RouterModule;
            done();
        });
    });

});
