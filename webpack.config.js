var names = ['model', 'statics'];
var entry = names.map(function(name) {
  return 'mocha!./test/' + name + '.js';
});

module.exports = {
  entry: entry,
  resolve: {
    alias : {
      //alias this component entry
      //'model': '../lib/index.js'
    }
  }
}
