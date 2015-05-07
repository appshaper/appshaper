describe('storage', function () {

    var Storage;

    afterEach(function () {
        Storage.clear();
    });

    it('should be able to import the Storage module', function (done) {
        require([
            'appshaper/data/storage'
        ], function (
            StorageModule
        ) {
            expect(StorageModule).toEqual(jasmine.any(Object));
            Storage = StorageModule;
            done();
        });
    });

    it('should be able to save and retrieve an item', function () {
        var item = {
            saved: true
        };
        Storage.save('test-item', item);

        expect(Storage.load('test-item')).toEqual(item);
    });

    it('should be able to save and remove an item', function () {
        var item = {
            saved: true
        };
        Storage.save('test-item', item);
        Storage.remove('test-item');

        expect(Storage.load('test-item')).toBeUndefined();
    });

    it('should be able to check if a key exists', function () {
        var item = {
            saved: true
        };
        Storage.save('test-item', item);

        expect(Storage.checkExists('test-item')).toEqual(true);
    });

});
