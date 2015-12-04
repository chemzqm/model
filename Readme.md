# model

[![NPM version](https://img.shields.io/npm/v/model-component.svg?style=flat-square)](https://www.npmjs.com/package/model-component)
[![Dependency Status](https://img.shields.io/david/chemzqm/model.svg?style=flat-square)](https://david-dm.org/chemzqm/model)
[![Build Status](https://img.shields.io/travis/chemzqm/model/master.svg?style=flat-square)](http://travis-ci.org/chemzqm/model)
[![Coverage Status](https://img.shields.io/coveralls/chemzqm/model/master.svg?style=flat-square)](https://coveralls.io/github/chemzqm/model?branch=master)

  ES5 minimalistic extensible model component.

  By using `Object.defineProperty`, `change` event is automaticaly emited on value set.
  this feature can make it works with [reactive](https://github.com/chemzqm/reactive).

  You may need [polyfill code](https://gist.github.com/chemzqm/22c1cec5895afd924bee) for ie < 9

## Install

```
npm i model-component
```

## API

### Model(name)

  Factory method, Create a new model with the given `name`.

```js
var Model = require('model')
var User = Model('User')
```

### Model.attr(name, [meta])

  Define an attribute `name` with optional `meta` data object (used by plugins).

### Model.method(name, fn)

  Add function with name to model prototype

### .changed([attr])

  Return `false` or an object

  containing the "dirty" attributes.
  Optionally check for a specific `attr`.

### .clean()

  Set current attrs as original attrs

### .set(attrs)

  Set multiple `attrs`.

### .has(attr)

  Check if `attr` is present (not `null` or `undefined`).

### .use(plugin)

  Plugin is called with Model class

## Events

* `change` event emitted on model instance.

``` js
user.on('change name', function(val, prev) {
  api.updateUser({name: val, id: user.id}, function(err) {
  })
})
```
* `change $stat` event emitted on model stat change

``` js
user.on('change $stat', function(isDirty) {
  if (isDirty) {
  // it's dirty
  } else {
  // it become clean
  }
})

```

## Add methods to model

``` js
User.method('destroy', function() {
  var self = this
  api.removeUser(this.primary(), function(err) {
    if (err) { return; }
    //remove bindings
    self.off()
  })
})
```

## Testing

using webpack-dev-server

```
$ npm install webpack webpack-dev-server -g
$ npm install
$ make test
```

# License

  MIT
