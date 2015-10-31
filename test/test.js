
var model = require('..')
var util = require('../lib/util')

var assert = require('assert')

var User = model('User')
  .attr('id', { type: 'number' })
  .attr('name', { type: 'string' })
  .attr('age', { type: 'number' })

var Pet = model('Pet')
  .attr('id')
  .attr('name')
  .attr('species')


describe('model(name)', function(){
  it('should return a new model constructor', function(){
    var Something = model('Something')
    assert('function' == typeof Something)
  })

  it('should throw if name undefined', function () {
    var err
    try {
      var Something = model()
      assert('function' == typeof Something)
    } catch (e) {
      err = e
    }
    assert(!!err.message)
  })
})

describe('Model.attrs', function(){
  it('should hold the defined attrs', function(){
    assert('string' == User.options.name.type)
    assert('number' == User.options.age.type)
  })
})

describe('new Model(object)', function(){
  it('should populate attrs', function(){
    var user = new User({ name: 'Tobi', age: 2 })
    assert('Tobi' == user.name)
    assert(2 == user.age)
  })
})

describe('Model(object)', function(){
  it('should populate attrs', function(){
    var user = User({ name: 'Tobi', age: 2 })
    assert('Tobi' == user.name)
    assert(2 == user.age)
  })
})

describe('Model.method()', function () {
  it('should append method', function () {
    var fired
    Pet.method('speak', function () {
      fired = true
      assert.equal(this, pig)
    })
    var pig = new Pet({id: 1, name: 'piggy'})
    pig.speak()
    assert.equal(fired, true)
    delete Pet.prototype.speak
  })
})

describe('.<attr>', function(){
  it('should set a value', function(){
    var user = new User()
    user.name = 'Tobi'
    assert('Tobi' == user.name)
  })

  it('should emit "change <attr>" events', function(done){
    var user = new User({ name: 'Tobi' })

    user.on('change name', function(val, old){
      assert('Luna' == val)
      assert('Tobi' == old)
      done()
    })

    user.name = 'Luna'
  })

  it('should emit "change" events', function(done){
    var user = new User({ name: 'Tobi' })

    user.on('change', function(prop, val, old){
      assert('name' == prop)
      assert('Luna' == val)
      assert('Tobi' == old)
      done()
    })

    user.name = 'Luna'
  })
})

describe('.model', function(){
  it('should reference the constructor', function(){
    var user = new User()
    assert(User == user.model)

    var pet = new Pet()
    assert(Pet == pet.model)
  })
})

describe('.set(attrs)', function(){
  it('should set several attrs', function(){
    var user = new User()
    user.set({ name: 'Tobi', age: 2 })
    assert('Tobi' == user.name)
    assert(2 == user.age)
  })
})

describe('.has(attr)', function(){
  it('should check if attr is not null or undefined', function(){
    var user = new User({ name: 'Tobi' })
    assert(true === user.has('name'))
    assert(false === user.has('age'))
  })
})


describe('.toJSON()', function(){
  it('should return the attributes', function(){
    var user = new User({ name: 'Tobi', age: 2 })
    var obj = user.toJSON()
    assert('Tobi' == obj.name)
    assert(2 == obj.age)
  })
})

describe('.changed()', function () {
  it('should return changed properties', function () {
    var user = new User({ name: 'Tobi', age: 2 })
    user.name = 'tobi'
    user.age = 20
    var changed = user.changed()
    assert.deepEqual(changed, {name: 'tobi', age: 20})
  })

  it('should return false if not changed', function () {
    var user = new User({ name: 'Tobi', age: 2 })
    assert(user.changed() === false)
    user.name = 'tobi'
    user.name = 'Tobi'
    var changed = user.changed()
    assert.equal(changed, false)
  })
})

describe('.clean()', function () {
  it('should be cleaned', function () {
    var user = new User({ name: 'Tobi', age: 2 })
    user.name = 'tobi'
    user.age = 20
    user.clean()
    var changed = user.changed()
    assert.equal(changed, false)
  })
})

describe('util.diffObject', function () {
  it('should return diff object', function () {
    var a = {name: 'tobi', age:  10 , title: 'employee'}
    var b = {name: 'Tobi', age:  20 , title: 'employee'}
    var diff = util.diffObject(a, b)
    assert.equal(diff['age'], 20)
    assert.equal(diff['name'], 'Tobi')
    assert.equal(Object.keys(diff).length, 2)
  })
})

describe('util.assign', function () {
  it('should assign properties', function () {
    var o = {name: 'tobi', age: 10}
    var to = {}
    var res = util.assign(to, o)
    assert.equal(res, to)
    assert.deepEqual(res, o)
  })
})
