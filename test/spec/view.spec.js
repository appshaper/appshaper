describe('view', function () {

    var View;

    it('should be able to import the View module', function (done) {
        require([
             'appshaper/mvc/view',
             'templates'
         ], function (
             ViewModule
         ) {
             expect(ViewModule).toEqual(jasmine.any(Function));
             View = ViewModule;
             done();
         });
    });

    it('should be able to render a basic view', function (done) {
        var basicView = View({
                templateId: 'template1'
            }),
            node = basicView.getNode();

        basicView.render('#test');

        expect(node.id).toEqual('appshaper-view1');
        expect(node.children[0].id).toEqual('node1');
        expect(node.children[0].innerHTML).toEqual('Node 1');
        expect(node.children[1].id).toEqual('node2');
        expect(node.children[1].innerHTML).toEqual('Node 2');
        expect(node.children[2].id).toEqual('node3');
        expect(node.children[2].innerHTML).toEqual('Node 3');

        done();
    });

    it('should be able to render a basic view with replacement data', function (done) {
        var data = {
                title: 'The title',
                greeting: 'Hi there!'
            },
            basicView = View({
                templateId: 'template2',
                data: data
            }),
            node = basicView.getNode(),
            contentNode = node.children[0];

        basicView.render('#test');

        expect(node.id).toEqual('appshaper-view2');
        expect(contentNode.id).toEqual('content');
        expect(contentNode.children[0].innerHTML).toEqual('The title');
        expect(contentNode.children[1].innerHTML).toEqual('Hi there!');

        done();
    });

});
