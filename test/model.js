
var model = require('..')

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

describe('Model#.<attr>(value)', function(){
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

describe('Model#model', function(){
  it('should reference the constructor', function(){
    var user = new User()
    assert(User == user.model)

    var pet = new Pet()
    assert(Pet == pet.model)
  })
})

describe('Model#set(attrs)', function(){
  it('should set several attrs', function(){
    var user = new User()
    user.set({ name: 'Tobi', age: 2 })
    assert('Tobi' == user.name)
    assert(2 == user.age)
  })
})

describe('Model#has(attr)', function(){
  it('should check if attr is not null or undefined', function(){
    var user = new User({ name: 'Tobi' })
    assert(true === user.has('name'))
    assert(false === user.has('age'))
  })
})


describe('Model#toJSON()', function(){
  it('should return the attributes', function(){
    var user = new User({ name: 'Tobi', age: 2 })
    var obj = user.toJSON()
    assert('Tobi' == obj.name)
    assert(2 == obj.age)
  })
})
