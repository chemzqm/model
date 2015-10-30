
/**
 * Module dependencies.
 */

var proto = require('./proto')
var statics = require('./static')
var util = require('./util')

/**
 * Expose `createModel`.
 */

module.exports = createModel

/**
 * Create a new model constructor with the given `name`.
 *
 * @param {String} name
 * @return {Function}
 * @api public
 */

function createModel(name) {
  if ('string' != typeof name) throw new TypeError('model name required')

  /**
   * Initialize a new model with the given `attrs`.
   *
   * @param {Object} attrs
   * @api public
   */

  function model(attrs) {
    if (!(this instanceof model)) return new model(attrs)
    attrs = attrs || {}
    this._callbacks = {}
    this.origAttrs = attrs
    this.attrs = util.assign({}, attrs)
  }

  // statics

  model.modelName = name
  model.attrs = {}
  for (var key in statics) model[key] = statics[key]

  // prototype

  model.prototype = {}
  model.prototype.model = model;
  for (key in proto) model.prototype[key] = proto[key]

  return model
}

