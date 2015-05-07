describe('loader', function () {

    var Loader;

    it('should be able to import the Loader module', function (done) {
        require([
            'appshaper/utils/loader'
        ], function (
            LoaderModule
        ) {
            expect(LoaderModule).toEqual(jasmine.any(Object));
            Loader = LoaderModule;
            done();
        });
    });

    it('should be able to load scripts', function (done) {
        var scripts = [
                'data/script1.js',
                'data/script2.js'
            ];

        Loader.loadScripts(scripts, function () {
            expect(document.scripts[0].src).toContain('data/script2.js');
            expect(document.scripts[1].src).toContain('data/script1.js');
            expect(script1).toEqual(true);
            expect(script2).toEqual(true);
            done();
        });
    });

});
