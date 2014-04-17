# model

  ES5 minimalistic extensible model component.

## API

### model(name)

  Create a new model with the given `name`.

```js
var model = require('model');
var User = model('User');
```

### .attr(name, [meta])

  Define an attribute `name` with optional `meta` data object.

### .validate(fn)

### .url([path])

  Return base url, or url to `path`.

### .route(path)

  Set base path for urls.
  Note this is defaulted to `'/' + modelName.toLowerCase() + 's'`

### .headers({header: value})

  Sets custom headers for static and method requests on the model.

### .isNew()

  Returns `true` if the model is unsaved.

### .toJSON()

  Return a JSON representation of the model (its attributes).

### .set(attrs)

  Set multiple `attrs`.

```js
user.set({ name: 'Tobi', age: 2 })
```

### .changed([attr])

  Check if the model is "dirty" and return an object
  of changed attributes. Optionally check a specific `attr`
  and return a `Boolean`.

### .error(attr, msg)

  Define error `msg` for `attr`.

### .isValid()

  Run validations and check if the model is valid.

```js
user.isValid()
// => false

user.errors
// => [{ attr: ..., message: ... }]
```

### .url([path])

  Return this model's base url or relative to `path`:

```js
var user = new User({ id: 5 });
user.url('edit');
// => "/users/5/edit"
```

### .save(fn)

  Save or update and invoke the given callback `fn(err)`.

```js
var user = new User({ name: 'Tobi' })

user.save(function(err){

})
```

  Emits "save" when complete.

### .destroy([fn])

  Destroy and invoke optional `fn(err)`.

  Emits "destroy" when successfully deleted.

## Testing

```
$ npm install
$ make test &
$ open http://localhost:3000
```

# License

  MIT
