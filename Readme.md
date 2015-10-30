# model [![Build Status](https://travis-ci.org/chemzqm/model.svg?branch=master)](https://travis-ci.org/chemzqm/model)

  ES5 minimalistic extensible model component.

  By using `Object.defineProperty`, `change` event is automaticaly emited when value changes.
  this feature can make it works with [reactive](https://github.com/chemzqm/reactive).

  ie < 9 is not supported

## Install

```
npm i model-component
```

## API

### Model(name)

  Create a new model with the given `name`.

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
