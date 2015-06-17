require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var css = "/* BASIC */\n\n.biojs_msa_stage {\n    cursor: default;\n    line-height: normal; \n}\n\n.biojs_msa_seqblock {\n    cursor: move;\n}\n\n.biojs_msa_layer{\n    display: block;\n    white-space: nowrap;\n}\n\n.biojs_msa_labels {\n    color:black;\n    display: inline-block;\n    white-space: nowrap;\n    cursor: pointer;\n    vertical-align:middle;\n    overflow: hidden;\n    text-overflow: clip;\n    /*margin:auto; */\n    text-align: left;\n}\n\n.biojs_msa_header {\n    white-space: nowrap;\n    text-align: left;\n}\n\n.biojs_msa_labelrow:before {\n    content: '';\n    display: inline-block;\n    width: 0;\n    height: 100%;\n    vertical-align: middle;\n}\n\n.biojs_msa_labelrow{\n    height: 100%;\n}\n\n.biojs_msa_labelblock::-webkit-scrollbar, .biojs_msa_rheader::-webkit-scrollbar{\n    // FIX scrollbars on Mac\n    -webkit-appearance: none;\n    width: 7px;\n    height: 7px;\n}\n.biojs_msa_labelblock::-webkit-scrollbar-thumb, .biojs_msa_rheader::-webkit-scrollbar-thumb{\n    border-radius: 4px;\n    background-color: rgba(0,0,0,.5);\n    box-shadow: 0 0 1px rgba(255,255,255,.5);\n}\n\n/* END BASIC */\n/* Marker */\n\n.biojs_msa_marker{\n    color:grey;\n    white-space: nowrap;\n    cursor: pointer;\n}\n\n.biojs_msa_marker span{\n    text-align: center;\n}\n\n/* END Marker */\n/* Menubar */\n\n.smenubar .smenubar_alink {\n    background: #3498db;\n    background-image: -webkit-linear-gradient(top, #3498db, #2980b9);\n    background-image: -moz-linear-gradient(top, #3498db, #2980b9);\n    background-image: -ms-linear-gradient(top, #3498db, #2980b9);\n    background-image: -o-linear-gradient(top, #3498db, #2980b9);\n    background-image: linear-gradient(to bottom, #3498db, #2980b9);\n    -webkit-border-radius: 28;\n    -moz-border-radius: 28;\n    border-radius: 28px;\n    font-family: Arial;\n    color: #ffffff;\n    padding: 3px 10px 3px 10px;\n    margin-left: 10px;\n    text-decoration: none;\n}\n.smenubar {\n    display: inline-block;\n}\n\n.smenubar .smenubar_alink:hover {\n    cursor: pointer;\n}\n\n\n/* jquery dropdown CSS */\n\n.smenu-dropdown {\n    position: absolute;\n    z-index: 9999999;\n    display: none;\n}\n\n.smenu-dropdown .smenu-dropdown-menu,\n.smenu-dropdown .smenu-dropdown-panel {\n    min-width: 160px;\n    max-width: 360px;\n    list-style: none;\n    background: #FFF;\n    border: solid 1px #DDD;\n    border: solid 1px rgba(0, 0, 0, .2);\n    border-radius: 6px;\n    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);\n    overflow: visible;\n    padding: 4px 0;\n    margin: 0;\n}\n\n.smenu-dropdown .smenu-dropdown-panel {\n    padding: 10px;\n}\n\n\n.smenu-dropdown.smenu-dropdown-scroll .smenu-dropdown-menu,\n.smenu-dropdown.smenu-dropdown-scroll .smenu-dropdown-panel {\n    max-height: 358px;\n    overflow: auto;\n}\n\n.smenu-dropdown .smenu-dropdown-menu LI {\n    list-style: none;\n    padding: 0 0;\n    margin: 0;\n    line-height: 18px;\n}\n\n.smenu-dropdown .smenu-dropdown-menu LI,\n.smenu-dropdown .smenu-dropdown-menu LABEL {\n    display: block;\n    color: #555;\n    text-decoration: none;\n    line-height: 18px;\n    padding: 3px 15px;\n    white-space: nowrap;\n}\n\n.smenu-dropdown .smenu-dropdown-menu LI:hover,\n.smenu-dropdown .smenu-dropdown-menu LABEL:hover {\n    background-color: #08C;\n    color: #FFF;\n    cursor: pointer;\n}\n\n.smenu-dropdown .smenu-dropdown-menu .smenu-dropdown-divider {\n    font-size: 1px;\n    border-top: solid 1px #E5E5E5;\n    padding: 0;\n    margin: 5px 0;\n}\n\n/* END Menubar */\n"; (require("/home/travis/build/greenify/msa/node_modules/cssify"))(css); module.exports = css;
},{"/home/travis/build/greenify/msa/node_modules/cssify":65}],2:[function(require,module,exports){
var _ = require('underscore');
var viewType = require("backbone-viewj");
var pluginator;

/**
 * Remove an element and provide a function that inserts it into its original position
 * @param element {Element} The element to be temporarily removed
 * @return {Function} A function that inserts the element into its original position
 **/
function removeToInsertLater(element) {
  var parentNode = element.parentNode;
  var nextSibling = element.nextSibling;
  parentNode.removeChild(element);
  return function() {
    if (nextSibling) {
      parentNode.insertBefore(element, nextSibling);
    } else {
      parentNode.appendChild(element);
    }
  };
}

var removeChilds = function (node) {
    var last;
    while (last = node.lastChild) node.removeChild(last);
};

module.exports = pluginator = viewType.extend({
  renderSubviews: function() {
    // it is faster to remove the entire element and replace it
    // -> however this will lead to lost id,class and style props
    var oldEl = this.el;

    // it might be that the element is not on the DOM yet
    var elOnDom = oldEl.parentNode != undefined;
    if(elOnDom){
      var insert = removeToInsertLater(oldEl)
    }
    removeChilds(oldEl);

    var frag = document.createDocumentFragment();
    var views = this._views();
    var viewsSorted = _.sortBy(views, function(el) {
      return el.ordering;
    });
    var view, node;
    for (var i = 0; i <  viewsSorted.length; i++) {
      view = viewsSorted[i];
      view.render();
      node = view.el;
      if (node != null) {
        frag.appendChild(node);
      }
    }

    oldEl.appendChild(frag);
    if(elOnDom){
      insert();
    }
    return oldEl;
  },
  addView: function(key, view) {
    var views = this._views();
    if (view == null) {
      throw "Invalid plugin. ";
    }
    if (view.ordering == null) {
      view.ordering = key;
    }
    return views[key] = view;
  },
  removeViews: function() {
    var el, key;
    var views = this._views();
    for (key in views) {
      el = views[key];
      el.undelegateEvents();
      el.unbind();
      if (el.removeViews != null) {
        el.removeViews();
      }
      el.remove();
    }
    return this.views = {};
  },
  removeView: function(key) {
    var views = this._views();
    views[key].remove();
    return delete views[key];
  },
  getView: function(key) {
    var views = this._views();
    return views[key];
  },
  remove: function() {
    this.removeViews();
    return viewType.prototype.remove.apply(this);
  },
  _views: function() {
    if (this.views == null) {
      this.views = {};
    }
    return this.views;
  }
});

},{"backbone-viewj":9,"underscore":91}],3:[function(require,module,exports){
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

var Events = require("backbone-events-standalone");
var extend = require("backbone-extend-standalone");
var _ = require("underscore");
var Model = require("./model");

// Create local references to array methods we'll want to use later.
var array = [];
var slice = array.slice;

// Backbone.Collection
// -------------------

// If models tend to represent a single row of data, a Backbone Collection is
// more analogous to a table full of data ... or a small slice or page of that
// table, or a collection of rows that belong together for a particular reason
// -- all of the messages in this particular folder, all of the documents
// belonging to this particular author, and so on. Collections maintain
// indexes of their models, both in order, and for lookup by `id`.

// Create a new **Collection**, perhaps to contain a specific type of `model`.
// If a `comparator` is specified, the Collection will maintain
// its models in sort order, as they're added and removed.
var Collection = function(models, options) {
  options || (options = {});
  if (options.model) this.model = options.model;
  if (options.comparator !== void 0) this.comparator = options.comparator;
  this._reset();
  this.initialize.apply(this, arguments);
  if (models) this.reset(models, _.extend({silent: true}, options));
};

// Default options for `Collection#set`.
var setOptions = {add: true, remove: true, merge: true};
var addOptions = {add: true, remove: false};

// Define the Collection's inheritable methods.
_.extend(Collection.prototype, Events, {

  // The default model for a collection is just a **Backbone.Model**.
  // This should be overridden in most cases.
  model: Model,

  // Initialize is an empty function by default. Override it with your own
  // initialization logic.
  initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
  toJSON: function(options) {
    return this.map(function(model){ return model.toJSON(options); });
  },

    // Proxy `Backbone.sync` by default.
  sync: function() {
    return Backbone.sync.apply(this, arguments);
  },

    // Add a model, or list of models to the set.
  add: function(models, options) {
    return this.set(models, _.extend({merge: false}, options, addOptions));
  },

    // Remove a model, or a list of models from the set.
  remove: function(models, options) {
    var singular = !_.isArray(models);
    models = singular ? [models] : _.clone(models);
    options || (options = {});
    for (var i = 0, length = models.length; i < length; i++) {
      var model = models[i] = this.get(models[i]);
      if (!model) continue;
      var id = this.modelId(model.attributes);
      if (id != null) delete this._byId[id];
      delete this._byId[model.cid];
      var index = this.indexOf(model);
      this.models.splice(index, 1);
      this.length--;
      if (!options.silent) {
        options.index = index;
        model.trigger('remove', model, this, options);
      }
      this._removeReference(model, options);
    }
    return singular ? models[0] : models;
  },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
  set: function(models, options) {
    options = _.defaults({}, options, setOptions);
    if (options.parse) models = this.parse(models, options);
    var singular = !_.isArray(models);
    models = singular ? (models ? [models] : []) : models.slice();
    var id, model, attrs, existing, sort;
    var at = options.at;
    var sortable = this.comparator && (at == null) && options.sort !== false;
    var sortAttr = _.isString(this.comparator) ? this.comparator : null;
    var toAdd = [], toRemove = [], modelMap = {};
    var add = options.add, merge = options.merge, remove = options.remove;
    var order = !sortable && add && remove ? [] : false;

    // Turn bare objects into model references, and prevent invalid models
    // from being added.
    for (var i = 0, length = models.length; i < length; i++) {
      attrs = models[i];

      // If a duplicate is found, prevent it from being added and
      // optionally merge it into the existing model.
      if (existing = this.get(attrs)) {
        if (remove) modelMap[existing.cid] = true;
        if (merge && attrs !== existing) {
          attrs = this._isModel(attrs) ? attrs.attributes : attrs;
          if (options.parse) attrs = existing.parse(attrs, options);
          existing.set(attrs, options);
          if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
        }
        models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
      } else if (add) {
        model = models[i] = this._prepareModel(attrs, options);
        if (!model) continue;
        toAdd.push(model);
        this._addReference(model, options);
      }

      // Do not add multiple models with the same `id`.
      model = existing || model;
      if (!model) continue;
      id = this.modelId(model.attributes);
      if (order && (model.isNew() || !modelMap[id])) order.push(model);
      modelMap[id] = true;
    }

    // Remove nonexistent models if appropriate.
    if (remove) {
      for (var i = 0, length = this.length; i < length; i++) {
        if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
      }
      if (toRemove.length) this.remove(toRemove, options);
    }

    // See if sorting is needed, update `length` and splice in new models.
    if (toAdd.length || (order && order.length)) {
      if (sortable) sort = true;
      this.length += toAdd.length;
      if (at != null) {
        for (var i = 0, length = toAdd.length; i < length; i++) {
          this.models.splice(at + i, 0, toAdd[i]);
        }
      } else {
        if (order) this.models.length = 0;
        var orderedModels = order || toAdd;
        for (var i = 0, length = orderedModels.length; i < length; i++) {
          this.models.push(orderedModels[i]);
        }
      }
    }

    // Silently sort the collection if appropriate.
    if (sort) this.sort({silent: true});

    // Unless silenced, it's time to fire all appropriate add/sort events.
    if (!options.silent) {
      var addOpts = at != null ? _.clone(options) : options;
      for (var i = 0, length = toAdd.length; i < length; i++) {
        if (at != null) addOpts.index = at + i;
        (model = toAdd[i]).trigger('add', model, this, addOpts);
      }
      if (sort || (order && order.length)) this.trigger('sort', this, options);
    }

    // Return the added (or merged) model (or models).
    return singular ? models[0] : models;
  },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
  reset: function(models, options) {
    options || (options = {});
    for (var i = 0, length = this.models.length; i < length; i++) {
      this._removeReference(this.models[i], options);
    }
    options.previousModels = this.models;
    this._reset();
    models = this.add(models, _.extend({silent: true}, options));
    if (!options.silent) this.trigger('reset', this, options);
    return models;
  },

    // Add a model to the end of the collection.
  push: function(model, options) {
    return this.add(model, _.extend({at: this.length}, options));
  },

    // Remove a model from the end of the collection.
  pop: function(options) {
    var model = this.at(this.length - 1);
    this.remove(model, options);
    return model;
  },

    // Add a model to the beginning of the collection.
  unshift: function(model, options) {
    return this.add(model, _.extend({at: 0}, options));
  },

    // Remove a model from the beginning of the collection.
  shift: function(options) {
    var model = this.at(0);
    this.remove(model, options);
    return model;
  },

    // Slice out a sub-array of models from the collection.
  slice: function() {
    return slice.apply(this.models, arguments);
  },

    // Get a model from the set by id.
  get: function(obj) {
    if (obj == null) return void 0;
    var id = this.modelId(this._isModel(obj) ? obj.attributes : obj);
    return this._byId[obj] || this._byId[id] || this._byId[obj.cid];
  },

    // Get the model at the given index.
  at: function(index) {
    if (index < 0) index += this.length;
    return this.models[index];
  },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
  where: function(attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return this[first ? 'find' : 'filter'](function(model) {
      for (var key in attrs) {
        if (attrs[key] !== model.get(key)) return false;
      }
      return true;
    });
  },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
  findWhere: function(attrs) {
    return this.where(attrs, true);
  },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
  sort: function(options) {
    if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
    options || (options = {});

    // Run sort based on type of `comparator`.
    if (_.isString(this.comparator) || this.comparator.length === 1) {
      this.models = this.sortBy(this.comparator, this);
    } else {
      this.models.sort(_.bind(this.comparator, this));
    }

    if (!options.silent) this.trigger('sort', this, options);
    return this;
  },

    // Pluck an attribute from each model in the collection.
  pluck: function(attr) {
    return _.invoke(this.models, 'get', attr);
  },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
  fetch: function(options) {
    options = options ? _.clone(options) : {};
    if (options.parse === void 0) options.parse = true;
    var success = options.success;
    var collection = this;
    options.success = function(resp) {
      var method = options.reset ? 'reset' : 'set';
      collection[method](resp, options);
      if (success) success(collection, resp, options);
      collection.trigger('sync', collection, resp, options);
    };
    wrapError(this, options);
    return this.sync('read', this, options);
  },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
  create: function(model, options) {
    options = options ? _.clone(options) : {};
    if (!(model = this._prepareModel(model, options))) return false;
    if (!options.wait) this.add(model, options);
    var collection = this;
    var success = options.success;
    options.success = function(model, resp) {
      if (options.wait) collection.add(model, options);
      if (success) success(model, resp, options);
    };
    model.save(null, options);
    return model;
  },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
  parse: function(resp, options) {
    return resp;
  },

    // Create a new collection with an identical list of models as this one.
  clone: function() {
    return new this.constructor(this.models, {
      model: this.model,
      comparator: this.comparator
    });
  },

    // Define how to uniquely identify models in the collection.
  modelId: function (attrs) {
    return attrs[this.model.prototype.idAttribute || 'id'];
  },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
  _reset: function() {
    this.length = 0;
    this.models = [];
    this._byId  = {};
  },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
  _prepareModel: function(attrs, options) {
    if (this._isModel(attrs)) {
      if (!attrs.collection) attrs.collection = this;
      return attrs;
    }
    options = options ? _.clone(options) : {};
    options.collection = this;
    var model = new this.model(attrs, options);
    if (!model.validationError) return model;
    this.trigger('invalid', this, model.validationError, options);
    return false;
  },

    // Method for checking whether an object should be considered a model for
    // the purposes of adding to the collection.
  _isModel: function (model) {
    return model instanceof Model;
  },

    // Internal method to create a model's ties to a collection.
  _addReference: function(model, options) {
    this._byId[model.cid] = model;
    var id = this.modelId(model.attributes);
    if (id != null) this._byId[id] = model;
    model.on('all', this._onModelEvent, this);
  },

    // Internal method to sever a model's ties to a collection.
  _removeReference: function(model, options) {
    if (this === model.collection) delete model.collection;
    model.off('all', this._onModelEvent, this);
  },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
  _onModelEvent: function(event, model, collection, options) {
    if ((event === 'add' || event === 'remove') && collection !== this) return;
    if (event === 'destroy') this.remove(model, options);
    if (event === 'change') {
      var prevId = this.modelId(model.previousAttributes());
      var id = this.modelId(model.attributes);
      if (prevId !== id) {
        if (prevId != null) delete this._byId[prevId];
        if (id != null) this._byId[id] = model;
      }
    }
    this.trigger.apply(this, arguments);
  }

});

// Underscore methods that we want to implement on the Collection.
// 90% of the core usefulness of Backbone Collections is actually implemented
// right here:
var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample', 'partition'];

// Mix in each Underscore method as a proxy to `Collection#models`.
_.each(methods, function(method) {
  if (!_[method]) return;
  Collection.prototype[method] = function() {
    var args = slice.call(arguments);
    args.unshift(this.models);
    return _[method].apply(_, args);
  };
});

// Underscore methods that take a property name as an argument.
var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

// Use attributes instead of properties.
_.each(attributeMethods, function(method) {
  if (!_[method]) return;
  Collection.prototype[method] = function(value, context) {
    var iterator = _.isFunction(value) ? value : function(model) {
      return model.get(value);
    };
    return _[method](this.models, iterator, context);
  };
});

// setup inheritance
Collection.extend = extend;
module.exports = Collection;

},{"./model":5,"backbone-events-standalone":7,"backbone-extend-standalone":8,"underscore":91}],4:[function(require,module,exports){
module.exports.Model = require("./model");
module.exports.Collection = require("./collection");
module.exports.Events = require("backbone-events-standalone");
module.exports.extend = require("backbone-extend-standalone");

},{"./collection":3,"./model":5,"backbone-events-standalone":7,"backbone-extend-standalone":8}],5:[function(require,module,exports){
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

var Events = require("backbone-events-standalone");
var extend = require("backbone-extend-standalone");
var _ = require("underscore");

// Backbone.Model
// --------------

// Backbone **Models** are the basic data object in the framework --
// frequently representing a row in a table in a database on your server.
// A discrete chunk of data and a bunch of useful, related methods for
// performing computations and transformations on that data.

// Create a new model with the specified attributes. A client id (`cid`)
// is automatically generated and assigned for you.
var Model = function(attributes, options) {
  var attrs = attributes || {};
  options || (options = {});
  this.cid = _.uniqueId('c');
  this.attributes = {};
  if (options.collection) this.collection = options.collection;
  if (options.parse) attrs = this.parse(attrs, options) || {};
  attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
  this.set(attrs, options);
  this.changed = {};
  this.initialize.apply(this, arguments);
};

// Attach all inheritable methods to the Model prototype.
_.extend(Model.prototype, Events, {

  // A hash of attributes whose current and previous value differ.
  changed: null,

  // The value returned during the last failed validation.
  validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
  idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
  initialize: function(){},

    // Return a copy of the model's `attributes` object.
  toJSON: function(options) {
    return _.clone(this.attributes);
  },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
  sync: function() {
    return Backbone.sync.apply(this, arguments);
  },

    // Get the value of an attribute.
  get: function(attr) {
    return this.attributes[attr];
  },

    // Get the HTML-escaped value of an attribute.
  escape: function(attr) {
    return _.escape(this.get(attr));
  },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
  has: function(attr) {
    return this.get(attr) != null;
  },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
  set: function(key, val, options) {
    var attr, attrs, unset, changes, silent, changing, prev, current;
    if (key == null) return this;

    // Handle both `"key", value` and `{key: value}` -style arguments.
    if (typeof key === 'object') {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    options || (options = {});

    // Run validation.
    if (!this._validate(attrs, options)) return false;

    // Extract attributes and options.
    unset           = options.unset;
    silent          = options.silent;
    changes         = [];
    changing        = this._changing;
    this._changing  = true;

    if (!changing) {
      this._previousAttributes = _.clone(this.attributes);
      this.changed = {};
    }
    current = this.attributes, prev = this._previousAttributes;

    // Check for changes of `id`.
    if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

    // For each `set` attribute, update or delete the current value.
    for (attr in attrs) {
      val = attrs[attr];
      if (!_.isEqual(current[attr], val)) changes.push(attr);
      if (!_.isEqual(prev[attr], val)) {
        this.changed[attr] = val;
      } else {
        delete this.changed[attr];
      }
      unset ? delete current[attr] : current[attr] = val;
    }

    // Trigger all relevant attribute changes.
    if (!silent) {
      if (changes.length) this._pending = options;
      for (var i = 0, length = changes.length; i < length; i++) {
        this.trigger('change:' + changes[i], this, current[changes[i]], options);
      }
    }

    // You might be wondering why there's a `while` loop here. Changes can
    // be recursively nested within `"change"` events.
    if (changing) return this;
    if (!silent) {
      while (this._pending) {
        options = this._pending;
        this._pending = false;
        this.trigger('change', this, options);
      }
    }
    this._pending = false;
    this._changing = false;
    return this;
  },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
  unset: function(attr, options) {
    return this.set(attr, void 0, _.extend({}, options, {unset: true}));
  },

    // Clear all attributes on the model, firing `"change"`.
  clear: function(options) {
    var attrs = {};
    for (var key in this.attributes) attrs[key] = void 0;
    return this.set(attrs, _.extend({}, options, {unset: true}));
  },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
  hasChanged: function(attr) {
    if (attr == null) return !_.isEmpty(this.changed);
    return _.has(this.changed, attr);
  },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
  changedAttributes: function(diff) {
    if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
    var val, changed = false;
    var old = this._changing ? this._previousAttributes : this.attributes;
    for (var attr in diff) {
      if (_.isEqual(old[attr], (val = diff[attr]))) continue;
      (changed || (changed = {}))[attr] = val;
    }
    return changed;
  },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
  previous: function(attr) {
    if (attr == null || !this._previousAttributes) return null;
    return this._previousAttributes[attr];
  },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
  previousAttributes: function() {
    return _.clone(this._previousAttributes);
  },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
  fetch: function(options) {
    options = options ? _.clone(options) : {};
    if (options.parse === void 0) options.parse = true;
    var model = this;
    var success = options.success;
    options.success = function(resp) {
      if (!model.set(model.parse(resp, options), options)) return false;
      if (success) success(model, resp, options);
      model.trigger('sync', model, resp, options);
    };
    wrapError(this, options);
    return this.sync('read', this, options);
  },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
  save: function(key, val, options) {
    var attrs, method, xhr, attributes = this.attributes;

    // Handle both `"key", value` and `{key: value}` -style arguments.
    if (key == null || typeof key === 'object') {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    options = _.extend({validate: true}, options);

    // If we're not waiting and attributes exist, save acts as
    // `set(attr).save(null, opts)` with validation. Otherwise, check if
    // the model will be valid when the attributes, if any, are set.
    if (attrs && !options.wait) {
      if (!this.set(attrs, options)) return false;
    } else {
      if (!this._validate(attrs, options)) return false;
    }

    // Set temporary attributes if `{wait: true}`.
    if (attrs && options.wait) {
      this.attributes = _.extend({}, attributes, attrs);
    }

    // After a successful server-side save, the client is (optionally)
    // updated with the server-side state.
    if (options.parse === void 0) options.parse = true;
    var model = this;
    var success = options.success;
    options.success = function(resp) {
      // Ensure attributes are restored during synchronous saves.
      model.attributes = attributes;
      var serverAttrs = model.parse(resp, options);
      if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
      if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
        return false;
      }
      if (success) success(model, resp, options);
      model.trigger('sync', model, resp, options);
    };
    wrapError(this, options);

    method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
    if (method === 'patch' && !options.attrs) options.attrs = attrs;
    xhr = this.sync(method, this, options);

    // Restore attributes.
    if (attrs && options.wait) this.attributes = attributes;

    return xhr;
  },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
  destroy: function(options) {
    options = options ? _.clone(options) : {};
    var model = this;
    var success = options.success;

    var destroy = function() {
      model.stopListening();
      model.trigger('destroy', model, model.collection, options);
    };

    options.success = function(resp) {
      if (options.wait || model.isNew()) destroy();
      if (success) success(model, resp, options);
      if (!model.isNew()) model.trigger('sync', model, resp, options);
    };

    if (this.isNew()) {
      options.success();
      return false;
    }
    wrapError(this, options);

    var xhr = this.sync('delete', this, options);
    if (!options.wait) destroy();
    return xhr;
  },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
  url: function() {
    var base =
      _.result(this, 'urlRoot') ||
      _.result(this.collection, 'url') ||
      urlError();
    if (this.isNew()) return base;
    return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
  },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
  parse: function(resp, options) {
    return resp;
  },

    // Create a new model with identical attributes to this one.
  clone: function() {
    return new this.constructor(this.attributes);
  },

    // A model is new if it has never been saved to the server, and lacks an id.
  isNew: function() {
    return !this.has(this.idAttribute);
  },

    // Check if the model is currently in a valid state.
  isValid: function(options) {
    return this._validate({}, _.extend(options || {}, { validate: true }));
  },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
  _validate: function(attrs, options) {
    if (!options.validate || !this.validate) return true;
    attrs = _.extend({}, this.attributes, attrs);
    var error = this.validationError = this.validate(attrs, options) || null;
    if (!error) return true;
    this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
    return false;
  }

});

// Underscore methods that we want to implement on the Model.
var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit', 'chain', 'isEmpty'];

// Mix in each Underscore method as a proxy to `Model#attributes`.
_.each(modelMethods, function(method) {
  if (!_[method]) return;
  Model.prototype[method] = function() {
    var args = slice.call(arguments);
    args.unshift(this.attributes);
    return _[method].apply(_, args);
  };
});

// setup inheritance
Model.extend = extend;
module.exports = Model;

},{"backbone-events-standalone":7,"backbone-extend-standalone":8,"underscore":91}],6:[function(require,module,exports){
/**
 * Standalone extraction of Backbone.Events, no external dependency required.
 * Degrades nicely when Backone/underscore are already available in the current
 * global context.
 *
 * Note that docs suggest to use underscore's `_.extend()` method to add Events
 * support to some given object. A `mixin()` method has been added to the Events
 * prototype to avoid using underscore for that sole purpose:
 *
 *     var myEventEmitter = BackboneEvents.mixin({});
 *
 * Or for a function constructor:
 *
 *     function MyConstructor(){}
 *     MyConstructor.prototype.foo = function(){}
 *     BackboneEvents.mixin(MyConstructor.prototype);
 *
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * (c) 2013 Nicolas Perriault
 */
/* global exports:true, define, module */
(function() {
  var root = this,
      nativeForEach = Array.prototype.forEach,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      slice = Array.prototype.slice,
      idCounter = 0;

  // Returns a partial implementation matching the minimal API subset required
  // by Backbone.Events
  function miniscore() {
    return {
      keys: Object.keys || function (obj) {
        if (typeof obj !== "object" && typeof obj !== "function" || obj === null) {
          throw new TypeError("keys() called on a non-object");
        }
        var key, keys = [];
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            keys[keys.length] = key;
          }
        }
        return keys;
      },

      uniqueId: function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
      },

      has: function(obj, key) {
        return hasOwnProperty.call(obj, key);
      },

      each: function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            iterator.call(context, obj[i], i, obj);
          }
        } else {
          for (var key in obj) {
            if (this.has(obj, key)) {
              iterator.call(context, obj[key], key, obj);
            }
          }
        }
      },

      once: function(func) {
        var ran = false, memo;
        return function() {
          if (ran) return memo;
          ran = true;
          memo = func.apply(this, arguments);
          func = null;
          return memo;
        };
      }
    };
  }

  var _ = miniscore(), Events;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      var deleteListener = !name && !callback;
      if (typeof name === 'object') callback = this;
      if (obj) (listeners = {})[obj._listenerId] = obj;
      for (var id in listeners) {
        listeners[id].off(name, callback, this);
        if (deleteListener) delete this._listeners[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Mixin utility
  Events.mixin = function(proto) {
    var exports = ['on', 'once', 'off', 'trigger', 'stopListening', 'listenTo',
                   'listenToOnce', 'bind', 'unbind'];
    _.each(exports, function(name) {
      proto[name] = this[name];
    }, this);
    return proto;
  };

  // Export Events as BackboneEvents depending on current context
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Events;
    }
    exports.BackboneEvents = Events;
  }else if (typeof define === "function") {
    define(function() {
      return Events;
    });
  } else {
    root.BackboneEvents = Events;
  }
})(this);

},{}],7:[function(require,module,exports){
module.exports = require('./backbone-events-standalone');

},{"./backbone-events-standalone":6}],8:[function(require,module,exports){
(function (definition) {
  if (typeof exports === "object") {
    module.exports = definition();
  }
  else if (typeof define === 'function' && define.amd) {
    define(definition);
  }
  else {
    window.BackboneExtend = definition();
  }
})(function () {
  "use strict";

  // mini-underscore
  var _ = {
    has: function (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    },

    extend: function(obj) {
      for (var i=1; i<arguments.length; ++i) {
        var source = arguments[i];
        if (source) {
          for (var prop in source) {
            obj[prop] = source[prop];
          }
        }
      }
      return obj;
    }
  };

  /// Following code is pasted from Backbone.js ///

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Expose the extend function
  return extend;
});

},{}],9:[function(require,module,exports){
// this is the extracted view model from backbone
// note that we inject jbone as jquery replacment
// (and underscore directly)
//
// Views are almost more convention than they are actual code.
//  MVC pattern
// Backbone.View
// -------------

var _ = require("underscore");
var Events = require("backbone-events-standalone");
var extend = require("backbone-extend-standalone");
var $ = require('jbone');

// Backbone Views are almost more convention than they are actual code. A View
// is simply a JavaScript object that represents a logical chunk of UI in the
// DOM. This might be a single item, an entire list, a sidebar or panel, or
// even the surrounding frame which wraps your whole app. Defining a chunk of
// UI as a **View** allows you to define your DOM events declaratively, without
// having to worry about render order ... and makes it easy for the view to
// react to specific changes in the state of your models.

// Creating a Backbone.View creates its initial element outside of the DOM,
// if an existing element is not provided...
var View =  function(options) {
  this.cid = _.uniqueId('view');
  options || (options = {});
  _.extend(this, _.pick(options, viewOptions));
  this._ensureElement();
  this.initialize.apply(this, arguments);
};

// Cached regex to split keys for `delegate`.
var delegateEventSplitter = /^(\S+)\s*(.*)$/;

// List of view options to be merged as properties.
var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

// Set up all inheritable **Backbone.View** properties and methods.
_.extend(View.prototype, Events, {

  // The default `tagName` of a View's element is `"div"`.
  tagName: 'div',

  // jQuery delegate for element lookup, scoped to DOM elements within the
  // current view. This should be preferred to global lookups where possible.
  $: function(selector) {
    return this.$el.find(selector);
  },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
  initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
  render: function() {
    return this;
  },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
  remove: function() {
    this._removeElement();
    this.stopListening();
    return this;
  },

    // Remove this view's element from the document and all event listeners
    // attached to it. Exposed for subclasses using an alternative DOM
    // manipulation API.
  _removeElement: function() {
    this.$el.remove();
  },

    // Change the view's element (`this.el` property) and re-delegate the
    // view's events on the new element.
  setElement: function(element) {
    this.undelegateEvents();
    this._setElement(element);
    this.delegateEvents();
    return this;
  },

    // Creates the `this.el` and `this.$el` references for this view using the
    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
    // context or an element. Subclasses can override this to utilize an
    // alternative DOM manipulation API and are only required to set the
    // `this.el` property.
  _setElement: function(el) {
    this.$el = el instanceof $ ? el : $(el);
    this.el = this.$el[0];
  },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
  delegateEvents: function(events) {
    if (!(events || (events = _.result(this, 'events')))) return this;
    this.undelegateEvents();
    for (var key in events) {
      var method = events[key];
      if (!_.isFunction(method)) method = this[events[key]];
      if (!method) continue;
      var match = key.match(delegateEventSplitter);
      this.delegate(match[1], match[2], _.bind(method, this));
    }
    return this;
  },

    // Add a single event listener to the view's element (or a child element
    // using `selector`). This only works for delegate-able events: not `focus`,
    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
  delegate: function(eventName, selector, listener) {
    this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
  },

    // Clears all callbacks previously bound to the view by `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
  undelegateEvents: function() {
    if (this.$el) this.$el.off('.delegateEvents' + this.cid);
    return this;
  },

    // A finer-grained `undelegateEvents` for removing a single delegated event.
    // `selector` and `listener` are both optional.
  undelegate: function(eventName, selector, listener) {
    this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
  },

    // Produces a DOM element to be assigned to your view. Exposed for
    // subclasses using an alternative DOM manipulation API.
  _createElement: function(tagName) {
    return document.createElement(tagName);
  },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
  _ensureElement: function() {
    if (!this.el) {
      var attrs = _.extend({}, _.result(this, 'attributes'));
      if (this.id) attrs.id = _.result(this, 'id');
      if (this.className) attrs['class'] = _.result(this, 'className');
      this.setElement(this._createElement(_.result(this, 'tagName')));
      this._setAttributes(attrs);
    } else {
      this.setElement(_.result(this, 'el'));
    }
  },

    // Set attributes from a hash on this view's element.  Exposed for
    // subclasses using an alternative DOM manipulation API.
  _setAttributes: function(attributes) {
    this.$el.attr(attributes);
  }

});

// setup inheritance
View.extend = extend;
module.exports = View;

},{"backbone-events-standalone":11,"backbone-extend-standalone":12,"jbone":67,"underscore":91}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./backbone-events-standalone":10,"dup":7}],12:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],13:[function(require,module,exports){
var events = require("backbone-events-standalone");

events.onAll = function(callback,context){
  this.on("all", callback,context);
  return this;
};

// Mixin utility
events.oldMixin = events.mixin;
events.mixin = function(proto) {
  events.oldMixin(proto);
  // add custom onAll
  var exports = ['onAll'];
  for(var i=0; i < exports.length;i++){
    var name = exports[i];
    proto[name] = this[name];
  }
  return proto;
};

module.exports = events;

},{"backbone-events-standalone":15}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./backbone-events-standalone":14,"dup":7}],16:[function(require,module,exports){
var GenericReader;

var xhr = require('request');
var vow = require('vow');

module.exports = GenericReader = (function() {
  function GenericReader() {}

  // returns a promise if callback is undefined
  GenericReader.read = function(url, callback) {
    var onret;
    onret = (function(_this) {
      return function(err, response, text) {
        return GenericReader._onRetrieval(err, text, callback, _this);
      };
    })(this);

    if(typeof callback === "undefined"){
      var prom = vow.defer();
      callback = function(err, res){
        if(err){
          prom.reject(err);
        }else{
          prom.resolve(res);
        }
      };
      xhr(url, onret);
      return prom.promise();
    }else{
      return xhr(url, onret);
    }
  };

  GenericReader._onRetrieval = function(err, text, callback, _this) {
    var rText;
    if(typeof err !== "undefined"){
      rText = _this.parse(text);
    }
    return callback.call(_this, err, rText);
  };

  // provide a convenient shortcut to inherit
  GenericReader.extend = function(obj, statics){
    return extend(GenericReader, obj, statics);
  };
  // Mixin utility
  GenericReader.mixin = function(proto) {
    var exports = ['read'];
    if(typeof proto !== "object"){
      proto = proto.prototype;
    }
    exports.forEach(function(name) {
      proto[name] = GenericReader[name];
    }, this);
    return proto;
  };

  return GenericReader;

})();

},{"request":18,"vow":17}],17:[function(require,module,exports){
(function (process){
/**
 * @module vow
 * @author Filatov Dmitry <dfilatov@yandex-team.ru>
 * @version 0.4.9
 * @license
 * Dual licensed under the MIT and GPL licenses:
 *   * http://www.opensource.org/licenses/mit-license.php
 *   * http://www.gnu.org/licenses/gpl.html
 */

(function(global) {

var undef,
    nextTick = (function() {
        var fns = [],
            enqueueFn = function(fn) {
                return fns.push(fn) === 1;
            },
            callFns = function() {
                var fnsToCall = fns, i = 0, len = fns.length;
                fns = [];
                while(i < len) {
                    fnsToCall[i++]();
                }
            };

        if(typeof setImmediate === 'function') { // ie10, nodejs >= 0.10
            return function(fn) {
                enqueueFn(fn) && setImmediate(callFns);
            };
        }

        if(typeof process === 'object' && process.nextTick) { // nodejs < 0.10
            return function(fn) {
                enqueueFn(fn) && process.nextTick(callFns);
            };
        }

        if(global.postMessage) { // modern browsers
            var isPostMessageAsync = true;
            if(global.attachEvent) {
                var checkAsync = function() {
                        isPostMessageAsync = false;
                    };
                global.attachEvent('onmessage', checkAsync);
                global.postMessage('__checkAsync', '*');
                global.detachEvent('onmessage', checkAsync);
            }

            if(isPostMessageAsync) {
                var msg = '__promise' + +new Date,
                    onMessage = function(e) {
                        if(e.data === msg) {
                            e.stopPropagation && e.stopPropagation();
                            callFns();
                        }
                    };

                global.addEventListener?
                    global.addEventListener('message', onMessage, true) :
                    global.attachEvent('onmessage', onMessage);

                return function(fn) {
                    enqueueFn(fn) && global.postMessage(msg, '*');
                };
            }
        }

        var doc = global.document;
        if('onreadystatechange' in doc.createElement('script')) { // ie6-ie8
            var createScript = function() {
                    var script = doc.createElement('script');
                    script.onreadystatechange = function() {
                        script.parentNode.removeChild(script);
                        script = script.onreadystatechange = null;
                        callFns();
                };
                (doc.documentElement || doc.body).appendChild(script);
            };

            return function(fn) {
                enqueueFn(fn) && createScript();
            };
        }

        return function(fn) { // old browsers
            enqueueFn(fn) && setTimeout(callFns, 0);
        };
    })(),
    throwException = function(e) {
        nextTick(function() {
            throw e;
        });
    },
    isFunction = function(obj) {
        return typeof obj === 'function';
    },
    isObject = function(obj) {
        return obj !== null && typeof obj === 'object';
    },
    toStr = Object.prototype.toString,
    isArray = Array.isArray || function(obj) {
        return toStr.call(obj) === '[object Array]';
    },
    getArrayKeys = function(arr) {
        var res = [],
            i = 0, len = arr.length;
        while(i < len) {
            res.push(i++);
        }
        return res;
    },
    getObjectKeys = Object.keys || function(obj) {
        var res = [];
        for(var i in obj) {
            obj.hasOwnProperty(i) && res.push(i);
        }
        return res;
    },
    defineCustomErrorType = function(name) {
        var res = function(message) {
            this.name = name;
            this.message = message;
        };

        res.prototype = new Error();

        return res;
    },
    wrapOnFulfilled = function(onFulfilled, idx) {
        return function(val) {
            onFulfilled.call(this, val, idx);
        };
    };

/**
 * @class Deferred
 * @exports vow:Deferred
 * @description
 * The `Deferred` class is used to encapsulate newly-created promise object along with functions that resolve, reject or notify it.
 */

/**
 * @constructor
 * @description
 * You can use `vow.defer()` instead of using this constructor.
 *
 * `new vow.Deferred()` gives the same result as `vow.defer()`.
 */
var Deferred = function() {
    this._promise = new Promise();
};

Deferred.prototype = /** @lends Deferred.prototype */{
    /**
     * Returns corresponding promise.
     *
     * @returns {vow:Promise}
     */
    promise : function() {
        return this._promise;
    },

    /**
     * Resolves corresponding promise with given `value`.
     *
     * @param {*} value
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promise = defer.promise();
     *
     * promise.then(function(value) {
     *     // value is "'success'" here
     * });
     *
     * defer.resolve('success');
     * ```
     */
    resolve : function(value) {
        this._promise.isResolved() || this._promise._resolve(value);
    },

    /**
     * Rejects corresponding promise with given `reason`.
     *
     * @param {*} reason
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promise = defer.promise();
     *
     * promise.fail(function(reason) {
     *     // reason is "'something is wrong'" here
     * });
     *
     * defer.reject('something is wrong');
     * ```
     */
    reject : function(reason) {
        if(this._promise.isResolved()) {
            return;
        }

        if(vow.isPromise(reason)) {
            reason = reason.then(function(val) {
                var defer = vow.defer();
                defer.reject(val);
                return defer.promise();
            });
            this._promise._resolve(reason);
        }
        else {
            this._promise._reject(reason);
        }
    },

    /**
     * Notifies corresponding promise with given `value`.
     *
     * @param {*} value
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promise = defer.promise();
     *
     * promise.progress(function(value) {
     *     // value is "'20%'", "'40%'" here
     * });
     *
     * defer.notify('20%');
     * defer.notify('40%');
     * ```
     */
    notify : function(value) {
        this._promise.isResolved() || this._promise._notify(value);
    }
};

var PROMISE_STATUS = {
    PENDING   : 0,
    RESOLVED  : 1,
    FULFILLED : 2,
    REJECTED  : 3
};

/**
 * @class Promise
 * @exports vow:Promise
 * @description
 * The `Promise` class is used when you want to give to the caller something to subscribe to,
 * but not the ability to resolve or reject the deferred.
 */

/**
 * @constructor
 * @param {Function} resolver See https://github.com/domenic/promises-unwrapping/blob/master/README.md#the-promise-constructor for details.
 * @description
 * You should use this constructor directly only if you are going to use `vow` as DOM Promises implementation.
 * In other case you should use `vow.defer()` and `defer.promise()` methods.
 * @example
 * ```js
 * function fetchJSON(url) {
 *     return new vow.Promise(function(resolve, reject, notify) {
 *         var xhr = new XMLHttpRequest();
 *         xhr.open('GET', url);
 *         xhr.responseType = 'json';
 *         xhr.send();
 *         xhr.onload = function() {
 *             if(xhr.response) {
 *                 resolve(xhr.response);
 *             }
 *             else {
 *                 reject(new TypeError());
 *             }
 *         };
 *     });
 * }
 * ```
 */
var Promise = function(resolver) {
    this._value = undef;
    this._status = PROMISE_STATUS.PENDING;

    this._fulfilledCallbacks = [];
    this._rejectedCallbacks = [];
    this._progressCallbacks = [];

    if(resolver) { // NOTE: see https://github.com/domenic/promises-unwrapping/blob/master/README.md
        var _this = this,
            resolverFnLen = resolver.length;

        resolver(
            function(val) {
                _this.isResolved() || _this._resolve(val);
            },
            resolverFnLen > 1?
                function(reason) {
                    _this.isResolved() || _this._reject(reason);
                } :
                undef,
            resolverFnLen > 2?
                function(val) {
                    _this.isResolved() || _this._notify(val);
                } :
                undef);
    }
};

Promise.prototype = /** @lends Promise.prototype */ {
    /**
     * Returns value of fulfilled promise or reason in case of rejection.
     *
     * @returns {*}
     */
    valueOf : function() {
        return this._value;
    },

    /**
     * Returns `true` if promise is resolved.
     *
     * @returns {Boolean}
     */
    isResolved : function() {
        return this._status !== PROMISE_STATUS.PENDING;
    },

    /**
     * Returns `true` if promise is fulfilled.
     *
     * @returns {Boolean}
     */
    isFulfilled : function() {
        return this._status === PROMISE_STATUS.FULFILLED;
    },

    /**
     * Returns `true` if promise is rejected.
     *
     * @returns {Boolean}
     */
    isRejected : function() {
        return this._status === PROMISE_STATUS.REJECTED;
    },

    /**
     * Adds reactions to promise.
     *
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise} A new promise, see https://github.com/promises-aplus/promises-spec for details
     */
    then : function(onFulfilled, onRejected, onProgress, ctx) {
        var defer = new Deferred();
        this._addCallbacks(defer, onFulfilled, onRejected, onProgress, ctx);
        return defer.promise();
    },

    /**
     * Adds rejection reaction only. It is shortcut for `promise.then(undefined, onRejected)`.
     *
     * @param {Function} onRejected Callback to be called with the value after promise has been rejected
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    'catch' : function(onRejected, ctx) {
        return this.then(undef, onRejected, ctx);
    },

    /**
     * Adds rejection reaction only. It is shortcut for `promise.then(null, onRejected)`. It's alias for `catch`.
     *
     * @param {Function} onRejected Callback to be called with the value after promise has been rejected
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    fail : function(onRejected, ctx) {
        return this.then(undef, onRejected, ctx);
    },

    /**
     * Adds resolving reaction (to fulfillment and rejection both).
     *
     * @param {Function} onResolved Callback that to be called with the value after promise has been resolved
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    always : function(onResolved, ctx) {
        var _this = this,
            cb = function() {
                return onResolved.call(this, _this);
            };

        return this.then(cb, cb, ctx);
    },

    /**
     * Adds progress reaction.
     *
     * @param {Function} onProgress Callback to be called with the value when promise has been notified
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    progress : function(onProgress, ctx) {
        return this.then(undef, undef, onProgress, ctx);
    },

    /**
     * Like `promise.then`, but "spreads" the array into a variadic value handler.
     * It is useful with `vow.all` and `vow.allResolved` methods.
     *
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.all([defer1.promise(), defer2.promise()]).spread(function(arg1, arg2) {
     *     // arg1 is "1", arg2 is "'two'" here
     * });
     *
     * defer1.resolve(1);
     * defer2.resolve('two');
     * ```
     */
    spread : function(onFulfilled, onRejected, ctx) {
        return this.then(
            function(val) {
                return onFulfilled.apply(this, val);
            },
            onRejected,
            ctx);
    },

    /**
     * Like `then`, but terminates a chain of promises.
     * If the promise has been rejected, throws it as an exception in a future turn of the event loop.
     *
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     *
     * @example
     * ```js
     * var defer = vow.defer();
     * defer.reject(Error('Internal error'));
     * defer.promise().done(); // exception to be thrown
     * ```
     */
    done : function(onFulfilled, onRejected, onProgress, ctx) {
        this
            .then(onFulfilled, onRejected, onProgress, ctx)
            .fail(throwException);
    },

    /**
     * Returns a new promise that will be fulfilled in `delay` milliseconds if the promise is fulfilled,
     * or immediately rejected if promise is rejected.
     *
     * @param {Number} delay
     * @returns {vow:Promise}
     */
    delay : function(delay) {
        var timer,
            promise = this.then(function(val) {
                var defer = new Deferred();
                timer = setTimeout(
                    function() {
                        defer.resolve(val);
                    },
                    delay);

                return defer.promise();
            });

        promise.always(function() {
            clearTimeout(timer);
        });

        return promise;
    },

    /**
     * Returns a new promise that will be rejected in `timeout` milliseconds
     * if the promise is not resolved beforehand.
     *
     * @param {Number} timeout
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promiseWithTimeout1 = defer.promise().timeout(50),
     *     promiseWithTimeout2 = defer.promise().timeout(200);
     *
     * setTimeout(
     *     function() {
     *         defer.resolve('ok');
     *     },
     *     100);
     *
     * promiseWithTimeout1.fail(function(reason) {
     *     // promiseWithTimeout to be rejected in 50ms
     * });
     *
     * promiseWithTimeout2.then(function(value) {
     *     // promiseWithTimeout to be fulfilled with "'ok'" value
     * });
     * ```
     */
    timeout : function(timeout) {
        var defer = new Deferred(),
            timer = setTimeout(
                function() {
                    defer.reject(new vow.TimedOutError('timed out'));
                },
                timeout);

        this.then(
            function(val) {
                defer.resolve(val);
            },
            function(reason) {
                defer.reject(reason);
            });

        defer.promise().always(function() {
            clearTimeout(timer);
        });

        return defer.promise();
    },

    _vow : true,

    _resolve : function(val) {
        if(this._status > PROMISE_STATUS.RESOLVED) {
            return;
        }

        if(val === this) {
            this._reject(TypeError('Can\'t resolve promise with itself'));
            return;
        }

        this._status = PROMISE_STATUS.RESOLVED;

        if(val && !!val._vow) { // shortpath for vow.Promise
            val.isFulfilled()?
                this._fulfill(val.valueOf()) :
                val.isRejected()?
                    this._reject(val.valueOf()) :
                    val.then(
                        this._fulfill,
                        this._reject,
                        this._notify,
                        this);
            return;
        }

        if(isObject(val) || isFunction(val)) {
            var then;
            try {
                then = val.then;
            }
            catch(e) {
                this._reject(e);
                return;
            }

            if(isFunction(then)) {
                var _this = this,
                    isResolved = false;

                try {
                    then.call(
                        val,
                        function(val) {
                            if(isResolved) {
                                return;
                            }

                            isResolved = true;
                            _this._resolve(val);
                        },
                        function(err) {
                            if(isResolved) {
                                return;
                            }

                            isResolved = true;
                            _this._reject(err);
                        },
                        function(val) {
                            _this._notify(val);
                        });
                }
                catch(e) {
                    isResolved || this._reject(e);
                }

                return;
            }
        }

        this._fulfill(val);
    },

    _fulfill : function(val) {
        if(this._status > PROMISE_STATUS.RESOLVED) {
            return;
        }

        this._status = PROMISE_STATUS.FULFILLED;
        this._value = val;

        this._callCallbacks(this._fulfilledCallbacks, val);
        this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = undef;
    },

    _reject : function(reason) {
        if(this._status > PROMISE_STATUS.RESOLVED) {
            return;
        }

        this._status = PROMISE_STATUS.REJECTED;
        this._value = reason;

        this._callCallbacks(this._rejectedCallbacks, reason);
        this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = undef;
    },

    _notify : function(val) {
        this._callCallbacks(this._progressCallbacks, val);
    },

    _addCallbacks : function(defer, onFulfilled, onRejected, onProgress, ctx) {
        if(onRejected && !isFunction(onRejected)) {
            ctx = onRejected;
            onRejected = undef;
        }
        else if(onProgress && !isFunction(onProgress)) {
            ctx = onProgress;
            onProgress = undef;
        }

        var cb;

        if(!this.isRejected()) {
            cb = { defer : defer, fn : isFunction(onFulfilled)? onFulfilled : undef, ctx : ctx };
            this.isFulfilled()?
                this._callCallbacks([cb], this._value) :
                this._fulfilledCallbacks.push(cb);
        }

        if(!this.isFulfilled()) {
            cb = { defer : defer, fn : onRejected, ctx : ctx };
            this.isRejected()?
                this._callCallbacks([cb], this._value) :
                this._rejectedCallbacks.push(cb);
        }

        if(this._status <= PROMISE_STATUS.RESOLVED) {
            this._progressCallbacks.push({ defer : defer, fn : onProgress, ctx : ctx });
        }
    },

    _callCallbacks : function(callbacks, arg) {
        var len = callbacks.length;
        if(!len) {
            return;
        }

        var isResolved = this.isResolved(),
            isFulfilled = this.isFulfilled();

        nextTick(function() {
            var i = 0, cb, defer, fn;
            while(i < len) {
                cb = callbacks[i++];
                defer = cb.defer;
                fn = cb.fn;

                if(fn) {
                    var ctx = cb.ctx,
                        res;
                    try {
                        res = ctx? fn.call(ctx, arg) : fn(arg);
                    }
                    catch(e) {
                        defer.reject(e);
                        continue;
                    }

                    isResolved?
                        defer.resolve(res) :
                        defer.notify(res);
                }
                else {
                    isResolved?
                        isFulfilled?
                            defer.resolve(arg) :
                            defer.reject(arg) :
                        defer.notify(arg);
                }
            }
        });
    }
};

/** @lends Promise */
var staticMethods = {
    /**
     * Coerces given `value` to a promise, or returns the `value` if it's already a promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    cast : function(value) {
        return vow.cast(value);
    },

    /**
     * Returns a promise to be fulfilled only after all the items in `iterable` are fulfilled,
     * or to be rejected when any of the `iterable` is rejected.
     *
     * @param {Array|Object} iterable
     * @returns {vow:Promise}
     */
    all : function(iterable) {
        return vow.all(iterable);
    },

    /**
     * Returns a promise to be fulfilled only when any of the items in `iterable` are fulfilled,
     * or to be rejected when the first item is rejected.
     *
     * @param {Array} iterable
     * @returns {vow:Promise}
     */
    race : function(iterable) {
        return vow.anyResolved(iterable);
    },

    /**
     * Returns a promise that has already been resolved with the given `value`.
     * If `value` is a promise, returned promise will be adopted with the state of given promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    resolve : function(value) {
        return vow.resolve(value);
    },

    /**
     * Returns a promise that has already been rejected with the given `reason`.
     *
     * @param {*} reason
     * @returns {vow:Promise}
     */
    reject : function(reason) {
        return vow.reject(reason);
    }
};

for(var prop in staticMethods) {
    staticMethods.hasOwnProperty(prop) &&
        (Promise[prop] = staticMethods[prop]);
}

var vow = /** @exports vow */ {
    Deferred : Deferred,

    Promise : Promise,

    /**
     * Creates a new deferred. This method is a factory method for `vow:Deferred` class.
     * It's equivalent to `new vow.Deferred()`.
     *
     * @returns {vow:Deferred}
     */
    defer : function() {
        return new Deferred();
    },

    /**
     * Static equivalent to `promise.then`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise}
     */
    when : function(value, onFulfilled, onRejected, onProgress, ctx) {
        return vow.cast(value).then(onFulfilled, onRejected, onProgress, ctx);
    },

    /**
     * Static equivalent to `promise.fail`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} onRejected Callback that will to be invoked with the reason after promise has been rejected
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    fail : function(value, onRejected, ctx) {
        return vow.when(value, undef, onRejected, ctx);
    },

    /**
     * Static equivalent to `promise.always`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} onResolved Callback that will to be invoked with the reason after promise has been resolved
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    always : function(value, onResolved, ctx) {
        return vow.when(value).always(onResolved, ctx);
    },

    /**
     * Static equivalent to `promise.progress`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} onProgress Callback that will to be invoked with the reason after promise has been notified
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    progress : function(value, onProgress, ctx) {
        return vow.when(value).progress(onProgress, ctx);
    },

    /**
     * Static equivalent to `promise.spread`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise}
     */
    spread : function(value, onFulfilled, onRejected, ctx) {
        return vow.when(value).spread(onFulfilled, onRejected, ctx);
    },

    /**
     * Static equivalent to `promise.done`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     */
    done : function(value, onFulfilled, onRejected, onProgress, ctx) {
        vow.when(value).done(onFulfilled, onRejected, onProgress, ctx);
    },

    /**
     * Checks whether the given `value` is a promise-like object
     *
     * @param {*} value
     * @returns {Boolean}
     *
     * @example
     * ```js
     * vow.isPromise('something'); // returns false
     * vow.isPromise(vow.defer().promise()); // returns true
     * vow.isPromise({ then : function() { }); // returns true
     * ```
     */
    isPromise : function(value) {
        return isObject(value) && isFunction(value.then);
    },

    /**
     * Coerces given `value` to a promise, or returns the `value` if it's already a promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    cast : function(value) {
        return value && !!value._vow?
            value :
            vow.resolve(value);
    },

    /**
     * Static equivalent to `promise.valueOf`.
     * If given `value` is not an instance of `vow.Promise`, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {*}
     */
    valueOf : function(value) {
        return value && isFunction(value.valueOf)? value.valueOf() : value;
    },

    /**
     * Static equivalent to `promise.isFulfilled`.
     * If given `value` is not an instance of `vow.Promise`, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    isFulfilled : function(value) {
        return value && isFunction(value.isFulfilled)? value.isFulfilled() : true;
    },

    /**
     * Static equivalent to `promise.isRejected`.
     * If given `value` is not an instance of `vow.Promise`, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    isRejected : function(value) {
        return value && isFunction(value.isRejected)? value.isRejected() : false;
    },

    /**
     * Static equivalent to `promise.isResolved`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    isResolved : function(value) {
        return value && isFunction(value.isResolved)? value.isResolved() : true;
    },

    /**
     * Returns a promise that has already been resolved with the given `value`.
     * If `value` is a promise, returned promise will be adopted with the state of given promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    resolve : function(value) {
        var res = vow.defer();
        res.resolve(value);
        return res.promise();
    },

    /**
     * Returns a promise that has already been fulfilled with the given `value`.
     * If `value` is a promise, returned promise will be fulfilled with fulfill/rejection value of given promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    fulfill : function(value) {
        var defer = vow.defer(),
            promise = defer.promise();

        defer.resolve(value);

        return promise.isFulfilled()?
            promise :
            promise.then(null, function(reason) {
                return reason;
            });
    },

    /**
     * Returns a promise that has already been rejected with the given `reason`.
     * If `reason` is a promise, returned promise will be rejected with fulfill/rejection value of given promise.
     *
     * @param {*} reason
     * @returns {vow:Promise}
     */
    reject : function(reason) {
        var defer = vow.defer();
        defer.reject(reason);
        return defer.promise();
    },

    /**
     * Invokes a given function `fn` with arguments `args`
     *
     * @param {Function} fn
     * @param {...*} [args]
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var promise1 = vow.invoke(function(value) {
     *         return value;
     *     }, 'ok'),
     *     promise2 = vow.invoke(function() {
     *         throw Error();
     *     });
     *
     * promise1.isFulfilled(); // true
     * promise1.valueOf(); // 'ok'
     * promise2.isRejected(); // true
     * promise2.valueOf(); // instance of Error
     * ```
     */
    invoke : function(fn, args) {
        var len = Math.max(arguments.length - 1, 0),
            callArgs;
        if(len) { // optimization for V8
            callArgs = Array(len);
            var i = 0;
            while(i < len) {
                callArgs[i++] = arguments[i];
            }
        }

        try {
            return vow.resolve(callArgs?
                fn.apply(global, callArgs) :
                fn.call(global));
        }
        catch(e) {
            return vow.reject(e);
        }
    },

    /**
     * Returns a promise to be fulfilled only after all the items in `iterable` are fulfilled,
     * or to be rejected when any of the `iterable` is rejected.
     *
     * @param {Array|Object} iterable
     * @returns {vow:Promise}
     *
     * @example
     * with array:
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.all([defer1.promise(), defer2.promise(), 3])
     *     .then(function(value) {
     *          // value is "[1, 2, 3]" here
     *     });
     *
     * defer1.resolve(1);
     * defer2.resolve(2);
     * ```
     *
     * @example
     * with object:
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.all({ p1 : defer1.promise(), p2 : defer2.promise(), p3 : 3 })
     *     .then(function(value) {
     *          // value is "{ p1 : 1, p2 : 2, p3 : 3 }" here
     *     });
     *
     * defer1.resolve(1);
     * defer2.resolve(2);
     * ```
     */
    all : function(iterable) {
        var defer = new Deferred(),
            isPromisesArray = isArray(iterable),
            keys = isPromisesArray?
                getArrayKeys(iterable) :
                getObjectKeys(iterable),
            len = keys.length,
            res = isPromisesArray? [] : {};

        if(!len) {
            defer.resolve(res);
            return defer.promise();
        }

        var i = len;
        vow._forEach(
            iterable,
            function(value, idx) {
                res[keys[idx]] = value;
                if(!--i) {
                    defer.resolve(res);
                }
            },
            defer.reject,
            defer.notify,
            defer,
            keys);

        return defer.promise();
    },

    /**
     * Returns a promise to be fulfilled only after all the items in `iterable` are resolved.
     *
     * @param {Array|Object} iterable
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.allResolved([defer1.promise(), defer2.promise()]).spread(function(promise1, promise2) {
     *     promise1.isRejected(); // returns true
     *     promise1.valueOf(); // returns "'error'"
     *     promise2.isFulfilled(); // returns true
     *     promise2.valueOf(); // returns "'ok'"
     * });
     *
     * defer1.reject('error');
     * defer2.resolve('ok');
     * ```
     */
    allResolved : function(iterable) {
        var defer = new Deferred(),
            isPromisesArray = isArray(iterable),
            keys = isPromisesArray?
                getArrayKeys(iterable) :
                getObjectKeys(iterable),
            i = keys.length,
            res = isPromisesArray? [] : {};

        if(!i) {
            defer.resolve(res);
            return defer.promise();
        }

        var onResolved = function() {
                --i || defer.resolve(iterable);
            };

        vow._forEach(
            iterable,
            onResolved,
            onResolved,
            defer.notify,
            defer,
            keys);

        return defer.promise();
    },

    allPatiently : function(iterable) {
        return vow.allResolved(iterable).then(function() {
            var isPromisesArray = isArray(iterable),
                keys = isPromisesArray?
                    getArrayKeys(iterable) :
                    getObjectKeys(iterable),
                rejectedPromises, fulfilledPromises,
                len = keys.length, i = 0, key, promise;

            if(!len) {
                return isPromisesArray? [] : {};
            }

            while(i < len) {
                key = keys[i++];
                promise = iterable[key];
                if(vow.isRejected(promise)) {
                    rejectedPromises || (rejectedPromises = isPromisesArray? [] : {});
                    isPromisesArray?
                        rejectedPromises.push(promise.valueOf()) :
                        rejectedPromises[key] = promise.valueOf();
                }
                else if(!rejectedPromises) {
                    (fulfilledPromises || (fulfilledPromises = isPromisesArray? [] : {}))[key] = vow.valueOf(promise);
                }
            }

            if(rejectedPromises) {
                throw rejectedPromises;
            }

            return fulfilledPromises;
        });
    },

    /**
     * Returns a promise to be fulfilled only when any of the items in `iterable` is fulfilled,
     * or to be rejected when all the items are rejected (with the reason of the first rejected item).
     *
     * @param {Array} iterable
     * @returns {vow:Promise}
     */
    any : function(iterable) {
        var defer = new Deferred(),
            len = iterable.length;

        if(!len) {
            defer.reject(Error());
            return defer.promise();
        }

        var i = 0, reason;
        vow._forEach(
            iterable,
            defer.resolve,
            function(e) {
                i || (reason = e);
                ++i === len && defer.reject(reason);
            },
            defer.notify,
            defer);

        return defer.promise();
    },

    /**
     * Returns a promise to be fulfilled only when any of the items in `iterable` is fulfilled,
     * or to be rejected when the first item is rejected.
     *
     * @param {Array} iterable
     * @returns {vow:Promise}
     */
    anyResolved : function(iterable) {
        var defer = new Deferred(),
            len = iterable.length;

        if(!len) {
            defer.reject(Error());
            return defer.promise();
        }

        vow._forEach(
            iterable,
            defer.resolve,
            defer.reject,
            defer.notify,
            defer);

        return defer.promise();
    },

    /**
     * Static equivalent to `promise.delay`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Number} delay
     * @returns {vow:Promise}
     */
    delay : function(value, delay) {
        return vow.resolve(value).delay(delay);
    },

    /**
     * Static equivalent to `promise.timeout`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Number} timeout
     * @returns {vow:Promise}
     */
    timeout : function(value, timeout) {
        return vow.resolve(value).timeout(timeout);
    },

    _forEach : function(promises, onFulfilled, onRejected, onProgress, ctx, keys) {
        var len = keys? keys.length : promises.length,
            i = 0;

        while(i < len) {
            vow.when(
                promises[keys? keys[i] : i],
                wrapOnFulfilled(onFulfilled, i),
                onRejected,
                onProgress,
                ctx);
            ++i;
        }
    },

    TimedOutError : defineCustomErrorType('TimedOut')
};

var defineAsGlobal = true;
if(typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = vow;
    defineAsGlobal = false;
}

if(typeof modules === 'object' && isFunction(modules.define)) {
    modules.define('vow', function(provide) {
        provide(vow);
    });
    defineAsGlobal = false;
}

if(typeof define === 'function') {
    define(function(require, exports, module) {
        module.exports = vow;
    });
    defineAsGlobal = false;
}

defineAsGlobal && (global.vow = vow);

})(this);

}).call(this,require('_process'))

},{"_process":64}],18:[function(require,module,exports){
"use strict";
var window = require("global/window")
var once = require("once")
var parseHeaders = require("parse-headers")


var XHR = window.XMLHttpRequest || noop
var XDR = "withCredentials" in (new XHR()) ? XHR : window.XDomainRequest

module.exports = createXHR

function createXHR(options, callback) {
    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === "text" || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    var failureResponse = {
                body: undefined,
                headers: {},
                statusCode: 0,
                method: method,
                url: uri,
                rawRequest: xhr
            }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "unknown") )
        }
        evt.statusCode = 0
        callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        clearTimeout(timeoutTimer)

        var status = (xhr.status === 1223 ? 204 : xhr.status)
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        callback(err, response, response.body)

    }

    if (typeof options === "string") {
        options = { uri: options }
    }

    options = options || {}
    if(typeof callback === "undefined"){
        throw new Error("callback argument missing")
    }
    callback = once(callback)

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new XDR()
        }else{
            xhr = new XHR()
        }
    }

    var key
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer

    if ("json" in options) {
        isJson = true
        headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync)
    //has to be after open
    xhr.withCredentials = !!options.withCredentials

    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            xhr.abort("timeout");
        }, options.timeout+2 );
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}


function noop() {}

},{"global/window":19,"once":20,"parse-headers":24}],19:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}],21:[function(require,module,exports){
var isFunction = require('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }

    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":22}],22:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],23:[function(require,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],24:[function(require,module,exports){
var trim = require('trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":21,"trim":23}],25:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"dup":16,"request":27,"vow":26}],26:[function(require,module,exports){
(function (process){
/**
 * @module vow
 * @author Filatov Dmitry <dfilatov@yandex-team.ru>
 * @version 0.4.9
 * @license
 * Dual licensed under the MIT and GPL licenses:
 *   * http://www.opensource.org/licenses/mit-license.php
 *   * http://www.gnu.org/licenses/gpl.html
 */

(function(global) {

var undef,
    nextTick = (function() {
        var fns = [],
            enqueueFn = function(fn) {
                return fns.push(fn) === 1;
            },
            callFns = function() {
                var fnsToCall = fns, i = 0, len = fns.length;
                fns = [];
                while(i < len) {
                    fnsToCall[i++]();
                }
            };

        if(typeof setImmediate === 'function') { // ie10, nodejs >= 0.10
            return function(fn) {
                enqueueFn(fn) && setImmediate(callFns);
            };
        }

        if(typeof process === 'object' && process.nextTick) { // nodejs < 0.10
            return function(fn) {
                enqueueFn(fn) && process.nextTick(callFns);
            };
        }

        if(global.postMessage) { // modern browsers
            var isPostMessageAsync = true;
            if(global.attachEvent) {
                var checkAsync = function() {
                        isPostMessageAsync = false;
                    };
                global.attachEvent('onmessage', checkAsync);
                global.postMessage('__checkAsync', '*');
                global.detachEvent('onmessage', checkAsync);
            }

            if(isPostMessageAsync) {
                var msg = '__promise' + +new Date,
                    onMessage = function(e) {
                        if(e.data === msg) {
                            e.stopPropagation && e.stopPropagation();
                            callFns();
                        }
                    };

                global.addEventListener?
                    global.addEventListener('message', onMessage, true) :
                    global.attachEvent('onmessage', onMessage);

                return function(fn) {
                    enqueueFn(fn) && global.postMessage(msg, '*');
                };
            }
        }

        var doc = global.document;
        if('onreadystatechange' in doc.createElement('script')) { // ie6-ie8
            var createScript = function() {
                    var script = doc.createElement('script');
                    script.onreadystatechange = function() {
                        script.parentNode.removeChild(script);
                        script = script.onreadystatechange = null;
                        callFns();
                };
                (doc.documentElement || doc.body).appendChild(script);
            };

            return function(fn) {
                enqueueFn(fn) && createScript();
            };
        }

        return function(fn) { // old browsers
            enqueueFn(fn) && setTimeout(callFns, 0);
        };
    })(),
    throwException = function(e) {
        nextTick(function() {
            throw e;
        });
    },
    isFunction = function(obj) {
        return typeof obj === 'function';
    },
    isObject = function(obj) {
        return obj !== null && typeof obj === 'object';
    },
    toStr = Object.prototype.toString,
    isArray = Array.isArray || function(obj) {
        return toStr.call(obj) === '[object Array]';
    },
    getArrayKeys = function(arr) {
        var res = [],
            i = 0, len = arr.length;
        while(i < len) {
            res.push(i++);
        }
        return res;
    },
    getObjectKeys = Object.keys || function(obj) {
        var res = [];
        for(var i in obj) {
            obj.hasOwnProperty(i) && res.push(i);
        }
        return res;
    },
    defineCustomErrorType = function(name) {
        var res = function(message) {
            this.name = name;
            this.message = message;
        };

        res.prototype = new Error();

        return res;
    },
    wrapOnFulfilled = function(onFulfilled, idx) {
        return function(val) {
            onFulfilled.call(this, val, idx);
        };
    };

/**
 * @class Deferred
 * @exports vow:Deferred
 * @description
 * The `Deferred` class is used to encapsulate newly-created promise object along with functions that resolve, reject or notify it.
 */

/**
 * @constructor
 * @description
 * You can use `vow.defer()` instead of using this constructor.
 *
 * `new vow.Deferred()` gives the same result as `vow.defer()`.
 */
var Deferred = function() {
    this._promise = new Promise();
};

Deferred.prototype = /** @lends Deferred.prototype */{
    /**
     * Returns corresponding promise.
     *
     * @returns {vow:Promise}
     */
    promise : function() {
        return this._promise;
    },

    /**
     * Resolves corresponding promise with given `value`.
     *
     * @param {*} value
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promise = defer.promise();
     *
     * promise.then(function(value) {
     *     // value is "'success'" here
     * });
     *
     * defer.resolve('success');
     * ```
     */
    resolve : function(value) {
        this._promise.isResolved() || this._promise._resolve(value);
    },

    /**
     * Rejects corresponding promise with given `reason`.
     *
     * @param {*} reason
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promise = defer.promise();
     *
     * promise.fail(function(reason) {
     *     // reason is "'something is wrong'" here
     * });
     *
     * defer.reject('something is wrong');
     * ```
     */
    reject : function(reason) {
        if(this._promise.isResolved()) {
            return;
        }

        if(vow.isPromise(reason)) {
            reason = reason.then(function(val) {
                var defer = vow.defer();
                defer.reject(val);
                return defer.promise();
            });
            this._promise._resolve(reason);
        }
        else {
            this._promise._reject(reason);
        }
    },

    /**
     * Notifies corresponding promise with given `value`.
     *
     * @param {*} value
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promise = defer.promise();
     *
     * promise.progress(function(value) {
     *     // value is "'20%'", "'40%'" here
     * });
     *
     * defer.notify('20%');
     * defer.notify('40%');
     * ```
     */
    notify : function(value) {
        this._promise.isResolved() || this._promise._notify(value);
    }
};

var PROMISE_STATUS = {
    PENDING   : 0,
    RESOLVED  : 1,
    FULFILLED : 2,
    REJECTED  : 3
};

/**
 * @class Promise
 * @exports vow:Promise
 * @description
 * The `Promise` class is used when you want to give to the caller something to subscribe to,
 * but not the ability to resolve or reject the deferred.
 */

/**
 * @constructor
 * @param {Function} resolver See https://github.com/domenic/promises-unwrapping/blob/master/README.md#the-promise-constructor for details.
 * @description
 * You should use this constructor directly only if you are going to use `vow` as DOM Promises implementation.
 * In other case you should use `vow.defer()` and `defer.promise()` methods.
 * @example
 * ```js
 * function fetchJSON(url) {
 *     return new vow.Promise(function(resolve, reject, notify) {
 *         var xhr = new XMLHttpRequest();
 *         xhr.open('GET', url);
 *         xhr.responseType = 'json';
 *         xhr.send();
 *         xhr.onload = function() {
 *             if(xhr.response) {
 *                 resolve(xhr.response);
 *             }
 *             else {
 *                 reject(new TypeError());
 *             }
 *         };
 *     });
 * }
 * ```
 */
var Promise = function(resolver) {
    this._value = undef;
    this._status = PROMISE_STATUS.PENDING;

    this._fulfilledCallbacks = [];
    this._rejectedCallbacks = [];
    this._progressCallbacks = [];

    if(resolver) { // NOTE: see https://github.com/domenic/promises-unwrapping/blob/master/README.md
        var _this = this,
            resolverFnLen = resolver.length;

        resolver(
            function(val) {
                _this.isResolved() || _this._resolve(val);
            },
            resolverFnLen > 1?
                function(reason) {
                    _this.isResolved() || _this._reject(reason);
                } :
                undef,
            resolverFnLen > 2?
                function(val) {
                    _this.isResolved() || _this._notify(val);
                } :
                undef);
    }
};

Promise.prototype = /** @lends Promise.prototype */ {
    /**
     * Returns value of fulfilled promise or reason in case of rejection.
     *
     * @returns {*}
     */
    valueOf : function() {
        return this._value;
    },

    /**
     * Returns `true` if promise is resolved.
     *
     * @returns {Boolean}
     */
    isResolved : function() {
        return this._status !== PROMISE_STATUS.PENDING;
    },

    /**
     * Returns `true` if promise is fulfilled.
     *
     * @returns {Boolean}
     */
    isFulfilled : function() {
        return this._status === PROMISE_STATUS.FULFILLED;
    },

    /**
     * Returns `true` if promise is rejected.
     *
     * @returns {Boolean}
     */
    isRejected : function() {
        return this._status === PROMISE_STATUS.REJECTED;
    },

    /**
     * Adds reactions to promise.
     *
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise} A new promise, see https://github.com/promises-aplus/promises-spec for details
     */
    then : function(onFulfilled, onRejected, onProgress, ctx) {
        var defer = new Deferred();
        this._addCallbacks(defer, onFulfilled, onRejected, onProgress, ctx);
        return defer.promise();
    },

    /**
     * Adds rejection reaction only. It is shortcut for `promise.then(undefined, onRejected)`.
     *
     * @param {Function} onRejected Callback to be called with the value after promise has been rejected
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    'catch' : function(onRejected, ctx) {
        return this.then(undef, onRejected, ctx);
    },

    /**
     * Adds rejection reaction only. It is shortcut for `promise.then(null, onRejected)`. It's alias for `catch`.
     *
     * @param {Function} onRejected Callback to be called with the value after promise has been rejected
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    fail : function(onRejected, ctx) {
        return this.then(undef, onRejected, ctx);
    },

    /**
     * Adds resolving reaction (to fulfillment and rejection both).
     *
     * @param {Function} onResolved Callback that to be called with the value after promise has been resolved
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    always : function(onResolved, ctx) {
        var _this = this,
            cb = function() {
                return onResolved.call(this, _this);
            };

        return this.then(cb, cb, ctx);
    },

    /**
     * Adds progress reaction.
     *
     * @param {Function} onProgress Callback to be called with the value when promise has been notified
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    progress : function(onProgress, ctx) {
        return this.then(undef, undef, onProgress, ctx);
    },

    /**
     * Like `promise.then`, but "spreads" the array into a variadic value handler.
     * It is useful with `vow.all` and `vow.allResolved` methods.
     *
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.all([defer1.promise(), defer2.promise()]).spread(function(arg1, arg2) {
     *     // arg1 is "1", arg2 is "'two'" here
     * });
     *
     * defer1.resolve(1);
     * defer2.resolve('two');
     * ```
     */
    spread : function(onFulfilled, onRejected, ctx) {
        return this.then(
            function(val) {
                return onFulfilled.apply(this, val);
            },
            onRejected,
            ctx);
    },

    /**
     * Like `then`, but terminates a chain of promises.
     * If the promise has been rejected, throws it as an exception in a future turn of the event loop.
     *
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     *
     * @example
     * ```js
     * var defer = vow.defer();
     * defer.reject(Error('Internal error'));
     * defer.promise().done(); // exception to be thrown
     * ```
     */
    done : function(onFulfilled, onRejected, onProgress, ctx) {
        this
            .then(onFulfilled, onRejected, onProgress, ctx)
            .fail(throwException);
    },

    /**
     * Returns a new promise that will be fulfilled in `delay` milliseconds if the promise is fulfilled,
     * or immediately rejected if promise is rejected.
     *
     * @param {Number} delay
     * @returns {vow:Promise}
     */
    delay : function(delay) {
        var timer,
            promise = this.then(function(val) {
                var defer = new Deferred();
                timer = setTimeout(
                    function() {
                        defer.resolve(val);
                    },
                    delay);

                return defer.promise();
            });

        promise.always(function() {
            clearTimeout(timer);
        });

        return promise;
    },

    /**
     * Returns a new promise that will be rejected in `timeout` milliseconds
     * if the promise is not resolved beforehand.
     *
     * @param {Number} timeout
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promiseWithTimeout1 = defer.promise().timeout(50),
     *     promiseWithTimeout2 = defer.promise().timeout(200);
     *
     * setTimeout(
     *     function() {
     *         defer.resolve('ok');
     *     },
     *     100);
     *
     * promiseWithTimeout1.fail(function(reason) {
     *     // promiseWithTimeout to be rejected in 50ms
     * });
     *
     * promiseWithTimeout2.then(function(value) {
     *     // promiseWithTimeout to be fulfilled with "'ok'" value
     * });
     * ```
     */
    timeout : function(timeout) {
        var defer = new Deferred(),
            timer = setTimeout(
                function() {
                    defer.reject(new vow.TimedOutError('timed out'));
                },
                timeout);

        this.then(
            function(val) {
                defer.resolve(val);
            },
            function(reason) {
                defer.reject(reason);
            });

        defer.promise().always(function() {
            clearTimeout(timer);
        });

        return defer.promise();
    },

    _vow : true,

    _resolve : function(val) {
        if(this._status > PROMISE_STATUS.RESOLVED) {
            return;
        }

        if(val === this) {
            this._reject(TypeError('Can\'t resolve promise with itself'));
            return;
        }

        this._status = PROMISE_STATUS.RESOLVED;

        if(val && !!val._vow) { // shortpath for vow.Promise
            val.isFulfilled()?
                this._fulfill(val.valueOf()) :
                val.isRejected()?
                    this._reject(val.valueOf()) :
                    val.then(
                        this._fulfill,
                        this._reject,
                        this._notify,
                        this);
            return;
        }

        if(isObject(val) || isFunction(val)) {
            var then;
            try {
                then = val.then;
            }
            catch(e) {
                this._reject(e);
                return;
            }

            if(isFunction(then)) {
                var _this = this,
                    isResolved = false;

                try {
                    then.call(
                        val,
                        function(val) {
                            if(isResolved) {
                                return;
                            }

                            isResolved = true;
                            _this._resolve(val);
                        },
                        function(err) {
                            if(isResolved) {
                                return;
                            }

                            isResolved = true;
                            _this._reject(err);
                        },
                        function(val) {
                            _this._notify(val);
                        });
                }
                catch(e) {
                    isResolved || this._reject(e);
                }

                return;
            }
        }

        this._fulfill(val);
    },

    _fulfill : function(val) {
        if(this._status > PROMISE_STATUS.RESOLVED) {
            return;
        }

        this._status = PROMISE_STATUS.FULFILLED;
        this._value = val;

        this._callCallbacks(this._fulfilledCallbacks, val);
        this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = undef;
    },

    _reject : function(reason) {
        if(this._status > PROMISE_STATUS.RESOLVED) {
            return;
        }

        this._status = PROMISE_STATUS.REJECTED;
        this._value = reason;

        this._callCallbacks(this._rejectedCallbacks, reason);
        this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = undef;
    },

    _notify : function(val) {
        this._callCallbacks(this._progressCallbacks, val);
    },

    _addCallbacks : function(defer, onFulfilled, onRejected, onProgress, ctx) {
        if(onRejected && !isFunction(onRejected)) {
            ctx = onRejected;
            onRejected = undef;
        }
        else if(onProgress && !isFunction(onProgress)) {
            ctx = onProgress;
            onProgress = undef;
        }

        var cb;

        if(!this.isRejected()) {
            cb = { defer : defer, fn : isFunction(onFulfilled)? onFulfilled : undef, ctx : ctx };
            this.isFulfilled()?
                this._callCallbacks([cb], this._value) :
                this._fulfilledCallbacks.push(cb);
        }

        if(!this.isFulfilled()) {
            cb = { defer : defer, fn : onRejected, ctx : ctx };
            this.isRejected()?
                this._callCallbacks([cb], this._value) :
                this._rejectedCallbacks.push(cb);
        }

        if(this._status <= PROMISE_STATUS.RESOLVED) {
            this._progressCallbacks.push({ defer : defer, fn : onProgress, ctx : ctx });
        }
    },

    _callCallbacks : function(callbacks, arg) {
        var len = callbacks.length;
        if(!len) {
            return;
        }

        var isResolved = this.isResolved(),
            isFulfilled = this.isFulfilled();

        nextTick(function() {
            var i = 0, cb, defer, fn;
            while(i < len) {
                cb = callbacks[i++];
                defer = cb.defer;
                fn = cb.fn;

                if(fn) {
                    var ctx = cb.ctx,
                        res;
                    try {
                        res = ctx? fn.call(ctx, arg) : fn(arg);
                    }
                    catch(e) {
                        defer.reject(e);
                        continue;
                    }

                    isResolved?
                        defer.resolve(res) :
                        defer.notify(res);
                }
                else {
                    isResolved?
                        isFulfilled?
                            defer.resolve(arg) :
                            defer.reject(arg) :
                        defer.notify(arg);
                }
            }
        });
    }
};

/** @lends Promise */
var staticMethods = {
    /**
     * Coerces given `value` to a promise, or returns the `value` if it's already a promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    cast : function(value) {
        return vow.cast(value);
    },

    /**
     * Returns a promise to be fulfilled only after all the items in `iterable` are fulfilled,
     * or to be rejected when any of the `iterable` is rejected.
     *
     * @param {Array|Object} iterable
     * @returns {vow:Promise}
     */
    all : function(iterable) {
        return vow.all(iterable);
    },

    /**
     * Returns a promise to be fulfilled only when any of the items in `iterable` are fulfilled,
     * or to be rejected when the first item is rejected.
     *
     * @param {Array} iterable
     * @returns {vow:Promise}
     */
    race : function(iterable) {
        return vow.anyResolved(iterable);
    },

    /**
     * Returns a promise that has already been resolved with the given `value`.
     * If `value` is a promise, returned promise will be adopted with the state of given promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    resolve : function(value) {
        return vow.resolve(value);
    },

    /**
     * Returns a promise that has already been rejected with the given `reason`.
     *
     * @param {*} reason
     * @returns {vow:Promise}
     */
    reject : function(reason) {
        return vow.reject(reason);
    }
};

for(var prop in staticMethods) {
    staticMethods.hasOwnProperty(prop) &&
        (Promise[prop] = staticMethods[prop]);
}

var vow = /** @exports vow */ {
    Deferred : Deferred,

    Promise : Promise,

    /**
     * Creates a new deferred. This method is a factory method for `vow:Deferred` class.
     * It's equivalent to `new vow.Deferred()`.
     *
     * @returns {vow:Deferred}
     */
    defer : function() {
        return new Deferred();
    },

    /**
     * Static equivalent to `promise.then`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise}
     */
    when : function(value, onFulfilled, onRejected, onProgress, ctx) {
        return vow.cast(value).then(onFulfilled, onRejected, onProgress, ctx);
    },

    /**
     * Static equivalent to `promise.fail`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} onRejected Callback that will to be invoked with the reason after promise has been rejected
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    fail : function(value, onRejected, ctx) {
        return vow.when(value, undef, onRejected, ctx);
    },

    /**
     * Static equivalent to `promise.always`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} onResolved Callback that will to be invoked with the reason after promise has been resolved
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    always : function(value, onResolved, ctx) {
        return vow.when(value).always(onResolved, ctx);
    },

    /**
     * Static equivalent to `promise.progress`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} onProgress Callback that will to be invoked with the reason after promise has been notified
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    progress : function(value, onProgress, ctx) {
        return vow.when(value).progress(onProgress, ctx);
    },

    /**
     * Static equivalent to `promise.spread`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise}
     */
    spread : function(value, onFulfilled, onRejected, ctx) {
        return vow.when(value).spread(onFulfilled, onRejected, ctx);
    },

    /**
     * Static equivalent to `promise.done`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     */
    done : function(value, onFulfilled, onRejected, onProgress, ctx) {
        vow.when(value).done(onFulfilled, onRejected, onProgress, ctx);
    },

    /**
     * Checks whether the given `value` is a promise-like object
     *
     * @param {*} value
     * @returns {Boolean}
     *
     * @example
     * ```js
     * vow.isPromise('something'); // returns false
     * vow.isPromise(vow.defer().promise()); // returns true
     * vow.isPromise({ then : function() { }); // returns true
     * ```
     */
    isPromise : function(value) {
        return isObject(value) && isFunction(value.then);
    },

    /**
     * Coerces given `value` to a promise, or returns the `value` if it's already a promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    cast : function(value) {
        return value && !!value._vow?
            value :
            vow.resolve(value);
    },

    /**
     * Static equivalent to `promise.valueOf`.
     * If given `value` is not an instance of `vow.Promise`, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {*}
     */
    valueOf : function(value) {
        return value && isFunction(value.valueOf)? value.valueOf() : value;
    },

    /**
     * Static equivalent to `promise.isFulfilled`.
     * If given `value` is not an instance of `vow.Promise`, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    isFulfilled : function(value) {
        return value && isFunction(value.isFulfilled)? value.isFulfilled() : true;
    },

    /**
     * Static equivalent to `promise.isRejected`.
     * If given `value` is not an instance of `vow.Promise`, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    isRejected : function(value) {
        return value && isFunction(value.isRejected)? value.isRejected() : false;
    },

    /**
     * Static equivalent to `promise.isResolved`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    isResolved : function(value) {
        return value && isFunction(value.isResolved)? value.isResolved() : true;
    },

    /**
     * Returns a promise that has already been resolved with the given `value`.
     * If `value` is a promise, returned promise will be adopted with the state of given promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    resolve : function(value) {
        var res = vow.defer();
        res.resolve(value);
        return res.promise();
    },

    /**
     * Returns a promise that has already been fulfilled with the given `value`.
     * If `value` is a promise, returned promise will be fulfilled with fulfill/rejection value of given promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    fulfill : function(value) {
        var defer = vow.defer(),
            promise = defer.promise();

        defer.resolve(value);

        return promise.isFulfilled()?
            promise :
            promise.then(null, function(reason) {
                return reason;
            });
    },

    /**
     * Returns a promise that has already been rejected with the given `reason`.
     * If `reason` is a promise, returned promise will be rejected with fulfill/rejection value of given promise.
     *
     * @param {*} reason
     * @returns {vow:Promise}
     */
    reject : function(reason) {
        var defer = vow.defer();
        defer.reject(reason);
        return defer.promise();
    },

    /**
     * Invokes a given function `fn` with arguments `args`
     *
     * @param {Function} fn
     * @param {...*} [args]
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var promise1 = vow.invoke(function(value) {
     *         return value;
     *     }, 'ok'),
     *     promise2 = vow.invoke(function() {
     *         throw Error();
     *     });
     *
     * promise1.isFulfilled(); // true
     * promise1.valueOf(); // 'ok'
     * promise2.isRejected(); // true
     * promise2.valueOf(); // instance of Error
     * ```
     */
    invoke : function(fn, args) {
        var len = Math.max(arguments.length - 1, 0),
            callArgs;
        if(len) { // optimization for V8
            callArgs = Array(len);
            var i = 0;
            while(i < len) {
                callArgs[i++] = arguments[i];
            }
        }

        try {
            return vow.resolve(callArgs?
                fn.apply(global, callArgs) :
                fn.call(global));
        }
        catch(e) {
            return vow.reject(e);
        }
    },

    /**
     * Returns a promise to be fulfilled only after all the items in `iterable` are fulfilled,
     * or to be rejected when any of the `iterable` is rejected.
     *
     * @param {Array|Object} iterable
     * @returns {vow:Promise}
     *
     * @example
     * with array:
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.all([defer1.promise(), defer2.promise(), 3])
     *     .then(function(value) {
     *          // value is "[1, 2, 3]" here
     *     });
     *
     * defer1.resolve(1);
     * defer2.resolve(2);
     * ```
     *
     * @example
     * with object:
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.all({ p1 : defer1.promise(), p2 : defer2.promise(), p3 : 3 })
     *     .then(function(value) {
     *          // value is "{ p1 : 1, p2 : 2, p3 : 3 }" here
     *     });
     *
     * defer1.resolve(1);
     * defer2.resolve(2);
     * ```
     */
    all : function(iterable) {
        var defer = new Deferred(),
            isPromisesArray = isArray(iterable),
            keys = isPromisesArray?
                getArrayKeys(iterable) :
                getObjectKeys(iterable),
            len = keys.length,
            res = isPromisesArray? [] : {};

        if(!len) {
            defer.resolve(res);
            return defer.promise();
        }

        var i = len;
        vow._forEach(
            iterable,
            function(value, idx) {
                res[keys[idx]] = value;
                if(!--i) {
                    defer.resolve(res);
                }
            },
            defer.reject,
            defer.notify,
            defer,
            keys);

        return defer.promise();
    },

    /**
     * Returns a promise to be fulfilled only after all the items in `iterable` are resolved.
     *
     * @param {Array|Object} iterable
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.allResolved([defer1.promise(), defer2.promise()]).spread(function(promise1, promise2) {
     *     promise1.isRejected(); // returns true
     *     promise1.valueOf(); // returns "'error'"
     *     promise2.isFulfilled(); // returns true
     *     promise2.valueOf(); // returns "'ok'"
     * });
     *
     * defer1.reject('error');
     * defer2.resolve('ok');
     * ```
     */
    allResolved : function(iterable) {
        var defer = new Deferred(),
            isPromisesArray = isArray(iterable),
            keys = isPromisesArray?
                getArrayKeys(iterable) :
                getObjectKeys(iterable),
            i = keys.length,
            res = isPromisesArray? [] : {};

        if(!i) {
            defer.resolve(res);
            return defer.promise();
        }

        var onResolved = function() {
                --i || defer.resolve(iterable);
            };

        vow._forEach(
            iterable,
            onResolved,
            onResolved,
            defer.notify,
            defer,
            keys);

        return defer.promise();
    },

    allPatiently : function(iterable) {
        return vow.allResolved(iterable).then(function() {
            var isPromisesArray = isArray(iterable),
                keys = isPromisesArray?
                    getArrayKeys(iterable) :
                    getObjectKeys(iterable),
                rejectedPromises, fulfilledPromises,
                len = keys.length, i = 0, key, promise;

            if(!len) {
                return isPromisesArray? [] : {};
            }

            while(i < len) {
                key = keys[i++];
                promise = iterable[key];
                if(vow.isRejected(promise)) {
                    rejectedPromises || (rejectedPromises = isPromisesArray? [] : {});
                    isPromisesArray?
                        rejectedPromises.push(promise.valueOf()) :
                        rejectedPromises[key] = promise.valueOf();
                }
                else if(!rejectedPromises) {
                    (fulfilledPromises || (fulfilledPromises = isPromisesArray? [] : {}))[key] = vow.valueOf(promise);
                }
            }

            if(rejectedPromises) {
                throw rejectedPromises;
            }

            return fulfilledPromises;
        });
    },

    /**
     * Returns a promise to be fulfilled only when any of the items in `iterable` is fulfilled,
     * or to be rejected when all the items are rejected (with the reason of the first rejected item).
     *
     * @param {Array} iterable
     * @returns {vow:Promise}
     */
    any : function(iterable) {
        var defer = new Deferred(),
            len = iterable.length;

        if(!len) {
            defer.reject(Error());
            return defer.promise();
        }

        var i = 0, reason;
        vow._forEach(
            iterable,
            defer.resolve,
            function(e) {
                i || (reason = e);
                ++i === len && defer.reject(reason);
            },
            defer.notify,
            defer);

        return defer.promise();
    },

    /**
     * Returns a promise to be fulfilled only when any of the items in `iterable` is fulfilled,
     * or to be rejected when the first item is rejected.
     *
     * @param {Array} iterable
     * @returns {vow:Promise}
     */
    anyResolved : function(iterable) {
        var defer = new Deferred(),
            len = iterable.length;

        if(!len) {
            defer.reject(Error());
            return defer.promise();
        }

        vow._forEach(
            iterable,
            defer.resolve,
            defer.reject,
            defer.notify,
            defer);

        return defer.promise();
    },

    /**
     * Static equivalent to `promise.delay`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Number} delay
     * @returns {vow:Promise}
     */
    delay : function(value, delay) {
        return vow.resolve(value).delay(delay);
    },

    /**
     * Static equivalent to `promise.timeout`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Number} timeout
     * @returns {vow:Promise}
     */
    timeout : function(value, timeout) {
        return vow.resolve(value).timeout(timeout);
    },

    _forEach : function(promises, onFulfilled, onRejected, onProgress, ctx, keys) {
        var len = keys? keys.length : promises.length,
            i = 0;

        while(i < len) {
            vow.when(
                promises[keys? keys[i] : i],
                wrapOnFulfilled(onFulfilled, i),
                onRejected,
                onProgress,
                ctx);
            ++i;
        }
    },

    TimedOutError : defineCustomErrorType('TimedOut')
};

var defineAsGlobal = true;
if(typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = vow;
    defineAsGlobal = false;
}

if(typeof modules === 'object' && isFunction(modules.define)) {
    modules.define('vow', function(provide) {
        provide(vow);
    });
    defineAsGlobal = false;
}

if(typeof define === 'function') {
    define(function(require, exports, module) {
        module.exports = vow;
    });
    defineAsGlobal = false;
}

defineAsGlobal && (global.vow = vow);

})(this);

}).call(this,require('_process'))

},{"_process":64}],27:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18,"global/window":28,"once":29,"parse-headers":33}],28:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],29:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],30:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21,"is-function":31}],31:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],32:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],33:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24,"for-each":30,"trim":32}],34:[function(require,module,exports){
var jalview = {};
module.exports = jalview;
var utils = require("./utils");

// http://www.jalview.org/help/html/features/featuresFormat.html
jalview.readHeader = function(lines) {
  var colors = {};
  var i = 0;
  var features = [];
  var currentGroup;

  for (; i < lines.length; i++) {
    var line = lines[i];
    if (line.indexOf("#") >= 0) {
      // no comments allowed -> stop
      break;
    }
    var columns = line.split(/\t/);
    var firstCell = columns[0].trim();
    if (firstCell === "GFF") {
      // this symbolizes the end
      break;
    } else if (columns.length === 2) {
      if (firstCell === "startgroup") {
        currentGroup = columns[1].trim();
      } else if (firstCell === "endgroup") {
        currentGroup = "";
        continue;
      } else {
        // parse color
        colors[columns[0]] = jalview.parseColor(columns[1]);
      }
    } else if(columns.length >= 5){
      var arr = jalview.parseLine(columns);
      if (currentGroup) {
        arr.attributes.Parent = currentGroup;
      }
      features.push(arr);
    }
  }

  return {
    offset: i,
    colors: colors,
    features: features
  };
};

jalview.parseColor = function(cell) {
  if (cell.indexOf(",") >= 0) {
    // rgb code
    return utils.rgbToHex(cell.split(",").map(function(el) {
      return parseInt(el);
    }));
  }
  // color names with length == 6
  // 'bisque,maroon,orange,orchid,purple,salmon,sienna,tomato,violet,yellow'
  if (cell.length === 6 && parseInt(cell.charAt(0), 16) <= 16 && cell !== 'bisque') {
    // hex code
    return "#" + cell;
  }
  // color name
  return cell;
};


jalview.parseLine = function(columns) {
  var obj = {
    attributes: {}
  };
  obj.attributes.Name = columns[0].trim(); //desc
  obj.seqname = columns[1].trim(); // id
  obj.start = parseInt(columns[3]);
  obj.end = parseInt(columns[4]);
  obj.feature = columns[5].trim();
  if (obj.seqname === "ID_NOT_SPECIFIED") {
    obj.seqname = columns[2].trim(); // alternative id
  }
  return obj;
};

},{"./utils":35}],35:[function(require,module,exports){
var utils = {};
module.exports = utils;

utils.extractKeys = function extractKeys(attr) {
  // extract key-value definitions
  var attributes = {};
  var attrArr = attr.split(";");
  attrArr.forEach(function(el) {
    var keyArr, key, val;
    if (el.indexOf("=") > 0) {
      keyArr = el.split("=");
      key = keyArr[0];
      val = keyArr[1];
      attributes[key] = val;
    } else if (el.indexOf(" ") > 0) {
      keyArr = el.split(" ");
      key = keyArr[0];
      val = keyArr[1].replace(/"/g, '');
      attributes[key] = val;
    }
  });
  return attributes;
};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

utils.rgbToHex = function(r, g, b) {
  if(r.length === 3){
    return utils.rgbToHex(r[0],r[1], r[2]);
  }
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

},{}],36:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"dup":16,"request":38,"vow":37}],37:[function(require,module,exports){
(function (process){
/**
 * @module vow
 * @author Filatov Dmitry <dfilatov@yandex-team.ru>
 * @version 0.4.9
 * @license
 * Dual licensed under the MIT and GPL licenses:
 *   * http://www.opensource.org/licenses/mit-license.php
 *   * http://www.gnu.org/licenses/gpl.html
 */

(function(global) {

var undef,
    nextTick = (function() {
        var fns = [],
            enqueueFn = function(fn) {
                return fns.push(fn) === 1;
            },
            callFns = function() {
                var fnsToCall = fns, i = 0, len = fns.length;
                fns = [];
                while(i < len) {
                    fnsToCall[i++]();
                }
            };

        if(typeof setImmediate === 'function') { // ie10, nodejs >= 0.10
            return function(fn) {
                enqueueFn(fn) && setImmediate(callFns);
            };
        }

        if(typeof process === 'object' && process.nextTick) { // nodejs < 0.10
            return function(fn) {
                enqueueFn(fn) && process.nextTick(callFns);
            };
        }

        if(global.postMessage) { // modern browsers
            var isPostMessageAsync = true;
            if(global.attachEvent) {
                var checkAsync = function() {
                        isPostMessageAsync = false;
                    };
                global.attachEvent('onmessage', checkAsync);
                global.postMessage('__checkAsync', '*');
                global.detachEvent('onmessage', checkAsync);
            }

            if(isPostMessageAsync) {
                var msg = '__promise' + +new Date,
                    onMessage = function(e) {
                        if(e.data === msg) {
                            e.stopPropagation && e.stopPropagation();
                            callFns();
                        }
                    };

                global.addEventListener?
                    global.addEventListener('message', onMessage, true) :
                    global.attachEvent('onmessage', onMessage);

                return function(fn) {
                    enqueueFn(fn) && global.postMessage(msg, '*');
                };
            }
        }

        var doc = global.document;
        if('onreadystatechange' in doc.createElement('script')) { // ie6-ie8
            var createScript = function() {
                    var script = doc.createElement('script');
                    script.onreadystatechange = function() {
                        script.parentNode.removeChild(script);
                        script = script.onreadystatechange = null;
                        callFns();
                };
                (doc.documentElement || doc.body).appendChild(script);
            };

            return function(fn) {
                enqueueFn(fn) && createScript();
            };
        }

        return function(fn) { // old browsers
            enqueueFn(fn) && setTimeout(callFns, 0);
        };
    })(),
    throwException = function(e) {
        nextTick(function() {
            throw e;
        });
    },
    isFunction = function(obj) {
        return typeof obj === 'function';
    },
    isObject = function(obj) {
        return obj !== null && typeof obj === 'object';
    },
    toStr = Object.prototype.toString,
    isArray = Array.isArray || function(obj) {
        return toStr.call(obj) === '[object Array]';
    },
    getArrayKeys = function(arr) {
        var res = [],
            i = 0, len = arr.length;
        while(i < len) {
            res.push(i++);
        }
        return res;
    },
    getObjectKeys = Object.keys || function(obj) {
        var res = [];
        for(var i in obj) {
            obj.hasOwnProperty(i) && res.push(i);
        }
        return res;
    },
    defineCustomErrorType = function(name) {
        var res = function(message) {
            this.name = name;
            this.message = message;
        };

        res.prototype = new Error();

        return res;
    },
    wrapOnFulfilled = function(onFulfilled, idx) {
        return function(val) {
            onFulfilled.call(this, val, idx);
        };
    };

/**
 * @class Deferred
 * @exports vow:Deferred
 * @description
 * The `Deferred` class is used to encapsulate newly-created promise object along with functions that resolve, reject or notify it.
 */

/**
 * @constructor
 * @description
 * You can use `vow.defer()` instead of using this constructor.
 *
 * `new vow.Deferred()` gives the same result as `vow.defer()`.
 */
var Deferred = function() {
    this._promise = new Promise();
};

Deferred.prototype = /** @lends Deferred.prototype */{
    /**
     * Returns corresponding promise.
     *
     * @returns {vow:Promise}
     */
    promise : function() {
        return this._promise;
    },

    /**
     * Resolves corresponding promise with given `value`.
     *
     * @param {*} value
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promise = defer.promise();
     *
     * promise.then(function(value) {
     *     // value is "'success'" here
     * });
     *
     * defer.resolve('success');
     * ```
     */
    resolve : function(value) {
        this._promise.isResolved() || this._promise._resolve(value);
    },

    /**
     * Rejects corresponding promise with given `reason`.
     *
     * @param {*} reason
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promise = defer.promise();
     *
     * promise.fail(function(reason) {
     *     // reason is "'something is wrong'" here
     * });
     *
     * defer.reject('something is wrong');
     * ```
     */
    reject : function(reason) {
        if(this._promise.isResolved()) {
            return;
        }

        if(vow.isPromise(reason)) {
            reason = reason.then(function(val) {
                var defer = vow.defer();
                defer.reject(val);
                return defer.promise();
            });
            this._promise._resolve(reason);
        }
        else {
            this._promise._reject(reason);
        }
    },

    /**
     * Notifies corresponding promise with given `value`.
     *
     * @param {*} value
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promise = defer.promise();
     *
     * promise.progress(function(value) {
     *     // value is "'20%'", "'40%'" here
     * });
     *
     * defer.notify('20%');
     * defer.notify('40%');
     * ```
     */
    notify : function(value) {
        this._promise.isResolved() || this._promise._notify(value);
    }
};

var PROMISE_STATUS = {
    PENDING   : 0,
    RESOLVED  : 1,
    FULFILLED : 2,
    REJECTED  : 3
};

/**
 * @class Promise
 * @exports vow:Promise
 * @description
 * The `Promise` class is used when you want to give to the caller something to subscribe to,
 * but not the ability to resolve or reject the deferred.
 */

/**
 * @constructor
 * @param {Function} resolver See https://github.com/domenic/promises-unwrapping/blob/master/README.md#the-promise-constructor for details.
 * @description
 * You should use this constructor directly only if you are going to use `vow` as DOM Promises implementation.
 * In other case you should use `vow.defer()` and `defer.promise()` methods.
 * @example
 * ```js
 * function fetchJSON(url) {
 *     return new vow.Promise(function(resolve, reject, notify) {
 *         var xhr = new XMLHttpRequest();
 *         xhr.open('GET', url);
 *         xhr.responseType = 'json';
 *         xhr.send();
 *         xhr.onload = function() {
 *             if(xhr.response) {
 *                 resolve(xhr.response);
 *             }
 *             else {
 *                 reject(new TypeError());
 *             }
 *         };
 *     });
 * }
 * ```
 */
var Promise = function(resolver) {
    this._value = undef;
    this._status = PROMISE_STATUS.PENDING;

    this._fulfilledCallbacks = [];
    this._rejectedCallbacks = [];
    this._progressCallbacks = [];

    if(resolver) { // NOTE: see https://github.com/domenic/promises-unwrapping/blob/master/README.md
        var _this = this,
            resolverFnLen = resolver.length;

        resolver(
            function(val) {
                _this.isResolved() || _this._resolve(val);
            },
            resolverFnLen > 1?
                function(reason) {
                    _this.isResolved() || _this._reject(reason);
                } :
                undef,
            resolverFnLen > 2?
                function(val) {
                    _this.isResolved() || _this._notify(val);
                } :
                undef);
    }
};

Promise.prototype = /** @lends Promise.prototype */ {
    /**
     * Returns value of fulfilled promise or reason in case of rejection.
     *
     * @returns {*}
     */
    valueOf : function() {
        return this._value;
    },

    /**
     * Returns `true` if promise is resolved.
     *
     * @returns {Boolean}
     */
    isResolved : function() {
        return this._status !== PROMISE_STATUS.PENDING;
    },

    /**
     * Returns `true` if promise is fulfilled.
     *
     * @returns {Boolean}
     */
    isFulfilled : function() {
        return this._status === PROMISE_STATUS.FULFILLED;
    },

    /**
     * Returns `true` if promise is rejected.
     *
     * @returns {Boolean}
     */
    isRejected : function() {
        return this._status === PROMISE_STATUS.REJECTED;
    },

    /**
     * Adds reactions to promise.
     *
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise} A new promise, see https://github.com/promises-aplus/promises-spec for details
     */
    then : function(onFulfilled, onRejected, onProgress, ctx) {
        var defer = new Deferred();
        this._addCallbacks(defer, onFulfilled, onRejected, onProgress, ctx);
        return defer.promise();
    },

    /**
     * Adds rejection reaction only. It is shortcut for `promise.then(undefined, onRejected)`.
     *
     * @param {Function} onRejected Callback to be called with the value after promise has been rejected
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    'catch' : function(onRejected, ctx) {
        return this.then(undef, onRejected, ctx);
    },

    /**
     * Adds rejection reaction only. It is shortcut for `promise.then(null, onRejected)`. It's alias for `catch`.
     *
     * @param {Function} onRejected Callback to be called with the value after promise has been rejected
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    fail : function(onRejected, ctx) {
        return this.then(undef, onRejected, ctx);
    },

    /**
     * Adds resolving reaction (to fulfillment and rejection both).
     *
     * @param {Function} onResolved Callback that to be called with the value after promise has been resolved
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    always : function(onResolved, ctx) {
        var _this = this,
            cb = function() {
                return onResolved.call(this, _this);
            };

        return this.then(cb, cb, ctx);
    },

    /**
     * Adds progress reaction.
     *
     * @param {Function} onProgress Callback to be called with the value when promise has been notified
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    progress : function(onProgress, ctx) {
        return this.then(undef, undef, onProgress, ctx);
    },

    /**
     * Like `promise.then`, but "spreads" the array into a variadic value handler.
     * It is useful with `vow.all` and `vow.allResolved` methods.
     *
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.all([defer1.promise(), defer2.promise()]).spread(function(arg1, arg2) {
     *     // arg1 is "1", arg2 is "'two'" here
     * });
     *
     * defer1.resolve(1);
     * defer2.resolve('two');
     * ```
     */
    spread : function(onFulfilled, onRejected, ctx) {
        return this.then(
            function(val) {
                return onFulfilled.apply(this, val);
            },
            onRejected,
            ctx);
    },

    /**
     * Like `then`, but terminates a chain of promises.
     * If the promise has been rejected, throws it as an exception in a future turn of the event loop.
     *
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     *
     * @example
     * ```js
     * var defer = vow.defer();
     * defer.reject(Error('Internal error'));
     * defer.promise().done(); // exception to be thrown
     * ```
     */
    done : function(onFulfilled, onRejected, onProgress, ctx) {
        this
            .then(onFulfilled, onRejected, onProgress, ctx)
            .fail(throwException);
    },

    /**
     * Returns a new promise that will be fulfilled in `delay` milliseconds if the promise is fulfilled,
     * or immediately rejected if promise is rejected.
     *
     * @param {Number} delay
     * @returns {vow:Promise}
     */
    delay : function(delay) {
        var timer,
            promise = this.then(function(val) {
                var defer = new Deferred();
                timer = setTimeout(
                    function() {
                        defer.resolve(val);
                    },
                    delay);

                return defer.promise();
            });

        promise.always(function() {
            clearTimeout(timer);
        });

        return promise;
    },

    /**
     * Returns a new promise that will be rejected in `timeout` milliseconds
     * if the promise is not resolved beforehand.
     *
     * @param {Number} timeout
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var defer = vow.defer(),
     *     promiseWithTimeout1 = defer.promise().timeout(50),
     *     promiseWithTimeout2 = defer.promise().timeout(200);
     *
     * setTimeout(
     *     function() {
     *         defer.resolve('ok');
     *     },
     *     100);
     *
     * promiseWithTimeout1.fail(function(reason) {
     *     // promiseWithTimeout to be rejected in 50ms
     * });
     *
     * promiseWithTimeout2.then(function(value) {
     *     // promiseWithTimeout to be fulfilled with "'ok'" value
     * });
     * ```
     */
    timeout : function(timeout) {
        var defer = new Deferred(),
            timer = setTimeout(
                function() {
                    defer.reject(new vow.TimedOutError('timed out'));
                },
                timeout);

        this.then(
            function(val) {
                defer.resolve(val);
            },
            function(reason) {
                defer.reject(reason);
            });

        defer.promise().always(function() {
            clearTimeout(timer);
        });

        return defer.promise();
    },

    _vow : true,

    _resolve : function(val) {
        if(this._status > PROMISE_STATUS.RESOLVED) {
            return;
        }

        if(val === this) {
            this._reject(TypeError('Can\'t resolve promise with itself'));
            return;
        }

        this._status = PROMISE_STATUS.RESOLVED;

        if(val && !!val._vow) { // shortpath for vow.Promise
            val.isFulfilled()?
                this._fulfill(val.valueOf()) :
                val.isRejected()?
                    this._reject(val.valueOf()) :
                    val.then(
                        this._fulfill,
                        this._reject,
                        this._notify,
                        this);
            return;
        }

        if(isObject(val) || isFunction(val)) {
            var then;
            try {
                then = val.then;
            }
            catch(e) {
                this._reject(e);
                return;
            }

            if(isFunction(then)) {
                var _this = this,
                    isResolved = false;

                try {
                    then.call(
                        val,
                        function(val) {
                            if(isResolved) {
                                return;
                            }

                            isResolved = true;
                            _this._resolve(val);
                        },
                        function(err) {
                            if(isResolved) {
                                return;
                            }

                            isResolved = true;
                            _this._reject(err);
                        },
                        function(val) {
                            _this._notify(val);
                        });
                }
                catch(e) {
                    isResolved || this._reject(e);
                }

                return;
            }
        }

        this._fulfill(val);
    },

    _fulfill : function(val) {
        if(this._status > PROMISE_STATUS.RESOLVED) {
            return;
        }

        this._status = PROMISE_STATUS.FULFILLED;
        this._value = val;

        this._callCallbacks(this._fulfilledCallbacks, val);
        this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = undef;
    },

    _reject : function(reason) {
        if(this._status > PROMISE_STATUS.RESOLVED) {
            return;
        }

        this._status = PROMISE_STATUS.REJECTED;
        this._value = reason;

        this._callCallbacks(this._rejectedCallbacks, reason);
        this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = undef;
    },

    _notify : function(val) {
        this._callCallbacks(this._progressCallbacks, val);
    },

    _addCallbacks : function(defer, onFulfilled, onRejected, onProgress, ctx) {
        if(onRejected && !isFunction(onRejected)) {
            ctx = onRejected;
            onRejected = undef;
        }
        else if(onProgress && !isFunction(onProgress)) {
            ctx = onProgress;
            onProgress = undef;
        }

        var cb;

        if(!this.isRejected()) {
            cb = { defer : defer, fn : isFunction(onFulfilled)? onFulfilled : undef, ctx : ctx };
            this.isFulfilled()?
                this._callCallbacks([cb], this._value) :
                this._fulfilledCallbacks.push(cb);
        }

        if(!this.isFulfilled()) {
            cb = { defer : defer, fn : onRejected, ctx : ctx };
            this.isRejected()?
                this._callCallbacks([cb], this._value) :
                this._rejectedCallbacks.push(cb);
        }

        if(this._status <= PROMISE_STATUS.RESOLVED) {
            this._progressCallbacks.push({ defer : defer, fn : onProgress, ctx : ctx });
        }
    },

    _callCallbacks : function(callbacks, arg) {
        var len = callbacks.length;
        if(!len) {
            return;
        }

        var isResolved = this.isResolved(),
            isFulfilled = this.isFulfilled();

        nextTick(function() {
            var i = 0, cb, defer, fn;
            while(i < len) {
                cb = callbacks[i++];
                defer = cb.defer;
                fn = cb.fn;

                if(fn) {
                    var ctx = cb.ctx,
                        res;
                    try {
                        res = ctx? fn.call(ctx, arg) : fn(arg);
                    }
                    catch(e) {
                        defer.reject(e);
                        continue;
                    }

                    isResolved?
                        defer.resolve(res) :
                        defer.notify(res);
                }
                else {
                    isResolved?
                        isFulfilled?
                            defer.resolve(arg) :
                            defer.reject(arg) :
                        defer.notify(arg);
                }
            }
        });
    }
};

/** @lends Promise */
var staticMethods = {
    /**
     * Coerces given `value` to a promise, or returns the `value` if it's already a promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    cast : function(value) {
        return vow.cast(value);
    },

    /**
     * Returns a promise to be fulfilled only after all the items in `iterable` are fulfilled,
     * or to be rejected when any of the `iterable` is rejected.
     *
     * @param {Array|Object} iterable
     * @returns {vow:Promise}
     */
    all : function(iterable) {
        return vow.all(iterable);
    },

    /**
     * Returns a promise to be fulfilled only when any of the items in `iterable` are fulfilled,
     * or to be rejected when the first item is rejected.
     *
     * @param {Array} iterable
     * @returns {vow:Promise}
     */
    race : function(iterable) {
        return vow.anyResolved(iterable);
    },

    /**
     * Returns a promise that has already been resolved with the given `value`.
     * If `value` is a promise, returned promise will be adopted with the state of given promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    resolve : function(value) {
        return vow.resolve(value);
    },

    /**
     * Returns a promise that has already been rejected with the given `reason`.
     *
     * @param {*} reason
     * @returns {vow:Promise}
     */
    reject : function(reason) {
        return vow.reject(reason);
    }
};

for(var prop in staticMethods) {
    staticMethods.hasOwnProperty(prop) &&
        (Promise[prop] = staticMethods[prop]);
}

var vow = /** @exports vow */ {
    Deferred : Deferred,

    Promise : Promise,

    /**
     * Creates a new deferred. This method is a factory method for `vow:Deferred` class.
     * It's equivalent to `new vow.Deferred()`.
     *
     * @returns {vow:Deferred}
     */
    defer : function() {
        return new Deferred();
    },

    /**
     * Static equivalent to `promise.then`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise}
     */
    when : function(value, onFulfilled, onRejected, onProgress, ctx) {
        return vow.cast(value).then(onFulfilled, onRejected, onProgress, ctx);
    },

    /**
     * Static equivalent to `promise.fail`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} onRejected Callback that will to be invoked with the reason after promise has been rejected
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    fail : function(value, onRejected, ctx) {
        return vow.when(value, undef, onRejected, ctx);
    },

    /**
     * Static equivalent to `promise.always`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} onResolved Callback that will to be invoked with the reason after promise has been resolved
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    always : function(value, onResolved, ctx) {
        return vow.when(value).always(onResolved, ctx);
    },

    /**
     * Static equivalent to `promise.progress`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} onProgress Callback that will to be invoked with the reason after promise has been notified
     * @param {Object} [ctx] Context of callback execution
     * @returns {vow:Promise}
     */
    progress : function(value, onProgress, ctx) {
        return vow.when(value).progress(onProgress, ctx);
    },

    /**
     * Static equivalent to `promise.spread`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Object} [ctx] Context of callbacks execution
     * @returns {vow:Promise}
     */
    spread : function(value, onFulfilled, onRejected, ctx) {
        return vow.when(value).spread(onFulfilled, onRejected, ctx);
    },

    /**
     * Static equivalent to `promise.done`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Function} [onFulfilled] Callback that will to be invoked with the value after promise has been fulfilled
     * @param {Function} [onRejected] Callback that will to be invoked with the reason after promise has been rejected
     * @param {Function} [onProgress] Callback that will to be invoked with the value after promise has been notified
     * @param {Object} [ctx] Context of callbacks execution
     */
    done : function(value, onFulfilled, onRejected, onProgress, ctx) {
        vow.when(value).done(onFulfilled, onRejected, onProgress, ctx);
    },

    /**
     * Checks whether the given `value` is a promise-like object
     *
     * @param {*} value
     * @returns {Boolean}
     *
     * @example
     * ```js
     * vow.isPromise('something'); // returns false
     * vow.isPromise(vow.defer().promise()); // returns true
     * vow.isPromise({ then : function() { }); // returns true
     * ```
     */
    isPromise : function(value) {
        return isObject(value) && isFunction(value.then);
    },

    /**
     * Coerces given `value` to a promise, or returns the `value` if it's already a promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    cast : function(value) {
        return value && !!value._vow?
            value :
            vow.resolve(value);
    },

    /**
     * Static equivalent to `promise.valueOf`.
     * If given `value` is not an instance of `vow.Promise`, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {*}
     */
    valueOf : function(value) {
        return value && isFunction(value.valueOf)? value.valueOf() : value;
    },

    /**
     * Static equivalent to `promise.isFulfilled`.
     * If given `value` is not an instance of `vow.Promise`, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    isFulfilled : function(value) {
        return value && isFunction(value.isFulfilled)? value.isFulfilled() : true;
    },

    /**
     * Static equivalent to `promise.isRejected`.
     * If given `value` is not an instance of `vow.Promise`, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    isRejected : function(value) {
        return value && isFunction(value.isRejected)? value.isRejected() : false;
    },

    /**
     * Static equivalent to `promise.isResolved`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @returns {Boolean}
     */
    isResolved : function(value) {
        return value && isFunction(value.isResolved)? value.isResolved() : true;
    },

    /**
     * Returns a promise that has already been resolved with the given `value`.
     * If `value` is a promise, returned promise will be adopted with the state of given promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    resolve : function(value) {
        var res = vow.defer();
        res.resolve(value);
        return res.promise();
    },

    /**
     * Returns a promise that has already been fulfilled with the given `value`.
     * If `value` is a promise, returned promise will be fulfilled with fulfill/rejection value of given promise.
     *
     * @param {*} value
     * @returns {vow:Promise}
     */
    fulfill : function(value) {
        var defer = vow.defer(),
            promise = defer.promise();

        defer.resolve(value);

        return promise.isFulfilled()?
            promise :
            promise.then(null, function(reason) {
                return reason;
            });
    },

    /**
     * Returns a promise that has already been rejected with the given `reason`.
     * If `reason` is a promise, returned promise will be rejected with fulfill/rejection value of given promise.
     *
     * @param {*} reason
     * @returns {vow:Promise}
     */
    reject : function(reason) {
        var defer = vow.defer();
        defer.reject(reason);
        return defer.promise();
    },

    /**
     * Invokes a given function `fn` with arguments `args`
     *
     * @param {Function} fn
     * @param {...*} [args]
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var promise1 = vow.invoke(function(value) {
     *         return value;
     *     }, 'ok'),
     *     promise2 = vow.invoke(function() {
     *         throw Error();
     *     });
     *
     * promise1.isFulfilled(); // true
     * promise1.valueOf(); // 'ok'
     * promise2.isRejected(); // true
     * promise2.valueOf(); // instance of Error
     * ```
     */
    invoke : function(fn, args) {
        var len = Math.max(arguments.length - 1, 0),
            callArgs;
        if(len) { // optimization for V8
            callArgs = Array(len);
            var i = 0;
            while(i < len) {
                callArgs[i++] = arguments[i];
            }
        }

        try {
            return vow.resolve(callArgs?
                fn.apply(global, callArgs) :
                fn.call(global));
        }
        catch(e) {
            return vow.reject(e);
        }
    },

    /**
     * Returns a promise to be fulfilled only after all the items in `iterable` are fulfilled,
     * or to be rejected when any of the `iterable` is rejected.
     *
     * @param {Array|Object} iterable
     * @returns {vow:Promise}
     *
     * @example
     * with array:
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.all([defer1.promise(), defer2.promise(), 3])
     *     .then(function(value) {
     *          // value is "[1, 2, 3]" here
     *     });
     *
     * defer1.resolve(1);
     * defer2.resolve(2);
     * ```
     *
     * @example
     * with object:
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.all({ p1 : defer1.promise(), p2 : defer2.promise(), p3 : 3 })
     *     .then(function(value) {
     *          // value is "{ p1 : 1, p2 : 2, p3 : 3 }" here
     *     });
     *
     * defer1.resolve(1);
     * defer2.resolve(2);
     * ```
     */
    all : function(iterable) {
        var defer = new Deferred(),
            isPromisesArray = isArray(iterable),
            keys = isPromisesArray?
                getArrayKeys(iterable) :
                getObjectKeys(iterable),
            len = keys.length,
            res = isPromisesArray? [] : {};

        if(!len) {
            defer.resolve(res);
            return defer.promise();
        }

        var i = len;
        vow._forEach(
            iterable,
            function(value, idx) {
                res[keys[idx]] = value;
                if(!--i) {
                    defer.resolve(res);
                }
            },
            defer.reject,
            defer.notify,
            defer,
            keys);

        return defer.promise();
    },

    /**
     * Returns a promise to be fulfilled only after all the items in `iterable` are resolved.
     *
     * @param {Array|Object} iterable
     * @returns {vow:Promise}
     *
     * @example
     * ```js
     * var defer1 = vow.defer(),
     *     defer2 = vow.defer();
     *
     * vow.allResolved([defer1.promise(), defer2.promise()]).spread(function(promise1, promise2) {
     *     promise1.isRejected(); // returns true
     *     promise1.valueOf(); // returns "'error'"
     *     promise2.isFulfilled(); // returns true
     *     promise2.valueOf(); // returns "'ok'"
     * });
     *
     * defer1.reject('error');
     * defer2.resolve('ok');
     * ```
     */
    allResolved : function(iterable) {
        var defer = new Deferred(),
            isPromisesArray = isArray(iterable),
            keys = isPromisesArray?
                getArrayKeys(iterable) :
                getObjectKeys(iterable),
            i = keys.length,
            res = isPromisesArray? [] : {};

        if(!i) {
            defer.resolve(res);
            return defer.promise();
        }

        var onResolved = function() {
                --i || defer.resolve(iterable);
            };

        vow._forEach(
            iterable,
            onResolved,
            onResolved,
            defer.notify,
            defer,
            keys);

        return defer.promise();
    },

    allPatiently : function(iterable) {
        return vow.allResolved(iterable).then(function() {
            var isPromisesArray = isArray(iterable),
                keys = isPromisesArray?
                    getArrayKeys(iterable) :
                    getObjectKeys(iterable),
                rejectedPromises, fulfilledPromises,
                len = keys.length, i = 0, key, promise;

            if(!len) {
                return isPromisesArray? [] : {};
            }

            while(i < len) {
                key = keys[i++];
                promise = iterable[key];
                if(vow.isRejected(promise)) {
                    rejectedPromises || (rejectedPromises = isPromisesArray? [] : {});
                    isPromisesArray?
                        rejectedPromises.push(promise.valueOf()) :
                        rejectedPromises[key] = promise.valueOf();
                }
                else if(!rejectedPromises) {
                    (fulfilledPromises || (fulfilledPromises = isPromisesArray? [] : {}))[key] = vow.valueOf(promise);
                }
            }

            if(rejectedPromises) {
                throw rejectedPromises;
            }

            return fulfilledPromises;
        });
    },

    /**
     * Returns a promise to be fulfilled only when any of the items in `iterable` is fulfilled,
     * or to be rejected when all the items are rejected (with the reason of the first rejected item).
     *
     * @param {Array} iterable
     * @returns {vow:Promise}
     */
    any : function(iterable) {
        var defer = new Deferred(),
            len = iterable.length;

        if(!len) {
            defer.reject(Error());
            return defer.promise();
        }

        var i = 0, reason;
        vow._forEach(
            iterable,
            defer.resolve,
            function(e) {
                i || (reason = e);
                ++i === len && defer.reject(reason);
            },
            defer.notify,
            defer);

        return defer.promise();
    },

    /**
     * Returns a promise to be fulfilled only when any of the items in `iterable` is fulfilled,
     * or to be rejected when the first item is rejected.
     *
     * @param {Array} iterable
     * @returns {vow:Promise}
     */
    anyResolved : function(iterable) {
        var defer = new Deferred(),
            len = iterable.length;

        if(!len) {
            defer.reject(Error());
            return defer.promise();
        }

        vow._forEach(
            iterable,
            defer.resolve,
            defer.reject,
            defer.notify,
            defer);

        return defer.promise();
    },

    /**
     * Static equivalent to `promise.delay`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Number} delay
     * @returns {vow:Promise}
     */
    delay : function(value, delay) {
        return vow.resolve(value).delay(delay);
    },

    /**
     * Static equivalent to `promise.timeout`.
     * If given `value` is not a promise, then `value` is equivalent to fulfilled promise.
     *
     * @param {*} value
     * @param {Number} timeout
     * @returns {vow:Promise}
     */
    timeout : function(value, timeout) {
        return vow.resolve(value).timeout(timeout);
    },

    _forEach : function(promises, onFulfilled, onRejected, onProgress, ctx, keys) {
        var len = keys? keys.length : promises.length,
            i = 0;

        while(i < len) {
            vow.when(
                promises[keys? keys[i] : i],
                wrapOnFulfilled(onFulfilled, i),
                onRejected,
                onProgress,
                ctx);
            ++i;
        }
    },

    TimedOutError : defineCustomErrorType('TimedOut')
};

var defineAsGlobal = true;
if(typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = vow;
    defineAsGlobal = false;
}

if(typeof modules === 'object' && isFunction(modules.define)) {
    modules.define('vow', function(provide) {
        provide(vow);
    });
    defineAsGlobal = false;
}

if(typeof define === 'function') {
    define(function(require, exports, module) {
        module.exports = vow;
    });
    defineAsGlobal = false;
}

defineAsGlobal && (global.vow = vow);

})(this);

}).call(this,require('_process'))

},{"_process":64}],38:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18,"global/window":39,"once":40,"parse-headers":44}],39:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],40:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],41:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21,"is-function":42}],42:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],43:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],44:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24,"for-each":41,"trim":43}],45:[function(require,module,exports){
module.exports.seq = require("./seq");

},{"./seq":46}],46:[function(require,module,exports){
module.exports = function(seq, name, id) {
    this.seq = seq;
    this.name = name;
    this.id = id;
    this.meta = {};
};

},{}],47:[function(require,module,exports){
// this is a light-weight build without the scrolling module
module.exports = require("./src/index.js");

},{"./src/index.js":53}],48:[function(require,module,exports){
module.exports = {
    render_x_axis_label: function () {
      var label = "Model Position";
      if (this.display_ali_map) {
        label = "Alignment Column";
      }
      this.called_on.find('.logo_xaxis').remove();
      this.called_on.prepend('<div class="logo_xaxis" class="centered" style="margin-left:40px"><p class="xaxis_text" style="width:10em;margin:1em auto">' + label + '</p></div>');

    },
    render_y_axis_label: function () {
      //attach a canvas for the y-axis
      this.dom_element.parent().before('<canvas class="logo_yaxis" height="'+this.options.height+'" width="55"></canvas>');
      var canvas = this.called_on.find('.logo_yaxis'),
      top_pix_height = 0,
      bottom_pix_height = 0,
      top_height = Math.abs(this.data.max_height),
      bottom_height = (isNaN(this.data.min_height_obs)) ? 0 : parseInt(this.data.min_height_obs, 10),
      context = null,
      axis_label = "Information Content (bits)";

      context = canvas[0].getContext('2d');
      //draw min/max tick marks
      context.beginPath();
      context.moveTo(55, 1);
      context.lineTo(40, 1);

      context.moveTo(55, this.info_content_height);
      context.lineTo(40, this.info_content_height);


      context.moveTo(55, (this.info_content_height / 2));
      context.lineTo(40, (this.info_content_height / 2));
      context.lineWidth = 1;
      context.strokeStyle = "#666666";
      context.stroke();

      //draw the label text
      context.fillStyle = "#666666";
      context.textAlign = "right";
      context.font = "bold 10px Arial";

      // draw the max label
      context.textBaseline = "top";
      context.fillText(parseFloat(this.data.max_height).toFixed(1), 38, 0);
      context.textBaseline = "middle";

      // draw the midpoint labels
      context.fillText(parseFloat(this.data.max_height / 2).toFixed(1), 38, (this.info_content_height / 2));
      // draw the min label
      context.fillText('0', 38, this.info_content_height);

      // draw the axis label
      if (this.data.height_calc === 'score') {
        axis_label = "Score (bits)";
      }

      context.save();
      context.translate(5, this.height / 2 - 20);
      context.rotate(-Math.PI / 2);
      context.textAlign = "center";
      context.font = "normal 12px Arial";
      context.fillText(axis_label, 1, 0);
      context.restore();

      // draw the insert row labels
      context.fillText('occupancy', 55, this.info_content_height + 7);
      if (this.show_inserts) {
        context.fillText('ins. prob.', 50, 280);
        context.fillText('ins. len.', 46, 296);
      }
    }
};

},{}],49:[function(require,module,exports){
var canv_support = null;

module.exports = function canvasSupport() {
  if (!canv_support) {
    var elem = document.createElement('canvas');
    canv_support = !!(elem.getContext && elem.getContext('2d'));
  }
  return canv_support;
}

},{}],50:[function(require,module,exports){
module.exports = {
  'A': '#FF9966',
  'C': '#009999',
  'D': '#FF0000',
  'E': '#CC0033',
  'F': '#00FF00',
  'G': '#f2f20c',
  'H': '#660033',
  'I': '#CC9933',
  'K': '#663300',
  'L': '#FF9933',
  'M': '#CC99CC',
  'N': '#336666',
  'P': '#0099FF',
  'Q': '#6666CC',
  'R': '#990000',
  'S': '#0000FF',
  'T': '#00FFFF',
  'V': '#FFCC33',
  'W': '#66CC66',
  'Y': '#006600'
};

},{}],51:[function(require,module,exports){
module.exports = {
    'A': '#cbf751',
    'C': '#5ec0cc',
    'G': '#ffdf59',
    'T': '#b51f16',
    'U': '#b51f16'
  };

},{}],52:[function(require,module,exports){
var $ = require("jbone");

module.exports = function($el,logo, logo_graphic){

  $el.find('.logo_settings_switch, .logo_settings .close').on('click', function (e) {
    e.preventDefault();
    $('.logo_settings').toggle();
  });

  $el.find('.logo_reset').on('click', function (e) {
    e.preventDefault();
    logo.changeZoom({'target': logo.default_zoom});
  });

  $el.find('.logo_change').on('click', function (e) {
    e.preventDefault();
  });

  $el.find('.logo_zoomin').on('click', function (e) {
    e.preventDefault();
    logo.changeZoom({'distance': 0.1, 'direction': '+'});
  });

  $el.find('.logo_zoomout').on('click', function (e) {
    e.preventDefault();
    logo.changeZoom({'distance': 0.1, 'direction': '-'});
  });

  $el.find('.logo_scale').on('change', function (e) {
    logo.toggleScale(this.value);
  });

  $el.find('.logo_color').on('change', function (e) {
    logo.toggleColorscheme(this.value);
  });

  $el.find('.logo_ali_map').on('change', function (e) {
    logo.toggleAliMap(this.value);
  });

  $el.find('.logo_position').on('change', function () {
    if (!this.value.match(/^\d+$/m)) {
      return;
    }
    logo.scrollToColumn(this.value, 1);
  });

  logo_graphic.on('dblclick', function (e) {
    // need to get coordinates of mouse click
    console.log("dblclick", logo);

    offset = logo.logo_graphic.offset(),
    x = parseInt((e.pageX - offset.left), 10),

    // get mouse position in the window
    window_position = e.pageX - $el.parent().offset().left,

    // get column number
    col = logo.columnFromCoordinates(x),

    console.log("col", col);

    // choose new zoom level and zoom in.
    current = logo.zoom;

    if (current < 1) {
      logo.changeZoom({'target': 1, offset: window_position, column: col});
    } else {
      logo.changeZoom({'target': 0.3, offset: window_position, column: col});
    }

    return;
  });

  $(document).on($el.attr('id') + ".scrolledTo", function (e, left, top, zoom) {
    logo.render({target: left});
  });

  $(document).on('keydown', function (e) {
    if (!e.ctrlKey) {
      if (e.which === 61 || e.which === 107) {
        zoom += 0.1;
        logo.changeZoom({'distance': 0.1, 'direction': '+'});
      }
      if (e.which === 109 || e.which === 0) {
        zoom = zoom - 0.1;
        logo.changeZoom({'distance': 0.1, 'direction': '-'});
      }
    }
  });
}

},{"jbone":67}],53:[function(require,module,exports){
_ = require("underscore");

//var ConsensusColors = require("./consensusColors.js");
var canvasSupport = require("./canvasSupport.js");
var render = require("./render/render.js");
var Letter = require("./model/letter.js");
var view = require("backbone-viewj");
var axis = require("./axis");
var eventListener = require("./eventListener.js");
var settings = require("./info/settings.js");

var jbone = require("jbone");

module.exports = view.extend({

  options: {
    xaxis: true,
    yaxis: true,
    height: 300,
    column_width: 34,
    debug: true,
    scale_height_enabled: true,
    scaled_max: true,
    zoom_buttons: true,
    colorscheme: 'default',
    data: undefined,
    start: 1,
    end: undefined,
    zoom: 0.4,
    colors: undefined,
    divider: false,
    show_probs: false,
    divider_step: 5,
    show_divider: false,
    border: false,
    settings: false,
    scroller: true,
    positionMarker: true
  },

  loadDefault: function(options){
    this.data = options.data;

    // never show the alignment coordinates by default as that would get
    // really confusing.
    this.display_ali_map = 0;

    this.alphabet = options.data.alphabet || 'dna';

    this.start = options.start;
    //this.end = options.end || this.data.heightArr.length;
    this.zoom = parseFloat(options.zoom) || 0.4;
    this.default_zoom = this.zoom;

    this.column_width = options.column_width;
    this.height = options.height;
    this.canvas_width = 5000;
    this.scale_height_enabled = options.scale_height_enabled;

    // this needs to be set to null here so that we can initialise it after
    // the render function has fired and the width determined.
    this.scrollme = null;

    this.previous_target = 0;
    // keeps track of which canvas elements have been drawn and which ones haven't.
    this.rendered = [];
    this.previous_zoom = 0;

    if(this.data.max_height == undefined){
      this.data.max_height = this.calcMaxHeight(this.data.heightArr);
    }

    // only show insert when we actually have the data
    if(!this.data.insert_probs || !this.data.delete_probs){
      this.options.show_probs = false;
    }

    if (options.scaled_max) {
      this.data.max_height = options.data.max_height_obs || this.data.max_height || 2;
    } else {
      this.data.max_height = options.data.max_height_theory || this.data.max_height || 2;
    }

    if(options.colors){
      this.changeColors(options.colors);
    }else{
      if (this.alphabet === 'aa') {
        this.aa_colors = require("./colors/aa.js");
        this.changeColors(this.aa_colors);
      }else{
        this.dna_colors = require("./colors/dna.js");
        this.changeColors(this.dna_colors);
      }
    }
  },
  initialize: function(options) {
    if (!canvasSupport()) {
      this.el.textContent = "Your browser doesn't support canvas.";
      return;
    }
    if(options.data == undefined){
      this.el.textContent = "No data added.";
    }

    // load default settings
    _.extend(this.options,options);
    var opt = this.options;
    this.loadDefault(opt);

    if(!this.options.show_probs){
      this.info_content_height = this.height;
    }else{
      // turn off the insert rows if the hmm used the observed or weighted processing flags.
      if (this.data.processing && /^observed|weighted/.test(this.data.processing)) {
        this.show_inserts = 0;
        this.info_content_height = this.height - 14;
      } else {
        this.show_inserts = 1;
        this.info_content_height = this.height - 44;
      }
    }
    this.$el = jbone(this.el);

    this.initDivs();

    if(this.options.settings){
      var form = settings(this,opt);
      this.$el.append(form);
    }

    eventListener(this.$el,this, this.logo_graphic);
    /*
       if (opt.columnInfo) {
       var columnInfo = require("./info/column_info.js");
       columnInfo(this);
       }
       */

  },
  initDivs: function(){
    var logo_graphic = mk("div");
    logo_graphic.className = "logo_graphic";
    this.logo_graphic = jbone(logo_graphic);

    var container = mk("div");
    container.className = "logo_container";
    container.style.height = this.height;
    this.container = jbone(container);

    this.container.append(logo_graphic);

    // add some internal divs for scrolling etc.
    this.$el.append(container);

    if(this.options.divider){
      var divider = mk("div");
      divider.className = "logo_divider";
      this.$el.append(divider);
    }

    this.dom_element = jbone(logo_graphic);
    this.called_on = this.$el;

    if(this.options.xaxis){
      axis.render_x_axis_label.call(this);
    }
    if(this.options.yaxis){
      axis.render_y_axis_label.call(this);
    }else{
      this.container[0].style.marginLeft = "0px";
    }

  },

  render: function(){
    render.call(this);
    return this;
  },

  changeColors: function(colors){
    this.colors = colors;
    var bUseColorObject = (colors != undefined && colors.type != undefined);
    if(bUseColorObject){
      this.colorscheme = "dynamic";
    }
    this.buildAlphabet();
  },

  buildAlphabet: function(){
    /*
       if (this.alphabet === 'aa') {
       var probs_arr = this.data.probs_arr;
       if (probs_arr) {
       var cc = new ConsensusColors();
       this.cmap = cc.color_map(probs_arr);
       }
       }
       */

    //build the letter canvases
    this.letters = {};
    var colors = this.colors;
    if(this.colorscheme == "dynamic"){
      var tColors = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
      colors = {};
      tColors.forEach(function(e){
        colors[e] = "";
      });
    }
    for (var letter in colors) {
      if (colors.hasOwnProperty(letter)) {
        var loptions = {color: colors[letter]};
        this.letters[letter] = new Letter(letter, loptions);
      }
    }
  },

  toggleColorscheme: function (scheme) {
    // work out the current column we are on so we can return there
    var col_total = this.currentColumn();

    if (scheme) {
      if (scheme === 'default') {
        this.colorscheme = 'default';
      } else {
        this.colorscheme = 'consensus';
      }
    } else {
      if (this.colorscheme === 'default') {
        this.colorscheme = 'consensus';
      } else {
        this.colorscheme = 'default';
      }
    }

    // reset the rendered counter so that each section will re-render
    // with the new heights
    this.rendered = [];

    // re-flow and re-render the content
    this.scrollme.reflow();
    //scroll off by one to force a render of the canvas.
    this.scrollToColumn(col_total + 1);
    //scroll back to the location we started at.
    this.scrollToColumn(col_total);
  },

  toggleScale: function (scale) {
    // work out the current column we are on so we can return there
    var col_total = this.currentColumn();

    if (scale) {
      if (scale === 'obs') {
        this.data.max_height = this.data.max_height_obs;
      } else {
        this.data.max_height = this.data.max_height_theory;
      }
    } else {
      // toggle the max height
      if (this.data.max_height === this.data.max_height_obs) {
        this.data.max_height = this.data.max_height_theory;
      } else {
        this.data.max_height = this.data.max_height_obs;
      }
    }
    // reset the rendered counter so that each section will re-render
    // with the new heights
    this.rendered = [];
    //update the y-axis
    if(this.logoYAxis){
      this.logoYAxis.remove();
      //this.called_on.find('.logo_yaxis').remove();
    }
    axis.render_y_axis_label.call(this);

    // re-flow and re-render the content
    this.scrollme.reflow();
    //scroll off by one to force a render of the canvas.
    this.scrollToColumn(col_total + 1);
    //scroll back to the location we started at.
    this.scrollToColumn(col_total);
  },
  toggleAliMap: function (coords) {
    // work out the current column we are on so we can return there
    var col_total = this.currentColumn();

    if (coords) {
      if (coords === 'model') {
        this.display_ali_map = 0;
      } else {
        this.display_ali_map = 1;
      }
    } else {
      // toggle the max height
      if (this.display_ali_map === 1) {
        this.display_ali_map = 0;
      } else {
        this.display_ali_map = 1;
      }
    }
    axis.render_x_axis_label(this);

    // reset the rendered counter so that each section will re-render
    // with the new heights
    this.rendered = [];

    // re-flow and re-render the content
    this.scrollme.reflow();
    //scroll off by one to force a render of the canvas.
    this.scrollToColumn(col_total + 1);
    //scroll back to the location we started at.
    this.scrollToColumn(col_total);
  },

  currentColumn: function () {
    var before_left = this.scrollme.scroller.getValues().left,
    col_width = (this.column_width * this.zoom),
    col_count = before_left / col_width,
    half_visible_columns = (this.container.width() / col_width) / 2,
    col_total = Math.ceil(col_count + half_visible_columns);
    return col_total;
  },

  changeZoom: function (options) {
    var zoom_level = 0.3,
    expected_width = null;
    if (options.target) {
      zoom_level = options.target;
    } else if (options.distance) {
      zoom_level = (parseFloat(this.zoom) - parseFloat(options.distance)).toFixed(1);
      if (options.direction === '+') {
        zoom_level = (parseFloat(this.zoom) + parseFloat(options.distance)).toFixed(1);
      }
    }

    if (zoom_level > 1) {
      zoom_level = 1;
    } else if (zoom_level < 0.1) {
      zoom_level = 0.1;
    }

    // see if we need to zoom or not
    expected_width = (this.logo_graphic.width() * zoom_level) / this.zoom;
    if (expected_width > this.container.width()) {
      // if a center is not specified, then use the current center of the view
      if (!options.column) {
        //work out my current position
        var col_total = this.currentColumn();

        this.zoom = zoom_level;
        this.render({zoom: this.zoom});
        this.scrollme.reflow();

        //scroll to previous position
        this.scrollToColumn(col_total);
      } else { // center around the mouse click position.
        this.zoom = zoom_level;
        this.render({zoom: this.zoom});
        this.scrollme.reflow();

        var coords = this.coordinatesFromColumn(options.column);
        this.scrollme.scroller.scrollTo(coords - options.offset);
      }
    }
    return this.zoom;

  },

  columnFromCoordinates: function (x) {
    var column = Math.ceil(x / (this.column_width * this.zoom));
    return column;
  },

  coordinatesFromColumn: function (col) {
    var new_column = col - 1,
    x = (new_column  * (this.column_width * this.zoom)) + ((this.column_width * this.zoom) / 2);
    return x;
  },

  scrollToColumn: function (num, animate) {
    var half_view = (this.logo_container.width() / 2),
    new_left = this.coordinatesFromColumn(num);
    this.scrollme.scroller.scrollTo(new_left - half_view, 0, animate);
  },
  calcMaxHeight: function(columns){
    // loops over all columns and return the max height seen
    return columns.reduce(function(m,c){
      var col = 0;
      for(var k in c){
        col += c[k];
      }
      return col > m ? col : m;
    },0);
  }


});

var mk = function(name){
  return document.createElement(name);
}

},{"./axis":48,"./canvasSupport.js":49,"./colors/aa.js":50,"./colors/dna.js":51,"./eventListener.js":52,"./info/settings.js":54,"./model/letter.js":55,"./render/render.js":59,"backbone-viewj":9,"jbone":67,"underscore":91}],54:[function(require,module,exports){
var $ = require("jbone");

module.exports = function(logo,options){
  var form = $('<form class="logo_form"><fieldset><label for="position">Column number</label>' +
               '<input type="text" name="position" class="logo_position"></input>' +
               '<button class="button logo_change">Go</button></fieldset>' +
               '</form>');

  var settings = $('<div class="logo_settings"></div>');
  settings.append('<span class="close">x</span>');



  /* we don't want to toggle if the max height_obs is greater than max theoretical
   * as letters will fall off the top.
   */
  if (logo.scale_height_enabled && (logo.data.max_height_obs < logo.data.max_height_theory)) {
    var obs_checked = '',
    theory_checked = '',
    theory_help = '',
    obs_help = '';

    if (logo.data.max_height_obs === logo.data.max_height) {
      obs_checked = 'checked';
    } else {
      theory_checked = 'checked';
    }
  }



  var scale_controls = '<fieldset><legend>Scale</legend>' +
    '<label><input type="radio" name="scale" class="logo_scale" value="obs" ' + obs_checked +
    '/>Maximum Observed ' + obs_help +
    '</label></br>' +
    '<label><input type="radio" name="scale" class="logo_scale" value="theory" ' + theory_checked +
    '/>Maximum Theoretical ' + theory_help +
    '</label>' +
    '</fieldset>';

  settings.append(scale_controls);

  if (logo.data.height_calc !== 'score' && logo.data.alphabet === 'aa' && logo.data.probs_arr) {

    var def_color = null,
    con_color = null,
    def_help = '',
    con_help = '';

    if (logo.colorscheme === 'default') {
      def_color = 'checked';
    } else {
      con_color = 'checked';
    };

    if (options.help) {
      def_help = '<a class="help" href="/help#colors_default" title="Each letter receives its own color.">' +
        '<span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>';
      con_help = '<a class="help" href="/help#colors_consensus" title="Letters are colored as in Clustalx and Jalview, with colors depending on composition of the column.">' +
        '<span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>';
    }

    var color_controls = '<fieldset><legend>Color Scheme</legend>' +
      '<label><input type="radio" name="color" class="logo_color" value="default" ' + def_color +
      '/>Default ' + def_help +
      '</label></br>' +
      '<label><input type="radio" name="color" class="logo_color" value="consensus" ' + con_color +
      '/>Consensus Colors ' + con_help +
      '</label>' +
      '</fieldset>';
    settings.append(color_controls);
  }


  if (logo.data.ali_map) {
    var mod_checked = null,
    ali_checked = null,
    mod_help = '',
    ali_help = '';

    if (logo.display_ali_map === 0) {
      mod_checked = 'checked';
    } else {
      ali_checked = 'checked';
    }

    if (options.help) {
      mod_help = '<a class="help" href="/help#coords_model" title="The coordinates along the top of the plot show the model position.">' +
        '<span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>';
      ali_help = '<a class="help" href="/help#coords_ali" title="The coordinates along the top of the plot show the column in the alignment associated with the model">' +
        '<span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>';
    }

    var ali_controls = '<fieldset><legend>Coordinates</legend>' +
      '<label><input type="radio" name="coords" class="logo_ali_map" value="model" ' + mod_checked +
      '/>Model ' + mod_help +
      '</label></br>' +
      '<label><input type="radio" name="coords" class="logo_ali_map" value="alignment" ' + ali_checked +
      '/>Alignment ' + ali_help +
      '</label>' +
      '</fieldset>';
    settings.append(ali_controls);
  }


  var controls = $('<div class="logo_controls"></div>');
  if (logo.zoom_enabled) {
    controls.append('<button class="logo_zoomout button">-</button>' +
                    '<button class="logo_zoomin button">+</button>');
  }

  if (settings.children().length > 0) {
    controls.append('<button class="logo_settings_switch button">Settings</button>');
    controls.append(settings);
  }

  form.append(controls);

  return form;
}

},{"jbone":67}],55:[function(require,module,exports){
module.exports = function Letter(letter, options) {
  options = options || {};
  this.value = letter;
  this.width = parseInt(options.width, 10) || 100;

  //W is 30% wider than the other letters, so need to make sure
  //it gets modified accordingly.
  if (this.value === 'W') {
    this.width += (this.width * 30) / 100;
  }

  this.height = parseInt(options.height, 10) || 100;

  this.color = options.color || '#000000';
  // if the height and width are changed from the default, then
  // this will also need to be changed as it cant be calculated
  // dynamically.
  this.fontSize = options.fontSize || 138;

  this.scaled = function () { };

  this.draw = function (ext_ctx, target_height, target_width, x, y, color) {
    var h_ratio = target_height / this.height,
    w_ratio = target_width / this.width,
    prev_font = ext_ctx.font;
    ext_ctx.transform(w_ratio, 0, 0, h_ratio, x, y);
    ext_ctx.fillStyle = color || this.color;
    ext_ctx.textAlign = "center";
    ext_ctx.font = "bold " + this.fontSize + "px Arial";

    ext_ctx.fillText(this.value, 0, 0);
    //restore the canvas settings
    ext_ctx.setTransform(1, 0, 0, 1, 0, 0);
    ext_ctx.fillStyle = '#000000';
    ext_ctx.font = prev_font;
  };

}

},{}],56:[function(require,module,exports){
module.exports = function draw_border(context, y, width) {
  context.beginPath();
  context.moveTo(0, y);
  context.lineTo(width, y);
  context.lineWidth = 1;
  context.strokeStyle = "#999999";
  context.stroke();
}

},{}],57:[function(require,module,exports){
module.exports = function draw_column_number(context, x, y, col_width, col_num, fontsize, right) {
  context.font = fontsize + "px Arial";
  context.textAlign = right ? "right" : "center";
  context.fillStyle = "#666666";
  context.fillText(col_num, x + (col_width / 2), y);
}

},{}],58:[function(require,module,exports){
module.exports = function draw_ticks(context, x, y, height, color) {
  color = color || '#999999';
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + height);
  context.lineWidth = 1;
  context.strokeStyle = color;
  context.stroke();
}

},{}],59:[function(require,module,exports){
var renderWithText = require("./render_with_text.js");
var renderWithRect = require("./render_with_rects.js");
var jbone = require("jbone");

// the main render function that draws the logo based on the provided options.
module.exports = function (options) {
  if (!this.data) {
    return;
  }
  options    = options || {};
  var zoom   = options.zoom || this.zoom,
  target = options.target || 1,
  scaled = options.scaled || null;
  var parent_width = this.dom_element.parent().attr('width'),
  max_canvas_width = 1,
  end = null,
  start = null,
  i = 0;

  /*
  if (target === this.previous_target) {
    return;
  }
  */

  this.previous_target = target;


  if (options.start) {
    this.start = options.start;
  }
  if (options.end) {
    this.end = options.end;
  }

  if (zoom <= 0.1) {
    zoom = 0.1;
  } else if (zoom >= 1) {
    zoom = 1;
  }

  this.zoom = zoom;

  end = this.end || this.data.heightArr.length;
  start = this.start || 1;
  end     = (end > this.data.heightArr.length) ? this.data.heightArr.length : end;
  end     = (end < start) ? start : end;

  start     = (start > end) ? end : start;
  start     = (start > 1) ? start : 1;

  this.y = this.height - 20;
  // Check to see if the logo will fit on the screen at full zoom.
  this.max_width = this.column_width * ((end - start) + 1);
  // If it fits then zoom out and disable zooming.
  if (parent_width > this.max_width) {
    zoom = 1;
    this.zoom_enabled = false;
  }
  this.zoom = zoom;

  this.zoomed_column = this.column_width * zoom;
  this.total_width = this.zoomed_column * ((end - start) + 1);

  // If zoom is not maxed and we still aren't filling the window
  // then ramp up the zoom level until it fits, then disable zooming.
  // Then we get a decent logo with out needing to zoom in or out.
  if (zoom < 1) {
    while (this.total_width < parent_width) {
      this.zoom += 0.1;
      this.zoomed_column = this.column_width * this.zoom;
      this.total_width = this.zoomed_column * ((end - start) + 1);
      this.zoom_enabled = false;
      if (zoom >= 1) {
        break;
      }
    }
  }

  if (target > this.total_width) {
    target = this.total_width;
  }
  this.dom_element.attr({'width': this.total_width + 'px'}).css({width: this.total_width + 'px'});

  this.canvas_width = this.total_width;
  var canvas_count = Math.ceil(this.total_width / this.canvas_width);
  this.columns_per_canvas = Math.ceil(this.canvas_width / this.zoomed_column);


  if (this.previous_zoom !== this.zoom) {
    this.dom_element.find('canvas').remove();
    this.previous_zoom = this.zoom;
    this.rendered = [];
  }

  this.canvases = [];
  this.contexts = [];


  for (i = 0; i < canvas_count; i++) {

    var split_start = (this.columns_per_canvas * i) + start,
    split_end   = split_start + this.columns_per_canvas - 1;
    if (split_end > end) {
      split_end = end;
    }

    var adjusted_width = ((split_end - split_start) + 1) * this.zoomed_column;

    if (adjusted_width > max_canvas_width) {
      max_canvas_width = adjusted_width;
    }

    var canv_start = max_canvas_width * i,
    canv_end = canv_start + adjusted_width;

    if (target < canv_end + (canv_end / 2) && target > canv_start - (canv_start / 2)) {
      // Check that we aren't redrawing the canvas and if not, then attach it and draw.
      //if (this.rendered[i] !== 1) {

        this.canvases[i] = attach_canvas(this.dom_element, this.height, adjusted_width, i, max_canvas_width);
        this.contexts[i] = this.canvases[i].getContext('2d');
        this.contexts[i].setTransform(1, 0, 0, 1, 0, 0);
        this.contexts[i].clearRect(0, 0, adjusted_width, this.height);
        this.contexts[i].fillStyle = "#ffffff";
        this.contexts[i].fillRect(0, 0, canv_end, this.height);


        if (this.zoomed_column > 12) {
          var fontsize = parseInt(10 * zoom, 10);
          fontsize = (fontsize > 10) ? 10 : fontsize;
          if (this.debug) {
            renderWithRect.call(this,split_start, split_end, i, 1);
          }
          renderWithText.call(this,split_start, split_end, i, fontsize);
        } else {
          renderWithRect.call(this,split_start, split_end, i);
        }
        //this.rendered[i] = 1;
      //}
    }

  }

  // check if the scroller object has been initialised and if not then do so.
  // we do this here as opposed to at object creation, because we need to
  // make sure the logo has been rendered and the width is correct, otherwise
  // we get a weird initial state where the canvas will bounce back to the
  // beginning the first time it is scrolled, because it thinks it has a
  // width of 0.
  if (!this.scrollme && this.options.scroller) {
    this.scrollme = new EasyScroller(this.dom_element[0], {
      scrollingX: 1,
      scrollingY: 0,
      eventTarget: this.called_on
    });
  }

  if (target !== 1) {
    this.scrollme.reflow();
  }
  return;
};


function attach_canvas(DOMid, height, width, id, canv_width) {
  var canvas = jbone(DOMid).find('#canv_' + id);

  if (!canvas.length) {
    jbone(DOMid).append('<canvas class="canvas_logo" id="canv_' + id + '"  height="' + height + '" width="' + width + '" style="left:' + canv_width * id + 'px"></canvas>');
    canvas = jbone(DOMid).find('#canv_' + id);
  }

  jbone(canvas).attr('width', width).attr('height', height);

  return canvas[0];
}

},{"./render_with_rects.js":60,"./render_with_text.js":61,"jbone":67}],60:[function(require,module,exports){
var draw_border = require("./draw/border.js");
var draw_ticks = require("./draw/ticks.js");
var draw_column_number = require("./draw/column_number.js");

module.exports = function (start, end, context_num, borders) {
  var x = 0,
  column_num = start,
  column_label = null,
  i = 0,
  top_height = Math.abs(this.data.max_height),
  bottom_height = Math.abs(this.data.min_height_obs),
  total_height = top_height + bottom_height,
  top_percentage    = Math.round((Math.abs(this.data.max_height) * 100) / total_height),
  //convert % to pixels
  top_pix_height = Math.round((this.info_content_height * top_percentage) / 100),
  bottom_pix_height = this.info_content_height - top_pix_height,
  mod = 10;


  for (i = start; i <= end; i++) {
    if (this.data.mmline && this.data.mmline[i - 1] === 1) {
      this.contexts[context_num].fillStyle = '#cccccc';
      this.contexts[context_num].fillRect(x, 10, this.zoomed_column, this.height - 40);
    } else {
      var column = this.data.heightArr[i - 1],
      previous_height = 0,
      previous_neg_height = top_pix_height,
      letters = column.length,
      j = 0;
      for(var j in column){
        values = [j,column[j]];
        if (values[1] > 0.01) {
          var letter_height = parseFloat(values[1]) / this.data.max_height,
          x_pos = x,
          glyph_height = (this.info_content_height - 2) * letter_height,
          y_pos = (this.info_content_height - 2) - previous_height - glyph_height,
          color = null;


          if(this.colorscheme === 'dynamic'){
            color = this.colors.getColor(values[0], {pos: i - 1} )
          }else{
            if(this.colorscheme === 'consensus') {
              color = this.cmap[i - 1][values[0]] || "#7a7a7a";
            } else {
              color = this.colors[values[0]];
            }
          }

          if (borders) {
            this.contexts[context_num].strokeStyle = color;
            this.contexts[context_num].strokeRect(x_pos, y_pos, this.zoomed_column, glyph_height);
          } else {
            this.contexts[context_num].fillStyle = color;
            this.contexts[context_num].fillRect(x_pos, y_pos, this.zoomed_column, glyph_height);
          }

          previous_height = previous_height + glyph_height;
        }
      }
    }


    if (this.zoom < 0.2) {
      mod = 20;
    } else if (this.zoom < 0.3) {
      mod = 10;
    }

    if(this.options.positionMarker){
      if (i % mod === 0) {
        // draw column dividers
        if(this.options.show_probs){
          draw_ticks(this.contexts[context_num], x + this.zoomed_column, this.height - 30, parseFloat(this.height), '#dddddd');
        }
        // draw top ticks
        draw_ticks(this.contexts[context_num], x + this.zoomed_column, 0, 5);

        // if ali_coordinates exist and toggle is set then display the
        // alignment coordinates and not the model coordinates.
        if (this.display_ali_map) {
          column_label = this.data.ali_map[i - 1];
        } else {
          column_label = column_num;
        }
        // draw column numbers
        draw_column_number(this.contexts[context_num], x - 2,  10, this.zoomed_column, column_label, 10, true);
      }

    }


    // draw insert probabilities/lengths
    if(this.options.show_probs){
      draw_small_insert(
        this.contexts[context_num],
        x,
        this.height - 42,
        this.zoomed_column,
        this.data.insert_probs[i - 1],
        this.data.insert_lengths[i - 1],
        this.data.delete_probs[i - 1],
        this.show_inserts
      );
    }

    if(this.options.show_probs){
      // draw other dividers
      if (this.show_inserts) {
        draw_border(this.contexts[context_num], this.height - 45, this.total_width);
      } else {
        draw_border(this.contexts[context_num], this.height - 15, this.total_width);
      }
    }

    if(this.options.border){
      draw_border(this.contexts[context_num], 0, this.total_width);
    }

    x += this.zoomed_column;
    column_num++;
  }

};


function draw_small_insert(context, x, y, col_width, in_odds, in_length, del_odds, show_inserts) {
  var fill = "#ffffff";
  if (show_inserts) {
    if (in_odds > 0.1) {
      fill = '#d7301f';
    } else if (in_odds > 0.05) {
      fill = '#fc8d59';
    } else if (in_odds > 0.03) {
      fill = '#fdcc8a';
    }
    context.fillStyle = fill;
    context.fillRect(x, y + 15, col_width, 10);

    fill = "#ffffff";
    // draw insert length
    if (in_length > 9) {
      fill = '#d7301f';
    } else if (in_length > 7) {
      fill = '#fc8d59';
    } else if (in_length > 4) {
      fill = '#fdcc8a';
    }
    context.fillStyle = fill;
    context.fillRect(x, y + 30, col_width, 10);
  } else {
    y  = y + 30;
  }

  fill = "#ffffff";
  // draw delete odds
  if (del_odds < 0.75) {
    fill = '#2171b5';
  } else if (del_odds < 0.85) {
    fill = '#6baed6';
  } else if (del_odds < 0.95) {
    fill = '#bdd7e7';
  }
  context.fillStyle = fill;
  context.fillRect(x, y, col_width, 10);
}



},{"./draw/border.js":56,"./draw/column_number.js":57,"./draw/ticks.js":58}],61:[function(require,module,exports){
var draw_border = require("./draw/border.js");
var draw_ticks = require("./draw/ticks.js");
var draw_column_number = require("./draw/column_number.js");

module.exports = function (start, end, context_num, fontsize) {
  var x = 0,
  column_num = start,
  column_label = null,
  i = 0,
  top_height = Math.abs(this.data.max_height),
  bottom_height = (isNaN(this.data.min_height_obs)) ? 0 : parseInt(this.data.min_height_obs, 10),
  total_height = top_height + Math.abs(bottom_height),
  top_percentage    = Math.round((Math.abs(this.data.max_height) * 100) / total_height),
  //convert % to pixels
  top_pix_height = Math.round((this.info_content_height * top_percentage) / 100),
  bottom_pix_height = this.info_content_height - top_pix_height,
  // this is used to transform the 256px high letters into the correct size
  // when displaying negative values, so that they fit above the 0 line.
  top_pix_conversion = top_pix_height / this.info_content_height,
  bottom_pix_conversion = bottom_pix_height / this.info_content_height;

  // add 3 extra columns so that numbers don't get clipped at the end of a canvas
  // that ends before a large column. DF0000830 was suffering at zoom level 0.6,
  // column 2215. This adds a little extra overhead, but is the easiest fix for now.
  if (end + 3 <= this.end) {
    end += 3;
  }

  for (i = start; i <= end; i++) {
    if (this.data.mmline && this.data.mmline[i - 1] === 1) {
      this.contexts[context_num].fillStyle = '#cccccc';
      this.contexts[context_num].fillRect(x, 10, this.zoomed_column, this.height - 40);
    } else {
      var column = this.data.heightArr[i - 1],
      col_positions = [];
      if (column) {
        var previous_height = 0,
        letters = column.length,
        previous_neg_height = top_pix_height,
        j = 0,
        color = null;

        for(var j in column){
          var letter = column[j],
          values = [j,letter];
          x_pos = x + (this.zoomed_column / 2),
          letter_height = null;

          // we don't render anything with a value between 0 and 0.01. These
          // letters would be too small to be meaningful on any scale, so we
          // just squash them out.
          if (values[1] > 0.01) {
            letter_height = parseFloat(values[1]) / this.data.max_height;
            var y_pos = (this.info_content_height - 2) - previous_height,
            glyph_height = (this.info_content_height - 2) * letter_height;

            col_positions[j] = [glyph_height, this.zoomed_column, x_pos, y_pos];
            previous_height = previous_height + glyph_height;
          }
        }

        // render the letters in reverse order so that the larger letters on the top
        // don't clobber the smaller letters below them.
        //for (j = letters; j >= 0; j--) {
        for(var j in column){
          if (col_positions[j] && this.letters[j]) {

            if(this.colorscheme === 'dynamic'){
              color = this.colors.getColor(j, {pos: i - 1} );
            }else{
              if (this.colorscheme === 'consensus') {
                color = this.cmap[i - 1][j] || "#7a7a7a";
              } else {
                color = null;
              }
            }
            this.letters[j].draw(this.contexts[context_num], col_positions[j][0], col_positions[j][1], col_positions[j][2], col_positions[j][3], color);
          }
        }
      }
    }


    // if ali_coordinates exist and toggle is set then display the
    // alignment coordinates and not the model coordinates.
    if (this.display_ali_map) {
      column_label = this.data.ali_map[i - 1];
    } else {
      column_label = column_num;
    }

    if(this.options.show_divider){
      if (this.zoom < 0.7) {
        if (i % this.options.divider_step === 0) {
          draw_column_divider(this,{
            context_num : context_num,
            x : x,
            fontsize: 10,
            column_num: column_label,
            ralign: true
          });
        }
      } else {
        draw_column_divider(this,{
          context_num : context_num,
          x : x,
          fontsize: fontsize,
          column_num: column_label
        });
      }
    }

    if(this.options.show_probs){
      draw_delete_odds(this.contexts[context_num], x, this.height, this.zoomed_column, this.data.delete_probs[i - 1], fontsize, this.show_inserts);
      //draw insert length ticks
      draw_ticks(this.contexts[context_num], x, this.height - 15, 5);
      if (this.show_inserts) {
        draw_insert_odds(this.contexts[context_num], x, this.height, this.zoomed_column, this.data.insert_probs[i - 1], fontsize);
        draw_insert_length(this.contexts[context_num], x, this.height - 5, this.zoomed_column, this.data.insert_lengths[i - 1], fontsize);

        // draw delete probability ticks
        draw_ticks(this.contexts[context_num], x, this.height - 45, 5);
        // draw insert probability ticks
        draw_ticks(this.contexts[context_num], x, this.height - 30, 5);
      }

    }

    x += this.zoomed_column;
    column_num++;
  }


  if(this.options.show_probs){
    // draw other dividers
    if (this.show_inserts) {
      draw_border(this.contexts[context_num], this.height - 30, this.total_width);
      draw_border(this.contexts[context_num], this.height - 45, this.total_width);
    }
    draw_border(this.contexts[context_num], this.height - 15, this.total_width);
  }
  if(this.options.border){
    draw_border(this.contexts[context_num], 0, this.total_width);
  }
};


function draw_delete_odds(context, x, height, col_width, text, fontsize, show_inserts) {
  var y        = height - 4,
  fill     = '#ffffff',
  textfill = '#555555';

  if (show_inserts) {
    y = height - 35;
  }

  if (text < 0.75) {
    fill     = '#2171b5';
    textfill = '#ffffff';
  } else if (text < 0.85) {
    fill = '#6baed6';
  } else if (text < 0.95) {
    fill = '#bdd7e7';
  }

  draw_rect_with_text(context, x, y, text, fontsize, col_width, fill, textfill);
}

function draw_rect_with_text(context, x, y, text, fontsize, col_width, fill, textfill) {
  context.font = fontsize + "px Arial";
  context.fillStyle = fill;
  context.fillRect(x, y - 10, col_width, 14);
  context.textAlign = "center";
  context.fillStyle = textfill;
  context.fillText(text, x + (col_width / 2), y);
}

function draw_column_divider(inst, opts) {
  var div_x = opts.ralign ? opts.x + inst.zoomed_column : opts.x,
  num_x = opts.ralign ? opts.x + 2 : opts.x;
  // draw column dividers
  draw_ticks(inst.contexts[opts.context_num], div_x, inst.height - 30, -30 - inst.height, '#dddddd');
  // draw top ticks
  draw_ticks(inst.contexts[opts.context_num], div_x, 0, 5);
  // draw column numbers
  draw_column_number(inst.contexts[opts.context_num], num_x, 10, inst.zoomed_column, opts.column_num, opts.fontsize, opts.ralign);
};



function draw_insert_odds(context, x, height, col_width, text, fontsize) {
  var y        = height - 20,
  fill     = '#ffffff',
  textfill = '#555555';

  if (text > 0.1) {
    fill     = '#d7301f';
    textfill = '#ffffff';
  } else if (text > 0.05) {
    fill = '#fc8d59';
  } else if (text > 0.03) {
    fill = '#fdcc8a';
  }

  draw_rect_with_text(context, x, y, text, fontsize, col_width, fill, textfill);

  //draw vertical line to indicate where the insert would occur
  if (text > 0.03) {
    draw_ticks(context, x + col_width, height - 30, -30 - height, fill);
  }
}
function draw_insert_length(context, x, y, col_width, text, fontsize) {
  var fill = '#ffffff',
  textfill = '#555555';

  if (text > 9) {
    fill     = '#d7301f';
    textfill = '#ffffff';
  } else if (text > 7) {
    fill = '#fc8d59';
  } else if (text > 4) {
    fill = '#fdcc8a';
  }
  draw_rect_with_text(context, x, y, text, fontsize, col_width, fill, textfill);
}

},{"./draw/border.js":56,"./draw/column_number.js":57,"./draw/ticks.js":58}],62:[function(require,module,exports){
/*
 * JavaScript Canvas to Blob 2.0.5
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on stackoverflow user Stoive's code snippet:
 * http://stackoverflow.com/q/4998908
 */
var CanvasPrototype = window.HTMLCanvasElement &&
window.HTMLCanvasElement.prototype,
  hasBlobConstructor = window.Blob && (function () {
    try {
      return Boolean(new Blob());
    } catch (e) {
      return false;
    }
  }()),
  hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array &&
  (function () {
    try {
      return new Blob([new Uint8Array(100)]).size === 100;
    } catch (e) {
      return false;
    }
  }()),
  BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
  window.MozBlobBuilder || window.MSBlobBuilder,
  dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window.atob &&
  window.ArrayBuffer && window.Uint8Array && function (dataURI) {
    var byteString,
    arrayBuffer,
    intArray,
      i,
      mimeString,
        bb;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      // Convert base64 to raw binary data held in a string:
      byteString = atob(dataURI.split(',')[1]);
    } else {
      // Convert base64/URLEncoded data component to raw binary data:
      byteString = decodeURIComponent(dataURI.split(',')[1]);
    }
    // Write the bytes of the string to an ArrayBuffer:
    arrayBuffer = new ArrayBuffer(byteString.length);
    intArray = new Uint8Array(arrayBuffer);
    for (i = 0; i < byteString.length; i += 1) {
      intArray[i] = byteString.charCodeAt(i);
    }
    // Separate out the mime component:
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // Write the ArrayBuffer (or ArrayBufferView) to a blob:
    if (hasBlobConstructor) {
      return new Blob(
          [hasArrayBufferViewSupport ? intArray : arrayBuffer],
          {type: mimeString}
          );
    }
    bb = new BlobBuilder();
    bb.append(arrayBuffer);
    return bb.getBlob(mimeString);
  };
if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
  if (CanvasPrototype.mozGetAsFile) {
    CanvasPrototype.toBlob = function (callback, type, quality) {
      if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
        callback(dataURLtoBlob(this.toDataURL(type, quality)));
      } else {
        callback(this.mozGetAsFile('blob', type));
      }
    };
  } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
    CanvasPrototype.toBlob = function (callback, type, quality) {
      callback(dataURLtoBlob(this.toDataURL(type, quality)));
    };
  }
}

module.exports = dataURLtoBlob;

},{}],63:[function(require,module,exports){
/* FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-05-27
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" &&
	    /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = !view.externalHost && "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		, deletion_queue = []
		, process_deletion_queue = function() {
			var i = deletion_queue.length;
			while (i--) {
				var file = deletion_queue[i];
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			}
			deletion_queue.length = 0; // clear queue
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url;
				}
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_object_url(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						window.open(object_url, "_blank");
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_object_url(blob);
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	view.addEventListener("unload", process_deletion_queue, false);
	saveAs.unload = function() {
		process_deletion_queue();
		view.removeEventListener("unload", process_deletion_queue, false);
	};
	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

amdDefine = window.define;
if( typeof amdDefine === "undefined" && (typeof window.almond !== "undefined"
    && "define" in window.almond )){
  amdDefine = window.almond.define;
}

if (typeof module !== "undefined" && module !== null) {
  module.exports = saveAs;
} else if ((typeof amdDefine !== "undefined" && amdDefine !== null) && (amdDefine.amd != null)) {
  amdDefine("saveAs",[], function() {
    return saveAs;
  });
}

},{}],64:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],65:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],66:[function(require,module,exports){
var Utils = {};


/*
Remove an element and provide a function that inserts it into its original position
https://developers.google.com/speed/articles/javascript-dom
@param element {Element} The element to be temporarily removed
@return {Function} A function that inserts the element into its original position
 */

Utils.removeToInsertLater = function(element) {
  var nextSibling, parentNode;
  parentNode = element.parentNode;
  nextSibling = element.nextSibling;
  parentNode.removeChild(element);
  return function() {
    if (nextSibling) {
      parentNode.insertBefore(element, nextSibling);
    } else {
      parentNode.appendChild(element);
    }
  };
};


/*
fastest possible way to destroy all sub nodes (aka childs)
http://jsperf.com/innerhtml-vs-removechild/15
@param element {Element} The element for which all childs should be removed
 */

Utils.removeAllChilds = function(element) {
  var count;
  count = 0;
  while (element.firstChild) {
    count++;
    element.removeChild(element.firstChild);
  }
};

module.exports = Utils;

},{}],67:[function(require,module,exports){
/*!
 * jBone v1.0.24 - 2015-03-30 - Library for DOM manipulation
 *
 * https://github.com/kupriyanenko/jbone
 *
 * Copyright 2015 Alexey Kupriyanenko
 * Released under the MIT license.
 */

(function (win) {

var
// cache previous versions
_$ = win.$,
_jBone = win.jBone,

// Quick match a standalone tag
rquickSingleTag = /^<(\w+)\s*\/?>$/,

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash
rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

// Alias for function
slice = [].slice,
splice = [].splice,
keys = Object.keys,

// Alias for global variables
doc = document,

isString = function(el) {
    return typeof el === "string";
},
isObject = function(el) {
    return el instanceof Object;
},
isFunction = function(el) {
    return ({}).toString.call(el) === "[object Function]";
},
isArray = function(el) {
    return Array.isArray(el);
},
jBone = function(element, data) {
    return new fn.init(element, data);
},
fn;

// set previous values and return the instance upon calling the no-conflict mode
jBone.noConflict = function() {
    win.$ = _$;
    win.jBone = _jBone;

    return jBone;
};

fn = jBone.fn = jBone.prototype = {
    init: function(element, data) {
        var elements, tag, wraper, fragment;

        if (!element) {
            return this;
        }
        if (isString(element)) {
            // Create single DOM element
            if (tag = rquickSingleTag.exec(element)) {
                this[0] = doc.createElement(tag[1]);
                this.length = 1;

                if (isObject(data)) {
                    this.attr(data);
                }

                return this;
            }
            // Create DOM collection
            if ((tag = rquickExpr.exec(element)) && tag[1]) {
                fragment = doc.createDocumentFragment();
                wraper = doc.createElement("div");
                wraper.innerHTML = element;
                while (wraper.lastChild) {
                    fragment.appendChild(wraper.firstChild);
                }
                elements = slice.call(fragment.childNodes);

                return jBone.merge(this, elements);
            }
            // Find DOM elements with querySelectorAll
            if (jBone.isElement(data)) {
                return jBone(data).find(element);
            }

            try {
                elements = doc.querySelectorAll(element);

                return jBone.merge(this, elements);
            } catch (e) {
                return this;
            }
        }
        // Wrap DOMElement
        if (element.nodeType) {
            this[0] = element;
            this.length = 1;

            return this;
        }
        // Run function
        if (isFunction(element)) {
            return element();
        }
        // Return jBone element as is
        if (element instanceof jBone) {
            return element;
        }

        // Return element wrapped by jBone
        return jBone.makeArray(element, this);
    },

    pop: [].pop,
    push: [].push,
    reverse: [].reverse,
    shift: [].shift,
    sort: [].sort,
    splice: [].splice,
    slice: [].slice,
    indexOf: [].indexOf,
    forEach: [].forEach,
    unshift: [].unshift,
    concat: [].concat,
    join: [].join,
    every: [].every,
    some: [].some,
    filter: [].filter,
    map: [].map,
    reduce: [].reduce,
    reduceRight: [].reduceRight,
    length: 0
};

fn.constructor = jBone;

fn.init.prototype = fn;

jBone.setId = function(el) {
    var jid = el.jid;

    if (el === win) {
        jid = "window";
    } else if (el.jid === undefined) {
        el.jid = jid = ++jBone._cache.jid;
    }

    if (!jBone._cache.events[jid]) {
        jBone._cache.events[jid] = {};
    }
};

jBone.getData = function(el) {
    el = el instanceof jBone ? el[0] : el;

    var jid = el === win ? "window" : el.jid;

    return {
        jid: jid,
        events: jBone._cache.events[jid]
    };
};

jBone.isElement = function(el) {
    return el && el instanceof jBone || el instanceof HTMLElement || isString(el);
};

jBone._cache = {
    events: {},
    jid: 0
};

function isArraylike(obj) {
    var length = obj.length,
        type = typeof obj;

    if (isFunction(type) || obj === win) {
        return false;
    }

    if (obj.nodeType === 1 && length) {
        return true;
    }

    return isArray(type) || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}

fn.pushStack = function(elems) {
    var ret = jBone.merge(this.constructor(), elems);

    return ret;
};

jBone.merge = function(first, second) {
    var l = second.length,
        i = first.length,
        j = 0;

    while (j < l) {
        first[i++] = second[j++];
    }

    first.length = i;

    return first;
};

jBone.contains = function(container, contained) {
    var result;

    container.reverse().some(function(el) {
        if (el.contains(contained)) {
            return result = el;
        }
    });

    return result;
};

jBone.extend = function(target) {
    var tg;

    splice.call(arguments, 1).forEach(function(source) {
        tg = target; //caching target for perf improvement

        if (source) {
            for (var prop in source) {
                tg[prop] = source[prop];
            }
        }
    });

    return target;
};

jBone.makeArray = function(arr, results) {
    var ret = results || [];

    if (arr !== null) {
        if (isArraylike(arr)) {
            jBone.merge(ret, isString(arr) ? [arr] : arr);
        } else {
            ret.push(arr);
        }
    }

    return ret;
};

jBone.unique = function(array) {
    if (array == null) {
        return [];
    }

    var result = [];

    for (var i = 0, length = array.length; i < length; i++) {
        var value = array[i];
        if (result.indexOf(value) < 0) {
            result.push(value);
        }
    }
    return result;
};

function BoneEvent(e, data) {
    var key, setter;

    this.originalEvent = e;

    setter = function(key, e) {
        if (key === "preventDefault") {
            this[key] = function() {
                this.defaultPrevented = true;
                return e[key]();
            };
        } else if (key === "stopImmediatePropagation") {
            this[key] = function() {
                this.immediatePropagationStopped = true;
                return e[key]();
            };
        } else if (isFunction(e[key])) {
            this[key] = function() {
                return e[key]();
            };
        } else {
            this[key] = e[key];
        }
    };

    for (key in e) {
        if (e[key] || typeof e[key] === "function") {
            setter.call(this, key, e);
        }
    }

    jBone.extend(this, data, {
        isImmediatePropagationStopped: function() {
            return !!this.immediatePropagationStopped;
        }
    });
}

jBone.Event = function(event, data) {
    var namespace, eventType;

    if (event.type && !data) {
        data = event;
        event = event.type;
    }

    namespace = event.split(".").splice(1).join(".");
    eventType = event.split(".")[0];

    event = doc.createEvent("Event");
    event.initEvent(eventType, true, true);

    return jBone.extend(event, {
        namespace: namespace,
        isDefaultPrevented: function() {
            return event.defaultPrevented;
        }
    }, data);
};

jBone.event = {
    add: function(el, types, handler, data, selector) {
        var eventHandler = function() {
                jBone.event.dispatch.apply(el, arguments);
            },
            events, eventType, t, event;

        jBone.setId(el);
        events = jBone.getData(el).events;

        types = types.split(" ");
        t = types.length;
        while (t--) {
            event = types[t];

            eventType = event.split(".")[0];
            events[eventType] = events[eventType] || [];

            if (!events[eventType].length) {
                el.addEventListener && el.addEventListener(eventType, eventHandler, false);
            }

            events[eventType].push({
                namespace: event.split(".").splice(1).join("."),
                fn: eventHandler,
                selector: selector,
                data: data,
                originfn: handler
            });
        }
    },

    dispatch: function(e) {
        var i = 0,
            el = this,
            handlerQueue = jBone.getData(el).events[e.type],
            length = handlerQueue.length,
            expectedTarget,
            handler,
            event,
            eventOptions;

        for (; i < length; i++) {
            eventOptions = {};
            handler = handlerQueue[i];
            handler.data && (eventOptions.data = handler.data);

            if (event && event.isImmediatePropagationStopped()) {
                return;
            }

            if (!handler.selector) {
                event = new BoneEvent(e, eventOptions);

                if (!(e.namespace && e.namespace !== handler.namespace)) {
                    handler.originfn.call(el, event);
                }
            } else if (~jBone(el).find(handler.selector).indexOf(e.target) || (expectedTarget = jBone.contains(jBone(el).find(handler.selector), e.target))) {
                expectedTarget = expectedTarget || e.target;
                eventOptions.currentTarget = expectedTarget;
                event = new BoneEvent(e, eventOptions);

                if (!(e.namespace && e.namespace !== handler.namespace)) {
                    handler.originfn.call(expectedTarget, event);
                }
            }
        }
    }
};

fn.on = function(types) {
    var args = arguments,
        length = this.length,
        i = 0,
        handler = slice.call(args, -1)[0],
        selector, data;

    // .on('click', '.selector', function() {})
    if (args.length === 3 && isString(args[1])) {
        selector = args[1];
    }
    // .on('click', { key: value }, function() {})
    else if (args.length === 3 && isObject(args[1])) {
        data = args[1];
    }
    // .on('click', '.selector', { key: value }, function() {})
    else if (args.length === 4) {
        selector = args[1];
        data = args[2];
    }

    for (; i < length; i++) {
        jBone.event.add(this[i], types, handler, data, selector);
    }

    return this;
};

fn.one = function(event) {
    var args = arguments,
        i = 0,
        length = this.length,
        oneArgs = slice.call(args, 1, args.length - 1),
        callback = slice.call(args, -1)[0],
        addListener;

    addListener = function(el) {
        var $el =  jBone(el);

        event.split(" ").forEach(function(event) {
            var fn = function(e) {
                $el.off(event, fn);
                callback.call(el, e);
            };

            $el.on.apply($el, [event].concat(oneArgs, fn));
        });
    };

    for (; i < length; i++) {
        addListener(this[i]);
    }

    return this;
};

fn.trigger = function(event) {
    var events = [],
        i = 0,
        length = this.length,
        dispatchEvents;

    if (!event) {
        return this;
    }

    if (isString(event)) {
        events = event.split(" ").map(function(event) {
            return jBone.Event(event);
        });
    } else {
        event = event instanceof Event ? event : jBone.Event(event);
        events = [event];
    }

    dispatchEvents = function(el) {
        events.forEach(function(event) {
            if (!event.type) {
                return;
            }

            el.dispatchEvent && el.dispatchEvent(event);
        });
    };

    for (; i < length; i++) {
        dispatchEvents(this[i]);
    }

    return this;
};

fn.off = function(event, fn) {
    var i = 0,
        length = this.length,
        removeListener = function(events, eventType, index, el, e) {
            var callback;

            // get callback
            if ((fn && e.originfn === fn) || !fn) {
                callback = e.fn;
            }

            if (events[eventType][index].fn === callback) {
                el.removeEventListener(eventType, callback);

                // remove handler from cache
                jBone._cache.events[jBone.getData(el).jid][eventType].splice(index, 1);
            }
        },
        events, namespace, removeListeners, eventType;

    removeListeners = function(el) {
        var l, eventsByType, e;

        events = jBone.getData(el).events;

        if (!events) {
            return;
        }

        // remove all events
        if (!event && events) {
            return keys(events).forEach(function(eventType) {
                eventsByType = events[eventType];
                l = eventsByType.length;

                while(l--) {
                    removeListener(events, eventType, l, el, eventsByType[l]);
                }
            });
        }

        event.split(" ").forEach(function(event) {
            eventType = event.split(".")[0];
            namespace = event.split(".").splice(1).join(".");

            // remove named events
            if (events[eventType]) {
                eventsByType = events[eventType];
                l = eventsByType.length;

                while(l--) {
                    e = eventsByType[l];
                    if (!namespace || (namespace && e.namespace === namespace)) {
                        removeListener(events, eventType, l, el, e);
                    }
                }
            }
            // remove all namespaced events
            else if (namespace) {
                keys(events).forEach(function(eventType) {
                    eventsByType = events[eventType];
                    l = eventsByType.length;

                    while(l--) {
                        e = eventsByType[l];
                        if (e.namespace.split(".")[0] === namespace.split(".")[0]) {
                            removeListener(events, eventType, l, el, e);
                        }
                    }
                });
            }
        });
    };

    for (; i < length; i++) {
        removeListeners(this[i]);
    }

    return this;
};

fn.find = function(selector) {
    var results = [],
        i = 0,
        length = this.length,
        finder = function(el) {
            if (isFunction(el.querySelectorAll)) {
                [].forEach.call(el.querySelectorAll(selector), function(found) {
                    results.push(found);
                });
            }
        };

    for (; i < length; i++) {
        finder(this[i]);
    }

    return jBone(results);
};

fn.get = function(index) {
    return index != null ?

        // Return just the one element from the set
        (index < 0 ? this[index + this.length] : this[index]) :

        // Return all the elements in a clean array
        slice.call(this);
};

fn.eq = function(index) {
    return jBone(this[index]);
};

fn.parent = function() {
    var results = [],
        parent,
        i = 0,
        length = this.length;

    for (; i < length; i++) {
        if (!~results.indexOf(parent = this[i].parentElement) && parent) {
            results.push(parent);
        }
    }

    return jBone(results);
};

fn.toArray = function() {
    return slice.call(this);
};

fn.is = function() {
    var args = arguments;

    return this.some(function(el) {
        return el.tagName.toLowerCase() === args[0];
    });
};

fn.has = function() {
    var args = arguments;

    return this.some(function(el) {
        return el.querySelectorAll(args[0]).length;
    });
};

fn.add = function(selector, context) {
    return this.pushStack(
        jBone.unique(
            jBone.merge(this.get(), jBone(selector, context))
        )
    );
};

fn.attr = function(key, value) {
    var args = arguments,
        i = 0,
        length = this.length,
        setter;

    if (isString(key) && args.length === 1) {
        return this[0] && this[0].getAttribute(key);
    }

    if (args.length === 2) {
        setter = function(el) {
            el.setAttribute(key, value);
        };
    } else if (isObject(key)) {
        setter = function(el) {
            keys(key).forEach(function(name) {
                el.setAttribute(name, key[name]);
            });
        };
    }

    for (; i < length; i++) {
        setter(this[i]);
    }

    return this;
};

fn.removeAttr = function(key) {
    var i = 0,
        length = this.length;

    for (; i < length; i++) {
        this[i].removeAttribute(key);
    }

    return this;
};

fn.val = function(value) {
    var i = 0,
        length = this.length;

    if (arguments.length === 0) {
        return this[0] && this[0].value;
    }

    for (; i < length; i++) {
        this[i].value = value;
    }

    return this;
};

fn.css = function(key, value) {
    var args = arguments,
        i = 0,
        length = this.length,
        setter;

    // Get attribute
    if (isString(key) && args.length === 1) {
        return this[0] && win.getComputedStyle(this[0])[key];
    }

    // Set attributes
    if (args.length === 2) {
        setter = function(el) {
            el.style[key] = value;
        };
    } else if (isObject(key)) {
        setter = function(el) {
            keys(key).forEach(function(name) {
                el.style[name] = key[name];
            });
        };
    }

    for (; i < length; i++) {
        setter(this[i]);
    }

    return this;
};

fn.data = function(key, value) {
    var args = arguments, data = {},
        i = 0,
        length = this.length,
        setter,
        setValue = function(el, key, value) {
            if (isObject(value)) {
                el.jdata = el.jdata || {};
                el.jdata[key] = value;
            } else {
                el.dataset[key] = value;
            }
        },
        getValue = function(value) {
            if (value === "true") {
                return true;
            } else if (value === "false") {
                return false;
            } else {
                return value;
            }
        };

    // Get all data
    if (args.length === 0) {
        this[0].jdata && (data = this[0].jdata);

        keys(this[0].dataset).forEach(function(key) {
            data[key] = getValue(this[0].dataset[key]);
        }, this);

        return data;
    }
    // Get data by name
    if (args.length === 1 && isString(key)) {
        return this[0] && getValue(this[0].dataset[key] || this[0].jdata && this[0].jdata[key]);
    }

    // Set data
    if (args.length === 1 && isObject(key)) {
        setter = function(el) {
            keys(key).forEach(function(name) {
                setValue(el, name, key[name]);
            });
        };
    } else if (args.length === 2) {
        setter = function(el) {
            setValue(el, key, value);
        };
    }

    for (; i < length; i++) {
        setter(this[i]);
    }

    return this;
};

fn.removeData = function(key) {
    var i = 0,
        length = this.length,
        jdata, dataset;

    for (; i < length; i++) {
        jdata = this[i].jdata;
        dataset = this[i].dataset;

        if (key) {
            jdata && jdata[key] && delete jdata[key];
            delete dataset[key];
        } else {
            for (key in jdata) {
                delete jdata[key];
            }

            for (key in dataset) {
                delete dataset[key];
            }
        }
    }

    return this;
};

fn.addClass = function(className) {
    var i = 0,
        j = 0,
        length = this.length,
        classes = className.trim().split(/\s+/);

    for (; i < length; i++) {
        j = 0;

        for (j = 0; j < classes.length; j++) {
            this[i].classList.add(classes[j]);
        }
    }

    return this;
};

fn.removeClass = function(className) {
    var i = 0,
        j = 0,
        length = this.length,
        classes = className.trim().split(/\s+/);

    for (; i < length; i++) {
        j = 0;

        for (j = 0; j < classes.length; j++) {
            this[i].classList.remove(classes[j]);
        }
    }

    return this;
};

fn.toggleClass = function(className, force) {
    var i = 0,
        length = this.length,
        method = "toggle";

    force === true && (method = "add") || force === false && (method = "remove");

    for (; i < length; i++) {
        this[i].classList[method](className);
    }

    return this;
};

fn.hasClass = function(className) {
    var i = 0, length = this.length;

    for (; i < length; i++) {
        if (this[i].classList.contains(className)) {
            return true;
        }
    }

    return false;
};

fn.html = function(value) {
    var args = arguments,
        el;

    // add HTML into elements
    if (args.length === 1 && value !== undefined) {
        return this.empty().append(value);
    }
    // get HTML from element
    else if (args.length === 0 && (el = this[0])) {
        return el.innerHTML;
    }

    return this;
};

fn.append = function(appended) {
    var i = 0,
        length = this.length,
        setter;

    // create jBone object and then append
    if (isString(appended) && rquickExpr.exec(appended)) {
        appended = jBone(appended);
    }
    // create text node for inserting
    else if (!isObject(appended)) {
        appended = document.createTextNode(appended);
    }

    appended = appended instanceof jBone ? appended : jBone(appended);

    setter = function(el, i) {
        appended.forEach(function(node) {
            if (i) {
                el.appendChild(node.cloneNode(true));
            } else {
                el.appendChild(node);
            }
        });
    };

    for (; i < length; i++) {
        setter(this[i], i);
    }

    return this;
};

fn.appendTo = function(to) {
    jBone(to).append(this);

    return this;
};

fn.empty = function() {
    var i = 0,
        length = this.length,
        el;

    for (; i < length; i++) {
        el = this[i];

        while (el.lastChild) {
            el.removeChild(el.lastChild);
        }
    }

    return this;
};

fn.remove = function() {
    var i = 0,
        length = this.length,
        el;

    // remove all listners
    this.off();

    for (; i < length; i++) {
        el = this[i];

        // remove data and nodes
        delete el.jdata;
        el.parentNode && el.parentNode.removeChild(el);
    }

    return this;
};

if (typeof module === "object" && module && typeof module.exports === "object") {
    // Expose jBone as module.exports in loaders that implement the Node
    // module pattern (including browserify). Do not create the global, since
    // the user will be storing it themselves locally, and globals are frowned
    // upon in the Node module world.
    module.exports = jBone;
}
// Register as a AMD module
else if (typeof define === "function" && define.amd) {
    define(function() {
        return jBone;
    });

    win.jBone = win.$ = jBone;
} else if (typeof win === "object" && typeof win.document === "object") {
    win.jBone = win.$ = jBone;
}

}(window));

},{}],68:[function(require,module,exports){
var koalajs = {};

// pass an alternative default value
koalajs.d = koalajs.defaultValue = function defaultValue(obj, defValue) {
  if (obj === undefined) {
    if (typeof obj === "function") {
      return defValue();
    }
    return defValue;
  }
  return obj;
};

// alias for getElementById
koalajs.id = function mk(el) {
  return document.getElementById(el);
};

// alias for createElement
koalajs.mk = function mk(el) {
  return document.createElement(el);
};

if (module !== undefined && module.exports !== undefined) {
  module.exports = koalajs;
}

},{}],69:[function(require,module,exports){
module.exports = require("./lib/menubuilder");

},{"./lib/menubuilder":70}],70:[function(require,module,exports){
var MenuBuilder, jbone, view;

jbone = require("jbone");
view = require("backbone-viewj");

module.exports = MenuBuilder = view.extend({
  initialize: function(opts) {
    this._nodes = [];
    this.name = opts.name || "";
    this.el.className += "smenubar";
  },
  render: function() {

    // remove all childs
    var fc = this.el.firstChild;
    while (fc) {
      this.el.removeChild(fc);
      fc = this.el.firstChild;
    }

    // replace child
    this.el.appendChild(this.buildDOM());
  },
  setName: function(name) {
    this.name = name;
  },
  addNode: function(label, callback, opts) {
    var style;
    if (opts != null) {
      style = opts.style;
    }
    if (this._nodes == null) {
      this._nodes = [];
    }
    this._nodes.push({
      label: label,
      callback: callback,
      style: style
    });
  },

  getNode: function(label) {
    var rNode = undefined;
    this._nodes.forEach(function(el) {
      if (el.label === label) {
        rNode = el;
      }
    });
    return rNode;
  },

  modifyNode: function(label, callback, opts) {
    var node = this.getNode(label);
    node.callback = callback || node.callback;
    opts = opts || {};
    node.style = opts.style || node.style;
  },

  renameNode: function(label, newLabel) {
    var node = this.getNode(label);
    node.label = newLabel || node.label;
  },

  removeNode: function(label) {
    var node = this.getNode(label);
    this._nodes.splice(this._nodes.indexOf(node), 1);
  },

  removeAllNodes: function() {
    this._nodes = [];
  },

  buildDOM: function() {
    var span = document.createElement("span");
    span.appendChild(this._buildM({
      nodes: this._nodes,
      name: this.name
    }));
    return span;
  },
  _buildM: function(data) {
    var displayedButton, frag, key, li, node, style, _ref;
    var nodes = data.nodes;
    var name = data.name;
    var menu = document.createElement("div");
    menu.className = "smenu-dropdown smenu-dropdown-tip";
    menu.style.display = "none";

    var menuUl = document.createElement("ul");
    menuUl.className = "smenu-dropdown-menu";

    // currently we support one-level
    for (var i = 0, _len = nodes.length; i < _len; i++) {
      node = nodes[i];
      li = document.createElement("li");
      li.textContent = node.label;
      _ref = node.style;
      for (key in _ref) {
        style = _ref[key];
        li.style[key] = style;
      }
      li.addEventListener("click", node.callback);
      this.trigger("new:node", li);
      menuUl.appendChild(li);
    }
    this.trigger("new:menu", menuUl);
    menu.appendChild(menuUl);

    displayedButton = document.createElement("a");
    displayedButton.textContent = name;
    displayedButton.className = "smenubar_alink";
    this.trigger("new:button", displayedButton);

    // HACK to be able to hide the submenu
    // listens globally for click events
    jbone(displayedButton).on("click", (function(_this) {
      return function(e) {
        _this._showMenu(e, menu, displayedButton);
        return window.setTimeout(function() {
          return jbone(document.body).one("click", function(e) {
            return menu.style.display = "none";
          });
        }, 5);
      };
    })(this));

    frag = document.createDocumentFragment();
    frag.appendChild(menu);
    frag.appendChild(displayedButton);
    return frag;
  },

  // internal method to display the lower menu on a click
  _showMenu: function(e, menu, target) {
    var rect;
    menu.style.display = "block";
    menu.style.position = "absolute";
    rect = target.getBoundingClientRect();
    menu.style.left = rect.left + "px";
    menu.style.top = (rect.top + target.offsetHeight) + "px";
  }
});

},{"backbone-viewj":9,"jbone":67}],71:[function(require,module,exports){
var Mouse;

module.exports = Mouse = {
  rel: function(e) {
    var mouseX, mouseY, rect, target;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    if (mouseX == undefined) {
      rect = target.getBoundingClientRect();
      target = e.target || e.srcElement;
      if (mouseX == undefined) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }
      if (mouseX == undefined) {
        mouseX = e.pageX - target.offsetLeft;
        mouseY = e.pageY - target.offsetTop;
      }
      if (mouseX == undefined) {
        console.log(e, "no mouse event defined. your browser sucks");
        return;
      }
    }
    return [mouseX, mouseY];
  },
  abs: function(e) {
    var mouseX, mouseY;
    mouseX = e.pageX;
    mouseY = e.pageY;
    if (mouseX == undefined) {
      mouseX = e.layerX;
      mouseY = e.layerY;
    }
    if (mouseX == undefined) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    if (mouseX == undefined) {
      mouseX = e.x;
      mouseY = e.y;
    }
    return [mouseX, mouseY];
  },
  wheelDelta: function(e) {
    var delta;
    delta = [e.deltaX, e.deltaY];
    if (delta[0] == undefined) {
      // in case there is a more detailed scroll sensor - use it
      if (e.mozMovementX) {
        delta = [0, e.mozMovementX];
      }
    }
    // safety first
    if (isNaN(delta[0])) {
      delta[0] = 0;
    }
    if (isNaN(delta[1])) {
      delta[1] = 0;
    }
    return delta;
  }
};

},{}],72:[function(require,module,exports){
module.exports = {
  A: "#00a35c",
  R: "#00fc03",
  N: "#00eb14",
  D: "#00eb14",
  C: "#0000ff",
  Q: "#00f10e",
  E: "#00f10e",
  G: "#009d62",
  H: "#00d52a",
  I: "#0054ab",
  L: "#007b84",
  K: "#00ff00",
  M: "#009768",
  F: "#008778",
  P: "#00e01f",
  S: "#00d52a",
  T: "#00db24",
  W: "#00a857",
  Y: "#00e619",
  V: "#005fa0",
  B: "#00eb14",
  X: "#00b649",
  Z: "#00f10e"
};

},{}],73:[function(require,module,exports){
module.exports = {
  A: "#BBBBBB",
  B: "grey",
  C: "yellow",
  D: "red",
  E: "red",
  F: "magenta",
  G: "brown",
  H: "#00FFFF",
  I: "#BBBBBB",
  J: "#fff",
  K: "#00FFFF",
  L: "#BBBBBB",
  M: "#BBBBBB",
  N: "green",
  O: "#fff",
  P: "brown",
  Q: "green",
  R: "#00FFFF",
  S: "green",
  T: "green",
  U: "#fff",
  V: "#BBBBBB",
  W: "magenta",
  X: "grey",
  Y: "magenta",
  Z: "grey",
  Gap: "grey"
};

},{}],74:[function(require,module,exports){
module.exports = {
  A: "orange",
  B: "#fff",
  C: "green",
  D: "red",
  E: "red",
  F: "blue",
  G: "orange",
  H: "red",
  I: "green",
  J: "#fff",
  K: "red",
  L: "green",
  M: "green",
  N: "#fff",
  O: "#fff",
  P: "orange",
  Q: "#fff",
  R: "red",
  S: "orange",
  T: "orange",
  U: "#fff",
  V: "green",
  W: "blue",
  X: "#fff",
  Y: "blue",
  Z: "#fff",
  Gap: "#fff"
};

},{}],75:[function(require,module,exports){
module.exports = {
  A: "#80a0f0",
  R: "#f01505",
  N: "#00ff00",
  D: "#c048c0",
  C: "#f08080",
  Q: "#00ff00",
  E: "#c048c0",
  G: "#f09048",
  H: "#15a4a4",
  I: "#80a0f0",
  L: "#80a0f0",
  K: "#f01505",
  M: "#80a0f0",
  F: "#80a0f0",
  P: "#ffff00",
  S: "#00ff00",
  T: "#00ff00",
  W: "#80a0f0",
  Y: "#15a4a4",
  V: "#80a0f0",
  B: "#fff",
  X: "#fff",
  Z: "#fff"
};

},{}],76:[function(require,module,exports){
module.exports = {
  A: "#e718e7",
  R: "#6f906f",
  N: "#1be41b",
  D: "#778877",
  C: "#23dc23",
  Q: "#926d92",
  E: "#ff00ff",
  G: "#00ff00",
  H: "#758a75",
  I: "#8a758a",
  L: "#ae51ae",
  K: "#a05fa0",
  M: "#ef10ef",
  F: "#986798",
  P: "#00ff00",
  S: "#36c936",
  T: "#47b847",
  W: "#8a758a",
  Y: "#21de21",
  V: "#857a85",
  B: "#49b649",
  X: "#758a75",
  Z: "#c936c9"
};

},{}],77:[function(require,module,exports){
module.exports = {
  A: "#ad0052",
  B: "#0c00f3",
  C: "#c2003d",
  D: "#0c00f3",
  E: "#0c00f3",
  F: "#cb0034",
  G: "#6a0095",
  H: "#1500ea",
  I: "#ff0000",
  J: "#fff",
  K: "#0000ff",
  L: "#ea0015",
  M: "#b0004f",
  N: "#0c00f3",
  O: "#fff",
  P: "#4600b9",
  Q: "#0c00f3",
  R: "#0000ff",
  S: "#5e00a1",
  T: "#61009e",
  U: "#fff",
  V: "#f60009",
  W: "#5b00a4",
  X: "#680097",
  Y: "#4f00b0",
  Z: "#0c00f3"
};

},{}],78:[function(require,module,exports){
var schemes = require("./schemeclass");
var StaticSchemeClass = schemes.stat;
var DynSchemeClass = schemes.dyn;

var Buried = require("./buried");
var Cinema = require("./cinema");
var Clustal = require("./clustal");
var Clustal2 = require("./clustal2");
var Helix = require("./helix");
var Hydro = require("./hydrophobicity");
var Lesk = require("./lesk");
var Mae = require("./mae");
var Nucleotide = require("./nucleotide");
var Purine = require("./purine");
var Strand = require("./strand");
var Taylor = require("./taylor");
var Turn = require("./turn");
var Zappo = require("./zappo");

var staticSchemes = {
  buried: Buried,
  buried_index: Buried,
  cinema: Cinema,
  clustal2: Clustal2,
  clustal: Clustal,
  helix: Helix,
  helix_propensity: Helix,
  hydro: Hydro,
  lesk: Lesk,
  mae: Mae,
  nucleotide: Nucleotide,
  purine: Purine,
  purine_pyrimidine: Purine,
  strand: Strand,
  strand_propensity: Strand,
  taylor: Taylor,
  turn: Turn,
  turn_propensity: Turn,
  zappo: Zappo
};

var pid = require("./pid_colors.js");

var dynSchemes = {
  pid: pid
};

module.exports = Colors = function(opt){
  this.maps = clone(staticSchemes);
  this.dyn = clone(dynSchemes);
  this.opt = opt;
}
Colors.getScheme = function(scheme){
  return staticSchemes[scheme];
}
Colors.prototype.getScheme = function(scheme) {
  var color = this.maps[scheme];
  if (color === undefined) {
    color = {};
    if(this.dyn[scheme] != undefined){
      return new DynSchemeClass(this.dyn[scheme],this.opt);
    }
  }
  return new StaticSchemeClass(color);
};

Colors.prototype.addStaticScheme = function(name,scheme) {
  this.maps[name] = scheme;
}

Colors.prototype.addDynScheme = function(name,scheme) {
  this.dyn[name] = scheme;
}

// small helper to clone an object
function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

},{"./buried":72,"./cinema":73,"./clustal":74,"./clustal2":75,"./helix":76,"./hydrophobicity":77,"./lesk":79,"./mae":80,"./nucleotide":81,"./pid_colors.js":82,"./purine":83,"./schemeclass":84,"./strand":85,"./taylor":86,"./turn":87,"./zappo":88}],79:[function(require,module,exports){
module.exports = {
  A: " orange",
  B: " #fff",
  C: " green",
  D: " red",
  E: " red",
  F: " green",
  G: " orange",
  H: " magenta",
  I: " green",
  J: " #fff",
  K: " red",
  L: " green",
  M: " green",
  N: " magenta",
  O: " #fff",
  P: " green",
  Q: " magenta",
  R: " red",
  S: " orange",
  T: " orange",
  U: " #fff",
  V: " green",
  W: " green",
  X: " #fff",
  Y: " green",
  Z: " #fff",
  Gap: " #fff"
};

},{}],80:[function(require,module,exports){
module.exports = {
  A: " #77dd88",
  B: " #fff",
  C: " #99ee66",
  D: " #55bb33",
  E: " #55bb33",
  F: " #9999ff",
  G: " #77dd88",
  H: " #5555ff",
  I: " #66bbff",
  J: " #fff",
  K: " #ffcc77",
  L: " #66bbff",
  M: " #66bbff",
  N: " #55bb33",
  O: " #fff",
  P: " #eeaaaa",
  Q: " #55bb33",
  R: " #ffcc77",
  S: " #ff4455",
  T: " #ff4455",
  U: " #fff",
  V: " #66bbff",
  W: " #9999ff",
  X: " #fff",
  Y: " #9999ff",
  Z: " #fff",
  Gap: " #fff"
};

},{}],81:[function(require,module,exports){
module.exports = {
  A: " #64F73F",
  C: " #FFB340",
  G: " #EB413C",
  T: " #3C88EE",
  U: " #3C88EE"
};

},{}],82:[function(require,module,exports){
var pid;
module.exports = pid = {};

// calculating the conservation is expensive
// we only want to do it once
pid.init = function(){
  this.cons = this.opt.conservation();
}

pid.run = function(letter,opts){
  var cons = this.cons[opts.pos];
  if(cons > 0.8){
    return "#6464ff";
  }else if(cons > 0.6){
    return "#9da5ff";
  }else if(cons > 0.4){
    return "#cccccc";
  }else{
    return "#ffffff";
  }
}

},{}],83:[function(require,module,exports){
module.exports = {
  A: " #FF83FA",
  C: " #40E0D0",
  G: " #FF83FA",
  R: " #FF83FA",
  T: " #40E0D0",
  U: " #40E0D0",
  Y: " #40E0D0"
};

},{}],84:[function(require,module,exports){
var StaticSchemeClass = function(map){
  this.defaultColor = "#ffffff";
  this.type = "static";
  this.map = map;
  this.getColor = function(letter){
    if(this.map[letter] !== undefined){
      return this.map[letter];
    }else{
      return this.defaultColor;
    }
  };
};

var DynSchemeClass = function(fun,opt){
  this.type = "dyn";
  this.opt = opt;
  // init
  if(fun.init !== undefined){
    fun.init.call(this);
    this.getColor = fun.run;
    this.reset = fun.init;
  }else{
    this.getColor = fun;
  }
};
module.exports.stat = StaticSchemeClass;
module.exports.dyn = DynSchemeClass;

},{}],85:[function(require,module,exports){
module.exports = {
  A: "#5858a7",
  R: "#6b6b94",
  N: "#64649b",
  D: "#2121de",
  C: "#9d9d62",
  Q: "#8c8c73",
  E: "#0000ff",
  G: "#4949b6",
  H: "#60609f",
  I: "#ecec13",
  L: "#b2b24d",
  K: "#4747b8",
  M: "#82827d",
  F: "#c2c23d",
  P: "#2323dc",
  S: "#4949b6",
  T: "#9d9d62",
  W: "#c0c03f",
  Y: "#d3d32c",
  V: "#ffff00",
  B: "#4343bc",
  X: "#797986",
  Z: "#4747b8"
};

},{}],86:[function(require,module,exports){
module.exports = {
  A: "#ccff00",
  R: "#0000ff",
  N: "#cc00ff",
  D: "#ff0000",
  C: "#ffff00",
  Q: "#ff00cc",
  E: "#ff0066",
  G: "#ff9900",
  H: "#0066ff",
  I: "#66ff00",
  L: "#33ff00",
  K: "#6600ff",
  M: "#00ff00",
  F: "#00ff66",
  P: "#ffcc00",
  S: "#ff3300",
  T: "#ff6600",
  W: "#00ccff",
  Y: "#00ffcc",
  V: "#99ff00",
  B: "#fff",
  X: "#fff",
  Z: "#fff"
};

},{}],87:[function(require,module,exports){
module.exports = {
  A: "#2cd3d3",
  R: "#708f8f",
  N: "#ff0000",
  D: "#e81717",
  C: "#a85757",
  Q: "#3fc0c0",
  E: "#778888",
  G: "#ff0000",
  H: "#708f8f",
  I: "#00ffff",
  L: "#1ce3e3",
  K: "#7e8181",
  M: "#1ee1e1",
  F: "#1ee1e1",
  P: "#f60909",
  S: "#e11e1e",
  T: "#738c8c",
  W: "#738c8c",
  Y: "#9d6262",
  V: "#07f8f8",
  B: "#f30c0c",
  X: "#7c8383",
  Z: "#5ba4a4"
};

},{}],88:[function(require,module,exports){
module.exports = {
  A: "#ffafaf",
  R: "#6464ff",
  N: "#00ff00",
  D: "#ff0000",
  C: "#ffff00",
  Q: "#00ff00",
  E: "#ff0000",
  G: "#ff00ff",
  H: "#6464ff",
  I: "#ffafaf",
  L: "#ffafaf",
  K: "#6464ff",
  M: "#ffafaf",
  F: "#ffc800",
  P: "#ff00ff",
  S: "#00ff00",
  T: "#00ff00",
  W: "#ffc800",
  Y: "#ffc800",
  V: "#ffafaf",
  B: "#fff",
  X: "#fff",
  Z: "#fff"
};

},{}],89:[function(require,module,exports){
/*
 * msa-seqtools
 * https://github.com/greenify/msa-seqtools
 *
 * Copyright (c) 2014 greenify
 * Licensed under the MIT license.
 */

var st = {};
module.exports = st;

// extract IDs and push them to the meta dict
st.getMeta = function(label) {
  if (st.contains(label, "|")) {
    var identifiers = label.split("|");
    var k = 0;
    var database, databaseID;
    var meta = {};
    while (k < identifiers.length - 1) {
      database = identifiers[k];
      databaseID = identifiers[k + 1];
      meta[database] = databaseID;
      k += 2;
    }
    // assume the last entry is the label
    var name = identifiers[identifiers.length - 1];
    // check whether there is a uniprot id
    if (name.indexOf("=") >= 0 && name.indexOf("OS") >= 0) {
      var ds = {};
      var details = name.split(" ");
      ds.en = details[0];
      details = details.splice(1);
      var nameLength = findSepInArr(details, "=");
      var detailsTmp = details.splice(nameLength - 1);
      name = details.join(" ");
      details = detailsTmp;
      k = 0;
      var block = [];
      details.forEach(function(item) {
        block.push(item);
        if (item.indexOf("=") >= 0) {
          strToDict(block.join(" "), "=", ds);
          block = [];
        }
      });
      return {
        name: name,
        ids: meta,
        details: ds
      };
    }
    return {
      name: name,
      ids: meta
    };
  }
  return {
    name: label
  };
};

var findSepInArr = function(arr, sep) {
  for (var i = 0; i < arr.lenght; i++) {
    if (arr[i].indexOf(i)) {
      return i;
    }
  }
  return arr.length - 1;
};

var strToDict = function(str, sep, toJoin) {
  toJoin = toJoin || {};
  var entries = str.split(sep);
  toJoin[entries[0].toLowerCase()] = entries[1];
  return toJoin;
};

var identDB = {
  "sp": {
    link: "http://www.uniprot.org/%s",
    name: "Uniprot"
  },
  "tr": {
    link: "http://www.uniprot.org/%s",
    name: "Trembl"
  },
  "gb": {
    link: "http://www.ncbi.nlm.nih.gov/nuccore/%s",
    name: "Genbank"
  },
  "pdb": {
    link: "http://www.rcsb.org/pdb/explore/explore.do?structureId=%s",
    name: "PDB"
  }
};

st.buildLinks = function(meta) {
  var links = {};
  meta = meta || {};
  Object.keys(meta).forEach(function(id) {
    if (id in identDB) {
      var entry = identDB[id];
      var link = entry.link.replace("%s", meta[id]);
      links[entry.name] = link;
    }
  });
  return links;
};


// search for a text
st.contains = function(text, search) {
  return ''.indexOf.call(text, search, 0) !== -1;
};

// split after e.g. 80 chars
st.splitNChars = function(txt, num) {
  var i, _ref;
  num = num || 80;
  var result = [];
  for (i = 0, _ref = txt.length - 1; i <= _ref; i += num) {
    result.push(txt.substr(i, num));
  }
  return result;
};

st.model = function Seq(seq, name, id) {
  this.seq = seq;
  this.name = name;
  this.id = id;
  this.ids = {};
};

},{}],90:[function(require,module,exports){
var _ = require("underscore");

var stat = function(seqs) {
  // if someone forgets new
  if (this.constructor !== stat) {
    return new stat(seqs);
  }
  if (seqs === undefined || typeof seqs === "string") {
    throw new TypeError("you need to give the seq stat an array");
  }
  //if(seqs.length == 0){
  //throw new TypeError("you need to give the seq stat a real array");
  //}
  this.resetSeqs(seqs);
  this.alphabetSize = 4;
  this._useBackground = false;
  this.ignoredChars = ["-", "*"];
};

stat.prototype.addSeq = function addSeq(seq) {
  this.seqs.push(seq);
  this._reset();
};

stat.prototype.removeSeq = function addSeq(seq) {
  // check for int or string
  if (typeof seq === 'number') {
    this.seqs.splice(seq, 1);
  } else {
    // identify matches (we could have multiple)
    _.each(this.seqs, function(s, i) {
      if (seq === s) {
        this.seqs.splice(i, 1);
      }
    }.bind(this));
  }
  this._reset();
};

stat.prototype.addSeqs = function addSeqs(seqs) {
  seqs.forEach(function(seq) {
    this.addSeq(seq);
  }.bind(this));
};

stat.prototype.resetSeqs = function reset(seqs) {
  this.seqs = [];

  // support sequence models
  if (!(seqs instanceof Array)){
    this.mseqs = seqs;
    var mSeqsPluck = function() {
      var seqArr = this.mseqs.pluck("seq");
      this.resetSeqs(seqArr);
    };
    seqs.on("add change reset ", mSeqsPluck, this);
    mSeqsPluck.call(this);
  } else {
    this.addSeqs(seqs);
    this._reset();
    this.trigger("reset");
  }
};

var calcValues = ["consensus", "frequency", "maxLength", "ic", "gaps"];

stat.prototype._reset = function _reset() {
  for (var i = 0; i < calcValues.length; i++) {
    this["_" + calcValues[i]] = undefined;
  }
  this._identity = undefined;
  this._background = undefined;
};

// -----------------------------------------------------------------------------
// BEGIN: setter/getter
// -----------------------------------------------------------------------------

stat.prototype.setBackground = function setBackground(b) {
  this._useBackground = b;
  this._reset();
};

stat.prototype.useBackground = function useBackground() {
  this.setBackground(true);
};

stat.prototype.setDNA = function setNucleotide() {
  this.alphabetSize = 4;
};

stat.prototype.setProtein = function setDNA() {
  this.alphabetSize = 20;
};

// -----------------------------------------------------------------------------
// BEGIN: auto wrappers
// -----------------------------------------------------------------------------

// neat auto-wrappers
calcValues.forEach(function(key) {
  stat.prototype[key] = function() {
    if (this["_" + key] === undefined) {
      this[key + "Calc"]();
    }
    return this["_" + key];
  };
});

stat.prototype.identity = function identitiy(seq) {
  // do not cache if its called with a special compare seq
  var ident;
  if (this._identity === undefined || seq) {
    ident = this.identityCalc(seq);
    this._identity = undefined;
  }
  return this._identity || ident;
};

// set your own background with obj.bg
stat.prototype.background = function background() {
  if (this.bg !== undefined) {
    return this.bg;
  }
  if (this._background === undefined) {
    this.backgroundCalc();
  }
  return this._background;
};


// -----------------------------------------------------------------------------
// BEGIN: calc tools
// -----------------------------------------------------------------------------

// calculates the relative frequency of a base at a given position
// this is needed e.g. for the entropy calculation
// seqs: array of sequences (strings)
// opts:
//    all: boolean (use to show the frequencies for all letters [including the ignored ones]
//    (default false)
// @returns array of all positions with a dictionary of all bases with their relative frequency
stat.prototype.frequencyCalc = function frequencyCalc(opts) {
  var occs, totalPerPos;
  occs = new Array(this.maxLength());
  totalPerPos = new Array(this.seqs.length);
  var ignoredChars = this.ignoredChars;
  if(opts !== undefined && opts.all){
    ignoredChars = [];
  }

  // count the occurrences of the chars at a position
  _.each(this.seqs, function(el) {
    _.each(el, function(c, pos) {
      if (ignoredChars.indexOf(c) >= 0) return;
      if (occs[pos] === undefined) {
        occs[pos] = {};
      }
      if (occs[pos][c] === undefined) {
        occs[pos][c] = 0;
      }
      occs[pos][c] ++;
      if (totalPerPos[pos] === undefined) {
        totalPerPos[pos] = 0;
      }
      totalPerPos[pos] ++;
    });
  });

  // normalize to 1
  _.each(occs, function(el, pos) {
    return _.each(el, function(val, c) {
      return (occs[pos][c] = val / totalPerPos[pos]);
    });
  });
  this._frequency = occs;
  return occs;
};

// seqs: array of sequences (strings)
stat.prototype.backgroundCalc = function backgroundCalc() {
  var occ = {};
  var total = 0;

  // count the occurences of the chars of a position
  _.each(this.seqs, function(el) {
    _.each(el, function(c) {
      if (occ[c] === undefined) {
        occ[c] = 0;
      }
      occ[c] ++;
      return total++;
    });
  });

  // normalize to 1
  occ = _.mapValues(occ, function(val) {
    return val / total;
  });
  this._background = occ;
  return occ;
};


// information content after Shannon
// * gaps are excluded
stat.prototype.icCalc = function icCalc() {
  var f = this.frequency();
  if (this._useBackground) {
    var b = this.background();
  }
  var ignoredChars = this.ignoredChars;
  var useBackground = this._useBackground;
  var ic = _.map(f, function(el) {
    return _.reduce(el, function(memo, val, c) {
      if (ignoredChars.indexOf(c) >= 0) return memo;
      if (useBackground) {
        val = val / b[c];
      }
      return memo - val * (Math.log(val) / Math.log(2));
    }, 0);
  });
  this._ic = ic;
  return ic;
};

// sequence conservation after Schneider and Stephens (1990)
// @cite Schneider, T.D. and Stephens, R.M. 1990. Sequence logos: A new way to
// display consensus sequences. Nucleic Acids Res. 18: 6097–6100.
stat.prototype.conservation = function conservation(alphabetSize) {
  var ic = this.ic();
  alphabetSize = alphabetSize || this.alphabetSize;
  var icMax = Math.log(alphabetSize) / Math.log(2);
  var conserv = _.map(ic, function(el) {
    return icMax - el;
  });
  return conserv;
};

// sequence conservation after Schneider and Stephens (1990)
// conservation for each amino acid
// * gaps are excluded
stat.prototype.conservResidue = function conservation(input) {
  var alphabetSize = input ? input.alphabetSize : undefined;
  var ic;
  var ignoredChars = this.ignoredChars;
  if (input !== undefined && input.scaled) {
    ic = this.scale(this.conservation(alphabetSize));
  } else {
    ic = this.conservation(alphabetSize);
  }
  var f = this.frequency();
  var keys;
  var conserv = _.map(f, function(el, i) {
    keys = _.reject(_.keys(el), function(c) {
      return ignoredChars.indexOf(c) >= 0;
    });
    var obj = {};
    _.each(keys, function(key) {
      obj[key] = el[key] * ic[i];
    });
    return obj;
  });
  return conserv;
};

// type 2 sequence logo method
// scales relative to background
stat.prototype.conservResidue2 = function conservation(alphabetSize) {
  var f = this.frequency();
  var ic = this.conservation(alphabetSize);
  var b = this.background();
  var conserv = _.map(f, function(el, i) {
    return _.map(el, function(val) {
      var sum = _.reduce(f[i], function(memo, e) {
        return memo + e / b[i];
      }, 0);
      return ((val / b[i]) / sum) * ic[i];
    }, 0);
  });
  return conserv;
};

// scale information content or conservation to 1
stat.prototype.scale = function conservation(ic, alphabetSize) {
  alphabetSize = alphabetSize || this.alphabetSize;
  var icMax = Math.log(alphabetSize) / Math.log(2);
  var conserv = _.map(ic, function(el) {
    return el / icMax;
  });
  return conserv;
};

stat.prototype.maxLengthCalc = function() {
  this._maxLength = _.max(this.seqs, function(seq) {
    return seq.length;
  }).length;
};

// seqs: array of sequences (strings)
// @returns consenus sequence
stat.prototype.consensusCalc = function consensusCal() {
  var occs = new Array(this.maxLength());

  // count the occurrences of the chars of a position
  _.each(this.seqs, function(el) {
    _.each(el, function(c, pos) {
      if (occs[pos] === undefined) {
        occs[pos] = {};
      }
      if (occs[pos][c] === undefined) {
        occs[pos][c] = 0;
      }
      occs[pos][c] ++;
    });
  });

  // now pick the char with most occurrences
  this._consensus = _.reduce(occs, function(memo, occ) {
    var keys;
    keys = _.keys(occ);
    return memo += _.max(keys, function(key) {
      return occ[key];
    });
  }, "");

  return this._consensus;
};

// seqs: array of sequences (strings)
// consensus: calculated consensus seq
// calculates for each sequence
// * matches with the consensus seq
// * identity = matchedChars / totalChars (excluding gaps)
// @returns: array of length of the seqs with the identity to the consensus (double)
stat.prototype.identityCalc = function identitiyCalc(compareSeq) {
  var consensus = compareSeq || this.consensus();
  this._identity = this.seqs.map(function(seq) {
    var matches = 0;
    var total = 0;
    for (var i = 0; i < seq.length; i++) {
      if (seq[i] !== "-" && consensus[i] !== "-") {
        total++;
        if (seq[i] === consensus[i]) {
          matches++;
        }
      }
    }
    return matches / total;
  });
  return this._identity;
};

// percentage of gaps per column
stat.prototype.gapsCalc = function gapsCount() {
  var occs = new Array(this.maxLength());
  // count the occurrences of the chars of a position
  _.each(this.seqs, function(el) {
    _.each(el, function(c, pos) {
      if (occs[pos] === undefined) {
        occs[pos] = {
          g: 0,
          t: 0
        };
      }
      c = c === "-" ? "g" : "t";
      occs[pos][c] ++;
    });
  });

  // now pick the char with most occurrences
  this._gaps = _.map(occs, function(el) {
    return el.g / (el.g + el.t);
  });
  return this._gaps;
};

_.mixin({
  mapValues: function(obj, f_val) {
    return _.object(_.keys(obj), _.map(obj, f_val));
  }
});

require("biojs-events").mixin(stat.prototype);

module.exports = stat;

},{"biojs-events":13,"underscore":91}],91:[function(require,module,exports){
//     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.2';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var isArrayLike = function(collection) {
    var length = collection && collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, target, fromIndex) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    return _.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, 'length').length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = list && list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    var i = 0, length = array && array.length;
    if (typeof isSorted == 'number') {
      i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
    } else if (isSorted && length) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (item !== item) {
      return _.findIndex(slice.call(array, i), _.isNaN);
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    var idx = array ? array.length : 0;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    if (item !== item) {
      return _.findLastIndex(slice.call(array, 0, idx), _.isNaN);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = array != null && array.length;
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createIndexFinder(1);

  _.findLastIndex = createIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],92:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],93:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],94:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21,"is-function":95}],95:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],96:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],97:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24,"for-each":94,"trim":96}],98:[function(require,module,exports){
var Colors, Colorscheme, Model;

Colors = require("msa-colorschemes");

Model = require("backbone-thin").Model;

module.exports = Colorscheme = Model.extend({
  defaults: {
    scheme: "taylor",
    colorBackground: true,
    showLowerCase: true,
    opacity: 0.6
  },
  initialize: function(data, seqs, stat) {
    this.colors = new Colors({
      seqs: seqs,
      conservation: function() {
        return stat.scale(stat.conservation());
      }
    });
    return stat.on("reset", function() {
      if (this.getSelectedScheme().type === "dyn") {
        return this.getSelectedScheme().reset();
      }
    }, this);
  },
  addStaticScheme: function(name, dict) {
    return this.colors.addStaticScheme(name, dict);
  },
  addDynScheme: function(name, fun) {
    return this.colors.addDynScheme(name, fun);
  },
  getScheme: function(name) {
    return this.colors.getScheme(name);
  },
  getSelectedScheme: function() {
    return this.colors.getScheme(this.get("scheme"));
  }
});



},{"backbone-thin":4,"msa-colorschemes":78}],99:[function(require,module,exports){
var Columns, Model, _;

Model = require("backbone-thin").Model;

_ = require("underscore");

module.exports = Columns = Model.extend({
  initialize: function(o, stat) {
    if (this.get("hidden") == null) {
      this.set("hidden", []);
    }
    return this.stats = stat;
  },
  calcHiddenColumns: function(n) {
    var hidden, i, j, len, newX;
    hidden = this.get("hidden");
    newX = n;
    for (j = 0, len = hidden.length; j < len; j++) {
      i = hidden[j];
      if (i <= newX) {
        newX++;
      }
    }
    return newX - n;
  }
});



},{"backbone-thin":4,"underscore":91}],100:[function(require,module,exports){
var Config, Model;

Model = require("backbone-thin").Model;

module.exports = Config = Model.extend({
  defaults: {
    registerMouseHover: false,
    registerMouseClicks: true,
    importProxy: "https://cors-anywhere.herokuapp.com/",
    eventBus: true,
    alphabetSize: 20,
    dropImport: false,
    debug: false,
    hasRef: false
  }
});



},{"backbone-thin":4}],101:[function(require,module,exports){
var Loader, Model, Package;

Loader = require("../utils/loader");

Model = require("backbone-thin").Model;

module.exports = Package = Model.extend({
  initialize: function(g) {
    return this.g = g;
  },
  development: {
    "msa-tnt": "/node_modules/msa-tnt/build/bundle.js",
    "biojs-io-newick": "/node_modules/biojs-io-newick/build/biojs-io-newick.min.js"
  },
  loadPackage: function(pkg, cb) {
    var p;
    try {
      p = require(pkg);
      return cb(p);
    } catch (_error) {
      return Loader.loadScript(this._pkgURL(pkg), cb);
    }
  },
  loadPackages: function(pkgs, cb) {
    var cbs;
    cbs = Loader.joinCb(function() {
      return cb();
    }, pkgs.length);
    return pkgs.forEach((function(_this) {
      return function(pkg) {
        return _this.loadPackage(pkg, cbs);
      };
    })(this));
  },
  _pkgURL: function(pkg) {
    var url;
    if (this.g.config.get("debug")) {
      url = this.development[pkg];
    } else {
      url = "http://wzrd.in/bundle/" + pkg + "@latest";
    }
    return url;
  }
});



},{"../utils/loader":132,"backbone-thin":4}],102:[function(require,module,exports){
var ColumnSelection, Model, PosSelection, RowSelection, Selection, _;

_ = require("underscore");

Model = require("backbone-thin").Model;

Selection = Model.extend({
  defaults: {
    type: "super"
  }
});

RowSelection = Selection.extend({
  defaults: _.extend({}, Selection.prototype.defaults, {
    type: "row",
    seqId: ""
  }),
  inRow: function(seqId) {
    return seqId === this.get("seqId");
  },
  inColumn: function(rowPos) {
    return true;
  },
  getLength: function() {
    return 1;
  }
});

ColumnSelection = Selection.extend({
  defaults: _.extend({}, Selection.prototype.defaults, {
    type: "column",
    xStart: -1,
    xEnd: -1
  }),
  inRow: function() {
    return true;
  },
  inColumn: function(rowPos) {
    return xStart <= rowPos && rowPos <= xEnd;
  },
  getLength: function() {
    return xEnd - xStart;
  }
});

PosSelection = RowSelection.extend(_.extend({}, _.pick(ColumnSelection, "inColumn"), _.pick(ColumnSelection, "getLength"), {
  defaults: _.extend({}, ColumnSelection.prototype.defaults, RowSelection.prototype.defaults, {
    type: "pos"
  })
}));

module.exports.sel = Selection;

module.exports.possel = PosSelection;

module.exports.rowsel = RowSelection;

module.exports.columnsel = ColumnSelection;



},{"backbone-thin":4,"underscore":91}],103:[function(require,module,exports){
var Collection, SelectionManager, _, sel;

sel = require("./Selection");

_ = require("underscore");

Collection = require("backbone-thin").Collection;

module.exports = SelectionManager = Collection.extend({
  model: sel.sel,
  initialize: function(data, opts) {
    if (opts != null) {
      this.g = opts.g;
      this.listenTo(this.g, "residue:click", function(e) {
        return this._handleE(e.evt, new sel.possel({
          xStart: e.rowPos,
          xEnd: e.rowPos,
          seqId: e.seqId
        }));
      });
      this.listenTo(this.g, "row:click", function(e) {
        return this._handleE(e.evt, new sel.rowsel({
          seqId: e.seqId
        }));
      });
      return this.listenTo(this.g, "column:click", function(e) {
        return this._handleE(e.evt, new sel.columnsel({
          xStart: e.rowPos,
          xEnd: e.rowPos + e.stepSize - 1
        }));
      });
    }
  },
  getSelForRow: function(seqId) {
    return this.filter(function(el) {
      return el.inRow(seqId);
    });
  },
  getSelForColumns: function(rowPos) {
    return this.filter(function(el) {
      return el.inColumn(rowPos);
    });
  },
  addJSON: function(model) {
    return this.add(this._fromJSON(model));
  },
  _fromJSON: function(model) {
    switch (model.type) {
      case "column":
        return new sel.columnsel(model);
      case "row":
        return new sel.rowsel(model);
      case "pos":
        return new sel.possel(model);
    }
  },
  resetJSON: function(arr) {
    arr = _.map(arr, this._fromJSON);
    return this.reset(arr);
  },
  getBlocksForRow: function(seqId, maxLen) {
    var blocks, i, j, k, len, ref, ref1, results, results1, seli, selis;
    selis = this.filter(function(el) {
      return el.inRow(seqId);
    });
    blocks = [];
    for (i = 0, len = selis.length; i < len; i++) {
      seli = selis[i];
      if (seli.attributes.type === "row") {
        blocks = (function() {
          results = [];
          for (var j = 0; 0 <= maxLen ? j <= maxLen : j >= maxLen; 0 <= maxLen ? j++ : j--){ results.push(j); }
          return results;
        }).apply(this);
        break;
      } else {
        blocks = blocks.concat((function() {
          results1 = [];
          for (var k = ref = seli.attributes.xStart, ref1 = seli.attributes.xEnd; ref <= ref1 ? k <= ref1 : k >= ref1; ref <= ref1 ? k++ : k--){ results1.push(k); }
          return results1;
        }).apply(this));
      }
    }
    return blocks;
  },
  getAllColumnBlocks: function(conf) {
    var blocks, filtered, i, j, len, maxLen, ref, ref1, results, seli, withPos;
    maxLen = conf.maxLen;
    withPos = conf.withPos;
    blocks = [];
    if (conf.withPos) {
      filtered = this.filter(function(el) {
        return el.get('xStart') != null;
      });
    } else {
      filtered = this.filter(function(el) {
        return el.get('type') === "column";
      });
    }
    for (i = 0, len = filtered.length; i < len; i++) {
      seli = filtered[i];
      blocks = blocks.concat((function() {
        results = [];
        for (var j = ref = seli.attributes.xStart, ref1 = seli.attributes.xEnd; ref <= ref1 ? j <= ref1 : j >= ref1; ref <= ref1 ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this));
    }
    blocks = _.uniq(blocks);
    return blocks;
  },
  invertRow: function(rows) {
    var el, i, inverted, len, s, selRows;
    selRows = this.where({
      type: "row"
    });
    selRows = _.map(selRows, function(el) {
      return el.attributes.seqId;
    });
    inverted = _.filter(rows, function(el) {
      if (selRows.indexOf(el) >= 0) {
        return false;
      }
      return true;
    });
    s = [];
    for (i = 0, len = inverted.length; i < len; i++) {
      el = inverted[i];
      s.push(new sel.rowsel({
        seqId: el
      }));
    }
    return this.reset(s);
  },
  invertCol: function(columns) {
    var el, i, inverted, len, s, selColumns, xEnd, xStart;
    selColumns = this.where({
      type: "column"
    });
    selColumns = _.reduce(selColumns, function(memo, el) {
      var i, ref, ref1, results;
      return memo.concat((function() {
        results = [];
        for (var i = ref = el.attributes.xStart, ref1 = el.attributes.xEnd; ref <= ref1 ? i <= ref1 : i >= ref1; ref <= ref1 ? i++ : i--){ results.push(i); }
        return results;
      }).apply(this));
    }, []);
    inverted = _.filter(columns, function(el) {
      if (selColumns.indexOf(el) >= 0) {
        return false;
      }
      return true;
    });
    if (inverted.length === 0) {
      return;
    }
    s = [];
    xStart = xEnd = inverted[0];
    for (i = 0, len = inverted.length; i < len; i++) {
      el = inverted[i];
      if (xEnd + 1 === el) {
        xEnd = el;
      } else {
        s.push(new sel.columnsel({
          xStart: xStart,
          xEnd: xEnd
        }));
        xStart = xEnd = el;
      }
    }
    if (xStart !== xEnd) {
      s.push(new sel.columnsel({
        xStart: xStart,
        xEnd: inverted[inverted.length - 1]
      }));
    }
    return this.reset(s);
  },
  _handleE: function(e, selection) {
    if (e.ctrlKey || e.metaKey) {
      return this.add(selection);
    } else {
      return this.reset([selection]);
    }
  },
  _reduceColumns: function() {
    return this.each(function(el, index, arr) {
      var cols, i, j, left, lefts, len, len1, right, rights, xEnd, xStart;
      cols = _.filter(arr, function(el) {
        return el.get('type') === 'column';
      });
      xStart = el.get('xStart');
      xEnd = el.get('xEnd');
      lefts = _.filter(cols, function(el) {
        return el.get('xEnd') === (xStart - 1);
      });
      for (i = 0, len = lefts.length; i < len; i++) {
        left = lefts[i];
        left.set('xEnd', xStart);
      }
      rights = _.filter(cols, function(el) {
        return el.get('xStart') === (xEnd + 1);
      });
      for (j = 0, len1 = rights.length; j < len1; j++) {
        right = rights[j];
        right.set('xStart', xEnd);
      }
      if (lefts.length > 0 || rights.length > 0) {
        console.log("removed el");
        return el.collection.remove(el);
      }
    });
  }
});



},{"./Selection":102,"backbone-thin":4,"underscore":91}],104:[function(require,module,exports){
var Config, Model;

Model = require("backbone-thin").Model;

module.exports = Config = Model.extend({
  defaults: {
    searchText: ""
  }
});



},{"backbone-thin":4}],105:[function(require,module,exports){
var Model, Visibility;

Model = require("backbone-thin").Model;

module.exports = Visibility = Model.extend({
  defaults: {
    searchBox: -10,
    overviewBox: 30,
    headerBox: -1,
    alignmentBody: 0
  }
});



},{"backbone-thin":4}],106:[function(require,module,exports){
var Model, Visibility;

Model = require("backbone-thin").Model;

module.exports = Visibility = Model.extend({
  defaults: {
    sequences: true,
    markers: true,
    metacell: false,
    conserv: false,
    overviewbox: false,
    seqlogo: false,
    gapHeader: false,
    leftHeader: true,
    labels: true,
    labelName: true,
    labelId: true,
    labelPartition: false,
    labelCheckbox: false,
    metaGaps: true,
    metaIdentity: true,
    metaLinks: true
  },
  constructor: function(attributes, options) {
    this.calcDefaults(options.model);
    return Model.apply(this, arguments);
  },
  initialize: function() {
    this.listenTo(this, "change:metaLinks change:metaIdentity change:metaGaps", function() {
      return this.trigger("change:metacell");
    }, this);
    this.listenTo(this, "change:labelName change:labelId change:labelPartition change:labelCheckbox", function() {
      return this.trigger("change:labels");
    }, this);
    return this.listenTo(this, "change:markers change:conserv change:seqlogo change:gapHeader", function() {
      return this.trigger("change:header");
    }, this);
  },
  calcDefaults: function(seqs) {
    var ids, seq;
    if (seqs.length > 0) {
      seq = seqs.at(0);
      ids = seq.get("ids");
      if (ids !== void 0 && Object.keys(ids).length === 0) {
        return this.defaults.metaLinks = false;
      }
    }
  }
});



},{"backbone-thin":4}],107:[function(require,module,exports){
var Model, Zoomer;

Model = require("backbone-thin").Model;

module.exports = Zoomer = Model.extend({
  constructor: function(attributes, options) {
    this.calcDefaults(options.model);
    Model.apply(this, arguments);
    this.g = options.g;
    this.listenTo(this, "change:labelIdLength change:labelNameLength change:labelPartLength change:labelCheckLength", function() {
      return this.trigger("change:labelWidth", this.getLabelWidth());
    }, this);
    this.listenTo(this, "change:metaLinksWidth change:metaIdentWidth change:metaGapWidth", function() {
      return this.trigger("change:metaWidth", this.getMetaWidth());
    }, this);
    return this;
  },
  defaults: {
    alignmentWidth: "auto",
    alignmentHeight: 225,
    columnWidth: 15,
    rowHeight: 15,
    autoResize: true,
    textVisible: true,
    labelIdLength: 50,
    labelNameLength: 100,
    labelPartLength: 15,
    labelCheckLength: 15,
    labelFontsize: 13,
    labelLineHeight: "13px",
    markerFontsize: "10px",
    stepSize: 1,
    markerStepSize: 2,
    markerHeight: 20,
    residueFont: "13",
    canvasEventScale: 1,
    boxRectHeight: 2,
    boxRectWidth: 2,
    overviewboxPaddingTop: 10,
    menuFontsize: "14px",
    menuItemFontsize: "14px",
    menuItemLineHeight: "14px",
    menuMarginLeft: "3px",
    menuPadding: "3px 4px 3px 4px",
    metaGapWidth: 35,
    metaIdentWidth: 40,
    metaLinksWidth: 25,
    _alignmentScrollLeft: 0,
    _alignmentScrollTop: 0
  },
  calcDefaults: function(model) {
    var maxLen;
    maxLen = model.getMaxLength();
    if (maxLen < 200 && model.length < 30) {
      return this.defaults.boxRectWidth = this.defaults.boxRectHeight = 5;
    }
  },
  getAlignmentWidth: function(n) {
    if (this.get("autoResize") && n !== void 0) {
      return this.get("columnWidth") * n;
    }
    if (this.get("alignmentWidth") === void 0 || this.get("alignmentWidth") === "auto" || this.get("alignmentWidth") === 0) {
      return this._adjustWidth();
    } else {
      return this.get("alignmentWidth");
    }
  },
  setLeftOffset: function(n) {
    var val;
    val = n;
    val = Math.max(0, val);
    val -= this.g.columns.calcHiddenColumns(val);
    return this.set("_alignmentScrollLeft", val * this.get('columnWidth'));
  },
  setTopOffset: function(n) {
    var height, i, j, ref, seq, val;
    val = Math.max(0, n - 1);
    height = 0;
    for (i = j = 0, ref = val; j <= ref; i = j += 1) {
      seq = this.model.at(i);
      height += seq.attributes.height || 1;
    }
    return this.set("_alignmentScrollTop", height * this.get("rowHeight"));
  },
  getLeftBlockWidth: function() {
    var paddingLeft;
    paddingLeft = 0;
    if (this.g.vis.get("labels")) {
      paddingLeft += this.getLabelWidth();
    }
    if (this.g.vis.get("metacell")) {
      paddingLeft += this.getMetaWidth();
    }
    return paddingLeft;
  },
  getMetaWidth: function() {
    var val;
    val = 0;
    if (this.g.vis.get("metaGaps")) {
      val += this.get("metaGapWidth");
    }
    if (this.g.vis.get("metaIdentity")) {
      val += this.get("metaIdentWidth");
    }
    if (this.g.vis.get("metaLinks")) {
      val += this.get("metaLinksWidth");
    }
    return val;
  },
  getLabelWidth: function() {
    var val;
    val = 0;
    if (this.g.vis.get("labelName")) {
      val += this.get("labelNameLength");
    }
    if (this.g.vis.get("labelId")) {
      val += this.get("labelIdLength");
    }
    if (this.g.vis.get("labelPartition")) {
      val += this.get("labelPartLength");
    }
    if (this.g.vis.get("labelCheckbox")) {
      val += this.get("labelCheckLength");
    }
    return val;
  },
  _adjustWidth: function() {
    var calcWidth, maxWidth, parentWidth, val;
    if (!(this.el !== void 0 && this.model !== void 0)) {
      return;
    }
    if ((this.el.parentNode != null) && this.el.parentNode.offsetWidth !== 0) {
      parentWidth = this.el.parentNode.offsetWidth;
    } else {
      parentWidth = document.body.clientWidth - 35;
    }
    maxWidth = parentWidth - this.getLeftBlockWidth();
    calcWidth = this.getAlignmentWidth(this.model.getMaxLength() - this.g.columns.get('hidden').length);
    val = Math.min(maxWidth, calcWidth);
    val = Math.floor(val / this.get("columnWidth")) * this.get("columnWidth");
    return this.attributes.alignmentWidth = val;
  },
  autoResize: function() {
    if (this.get("autoResize")) {
      return this._adjustWidth(this.el, this.model);
    }
  },
  autoHeight: function(max) {
    var val;
    val = this.getMaxAlignmentHeight();
    if (max !== void 0 && max > 0) {
      val = Math.min(val, max);
    }
    return this.set("alignmentHeight", val);
  },
  setEl: function(el, model) {
    this.el = el;
    return this.model = model;
  },
  _checkScrolling: function(scrollObj, opts) {
    var xScroll, yScroll;
    xScroll = scrollObj[0];
    yScroll = scrollObj[1];
    this.set("_alignmentScrollLeft", xScroll, opts);
    return this.set("_alignmentScrollTop", yScroll, opts);
  },
  getMaxAlignmentHeight: function() {
    var height;
    height = 0;
    this.model.each(function(seq) {
      return height += seq.attributes.height || 1;
    });
    return height * this.get("rowHeight");
  },
  getMaxAlignmentWidth: function() {
    return this.model.getMaxLength() * this.get("columnWidth");
  }
});



},{"backbone-thin":4}],108:[function(require,module,exports){
var MSA;

MSA = require("./msa");

module.exports = function() {
  var msa;
  msa = function(args) {
    return MSA.apply(this, args);
  };
  msa.prototype = MSA.prototype;
  return new msa(arguments);
};

module.exports.msa = MSA;

module.exports.model = require("./model");

module.exports.menu = require("./menu");

module.exports.utils = require("./utils");

module.exports.selection = require("./g/selection/Selection");

module.exports.selcol = require("./g/selection/SelectionCol");

module.exports.view = require("backbone-viewj");

module.exports.boneView = require("backbone-childs");

module.exports._ = require('underscore');

module.exports.$ = require('jbone');

module.exports.io = {};

module.exports.io.xhr = require('xhr');

module.exports.io.fasta = require('biojs-io-fasta');

module.exports.io.clustal = require('biojs-io-clustal');

module.exports.io.gff = require('biojs-io-gff');

module.exports.version = "0.2.0";



},{"./g/selection/Selection":102,"./g/selection/SelectionCol":103,"./menu":110,"./model":126,"./msa":127,"./utils":131,"backbone-childs":2,"backbone-viewj":9,"biojs-io-clustal":"biojs-io-clustal","biojs-io-fasta":"biojs-io-fasta","biojs-io-gff":"biojs-io-gff","jbone":67,"underscore":91,"xhr":"xhr"}],109:[function(require,module,exports){
var ColorMenu, DebugMenu, ExportMenu, ExtraMenu, FilterMenu, HelpMenu, ImportMenu, MenuView, OrderingMenu, SelectionMenu, VisMenu, boneView;

boneView = require("backbone-childs");

ImportMenu = require("./views/ImportMenu");

FilterMenu = require("./views/FilterMenu");

SelectionMenu = require("./views/SelectionMenu");

VisMenu = require("./views/VisMenu");

ColorMenu = require("./views/ColorMenu");

OrderingMenu = require("./views/OrderingMenu");

ExtraMenu = require("./views/ExtraMenu");

ExportMenu = require("./views/ExportMenu");

HelpMenu = require("./views/HelpMenu");

DebugMenu = require("./views/DebugMenu");

module.exports = MenuView = boneView.extend({
  initialize: function(data) {
    this.msa = data.msa;
    this.addView("10_import", new ImportMenu({
      model: this.msa.seqs,
      g: this.msa.g,
      msa: this.msa
    }));
    this.addView("20_filter", new FilterMenu({
      model: this.msa.seqs,
      g: this.msa.g
    }));
    this.addView("30_selection", new SelectionMenu({
      model: this.msa.seqs,
      g: this.msa.g
    }));
    this.addView("40_vis", new VisMenu({
      model: this.msa.seqs,
      g: this.msa.g
    }));
    this.addView("50_color", new ColorMenu({
      model: this.msa.seqs,
      g: this.msa.g
    }));
    this.addView("60_ordering", new OrderingMenu({
      model: this.msa.seqs,
      g: this.msa.g
    }));
    this.addView("70_extra", new ExtraMenu({
      model: this.msa.seqs,
      g: this.msa.g,
      msa: this.msa
    }));
    this.addView("80_export", new ExportMenu({
      model: this.msa.seqs,
      g: this.msa.g,
      msa: this.msa
    }));
    this.addView("90_help", new HelpMenu({
      g: this.msa.g
    }));
    if (this.msa.g.config.get("debug")) {
      return this.addView("95_debug", new DebugMenu({
        g: this.msa.g
      }));
    }
  },
  render: function() {
    this.renderSubviews();
    this.el.setAttribute("class", "smenubar");
    return this.el.appendChild(document.createElement("p"));
  }
});



},{"./views/ColorMenu":112,"./views/DebugMenu":113,"./views/ExportMenu":114,"./views/ExtraMenu":115,"./views/FilterMenu":116,"./views/HelpMenu":117,"./views/ImportMenu":118,"./views/OrderingMenu":119,"./views/SelectionMenu":120,"./views/VisMenu":121,"backbone-childs":2}],110:[function(require,module,exports){
module.exports.defaultmenu = require("./defaultmenu");

module.exports.menubuilder = require("./menubuilder");



},{"./defaultmenu":109,"./menubuilder":111}],111:[function(require,module,exports){
var MenuBuilder, builder;

builder = require("menu-builder");

module.exports = MenuBuilder = builder.extend({
  buildDOM: function() {
    this.on("new:node", this.buildNode);
    this.on("new:button", this.buildButton);
    this.on("new:menu", this.buildMenu);
    return builder.prototype.buildDOM.call(this);
  },
  buildNode: function(li) {
    if (this.g != null) {
      return li.style.lineHeight = this.g.zoomer.get("menuItemLineHeight");
    }
  },
  buildButton: function(btn) {
    if (this.g != null) {
      btn.style.fontSize = this.g.zoomer.get("menuFontsize");
      btn.style.marginLeft = this.g.zoomer.get("menuMarginLeft");
      return btn.style.padding = this.g.zoomer.get("menuPadding");
    }
  },
  buildMenu: function(menu) {
    if (this.g != null) {
      return menu.style.fontSize = this.g.zoomer.get("menuItemFontsize");
    }
  }
});



},{"menu-builder":69}],112:[function(require,module,exports){
var ColorMenu, MenuBuilder, _, dom;

MenuBuilder = require("../menubuilder");

_ = require("underscore");

dom = require("dom-helper");

module.exports = ColorMenu = MenuBuilder.extend({
  initialize: function(data) {
    this.g = data.g;
    this.el.style.display = "inline-block";
    return this.listenTo(this.g.colorscheme, "change", function() {
      return this.render();
    });
  },
  render: function() {
    var colorschemes, j, len, menuColor, scheme, text;
    menuColor = this.setName("Color scheme");
    this.removeAllNodes();
    colorschemes = this.getColorschemes();
    for (j = 0, len = colorschemes.length; j < len; j++) {
      scheme = colorschemes[j];
      this.addScheme(menuColor, scheme);
    }
    text = "Background";
    if (this.g.colorscheme.get("colorBackground")) {
      text = "Hide " + text;
    } else {
      text = "Show " + text;
    }
    this.addNode(text, (function(_this) {
      return function() {
        return _this.g.colorscheme.set("colorBackground", !_this.g.colorscheme.get("colorBackground"));
      };
    })(this));
    this.grey(menuColor);
    dom.removeAllChilds(this.el);
    this.el.appendChild(this.buildDOM());
    return this;
  },
  addScheme: function(menuColor, scheme) {
    var current, style;
    style = {};
    current = this.g.colorscheme.get("scheme");
    if (current === scheme.id) {
      style.backgroundColor = "#77ED80";
    }
    return this.addNode(scheme.name, (function(_this) {
      return function() {
        return _this.g.colorscheme.set("scheme", scheme.id);
      };
    })(this), {
      style: style
    });
  },
  getColorschemes: function() {
    var schemes;
    schemes = [];
    schemes.push({
      name: "Zappo",
      id: "zappo"
    });
    schemes.push({
      name: "Taylor",
      id: "taylor"
    });
    schemes.push({
      name: "Hydrophobicity",
      id: "hydro"
    });
    schemes.push({
      name: "Lesk",
      id: "lesk"
    });
    schemes.push({
      name: "Cinema",
      id: "cinema"
    });
    schemes.push({
      name: "MAE",
      id: "mae"
    });
    schemes.push({
      name: "Clustal",
      id: "clustal"
    });
    schemes.push({
      name: "Clustal2",
      id: "clustal2"
    });
    schemes.push({
      name: "Turn",
      id: "turn"
    });
    schemes.push({
      name: "Strand",
      id: "strand"
    });
    schemes.push({
      name: "Buried",
      id: "buried"
    });
    schemes.push({
      name: "Helix",
      id: "helix"
    });
    schemes.push({
      name: "Nucleotide",
      id: "nucleotide"
    });
    schemes.push({
      name: "Purine",
      id: "purine"
    });
    schemes.push({
      name: "PID",
      id: "pid"
    });
    schemes.push({
      name: "No color",
      id: "foo"
    });
    return schemes;
  },
  grey: function(menuColor) {
    this.addNode("Shade", (function(_this) {
      return function() {
        _this.g.colorscheme.set("showLowerCase", false);
        return _this.model.each(function(seq) {
          var grey, residues;
          residues = seq.get("seq");
          grey = [];
          _.each(residues, function(el, index) {
            if (el === el.toLowerCase()) {
              return grey.push(index);
            }
          });
          return seq.set("grey", grey);
        });
      };
    })(this));
    this.addNode("Shade by threshold", (function(_this) {
      return function() {
        var conserv, grey, i, j, maxLen, ref, threshold;
        threshold = prompt("Enter threshold (in percent)", 20);
        threshold = threshold / 100;
        maxLen = _this.model.getMaxLength();
        conserv = _this.g.stats.scale(_this.g.stats.conservation());
        grey = [];
        for (i = j = 0, ref = maxLen - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          if (conserv[i] < threshold) {
            grey.push(i);
          }
        }
        return _this.model.each(function(seq) {
          return seq.set("grey", grey);
        });
      };
    })(this));
    this.addNode("Shade selection", (function(_this) {
      return function() {
        var maxLen;
        maxLen = _this.model.getMaxLength();
        return _this.model.each(function(seq) {
          var blocks;
          blocks = _this.g.selcol.getBlocksForRow(seq.get("id"), maxLen);
          return seq.set("grey", blocks);
        });
      };
    })(this));
    return this.addNode("Reset shade", (function(_this) {
      return function() {
        _this.g.colorscheme.set("showLowerCase", true);
        return _this.model.each(function(seq) {
          return seq.set("grey", []);
        });
      };
    })(this));
  }
});



},{"../menubuilder":111,"dom-helper":66,"underscore":91}],113:[function(require,module,exports){
var DebugMenu, MenuBuilder;

MenuBuilder = require("../menubuilder");

module.exports = DebugMenu = MenuBuilder.extend({
  initialize: function(data) {
    this.g = data.g;
    return this.el.style.display = "inline-block";
  },
  render: function() {
    this.setName("Debug");
    this.addNode("Get the code", (function(_this) {
      return function() {
        return window.open("https://github.com/greenify/msa");
      };
    })(this));
    this.addNode("Toggle mouseover events", (function(_this) {
      return function() {
        _this.g.config.set("registerMouseHover", !_this.g.config.get("registerMouseHover"));
        return _this.g.onAll(function() {
          return console.log(arguments);
        });
      };
    })(this));
    this.el.appendChild(this.buildDOM());
    return this;
  }
});



},{"../menubuilder":111}],114:[function(require,module,exports){
var ExportMenu, Exporter, FastaExporter, MenuBuilder, _;

MenuBuilder = require("../menubuilder");

FastaExporter = require("biojs-io-fasta").writer;

_ = require("underscore");

Exporter = require("../../utils/export");

module.exports = ExportMenu = MenuBuilder.extend({
  initialize: function(data) {
    this.g = data.g;
    this.msa = data.msa;
    return this.el.style.display = "inline-block";
  },
  render: function() {
    this.setName("Export");
    this.addNode("View in Jalview", (function(_this) {
      return function() {
        var url;
        url = _this.g.config.get('url');
        if (url == null) {
          return alert("Sequence weren't imported via an URL");
        } else {
          if (url.indexOf("localhost" || url === "dragimport")) {
            return Exporter.publishWeb(_this.msa, function(link) {
              return Exporter.openInJalview(link, _this.g.colorscheme.get("scheme"));
            });
          } else {
            return Exporter.openInJalview(url, _this.g.colorscheme.get("scheme"));
          }
        }
      };
    })(this));
    this.addNode("Publish to the web", (function(_this) {
      return function() {
        return Exporter.publishWeb(_this.msa, function(link) {
          return window.open(link, '_blank');
        });
      };
    })(this));
    this.addNode("Share link", (function(_this) {
      return function() {
        return Exporter.shareLink(_this.msa, function(link) {
          return window.open(link, '_blank');
        });
      };
    })(this));
    this.addNode("Export sequences", (function(_this) {
      return function() {
        return Exporter.saveAsFile(_this.msa, "all.fasta");
      };
    })(this));
    this.addNode("Export selection", (function(_this) {
      return function() {
        return Exporter.saveSelection(_this.msa, "selection.fasta");
      };
    })(this));
    this.addNode("Export features", (function(_this) {
      return function() {
        return Exporter.saveAnnots(_this.msa, "features.gff3");
      };
    })(this));
    this.addNode("Export image", (function(_this) {
      return function() {
        return Exporter.saveAsImg(_this.msa, "biojs-msa.png");
      };
    })(this));
    this.el.appendChild(this.buildDOM());
    return this;
  }
});



},{"../../utils/export":129,"../menubuilder":111,"biojs-io-fasta":"biojs-io-fasta","underscore":91}],115:[function(require,module,exports){
var ExtraMenu, Loader, MenuBuilder, Seq, xhr;

MenuBuilder = require("../menubuilder");

Seq = require("../../model/Sequence");

Loader = require("../../utils/loader");

xhr = require("xhr");

module.exports = ExtraMenu = MenuBuilder.extend({
  initialize: function(data) {
    this.g = data.g;
    this.el.style.display = "inline-block";
    return this.msa = data.msa;
  },
  render: function() {
    var msa, stats;
    this.setName("Extras");
    stats = this.g.stats;
    msa = this.msa;
    this.addNode("Add consensus seq", (function(_this) {
      return function() {
        var con, seq;
        con = stats.consensus();
        seq = new Seq({
          seq: con,
          id: "0c",
          name: "consenus"
        });
        _this.model.add(seq);
        _this.model.setRef(seq);
        _this.model.comparator = function(seq) {
          return !seq.get("ref");
        };
        return _this.model.sort();
      };
    })(this));
    this.addNode("Calc Tree", function() {
      var cbs, newickStr, nwkData;
      newickStr = "";
      cbs = Loader.joinCb(function() {
        return msa.u.tree.showTree(nwkData);
      }, 2, this);
      msa.u.tree.loadTree(cbs);
      nwkData = {
        name: "root",
        children: [
          {
            name: "c1",
            branch_length: 4,
            children: msa.seqs.filter(function(f, i) {
              return i % 2 === 0;
            })
          }, {
            name: "c2",
            children: msa.seqs.filter(function(f, i) {
              return i % 2 === 1;
            }),
            branch_length: 4
          }
        ]
      };
      msa.seqs.each(function(s) {
        return s.set("branch_length", 2);
      });
      return cbs();
    });
    this.addNode("Increase font size", (function(_this) {
      return function() {
        var columnWidth, nColumnWidth, nFontSize;
        columnWidth = _this.g.zoomer.get("columnWidth");
        nColumnWidth = columnWidth + 5;
        _this.g.zoomer.set("columnWidth", nColumnWidth);
        _this.g.zoomer.set("rowHeight", nColumnWidth);
        nFontSize = nColumnWidth * 0.7;
        _this.g.zoomer.set("residueFont", nFontSize);
        return _this.g.zoomer.set("labelFontSize", nFontSize);
      };
    })(this));
    this.addNode("Decrease font size", (function(_this) {
      return function() {
        var columnWidth, nColumnWidth, nFontSize;
        columnWidth = _this.g.zoomer.get("columnWidth");
        nColumnWidth = columnWidth - 2;
        _this.g.zoomer.set("columnWidth", nColumnWidth);
        _this.g.zoomer.set("rowHeight", nColumnWidth);
        nFontSize = nColumnWidth * 0.6;
        _this.g.zoomer.set("residueFont", nFontSize);
        _this.g.zoomer.set("labelFontSize", nFontSize);
        if (_this.g.zoomer.get("columnWidth") < 8) {
          return _this.g.zoomer.set("textVisible", false);
        }
      };
    })(this));
    this.addNode("Minimized width", (function(_this) {
      return function() {
        return _this.g.zoomer.set("alignmentWidth", 600);
      };
    })(this));
    this.addNode("Minimized height", (function(_this) {
      return function() {
        return _this.g.zoomer.set("alignmentHeight", 120);
      };
    })(this));
    this.addNode("Jump to a column", (function(_this) {
      return function() {
        var offset;
        offset = prompt("Column", "20");
        if (offset < 0 || offset > _this.model.getMaxLength() || isNaN(offset)) {
          alert("invalid column");
          return;
        }
        return _this.g.zoomer.setLeftOffset(offset);
      };
    })(this));
    this.el.appendChild(this.buildDOM());
    return this;
  }
});



},{"../../model/Sequence":125,"../../utils/loader":132,"../menubuilder":111,"xhr":"xhr"}],116:[function(require,module,exports){
var FilterMenu, MenuBuilder, _;

MenuBuilder = require("../menubuilder");

_ = require("underscore");

module.exports = FilterMenu = MenuBuilder.extend({
  initialize: function(data) {
    this.g = data.g;
    return this.el.style.display = "inline-block";
  },
  render: function() {
    this.setName("Filter");
    this.addNode("Hide columns by threshold", (function(_this) {
      return function(e) {
        var conserv, hidden, i, j, maxLen, ref, threshold;
        threshold = prompt("Enter threshold (in percent)", 20);
        threshold = threshold / 100;
        maxLen = _this.model.getMaxLength();
        hidden = [];
        conserv = _this.g.stats.scale(_this.g.stats.conservation());
        for (i = j = 0, ref = maxLen - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          if (conserv[i] < threshold) {
            hidden.push(i);
          }
        }
        return _this.g.columns.set("hidden", hidden);
      };
    })(this));
    this.addNode("Hide columns by selection", (function(_this) {
      return function() {
        var hidden, hiddenOld;
        hiddenOld = _this.g.columns.get("hidden");
        hidden = hiddenOld.concat(_this.g.selcol.getAllColumnBlocks({
          maxLen: _this.model.getMaxLength(),
          withPos: true
        }));
        _this.g.selcol.reset([]);
        return _this.g.columns.set("hidden", hidden);
      };
    })(this));
    this.addNode("Hide columns by gaps", (function(_this) {
      return function() {
        var gapContent, gaps, hidden, i, j, maxLen, ref, threshold, total;
        threshold = prompt("Enter threshold (in percent)", 20);
        threshold = threshold / 100;
        maxLen = _this.model.getMaxLength();
        hidden = [];
        for (i = j = 0, ref = maxLen - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          gaps = 0;
          total = 0;
          _this.model.each(function(el) {
            if (el.get('seq')[i] === "-") {
              gaps++;
            }
            return total++;
          });
          gapContent = gaps / total;
          if (gapContent > threshold) {
            hidden.push(i);
          }
        }
        return _this.g.columns.set("hidden", hidden);
      };
    })(this));
    this.addNode("Hide seqs by identity", (function(_this) {
      return function() {
        var threshold;
        threshold = prompt("Enter threshold (in percent)", 20);
        threshold = threshold / 100;
        return _this.model.each(function(el) {
          if (el.get('identity') < threshold) {
            return el.set('hidden', true);
          }
        });
      };
    })(this));
    this.addNode("Hide seqs by selection", (function(_this) {
      return function() {
        var hidden, ids;
        hidden = _this.g.selcol.where({
          type: "row"
        });
        ids = _.map(hidden, function(el) {
          return el.get('seqId');
        });
        _this.g.selcol.reset([]);
        return _this.model.each(function(el) {
          if (ids.indexOf(el.get('id')) >= 0) {
            return el.set('hidden', true);
          }
        });
      };
    })(this));
    this.addNode("Hide seqs by gaps", (function(_this) {
      return function() {
        var threshold;
        threshold = prompt("Enter threshold (in percent)", 40);
        return _this.model.each(function(el, i) {
          var gaps, seq;
          seq = el.get('seq');
          gaps = _.reduce(seq, (function(memo, c) {
            if (c === '-') {
              memo++;
            }
            return memo;
          }), 0);
          if (gaps > threshold) {
            return el.set('hidden', true);
          }
        });
      };
    })(this));
    this.addNode("Reset", (function(_this) {
      return function() {
        _this.g.columns.set("hidden", []);
        return _this.model.each(function(el) {
          if (el.get('hidden')) {
            return el.set('hidden', false);
          }
        });
      };
    })(this));
    this.el.appendChild(this.buildDOM());
    return this;
  }
});



},{"../menubuilder":111,"underscore":91}],117:[function(require,module,exports){
var HelpMenu, MenuBuilder;

MenuBuilder = require("../menubuilder");

module.exports = HelpMenu = MenuBuilder.extend({
  initialize: function(data) {
    return this.g = data.g;
  },
  render: function() {
    this.setName("Help");
    this.addNode("About the project", (function(_this) {
      return function() {
        return window.open("https://github.com/greenify/msa");
      };
    })(this));
    this.addNode("Report issues", (function(_this) {
      return function() {
        return window.open("https://github.com/greenify/msa/issues");
      };
    })(this));
    this.addNode("User manual", (function(_this) {
      return function() {
        return window.open("https://github.com/greenify/msa/wiki");
      };
    })(this));
    this.el.style.display = "inline-block";
    this.el.appendChild(this.buildDOM());
    return this;
  }
});



},{"../menubuilder":111}],118:[function(require,module,exports){
var ImportMenu, MenuBuilder, k;

MenuBuilder = require("../menubuilder");

k = require("koala-js");

module.exports = ImportMenu = MenuBuilder.extend({
  initialize: function(data) {
    this.g = data.g;
    this.el.style.display = "inline-block";
    return this.msa = data.msa;
  },
  render: function() {
    var msa, uploader;
    msa = this.msa;
    uploader = k.mk("input");
    uploader.type = "file";
    uploader.style.display = "none";
    uploader.multiple = true;
    uploader.addEventListener("change", function() {
      var files;
      files = uploader.files || [];
      return msa.u.file.importFiles(files);
    });
    this.el.appendChild(uploader);
    this.setName("Import");
    this.addNode("URL", (function(_this) {
      return function(e) {
        var url;
        url = prompt("URL", "http://rostlab.org/~goldberg/clustalw2-I20140818-215249-0556-53699878-pg.clustalw");
        return _this.msa.u.file.importURL(url, function() {});
      };
    })(this));
    this.addNode("From file", (function(_this) {
      return function() {
        return uploader.click();
      };
    })(this));
    this.addNode("Drag & Drop", (function(_this) {
      return function() {
        return alert("Yep. Just drag & drop your file");
      };
    })(this));
    this.el.appendChild(this.buildDOM());
    return this;
  }
});



},{"../menubuilder":111,"koala-js":68}],119:[function(require,module,exports){
var MenuBuilder, OrderingMenu, _, dom;

MenuBuilder = require("../menubuilder");

dom = require("dom-helper");

_ = require('underscore');

module.exports = OrderingMenu = MenuBuilder.extend({
  initialize: function(data) {
    this.g = data.g;
    this.order = "ID";
    return this.el.style.display = "inline-block";
  },
  setOrder: function(order) {
    this.order = order;
    return this.render();
  },
  render: function() {
    var comps, el, i, len, m;
    this.setName("Ordering");
    this.removeAllNodes();
    comps = this.getComparators();
    for (i = 0, len = comps.length; i < len; i++) {
      m = comps[i];
      this._addNode(m);
    }
    el = this.buildDOM();
    dom.removeAllChilds(this.el);
    this.el.appendChild(el);
    return this;
  },
  _addNode: function(m) {
    var style, text;
    text = m.text;
    style = {};
    if (text === this.order) {
      style.backgroundColor = "#77ED80";
    }
    return this.addNode(text, (function(_this) {
      return function() {
        if (m.precode != null) {
          m.precode();
        }
        _this.model.comparator = m.comparator;
        _this.model.sort();
        return _this.setOrder(m.text);
      };
    })(this), {
      style: style
    });
  },
  getComparators: function() {
    var models, setIdent;
    models = [];
    models.push({
      text: "ID",
      comparator: "id"
    });
    models.push({
      text: "ID Desc",
      comparator: function(a, b) {
        return -("" + a.get("id")).localeCompare("" + b.get("id"), [], {
          numeric: true
        });
      }
    });
    models.push({
      text: "Label",
      comparator: "name"
    });
    models.push({
      text: "Label Desc",
      comparator: function(a, b) {
        return -a.get("name").localeCompare(b.get("name"));
      }
    });
    models.push({
      text: "Seq",
      comparator: "seq"
    });
    models.push({
      text: "Seq Desc",
      comparator: function(a, b) {
        return -a.get("seq").localeCompare(b.get("seq"));
      }
    });
    setIdent = (function(_this) {
      return function() {
        return _this.ident = _this.g.stats.identity();
      };
    })(this);
    models.push({
      text: "Identity",
      comparator: (function(_this) {
        return function(a, b) {
          var val;
          val = _this.ident[a.id] - _this.ident[b.id];
          if (val > 0) {
            return 1;
          }
          if (val < 0) {
            return -1;
          }
          return 0;
        };
      })(this),
      precode: setIdent
    });
    models.push({
      text: "Identity Desc",
      comparator: (function(_this) {
        return function(a, b) {
          var val;
          val = _this.ident[a.id] - _this.ident[b.id];
          if (val > 0) {
            return -1;
          }
          if (val < 0) {
            return 1;
          }
          return 0;
        };
      })(this),
      precode: setIdent
    });
    models.push({
      text: "Reference",
      comparator: function(seq) {
        return !seq.get("ref");
      }
    });
    models.push({
      text: "Partition codes",
      comparator: "partition",
      precode: (function(_this) {
        return function() {
          _this.g.vis.set('labelPartition', true);
          return _this.model.each(function(el) {
            return el.set('partition', _.random(1, 3));
          });
        };
      })(this)
    });
    return models;
  }
});



},{"../menubuilder":111,"dom-helper":66,"underscore":91}],120:[function(require,module,exports){
var MenuBuilder, SelectionMenu;

MenuBuilder = require("../menubuilder");

module.exports = SelectionMenu = MenuBuilder.extend({
  initialize: function(data) {
    this.g = data.g;
    return this.el.style.display = "inline-block";
  },
  render: function() {
    this.setName("Selection");
    this.addNode("Find Motif (supports RegEx)", (function(_this) {
      return function() {
        var search;
        search = prompt("your search", "D");
        return _this.g.user.set("searchText", search);
      };
    })(this));
    this.addNode("Invert columns", (function(_this) {
      return function() {
        var i, ref, results;
        return _this.g.selcol.invertCol((function() {
          results = [];
          for (var i = 0, ref = _this.model.getMaxLength(); 0 <= ref ? i <= ref : i >= ref; 0 <= ref ? i++ : i--){ results.push(i); }
          return results;
        }).apply(this));
      };
    })(this));
    this.addNode("Invert rows", (function(_this) {
      return function() {
        return _this.g.selcol.invertRow(_this.model.pluck("id"));
      };
    })(this));
    this.addNode("Reset", (function(_this) {
      return function() {
        return _this.g.selcol.reset();
      };
    })(this));
    this.el.appendChild(this.buildDOM());
    return this;
  }
});



},{"../menubuilder":111}],121:[function(require,module,exports){
var MenuBuilder, VisMenu, dom;

MenuBuilder = require("../menubuilder");

dom = require("dom-helper");

module.exports = VisMenu = MenuBuilder.extend({
  initialize: function(data) {
    this.g = data.g;
    this.el.style.display = "inline-block";
    return this.listenTo(this.g.vis, "change", this.render);
  },
  render: function() {
    var i, len, visEl, visElements;
    this.removeAllNodes();
    this.setName("Vis.elements");
    visElements = this.getVisElements();
    for (i = 0, len = visElements.length; i < len; i++) {
      visEl = visElements[i];
      this._addVisEl(visEl);
    }
    this.addNode("Reset", (function(_this) {
      return function() {
        _this.g.vis.set("labels", true);
        _this.g.vis.set("sequences", true);
        _this.g.vis.set("metacell", true);
        _this.g.vis.set("conserv", true);
        _this.g.vis.set("labelId", true);
        _this.g.vis.set("labelName", true);
        _this.g.vis.set("labelCheckbox", false);
        _this.g.vis.set("seqlogo", false);
        _this.g.vis.set("gapHeader", false);
        _this.g.vis.set("leftHeader", true);
        _this.g.vis.set("metaGaps", true);
        _this.g.vis.set("metaIdentity", true);
        return _this.g.vis.set("metaLinks", true);
      };
    })(this));
    dom.removeAllChilds(this.el);
    this.el.appendChild(this.buildDOM());
    return this;
  },
  _addVisEl: function(visEl) {
    var pre, style;
    style = {};
    if (this.g.vis.get(visEl.id)) {
      pre = "Hide ";
      style.color = "red";
    } else {
      pre = "Show ";
      style.color = "green";
    }
    return this.addNode(pre + visEl.name, (function(_this) {
      return function() {
        return _this.g.vis.set(visEl.id, !_this.g.vis.get(visEl.id));
      };
    })(this), {
      style: style
    });
  },
  getVisElements: function() {
    var vis;
    vis = [];
    vis.push({
      name: "Markers",
      id: "markers"
    });
    vis.push({
      name: "Labels",
      id: "labels"
    });
    vis.push({
      name: "Meta info",
      id: "metacell"
    });
    vis.push({
      name: "Overviewbox",
      id: "overviewbox"
    });
    vis.push({
      name: "Conserv",
      id: "conserv"
    });
    vis.push({
      name: "Seq. logo",
      id: "seqlogo"
    });
    vis.push({
      name: "Gap Header",
      id: "gapHeader"
    });
    vis.push({
      name: "Left header",
      id: "leftHeader"
    });
    vis.push({
      name: "Label name",
      id: "labelName"
    });
    vis.push({
      name: "Label id",
      id: "labelId"
    });
    vis.push({
      name: "Label checkbox",
      id: "labelCheckbox"
    });
    vis.push({
      name: "Meta gaps",
      id: "metaGaps"
    });
    vis.push({
      name: "Meta identity",
      id: "metaIdentity"
    });
    vis.push({
      name: "Meta links",
      id: "metaLinks"
    });
    return vis;
  }
});



},{"../menubuilder":111,"dom-helper":66}],122:[function(require,module,exports){
var Feature, Model;

Feature = require("./Feature");

Model = require("backbone-thin").Model;

module.exports = Feature = Model.extend({
  defaults: {
    xStart: -1,
    xEnd: -1,
    height: -1,
    text: "",
    fillColor: "red",
    fillOpacity: 0.5,
    type: "rectangle",
    borderSize: 1,
    borderColor: "black",
    borderOpacity: 0.5,
    validate: true,
    row: 0
  },
  initialize: function(obj) {
    if (obj.start != null) {
      this.set("xStart", obj.start);
    }
    if (obj.end != null) {
      this.set("xEnd", obj.end);
    }
    if (obj.attributes != null) {
      if (obj.attributes.Name != null) {
        this.set("text", obj.attributes.Name);
      }
      if (obj.attributes.Color != null) {
        this.set("fillColor", obj.attributes.Color);
      }
    }
    if (this.attributes.xEnd < this.attributes.xStart) {
      console.warn("invalid feature range for", this.attributes);
    }
    if (!_.isNumber(this.attributes.xStart) || !_.isNumber(this.attributes.xEnd)) {
      console.warn("please provide numeric feature ranges", obj);
      this.set("xStart", parseInt(this.attributes.xStart));
      return this.set("xEnd", parseInt(this.attributes.xEnd));
    }
  },
  validate: function() {
    if (isNaN(this.attributes.xStart || isNaN(this.attributes.xEnd))) {
      return "features need integer start and end.";
    }
  },
  contains: function(index) {
    return this.attributes.xStart <= index && index <= this.attributes.xEnd;
  }
});



},{"./Feature":122,"backbone-thin":4}],123:[function(require,module,exports){
var Collection, Feature, FeatureCol, _;

Feature = require("./Feature");

Collection = require("backbone-thin").Collection;

_ = require("underscore");

module.exports = FeatureCol = Collection.extend({
  model: Feature,
  constructor: function() {
    this.startOnCache = [];
    this.on("all", function() {
      return this.startOnCache = [];
    }, this);
    return Collection.apply(this, arguments);
  },
  startOn: function(index) {
    if (this.startOnCache[index] == null) {
      this.startOnCache[index] = this.where({
        xStart: index
      });
    }
    return this.startOnCache[index];
  },
  contains: function(index) {
    return this.reduce(function(el, memo) {
      return memo || el.contains(index);
    }, false);
  },
  getFeatureOnRow: function(row, x) {
    return this.filter(function(el) {
      return el.get("row") === row && el.get("xStart") <= x && x <= el.get("xEnd");
    });
  },
  assignRows: function() {
    var len, rows, x;
    len = (this.max(function(el) {
      return el.get("xEnd");
    })).attributes.xEnd;
    rows = (function() {
      var i, ref, results;
      results = [];
      for (x = i = 0, ref = len; 0 <= ref ? i <= ref : i >= ref; x = 0 <= ref ? ++i : --i) {
        results.push(0);
      }
      return results;
    })();
    this.each(function(el) {
      var i, max, ref, ref1;
      max = 0;
      for (x = i = ref = el.get("xStart"), ref1 = el.get("xEnd"); i <= ref1; x = i += 1) {
        if (rows[x] > max) {
          max = rows[x];
        }
        rows[x]++;
      }
      return el.set("row", max);
    });
    return _.max(rows);
  },
  getCurrentHeight: function() {
    return (this.max(function(el) {
      return el.get("row");
    })).attributes.row + 1;
  },
  getMinRows: function() {
    var len, rows, x;
    len = (this.max(function(el) {
      return el.get("xEnd");
    })).attributes.xEnd;
    rows = (function() {
      var i, ref, results;
      results = [];
      for (x = i = 0, ref = len; 0 <= ref ? i <= ref : i >= ref; x = 0 <= ref ? ++i : --i) {
        results.push(0);
      }
      return results;
    })();
    this.each(function(el) {
      var i, ref, ref1, results;
      results = [];
      for (x = i = ref = el.get("xStart"), ref1 = el.get("xEnd"); i <= ref1; x = i += 1) {
        results.push(rows[x]++);
      }
      return results;
    });
    return _.max(rows);
  }
});



},{"./Feature":122,"backbone-thin":4,"underscore":91}],124:[function(require,module,exports){
var Collection, FeatureCol, SeqManager, Sequence;

Sequence = require("./Sequence");

FeatureCol = require("./FeatureCol");

Collection = require("backbone-thin").Collection;

module.exports = SeqManager = Collection.extend({
  model: Sequence,
  constructor: function(seqs, g) {
    Collection.apply(this, arguments);
    this.g = g;
    this.on("add reset remove", (function(_this) {
      return function() {
        _this.lengthCache = null;
        return _this._bindSeqsWithFeatures();
      };
    })(this), this);
    this.on("reset", (function(_this) {
      return function() {
        return _this._autoSetRefSeq();
      };
    })(this));
    this._autoSetRefSeq();
    this.lengthCache = null;
    this.features = {};
    return this;
  },
  getMaxLength: function() {
    if (this.models.length === 0) {
      return 0;
    }
    if (this.lengthCache === null) {
      this.lengthCache = this.max(function(seq) {
        return seq.get("seq").length;
      }).get("seq").length;
    }
    return this.lengthCache;
  },
  prev: function(model, endless) {
    var index;
    index = this.indexOf(model) - 1;
    if (index < 0 && endless) {
      index = this.length - 1;
    }
    return this.at(index);
  },
  next: function(model, endless) {
    var index;
    index = this.indexOf(model) + 1;
    if (index === this.length && endless) {
      index = 0;
    }
    return this.at(index);
  },
  calcHiddenSeqs: function(n) {
    var i, j, nNew, ref;
    nNew = n;
    for (i = j = 0, ref = nNew; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (this.at(i).get("hidden")) {
        nNew++;
      }
    }
    return nNew - n;
  },
  addFeatures: function(features) {
    var colors, obj;
    if (features.config != null) {
      obj = features;
      features = features.seqs;
      if (obj.config.colors != null) {
        colors = obj.config.colors;
        _.each(features, function(seq) {
          return _.each(seq, function(val) {
            if (colors[val.feature] != null) {
              return val.fillColor = colors[val.feature];
            }
          });
        });
      }
    }
    if (_.isEmpty(this.features)) {
      this.features = features;
    } else {
      _.each(features, (function(_this) {
        return function(val, key) {
          if (!_this.features.hasOwnProperty(key)) {
            return _this.features[key] = val;
          } else {
            return _this.features[key] = _.union(_this.features[key], val);
          }
        };
      })(this));
    }
    return this._bindSeqsWithFeatures();
  },
  _bindSeqWithFeatures: function(seq) {
    var features;
    features = this.features[seq.attributes.name];
    if (features) {
      seq.set("features", new FeatureCol(features));
      seq.attributes.features.assignRows();
      return seq.set("height", seq.attributes.features.getCurrentHeight() + 1);
    }
  },
  _bindSeqsWithFeatures: function() {
    return this.each((function(_this) {
      return function(seq) {
        return _this._bindSeqWithFeatures(seq);
      };
    })(this));
  },
  removeAllFeatures: function() {
    return delete this.features;
  },
  _autoSetRefSeq: function() {
    if (this.length > 0) {
      return this.at(0).set("ref", true);
    }
  },
  setRef: function(seq) {
    var obj;
    obj = this.get(seq);
    this.each(function(s) {
      if (seq.cid) {
        if (obj.cid === s.cid) {
          return s.set("ref", true);
        } else {
          return s.set("ref", false);
        }
      }
    });
    this.g.config.set("hasRef", true);
    return this.trigger("change:reference", seq);
  }
});



},{"./FeatureCol":123,"./Sequence":125,"backbone-thin":4}],125:[function(require,module,exports){
var FeatureCol, Model, Sequence;

Model = require("backbone-thin").Model;

FeatureCol = require("./FeatureCol");

module.exports = Sequence = Model.extend({
  defaults: {
    name: "",
    id: "",
    seq: "",
    height: 1,
    ref: false
  },
  initialize: function() {
    this.set("grey", []);
    if (this.get("features") == null) {
      return this.set("features", new FeatureCol());
    }
  }
});



},{"./FeatureCol":123,"backbone-thin":4}],126:[function(require,module,exports){
module.exports.seq = require("./Sequence");

module.exports.seqcol = require("./SeqCollection");

module.exports.feature = require("./Feature");

module.exports.featurecol = require("./FeatureCol");



},{"./Feature":122,"./FeatureCol":123,"./SeqCollection":124,"./Sequence":125}],127:[function(require,module,exports){
var $, Colorator, Columns, Config, Eventhandler, FileHelper, Package, ProxyHelper, SelCol, SeqCollection, Stage, Stats, TreeHelper, User, VisOrdering, Visibility, Zoomer, boneView;

SeqCollection = require("./model/SeqCollection");

Colorator = require("./g/colorscheme");

Columns = require("./g/columns");

Config = require("./g/config");

Package = require("./g/package");

SelCol = require("./g/selection/SelectionCol");

User = require("./g/user");

Visibility = require("./g/visibility");

VisOrdering = require("./g/visOrdering");

Zoomer = require("./g/zoomer");

boneView = require("backbone-childs");

Eventhandler = require("biojs-events");

Stage = require("./views/Stage");

Stats = require("stat.seqs");

$ = require("jbone");

FileHelper = require("./utils/file");

TreeHelper = require("./utils/tree");

ProxyHelper = require("./utils/proxy");

module.exports = boneView.extend({
  initialize: function(data) {
    var defMenu, events, menuDiv, pureSeq, ref, wrapperDiv;
    if (data == null) {
      data = {};
    }
    if (data.colorscheme == null) {
      data.colorscheme = {};
    }
    if (data.columns == null) {
      data.columns = {};
    }
    if (data.conf == null) {
      data.conf = {};
    }
    if (data.vis == null) {
      data.vis = {};
    }
    if (data.zoomer == null) {
      if (!((ref = data.visorder) != null ? ref : data.zoomer = {})) {
        data.visorder = {};
      }
    }
    this.g = Eventhandler.mixin({});
    this.seqs = new SeqCollection(data.seqs, this.g);
    this.g.config = new Config(data.conf);
    this.g["package"] = new Package(this.g);
    this.g.selcol = new SelCol([], {
      g: this.g
    });
    this.g.user = new User();
    this.g.vis = new Visibility(data.vis, {
      model: this.seqs
    });
    this.g.visorder = new VisOrdering(data.visorder);
    this.g.zoomer = new Zoomer(data.zoomer, {
      g: this.g,
      model: this.seqs
    });
    if (window.location.hostname === "localhost") {
      this.g.config.set("debug", true);
    }
    pureSeq = this.seqs.pluck("seq");
    this.g.stats = new Stats(this.seqs);
    this.g.stats.alphabetSize = this.g.config.get("alphabetSize");
    this.g.columns = new Columns(data.columns, this.g.stats);
    this.g.colorscheme = new Colorator(data.colorscheme, pureSeq, this.g.stats);
    this.g.zoomer.setEl(this.el, this.seqs);
    this.addView("stage", new Stage({
      model: this.seqs,
      g: this.g
    }));
    this.el.setAttribute("class", "biojs_msa_div");
    this.u = {};
    this.u.file = new FileHelper(this);
    this.u.proxy = new ProxyHelper({
      g: this.g
    });
    this.u.tree = new TreeHelper(this);
    if (this.g.config.get("eventBus") === true) {
      this.startEventBus();
    }
    if (this.g.config.get("dropImport")) {
      events = {
        "dragover": this.dragOver,
        "drop": this.dropFile
      };
      this.delegateEvents(events);
    }
    if (data.importURL) {
      this.u.file.importURL(data.importURL, (function(_this) {
        return function() {
          return _this.render();
        };
      })(this));
    }
    if (data.bootstrapMenu) {
      menuDiv = document.createElement('div');
      wrapperDiv = document.createElement('div');
      if (!this.el.parentNode) {
        wrapperDiv.appendChild(menuDiv);
        wrapperDiv.appendChild(this.el);
      } else {
        this.el.parentNode.replaceChild(wrapperDiv, this.el);
        wrapperDiv.appendChild(menuDiv);
        wrapperDiv.appendChild(this.el);
      }
      defMenu = new msa.menu.defaultmenu({
        el: menuDiv,
        msa: this
      });
      defMenu.render();
    }
    return $(window).on("resize", (function(_this) {
      return function(e) {
        var f;
        f = function() {
          return this.g.zoomer.autoResize();
        };
        return setTimeout(f.bind(_this), 5);
      };
    })(this));
  },
  dragOver: function(e) {
    e.preventDefault();
    e.target.className = 'hover';
    return false;
  },
  dropFile: function(e) {
    var files;
    e.preventDefault();
    files = e.target.files || e.dataTransfer.files;
    this.u.file.importFiles(files);
    return false;
  },
  startEventBus: function() {
    var busObjs, i, key, len, results;
    busObjs = ["config", "columns", "colorscheme", "selcol", "vis", "visorder", "zoomer"];
    results = [];
    for (i = 0, len = busObjs.length; i < len; i++) {
      key = busObjs[i];
      results.push(this._proxyToG(key));
    }
    return results;
  },
  _proxyToG: function(key) {
    return this.listenTo(this.g[key], "all", function(name, prev, now, opts) {
      if (name === "change") {
        return;
      }
      if (opts != null) {
        return this.g.trigger(key + ":" + name, now, prev, opts);
      } else {
        return this.g.trigger(key + ":" + name, now, prev);
      }
    });
  },
  render: function() {
    if (this.seqs === void 0 || this.seqs.length === 0) {
      console.log("warning. empty seqs.");
    }
    this.renderSubviews();
    this.g.vis.set("loaded", true);
    return this;
  }
});



},{"./g/colorscheme":98,"./g/columns":99,"./g/config":100,"./g/package":101,"./g/selection/SelectionCol":103,"./g/user":104,"./g/visOrdering":105,"./g/visibility":106,"./g/zoomer":107,"./model/SeqCollection":124,"./utils/file":130,"./utils/proxy":133,"./utils/tree":136,"./views/Stage":140,"backbone-childs":2,"biojs-events":13,"jbone":67,"stat.seqs":90}],128:[function(require,module,exports){
var BMath;

module.exports = BMath = (function() {
  function BMath() {}

  BMath.randomInt = function(lower, upper) {
    var ref, ref1;
    if (upper == null) {
      ref = [0, lower], lower = ref[0], upper = ref[1];
    }
    if (lower > upper) {
      ref1 = [upper, lower], lower = ref1[0], upper = ref1[1];
    }
    return Math.floor(Math.random() * (upper - lower + 1) + lower);
  };

  BMath.uniqueId = function(length) {
    var id;
    if (length == null) {
      length = 8;
    }
    id = "";
    while (id.length < length) {
      id += Math.random().toString(36).substr(2);
    }
    return id.substr(0, length);
  };

  BMath.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return BMath;

})();



},{}],129:[function(require,module,exports){
var Exporter, Fasta, GFF, _, blobURL, saveAs, xhr;

Fasta = require("biojs-io-fasta");

GFF = require("biojs-io-gff");

xhr = require("xhr");

blobURL = require("blueimp_canvastoblob");

saveAs = require("browser-saveas");

_ = require("underscore");

module.exports = Exporter = {
  openInJalview: function(url, colorscheme) {
    var host, jalviewUrl;
    if (url.charAt(0) === '.') {
      url = document.URL.substr(0, document.URL.lastIndexOf('/')) + "/" + url;
    }
    if (url.indexOf("http") < 0) {
      host = "http://" + window.location.hostname;
      url = host + url;
    }
    url = encodeURIComponent(url);
    jalviewUrl = "http://www.jalview.org/services/launchApp?open=" + url;
    jalviewUrl += "&colour=" + colorscheme;
    return window.open(jalviewUrl, '_blank');
  },
  publishWeb: function(that, cb) {
    var text, url;
    text = Fasta.write(that.seqs.toJSON());
    text = encodeURIComponent(text);
    url = that.u.proxy.corsURL("http://sprunge.biojs.net");
    return xhr({
      method: "POST",
      body: "sprunge=" + text,
      uri: url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }, function(err, rep, body) {
      var link;
      link = body.trim();
      return cb(link);
    });
  },
  shareLink: function(that, cb) {
    var fCB, msaURL, url;
    url = that.g.config.get("importURL");
    msaURL = "http://biojs-msa.org/app/?seq=";
    fCB = function(link) {
      var fURL;
      fURL = msaURL + link;
      if (cb) {
        return cb(fURL);
      }
    };
    if (!url) {
      return Exporter.publishWeb(that, fCB);
    } else {
      return fCB(url);
    }
  },
  saveAsFile: function(that, name) {
    var blob, text;
    text = Fasta.write(that.seqs.toJSON());
    blob = new Blob([text], {
      type: 'text/plain'
    });
    return saveAs(blob, name);
  },
  saveSelection: function(that, name) {
    var blob, i, j, ref, selection, text;
    selection = that.g.selcol.pluck("seqId");
    console.log(selection);
    if (selection.length > 0) {
      selection = that.seqs.filter(function(el) {
        return _.contains(selection, el.get("id"));
      });
      for (i = j = 0, ref = selection.length - 1; j <= ref; i = j += 1) {
        selection[i] = selection[i].toJSON();
      }
    } else {
      selection = that.seqs.toJSON();
      console.warn("no selection found");
    }
    text = Fasta.write(selection);
    blob = new Blob([text], {
      type: 'text/plain'
    });
    return saveAs(blob, name);
  },
  saveAnnots: function(that, name) {
    var blob, features, text;
    features = that.seqs.map(function(el) {
      var seqname;
      features = el.get("features");
      if (features.length === 0) {
        return;
      }
      seqname = el.get("name");
      features.each(function(s) {
        return s.set("seqname", seqname);
      });
      return features.toJSON();
    });
    features = _.flatten(_.compact(features));
    console.log(features);
    text = GFF.exportLines(features);
    blob = new Blob([text], {
      type: 'text/plain'
    });
    return saveAs(blob, name);
  },
  saveAsImg: function(that, name) {
    var canvas, url;
    canvas = that.getView('stage').getView('body').getView('seqblock').el;
    if (canvas != null) {
      url = canvas.toDataURL('image/png');
      return saveAs(blobURL(url), name, "image/png");
    }
  }
};



},{"biojs-io-fasta":"biojs-io-fasta","biojs-io-gff":"biojs-io-gff","blueimp_canvastoblob":62,"browser-saveas":63,"underscore":91,"xhr":"xhr"}],130:[function(require,module,exports){
var ClustalReader, FastaReader, FileHelper, GffReader, _, funs, xhr;

FastaReader = require("biojs-io-fasta");

ClustalReader = require("biojs-io-clustal");

GffReader = require("biojs-io-gff");

_ = require("underscore");

xhr = require("xhr");

module.exports = FileHelper = function(msa) {
  this.msa = msa;
  return this;
};

funs = {
  guessFileType: function(name) {
    var fileName;
    name = name.split(".");
    fileName = name[name.length(-1)];
    switch (fileName) {
      case "aln":
      case "clustal":
        return ClustalReader;
      case "fasta":
        return FastaReader;
      default:
        return FastaReader;
    }
  },
  guessFileFromText: function(text) {
    var reader, type;
    if (text == null) {
      console.warn("invalid file format");
      return ["", "error"];
    }
    if (text.substring(0, 7) === "CLUSTAL") {
      reader = ClustalReader;
      type = "seqs";
    } else if (text.substring(0, 1) === ">") {
      reader = FastaReader;
      type = "seqs";
    } else if (text.substring(0, 1) === "(") {
      type = "newick";
    } else {
      reader = GffReader;
      type = "features";
    }
    return [reader, type];
  },
  parseText: function(text) {
    var features, reader, ref, seqs, type;
    ref = this.guessFileFromText(text), reader = ref[0], type = ref[1];
    if (type === "seqs") {
      seqs = reader.parse(text);
      return [seqs, type];
    } else if (type === "features") {
      features = reader.parseSeqs(text);
      return [features, type];
    } else {
      return [text, type];
    }
  },
  importFiles: function(files) {
    var file, i, j, reader, ref, results;
    results = [];
    for (i = j = 0, ref = files.length - 1; j <= ref; i = j += 1) {
      file = files[i];
      reader = new FileReader();
      reader.onload = (function(_this) {
        return function(evt) {
          return _this.importFile(evt.target.result);
        };
      })(this);
      results.push(reader.readAsText(file));
    }
    return results;
  },
  importFile: function(file) {
    var fileName, objs, ref, type;
    ref = this.parseText(file), objs = ref[0], type = ref[1];
    if (type === "error") {
      return "error";
    }
    if (type === "seqs") {
      this.msa.seqs.reset(objs);
      this.msa.g.config.set("url", "userimport");
      this.msa.g.trigger("url:userImport");
    } else if (type === "features") {
      this.msa.seqs.addFeatures(objs);
    } else if (type === "newick") {
      this.msa.u.tree.loadTree((function(_this) {
        return function() {
          return _this.msa.u.tree.showTree(file);
        };
      })(this));
    }
    return fileName = file.name;
  },
  importURL: function(url, cb) {
    url = this.msa.u.proxy.corsURL(url);
    this.msa.g.config.set("url", url);
    return xhr(url, (function(_this) {
      return function(err, status, body) {
        var res;
        if (!err) {
          res = _this.importFile(body);
          if (res === "error") {
            return;
          }
          _this.msa.g.trigger("import:url", url);
          if (cb) {
            return cb();
          }
        } else {
          return console.log(err);
        }
      };
    })(this));
  }
};

_.extend(FileHelper.prototype, funs);



},{"biojs-io-clustal":"biojs-io-clustal","biojs-io-fasta":"biojs-io-fasta","biojs-io-gff":"biojs-io-gff","underscore":91,"xhr":"xhr"}],131:[function(require,module,exports){
module.exports.bmath = require("./bmath");

module.exports.proxy = require("./proxy");

module.exports.seqgen = require("./seqgen");

module.exports.file = require("./file");

module.exports["export"] = require("./export");



},{"./bmath":128,"./export":129,"./file":130,"./proxy":133,"./seqgen":134}],132:[function(require,module,exports){
var k, loader,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

k = require("koala-js");

module.exports = loader = {
  loadScript: function(url, cb) {
    var s, t;
    s = k.mk("script");
    s.type = "text/javascript";
    s.src = url;
    s.async = true;
    s.onload = s.onreadystatechange = function() {
      var r;
      if (!r && (!this.readyState || this.readyState === "complete")) {
        r = true;
        return cb();
      }
    };
    t = document.getElementsByTagName("script")[0];
    return t.parentNode.appendChild(s);
  },
  joinCb: function(retCb, finalLength, finalScope) {
    var callbackWrapper, cbsFinished, counter;
    finalLength = finalLength || 1;
    cbsFinished = 0;
    callbackWrapper = function(cb, scope) {
      if (cb == null) {
        return counter();
      } else {
        return function() {
          if (indexOf.call(cb, "apply") >= 0) {
            cb.apply(scope, arguments);
          }
          return counter();
        };
      }
    };
    counter = function() {
      cbsFinished++;
      if (cbsFinished === finalLength) {
        return retCb.call(finalScope);
      }
    };
    return callbackWrapper;
  }
};



},{"koala-js":68}],133:[function(require,module,exports){
var ProxyHelper, _, proxyFun;

_ = require("underscore");

module.exports = ProxyHelper = function(opts) {
  this.g = opts.g;
  return this;
};

proxyFun = {
  corsURL: function(url) {
    if (document.URL.indexOf('localhost') >= 0 && url[0] === "/") {
      return url;
    }
    if (url.charAt(0) === "." || url.charAt(0) === "/") {
      return url;
    }
    url = url.replace("www\.", "");
    url = url.replace("http://", "");
    url = this.g.config.get('importProxy') + url;
    return url;
  }
};

_.extend(ProxyHelper.prototype, proxyFun);



},{"underscore":91}],134:[function(require,module,exports){
var BMath, Sequence, Stat, seqgen;

Sequence = require("biojs-model").seq;

BMath = require("./bmath");

Stat = require("stat.seqs");

seqgen = module.exports = {
  _generateSequence: function(len) {
    var i, k, ref, text;
    text = "";
    for (i = k = 0, ref = len - 1; k <= ref; i = k += 1) {
      text += seqgen.getRandomChar();
    }
    return text;
  },
  getDummySequences: function(len, seqLen) {
    var i, k, ref, seqs;
    seqs = [];
    if (len == null) {
      len = BMath.getRandomInt(3, 5);
    }
    if (seqLen == null) {
      seqLen = BMath.getRandomInt(50, 200);
    }
    for (i = k = 1, ref = len; k <= ref; i = k += 1) {
      seqs.push(new Sequence(seqgen._generateSequence(seqLen), "seq" + i, "r" + i));
    }
    return seqs;
  },
  getRandomChar: function(dict) {
    var possible;
    possible = dict || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return possible.charAt(Math.floor(Math.random() * possible.length));
  },
  genConservedSequences: function(len, seqLen, dict) {
    var c, cConserv, conservAim, counter, i, j, k, l, m, n, observed, pseqs, ref, ref1, ref2, ref3, seqs, tolerance;
    seqs = [];
    if (len == null) {
      len = BMath.getRandomInt(3, 5);
    }
    if (seqLen == null) {
      seqLen = BMath.getRandomInt(50, 200);
    }
    dict = dict || "ACDEFGHIKLMNPQRSTVWY---";
    for (i = k = 1, ref = len; k <= ref; i = k += 1) {
      seqs[i - 1] = "";
    }
    tolerance = 0.2;
    conservAim = 1;
    for (i = l = 0, ref1 = seqLen - 1; l <= ref1; i = l += 1) {
      if (i % 3 === 0) {
        conservAim = (BMath.getRandomInt(50, 100)) / 100;
      }
      observed = [];
      for (j = m = 0, ref2 = len - 1; m <= ref2; j = m += 1) {
        counter = 0;
        while (counter < 100) {
          c = seqgen.getRandomChar(dict);
          cConserv = Stat(observed);
          cConserv.addSeq(c);
          counter++;
          if (Math.abs(conservAim - cConserv.scale(cConserv.conservation())[0]) < tolerance) {
            break;
          }
        }
        seqs[j] += c;
        observed.push(c);
      }
    }
    pseqs = [];
    for (i = n = 1, ref3 = len; n <= ref3; i = n += 1) {
      pseqs.push(new Sequence(seqs[i - 1], "seq" + i, "r" + i));
    }
    return pseqs;
  }
};



},{"./bmath":128,"biojs-model":45,"stat.seqs":90}],135:[function(require,module,exports){
var Base, Line, Polygon, Rect, setAttr, svgns;

svgns = "http://www.w3.org/2000/svg";

setAttr = function(obj, opts) {
  var name, value;
  for (name in opts) {
    value = opts[name];
    obj.setAttributeNS(null, name, value);
  }
  return obj;
};

Base = function(opts) {
  var svg;
  svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute("width", opts.width);
  svg.setAttribute("height", opts.height);
  return svg;
};

Rect = function(opts) {
  var rect;
  rect = document.createElementNS(svgns, 'rect');
  return setAttr(rect, opts);
};

Line = function(opts) {
  var line;
  line = document.createElementNS(svgns, 'line');
  return setAttr(line, opts);
};

Polygon = function(opts) {
  var line;
  line = document.createElementNS(svgns, 'polygon');
  return setAttr(line, opts);
};

module.exports.rect = Rect;

module.exports.line = Line;

module.exports.polygon = Polygon;

module.exports.base = Base;



},{}],136:[function(require,module,exports){
var _, tf, treeHelper;

_ = require("underscore");

module.exports = treeHelper = function(msa) {
  this.msa = msa;
  return this;
};

tf = {
  loadTree: function(cb) {
    return this.msa.g["package"].loadPackages(["msa-tnt", "biojs-io-newick"], cb);
  },
  showTree: function(newickStr) {
    var mt, newick, newickObj, nodes, sel, t, treeDiv;
    newick = this.require("biojs-io-newick");
    if (typeof newickStr === "string") {
      newickObj = newick.parse_newick(newickStr);
    } else {
      newickObj = newickStr;
    }
    mt = this.require("msa-tnt");
    sel = new mt.selections();
    treeDiv = document.createElement("div");
    document.body.appendChild(treeDiv);
    console.log(this.msa.seqs.models);
    console.log(newickObj);
    nodes = mt.app({
      seqs: this.msa.seqs.models,
      tree: newickObj
    });
    console.log("nodes", nodes);
    t = new mt.adapters.tree({
      model: nodes,
      el: treeDiv,
      sel: sel
    });
    return treeDiv.style.width = "500px";
  },
  require: function(pkg) {
    return require(pkg);
  }
};

_.extend(treeHelper.prototype, tf);



},{"underscore":91}],137:[function(require,module,exports){
var LabelBlock, SeqBlock, boneView;

boneView = require("backbone-childs");

SeqBlock = require("./canvas/CanvasSeqBlock");

LabelBlock = require("./labels/LabelBlock");

module.exports = boneView.extend({
  initialize: function(data) {
    var labelblock, seqblock;
    this.g = data.g;
    if (true) {
      labelblock = new LabelBlock({
        model: this.model,
        g: this.g
      });
      labelblock.ordering = -1;
      this.addView("labelblock", labelblock);
    }
    if (this.g.vis.get("sequences")) {
      seqblock = new SeqBlock({
        model: this.model,
        g: this.g
      });
      seqblock.ordering = 0;
      this.addView("seqblock", seqblock);
    }
    this.listenTo(this.g.zoomer, "change:alignmentHeight", this.adjustHeight);
    this.listenTo(this.g.zoomer, "change:alignmentWidth", this.adjustWidth);
    return this.listenTo(this.g.columns, "change:hidden", this.adjustHeight);
  },
  render: function() {
    this.renderSubviews();
    this.el.className = "biojs_msa_albody";
    this.el.style.whiteSpace = "nowrap";
    this.adjustHeight();
    this.adjustWidth();
    return this;
  },
  adjustHeight: function() {
    if (this.g.zoomer.get("alignmentHeight") === "auto") {
      return this.el.style.height = (this.g.zoomer.get("rowHeight") * this.model.length) + 5;
    } else {
      return this.el.style.height = this.g.zoomer.get("alignmentHeight");
    }
  },
  adjustWidth: function() {
    return this.el.style.width = this.getWidth();
  },
  getWidth: function() {
    var width;
    width = 0;
    width += this.g.zoomer.getLeftBlockWidth();
    if (this.g.vis.get("sequences")) {
      width += this.g.zoomer.get("alignmentWidth");
    }
    return width;
  }
});



},{"./canvas/CanvasSeqBlock":144,"./labels/LabelBlock":153,"backbone-childs":2}],138:[function(require,module,exports){
var OverviewBox, _, jbone, mouse, selection, view;

view = require("backbone-viewj");

mouse = require("mouse-pos");

selection = require("../g/selection/Selection");

jbone = require("jbone");

_ = require("underscore");

module.exports = OverviewBox = view.extend({
  className: "biojs_msa_overviewbox",
  tagName: "canvas",
  initialize: function(data) {
    this.g = data.g;
    this.listenTo(this.g.zoomer, "change:boxRectWidth change:boxRectHeight change:overviewboxPaddingTop", this.render);
    this.listenTo(this.g.selcol, "add reset change", this.render);
    this.listenTo(this.g.columns, "change:hidden", this.render);
    this.listenTo(this.g.colorscheme, "change:showLowerCase", this.render);
    this.listenTo(this.model, "change", _.debounce(this.render, 5));
    this.color = this.g.colorscheme.getSelectedScheme();
    this.listenTo(this.g.colorscheme, "change:scheme", function() {
      this.color = this.g.colorscheme.getSelectedScheme();
      return this.render();
    });
    return this.dragStart = [];
  },
  events: {
    click: "_onclick",
    mousedown: "_onmousedown"
  },
  render: function() {
    var c, color, hidden, i, j, k, l, rectHeight, rectWidth, ref, ref1, seq, showLowerCase, x, y;
    this._createCanvas();
    this.el.textContent = "overview";
    this.el.style.marginTop = this.g.zoomer.get("overviewboxPaddingTop");
    this.ctx.fillStyle = "#999999";
    this.ctx.fillRect(0, 0, this.el.width, this.el.height);
    rectWidth = this.g.zoomer.get("boxRectWidth");
    rectHeight = this.g.zoomer.get("boxRectHeight");
    hidden = this.g.columns.get("hidden");
    showLowerCase = this.g.colorscheme.get("showLowerCase");
    y = -rectHeight;
    for (i = k = 0, ref = this.model.length - 1; k <= ref; i = k += 1) {
      seq = this.model.at(i).get("seq");
      x = 0;
      y = y + rectHeight;
      if (this.model.at(i).get("hidden")) {
        console.log(this.model.at(i).get("hidden"));
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, y, seq.length * rectWidth, rectHeight);
        continue;
      }
      for (j = l = 0, ref1 = seq.length - 1; l <= ref1; j = l += 1) {
        c = seq[j];
        if (showLowerCase) {
          c = c.toUpperCase();
        }
        color = this.color.getColor(c, {
          pos: j
        });
        if (hidden.indexOf(j) >= 0) {
          color = "grey";
        }
        if (color != null) {
          this.ctx.fillStyle = color;
          this.ctx.fillRect(x, y, rectWidth, rectHeight);
        }
        x = x + rectWidth;
      }
    }
    return this._drawSelection();
  },
  _drawSelection: function() {
    var i, k, maxHeight, pos, rectHeight, rectWidth, ref, sel, seq;
    if (this.dragStart.length > 0 && !this.prolongSelection) {
      return;
    }
    rectWidth = this.g.zoomer.get("boxRectWidth");
    rectHeight = this.g.zoomer.get("boxRectHeight");
    maxHeight = rectHeight * this.model.length;
    this.ctx.fillStyle = "#ffff00";
    this.ctx.globalAlpha = 0.9;
    for (i = k = 0, ref = this.g.selcol.length - 1; k <= ref; i = k += 1) {
      sel = this.g.selcol.at(i);
      if (sel.get('type') === 'column') {
        this.ctx.fillRect(rectWidth * sel.get('xStart'), 0, rectWidth * (sel.get('xEnd') - sel.get('xStart') + 1), maxHeight);
      } else if (sel.get('type') === 'row') {
        seq = (this.model.filter(function(el) {
          return el.get('id') === sel.get('seqId');
        }))[0];
        pos = this.model.indexOf(seq);
        this.ctx.fillRect(0, rectHeight * pos, rectWidth * seq.get('seq').length, rectHeight);
      } else if (sel.get('type') === 'pos') {
        seq = (this.model.filter(function(el) {
          return el.get('id') === sel.get('seqId');
        }))[0];
        pos = this.model.indexOf(seq);
        this.ctx.fillRect(rectWidth * sel.get('xStart'), rectHeight * pos, rectWidth * (sel.get('xEnd') - sel.get('xStart') + 1), rectHeight);
      }
    }
    return this.ctx.globalAlpha = 1;
  },
  _onclick: function(evt) {
    return this.g.trigger("meta:click", {
      seqId: this.model.get("id", {
        evt: evt
      })
    });
  },
  _onmousemove: function(e) {
    var rect;
    if (this.dragStart.length === 0) {
      return;
    }
    this.render();
    this.ctx.fillStyle = "#ffff00";
    this.ctx.globalAlpha = 0.9;
    rect = this._calcSelection(mouse.abs(e));
    this.ctx.fillRect(rect[0][0], rect[1][0], rect[0][1] - rect[0][0], rect[1][1] - rect[1][0]);
    e.preventDefault();
    return e.stopPropagation();
  },
  _onmousedown: function(e) {
    this.dragStart = mouse.abs(e);
    this.dragStartRel = mouse.rel(e);
    if (e.ctrlKey || e.metaKey) {
      this.prolongSelection = true;
    } else {
      this.prolongSelection = false;
    }
    jbone(document.body).on('mousemove.overmove', (function(_this) {
      return function(e) {
        return _this._onmousemove(e);
      };
    })(this));
    jbone(document.body).on('mouseup.overup', (function(_this) {
      return function(e) {
        return _this._onmouseup(e);
      };
    })(this));
    return this.dragStart;
  },
  _calcSelection: function(dragMove) {
    var dragRel, i, k, l, rect;
    dragRel = [dragMove[0] - this.dragStart[0], dragMove[1] - this.dragStart[1]];
    for (i = k = 0; k <= 1; i = k += 1) {
      dragRel[i] = this.dragStartRel[i] + dragRel[i];
    }
    rect = [[this.dragStartRel[0], dragRel[0]], [this.dragStartRel[1], dragRel[1]]];
    for (i = l = 0; l <= 1; i = l += 1) {
      if (rect[i][1] < rect[i][0]) {
        rect[i] = [rect[i][1], rect[i][0]];
      }
      rect[i][0] = Math.max(rect[i][0], 0);
    }
    return rect;
  },
  _endSelection: function(dragEnd) {
    var args, i, j, k, l, m, rect, ref, ref1, selis;
    jbone(document.body).off('.overmove');
    jbone(document.body).off('.overup');
    if (this.dragStart.length === 0) {
      return;
    }
    rect = this._calcSelection(dragEnd);
    for (i = k = 0; k <= 1; i = ++k) {
      rect[0][i] = Math.floor(rect[0][i] / this.g.zoomer.get("boxRectWidth"));
    }
    for (i = l = 0; l <= 1; i = ++l) {
      rect[1][i] = Math.floor(rect[1][i] / this.g.zoomer.get("boxRectHeight"));
    }
    rect[0][1] = Math.min(this.model.getMaxLength() - 1, rect[0][1]);
    rect[1][1] = Math.min(this.model.length - 1, rect[1][1]);
    selis = [];
    for (j = m = ref = rect[1][0], ref1 = rect[1][1]; m <= ref1; j = m += 1) {
      args = {
        seqId: this.model.at(j).get('id'),
        xStart: rect[0][0],
        xEnd: rect[0][1]
      };
      selis.push(new selection.possel(args));
    }
    this.dragStart = [];
    if (this.prolongSelection) {
      this.g.selcol.add(selis);
    } else {
      this.g.selcol.reset(selis);
    }
    this.g.zoomer.setLeftOffset(rect[0][0]);
    return this.g.zoomer.setTopOffset(rect[1][0]);
  },
  _onmouseup: function(e) {
    return this._endSelection(mouse.abs(e));
  },
  _onmouseout: function(e) {
    return this._endSelection(mouse.abs(e));
  },
  _createCanvas: function() {
    var rectHeight, rectWidth;
    rectWidth = this.g.zoomer.get("boxRectWidth");
    rectHeight = this.g.zoomer.get("boxRectHeight");
    this.el.height = this.model.length * rectHeight;
    this.el.width = this.model.getMaxLength() * rectWidth;
    this.ctx = this.el.getContext("2d");
    this.el.style.overflow = "scroll";
    return this.el.style.cursor = "crosshair";
  }
});



},{"../g/selection/Selection":102,"backbone-viewj":9,"jbone":67,"mouse-pos":71,"underscore":91}],139:[function(require,module,exports){
var _, boneView, dom, k, sel;

boneView = require("backbone-childs");

_ = require('underscore');

k = require('koala-js');

dom = require('dom-helper');

sel = require("../g/selection/Selection");

module.exports = boneView.extend({
  initialize: function(data) {
    this.g = data.g;
    this.listenTo(this.g.user, "change:searchText", function(model, prop) {
      this.search(prop);
      return this.render();
    });
    this.sel = [];
    return this.selPos = 0;
  },
  events: {
    "scroll": "_sendScrollEvent"
  },
  render: function() {
    var searchText;
    this.renderSubviews();
    this.el.className = "biojs_msa_searchresult";
    searchText = this.g.user.get("searchText");
    if ((searchText != null) && searchText.length > 0) {
      if (this.sel.length === 0) {
        this.el.textContent = "no selection found";
      } else {
        this.resultBox = k.mk("div");
        this.resultBox.className = "biojs_msa_searchresult_ovbox";
        this.updateResult();
        this.el.appendChild(this.resultBox);
        this.el.appendChild(this.buildBtns());
      }
    }
    return this;
  },
  updateResult: function() {
    var seli, text;
    text = "search pattern: " + this.g.user.get("searchText");
    text += ", selection: " + (this.selPos + 1);
    seli = this.sel[this.selPos];
    text += " (";
    text += seli.get("xStart") + " - " + seli.get("xEnd");
    text += ", id: " + seli.get("seqId");
    text += ")";
    return this.resultBox.textContent = text;
  },
  buildBtns: function() {
    var allBtn, nextBtn, prevBtn, searchrow;
    prevBtn = k.mk("button");
    prevBtn.textContent = "Prev";
    prevBtn.addEventListener("click", (function(_this) {
      return function() {
        return _this.moveSel(-1);
      };
    })(this));
    nextBtn = k.mk("button");
    nextBtn.textContent = "Next";
    nextBtn.addEventListener("click", (function(_this) {
      return function() {
        return _this.moveSel(1);
      };
    })(this));
    allBtn = k.mk("button");
    allBtn.textContent = "All";
    allBtn.addEventListener("click", (function(_this) {
      return function() {
        return _this.g.selcol.reset(_this.sel);
      };
    })(this));
    searchrow = k.mk("div");
    searchrow.appendChild(prevBtn);
    searchrow.appendChild(nextBtn);
    searchrow.appendChild(allBtn);
    searchrow.className = "biojs_msa_searchresult_row";
    return searchrow;
  },
  moveSel: function(relDist) {
    var selNew;
    selNew = this.selPos + relDist;
    if (selNew < 0 || selNew >= this.sel.length) {
      return -1;
    } else {
      this.focus(selNew);
      this.selPos = selNew;
      return this.updateResult();
    }
  },
  focus: function(selPos) {
    var leftIndex, seli;
    seli = this.sel[selPos];
    leftIndex = seli.get("xStart");
    this.g.zoomer.setLeftOffset(leftIndex);
    return this.g.selcol.reset([seli]);
  },
  search: function(searchText) {
    var leftestIndex, newSeli, origIndex, search;
    search = new RegExp(searchText, "gi");
    newSeli = [];
    leftestIndex = origIndex = 100042;
    this.model.each(function(seq) {
      var args, index, match, results, strSeq;
      strSeq = seq.get("seq");
      results = [];
      while (match = search.exec(strSeq)) {
        index = match.index;
        args = {
          xStart: index,
          xEnd: index + match[0].length - 1,
          seqId: seq.get("id")
        };
        newSeli.push(new sel.possel(args));
        results.push(leftestIndex = Math.min(index, leftestIndex));
      }
      return results;
    });
    this.g.selcol.reset(newSeli);
    if (leftestIndex === origIndex) {
      leftestIndex = 0;
    }
    this.g.zoomer.setLeftOffset(leftestIndex);
    return this.sel = newSeli;
  }
});



},{"../g/selection/Selection":102,"backbone-childs":2,"dom-helper":66,"koala-js":68,"underscore":91}],140:[function(require,module,exports){
var AlignmentBody, HeaderBlock, OverviewBox, Search, _, boneView;

boneView = require("backbone-childs");

AlignmentBody = require("./AlignmentBody");

HeaderBlock = require("./header/HeaderBlock");

OverviewBox = require("./OverviewBox");

Search = require("./Search");

_ = require('underscore');

module.exports = boneView.extend({
  initialize: function(data) {
    this.g = data.g;
    this.draw();
    this.listenTo(this.g.stats, "reset", function() {
      return this.rerender();
    });
    this.listenTo(this.model, "change:hidden", _.debounce(this.rerender, 10));
    this.listenTo(this.model, "sort", this.rerender);
    this.listenTo(this.model, "add", function() {
      return console.log("seq add");
    });
    this.listenTo(this.g.vis, "change:sequences", this.rerender);
    this.listenTo(this.g.vis, "change:overviewbox", this.rerender);
    return this.listenTo(this.g.visorder, "change", this.rerender);
  },
  draw: function() {
    var body, headerblock, overviewbox, searchblock;
    this.removeViews();
    if (this.g.vis.get("overviewbox")) {
      overviewbox = new OverviewBox({
        model: this.model,
        g: this.g
      });
      overviewbox.ordering = this.g.visorder.get('overviewBox');
      this.addView("overviewBox", overviewbox);
    }
    if (true) {
      headerblock = new HeaderBlock({
        model: this.model,
        g: this.g
      });
      headerblock.ordering = this.g.visorder.get('headerBox');
      this.addView("headerBox", headerblock);
    }
    if (true) {
      searchblock = new Search({
        model: this.model,
        g: this.g
      });
      searchblock.ordering = this.g.visorder.get('searchBox');
      this.addView("searchbox", searchblock);
    }
    body = new AlignmentBody({
      model: this.model,
      g: this.g
    });
    body.ordering = this.g.visorder.get('alignmentBody');
    return this.addView("body", body);
  },
  render: function() {
    this.renderSubviews();
    this.el.className = "biojs_msa_stage";
    return this;
  },
  rerender: function() {
    this.draw();
    return this.render();
  }
});



},{"./AlignmentBody":137,"./OverviewBox":138,"./Search":139,"./header/HeaderBlock":148,"backbone-childs":2,"underscore":91}],141:[function(require,module,exports){
var CanvasCharCache, Events;

Events = require("biojs-events");

module.exports = CanvasCharCache = (function() {
  function CanvasCharCache(g) {
    this.g = g;
    this.cache = {};
    this.cacheHeight = 0;
    this.cacheWidth = 0;
  }

  CanvasCharCache.prototype.getFontTile = function(letter, width, height) {
    if (width !== this.cacheWidth || height !== this.cacheHeight) {
      this.cacheHeight = height;
      this.cacheWidth = width;
      this.cache = {};
    }
    if (this.cache[letter] === void 0) {
      this.createTile(letter, width, height);
    }
    return this.cache[letter];
  };

  CanvasCharCache.prototype.createTile = function(letter, width, height) {
    var canvas;
    canvas = this.cache[letter] = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext('2d');
    this.ctx.font = this.g.zoomer.get("residueFont") + "px mono";
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = "center";
    return this.ctx.fillText(letter, width / 2, height / 2, width);
  };

  return CanvasCharCache;

})();



},{"biojs-events":13}],142:[function(require,module,exports){
var Events, _, cache, cacheConstructor;

_ = require("underscore");

Events = require("biojs-events");

cache = {
  setMaxScrollHeight: function() {
    return this.maxScrollHeight = this.g.zoomer.getMaxAlignmentHeight() - this.g.zoomer.get('alignmentHeight');
  },
  setMaxScrollWidth: function() {
    return this.maxScrollWidth = this.g.zoomer.getMaxAlignmentWidth() - this.g.zoomer.getAlignmentWidth();
  }
};

module.exports = cacheConstructor = function(g, model) {
  this.g = g;
  this.model = model;
  this.maxScrollWidth = 0;
  this.maxScrollHeight = 0;
  this.setMaxScrollHeight();
  this.setMaxScrollWidth();
  this.listenTo(this.g.zoomer, "change:rowHeight", this.setMaxScrollHeight);
  this.listenTo(this.g.zoomer, "change:columnWidth", this.setMaxScrollWidth);
  this.listenTo(this.g.zoomer, "change:alignmentWidth", this.setMaxScrollWidth);
  this.listenTo(this.g.zoomer, "change:alignmentHeight", this.setMaxScrollHeight);
  this.listenTo(this.model, "add change reset", function() {
    this.setMaxScrollHeight();
    return this.setMaxScrollWidth();
  }, this);
  return this;
};

_.extend(cacheConstructor.prototype, cache);

Events.mixin(cacheConstructor.prototype);



},{"biojs-events":13,"underscore":91}],143:[function(require,module,exports){
var SelectionClass, _;

_ = require("underscore");

module.exports = SelectionClass = function(g, ctx) {
  this.g = g;
  this.ctx = ctx;
  return this;
};

_.extend(SelectionClass.prototype, {
  _getSelection: function(model) {
    var j, l, len, m, maxLen, n, ref, ref1, ref2, rows, sel, selection, sels;
    maxLen = model.get("seq").length;
    selection = [];
    sels = this.g.selcol.getSelForRow(model.get("id"));
    rows = _.find(sels, function(el) {
      return el.get("type") === "row";
    });
    if (rows != null) {
      for (n = j = 0, ref = maxLen - 1; j <= ref; n = j += 1) {
        selection.push(n);
      }
    } else if (sels.length > 0) {
      for (l = 0, len = sels.length; l < len; l++) {
        sel = sels[l];
        for (n = m = ref1 = sel.get("xStart"), ref2 = sel.get("xEnd"); m <= ref2; n = m += 1) {
          selection.push(n);
        }
      }
    }
    return selection;
  },
  _appendSelection: function(data) {
    var boxHeight, boxWidth, hiddenOffset, j, k, mNextSel, mPrevSel, n, ref, ref1, results, selection, seq;
    seq = data.model.get("seq");
    selection = this._getSelection(data.model);
    ref = this._getPrevNextSelection(data.model), mPrevSel = ref[0], mNextSel = ref[1];
    boxWidth = this.g.zoomer.get("columnWidth");
    boxHeight = this.g.zoomer.get("rowHeight");
    if (selection.length === 0) {
      return;
    }
    hiddenOffset = 0;
    results = [];
    for (n = j = 0, ref1 = seq.length - 1; j <= ref1; n = j += 1) {
      if (data.hidden.indexOf(n) >= 0) {
        results.push(hiddenOffset++);
      } else {
        k = n - hiddenOffset;
        if (selection.indexOf(n) >= 0 && (k === 0 || selection.indexOf(n - 1) < 0)) {
          results.push(this._renderSelection({
            n: n,
            k: k,
            selection: selection,
            mPrevSel: mPrevSel,
            mNextSel: mNextSel,
            xZero: data.xZero,
            yZero: data.yZero,
            model: data.model
          }));
        } else {
          results.push(void 0);
        }
      }
    }
    return results;
  },
  _renderSelection: function(data) {
    var beforeStyle, beforeWidth, boxHeight, boxWidth, hidden, i, j, k, l, mNextSel, mPrevSel, n, ref, ref1, ref2, selection, selectionLength, totalWidth, xPart, xPos, xZero, yZero;
    xZero = data.xZero;
    yZero = data.yZero;
    n = data.n;
    k = data.k;
    selection = data.selection;
    mPrevSel = data.mPrevSel;
    mNextSel = data.mNextSel;
    selectionLength = 0;
    for (i = j = ref = n, ref1 = data.model.get("seq").length - 1; j <= ref1; i = j += 1) {
      if (selection.indexOf(i) >= 0) {
        selectionLength++;
      } else {
        break;
      }
    }
    boxWidth = this.g.zoomer.get("columnWidth");
    boxHeight = this.g.zoomer.get("rowHeight");
    totalWidth = (boxWidth * selectionLength) + 1;
    hidden = this.g.columns.get('hidden');
    this.ctx.beginPath();
    beforeWidth = this.ctx.lineWidth;
    this.ctx.lineWidth = 3;
    beforeStyle = this.ctx.strokeStyle;
    this.ctx.strokeStyle = "#FF0000";
    xZero += k * boxWidth;
    xPart = 0;
    for (i = l = 0, ref2 = selectionLength - 1; 0 <= ref2 ? l <= ref2 : l >= ref2; i = 0 <= ref2 ? ++l : --l) {
      xPos = n + i;
      if (hidden.indexOf(xPos) >= 0) {
        continue;
      }
      if (!((mPrevSel != null) && mPrevSel.indexOf(xPos) >= 0)) {
        this.ctx.moveTo(xZero + xPart, yZero);
        this.ctx.lineTo(xPart + boxWidth + xZero, yZero);
      }
      if (!((mNextSel != null) && mNextSel.indexOf(xPos) >= 0)) {
        this.ctx.moveTo(xPart + xZero, boxHeight + yZero);
        this.ctx.lineTo(xPart + boxWidth + xZero, boxHeight + yZero);
      }
      xPart += boxWidth;
    }
    this.ctx.moveTo(xZero, yZero);
    this.ctx.lineTo(xZero, boxHeight + yZero);
    this.ctx.moveTo(xZero + totalWidth, yZero);
    this.ctx.lineTo(xZero + totalWidth, boxHeight + yZero);
    this.ctx.stroke();
    this.ctx.strokeStyle = beforeStyle;
    return this.ctx.lineWidth = beforeWidth;
  },
  _getPrevNextSelection: function(model) {
    var mNextSel, mPrevSel, modelNext, modelPrev;
    modelPrev = model.collection.prev(model);
    modelNext = model.collection.next(model);
    if (modelPrev != null) {
      mPrevSel = this._getSelection(modelPrev);
    }
    if (modelNext != null) {
      mNextSel = this._getSelection(modelNext);
    }
    return [mPrevSel, mNextSel];
  }
});



},{"underscore":91}],144:[function(require,module,exports){
var CanvasCoordsCache, CanvasSeqDrawer, CharCache, SelectionClass, _, boneView, jbone, mouse;

boneView = require("backbone-childs");

mouse = require("mouse-pos");

_ = require("underscore");

jbone = require("jbone");

CharCache = require("./CanvasCharCache");

SelectionClass = require("./CanvasSelection");

CanvasSeqDrawer = require("./CanvasSeqDrawer");

CanvasCoordsCache = require("./CanvasCoordsCache");

module.exports = boneView.extend({
  tagName: "canvas",
  initialize: function(data) {
    this.g = data.g;
    this.listenTo(this.g.zoomer, "change:_alignmentScrollLeft change:_alignmentScrollTop", function(model, value, options) {
      if (((options != null ? options.origin : void 0) == null) || options.origin !== "canvasseq") {
        return this.render();
      }
    });
    this.listenTo(this.g.columns, "change:hidden", this.render);
    this.listenTo(this.g.zoomer, "change:alignmentWidth change:alignmentHeight", this.render);
    this.listenTo(this.g.colorscheme, "change", this.render);
    this.listenTo(this.g.selcol, "reset add", this.render);
    this.el.style.display = "inline-block";
    this.el.style.overflowX = "hidden";
    this.el.style.overflowY = "hidden";
    this.el.className = "biojs_msa_seqblock";
    this.ctx = this.el.getContext('2d');
    this.cache = new CharCache(this.g);
    this.coordsCache = new CanvasCoordsCache(this.g, this.model);
    this.listenTo(this.g.zoomer, "change:residueFont", function() {
      this.cache = new CharCache(this.g);
      return this.render();
    });
    this.sel = new SelectionClass(this.g, this.ctx);
    this._setColor();
    this.throttleTime = 0;
    this.throttleCounts = 0;
    if (document.documentElement.style.webkitAppearance != null) {
      this.throttledDraw = function() {
        var start, tTime;
        start = +new Date();
        this.draw();
        this.throttleTime += +new Date() - start;
        this.throttleCounts++;
        if (this.throttleCounts > 15) {
          tTime = Math.ceil(this.throttleTime / this.throttleCounts);
          console.log("avgDrawTime/WebKit", tTime);
          return this.throttledDraw = this.draw;
        }
      };
    } else {
      this.throttledDraw = _.throttle(this.throttledDraw, 30);
    }
    return this.manageEvents();
  },
  throttledDraw: function() {
    var start, tTime;
    start = +new Date();
    this.draw();
    this.throttleTime += +new Date() - start;
    this.throttleCounts++;
    if (this.throttleCounts > 15) {
      tTime = Math.ceil(this.throttleTime / this.throttleCounts);
      console.log("avgDrawTime", tTime);
      tTime *= 1.2;
      tTime = Math.max(20, tTime);
      return this.throttledDraw = _.throttle(this.draw, tTime);
    }
  },
  manageEvents: function() {
    var events;
    events = {};
    events.mousedown = "_onmousedown";
    events.touchstart = "_ontouchstart";
    if (this.g.config.get("registerMouseClicks")) {
      events.dblclick = "_onclick";
    }
    if (this.g.config.get("registerMouseHover")) {
      events.mousein = "_onmousein";
      events.mouseout = "_onmouseout";
    }
    events.mousewheel = "_onmousewheel";
    events.DOMMouseScroll = "_onmousewheel";
    this.delegateEvents(events);
    this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents);
    this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents);
    return this.dragStart = [];
  },
  _setColor: function() {
    return this.color = this.g.colorscheme.getSelectedScheme();
  },
  draw: function() {
    this.el.width = this.el.width;
    if ((this.seqDrawer != null) && this.model.length > 0) {
      this.seqDrawer.drawLetters();
      this.seqDrawer.drawRows(this.sel._appendSelection, this.sel);
      return this.seqDrawer.drawRows(this.drawFeatures, this);
    }
  },
  drawFeatures: function(data) {
    var ctx, rectHeight, rectWidth;
    rectWidth = this.g.zoomer.get("columnWidth");
    rectHeight = this.g.zoomer.get("rowHeight");
    if (data.model.attributes.height > 1) {
      ctx = this.ctx;
      data.model.attributes.features.each(function(feature) {
        var len, y;
        ctx.fillStyle = feature.attributes.fillColor || "red";
        len = feature.attributes.xEnd - feature.attributes.xStart + 1;
        y = (feature.attributes.row + 1) * rectHeight;
        return ctx.fillRect(feature.attributes.xStart * rectWidth + data.xZero, y + data.yZero, rectWidth * len, rectHeight);
      });
      ctx.fillStyle = "black";
      ctx.font = this.g.zoomer.get("residueFont") + "px mono";
      ctx.textBaseline = 'middle';
      ctx.textAlign = "center";
      return data.model.attributes.features.each(function(feature) {
        var len, y;
        len = feature.attributes.xEnd - feature.attributes.xStart + 1;
        y = (feature.attributes.row + 1) * rectHeight;
        return ctx.fillText(feature.attributes.text, data.xZero + feature.attributes.xStart * rectWidth + (len / 2) * rectWidth, data.yZero + rectHeight * 0.5 + y);
      });
    }
  },
  render: function() {
    this.el.setAttribute('height', this.g.zoomer.get("alignmentHeight") + "px");
    this.el.setAttribute('width', this.g.zoomer.getAlignmentWidth() + "px");
    this.g.zoomer._checkScrolling(this._checkScrolling([this.g.zoomer.get('_alignmentScrollLeft'), this.g.zoomer.get('_alignmentScrollTop')]), {
      header: "canvasseq"
    });
    this._setColor();
    this.seqDrawer = new CanvasSeqDrawer(this.g, this.ctx, this.model, {
      width: this.el.width,
      height: this.el.height,
      color: this.color,
      cache: this.cache
    });
    this.throttledDraw();
    return this;
  },
  _onmousemove: function(e, reversed) {
    var dragEnd, i, j, k, l, relDist, relEnd, scaleFactor, scrollCorrected;
    if (this.dragStart.length === 0) {
      return;
    }
    dragEnd = mouse.abs(e);
    relEnd = [dragEnd[0] - this.dragStart[0], dragEnd[1] - this.dragStart[1]];
    scaleFactor = this.g.zoomer.get("canvasEventScale");
    if (reversed) {
      scaleFactor = 3;
    }
    for (i = j = 0; j <= 1; i = j += 1) {
      relEnd[i] = relEnd[i] * scaleFactor;
    }
    relDist = [this.dragStartScroll[0] - relEnd[0], this.dragStartScroll[1] - relEnd[1]];
    for (i = k = 0; k <= 1; i = k += 1) {
      relDist[i] = Math.round(relDist[i]);
    }
    scrollCorrected = this._checkScrolling(relDist);
    this.g.zoomer._checkScrolling(scrollCorrected, {
      origin: "canvasseq"
    });
    for (i = l = 0; l <= 1; i = l += 1) {
      if (scrollCorrected[i] !== relDist[i]) {
        if (scrollCorrected[i] === 0) {
          this.dragStart[i] = dragEnd[i];
          this.dragStartScroll[i] = 0;
        } else {
          this.dragStart[i] = dragEnd[i] - scrollCorrected[i];
        }
      }
    }
    this.throttledDraw();
    if (e.preventDefault != null) {
      e.preventDefault();
      return e.stopPropagation();
    }
  },
  _ontouchmove: function(e) {
    this._onmousemove(e.changedTouches[0], true);
    e.preventDefault();
    return e.stopPropagation();
  },
  _onmousedown: function(e) {
    this.dragStart = mouse.abs(e);
    this.dragStartScroll = [this.g.zoomer.get('_alignmentScrollLeft'), this.g.zoomer.get('_alignmentScrollTop')];
    jbone(document.body).on('mousemove.overmove', (function(_this) {
      return function(e) {
        return _this._onmousemove(e);
      };
    })(this));
    jbone(document.body).on('mouseup.overup', (function(_this) {
      return function() {
        return _this._cleanup();
      };
    })(this));
    return e.preventDefault();
  },
  _ontouchstart: function(e) {
    this.dragStart = mouse.abs(e.changedTouches[0]);
    this.dragStartScroll = [this.g.zoomer.get('_alignmentScrollLeft'), this.g.zoomer.get('_alignmentScrollTop')];
    jbone(document.body).on('touchmove.overtmove', (function(_this) {
      return function(e) {
        return _this._ontouchmove(e);
      };
    })(this));
    return jbone(document.body).on('touchend.overtend touchleave.overtleave touchcancel.overtcanel', (function(_this) {
      return function(e) {
        return _this._touchCleanup(e);
      };
    })(this));
  },
  _onmousewinout: function(e) {
    if (e.toElement === document.body.parentNode) {
      return this._cleanup();
    }
  },
  _cleanup: function() {
    this.dragStart = [];
    jbone(document.body).off('.overmove');
    jbone(document.body).off('.overup');
    return jbone(document.body).off('.overout');
  },
  _touchCleanup: function(e) {
    if (e.changedTouches.length > 0) {
      this._onmousemove(e.changedTouches[0], true);
    }
    this.dragStart = [];
    jbone(document.body).off('.overtmove');
    jbone(document.body).off('.overtend');
    jbone(document.body).off('.overtleave');
    return jbone(document.body).off('.overtcancel');
  },
  _onmousewheel: function(e) {
    var delta;
    delta = mouse.wheelDelta(e);
    this.g.zoomer.set('_alignmentScrollLeft', this.g.zoomer.get('_alignmentScrollLeft') + delta[0]);
    this.g.zoomer.set('_alignmentScrollTop', this.g.zoomer.get('_alignmentScrollTop') + delta[1]);
    return e.preventDefault();
  },
  _onclick: function(e) {
    var res;
    res = this._getClickPos(e);
    if (res != null) {
      if (res.feature != null) {
        this.g.trigger("feature:click", res);
      } else {
        this.g.trigger("residue:click", res);
      }
    }
    return this.throttledDraw();
  },
  _onmousein: function(e) {
    var res;
    res = this._getClickPos(e);
    if (res != null) {
      if (res.feature != null) {
        this.g.trigger("feature:mousein", res);
      } else {
        this.g.trigger("residue:mousein", res);
      }
    }
    return this.throttledDraw();
  },
  _onmouseout: function(e) {
    var res;
    res = this._getClickPos(e);
    if (res != null) {
      if (res.feature != null) {
        this.g.trigger("feature:mouseout", res);
      } else {
        this.g.trigger("residue:mouseout", res);
      }
    }
    return this.throttledDraw();
  },
  _getClickPos: function(e) {
    var coords, feature, features, ref, rowNumber, seqId, x, y;
    coords = mouse.rel(e);
    coords[0] += this.g.zoomer.get("_alignmentScrollLeft");
    x = Math.floor(coords[0] / this.g.zoomer.get("columnWidth"));
    ref = this.seqDrawer._getSeqForYClick(coords[1]), y = ref[0], rowNumber = ref[1];
    x += this.g.columns.calcHiddenColumns(x);
    y += this.model.calcHiddenSeqs(y);
    x = Math.max(0, x);
    y = Math.max(0, y);
    seqId = this.model.at(y).get("id");
    if (rowNumber > 0) {
      features = this.model.at(y).get("features").getFeatureOnRow(rowNumber - 1, x);
      if (features.length !== 0) {
        feature = features[0];
        console.log(features[0].attributes);
        return {
          seqId: seqId,
          feature: feature,
          rowPos: x,
          evt: e
        };
      }
    } else {
      return {
        seqId: seqId,
        rowPos: x,
        evt: e
      };
    }
  },
  _checkScrolling: function(scrollObj) {
    var i, j, max;
    max = [this.coordsCache.maxScrollWidth, this.coordsCache.maxScrollHeight];
    for (i = j = 0; j <= 1; i = j += 1) {
      if (scrollObj[i] > max[i]) {
        scrollObj[i] = max[i];
      }
      if (scrollObj[i] < 0) {
        scrollObj[i] = 0;
      }
    }
    return scrollObj;
  }
});



},{"./CanvasCharCache":141,"./CanvasCoordsCache":142,"./CanvasSelection":143,"./CanvasSeqDrawer":145,"backbone-childs":2,"jbone":67,"mouse-pos":71,"underscore":91}],145:[function(require,module,exports){
var _, construc, drawer;

_ = require("underscore");

drawer = {
  drawLetters: function() {
    var rectHeight;
    rectHeight = this.rectHeight;
    this.ctx.globalAlpha = this.g.colorscheme.get("opacity");
    this.drawSeqs(function(data) {
      return this.drawSeq(data, this._drawRect);
    });
    this.ctx.globalAlpha = 1;
    return this.drawSeqs(function(data) {
      return this.drawSeq(data, this._drawLetter);
    });
  },
  drawSeqs: function(callback, target) {
    var hidden, i, k, ref, ref1, ref2, results, seq, seqHeight, start, y;
    hidden = this.g.columns.get("hidden");
    target = target || this;
    ref = this.getStartSeq(), start = ref[0], y = ref[1];
    results = [];
    for (i = k = ref1 = start, ref2 = this.model.length - 1; k <= ref2; i = k += 1) {
      seq = this.model.at(i);
      if (seq.get('hidden')) {
        continue;
      }
      callback.call(target, {
        model: seq,
        yPos: y,
        y: i,
        hidden: hidden
      });
      seqHeight = (seq.attributes.height || 1) * this.rectHeight;
      y = y + seqHeight;
      if (y > this.height) {
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  drawRows: function(callback, target) {
    return this.drawSeqs(function(data) {
      return this.drawRow(data, callback, target);
    });
  },
  drawRow: function(data, callback, target) {
    var rectWidth, start, x, xZero, yZero;
    rectWidth = this.g.zoomer.get("columnWidth");
    start = Math.max(0, Math.abs(Math.ceil(-this.g.zoomer.get('_alignmentScrollLeft') / rectWidth)));
    x = -Math.abs(-this.g.zoomer.get('_alignmentScrollLeft') % rectWidth);
    xZero = x - start * rectWidth;
    yZero = data.yPos;
    return callback.call(target, {
      model: data.model,
      xZero: xZero,
      yZero: yZero,
      hidden: data.hidden
    });
  },
  getStartSeq: function() {
    var counter, i, start, y;
    start = (Math.max(0, Math.floor(this.g.zoomer.get('_alignmentScrollTop') / this.rectHeight))) + 1;
    counter = 0;
    i = 0;
    while (counter < start && i < this.model.length) {
      counter += this.model.at(i).attributes.height || 1;
      i++;
    }
    y = Math.max(0, this.g.zoomer.get('_alignmentScrollTop') - counter * this.rectHeight + (this.model.at(i - 1).attributes.height || 1) * this.rectHeight);
    return [i - 1, -y];
  },
  _getSeqForYClick: function(click) {
    var clickedRows, counter, i, ref, rowNumber, start, yDiff, yRel;
    ref = this.getStartSeq(), start = ref[0], yDiff = ref[1];
    yRel = yDiff % this.rectHeight;
    clickedRows = (Math.max(0, Math.floor((click - yRel) / this.rectHeight))) + 1;
    counter = 0;
    i = start;
    while (counter < clickedRows && i < this.model.length) {
      counter += this.model.at(i).attributes.height || 1;
      i++;
    }
    rowNumber = Math.max(0, Math.floor(click / this.rectHeight) - counter + (this.model.at(i - 1).get("height") || 1));
    return [i - 1, rowNumber];
  },
  drawSeq: function(data, callback) {
    var c, elWidth, j, k, rectHeight, rectWidth, ref, ref1, res, results, seq, start, x, y;
    seq = data.model.get("seq");
    y = data.yPos;
    rectWidth = this.rectWidth;
    rectHeight = this.rectHeight;
    start = Math.max(0, Math.abs(Math.ceil(-this.g.zoomer.get('_alignmentScrollLeft') / rectWidth)));
    x = -Math.abs(-this.g.zoomer.get('_alignmentScrollLeft') % rectWidth);
    res = {
      rectWidth: rectWidth,
      rectHeight: rectHeight,
      yPos: y,
      y: data.y
    };
    elWidth = this.width;
    results = [];
    for (j = k = ref = start, ref1 = seq.length - 1; k <= ref1; j = k += 1) {
      c = seq[j];
      c = c.toUpperCase();
      res.x = j;
      res.c = c;
      res.xPos = x;
      if (data.hidden.indexOf(j) < 0) {
        callback(this, res);
      } else {
        continue;
      }
      x = x + rectWidth;
      if (x > elWidth) {
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  _drawRect: function(that, data) {
    var color;
    color = that.color.getColor(data.c, {
      pos: data.x,
      y: data.y
    });
    if (color != null) {
      that.ctx.fillStyle = color;
      return that.ctx.fillRect(data.xPos, data.yPos, data.rectWidth, data.rectHeight);
    }
  },
  _drawLetter: function(that, data) {
    return that.ctx.drawImage(that.cache.getFontTile(data.c, data.rectWidth, data.rectHeight), data.xPos, data.yPos, data.rectWidth, data.rectHeight);
  }
};

module.exports = construc = function(g, ctx, model, opts) {
  this.g = g;
  this.ctx = ctx;
  this.model = model;
  this.width = opts.width;
  this.height = opts.height;
  this.color = opts.color;
  this.cache = opts.cache;
  this.rectHeight = this.g.zoomer.get("rowHeight");
  this.rectWidth = this.g.zoomer.get("columnWidth");
  return this;
};

_.extend(construc.prototype, drawer);



},{"underscore":91}],146:[function(require,module,exports){
var ConservationView, dom, svg, view;

view = require("backbone-viewj");

dom = require("dom-helper");

svg = require("../../utils/svg");

ConservationView = view.extend({
  className: "biojs_msa_conserv",
  initialize: function(data) {
    this.g = data.g;
    this.listenTo(this.g.zoomer, "change:stepSize change:labelWidth change:columnWidth", this.render);
    this.listenTo(this.g.vis, "change:labels change:metacell", this.render);
    this.listenTo(this.g.columns, "change:scaling", this.render);
    this.listenTo(this.g.stats, "reset", this.render);
    return this.manageEvents();
  },
  render: function() {
    var avgHeight, cellWidth, conserv, height, hidden, i, j, maxHeight, n, nMax, rect, ref, s, stepSize, width, x;
    conserv = this.g.stats.scale(this.g.stats.conservation());
    dom.removeAllChilds(this.el);
    nMax = this.model.getMaxLength();
    cellWidth = this.g.zoomer.get("columnWidth");
    maxHeight = 20;
    width = cellWidth * (nMax - this.g.columns.get('hidden').length);
    s = svg.base({
      height: maxHeight,
      width: width
    });
    s.style.display = "inline-block";
    s.style.cursor = "pointer";
    stepSize = this.g.zoomer.get("stepSize");
    hidden = this.g.columns.get("hidden");
    x = 0;
    n = 0;
    while (n < nMax) {
      if (hidden.indexOf(n) >= 0) {
        n += stepSize;
        continue;
      }
      width = cellWidth * stepSize;
      avgHeight = 0;
      for (i = j = 0, ref = stepSize - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        avgHeight += conserv[n];
      }
      height = maxHeight * (avgHeight / stepSize);
      rect = svg.rect({
        x: x,
        y: maxHeight - height,
        width: width - cellWidth / 4,
        height: height,
        style: "stroke:red;stroke-width:1;"
      });
      rect.rowPos = n;
      s.appendChild(rect);
      x += width;
      n += stepSize;
    }
    this.el.appendChild(s);
    return this;
  },
  _onclick: function(evt) {
    var i, j, ref, results, rowPos, stepSize;
    rowPos = evt.target.rowPos;
    stepSize = this.g.zoomer.get("stepSize");
    results = [];
    for (i = j = 0, ref = stepSize - 1; j <= ref; i = j += 1) {
      results.push(this.g.trigger("bar:click", {
        rowPos: rowPos + i,
        evt: evt
      }));
    }
    return results;
  },
  manageEvents: function() {
    var events;
    events = {};
    if (this.g.config.get("registerMouseClicks")) {
      events.click = "_onclick";
    }
    if (this.g.config.get("registerMouseHover")) {
      events.mousein = "_onmousein";
      events.mouseout = "_onmouseout";
    }
    this.delegateEvents(events);
    this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents);
    return this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents);
  },
  _onmousein: function(evt) {
    var rowPos;
    rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    return this.g.trigger("bar:mousein", {
      rowPos: rowPos,
      evt: evt
    });
  },
  _onmouseout: function(evt) {
    var rowPos;
    rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    return this.g.trigger("bar:mouseout", {
      rowPos: rowPos,
      evt: evt
    });
  }
});

module.exports = ConservationView;



},{"../../utils/svg":135,"backbone-viewj":9,"dom-helper":66}],147:[function(require,module,exports){
var ConservationView, dom, svg, view;

view = require("backbone-viewj");

dom = require("dom-helper");

svg = require("../../utils/svg");

ConservationView = view.extend({
  className: "biojs_msa_gapview",
  initialize: function(data) {
    this.g = data.g;
    this.listenTo(this.g.zoomer, "change:stepSize change:labelWidth change:columnWidth", this.render);
    this.listenTo(this.g.vis, "change:labels change:metacell", this.render);
    this.listenTo(this.g.columns, "change:scaling", this.render);
    this.listenTo(this.model, "reset", this.render);
    return this.manageEvents();
  },
  render: function() {
    var avgHeight, cellWidth, gaps, height, hidden, i, j, maxHeight, n, nMax, rect, ref, s, stepSize, width, x;
    gaps = this.g.stats.gaps();
    dom.removeAllChilds(this.el);
    nMax = this.model.getMaxLength();
    cellWidth = this.g.zoomer.get("columnWidth");
    maxHeight = 20;
    width = cellWidth * (nMax - this.g.columns.get('hidden').length);
    s = svg.base({
      height: maxHeight,
      width: width
    });
    s.style.display = "inline-block";
    s.style.cursor = "pointer";
    stepSize = this.g.zoomer.get("stepSize");
    hidden = this.g.columns.get("hidden");
    x = 0;
    n = 0;
    while (n < nMax) {
      if (hidden.indexOf(n) >= 0) {
        n += stepSize;
        continue;
      }
      width = cellWidth * stepSize;
      avgHeight = 0;
      for (i = j = 0, ref = stepSize - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        avgHeight += gaps[n];
      }
      height = maxHeight * (avgHeight / stepSize);
      rect = svg.rect({
        x: x,
        y: maxHeight - height,
        width: width - cellWidth / 4,
        height: height,
        style: "stroke:red;stroke-width:1;"
      });
      rect.rowPos = n;
      s.appendChild(rect);
      x += width;
      n += stepSize;
    }
    this.el.appendChild(s);
    return this;
  },
  _onclick: function(evt) {
    var i, j, ref, results, rowPos, stepSize;
    rowPos = evt.target.rowPos;
    stepSize = this.g.zoomer.get("stepSize");
    results = [];
    for (i = j = 0, ref = stepSize - 1; j <= ref; i = j += 1) {
      results.push(this.g.trigger("gap:click", {
        rowPos: rowPos + i,
        evt: evt
      }));
    }
    return results;
  },
  manageEvents: function() {
    var events;
    events = {};
    if (this.g.config.get("registerMouseClicks")) {
      events.click = "_onclick";
    }
    if (this.g.config.get("registerMouseHover")) {
      events.mousein = "_onmousein";
      events.mouseout = "_onmouseout";
    }
    this.delegateEvents(events);
    this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents);
    return this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents);
  },
  _onmousein: function(evt) {
    var rowPos;
    rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    return this.g.trigger("gap:mousein", {
      rowPos: rowPos,
      evt: evt
    });
  },
  _onmouseout: function(evt) {
    var rowPos;
    rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    return this.g.trigger("gap:mouseout", {
      rowPos: rowPos,
      evt: evt
    });
  }
});

module.exports = ConservationView;



},{"../../utils/svg":135,"backbone-viewj":9,"dom-helper":66}],148:[function(require,module,exports){
var LabelHeader, RightLabelHeader, boneView;

boneView = require("backbone-childs");

LabelHeader = require("./LabelHeader");

RightLabelHeader = require("./RightHeaderBlock");

module.exports = boneView.extend({
  initialize: function(data) {
    this.g = data.g;
    this.draw();
    return this.listenTo(this.g.vis, "change:labels change:metacell change:leftHeader", (function(_this) {
      return function() {
        _this.draw();
        return _this.render();
      };
    })(this));
  },
  draw: function() {
    var lHeader, rHeader;
    this.removeViews();
    if (this.g.vis.get("leftHeader") && (this.g.vis.get("labels") || this.g.vis.get("metacell"))) {
      lHeader = new LabelHeader({
        model: this.model,
        g: this.g
      });
      lHeader.ordering = -50;
      this.addView("lHeader", lHeader);
    }
    rHeader = new RightLabelHeader({
      model: this.model,
      g: this.g
    });
    rHeader.ordering = 0;
    return this.addView("rHeader", rHeader);
  },
  render: function() {
    this.renderSubviews();
    return this.el.className = "biojs_msa_header";
  }
});



},{"./LabelHeader":149,"./RightHeaderBlock":151,"backbone-childs":2}],149:[function(require,module,exports){
var LabelHeader, dom, k, view;

k = require("koala-js");

view = require("backbone-viewj");

dom = require("dom-helper");

module.exports = LabelHeader = view.extend({
  className: "biojs_msa_headers",
  initialize: function(data) {
    this.g = data.g;
    this.listenTo(this.g.vis, "change:metacell change:labels", this.render);
    return this.listenTo(this.g.zoomer, "change:labelWidth change:metaWidth", this.render);
  },
  render: function() {
    var width;
    dom.removeAllChilds(this.el);
    width = 0;
    width += this.g.zoomer.getLeftBlockWidth();
    this.el.style.width = width + "px";
    if (this.g.vis.get("labels")) {
      this.el.appendChild(this.labelDOM());
    }
    if (this.g.vis.get("metacell")) {
      this.el.appendChild(this.metaDOM());
    }
    this.el.style.display = "inline-block";
    this.el.style.fontSize = this.g.zoomer.get("markerFontsize");
    return this;
  },
  labelDOM: function() {
    var labelHeader, name;
    labelHeader = k.mk("div");
    labelHeader.style.width = this.g.zoomer.getLabelWidth();
    labelHeader.style.display = "inline-block";
    if (this.g.vis.get("labelCheckbox")) {
      labelHeader.appendChild(this.addEl(".", 10));
    }
    if (this.g.vis.get("labelId")) {
      labelHeader.appendChild(this.addEl("id", this.g.zoomer.get("labelIdLength")));
    }
    if (this.g.vis.get("labelPartition")) {
      labelHeader.appendChild(this.addEl("part", 15));
    }
    if (this.g.vis.get("labelName")) {
      name = this.addEl("name");
      labelHeader.appendChild(name);
    }
    return labelHeader;
  },
  addEl: function(content, width) {
    var id;
    id = document.createElement("span");
    id.textContent = content;
    if (width != null) {
      id.style.width = width + "px";
    }
    id.style.display = "inline-block";
    return id;
  },
  metaDOM: function() {
    var metaHeader;
    metaHeader = k.mk("div");
    metaHeader.style.width = this.g.zoomer.getMetaWidth();
    metaHeader.style.display = "inline-block";
    if (this.g.vis.get("metaGaps")) {
      metaHeader.appendChild(this.addEl("gaps", this.g.zoomer.get('metaGapWidth')));
    }
    if (this.g.vis.get("metaIdentity")) {
      metaHeader.appendChild(this.addEl("ident", this.g.zoomer.get('metaIdentWidth')));
    }
    if (this.g.vis.get("metaLinks")) {
      metaHeader.appendChild(this.addEl("links"));
    }
    return metaHeader;
  }
});



},{"backbone-viewj":9,"dom-helper":66,"koala-js":68}],150:[function(require,module,exports){
var HeaderView, dom, jbone, svg, view;

view = require("backbone-viewj");

dom = require("dom-helper");

svg = require("../../utils/svg");

jbone = require("jbone");

HeaderView = view.extend({
  className: "biojs_msa_marker",
  initialize: function(data) {
    this.g = data.g;
    this.listenTo(this.g.zoomer, "change:stepSize change:labelWidth change:columnWidth change:markerStepSize change:markerFontsize", this.render);
    this.listenTo(this.g.vis, "change:labels change:metacell", this.render);
    return this.manageEvents();
  },
  render: function() {
    var cellWidth, container, hidden, n, nMax, span, stepSize;
    dom.removeAllChilds(this.el);
    this.el.style.fontSize = this.g.zoomer.get("markerFontsize");
    container = document.createElement("span");
    n = 0;
    cellWidth = this.g.zoomer.get("columnWidth");
    nMax = this.model.getMaxLength();
    stepSize = this.g.zoomer.get("stepSize");
    hidden = this.g.columns.get("hidden");
    while (n < nMax) {
      if (hidden.indexOf(n) >= 0) {
        this.markerHidden(span, n, stepSize);
        n += stepSize;
        continue;
      }
      span = document.createElement("span");
      span.style.width = (cellWidth * stepSize) + "px";
      span.style.display = "inline-block";
      if ((n + 1) % this.g.zoomer.get('markerStepSize') === 0) {
        span.textContent = n + 1;
      } else {
        span.textContent = ".";
      }
      span.rowPos = n;
      n += stepSize;
      container.appendChild(span);
    }
    this.el.appendChild(container);
    return this;
  },
  markerHidden: function(span, n, stepSize) {
    var hidden, i, index, j, k, length, min, nMax, prevHidden, ref, ref1, ref2, ref3, s, triangle;
    hidden = this.g.columns.get("hidden").slice(0);
    min = Math.max(0, n - stepSize);
    prevHidden = true;
    for (j = i = ref = min, ref1 = n; i <= ref1; j = i += 1) {
      prevHidden &= hidden.indexOf(j) >= 0;
    }
    if (prevHidden) {
      return;
    }
    nMax = this.model.getMaxLength();
    length = 0;
    index = -1;
    for (n = k = ref2 = n, ref3 = nMax; k <= ref3; n = k += 1) {
      if (!(index >= 0)) {
        index = hidden.indexOf(n);
      }
      if (hidden.indexOf(n) >= 0) {
        length++;
      } else {
        break;
      }
    }
    s = svg.base({
      height: 10,
      width: 10
    });
    s.style.position = "relative";
    triangle = svg.polygon({
      points: "0,0 5,5 10,0",
      style: "fill:lime;stroke:purple;stroke-width:1"
    });
    jbone(triangle).on("click", (function(_this) {
      return function(evt) {
        hidden.splice(index, length);
        return _this.g.columns.set("hidden", hidden);
      };
    })(this));
    s.appendChild(triangle);
    span.appendChild(s);
    return s;
  },
  manageEvents: function() {
    var events;
    events = {};
    if (this.g.config.get("registerMouseClicks")) {
      events.click = "_onclick";
    }
    if (this.g.config.get("registerMouseHover")) {
      events.mousein = "_onmousein";
      events.mouseout = "_onmouseout";
    }
    this.delegateEvents(events);
    this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents);
    return this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents);
  },
  _onclick: function(evt) {
    var rowPos, stepSize;
    rowPos = evt.target.rowPos;
    stepSize = this.g.zoomer.get("stepSize");
    return this.g.trigger("column:click", {
      rowPos: rowPos,
      stepSize: stepSize,
      evt: evt
    });
  },
  _onmousein: function(evt) {
    var rowPos, stepSize;
    rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    stepSize = this.g.zoomer.get("stepSize");
    return this.g.trigger("column:mousein", {
      rowPos: rowPos,
      stepSize: stepSize,
      evt: evt
    });
  },
  _onmouseout: function(evt) {
    var rowPos, stepSize;
    rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    stepSize = this.g.zoomer.get("stepSize");
    return this.g.trigger("column:mouseout", {
      rowPos: rowPos,
      stepSize: stepSize,
      evt: evt
    });
  }
});

module.exports = HeaderView;



},{"../../utils/svg":135,"backbone-viewj":9,"dom-helper":66,"jbone":67}],151:[function(require,module,exports){
var ConservationView, GapView, MarkerView, SeqLogoWrapper, _, boneView;

MarkerView = require("./MarkerView");

ConservationView = require("./ConservationView");

boneView = require("backbone-childs");

_ = require('underscore');

SeqLogoWrapper = require("./SeqLogoWrapper");

GapView = require("./GapView");

module.exports = boneView.extend({
  initialize: function(data) {
    this.g = data.g;
    this.blockEvents = false;
    this.listenTo(this.g.vis, "change:header", function() {
      this.draw();
      return this.render();
    });
    this.listenTo(this.g.vis, "change", this._setSpacer);
    this.listenTo(this.g.zoomer, "change:alignmentWidth", this._setWidth);
    this.listenTo(this.g.zoomer, "change:_alignmentScrollLeft", this._adjustScrollingLeft);
    this.listenTo(this.g.columns, "change:hidden", function() {
      this.draw();
      return this.render();
    });
    this.draw();
    return this.g.vis.once('change:loaded', this._adjustScrollingLeft, this);
  },
  events: {
    "scroll": "_sendScrollEvent"
  },
  draw: function() {
    var conserv, gapview, marker, seqlogo;
    this.removeViews();
    if (this.g.vis.get("conserv")) {
      conserv = new ConservationView({
        model: this.model,
        g: this.g
      });
      conserv.ordering = -20;
      this.addView("conserv", conserv);
    }
    if (this.g.vis.get("markers")) {
      marker = new MarkerView({
        model: this.model,
        g: this.g
      });
      marker.ordering = -10;
      this.addView("marker", marker);
    }
    if (this.g.vis.get("seqlogo")) {
      seqlogo = new SeqLogoWrapper({
        model: this.model,
        g: this.g
      });
      seqlogo.ordering = -30;
      this.addView("seqlogo", seqlogo);
    }
    if (this.g.vis.get("gapHeader")) {
      gapview = new GapView({
        model: this.model,
        g: this.g
      });
      gapview.ordering = -25;
      return this.addView("gapview", gapview);
    }
  },
  render: function() {
    this.renderSubviews();
    this._setSpacer();
    this.el.className = "biojs_msa_rheader";
    this.el.style.overflowX = "auto";
    this.el.style.display = "inline-block";
    this._setWidth();
    this._adjustScrollingLeft();
    return this;
  },
  _sendScrollEvent: function() {
    if (!this.blockEvents) {
      this.g.zoomer.set("_alignmentScrollLeft", this.el.scrollLeft, {
        origin: "header"
      });
    }
    return this.blockEvents = false;
  },
  _adjustScrollingLeft: function(model, value, options) {
    var scrollLeft;
    if (((options != null ? options.origin : void 0) == null) || options.origin !== "header") {
      scrollLeft = this.g.zoomer.get("_alignmentScrollLeft");
      this.blockEvents = true;
      return this.el.scrollLeft = scrollLeft;
    }
  },
  _setSpacer: function() {
    return this.el.style.marginLeft = this._getLabelWidth() + "px";
  },
  _getLabelWidth: function() {
    var paddingLeft;
    paddingLeft = 0;
    if (!this.g.vis.get("leftHeader")) {
      paddingLeft += this.g.zoomer.getLeftBlockWidth();
    }
    return paddingLeft;
  },
  _setWidth: function() {
    return this.el.style.width = this.g.zoomer.getAlignmentWidth() + "px";
  }
});



},{"./ConservationView":146,"./GapView":147,"./MarkerView":150,"./SeqLogoWrapper":152,"backbone-childs":2,"underscore":91}],152:[function(require,module,exports){
var SeqLogoView, view;

SeqLogoView = require("biojs-vis-seqlogo/light");

view = require("backbone-viewj");

module.exports = view.extend({
  initialize: function(data) {
    this.g = data.g;
    this.listenTo(this.g.zoomer, "change:alignmentWidth", this.render);
    this.listenTo(this.g.colorscheme, "change", function() {
      var colors;
      colors = this.g.colorscheme.getSelectedScheme();
      this.seqlogo.changeColors(colors);
      return this.render();
    });
    this.listenTo(this.g.zoomer, "change:columnWidth", function() {
      return this.seqlogo.column_width = this.g.zoomer.get('columnWidth');
    });
    this.render;
    return this.draw();
  },
  draw: function() {
    var arr, colors, data;
    console.log("redraw");
    arr = this.g.stats.conservResidue({
      scaled: true
    });
    arr = _.map(arr, function(el) {
      return _.pick(el, function(e, k) {
        return k !== "-";
      });
    });
    data = {
      alphabet: "aa",
      heightArr: arr
    };
    colors = this.g.colorscheme.getSelectedScheme();
    return this.seqlogo = new SeqLogoView({
      model: this.model,
      g: this.g,
      data: data,
      yaxis: false,
      scroller: false,
      xaxis: false,
      height: 100,
      column_width: this.g.zoomer.get('columnWidth'),
      positionMarker: false,
      zoom: 1,
      el: this.el,
      colors: colors
    });
  },
  render: function() {
    return this.seqlogo.render();
  }
});



},{"backbone-viewj":9,"biojs-vis-seqlogo/light":47}],153:[function(require,module,exports){
var LabelRowView, boneView;

LabelRowView = require("./LabelRowView");

boneView = require("backbone-childs");

module.exports = boneView.extend({
  initialize: function(data) {
    this.g = data.g;
    this.draw();
    this.listenTo(this.g.zoomer, "change:_alignmentScrollTop", this._adjustScrollingTop);
    this.g.vis.once('change:loaded', this._adjustScrollingTop, this);
    this.listenTo(this.g.zoomer, "change:alignmentHeight", this._setHeight);
    return this.listenTo(this.model, "change:reference", this.draw);
  },
  draw: function() {
    var i, j, ref, results, view;
    this.removeViews();
    results = [];
    for (i = j = 0, ref = this.model.length - 1; j <= ref; i = j += 1) {
      if (this.model.at(i).get('hidden')) {
        continue;
      }
      view = new LabelRowView({
        model: this.model.at(i),
        g: this.g
      });
      view.ordering = i;
      results.push(this.addView("row_" + i, view));
    }
    return results;
  },
  events: {
    "scroll": "_sendScrollEvent"
  },
  _sendScrollEvent: function() {
    return this.g.zoomer.set("_alignmentScrollTop", this.el.scrollTop, {
      origin: "label"
    });
  },
  _adjustScrollingTop: function() {
    return this.el.scrollTop = this.g.zoomer.get("_alignmentScrollTop");
  },
  render: function() {
    this.renderSubviews();
    this.el.className = "biojs_msa_labelblock";
    this.el.style.display = "inline-block";
    this.el.style.verticalAlign = "top";
    this.el.style.overflowY = "auto";
    this.el.style.overflowX = "hidden";
    this.el.style.fontSize = (this.g.zoomer.get('labelFontsize')) + "px";
    this.el.style.lineHeight = "" + (this.g.zoomer.get("labelLineHeight"));
    this._setHeight();
    return this;
  },
  _setHeight: function() {
    return this.el.style.height = this.g.zoomer.get("alignmentHeight") + "px";
  }
});



},{"./LabelRowView":154,"backbone-childs":2}],154:[function(require,module,exports){
var LabelView, MetaView, boneView;

boneView = require("backbone-childs");

LabelView = require("./LabelView");

MetaView = require("./MetaView");

module.exports = boneView.extend({
  initialize: function(data) {
    this.g = data.g;
    this.draw();
    this.listenTo(this.g.vis, "change:labels", this.drawR);
    this.listenTo(this.g.vis, "change:metacell", this.drawR);
    this.listenTo(this.g.zoomer, "change:rowHeight", function() {
      return this.el.style.height = this.g.zoomer.get("rowHeight") + "px";
    });
    return this.listenTo(this.g.selcol, "change reset add", this.setSelection);
  },
  draw: function() {
    var meta;
    this.removeViews();
    if (this.g.vis.get("labels")) {
      this.addView("labels", new LabelView({
        model: this.model,
        g: this.g
      }));
    }
    if (this.g.vis.get("metacell")) {
      meta = new MetaView({
        model: this.model,
        g: this.g
      });
      return this.addView("metacell", meta);
    }
  },
  drawR: function() {
    this.draw();
    return this.render();
  },
  render: function() {
    this.renderSubviews();
    this.el.setAttribute("class", "biojs_msa_labelrow");
    this.el.style.height = this.g.zoomer.get("rowHeight") * (this.model.attributes.height || 1) + "px";
    this.setSelection();
    return this;
  },
  setSelection: function() {
    var sel;
    sel = this.g.selcol.getSelForRow(this.model.id);
    if (sel.length > 0) {
      return this.el.style.fontWeight = "bold";
    } else {
      return this.el.style.fontWeight = "normal";
    }
  }
});



},{"./LabelView":155,"./MetaView":156,"backbone-childs":2}],155:[function(require,module,exports){
var LabelView, dom, view;

view = require("backbone-viewj");

dom = require("dom-helper");

LabelView = view.extend({
  initialize: function(data) {
    this.seq = data.seq;
    this.g = data.g;
    return this.manageEvents();
  },
  manageEvents: function() {
    var events;
    events = {};
    if (this.g.config.get("registerMouseClicks")) {
      events.click = "_onclick";
    }
    if (this.g.config.get("registerMouseHover")) {
      events.mousein = "_onmousein";
      events.mouseout = "_onmouseout";
    }
    this.delegateEvents(events);
    this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents);
    this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents);
    this.listenTo(this.g.vis, "change:labelName change:labelId change:labelPartition change:labelCheckbox", this.render);
    this.listenTo(this.g.zoomer, "change:labelIdLength change:labelNameLength change:labelPartLength change:labelCheckLength", this.render);
    return this.listenTo(this.g.zoomer, "change:labelFontSize change:labelLineHeight change:labelWidth change:rowHeight", this.render);
  },
  render: function() {
    var checkBox, id, name, part, val;
    dom.removeAllChilds(this.el);
    this.el.style.width = (this.g.zoomer.getLabelWidth()) + "px";
    this.el.setAttribute("class", "biojs_msa_labels");
    if (this.g.vis.get("labelCheckbox")) {
      checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.value = this.model.get('id');
      checkBox.name = "seq";
      checkBox.style.width = this.g.zoomer.get("labelCheckLength") + "px";
      this.el.appendChild(checkBox);
    }
    if (this.g.vis.get("labelId")) {
      id = document.createElement("span");
      val = this.model.get("id");
      if (!isNaN(val)) {
        val++;
      }
      id.textContent = val;
      id.style.width = this.g.zoomer.get("labelIdLength") + "px";
      id.style.display = "inline-block";
      this.el.appendChild(id);
    }
    if (this.g.vis.get("labelPartition")) {
      part = document.createElement("span");
      part.style.width = this.g.zoomer.get("labelPartLength") + "px";
      part.textContent = this.model.get("partition");
      part.style.display = "inline-block";
      this.el.appendChild(id);
      this.el.appendChild(part);
    }
    if (this.g.vis.get("labelName")) {
      name = document.createElement("span");
      name.textContent = this.model.get("name");
      if (this.model.get("ref") && this.g.config.get("hasRef")) {
        name.style.fontWeight = "bold";
      }
      name.style.width = this.g.zoomer.get("labelNameLength") + "px";
      this.el.appendChild(name);
    }
    this.el.style.overflow = scroll;
    this.el.style.fontSize = (this.g.zoomer.get('labelFontsize')) + "px";
    return this;
  },
  _onclick: function(evt) {
    var seqId;
    seqId = this.model.get("id");
    return this.g.trigger("row:click", {
      seqId: seqId,
      evt: evt
    });
  },
  _onmousein: function(evt) {
    var seqId;
    seqId = this.model.get("id");
    return this.g.trigger("row:mouseout", {
      seqId: seqId,
      evt: evt
    });
  },
  _onmouseout: function(evt) {
    var seqId;
    seqId = this.model.get("id");
    return this.g.trigger("row:mouseout", {
      seqId: seqId,
      evt: evt
    });
  }
});

module.exports = LabelView;



},{"backbone-viewj":9,"dom-helper":66}],156:[function(require,module,exports){
var MenuBuilder, MetaView, _, dom, st, view;

view = require("backbone-viewj");

MenuBuilder = require("../../menu/menubuilder");

_ = require('underscore');

dom = require("dom-helper");

st = require("msa-seqtools");

module.exports = MetaView = view.extend({
  className: "biojs_msa_metaview",
  initialize: function(data) {
    this.g = data.g;
    this.listenTo(this.g.vis, "change:metacell", this.render);
    return this.listenTo(this.g.zoomer, "change:metaWidth", this.render);
  },
  events: {
    click: "_onclick",
    mousein: "_onmousein",
    mouseout: "_onmouseout"
  },
  render: function() {
    var gapSpan, gaps, ident, identSpan, linkEl, links, menu, seq, width;
    dom.removeAllChilds(this.el);
    this.el.style.display = "inline-block";
    width = this.g.zoomer.getMetaWidth();
    this.el.style.width = width - 10;
    this.el.style.paddingRight = 5;
    this.el.style.paddingLeft = 5;
    this.el.style.fontSize = (this.g.zoomer.get('labelFontsize') - 2) + "px";
    if (this.g.vis.get("metaGaps")) {
      seq = this.model.get('seq');
      gaps = _.reduce(seq, (function(memo, c) {
        if (c === '-') {
          memo++;
        }
        return memo;
      }), 0);
      gaps = (gaps / seq.length).toFixed(1);
      gapSpan = document.createElement('span');
      gapSpan.textContent = gaps;
      gapSpan.style.display = "inline-block";
      gapSpan.style.width = 35;
      this.el.appendChild(gapSpan);
    }
    if (this.g.vis.get("metaIdentity")) {
      ident = this.g.stats.identity()[this.model.id];
      identSpan = document.createElement('span');
      if (this.model.get("ref") && this.g.config.get("hasRef")) {
        identSpan.textContent = "ref.";
      } else if (ident != null) {
        identSpan.textContent = ident.toFixed(2);
      }
      identSpan.style.display = "inline-block";
      identSpan.style.width = 40;
      this.el.appendChild(identSpan);
    }
    if (this.g.vis.get("metaLinks")) {
      if (this.model.attributes.ids) {
        links = st.buildLinks(this.model.attributes.ids);
        if (_.keys(links).length > 0) {
          menu = new MenuBuilder({
            name: "↗"
          });
          console.log(_.keys(links));
          _.each(links, function(val, key) {
            return menu.addNode(key, function(e) {
              return window.open(val);
            });
          });
          linkEl = menu.buildDOM();
          linkEl.style.cursor = "pointer";
          return this.el.appendChild(linkEl);
        }
      }
    }
  },
  _onclick: function(evt) {
    return this.g.trigger("meta:click", {
      seqId: this.model.get("id", {
        evt: evt
      })
    });
  },
  _onmousein: function(evt) {
    return this.g.trigger("meta:mousein", {
      seqId: this.model.get("id", {
        evt: evt
      })
    });
  },
  _onmouseout: function(evt) {
    return this.g.trigger("meta:mouseout", {
      seqId: this.model.get("id", {
        evt: evt
      })
    });
  }
});



},{"../../menu/menubuilder":111,"backbone-viewj":9,"dom-helper":66,"msa-seqtools":89,"underscore":91}],"biojs-io-clustal":[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
var Clustal, GenericReader, st;

GenericReader = require("biojs-io-parser");

st = require("msa-seqtools");

module.exports = Clustal = {
  parse: function(text) {
    var blockstate, cSeq, k, keys, label, line, lines, match, obj, regex, seqCounter, seqs, sequence;
    seqs = [];
    if (Object.prototype.toString.call(text) === '[object Array]') {
      lines = text;
    } else {
      lines = text.split("\n");
    }
    if (lines[0].slice(0, 6) === !"CLUSTAL") {
      throw new Error("Invalid CLUSTAL Header");
    }
    k = 0;
    blockstate = 1;
    seqCounter = 0;
    while (k < lines.length) {
      k++;
      line = lines[k];
      if ((line == null) || line.length === 0) {
        blockstate = 1;
        continue;
      }
      if (line.trim().length === 0) {
        blockstate = 1;
        continue;
      } else {
        if (st.contains(line, "*")) {
          continue;
        }
        if (blockstate === 1) {
          seqCounter = 0;
          blockstate = 0;
        }
        regex = /^(?:\s*)(\S+)(?:\s+)(\S+)(?:\s*)(\d*)(?:\s*|$)/g;
        match = regex.exec(line);
        if (match != null) {
          label = match[1];
          sequence = match[2];
          if (seqCounter >= seqs.length) {
            obj = st.getMeta(label);
            label = obj.name;
            cSeq = new st.model(sequence, label, seqCounter);
            cSeq.ids = obj.ids || {};
            cSeq.details = obj.details || {};
            keys = Object.keys(cSeq.ids);
            if (keys.length > 0) {
              cSeq.id = cSeq.ids[keys[0]];
            }
            seqs.push(cSeq);
          } else {
            seqs[seqCounter].seq += sequence;
          }
          seqCounter++;
        } else {
          console.log("parse error", line);
        }
      }
    }
    return seqs;
  }
};

GenericReader.mixin(Clustal);

},{"biojs-io-parser":16,"msa-seqtools":89}],"biojs-io-fasta":[function(require,module,exports){
// Generated by CoffeeScript 1.9.0
var Fasta, GenericReader, st;

GenericReader = require("biojs-io-parser");

st = require("msa-seqtools");

module.exports = Fasta = {
  parse: function(text) {
    var currentSeq, keys, label, line, obj, seqs, _i, _len;
    seqs = [];
    if (!text || text.length === 0) {
      return [];
    }
    if (Object.prototype.toString.call(text) !== '[object Array]') {
      text = text.split("\n");
    }
    for (_i = 0, _len = text.length; _i < _len; _i++) {
      line = text[_i];
      if (line[0] === ">" || line[0] === ";") {
        label = line.slice(1);
        obj = st.getMeta(label);
        label = obj.name;
        currentSeq = new st.model("", label, seqs.length);
        currentSeq.ids = obj.ids || {};
        keys = Object.keys(currentSeq.ids);
        if (keys.length > 0) {
          currentSeq.id = currentSeq.ids[keys[0]];
        }
        currentSeq.details = obj.details || {};
        seqs.push(currentSeq);
      } else {
        currentSeq.seq += line;
      }
    }
    return seqs;
  },
  write: function(seqs, access) {
    var seq, text, _i, _len;
    text = "";
    for (_i = 0, _len = seqs.length; _i < _len; _i++) {
      seq = seqs[_i];
      if (access != null) {
        seq = access(seq);
      }
      text += ">" + seq.name + "\n";
      text += (st.splitNChars(seq.seq, 80)).join("\n");
      text += "\n";
    }
    return text;
  }
};

GenericReader.mixin(Fasta);

},{"biojs-io-parser":25,"msa-seqtools":89}],"biojs-io-gff":[function(require,module,exports){
/*
 * biojs-io-gff
 * https://github.com/greenify/biojs-io-gff
 *
 * Copyright (c) 2014 greenify
 * Licensed under the Apache 2 license.
 */

var parser = require("biojs-io-parser");

var gff = function() {};
parser.mixin(gff);

module.exports = gff;

var utils = require("./utils");
var jalview = require("./jalview");

/**
 * Method responsible to parse GFF
 * @see https://www.sanger.ac.uk/resources/software/gff/spec.html#t_2
 *
 * @example
 *
 *     biojsiogff.parse('SEQ1  EMBL  atg  103  105  .  +  0');
 *
 * @method parse
 * @param {String} file GFF file
 * @return {String} Returns JSON representation
 */

gff.parseLines = function(file) {
  var lines = file.split("\n");
  var config = {};
  var arr = [];
  config.type = gff._guessType(lines);
  var offset = 0;
  if (config.type === "jalview") {
    var ret = jalview.readHeader(lines);
    //console.log(ret);
    offset = ret.offset;
    config.colors = ret.colors;
    arr = ret.features;
  }
  for (var i = offset; i < lines.length; i++) {
    // ignore comments for now
    var line = lines[i];
    if (line.length === 0 || line[0] === "#")
      continue;

    line = gff.parseLine(line);
    if (line !== undefined)
      arr.push(line);
  }
  return {
    features: arr,
    config: config
  };
};

gff._guessType = function(line) {
  if (line[0].substring(0, 15) === "##gff-version 3") {
    return "gff3";
  } else if (line[0].indexOf("#") < 0 && line[0].split("\t").length === 2) {
    // no comments and two columns. let's hope this is from jalview
    return "jalview";
  }
  // unable to read file header. lets hope this is gff3
  return "gff3";
};

/**
 * parses GFF and returns a dictionary of all seqs with their features
 * @method parseSeqs
 * @param {String} file GFF file
 * @return {String} Returns dictionary of sequences with an array of their features
 */
gff.parseSeqs = gff.parse = function(file) {
  var obj = gff.parseLines (file);
  var seqs = {};
  obj.features.forEach(function(entry) {
    var key = entry.seqname;
    if (seqs[key] === undefined) seqs[key] = [];
    delete entry.seqname;
    seqs[key].push(entry);
  });
  delete obj.features;
  obj.seqs = seqs;
  return obj;
};

/*
 * parses one GFF line and returns it
 */
gff.parseLine = function(line) {
  var tLine = {};

  var columns = line.split(/\s+/);
  // ignore empty lines
  if (columns.length === 1)
    return;

  tLine.seqname = columns[0];
  tLine.source = columns[1];
  tLine.feature = columns[2];
  tLine.start = parseInt(columns[3]);
  tLine.end = parseInt(columns[4]);
  tLine.score = columns[5]; // only DNA,RNA
  tLine.strand = columns[6]; // only DNA,RNA
  tLine.frame = columns[7]; // only DNA,RNA
  var attr = columns.slice(8).join(" "); // plain text comments

  // remove undefined (dot)
  Object.keys(tLine).forEach(function(key) {
    if (tLine[key] === ".") {
      tLine[key] = undefined;
    }
  });

  // parse optional parameters
  if (tLine.score) {
    tLine.score = parseFloat(tLine.score);
  }
  if (tLine.frame) {
    tLine.frame = parseInt(tLine.frame);
  }

  tLine.attributes = utils.extractKeys(attr);
  return tLine;
};

gff.exportLine = function(line) {
  var attrs = Object.keys(line.attributes).map(function(key) {
    return key + "=" + line.attributes[key];
  }).join(";");
  var cells = [line.seqname, line.source, line.feature, line.start, line.end, line.score,
    line.strand, line.frame, attrs
  ];
  cells = cells.map(function(e) {
    if (e === undefined) {
      return ".";
    }
    return e;
  });
  return cells.join("\t");
};

gff.exportLines = function(lines) {
  return "##gff-version 3\n" + lines.map(gff.exportLine).join("\n");
};

gff.exportSeqs = gff.export = function(seqs) {
  var lines = [];
  var pLine = function(e) {
    e.seqname = key;
    lines.push(e);
  };

  for (var key in seqs) {
    seqs[key].forEach(pLine);
  }
  return gff.exportLines(lines);
};

},{"./jalview":34,"./utils":35,"biojs-io-parser":36}],"msa":[function(require,module,exports){
// browser globals
if (typeof biojs === 'undefined') {
  biojs = {};
}
if (typeof biojs.vis === 'undefined') {
  biojs.vis = {};
}
// use two namespaces
window.msa = biojs.vis.msa = module.exports = require('./src/index');

// TODO: how should this be bundled

if (typeof biojs.io === 'undefined') {
  biojs.io = {};
}

// just bundle the two parsers
window.biojs.io.fasta = require("biojs-io-fasta");
window.biojs.io.clustal = require("biojs-io-clustal");
window.biojs.xhr = require("xhr");

module.exports = require("./src/index");

require('./css/msa.css');

},{"./css/msa.css":1,"./src/index":108,"biojs-io-clustal":"biojs-io-clustal","biojs-io-fasta":"biojs-io-fasta","xhr":"xhr"}],"xhr":[function(require,module,exports){
var window = require("global/window")
var once = require("once")
var parseHeaders = require('parse-headers')

var messages = {
    "0": "Internal XMLHttpRequest Error",
    "4": "4xx Client Error",
    "5": "5xx Server Error"
}

var XHR = window.XMLHttpRequest || noop
var XDR = "withCredentials" in (new XHR()) ? XHR : window.XDomainRequest

module.exports = createXHR

function createXHR(options, callback) {
    if (typeof options === "string") {
        options = { uri: options }
    }

    options = options || {}
    callback = once(callback)

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new XDR()
        }else{
            xhr = new XHR()
        }
    }

    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var key
    var load = options.response ? loadResponse : loadXhr

    if ("json" in options) {
        isJson = true
        headers["Accept"] = "application/json"
        if (method !== "GET" && method !== "HEAD") {
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = load
    xhr.onerror = error
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    // hate IE
    xhr.ontimeout = noop
    xhr.open(method, uri, !sync)
                                    //backward compatibility
    if (options.withCredentials || (options.cors && options.withCredentials !== false)) {
        xhr.withCredentials = true
    }

    // Cannot set timeout with sync request
    if (!sync) {
        xhr.timeout = "timeout" in options ? options.timeout : 5000
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr

    function readystatechange() {
        if (xhr.readyState === 4) {
            load()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = null

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === 'text' || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function getStatusCode() {
        return xhr.status === 1223 ? 204 : xhr.status
    }

    // if we're getting a none-ok statusCode, build & return an error
    function errorFromStatusCode(status, body) {
        var error = null
        if (status === 0 || (status >= 400 && status < 600)) {
            var message = (typeof body === "string" ? body : false) ||
                messages[String(status).charAt(0)]
            error = new Error(message)
            error.statusCode = status
        }

        return error
    }

    // will load the data & process the response in a special response object
    function loadResponse() {
        var status = getStatusCode()
        var body = getBody()
        var error = errorFromStatusCode(status, body)
        var response = {
            body: body,
            statusCode: status,
            statusText: xhr.statusText,
            raw: xhr
        }
        if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
            response.headers = parseHeaders(xhr.getAllResponseHeaders())
        } else {
            response.headers = {}
        }

        callback(error, response, response.body)
    }

    // will load the data and add some response properties to the source xhr
    // and then respond with that
    function loadXhr() {
        var status = getStatusCode()
        var error = errorFromStatusCode(status)

        xhr.status = xhr.statusCode = status
        xhr.body = getBody()
        xhr.headers = parseHeaders(xhr.getAllResponseHeaders())

        callback(error, xhr, xhr.body)
    }

    function error(evt) {
        callback(evt, xhr)
    }
}


function noop() {}

},{"global/window":92,"once":93,"parse-headers":97}]},{},["msa"])