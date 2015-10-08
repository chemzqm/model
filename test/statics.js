
var model = require('..');

var assert = require('assert');

var User = model('User')
  .attr('id', { type: 'number' })
  .attr('name', { type: 'string' })
  .attr('age', { type: 'number' })

describe('Model.attrs', function(){
  it('should hold the defined attrs', function(){
    assert('string' == User.attrs.name.type);
    assert('number' == User.attrs.age.type);
  })
})

describe('Model.validate', function() {
  function required(attr) {
    return function (Model) {
      Model.validate(function(model) {
        if (!model.has(attr)) model.error(attr, 'field required');
      })
    }
  }

  it('should validate the value', function() {
    User.use(required('name'));
    var user = new User({id: 5});
    assert(user.isValid() === false);
    var errors = user.errors;
    assert(errors[0].attr == 'name');
    assert(errors[0].message == 'field required');
  })

})
