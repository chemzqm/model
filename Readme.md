# model

  ES5 minimalistic extensible model component.

  By using `Object.defineProperty`, `change` event is automaticaly emited when value changes.
  this feature can make it works with [reactive](https://github.com/chemzqm/reactive).

  Use [https://www.npmjs.com/package/es5-shim] for ie < 9.
## Install

```
npm i model-component
```

## API

### Model(name)

  Create a new model with the given `name`.

```js
var Model = require('model');
var User = Model('User');
```

### Model.attr(name, [meta])

  Define an attribute `name` with optional `meta` data object.

### Model.validate(fn)

  Add validate function to Model

### .error(attr, msg)

  Add error with `msg` and `attr` to model.

### .isValid()

  Run validations and check if the model is valid.

```js
user.isValid()
// => false

user.errors
// => [{ attr: ..., message: ... }]
```
### .primary([val])

  Get/Set primary value for model.

### .changed([attr])

  Return `false` or an object

  containing the "dirty" attributes.
  Optionally check for a specific `attr`.

### .clean()

  remove dirty marks.

### .set(attrs)

  Set multiple `attrs`.

### .has(attr)

  Check if `attr` is present (not `null` or `undefined`).

## Events


* `construct` event emitted on Model when new model created.

``` js
User.on('construct', function(user, attrs) {
  api.saveUser(attrs, fucntion(err, data) {
    if (err){ return; }
    //no event emit
    user.primary(data.id);
  })
})
```

* `change` event emitted on Model and model instance.

``` js
User.on('change', function(user, name, val, prev) {
  api.updateUser(name, val, prev, function(err) {
  })
})
```

``` js
User.on('change name', function(user, val, prev) {
  api.updateUser(name, val, prev, function(err) {
  })
})
```

## Add methods to Model/model

``` js
User.loadUsers = function(cb) {
  api.loadUsers(function(err, data) {
    if (err) { return; }
    var users = data.users.map( attrs => new User(attrs) );
    cb(null, users);
  })
}
```

``` js
User.method('destroy', function() {
  var self = this;
  api.removeUser(this.primary(), function(err) {
    if (err) { return; }
    //remove bindings
    self.off();
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
