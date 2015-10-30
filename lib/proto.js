
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
var util = require('./util')

/**
 * Mixin emitter.
 */

Emitter(exports)


/**
 * Return `false` or an object
 * containing the "dirty" attributes.
 *
 * Optionally check for a specific `attr`.
 *
 * @param {String} [attr]
 * @return {Object|Boolean}
 * @api public
 */

exports.changed = function(attr){
  var changed = util.diffObject(this.origAttrs, this.attrs)
  if (typeof changed[attr] !== 'undefined') {
    return changed[attr]
  }
  if (Object.keys(changed).length === 0) return false
  return changed
}

/**
 * Set current attrs as original attrs
 *
 * @api public
 */
exports.clean = function(){
  for (var k in this.attrs) {
    this.origAttrs[k] = this.attrs[k]
  }
  this.emit('change $stat', false)
}


/**
 * Set multiple `attrs`.
 *
 * @param {Object} attrs
 * @return {Object} self
 * @api public
 */

exports.set = function(attrs){
  for (var key in attrs) {
    this[key] = attrs[key]
  }
  return this
}


/**
 * Return the JSON representation of the model.
 *
 * @return {Object}
 * @api public
 */

exports.toJSON = function(){
  return this.attrs
}

/**
 * Check if `attr` is present (not `null` or `undefined`).
 *
 * @param {String} attr
 * @return {Boolean}
 * @api public
 */

exports.has = function(attr){
  return null != this.attrs[attr]
}
