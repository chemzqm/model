/**
 * Module dependencies.
 */

var noop = function(){};


/**
 * Add validation `fn()`.
 *
 * @param {Function} fn
 * @return {Function} self
 * @api public
 */

exports.validate = function(fn){
  this.validators.push(fn);
  return this;
};


/**
 * Define attr with the given `name` and `options`.
 *
 * @param {String} name
 * @param {Object} options
 * @return {Function} self
 * @api public
 */

exports.attr = function(name, options){
  options = options || {};
  this.attrs[name] = options;

  if ('id' === name || '_id' === name ||options.pk === true) {
    this.attrs[name].primaryKey = true;
    this.primaryKey = name;
  }
  //development mistake
  if(this.prototype[name] != null) throw new Error('property ' + name + ' already defined');
  //use es5-shim to avoid it on IE <9
  if(typeof Object.defineProperty !== 'function') throw new Error('Object.defineProperty is not supported');
  Object.defineProperty(this.prototype, name, {
    set: function (val) {
      var prev = this.attrs[name];
      if (prev == val) return;
      this.dirty[name] = val;
      this.attrs[name] = val;
      this.model.emit('change', this, name, val, prev);
      this.model.emit('change ' + name, this, val, prev);
      this.emit('change', name, val, prev);
      this.emit('change ' + name, val, prev);
    },
    get: function () {
      return this.attrs[name];
    }
  })

  return this;
};

exports.method = function (name, fn) {
  this.prototype[name] = fn;
  return this;
}

exports.use = function (fn) {
  fn(this);
  return this;
}
