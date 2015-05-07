requirejs.config({
    baseUrl: '../src/modules',
    paths: {
        appshaper: '.',
        underscore: '../../node_modules/underscore/underscore',
        handlebars: '../../node_modules/handlebars/dist/handlebars.min',
        templates: '../../test/templates'
    },
    shim: {
        handlebars: {
          exports: 'Handlebars',
          init: function() {
            this.Handlebars = Handlebars;
            return this.Handlebars;
          }
        }
    }
});
