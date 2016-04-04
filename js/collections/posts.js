var Backbone = require('../lib/backbone-parse/backbone-parse');
var Post = require('../models/post');

var PostCollection = Backbone.Collection.extend({
  model: Post,
  _parse_class_name: "Image"
});

var Posts = new PostCollection();

module.exports = Posts;