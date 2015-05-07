define(['handlebars'], function(Handlebars) {

var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["appshaper"] = this["appshaper"] || {};
this["appshaper"]["templates"] = this["appshaper"]["templates"] || {};

this["appshaper"]["templates"]["template1"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"node1\">Node 1</div>\n<div id=\"node2\">Node 2</div>\n<div id=\"node3\">Node 3</div>";
},"useData":true});

this["appshaper"]["templates"]["template2"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\"content\">\n    <h1 class=\"title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n    <p class=\"greeting\">"
    + alias3(((helper = (helper = helpers.greeting || (depth0 != null ? depth0.greeting : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"greeting","hash":{},"data":data}) : helper)))
    + "</p>\n</div>";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["appshaper"]["templates"];}

return this["appshaper"];

});