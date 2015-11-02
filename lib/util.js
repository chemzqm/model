/**
 * Simple diff without nested check
 * Return the changed props from b
 *
 * @param {Object} a
 * @param {Object} b
 * @api public
 */
exports.diffObject = function (a, b) {
  var res = {}
  for (var k in a) {
    if (a[k] !== b[k]) {
      res[k] = b[k]
    }
  }
  return res
}

/**
 * Assign props from `from` to `to` return to
 *
 * @param {Object} to
 * @param {Object} from
 * @return {Object}
 * @api public
 */
exports.assign = function (to, from) {
  Object.keys(from).forEach(function (k) {
    to[k] = from[k]
  })
  return to
}

