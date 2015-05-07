describe('model', function () {

    var Model;

    it('should be able to import the Model module', function (done) {
        require([
             'appshaper/mvc/model'
         ], function (
             ModelModule
         ) {
             expect(ModelModule).toEqual(jasmine.any(Function));
             Model = ModelModule;
             done();
         });
    });

    it('should be able to define a model and set fields', function () {
        var basicModel = Model('basic', {
                fields: {
                    id: 'number',
                    title: 'string',
                    greeting: 'string'
                }
            })();

        basicModel.set('id', 12);
        basicModel.set('title', 'This is the title');
        basicModel.set('greeting', 'Hi there!');

        expect(basicModel.getData()).toEqual({
            id: 12,
            title: 'This is the title',
            greeting: 'Hi there!'
        });

        expect(basicModel.get('id')).toEqual(12);
        expect(basicModel.get('title')).toEqual('This is the title');
        expect(basicModel.get('greeting')).toEqual('Hi there!');
    });

    it('should be able to define a model and create multiple instances', function () {
        var data1 = {
                id: 12,
                title: 'This is the title',
                greeting: 'Hi there!'
            },
            data2 = {
                id: 13,
                title: 'This is another title',
                greeting: 'Hello again!'
            },
            basicModel = Model('basic', {
                fields: {
                    id: 'number',
                    title: 'string',
                    greeting: 'string'
                }
            }),
            dataModel1 = basicModel(data1),
            dataModel2 = basicModel(data2);

        expect(dataModel1.getData()).toEqual(data1);
        expect(dataModel2.getData()).toEqual(data2);
    });

    it('should be able to define a model and use custom methods', function () {
        var data = {
                id: 12,
                title: 'This is the title',
                greeting: 'Hi there!',
                count: 0
            },
            basicModel = Model('basic', {
                fields: {
                    id: 'number',
                    title: 'string',
                    greeting: 'string',
                    count: 'number'
                },
                methods: {
                    getUpperGreeting: function () {
                        return this.data.greeting.toUpperCase()
                    },
                    increaseCount: function () {
                        ++this.data.count;
                    }
                }
            }),
            dataModel = basicModel(data);

        expect(dataModel.getData()).toEqual(data);
        expect(dataModel.getUpperGreeting()).toEqual('HI THERE!');
        dataModel.increaseCount();
        expect(dataModel.get('count')).toEqual(1);
    });

    it('should be able to define a model without type specification', function () {
        var data = {
                id: 12,
                title: 'This is the title',
                greeting: 'Hi there!'
            },
            basicModel = Model(),
            dataModel = basicModel(data);

        expect(dataModel.getData()).toEqual(data);
    });

});
