describe('xhr', function () {

    var XHR;

    it('should be able to import the XHR module', function (done) {
        require([
            'appshaper/xhr/request'
        ], function (
            XHRModule
        ) {
            expect(XHRModule).toEqual(jasmine.any(Object));
            XHR = XHRModule;
            done();
        });
    });

    it('should be able to get a JSON file', function (done) {
        XHR.get({
            type: 'json',
            url: 'data/test.json'
        })
        .success(function (data) {
            expect(data).toEqual(jasmine.any(Array));
            expect(data[5]).toEqual({
                nm: 'Edgar',
                cty: 'GB',
                hse: 'House of Wessex',
                yrs: '959-975'
            });
            expect(data[10]).toEqual({
                nm: 'Harold I Harefoot',
                cty: 'GB',
                hse: 'House of Denmark',
                yrs: '1035-1040'
            });
            done();
        })
        .error(function (data) {
            console.log(data);
        });
    });

    it('should be able to get an XML file', function (done) {
        XHR.get({
            type: 'xml',
            url: 'data/test.xml'
        })
        .success(function (data) {
            var book1 = data.getElementById('book1'),
                book3 = data.getElementById('book3');

            expect(book1.getElementsByTagName('author')[0].firstChild.nodeValue).toEqual('Gambardella, Matthew');
            expect(book1.getElementsByTagName('genre')[0].firstChild.nodeValue).toEqual('Computer');
            expect(book1.getElementsByTagName('price')[0].firstChild.nodeValue).toEqual('44.95');

            expect(book3.getElementsByTagName('author')[0].firstChild.nodeValue).toEqual('Corets, Eva');
            expect(book3.getElementsByTagName('genre')[0].firstChild.nodeValue).toEqual('Fantasy');
            expect(book3.getElementsByTagName('price')[0].firstChild.nodeValue).toEqual('5.95');

            done();
        })
        .error(function (data) {
            console.log(data);
        });
    });

    it('should be able to call the error handler when the requested URL/file can\'t be found', function (done) {
        XHR.get({
            type: 'json',
            url: 'data/notfound.json'
        })
        .success(function (data) {})
        .error(function (data) {
            expect(data).toEqual(jasmine.any(String));
            done();
        });
    });

});
