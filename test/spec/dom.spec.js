describe('dom', function () {

    var Dom,
        domElement = document.createElement('div'),
        reset = function () {
            domElement.className = '';
        };

    afterEach(reset);

    it('should be able to import the Dom module', function (done) {
        require([
            'appshaper/utils/dom'
        ], function (
            DomModule
        ) {
            expect(DomModule).toEqual(jasmine.any(Object));
            Dom = DomModule;
            done();
        });
    });

    it('should be able to get a data attribute', function () {
        var testNode = document.createElement('div');
        testNode.setAttribute('data-test', 'some value');
        expect(Dom.getData(testNode, 'test')).toEqual('some value');
    });

    it('should be able to set a data attribute', function () {
        var testNode = document.createElement('div');
        Dom.setData(testNode, 'test', 'some value');
        expect(testNode.getAttribute('data-test')).toEqual('some value');
    });

    describe('.addClass', function () {
        it('Shoud be able to add a new class to a DOM element', function () {
            Dom.addClass(domElement, 'class');
            expect(domElement.className).toEqual('class');
        });
        it('Shoud be able to add multiple classes to a DOM element', function () {
            Dom.addClass(domElement, ['class', 'anotherClass', 'yetAnotherClass']);
            expect(domElement.className).toEqual('class anotherClass yetAnotherClass');
        });
    });
    describe('.containsClass', function () {
        it('Shoud be able to check if a DOM element contains a certain class', function () {
            Dom.addClass(domElement, 'containsClass');
            expect(Dom.containsClass(domElement, 'containsClass')).toBeTruthy();
        });
    });
    describe('.removeClass', function () {
        it('Shoud be able to remove a class from a DOM element', function () {
            domElement.className = 'one two three';
            Dom.removeClass(domElement, 'two');
            expect(domElement.className).toEqual('one three');
        });
    });
    describe('.removeClasses', function () {
        it('Shoud be able to remove a class from a DOM element', function () {
            domElement.className = 'one two three';
            Dom.removeAllClasses(domElement);
            expect(domElement.className).toEqual('');
        });
    });
    describe('.toggleClass', function () {
        it('Shoud remove a class when it already exists', function () {
            domElement.className = 'one two three';
            Dom.toggleClass(domElement, 'three');
            expect(domElement.className).toEqual('one two');
        });
        it('Shoud add a class when it doesn\'t exists yet', function () {
            domElement.className = 'one two three';
            Dom.toggleClass(domElement, 'four');
            expect(domElement.className).toEqual('one two three four');
        });
    });

});
