describe('collection', function () {

    var Model,
        Collection;

    it('should be able to import the Model and Collection modules', function (done) {
        require([
             'appshaper/mvc/model',
             'appshaper/mvc/collection'
         ], function (
             ModelModule,
             CollectionModule
         ) {
             expect(ModelModule).toEqual(jasmine.any(Function));
             expect(CollectionModule).toEqual(jasmine.any(Function));
             Model = ModelModule;
             Collection = CollectionModule;
             done();
         });
    });

    it('should be able to create a basic collection', function () {
        var basicModel = Model('basic', {
                fields: {
                    id: 'number',
                    title: 'string',
                    greeting: 'string'
                }
            }),
            data1 = {
                id: 1,
                title: 'title 1',
                greeting: 'hi'
            },
            data2 = {
                id: 2,
                title: 'title 2',
                greeting: 'hello'
            },
            data3 = {
                id: 1,
                title: 'title 1',
                greeting: 'hello there!'
            },
            data4 = {
                id: 2,
                title: 'title 2',
                greeting: 'hey'
            },
            basicCollection = Collection('basic', {
                model: basicModel
            }),
            collection1 = basicCollection([
                basicModel(data1),
                basicModel(data2)
            ]),
            collection2 = basicCollection([
                basicModel(data3),
                basicModel(data4)
            ]);

        expect(collection1.getFlatData()).toEqual([data1, data2]);
        expect(collection2.getFlatData()).toEqual([data3, data4]);
    });

    it('should be able to create a basic collection and use custom methods', function () {
        var basicModel = Model('basic', {
                fields: {
                    id: 'number',
                    title: 'string',
                    greeting: 'string'
                }
            }),
            basicCollection = Collection('basic', {
                model: basicModel,
                methods: {
                    toString: function () {
                        var string = '',
                            flatData = this.getFlatData();

                        flatData.forEach(function (item) {
                            string += item.id + ', ' + item.title + ', ' + item.greeting + ' | '
                        });
                        return string;
                    }
                }
            }),
            collection = basicCollection([
                basicModel({
                   id: 20,
                   title: 'Some title here',
                   greeting: 'hey dude!'
                }),
                basicModel({
                   id: 21,
                   title: 'Some other title here',
                   greeting: 'hey there!'
                })
            ]);

        expect(collection.toString()).toEqual(
            '20, Some title here, hey dude! | 21, Some other title here, hey there! | ');
    });

    it('should be able to retrieve specific models by using the get and getAll methods', function () {
        var basicModel = Model('basic', {
                fields: {
                    id: 'number',
                    type: 'string',
                    model: 'string',
                    title: 'string',
                    greeting: 'string'
                }
            }),
            basicCollection = Collection('basic', {
                model: basicModel
            }),
            model1 = basicModel({
               id: 1,
               type: 'a',
               model: 'standard',
               title: 'The title',
               greeting: 'I salute you!'
            }),
            model2 = basicModel({
               id: 2,
               type: 'b',
               model: 'advanced',
               title: 'Some other title here',
               greeting: 'Reporting!'
            }),
            model3 = basicModel({
               id: 3,
               type: 'c',
               model: 'standard',
               title: 'And yet some other title here',
               greeting: 'Yes sir!'
            }),
            model4 = basicModel({
               id: 4,
               type: 'a',
               model: 'advanced',
               title: 'Some title here',
               greeting: 'I salute you!'
            }),
            model5 = basicModel({
               id: 5,
               type: 'a',
               model: 'standard',
               title: 'The title',
               greeting: 'Hello!'
            }),
            collection = basicCollection([
                model1,
                model2,
                model3,
                model4,
                model5
            ]);

        var allModels = collection.getAll({
                type: 'a',
                model: 'standard',
                title: 'The title'
            }),
            allModelsFlat = collection.getAll({
                type: 'a',
                model: 'standard',
                title: 'The title'
            }, true),
            model = collection.get({
                id: 2,
                type: 'b',
                greeting: 'Reporting!'
            }),
            modelFlat = collection.get({
                id: 2,
                type: 'b',
                greeting: 'Reporting!'
            }, true);

        expect(allModels).toEqual([
            model1,
            model5
        ]);

        expect(allModelsFlat).toEqual([
            model1.getData(),
            model5.getData()
        ]);

        expect(model).toEqual(model2);

        expect(modelFlat).toEqual(model2.getData());
    });

    it('should be able to remove a model from the collection using the remove method', function () {
        var basicModel = Model('basic', {
                fields: {
                    id: 'number',
                    title: 'string',
                    greeting: 'string'
                }
            }),
            basicCollection = Collection('basic', {
                model: basicModel
            }),
            model1 = basicModel({
               id: 20,
               title: 'Some title here',
               greeting: 'hey dude!'
            }),
            model2 = basicModel({
               id: 21,
               title: 'Some other title here',
               greeting: 'hey there!'
            }),
            model3 = basicModel({
               id: 22,
               title: 'And yet some other title here',
               greeting: 'hey!'
            })
            collection = basicCollection([
                model1,
                model2,
                model3
            ]);

        collection.remove(model2);

        expect(collection.getData()).toEqual([model1, model3]);
    });

});
