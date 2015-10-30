/**
 * Module dependencies.
 */
var util = require('./util')
var buildinRe = /^(\$stat|changed|emit|clean|on|off|attrs)$/

/**
 * Define attr with the given `name` and `options`.
 *
 * @param {String} name
 * @param {Object} options
 * @return {Function} self
 * @api public
 */

exports.attr = function(name, options){
  options = options || {}
  this.attrs[name] = options

  if ('id' === name || '_id' === name) {
    this.attrs[name].primaryKey = true
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

exports.method = function (name, fn) {
  this.prototype[name] = fn
  return this
}

exports.use = function (fn) {
  fn(this)
  return this
}

