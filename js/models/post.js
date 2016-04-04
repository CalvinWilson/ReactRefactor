var Backbone = require('../lib/backbone-parse/backbone-parse');

var Post = Backbone.Model.extend({
  _parse_class_name: "Image"
});

module.exports = Post;