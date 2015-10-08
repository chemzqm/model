
/**
 * Module dependencies.
 */

var Emitter = require('emitter');

var noop = function(){};

/**
 * Mixin emitter.
 */

Emitter(exports);

/**
 * Register an error `msg` on `attr`.
 *
 * @param {String} attr
 * @param {String} msg
 * @return {Object} self
 * @api public
 */

exports.error = function(attr, msg){
  this.errors.push({
    attr: attr,
    message: msg
  });
  return this;
};


/**
 * Get / set the primary key.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api public
 */

exports.primary = function(val){
  var key = this.model.primaryKey;
  if (0 === arguments.length) return this[key]();
  this.attrs[key] = val;
  return;
};

/**
 * Validate the model and return a boolean.
 *
 * Example:
 *
 *    user.isValid()
 *    // => false
 *
 *    user.errors
 *    // => [{ attr: ..., message: ... }]
 *
 * @return {Boolean}
 * @api public
 */

exports.isValid = function(){
  return 0 === this.validate().length;
};

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
  var dirty = this.dirty;
  if (Object.keys(dirty).length) {
    if (attr) return !! dirty[attr];
    return dirty;
  }
  return false;
};

/**
 * remove dirty marks
 *
 * @api public
 */
exports.clean = function(){
  this.dirty = {};
}

/**
 * Perform validations.
 *
 * @api private
 */

exports.validate = function(){
  var self = this;
  var fns = this.model.validators;
  this.errors = [];
  fns.forEach(function(fn){ fn(self) });
  return this.errors;
};

/**
 * Set multiple `attrs`.
 *
 * @param {Object} attrs
 * @return {Object} self
 * @api public
 */

exports.set = function(attrs){
  for (var key in attrs) {
    this[key] = attrs[key];
  }
  return this;
};


/**
 * Return the JSON representation of the model.
 *
 * @return {Object}
 * @api public
 */

exports.toJSON = function(){
  return this.attrs;
};

/**
 * Check if `attr` is present (not `null` or `undefined`).
 *
 * @param {String} attr
 * @return {Boolean}
 * @api public
 */

exports.has = function(attr){
  return null != this.attrs[attr];
}
