var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var parseCred = require('./parse-credentials.json');

/****** PARSE API ACCESS CREDENTIALS ******/
var applicationId = parseCred.applicationId;
var restApiKey = parseCred.restApiKey;

/*  
  Replace the toJSON method of Backbone.Model with our version
  
  This method removes the "createdAt" and "updatedAt" keys from the JSON version 
  because otherwise the PUT requests to Parse fails.
*/
var original_toJSON = Backbone.Model.prototype.toJSON;
var ParseModel = {
  toJSON: function (options) {
    var _parse_class_name =  this.__proto__._parse_class_name;
    var data = original_toJSON.call(this, options);
    delete data.createdAt;
    delete data.updatedAt;
    return data;
  },
  idAttribute: "objectId"
};
_.extend(Backbone.Model.prototype, ParseModel);

/*  
  Replace the parse method of Backbone.Collection
  Backbone Collection expects to get a JSON array when fetching.
  Parse returns a JSON object with key "results" and value being the array.
*/
var original_parse = Backbone.Collection.prototype.parse;
var ParseCollection = {
  parse: function (options) {
    var _parse_class_name = this.__proto__._parse_class_name;
    var data = original_parse.call(this, options);
    if (_parse_class_name && data.results) {
      return data.results;
    } else {
      return data;
    }
  }
};
_.extend(Backbone.Collection.prototype, ParseCollection);

/*
  Map to HTTP Type Map
*/
var methodMap = {
  'create': 'POST',
  'update': 'PUT',
  'delete': 'DELETE',
  'read': 'GET'
};

/*
 Override the default Backbone.sync
*/
var ajaxSync = Backbone.sync;
Backbone.sync = function (method, model, options) {
  var objectId = model.models ? "" : model.id; //get id if it is not a Backbone Collection
  var className = model.__proto__._parse_class_name;
  if (!className) {
    return ajaxSync(method, model, options);  //It's a not a Parse-backed model, use default sync
  }

  // Create request parameters
  var type = methodMap[method];
  options || (options = {});
  var baseUrl = "https://parseapi.back4app.com/classes";
  var url = baseUrl + "/" + className + "/";
  if (method !== "create") {
    url = url + objectId;
  }

  // Setup Data
  var data;
  if (!options.data && model && (method === 'create' || method === 'update')) {
    data = JSON.stringify(model.toJSON());
  } else if (options.query && method === 'read') { // query for Parse.com objects
    data = encodeURI("where=" + JSON.stringify(options.query));
  }

  var request = {
    //data
    contentType: "application/json",
    processData: false,
    dataType: 'json',
    data: data,
    url: url,
    type: type,
    headers: {
      "X-Parse-Application-Id": applicationId,
      "X-Parse-REST-API-Key": restApiKey
    }
  };

  return $.ajax(_.extend(options, request));
};

module.exports = Backbone;