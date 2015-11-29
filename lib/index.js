
/**
 * Module dependencies.
 */

var proto = require('./proto')
var util = require('./util')
var buildinRe = /^(\$stat|changed|emit|clean|on|off|attrs)$/

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
    this.origAttrs = Object.create(attrs)
    this.attrs = util.assign({}, attrs)
  }

  // statics

  model.modelName = name
  model.options = {}

  // prototype

  model.prototype = {}
  model.prototype.model = model;

  /**
   * Define instance method
   *
   * @param {String} name
   * @param {Function} fn
   * @return {Function} self
   * @api public
   */
  model.method = function (name, fn) {
    this.prototype[name] = fn
    return this
  }

  /**
   * Use function as plugin
   *
   * @param {Function} fn
   * @return {Function} self
   * @api public
   */
  model.use = function (fn) {
    fn(this)
    return this
  }

  /**
  * Define attr with the given `name` and `options`.
  *
  * @param {String} name
  * @param {Object} optional options
  * @return {Function} self
  * @api public
  */

  model.attr = function(name, options){
    options = options || {}
    this.options[name] = options

    if ('id' === name || '_id' === name) {
      this.options[name].primaryKey = true
      this.primaryKey = name
    }

    if (buildinRe.test(name)) throw new Error(name + ' could not be used as field name')

    Object.defineProperty(this.prototype, name, {
      set: function (val) {
        var prev = this.attrs[name]
        var diff = util.diffObject(this.attrs, this.origAttrs)
        var changedNum = Object.keys(diff).length
        this.attrs[name] = val
        this.emit('change', name, val, prev)
        this.emit('change ' + name, val, prev)
        if (prev === val) return
        // make sure when multiple properties changed, only emit once
        if (changedNum === 0) return this.emit('change $stat', true)
        if (changedNum === 1 && diff[name] === val) {
          // became clean
          this.emit('change $stat', false)
        }
      },
      get: function () {
        return this.attrs[name]
      }
    })

    return this
  }

  var key
  for (key in proto) model.prototype[key] = proto[key]

  return model
}

